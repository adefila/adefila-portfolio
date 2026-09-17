"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import {
  LangCode, CurrencyCode, LANGUAGES, CURRENCIES, T,
} from "@/i18n/translations";

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
    yo: "yo",
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
  const [lang, setLangState] = useState<LangCode>("en");
  const [currency, setCurrencyState] = useState<CurrencyCode>("USD");

  useEffect(() => {
    try {
      const savedLang = localStorage.getItem("sam-lang") as LangCode | null;
      const savedCurr = localStorage.getItem("sam-currency") as CurrencyCode | null;
      if (savedLang && LANGUAGES.find((l) => l.code === savedLang)) {
        setLangState(savedLang);
        if (savedCurr && CURRENCIES.find((c) => c.code === savedCurr)) setCurrencyState(savedCurr);
        return;
      }
      // First visit — detect from browser locale and save for next time
      const { lang: detectedLang, currency: detectedCurr } = detectLocale();
      setLangState(detectedLang);
      setCurrencyState(detectedCurr);
      localStorage.setItem("sam-lang", detectedLang);
      localStorage.setItem("sam-currency", detectedCurr);
    } catch {
      // localStorage blocked (private mode etc.)
    }
  }, []);

  const setLang = (l: LangCode) => {
    setLangState(l);
    // Only auto-update currency if the user hasn't manually overridden it.
    // "Not overridden" means current currency still equals the current language's default.
    const currentLangDefault = LANGUAGES.find((lg) => lg.code === lang)?.currency ?? "USD";
    const newLangDefault = LANGUAGES.find((lg) => lg.code === l)?.currency ?? "USD";
    const shouldUpdateCurrency = currency === currentLangDefault;
    if (shouldUpdateCurrency) {
      setCurrencyState(newLangDefault);
      try { localStorage.setItem("sam-currency", newLangDefault); } catch {}
    }
    try { localStorage.setItem("sam-lang", l); } catch {}
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
      lang, currency,
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
