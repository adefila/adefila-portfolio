"use client";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 10, filter: "blur(10px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.6, delay, ease: EASE },
});

const TICKER_ITEMS = [
  "Framer Development",
  "UI/UX Design",
  "WordPress",
  "Webflow",
  "Figma",
  "Product Design",
  "Landing Pages",
  "Web Apps",
];

export default function Hero() {
  const repeated = [...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS, ...TICKER_ITEMS];

  return (
    <section
      id="hero"
      style={{
        paddingTop: 160,
        paddingBottom: 0,
        width: "100%",
        maxWidth: 1200,
        margin: "0 auto",
        paddingLeft: 20,
        paddingRight: 20,
        overflow: "hidden",
      }}
    >
      {/* Available badge */}
      <motion.div
        {...fadeUp(0.1)}
        style={{
          display: "inline-flex",
          alignItems: "center",
          gap: 6,
          marginBottom: 32,
        }}
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
      <div style={{ maxWidth: 1000, marginBottom: 24 }}>
        {"CONVERT MORE VISITORS INTO CLIENTS WITH CUSTOM FRAMER WEBSITES"
          .split(" ")
          .map((word, i) => (
            <motion.span
              key={i}
              initial={{ opacity: 0, y: 10, filter: "blur(10px)" }}
              animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              transition={{
                duration: 0.5,
                delay: 0.06 * i + 0.2,
                ease: EASE,
              }}
              style={{
                display: "inline-block",
                fontFamily: "var(--font-poppins)",
                fontWeight: 700,
                fontSize: "clamp(36px, 5.3vw, 64px)",
                letterSpacing: "-0.05em",
                lineHeight: 1,
                textTransform: "uppercase",
                color: "var(--fg)",
                marginRight: "0.25em",
              }}
            >
              {word}
            </motion.span>
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
          maxWidth: 560,
          marginBottom: 48,
        }}
      >
        Built to reach the right audience and drive real results
      </motion.p>

      {/* CTA buttons */}
      <motion.div
        {...fadeUp(0.5)}
        style={{ display: "flex", gap: 12, flexWrap: "wrap", marginBottom: 80 }}
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
          Book a call
        </a>
        <a
          href="#work"
          style={{
            fontFamily: "var(--font-inter)",
            fontWeight: 500,
            fontSize: 14,
            color: "var(--fg)",
            background: "rgba(0,0,0,0.06)",
            padding: "14px 28px",
            borderRadius: 100,
            textDecoration: "none",
            letterSpacing: "-0.2px",
          }}
        >
          View work <ArrowRight size={14} strokeWidth={2.5} style={{ display: "inline", verticalAlign: "middle" }} />
        </a>
      </motion.div>

      {/* Ticker */}
      <div
        style={{
          width: "calc(100% + 40px)",
          marginLeft: -20,
          overflow: "hidden",
          borderTop: "1px solid rgba(0,0,0,0.08)",
          borderBottom: "1px solid rgba(0,0,0,0.08)",
          padding: "16px 0",
          position: "relative",
        }}
      >
        <div className="ticker-track">
          {repeated.map((item, i) => (
            <span
              key={i}
              style={{
                fontFamily: "var(--font-poppins)",
                fontWeight: 500,
                fontSize: 13,
                textTransform: "uppercase",
                letterSpacing: "0.05em",
                color: "var(--fg-secondary)",
                padding: "0 32px",
                flexShrink: 0,
                display: "inline-flex",
                alignItems: "center",
                gap: 32,
              }}
            >
              {item}
              <span style={{ color: "var(--accent-green)", fontSize: 8 }}>●</span>
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
