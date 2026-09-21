# Contributing

Thank you for wanting to share an idea with the community! This site is intentionally simple: **every post is a markdown file**, and **every contribution is a pull request**. No databases, no API keys.

You only need [Git](https://git-scm.com/downloads) installed and a GitHub account. No coding knowledge is required.

## 1. Clone the repository and create a branch

1. Clone the repository and move into it:
   ```bash
   git clone https://github.com/Thimphu-Tech-Meet/Landing-Page.git
   cd Landing-Page
   ```
2. Make sure you are on the latest `main`, then create a branch for your change:
   ```bash
   git checkout main
   git pull
   git checkout -b feature/<feature-name>
   ```

**Branch naming rule:** every branch **must** be named `feature/<feature-name>`, using lowercase words separated by hyphens — for example `feature/my-great-idea`. Pull requests from branches that do not follow this pattern will be asked to rename before review. Never commit directly to `main`.

## 2. Add your markdown file

1. Open the `content` folder.
2. Create a new file.
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
github: "your-github-username"
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
- `tags` is **optional** — a short list of labels shown on the post list, e.g. `tags: ["Agents", "Infra"]`. Tag an event write-up (a talk, fireside chat or roundtable) with `"Event"`: those posts are listed on the **Events** page instead of **Ideas**.
- `github` is **optional** — your GitHub username, e.g. `github: "compressionmonkey"`. When set, your name on the post links to your profile.

**Images:** place image files in the `public/images` folder and reference them as `/images/your-file.png`. Remote image URLs (`https://…`) also work.

### Meetups (organisers)

The **Meetups** page and the **Next meetup** card on the home page are built from `content/meetups/*.md`, one file per session. Only `title` and `date` are required; a meetup dated today or later becomes the "next meetup". Photos and short videos go under `public/Meetups/<month-year>/` and are listed in the frontmatter. Match the folder's capitalisation exactly in `src`: URLs are case-sensitive once deployed.

```markdown
---
title: "Lightning talks"
date: "2026-10-03"
dayUnknown: false               # true if only the month is known
time: "14:00 – 17:00"          # optional, shown on the next-meetup card
location: "Norzin Lam, Thimphu" # optional, shown on the next-meetup card
going: 18                       # optional, RSVP count before the event
attended: 22                    # optional, headcount after the event
rsvp: "https://…"               # optional, where the RSVP button points
talks:
  - "Dzongkha OCR"                              # plain title, or:
  - title: "Persistent memory for agents"
    href: "/blog/persistent-memory-infrastructure-for-ai-agents"
photos:
  - src: "/Meetups/10-2026/03-10-2026.jpeg"
    alt: "The room during the first talk"       # for screen readers
    caption: "First talk"                       # short label on the tile
  - src: "/Meetups/10-2026/03-10-2026-demo.mp4" # .mp4/.webm render as video
---

A short write-up of the session. Markdown and links work here.
```

The first photo listed is used as the cover on the home page, so put the best one first.

## 3. Commit and push your branch

```bash
git add content/my-great-idea.md
git commit -m "Add post: my-great-idea"
git push -u origin feature/my-great-idea
```

If you added images, include them in the `git add` step as well.

## 4. Open a pull request

1. Go to the [repository on GitHub](https://github.com/Thimphu-Tech-Meet/Landing-Page). A **Compare & pull request** banner appears for your pushed branch — click it. (Or go to **Pull requests → New pull request** and select your `feature/…` branch.)
2. Make sure the base branch is `main`.
3. Give your PR a short title like `Add post: my-great-idea` and a one-line description, then submit.

## Review and approval

For now, pull requests are reviewed and approved by **Kelden**. Maintainer roles will be assigned to more community members soon. If changes are requested, push more commits to the same branch — the PR updates automatically.

Once merged:

- the site rebuilds automatically with your post live, and
- your GitHub avatar is added to `CONTRIBUTORS.md` automatically.

## Running the site locally (optional)

If you'd like to preview your post before submitting, run this from inside your cloned `Landing-Page` folder (requires [Node.js](https://nodejs.org)):

```bash
npm install
npm run dev
```

Open http://localhost:3000 — no environment variables or API keys needed.

## Ground rules

- Be kind and constructive. Ideas are welcome from everyone, regardless of experience.
- Only submit content you have the right to share.
- One idea per pull request keeps reviews quick.
