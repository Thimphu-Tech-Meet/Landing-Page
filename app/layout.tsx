import type { Metadata } from "next";
import Link from "next/link";
import { Analytics } from "@vercel/analytics/next";
import "./globals.css";

/**
 * Site-wide metadata. Per-post metadata in app/blog/[slug]/page.tsx
 * overrides these fields via generateMetadata().
 */
export const metadata: Metadata = {
  metadataBase: new URL("https://thimphu-tech-meet.github.io"),
  title: {
    default: "Thimphu Tech Meet — Community Ideas",
    template: "%s | Thimphu Tech Meet",
  },
  description:
    "An open-source, community-driven collection of ideas and links. Every post is a markdown file contributed via pull request.",
  openGraph: {
    type: "website",
    siteName: "Thimphu Tech Meet",
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body className="flex min-h-screen flex-col bg-white text-neutral-900 antialiased">
        <header className="border-b border-neutral-200">
          <nav className="mx-auto flex max-w-prose items-center justify-between px-4 py-4">
            <Link href="/" className="text-lg font-bold tracking-tight">
              Thimphu Tech Meet
            </Link>
            <a
              href="https://github.com/Thimphu-Tech-Meet/Landing-Page/blob/main/CONTRIBUTING.md"
              className="rounded-md bg-neutral-900 px-3 py-1.5 text-sm font-medium text-white hover:bg-neutral-700"
            >
              Contribute an idea
            </a>
          </nav>
        </header>

        <main className="mx-auto w-full max-w-prose flex-1 px-4 py-10">
          {children}
        </main>

        <footer className="border-t border-neutral-200">
          <div className="mx-auto max-w-prose px-4 py-6 text-sm text-neutral-500">
            Open source and community-built.{" "}
            <a
              href="https://github.com/Thimphu-Tech-Meet/Landing-Page"
              className="underline underline-offset-4 hover:text-neutral-700"
            >
              View on GitHub
            </a>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
