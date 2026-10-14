"use client";
import { CalendarDays } from "lucide-react";
import MagneticButton from "./MagneticButton";
import { useLang } from "@/context/LangContext";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

export default function Hero() {
  const { t } = useLang();
  return (
    <section id="hero" className="hero-section" style={{ paddingTop: 120, paddingBottom: 80, width: "100%", overflow: "hidden" }}>

      <div style={{ maxWidth: 1200, margin: "0 auto", paddingLeft: 20, paddingRight: 20 }}>
        <div
          className="hero-badge"
          style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 32, animation: `heroFadeUp 0.6s 0.1s ${EASE} both` }}
        >
          <span style={{ position: "relative", width: 8, height: 8, flexShrink: 0, display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
            <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "var(--accent-green)", animation: "pulseRipple 2s ease-out infinite" }} />
            <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent-green)", display: "block", position: "relative", zIndex: 1 }} />
          </span>
          <span style={{ fontFamily: "var(--font-inter)", fontWeight: 600, fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "#006b2e" }}>
            {t("hero.badge")}
          </span>
          <span style={{ width: 3, height: 3, borderRadius: "50%", background: "var(--fg-muted)", display: "inline-block" }} />
          <span style={{ fontFamily: "var(--font-inter)", fontWeight: 500, fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--fg-secondary)" }}>
            {t("hero.badge2")}
          </span>
        </div>

        <h1 style={{ marginBottom: 24, fontSize: "inherit", fontWeight: "inherit" }}>
          {[t("hero.h1"), t("hero.h2")].map((line, i) => (
            <span
              key={i}
              className="hero-headline"
              style={{
                fontFamily: "var(--font-poppins)",
                fontWeight: 700,
                fontSize: "clamp(36px, 5vw, 76px)",
                letterSpacing: "-0.04em",
                lineHeight: 1.05,
                textTransform: "uppercase",
                color: "var(--fg)",
                display: "block",
                animation: `heroFadeUp 0.55s ${0.15 + i * 0.12}s ${EASE} both`,
              }}
            >
              {line}{i === 0 ? " " : ""}
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
            maxWidth: 560,
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
            href="https://calendly.com/adefilasamuel929/30min"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 600,
              fontSize: 14,
              color: "var(--white)",
              background: "var(--fg)",
              padding: "14px 28px",
              borderRadius: 0,
              textDecoration: "none",
              letterSpacing: "-0.2px",
              alignItems: "center",
              gap: 8,
            }}
          >
            {t("hero.cta")} <CalendarDays size={15} strokeWidth={2} />
          </MagneticButton>
        </div>
      </div>
    </section>
  );
}
