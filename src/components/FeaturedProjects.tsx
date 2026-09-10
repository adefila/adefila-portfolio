"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";

const featured = [
  {
    title: "BookedEZ",
    meta: "PLAY STORE & APP STORE",
    type: "Mobile App • United States • LIVE",
    color: "#d4c5ff",
    bgColor: "#f0ecff",
    description: "A seamless booking experience for service-based businesses, available on both major app stores.",
    index: "01",
  },
  {
    title: "HitPay",
    meta: "LIVE",
    type: "Framer Development • Singapore",
    color: "#b8d4ff",
    bgColor: "#e8f0ff",
    description: "A next-generation payment platform built on Framer with seamless user experience.",
    index: "02",
  },
];

export default function FeaturedProjects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      style={{
        width: "98%",
        margin: "0 auto",
        padding: "60px 40px",
        background: "var(--bg)",
        borderRadius: "var(--radius-lg)",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header */}
        <div style={{ marginBottom: 48, display: "flex", justifyContent: "space-between", alignItems: "flex-end", flexWrap: "wrap", gap: 24 }}>
          <div>
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
                marginBottom: 12,
              }}
            >
              RECENT PROJECTS
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
                lineHeight: 1,
                textTransform: "uppercase",
                color: "var(--fg)",
              }}
            >
              FEATURED PROJECTS
            </motion.h2>
          </div>
          <a
            href="#work"
            style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 500,
              fontSize: 13,
              color: "var(--fg)",
              textDecoration: "none",
              letterSpacing: "-0.2px",
              opacity: 0.6,
            }}
          >
            View all <ArrowRight size={14} strokeWidth={2} style={{ display: "inline", verticalAlign: "middle" }} />
          </a>
        </div>

        {/* Featured cards */}
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20, flexWrap: "wrap" }}>
          {featured.map((project, i) => (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
              animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.6, delay: i * 0.12, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
              whileHover={{ y: -6, transition: { duration: 0.3 } }}
              style={{
                background: project.bgColor,
                borderRadius: "var(--radius-md)",
                padding: 32,
                minHeight: 360,
                display: "flex",
                flexDirection: "column",
                justifyContent: "space-between",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
              }}
            >
              {/* Index */}
              <div
                style={{
                  fontFamily: "var(--font-satoshi)",
                  fontWeight: 500,
                  fontSize: 80,
                  letterSpacing: "-0.1em",
                  lineHeight: 1,
                  color: project.color,
                  position: "absolute",
                  right: 24,
                  top: 16,
                  opacity: 0.6,
                }}
              >
                {project.index}
              </div>

              <div>
                <p
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontWeight: 700,
                    fontSize: 11,
                    letterSpacing: "0.3px",
                    textTransform: "uppercase",
                    color: "var(--fg-secondary)",
                    marginBottom: 8,
                  }}
                >
                  {project.meta}
                </p>
                <h3
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontWeight: 700,
                    fontSize: 24,
                    letterSpacing: "-0.5px",
                    textTransform: "uppercase",
                    color: "var(--fg)",
                    marginBottom: 16,
                  }}
                >
                  {project.title}
                </h3>
                <p
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: 14,
                    lineHeight: 1.6,
                    color: "var(--fg-secondary)",
                    letterSpacing: "-0.3px",
                    maxWidth: 320,
                  }}
                >
                  {project.description}
                </p>
              </div>

              <div>
                <p
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontWeight: 400,
                    fontSize: 11,
                    letterSpacing: "0.3px",
                    textTransform: "uppercase",
                    color: "var(--fg-secondary)",
                  }}
                >
                  {project.type}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
