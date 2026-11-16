import Link from "next/link";
import { getIdeaPosts } from "@/lib/posts";
import { coverPhoto, getNextMeetup, getPastMeetups, type Meetup } from "@/lib/meetups";
import { dateParts, formatDate, formatDateWithWeekday } from "@/lib/format";
import { PhotoTile } from "@/components/photo-tile";
import { site, weekly } from "@/lib/site";
import { VenuePhoto } from "@/components/venue";
import { featuredWork } from "@/lib/projects";
import { people } from "@/lib/people";

const HERO_PHOTO_SIZES = "(max-width: 820px) calc(100vw - 40px), 420px";

/**
 * Home: hero → next meetup → work → recent meetups → people → writing → connect.
 * Fully static — rendered once at build time from /content and curated lists.
 */
export default function HomePage() {
  const posts = getIdeaPosts();
  const past = getPastMeetups();
  const next = getNextMeetup();

  return (
    <>
      <section className="hero">
        <div className="wrap">
          <div className="eyebrow">Thimphu · since 2025</div>
          <h1>
            People who build things, <em>in the same room</em> every Saturday.
          </h1>
          <p className="lede">
            A community of developers, researchers, and curious builders in
            Bhutan. We meet every Saturday to share projects, explore ideas, and
            learn together—from software engineering to AI and artificial life.
          </p>
          <div className="actions">
            <a className="btn primary" href="#work">
              Explore our work
            </a>
            <a className="btn" href="#next-meetup">
              Join a meetup
            </a>
          </div>
        </div>
      </section>

      <section id="next-meetup" className="next-section">
        <div className="wrap next-layout">
          <div>
            <div className="section-head">
              <h2>Next meetup</h2>
            </div>
            <NextMeetupDetails meetup={next} />
          </div>
          <aside className="next">
            <VenuePhoto priority sizes={HERO_PHOTO_SIZES} />
          </aside>
        </div>
      </section>

      <section id="work">
        <div className="wrap">
          <div className="section-head">
            <h2>Projects &amp; explorations</h2>
            <Link href="/ideas">All writing →</Link>
          </div>
          <div className="work-grid">
            {featuredWork.map((item) => (
              <article key={item.href} className="work-card">
                <div className="eyebrow">{item.kind}</div>
                <h3>
                  <Link href={item.href}>{item.title}</Link>
                </h3>
                <p>{item.description}</p>
                <div className="work-meta">
                  {item.contributors && item.contributors.length > 0 && (
                    <span className="mono plain">
                      {item.contributors.join(", ")}
                    </span>
                  )}
                  {item.status && <span className="tag">{item.status}</span>}
                </div>
                <Link className="work-link" href={item.href}>
                  {item.linkLabel} →
                </Link>
              </article>
            ))}
          </div>
        </div>
      </section>

      {past.length > 0 && (
        <section id="recent-meetups">
          <div className="wrap">
            <div className="section-head">
              <h2>Recent meetups</h2>
              <Link href="/meetups">Full archive →</Link>
            </div>
            <div className="meetup-cards">
              {past.slice(0, 3).map((m, i) => {
                const { day, monthShort, year } = dateParts(m.frontmatter.date);
                const when = m.frontmatter.dayUnknown
                  ? `${monthShort} ${year}`
                  : formatDate(m.frontmatter.date);
                const blurb = meetupBlurb(m.content);
                return (
                  <Link
                    key={m.slug}
                    className="meetup-card"
                    href={`/meetups#${m.slug}`}
                  >
                    <PhotoTile
                      media={coverPhoto(m)}
                      index={i + 2}
                      label={when}
                      sizes="(max-width: 820px) calc(100vw - 40px), 320px"
                    />
                    <h3>{m.frontmatter.title}</h3>
                    {blurb && <p>{blurb}</p>}
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}

      {people.length > 0 && (
        <section id="people">
          <div className="wrap">
            <div className="section-head">
              <h2>People</h2>
            </div>
            <ul className="people-list">
              {people.map((person) => (
                <li key={person.name}>
                  <b>{person.name}</b>
                  <p>{person.blurb}</p>
                  <a
                    href={person.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {person.linkLabel} ↗
                  </a>
                </li>
              ))}
            </ul>
          </div>
        </section>
      )}

      <section id="writing">
        <div className="wrap">
          <div className="section-head">
            <h2>Articles &amp; notes</h2>
            <Link href="/ideas">All ideas →</Link>
          </div>
          <div className="posts posts-compact">
            {posts.slice(0, 3).map((post) => (
              <article key={post.slug} className="post">
                <time className="date" dateTime={post.frontmatter.date}>
                  {formatDate(post.frontmatter.date)}
                </time>
                <div>
                  <h3>
                    <Link href={`/blog/${post.slug}`}>
                      {post.frontmatter.title}
                    </Link>
                  </h3>
                  <p>{post.frontmatter.description}</p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="connect" className="connect">
        <div className="wrap connect-grid">
          <div>
            <div className="eyebrow">Connect</div>
            <h2>Stay in touch</h2>
            <p>
              Outside Bhutan? We welcome guest speakers, project feedback, and
              connections with other technical communities.
            </p>
            <div className="actions">
              <a className="btn primary" href={`mailto:${site.email}`}>
                Email {site.email}
              </a>
              <a className="btn" href="#next-meetup">
                Join locally
              </a>
            </div>
          </div>
          <div className="note plain">
            <h3>In Thimphu</h3>
            <p>
              Walk in on {weekly.day.toLowerCase()}, {weekly.time}, at the{" "}
              <a href={weekly.map} target="_blank" rel="noopener noreferrer">
                {weekly.place}
              </a>
              . No sign-up required.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}

/** First non-empty paragraph of a meetup write-up, trimmed for a card. */
function meetupBlurb(markdown: string): string | undefined {
  const para = markdown
    .split(/\n\s*\n/)
    .map((p) =>
      p
        .replace(/\[([^\]]+)\]\([^)]+\)/g, "$1")
        .replace(/[#>*_`]/g, "")
        .replace(/\s+/g, " ")
        .trim()
    )
    .find(Boolean);
  if (!para) return undefined;
  return para.length > 140 ? `${para.slice(0, 137).trimEnd()}…` : para;
}

function NextMeetupDetails({ meetup }: { meetup: Meetup | null }) {
  if (!meetup) {
    return (
      <div className="next-details">
        <p>
          No dated meetup is confirmed on the site yet. We usually gather{" "}
          {weekly.day.toLowerCase()}, {weekly.time}, at the{" "}
          <a href={weekly.map} target="_blank" rel="noopener noreferrer">
            {weekly.place}
          </a>
          . Email us for the next session or just walk in on Saturday.
        </p>
        <div className="when">
          <b>Usual time</b>
          <span>
            {weekly.day}, {weekly.time}
          </span>
          <b>Place</b>
          <span>
            <a href={weekly.map} target="_blank" rel="noopener noreferrer">
              {weekly.place} ↗
            </a>
          </span>
        </div>
        <div className="actions">
          <a className="btn primary" href={`mailto:${site.email}`}>
            Ask about the next meetup
          </a>
          <Link className="btn" href="/meetups">
            Past meetups
          </Link>
        </div>
      </div>
    );
  }

  const { title, date, time, going, rsvp } = meetup.frontmatter;
  const location = meetup.frontmatter.location ?? weekly.place;

  return (
    <div className="next-details">
      <h3>{title}</h3>
      <div className="when">
        <b>Date</b>
        <span>{formatDateWithWeekday(date)}</span>
        <b>Time</b>
        <span>{time ?? weekly.time}</span>
        <b>Place</b>
        <span>
          {location === weekly.place ? (
            <a href={weekly.map} target="_blank" rel="noopener noreferrer">
              {location} ↗
            </a>
          ) : (
            location
          )}
        </span>
      </div>
      <p className="mono plain">
        {going ? `${going} going · ` : ""}
        Casual · just walk in
      </p>
      <div className="actions">
        {rsvp ? (
          <a
            className="btn primary"
            href={rsvp}
            target="_blank"
            rel="noopener noreferrer"
          >
            RSVP
          </a>
        ) : (
          <a className="btn primary" href={`mailto:${site.email}`}>
            Email us
          </a>
        )}
        <Link className="btn" href="/meetups">
          Past meetups
        </Link>
      </div>
    </div>
  );
}
