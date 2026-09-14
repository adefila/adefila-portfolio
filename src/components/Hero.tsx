"use client";
import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 10, filter: "blur(10px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.6, delay, ease: EASE },
});

const slides = [
  { title: "The Initial — AI Website", meta: "Figma to Framer · 2025", img: "/projects/elite-property.png" },
  { title: "HitPay — SaaS Website", meta: "Framer Development · 2024", img: "/projects/nature.png" },
  { title: "BindHQ", meta: "Framer Template Customization · 2026", img: "/projects/virvly.png" },
  { title: "Clipmaster — Video Agency", meta: "Web Design · 2024", img: "/projects/jamal.png" },
  { title: "VPA London — Talent Website", meta: "Framer Development · 2025", img: "/projects/elite-property.png" },
  { title: "Virvly", meta: "Framer Development · 2025", img: "/projects/virvly.png" },
  { title: "Jamal Muse — Personal Portfolio", meta: "Claude to Framer · 2025", img: "/projects/jamal.png" },
  { title: "Alyssa Corso — Personal Portfolio", meta: "Framer Development · 2026", img: "/projects/nature.png" },
  { title: "Upside ESG", meta: "SaaS Framer Development · 2026", img: "/projects/elite-property.png" },
  { title: "Emalbu", meta: "HTML to Framer · 2026", img: "/projects/virvly.png" },
];

// Duplicate for seamless infinite loop
const track = [...slides, ...slides];

export default function Hero() {
  return (
    <section id="hero" style={{ paddingTop: 160, paddingBottom: 0, width: "100%", overflow: "hidden" }}>
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
              fontWeight: 500,
              fontSize: 12,
              letterSpacing: "0.02em",
              color: "var(--accent-green)",
            }}
          >
            Available for work
          </span>
        </motion.div>

        {/* Main headline */}
        <div style={{ marginBottom: 24 }}>
          {["I DESIGN AND BUILD", "WEBSITES THAT CONVERT."].map((line, i) => (
            <motion.div
              key={i}
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
          style={{
            fontFamily: "var(--font-inter)",
            fontWeight: 400,
            fontSize: 20,
            letterSpacing: "-0.7px",
            lineHeight: 1.6,
            color: "var(--fg-secondary)",
            maxWidth: 900,
            marginBottom: 48,
          }}
        >
          Product designer and no-code developer. I use Framer, Shopify, Webflow and whatever fits your vision to build sites that genuinely work.
        </motion.p>

        {/* CTA buttons */}
        <motion.div
          {...fadeUp(0.5)}
          style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 64 }}
        >
          <a
            href="#contact"
            style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 600,
              fontSize: 14,
              color: "var(--white)",
              background: "var(--fg)",
              padding: "14px 28px",
              borderRadius: 100,
              textDecoration: "none",
              letterSpacing: "-0.2px",
              transition: "opacity 0.2s",
            }}
          >
            BOOK A CALL
          </a>
        </motion.div>
      </div>

      {/* Full-width project marquee */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6, delay: 0.7 }}
        style={{ width: "100%", overflow: "hidden", paddingBottom: 80 }}
      >
        <div className="marquee-track" style={{ display: "flex", gap: 16, width: "max-content" }}>
          {track.map((slide, i) => (
            <div
              key={i}
              style={{
                flexShrink: 0,
                width: 340,
                height: 280,
                background: slide.img ? "transparent" : "rgba(0,0,0,0.05)",
                border: "1px solid rgba(0,0,0,0.07)",
                borderRadius: 12,
                overflow: "hidden",
                display: "flex",
                flexDirection: "column",
                justifyContent: "flex-end",
                padding: 20,
                position: "relative",
              }}
            >
              {slide.img ? (
                // eslint-disable-next-line @next/next/no-img-element
                <img
                  src={slide.img}
                  alt={slide.title}
                  style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
                />
              ) : null}
              <div style={{ position: "relative", zIndex: 1 }}>
                <p
                  style={{
                    fontFamily: "var(--font-poppins)",
                    fontWeight: 600,
                    fontSize: 13,
                    letterSpacing: "-0.3px",
                    textTransform: "uppercase",
                    color: "var(--fg)",
                    marginBottom: 4,
                    lineHeight: 1.3,
                  }}
                >
                  {slide.title}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontWeight: 400,
                    fontSize: 11,
                    letterSpacing: "0.3px",
                    textTransform: "uppercase",
                    color: "var(--fg-secondary)",
                  }}
                >
                  {slide.meta}
                </p>
              </div>
            </div>
          ))}
        </div>
      </motion.div>
    </section>
  );
}
