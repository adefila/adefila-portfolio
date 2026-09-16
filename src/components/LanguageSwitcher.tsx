"use client";
import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Globe } from "lucide-react";
import { useLang } from "@/context/LangContext";
import { LANGUAGES, CURRENCIES, CurrencyCode } from "@/i18n/translations";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function LanguageSwitcher() {
  const [open, setOpen] = useState(false);
  const { lang, currency, setLang, setCurrency } = useLang();
  const ref = useRef<HTMLDivElement>(null);

  const currentLang = LANGUAGES.find((l) => l.code === lang) ?? LANGUAGES[0];
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
    <div ref={ref} style={{ position: "fixed", bottom: 28, right: 28, zIndex: 5000 }}>
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
              background: "#ffffff",
              border: "1px solid rgba(0,0,0,0.09)",
              boxShadow: "0 12px 40px rgba(0,0,0,0.14)",
              overflow: "hidden",
            }}
          >
            {/* Languages */}
            <div style={{ padding: "14px 16px 10px" }}>
              <p style={{
                fontFamily: "var(--font-inter)",
                fontSize: 9,
                fontWeight: 700,
                letterSpacing: "2.5px",
                textTransform: "uppercase",
                color: "var(--fg-muted)",
                marginBottom: 10,
              }}>
                Language
              </p>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 3 }}>
                {LANGUAGES.map((l) => {
                  const active = lang === l.code;
                  return (
                    <button
                      key={l.code}
                      onClick={() => setLang(l.code)}
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        padding: "9px 10px",
                        background: active ? "var(--fg)" : "rgba(0,0,0,0.03)",
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
                          color: active ? "#fff" : "var(--fg)",
                          letterSpacing: "-0.2px",
                          display: "block",
                        }}>
                          {l.label}
                        </span>
                        <span style={{
                          fontFamily: "var(--font-inter)",
                          fontSize: 10,
                          color: active ? "rgba(255,255,255,0.5)" : "var(--fg-muted)",
                          letterSpacing: "0.5px",
                        }}>
                          {l.currency}
                        </span>
                      </div>
                    </button>
                  );
                })}
              </div>
            </div>

            {/* Divider */}
            <div style={{ height: 1, background: "rgba(0,0,0,0.07)", margin: "2px 0" }} />

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
                        background: active ? "var(--fg)" : "rgba(0,0,0,0.04)",
                        border: "none",
                        cursor: "pointer",
                        fontFamily: "var(--font-inter)",
                        fontSize: 11,
                        fontWeight: 600,
                        color: active ? "#fff" : "var(--fg-secondary)",
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

      {/* Trigger */}
      <motion.button
        whileTap={{ scale: 0.96 }}
        onClick={() => setOpen((v) => !v)}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          padding: "10px 16px",
          background: open ? "var(--fg)" : "#ffffff",
          border: "1px solid rgba(0,0,0,0.1)",
          boxShadow: "0 4px 20px rgba(0,0,0,0.1)",
          cursor: "pointer",
          fontFamily: "var(--font-inter)",
          fontSize: 12,
          fontWeight: 600,
          color: open ? "#fff" : "var(--fg)",
          letterSpacing: "-0.1px",
          transition: "background 0.2s, color 0.2s",
          whiteSpace: "nowrap",
        }}
      >
        <Globe size={13} strokeWidth={1.8} />
        <span>{currentLang.flag}</span>
        <span>{currentLang.code.toUpperCase()}</span>
        <span style={{ width: 1, height: 12, background: "currentColor", opacity: 0.2, display: "inline-block" }} />
        <span style={{ opacity: 0.7 }}>{currentCurr.symbol}</span>
        <span>{currentCurr.code}</span>
      </motion.button>
    </div>
  );
}
