import { getIdeaPosts } from "@/lib/posts";
import { site } from "@/lib/site";

/**
 * RSS 2.0 feed of idea posts, generated at build time. With
 * `output: "export"` Next prerenders this GET handler into /out/feed.xml
 * (no server runtime needed). Linked from the homepage Connect section and
 * from the site metadata (`alternates.types`), so readers can subscribe
 * without an email address.
 */
export const dynamic = "force-static";

function escapeXml(value: string): string {
  return value
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}

export function GET() {
  const items = getIdeaPosts()
    .map((post) => {
      const { title, description, author, date } = post.frontmatter;
      const url = `${site.url}/blog/${post.slug}`;
      return [
        "    <item>",
        `      <title>${escapeXml(title)}</title>`,
        `      <link>${url}</link>`,
        `      <guid isPermaLink="true">${url}</guid>`,
        `      <pubDate>${new Date(`${date}T00:00:00+06:00`).toUTCString()}</pubDate>`,
        `      <dc:creator>${escapeXml(author)}</dc:creator>`,
        `      <description>${escapeXml(description)}</description>`,
        "    </item>",
      ].join("\n");
    })
    .join("\n");

  const xml = [
    '<?xml version="1.0" encoding="UTF-8"?>',
    '<rss version="2.0" xmlns:dc="http://purl.org/dc/elements/1.1/">',
    "  <channel>",
    `    <title>${escapeXml(site.name)} — ideas &amp; notes</title>`,
    `    <link>${site.url}/ideas</link>`,
    "    <description>Articles and notes from Thimphu Tech Meet, a community of",
    "    developers, researchers, and curious builders in Bhutan.</description>",
    "    <language>en</language>",
    `    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>`,
    items,
    "  </channel>",
    "</rss>",
    "",
  ].join("\n");

  return new Response(xml, {
    headers: { "Content-Type": "application/rss+xml; charset=utf-8" },
  });
}
