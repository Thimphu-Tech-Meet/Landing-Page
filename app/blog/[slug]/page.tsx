import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { mdxComponents } from "@/components/mdx-components";
import { formatDate } from "@/lib/format";

interface BlogPostPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Static Site Generation: every markdown file in /content becomes a
 * pre-rendered HTML page at build time. No runtime data fetching,
 * no database, no CMS — the fastest possible response.
 */
export function generateStaticParams(): { slug: string }[] {
  return getAllPosts().map((post) => ({ slug: post.slug }));
}

// Pages for slugs that don't exist return 404 instead of being
// generated on demand, keeping the build output deterministic.
export const dynamicParams = false;

/**
 * Per-post SEO built natively from the markdown frontmatter:
 * title, description, author, publish date, canonical URL,
 * plus Open Graph and Twitter card tags for link previews.
 */
export async function generateMetadata({
  params,
}: BlogPostPageProps): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  const { title, description, author, date, link } = post.frontmatter;

  return {
    title,
    description,
    authors: [{ name: author }],
    alternates: {
      canonical: `/blog/${slug}`,
    },
    openGraph: {
      title,
      description,
      type: "article",
      publishedTime: date,
      authors: [author],
      url: `/blog/${slug}`,
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
    },
    // If the post points at an external resource, expose it to crawlers too.
    ...(link ? { other: { "external-link": link } } : {}),
  };
}

export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  const { title, author, date, link, tags } = post.frontmatter;
  const eyebrow = tags?.length ? `Idea · ${tags[0]}` : "Idea";
  const authorUrl = post.authorUrl;
  const handle = authorUrl?.split("/").pop();

  const authorName = authorUrl ? (
    <a href={authorUrl} target="_blank" rel="noopener noreferrer" title={`${author} on GitHub`}>
      <b>{author}</b>
    </a>
  ) : (
    <b>{author}</b>
  );

  return (
    <section>
      <div className="wrap">
        <article className="article">
          <Link href="/ideas" className="back">
            ← All ideas
          </Link>

          <div className="eyebrow">{eyebrow}</div>
          <h1>{title}</h1>

          <div className="meta">
            <span>By {authorName}</span>
            <span>
              <b>
                <time dateTime={date}>{formatDate(date)}</time>
              </b>
            </span>
            <span>{post.minutes} min read</span>
          </div>

          {link && (
            <aside className="linked">
              <span className="label">Linked resource</span>
              <a href={link} target="_blank" rel="noopener noreferrer">
                {link}
              </a>
            </aside>
          )}

          <div className="prose">
            {/* MDXRemote (RSC flavour) renders the markdown server-side.
                Typography comes from `.article .prose` in globals.css. */}
            <MDXRemote source={post.content} components={mdxComponents} />
          </div>

          <div className="author">
            <i aria-hidden="true">{author.trim().charAt(0).toUpperCase()}</i>
            <div>
              {authorUrl ? (
                <a href={authorUrl} target="_blank" rel="noopener noreferrer">
                  <b>{author}</b>
                  <span className="handle">@{handle} on GitHub</span>
                </a>
              ) : (
                <b>{author}</b>
              )}
              <p>
                Member of Thimphu Tech Meet. This post was contributed as a
                markdown file and reviewed in the open.{" "}
                <Link href="/ideas">More ideas →</Link>
              </p>
            </div>
          </div>
        </article>
      </div>
    </section>
  );
}
