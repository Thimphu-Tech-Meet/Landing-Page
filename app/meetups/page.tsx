import type { Metadata } from "next";
import Link from "next/link";
import { MDXRemote } from "next-mdx-remote/rsc";
import { getAllMeetups, type Meetup } from "@/lib/meetups";
import { dateParts } from "@/lib/format";
import { PhotoTile } from "@/components/photo-tile";
import { mdxComponents } from "@/components/mdx-components";

export const metadata: Metadata = {
  title: "Meetups",
  description:
    "Every Thimphu Tech Meet session we have held, newest first, with photos and talks.",
  alternates: { canonical: "/meetups" },
};

/** Timeline of every meetup (including any upcoming one), newest first. */
export default function MeetupsPage() {
  const meetups = getAllMeetups();

  return (
    <section>
      <div className="wrap">
        <div className="eyebrow">Meetups</div>
        <h1 className="page-title">Time together, on record</h1>
        <p className="page-intro">
          Every session we&apos;ve held, newest first. Photos are added by
          organisers after each meetup; send yours to an organiser and
          we&apos;ll include them.
        </p>

        {meetups.length === 0 ? (
          <p className="timeline-empty">
            No meetups recorded yet. The first one goes here.{" "}
            <Link href="/contribute">Want to help organise it? →</Link>
          </p>
        ) : (
          <div className="timeline">
            {meetups.map((m) => (
              <MeetupEvent key={m.slug} meetup={m} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}

function MeetupEvent({ meetup }: { meetup: Meetup }) {
  const { title, date, attended, online, talks = [], photos = [] } = meetup.frontmatter;
  const { day, monthShort, year } = dateParts(date);
  const hasStats = attended !== undefined || online || photos.length > 0 || talks.length > 0;

  return (
    <div className="event" id={meetup.slug}>
      <div className="when">
        <div>
          <div className="n">{String(day).padStart(2, "0")}</div>
          <div className="m">
            {monthShort} {year}
          </div>
        </div>
        {hasStats && (
          <div className="stats">
            {attended !== undefined && (
              <span>
                <b>{attended}</b> attended
              </span>
            )}
            {online && (
              <span>
                <b>—</b> online
              </span>
            )}
            {photos.length > 0 && (
              <span>
                <b>{photos.length}</b> {photos.length === 1 ? "photo" : "photos"}
              </span>
            )}
            {talks.length > 0 && (
              <span>
                <b>{talks.length}</b> {talks.length === 1 ? "talk" : "talks"}
              </span>
            )}
          </div>
        )}
      </div>

      <div>
        <h3>{title}</h3>
        {meetup.content && (
          <div className="body">
            <MDXRemote source={meetup.content} components={mdxComponents} />
          </div>
        )}
        {talks.length > 0 && (
          <div className="talks">
            {talks.map((t) => (
              <span key={t}>{t}</span>
            ))}
          </div>
        )}
        <div className="gallery">
          {photos.length === 0 ? (
            <div className="none">No photos yet. Send yours to an organiser and we&apos;ll add them.</div>
          ) : (
            photos.map((p, i) => (
              <PhotoTile
                key={p.src}
                photo={p}
                index={i}
                sizes="(max-width: 820px) 100vw, 50vw"
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}
