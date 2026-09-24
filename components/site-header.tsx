import Link from "next/link";
import { NavLinks } from "./nav-links";
import { ThemeToggle } from "./theme-toggle";
import { site } from "@/lib/site";

export function SiteHeader() {
  return (
    <header className="site">
      <div className="wrap">
        <Link className="brand" href="/" aria-label={`${site.name} home`}>
          <span className="mark" aria-hidden="true" />
          <span className="name">{site.name}</span>
          <span className="sub">{site.short}</span>
        </Link>
        <NavLinks />
        <div className="hdr-actions">
          <a
            className="btn small primary hdr-cta"
            href={site.contributing}
            target="_blank"
            rel="noopener noreferrer"
          >
            Write an idea
          </a>
          <ThemeToggle />
        </div>
      </div>
    </header>
  );
}
