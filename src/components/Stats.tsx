"use client";
import { motion } from "framer-motion";
import { useInView } from "framer-motion";
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
          fontWeight: 500,
          fontSize: "clamp(56px, 6vw, 100px)",
          letterSpacing: "-0.1em",
          lineHeight: 1,
          textTransform: "uppercase",
          color: "var(--accent-purple)",
          marginBottom: 12,
        }}
      >
        {number}
      </div>
      <div
        style={{
          fontFamily: "var(--font-inter)",
          fontWeight: 400,
          fontSize: 14,
          letterSpacing: "-0.7px",
          lineHeight: 1.7,
          color: "rgba(245,244,240,0.6)",
          textTransform: "uppercase",
          maxWidth: 160,
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
        background: "var(--dark-bg)",
        borderRadius: "var(--radius-md)",
        width: "98%",
        margin: "0 auto",
        padding: "60px 40px",
      }}
    >
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
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
