import type { Metadata } from "next";
import Link from "next/link";
import { getEventPosts } from "@/lib/posts";
import { formatDate } from "@/lib/format";
import { site, weekly } from "@/lib/site";

export const metadata: Metadata = {
  title: "About",
  description:
    "What Thimphu Tech Meet is: casual Saturday meetups in Thimphu on AI, artificial life and autonomous agents, and an open, attributed knowledge base built by pull request.",
  alternates: { canonical: "/about" },
};

/** Who we are, what we talk about, how to join, and the events we have hosted. */
export default function AboutPage() {
  const events = getEventPosts();

  return (
    <section>
      <div className="wrap">
        <div className="eyebrow">About</div>
        <h1 className="page-title">A room for people who build things</h1>
        <p className="page-intro">
          Thimphu Tech Meet is a casual, open meetup for developers,
          researchers and tinkerers in Bhutan. The first session was in
          December 2025 and we have met most Saturdays since early 2026.
        </p>

        <div className="steps">
          <div className="step">
            <h3>What we talk about</h3>
            <p>
              Mostly AI: artificial life, emergence, particle attraction
              matrices, autonomous agents and the tooling around them. Some
              weeks someone gives a talk; most weeks it is a conversation
              around one laptop.
            </p>
          </div>
          <div className="step">
            <h3>An open, attributed knowledge base</h3>
            <p>
              Members publish their ideas as markdown posts on this site with
              their name attached, so anyone who builds on an idea can cite
              the person it came from. Every post is reviewed in the open.
            </p>
          </div>
          <div className="step">
            <h3>How to join</h3>
            <p>
              Come to the {weekly.place}, {weekly.day.toLowerCase()},{" "}
              {weekly.time}. No sign-up, just walk in. If you want to give a
              talk, <a href={`mailto:${site.email}`}>email us</a> a title.
            </p>
            <pre>{`${weekly.day} · ${weekly.time}\n${weekly.place}`}</pre>
          </div>
        </div>

        <div className="split">
          <div className="note">
            <h3>How to contribute</h3>
            <p>
              Add one markdown file to the <code>content</code> folder on a{" "}
              <code>feature/</code> branch and open a pull request. Ideas,
              meetup notes and event write-ups all work this way. See the{" "}
              <Link href="/contribute">contribute page</Link> or the{" "}
              <a href={site.contributing} target="_blank" rel="noopener noreferrer">
                full guidelines
              </a>
              .
            </p>
          </div>
          <div className="note plain" id="events">
            <h3>Events we have hosted</h3>
            {events.length === 0 ? (
              <p>No event write-ups yet.</p>
            ) : (
              <ul className="about-events">
                {events.map((post) => (
                  <li key={post.slug}>
                    <Link href={`/blog/${post.slug}`}>{post.frontmatter.title}</Link>
                    <span className="mono plain">{formatDate(post.frontmatter.date)}</span>
                  </li>
                ))}
              </ul>
            )}
            <p style={{ marginTop: 12 }}>
              <Link href="/events">All events →</Link>
            </p>
          </div>
        </div>

        <div className="actions-row">
          <a className="btn primary" href={weekly.map} target="_blank" rel="noopener noreferrer">
            Open the venue in Google Maps
          </a>
          <Link className="btn" href="/meetups">
            See past meetups
          </Link>
        </div>
      </div>
    </section>
  );
}
