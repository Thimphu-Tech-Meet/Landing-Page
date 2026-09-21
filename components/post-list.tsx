import Link from "next/link";
import type { Post } from "@/lib/posts";
import { formatDate } from "@/lib/format";

/** Editorial list of posts: date · title/description/tags · author. */
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
          <Link key={post.slug} className="post" href={`/blog/${post.slug}`}>
            <time className="date" dateTime={date}>
              {formatDate(date)}
            </time>
            <div>
              <h3>{title}</h3>
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
              <b>{author}</b>
              Member
            </div>
          </Link>
        );
      })}
    </div>
  );
}
