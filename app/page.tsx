import Link from "next/link";
import { getIdeaPosts } from "@/lib/posts";
import { countPhotos, coverPhoto, getNextMeetup, getPastMeetups, type Meetup } from "@/lib/meetups";
import { dateParts, formatDateWithWeekday } from "@/lib/format";
import { PostList } from "@/components/post-list";
import { PhotoTile } from "@/components/photo-tile";
import { site, weekly } from "@/lib/site";
import { VenuePhoto } from "@/components/venue";
import { featuredWork } from "@/lib/projects";
import { people } from "@/lib/people";

const HERO_PHOTO_SIZES = "(max-width: 820px) calc(100vw - 40px), 420px";

/**
 * Home restores the original hero + next-meetup card composition, with
 * work, recent meetups, people, writing, and connect layered below.
 */
export default function HomePage() {
  const posts = getIdeaPosts();
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
          <NextMeetupCard meetup={next} />
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
              <Link href="/meetups">
                Full archive
                {photoCount > 0 ? ` · ${photoCount} photos` : ""} →
              </Link>
            </div>
            <div className="strip">
              {past.slice(0, 4).map((m, i) => {
                const { day, monthShort } = dateParts(m.frontmatter.date);
                const when = m.frontmatter.dayUnknown
                  ? monthShort
                  : `${String(day).padStart(2, "0")} ${monthShort}`;
                return (
                  <Link
                    key={m.slug}
                    href={`/meetups#${m.slug}`}
                    aria-label={m.frontmatter.title}
                  >
                    <PhotoTile
                      media={coverPhoto(m)}
                      index={i + 2}
                      label={`${when} · ${m.frontmatter.title}`}
                      sizes="(max-width: 639px) 50vw, 25vw"
                    />
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
          <PostList posts={posts.slice(0, 3)} />
        </div>
      </section>

      <section id="connect" className="connect">
        <div className="wrap connect-grid">
          <div>
            <div className="eyebrow">Connect</div>
            <h2>Outside Bhutan?</h2>
            <p>
              We welcome guest speakers, project feedback, and connections with
              other technical communities.
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

function NextMeetupCard({ meetup }: { meetup: Meetup | null }) {
  if (!meetup) {
    return (
      <aside className="next" id="next-meetup">
        <VenuePhoto priority sizes={HERO_PHOTO_SIZES} />
        <div className="eyebrow">Next meetup</div>
        <h3>{weekly.day}</h3>
        <p>
          No dated session is confirmed on the site yet. Usual time and place
          below—email us to confirm, or walk in on Saturday.
        </p>
        <div className="when">
          <b>Time</b>
          <span>{weekly.time}</span>
          <b>Place</b>
          <span>
            <a href={weekly.map} target="_blank" rel="noopener noreferrer">
              {weekly.place} ↗
            </a>
          </span>
        </div>
        <div className="foot">
          <span className="mono plain">Casual · just walk in</span>
          <a className="btn small" href={`mailto:${site.email}`}>
            Email us
          </a>
        </div>
      </aside>
    );
  }

  const { title, date, time, going, rsvp } = meetup.frontmatter;
  const location = meetup.frontmatter.location ?? weekly.place;

  return (
    <aside className="next" id="next-meetup">
      <VenuePhoto priority sizes={HERO_PHOTO_SIZES} />
      <div className="eyebrow">Next meetup</div>
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
      <div className="foot">
        {going ? (
          <div className="going">
            <div className="avatars" aria-hidden="true">
              <i /><i /><i />
            </div>
            <span className="mono plain">{going} going</span>
          </div>
        ) : (
          <span className="mono plain">Casual · just walk in</span>
        )}
        {rsvp ? (
          <a className="btn small" href={rsvp} target="_blank" rel="noopener noreferrer">
            RSVP
          </a>
        ) : (
          <a className="btn small" href={`mailto:${site.email}`}>
            Email us
          </a>
        )}
      </div>
    </aside>
  );
}
