"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useReducedMotion } from "framer-motion";
import { ArrowDown, CalendarDays } from "lucide-react";
import MagneticButton from "./MagneticButton";
import { useLang } from "@/context/LangContext";
import { BOOKING_URL } from "@/lib/booking";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const SPRING = [0.22, 1, 0.36, 1] as [number, number, number, number];

// Cycles the last word of the headline. Every word sits in the same grid cell
// so the line keeps the width of the longest one and never reflows.
export function RotatingWord({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || words.length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), 2600);
    return () => clearInterval(id);
  }, [reducedMotion, words.length]);

  const active = index % words.length;

  return (
    <span style={{ display: "inline-grid", position: "relative", maxWidth: "100%", overflow: "hidden", verticalAlign: "bottom", paddingBottom: "0.06em" }}>
      {/* every word, invisible, so the line keeps the width of the longest one */}
      {words.map((word) => (
        <span key={word} aria-hidden="true" style={{ gridArea: "1 / 1", visibility: "hidden", whiteSpace: "normal", overflowWrap: "break-word" }}>{word}</span>
      ))}
      {/* the word in view slides in from the right while the last one slides out to the left */}
      <AnimatePresence initial={false} mode="popLayout">
        <motion.span
          key={active}
          initial={{ x: "105%", opacity: 0 }}
          animate={{ x: "0%", opacity: 1 }}
          exit={{ x: "-105%", opacity: 0 }}
          transition={{ duration: 0.6, ease: SPRING }}
          style={{ gridArea: "1 / 1", whiteSpace: "normal", overflowWrap: "break-word", color: "var(--hero-word)" }}
        >
          {words[active]}
        </motion.span>
      </AnimatePresence>
    </span>
  );
}

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
          <Image src="/hero/business-photo.webp" alt="A designer working on a laptop in a bright modern office (photo by Vitaly Gariev on Unsplash)" width={2400} height={1300} priority sizes="(max-width: 1240px) 100vw, 1200px" style={{ display: "block", width: "100%", height: "auto" }} />
        </div>
      </div>
    </section>
  );
}
