"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLang } from "@/context/LangContext";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];
const STEP_NUMS = ["01", "02", "03", "04"];

export default function HowIWork() {
  const contentRef = useRef(null);
  const sectionRef = useRef(null);

  // Entrance animation fires once; color toggle fires both ways
  const inView = useInView(contentRef, { once: true, margin: "-10%" });
  const isDark = useInView(sectionRef, { once: false, margin: "-15% 0px" });

  const { t } = useLang();

  const steps = STEP_NUMS.map((n, i) => ({
    n,
    title: t(`process.s${i}.title`),
    duration: t(`process.s${i}.dur`),
    desc: t(`process.s${i}.desc`),
    detail: t(`process.s${i}.detail`),
  }));

  const trans = "0.72s cubic-bezier(0.22, 1, 0.36, 1)";

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
          <div style={{ flex: "1 1 360px" }}>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
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
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.06, ease: EASE }}
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
                color: isDark ? "rgba(255,255,255,0.28)" : "rgb(163,163,163)",
                transition: `color ${trans}`,
              }}>
                {t("process.h1b")}
              </span>
            </motion.h2>
          </div>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.14 }}
            style={{
              flex: "1 1 280px",
              fontFamily: "var(--font-inter)",
              fontWeight: 400,
              fontSize: 15,
              lineHeight: 1.7,
              color: isDark ? "rgba(255,255,255,0.5)" : "var(--fg-secondary)",
              letterSpacing: "-0.3px",
              transition: `color ${trans}`,
            }}
          >
            {t("process.desc")}
          </motion.p>
        </div>

        {/* Steps */}
        <div style={{ display: "flex", flexDirection: "column" }}>
          {steps.map((step, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.1, ease: EASE }}
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
                    color: isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.07)",
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
                      color: "var(--accent-purple)",
                      background: isDark ? "rgba(109,40,217,0.25)" : "rgba(109,40,217,0.08)",
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
                    color: isDark ? "rgba(255,255,255,0.45)" : "var(--fg-secondary)",
                    letterSpacing: "-0.1px",
                    fontStyle: "italic",
                    transition: `color ${trans}`,
                  }}
                >
                  {step.detail}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
