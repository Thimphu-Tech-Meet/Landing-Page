import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllPosts, getPostBySlug } from "@/lib/posts";
import { mdxComponents } from "@/components/mdx-components";

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

  const { title, author, date, link } = post.frontmatter;

  return (
    <article>
      <Link
        href="/"
        className="text-sm text-neutral-500 underline-offset-4 hover:underline"
      >
        ← All ideas
      </Link>

      <h1 className="mt-4 text-3xl font-bold tracking-tight">{title}</h1>

      <p className="mt-3 text-sm text-neutral-500">
        By {author} ·{" "}
        <time dateTime={date}>
          {new Date(date).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </time>
      </p>

      {link && (
        <p className="mt-4 rounded-md border border-blue-100 bg-blue-50 px-4 py-3 text-sm">
          Linked resource:{" "}
          <a
            href={link}
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-blue-700 underline underline-offset-4"
          >
            {link}
          </a>
        </p>
      )}

      <div className="mt-8">
        {/* MDXRemote (RSC flavour) renders the markdown server-side.
            mdxComponents maps <img> to next/image and styles primitives. */}
        <MDXRemote source={post.content} components={mdxComponents} />
      </div>
    </article>
  );
}
