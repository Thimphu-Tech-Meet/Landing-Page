/**
 * Homepage people strip. Only names and facts already documented on this
 * site (posts, meetup notes, CONTRIBUTORS.md). No invented titles.
 */
export interface Person {
  name: string;
  /** Short factual line backed by existing content. */
  blurb: string;
  href: string;
  /** GitHub avatar image URL when the profile is on GitHub. */
  avatar?: string;
}

export const people: Person[] = [
  {
    name: "Kelden Dradul Dorji",
    blurb:
      "Organises the Saturday meetups, maintains this site, and led the artificial life session with live demos.",
    href: "https://github.com/compressionmonkey",
    avatar: "https://avatars.githubusercontent.com/u/17824272?v=4",
  },
  {
    name: "Tashi Norbu",
    blurb: "Presented persistent memory infrastructure for AI agents.",
    href: "https://github.com/MasterScientist22",
    avatar: "https://avatars.githubusercontent.com/u/116861179?v=4",
  },
  {
    name: "Nahar Emet",
    blurb: "Wrote about Steward, a coordination system for AI agents.",
    href: "https://naharemet.com",
    avatar: "https://avatars.githubusercontent.com/u/67267366?v=4",
  },
  {
    name: "Ayush Pandey",
    blurb: "Wrote about quiet production bugs and building with AI in Thimphu.",
    href: "https://github.com/ayush-pandey047",
    avatar: "https://avatars.githubusercontent.com/u/184400006?v=4",
  },
  {
    name: "Avinash Biswa",
    blurb: "Wrote about AI video experiments and a product Q&A agent.",
    href: "https://github.com/Nashidev77",
    avatar: "https://avatars.githubusercontent.com/u/322254020?v=4",
  },
];
