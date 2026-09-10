"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

const benefits = [
  {
    title: "ONE EXPERT, CONSISTENT RESULTS",
    subtitle: "Delivered 50+ projects on time, every time",
  },
  {
    title: "SPEED & PRECISION",
    subtitle: "Fast doesn't mean rushed, every detail is handled with focus and care.",
  },
  {
    title: "TAILORED DESIGN",
    subtitle: "I create custom visuals that position your brand clearly and set it apart.",
  },
  {
    title: "WIDE-RANGE EXPERIENCE",
    subtitle: "Different industries, one focus, designing products that work and scale.",
  },
];

function BenefitCard({
  item,
  index,
}: {
  item: (typeof benefits)[0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: index * 0.08, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      style={{
        background: "var(--card-bg)",
        borderRadius: "var(--radius-md)",
        padding: "40px 36px",
        display: "flex",
        flexDirection: "column",
        gap: 16,
      }}
    >
      <span
        style={{
          fontFamily: "var(--font-inter)",
          fontWeight: 400,
          fontSize: 13,
          color: "var(--fg-muted)",
        }}
      >
        {String(index + 1).padStart(2, "0")}
      </span>
      <h3
        style={{
          fontFamily: "var(--font-poppins)",
          fontWeight: 700,
          fontSize: "clamp(16px, 1.4vw, 20px)",
          letterSpacing: "-0.6px",
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

export default function WhyMe() {
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
      {/* Section header */}
      <div style={{ marginBottom: 48, display: "flex", alignItems: "flex-start", gap: 80, flexWrap: "wrap" }}>
        <div style={{ flex: 1, minWidth: 300 }}>
          <motion.p
            ref={ref}
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
            WHY ME
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
            animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.5, delay: 0.05 }}
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
            <span style={{ color: "rgb(163, 163, 163)" }}>I build websites that perform.</span>
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          style={{
            fontFamily: "var(--font-inter)",
            fontWeight: 400,
            fontSize: 14,
            letterSpacing: "-0.7px",
            lineHeight: 1.7,
            color: "var(--fg-secondary)",
            maxWidth: 400,
            flex: 1,
            paddingTop: 40,
          }}
        >
          Trusted by{" "}
          <strong style={{ color: "var(--fg)", fontWeight: 600 }}>50+ clients</strong>{" "}
          to design, fix bugs, customise templates, and launch websites built to convert.
        </motion.p>
      </div>

      {/* Benefits grid */}
      <div style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: 20 }}>
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
          padding: "32px",
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
              fontWeight: 500,
              fontSize: 18,
              letterSpacing: "-0.7px",
              textTransform: "uppercase",
              color: "var(--fg)",
              marginBottom: 8,
            }}
          >
            HIRE ME ON UPWORK
          </h3>
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: 14,
              color: "var(--fg-secondary)",
              letterSpacing: "-0.4px",
            }}
          >
            Top Rated Framer Developer • 50+ Jobs Completed
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
          }}
        >
          View Upwork Profile <ArrowUpRight size={14} strokeWidth={2.5} />
        </a>
      </motion.div>
    </section>
  );
}
