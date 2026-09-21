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

export interface MeetupMedia {
  /** Path under /public (e.g. "/meetups/09-2026/05-09-2026.jpeg") or a full URL. */
  src: string;
  /** Description for screen readers. */
  alt?: string;
  /** Short label shown on the tile. */
  caption?: string;
  /** Derived from the file extension. */
  kind: "photo" | "video";
}

export interface MeetupTalk {
  title: string;
  /** Optional link, e.g. to the write-up on this site or to slides. */
  href?: string;
}

export interface MeetupFrontmatter {
  title: string;
  /** ISO 8601 date, e.g. "2026-09-05". */
  date: string;
  /** True when only the month is known; the day is hidden in the timeline. */
  dayUnknown: boolean;
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
  /** Mark entries that were not in-person gatherings. */
  online?: boolean;
  talks: MeetupTalk[];
  photos: MeetupMedia[];
}

export interface Meetup {
  slug: string;
  frontmatter: MeetupFrontmatter;
  /** Raw markdown body (frontmatter stripped). */
  content: string;
}

const VIDEO_EXT = /\.(mp4|webm|mov|m4v)(\?.*)?$/i;

function normalizePhotos(photos: unknown): MeetupMedia[] {
  if (!Array.isArray(photos)) return [];
  return photos
    .map((p): MeetupMedia | null => {
      let src: string | undefined;
      let alt: string | undefined;
      let caption: string | undefined;
      if (typeof p === "string") {
        src = p;
      } else if (p && typeof p === "object" && typeof (p as { src?: unknown }).src === "string") {
        const o = p as { src: string; alt?: unknown; caption?: unknown };
        src = o.src;
        alt = typeof o.alt === "string" ? o.alt : undefined;
        caption = typeof o.caption === "string" ? o.caption : undefined;
      }
      if (!src) return null;
      return { src, alt, caption, kind: VIDEO_EXT.test(src) ? "video" : "photo" };
    })
    .filter((p): p is MeetupMedia => p !== null);
}

function normalizeTalks(talks: unknown): MeetupTalk[] {
  if (!Array.isArray(talks)) return [];
  return talks
    .map((t): MeetupTalk | null => {
      if (typeof t === "string") return t.trim() ? { title: t.trim() } : null;
      if (t && typeof t === "object" && typeof (t as { title?: unknown }).title === "string") {
        const o = t as { title: string; href?: unknown };
        return { title: o.title, href: typeof o.href === "string" ? o.href : undefined };
      }
      return null;
    })
    .filter((t): t is MeetupTalk => t !== null);
}

function toNumber(value: unknown): number | undefined {
  if (value === undefined || value === null || value === "") return undefined;
  const n = Number(value);
  return Number.isFinite(n) ? n : undefined;
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
  const fm = data as Record<string, unknown>;

  if (!fm.title || !fm.date) {
    throw new Error(
      `Meetup "meetups/${slug}.md" is missing required frontmatter fields (title, date).`
    );
  }

  return {
    slug,
    frontmatter: {
      title: String(fm.title),
      date: new Date(fm.date as string | Date).toISOString().slice(0, 10),
      dayUnknown: Boolean(fm.dayUnknown),
      time: fm.time ? String(fm.time) : undefined,
      location: fm.location ? String(fm.location) : undefined,
      attended: toNumber(fm.attended),
      going: toNumber(fm.going),
      rsvp: fm.rsvp ? String(fm.rsvp) : undefined,
      online: Boolean(fm.online),
      talks: normalizeTalks(fm.talks),
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

/** Total photos (still images) across the given meetups. */
export function countPhotos(meetups: Meetup[]): number {
  return meetups.reduce(
    (sum, m) => sum + m.frontmatter.photos.filter((p) => p.kind === "photo").length,
    0
  );
}

/** First still photo of a meetup, used as its cover on the home page. */
export function coverPhoto(meetup: Meetup): MeetupMedia | undefined {
  return meetup.frontmatter.photos.find((p) => p.kind === "photo");
}
