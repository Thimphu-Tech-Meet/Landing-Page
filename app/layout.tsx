import type { Metadata } from "next";
import Image from "next/image";
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
          <div className="flex flex-wrap items-center justify-between gap-x-6 gap-y-2 px-4 py-6 text-sm text-neutral-500">
            <div>
              Open source and community-built.{" "}
              <a
                href="https://github.com/Thimphu-Tech-Meet/Landing-Page"
                className="underline underline-offset-4 hover:text-neutral-700"
              >
                View on GitHub
              </a>
            </div>
            <div className="ml-auto">
              <a
                href="https://keldendev.info/"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 hover:text-neutral-700"
              >
                <Image
                  src="/kelden-icon.png"
                  alt="Kelden's website icon"
                  width={20}
                  height={20}
                  className="rounded"
                />
                <span>Supported by Kelden ❤️</span>
              </a>
            </div>
          </div>
        </footer>
        <Analytics />
      </body>
    </html>
  );
}
