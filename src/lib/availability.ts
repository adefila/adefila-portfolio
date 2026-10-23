import { useSyncExternalStore } from "react";

// ── Edit these two when your availability changes ──
// How many project spots are open (shown as "5 spots open").
export const SPOTS_OPEN = 5;
// The earliest month you can start new work, as "YYYY-MM". The site never shows
// a month before this one; once it's passed, the month keeps rolling forward.
const EARLIEST_START = "2026-11";

// The "Next start" month shown in the hero, mid-page call to action, mobile bar and
// booking window. Until the 20th it's this month; after that, next month — never
// earlier than EARLIEST_START — so it never goes stale.
const ROLLOVER_DAY = 20;

export function nextStartMonth(lang: string, today: Date = new Date()): string {
  const d = new Date(today.getFullYear(), today.getMonth(), 1);
  if (today.getDate() > ROLLOVER_DAY) d.setMonth(d.getMonth() + 1);
  const [year, month] = EARLIEST_START.split("-").map(Number);
  const earliest = new Date(year, month - 1, 1);
  if (d < earliest) d.setTime(earliest.getTime());
  const locale = lang;
  return new Intl.DateTimeFormat(locale, { month: "short", year: "numeric" }).format(d);
}

// The page is pre-built, so a month computed at build time would go stale. The
// pre-built HTML leaves it blank and the browser fills in the visitor's own date
// straight after the page loads.
const noSubscribe = () => () => {};
export function useNextStartMonth(lang: string): string {
  return useSyncExternalStore(noSubscribe, () => nextStartMonth(lang), () => "");
}
