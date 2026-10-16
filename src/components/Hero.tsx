"use client";
import { useEffect, useState } from "react";
import { motion, useReducedMotion } from "framer-motion";
import { ArrowDown, ArrowRight, CalendarDays, Star } from "lucide-react";
import Image from "next/image";
import MagneticButton from "./MagneticButton";
import { useLang } from "@/context/LangContext";
import { SPOTS_OPEN, useNextStartMonth } from "@/lib/availability";
import { BOOKING_URL } from "@/lib/booking";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";
const SPRING = [0.22, 1, 0.36, 1] as [number, number, number, number];

// Cycles the last word of the headline. Every word sits in the same grid cell
// so the line keeps the width of the longest one and never reflows.
function RotatingWord({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    if (reducedMotion || words.length < 2) return;
    const id = setInterval(() => setIndex((i) => (i + 1) % words.length), 2600);
    return () => clearInterval(id);
  }, [reducedMotion, words.length]);

  const active = index % words.length;

  return (
    <span style={{ display: "inline-grid", overflow: "hidden", verticalAlign: "bottom", paddingBottom: "0.06em" }}>
      {words.map((word, i) => (
        <motion.span
          key={word}
          aria-hidden={i !== active}
          initial={false}
          animate={{ y: i === active ? "0%" : i < active ? "-110%" : "110%", opacity: i === active ? 1 : 0 }}
          transition={{ duration: 0.6, ease: SPRING }}
          style={{ gridArea: "1 / 1", whiteSpace: "nowrap", color: "var(--accent-purple)" }}
        >
          {word}
        </motion.span>
      ))}
    </span>
  );
}

const tagStyle: React.CSSProperties = {
  position: "absolute",
  zIndex: 2,
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
  background: "var(--white)",
  padding: "10px 14px",
  boxShadow: "0 10px 30px rgba(15,15,15,0.12)",
  fontFamily: "var(--font-inter)",
  fontWeight: 600,
  fontSize: 12,
  letterSpacing: "0.02em",
  color: "var(--fg)",
  whiteSpace: "nowrap",
};

export default function Hero({ workHref = "#work", altHref = "/local-business" }: { workHref?: string; altHref?: string }) {
  const { t, lang } = useLang();
  const nextStart = useNextStartMonth(lang);
  const words = t("hero.h2.words").split("|");

  return (
    <section id="hero" className="hero-section" style={{ position: "relative", paddingTop: 120, paddingBottom: 80, width: "100%", overflow: "hidden" }}>
      {/* Background: faint grid fading out from the top right, plus a soft glow behind the portrait */}
      <div
        aria-hidden="true"
        style={{
          position: "absolute",
          inset: 0,
          backgroundImage:
            "linear-gradient(rgba(15,15,15,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(15,15,15,0.05) 1px, transparent 1px)",
          backgroundSize: "56px 56px",
          WebkitMaskImage: "radial-gradient(ellipse 70% 80% at 75% 35%, black 0%, transparent 75%)",
          maskImage: "radial-gradient(ellipse 70% 80% at 75% 35%, black 0%, transparent 75%)",
          pointerEvents: "none",
        }}
      />
      <div
        aria-hidden="true"
        className="hero-glow"
        style={{
          position: "absolute",
          top: "8%",
          right: "6%",
          width: 520,
          height: 520,
          borderRadius: "50%",
          background: "radial-gradient(circle, rgba(109,40,217,0.12) 0%, rgba(0,171,74,0.05) 40%, rgba(247,247,247,0) 70%)",
          pointerEvents: "none",
        }}
      />

      <div className="hero-grid" style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", paddingLeft: 20, paddingRight: 20 }}>
        <div>
          <div
            className="hero-badge"
            style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 32, animation: `heroFadeUp 0.6s 0.1s ${EASE} both` }}
          >
            <span style={{ position: "relative", width: 8, height: 8, flexShrink: 0, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
              <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "var(--accent-green)", animation: "pulseRipple 2s ease-out infinite" }} />
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent-green)", display: "block", position: "relative", zIndex: 1 }} />
            </span>
            <span style={{ fontFamily: "var(--font-inter)", fontWeight: 600, fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "#006b2e" }}>
              {t("hero.badge").replace("{count}", String(SPOTS_OPEN))}
            </span>
            <span style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--fg-muted)", display: "inline-block" }} />
            <span style={{ fontFamily: "var(--font-inter)", fontWeight: 500, fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--fg-secondary)" }}>
              {t("hero.badge2").replace("{date}", nextStart)}
            </span>
          </div>

          <h1
            aria-label={`${t("hero.h1")} ${t("hero.h2.prefix")} ${words[0]}`.replace(/\s+/g, " ").trim()}
            style={{ marginBottom: 24, fontSize: "inherit", fontWeight: "inherit" }}
          >
            {[t("hero.h1"), null].map((line, i) => (
              <span
                key={i}
                aria-hidden="true"
                className="hero-headline"
                style={{
                  fontFamily: "var(--font-poppins)",
                  fontWeight: 700,
                  fontSize: "clamp(36px, 4.6vw, 64px)",
                  letterSpacing: "-0.04em",
                  lineHeight: 1.05,
                  textTransform: "uppercase",
                  color: "var(--fg)",
                  display: "block",
                  animation: `heroFadeUp 0.55s ${0.15 + i * 0.12}s ${EASE} both`,
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
              fontSize: 16,
              letterSpacing: "-0.3px",
              lineHeight: 1.65,
              color: "var(--fg-secondary)",
              maxWidth: 520,
              textWrap: "balance" as const,
              marginBottom: 16,
              animation: `heroFadeUp 0.6s 0.35s ${EASE} both`,
            }}
          >
            {t("hero.subtitle")}
          </p>

          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 500,
              fontSize: 11,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--fg-muted)",
              marginBottom: 32,
              animation: `heroFadeUp 0.6s 0.42s ${EASE} both`,
            }}
          >
            {t("hero.proof")}
          </p>

          <div
            className="hero-cta"
            style={{ display: "flex", gap: 12, flexWrap: "wrap", animation: `heroFadeUp 0.6s 0.5s ${EASE} both` }}
          >
            <MagneticButton
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 600,
                textTransform: "uppercase",
                lineHeight: "20px",
                fontSize: 13,
                color: "var(--white)",
                background: "var(--fg)",
                padding: "14px 26px",
                borderRadius: 0,
                textDecoration: "none",
                letterSpacing: "0.5px",
                alignItems: "center",
                gap: 8,
              }}
            >
              {t("hero.cta")} <CalendarDays size={15} strokeWidth={2} />
            </MagneticButton>
            <MagneticButton
              href={workHref}
              style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 600,
                fontSize: 13,
                color: "var(--fg)",
                background: "transparent",
                border: "1px solid rgba(0,0,0,0.2)",
                padding: "13px 25px",
                lineHeight: "20px",
                textTransform: "uppercase",
                borderRadius: 0,
                textDecoration: "none",
                letterSpacing: "0.5px",
                alignItems: "center",
                gap: 8,
                transition: "background 0.2s ease, border-color 0.2s ease, color 0.2s ease",
              }}
              onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.currentTarget.style.background = "var(--fg)";
                e.currentTarget.style.borderColor = "var(--fg)";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = "rgba(0,0,0,0.2)";
                e.currentTarget.style.color = "var(--fg)";
              }}
            >
              {t("hero.ctaWork")} <ArrowDown size={15} strokeWidth={2} />
            </MagneticButton>
          </div>
          {/* For business owners arriving from outreach: their own, jargon-free page */}
          <a
            href={altHref}
            data-track-location="hero_local"
            style={{
              display: "inline-flex", alignItems: "center", gap: 6, marginTop: 20,
              fontFamily: "var(--font-inter)", fontSize: 14, color: "var(--fg-secondary)",
              textDecoration: "none", borderBottom: "1px solid rgba(0,0,0,0.2)", paddingBottom: 2,
              animation: `heroFadeUp 0.6s 0.6s ${EASE} both`,
            }}
          >
            {t("hero.localLink")} <ArrowRight size={14} strokeWidth={2} />
          </a>
        </div>

        {/* Portrait with floating proof tags */}
        {/* CSS fade (not JS) so the portrait — the page's main image — shows without waiting for scripts */}
        <div
          className="hero-portrait"
          style={{ position: "relative", width: "100%", maxWidth: 420, justifySelf: "end", animation: `heroFadeUp 0.6s 0.1s ${EASE} both` }}
        >
          <div style={{ position: "relative", width: "100%", aspectRatio: "5 / 6", overflow: "hidden", background: "#fff" }}>
            <Image
              src="/samuel-portrait.webp"
              alt="Samuel Adefila"
              fill
              loading="eager"
              fetchPriority="high"
              sizes="(max-width: 768px) 90vw, 420px"
              style={{ objectFit: "cover", objectPosition: "50% 30%" }}
            />
          </div>

          <motion.div
            className="hero-tag hero-tag-top"
            animate={{ y: [0, -6, 0] }}
            transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
            style={{ ...tagStyle, top: 28, left: -32 }}
          >
            <Star size={14} strokeWidth={0} fill="#f5a524" />
            {t("hero.tagTopRated")}
          </motion.div>

          <motion.div
            className="hero-tag hero-tag-bottom"
            animate={{ y: [0, 6, 0] }}
            transition={{ duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.6 }}
            style={{ ...tagStyle, bottom: 36, right: -24 }}
          >
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent-green)" }} />
            {t("hero.tagShipped")}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
