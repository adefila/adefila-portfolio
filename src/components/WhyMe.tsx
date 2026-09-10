"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { number: "50+", label: "Finished Projects" },
  { number: "94%", label: "Average Client Conversion Increase" },
  { number: "5+", label: "Years of Experience" },
];

const services = [
  { n: "1", label: "RESPONSIVE DESIGN" },
  { n: "2", label: "FIGMA TO FRAMER" },
  { n: "3", label: "WEBSITE MIGRATION" },
  { n: "4", label: "USER INTERFACE & UX" },
  { n: "5", label: "SHOPIFY INTEGRATION" },
  { n: "6", label: "FIGMA TO WEBFLOW" },
];

export default function WhyMe() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      style={{
        width: "100%",
        maxWidth: 1200,
        margin: "0 auto",
        padding: "80px 20px 60px",
      }}
    >
      {/* Top row: heading left, stats right */}
      <div
        ref={ref}
        style={{
          display: "flex",
          gap: 80,
          alignItems: "flex-start",
          flexWrap: "wrap",
          marginBottom: 64,
        }}
      >
        {/* Left: label + heading */}
        <div style={{ flex: "1 1 400px" }}>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
            style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 700,
              fontSize: 11,
              letterSpacing: "10px",
              textTransform: "uppercase",
              color: "var(--fg-secondary)",
              marginBottom: 20,
            }}
          >
            WHY ME
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
            animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.5, delay: 0.06 }}
            style={{
              fontFamily: "var(--font-poppins)",
              fontWeight: 700,
              fontSize: "clamp(28px, 3.5vw, 48px)",
              letterSpacing: "-2px",
              lineHeight: 1.05,
              textTransform: "uppercase",
              color: "var(--fg)",
            }}
          >
            Great design is not enough.{" "}
            <span style={{ color: "rgb(163,163,163)" }}>
              I build websites that perform.
            </span>
          </motion.h2>
        </div>

        {/* Right: stats */}
        <div
          style={{
            flex: "1 1 300px",
            display: "flex",
            flexDirection: "column",
            gap: 32,
            paddingTop: 8,
          }}
        >
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 16,
                borderBottom: "1px solid rgba(0,0,0,0.07)",
                paddingBottom: 24,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-satoshi)",
                  fontWeight: 700,
                  fontSize: "clamp(40px, 5vw, 64px)",
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                  color: "var(--fg)",
                  flexShrink: 0,
                }}
              >
                {s.number}
              </span>
              <span
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 400,
                  fontSize: 13,
                  letterSpacing: "0.02em",
                  textTransform: "uppercase",
                  color: "var(--fg-secondary)",
                  lineHeight: 1.4,
                }}
              >
                {s.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Services numbered list */}
      <div
        style={{
          borderTop: "1px solid rgba(0,0,0,0.08)",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
        }}
      >
        {services.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.2 + i * 0.06 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              padding: "28px 0",
              borderBottom: "1px solid rgba(0,0,0,0.08)",
              borderRight: (i + 1) % 3 !== 0 ? "1px solid rgba(0,0,0,0.08)" : "none",
              paddingLeft: i % 3 !== 0 ? 28 : 0,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 400,
                fontSize: 13,
                color: "var(--fg-muted)",
                flexShrink: 0,
              }}
            >
              {s.n}
            </span>
            <span
              style={{
                fontFamily: "var(--font-poppins)",
                fontWeight: 600,
                fontSize: "clamp(13px, 1.2vw, 16px)",
                letterSpacing: "-0.3px",
                textTransform: "uppercase",
                color: "var(--fg)",
              }}
            >
              {s.label}
            </span>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
