"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { useLang } from "@/context/LangContext";
import SpecLabel from "./SpecLabel";
import RevealWords, { revealDelayAfter } from "./RevealWords";

type Faq = { q: string; a: string; i: number };

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { t } = useLang();

  const faqs: Faq[] = useMemo(
    () => Array.from({ length: 10 }, (_, i) => ({ i, q: t(`faq.q${i}`), a: t(`faq.a${i}`) })).filter((f) => f.q),
    [t],
  );

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  const body = { fontFamily: "var(--font-inter)", fontSize: 14, lineHeight: 1.65, letterSpacing: "-0.2px", color: "var(--fg-secondary)" } as const;

  return (
    <section
      id="faq"
      style={{ width: "100%", maxWidth: 1200, margin: "0 auto", padding: "80px 20px" }}
    >
      <SpecLabel text={t("faq.eyebrow").replace(/\s*\.\s*/g, "")} />
      <div
        className="faq-grid"
        style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: "0 80px", alignItems: "start" }}
      >
        {/* Left: heading */}
        <div className="faq-left" style={{ position: "sticky", top: 120 }}>
          <motion.h2
            data-reveal
            style={{ fontFamily: "var(--font-poppins)", fontWeight: 700, fontSize: "clamp(28px, 3.5vw, 48px)", letterSpacing: "-1px", lineHeight: 1.05, textTransform: "uppercase", color: "var(--fg)", marginBottom: 16 }}
          >
            <RevealWords text={t("faq.h1")} />
            <br />
            <RevealWords text={t("faq.h2")} delay={revealDelayAfter(t("faq.h1"))} />
          </motion.h2>
          <motion.p
            data-reveal
            style={{ ...body, fontSize: 15, letterSpacing: "-0.3px", lineHeight: 1.7, marginBottom: 0 }}
          >
            {t("faq.desc")}{" "}
            <a href="mailto:samuel@adefilasamuel.com" style={{ color: "var(--accent-purple)", fontWeight: 500, textDecoration: "none" }}>
              samuel@adefilasamuel.com
            </a>
          </motion.p>
        </div>

        {/* Right: the list, then a box to type your own question; the reply fills in underneath as you type */}
        <div>
          {/* Full list: compact rows */}
          <div style={{ borderTop: "1px solid rgba(var(--ink), 0.14)" }}>
            {faqs.map((faq, n) => {
              const isOpen = openIndex === faq.i;
              return (
                <motion.div
                  key={faq.i}
                  data-reveal
                  style={{
                    borderBottom: "1px solid rgba(var(--ink), 0.14)",
                    padding: "0 14px",
                    background: isOpen ? "rgba(109,40,217,0.025)" : "transparent",
                    transition: "background 0.25s ease",
                  }}
                >
                  <button
                    onClick={() => toggle(faq.i)}
                    aria-expanded={isOpen}
                    style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: isOpen ? "16px 0 8px" : "16px 0", background: "none", border: "none", cursor: "pointer", gap: 20, textAlign: "left" }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 14, minWidth: 0, flex: 1 }}>
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.5px", color: isOpen ? "var(--accent-purple)" : "var(--fg-muted)", flexShrink: 0, transition: "color 0.2s", fontVariantNumeric: "tabular-nums", minWidth: 20 }}>
                        {String(n + 1).padStart(2, "0")}
                      </span>
                      <span style={{ fontFamily: "var(--font-inter)", fontWeight: 600, fontSize: 13, letterSpacing: "0.3px", color: isOpen ? "var(--accent-purple)" : "var(--fg)", textTransform: "uppercase", transition: "color 0.2s" }}>
                        {faq.q}
                      </span>
                    </div>
                    <motion.span
                      animate={{ rotate: isOpen ? 45 : 0 }}
                      transition={{ duration: 0.22 }}
                      style={{ fontSize: 20, color: isOpen ? "var(--accent-purple)" : "var(--fg)", flexShrink: 0, lineHeight: 1, display: "inline-block", transition: "color 0.2s" }}
                    >
                      +
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: EASE }}
                        style={{ overflow: "hidden" }}
                      >
                        <p style={{ ...body, fontSize: 14, margin: 0, paddingBottom: 16, paddingLeft: 34, paddingRight: 28 }}>
                          {faq.a}
                        </p>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </motion.div>
              );
            })}
          </div>

        </div>
      </div>
    </section>
  );
}
