"use client";
import { useRef, useEffect, useState } from "react";
import { useLang } from "@/context/LangContext";
import SpecLabel from "./SpecLabel";
import RevealWords, { revealDelayAfter } from "./RevealWords";

// Icons draw on a 48-unit grid and show at 20px in a 32px box, so lines are thick in grid units.
const IC = { stroke: "#c4b5fd", sw: 4.5 };

const ICON_CSS = `
  @keyframes bolt-draw {
    0%,5%   { stroke-dashoffset:115; opacity:0.4; }
    30%     { stroke-dashoffset:0;   opacity:1; }
    60%     { stroke-dashoffset:0;   opacity:1; }
    63%     { stroke-dashoffset:0;   opacity:0.06; }
    67%     { stroke-dashoffset:0;   opacity:1; }
    71%     { stroke-dashoffset:0;   opacity:0.06; }
    76%     { stroke-dashoffset:0;   opacity:1; }
    88%,100%{ stroke-dashoffset:0;   opacity:0.4; }
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
    <svg width="22" height="22" viewBox="0 0 48 48" fill="none" aria-hidden>
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
    <svg width="22" height="22" viewBox="0 0 48 48" fill="none" aria-hidden>
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
    <svg width="22" height="22" viewBox="0 0 48 48" fill="none" aria-hidden>
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
    <svg width="22" height="22" viewBox="0 0 48 48" fill="none" aria-hidden>
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
  { value: 6, suffix: "+" }, // since 2020, matches the About section
];


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

const WM_CSS = `
  .wm-head { max-width: 860px; margin-bottom: 40px; }
  .wm-stats { display: grid; grid-template-columns: repeat(3, 1fr); border-top: 1px solid rgba(var(--ink), 0.14); border-bottom: 1px solid rgba(var(--ink), 0.14); }
  .wm-stat { display: flex; flex-direction: column; gap: 8px; padding: 28px 32px; }
  .wm-stat:first-child { padding-left: 0; }
  .wm-stat + .wm-stat { border-left: 1px solid rgba(var(--ink), 0.14); }
  .wm-stat-num { font-family: var(--font-satoshi); font-weight: 600; font-size: clamp(36px, 4.6vw, 60px); letter-spacing: -0.04em; line-height: 1; color: var(--fg); }
  .wm-stat-label { font-family: var(--font-inter); font-size: 12px; letter-spacing: 0.04em; text-transform: uppercase; line-height: 1.4; color: var(--fg-secondary); }
  .wm-benefits { display: grid; grid-template-columns: repeat(4, 1fr); gap: 0 32px; }
  .wm-benefit { padding: 32px 0 8px; }
  .wm-services { display: flex; flex-wrap: wrap; gap: 8px; margin-top: 24px; padding-top: 28px; border-top: 1px solid rgba(var(--ink), 0.14); }
  .wm-service { display: inline-flex; align-items: baseline; gap: 8px; padding: 9px 14px; border: 1px solid rgba(var(--ink), 0.14); font-family: var(--font-inter); font-size: 11px; font-weight: 500; letter-spacing: 0.08em; text-transform: uppercase; color: var(--fg); }
  .wm-service i { font-style: normal; font-size: 10px; color: var(--fg-muted); }
  @media (max-width: 1024px) { .wm-benefits { grid-template-columns: repeat(2, 1fr); gap: 0 40px; } }
  @media (max-width: 768px) {
    .wm-head { margin-bottom: 28px; }
    .wm-stat { padding: 20px 14px; }
    .wm-stat:first-child { padding-left: 0; }
    .wm-stat-label { font-size: 10px; letter-spacing: 0.02em; }
    .wm-benefits { grid-template-columns: 1fr; }
    .wm-benefit { padding: 24px 0 4px; }
    .wm-services { gap: 6px; }
  }
`;

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
  const services = Array.from({ length: 6 }, (_, i) => ({ n: String(i + 1), label: t(`whyme.svc${i + 1}`) }));
  const benefits = BENEFIT_ISO_ICONS.map((Icon, i) => ({
    Icon,
    title: t(`whyme.b${i}.title`),
    desc: t(`whyme.b${i}.desc`),
  }));

  return (
    <section
      id="benefits"
      style={{ width: "100%", maxWidth: 1200, margin: "0 auto", padding: "80px 20px" }}
    >
      <style>{ICON_CSS}</style>
      <style>{WM_CSS}</style>

      <SpecLabel text={t("whyme.eyebrow")} />
      {/* Heading */}
      <div data-reveal className="wm-head">
        <h2 style={{
          fontFamily: "var(--font-poppins)", fontWeight: 700,
          fontSize: "clamp(28px, 3.5vw, 48px)", letterSpacing: "-1px",
          lineHeight: 1.05, textTransform: "uppercase", color: "var(--fg)",
        }}>
          <RevealWords text={t("whyme.h1")} />{" "}
          <span style={{ color: "rgb(163,163,163)" }}><RevealWords text={t("whyme.h1b")} delay={revealDelayAfter(t("whyme.h1"))} /></span>
        </h2>
      </div>

      {/* Stats: one row */}
      <div ref={statsRef} data-reveal className="wm-stats corners">
        {stats.map((s, i) => (
          <div key={i} className="wm-stat">
            <span className="wm-stat-num"><CountUp target={s.value} suffix={s.suffix} inView={inView} /></span>
            <span className="wm-stat-label">{s.label}</span>
          </div>
        ))}
      </div>

      {/* Benefits */}
      <div className="wm-benefits">
        {benefits.map(({ Icon, title, desc }, i) => (
          <div key={i} data-reveal className="wm-benefit">
            <div style={{
              marginBottom: 16, display: "inline-flex", alignItems: "center", justifyContent: "center",
              width: 40, height: 40, background: "rgba(139, 92, 246, 0.14)", border: "1px solid rgba(167, 139, 250, 0.55)", borderRadius: 0,
            }}>
              <Icon />
            </div>
            <h3 className="benefit-title" style={{
              fontFamily: "var(--font-inter)", fontWeight: 700, fontSize: 14,
              letterSpacing: "0.3px", textTransform: "uppercase", color: "var(--fg)", lineHeight: 1.3,
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

      {/* Services: one wrapping row of tags instead of a six-cell grid */}
      <div data-reveal className="wm-services">
        {services.map((s) => (
          <span key={s.n} className="wm-service"><i>{s.n.padStart(2, "0")}</i>{s.label}</span>
        ))}
      </div>
    </section>
  );
}
