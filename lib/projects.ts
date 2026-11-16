/**
 * Curated homepage features drawn only from existing posts and demos.
 * Keep kinds honest: discussion notes are not software projects.
 */
export interface FeaturedWork {
  title: string;
  /** The question or problem being explored. */
  description: string;
  /** How this entry should be read: prototype, write-up, or notes. */
  kind: "Interactive demo" | "Project write-up" | "Discussion notes";
  contributors?: string[];
  /** Only when the source content states a status. */
  status?: string;
  href: string;
  linkLabel: string;
}

export const featuredWork: FeaturedWork[] = [
  {
    title: "Evolutionary food race",
    description:
      "Can simple local rules—sensing food, spending energy, mutating traits—produce visible selection pressure over time?",
    kind: "Interactive demo",
    contributors: ["Sakana AI through Hermes"],
    status: "Browser demo",
    href: "/blog/evolutionary-food-race",
    linkLabel: "Read & try the demo",
  },
  {
    title: "Persistent memory for AI agents",
    description:
      "How can project context and knowledge stay available when switching between coding agents?",
    kind: "Project write-up",
    contributors: ["Tashi Norbu"],
    status: "Presented at meetup",
    href: "/blog/persistent-memory-infrastructure-for-ai-agents",
    linkLabel: "Read the write-up",
  },
  {
    title: "Steward: agent coordination",
    description:
      "When several AI agents edit the same codebase, how do they share context, tasks, and file locks without stepping on each other?",
    kind: "Project write-up",
    contributors: ["Nahar Emet"],
    href: "/blog/how-a-bad-git-reset-built-an-agent-coordination-system",
    linkLabel: "Read the article",
  },
];
