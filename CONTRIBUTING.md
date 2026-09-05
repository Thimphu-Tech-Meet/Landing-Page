# Contributing

Thank you for wanting to share an idea with the community! This site is intentionally simple: **every post is a markdown file**, and **every contribution is a pull request**. No accounts, no databases, no API keys.

You do not need to install anything or know how to code. The whole process can be done in your browser on GitHub.

## 1. Fork the repository

1. Go to the [repository on GitHub](https://github.com/Thimphu-Tech-Meet/Landing-Page).
2. Click the **Fork** button (top right). This creates your own copy of the project under your GitHub account.

## 2. Add your markdown file

1. In **your fork**, open the `content` folder.
2. Click **Add file → Create new file**.
3. Name your file with lowercase words separated by hyphens, ending in `.md`, for example:
   ```
   content/my-great-idea.md
   ```
   This filename becomes the URL of your post (`/blog/my-great-idea`), so keep it short and meaningful.
4. Paste the template below into the file and fill in your own values.

### Post template

```markdown
---
title: "Your idea's title"
description: "One or two sentences summarizing the idea. This appears in search results and link previews."
author: "Your name or GitHub username"
date: "2025-03-01"
link: "https://example.com/related-resource"
---

Write your idea here using normal markdown.

## You can use headings

- bullet points
- **bold text**, [links](https://example.com), and images:

![A helpful caption for the image](/images/my-image.png)
```

**Frontmatter rules** (the block between the `---` lines):

- `title`, `description`, `author`, and `date` are **required**. The build fails if any are missing.
- `date` must use the `YYYY-MM-DD` format.
- `link` is **optional** — include it when your post is about an external resource. You may delete the line otherwise.

**Images:** place image files in the `public/images` folder of your fork and reference them as `/images/your-file.png`. Remote image URLs (`https://…`) also work.

## 3. Open a pull request

1. Scroll to the bottom and click **Commit changes…**, then **Commit changes** again.
2. GitHub will offer to **create a pull request** — click it, or go to the original repository and click **Pull requests → New pull request → compare across forks**.
3. Give your PR a short title like `Add post: my-great-idea` and submit.

That's it! A maintainer will review your post. Once merged:

- the site rebuilds automatically with your post live, and
- your GitHub avatar is added to `CONTRIBUTORS.md` automatically.

## Running the site locally (optional)

If you'd like to preview your post before submitting:

```bash
git clone https://github.com/<your-username>/Landing-Page.git
cd Landing-Page
npm install
npm run dev
```

Open http://localhost:3000 — no environment variables or API keys needed.

## Ground rules

- Be kind and constructive. Ideas are welcome from everyone, regardless of experience.
- Only submit content you have the right to share.
- One idea per pull request keeps reviews quick.
