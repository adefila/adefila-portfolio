"use client";
import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";
import Image from "next/image";
import MagneticButton from "./MagneticButton";
import { useLang } from "@/context/LangContext";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

const slides = [
  { title: "Elite Property", meta: "Framer Development · 2025", img: "/projects/elite-property.webp" },
  { title: "Jamal Muse. Personal Portfolio", meta: "Claude to Framer · 2025", img: "/projects/jamal.png" },
  { title: "Nature", meta: "Web Design · 2025", img: "/projects/nature.webp" },
  { title: "Virvly", meta: "Framer Development · 2025", img: "/projects/virvly.png" },
];

const track = [...slides, ...slides];

export default function Hero() {
  const { t } = useLang();
  return (
    <section id="hero" className="hero-section" style={{ paddingTop: 120, paddingBottom: 0, width: "100%", overflow: "hidden" }}>

      <div style={{ maxWidth: 1200, margin: "0 auto", paddingLeft: 20, paddingRight: 20 }}>
        <div
          className="hero-badge"
          style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 32, animation: `heroFadeUp 0.6s 0.1s ${EASE} both` }}
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

        <h1 style={{ marginBottom: 24, fontSize: "inherit", fontWeight: "inherit" }}>
          {[t("hero.h1"), t("hero.h2")].map((line, i) => (
            <span
              key={i}
              className="hero-headline"
              style={{
                fontFamily: "var(--font-poppins)",
                fontWeight: 700,
                fontSize: "clamp(36px, 5vw, 76px)",
                letterSpacing: "-0.04em",
                lineHeight: 1.05,
                textTransform: "uppercase",
                color: "var(--fg)",
                display: "block",
                animation: `heroFadeUp 0.55s ${0.15 + i * 0.12}s ${EASE} both`,
              }}
            >
              {line}{i === 0 ? " " : ""}
            </span>
          ))}
        </h1>

        <p
          className="hero-subtitle"
          style={{
            fontFamily: "var(--font-inter)",
            fontWeight: 400,
            fontSize: 16,
            letterSpacing: "-0.3px",
            lineHeight: 1.65,
            color: "var(--fg-secondary)",
            maxWidth: 560,
            textWrap: "balance" as const,
            marginBottom: 16,
            animation: `heroFadeUp 0.6s 0.35s ${EASE} both`,
          }}
        >
          {t("hero.subtitle")}
        </p>

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

        <div
          className="hero-cta"
          style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 48, animation: `heroFadeUp 0.6s 0.5s ${EASE} both` }}
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

      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        style={{ width: "100%", paddingBottom: 80 }}
      >
        {/* Cubic perspective wrapper — tilts the whole strip on a 3D plane */}
        <div style={{ perspective: "900px", perspectiveOrigin: "50% 0%" }}>
        <div
          className="hero-marquee-wrap"
          style={{
            width: "100%",
            overflow: "hidden",
            transform: "rotateX(10deg) scale(1.03)",
            transformStyle: "preserve-3d",
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
                border: "1px solid rgba(0,0,0,0.08)",
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
                e.currentTarget.style.boxShadow = `${-x * 12}px ${-y * 12}px 32px rgba(0,0,0,0.15)`;
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
                    style={{ objectFit: "cover", objectPosition: "top center" }}
                  />
                  {/* light gradient for caption legibility only */}
                  <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.55) 0%, transparent 50%)" }} />
                  <div style={{ position: "absolute", bottom: 0, left: 0, right: 0, padding: "20px 24px" }}>
                    <p style={{ fontFamily: "var(--font-poppins)", fontWeight: 700, fontSize: 14, letterSpacing: "-0.3px", textTransform: "uppercase", color: "#fff", margin: 0, lineHeight: 1.2 }}>{slide.title}</p>
                    <p style={{ fontFamily: "var(--font-inter)", fontSize: 11, letterSpacing: "0.5px", color: "rgba(255,255,255,0.7)", margin: "4px 0 0" }}>{slide.meta}</p>
                  </div>
                </>
              ) : null}
            </div>
          ))}
        </div>
        </div>
        </div>
      </motion.div>
    </section>
  );
}
