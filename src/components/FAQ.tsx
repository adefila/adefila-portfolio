"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useMemo, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, CornerDownLeft, X } from "lucide-react";
import { useLang } from "@/context/LangContext";
import { BOOKING_URL } from "@/lib/booking";
import RevealWords, { revealDelayAfter } from "./RevealWords";

// ─── Matching ────────────────────────────────────────────────────────────────
// A visitor types a question; the best-matching FAQ answers come back as a reply. Words are
// compared without accents or plural endings. Each question also has a list of everyday
// words (English) that point at it ("price", "how long", "Shopify"), so a question phrased
// differently from the heading still finds its answer. Anything with no match is offered to
// Samuel through the contact form instead.
const STOP = new Set(("a an the and or but of to in on for with at by from as is are was were be do does did can could " +
  "would should will you your yours my me we our us it its this that these those i im ive what how why when where who which " +
  "any some there than then so if about into have has had get got just also please hi hello hey").split(" "));

const SYNONYMS: Record<number, string[]> = {
  0: ["client", "customer", "startup", "founder", "agency", "business", "company", "work", "serve", "industry", "niche"],
  1: ["tool", "platform", "framer", "shopify", "webflow", "wordpress", "woocommerce", "wix", "squarespace", "stack", "technology", "tech", "code", "react", "nextjs", "build", "cms"],
  2: ["price", "pricing", "cost", "much", "pay", "payment", "budget", "cheap", "expensive", "rate", "quote", "fee", "charge", "afford", "deposit", "invoice", "dollar", "usd", "money", "retainer"],
  3: ["time", "long", "fast", "quick", "deadline", "delivery", "turnaround", "day", "week", "speed", "soon", "urgent", "schedule", "timeline", "ready", "launch"],
  4: ["revision", "change", "edit", "feedback", "tweak", "amend", "round", "adjust", "alter", "redo", "unlimited"],
  5: ["existing", "improve", "redesign", "fix", "migrate", "migration", "upgrade", "old", "current", "revamp", "rebuild", "refresh", "audit", "broken", "outdated"],
  6: ["support", "maintenance", "maintain", "retainer", "update", "ongoing", "after", "help", "monthly", "host", "hosting", "bug"],
  7: ["manage", "easy", "control", "cms", "myself", "own", "training", "walkthrough", "handoff", "handover", "update", "technical"],
  8: ["template", "theme", "premade", "custom", "bespoke", "scratch", "unique", "original", "generic"],
  9: ["start", "started", "begin", "book", "call", "process", "next", "first", "onboard", "hire", "hiring", "contact", "consult", "meeting"],
};

const fold = (s: string) => s.normalize("NFD").replace(/[̀-ͯ]/g, "").toLowerCase();
const stem = (w: string) => (w.length > 4 ? w.replace(/(ing|ed|es|s)$/, "") : w);
const tokens = (s: string) =>
  fold(s).replace(/[^\p{L}\p{N}\s]/gu, " ").split(/\s+/).filter((w) => w.length > 2 && !STOP.has(w));

type Faq = { q: string; a: string; i: number };

function rank(query: string, faqs: Faq[]): { hit: Faq; score: number }[] {
  const words = tokens(query);
  if (!words.length) return [];
  const stems = words.map(stem);
  const scored = faqs.map((f) => {
    const q = fold(f.q), a = fold(f.a);
    const syn = (SYNONYMS[f.i] ?? []).map(stem);
    let score = 0;
    stems.forEach((s) => {
      if (q.includes(s)) score += 3;
      else if (a.includes(s)) score += 1;
      if (syn.includes(s)) score += 4;
    });
    return { hit: f, score };
  });
  return scored.filter((r) => r.score >= 3).sort((x, y) => y.score - x.score).slice(0, 3);
}

// Wraps the visitor's own words in the answer so they can see why it matched.
function highlight(text: string, query: string) {
  const words = tokens(query).filter((w) => w.length > 3);
  if (!words.length) return text;
  const re = new RegExp(`(${words.map((w) => w.replace(/[.*+?^${}()|[\]\\]/g, "\\$&")).join("|")})`, "gi");
  return text.split(re).map((part, k) =>
    k % 2 ? <mark key={k} style={{ background: "rgba(109,40,217,0.14)", color: "inherit", padding: "0 2px" }}>{part}</mark> : part
  );
}

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [query, setQuery] = useState("");
  const [shown, setShown] = useState<number | null>(null); // a related question picked in the reply
  const { t } = useLang();

  const faqs: Faq[] = useMemo(
    () => Array.from({ length: 10 }, (_, i) => ({ i, q: t(`faq.q${i}`), a: t(`faq.a${i}`) })).filter((f) => f.q),
    [t],
  );

  const asked = query.trim();
  const results = useMemo(() => (asked.length >= 3 ? rank(asked, faqs) : []), [asked, faqs]);
  const best = shown !== null ? faqs.find((f) => f.i === shown) : results[0]?.hit;
  const related = results.map((r) => r.hit).filter((f) => f.i !== best?.i).slice(0, 2);
  const noMatch = asked.length >= 3 && results.length === 0;

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  // Hands the question to the contact form below, pre-filled, so nothing typed is lost
  const sendToSamuel = () => {
    window.dispatchEvent(new CustomEvent("prefill-contact", { detail: { message: asked } }));
    document.getElementById("contact")?.scrollIntoView({ behavior: "smooth", block: "start" });
    setTimeout(() => document.getElementById("contact-message")?.focus({ preventScroll: true }), 700);
  };

  const body = { fontFamily: "var(--font-inter)", fontSize: 14, lineHeight: 1.65, letterSpacing: "-0.2px", color: "var(--fg-secondary)" } as const;

  return (
    <section
      id="faq"
      style={{ width: "100%", maxWidth: 1200, margin: "0 auto", padding: "80px 20px" }}
    >
      <div
        className="faq-grid"
        style={{ display: "grid", gridTemplateColumns: "1fr 1.1fr", gap: "0 80px", alignItems: "start" }}
      >
        {/* Left: heading, and the box where visitors type their own question */}
        <div className="faq-left" style={{ position: "sticky", top: 120 }}>
          <motion.p
            data-reveal
            style={{ fontFamily: "var(--font-inter)", fontWeight: 700, fontSize: 11, letterSpacing: "4px", textTransform: "uppercase", color: "var(--accent-purple)", marginBottom: 16 }}
          >
            {t("faq.eyebrow")}
          </motion.p>
          <motion.h2
            data-reveal
            style={{ fontFamily: "var(--font-poppins)", fontWeight: 700, fontSize: "clamp(28px, 3.5vw, 48px)", letterSpacing: "-1px", lineHeight: 1.05, textTransform: "uppercase", color: "var(--fg)", marginBottom: 20 }}
          >
            <RevealWords text={t("faq.h1")} />
            <br />
            <RevealWords text={t("faq.h2")} delay={revealDelayAfter(t("faq.h1"))} />
          </motion.h2>
          <motion.p
            data-reveal
            style={{ ...body, fontSize: 15, letterSpacing: "-0.3px", lineHeight: 1.7, marginBottom: 28 }}
          >
            {t("faq.desc")}{" "}
            <a href="mailto:samuel@adefilasamuel.com" style={{ color: "var(--accent-purple)", fontWeight: 500, textDecoration: "none" }}>
              samuel@adefilasamuel.com
            </a>
          </motion.p>

          <motion.div data-reveal style={{ background: "var(--white)", border: "1px solid rgba(0,0,0,0.08)", padding: 16 }}>
            <label htmlFor="faq-ask" style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12, cursor: "text" }}>
              <Image
                src="/samuel-portrait.webp"
                alt=""
                width={32}
                height={32}
                style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover", objectPosition: "50% 25%", flexShrink: 0 }}
              />
              <span>
                <span style={{ display: "block", fontFamily: "var(--font-inter)", fontWeight: 700, fontSize: 11, letterSpacing: "0.12em", textTransform: "uppercase", color: "var(--fg)" }}>
                  {t("faq.ask.label")}
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "var(--font-inter)", fontSize: 11, color: "var(--fg-muted)" }}>
                  <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent-green)" }} />
                  {t("faq.ask.status")}
                </span>
              </span>
            </label>
            <div style={{ position: "relative" }}>
              <input
                id="faq-ask"
                type="text"
                value={query}
                onChange={(e) => { setQuery(e.target.value); setShown(null); }}
                onKeyDown={(e) => { if (e.key === "Escape") { setQuery(""); setShown(null); } }}
                placeholder={t("faq.ask.placeholder")}
                autoComplete="off"
                maxLength={200}
                style={{
                  width: "100%", boxSizing: "border-box", padding: "13px 44px 13px 14px",
                  fontFamily: "var(--font-inter)", fontSize: 14, color: "var(--fg)",
                  background: "var(--bg)", border: "1px solid rgba(0,0,0,0.12)", borderRadius: 0, outline: "none",
                  transition: "border-color 0.18s",
                }}
                onFocus={(e) => (e.target.style.borderColor = "var(--accent-purple)")}
                onBlur={(e) => (e.target.style.borderColor = "rgba(0,0,0,0.12)")}
              />
              {query ? (
                <button
                  type="button"
                  onClick={() => { setQuery(""); setShown(null); document.getElementById("faq-ask")?.focus(); }}
                  aria-label={t("faq.ask.clear")}
                  style={{ position: "absolute", right: 6, top: "50%", transform: "translateY(-50%)", width: 32, height: 32, display: "inline-flex", alignItems: "center", justifyContent: "center", background: "transparent", border: 0, cursor: "pointer", color: "var(--fg-muted)" }}
                >
                  <X size={15} strokeWidth={2} />
                </button>
              ) : (
                <CornerDownLeft size={15} strokeWidth={2} aria-hidden="true" style={{ position: "absolute", right: 14, top: "50%", transform: "translateY(-50%)", color: "rgba(0,0,0,0.25)" }} />
              )}
            </div>
          </motion.div>
        </div>

        {/* Right: the reply to a typed question, then the full list */}
        <div>
          <div aria-live="polite">
            <AnimatePresence mode="popLayout" initial={false}>
              {asked.length >= 3 && (
                <motion.div
                  key="reply"
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -6 }}
                  transition={{ duration: 0.3, ease: EASE }}
                  style={{ marginBottom: 32, display: "grid", gap: 10 }}
                >
                  {/* What they typed */}
                  <div style={{ justifySelf: "end", maxWidth: "86%", background: "var(--fg)", color: "#fff", padding: "10px 14px", fontFamily: "var(--font-inter)", fontSize: 14, lineHeight: 1.5, wordBreak: "break-word" }}>
                    {asked}
                  </div>

                  {/* Samuel's answer */}
                  <div style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
                    <Image
                      src="/samuel-portrait.webp"
                      alt=""
                      width={32}
                      height={32}
                      style={{ width: 32, height: 32, borderRadius: "50%", objectFit: "cover", objectPosition: "50% 25%", flexShrink: 0, marginTop: 2 }}
                    />
                    <div style={{ background: "var(--white)", border: "1px solid rgba(0,0,0,0.08)", padding: "16px 18px", minWidth: 0, flex: 1 }}>
                      {best ? (
                        <>
                          <p style={{ fontFamily: "var(--font-inter)", fontWeight: 700, fontSize: 11, letterSpacing: "0.1em", textTransform: "uppercase", color: "var(--accent-purple)", marginBottom: 8 }}>
                            {best.q}
                          </p>
                          <p style={{ ...body, color: "var(--fg)", fontSize: 15, margin: 0 }}>{highlight(best.a, asked)}</p>
                          {related.length > 0 && (
                            <div style={{ marginTop: 14, paddingTop: 12, borderTop: "1px solid rgba(0,0,0,0.07)", display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
                              <span style={{ fontFamily: "var(--font-inter)", fontSize: 11, color: "var(--fg-muted)", textTransform: "uppercase", letterSpacing: "0.08em" }}>{t("faq.ask.related")}</span>
                              {related.map((r) => (
                                <button
                                  key={r.i}
                                  type="button"
                                  onClick={() => setShown(r.i)}
                                  style={{ fontFamily: "var(--font-inter)", fontWeight: 600, fontSize: 11, letterSpacing: "0.04em", textTransform: "uppercase", color: "var(--fg)", background: "var(--bg)", border: "1px solid rgba(0,0,0,0.12)", padding: "6px 10px", cursor: "pointer", textAlign: "left" }}
                                >
                                  {r.q}
                                </button>
                              ))}
                            </div>
                          )}
                        </>
                      ) : (
                        <p style={{ ...body, color: "var(--fg)", fontSize: 15, margin: 0 }}>{t("faq.ask.none")}</p>
                      )}

                      {/* Always a way forward: answer not quite right, or not listed at all */}
                      <div style={{ marginTop: 14, display: "flex", flexWrap: "wrap", gap: 10, alignItems: "center" }}>
                        <button
                          type="button"
                          onClick={sendToSamuel}
                          style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "var(--font-inter)", fontWeight: 600, fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", color: "#fff", background: noMatch ? "var(--accent-purple)" : "var(--fg)", border: 0, padding: "11px 16px", cursor: "pointer" }}
                        >
                          {noMatch ? t("faq.ask.send") : t("faq.ask.sendAlt")} <ArrowUpRight size={13} strokeWidth={2} />
                        </button>
                        {noMatch && (
                          <a
                            href={BOOKING_URL}
                            data-track-location="faq_ask"
                            style={{ display: "inline-flex", alignItems: "center", gap: 6, fontFamily: "var(--font-inter)", fontWeight: 600, fontSize: 12, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--fg)", textDecoration: "none", borderBottom: "1px solid rgba(0,0,0,0.3)", paddingBottom: 2 }}
                          >
                            {t("faq.ask.book")}
                          </a>
                        )}
                      </div>
                    </div>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Full list: compact rows */}
          <div style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}>
            {faqs.map((faq, n) => {
              const isOpen = openIndex === faq.i;
              return (
                <motion.div
                  key={faq.i}
                  data-reveal
                  style={{
                    borderBottom: "1px solid rgba(0,0,0,0.07)",
                    background: isOpen ? "rgba(109,40,217,0.025)" : "transparent",
                    transition: "background 0.25s ease",
                  }}
                >
                  <button
                    onClick={() => toggle(faq.i)}
                    aria-expanded={isOpen}
                    style={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", padding: "14px 0", background: "none", border: "none", cursor: "pointer", gap: 20, textAlign: "left" }}
                  >
                    <div style={{ display: "flex", alignItems: "center", gap: 14, minWidth: 0, flex: 1 }}>
                      <span style={{ fontFamily: "var(--font-inter)", fontSize: 10, letterSpacing: "0.5px", color: isOpen ? "var(--accent-purple)" : "rgba(0,0,0,0.2)", flexShrink: 0, transition: "color 0.2s", fontVariantNumeric: "tabular-nums", minWidth: 20 }}>
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
                        <p style={{ ...body, fontSize: 14, margin: 0, paddingBottom: 16, paddingLeft: 34, paddingRight: 12 }}>
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
