"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe, X } from "lucide-react";
import { usePathname } from "next/navigation";
import { useLang } from "@/context/LangContext";
import { LANGUAGES, CURRENCIES, CurrencyCode } from "@/i18n/translations";
import ThemeToggle from "./ThemeToggle";
import { FORCE_DARK } from "@/lib/theme";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

// Nigeria: the language stays English, the prices show in naira
const NIGERIA = { flag: "🇳🇬", label: "Nigeria", note: "English · NGN" };

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const { lang, currency, setLang, setCurrency } = useLang();
  // Dutch and Norwegian are complete only on /local-business
  const onBusinessPage = !!usePathname()?.startsWith("/local-business");
  const languages = LANGUAGES.filter((l) => (l.code === "nl" || l.code === "no" ? onBusinessPage : true));
  const ref = useRef<HTMLDivElement>(null);

  const currentLang = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];
  const inNigeria = lang === "en" && currency === "NGN";
  const currentCurr = CURRENCIES.find((c) => c.code === currency) ?? CURRENCIES[0];

  useEffect(() => {
    if (!open) return;
    const handler = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    return () => document.removeEventListener("mousedown", handler);
  }, [open]);

  return (
    <div ref={ref} className="lang-switcher" style={{ position: "fixed", bottom: 28, right: 28, zIndex: 5000, display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8 }}>
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.96 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.96 }}
            transition={{ duration: 0.22, ease: EASE }}
            style={{
              position: "absolute",
              bottom: "calc(100% + 10px)",
              right: 0,
              width: 288,
              background: "var(--surface)",
              border: "1px solid rgba(var(--ink), 0.14)",
              boxShadow: "0 12px 40px rgba(0,0,0,0.14)",
              overflow: "hidden",
            }}
          >
            {/* Header with close */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "12px 16px 0" }}>
              <p style={{
                fontFamily: "var(--font-inter)",
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                color: "var(--fg-muted)",
              }}>
                Language &amp; Currency
              </p>
              <button
                onClick={() => setOpen(false)}
                aria-label="Close"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  width: 44,
                  height: 44,
                  background: "rgba(var(--ink), 0.06)",
                  border: "none",
                  cursor: "pointer",
                  borderRadius: 0,
                  color: "var(--fg)",
                  flexShrink: 0,
                }}
              >
                <X size={12} strokeWidth={2.5} />
              </button>
            </div>

            {/* Languages */}
            <div style={{ padding: "10px 16px 10px" }}>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3 }}>
                {languages.flatMap((l) => {
                  const active = lang === l.code && !(l.code === "en" && inNigeria);
                  const cards = [(
                    <button
                      key={l.code}
                      onClick={() => { setLang(l.code); setOpen(false); }}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "9px 10px",
                        background: active ? "var(--fg)" : "rgba(var(--ink), 0.03)",
                        border: "none",
                        cursor: "pointer",
                        textAlign: "left",
                        transition: "background 0.15s",
                      }}
                    >
                      <span style={{ fontSize: 15, lineHeight: 1 }}>{l.flag}</span>
                      <div>
                        <span style={{
                          fontFamily: "var(--font-inter)",
                          fontSize: 12,
                          fontWeight: active ? 600 : 400,
                          color: active ? "var(--on-fg)" : "var(--fg)",
                          letterSpacing: "-0.2px",
                          display: "block",
                        }}>
                          {l.label}
                        </span>
                        <span style={{
                          fontFamily: "var(--font-inter)",
                          fontSize: 10,
                          color: active ? "rgba(var(--surface-rgb), 0.6)" : "var(--fg-muted)",
                          letterSpacing: "0.5px",
                        }}>
                          {l.currency}
                        </span>
                      </div>
                    </button>
                  )];
                  if (l.code === "en") {
                    cards.push(
                      <button
                        key="en-ng"
                        onClick={() => { setLang("en"); setCurrency("NGN"); setOpen(false); }}
                        style={{
                          display: "flex",
                          alignItems: "center",
                          gap: 8,
                          padding: "9px 10px",
                          background: inNigeria ? "var(--fg)" : "rgba(var(--ink), 0.03)",
                          border: "none",
                          cursor: "pointer",
                          textAlign: "left",
                          transition: "background 0.15s",
                        }}
                      >
                        <span style={{ fontSize: 15, lineHeight: 1 }}>{NIGERIA.flag}</span>
                        <div>
                          <span style={{ fontFamily: "var(--font-inter)", fontSize: 12, fontWeight: inNigeria ? 600 : 400, color: inNigeria ? "var(--on-fg)" : "var(--fg)", letterSpacing: "-0.2px", display: "block" }}>{NIGERIA.label}</span>
                          <span style={{ fontFamily: "var(--font-inter)", fontSize: 10, color: inNigeria ? "rgba(var(--surface-rgb), 0.6)" : "var(--fg-muted)", letterSpacing: "0.5px" }}>{NIGERIA.note}</span>
                        </div>
                      </button>,
                    );
                  }
                  return cards;
                })}
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: "rgba(var(--ink), 0.07)", margin: "2px 0" }} />

            {/* Currencies */}
            <div style={{ padding: "10px 16px 14px" }}>
              <p style={{
                fontFamily: "var(--font-inter)",
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                color: "var(--fg-muted)",
                marginBottom: 10,
              }}>
                Display Currency
              </p>
              <div style={{ display: "flex", flexWrap: "wrap", gap: 3 }}>
                {CURRENCIES.map((c) => {
                  const active = currency === c.code;
                  return (
                    <button
                      key={c.code}
                      onClick={() => setCurrency(c.code as CurrencyCode)}
                      title={c.name}
                      style={{
                        padding: "6px 10px",
                        background: active ? "var(--fg)" : "rgba(var(--ink), 0.04)",
                        border: "none",
                        cursor: "pointer",
                        fontFamily: "var(--font-inter)",
                        fontSize: 11,
                        fontWeight: 600,
                        color: active ? "var(--on-fg)" : "var(--fg-secondary)",
                        letterSpacing: "0.3px",
                        transition: "background 0.15s, color 0.15s",
                        flexShrink: 0,
                      }}
                    >
                      {c.code}
                    </button>
                  );
                })}
              </div>
              <p style={{
                fontFamily: "var(--font-inter)",
                fontSize: 10,
                color: "var(--fg-muted)",
                marginTop: 10,
                lineHeight: 1.5,
              }}>
                Prices shown in {currentCurr.name} ({currentCurr.symbol}). Rates are indicative.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Framer Expert badge, sitting just above the trigger */}
      <a
        href="https://www.framer.com/@adefila-samuel/"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Framer Expert: Samuel Adefila on Framer"
        className="framer-badge btn-ticks"
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "7px 12px",
          background: "var(--surface)",
          border: "1px solid rgba(var(--ink), 0.14)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          fontFamily: "var(--font-mono)",
          fontSize: 10,
          fontWeight: 500,
          letterSpacing: "0.12em",
          textTransform: "uppercase",
          color: "var(--fg)",
          whiteSpace: "nowrap",
          textDecoration: "none",
        }}
      >
        <svg width="9" height="13" viewBox="0 0 14 21" aria-hidden="true" fill="currentColor"><path d="M0 0h14v7H7zM0 7h7l7 7H7v7l-7-7z" /></svg>
        <span>Framer Expert</span>
      </a>

      {/* Trigger */}
      <motion.button
        whileTap={{ scale: 0.96 }}
        onClick={() => setOpen((v) => !v)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "10px 16px",
          background: open ? "var(--fg)" : "var(--surface)",
          border: "1px solid rgba(var(--ink), 0.14)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          cursor: "pointer",
          fontFamily: "var(--font-inter)",
          fontSize: 12,
          fontWeight: 600,
          color: open ? "var(--on-fg)" : "var(--fg)",
          letterSpacing: "-0.1px",
          transition: "background 0.2s, color 0.2s",
          whiteSpace: "nowrap",
        }}
      >
        <Globe size={13} strokeWidth={1.8} />
        <span>{inNigeria ? NIGERIA.flag : currentLang.flag}</span>
        <span>{currentLang.code.toUpperCase()}</span>
        <span style={{ width: 1, height: 12, background: "currentColor", opacity: 0.2, display: "inline-block" }} />
        <span style={{ opacity: 0.7 }}>{currentCurr.symbol}</span>
        <span>{currentCurr.code}</span>
      </motion.button>
      {!FORCE_DARK && <ThemeToggle />}
    </div>
  );
}
