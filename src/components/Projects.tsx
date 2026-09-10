"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const projects = [
  {
    title: "BookedEZ",
    meta: "Mobile App • United States • LIVE",
    category: "App Design",
    gradient: "linear-gradient(135deg, #e8e4ff 0%, #d4c5ff 100%)",
    accent: "#6d28d9",
    shape: "#c4b5fd",
  },
  {
    title: "HitPay",
    meta: "Framer Development • Singapore • LIVE",
    category: "Framer Dev",
    gradient: "linear-gradient(135deg, #dbeafe 0%, #bfdbfe 100%)",
    accent: "#1d4ed8",
    shape: "#93c5fd",
  },
  {
    title: "Clipmaster",
    meta: "Website Design • Belgium • LIVE",
    category: "Web Design",
    gradient: "linear-gradient(135deg, #fef3c7 0%, #fde68a 100%)",
    accent: "#b45309",
    shape: "#fcd34d",
  },
  {
    title: "Neetly",
    meta: "App Design • Nigeria • Figma File",
    category: "UI/UX Design",
    gradient: "linear-gradient(135deg, #d1fae5 0%, #a7f3d0 100%)",
    accent: "#047857",
    shape: "#6ee7b7",
  },
];

function ProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
      animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
      transition={{ duration: 0.6, delay: index * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      style={{
        position: "relative",
        borderRadius: "var(--radius-md)",
        overflow: "hidden",
        cursor: "pointer",
        background: project.gradient,
        aspectRatio: index === 0 ? "16/10" : index === 1 ? "4/3" : "4/3",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: 24,
        gridColumn: index === 0 ? "span 2" : "span 1",
      }}
      whileHover={{ scale: 1.02, y: -4, transition: { duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] } }}
    >
      {/* Abstract shape */}
      <div
        style={{
          position: "absolute",
          top: "30%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: index === 0 ? 200 : 120,
          height: index === 0 ? 200 : 120,
          borderRadius: "50%",
          background: project.shape,
          opacity: 0.35,
          filter: "blur(40px)",
          pointerEvents: "none",
        }}
      />
      <div
        style={{
          position: "absolute",
          top: "20%",
          left: index === 0 ? "20%" : "30%",
          width: index === 0 ? 80 : 50,
          height: index === 0 ? 80 : 50,
          borderRadius: "var(--radius-sm)",
          background: project.shape,
          opacity: 0.2,
          transform: "rotate(15deg)",
          pointerEvents: "none",
        }}
      />

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
            fontFamily: "var(--font-inter)",
            fontWeight: 700,
            fontSize: 20,
            letterSpacing: "-0.3px",
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
        padding: "60px 20px",
      }}
    >
      {/* Section header */}
      <div style={{ marginBottom: 48 }}>
        <motion.p
          ref={ref}
          initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          style={{
            fontFamily: "var(--font-inter)",
            fontWeight: 700,
            fontSize: 11,
            letterSpacing: "12px",
            textTransform: "uppercase",
            color: "var(--fg-label)",
            marginBottom: 12,
          }}
        >
          /Recent Projects
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.5, delay: 0.05, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          style={{
            fontFamily: "var(--font-poppins)",
            fontWeight: 700,
            fontSize: "clamp(28px, 3.5vw, 64px)",
            letterSpacing: "-2px",
            lineHeight: 1.2,
            textTransform: "uppercase",
            color: "var(--fg)",
          }}
        >
          Featured projects
        </motion.h2>
      </div>

      {/* Projects grid */}
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
