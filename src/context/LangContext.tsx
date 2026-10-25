"use client";
import React, { createContext, useContext, useState, useEffect, useRef } from "react";
import { usePathname } from "next/navigation";
import {
  LangCode, CurrencyCode, LANGUAGES, CURRENCIES, T,
} from "@/i18n/translations";
import { NL_NO } from "@/i18n/nl-no";
import { PROJECT_COPY } from "@/i18n/projects";
import { WORK_COPY } from "@/i18n/work-history";
import { currencyForCountry, languageForCountry } from "@/i18n/geo";

// Dutch and Norwegian exist for the text /local-business reuses from the main site
for (const [key, v] of Object.entries(NL_NO)) if (T[key]) Object.assign(T[key], v);

// Project descriptions, tags and badges for the Projects section
Object.assign(T, PROJECT_COPY);

// The About section's work history
Object.assign(T, WORK_COPY);

const BUSINESS_PAGE = "/local-business";

// Dutch and Norwegian are complete only on the business page, so elsewhere they show English and a
// page never ends up half in one language and half in another.
function renderLanguage(lang: LangCode, pathname: string | null): LangCode {
  const onBusinessPage = !!pathname && pathname.startsWith(BUSINESS_PAGE);
  if (lang === "nl" || lang === "no") return onBusinessPage ? lang : "en";
  return lang;
}

const isLang = (v: string | null | undefined): v is LangCode => !!v && LANGUAGES.some((l) => l.code === v);
const isCurrency = (v: string | null | undefined): v is CurrencyCode => !!v && CURRENCIES.some((c) => c.code === v);

// Maps a browser locale string (e.g. "fr-FR", "pt-BR", "en-NG") to
// one of our supported languages + currency pairs.
function detectLocale(): { lang: LangCode; currency: CurrencyCode } {
  const raw = (typeof navigator !== "undefined" ? navigator.language : "en") ?? "en";
  const [base, region] = raw.toLowerCase().split("-");

  // Language mapping
  const langMap: Record<string, LangCode> = {
    fr: "fr",
    es: "es",
    de: "de",
    pt: "pt",
    zh: "zh",
    ja: "ja",
    nl: "nl",
    no: "no",
    nb: "no",
    nn: "no",
  };
  const lang: LangCode = langMap[base] ?? "en";

  // Currency refinement — regional English variants + other region overrides
  const currencyMap: Record<string, CurrencyCode> = {
    // English regions
    "en-gb": "GBP",
    "en-au": "AUD",
    "en-ca": "CAD",
    "en-ng": "NGN",
    "en-ae": "AED",
    "en-sg": "USD",  // SGD not in list, fall back
    "en-nz": "AUD",
    // Portuguese regions
    "pt-br": "BRL",
    "pt-pt": "EUR",
    // Arabic-speaking regions (Arabic not in language list)
    "ar-ae": "AED",
    "ar-sa": "AED",
    // Chinese regions
    "zh-tw": "CNY",
    "zh-hk": "CNY",
  };

  const fullLocale = region ? `${base}-${region}` : base;
  const defaultCurrency = LANGUAGES.find((l) => l.code === lang)?.currency ?? "USD";
  const currency: CurrencyCode = currencyMap[fullLocale] ?? defaultCurrency;

  return { lang, currency };
}

interface LangContextType {
  lang: LangCode;
  currency: CurrencyCode;
  setLang: (l: LangCode) => void;
  setCurrency: (c: CurrencyCode) => void;
  t: (key: string) => string;
  formatPrice: (usd: number, perMonth?: boolean) => string;
  currencySymbol: string;
  currencyCode: CurrencyCode;
}

const LangContext = createContext<LangContextType>({
  lang: "en",
  currency: "USD",
  setLang: () => {},
  setCurrency: () => {},
  t: (key) => key,
  formatPrice: (usd) => `$${usd.toLocaleString()}`,
  currencySymbol: "$",
  currencyCode: "USD",
});

export function LangProvider({ children }: { children: React.ReactNode }) {
  const [preferred, setPreferred] = useState<LangCode>("en");
  const [currency, setCurrencyState] = useState<CurrencyCode>("USD");
  const pathname = usePathname();
  // True once the visitor has picked a language (or arrived with ?lang=): from then on nothing
  // automatic may change it.
  const chosen = useRef(false);
  const lang = renderLanguage(preferred, pathname);

  // Language order of preference:
  //   1. ?lang=nl in the link (what our emails use), saved as a choice
  //   2. a language the visitor picked earlier
  //   3. the visitor's country, looked up from their IP on the server (/api/geo)
  //   4. the browser's language
  // The page is pre-rendered in English, so all of this runs after hydration.
  useEffect(() => {
    try {
      const fromLink = new URLSearchParams(window.location.search).get("lang");
      const savedLang = localStorage.getItem("sam-lang");
      const savedCurr = localStorage.getItem("sam-currency");
      const savedByVisitor = localStorage.getItem("sam-lang-chosen") === "1";

      if (isLang(fromLink)) {
        chosen.current = true;
        const curr = LANGUAGES.find((l) => l.code === fromLink)?.currency ?? "USD";
        // eslint-disable-next-line react-hooks/set-state-in-effect -- intentional post-hydration sync, see above
        setPreferred(fromLink);
        setCurrencyState(curr);
        localStorage.setItem("sam-lang", fromLink);
        localStorage.setItem("sam-currency", curr);
        localStorage.setItem("sam-lang-chosen", "1");
        return;
      }

      if (savedByVisitor && isLang(savedLang)) {
        chosen.current = true;
        setPreferred(savedLang);
        if (isCurrency(savedCurr)) setCurrencyState(savedCurr);
        return;
      }

      // First visit, or an automatic choice from before: the browser's language straight away...
      const detected = detectLocale();
      setPreferred(detected.lang);
      setCurrencyState(detected.currency);

      // ...then the country, when the server can tell us one. Only the country code comes back.
      const dev = process.env.NODE_ENV !== "production" ? new URLSearchParams(window.location.search).get("geo") : null;
      fetch(`/api/geo${dev ? `?country=${encodeURIComponent(dev)}` : ""}`, { cache: "no-store" })
        .then((r) => (r.ok ? r.json() : null))
        .then((data: { country?: string | null } | null) => {
          if (!data?.country || chosen.current) return;
          const byCountry = languageForCountry(data.country, navigator.languages ?? [navigator.language]);
          const countryCurrency = currencyForCountry(data.country);
          if (!byCountry) {
            // No language of its own (Australia, Nigeria...): keep the browser's language, price in the local currency
            if (countryCurrency) setCurrencyState(countryCurrency);
            return;
          }
          setPreferred(byCountry);
          setCurrencyState(countryCurrency ?? LANGUAGES.find((l) => l.code === byCountry)?.currency ?? "USD");
        })
        .catch(() => undefined);
    } catch {
      // localStorage blocked (private mode etc.)
    }
  }, []);

  // Screen readers and translation tools read this
  useEffect(() => {
    document.documentElement.lang = lang === "no" ? "nb" : lang;
    // The head script holds the page back while a non-English language is on its way (see layout.tsx)
    if (lang !== "en") document.documentElement.removeAttribute("data-lang-pending");
  }, [lang]);

  const setLang = (l: LangCode) => {
    chosen.current = true;
    setPreferred(l);
    // Always sync currency to the selected country — even if user manually
    // picked a different currency, switching country overrides it.
    const newCurr = LANGUAGES.find((lg) => lg.code === l)?.currency ?? "USD";
    setCurrencyState(newCurr);
    try {
      localStorage.setItem("sam-lang", l);
      localStorage.setItem("sam-currency", newCurr);
      localStorage.setItem("sam-lang-chosen", "1");
    } catch {}
  };

  const setCurrency = (c: CurrencyCode) => {
    setCurrencyState(c);
    try { localStorage.setItem("sam-currency", c); } catch {}
  };

  const t = (key: string): string => T[key]?.[lang] ?? T[key]?.["en"] ?? key;

  const formatPrice = (usd: number, perMonth = false): string => {
    const curr = CURRENCIES.find((c) => c.code === currency) ?? CURRENCIES[0];
    const raw = usd * curr.rate;
    let rounded: number;
    if (raw < 200)        rounded = Math.round(raw / 5) * 5;
    else if (raw < 2000)  rounded = Math.round(raw / 50) * 50;
    else if (raw < 20000) rounded = Math.round(raw / 500) * 500;
    else                  rounded = Math.round(raw / 5000) * 5000;
    const formatted = curr.symbol + rounded.toLocaleString();
    return perMonth ? `${formatted} /mo` : formatted;
  };

  const currObj = CURRENCIES.find((c) => c.code === currency) ?? CURRENCIES[0];

  return (
    <LangContext.Provider value={{
      lang,
      currency,
      setLang, setCurrency,
      t, formatPrice,
      currencySymbol: currObj.symbol,
      currencyCode: currency,
    }}>
      {children}
    </LangContext.Provider>
  );
}

export const useLang = () => useContext(LangContext);

// Swaps the wording of specific keys for everything inside it, so another page (e.g.
// /local-business) can reuse the homepage sections as-is with its own copy. `copyByLang` holds one
// set per language; a key missing from the visitor's language falls back to English.
export function CopyOverride({ copy, copyByLang, children }: { copy?: Record<string, string>; copyByLang?: Partial<Record<LangCode, Record<string, string>>>; children: React.ReactNode }) {
  const parent = useLang();
  const set = copyByLang ? { ...copyByLang.en, ...copyByLang[parent.lang] } : copy ?? {};
  const t = (key: string) => set[key] ?? parent.t(key);
  return <LangContext.Provider value={{ ...parent, t }}>{children}</LangContext.Provider>;
}
