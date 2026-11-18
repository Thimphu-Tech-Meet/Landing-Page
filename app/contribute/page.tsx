import type { Metadata } from "next";
import Link from "next/link";
import { site } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contribute",
  description:
    "Write for the Thimphu Tech Meet community: fork the repo, add a markdown file, and open a pull request.",
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
          You do not need write access to this repository.{" "}
          <strong>Fork it on GitHub</strong>, add one markdown file, and open a
          pull request back to us. Anyone can do this—whether you are in Thimphu
          or elsewhere. For a short overview, see{" "}
          <Link href="/blog/welcome-to-the-community-blog">
            Welcome to the community blog
          </Link>
          .
        </p>

        <div className="steps">
          <div className="step">
            <h3>Fork and clone</h3>
            <p>
              On GitHub, click{" "}
              <a href={`${site.repo}/fork`} target="_blank" rel="noopener noreferrer">
                Fork
              </a>{" "}
              to create your own copy, then clone that fork to your machine.
            </p>
            <pre>{`git clone https://github.com/<you>/Landing-Page.git
cd Landing-Page`}</pre>
          </div>
          <div className="step">
            <h3>Branch and add a file</h3>
            <p>
              Create a <code>feature/…</code> branch, then add one markdown file
              under <code>content/</code>. The filename becomes the URL—keep it
              short and hyphenated.
            </p>
            <pre>{`git checkout -b feature/your-idea
content/your-idea.md`}</pre>
          </div>
          <div className="step">
            <h3>Front matter, then open a PR</h3>
            <p>
              Fill in title, description, your name, and the date. Push your
              branch and open a pull request against{" "}
              <code>Thimphu-Tech-Meet/Landing-Page</code> (base: <code>main</code>
              ). An organiser reviews it, then it goes live.
            </p>
            <pre>{FRONTMATTER}</pre>
          </div>
        </div>

        <div className="note solo">
          <h3>Using an AI coding agent?</h3>
          <p>
            Cursor, Claude, Copilot, and similar tools can run this flow for you.
            Fork the repo first, open <em>your</em> fork in the agent, and ask it
            to add the markdown file on a <code>feature/…</code> branch and open
            the pull request. Full prompts and rules are in{" "}
            <a href={site.contributing} target="_blank" rel="noopener noreferrer">
              CONTRIBUTING.md
            </a>
            .
          </p>
        </div>

        <p className="page-intro" style={{ marginTop: 36, marginBottom: 0 }}>
          Stuck?{" "}
          <a href={`mailto:${site.email}`}>Email us</a> or{" "}
          <a href={site.newIssue} target="_blank" rel="noopener noreferrer">
            raise an issue
          </a>
          .
        </p>
      </div>
    </section>
  );
}
