"use client";

const STORAGE_KEY = "ttm-theme";

/**
 * Inline script for <head>: applies a saved theme before first paint so
 * the page never flashes the wrong colours. Kept tiny and dependency-free.
 */
export const themeInitScript = `try{var t=localStorage.getItem("${STORAGE_KEY}");if(t==="dark"||t==="light")document.documentElement.dataset.theme=t}catch(e){}`;

/**
 * Dark/light toggle. With no saved choice the page follows the system
 * preference; the first click flips away from whatever is currently shown.
 */
export function ThemeToggle() {
  function toggle() {
    const root = document.documentElement;
    const isDark =
      root.dataset.theme === "dark" ||
      (!root.dataset.theme && window.matchMedia("(prefers-color-scheme: dark)").matches);
    const next = isDark ? "light" : "dark";
    root.dataset.theme = next;
    try {
      localStorage.setItem(STORAGE_KEY, next);
    } catch {
      /* storage unavailable (private mode etc.) — theme still applies for this view */
    }
  }

  return (
    <button
      type="button"
      className="toggle"
      onClick={toggle}
      aria-label="Toggle dark mode"
      title="Toggle theme"
    >
      <svg
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        aria-hidden="true"
      >
        <path d="M21 12.8A9 9 0 1 1 11.2 3a7 7 0 0 0 9.8 9.8z" />
      </svg>
    </button>
  );
}
