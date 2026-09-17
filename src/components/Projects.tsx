"use client";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useEffect, useRef, useState } from "react";
import Link from "next/link";
import { useLang } from "@/context/LangContext";

const projects = [
  {
    title: "The Initial",
    tag: "AI",
    meta: "Figma to Framer",
    year: "2025",
    href: "https://the-initial.com/",
    caseStudy: "/case-study/the-initial",
  },
  {
    title: "BindHQ",
    tag: "SaaS",
    meta: "Template Customization",
    year: "2026",
    href: "https://www.bindhq.com/",
  },
  {
    title: "VPA London",
    tag: "Talent",
    meta: "Framer Development",
    year: "2025",
    href: "https://www.vpalondon.co.uk/",
  },
  {
    title: "Upside ESG",
    tag: "ESG",
    meta: "Framer Dev & Integrations",
    year: "2026",
    href: "https://upside-esg.com/",
    caseStudy: "/case-study/upside-esg",
  },
  {
    title: "Alyssa Corso",
    tag: "Portfolio",
    meta: "Framer Development",
    year: "2026",
    href: "https://alyssacorso.com/",
  },
  {
    title: "Emalbu",
    tag: "HTML → Framer",
    meta: "Website Migration",
    year: "2026",
    href: "https://emalbu.com/",
  },
];

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];
const SPRING = "cubic-bezier(0.22, 1, 0.36, 1)";

function screenshotUrl(href: string) {
  return `https://api.microlink.io?url=${encodeURIComponent(href)}&screenshot=true&meta=false&embed=screenshot.url`;
}

function ProjectCard({
  project,
  index,
  inView,
}: {
  project: (typeof projects)[0];
  index: number;
  inView: boolean;
}) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  const [hovered, setHovered] = useState(false);

  useEffect(() => {
    if (loaded || errored) return;
    const t = setTimeout(() => setErrored(true), 8000);
    return () => clearTimeout(t);
  }, [loaded, errored]);

  const displayUrl = project.href.replace(/^https?:\/\//, "").replace(/\/$/, "");

  return (
    <motion.div
      initial={{ opacity: 0, y: 24 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.5, delay: 0.1 + index * 0.08, ease: EASE }}
      style={{ display: "flex", flexDirection: "column" }}
    >
      {/* Screenshot card */}
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "block",
          position: "relative",
          width: "100%",
          aspectRatio: "16/10",
          overflow: "hidden",
          background: "#e8e8e8",
          textDecoration: "none",
          cursor: "pointer",
        }}
      >
        {/* Browser chrome — slides in from top on hover */}
        <div
          style={{
            position: "absolute",
            top: 0, left: 0, right: 0,
            zIndex: 3,
            height: 40,
            background: "rgba(18,18,18,0.94)",
            backdropFilter: "blur(10px)",
            display: "flex",
            alignItems: "center",
            gap: 10,
            padding: "0 14px",
            transform: hovered ? "translateY(0)" : "translateY(-100%)",
            transition: `transform 0.38s ${SPRING}`,
          }}
        >
          {/* Window dots */}
          <div style={{ display: "flex", gap: 5, flexShrink: 0 }}>
            {["#ff5f57", "#febc2e", "#28c840"].map((c, i) => (
              <span key={i} style={{ width: 10, height: 10, borderRadius: "50%", background: c, display: "block" }} />
            ))}
          </div>
          {/* URL bar */}
          <div style={{
            flex: 1,
            height: 22,
            background: "rgba(255,255,255,0.09)",
            borderRadius: 4,
            display: "flex",
            alignItems: "center",
            padding: "0 10px",
            gap: 6,
          }}>
            <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
              <circle cx="5" cy="5" r="4.5" stroke="rgba(255,255,255,0.35)" />
              <ellipse cx="5" cy="5" rx="2" ry="4.5" stroke="rgba(255,255,255,0.35)" />
              <line x1="0.5" y1="3" x2="9.5" y2="3" stroke="rgba(255,255,255,0.35)" />
              <line x1="0.5" y1="7" x2="9.5" y2="7" stroke="rgba(255,255,255,0.35)" />
            </svg>
            <span style={{
              fontFamily: "var(--font-inter)",
              fontSize: 11,
              color: "rgba(255,255,255,0.6)",
              letterSpacing: "0.2px",
            }}>
              {displayUrl}
            </span>
          </div>
        </div>

        {/* Shimmer while loading */}
        {!loaded && !errored && (
          <div style={{
            position: "absolute", inset: 0,
            background: "linear-gradient(90deg, #e0e0e0 25%, #ebebeb 50%, #e0e0e0 75%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 1.4s infinite",
          }} />
        )}

        {/* Screenshot image — shifts & zooms on hover */}
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
            transition: `opacity 0.4s ease, transform 0.45s ${SPRING}`,
            transform: hovered ? "scale(1.05) translateY(6px)" : "scale(1) translateY(0)",
          }}
        />

        {/* Fallback */}
        {errored && (
          <div style={{
            position: "absolute", inset: 0,
            display: "flex", alignItems: "center", justifyContent: "center",
            background: "#f0f0f0",
          }}>
            <span style={{
              fontFamily: "var(--font-poppins)", fontWeight: 700,
              fontSize: 48, color: "rgba(0,0,0,0.07)", letterSpacing: "-2px",
            }}>
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        )}

        {/* Overlay tint on hover */}
        <div style={{
          position: "absolute", inset: 0, zIndex: 1,
          background: hovered ? "rgba(0,0,0,0.08)" : "rgba(0,0,0,0)",
          transition: `background 0.3s ease`,
        }} />

        {/* Arrow button */}
        <div style={{
          position: "absolute", top: 14, right: 14, zIndex: 4,
          width: 36, height: 36,
          background: hovered ? "#fff" : "var(--fg)",
          display: "flex", alignItems: "center", justifyContent: "center",
          transition: `background 0.25s ease, transform 0.3s ${SPRING}`,
          transform: hovered ? "scale(1.1)" : "scale(1)",
        }}>
          <ArrowUpRight
            size={16}
            strokeWidth={2}
            color={hovered ? "#0f0f0f" : "#fff"}
            style={{ transition: "color 0.25s ease" }}
          />
        </div>
      </a>

      {/* Info below card */}
      <div style={{ paddingTop: 18 }}>
        {/* Title + trailing tag */}
        <div style={{
          display: "flex", alignItems: "center", gap: 8, marginBottom: 6, flexWrap: "wrap",
        }}>
          <h3 style={{
            fontFamily: "var(--font-poppins)", fontWeight: 600,
            fontSize: "clamp(14px, 1.1vw, 16px)", letterSpacing: "-0.3px",
            textTransform: "uppercase", color: "var(--fg)",
            lineHeight: 1.2, margin: 0,
          }}>
            {project.title}
          </h3>
          <span style={{
            fontFamily: "var(--font-inter)", fontWeight: 700,
            fontSize: 9, letterSpacing: "1.8px", textTransform: "uppercase",
            color: "#ede9fe",
            background: "rgba(109,40,217,0.55)",
            padding: "3px 7px",
            flexShrink: 0,
          }}>
            {project.tag}
          </span>
        </div>

        {/* Type + Year + Case Study */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12 }}>
          <p style={{
            fontFamily: "var(--font-inter)", fontWeight: 400,
            fontSize: 11, letterSpacing: "0.4px",
            textTransform: "uppercase", color: "var(--fg-secondary)",
            margin: 0,
          }}>
            {project.meta} &nbsp;·&nbsp; {project.year}
          </p>
          {"caseStudy" in project && project.caseStudy && (
            <Link
              href={project.caseStudy as string}
              onClick={(e) => e.stopPropagation()}
              style={{
                fontFamily: "var(--font-inter)", fontWeight: 700,
                fontSize: 10, letterSpacing: "1.5px",
                textTransform: "uppercase", color: "var(--accent-purple)",
                textDecoration: "none",
                borderBottom: "1px solid rgba(109,40,217,0.3)",
                paddingBottom: 1, flexShrink: 0,
                whiteSpace: "nowrap",
              }}
            >
              Case Study →
            </Link>
          )}
        </div>
      </div>
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
      <style>{`
        @keyframes shimmer {
          0%   { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
        @media (max-width: 640px) {
          .projects-card-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
        }
      `}</style>

      {/* Header */}
      <div style={{ marginBottom: 48 }}>
        <motion.p
          ref={ref}
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{
            fontFamily: "var(--font-inter)", fontWeight: 700,
            fontSize: 11, letterSpacing: "4px", textTransform: "uppercase",
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

      {/* 2×3 card grid */}
      <div
        className="projects-card-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "56px 40px",
        }}
      >
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} inView={inView} />
        ))}
      </div>
    </section>
  );
}
