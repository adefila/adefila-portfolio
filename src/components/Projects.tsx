"use client";
import { ArrowUpRight } from "lucide-react";
import { useState } from "react";
import Image from "next/image";
import { useLang } from "@/context/LangContext";

type Project = {
  title: string;
  alt: string;
  desc: string;
  // Shown at the end of the tag row. Empty when the project is still in progress.
  year: string;
  tags: string[];
  href: string;
  screenshot?: string;
  video?: string;
  badge?: string;
};

const devProjects: Project[] = [
  {
    title: "Calder Health",
    alt: "Calder Health telehealth website — personalised online care with licensed providers, built in Next.js",
    desc: "Telehealth website for personalised online care. Built in Next.js with a custom design system, calm healthcare visuals, and a content editor so the team can update pages without code.",
    year: "2026",
    tags: ["HealthTech", "Next.js Build"],
    href: "https://calder-health.vercel.app/",
    screenshot: "/projects/calder-health.webp",
  },
  {
    title: "The Initial",
    alt: "The Initial creative agency website — AI-powered Framer build with custom interactions",
    desc: "AI-powered creative agency site. Figma designs translated to pixel-perfect Framer with custom interactions and CMS.",
    year: "2025",
    tags: ["Creative Agency", "Figma to Framer"],
    href: "https://the-initial.com/",
    screenshot: "/projects/the-initial.png",
  },
  {
    title: "BindHQ",
    alt: "BindHQ insurance management SaaS website — template customisation for complex data layouts",
    desc: "Insurance management SaaS. Template customised to match their design system with complex navigation and data-dense layouts.",
    year: "2026",
    tags: ["InsurTech", "Template Customization"],
    href: "https://www.bindhq.com/",
    screenshot: "/projects/bindhq.png",
  },
  {
    title: "VPA London",
    alt: "VPA London talent agency portfolio — editorial typography and roster filtering in Framer",
    desc: "Talent agency portfolio built in Framer with editorial typography, smooth scroll, and a roster filtering system.",
    year: "2025",
    tags: ["Talent Agency", "Framer Build"],
    href: "https://www.vpalondon.co.uk/",
    screenshot: "/projects/vpa-london.png",
  },
  {
    title: "Upside ESG",
    alt: "Upside ESG reporting platform — live data integrations and custom charts built in Framer",
    desc: "ESG reporting platform with live data integrations, custom chart components, and a resource library built in Framer.",
    year: "2026",
    tags: ["ESG SaaS", "Framer + Integrations"],
    href: "https://upside-esg.com/",
    screenshot: "/projects/upside-esg.png",
  },
  {
    title: "Alyssa Corso",
    alt: "Alyssa Corso personal portfolio — healthcare SEO consultant website built in Framer",
    desc: "Personal portfolio for a healthcare SEO consultant. Clean, conversion-focused layout with case study pages.",
    year: "2026",
    tags: ["Personal Brand", "Framer Build"],
    href: "https://alyssacorso.com/",
    screenshot: "/projects/alyssa-corso.png",
  },
  {
    title: "Emalbu",
    alt: "Emalbu professional services website — HTML to Framer migration preserving brand identity",
    desc: "Full HTML-to-Framer migration for a professional services firm — preserving brand identity while modernising the stack.",
    year: "2026",
    tags: ["Professional Services", "HTML to Framer"],
    href: "https://emalbu.com/",
    screenshot: "/projects/emalbu.png",
  },
  {
    title: "Leadopo",
    alt: "Leadopo lead generation platform — custom Framer build with dynamic CMS and pipeline flows",
    desc: "Lead generation and pipeline management platform. Custom Framer build with dynamic CMS and conversion-optimised flows.",
    year: "2026",
    tags: ["Lead Gen SaaS", "Framer Build"],
    href: "https://www.leadopo.com/",
    screenshot: "/projects/leadopo.png",
  },
  {
    title: "Rusty Wears",
    alt: "Rusty Wears streetwear e-commerce storefront — bold visual identity built in Framer",
    desc: "Streetwear brand e-commerce experience. Bold visual identity translated into a high-converting Framer storefront.",
    year: "2026",
    tags: ["E-commerce", "Framer Build"],
    href: "https://rustywears.framer.website/",
    screenshot: "/projects/rusty-wears.png",
  },
  {
    title: "The Prime Media",
    alt: "The Prime Media digital agency site — motion-forward editorial Framer build for Canadian studio",
    desc: "Digital media agency site built in Framer — bold editorial layout, motion-forward sections, and a content-first structure for a Canadian creative studio.",
    year: "2025",
    tags: ["Media Agency", "Framer Build"],
    href: "https://theprimemedia.ca/",
    screenshot: "/projects/the-prime-media.png",
  },
  {
    title: "Jamal Muse",
    alt: "Jamal Muse personal brand portfolio — Claude designed, built in Framer with refined typography",
    desc: "Personal brand and portfolio for a creative professional. Designed in Claude and brought to life in Framer with smooth transitions and a refined typographic system.",
    year: "2025",
    tags: ["Personal Brand", "Claude to Framer"],
    href: "https://www.jamalmuse.com/",
    screenshot: "/projects/jamal.png",
  },
];

const designProjects: Project[] = [
  {
    title: "BookedEZ",
    alt: "BookedEZ event booking mobile app UI — dark-mode design with profile management and booking flow",
    desc: "Event booking platform connecting organizers, vendors, and attendees. Full dark-mode mobile app with profile management, membership tiers, and seamless booking flow.",
    year: "2024",
    tags: ["Events Marketplace", "UI/UX Design"],
    href: "#",
    screenshot: "/projects/design/bookedez.jpg",
    badge: "Live on Stores",
  },
  {
    title: "Student Material Directory",
    alt: "ReadHub student material directory app — document sharing platform with subject and tag filtering",
    desc: "ReadHub — a document-sharing platform for students to discover, upload, and access academic resources filtered by subject, author, and tags.",
    year: "2024",
    tags: ["EdTech", "App Design"],
    href: "#",
    screenshot: "/projects/design/readhub.jpg",
  },
  {
    title: "Crypto App",
    alt: "Crypto fintech onboarding app UI — bold 3D brand identity with Google and Apple sign-in flows",
    desc: "Fintech onboarding experience with a bold 3D brand identity, YC-backed credibility badge, and streamlined Google / Apple sign-in flows on a deep-purple canvas.",
    year: "2024",
    tags: ["Fintech", "App Design"],
    href: "#",
    screenshot: "/projects/design/crypto-app.jpg",
  },
  {
    title: "Health Monitoring App",
    alt: "Health monitoring app UI — well-being dashboard with sleep tracking, mood logging and step counter",
    desc: "Well-being dashboard tracking sleep patterns, mood, and daily steps. Clean, data-forward interface with emoji-based mood logging and donut-chart KPIs.",
    year: "2024",
    tags: ["HealthTech", "App Design"],
    href: "#",
    screenshot: "/projects/design/health-app.jpg",
  },
  {
    title: "Invoice Maker",
    alt: "Quick Invoice Maker app UI — invoice and estimate generator for SMEs with payment status filters",
    desc: "Quick Invoice Maker — professional invoice, estimate, waybill, and letterhead generator for SMEs. Activity feed with paid/unpaid/overdue filters.",
    year: "2024",
    tags: ["B2B SaaS", "UI/UX Design"],
    href: "#",
    screenshot: "/projects/design/invoice-maker.jpg",
    badge: "Live on Stores",
  },
  {
    title: "Neetly",
    alt: "Neetly AI assistant chat interface — minimal conversation UI with voice input and rich attachments",
    desc: "AI Assistant chat interface with a minimal layout designed for natural conversation flows, voice input, and rich message attachments.",
    year: "",
    tags: ["AI Product", "UI/UX Design"],
    href: "#",
    screenshot: "/projects/design/neetly.jpg",
    badge: "In Development",
  },
  {
    title: "Daily News App",
    alt: "Daily news aggregation app UI — topic-filtered feeds with trending stories and distraction-free reading",
    desc: "News aggregation app with topic-filtered horizontal feeds, trending story cards, and a focused distraction-free article reading view.",
    year: "2024",
    tags: ["Media", "Concept Design"],
    href: "#",
    screenshot: "/projects/design/news-app.jpg",
  },
  {
    title: "Community Chat Interface",
    alt: "Community chat interface UI — multi-user messaging with online status indicators and unread badges",
    desc: "Multi-user messaging interface with online-status indicators, unread badges, and a friendly empty-state to guide first-time users.",
    year: "2024",
    tags: ["Social", "Concept Design"],
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
        transform: hovered ? "translateY(-6px)" : "translateY(0)",
        transition: `transform 0.4s ${SPRING}`,
      }}
    >
      {project.screenshot && (
        <Image
          src={project.screenshot}
          alt={project.alt}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 600px"
          style={{
            objectFit: "cover",
            objectPosition: "top center",
            filter: hovered
              ? "contrast(1.05) saturate(1.1) brightness(1.02)"
              : "contrast(1.03) saturate(1.06)",
            transition: `filter 0.4s cubic-bezier(0.22, 1, 0.36, 1)`,
          }}
          quality={90}
          priority={index < 4}
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
            {project.year && (
              <span style={{
                fontFamily: "var(--font-inter)", fontWeight: 500, fontSize: 11,
                letterSpacing: "0.06em", color: "var(--fg-muted)", whiteSpace: "nowrap",
              }}>
                {project.year}
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
