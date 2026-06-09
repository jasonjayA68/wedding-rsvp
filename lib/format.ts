/**
 * Date + text formatting helpers.
 *
 * Dates are formatted from a plain `YYYY-MM-DD` string using UTC parts so the
 * output is identical on the server and the client (no hydration mismatch and
 * no timezone off-by-one).
 */

function parseISODate(iso: string): Date {
  const [year, month, day] = iso.split("-").map(Number);
  return new Date(Date.UTC(year, (month ?? 1) - 1, day ?? 1));
}

export function formatLongDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(parseISODate(iso));
}

export function formatShortDate(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
    timeZone: "UTC",
  }).format(parseISODate(iso));
}

/** Whole days from `fromISO` (date or full timestamp) to `toISO` date. */
export function daysBetween(fromISO: string, toISO: string): number {
  const from = new Date(fromISO).getTime();
  const to = parseISODate(toISO).getTime();
  return Math.ceil((to - from) / (1000 * 60 * 60 * 24));
}

/** Format a database timestamp for the admin table, e.g. "Jun 9, 2026, 6:20 PM". */
export function formatTimestamp(iso: string): string {
  return new Intl.DateTimeFormat("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "2-digit",
  }).format(new Date(iso));
}
