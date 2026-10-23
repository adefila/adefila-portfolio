"use client";
import { motion } from "framer-motion";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

// Success state for the contact form: floating isometric
// tick, title, message and a 5-second bar before the form resets.
export default function FormSuccess({ title, desc, resetLabel }: { title: string; desc: string; resetLabel: string }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 16 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.45, ease: EASE }}
      style={{
        padding: "52px 32px",
        border: "1px solid rgba(var(--ink), 0.14)",
        textAlign: "center",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 0,
      }}
    >
      {/* Isometric outline icon */}
      <motion.div
        animate={{ y: [0, -8, 0] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        style={{ marginBottom: 32 }}
      >
        <svg width="160" height="130" viewBox="0 0 160 130" fill="none" xmlns="http://www.w3.org/2000/svg">
          {/* Subtle face fills for depth */}
          <polygon points="80,10 132,38 80,66 28,38" fill="rgba(var(--ink), 0.04)"/>
          <polygon points="28,38 28,92 80,120 80,66" fill="rgba(var(--ink), 0.07)"/>
          <polygon points="132,38 132,92 80,120 80,66" fill="rgba(var(--ink), 0.05)"/>
          {/* Top face edges */}
          <polygon points="80,10 132,38 80,66 28,38" stroke="var(--fg)" strokeWidth="1.8" fill="none"/>
          {/* Left face edges */}
          <polyline points="28,38 28,92 80,120 80,66" stroke="var(--fg)" strokeWidth="1.8"/>
          {/* Right face edges */}
          <polyline points="132,38 132,92 80,120" stroke="var(--fg)" strokeWidth="1.8"/>
          {/* Checkmark on top face */}
          <polyline
            points="55,40 70,53 106,22"
            stroke="var(--fg)"
            strokeWidth="3.5"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
      </motion.div>

      <p style={{ fontFamily: "var(--font-poppins)", fontWeight: 700, fontSize: "clamp(18px,2.5vw,26px)", color: "var(--fg)", letterSpacing: "-0.5px", marginBottom: 8, lineHeight: 1.1, textTransform: "uppercase" }}>
        {title}
      </p>
      <p style={{ fontFamily: "var(--font-inter)", fontSize: 14, color: "var(--fg-secondary)", lineHeight: 1.6, maxWidth: 320, marginBottom: 24 }}>
        {desc}
      </p>

      {/* Countdown bar */}
      <div style={{ width: "100%", maxWidth: 200, height: 2, background: "rgba(var(--ink), 0.07)", borderRadius: 1, overflow: "hidden" }}>
        <motion.div
          initial={{ width: "100%" }}
          animate={{ width: "0%" }}
          transition={{ duration: 5, ease: "linear" }}
          style={{ height: "100%", background: "var(--fg)" }}
        />
      </div>
      <p style={{ fontFamily: "var(--font-inter)", fontSize: 11, color: "var(--fg-muted)", letterSpacing: "0.05em", marginTop: 10 }}>
        {resetLabel}
      </p>
    </motion.div>
  );
}
