# Thimphu Tech Meet — Community Blog

A community-driven, file-based blog. No databases, no CMS, no API keys — **every post is a markdown file, and every contribution is a pull request.**

## Contribute in 4 steps

### 1. Clone the repo and create a branch

```bash
git clone https://github.com/Thimphu-Tech-Meet/Landing-Page.git
cd Landing-Page
git checkout -b feature/<feature-name>
```

Branch names **must** follow the `feature/<feature-name>` pattern — e.g. `feature/my-great-idea`. Never commit directly to `main`.

### 2. Add one markdown file to `content/`

Create a new file in the `content` folder. Name it with lowercase hyphenated words — the filename becomes your post's URL (`content/my-great-idea.md` → `/blog/my-great-idea`). Paste this template and fill it in:

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

`title`, `description`, `author`, and `date` (`YYYY-MM-DD`) are required — the build fails without them. `link` and `tags` are optional; delete the lines if you don't need them.

Meetups are recorded the same way: one markdown file per session in `content/meetups/`. See [CONTRIBUTING.md](CONTRIBUTING.md#meetups-organisers) for the fields.

### 3. Commit and push your branch

```bash
git add content/my-great-idea.md
git commit -m "Add post: my-great-idea"
git push -u origin feature/my-great-idea
```

### 4. Open a pull request

Go to the [repository on GitHub](https://github.com/Thimphu-Tech-Meet/Landing-Page) — GitHub will show a **Compare & pull request** button for your pushed branch. Give the PR a short title like `Add post: my-great-idea`, set the base branch to `main`, and submit.

> **Review & approval:** for now, pull requests are reviewed and approved by **Kelden**. Maintainer roles will be assigned to more community members soon. Once your PR is merged, the site redeploys automatically with your post live.

## How you get credited

You get credited in two places, and you don't need to open a separate PR for either.

**1. On your post.** The `author` value in your post's frontmatter is displayed on the post page. Use whatever name you want shown — your real name or your GitHub username.

**2. In [CONTRIBUTORS.md](CONTRIBUTORS.md), automatically.** When your pull request is merged into `main`, a GitHub Action rebuilds the contributor grid in `CONTRIBUTORS.md` and adds your GitHub avatar and username. There is nothing to do on your end. A few details:

- The grid is built from commit authorship, so the email on your commits must be linked to your GitHub account. Check with `git config user.email` and make sure that address is listed under **Settings → Emails** on GitHub — otherwise the commit shows up as an anonymous author and you won't appear.
- It usually appears within a minute or two of the merge. If you're missing after that, [raise an issue](../../issues/new) and a maintainer will look into it.
- Please don't edit the grid by hand — the action overwrites it on the next merge.

## Questions?

[Raise an issue](../../issues/new) and we will look into it.

For the full details — images, frontmatter rules, ground rules — see [CONTRIBUTING.md](CONTRIBUTING.md).

You can also email any of the maintainers to ask.

## Running the site locally (optional)

From inside your cloned `Landing-Page` folder:

```bash
npm install
npm run dev
```

Open http://localhost:3000 — no environment variables needed. Built with Next.js (static export), Tailwind CSS, and MDX; deployed on Vercel.
