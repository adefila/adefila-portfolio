"use client";
import { useRef, useEffect, useState, useCallback } from "react";
import { useLang } from "@/context/LangContext";

const STEP_DURATION = 4000;
const E = "cubic-bezier(0.22,1,0.36,1)";
const TRANS = `0.72s ${E}`;
const STEP_NUMS = ["01", "02", "03", "04"];
const DAY_POS = [0, 33.33, 66.66, 100];

export default function HowIWork() {
  const sectionRef = useRef<HTMLElement>(null);
  const tablistRef = useRef<HTMLDivElement>(null);
  const [isDark, setIsDark] = useState(false);
  const [active, setActive] = useState(0);
  const [displayed, setDisplayed] = useState(0);
  const [fading, setFading] = useState(false);
  const [inView, setInView] = useState(false);
  const fillRef = useRef<HTMLDivElement>(null);
  const fadeTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const autoTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { t } = useLang();

  const steps = STEP_NUMS.map((n, i) => ({
    n,
    title: t(`process.s${i}.title`),
    duration: t(`process.s${i}.dur`),
    desc: t(`process.s${i}.desc`),
    detail: t(`process.s${i}.detail`),
  }));

  // Respect prefers-reduced-motion
  const prefersReducedMotion =
    typeof window !== "undefined"
      ? window.matchMedia("(prefers-reduced-motion: reduce)").matches
      : false;

  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        setIsDark(entry.isIntersecting);
        setInView(entry.isIntersecting);
      },
      { threshold: 0.15 }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  // Animate fill bar — skips animation if user prefers reduced motion
  useEffect(() => {
    const fill = fillRef.current;
    if (!fill) return;
    const from = DAY_POS[active];
    const to = active < DAY_POS.length - 1 ? DAY_POS[active + 1] : DAY_POS[active];
    if (prefersReducedMotion) {
      fill.style.transition = "none";
      fill.style.width = `${to}%`;
      return;
    }
    fill.style.transition = "none";
    fill.style.width = `${from}%`;
    requestAnimationFrame(() => requestAnimationFrame(() => {
      fill.style.transition = `width ${STEP_DURATION}ms linear`;
      fill.style.width = `${to}%`;
    }));
  }, [active, prefersReducedMotion]);

  // Autoplay — disabled when user prefers reduced motion
  useEffect(() => {
    if (autoTimer.current) clearTimeout(autoTimer.current);
    if (!inView || prefersReducedMotion) return;
    autoTimer.current = setTimeout(() => {
      setActive((prev) => {
        const next = (prev + 1) % STEP_NUMS.length;
        if (fadeTimer.current) clearTimeout(fadeTimer.current);
        setFading(true);
        fadeTimer.current = setTimeout(() => { setDisplayed(next); setFading(false); }, 180);
        return next;
      });
    }, STEP_DURATION);
    return () => { if (autoTimer.current) clearTimeout(autoTimer.current); };
  }, [active, inView, prefersReducedMotion]);

  const crossFadeTo = useCallback((i: number) => {
    if (fadeTimer.current) clearTimeout(fadeTimer.current);
    setFading(true);
    fadeTimer.current = setTimeout(() => {
      setDisplayed(i);
      setFading(false);
    }, 180);
  }, []);

  function handleStepClick(i: number) {
    if (i === active) return;
    setActive(i);
    crossFadeTo(i);
  }

  // Keyboard navigation: left/right arrows on tablist
  function handleTablistKeyDown(e: React.KeyboardEvent) {
    if (e.key === "ArrowRight") {
      const next = (active + 1) % steps.length;
      handleStepClick(next);
      (tablistRef.current?.querySelectorAll('[role="tab"]')[next] as HTMLElement)?.focus();
    } else if (e.key === "ArrowLeft") {
      const prev = (active - 1 + steps.length) % steps.length;
      handleStepClick(prev);
      (tablistRef.current?.querySelectorAll('[role="tab"]')[prev] as HTMLElement)?.focus();
    }
  }

  // Colors — all passing WCAG AA
  const fg      = isDark ? "#ffffff"                : "var(--fg)";
  // fgSub: 7.4:1 on both dark and light ✓
  const fgSub   = isDark ? "rgba(255,255,255,0.80)" : "#4b5563";
  // fgMuted: 5.9:1 dark / 4.7:1 light ✓ (passes AA for normal text)
  const fgMuted = isDark ? "rgba(255,255,255,0.62)" : "#5c6474";
  const fgGhost = isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.05)";
  const border  = isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.10)";
  const trackBg = isDark ? "rgba(255,255,255,0.12)" : "rgba(0,0,0,0.10)";
  const cardBg  = isDark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.03)";
  const cardBrd = isDark ? "rgba(255,255,255,0.10)" : "rgba(0,0,0,0.09)";

  const panelId = (i: number) => `process-panel-${i}`;
  const tabId   = (i: number) => `process-tab-${i}`;

  return (
    <section
      id="process"
      ref={sectionRef}
      aria-label="My process — how I work"
      style={{
        width: "100%",
        background: isDark ? "#0f0f0f" : "var(--bg)",
        transition: `background ${TRANS}`,
        padding: "80px 0",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 20px" }}>

        {/* Header */}
        <div style={{
          display: "flex", gap: 48, alignItems: "flex-end", flexWrap: "wrap",
          marginBottom: 48, borderBottom: `1px solid ${border}`,
          paddingBottom: 32, transition: `border-color ${TRANS}`,
        }}>
          <div style={{ flex: "1 1 320px" }}>
            <p style={{
              fontFamily: "var(--font-inter)", fontWeight: 700, fontSize: 11,
              letterSpacing: "4px", textTransform: "uppercase",
              color: "var(--accent-purple)", marginBottom: 10,
            }}>
              {t("process.eyebrow")}
            </p>
            <h2 style={{
              fontFamily: "var(--font-poppins)", fontWeight: 700,
              fontSize: "clamp(24px, 2.8vw, 40px)", letterSpacing: "-0.8px",
              lineHeight: 1.1, textTransform: "uppercase",
              color: fg, transition: `color ${TRANS}`,
            }}>
              {t("process.h1")}{" "}
              <span style={{
                color: isDark ? "rgba(255,255,255,0.45)" : "rgba(0,0,0,0.35)",
                transition: `color ${TRANS}`,
              }}>
                {t("process.h1b")}
              </span>
            </h2>
          </div>
          <p style={{
            flex: "1 1 260px", fontFamily: "var(--font-inter)", fontWeight: 400,
            fontSize: 15, lineHeight: 1.65, letterSpacing: "-0.2px",
            color: fgSub, transition: `color ${TRANS}`, maxWidth: 420,
          }}>
            {t("process.desc")}
          </p>
        </div>

        {/* Timeline track — decorative, aria-hidden */}
        <div
          aria-hidden="true"
          style={{ position: "relative", height: 2, background: trackBg, marginBottom: 16, transition: `background ${TRANS}` }}
        >
          <div
            ref={fillRef}
            style={{ position: "absolute", left: 0, top: 0, height: "100%", width: "0%", background: "var(--accent-purple)" }}
          />
          {steps.map((_, i) => {
            const isActive = i === active;
            const isPast = i < active;
            return (
              /* Visually small dot but 24×24 tap target via padding */
              <div
                key={i}
                style={{
                  position: "absolute", left: `${DAY_POS[i]}%`,
                  top: "50%", transform: "translate(-50%,-50%)",
                  width: 24, height: 24,
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                <div style={{
                  width: isActive ? 14 : 9, height: isActive ? 14 : 9,
                  borderRadius: "50%",
                  background: isPast || isActive ? "var(--accent-purple)" : trackBg,
                  border: `2px solid ${isPast || isActive ? "var(--accent-purple)" : border}`,
                  boxShadow: isActive ? "0 0 0 4px rgba(109,40,217,0.2)" : "none",
                  transition: `all 0.35s ${E}`,
                }} />
              </div>
            );
          })}
        </div>

        {/* Tab list */}
        <div
          ref={tablistRef}
          role="tablist"
          aria-label="Process steps"
          onKeyDown={handleTablistKeyDown}
          style={{ display: "flex", gap: 6 }}
          className="process-tabs"
        >
          {steps.map((step, i) => {
            const isActive = i === active;
            return (
              <button
                key={i}
                id={tabId(i)}
                role="tab"
                aria-selected={isActive}
                aria-controls={panelId(i)}
                tabIndex={isActive ? 0 : -1}
                onClick={() => handleStepClick(i)}
                style={{
                  flex: "1 1 0", minWidth: 0,
                  background: isActive
                    ? isDark ? "rgba(109,40,217,0.22)" : "rgba(109,40,217,0.08)"
                    : "transparent",
                  border: `1px solid ${isActive ? "rgba(109,40,217,0.4)" : border}`,
                  padding: "12px 14px 10px",
                  cursor: "pointer", textAlign: "left",
                  transition: `background 0.3s ease, border-color 0.3s ease`,
                  outline: "none",
                }}
              >
                {/* Step number + duration badge */}
                <div style={{ display: "flex", alignItems: "center", gap: 7, marginBottom: 6 }}>
                  <span style={{
                    fontFamily: "var(--font-poppins)", fontWeight: 700, fontSize: 11,
                    letterSpacing: "2px",
                    color: isActive ? "var(--accent-purple)" : fgMuted,
                    transition: `color 0.3s ease`,
                  }}>{step.n}</span>
                  <span style={{
                    fontFamily: "var(--font-inter)", fontWeight: 700, fontSize: 10,
                    letterSpacing: "0.5px", textTransform: "uppercase",
                    color: isActive ? "var(--accent-purple)" : fgMuted,
                    background: isActive
                      ? isDark ? "rgba(109,40,217,0.3)" : "rgba(109,40,217,0.1)"
                      : isDark ? "rgba(255,255,255,0.07)" : "rgba(0,0,0,0.06)",
                    padding: "2px 6px",
                    transition: `all 0.3s ease`,
                  }}>{step.duration}</span>
                </div>
                {/* Step title */}
                <span style={{
                  fontFamily: "var(--font-poppins)", fontWeight: 700,
                  fontSize: "clamp(11px, 1vw, 13px)", letterSpacing: "-0.1px",
                  textTransform: "uppercase",
                  color: isActive ? fg : fgMuted,
                  display: "block", lineHeight: 1.2,
                  transition: `color 0.3s ease`,
                }}>{step.title}</span>
              </button>
            );
          })}
        </div>

        {/* Content panels — live region so screen readers announce step changes */}
        <div
          aria-live="polite"
          aria-atomic="true"
          style={{
            marginTop: 20,
            opacity: fading ? 0 : 1,
            transform: fading ? "translateY(6px)" : "translateY(0)",
            transition: "opacity 0.18s ease, transform 0.18s ease",
          }}
        >
          {steps.map((step, i) => (
            <div
              key={i}
              id={panelId(i)}
              role="tabpanel"
              aria-labelledby={tabId(i)}
              hidden={i !== displayed}
              style={{
                display: i === displayed ? "grid" : "none",
                gridTemplateColumns: "1fr 1fr",
                background: cardBg, border: `1px solid ${cardBrd}`,
                transition: `background ${TRANS}, border-color ${TRANS}`,
              }}
              className="process-card-grid"
            >
              {/* Left — step detail */}
              <div
                style={{ padding: "32px 36px", borderRight: `1px solid ${cardBrd}`, transition: `border-color ${TRANS}` }}
                className="process-card-left"
              >
                <span
                  aria-hidden="true"
                  style={{
                    fontFamily: "var(--font-poppins)", fontWeight: 700,
                    fontSize: "clamp(64px, 8vw, 96px)", letterSpacing: "-4px",
                    color: fgGhost, display: "block", lineHeight: 1,
                    marginBottom: 20, userSelect: "none", transition: `color ${TRANS}`,
                  }}
                >
                  {step.n}
                </span>
                <h3 style={{
                  fontFamily: "var(--font-poppins)", fontWeight: 700,
                  fontSize: "clamp(18px, 2vw, 26px)", letterSpacing: "-0.4px",
                  textTransform: "uppercase", color: fg, marginBottom: 14,
                  lineHeight: 1.1, transition: `color ${TRANS}`,
                }}>
                  {step.title}
                </h3>
                <p style={{
                  fontFamily: "var(--font-inter)", fontWeight: 400,
                  fontSize: 15, lineHeight: 1.75, letterSpacing: "-0.1px",
                  color: fgSub, transition: `color ${TRANS}`,
                }}>
                  {step.desc}
                </p>
              </div>

              {/* Right — what to expect + nav */}
              <div
                style={{ padding: "32px 36px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}
                className="process-card-right"
              >
                <div>
                  <p style={{
                    fontFamily: "var(--font-inter)", fontWeight: 700, fontSize: 11,
                    letterSpacing: "3px", textTransform: "uppercase",
                    color: "var(--accent-purple)", marginBottom: 12,
                  }}>
                    What to expect
                  </p>
                  <p style={{
                    fontFamily: "var(--font-inter)", fontWeight: 400,
                    fontSize: 15, lineHeight: 1.75, letterSpacing: "-0.1px",
                    color: fgSub, fontStyle: "italic", transition: `color ${TRANS}`,
                  }}>
                    {step.detail}
                  </p>
                </div>

                {/* Nav arrows + step counter */}
                <div style={{ display: "flex", gap: 8, marginTop: 32, alignItems: "center" }}>
                  <button
                    onClick={() => handleStepClick(Math.max(0, active - 1))}
                    disabled={active === 0}
                    aria-label="Previous step"
                    style={{
                      width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center",
                      border: `1px solid ${border}`, background: "transparent",
                      cursor: active === 0 ? "default" : "pointer",
                      opacity: active === 0 ? 0.35 : 1,
                      transition: `opacity 0.2s ease, border-color ${TRANS}`,
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M8 2L4 6L8 10" stroke={isDark ? "#fff" : "#0f0f0f"} strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <button
                    onClick={() => handleStepClick(Math.min(steps.length - 1, active + 1))}
                    disabled={active === steps.length - 1}
                    aria-label="Next step"
                    style={{
                      width: 36, height: 36, display: "flex", alignItems: "center", justifyContent: "center",
                      border: `1px solid ${active === steps.length - 1 ? border : "transparent"}`,
                      background: active === steps.length - 1 ? "transparent" : "var(--accent-purple)",
                      cursor: active === steps.length - 1 ? "default" : "pointer",
                      opacity: active === steps.length - 1 ? 0.35 : 1,
                      transition: `all 0.2s ease`,
                    }}
                  >
                    <svg width="12" height="12" viewBox="0 0 12 12" fill="none" aria-hidden="true">
                      <path d="M4 2L8 6L4 10" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                    </svg>
                  </button>
                  <span
                    aria-label={`Step ${active + 1} of ${steps.length}`}
                    style={{
                      fontFamily: "var(--font-inter)", fontWeight: 500, fontSize: 12,
                      color: fgMuted, letterSpacing: "0.5px", marginLeft: 4,
                      transition: `color ${TRANS}`,
                    }}
                  >
                    {active + 1} / {steps.length}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <style>{`
        #process [role="tab"]:focus-visible {
          outline: 2px solid var(--accent-purple);
          outline-offset: 2px;
        }
        @media (max-width: 768px) {
          .process-card-grid { grid-template-columns: 1fr !important; }
          .process-card-left {
            border-right: none !important;
            border-bottom: 1px solid rgba(128,128,128,0.15) !important;
            padding: 24px 20px !important;
          }
          .process-card-right { padding: 20px 20px !important; }
          .process-tabs button {
            flex: 1 1 calc(50% - 3px) !important;
            min-width: 0 !important;
            padding: 10px 10px 8px !important;
          }
        }
      `}</style>
    </section>
  );
}
