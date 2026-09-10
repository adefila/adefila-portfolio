"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const projects = [
  {
    title: "BookedEZ",
    meta: "Mobile App • United States • LIVE",
    category: "App Design",
    color: "#e8e4ff",
    accent: "#6d28d9",
    emoji: "📱",
    gradient: "linear-gradient(135deg, #e8e4ff 0%, #d4c5ff 100%)",
  },
  {
    title: "HitPay",
    meta: "Framer Development • Singapore • LIVE",
    category: "Framer Dev",
    color: "#e0f4ff",
    accent: "#0077cc",
    emoji: "💳",
    gradient: "linear-gradient(135deg, #e0f4ff 0%, #b8e4ff 100%)",
  },
  {
    title: "Clipmaster",
    meta: "Website Design • Belgium • LIVE",
    category: "Web Design",
    color: "#fff4e0",
    accent: "#d97706",
    emoji: "✂️",
    gradient: "linear-gradient(135deg, #fff4e0 0%, #ffe0a0 100%)",
  },
  {
    title: "Neetly",
    meta: "App Design • Nigeria • Figma File",
    category: "UI/UX Design",
    color: "#e0fff4",
    accent: "#059669",
    emoji: "🌿",
    gradient: "linear-gradient(135deg, #e0fff4 0%, #a7f3d0 100%)",
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
        aspectRatio: index === 0 || index === 1 ? "16/10" : "4/3",
        display: "flex",
        flexDirection: "column",
        justifyContent: "flex-end",
        padding: 24,
        gridColumn: index === 0 ? "span 2" : "span 1",
        transition: "transform 0.3s cubic-bezier(0.22,1,0.36,1), box-shadow 0.3s",
      }}
      whileHover={{ scale: 1.02, y: -4 }}
    >
      {/* Emoji icon */}
      <div
        style={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%,-60%)",
          fontSize: 72,
          opacity: 0.5,
        }}
      >
        {project.emoji}
      </div>

      {/* Project info */}
      <div>
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontWeight: 700,
            fontSize: 11,
            letterSpacing: "0.3px",
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
            fontSize: 12,
            letterSpacing: "0.3px",
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
