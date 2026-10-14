import { useSyncExternalStore } from "react";

// The "Next start" month shown in the hero and the mid-page call to action.
// Until the 20th it's this month; after that, next month — so it never goes stale.
const ROLLOVER_DAY = 20;

export function nextStartMonth(lang: string, today: Date = new Date()): string {
  const d = new Date(today.getFullYear(), today.getMonth(), 1);
  if (today.getDate() > ROLLOVER_DAY) d.setMonth(d.getMonth() + 1);
  const locale = lang === "yo" ? "en" : lang; // no Yoruba month names in most browsers
  return new Intl.DateTimeFormat(locale, { month: "short", year: "numeric" }).format(d);
}

// The page is pre-built, so a month computed at build time would go stale. The
// pre-built HTML leaves it blank and the browser fills in the visitor's own date
// straight after the page loads.
const noSubscribe = () => () => {};
export function useNextStartMonth(lang: string): string {
  return useSyncExternalStore(noSubscribe, () => nextStartMonth(lang), () => "");
}
