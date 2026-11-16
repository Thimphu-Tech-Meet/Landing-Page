/**
 * Homepage people strip. Only names and facts already documented on this
 * site (posts, meetup notes, footer credit). No invented titles.
 */
export interface Person {
  name: string;
  /** Short factual line backed by existing content. */
  blurb: string;
  href: string;
  linkLabel: string;
}

export const people: Person[] = [
  {
    name: "Kelden Dradul Dorji",
    blurb: "Organises the Saturday meetups and maintains this site.",
    href: "https://github.com/compressionmonkey",
    linkLabel: "GitHub",
  },
  {
    name: "Tashi Norbu",
    blurb: "Presented persistent memory infrastructure for AI agents.",
    href: "https://github.com/MasterScientist22",
    linkLabel: "GitHub",
  },
  {
    name: "Nahar Emet",
    blurb: "Wrote about Steward, a coordination system for AI agents.",
    href: "https://naharemet.com",
    linkLabel: "Website",
  },
];
