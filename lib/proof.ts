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

export interface ProofCoverage {
  /** Short pull from the external post, shown as a preview. */
  excerpt: string;
  /** Optional cover image under /public (e.g. the LinkedIn share photo). */
  image?: string;
  /** Image alt text. */
  imageAlt?: string;
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
  /** Optional “what they wrote” preview for coverage items. */
  coverage?: ProofCoverage;
}

const PROOF_DIR = path.join(process.cwd(), "public", "proof");

/**
 * Picks up public/proof/avs-proof-<n>.{webp,jpg,jpeg,png} in numeric order.
 * Prefers .webp when both exist. Portrait lead (n===1) gets height in the grid.
 */
function loadAvsProofPhotos(): ProofPhoto[] {
  if (!fs.existsSync(PROOF_DIR)) return [];

  const byNumber = new Map<number, string>();
  const rank = (ext: string) =>
    ({ webp: 0, jpg: 1, jpeg: 1, png: 2 }[ext.toLowerCase()] ?? 9);

  for (const name of fs.readdirSync(PROOF_DIR)) {
    const match = /^avs-proof-(\d+)\.(webp|jpe?g|png)$/i.exec(name);
    if (!match) continue;
    const n = Number(match[1]);
    const ext = match[2];
    const prev = byNumber.get(n);
    if (!prev || rank(ext) < rank(path.extname(prev).slice(1))) {
      byNumber.set(n, name);
    }
  }

  return [...byNumber.entries()]
    .sort((a, b) => a[0] - b[0])
    .map(([n, name]) => ({
      src: `/proof/${name}`,
      alt: `Builders presenting at Asia Visionary Summit — photo ${n}`,
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
    coverage: {
      excerpt:
        "We came to Paro for AVS, and are proud to see our builders here. Kelden Dorji’s start-up, Thagzo AI, is demonstrating a platform which documents and identifies inefficiencies in communication between collaborating AI agents. Jaggle AI is demonstrating Jaggle Pods — proactive AI companions for entire teams.",
      image: "/proof/dabtong-coverage.webp",
      imageAlt:
        "Thagzo AI booth banner at Asia Visionary Summit, with Kelden in a gho beside it",
    },
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
