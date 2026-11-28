"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import { useLang } from "@/context/LangContext";
import SpecLabel from "./SpecLabel";
import RevealWords, { revealDelayAfter } from "./RevealWords";

type Faq = { q: string; a: string; i: number };

// The five questions people really ask: cost, timeline, improving a site they already have, running it afterwards, and how to start.
const FAQ_SHOWN = [2, 3, 5, 7, 9];

// The contact page shows every question, with the ones people ask before writing first, plus a few about the enquiry itself.
const FAQ_ALL = [2, 3, 9, 5, 0, 1, 4, 6, 7, 8];
// ...and on that page they sit in tabs, by what the visitor wants to know
const FAQ_CATS: { id: string; label: string; ids: number[] }[] = [
  { id: "start", label: "biz.faq.cat1", ids: [9, 0, 100, 101, 102] },
  { id: "price", label: "biz.faq.cat2", ids: [2, 3, 4] },
  { id: "build", label: "biz.faq.cat3", ids: [1, 8, 5] },
  { id: "after", label: "biz.faq.cat4", ids: [7, 6] },
];
const FAQ_EXTRA: Faq[] = [
  { i: 100, q: "How quickly will you reply?", a: "Within 24 hours, usually sooner. If your message is about a live site that is down or broken, say so in the first line and I will look at it first." },
  { i: 101, q: "What should I include in my message?", a: "Who you are and what the company does, the site you have now (if any), what you want it to do for the business, and a rough date you need it by. A budget range helps too, but it is fine to leave it out." },
  { i: 102, q: "Do you work with companies outside Nigeria?", a: "Yes. Most of my clients are in the US, the UK, Canada and across Africa, and I work async with a clear weekly update so time zones do not slow a project down." },
];

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function FAQ({ all = false, moreHref }: { all?: boolean; moreHref?: string } = {}) {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [cat, setCat] = useState(FAQ_CATS[0].id);
  const [expanded, setExpanded] = useState(false); // "See more questions" opens the full list, in tabs, in place
  const showAll = all || expanded;
  const { t } = useLang();

  const faqs: Faq[] = useMemo(
    () => [...(showAll ? FAQ_ALL : FAQ_SHOWN).map((i) => ({ i, q: t(`faq.q${i}`), a: t(`faq.a${i}`) })).filter((f) => f.q), ...(showAll ? FAQ_EXTRA : [])],
    [t, showAll],
  );

  const shown = showAll ? faqs.filter((f) => FAQ_CATS.find((c) => c.id === cat)?.ids.includes(f.i)) : faqs;
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
          {showAll && (
            <div className="fq-tabs" role="tablist" aria-label="Question categories">
              <style>{`.fq-tabs { display: flex; flex-wrap: wrap; gap: 6px 26px; margin: 0 0 18px; } .fq-tab { position: relative; padding: 0 0 10px; border: 0; background: none; cursor: pointer; font-family: var(--font-inter); font-weight: 600; font-size: 12.5px; letter-spacing: 0.06em; color: var(--fg-muted); transition: color 0.25s ease; } .fq-tab[aria-selected="true"], .fq-tab:hover { color: var(--fg); } .fq-line { position: absolute; left: 0; right: 0; bottom: 0; height: 2px; background: var(--accent-purple); }`}</style>
              {FAQ_CATS.map((c) => (
                <button key={c.id} type="button" role="tab" aria-selected={cat === c.id} className="fq-tab" onClick={() => { setCat(c.id); setOpenIndex(null); }}>
                  {t(c.label)}
                  {cat === c.id && <motion.span layoutId="fq-line" className="fq-line" transition={{ type: "spring", stiffness: 500, damping: 40 }} />}
                </button>
              ))}
            </div>
          )}
          {/* Full list: compact rows */}
          <div style={{ borderTop: "0.5px solid var(--line)" }}>
            {shown.map((faq, n) => {
              const isOpen = openIndex === faq.i;
              return (
                <motion.div
                  key={faq.i}
                  data-reveal
                  style={{
                    borderBottom: "0.5px solid var(--line)",
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
                      <span style={{ fontFamily: "var(--font-mono)", fontSize: 11, letterSpacing: "0.02em", color: isOpen ? "var(--accent-purple)" : "var(--fg-muted)", flexShrink: 0, transition: "color 0.2s", fontVariantNumeric: "tabular-nums", minWidth: 20 }}>
                        {String(n + 1).padStart(2, "0")}
                      </span>
                      <span style={{ fontFamily: "var(--font-inter)", fontWeight: 400, fontSize: 16, letterSpacing: "-0.01em", color: isOpen ? "var(--accent-purple)" : "var(--fg)", transition: "color 0.2s" }}>
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

          {moreHref && !showAll && (
            <button type="button" onClick={() => setExpanded(true)} className="faq-more" style={{ display: "inline-flex", alignItems: "center", gap: 8, marginTop: 24, fontFamily: "var(--font-inter)", fontWeight: 600, fontSize: 13, letterSpacing: "0.06em", color: "var(--accent-purple)", textDecoration: "none", textTransform: "uppercase", background: "none", border: 0, padding: 0, cursor: "pointer" }}>
              {t("biz.faq.more")} <span aria-hidden="true">→</span>
            </button>
          )}
        </div>
      </div>
    </section>
  );
}
