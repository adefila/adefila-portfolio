"use client";
import React, { createContext, useContext, useState, useEffect } from "react";
import {
  LangCode, CurrencyCode, LANGUAGES, CURRENCIES, T,
} from "@/i18n/translations";

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
      if (savedLang && LANGUAGES.find((l) => l.code === savedLang)) setLangState(savedLang);
      if (savedCurr && CURRENCIES.find((c) => c.code === savedCurr)) setCurrencyState(savedCurr);
    } catch {
      // localStorage blocked (private mode etc.)
    }
  }, []);

  const setLang = (l: LangCode) => {
    setLangState(l);
    const defaultCurr = LANGUAGES.find((lg) => lg.code === l)?.currency ?? "USD";
    setCurrencyState(defaultCurr);
    try {
      localStorage.setItem("sam-lang", l);
      localStorage.setItem("sam-currency", defaultCurr);
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
