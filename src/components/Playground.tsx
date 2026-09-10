"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const shots = [
  { label: "UI Design", color: "#e8e4ff", emoji: "🎨" },
  { label: "Branding", color: "#ffe0b2", emoji: "✦" },
  { label: "Mobile App", color: "#b2ebf2", emoji: "📲" },
  { label: "Web Design", color: "#f8bbd9", emoji: "🌐" },
  { label: "Dashboard", color: "#c8e6c9", emoji: "📊" },
  { label: "Motion", color: "#fff9c4", emoji: "⚡" },
];

export default function Playground() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      style={{
        width: "100%",
        maxWidth: 1200,
        margin: "0 auto",
        padding: "60px 20px",
      }}
    >
      {/* Light version */}
      <div style={{ textAlign: "center", marginBottom: 64 }}>
        <motion.p
          ref={ref}
          initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.5 }}
          style={{
            fontFamily: "var(--font-inter)",
            fontWeight: 700,
            fontSize: 11,
            letterSpacing: "12px",
            textTransform: "uppercase",
            color: "var(--fg-label)",
            marginBottom: 16,
          }}
        >
          /PLAYGROUND
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.5, delay: 0.06 }}
          style={{
            fontFamily: "var(--font-poppins)",
            fontWeight: 700,
            fontSize: "clamp(28px, 4vw, 64px)",
            letterSpacing: "-2.5px",
            lineHeight: 1,
            textTransform: "uppercase",
            color: "var(--fg)",
            marginBottom: 48,
          }}
        >
          SNEAK INTO SOME OF MY EXPLORATION
        </motion.h2>

        {/* Design shots grid */}
        <div
          style={{
            display: "grid",
            gridTemplateColumns: "repeat(3, 1fr)",
            gap: 16,
          }}
        >
          {shots.map((shot, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20, scale: 0.97 }}
              animate={inView ? { opacity: 1, y: 0, scale: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.07, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              whileHover={{ y: -6, scale: 1.02, transition: { duration: 0.25 } }}
              style={{
                background: shot.color,
                borderRadius: "var(--radius-sm)",
                aspectRatio: i < 2 ? "4/3" : "3/4",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                flexDirection: "column",
                gap: 12,
                cursor: "pointer",
                gridRow: i > 1 ? "span 1" : "span 1",
              }}
            >
              <span style={{ fontSize: 48 }}>{shot.emoji}</span>
              <span
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 600,
                  fontSize: 13,
                  letterSpacing: "-0.3px",
                  color: "rgba(0,0,0,0.5)",
                  textTransform: "uppercase",
                }}
              >
                {shot.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Dark version (MoodboardCanvas equivalent) */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        style={{
          background: "var(--dark-bg)",
          borderRadius: "var(--radius-md)",
          padding: "80px 40px",
          textAlign: "center",
          overflow: "hidden",
          position: "relative",
        }}
      >
        {/* Decorative grid of emoji/design squares */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "grid",
            gridTemplateColumns: "repeat(8, 1fr)",
            gap: 8,
            padding: 24,
            opacity: 0.12,
            pointerEvents: "none",
          }}
        >
          {Array.from({ length: 40 }).map((_, i) => (
            <div
              key={i}
              style={{
                background: `hsl(${i * 37}, 60%, 60%)`,
                borderRadius: 8,
                aspectRatio: "1",
              }}
            />
          ))}
        </div>

        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontWeight: 700,
            fontSize: 11,
            letterSpacing: "12px",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.5)",
            marginBottom: 24,
            position: "relative",
          }}
        >
          /PLAYGROUND
        </p>
        <h2
          style={{
            fontFamily: "var(--font-poppins)",
            fontWeight: 700,
            fontSize: "clamp(28px, 4vw, 64px)",
            letterSpacing: "-2px",
            lineHeight: 1,
            textTransform: "uppercase",
            marginBottom: 40,
            position: "relative",
          }}
        >
          <span style={{ color: "var(--white)" }}>SNEAK INTO SOME OF MY </span>
          <span style={{ color: "var(--accent-teal)" }}>EXPLORATION</span>
        </h2>

        <a
          href="https://dribbble.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: "inline-flex",
            alignItems: "center",
            gap: 8,
            fontFamily: "var(--font-inter)",
            fontWeight: 600,
            fontSize: 14,
            color: "var(--dark-bg)",
            background: "var(--white)",
            padding: "14px 28px",
            borderRadius: 100,
            textDecoration: "none",
            position: "relative",
          }}
        >
          View all explorations →
        </a>
      </motion.div>
    </section>
  );
}
