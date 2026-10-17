import { LB_LANGS, type Entry, type LbLang } from "./types";
import { COPY_A } from "./copy-a";
import { COPY_B } from "./copy-b";
import { COPY_C } from "./copy-c";

// Everything /local-business says, per language: { en: { key: text }, fr: { ... }, ... }.
// Used by <LocalCopy>, which swaps these keys in for the homepage sections' own wording.
const ALL: Record<string, Entry> = { ...COPY_A, ...COPY_B, ...COPY_C };

export const LB_COPY = Object.fromEntries(
  LB_LANGS.map((lang, i) => [lang, Object.fromEntries(Object.entries(ALL).map(([key, row]) => [key, row[i]]))]),
) as Record<LbLang, Record<string, string>>;

// The homepage FAQ has ten slots; this page uses six, so the rest are blanked
for (const lang of LB_LANGS) for (const slot of [6, 7, 8, 9]) LB_COPY[lang][`faq.q${slot}`] = "";
