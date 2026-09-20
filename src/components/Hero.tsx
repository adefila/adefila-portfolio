"use client";
import { CalendarDays } from "lucide-react";
import MagneticButton from "./MagneticButton";
import { useLang } from "@/context/LangContext";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

const cards = [
  { title: "The Initial",  tag: "AI",        meta: "Figma to Framer",           year: "2025", accent: "#7c3aed" },
  { title: "BindHQ",       tag: "SaaS",       meta: "Template Customization",    year: "2026", accent: "#0073e6" },
  { title: "Upside ESG",   tag: "ESG",        meta: "Framer Dev & Integrations", year: "2026", accent: "#00ab4a" },
  { title: "VPA London",   tag: "Talent",     meta: "Framer Development",        year: "2025", accent: "#d4a853" },
];

export default function Hero() {
  const { t } = useLang();

  return (
    <section
      id="hero"
      className="hero-section"
      style={{ paddingTop: 120, paddingBottom: 100, width: "100%", overflow: "hidden" }}
    >
      <style>{`
        @media (max-width: 768px) {
          .hero-two-col { grid-template-columns: 1fr !important; }
          .hero-stack-col { display: none !important; }
        }
      `}</style>

      <div
        className="hero-two-col"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          paddingLeft: 20,
          paddingRight: 20,
          display: "grid",
          gridTemplateColumns: "55fr 45fr",
          gap: "0 60px",
          alignItems: "center",
          minHeight: 500,
        }}
      >
        {/* ── LEFT: copy ── */}
        <div>
          {/* Availability badge */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 6,
              marginBottom: 32,
              animation: `heroFadeUp 0.6s 0.1s ${EASE} both`,
            }}
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

          {/* Headline */}
          <div style={{ marginBottom: 24 }}>
            {[t("hero.h1"), t("hero.h2")].map((line, i) => (
              <div
                key={i}
                className="hero-headline"
                style={{
                  fontFamily: "var(--font-poppins)",
                  fontWeight: 700,
                  fontSize: "clamp(32px, 4.8vw, 72px)",
                  letterSpacing: "-0.05em",
                  lineHeight: 1.05,
                  textTransform: "uppercase",
                  color: "var(--fg)",
                  display: "block",
                  animation: `heroFadeUp 0.55s ${0.15 + i * 0.12}s ${EASE} both`,
                }}
              >
                {line}
              </div>
            ))}
          </div>

          {/* Subtitle */}
          <p
            className="hero-subtitle"
            style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 400,
              fontSize: 17,
              letterSpacing: "-0.5px",
              lineHeight: 1.65,
              color: "var(--fg-secondary)",
              maxWidth: 420,
              marginBottom: 16,
              animation: `heroFadeUp 0.6s 0.35s ${EASE} both`,
            }}
          >
            {t("hero.subtitle")}
          </p>

          {/* Trust proof */}
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 500,
              fontSize: 11,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--fg-muted)",
              marginBottom: 36,
              animation: `heroFadeUp 0.6s 0.42s ${EASE} both`,
            }}
          >
            {t("hero.proof")}
          </p>

          {/* CTA */}
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

        {/* ── RIGHT: isometric card stack ── */}
        <div
          className="hero-stack-col"
          style={{ position: "relative", height: 520, overflow: "visible" }}
        >
          {/*
            Outer wrapper applies the radial mask — fades edges to transparent
            so the stack dissolves into the page background on all sides.
          */}
          <div
            style={{
              position: "absolute",
              inset: "-10% -15%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              WebkitMaskImage:
                "radial-gradient(ellipse 72% 70% at 48% 52%, black 22%, rgba(0,0,0,0.6) 48%, transparent 72%)",
              maskImage:
                "radial-gradient(ellipse 72% 70% at 48% 52%, black 22%, rgba(0,0,0,0.6) 48%, transparent 72%)",
            }}
          >
            {/*
              Inner wrapper applies the isometric perspective rotation.
              Cards are stacked inside with absolute positioning + offset.
            */}
            <div
              style={{
                position: "relative",
                width: 380,
                height: 250,
                transform:
                  "perspective(1100px) rotateX(20deg) rotateY(-24deg) rotateZ(2deg)",
                transformStyle: "preserve-3d",
                animation: `heroFadeUp 0.9s 0.55s ${EASE} both`,
              }}
            >
              {cards.map((card, i) => {
                const isFront = i === 0;
                return (
                  <div
                    key={card.title}
                    style={{
                      position: "absolute",
                      width: "100%",
                      height: "100%",
                      // Each successive card sits further "back" — shifted down-right
                      top: i * 26,
                      left: i * 20,
                      background: "#0f0f0f",
                      border: "1px solid rgba(255,255,255,0.07)",
                      overflow: "hidden",
                      opacity: isFront ? 1 : 1 - i * 0.22,
                      zIndex: cards.length - i,
                      // Only the front card casts a shadow
                      boxShadow: isFront
                        ? "0 40px 100px rgba(0,0,0,0.28), 0 12px 32px rgba(0,0,0,0.18)"
                        : "none",
                    }}
                  >
                    {/* Accent colour wash — corner gradient */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        background: `linear-gradient(135deg, ${card.accent}20 0%, transparent 55%)`,
                        pointerEvents: "none",
                      }}
                    />

                    {/* Ghost number — background texture */}
                    <span
                      style={{
                        position: "absolute",
                        bottom: -10,
                        right: 8,
                        fontFamily: "var(--font-poppins)",
                        fontWeight: 700,
                        fontSize: 120,
                        letterSpacing: "-6px",
                        lineHeight: 1,
                        color: "rgba(255,255,255,0.03)",
                        userSelect: "none",
                        pointerEvents: "none",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {/* Top bar — tag + year */}
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        zIndex: 2,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        padding: "15px 18px",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-inter)",
                          fontWeight: 700,
                          fontSize: 9,
                          letterSpacing: "2.2px",
                          textTransform: "uppercase",
                          color: card.accent,
                          border: `1px solid ${card.accent}50`,
                          padding: "3px 8px",
                        }}
                      >
                        {card.tag}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-inter)",
                          fontSize: 9,
                          letterSpacing: "1px",
                          color: "rgba(255,255,255,0.25)",
                        }}
                      >
                        {card.year}
                      </span>
                    </div>

                    {/* Centred title */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "0 22px",
                      }}
                    >
                      <h3
                        style={{
                          fontFamily: "var(--font-poppins)",
                          fontWeight: 700,
                          fontSize: "clamp(16px, 2vw, 22px)",
                          letterSpacing: "-0.04em",
                          lineHeight: 1.1,
                          textTransform: "uppercase",
                          color: isFront ? "#ffffff" : "rgba(255,255,255,0.7)",
                          textAlign: "center",
                          margin: 0,
                        }}
                      >
                        {card.title}
                      </h3>
                    </div>

                    {/* Bottom bar — meta */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        zIndex: 2,
                        padding: "13px 18px",
                        borderTop: "1px solid rgba(255,255,255,0.05)",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-inter)",
                          fontSize: 9,
                          letterSpacing: "1.4px",
                          textTransform: "uppercase",
                          color: "rgba(255,255,255,0.32)",
                        }}
                      >
                        {card.meta}
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
