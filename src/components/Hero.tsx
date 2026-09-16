"use client";
import { motion } from "framer-motion";
import { CalendarDays } from "lucide-react";
import MagneticButton from "./MagneticButton";
import { useLang } from "@/context/LangContext";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 10, filter: "blur(10px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.6, delay, ease: EASE },
});

const slides = [
  { title: "Elite Property", meta: "Framer Development · 2025", img: "/projects/elite-property.png" },
  { title: "Jamal Muse — Personal Portfolio", meta: "Claude to Framer · 2025", img: "/projects/jamal.png" },
  { title: "Nature", meta: "Web Design · 2025", img: "/projects/nature.png" },
  { title: "Virvly", meta: "Framer Development · 2025", img: "/projects/virvly.png" },
];

// Duplicate for seamless infinite loop
const track = [...slides, ...slides];

export default function Hero() {
  const { t } = useLang();
  return (
    <section id="hero" className="hero-section" style={{ paddingTop: 120, paddingBottom: 0, width: "100%", overflow: "hidden" }}>
      <style>{`
        @keyframes marquee {
          0%   { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
        .marquee-track {
          animation: marquee 32s linear infinite;
          will-change: transform;
        }
        .marquee-track:hover {
          animation-play-state: paused;
        }
      `}</style>

      <div style={{ maxWidth: 1200, margin: "0 auto", paddingLeft: 20, paddingRight: 20 }}>
        {/* Available badge */}
        <motion.div
          {...fadeUp(0.1)}
          className="hero-badge"
          style={{ display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 32 }}
        >
          <span
            style={{
              width: 8,
              height: 8,
              borderRadius: "50%",
              background: "var(--accent-green)",
              display: "inline-block",
              animation: "pulse 2s ease-in-out infinite",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 600,
              fontSize: 11,
              letterSpacing: "0.08em",
              textTransform: "uppercase",
              color: "var(--accent-green)",
            }}
          >
            {t("hero.badge")}
          </span>
          <span
            style={{
              width: 3,
              height: 3,
              borderRadius: "50%",
              background: "var(--fg-muted)",
              display: "inline-block",
            }}
          />
          <span
            style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 500,
              fontSize: 11,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "var(--fg-secondary)",
            }}
          >
            {t("hero.badge2")}
          </span>
        </motion.div>

        {/* Main headline */}
        <div style={{ marginBottom: 24 }}>
          {[t("hero.h1"), t("hero.h2")].map((line, i) => (
            <motion.div
              key={i}
              className="hero-headline"
              initial={{ opacity: 0, y: 14, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{ duration: 0.55, delay: 0.15 + i * 0.12, ease: EASE }}
              style={{
                fontFamily: "var(--font-poppins)",
                fontWeight: 700,
                fontSize: "clamp(40px, 7vw, 88px)",
                letterSpacing: "-0.05em",
                lineHeight: 1.05,
                textTransform: "uppercase",
                color: "var(--fg)",
                display: "block",
              }}
            >
              {line}
            </motion.div>
          ))}
        </div>

        {/* Subtitle */}
        <motion.p
          {...fadeUp(0.4)}
          className="hero-subtitle"
          style={{
            fontFamily: "var(--font-inter)",
            fontWeight: 400,
            fontSize: 20,
            letterSpacing: "-0.7px",
            lineHeight: 1.6,
            color: "var(--fg-secondary)",
            maxWidth: 520,
            marginBottom: 32,
          }}
        >
          {t("hero.subtitle")}
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          {...fadeUp(0.5)}
          className="hero-cta"
          style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 48 }}
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
        </motion.div>
      </div>

      {/* Full-width project marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
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
                background: slide.img ? "#e8e8e8" : "rgba(0,0,0,0.05)",
                border: "1px solid rgba(0,0,0,0.07)",
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
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={slide.img}
                  alt={slide.title}
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "contain", objectPosition: "top center" }}
                />
              ) : null}
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
