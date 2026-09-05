import Link from "next/link";
import { getAllPosts } from "@/lib/posts";

/**
 * Landing page: a reverse-chronological list of every contributed post.
 * Fully static — rendered once at build time from the /content folder.
 */
export default function HomePage() {
  const posts = getAllPosts();

  return (
    <section>
      <h1 className="text-3xl font-bold tracking-tight">Community ideas</h1>
      <p className="mt-3 text-neutral-600">
        Every post below is a markdown file in this repository, contributed by
        a community member via pull request.
      </p>

      <ul className="mt-10 space-y-8">
        {posts.map((post) => (
          <li key={post.slug} className="group">
            <article>
              <Link href={`/blog/${post.slug}`}>
                <h2 className="text-xl font-semibold group-hover:text-blue-600">
                  {post.frontmatter.title}
                </h2>
              </Link>
              <p className="mt-1 text-neutral-600">
                {post.frontmatter.description}
              </p>
              <p className="mt-2 text-sm text-neutral-500">
                {post.frontmatter.author} ·{" "}
                <time dateTime={post.frontmatter.date}>
                  {post.frontmatter.date}
                </time>
              </p>
            </article>
          </li>
        ))}
      </ul>
    </section>
  );
}
