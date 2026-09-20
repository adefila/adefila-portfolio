"use client";
import { useRef, useEffect, useState } from "react";
import { useLang } from "@/context/LangContext";

const IC = { stroke: "#7c3aed", sw: 2.5 };

const ICON_CSS = `
  @keyframes bolt-draw {
    0%,5%   { stroke-dashoffset:115; opacity:0; }
    30%     { stroke-dashoffset:0;   opacity:1; }
    60%     { stroke-dashoffset:0;   opacity:1; }
    63%     { stroke-dashoffset:0;   opacity:0.06; }
    67%     { stroke-dashoffset:0;   opacity:1; }
    71%     { stroke-dashoffset:0;   opacity:0.06; }
    76%     { stroke-dashoffset:0;   opacity:1; }
    88%,100%{ stroke-dashoffset:0;   opacity:0; }
  }
  @keyframes sonar {
    0%   { transform:scale(0.61); opacity:0; }
    12%  { opacity:0.75; }
    100% { transform:scale(1); opacity:0; }
  }
  @keyframes shackle-open {
    0%,28%   { transform:translateY(0); }
    50%      { transform:translateY(-10px); }
    56%      { transform:translateY(-8px); }
    72%      { transform:translateY(-8px); }
    84%      { transform:translateY(2px); }
    91%,100% { transform:translateY(0); }
  }
  @keyframes slide1 {
    0%,10%   { transform:translateX(0); }
    33%      { transform:translateX(-11px); }
    44%,53%  { transform:translateX(-11px); }
    76%      { transform:translateX(7px); }
    83%,88%  { transform:translateX(7px); }
    100%     { transform:translateX(0); }
  }
  @keyframes slide2 {
    0%,10%   { transform:translateX(0); }
    36%      { transform:translateX(14px); }
    46%,56%  { transform:translateX(14px); }
    78%      { transform:translateX(-5px); }
    84%,90%  { transform:translateX(-5px); }
    100%     { transform:translateX(0); }
  }
  @keyframes slide3 {
    0%,10%   { transform:translateX(0); }
    30%      { transform:translateX(-11px); }
    40%,50%  { transform:translateX(-11px); }
    72%      { transform:translateX(5px); }
    79%,86%  { transform:translateX(5px); }
    100%     { transform:translateX(0); }
  }
`;

function IsoSpeedIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden>
      <path
        d="M28,4 L12,26 L22,26 L18,44 L36,22 L26,22 Z"
        fill="none" stroke={IC.stroke} strokeWidth={IC.sw}
        strokeLinejoin="round" strokeLinecap="round"
        style={{ strokeDasharray: 115, animation: "bolt-draw 3.5s cubic-bezier(0.4,0,0.2,1) infinite" }}
      />
    </svg>
  );
}

function IsoAudienceIcon() {
  const ringStyle = (delay: string): React.CSSProperties => ({
    transformBox: "fill-box" as React.CSSProperties["transformBox"],
    transformOrigin: "center",
    animation: `sonar 2.7s ease-out infinite ${delay}`,
  });
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden>
      <circle cx="24" cy="24" r="4" stroke={IC.stroke} strokeWidth={IC.sw}/>
      <circle cx="24" cy="24" r="11" stroke={IC.stroke} strokeWidth={IC.sw} opacity="0.35"/>
      <circle cx="24" cy="24" r="18" fill="none" stroke={IC.stroke} strokeWidth={IC.sw} style={ringStyle("0s")}/>
      <circle cx="24" cy="24" r="18" fill="none" stroke={IC.stroke} strokeWidth={IC.sw} style={ringStyle("0.9s")}/>
      <circle cx="24" cy="24" r="18" fill="none" stroke={IC.stroke} strokeWidth={IC.sw} style={ringStyle("1.8s")}/>
    </svg>
  );
}

function IsoOwnershipIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden>
      <rect x="10" y="22" width="28" height="22" rx="3" stroke={IC.stroke} strokeWidth={IC.sw}/>
      <path
        d="M16 22 L16 16 Q24 6 32 16 L32 22"
        stroke={IC.stroke} strokeWidth={IC.sw} strokeLinecap="round" fill="none"
        style={{ animation: "shackle-open 3.5s cubic-bezier(0.4,0,0.2,1) infinite" }}
      />
      <circle cx="24" cy="33" r="3.5" stroke={IC.stroke} strokeWidth={IC.sw}/>
      <line x1="24" y1="36.5" x2="24" y2="40" stroke={IC.stroke} strokeWidth={IC.sw} strokeLinecap="round"/>
    </svg>
  );
}

function IsoToolsIcon() {
  return (
    <svg width="48" height="48" viewBox="0 0 48 48" fill="none" aria-hidden>
      <line x1="8" y1="14" x2="40" y2="14" stroke={IC.stroke} strokeWidth="1.5" strokeLinecap="round" opacity="0.3"/>
      <line x1="8" y1="24" x2="40" y2="24" stroke={IC.stroke} strokeWidth="1.5" strokeLinecap="round" opacity="0.3"/>
      <line x1="8" y1="34" x2="40" y2="34" stroke={IC.stroke} strokeWidth="1.5" strokeLinecap="round" opacity="0.3"/>
      <circle cx="28" cy="14" r="5.5" fill={IC.stroke}
        style={{ animation: "slide1 3.8s cubic-bezier(0.4,0,0.2,1) infinite 0s" }}/>
      <circle cx="16" cy="24" r="5.5" fill={IC.stroke}
        style={{ animation: "slide2 3.8s cubic-bezier(0.4,0,0.2,1) infinite 0.6s" }}/>
      <circle cx="32" cy="34" r="5.5" fill={IC.stroke}
        style={{ animation: "slide3 3.8s cubic-bezier(0.4,0,0.2,1) infinite 1.2s" }}/>
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
      <style>{ICON_CSS}</style>
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
            <div style={{
              marginBottom: 20,
              display: "inline-flex",
              alignItems: "center",
              justifyContent: "center",
              width: 64, height: 64,
              background: "#ede9fe",
              borderRadius: 12,
            }}>
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
