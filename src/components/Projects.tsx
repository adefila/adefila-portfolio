"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const projects = [
  { title: "The Initail — AI Website", meta: "Figma to Framer", year: "2025" },
  { title: "HitPay — SaaS Website", meta: "Framer Development", year: "2024" },
  { title: "Everything AI", meta: "Figma to Framer", year: "2025" },
  { title: "Clipmaster — Video Agency", meta: "Web Design", year: "2024" },
  { title: "VPA London — Talent Website", meta: "Framer Development", year: "2025" },
  { title: "Virvly", meta: "Framer Development", year: "2025" },
  { title: "Jamal Muse — Personal Portfolio", meta: "Claude to Framer", year: "2025" },
  { title: "Alyssa Corso — Personal Portfolio", meta: "Framer Development", year: "2026" },
  { title: "Venera", meta: "Framer Development", year: "2026" },
];

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

function ProjectRow({ project, index }: { project: (typeof projects)[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 12 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.4, delay: (index % 2) * 0.06, ease: EASE }}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        gap: 16,
        padding: "24px 28px",
        background: "var(--white)",
        border: "1px solid rgba(0,0,0,0.07)",
        borderRadius: 0,
        cursor: "pointer",
      }}
    >
      <h3
        style={{
          fontFamily: "var(--font-poppins)",
          fontWeight: 700,
          fontSize: "clamp(13px, 1.2vw, 16px)",
          letterSpacing: "-0.3px",
          textTransform: "uppercase",
          color: "var(--fg)",
          lineHeight: 1.2,
        }}
      >
        {project.title}
      </h3>
      <p
        style={{
          fontFamily: "var(--font-inter)",
          fontWeight: 400,
          fontSize: 12,
          color: "var(--fg-secondary)",
          whiteSpace: "nowrap",
          flexShrink: 0,
        }}
      >
        {project.meta} &nbsp;•&nbsp; {project.year}
      </p>
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
      <div style={{ marginBottom: 40 }}>
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
            color: "var(--accent-purple)",
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

      {/* 2-column list grid */}
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: 12,
        }}
      >
        {projects.map((project, i) => (
          <ProjectRow key={project.title} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
