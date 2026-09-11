"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight, ChevronsRight, Tag, CircleDot, TrendingUp } from "lucide-react";

const benefits = [
  {
    icon: ChevronsRight,
    title: "SPEED & PRECISION",
    desc: "Fast doesn't mean rushed, every detail is handled with focus and care.",
  },
  {
    icon: Tag,
    title: "TAILORED DESIGN",
    desc: "I create custom visuals that position your brand clearly and set it apart.",
  },
  {
    icon: CircleDot,
    title: "ONE EXPERT. ONE VISION.",
    desc: "From strategy to launch, everything handled with clarity and intent.",
  },
  {
    icon: TrendingUp,
    title: "WIDE-RANGE EXPERIENCE",
    desc: "Different industries, one focus, designing products that work and scale.",
  },
];

export default function Benefits() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      style={{
        width: "100%",
        maxWidth: 1200,
        margin: "0 auto",
        padding: "80px 20px",
      }}
    >
      {/* Header */}
      <div ref={ref} style={{ marginBottom: 48 }}>
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
            color: "var(--accent-purple)",
            marginBottom: 20,
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
            fontSize: "clamp(28px, 3.5vw, 48px)",
            letterSpacing: "-2px",
            lineHeight: 1.05,
            textTransform: "uppercase",
            color: "var(--fg)",
            maxWidth: 700,
          }}
        >
          ONE EXPERT, CONSISTENT RESULTS: DELIVERED 50+ PROJECTS ON TIME, EVERY TIME
        </motion.h2>
      </div>

      {/* 2×2 grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "0 80px",
          marginBottom: 48,
        }}
      >
        {benefits.map((item, i) => {
          const Icon = item.icon;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.4, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              style={{
                borderTop: "1px solid rgba(0,0,0,0.1)",
                padding: "32px 0",
              }}
            >
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 12,
                }}
              >
                <Icon size={16} strokeWidth={1.5} color="var(--fg-secondary)" />
                <h3
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontWeight: 700,
                    fontSize: 14,
                    letterSpacing: "0.3px",
                    textTransform: "uppercase",
                    color: "var(--fg)",
                    lineHeight: 1,
                  }}
                >
                  {item.title}
                </h3>
              </div>
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 400,
                  fontSize: 14,
                  letterSpacing: "-0.2px",
                  lineHeight: 1.6,
                  color: "var(--fg-secondary)",
                }}
              >
                {item.desc}
              </p>
            </motion.div>
          );
        })}
      </div>

      {/* Upwork card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{
          background: "var(--white)",
          border: "1px solid rgba(0,0,0,0.07)",
          borderRadius: "var(--radius-md)",
          padding: "28px 32px",
        }}
      >
        {/* Top row: logo + badges */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          {/* Upwork logo */}
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              background: "#14a800",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 900,
                fontSize: 16,
                color: "#fff",
                letterSpacing: "-1px",
              }}
            >
              up
            </span>
          </div>

          {/* Badges */}
          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  border: "2px solid #1d9bf0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                }}
              >
                👑
              </div>
              <span
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 600,
                  fontSize: 13,
                  color: "var(--fg)",
                }}
              >
                100% Job Success
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  border: "2px solid #1d9bf0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                }}
              >
                ⭐
              </div>
              <span
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 600,
                  fontSize: 13,
                  color: "var(--fg)",
                }}
              >
                Top Rated
              </span>
            </div>
          </div>
        </div>

        {/* Bottom row: text + button */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: 20,
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
                letterSpacing: "-0.3px",
                lineHeight: 1.5,
                maxWidth: 480,
              }}
            >
              Trusted by{" "}
              <span style={{ color: "var(--accent-purple)", fontWeight: 500 }}>
                50+ clients
              </span>{" "}
              to design, fix bugs, customise templates, and launch websites built to convert.
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
              background: "var(--fg)",
              padding: "14px 28px",
              borderRadius: 100,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              whiteSpace: "nowrap",
            }}
          >
            HIRE ME ON UPWORK <ArrowUpRight size={14} strokeWidth={2.5} />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
