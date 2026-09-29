# Thimphu Tech Meet — Community Blog

A community-driven, file-based blog. No databases, no CMS, no API keys — **every post is a markdown file, and every contribution is a pull request.**

## How to contribute

Anyone can contribute — whether you're down the road in Thimphu or halfway across the world. You don't need write access to this repo. Pick the path that fits how you like to work.

### For agents — if you're using Cursor, Claude, or another AI

If you use **Cursor**, **Claude**, **Copilot**, or a similar agent, it can do the branch, file, commit, and pull request for you.

**Before you start:** make sure your agent is authorized with GitHub (signed in / connected) so it can push to your fork and open a PR. Without that, it will get stuck at push or PR time.

Then:

1. [Fork this repository](https://github.com/Thimphu-Tech-Meet/Landing-Page/fork) into your account.
2. Open your fork in the agent.
3. Paste a prompt like the one below (swap in your own idea):

```text
Create a new PR branch feature/<short-name-for-my-idea>.

Add one markdown post under content/ following the frontmatter template in README.md.
Fill in title, description, author, github, and today's date (YYYY-MM-DD).
Write the post body in normal markdown — here is what I want to say:

<paste your idea here>

Keep the contribution rules from the README: branch names must follow
feature/<feature-name>, never commit directly to main, and push with
git push -u origin feature/<feature-name>.

When you are done, open a pull request against Thimphu-Tech-Meet/Landing-Page
with base branch main. Give the PR a short title like "Add post: <short-name>".
```

That's it. Prefer to do it yourself by hand? Use the steps below.

### For programmers — if you want to open the PR manually

Same outcome, just you run the git commands. Fork → clone → branch → add a markdown file → push → open a PR.

#### 1. Fork this repository

Click the button below to create your own copy under your GitHub account (or hit **Fork** on the [repository page](https://github.com/Thimphu-Tech-Meet/Landing-Page)):

[![Fork Thimphu-Tech-Meet/Landing-Page](https://img.shields.io/badge/Fork%20this%20repository-181717?style=for-the-badge&logo=github&logoColor=white)](https://github.com/Thimphu-Tech-Meet/Landing-Page/fork)

<details>
<summary>Need a visual walkthrough?</summary>

<br />

1. Open the [repository](https://github.com/Thimphu-Tech-Meet/Landing-Page).
2. Click **Fork** in the top-right (same as the button above).
3. Confirm — GitHub creates `https://github.com/<your-username>/Landing-Page`.

GitHub’s short guide (with screenshots): [Fork a repository](https://docs.github.com/en/pull-requests/collaborating-with-pull-requests/working-with-forks/fork-a-repo).
</details>

#### 2. Clone your fork

Clone **your** fork (replace `<your-username>` with your GitHub username):

```bash
git clone https://github.com/<your-username>/Landing-Page.git
cd Landing-Page
```

#### 3. Create a branch

```bash
git checkout -b feature/<feature-name>
```

Branch names **must** follow the `feature/<feature-name>` pattern — e.g. `feature/my-great-idea`. Never commit directly to `main`.

#### 4. Add one markdown file to `content/`

Create a new file in the `content` folder. Name it with lowercase hyphenated words — the filename becomes your post's URL (`content/my-great-idea.md` → `/blog/my-great-idea`). Paste this template and fill it in:

```markdown
---
title: "Your idea's title"
description: "One or two sentences summarizing the idea."
author: "Your name or GitHub username"
github: "your-github-username"
date: "2026-09-05"
link: "https://example.com/related-resource"
---

Write your idea here using normal markdown.
```

`title`, `description`, `author`, and `date` (`YYYY-MM-DD`) are required — the build fails without them. `link`, `tags` and `github` are optional; delete the lines if you don't need them. With `github` set, your name on the post links to your profile.

Meetups are recorded the same way: one markdown file per session in `content/meetups/`. See [CONTRIBUTING.md](CONTRIBUTING.md#meetups-organisers) for the fields.

#### 5. Commit and push your branch

```bash
git add content/my-great-idea.md
git commit -m "Add post: my-great-idea"
git push -u origin feature/<feature-name>
```

#### 6. Open a pull request

Go to the [upstream repository on GitHub](https://github.com/Thimphu-Tech-Meet/Landing-Page) — GitHub will show a **Compare & pull request** button for your pushed branch. Give the PR a short title like `Add post: my-great-idea`, set the base branch to `main`, and submit.

Once you open the PR, our automated Vercel integration posts a live preview link in the pull request comments so you (and reviewers) can see your change on a deployed site right away.

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
