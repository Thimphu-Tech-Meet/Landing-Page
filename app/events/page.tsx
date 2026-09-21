import type { Metadata } from "next";
import Link from "next/link";
import { getEventPosts } from "@/lib/posts";
import { PostList } from "@/components/post-list";

export const metadata: Metadata = {
  title: "Events",
  description:
    "Talks, fireside chats and roundtables hosted by the Thimphu Tech Meet community, with guests, topics and photos.",
  alternates: { canonical: "/events" },
};

/** Event write-ups (posts tagged "Event"), newest first. */
export default function EventsPage() {
  const events = getEventPosts();

  return (
    <section>
      <div className="wrap">
        <div className="eyebrow">Events</div>
        <h1 className="page-title">Talks and roundtables</h1>
        <p className="page-intro">
          Evenings with a guest: who came, what we talked about, and the
          photos. Our regular Saturday sessions are on the{" "}
          <Link href="/meetups">Meetups</Link> page; each event below is a
          markdown file tagged <code>Event</code>.
        </p>
        {events.length === 0 ? (
          <p className="posts-empty">
            No events written up yet. <Link href="/contribute">Add the first one →</Link>
          </p>
        ) : (
          <PostList posts={events} />
        )}
        <p style={{ marginTop: 28 }}>
          <Link className="btn" href="/about">
            About the community →
          </Link>
        </p>
      </div>
    </section>
  );
}
