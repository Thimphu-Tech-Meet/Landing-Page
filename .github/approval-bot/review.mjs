#!/usr/bin/env node
/**
 * OpenRouter-powered PR reviewer for Thimphu Tech Meet.
 *
 * Reads the PR diff, asks the model for a structured verdict, posts a GitHub
 * review, and optionally submits an approving review when auto-approve is on.
 */

const {
  OPENROUTER_API_KEY,
  GITHUB_TOKEN,
  APPROVAL_BOT_TOKEN,
  GITHUB_REPOSITORY,
  PR_NUMBER,
  APPROVAL_BOT_MODE = "review",
  APPROVAL_BOT_MODEL = "openai/gpt-4o-mini",
  OPENROUTER_SITE_URL = "https://github.com/Thimphu-Tech-Meet/Landing-Page",
  OPENROUTER_APP_NAME = "Thimphu Tech Meet Approval Bot",
} = process.env;

const MAX_DIFF_CHARS = 80_000;
const token = APPROVAL_BOT_TOKEN || GITHUB_TOKEN;

function fail(message) {
  console.error(message);
  process.exit(1);
}

if (!OPENROUTER_API_KEY) fail("Missing OPENROUTER_API_KEY secret.");
if (!token) fail("Missing GITHUB_TOKEN / APPROVAL_BOT_TOKEN.");
if (!GITHUB_REPOSITORY) fail("Missing GITHUB_REPOSITORY.");
if (!PR_NUMBER) fail("Missing PR_NUMBER.");

const [owner, repo] = GITHUB_REPOSITORY.split("/");
const mode = APPROVAL_BOT_MODE.trim().toLowerCase();
const autoApprove = mode === "approve" || mode === "auto-approve";

async function gh(path, { method = "GET", body, accept } = {}) {
  const res = await fetch(`https://api.github.com${path}`, {
    method,
    headers: {
      Accept: accept || "application/vnd.github+json",
      Authorization: `Bearer ${token}`,
      "X-GitHub-Api-Version": "2022-11-28",
      ...(body ? { "Content-Type": "application/json" } : {}),
    },
    body: body ? JSON.stringify(body) : undefined,
  });

  const text = await res.text();
  let data = null;
  try {
    data = text ? JSON.parse(text) : null;
  } catch {
    data = text;
  }

  if (!res.ok) {
    fail(`GitHub API ${method} ${path} failed (${res.status}): ${text}`);
  }
  return data;
}

async function openRouter(messages) {
  const res = await fetch("https://openrouter.ai/api/v1/chat/completions", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${OPENROUTER_API_KEY}`,
      "Content-Type": "application/json",
      "HTTP-Referer": OPENROUTER_SITE_URL,
      "X-Title": OPENROUTER_APP_NAME,
    },
    body: JSON.stringify({
      model: APPROVAL_BOT_MODEL,
      temperature: 0.2,
      response_format: { type: "json_object" },
      messages,
    }),
  });

  const text = await res.text();
  if (!res.ok) {
    fail(`OpenRouter request failed (${res.status}): ${text}`);
  }

  const data = JSON.parse(text);
  const content = data?.choices?.[0]?.message?.content;
  if (!content) fail(`OpenRouter returned no content: ${text}`);
  return content;
}

function truncate(value, max) {
  if (!value) return "";
  if (value.length <= max) return value;
  return `${value.slice(0, max)}\n\n…[truncated ${value.length - max} chars]`;
}

function parseVerdict(raw) {
  let parsed;
  try {
    parsed = JSON.parse(raw);
  } catch {
    const match = raw.match(/\{[\s\S]*\}/);
    if (!match) fail(`Could not parse model JSON:\n${raw}`);
    parsed = JSON.parse(match[0]);
  }

  const verdict = String(parsed.verdict || "")
    .trim()
    .toUpperCase();
  const allowed = new Set(["APPROVE", "COMMENT", "REQUEST_CHANGES"]);
  if (!allowed.has(verdict)) {
    fail(`Unexpected verdict "${verdict}". Expected APPROVE | COMMENT | REQUEST_CHANGES.`);
  }

  return {
    verdict,
    summary: String(parsed.summary || "").trim() || "No summary provided.",
    reasons: Array.isArray(parsed.reasons)
      ? parsed.reasons.map((r) => String(r).trim()).filter(Boolean)
      : [],
    risks: Array.isArray(parsed.risks)
      ? parsed.risks.map((r) => String(r).trim()).filter(Boolean)
      : [],
  };
}

function buildReviewBody(result, { approved }) {
  const lines = [
    "## Approval Bot review",
    "",
    `**Verdict:** ${result.verdict}${approved ? " — submitted as GitHub approval" : ""}`,
    "",
    result.summary,
  ];

  if (result.reasons.length) {
    lines.push("", "### Why", ...result.reasons.map((r) => `- ${r}`));
  }
  if (result.risks.length) {
    lines.push("", "### Watch-outs", ...result.risks.map((r) => `- ${r}`));
  }

  if (result.verdict === "APPROVE" && !approved) {
    lines.push(
      "",
      "_Model likes this change. Auto-approve is off — a maintainer still needs to approve, or set `APPROVAL_BOT_MODE=approve` and provide `APPROVAL_BOT_TOKEN`._",
    );
  }

  lines.push(
    "",
    `— _OpenRouter · \`${APPROVAL_BOT_MODEL}\` · mode \`${mode}\`_`,
  );

  return lines.join("\n");
}

async function main() {
  const pr = await gh(`/repos/${owner}/${repo}/pulls/${PR_NUMBER}`);
  if (pr.draft) {
    console.log("Skipping draft PR.");
    return;
  }

  const files = await gh(
    `/repos/${owner}/${repo}/pulls/${PR_NUMBER}/files?per_page=100`,
  );

  const fileSummaries = files
    .map((f) => {
      const patch = truncate(f.patch || "(binary or too large for patch)", 4_000);
      return `### ${f.filename} (${f.status}, +${f.additions}/-${f.deletions})\n\`\`\`diff\n${patch}\n\`\`\``;
    })
    .join("\n\n");

  const promptContext = truncate(
    [
      `Repository: ${GITHUB_REPOSITORY}`,
      `PR #${PR_NUMBER}: ${pr.title}`,
      `Author: ${pr.user?.login || "unknown"}`,
      `Base: ${pr.base?.ref} ← Head: ${pr.head?.ref}`,
      "",
      "PR body:",
      pr.body || "(empty)",
      "",
      "Changed files:",
      fileSummaries || "(no file patches available)",
    ].join("\n"),
    MAX_DIFF_CHARS,
  );

  const raw = await openRouter([
    {
      role: "system",
      content: [
        "You are the Thimphu Tech Meet Approval Bot for a community landing-page / markdown blog repo.",
        "Review pull requests for correctness, safety, contribution fit, and maintainability.",
        "Prefer APPROVE for small, clear, low-risk contributions (posts, copy, UI polish) that match the repo.",
        "Use REQUEST_CHANGES for broken builds, secrets, destructive workflows, spam, or clear policy violations.",
        "Use COMMENT when unsure or when feedback is useful but not blocking.",
        "Return ONLY JSON with keys: verdict (APPROVE|COMMENT|REQUEST_CHANGES), summary (string), reasons (string[]), risks (string[]).",
        "Keep summary under 80 words. Be concrete and kind.",
      ].join(" "),
    },
    {
      role: "user",
      content: promptContext,
    },
  ]);

  const result = parseVerdict(raw);
  console.log("Model verdict:", result.verdict);

  const canApprove =
    autoApprove &&
    result.verdict === "APPROVE" &&
    Boolean(APPROVAL_BOT_TOKEN);

  if (autoApprove && result.verdict === "APPROVE" && !APPROVAL_BOT_TOKEN) {
    console.warn(
      "Auto-approve requested, but APPROVAL_BOT_TOKEN is missing. Posting comment-only recommendation.",
    );
  }

  const event = canApprove
    ? "APPROVE"
    : result.verdict === "REQUEST_CHANGES"
      ? "REQUEST_CHANGES"
      : "COMMENT";

  const body = buildReviewBody(result, { approved: canApprove });

  await gh(`/repos/${owner}/${repo}/pulls/${PR_NUMBER}/reviews`, {
    method: "POST",
    body: {
      commit_id: pr.head.sha,
      body,
      event,
    },
  });

  console.log(
    canApprove
      ? "Posted approving review."
      : `Posted ${event} review (auto-approve=${autoApprove}).`,
  );
}

main().catch((err) => fail(err?.stack || String(err)));
