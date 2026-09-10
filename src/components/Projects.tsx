"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const projects = [
  {
    title: "The Initail — AI Website",
    meta: "Figma to Framer • 2025",
    gradient: "linear-gradient(140deg, #e8e4ff 0%, #c4b5fd 100%)",
    accent: "#6d28d9",
    span: 2,
    tall: true,
  },
  {
    title: "HitPay — SaaS Website",
    meta: "Framer Development • 2024",
    gradient: "linear-gradient(140deg, #dbeafe 0%, #93c5fd 100%)",
    accent: "#1d4ed8",
    span: 1,
    tall: false,
  },
  {
    title: "Everything AI",
    meta: "Figma to Framer • 2025",
    gradient: "linear-gradient(140deg, #f0fdf4 0%, #86efac 100%)",
    accent: "#166534",
    span: 1,
    tall: false,
  },
  {
    title: "Clipmaster — Video Agency",
    meta: "Web Design • 2024",
    gradient: "linear-gradient(140deg, #fff7ed 0%, #fdba74 100%)",
    accent: "#c2410c",
    span: 1,
    tall: false,
  },
  {
    title: "VPA London — Talent Website",
    meta: "Framer Development • 2025",
    gradient: "linear-gradient(140deg, #fdf4ff 0%, #e879f9 40%, #a21caf 100%)",
    accent: "#86198f",
    span: 2,
    tall: false,
  },
  {
    title: "Virvly",
    meta: "Framer Development • 2025",
    gradient: "linear-gradient(140deg, #f0f9ff 0%, #38bdf8 100%)",
    accent: "#0369a1",
    span: 1,
    tall: false,
  },
  {
    title: "Jamal Muse — Portfolio",
    meta: "Claude to Framer • 2025",
    gradient: "linear-gradient(140deg, #1c1917 0%, #44403c 100%)",
    accent: "#d6d3d1",
    dark: true,
    span: 1,
    tall: false,
  },
  {
    title: "Alyssa Corso — Portfolio",
    meta: "Framer Development • 2026",
    gradient: "linear-gradient(140deg, #fef9c3 0%, #fde047 100%)",
    accent: "#854d0e",
    span: 1,
    tall: false,
  },
  {
    title: "Venera",
    meta: "Framer Development • 2026",
    gradient: "linear-gradient(140deg, #ecfdf5 0%, #6ee7b7 100%)",
    accent: "#065f46",
    span: 1,
    tall: false,
  },
];

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

function ProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.6, delay: (index % 3) * 0.1, ease: EASE }}
      whileHover={{ y: -4, transition: { duration: 0.25, ease: EASE } }}
      style={{
        position: "relative",
        borderRadius: "var(--radius-md)",
        overflow: "hidden",
        cursor: "pointer",
        background: project.gradient,
        gridColumn: `span ${project.span}`,
        minHeight: project.tall ? 400 : 280,
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: 28,
      }}
    >
      {/* Frosted preview placeholder */}
      <div
        style={{
          position: "absolute",
          inset: 0,
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          paddingBottom: 72,
        }}
      >
        <div
          style={{
            width: project.span === 2 ? "55%" : "65%",
            aspectRatio: "16/10",
            borderRadius: 10,
            background: project.dark ? "rgba(255,255,255,0.08)" : "rgba(255,255,255,0.3)",
            border: `1px solid ${project.dark ? "rgba(255,255,255,0.12)" : "rgba(255,255,255,0.5)"}`,
            backdropFilter: "blur(4px)",
          }}
        />
      </div>

      {/* Info */}
      <div style={{ position: "relative" }}>
        <h3
          style={{
            fontFamily: "var(--font-poppins)",
            fontWeight: 700,
            fontSize: project.span === 2 ? 22 : 16,
            letterSpacing: "-0.5px",
            textTransform: "uppercase",
            color: project.dark ? "#fff" : "var(--fg)",
            marginBottom: 4,
            lineHeight: 1.1,
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
            color: project.dark ? "rgba(255,255,255,0.5)" : project.accent,
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
      {/* Header */}
      <div style={{ marginBottom: 48 }}>
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

      {/* 3-column grid */}
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
