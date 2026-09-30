import BlogPostPage, { generateMetadata as generateBlogMetadata } from "@/app/blog/[slug]/page";
import { getIdeaPosts, getPostBySlug, isEventPost } from "@/lib/posts";
import { notFound } from "next/navigation";

interface IdeaPostPageProps {
  params: Promise<{ slug: string }>;
}

/**
 * Idea posts are displayed in the /ideas index, but the canonical post route
 * is /blog/[slug]. This alias keeps /ideas/[slug] shareable too, so someone
 * following the "ideas" mental model does not land on the custom 404 page.
 */
export function generateStaticParams(): { slug: string }[] {
  return getIdeaPosts().map((post) => ({ slug: post.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: IdeaPostPageProps) {
  const { slug } = await params;
  const metadata = await generateBlogMetadata({ params: Promise.resolve({ slug }) });

  return {
    ...metadata,
    alternates: {
      ...metadata.alternates,
      canonical: `/blog/${slug}`,
    },
  };
}

export default async function IdeaPostPage({ params }: IdeaPostPageProps) {
  const { slug } = await params;
  const post = getPostBySlug(slug);

  if (!post || isEventPost(post)) notFound();

  return <BlogPostPage params={Promise.resolve({ slug })} />;
}
