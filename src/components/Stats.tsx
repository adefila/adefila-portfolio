"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const stats = [
  { number: "50+", label: "Finished Projects" },
  { number: "94%", label: "Average Client Conversion Increase" },
  { number: "5+", label: "Years of Experience" },
];

function StatItem({ number, label, delay }: { number: string; label: string; delay: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.6, delay, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      style={{ textAlign: "center", flex: 1 }}
    >
      <div
        style={{
          fontFamily: "var(--font-satoshi)",
          fontWeight: 700,
          fontSize: "clamp(56px, 7vw, 112px)",
          letterSpacing: "-0.05em",
          lineHeight: 1,
          color: "var(--fg)",
          marginBottom: 12,
        }}
      >
        {number}
      </div>
      <div
        style={{
          fontFamily: "var(--font-inter)",
          fontWeight: 400,
          fontSize: 13,
          letterSpacing: "0.05em",
          lineHeight: 1.5,
          color: "var(--fg-secondary)",
          textTransform: "uppercase",
          maxWidth: 180,
          margin: "0 auto",
        }}
      >
        {label}
      </div>
    </motion.div>
  );
}

export default function Stats() {
  return (
    <section
      style={{
        width: "100%",
        maxWidth: 1200,
        margin: "0 auto",
        padding: "80px 20px",
        borderTop: "1px solid rgba(0,0,0,0.07)",
        borderBottom: "1px solid rgba(0,0,0,0.07)",
      }}
    >
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-around",
          gap: 40,
          flexWrap: "wrap",
        }}
      >
        {stats.map((s, i) => (
          <StatItem key={i} {...s} delay={i * 0.1} />
        ))}
      </div>
    </section>
  );
}
