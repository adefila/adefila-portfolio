"use client";
import { useRef, useEffect, useState } from "react";
import { useLang } from "@/context/LangContext";

const IC = {
  top: "#ede9fe", left: "#ddd6fe", right: "#c4b5fd",
  stroke: "#7c3aed", fill: "#7c3aed", sw: 1.5,
};

function IsoSpeedIcon() {
  return (
    <svg width="52" height="48" viewBox="0 0 52 48" fill="none" aria-hidden>
      <path d="M26 6 L44 15 L26 24 L8 15 Z" fill={IC.top} stroke={IC.stroke} strokeWidth={IC.sw} strokeLinejoin="round"/>
      <path d="M8 15 L8 34 L26 43 L26 24 Z" fill={IC.left} stroke={IC.stroke} strokeWidth={IC.sw} strokeLinejoin="round"/>
      <path d="M26 24 L26 43 L44 34 L44 15 Z" fill={IC.right} stroke={IC.stroke} strokeWidth={IC.sw} strokeLinejoin="round"/>
      <polyline points="21,17 26,11 31,17" fill="none" stroke={IC.fill} strokeWidth={IC.sw} strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="21,20 26,14 31,20" fill="none" stroke={IC.fill} strokeWidth={IC.sw} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function IsoAudienceIcon() {
  return (
    <svg width="52" height="48" viewBox="0 0 52 48" fill="none" aria-hidden>
      <path d="M26 6 L44 15 L26 24 L8 15 Z" fill={IC.top} stroke={IC.stroke} strokeWidth={IC.sw} strokeLinejoin="round"/>
      <path d="M8 15 L8 34 L26 43 L26 24 Z" fill={IC.left} stroke={IC.stroke} strokeWidth={IC.sw} strokeLinejoin="round"/>
      <path d="M26 24 L26 43 L44 34 L44 15 Z" fill={IC.right} stroke={IC.stroke} strokeWidth={IC.sw} strokeLinejoin="round"/>
      <ellipse cx="20" cy="11" rx="2" ry="1.2" fill={IC.fill}/>
      <line x1="20" y1="12.2" x2="20" y2="19" stroke={IC.fill} strokeWidth={IC.sw} strokeLinecap="round"/>
      <line x1="17" y1="15" x2="23" y2="15" stroke={IC.fill} strokeWidth={IC.sw} strokeLinecap="round"/>
      <ellipse cx="32" cy="11" rx="2" ry="1.2" fill={IC.fill}/>
      <line x1="32" y1="12.2" x2="32" y2="19" stroke={IC.fill} strokeWidth={IC.sw} strokeLinecap="round"/>
      <line x1="29" y1="15" x2="35" y2="15" stroke={IC.fill} strokeWidth={IC.sw} strokeLinecap="round"/>
    </svg>
  );
}

function IsoOwnershipIcon() {
  return (
    <svg width="52" height="48" viewBox="0 0 52 48" fill="none" aria-hidden>
      <path d="M26 6 L44 15 L26 24 L8 15 Z" fill={IC.top} stroke={IC.stroke} strokeWidth={IC.sw} strokeLinejoin="round"/>
      <path d="M8 15 L8 34 L26 43 L26 24 Z" fill={IC.left} stroke={IC.stroke} strokeWidth={IC.sw} strokeLinejoin="round"/>
      <path d="M26 24 L26 43 L44 34 L44 15 Z" fill={IC.right} stroke={IC.stroke} strokeWidth={IC.sw} strokeLinejoin="round"/>
      <ellipse cx="26" cy="10" rx="2.5" ry="1.5" fill={IC.fill}/>
      <line x1="26" y1="11.5" x2="26" y2="20" stroke={IC.fill} strokeWidth={IC.sw} strokeLinecap="round"/>
      <line x1="22" y1="15" x2="30" y2="15" stroke={IC.fill} strokeWidth={IC.sw} strokeLinecap="round"/>
    </svg>
  );
}

function IsoToolsIcon() {
  return (
    <svg width="52" height="48" viewBox="0 0 52 48" fill="none" aria-hidden>
      <path d="M26 6 L44 15 L26 24 L8 15 Z" fill={IC.top} stroke={IC.stroke} strokeWidth={IC.sw} strokeLinejoin="round"/>
      <path d="M8 15 L8 34 L26 43 L26 24 Z" fill={IC.left} stroke={IC.stroke} strokeWidth={IC.sw} strokeLinejoin="round"/>
      <path d="M26 24 L26 43 L44 34 L44 15 Z" fill={IC.right} stroke={IC.stroke} strokeWidth={IC.sw} strokeLinejoin="round"/>
      <line x1="18" y1="15" x2="34" y2="15" stroke={IC.fill} strokeWidth={IC.sw} strokeLinecap="round"/>
      <line x1="26" y1="9" x2="26" y2="21" stroke={IC.fill} strokeWidth={IC.sw} strokeLinecap="round"/>
      <circle cx="18" cy="15" r="1.8" fill={IC.fill}/>
      <circle cx="34" cy="15" r="1.8" fill={IC.fill}/>
      <circle cx="26" cy="9" r="1.8" fill={IC.fill}/>
      <circle cx="26" cy="21" r="1.8" fill={IC.fill}/>
    </svg>
  );
}

const BENEFIT_ISO_ICONS = [IsoSpeedIcon, IsoAudienceIcon, IsoOwnershipIcon, IsoToolsIcon];

const STAT_VALUES = [
  { value: 50, suffix: "+" },
  { value: 100, suffix: "%" },
  { value: 5, suffix: "+" },
];

const E = "cubic-bezier(0.22,1,0.36,1)";

function CountUp({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(target);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1600;
    const stepTime = 16;
    const steps = Math.ceil(duration / stepTime);
    const increment = target / steps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) { setCount(target); clearInterval(timer); }
      else { setCount(Math.floor(start)); }
    }, stepTime);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <>{count}{suffix}</>;
}

export default function WhyMe() {
  const statsRef = useRef<HTMLDivElement>(null);
  const [inView, setInView] = useState(false);
  const { t } = useLang();

  // Native IntersectionObserver — no framer-motion needed
  useEffect(() => {
    const el = statsRef.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setInView(true); obs.disconnect(); } },
      { rootMargin: "-10%" }
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  const stats = STAT_VALUES.map((s, i) => ({ ...s, label: t(`whyme.stat${i}`) }));
  const benefits = BENEFIT_ISO_ICONS.map((Icon, i) => ({
    Icon,
    title: t(`whyme.b${i}.title`),
    desc: t(`whyme.b${i}.desc`),
  }));
  const services = Array.from({ length: 6 }, (_, i) => ({ n: String(i + 1), label: t(`whyme.svc${i + 1}`) }));

  return (
    <section
      id="benefits"
      style={{ width: "100%", maxWidth: 1200, margin: "0 auto", padding: "80px 20px" }}
    >
      {/* Top row: heading left, stats right */}
      <div
        className="whyme-top-row"
        style={{ display: "flex", gap: 80, alignItems: "flex-start", flexWrap: "wrap", marginBottom: 64 }}
      >
        {/* Left: label + heading */}
        <div style={{ flex: "1 1 400px", animation: `fadeUp 0.55s 0.05s ${E} both` }}>
          <p style={{
            fontFamily: "var(--font-inter)", fontWeight: 700, fontSize: 11,
            letterSpacing: "4px", textTransform: "uppercase",
            color: "var(--accent-purple)", marginBottom: 16,
          }}>
            {t("whyme.eyebrow")}
          </p>
          <h2 style={{
            fontFamily: "var(--font-poppins)", fontWeight: 700,
            fontSize: "clamp(28px, 3.5vw, 48px)", letterSpacing: "-1px",
            lineHeight: 1.05, textTransform: "uppercase", color: "var(--fg)",
          }}>
            {t("whyme.h1")}{" "}
            <span style={{ color: "rgb(163,163,163)" }}>{t("whyme.h1b")}</span>
          </h2>
        </div>

        {/* Right: stats */}
        <div
          ref={statsRef}
          className="whyme-stats-col"
          style={{ flex: "1 1 300px", display: "flex", flexDirection: "column", gap: 32, paddingTop: 8 }}
        >
          {stats.map((s, i) => (
            <div
              key={i}
              className="whyme-stat"
              style={{
                display: "flex", alignItems: "center", gap: 16,
                borderBottom: "1px solid rgba(0,0,0,0.07)", paddingBottom: 24,
                animation: `fadeUp 0.5s ${0.1 + i * 0.08}s ${E} both`,
              }}
            >
              <span style={{
                fontFamily: "var(--font-satoshi)", fontWeight: 700,
                fontSize: "clamp(40px, 5vw, 64px)", letterSpacing: "-0.04em",
                lineHeight: 1, color: "var(--fg)", flexShrink: 0,
              }}>
                <CountUp target={s.value} suffix={s.suffix} inView={inView} />
              </span>
              <span style={{
                fontFamily: "var(--font-inter)", fontWeight: 400, fontSize: 13,
                letterSpacing: "0.02em", textTransform: "uppercase",
                color: "var(--fg-secondary)", lineHeight: 1.4,
              }}>
                {s.label}
              </span>
            </div>
          ))}
        </div>
      </div>

      {/* Benefits 2×2 */}
      <div
        className="benefits-grid"
        style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0 80px", marginBottom: 48 }}
      >
        {benefits.map(({ Icon, title, desc }, i) => (
          <div
            key={i}
            style={{
              borderTop: "1px solid rgba(0,0,0,0.1)", padding: "32px 0",
              animation: `fadeUp 0.4s ${0.15 + i * 0.07}s ${E} both`,
            }}
          >
            <div style={{ marginBottom: 16 }}>
              <Icon />
            </div>
            <h3 style={{
              fontFamily: "var(--font-inter)", fontWeight: 700, fontSize: 14,
              letterSpacing: "0.3px", textTransform: "uppercase", color: "var(--fg)", lineHeight: 1,
              marginBottom: 12,
            }}>
              {title}
            </h3>
            <p style={{
              fontFamily: "var(--font-inter)", fontWeight: 400, fontSize: 15,
              letterSpacing: "-0.2px", lineHeight: 1.6, color: "var(--fg-secondary)",
            }}>
              {desc}
            </p>
          </div>
        ))}
      </div>

      {/* Services numbered list */}
      <div
        className="services-grid whyme-services"
        style={{
          borderTop: "1px solid rgba(0,0,0,0.08)",
          display: "grid", gridTemplateColumns: "repeat(2, 1fr)", marginBottom: 64,
        }}
      >
        {services.map((s, i) => (
          <div
            key={i}
            style={{
              display: "flex", alignItems: "center", gap: 20,
              paddingTop: 28, paddingBottom: 28,
              paddingLeft: i % 2 !== 0 ? 32 : 0,
              borderBottom: "1px solid rgba(0,0,0,0.08)",
              borderRight: (i + 1) % 2 !== 0 ? "1px solid rgba(0,0,0,0.08)" : "none",
              animation: `fadeUp 0.4s ${0.2 + i * 0.05}s ${E} both`,
            }}
          >
            <span style={{ fontFamily: "var(--font-inter)", fontWeight: 400, fontSize: 13, color: "var(--fg-muted)", flexShrink: 0 }}>
              {s.n}
            </span>
            <span style={{
              fontFamily: "var(--font-poppins)", fontWeight: 600,
              fontSize: "clamp(14px, 1.2vw, 16px)", letterSpacing: "-0.3px",
              textTransform: "uppercase", color: "var(--fg)",
            }}>
              {s.label}
            </span>
          </div>
        ))}
      </div>
    </section>
  );
}
