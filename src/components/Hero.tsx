"use client";
import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 10, filter: "blur(10px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.6, delay, ease: EASE },
});

export default function Hero() {

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
        Product designer and no-code developer. I use Framer, Shopify, Webflow "” and whatever fits your vision "” to build sites that genuinely work.
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
          BOOK A CALL
        </a>
      </motion.div>

    </section>
  );
}

