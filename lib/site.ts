/** Site-wide links used across header, footer, contribute and sponsors. */
export const site = {
  name: "Thimphu Tech Meet",
  short: "TTM",
  url: "https://thimphu-tech-meet.github.io",
  repo: "https://github.com/Thimphu-Tech-Meet/Landing-Page",
  contributing:
    "https://github.com/Thimphu-Tech-Meet/Landing-Page/blob/main/CONTRIBUTING.md",
  newIssue: "https://github.com/Thimphu-Tech-Meet/Landing-Page/issues/new",
  email: "keldendraduldorji@gmail.com",
} as const;

/** The standing weekly meetup. Shown when no dated meetup is scheduled. */
export const weekly = {
  day: "Every Saturday",
  time: "12:00 – 14:00",
  place: "Loden Office Top Floor Meeting Room",
  map: "https://maps.app.goo.gl/NFcSeF9TZT5trEUL7",
} as const;

export interface Sponsor {
  name: string;
  href: string;
  /** Path under /public. */
  logo: string;
}

/** Shown in the "Supported by" strip above the footer. */
export const sponsors: Sponsor[] = [
  {
    name: "Loden Foundation",
    href: "https://www.loden.org/",
    logo: "/sponsors/loden-foundation.png",
  },
  {
    name: "Kelden",
    href: "https://keldendev.info/",
    logo: "/kelden-icon.png",
  },
];
