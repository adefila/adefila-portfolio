"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, BadgeCheck, Zap, Palette, Globe, Target } from "lucide-react";

const benefits = [
  { title: "ONE EXPERT, CONSISTENT RESULTS", subtitle: "Delivered 50+ projects on time, every time", icon: BadgeCheck },
  { title: "SPEED & PRECISION", subtitle: "Fast doesn't mean rushed, every detail is handled with focus and care.", icon: Zap },
  { title: "TAILORED DESIGN", subtitle: "I create custom visuals that position your brand clearly and set it apart.", icon: Palette },
  { title: "ONE EXPERT. ONE VISION.", subtitle: "From strategy to launch, everything handled with clarity and intent.", icon: Target },
  { title: "WIDE-RANGE EXPERIENCE", subtitle: "Different industries, one focus, designing products that work and scale.", icon: Globe },
];

function BenefitCard({ item, index }: { item: (typeof benefits)[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });
  const Icon = item.icon;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.07, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      style={{
        borderTop: "1px solid rgba(0,0,0,0.08)",
        padding: "36px 0",
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <div
        style={{
          width: 40,
          height: 40,
          borderRadius: 10,
          border: "1px solid rgba(0,0,0,0.1)",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          color: "var(--fg)",
        }}
      >
        <Icon size={20} strokeWidth={1.5} />
      </div>
      <h3
        style={{
          fontFamily: "var(--font-poppins)",
          fontWeight: 700,
          fontSize: "clamp(15px, 1.3vw, 18px)",
          letterSpacing: "-0.5px",
          textTransform: "uppercase",
          color: "var(--fg)",
          lineHeight: 1.2,
        }}
      >
        {item.title}
      </h3>
      <p
        style={{
          fontFamily: "var(--font-inter)",
          fontWeight: 400,
          fontSize: 14,
          letterSpacing: "-0.3px",
          lineHeight: 1.6,
          color: "var(--fg-secondary)",
        }}
      >
        {item.subtitle}
      </p>
    </motion.div>
  );
}

export default function Benefits() {
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
      {/* Header */}
      <div ref={ref} style={{ marginBottom: 8 }}>
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
            marginBottom: 16,
          }}
        >
          BENEFITS
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.5, delay: 0.05 }}
          style={{
            fontFamily: "var(--font-poppins)",
            fontWeight: 700,
            fontSize: "clamp(24px, 3vw, 40px)",
            letterSpacing: "-2px",
            lineHeight: 1.05,
            textTransform: "uppercase",
            color: "var(--fg)",
            maxWidth: 600,
            marginBottom: 0,
          }}
        >
          Why clients keep coming back
        </motion.h2>
      </div>

      {/* Benefits grid — 2 cols, 5 items (last spans 2 cols or sits alone) */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "0 48px" }}>
        {benefits.map((item, i) => (
          <BenefitCard key={i} item={item} index={i} />
        ))}
      </div>

      {/* Upwork CTA */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.3 }}
        style={{
          marginTop: 48,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "28px 32px",
          background: "var(--card-bg)",
          borderRadius: "var(--radius-md)",
          flexWrap: "wrap",
          gap: 24,
        }}
      >
        <div>
          <h3
            style={{
              fontFamily: "var(--font-poppins)",
              fontWeight: 700,
              fontSize: 18,
              letterSpacing: "-0.5px",
              textTransform: "uppercase",
              color: "var(--fg)",
              marginBottom: 6,
            }}
          >
            HIRE ME ON UPWORK
          </h3>
          <p style={{ fontFamily: "var(--font-inter)", fontSize: 14, color: "var(--fg-secondary)", letterSpacing: "-0.4px" }}>
            Trusted by 50+ clients to design, fix bugs, customise templates, and launch websites built to convert.
          </p>
        </div>
        <a
          href="https://www.upwork.com"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            fontFamily: "var(--font-inter)",
            fontWeight: 600,
            fontSize: 13,
            color: "var(--white)",
            background: "#14a800",
            padding: "12px 24px",
            borderRadius: 100,
            textDecoration: "none",
            display: "inline-flex",
            alignItems: "center",
            gap: 6,
          }}
        >
          HIRE ME ON UPWORK <ArrowUpRight size={14} strokeWidth={2.5} />
        </a>
      </motion.div>
    </section>
  );
}
