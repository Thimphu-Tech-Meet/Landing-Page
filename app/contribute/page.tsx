import type { Metadata } from "next";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contribute",
  description:
    "Write for the Thimphu Tech Meet community: posts are markdown files, contributions are pull requests.",
  alternates: { canonical: "/contribute" },
};

const FRONTMATTER = `---
title: "Your idea"
description: "One sentence."
author: "Your name"
github: "your-handle"         # optional
date: "2026-10-03"
link: "https://example.com"   # optional
---`;

export default function ContributePage() {
  return (
    <section>
      <div className="wrap">
        <div className="eyebrow">Contribute</div>
        <h1 className="page-title">Write for the community</h1>
        <p className="page-intro">
          Posts are markdown files. You don&apos;t need to be a git expert;
          three steps and a reviewer will help with the rest.
        </p>

        <div className="steps">
          <div className="step">
            <h3>Clone and add a file</h3>
            <p>
              Create one markdown file in the <code>content</code> folder. The
              filename becomes the URL, so keep it short and hyphenated.
            </p>
            <pre>{`git checkout -b feature/your-idea
content/your-idea.md`}</pre>
          </div>
          <div className="step">
            <h3>Fill in the front matter</h3>
            <p>
              Title, a one-line description, your name and the date. A link is
              optional.
            </p>
            <pre>{FRONTMATTER}</pre>
          </div>
          <div className="step">
            <h3>Open a pull request</h3>
            <p>
              An organiser reads it within a few days. Expect a comment or two,
              then it&apos;s live.
            </p>
            <pre>{`git push -u origin feature/your-idea
→ Compare & pull request`}</pre>
          </div>
        </div>

        <div className="split">
          <div className="note">
            <h3>Sending photos?</h3>
            <p>
              Don&apos;t open a PR. Hand them to an organiser at the meetup or{" "}
              <a href={site.newIssue} target="_blank" rel="noopener noreferrer">
                open an issue
              </a>{" "}
              with a link; we add them to that month&apos;s meetup file.
            </p>
          </div>
          <div className="note plain">
            <h3>Want to give a talk?</h3>
            <p>
              Five to twenty minutes, any level.{" "}
              <a href={site.newIssue} target="_blank" rel="noopener noreferrer">
                Open an issue
              </a>{" "}
              with a title and we&apos;ll slot you into the next meetup.
            </p>
          </div>
        </div>

        <div className="actions-row">
          <a className="btn primary" href={site.repo} target="_blank" rel="noopener noreferrer">
            Open the repository on GitHub
          </a>
          <a className="btn" href={site.contributing} target="_blank" rel="noopener noreferrer">
            Read the full guidelines
          </a>
        </div>
      </div>
    </section>
  );
}
