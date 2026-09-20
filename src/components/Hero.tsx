"use client";
import { CalendarDays, ArrowRight } from "lucide-react";
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
          gridTemplateColumns: "46fr 54fr",
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
              marginBottom: 28,
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

          {/* Headline — smaller, mixed case */}
          <div style={{ marginBottom: 20 }}>
            {[t("hero.h1"), t("hero.h2")].map((line, i) => (
              <div
                key={i}
                className="hero-headline"
                style={{
                  fontFamily: "var(--font-poppins)",
                  fontWeight: 700,
                  fontSize: "clamp(28px, 3.4vw, 48px)",
                  letterSpacing: "-0.04em",
                  lineHeight: 1.08,
                  textTransform: "none",
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
              fontSize: 15,
              letterSpacing: "-0.3px",
              lineHeight: 1.7,
              color: "var(--fg-secondary)",
              maxWidth: 400,
              marginBottom: 14,
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
              marginBottom: 32,
              animation: `heroFadeUp 0.6s 0.42s ${EASE} both`,
            }}
          >
            {t("hero.proof")}
          </p>

          {/* CTA row */}
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
                padding: "13px 26px",
                borderRadius: 0,
                textDecoration: "none",
                letterSpacing: "-0.2px",
                alignItems: "center",
                gap: 8,
              }}
            >
              {t("hero.cta")} <CalendarDays size={14} strokeWidth={2} />
            </MagneticButton>

            <MagneticButton
              href="#work"
              style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 500,
                fontSize: 14,
                color: "var(--fg)",
                background: "transparent",
                border: "1px solid rgba(0,0,0,0.18)",
                padding: "13px 26px",
                borderRadius: 0,
                textDecoration: "none",
                letterSpacing: "-0.2px",
                alignItems: "center",
                gap: 8,
              }}
            >
              See work <ArrowRight size={14} strokeWidth={2} />
            </MagneticButton>
          </div>
        </div>

        {/* ── RIGHT: isometric light card stack ── */}
        <div
          className="hero-stack-col"
          style={{ position: "relative", height: 640, overflow: "visible" }}
        >
          <div
            style={{
              position: "absolute",
              inset: "-8% -16%",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              WebkitMaskImage:
                "radial-gradient(ellipse 82% 78% at 50% 50%, black 28%, rgba(0,0,0,0.55) 52%, transparent 72%)",
              maskImage:
                "radial-gradient(ellipse 82% 78% at 50% 50%, black 28%, rgba(0,0,0,0.55) 52%, transparent 72%)",
            }}
          >
            <div
              style={{
                position: "relative",
                width: 520,
                height: 360,
                transform:
                  "perspective(1400px) rotateX(18deg) rotateY(-22deg) rotateZ(2deg)",
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
                      top: i * 36,
                      left: i * 26,
                      background: "#ffffff",
                      border: "1px solid rgba(0,0,0,0.08)",
                      overflow: "hidden",
                      opacity: isFront ? 1 : 1 - i * 0.18,
                      zIndex: cards.length - i,
                      boxShadow: isFront
                        ? "0 24px 80px rgba(0,0,0,0.18), 0 6px 24px rgba(0,0,0,0.10)"
                        : "0 2px 14px rgba(0,0,0,0.07)",
                    }}
                  >
                    {/* Accent top bar */}
                    <div
                      style={{
                        position: "absolute",
                        top: 0,
                        left: 0,
                        right: 0,
                        height: 3,
                        background: card.accent,
                        zIndex: 3,
                      }}
                    />

                    {/* Ghost number */}
                    <span
                      style={{
                        position: "absolute",
                        bottom: -20,
                        right: 8,
                        fontFamily: "var(--font-poppins)",
                        fontWeight: 700,
                        fontSize: 170,
                        letterSpacing: "-6px",
                        lineHeight: 1,
                        color: "rgba(0,0,0,0.03)",
                        userSelect: "none",
                        pointerEvents: "none",
                      }}
                    >
                      {String(i + 1).padStart(2, "0")}
                    </span>

                    {/* Top row — tag + year */}
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
                        padding: "20px 26px",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-inter)",
                          fontWeight: 700,
                          fontSize: 10,
                          letterSpacing: "2px",
                          textTransform: "uppercase",
                          color: card.accent,
                          border: `1px solid ${card.accent}45`,
                          padding: "4px 10px",
                          background: `${card.accent}08`,
                        }}
                      >
                        {card.tag}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-inter)",
                          fontSize: 11,
                          letterSpacing: "0.5px",
                          color: "rgba(0,0,0,0.28)",
                        }}
                      >
                        {card.year}
                      </span>
                    </div>

                    {/* Center — project title */}
                    <div
                      style={{
                        position: "absolute",
                        inset: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        padding: "0 32px",
                      }}
                    >
                      <h3
                        style={{
                          fontFamily: "var(--font-poppins)",
                          fontWeight: 700,
                          fontSize: "clamp(20px, 2.2vw, 30px)",
                          letterSpacing: "-0.04em",
                          lineHeight: 1.1,
                          color: isFront ? "#0f0f0f" : "rgba(0,0,0,0.55)",
                          textAlign: "center",
                          margin: 0,
                        }}
                      >
                        {card.title}
                      </h3>
                    </div>

                    {/* Bottom — meta + status dot */}
                    <div
                      style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        zIndex: 2,
                        padding: "16px 26px",
                        borderTop: "1px solid rgba(0,0,0,0.05)",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-inter)",
                          fontSize: 10,
                          letterSpacing: "1.2px",
                          textTransform: "uppercase",
                          color: "rgba(0,0,0,0.35)",
                        }}
                      >
                        {card.meta}
                      </span>
                      <span
                        style={{
                          width: 7,
                          height: 7,
                          borderRadius: "50%",
                          background: card.accent,
                          display: "inline-block",
                          flexShrink: 0,
                        }}
                      />
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
