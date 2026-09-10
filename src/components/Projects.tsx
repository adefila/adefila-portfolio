"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const projects = [
  {
    title: "BookedEZ",
    meta: "Mobile App • United States • LIVE",
    category: "App Design",
    gradient: "linear-gradient(160deg, #e8e4ff 0%, #cdb8ff 100%)",
    accent: "#6d28d9",
  },
  {
    title: "HitPay",
    meta: "Framer Development • Singapore • LIVE",
    category: "Framer Dev",
    gradient: "linear-gradient(160deg, #dbeafe 0%, #93c5fd 100%)",
    accent: "#1d4ed8",
  },
  {
    title: "Neetly",
    meta: "App Design • Nigeria • Figma File",
    category: "UI/UX Design",
    gradient: "linear-gradient(160deg, #d1fae5 0%, #6ee7b7 100%)",
    accent: "#047857",
  },
];

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

function ProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });

  const isFirst = index === 0;

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: EASE }}
      whileHover={{ y: -6, transition: { duration: 0.3, ease: EASE } }}
      style={{
        position: "relative",
        borderRadius: "var(--radius-md)",
        overflow: "hidden",
        cursor: "pointer",
        background: project.gradient,
        gridColumn: isFirst ? "span 2" : "span 1",
        minHeight: isFirst ? 380 : 300,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: "28px 28px 28px 28px",
      }}
    >
      {/* Image placeholder area */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 80,
        }}
      >
        <div
          style={{
            width: isFirst ? "60%" : "70%",
            aspectRatio: "16/10",
            borderRadius: 12,
            background: "rgba(255,255,255,0.25)",
            border: "1px solid rgba(255,255,255,0.4)",
            backdropFilter: "blur(4px)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <span
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: 11,
              fontWeight: 500,
              letterSpacing: "1.5px",
              textTransform: "uppercase",
              color: project.accent,
              opacity: 0.7,
            }}
          >
            Project Preview
          </span>
        </div>
      </div>

      {/* Project info */}
      <div style={{ position: "relative" }}>
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontWeight: 700,
            fontSize: 10,
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: project.accent,
            marginBottom: 6,
          }}
        >
          {project.category}
        </p>
        <h3
          style={{
            fontFamily: "var(--font-poppins)",
            fontWeight: 700,
            fontSize: isFirst ? 24 : 18,
            letterSpacing: "-0.5px",
            textTransform: "uppercase",
            color: "var(--fg)",
            marginBottom: 4,
          }}
        >
          {project.title}
        </h3>
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontWeight: 400,
            fontSize: 11,
            letterSpacing: "0.5px",
            textTransform: "uppercase",
            color: "var(--fg-secondary)",
          }}
        >
          {project.meta}
        </p>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      id="work"
      style={{
        width: "100%",
        maxWidth: 1200,
        margin: "0 auto",
        padding: "80px 20px",
      }}
    >
      {/* Section header */}
      <div style={{ marginBottom: 48 }}>
        <motion.p
          ref={ref}
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: EASE }}
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
          / Recent Projects
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.5, delay: 0.05, ease: EASE }}
          style={{
            fontFamily: "var(--font-poppins)",
            fontWeight: 700,
            fontSize: "clamp(32px, 4vw, 56px)",
            letterSpacing: "-2px",
            lineHeight: 1,
            textTransform: "uppercase",
            color: "var(--fg)",
          }}
        >
          Featured Projects
        </motion.h2>
      </div>

      {/* Projects grid — 3 cols, first card spans 2 */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 16,
        }}
      >
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
