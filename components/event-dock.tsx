import { site } from "@/lib/site";

/**
 * "Host an event" call to action that follows the reader down the page.
 * It is `position: sticky; bottom: 0` (see globals.css), so it pins to
 * the bottom of the viewport while scrolling and then docks naturally
 * above the footer at the end of the page, with no scroll listeners.
 */
export function EventDock() {
  return (
    <div className="event-dock">
      <a
        className="btn primary"
        href={site.luma}
        target="_blank"
        rel="noopener noreferrer"
        title="Propose and host a Thimphu Tech Meet event on Luma"
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
          <rect x="3" y="5" width="18" height="16" rx="2" />
          <path d="M16 3v4M8 3v4M3 10h18M12 14v4M10 16h4" />
        </svg>
        Host an event
        <span className="via">on Luma</span>
      </a>
    </div>
  );
}
