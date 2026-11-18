# PR Approval Bot

OpenRouter-backed bot that reviews pull requests and can optionally approve them.

## What it does

1. Runs on PR opened / updated / ready for review (skips drafts).
2. Sends the PR title, body, and diff to OpenRouter.
3. Posts a GitHub review with:
   - **APPROVE** — looks good
   - **COMMENT** — feedback, not blocking
   - **REQUEST_CHANGES** — needs fixes
4. If auto-approve is enabled **and** the model says APPROVE, it submits a real GitHub approval.

## Modes

| Mode | Behavior |
|------|----------|
| `review` (default) | Comment with a recommendation only. Never auto-approves. |
| `approve` | When the model says APPROVE, submit a GitHub approving review. |

In `review` mode you’ll see something like: *“I like this — a maintainer still needs to approve.”*  
Flip the mode when you’re ready for the bot to approve on its own.

## Setup (one-time)

### 1. OpenRouter API key

1. Create a key at [openrouter.ai/keys](https://openrouter.ai/keys).
2. Repo **Settings → Secrets and variables → Actions → Secrets**
3. Add `OPENROUTER_API_KEY`.

### 2. Optional: let the bot approve

GitHub’s default `GITHUB_TOKEN` usually cannot approve PRs reliably. Create a fine-grained PAT (or classic PAT) from a maintainer account that is **not** the PR author:

- Permission: **Pull requests → Read and write**
- Repo access: this repository

Then add secret `APPROVAL_BOT_TOKEN`.

Also enable:

**Settings → Actions → General → Workflow permissions → Allow GitHub Actions to create and approve pull requests**

### 3. Variables

Repo **Settings → Secrets and variables → Actions → Variables**:

| Variable | Example | Notes |
|----------|---------|-------|
| `APPROVAL_BOT_MODE` | `review` or `approve` | Defaults to `review` if unset |
| `APPROVAL_BOT_MODEL` | `openai/gpt-4o-mini` | Any OpenRouter model id |

## Recommended rollout

1. Ship with `APPROVAL_BOT_MODE=review` and only `OPENROUTER_API_KEY`.
2. Watch a few PR reviews.
3. When you trust it, set `APPROVAL_BOT_MODE=approve` and add `APPROVAL_BOT_TOKEN`.

## Manual test

Open any non-draft PR (or push a commit to one). Check the **Checks** tab for **PR Approval Bot**, then the PR conversation for the review comment.
