"use client";
import { useEffect, useRef, useState } from "react";
import { useBurn } from "@/components/useBurn";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, CalendarDays } from "lucide-react";
import MagneticButton from "./MagneticButton";
import { useLang } from "@/context/LangContext";
import { BOOKING_URL } from "@/lib/booking";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

// Cycles the last word of the headline. Every word sits in the same grid cell so the line keeps the width of the longest one and
// never reflows. The word in view burns away into small pieces that scatter, and the next one re-forms in its place.
export function RotatingWord({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const reducedMotion = useReducedMotion();
  const wordRef = useRef<HTMLSpanElement>(null);
  const burn = useBurn({ freq: "0.06 0.075", scatter: 42, lift: 8, seed: 9, k: 24, ms: 520 });
  const run = burn.run;

  useEffect(() => {
    if (reducedMotion || words.length < 2) return;
    let alive = true;
    (async () => {
      while (alive) {
        await new Promise((r) => setTimeout(r, 2600));
        if (!alive) break;
        await run(wordRef.current, () => setIndex((i) => (i + 1) % words.length));
      }
    })();
    return () => { alive = false; };
  }, [reducedMotion, words.length, run]);

  const active = index % words.length;

  return (
    <span style={{ display: "inline-grid", position: "relative", maxWidth: "100%", verticalAlign: "bottom", paddingBottom: "0.06em" }}>
      {burn.svg}
      {/* every word, invisible, so the line keeps the width of the longest one */}
      {words.map((word) => (
        <span key={word} aria-hidden="true" style={{ gridArea: "1 / 1", visibility: "hidden", whiteSpace: "normal", overflowWrap: "break-word" }}>{word}</span>
      ))}
      <span ref={wordRef} style={{ gridArea: "1 / 1", whiteSpace: "normal", overflowWrap: "break-word", color: "var(--hero-word)" }}>{words[active]}</span>
    </span>
  );
}

// Real results from the case studies, floating over the hero photo.
const PROOF: { top?: string; bottom?: string; left?: string; right?: string; big: string; small: string; float: number; delay: number }[] = [
  { top: "9%", left: "3.5%", big: "12 pages live in 4 weeks", small: "DLP Africa", float: 5.2, delay: 0.9 },
  { top: "36%", right: "3%", big: "5+ new clients from one landing page", small: "The Initial", float: 6.1, delay: 1.1 },
  { bottom: "9%", left: "6%", big: "$10K+ paid out in under a month", small: "BookedEZ", float: 5.6, delay: 1.3 },
];

export default function Hero({ workHref = "#work" }: { workHref?: string }) {
  const { t, lang } = useLang();
  const words = t("hero.h2.words").split("|");

  return (
    <section
      id="hero"
      className="hero-section"
      style={{ position: "relative", paddingTop: 128, paddingBottom: 80, width: "100%", overflow: "hidden" }}
      onPointerMove={(e) => {
        // the lit grid follows the mouse (not touch)
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
    >
      {/* a soft cloud of colour at the top that fades into the page */}
      <div aria-hidden="true" className="hero-cloud" />
      <div className="hero-grid" style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", paddingLeft: 20, paddingRight: 20, display: "block" }}>
        <div>
          <p className="hero-eyebrow"><i aria-hidden="true" />Top Rated on Upwork, 100% Job Success across 50+ projects</p>
          <h1
            aria-label={`${t("hero.h1")} ${t("hero.h2.prefix")} ${words[0]}`.replace(/\s+/g, " ").trim()}
            style={{ marginBottom: 14, maxWidth: 1100, fontSize: "inherit", fontWeight: "inherit" }}
          >
            {[t("hero.h1"), null].map((line, i) => (
              <span
                key={i}
                aria-hidden="true"
                className="hero-headline"
                style={{
                  fontFamily: "var(--font-poppins)",
                  fontWeight: 700,
                  fontSize: "clamp(44px, 6.6vw, 96px)",
                  letterSpacing: "-0.04em",
                  lineHeight: 1.05,
                  textTransform: "uppercase",
                  color: "var(--fg)",
                  display: "block",
                  maxWidth: "100%",
                  overflowWrap: "break-word",
                  animation: `heroMask 0.95s calc(var(--hero-delay, 0s) + ${0.15 + i * 0.14}s) ${EASE} both`,
                }}
              >
                {line ?? (
                  <>
                    {t("hero.h2.prefix") && <>{t("hero.h2.prefix")} </>}
                    <RotatingWord words={words} />
                  </>
                )}
              </span>
            ))}
          </h1>

          <p
            className="hero-subtitle"
            style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 400,
              fontSize: 18,
              letterSpacing: "-0.3px",
              lineHeight: 1.7,
              color: "var(--fg-secondary)",
              maxWidth: 640,
              marginBottom: 36,
              animation: `heroFadeUp 0.6s 0.35s ${EASE} both`,
            }}
          >
            {t("hero.subtitle")}
          </p>

          <div
            className="hero-cta"
            style={{ display: "flex", gap: 16, flexWrap: "wrap", animation: `heroFadeUp 0.6s 0.5s ${EASE} both` }}
          >
            <MagneticButton
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary"
              style={{
                fontFamily: "var(--font-mono)",
                fontWeight: 500,
                textTransform: "uppercase",
                lineHeight: "20px",
                fontSize: 13,
                padding: "14px 26px",
                borderRadius: 0,
                textDecoration: "none",
                letterSpacing: "0.02em",
                alignItems: "center",
                gap: 8,
              }}
            >
              {t("hero.cta")} <CalendarDays size={15} strokeWidth={2} />
            </MagneticButton>
            <MagneticButton
              href={workHref}
              className="btn-ticks"
              style={{
                fontFamily: "var(--font-mono)",
                fontWeight: 500,
                fontSize: 13,
                color: "var(--fg)",
                background: "transparent",
                border: "1px solid rgba(var(--ink), 0.2)",
                padding: "13px 25px",
                lineHeight: "20px",
                textTransform: "uppercase",
                borderRadius: 0,
                textDecoration: "none",
                letterSpacing: "0.02em",
                alignItems: "center",
                gap: 8,
                transition: "background 0.2s ease, border-color 0.2s ease, color 0.2s ease",
              }}
              onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.currentTarget.style.background = "var(--btn-bg)";
                e.currentTarget.style.borderColor = "var(--btn-bg)";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = "rgba(var(--ink), 0.2)";
                e.currentTarget.style.color = "var(--fg)";
              }}
            >
              {t("hero.ctaWork")} <ArrowDown size={15} strokeWidth={2} />
            </MagneticButton>
          </div>
        </div>

        {/* One big, clean picture of client sites on a flat ground: no texture, no animation */}
        <div className="hero-portrait" style={{ position: "relative", width: "100%", marginTop: 56, animation: `heroFadeUp 0.8s 0.6s ${EASE} both` }}>
          {PROOF.map((c) => (
            <motion.div
              key={c.big}
              className="hero-chip"
              style={{ top: c.top, bottom: c.bottom, left: c.left, right: c.right }}
              initial={{ opacity: 0, scale: 0.92, y: 14 }}
              animate={{ opacity: 1, scale: 1, y: [0, -7, 0] }}
              transition={{ opacity: { delay: c.delay, duration: 0.6 }, scale: { delay: c.delay, type: "spring", stiffness: 260, damping: 22 }, y: { delay: c.delay, duration: c.float, repeat: Infinity, ease: "easeInOut" } }}
            >
              <b>{c.big}</b>
              <span>{c.small}</span>
            </motion.div>
          ))}
          <Image src="/hero/business-photo.webp" alt="A designer working on a laptop in a bright modern office (photo by Vitaly Gariev on Unsplash)" width={2400} height={1300} priority sizes="(max-width: 1240px) 100vw, 1200px" style={{ display: "block", width: "100%", height: "auto" }} />
        </div>
      </div>
    </section>
  );
}
