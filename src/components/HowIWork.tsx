"use client";
import { useRef, useEffect, useState } from "react";
import { useLang } from "@/context/LangContext";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];
const E = `cubic-bezier(${EASE.join(",")})`;
const STEP_NUMS = ["01", "02", "03", "04"];

export default function HowIWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const contentRef = useRef<HTMLDivElement>(null);
  const [isDark, setIsDark] = useState(false);

  const { t } = useLang();

  // Toggle dark background when section is in view (fires both ways)
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => setIsDark(entry.isIntersecting),
      { rootMargin: "-15% 0px" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const steps = STEP_NUMS.map((n, i) => ({
    n,
    title: t(`process.s${i}.title`),
    duration: t(`process.s${i}.dur`),
    desc: t(`process.s${i}.desc`),
    detail: t(`process.s${i}.detail`),
  }));

  const trans = `0.72s ${E}`;

  return (
    <section
      ref={sectionRef}
      id="process"
      style={{
        width: "100%",
        paddingTop: 80,
        paddingBottom: 80,
        background: isDark ? "#0f0f0f" : "var(--bg)",
        transition: `background ${trans}`,
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", paddingLeft: 20, paddingRight: 20 }}>
        {/* Header */}
        <div
          ref={contentRef}
          className="process-header-row"
          style={{
            display: "flex",
            gap: 80,
            alignItems: "flex-end",
            flexWrap: "wrap",
            marginBottom: 64,
            borderBottom: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.08)"}`,
            paddingBottom: 40,
            transition: `border-color ${trans}`,
          }}
        >
          <div style={{ flex: "1 1 360px", animation: `fadeUp 0.5s 0.05s ${E} both` }}>
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 700,
                fontSize: 11,
                letterSpacing: "4px",
                textTransform: "uppercase",
                color: "var(--accent-purple)",
                marginBottom: 16,
              }}
            >
              {t("process.eyebrow")}
            </p>
            <h2
              style={{
                fontFamily: "var(--font-poppins)",
                fontWeight: 700,
                fontSize: "clamp(26px, 3.2vw, 44px)",
                letterSpacing: "-1px",
                lineHeight: 1.08,
                textTransform: "uppercase",
                color: isDark ? "#ffffff" : "var(--fg)",
                transition: `color ${trans}`,
              }}
            >
              {t("process.h1")}{" "}
              <span style={{
                color: isDark ? "rgba(255,255,255,0.6)" : "rgb(163,163,163)",
                transition: `color ${trans}`,
              }}>
                {t("process.h1b")}
              </span>
            </h2>
          </div>

          <p
            style={{
              flex: "1 1 280px",
              fontFamily: "var(--font-inter)",
              fontWeight: 400,
              fontSize: 15,
              lineHeight: 1.7,
              color: isDark ? "rgba(255,255,255,0.5)" : "var(--fg-secondary)",
              letterSpacing: "-0.3px",
              transition: `color ${trans}`,
              animation: `fadeUp 0.5s 0.14s ${E} both`,
            }}
          >
            {t("process.desc")}
          </p>
        </div>

        {/* Steps */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {steps.map((step, i) => (
            <div
              key={i}
              className="process-step"
              style={{
                display: "grid",
                gridTemplateColumns: "80px 1fr 1fr",
                gap: "0 48px",
                padding: "40px 0",
                borderBottom: i < steps.length - 1
                  ? `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.07)"}`
                  : "none",
                alignItems: "start",
                transition: `border-color ${trans}`,
                animation: `fadeUp 0.5s ${0.1 + i * 0.1}s ${E} both`,
              }}
            >
              {/* Step number */}
              <div>
                <span
                  style={{
                    fontFamily: "var(--font-satoshi)",
                    fontWeight: 700,
                    fontSize: "clamp(32px, 3vw, 48px)",
                    letterSpacing: "-0.04em",
                    color: isDark ? "rgba(255,255,255,0.2)" : "rgba(0,0,0,0.18)",
                    lineHeight: 1,
                    display: "block",
                    transition: `color ${trans}`,
                  }}
                >
                  {step.n}
                </span>
              </div>

              {/* Title + duration */}
              <div>
                <div
                  style={{
                    display: "inline-flex",
                    alignItems: "center",
                    gap: 10,
                    marginBottom: 12,
                  }}
                >
                  <h3
                    style={{
                      fontFamily: "var(--font-poppins)",
                      fontWeight: 700,
                      fontSize: "clamp(16px, 1.4vw, 20px)",
                      letterSpacing: "-0.4px",
                      textTransform: "uppercase",
                      color: isDark ? "#ffffff" : "var(--fg)",
                      lineHeight: 1,
                      transition: `color ${trans}`,
                    }}
                  >
                    {step.title}
                  </h3>
                  <span
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontWeight: 500,
                      fontSize: 11,
                      letterSpacing: "0.5px",
                      textTransform: "uppercase",
                      color: isDark ? "#c4b5fd" : "var(--accent-purple)",
                      background: isDark ? "rgba(109,40,217,0.35)" : "rgba(109,40,217,0.08)",
                      padding: "3px 8px",
                      borderRadius: 0,
                      flexShrink: 0,
                      transition: `background ${trans}`,
                    }}
                  >
                    {step.duration}
                  </span>
                </div>
                <p
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontWeight: 400,
                    fontSize: 15,
                    lineHeight: 1.7,
                    color: isDark ? "rgba(255,255,255,0.5)" : "var(--fg-secondary)",
                    letterSpacing: "-0.2px",
                    transition: `color ${trans}`,
                  }}
                >
                  {step.desc}
                </p>
              </div>

              {/* Detail callout */}
              <div
                style={{
                  borderLeft: `2px solid ${isDark ? "rgba(109,40,217,0.4)" : "rgba(109,40,217,0.15)"}`,
                  paddingLeft: 20,
                  marginTop: 4,
                  transition: `border-color ${trans}`,
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontWeight: 400,
                    fontSize: 14,
                    lineHeight: 1.65,
                    color: isDark ? "rgba(255,255,255,0.65)" : "var(--fg-secondary)",
                    letterSpacing: "-0.1px",
                    fontStyle: "italic",
                    transition: `color ${trans}`,
                  }}
                >
                  {step.detail}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
