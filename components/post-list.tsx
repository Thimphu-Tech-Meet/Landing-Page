import Link from "next/link";
import type { Post } from "@/lib/posts";
import { formatDate } from "@/lib/format";

/**
 * Editorial list of posts: date · title/description/tags · author.
 * The title link is stretched over the whole row (see `.post h3 a::after`
 * in globals.css) so the row stays clickable, while the author link sits
 * above it and goes straight to their GitHub profile.
 */
export function PostList({ posts }: { posts: Post[] }) {
  if (posts.length === 0) {
    return (
      <div className="posts">
        <p className="posts-empty">
          No ideas yet. <Link href="/contribute">Write the first one →</Link>
        </p>
      </div>
    );
  }

  return (
    <div className="posts">
      {posts.map((post) => {
        const { title, description, author, date, tags } = post.frontmatter;
        return (
          <article key={post.slug} className="post">
            <time className="date" dateTime={date}>
              {formatDate(date)}
            </time>
            <div>
              <h3>
                <Link href={`/blog/${post.slug}`}>{title}</Link>
              </h3>
              <p>{description}</p>
              <div className="meta">
                {tags?.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
                <span className="mono plain">{post.minutes} min read</span>
              </div>
            </div>
            <div className="by">
              {post.authorUrl ? (
                <a
                  href={post.authorUrl}
                  target="_blank"
                  rel="noopener noreferrer"
                  title={`${author} on GitHub`}
                >
                  <b>{author}</b>
                </a>
              ) : (
                <b>{author}</b>
              )}
              Member
            </div>
          </article>
        );
      })}
    </div>
  );
}
