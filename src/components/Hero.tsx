"use client";
import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";
import Image from "next/image";
import { useEffect, useState } from "react";
import MagneticButton from "./MagneticButton";
import { useLang } from "@/context/LangContext";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

const slides = [
  { title: "Elite Property", meta: "Framer Development · 2025", img: "/projects/elite-property.png" },
  { title: "Jamal Muse — Personal Portfolio", meta: "Claude to Framer · 2025", img: "/projects/jamal.png" },
  { title: "Nature", meta: "Web Design · 2025", img: "/projects/nature.png" },
  { title: "Virvly", meta: "Framer Development · 2025", img: "/projects/virvly.png" },
];

const track = [...slides, ...slides];

// Words that cycle in the hero — each scrambles in over ~1s
const SERVICES = ["FRAMER SITES", "LANDING PAGES", "WEB DASHBOARDS", "WEBFLOW SITES"];
const CHARS = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

const stats = [
  { value: "48+", label: "Projects" },
  { value: "14",  label: "Day Delivery" },
  { value: "5★",  label: "Client Rating" },
];

export default function Hero() {
  const { t } = useLang();
  const [display, setDisplay] = useState(SERVICES[0]);

  // Character-scramble cycling effect
  useEffect(() => {
    let idx = 0;

    const runNext = () => {
      idx = (idx + 1) % SERVICES.length;
      const target = SERVICES[idx];
      let iter = 0;
      // Each character takes ~5 iterations to "land" → total ≈ len * 5
      const maxIter = target.replace(/ /g, "").length * 5;

      const scramble = setInterval(() => {
        setDisplay(
          target
            .split("")
            .map((ch, ci) => {
              if (ch === " ") return " ";
              if (ci < Math.floor(iter / 5)) return ch; // already resolved
              return CHARS[Math.floor(Math.random() * CHARS.length)];
            })
            .join("")
        );
        iter++;
        if (iter > maxIter) {
          clearInterval(scramble);
          setDisplay(target);
        }
      }, 32);
    };

    const interval = setInterval(runNext, 3400);
    return () => clearInterval(interval);
  }, []);

  return (
    <section
      id="hero"
      className="hero-section"
      style={{ paddingTop: 120, paddingBottom: 0, width: "100%", overflow: "hidden" }}
    >
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marquee 32s linear infinite;
          will-change: transform;
        }
        .marquee-track:hover { animation-play-state: paused; }
        @media (max-width: 540px) {
          .hero-service { font-size: 44px !important; letter-spacing: -0.04em !important; }
        }
      `}</style>

      <div style={{ maxWidth: 1200, margin: "0 auto", paddingLeft: 20, paddingRight: 20 }}>

        {/* ── Badge ── */}
        <div
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
            marginBottom: 36,
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

        {/* ── Headline: small label + massive cycling word ── */}
        <div style={{ marginBottom: 28 }}>
          {/* "I DESIGN AND BUILD" — small, wide-tracked, muted */}
          <div
            style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 500,
              fontSize: "clamp(11px, 1.3vw, 16px)",
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "var(--fg-secondary)",
              marginBottom: 6,
              animation: `heroFadeUp 0.5s 0.18s ${EASE} both`,
            }}
          >
            {t("hero.h1")}
          </div>

          {/* The big scrambling service word */}
          <div
            className="hero-service"
            style={{
              fontFamily: "var(--font-poppins)",
              fontWeight: 800,
              fontSize: "clamp(58px, 8.5vw, 106px)",
              letterSpacing: "-0.055em",
              lineHeight: 0.92,
              textTransform: "uppercase",
              color: "var(--fg)",
              whiteSpace: "nowrap",
              animation: `heroFadeUp 0.55s 0.26s ${EASE} both`,
              // Blue underscore on the active word
              borderBottom: "5px solid #2563eb",
              display: "inline-block",
              paddingBottom: 6,
            }}
          >
            {display}
          </div>
        </div>

        {/* ── Subtitle ── */}
        <p
          className="hero-subtitle"
          style={{
            fontFamily: "var(--font-inter)",
            fontWeight: 400,
            fontSize: 17,
            letterSpacing: "-0.5px",
            lineHeight: 1.65,
            color: "var(--fg-secondary)",
            maxWidth: 460,
            marginBottom: 28,
            animation: `heroFadeUp 0.6s 0.36s ${EASE} both`,
          }}
        >
          {t("hero.subtitle")}
        </p>

        {/* ── Stats row — replaces boring proof text ── */}
        <div
          style={{
            display: "flex",
            alignItems: "flex-start",
            gap: 0,
            marginBottom: 36,
            animation: `heroFadeUp 0.6s 0.44s ${EASE} both`,
          }}
        >
          {stats.map((s, i) => (
            <div key={s.label} style={{ display: "flex", alignItems: "flex-start", gap: 0 }}>
              {i > 0 && (
                <div
                  style={{
                    width: 1,
                    height: 38,
                    background: "rgba(0,0,0,0.12)",
                    alignSelf: "center",
                    margin: "0 28px",
                    flexShrink: 0,
                  }}
                />
              )}
              <div>
                <div
                  style={{
                    fontFamily: "var(--font-poppins)",
                    fontWeight: 700,
                    fontSize: "clamp(22px, 2.2vw, 30px)",
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                    color: "var(--fg)",
                    marginBottom: 3,
                  }}
                >
                  {s.value}
                </div>
                <div
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontWeight: 500,
                    fontSize: 10,
                    letterSpacing: "0.1em",
                    textTransform: "uppercase",
                    color: "var(--fg-muted)",
                  }}
                >
                  {s.label}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* ── CTA — blue primary ── */}
        <div
          className="hero-cta"
          style={{
            display: "flex",
            gap: 12,
            flexWrap: "wrap",
            marginBottom: 64,
            animation: `heroFadeUp 0.6s 0.52s ${EASE} both`,
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
              color: "#ffffff",
              background: "#2563eb",
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

      {/* ── Full-width marquee (unchanged) ── */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        className="hero-marquee-wrap"
        style={{
          width: "100%",
          overflow: "hidden",
          paddingBottom: 80,
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        }}
      >
        <div className="marquee-track" style={{ display: "flex", gap: 20, width: "max-content" }}>
          {track.map((slide, i) => (
            <div
              key={i}
              className="marquee-card"
              style={{
                flexShrink: 0,
                width: 600,
                height: 380,
                background: "#111",
                border: "1px solid rgba(255,255,255,0.06)",
                borderRadius: 0,
                overflow: "hidden",
                position: "relative",
                transition: "transform 0.4s cubic-bezier(0.22,1,0.36,1), box-shadow 0.4s",
                transformStyle: "preserve-3d",
              }}
              onMouseMove={(e) => {
                const rect = e.currentTarget.getBoundingClientRect();
                const x = (e.clientX - rect.left) / rect.width - 0.5;
                const y = (e.clientY - rect.top) / rect.height - 0.5;
                e.currentTarget.style.transform = `perspective(900px) rotateY(${x * 10}deg) rotateX(${-y * 7}deg) scale(1.03)`;
                e.currentTarget.style.boxShadow = `${-x * 12}px ${-y * 12}px 32px rgba(0,0,0,0.3)`;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.transform = "perspective(900px) rotateY(0deg) rotateX(0deg) scale(1)";
                e.currentTarget.style.boxShadow = "none";
              }}
            >
              {slide.img ? (
                <>
                  <Image
                    src={slide.img}
                    alt={slide.title}
                    fill
                    sizes="(max-width: 768px) 300px, 600px"
                    priority={i < 2}
                    style={{ objectFit: "cover", objectPosition: "top center", filter: "grayscale(30%) brightness(0.75)", mixBlendMode: "luminosity" }}
                  />
                  <div style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)" }} />
                  <div style={{
                    position: "absolute", bottom: 0, left: 0, right: 0,
                    padding: "20px 24px",
                    background: "linear-gradient(to top, rgba(0,0,0,0.8) 0%, transparent 100%)",
                  }}>
                    <p style={{
                      fontFamily: "var(--font-poppins)", fontWeight: 700,
                      fontSize: 14, letterSpacing: "-0.3px", textTransform: "uppercase",
                      color: "#fff", margin: 0, lineHeight: 1.2,
                    }}>{slide.title}</p>
                    <p style={{
                      fontFamily: "var(--font-inter)", fontSize: 11,
                      letterSpacing: "0.5px", color: "rgba(255,255,255,0.55)",
                      margin: "4px 0 0",
                    }}>{slide.meta}</p>
                  </div>
                </>
              ) : null}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
