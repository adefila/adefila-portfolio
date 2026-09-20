"use client";
import { ArrowRight, CalendarDays } from "lucide-react";
import MagneticButton from "./MagneticButton";
import { useLang } from "@/context/LangContext";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

const projects = [
  { title: "The Initial",  meta: "Figma → Framer",            tag: "AI",     year: "2025", accent: "#7c3aed" },
  { title: "BindHQ",       meta: "Template Customization",     tag: "SaaS",   year: "2026", accent: "#0073e6" },
  { title: "Upside ESG",   meta: "Framer Dev & Integrations",  tag: "ESG",    year: "2026", accent: "#00ab4a" },
  { title: "VPA London",   meta: "Framer Development",         tag: "Talent", year: "2025", accent: "#d4a853" },
];

const navItems = ["Projects", "Design", "Dev", "Clients", "Contact"];
const clients  = ["BindHQ", "The Initial", "Upside ESG", "VPA London", "Framer"];

export default function Hero() {
  const { t } = useLang();

  return (
    <section
      id="hero"
      className="hero-section"
      style={{ paddingTop: 100, paddingBottom: 80, width: "100%", overflow: "hidden" }}
    >
      <style>{`
        @keyframes heroFadeUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }
        @media (max-width: 768px) {
          .hero-two-col   { grid-template-columns: 1fr !important; padding-right: 20px !important; }
          .hero-stack-col { display: none !important; }
        }
      `}</style>

      <div
        className="hero-two-col"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          paddingLeft: 20,
          paddingRight: 0,
          display: "grid",
          gridTemplateColumns: "44fr 56fr",
          gap: "0 32px",
          alignItems: "center",
          minHeight: 520,
        }}
      >
        {/* ── LEFT: copy ── */}
        <div style={{ paddingRight: 24 }}>

          {/* Pill badge — two-part with divider (matches reference) */}
          <div
            style={{
              display: "inline-flex",
              alignItems: "center",
              border: "1px solid rgba(0,0,0,0.13)",
              borderRadius: 999,
              padding: "5px 14px 5px 8px",
              gap: 10,
              marginBottom: 28,
              animation: `heroFadeUp 0.6s 0.08s ${EASE} both`,
            }}
          >
            <span
              style={{
                position: "relative",
                width: 7,
                height: 7,
                flexShrink: 0,
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <span
                style={{
                  position: "absolute",
                  inset: 0,
                  borderRadius: "50%",
                  background: "#22c55e",
                  animation: "pulseRipple 2s ease-out infinite",
                }}
              />
              <span
                style={{
                  width: 7,
                  height: 7,
                  borderRadius: "50%",
                  background: "#22c55e",
                  display: "block",
                  position: "relative",
                  zIndex: 1,
                }}
              />
            </span>
            <span
              style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 500,
                fontSize: 12,
                color: "rgba(0,0,0,0.6)",
              }}
            >
              {t("hero.badge")}
            </span>
            {/* Divider */}
            <span
              style={{
                width: 1,
                height: 12,
                background: "rgba(0,0,0,0.14)",
                display: "inline-block",
                flexShrink: 0,
              }}
            />
            <span
              style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 600,
                fontSize: 12,
                color: "#0f0f0f",
                display: "flex",
                alignItems: "center",
                gap: 4,
              }}
            >
              {t("hero.badge2")} <ArrowRight size={11} strokeWidth={2.5} />
            </span>
          </div>

          {/* Headline — large, heavy, mixed case */}
          <div style={{ marginBottom: 18 }}>
            {[t("hero.h1"), t("hero.h2")].map((line, i) => (
              <div
                key={i}
                style={{
                  fontFamily: "var(--font-poppins)",
                  fontWeight: 800,
                  fontSize: "clamp(34px, 4.2vw, 58px)",
                  letterSpacing: "-0.045em",
                  lineHeight: 1.06,
                  color: "#0f0f0f",
                  display: "block",
                  animation: `heroFadeUp 0.55s ${0.14 + i * 0.1}s ${EASE} both`,
                }}
              >
                {line}
              </div>
            ))}
          </div>

          {/* Subtitle */}
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 400,
              fontSize: 15,
              letterSpacing: "-0.2px",
              lineHeight: 1.7,
              color: "rgba(0,0,0,0.5)",
              maxWidth: 390,
              marginBottom: 32,
              animation: `heroFadeUp 0.6s 0.3s ${EASE} both`,
            }}
          >
            {t("hero.subtitle")}
          </p>

          {/* CTA buttons */}
          <div
            style={{
              display: "flex",
              gap: 12,
              flexWrap: "wrap",
              marginBottom: 48,
              animation: `heroFadeUp 0.6s 0.4s ${EASE} both`,
            }}
          >
            <MagneticButton
              href="https://calendly.com/adefilasamuel929/30min"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 600,
                fontSize: 14,
                color: "#fff",
                background: "#0f0f0f",
                padding: "13px 26px",
                borderRadius: 6,
                textDecoration: "none",
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
                color: "#0f0f0f",
                background: "transparent",
                border: "1px solid rgba(0,0,0,0.18)",
                padding: "13px 26px",
                borderRadius: 6,
                textDecoration: "none",
                alignItems: "center",
                gap: 8,
              }}
            >
              See work <ArrowRight size={14} strokeWidth={2} />
            </MagneticButton>
          </div>

          {/* Trust section */}
          <div style={{ animation: `heroFadeUp 0.6s 0.5s ${EASE} both` }}>
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: 13,
                color: "rgba(0,0,0,0.38)",
                marginBottom: 12,
              }}
            >
              Trusted by founders and{" "}
              <strong style={{ color: "rgba(0,0,0,0.6)", fontWeight: 600 }}>
                growing teams worldwide.
              </strong>
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 24, flexWrap: "wrap" }}>
              {clients.map((c) => (
                <span
                  key={c}
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontWeight: 700,
                    fontSize: 10,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "rgba(0,0,0,0.2)",
                  }}
                >
                  {c}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* ── RIGHT: isometric sidebar + cascading project cards ── */}
        <div
          className="hero-stack-col"
          style={{ position: "relative", height: 520, overflow: "visible" }}
        >
          <div
            style={{
              position: "absolute",
              top: 0,
              left: -20,
              right: -60,
              bottom: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-start",
            }}
          >
            {/* Isometric scene container */}
            <div
              style={{
                position: "relative",
                width: 660,
                height: 460,
                transform:
                  "perspective(1000px) rotateX(24deg) rotateY(-28deg) rotateZ(4deg)",
                animation: `heroFadeUp 0.9s 0.55s ${EASE} both`,
              }}
            >
              {/* ── Sidebar nav panel ── */}
              <div
                style={{
                  position: "absolute",
                  top: 40,
                  left: 0,
                  width: 68,
                  height: 360,
                  background: "#ffffff",
                  border: "1px solid rgba(0,0,0,0.09)",
                  borderRadius: 10,
                  boxShadow: "0 8px 32px rgba(0,0,0,0.10)",
                  overflow: "hidden",
                  zIndex: 5,
                }}
              >
                {/* Logo mark */}
                <div
                  style={{
                    height: 50,
                    borderBottom: "1px solid rgba(0,0,0,0.06)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    background: "#fafafa",
                  }}
                >
                  <div
                    style={{
                      width: 30,
                      height: 30,
                      borderRadius: 7,
                      background: "#0f0f0f",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                    }}
                  >
                    <span
                      style={{
                        fontFamily: "var(--font-poppins)",
                        fontWeight: 800,
                        fontSize: 10,
                        color: "#fff",
                        letterSpacing: "-0.02em",
                      }}
                    >
                      SA
                    </span>
                  </div>
                </div>

                {/* Nav items */}
                <div style={{ padding: "10px 0" }}>
                  {navItems.map((label, ni) => (
                    <div
                      key={label}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        alignItems: "center",
                        padding: "7px 0",
                        gap: 3,
                        background: ni === 0 ? "rgba(0,0,0,0.04)" : "transparent",
                      }}
                    >
                      {/* Icon block */}
                      <div
                        style={{
                          width: 20,
                          height: 20,
                          borderRadius: 5,
                          background:
                            ni === 0 ? "#0f0f0f" : "rgba(0,0,0,0.09)",
                        }}
                      />
                      <span
                        style={{
                          fontFamily: "var(--font-inter)",
                          fontSize: 7,
                          fontWeight: ni === 0 ? 700 : 500,
                          color:
                            ni === 0 ? "#0f0f0f" : "rgba(0,0,0,0.32)",
                          letterSpacing: "0.3px",
                        }}
                      >
                        {label}
                      </span>
                    </div>
                  ))}
                </div>
              </div>

              {/* ── Project cards — cascade bottom-left → top-right ── */}
              {projects.map((p, i) => {
                const cardW  = 332 - i * 16;
                const cardH  = 82  - i * 3;
                const top    = 280 - i * 74;
                const left   = 84  + i * 54;
                const isFront = i === 0;
                return (
                  <div
                    key={p.title}
                    style={{
                      position: "absolute",
                      top,
                      left,
                      width: cardW,
                      height: cardH,
                      background: "#ffffff",
                      border: "1px solid rgba(0,0,0,0.08)",
                      borderRadius: 10,
                      overflow: "hidden",
                      opacity: 1 - i * 0.18,
                      zIndex: 4 - i,
                      boxShadow: isFront
                        ? "0 12px 44px rgba(0,0,0,0.14), 0 2px 8px rgba(0,0,0,0.07)"
                        : "0 2px 10px rgba(0,0,0,0.06)",
                      display: "flex",
                      alignItems: "center",
                      gap: 12,
                      padding: "0 16px",
                    }}
                  >
                    {/* Coloured avatar circle */}
                    <div
                      style={{
                        width: 36,
                        height: 36,
                        borderRadius: "50%",
                        background: `${p.accent}18`,
                        flexShrink: 0,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                      }}
                    >
                      <div
                        style={{
                          width: 18,
                          height: 18,
                          borderRadius: "50%",
                          background: p.accent,
                        }}
                      />
                    </div>

                    {/* Name + meta */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                      <p
                        style={{
                          fontFamily: "var(--font-inter)",
                          fontWeight: 600,
                          fontSize: 13,
                          color: "#0f0f0f",
                          margin: 0,
                          whiteSpace: "nowrap",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                        }}
                      >
                        {p.title}
                      </p>
                      <p
                        style={{
                          fontFamily: "var(--font-inter)",
                          fontSize: 10,
                          color: "rgba(0,0,0,0.38)",
                          margin: "2px 0 0",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {p.meta}
                      </p>
                    </div>

                    {/* Tag badge + year */}
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: 8,
                        flexShrink: 0,
                      }}
                    >
                      <span
                        style={{
                          fontFamily: "var(--font-inter)",
                          fontWeight: 700,
                          fontSize: 9,
                          letterSpacing: "1.5px",
                          textTransform: "uppercase",
                          color: p.accent,
                          border: `1px solid ${p.accent}40`,
                          padding: "3px 8px",
                          background: `${p.accent}08`,
                          borderRadius: 4,
                        }}
                      >
                        {p.tag}
                      </span>
                      <span
                        style={{
                          fontFamily: "var(--font-inter)",
                          fontSize: 10,
                          color: "rgba(0,0,0,0.28)",
                        }}
                      >
                        {p.year}
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
