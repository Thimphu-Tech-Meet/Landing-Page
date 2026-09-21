import type { Metadata } from "next";
import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { PostList } from "@/components/post-list";

export const metadata: Metadata = {
  title: "Ideas",
  description:
    "Every idea from the Thimphu Tech Meet community. Each post is a markdown file contributed via pull request and reviewed in public.",
  alternates: { canonical: "/ideas" },
};

/** All posts, newest first. */
export default function IdeasPage() {
  const posts = getAllPosts();

  return (
    <section>
      <div className="wrap">
        <div className="eyebrow">Ideas</div>
        <h1 className="page-title">Community ideas</h1>
        <p className="page-intro">
          Each post is a markdown file in the repository, contributed by a
          member via pull request. Anyone can write. Everything is reviewed in
          public.
        </p>
        <PostList posts={posts} />
        <p style={{ marginTop: 28 }}>
          <Link className="btn" href="/contribute">
            Write the next one →
          </Link>
        </p>
      </div>
    </section>
  );
}
