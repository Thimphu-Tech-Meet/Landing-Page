import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { todayIso } from "./format";

/**
 * Meetups live in /content/meetups as one markdown file per session.
 * The body is the write-up; the frontmatter carries the facts.
 * A meetup dated today or later is the "next meetup" shown on the home page.
 */
const MEETUPS_DIR = path.join(process.cwd(), "content", "meetups");

export interface MeetupPhoto {
  /** Path under /public (e.g. "/meetups/2026-09-05/IMG_0412.jpg") or a full URL. */
  src: string;
  alt?: string;
}

export interface MeetupFrontmatter {
  title: string;
  /** ISO 8601 date, e.g. "2026-09-05". */
  date: string;
  /** e.g. "14:00 – 17:00" — shown on the next-meetup card. */
  time?: string;
  /** e.g. "Norzin Lam, Thimphu" — shown on the next-meetup card. */
  location?: string;
  /** Headcount after the event. */
  attended?: number;
  /** RSVP count before the event. */
  going?: number;
  /** Where to RSVP for an upcoming meetup. Defaults to the contribute page. */
  rsvp?: string;
  /** Mark entries that were not in-person gatherings (e.g. "the blog goes live"). */
  online?: boolean;
  /** Talk titles given at the session. */
  talks?: string[];
  photos?: MeetupPhoto[];
}

export interface Meetup {
  slug: string;
  frontmatter: MeetupFrontmatter;
  /** Raw markdown body (frontmatter stripped). */
  content: string;
}

function normalizePhotos(photos: unknown): MeetupPhoto[] {
  if (!Array.isArray(photos)) return [];
  return photos
    .map((p) => {
      if (typeof p === "string") return { src: p };
      if (p && typeof p === "object" && typeof (p as MeetupPhoto).src === "string") {
        return { src: (p as MeetupPhoto).src, alt: (p as MeetupPhoto).alt };
      }
      return null;
    })
    .filter((p): p is MeetupPhoto => p !== null);
}

function toNumber(value: unknown): number | undefined {
  const n = Number(value);
  return Number.isFinite(n) && value !== undefined && value !== null && value !== "" ? n : undefined;
}

export function getMeetupSlugs(): string[] {
  if (!fs.existsSync(MEETUPS_DIR)) return [];
  return fs
    .readdirSync(MEETUPS_DIR)
    .filter((file) => file.endsWith(".md"))
    .map((file) => file.replace(/\.md$/, ""));
}

export function getMeetupBySlug(slug: string): Meetup | null {
  const filePath = path.join(MEETUPS_DIR, `${slug}.md`);
  if (!fs.existsSync(filePath)) return null;

  const raw = fs.readFileSync(filePath, "utf8");
  const { data, content } = matter(raw);
  const fm = data as Partial<MeetupFrontmatter>;

  if (!fm.title || !fm.date) {
    throw new Error(
      `Meetup "meetups/${slug}.md" is missing required frontmatter fields (title, date).`
    );
  }

  return {
    slug,
    frontmatter: {
      title: String(fm.title),
      date: new Date(fm.date).toISOString().slice(0, 10),
      time: fm.time ? String(fm.time) : undefined,
      location: fm.location ? String(fm.location) : undefined,
      attended: toNumber(fm.attended),
      going: toNumber(fm.going),
      rsvp: fm.rsvp ? String(fm.rsvp) : undefined,
      online: Boolean(fm.online),
      talks: Array.isArray(fm.talks) ? fm.talks.map(String).filter(Boolean) : [],
      photos: normalizePhotos(fm.photos),
    },
    content: content.trim(),
  };
}

/** Every meetup, newest first. */
export function getAllMeetups(): Meetup[] {
  return getMeetupSlugs()
    .map((slug) => getMeetupBySlug(slug))
    .filter((m): m is Meetup => m !== null)
    .sort((a, b) => b.frontmatter.date.localeCompare(a.frontmatter.date));
}

/** Meetups that have already happened (strictly before today), newest first. */
export function getPastMeetups(): Meetup[] {
  const today = todayIso();
  return getAllMeetups().filter((m) => m.frontmatter.date < today);
}

/** The soonest meetup dated today or later, or null if none is scheduled. */
export function getNextMeetup(): Meetup | null {
  const today = todayIso();
  const upcoming = getAllMeetups()
    .filter((m) => m.frontmatter.date >= today)
    .sort((a, b) => a.frontmatter.date.localeCompare(b.frontmatter.date));
  return upcoming[0] ?? null;
}

/** Total photos across all meetups — used for the "N photos" counter. */
export function countPhotos(meetups: Meetup[]): number {
  return meetups.reduce((sum, m) => sum + (m.frontmatter.photos?.length ?? 0), 0);
}
