"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";

const SPRING = [0.22, 1, 0.36, 1] as [number, number, number, number];
const EXIT   = [0.76, 0, 0.24, 1] as [number, number, number, number];

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [count, setCount]     = useState(0);

  useEffect(() => {
    const duration = 1900;
    const start    = performance.now();

    const tick = (ts: number) => {
      const progress = Math.min((ts - start) / duration, 1);
      // ease-out cubic so the counter accelerates then slows at 100
      const eased = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * 100));
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        setTimeout(() => setVisible(false), 280);
      }
    };

    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          exit={{ y: "-100%" }}
          transition={{ duration: 0.78, ease: EXIT }}
          style={{
            position: "fixed",
            inset: 0,
            zIndex: 9999,
            background: "#0a0a0a",
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            pointerEvents: "all",
          }}
        >
          {/* Centre: name + bar */}
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 20 }}>
            <motion.p
              initial={{ opacity: 0, y: 14 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.55, ease: SPRING }}
              style={{
                fontFamily: "var(--font-poppins)",
                fontWeight: 700,
                fontSize: "clamp(20px, 3.8vw, 48px)",
                letterSpacing: "0.18em",
                textTransform: "uppercase",
                color: "#fff",
                margin: 0,
                lineHeight: 1,
              }}
            >
              Samuel Adefila
            </motion.p>

            {/* Loading bar */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.3 }}
              style={{
                width: "min(280px, 60vw)",
                height: 1,
                background: "rgba(255,255,255,0.1)",
                overflow: "hidden",
              }}
            >
              <motion.div
                initial={{ scaleX: 0 }}
                animate={{ scaleX: 1 }}
                transition={{ duration: 1.9, ease: SPRING }}
                style={{ height: "100%", background: "#fff", transformOrigin: "left" }}
              />
            </motion.div>
          </div>

          {/* Ghost counter — bottom right */}
          <motion.span
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            style={{
              position: "absolute",
              bottom: "6%",
              right: "5%",
              fontFamily: "var(--font-poppins)",
              fontWeight: 700,
              fontSize: "clamp(56px, 10vw, 120px)",
              letterSpacing: "-0.04em",
              color: "rgba(255,255,255,0.05)",
              lineHeight: 1,
              fontVariantNumeric: "tabular-nums",
              userSelect: "none",
            }}
          >
            {count}
          </motion.span>

          {/* Label — bottom left */}
          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            style={{
              position: "absolute",
              bottom: "8%",
              left: "6%",
              fontFamily: "var(--font-inter)",
              fontWeight: 500,
              fontSize: 10,
              letterSpacing: "0.22em",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.22)",
              margin: 0,
            }}
          >
            Framer Developer
          </motion.p>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
