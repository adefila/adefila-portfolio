"use client";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import Link from "next/link";
import { useLang } from "@/context/LangContext";

const projects = [
  {
    title: "The Initial",
    tag: "AI",
    meta: "Figma to Framer",
    year: "2025",
    href: "https://the-initial.com/",
    accent: "#7c3aed",
    caseStudy: "/case-study/the-initial",
  },
  {
    title: "BindHQ",
    tag: "SaaS",
    meta: "Template Customization",
    year: "2026",
    href: "https://www.bindhq.com/",
    accent: "#0073e6",
  },
  {
    title: "VPA London",
    tag: "Talent",
    meta: "Framer Development",
    year: "2025",
    href: "https://www.vpalondon.co.uk/",
    accent: "#d4a853",
  },
  {
    title: "Upside ESG",
    tag: "ESG",
    meta: "Framer Dev & Integrations",
    year: "2026",
    href: "https://upside-esg.com/",
    accent: "#00ab4a",
    caseStudy: "/case-study/upside-esg",
  },
  {
    title: "Alyssa Corso",
    tag: "Portfolio",
    meta: "Framer Development",
    year: "2026",
    href: "https://alyssacorso.com/",
    accent: "#e05a8a",
  },
  {
    title: "Emalbu",
    tag: "HTML → Framer",
    meta: "Website Migration",
    year: "2026",
    href: "https://emalbu.com/",
    accent: "#c0a060",
  },
];

const SPRING = "cubic-bezier(0.22, 1, 0.36, 1)";
const E = SPRING;


function ProjectCard({
  project,
  index,
}: {
  project: (typeof projects)[0];
  index: number;
}) {
  const [hovered, setHovered] = useState(false);

  const displayUrl = project.href.replace(/^https?:\/\//, "").replace(/\/$/, "");
  const cardHref = "caseStudy" in project && project.caseStudy ? project.caseStudy as string : project.href;
  const cardIsExternal = !("caseStudy" in project && project.caseStudy);

  return (
    <div style={{ display: "flex", flexDirection: "column", animation: `fadeUp 0.5s ${0.08 + index * 0.07}s ${E} both` }}>
      {/* Project card */}
      <Link
        href={cardHref}
        target={cardIsExternal ? "_blank" : undefined}
        rel={cardIsExternal ? "noopener noreferrer" : undefined}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "block",
          position: "relative",
          width: "100%",
          aspectRatio: "1200/630",
          overflow: "hidden",
          background: "#0f0f0f",
          textDecoration: "none",
          cursor: "pointer",
        }}
      >
        {/* Accent color wash — slides up on hover */}
        <div style={{
          position: "absolute", inset: 0,
          background: `linear-gradient(135deg, ${project.accent}22 0%, transparent 60%)`,
          opacity: hovered ? 1 : 0,
          transition: "opacity 0.4s ease",
        }} />

        {/* Large number — background texture */}
        <span style={{
          position: "absolute",
          bottom: -16, right: 12,
          fontFamily: "var(--font-poppins)", fontWeight: 700,
          fontSize: "clamp(100px, 14vw, 160px)",
          letterSpacing: "-8px", lineHeight: 1,
          color: "rgba(255,255,255,0.04)",
          userSelect: "none", pointerEvents: "none",
          transition: `color 0.4s ease`,
        }}>
          {String(index + 1).padStart(2, "0")}
        </span>

        {/* Top bar — tag + URL */}
        <div style={{
          position: "absolute", top: 0, left: 0, right: 0, zIndex: 2,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "18px 20px",
        }}>
          <span style={{
            fontFamily: "var(--font-inter)", fontWeight: 700, fontSize: 10,
            letterSpacing: "2.5px", textTransform: "uppercase",
            color: project.accent,
            border: `1px solid ${project.accent}55`,
            padding: "4px 10px",
          }}>
            {project.tag}
          </span>
          <span style={{
            fontFamily: "var(--font-inter)", fontSize: 10,
            letterSpacing: "0.3px", color: "rgba(255,255,255,0.35)",
          }}>
            {displayUrl}
          </span>
        </div>

        {/* Center — project name */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 2,
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <h3 style={{
            fontFamily: "var(--font-poppins)", fontWeight: 700,
            fontSize: "clamp(22px, 3vw, 38px)",
            letterSpacing: "-1.5px", lineHeight: 1,
            textTransform: "uppercase", color: "#fff",
            margin: 0, textAlign: "center",
            transform: hovered ? "translateY(-4px)" : "translateY(0)",
            transition: `transform 0.4s ${SPRING}`,
          }}>
            {project.title}
          </h3>
        </div>

        {/* Bottom bar — meta */}
        <div style={{
          position: "absolute", bottom: 0, left: 0, right: 0, zIndex: 2,
          display: "flex", alignItems: "center", justifyContent: "space-between",
          padding: "18px 20px",
          borderTop: "1px solid rgba(255,255,255,0.06)",
        }}>
          <span style={{
            fontFamily: "var(--font-inter)", fontSize: 10,
            letterSpacing: "1.5px", textTransform: "uppercase",
            color: "rgba(255,255,255,0.4)",
          }}>
            {project.meta}
          </span>
          <span style={{
            fontFamily: "var(--font-inter)", fontSize: 10,
            letterSpacing: "1px", color: "rgba(255,255,255,0.25)",
          }}>
            {project.year}
          </span>
        </div>

        {/* Arrow button */}
        <button
          onClick={(e) => { e.preventDefault(); e.stopPropagation(); window.open(project.href, "_blank", "noopener,noreferrer"); }}
          aria-label={`Open ${project.title}`}
          style={{
            position: "absolute", top: 14, right: 14, zIndex: 4,
            width: 36, height: 36,
            background: hovered ? project.accent : "rgba(255,255,255,0.1)",
            display: "flex", alignItems: "center", justifyContent: "center",
            transition: `background 0.25s ease, transform 0.3s ${SPRING}`,
            transform: hovered ? "scale(1.08)" : "scale(1)",
            border: "none", cursor: "pointer", padding: 0,
          }}
        >
          <ArrowUpRight size={16} strokeWidth={2} color="#fff" />
        </button>
      </Link>

      {/* Info below card — meta only, title already shown in card */}
      {"caseStudy" in project && project.caseStudy && (
        <div style={{ paddingTop: 12 }}>
          <Link
            href={project.caseStudy as string}
            onClick={(e) => e.stopPropagation()}
            style={{
              fontFamily: "var(--font-inter)", fontWeight: 700,
              fontSize: 10, letterSpacing: "1.5px",
              textTransform: "uppercase", color: "var(--accent-purple)",
              textDecoration: "none",
              borderBottom: "1px solid rgba(109,40,217,0.3)",
              paddingBottom: 1,
            }}
          >
            Case Study →
          </Link>
        </div>
      )}
    </div>
  );
}

const E2 = "cubic-bezier(0.22,1,0.36,1)";

export default function Projects() {
  const { t } = useLang();

  return (
    <section
      id="work"
      style={{ width: "100%", maxWidth: 1200, margin: "0 auto", padding: "80px 20px" }}
    >
      <style>{`
        @media (max-width: 640px) {
          .projects-card-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>

      {/* Header */}
      <div style={{ marginBottom: 48 }}>
        <p style={{
          fontFamily: "var(--font-inter)", fontWeight: 700,
          fontSize: 11, letterSpacing: "4px", textTransform: "uppercase",
          color: "var(--accent-purple)", marginBottom: 16,
          animation: `fadeUp 0.5s 0.05s ${E2} both`,
        }}>
          {t("projects.eyebrow")}
        </p>
        <h2 style={{
          fontFamily: "var(--font-poppins)", fontWeight: 700,
          fontSize: "clamp(28px, 3.5vw, 48px)", letterSpacing: "-1px",
          lineHeight: 1, textTransform: "uppercase", color: "var(--fg)",
          animation: `fadeUp 0.5s 0.12s ${E2} both`,
        }}>
          {t("projects.h1")}
        </h2>
      </div>

      {/* 2×3 card grid */}
      <div
        className="projects-card-grid"
        style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "56px 40px" }}
      >
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
