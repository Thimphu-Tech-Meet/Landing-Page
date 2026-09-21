import type { Metadata } from "next";
import { Bricolage_Grotesque, IBM_Plex_Mono, Newsreader } from "next/font/google";
import { Analytics } from "@vercel/analytics/next";
import { SiteHeader } from "@/components/site-header";
import { Sponsors } from "@/components/sponsors";
import { SiteFooter } from "@/components/site-footer";
import { themeInitScript } from "@/components/theme-toggle";
import { site } from "@/lib/site";
import "./globals.css";

/*
 * Three typefaces, self-hosted by next/font at build time (no runtime
 * requests to Google): a display grotesque for headings and UI, a serif
 * for reading, and a mono for dates, labels and code.
 */
const display = Bricolage_Grotesque({
  subsets: ["latin"],
  axes: ["opsz"],
  variable: "--font-display",
  display: "swap",
});

const body = Newsreader({
  subsets: ["latin"],
  style: ["normal", "italic"],
  axes: ["opsz"],
  variable: "--font-body",
  display: "swap",
});

const mono = IBM_Plex_Mono({
  subsets: ["latin"],
  weight: ["400", "500"],
  variable: "--font-mono",
  display: "swap",
});

/**
 * Site-wide metadata. Per-page metadata (e.g. app/blog/[slug]/page.tsx)
 * overrides these fields via `metadata` / generateMetadata().
 */
export const metadata: Metadata = {
  metadataBase: new URL(site.url),
  title: {
    default: `${site.name} — People who build things, in the same room`,
    template: `%s | ${site.name}`,
  },
  description:
    "A casual weekly meetup for developers, researchers and tinkerers in Bhutan. Every Saturday, 12 to 2 PM, at the Loden Office Top Floor Meeting Room in Thimphu. Ideas are written as markdown and reviewed in the open.",
  openGraph: {
    type: "website",
    siteName: site.name,
  },
  twitter: {
    card: "summary_large_image",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    // suppressHydrationWarning: the inline theme script may set data-theme
    // before React hydrates, which is intentional.
    <html
      lang="en"
      suppressHydrationWarning
      className={`${display.variable} ${body.variable} ${mono.variable}`}
    >
      <head>
        <script dangerouslySetInnerHTML={{ __html: themeInitScript }} />
      </head>
      <body>
        <SiteHeader />
        <main>{children}</main>
        <Sponsors />
        <SiteFooter />
        <Analytics />
      </body>
    </html>
  );
}
