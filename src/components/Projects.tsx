"use client";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef, useState } from "react";
import Link from "next/link";
import { useLang } from "@/context/LangContext";

const projects = [
  {
    title: "The Initial — AI Website",
    meta: "Figma to Framer",
    year: "2025",
    href: "https://the-initial.com/",
    caseStudy: "/case-study/the-initial",
  },
  {
    title: "BindHQ",
    meta: "Framer Template Customization",
    year: "2026",
    href: "https://www.bindhq.com/",
  },
  {
    title: "VPA London — Talent Website",
    meta: "Framer Development",
    year: "2025",
    href: "https://www.vpalondon.co.uk/",
  },
  {
    title: "Upside ESG",
    meta: "SaaS Framer Development and Integrations",
    year: "2026",
    href: "https://upside-esg.com/",
    caseStudy: "/case-study/upside-esg",
  },
];

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

function screenshotUrl(href: string) {
  return `https://api.microlink.io?url=${encodeURIComponent(href)}&screenshot=true&meta=false&embed=screenshot.url`;
}

function ProjectCard({ project, index, inView }: { project: typeof projects[0]; index: number; inView: boolean }) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.08, ease: EASE }}
      style={{ display: "flex", flexDirection: "column" }}
    >
      {/* Screenshot */}
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "block",
          position: "relative",
          width: "100%",
          aspectRatio: "16/10",
          overflow: "hidden",
          background: "#e8e8e8",
          textDecoration: "none",
        }}
      >
        {!loaded && !errored && (
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(90deg, #e8e8e8 25%, #f0f0f0 50%, #e8e8e8 75%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 1.4s infinite",
          }} />
        )}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={screenshotUrl(project.href)}
          alt={project.title}
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          style={{
            position: "absolute", inset: 0,
            width: "100%", height: "100%",
            objectFit: "cover", objectPosition: "top center",
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.4s ease",
          }}
        />
        {errored && (
          <div style={{
            position: "absolute", inset: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "#f5f5f5",
          }}>
            <span style={{
              fontFamily: "var(--font-poppins)", fontWeight: 700,
              fontSize: 48, color: "rgba(0,0,0,0.08)", letterSpacing: "-2px",
            }}>
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        )}
        <div style={{
          position: "absolute", inset: 0,
          background: "rgba(0,0,0,0)",
          transition: "background 0.25s",
        }}
          className="project-card-overlay"
        />
        <div style={{
          position: "absolute", top: 16, right: 16,
          width: 36, height: 36,
          background: "var(--fg)",
          display: "flex", alignItems: "center", justifyContent: "center",
        }}>
          <ArrowUpRight size={16} strokeWidth={2} color="#fff" />
        </div>
      </a>

      {/* Info row */}
      <div style={{
        display: "flex", alignItems: "flex-start",
        justifyContent: "space-between",
        gap: 16, paddingTop: 20,
      }}>
        <div style={{ minWidth: 0 }}>
          <h3 style={{
            fontFamily: "var(--font-poppins)", fontWeight: 600,
            fontSize: "clamp(15px, 1.2vw, 17px)", letterSpacing: "-0.3px",
            textTransform: "uppercase", color: "var(--fg)",
            marginBottom: 4, lineHeight: 1.2,
          }}>{project.title}</h3>
          <p style={{
            fontFamily: "var(--font-inter)", fontWeight: 400,
            fontSize: 11, letterSpacing: "0.5px",
            textTransform: "uppercase", color: "var(--fg-secondary)",
          }}>
            {project.meta} &nbsp;·&nbsp; {project.year}
          </p>
        </div>
        {"caseStudy" in project && project.caseStudy && (
          <Link
            href={project.caseStudy as string}
            style={{
              fontFamily: "var(--font-inter)", fontWeight: 700,
              fontSize: 10, letterSpacing: "1.5px",
              textTransform: "uppercase", color: "var(--accent-purple)",
              textDecoration: "none",
              borderBottom: "1px solid rgba(109,40,217,0.3)",
              paddingBottom: 1, flexShrink: 0, paddingTop: 2,
              whiteSpace: "nowrap",
            }}
          >
            Case Study →
          </Link>
        )}
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const { t } = useLang();

  return (
    <section
      id="work"
      style={{ width: "100%", maxWidth: 1200, margin: "0 auto", padding: "80px 20px" }}
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
            fontWeight: 700, fontSize: 11,
            letterSpacing: "4px", textTransform: "uppercase",
            color: "var(--accent-purple)", marginBottom: 16,
          }}
        >
          {t("projects.eyebrow")}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.05 }}
          style={{
            fontFamily: "var(--font-poppins)", fontWeight: 700,
            fontSize: "clamp(28px, 3.5vw, 48px)", letterSpacing: "-1px",
            lineHeight: 1, textTransform: "uppercase", color: "var(--fg)",
          }}
        >
          {t("projects.h1")}
        </motion.h2>
      </div>

      {/* 2×2 card grid */}
      <div
        className="projects-card-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "48px 40px",
        }}
      >
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} inView={inView} />
        ))}
      </div>

      <style>{`
        @media (max-width: 640px) {
          .projects-card-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>
    </section>
  );
}
