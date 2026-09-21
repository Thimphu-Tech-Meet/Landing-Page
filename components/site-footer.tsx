import Link from "next/link";
import { site } from "@/lib/site";

export function SiteFooter() {
  return (
    <footer className="site">
      <div className="wrap">
        <div className="made">Open source and community-built in Thimphu.</div>
        <div className="links">
          <a href={site.repo} target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <Link href="/contribute">Contribute</Link>
          <a href={site.newIssue} target="_blank" rel="noopener noreferrer">
            Raise an issue
          </a>
          <a href={`mailto:${site.email}`}>{site.email}</a>
        </div>
      </div>
    </footer>
  );
}
