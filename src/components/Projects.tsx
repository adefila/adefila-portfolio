"use client";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { useLang } from "@/context/LangContext";

type Project = {
  title: string;
  desc: string;
  meta: string;
  tags: string[];
  href: string;
  screenshot?: string;
  video?: string;
  badge?: string;
};

const devProjects: Project[] = [
  {
    title: "The Initial",
    desc: "AI-powered creative agency site. Figma designs translated to pixel-perfect Framer with custom interactions and CMS.",
    meta: "Figma to Framer · 2025",
    tags: ["Creative Agency", "Framer"],
    href: "https://the-initial.com/",
    screenshot: "/projects/the-initial.png",
  },
  {
    title: "BindHQ",
    desc: "Insurance management SaaS. Template customised to match their design system with complex navigation and data-dense layouts.",
    meta: "Template Customization · 2026",
    tags: ["B2B SaaS", "InsurTech"],
    href: "https://www.bindhq.com/",
    screenshot: "/projects/bindhq.png",
  },
  {
    title: "VPA London",
    desc: "Talent agency portfolio built in Framer with editorial typography, smooth scroll, and a roster filtering system.",
    meta: "Framer Development · 2025",
    tags: ["Talent Agency", "Portfolio"],
    href: "https://www.vpalondon.co.uk/",
    screenshot: "/projects/vpa-london.png",
  },
  {
    title: "Upside ESG",
    desc: "ESG reporting platform with live data integrations, custom chart components, and a resource library built in Framer.",
    meta: "Framer Dev & Integrations · 2026",
    tags: ["B2B SaaS", "ESG Platform"],
    href: "https://upside-esg.com/",
    screenshot: "/projects/upside-esg.png",
  },
  {
    title: "Alyssa Corso",
    desc: "Personal portfolio for a healthcare SEO consultant. Clean, conversion-focused layout with case study pages.",
    meta: "Framer Development · 2026",
    tags: ["Personal Brand", "Consulting"],
    href: "https://alyssacorso.com/",
    screenshot: "/projects/alyssa-corso.png",
  },
  {
    title: "Emalbu",
    desc: "Full HTML-to-Framer migration for a professional services firm — preserving brand identity while modernising the stack.",
    meta: "Website Migration · 2026",
    tags: ["Professional Services", "Migration"],
    href: "https://emalbu.com/",
    screenshot: "/projects/emalbu.png",
  },
  {
    title: "Leadopo",
    desc: "Lead generation and pipeline management platform. Custom Framer build with dynamic CMS and conversion-optimised flows.",
    meta: "Framer Development · 2026",
    tags: ["B2B SaaS", "Lead Gen"],
    href: "https://www.leadopo.com/",
    screenshot: "/projects/leadopo.png",
  },
  {
    title: "Rusty Wears",
    desc: "Streetwear brand e-commerce experience. Bold visual identity translated into a high-converting Framer storefront.",
    meta: "Framer Development · 2026",
    tags: ["E-commerce", "Fashion"],
    href: "https://rustywears.framer.website/",
    screenshot: "/projects/rusty-wears.png",
  },
  {
    title: "The Prime Media",
    desc: "Digital media agency site built in Framer — bold editorial layout, motion-forward sections, and a content-first structure for a Canadian creative studio.",
    meta: "Framer Development · 2025",
    tags: ["Creative Agency", "Media"],
    href: "https://theprimemedia.ca/",
    screenshot: "/projects/the-prime-media.png",
  },
  {
    title: "Jamal Muse",
    desc: "Personal brand and portfolio for a creative professional. Designed in Claude and brought to life in Framer with smooth transitions and a refined typographic system.",
    meta: "Claude to Framer · 2025",
    tags: ["Personal Brand", "Portfolio"],
    href: "https://www.jamalmuse.com/",
    screenshot: "/projects/jamal.png",
  },
];

const designProjects: Project[] = [
  {
    title: "BookedEZ",
    desc: "Event booking platform connecting organizers, vendors, and attendees. Full dark-mode mobile app with profile management, membership tiers, and seamless booking flow.",
    meta: "UI/UX Design · 2024",
    tags: ["Marketplace", "Mobile App"],
    href: "#",
    screenshot: "/projects/design/bookedez.jpg",
    badge: "Live on Stores",
  },
  {
    title: "Student Material Directory",
    desc: "ReadHub — a document-sharing platform for students to discover, upload, and access academic resources filtered by subject, author, and tags.",
    meta: "App Interface Design · 2024",
    tags: ["EdTech", "Mobile App"],
    href: "#",
    screenshot: "/projects/design/readhub.jpg",
  },
  {
    title: "Crypto App",
    desc: "Fintech onboarding experience with a bold 3D brand identity, YC-backed credibility badge, and streamlined Google / Apple sign-in flows on a deep-purple canvas.",
    meta: "App Interface Design · 2024",
    tags: ["Fintech", "Mobile App"],
    href: "#",
    screenshot: "/projects/design/crypto-app.jpg",
  },
  {
    title: "Health Monitoring App",
    desc: "Well-being dashboard tracking sleep patterns, mood, and daily steps. Clean, data-forward interface with emoji-based mood logging and donut-chart KPIs.",
    meta: "App Interface Design · 2024",
    tags: ["HealthTech", "Mobile App"],
    href: "#",
    screenshot: "/projects/design/health-app.jpg",
  },
  {
    title: "Invoice Maker",
    desc: "Quick Invoice Maker — professional invoice, estimate, waybill, and letterhead generator for SMEs. Activity feed with paid/unpaid/overdue filters.",
    meta: "UI/UX Design · 2024",
    tags: ["B2B SaaS", "Mobile App"],
    href: "#",
    screenshot: "/projects/design/invoice-maker.jpg",
    badge: "Live on Stores",
  },
  {
    title: "Neetly",
    desc: "AI Assistant chat interface with a minimal layout designed for natural conversation flows, voice input, and rich message attachments.",
    meta: "UI/UX Design · Under Development",
    tags: ["AI Product", "Mobile App"],
    href: "#",
    screenshot: "/projects/design/neetly.jpg",
    badge: "In Development",
  },
  {
    title: "Daily News App",
    desc: "News aggregation app with topic-filtered horizontal feeds, trending story cards, and a focused distraction-free article reading view.",
    meta: "App Interface Exploration · 2024",
    tags: ["Media", "Mobile App"],
    href: "#",
    screenshot: "/projects/design/news-app.jpg",
  },
  {
    title: "Community Chat Interface",
    desc: "Multi-user messaging interface with online-status indicators, unread badges, and a friendly empty-state to guide first-time users.",
    meta: "Chat Interface Exploration · 2024",
    tags: ["Social", "Mobile App"],
    href: "#",
    screenshot: "/projects/design/chat-app.jpg",
  },
];

const SPRING = "cubic-bezier(0.22, 1, 0.36, 1)";

type Tab = "dev" | "design";

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const [hovered, setHovered] = useState(false);
  const hasLink = project.href && project.href !== "#";

  const cardStyle: React.CSSProperties = {
    display: "block",
    background: "#fff",
    border: "1px solid rgba(0,0,0,0.06)",
    padding: "24px 24px 0",
    textDecoration: "none",
    cursor: hasLink ? "pointer" : "default",
    overflow: "hidden",
  };

  const imageInner = (
    <div
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        position: "relative", width: "100%",
        aspectRatio: "1200/630", overflow: "hidden",
        boxShadow: "0 8px 32px rgba(0,0,0,0.08)",
        transform: hovered ? "translateY(-6px) scale(1.01)" : "translateY(0) scale(1)",
        transition: `transform 0.4s ${SPRING}`,
      }}
    >
      {project.screenshot && (
        <Image
          src={project.screenshot}
          alt={project.title}
          fill
          sizes="(max-width: 640px) 100vw, 50vw"
          style={{ objectFit: "cover", objectPosition: "top" }}
          quality={80}
          priority={index < 2}
        />
      )}
    </div>
  );

  return (
    <div style={{ display: "flex", flexDirection: "column", animation: `fadeUp 0.45s ${0.05 + index * 0.06}s ${SPRING} both` }}>
      {hasLink ? (
        <a href={project.href} target="_blank" rel="noopener noreferrer" style={cardStyle}>
          {imageInner}
        </a>
      ) : (
        <div style={cardStyle}>
          {imageInner}
        </div>
      )}

      <div style={{ paddingTop: 20 }}>
        {/* Title + inline tags row */}
        <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 12, marginBottom: 12 }}>
          <div style={{ display: "flex", flexWrap: "wrap", alignItems: "center", gap: 8, flex: 1, minWidth: 0 }}>
            <h3 style={{
              fontFamily: "var(--font-poppins)", fontWeight: 700,
              fontSize: "clamp(15px, 1.2vw, 18px)", letterSpacing: "-0.4px",
              textTransform: "uppercase", color: "var(--fg)",
              lineHeight: 1.15, margin: 0, flexShrink: 0,
            }}>
              {project.title}
            </h3>
            {project.tags.map((tag) => (
              <span key={tag} style={{
                fontFamily: "var(--font-inter)", fontWeight: 500, fontSize: 10,
                letterSpacing: "0.8px", textTransform: "uppercase",
                color: "var(--fg-secondary)",
                background: "rgba(0,0,0,0.04)",
                border: "1px solid rgba(0,0,0,0.08)",
                padding: "3px 9px",
                whiteSpace: "nowrap",
              }}>
                {tag}
              </span>
            ))}
            {project.badge && (
              <span style={{
                fontFamily: "var(--font-inter)", fontWeight: 600, fontSize: 10,
                letterSpacing: "0.8px", textTransform: "uppercase",
                color: project.badge === "In Development" ? "#d97706" : "#16a34a",
                background: project.badge === "In Development" ? "rgba(217,119,6,0.08)" : "rgba(22,163,74,0.08)",
                border: `1px solid ${project.badge === "In Development" ? "rgba(217,119,6,0.25)" : "rgba(22,163,74,0.25)"}`,
                padding: "3px 9px",
                whiteSpace: "nowrap",
              }}>
                {project.badge}
              </span>
            )}
          </div>
          {hasLink && (
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
          )}
        </div>

        <p style={{
          fontFamily: "var(--font-inter)", fontWeight: 400,
          fontSize: 13, lineHeight: 1.6, letterSpacing: "-0.1px",
          color: "var(--fg-secondary)", margin: 0,
        }}>
          {project.desc}
        </p>

        <p style={{
          fontFamily: "var(--font-inter)", fontWeight: 500,
          fontSize: 11, letterSpacing: "0.06em", textTransform: "uppercase",
          color: "var(--fg-muted)", margin: "10px 0 0",
        }}>
          {project.meta}
        </p>
      </div>
    </div>
  );
}

function TabBar({ active, onChange }: { active: Tab; onChange: (t: Tab) => void }) {
  const tabs: { key: Tab; label: string; count: number; }[] = [
    { key: "dev",    label: "Website Development", count: devProjects.length },
    { key: "design", label: "Product Design",       count: designProjects.length },
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
