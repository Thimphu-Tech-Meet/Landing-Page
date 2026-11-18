import Link from "next/link";
import { getIdeaPosts } from "@/lib/posts";
import { countPhotos, coverPhoto, getNextMeetup, getPastMeetups, type Meetup } from "@/lib/meetups";
import { dateParts, formatDateWithWeekday } from "@/lib/format";
import { PostList } from "@/components/post-list";
import { PhotoTile } from "@/components/photo-tile";
import { site, weekly } from "@/lib/site";
import { VenuePhoto } from "@/components/venue";
import { SocialProof } from "@/components/social-proof";
import { featuredWork } from "@/lib/projects";
import { people } from "@/lib/people";

const HERO_PHOTO_SIZES = "(max-width: 820px) calc(100vw - 40px), 420px";

const TALK_MAILTO = `mailto:${site.email}?subject=${encodeURIComponent(
  "Talk proposal"
)}&body=${encodeURIComponent(
  [
    "Hi Thimphu Tech Meet,",
    "",
    "I'd like to present something at a Saturday session.",
    "",
    "Title:",
    "What I'll show or discuss (2–3 sentences):",
    "Preferred Saturday (or 'any week'):",
    "Format: remote video / in person",
    "",
    "Thanks!",
  ].join("\n")
)}`;

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
            <div className="strip strip-lg">
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
                      sizes="(max-width: 639px) 100vw, (max-width: 899px) 50vw, 50vw"
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
              <Link href="/contribute">Write with us →</Link>
            </div>
            <ul className="people-grid">
              {people.map((person) => (
                <li key={person.name}>
                  <a
                    className="person-card"
                    href={person.href}
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    {person.avatar ? (
                      <img
                        className="person-avatar"
                        src={person.avatar}
                        alt=""
                        width={56}
                        height={56}
                        loading="lazy"
                        decoding="async"
                      />
                    ) : (
                      <span className="person-avatar person-avatar-fallback" aria-hidden="true">
                        {person.name.slice(0, 1)}
                      </span>
                    )}
                    <span className="person-copy">
                      <b>{person.name}</b>
                      <span>{person.blurb}</span>
                    </span>
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

      <SocialProof />

      <section id="connect" className="connect">
        <div className="wrap">
          <div className="eyebrow">Connect</div>
          <h2>Outside Bhutan?</h2>
          <p className="connect-lede">
            Two easy ways in: join the weekly chat, or bring something to share
            with the room.
          </p>

          <div className="connect-intents">
            <a
              className="connect-intent"
              href={`mailto:${site.email}?subject=${encodeURIComponent("Join the chat")}`}
            >
              <span className="eyebrow">Stay in the loop</span>
              <h3>Join the chat</h3>
              <p>
                Email us and we&apos;ll add you, so you hear what&apos;s happening
                each week.
              </p>
              <span className="connect-intent-cta">Email to join →</span>
            </a>
            <a
              className="connect-intent connect-intent-primary"
              href={TALK_MAILTO}
            >
              <span className="eyebrow">Share with the room</span>
              <h3>Present a talk or idea</h3>
              <p>
                Casual Saturday slot, about 10–20 minutes over video. Opens your
                email with a short template—title, what you&apos;ll show, and a
                preferred date.
              </p>
              <span className="connect-intent-cta">Propose a talk →</span>
            </a>
          </div>

          <ul className="connect-offers">
            <li>
              <a
                className="connect-offer"
                href={`mailto:${site.email}?subject=${encodeURIComponent("Project feedback")}`}
              >
                <h3>Get project feedback</h3>
                <p>Show what you&apos;re building and get honest notes from the room.</p>
                <span>Ask for feedback →</span>
              </a>
            </li>
            <li>
              <a className="connect-offer" href="/contribute">
                <h3>Publish a write-up</h3>
                <p>Turn an idea into a markdown post on the site via pull request.</p>
                <span>Write on the blog →</span>
              </a>
            </li>
            <li>
              <a
                className="connect-offer"
                href={`mailto:${site.email}?subject=${encodeURIComponent("Community partnership")}`}
              >
                <h3>Link communities</h3>
                <p>Cross-post an event or run a joint session with your meetup.</p>
                <span>Start a conversation →</span>
              </a>
            </li>
          </ul>

          <ul className="connect-channels" aria-label="Other ways to follow along">
            <li>
              <a href={site.luma} target="_blank" rel="noopener noreferrer">
                Luma ↗
              </a>
              <span>Event calendar</span>
            </li>
            <li>
              <a href={site.repo} target="_blank" rel="noopener noreferrer">
                GitHub ↗
              </a>
              <span>Posts &amp; code</span>
            </li>
            <li>
              <a href="/feed.xml">RSS</a>
              <span>New writing</span>
            </li>
            <li>
              <a href="#next-meetup">Join locally</a>
              <span>Saturdays in Thimphu</span>
            </li>
          </ul>
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
          If you want to join our chat, email us and we will add you in to stay
          on the loop of what&apos;s happening every week.
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
