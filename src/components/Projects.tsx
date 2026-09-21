"use client";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { useLang } from "@/context/LangContext";

const devProjects = [
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
  {
    title: "Leadopo",
    desc: "Lead generation and pipeline management platform. Custom Framer build with dynamic CMS and conversion-optimised flows.",
    meta: "Framer Development · 2026",
    href: "https://www.leadopo.com/",
    screenshot: "/projects/leadopo.png",
  },
  {
    title: "Rusty Wears",
    desc: "Streetwear brand e-commerce experience. Bold visual identity translated into a high-converting Framer storefront.",
    meta: "Framer Development · 2026",
    href: "https://rustywears.framer.website/",
    screenshot: "/projects/rusty-wears.png",
  },
];

const designProjects: typeof devProjects = [];

const SPRING = "cubic-bezier(0.22, 1, 0.36, 1)";

type Tab = "dev" | "design";

function ProjectCard({ project, index }: { project: (typeof devProjects)[0]; index: number }) {
  const [hovered, setHovered] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", animation: `fadeUp 0.45s ${0.05 + index * 0.06}s ${SPRING} both` }}>
      <a
        href={project.href}
        target="_blank"
        rel="noopener noreferrer"
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        style={{
          display: "block",
          background: "#fff",
          border: "1px solid rgba(0,0,0,0.06)",
          padding: "24px 24px 0",
          textDecoration: "none",
          cursor: "pointer",
          overflow: "hidden",
          transform: hovered ? "translateY(-6px)" : "translateY(0)",
          boxShadow: hovered ? "0 16px 48px rgba(0,0,0,0.10)" : "0 2px 8px rgba(0,0,0,0.04)",
          transition: `transform 0.35s ${SPRING}, box-shadow 0.35s ${SPRING}`,
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
              flexShrink: 0, width: 32, height: 32,
              display: "flex", alignItems: "center", justifyContent: "center",
              background: "transparent", border: "1px solid rgba(0,0,0,0.15)",
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

function TabBar({ active, onChange }: { active: Tab; onChange: (t: Tab) => void }) {
  const tabs: { key: Tab; label: string; count: number }[] = [
    { key: "dev",    label: "Website Development", count: devProjects.length },
    { key: "design", label: "Product Design", count: designProjects.length },
  ];
  return (
    <div style={{ display: "flex", gap: 0, borderBottom: "1px solid rgba(0,0,0,0.1)" }}>
      {tabs.map((tab) => {
        const isActive = active === tab.key;
        return (
          <button
            key={tab.key}
            onClick={() => onChange(tab.key)}
            style={{
              background: "none", border: "none", cursor: "pointer",
              padding: "12px 0", marginRight: 32,
              display: "flex", alignItems: "center", gap: 8,
              position: "relative",
              borderBottom: isActive ? "2px solid var(--fg)" : "2px solid transparent",
              marginBottom: -1,
              transition: "border-color 0.2s ease",
            }}
          >
            <span style={{
              fontFamily: "var(--font-inter)", fontWeight: 700,
              fontSize: 11, letterSpacing: "2px", textTransform: "uppercase",
              color: isActive ? "var(--fg)" : "var(--fg-muted)",
              transition: "color 0.2s ease",
            }}>
              {tab.label}
            </span>
            <span style={{
              fontFamily: "var(--font-inter)", fontWeight: 600, fontSize: 10,
              color: isActive ? "var(--accent-purple)" : "var(--fg-muted)",
              background: isActive ? "rgba(109,40,217,0.08)" : "rgba(0,0,0,0.05)",
              border: isActive ? "1px solid rgba(109,40,217,0.2)" : "1px solid transparent",
              padding: "2px 7px",
              transition: "all 0.2s ease",
            }}>
              {tab.count}
            </span>
          </button>
        );
      })}
    </div>
  );
}

export default function Projects() {
  const { t } = useLang();
  const [activeTab, setActiveTab] = useState<Tab>("dev");

  const list = activeTab === "dev" ? devProjects : designProjects;

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

      <div style={{
        display: "flex", alignItems: "flex-end",
        justifyContent: "space-between", gap: 24,
        flexWrap: "wrap", marginBottom: 48,
      }}>
        <div>
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
        <TabBar active={activeTab} onChange={setActiveTab} />
      </div>

      {list.length === 0 ? (
        <div style={{
          padding: "80px 0", textAlign: "center",
          animation: `fadeUp 0.4s ${SPRING} both`,
        }}>
          <p style={{
            fontFamily: "var(--font-inter)", fontWeight: 700, fontSize: 11,
            letterSpacing: "3px", textTransform: "uppercase",
            color: "var(--accent-purple)", marginBottom: 16,
          }}>
            COMING SOON
          </p>
          <p style={{
            fontFamily: "var(--font-inter)", fontSize: 15, color: "var(--fg-secondary)",
            lineHeight: 1.65, maxWidth: 400, margin: "0 auto",
          }}>
            Product design case studies are being prepared. Check back soon.
          </p>
        </div>
      ) : (
        <div
          key={activeTab}
          className="projects-card-grid"
          style={{ display: "grid", gridTemplateColumns: "repeat(2, 1fr)", gap: "64px 40px" }}
        >
          {list.map((project, i) => (
            <ProjectCard key={project.title} project={project} index={i} />
          ))}
        </div>
      )}
    </section>
  );
}
