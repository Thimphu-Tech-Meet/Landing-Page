import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

/**
 * All user-contributed posts live in the root /content folder as plain
 * markdown files. The application code never leaves this directory —
 * keeping content and code cleanly separated for contributors.
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
}

export interface Post {
  slug: string;
  frontmatter: PostFrontmatter;
  /** Raw markdown body (frontmatter stripped), ready for MDX rendering. */
  content: string;
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
    // gray-matter may parse `date` into a Date object; normalize to string.
    frontmatter: {
      ...(frontmatter as PostFrontmatter),
      date: new Date(frontmatter.date).toISOString().slice(0, 10),
    },
    content,
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
