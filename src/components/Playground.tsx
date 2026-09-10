"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

const shots = [
  { label: "UI Design", bg: "linear-gradient(135deg, #e8e4ff, #d4c5ff)", accent: "#6d28d9" },
  { label: "Branding", bg: "linear-gradient(135deg, #fef3c7, #fde68a)", accent: "#b45309" },
  { label: "Mobile App", bg: "linear-gradient(135deg, #dbeafe, #bfdbfe)", accent: "#1d4ed8" },
  { label: "Web Design", bg: "linear-gradient(135deg, #fce7f3, #fbcfe8)", accent: "#be185d" },
  { label: "Dashboard", bg: "linear-gradient(135deg, #d1fae5, #a7f3d0)", accent: "#047857" },
  { label: "Motion", bg: "linear-gradient(135deg, #fef9c3, #fef08a)", accent: "#a16207" },
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
      {/* Section heading */}
      <div style={{ textAlign: "center", marginBottom: 48 }}>
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
                background: shot.bg,
                borderRadius: "var(--radius-sm)",
                aspectRatio: i < 2 ? "4/3" : "3/4",
                display: "flex",
                alignItems: "flex-end",
                justifyContent: "flex-start",
                padding: 20,
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Abstract shape decoration */}
              <div
                style={{
                  position: "absolute",
                  top: "20%",
                  right: "10%",
                  width: 80,
                  height: 80,
                  borderRadius: "50%",
                  background: shot.accent,
                  opacity: 0.15,
                  filter: "blur(20px)",
                  pointerEvents: "none",
                }}
              />
              <div
                style={{
                  position: "absolute",
                  top: "40%",
                  left: "30%",
                  width: 60,
                  height: 60,
                  borderRadius: 12,
                  background: shot.accent,
                  opacity: 0.1,
                  transform: "rotate(20deg)",
                  pointerEvents: "none",
                }}
              />
              <span
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 600,
                  fontSize: 12,
                  letterSpacing: "1px",
                  color: shot.accent,
                  textTransform: "uppercase",
                  position: "relative",
                }}
              >
                {shot.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Dark moodboard canvas */}
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
        {/* Decorative colored squares grid */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "grid",
            gridTemplateColumns: "repeat(8, 1fr)",
            gap: 8,
            padding: 24,
            opacity: 0.1,
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
          View all explorations <ArrowRight size={14} strokeWidth={2.5} style={{ display: "inline", verticalAlign: "middle" }} />
        </a>
      </motion.div>
    </section>
  );
}
