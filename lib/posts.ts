import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { readingTime } from "./format";

/**
 * All user-contributed posts live in the root /content folder as plain
 * markdown files. The application code never leaves this directory —
 * keeping content and code cleanly separated for contributors.
 * (Sub-folders such as /content/meetups are ignored here.)
 */
const CONTENT_DIR = path.join(process.cwd(), "content");

/** Frontmatter fields every post must provide (enforced at build time). */
export interface PostFrontmatter {
  title: string;
  description: string;
  author: string;
  /** ISO 8601 date string, e.g. "2025-01-15". */
  date: string;
  /** Optional external link — the idea or resource the post is about. */
  link?: string;
  /** Optional short labels shown on the post list, e.g. ["Agents", "Infra"]. */
  tags?: string[];
  /**
   * Optional GitHub handle ("compressionmonkey") or profile URL. When set,
   * the author's name links straight to their profile.
   */
  github?: string;
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  /** Raw markdown body (frontmatter stripped), ready for MDX rendering. */
  content: string;
  /** Estimated reading time in minutes. */
  minutes: number;
  /** Full GitHub profile URL derived from `github`, or undefined. */
  authorUrl?: string;
}

/** Returns every post slug derived from markdown filenames in /content. */
export function getPostSlugs(): string[] {
  if (!fs.existsSync(CONTENT_DIR)) return [];

  return fs
    .readdirSync(CONTENT_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

/**
 * Contributors sometimes write `link: "null"` or leave the field empty.
 * Only keep values that are real http(s) URLs.
 */
function normalizeLink(link: unknown): string | undefined {
  if (typeof link !== "string") return undefined;
  const trimmed = link.trim();
  return /^https?:\/\//i.test(trimmed) ? trimmed : undefined;
}

/**
 * Accepts "handle", "@handle" or "https://github.com/handle" and returns
 * the canonical profile URL. Anything that is not a valid handle is dropped.
 */
export function githubProfileUrl(github: unknown): string | undefined {
  if (typeof github !== "string") return undefined;
  let handle = github.trim().replace(/^@/, "");
  const match = handle.match(/^https?:\/\/(?:www\.)?github\.com\/([^/?#]+)/i);
  if (match) handle = match[1];
  return /^[a-z\d](?:[a-z\d]|-(?=[a-z\d])){0,38}$/i.test(handle)
    ? `https://github.com/${handle}`
    : undefined;
}

function normalizeTags(tags: unknown): string[] | undefined {
  if (!Array.isArray(tags)) return undefined;
  const clean = tags.map(String).map((t) => t.trim()).filter(Boolean);
  return clean.length ? clean : undefined;
}

/**
 * Reads and parses a single post by slug.
 * Returns null when the file does not exist so callers can 404.
 * Throws on missing required frontmatter so broken contributions
 * fail loudly at build time instead of silently at runtime.
 */
export function getPostBySlug(slug: string): Post | null {
  const filePath = path.join(CONTENT_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);

  const frontmatter = data as Partial<PostFrontmatter>;
  if (!frontmatter.title || !frontmatter.description || !frontmatter.author || !frontmatter.date) {
    throw new Error(
      `Post "${slug}.md" is missing required frontmatter fields ` +
        `(title, description, author, date). See CONTRIBUTING.md for the template.`
    );
  }

  return {
    slug,
    frontmatter: {
      title: String(frontmatter.title),
      description: String(frontmatter.description),
      author: String(frontmatter.author),
      // gray-matter may parse `date` into a Date object; normalize to string.
      date: new Date(frontmatter.date).toISOString().slice(0, 10),
      link: normalizeLink(frontmatter.link),
      tags: normalizeTags(frontmatter.tags),
      github: typeof frontmatter.github === "string" ? frontmatter.github : undefined,
    },
    content,
    minutes: readingTime(content),
    authorUrl: githubProfileUrl(frontmatter.github),
  };
}

/** All posts, newest first. Used by the index page and generateStaticParams. */
export function getAllPosts(): Post[] {
  return getPostSlugs()
    .map((slug) => getPostBySlug(slug))
    .filter((post): post is Post => post !== null)
    .sort(
      (a, b) =>
        new Date(b.frontmatter.date).getTime() -
        new Date(a.frontmatter.date).getTime()
    );
}

/**
 * Posts tagged "Event" (any capitalisation) are write-ups of talks and
 * roundtables rather than ideas. They are listed on /events and kept out
 * of the Ideas list; the post page itself works the same for both.
 */
export const EVENT_TAG = "Event";

export function isEventPost(post: Post): boolean {
  return (post.frontmatter.tags ?? []).some(
    (tag) => tag.toLowerCase() === EVENT_TAG.toLowerCase()
  );
}

/** Event write-ups, newest first. */
export function getEventPosts(): Post[] {
  return getAllPosts().filter(isEventPost);
}

/** Everything that is not an event write-up, newest first. */
export function getIdeaPosts(): Post[] {
  return getAllPosts().filter((post) => !isEventPost(post));
}
