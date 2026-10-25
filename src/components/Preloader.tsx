"use client";
import { useState, useEffect } from "react";
import { motion, AnimatePresence, useReducedMotion } from "framer-motion";

// The boot log: each line appears at a set moment (timed in CSS, so it shows on time even while scripts are still loading)
const BOOT_LINES = [
  { delay: 0.12, text: "web developer, framer designer", ok: false },
  { delay: 0.3, text: "loading frame", ok: true },
  { delay: 0.48, text: "loading projects", ok: true },
  { delay: 0.64, text: "ready", ok: true },
];

export default function Preloader() {
  const [visible, setVisible] = useState(true);
  const [count, setCount]     = useState(0);
  const reducedMotion          = useReducedMotion();
  // Reduced motion skips the count-up and shows the bar as complete
  const shown                  = reducedMotion ? 100 : count;

  useEffect(() => {
    // Only show once per tab session — reloads go straight to the page
    let seen = false;
    try {
      seen = sessionStorage.getItem("preloader-seen") !== null;
      sessionStorage.setItem("preloader-seen", "1");
    } catch {}
    // Already hidden by the html[data-preloader-seen] rule in globals.css
    if (seen) return;

    // Respect prefers-reduced-motion: skip animation, dismiss quickly
    if (reducedMotion) {
      const t = setTimeout(() => setVisible(false), 400);
      return () => clearTimeout(t);
    }

    const duration = 700;
    const start    = performance.now();

    const tick = (ts: number) => {
      const progress = Math.min((ts - start) / duration, 1);
      const eased    = 1 - Math.pow(1 - progress, 3);
      setCount(Math.round(eased * 100));
      if (progress < 1) {
        requestAnimationFrame(tick);
      } else {
        // CSS slides the overlay away on its own (see .preloader in globals.css);
        // this just removes it from the page once that has finished
        setTimeout(() => setVisible(false), 700);
      }
    };

    const id = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(id);
  }, [reducedMotion]);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="preloader"
          className="preloader"
          role="status"
          aria-label="Loading portfolio"
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
          {/* Centre: name, a short boot log, and the progress bar, inside a frame with corner marks */}
          <div style={{ position: "relative", display: "flex", flexDirection: "column", gap: 18, padding: "30px 36px", width: "min(420px, 86vw)" }}>
            <span aria-hidden="true" className="fig-corner" style={{ top: 0, left: 0, borderTopWidth: 1, borderLeftWidth: 1 }} />
            <span aria-hidden="true" className="fig-corner" style={{ top: 0, right: 0, borderTopWidth: 1, borderRightWidth: 1 }} />
            <span aria-hidden="true" className="fig-corner" style={{ bottom: 0, left: 0, borderBottomWidth: 1, borderLeftWidth: 1 }} />
            <span aria-hidden="true" className="fig-corner" style={{ bottom: 0, right: 0, borderBottomWidth: 1, borderRightWidth: 1 }} />
            <p
              aria-hidden="true"
              className="boot-name"
              style={{
                fontFamily: "var(--font-poppins)",
                fontWeight: 600,
                fontSize: "clamp(20px, 3.4vw, 30px)",
                letterSpacing: "0.12em",
                textTransform: "uppercase",
                color: "#fff",
                margin: 0,
                lineHeight: 1,
              }}
            >
              Samuel Adefila
            </p>

            {/* The log lines appear as the count passes them */}
            <div aria-hidden="true" style={{ display: "grid", gap: 6, fontFamily: "var(--font-mono)", fontSize: 12, letterSpacing: "0.04em", color: "rgba(255,255,255,0.62)", minHeight: 78 }}>
              {BOOT_LINES.map((line) => (
                <p key={line.text} className="boot-line" style={{ margin: 0, animationDelay: `${line.delay}s`, display: "flex", justifyContent: "space-between", gap: 12 }}>
                  <span>{"> "}{line.text}</span>
                  {line.ok && <span style={{ color: "#4ade80" }}>ok</span>}
                </p>
              ))}
            </div>

            {/* Progress bar: announced to screen readers */}
            <motion.div
              role="progressbar"
              aria-valuenow={shown}
              aria-valuemin={0}
              aria-valuemax={100}
              aria-label="Loading"
              initial={reducedMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.15, duration: 0.3 }}
              style={{ width: "100%", height: 1, background: "rgba(255,255,255,0.12)", overflow: "hidden" }}
            >
              <div className="preloader-bar" style={{ height: "100%", background: "var(--accent-purple)", transformOrigin: "left" }} />
            </motion.div>
          </div>

          {/* Ghost counter — purely decorative, hidden from assistive tech */}
          <motion.span
            aria-hidden="true"
            initial={reducedMotion ? false : { opacity: 0 }}
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
            {shown}
          </motion.span>

          {/* Decorative label — hidden from assistive tech */}
          <motion.p
            aria-hidden="true"
            initial={reducedMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.3, duration: 0.5 }}
            style={{
              position: "absolute",
              bottom: "8%",
              left: "6%",
              fontFamily: "var(--font-mono)",
              fontWeight: 400,
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
