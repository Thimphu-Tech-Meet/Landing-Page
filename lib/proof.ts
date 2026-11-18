/**
 * External mentions and appearances shown as social proof on the homepage.
 * Keep these short and attributed: venue / coverage, not rewritten as Ideas posts.
 */
export interface ProofLink {
  label: string;
  href: string;
}

export interface ProofItem {
  name: string;
  /** Role of this mention: we showed up, or someone wrote about us. */
  kind: "Presented" | "Coverage";
  when: string;
  blurb: string;
  /** Path under /public. Optional — name still shows without a mark. */
  logo?: string;
  /** Primary destination (summit site, house site, etc.). */
  href: string;
  /** Extra receipts when coverage lives on more than one channel. */
  links?: ProofLink[];
}

export const socialProof: ProofItem[] = [
  {
    name: "Asia Visionary Summit",
    kind: "Presented",
    when: "Nov 2026",
    blurb:
      "Builders from the room showed work at AVS in Paro — platforms and prototypes from the community on the summit floor.",
    logo: "/proof/avs-mark.svg",
    href: "https://asiavisionarysummit.com/",
  },
  {
    name: "Dabtong House",
    kind: "Coverage",
    when: "Nov 2026",
    blurb:
      "Wrote about our builders at the summit, naming the demos on the floor and inviting people to the booths.",
    logo: "/proof/dabtong-logo.svg",
    href: "https://dabtonghouse.org/",
    links: [
      {
        label: "LinkedIn",
        href: "https://www.linkedin.com/posts/dabtong_dabtong-house-is-at-the-asia-visionary-summit-activity-7524423640394715136-B12e",
      },
      {
        label: "Instagram",
        href: "https://www.instagram.com/p/DfZbPcsjkBt/",
      },
    ],
  },
];
