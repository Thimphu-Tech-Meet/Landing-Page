const MONTHS = [
  "Jan", "Feb", "Mar", "Apr", "May", "Jun",
  "Jul", "Aug", "Sep", "Oct", "Nov", "Dec",
];

const WEEKDAYS = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

/**
 * Split an ISO date ("YYYY-MM-DD") into parts without going through
 * Date parsing, so the output never shifts by a day across time zones.
 */
export function dateParts(iso: string) {
  const [y, m, d] = iso.split("-").map(Number);
  return { year: y, month: m, day: d, monthShort: MONTHS[m - 1] ?? "" };
}

/** "05 Sep 2026" */
export function formatDate(iso: string): string {
  const { day, monthShort, year } = dateParts(iso);
  return `${String(day).padStart(2, "0")} ${monthShort} ${year}`;
}

/** "Sat 03 Oct 2026" */
export function formatDateWithWeekday(iso: string): string {
  const { year, month, day } = dateParts(iso);
  const weekday = WEEKDAYS[new Date(Date.UTC(year, month - 1, day)).getUTCDay()];
  return `${weekday} ${formatDate(iso)}`;
}

/** Reading time in whole minutes at ~220 words per minute (minimum 1). */
export function readingTime(markdown: string): number {
  const words = markdown
    .replace(/```[\s\S]*?```/g, " ")
    .replace(/[#>*_`\[\]()!-]/g, " ")
    .split(/\s+/)
    .filter(Boolean).length;
  return Math.max(1, Math.round(words / 220));
}

/** Today's date as "YYYY-MM-DD" (UTC) — used at build time. */
export function todayIso(): string {
  return new Date().toISOString().slice(0, 10);
}
