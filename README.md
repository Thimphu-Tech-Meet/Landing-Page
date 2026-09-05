# Thimphu Tech Meet — Community Blog

A community-driven, file-based blog. No databases, no CMS, no API keys — **every post is a markdown file, and every contribution is a pull request.** You can do the whole thing in your browser on GitHub; no coding or installs required.

## Contribute in 3 steps

### 1. Fork this repo

Click **Fork** (top right of this page) to get your own copy.

### 2. Add one markdown file to `content/`

In your fork, open the `content` folder and click **Add file → Create new file**. Name it with lowercase hyphenated words — the filename becomes your post's URL (`content/my-great-idea.md` → `/blog/my-great-idea`). Paste this template and fill it in:

```markdown
---
title: "Your idea's title"
description: "One or two sentences summarizing the idea."
author: "Your name or GitHub username"
date: "2026-09-05"
link: "https://example.com/related-resource"
---

Write your idea here using normal markdown.
```

`title`, `description`, `author`, and `date` (`YYYY-MM-DD`) are required — the build fails without them. `link` is optional; delete the line if you don't need it.

### 3. Open a pull request

Click **Commit changes…**, then accept GitHub's offer to **create a pull request**. Done — a maintainer will review and merge it, and the site redeploys automatically with your post live.

> **Branch naming:** if you create a branch for your PR, name it `feature/<feature-name>` — e.g. `feature/my-great-idea`.

## How you get credited

- The `author` you put in the frontmatter is displayed on your post.
- Once your PR is merged, your GitHub avatar and username are **added automatically to [CONTRIBUTORS.md](CONTRIBUTORS.md)** by a GitHub Action — nothing to do on your end.

## Questions?

[Raise an issue](../../issues/new) and we will look into it.

For the full details — images, frontmatter rules, ground rules — see [CONTRIBUTING.md](CONTRIBUTING.md).

## Running the site locally (optional)

```bash
git clone https://github.com/<your-username>/Landing-Page.git
cd Landing-Page
npm install
npm run dev
```

Open http://localhost:3000 — no environment variables needed. Built with Next.js (static export), Tailwind CSS, and MDX; deployed on Vercel.
