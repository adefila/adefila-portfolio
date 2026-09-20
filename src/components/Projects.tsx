"use client";
import { ArrowUpRight } from "lucide-react";
import Image from "next/image";
import { useLang } from "@/context/LangContext";

const projects = [
  {
    title: "The Initial",
    desc: "AI-powered creative agency site. Figma designs translated to pixel-perfect Framer with custom interactions and CMS.",
    meta: "Figma to Framer · 2025",
    href: "https://the-initial.com/",
    screenshot: "/projects/the-initial.png",
  },
  {
    title: "BindHQ",
    desc: "Insurance management SaaS. Template customised to match their design system with complex navigation and data-dense layouts.",
    meta: "Template Customization · 2026",
    href: "https://www.bindhq.com/",
    screenshot: "/projects/bindhq.png",
  },
  {
    title: "VPA London",
    desc: "Talent agency portfolio built in Framer with editorial typography, smooth scroll, and a roster filtering system.",
    meta: "Framer Development · 2025",
    href: "https://www.vpalondon.co.uk/",
    screenshot: "/projects/vpa-london.png",
  },
  {
    title: "Upside ESG",
    desc: "ESG reporting platform with live data integrations, custom chart components, and a resource library built in Framer.",
    meta: "Framer Dev & Integrations · 2026",
    href: "https://upside-esg.com/",
    screenshot: "/projects/upside-esg.png",
  },
  {
    title: "Alyssa Corso",
    desc: "Personal portfolio for a healthcare SEO consultant. Clean, conversion-focused layout with case study pages.",
    meta: "Framer Development · 2026",
    href: "https://alyssacorso.com/",
    screenshot: "/projects/alyssa-corso.png",
  },
  {
    title: "Emalbu",
    desc: "Full HTML-to-Framer migration for a professional services firm — preserving brand identity while modernising the stack.",
    meta: "Website Migration · 2026",
    href: "https://emalbu.com/",
    screenshot: "/projects/emalbu.png",
  },
];

const SPRING = "cubic-bezier(0.22, 1, 0.36, 1)";

function ProjectCard({ project, index }: { project: (typeof projects)[0]; index: number }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", animation: `fadeUp 0.5s ${0.08 + index * 0.07}s ${SPRING} both` }}>
      {/* Screenshot floating on white canvas */}
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        style={{
          display: "block",
          background: "#fff",
          border: "1px solid rgba(0,0,0,0.06)",
          padding: "24px 24px 0",
          textDecoration: "none",
          cursor: "pointer",
          overflow: "hidden",
        }}
      >
        <div style={{
          position: "relative",
          width: "100%",
          aspectRatio: "1200/630",
          overflow: "hidden",
          boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
        }}>
          <Image
            src={project.screenshot}
            alt={project.title}
            fill
            sizes="(max-width: 640px) 100vw, 50vw"
            style={{ objectFit: "cover", objectPosition: "top" }}
            quality={80}
            priority={index < 2}
          />
        </div>
      </a>

      {/* Info below */}
      <div style={{ paddingTop: 20 }}>
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 8 }}>
          <h3 style={{
            fontFamily: "var(--font-poppins)", fontWeight: 700,
            fontSize: "clamp(15px, 1.2vw, 18px)", letterSpacing: "-0.4px",
            textTransform: "uppercase", color: "var(--fg)",
            lineHeight: 1.15, margin: 0,
          }}>
            {project.title}
          </h3>
          <a
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Visit ${project.title}`}
            style={{
              flexShrink: 0,
              width: 32, height: 32,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "transparent",
              border: "1px solid rgba(0,0,0,0.15)",
              color: "var(--fg)",
            }}
          >
            <ArrowUpRight size={14} strokeWidth={2} />
          </a>
        </div>

        <p style={{
          fontFamily: "var(--font-inter)", fontWeight: 400,
          fontSize: 13, lineHeight: 1.6, letterSpacing: "-0.1px",
          color: "var(--fg-secondary)", margin: "0 0 10px",
        }}>
          {project.desc}
        </p>

        <p style={{
          fontFamily: "var(--font-inter)", fontWeight: 500,
          fontSize: 10, letterSpacing: "1.2px",
          textTransform: "uppercase", color: "var(--fg-muted)", margin: 0,
        }}>
          {project.meta}
        </p>
      </div>
    </div>
  );
}

export default function Projects() {
  const { t } = useLang();

  return (
    <section
      id="work"
      style={{ width: "100%", maxWidth: 1200, margin: "0 auto", padding: "80px 20px" }}
    >
      <style>{`
        @media (max-width: 640px) {
          .projects-card-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
        }
      `}</style>

      <div style={{ marginBottom: 48 }}>
        <p style={{
          fontFamily: "var(--font-inter)", fontWeight: 700,
          fontSize: 11, letterSpacing: "4px", textTransform: "uppercase",
          color: "var(--accent-purple)", marginBottom: 16,
          animation: `fadeUp 0.5s 0.05s ${SPRING} both`,
        }}>
          {t("projects.eyebrow")}
        </p>
        <h2 style={{
          fontFamily: "var(--font-poppins)", fontWeight: 700,
          fontSize: "clamp(28px, 3.5vw, 48px)", letterSpacing: "-1px",
          lineHeight: 1, textTransform: "uppercase", color: "var(--fg)",
          animation: `fadeUp 0.5s 0.12s ${SPRING} both`,
        }}>
          {t("projects.h1")}
        </h2>
      </div>

      <div
        className="projects-card-grid"
        style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "64px 40px" }}
      >
        {projects.map((project, i) => (
          <ProjectCard key={project.title} project={project} index={i} />
        ))}
      </div>
    </section>
  );
}
