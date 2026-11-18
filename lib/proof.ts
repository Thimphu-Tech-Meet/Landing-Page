import fs from "node:fs";
import path from "node:path";

/**
 * External mentions and appearances shown as social proof on the homepage.
 * Keep these short and attributed: venue / coverage, not rewritten as Ideas posts.
 */
export interface ProofLink {
  label: string;
  href: string;
}

export interface ProofPhoto {
  src: string;
  alt: string;
  /** True when the file is taller than wide — used for mosaic layout. */
  portrait?: boolean;
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
  /** Optional photo strip (e.g. booth shots from the summit). */
  photos?: ProofPhoto[];
}

const PROOF_DIR = path.join(process.cwd(), "public", "proof");

/**
 * Picks up public/proof/avs-proof-<n>.{jpg,jpeg,png,webp} in numeric order.
 * Portrait lead (avs-proof-1) is marked so the mosaic can give it height.
 */
function loadAvsProofPhotos(): ProofPhoto[] {
  if (!fs.existsSync(PROOF_DIR)) return [];

  return fs
    .readdirSync(PROOF_DIR)
    .map((name) => {
      const match = /^avs-proof-(\d+)\.(jpe?g|png|webp)$/i.exec(name);
      if (!match) return null;
      return { name, n: Number(match[1]) };
    })
    .filter((x): x is { name: string; n: number } => x !== null)
    .sort((a, b) => a.n - b.n)
    .map(({ name, n }) => ({
      src: `/proof/${name}`,
      alt: `Builders presenting at Asia Visionary Summit — photo ${n}`,
      // Known lead shot from the set; others are landscape booth frames.
      portrait: n === 1,
    }));
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
    photos: loadAvsProofPhotos(),
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
