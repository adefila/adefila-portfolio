import type { CurrencyCode, LangCode } from "./translations";

// Picks a language and currency from the visitor's country (looked up on the server from the
// request's IP, see /api/geo; the IP itself is never stored). Used only when the visitor has not
// chosen a language themselves.

const COUNTRY_LANG: Record<string, LangCode> = {
  NL: "nl", NO: "no",
  FR: "fr", LU: "fr", MC: "fr",
  DE: "de", AT: "de", LI: "de",
  ES: "es", MX: "es", AR: "es", CL: "es", CO: "es", PE: "es", UY: "es", EC: "es", BO: "es", PY: "es", VE: "es", CR: "es", PA: "es", DO: "es", GT: "es", HN: "es", SV: "es", NI: "es", CU: "es",
  PT: "pt", BR: "pt", AO: "pt", MZ: "pt",
  CN: "zh", TW: "zh", HK: "zh",
  JP: "ja",
};

// Countries with two common languages: the browser's language breaks the tie.
const TWO_LANGUAGES: Record<string, [LangCode, LangCode]> = {
  BE: ["nl", "fr"],
  CH: ["de", "fr"],
  CA: ["en", "fr"],
};

const EURO = ["DE", "FR", "ES", "IT", "NL", "BE", "AT", "PT", "IE", "FI", "GR", "LU", "SK", "SI", "EE", "LV", "LT", "MT", "CY", "HR", "MC"];
const COUNTRY_CURRENCY: Record<string, CurrencyCode> = {
  AU: "AUD", NZ: "AUD", GB: "GBP", CA: "CAD", NG: "NGN", AE: "AED", NO: "NOK", JP: "JPY", CN: "CNY", HK: "CNY", TW: "CNY", BR: "BRL",
  ...Object.fromEntries(EURO.map((c) => [c, "EUR" as CurrencyCode])),
};

const base = (tag: string) => tag.toLowerCase().split("-")[0];

// null means "no opinion": the caller falls back to the browser's language.
export function languageForCountry(country: string | null | undefined, browserLanguages: readonly string[] = []): LangCode | null {
  const c = (country ?? "").toUpperCase();
  const pair = TWO_LANGUAGES[c];
  if (pair) return pair.find((l) => browserLanguages.some((b) => base(b) === l)) ?? pair[0];
  return COUNTRY_LANG[c] ?? null;
}

export function currencyForCountry(country: string | null | undefined): CurrencyCode | null {
  return COUNTRY_CURRENCY[(country ?? "").toUpperCase()] ?? null;
}
