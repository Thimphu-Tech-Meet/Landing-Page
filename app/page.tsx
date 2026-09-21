import Link from "next/link";
import { getAllPosts } from "@/lib/posts";
import { countPhotos, getNextMeetup, getPastMeetups, type Meetup } from "@/lib/meetups";
import { dateParts, formatDateWithWeekday } from "@/lib/format";
import { PostList } from "@/components/post-list";
import { PhotoTile } from "@/components/photo-tile";

/**
 * Home: hero + next meetup, two doors (Ideas / Meetups), the latest
 * three ideas and a strip of recent meetup photos. Fully static —
 * rendered once at build time from the /content folder.
 */
export default function HomePage() {
  const posts = getAllPosts();
  const past = getPastMeetups();
  const next = getNextMeetup();
  const photoCount = countPhotos(past);

  return (
    <>
      <section className="hero">
        <div className="wrap grid">
          <div>
            <div className="eyebrow">Thimphu · since 2025</div>
            <h1>
              People who build things, <em>in the same room</em> once a month.
            </h1>
            <p className="lede">
              An open meetup for developers, researchers and tinkerers in Bhutan.
              We share ideas in writing, then argue about them over tea.
            </p>
            <div className="actions">
              <Link className="btn primary" href="/ideas">
                Read the ideas
              </Link>
              <Link className="btn" href="/meetups">
                See past meetups
              </Link>
            </div>
          </div>
          <NextMeetupCard meetup={next} />
        </div>
      </section>

      <section>
        <div className="wrap doors">
          <Link className="door read" href="/ideas">
            <div className="art" aria-hidden="true" />
            <div className="eyebrow">Ideas</div>
            <h3>Articles &amp; notes</h3>
            <p>
              Written by members, submitted as markdown, reviewed in the open.
              Slow thinking for a fast field.
            </p>
            <span className="cta">
              {posts.length} {posts.length === 1 ? "post" : "posts"} →
            </span>
          </Link>
          <Link className="door photos" href="/meetups">
            <div className="art" aria-hidden="true">
              <i /><i /><i /><i /><i /><i />
            </div>
            <div className="eyebrow">Meetups</div>
            <h3>Proof we showed up</h3>
            <p>
              Every session, photographed and dated. A running record of the
              community, newest first.
            </p>
            <span className="cta">
              {past.length} {past.length === 1 ? "meetup" : "meetups"}
              {photoCount > 0 && ` · ${photoCount} photos`} →
            </span>
          </Link>
        </div>
      </section>

      <section>
        <div className="wrap">
          <div className="section-head">
            <h2>Latest ideas</h2>
            <Link href="/ideas">All ideas →</Link>
          </div>
          <PostList posts={posts.slice(0, 3)} />
        </div>
      </section>

      {past.length > 0 && (
        <section>
          <div className="wrap">
            <div className="section-head">
              <h2>Recently, in person</h2>
              <Link href="/meetups">Full timeline →</Link>
            </div>
            <div className="strip">
              {past.slice(0, 4).map((m, i) => {
                const { day, monthShort } = dateParts(m.frontmatter.date);
                return (
                  <Link key={m.slug} href="/meetups" aria-label={m.frontmatter.title}>
                    <PhotoTile
                      photo={m.frontmatter.photos?.[0]}
                      index={i + 2}
                      label={`${String(day).padStart(2, "0")} ${monthShort} · ${m.frontmatter.title}`}
                    />
                  </Link>
                );
              })}
            </div>
          </div>
        </section>
      )}
    </>
  );
}

function NextMeetupCard({ meetup }: { meetup: Meetup | null }) {
  if (!meetup) {
    return (
      <aside className="next">
        <div className="eyebrow">Next meetup</div>
        <h3>Date to be announced</h3>
        <p>
          We are lining up the next session. Watch the repository, or put
          your name down to give a talk and we will build the evening around it.
        </p>
        <div className="foot">
          <span className="mono plain">Thimphu · in person</span>
          <Link className="btn small" href="/contribute">
            Propose a talk
          </Link>
        </div>
      </aside>
    );
  }

  const { title, date, time, location, going, rsvp } = meetup.frontmatter;

  return (
    <aside className="next">
      <div className="eyebrow">Next meetup</div>
      <h3>{title}</h3>
      <div className="when">
        <b>Date</b>
        <span>{formatDateWithWeekday(date)}</span>
        {time && (
          <>
            <b>Time</b>
            <span>{time}</span>
          </>
        )}
        {location && (
          <>
            <b>Place</b>
            <span>{location}</span>
          </>
        )}
      </div>
      <div className="foot">
        {going ? (
          <div className="going">
            <div className="avatars" aria-hidden="true">
              <i /><i /><i />
            </div>
            <span className="mono plain">{going} going</span>
          </div>
        ) : (
          <span className="mono plain">Everyone welcome</span>
        )}
        {rsvp ? (
          <a className="btn small" href={rsvp} target="_blank" rel="noopener noreferrer">
            RSVP
          </a>
        ) : (
          <Link className="btn small" href="/contribute">
            RSVP
          </Link>
        )}
      </div>
    </aside>
  );
}
