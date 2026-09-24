import { builtBy, site } from "@/lib/site";

/**
 * Two rows. The first is about the community: who we are and how to reach
 * us. The second is about this website: report a problem, who built it.
 * The "Host an event" dock rests on the footer's top border, so the footer
 * carries extra top padding (see globals.css).
 */
export function SiteFooter() {
  return (
    <footer className="site">
      <div className="wrap">
        <div className="row">
          <div className="made">
            <b>{site.name}</b> Open source and community-built in Thimphu.
          </div>
          <div className="contact">
            <a
              className="icon-only"
              href={`mailto:${site.email}`}
              aria-label={`Email ${site.email}`}
              title={site.email}
            >
              <svg
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                aria-hidden="true"
              >
                <rect x="3" y="5" width="18" height="14" rx="2" />
                <path d="m3 7 9 6 9-6" />
              </svg>
            </a>
            <a href={site.repo} target="_blank" rel="noopener noreferrer">
              <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                <path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.1.79-.25.79-.56v-2.17c-3.2.7-3.87-1.36-3.87-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.68 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.04 0 0 .97-.31 3.16 1.18a10.9 10.9 0 0 1 5.76 0c2.19-1.49 3.16-1.18 3.16-1.18.62 1.58.23 2.75.11 3.04.74.81 1.18 1.83 1.18 3.09 0 4.41-2.69 5.38-5.26 5.67.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5z" />
              </svg>
              GitHub
            </a>
          </div>
        </div>
        <div className="rule" />
        <div className="row meta">
          <div>
            Spotted a problem with this site?{" "}
            <a href={site.newIssue} target="_blank" rel="noopener noreferrer">
              Report it →
            </a>
          </div>
          <div className="built">
            Built with <span aria-label="love">❤️</span> by{" "}
            <a href={builtBy.href} target="_blank" rel="noopener noreferrer">
              {builtBy.name}
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
