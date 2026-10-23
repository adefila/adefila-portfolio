"use client";
import { useEffect, useRef, useState, useSyncExternalStore } from "react";
import { createPortal } from "react-dom";
import Image from "next/image";
import { useLang } from "@/context/LangContext";
import RevealWords from "./RevealWords";
import SpecLabel from "./SpecLabel";

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
  // Soft tint from the project's own brand colours, shown behind the screenshot
  bg?: string;
};

const devProjects: Project[] = [
  {
    title: "Calder Health",
    bg: "#dde7da",
    alt: "Calder Health telehealth website — personalised online care with licensed providers, built in Next.js",
    desc: "Telehealth website for personalised online care. Built in Next.js with a custom design system, calm healthcare visuals, and a content editor so the team can update pages without code.",
    year: "2026",
    tags: ["HealthTech", "Next.js Build"],
    href: "https://calder-health.vercel.app/",
    screenshot: "/projects/calder-health.webp",
  },
  {
    title: "The Initial",
    bg: "#d3e6e8",
    alt: "The Initial creative agency website — AI-powered Framer build with custom interactions",
    desc: "AI-powered creative agency site. Figma designs translated to pixel-perfect Framer with custom interactions and CMS.",
    year: "2025",
    tags: ["Creative Agency", "Figma to Framer"],
    href: "https://the-initial.com/",
    screenshot: "/projects/the-initial.png",
  },
  {
    title: "BindHQ",
    bg: "#eadfd6",
    alt: "BindHQ insurance management SaaS website — template customisation for complex data layouts",
    desc: "Insurance management SaaS. Template customised to match their design system with complex navigation and data-dense layouts.",
    year: "2026",
    tags: ["InsurTech", "Template Customization"],
    href: "https://www.bindhq.com/",
    screenshot: "/projects/bindhq.png",
  },
  {
    title: "VPA London",
    bg: "#f0d9d4",
    alt: "VPA London talent agency portfolio — editorial typography and roster filtering in Framer",
    desc: "Talent agency portfolio built in Framer with editorial typography, smooth scroll, and a roster filtering system.",
    year: "2025",
    tags: ["Talent Agency", "Framer Build"],
    href: "https://www.vpalondon.co.uk/",
    screenshot: "/projects/vpa-london.png",
  },
  {
    title: "Upside ESG",
    bg: "#e1e3f0",
    alt: "Upside ESG reporting platform — live data integrations and custom charts built in Framer",
    desc: "ESG reporting platform with live data integrations, custom chart components, and a resource library built in Framer.",
    year: "2026",
    tags: ["ESG SaaS", "Framer + Integrations"],
    href: "https://upside-esg.com/",
    screenshot: "/projects/upside-esg.png",
  },
  {
    title: "Alyssa Corso",
    bg: "#efe5e1",
    alt: "Alyssa Corso personal portfolio — healthcare SEO consultant website built in Framer",
    desc: "Personal portfolio for a healthcare SEO consultant. Clean, conversion-focused layout with case study pages.",
    year: "2026",
    tags: ["Personal Brand", "Framer Build"],
    href: "https://alyssacorso.com/",
    screenshot: "/projects/alyssa-corso.png",
  },
  {
    title: "Emalbu",
    bg: "#e2e2e2",
    alt: "Emalbu professional services website — HTML to Framer migration preserving brand identity",
    desc: "Full HTML-to-Framer migration for a professional services firm — preserving brand identity while modernising the stack.",
    year: "2026",
    tags: ["Professional Services", "HTML to Framer"],
    href: "https://emalbu.com/",
    screenshot: "/projects/emalbu.png",
  },
  {
    title: "Leadopo",
    bg: "#d6e0fb",
    alt: "Leadopo lead generation platform — custom Framer build with dynamic CMS and pipeline flows",
    desc: "Lead generation and pipeline management platform. Custom Framer build with dynamic CMS and conversion-optimised flows.",
    year: "2026",
    tags: ["Lead Gen SaaS", "Framer Build"],
    href: "https://www.leadopo.com/",
    screenshot: "/projects/leadopo.png",
  },
  {
    title: "Rusty Wears",
    bg: "#f0e2d9",
    alt: "Rusty Wears streetwear e-commerce storefront — bold visual identity built in Framer",
    desc: "Streetwear brand e-commerce experience. Bold visual identity translated into a high-converting Framer storefront.",
    year: "2026",
    tags: ["E-commerce", "Framer Build"],
    href: "https://rustywears.framer.website/",
    screenshot: "/projects/rusty-wears.png",
  },
  {
    title: "The Prime Media",
    bg: "#dbe5f5",
    alt: "The Prime Media digital agency site — motion-forward editorial Framer build for Canadian studio",
    desc: "Digital media agency site built in Framer — bold editorial layout, motion-forward sections, and a content-first structure for a Canadian creative studio.",
    year: "2025",
    tags: ["Media Agency", "Framer Build"],
    href: "https://theprimemedia.ca/",
    screenshot: "/projects/the-prime-media.png",
  },
  {
    title: "Jamal Muse",
    bg: "#d6ebe3",
    alt: "Jamal Muse personal brand portfolio — Claude designed, built in Framer with refined typography",
    desc: "Personal brand and portfolio for a creative professional. Designed in Claude and brought to life in Framer with smooth transitions and a refined typographic system.",
    year: "2025",
    tags: ["Personal Brand", "Claude to Framer"],
    href: "https://www.jamalmuse.com/",
    screenshot: "/projects/jamal.png",
  },
  {
    title: "Talon Tyres",
    bg: "#dcdbe6",
    alt: "Talon Tyres performance tyre brand website — 3D car hero and product configurator built in Next.js",
    desc: "Performance tyre brand site built in Next.js. A 3D car hero made with Three.js, a set builder that helps drivers pick the right tyres, and a bold motorsport look.",
    year: "2026",
    tags: ["Automotive", "Next.js + 3D"],
    href: "https://talon-tyres.vercel.app/",
    screenshot: "/projects/talon-tyres.webp",
  },
  {
    title: "BookedEZ",
    bg: "#e4e3ea",
    alt: "BookedEZ event booking mobile app UI — dark-mode design with profile management and booking flow",
    desc: "Event booking platform connecting organizers, vendors, and attendees. Full dark-mode mobile app with profile management, membership tiers, and seamless booking flow.",
    year: "2024",
    tags: ["Events Marketplace", "UI/UX Design"],
    href: "#",
    screenshot: "/projects/design/bookedez.jpg",
    badge: "Live on Stores",
  },
  {
    title: "Datum Build",
    bg: "#e3e7ee",
    alt: "Datum Build contractor website concept: bold construction visuals, current projects and a clear Start a project button",
    desc: "A bold site for a building contractor: current projects up front, the fixed price and weekly report explained, and a clear Start a project button.",
    year: "2026",
    tags: ["Construction", "Concept"],
    href: "https://datum-build.vercel.app/",
    screenshot: "/local/concept-datum.webp",
  },
];

// Kept for later; not shown for now.
export const designProjects: Project[] = [
  {
    title: "Student Material Directory",
    bg: "#ececec",
    alt: "ReadHub student material directory app — document sharing platform with subject and tag filtering",
    desc: "ReadHub — a document-sharing platform for students to discover, upload, and access academic resources filtered by subject, author, and tags.",
    year: "2024",
    tags: ["EdTech", "App Design"],
    href: "#",
    screenshot: "/projects/design/readhub.jpg",
  },
  {
    title: "Crypto App",
    bg: "#e3dff0",
    alt: "Crypto fintech onboarding app UI — bold 3D brand identity with Google and Apple sign-in flows",
    desc: "Fintech onboarding experience with a bold 3D brand identity, YC-backed credibility badge, and streamlined Google / Apple sign-in flows on a deep-purple canvas.",
    year: "2024",
    tags: ["Fintech", "App Design"],
    href: "#",
    screenshot: "/projects/design/crypto-app.jpg",
  },
  {
    title: "Health Monitoring App",
    bg: "#e5eaf0",
    alt: "Health monitoring app UI — well-being dashboard with sleep tracking, mood logging and step counter",
    desc: "Well-being dashboard tracking sleep patterns, mood, and daily steps. Clean, data-forward interface with emoji-based mood logging and donut-chart KPIs.",
    year: "2024",
    tags: ["HealthTech", "App Design"],
    href: "#",
    screenshot: "/projects/design/health-app.jpg",
  },
  {
    title: "Invoice Maker",
    bg: "#e8e3ef",
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
    bg: "#e8e2f6",
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
    bg: "#dde6e6",
    alt: "Daily news aggregation app UI — topic-filtered feeds with trending stories and distraction-free reading",
    desc: "News aggregation app with topic-filtered horizontal feeds, trending story cards, and a focused distraction-free article reading view.",
    year: "2024",
    tags: ["Media", "Concept Design"],
    href: "#",
    screenshot: "/projects/design/news-app.jpg",
  },
  {
    title: "Community Chat Interface",
    bg: "#ebe7f0",
    alt: "Community chat interface UI — multi-user messaging with online status indicators and unread badges",
    desc: "Multi-user messaging interface with online-status indicators, unread badges, and a friendly empty-state to guide first-time users.",
    year: "2024",
    tags: ["Social", "Concept Design"],
    href: "#",
    screenshot: "/projects/design/chat-app.jpg",
  },
];


// The work as a large typographic index. Hover a row: the others dim and a screenshot follows the cursor.
// What leads: the sites built in code, then client work with results; the rest is one click away.
const LEAD_WITH = ["Talon Tyres", "Calder Health", "Datum Build", "Upside ESG", "The Initial", "BindHQ", "VPA London", "Leadopo", "BookedEZ", "The Prime Media"];
const INDEX_SHOWN = 6;
const byLead = (a: Project, b: Project) => {
  const ia = LEAD_WITH.indexOf(a.title), ib = LEAD_WITH.indexOf(b.title);
  return (ia < 0 ? 99 : ia) - (ib < 0 ? 99 : ib);
};
const FLOAT_W = 340;
const FLOAT_H = 178;

const WL_CSS = `
  .wl-list { list-style: none; margin: 0; padding: 0; border-top: 1px solid rgba(var(--ink), 0.14); }
  .wl-row { display: grid; grid-template-columns: 48px 1fr auto 56px 28px; align-items: baseline; column-gap: 16px; padding: clamp(12px, 1.3vw, 17px) 0; border-bottom: 1px solid rgba(var(--ink), 0.14); color: var(--fg); text-decoration: none; transition: opacity 0.25s ease; cursor: default; outline: none; }
  a.wl-row { cursor: pointer; }
  .wl-list:hover .wl-row { opacity: 0.28; }
  .wl-list:hover .wl-row:hover, .wl-list .wl-row:focus-visible { opacity: 1; }
  .wl-n { font-family: var(--font-mono); font-size: 12px; color: var(--fg-muted); }
  .wl-t { font-family: var(--font-poppins); font-weight: 600; font-size: clamp(18px, 2.6vw, 34px); letter-spacing: -0.03em; line-height: 1; text-transform: uppercase; transition: transform 0.35s cubic-bezier(0.22, 1, 0.36, 1), color 0.2s ease; }
  .wl-row:hover .wl-t, .wl-row:focus-visible .wl-t { transform: translateX(14px); color: var(--accent-purple); }
  .wl-k { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--fg-secondary); display: flex; gap: 10px; align-items: baseline; white-space: nowrap; }
  .wl-k i { font-style: normal; font-family: var(--font-mono); text-transform: none; letter-spacing: 0; color: var(--accent-purple); }
  .wl-y { font-family: var(--font-mono); font-size: 12px; color: var(--fg-muted); text-align: right; }
  .wl-a { font-size: 18px; line-height: 1; color: var(--fg-muted); transition: transform 0.3s ease, color 0.2s ease; }
  .wl-row:hover .wl-a, .wl-row:focus-visible .wl-a { transform: translate(3px, -3px); color: var(--accent-purple); }
  .wl-more { margin-top: 24px; background: transparent; border: 0; padding: 4px 0; cursor: pointer; font-family: var(--font-inter); font-weight: 600; font-size: 12px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--accent-purple); border-bottom: 1px solid currentColor; }
  .wl-float { position: fixed; left: 0; top: 0; z-index: 60; width: ${FLOAT_W}px; height: ${FLOAT_H}px; pointer-events: none; will-change: transform; }
  .wl-float-in { position: absolute; inset: 0; overflow: hidden; background: #111; box-shadow: 0 24px 60px rgba(0, 0, 0, 0.35), 0 4px 14px rgba(0, 0, 0, 0.2); opacity: 0; transform: scale(0.9); transition: opacity 0.2s ease, transform 0.3s cubic-bezier(0.22, 1, 0.36, 1); }
  .wl-float.is-on .wl-float-in { opacity: 1; transform: scale(1); }
  .wl-float-in img { opacity: 0; transition: opacity 0.2s ease; }
  .wl-float-in img.is-on { opacity: 1; }
  .wl-inline { display: none; }
  @media (hover: none) {
    .wl-float { display: none; }
    .wl-list:hover .wl-row { opacity: 1; }
    .wl-inline { display: block; grid-column: 2 / -1; margin-top: 12px; position: relative; aspect-ratio: 16 / 8.4; overflow: hidden; background: #111; }
  }
  @media (max-width: 760px) {
    .wl-row { grid-template-columns: 30px 1fr 22px; column-gap: 12px; }
    .wl-k, .wl-y { display: none; }
  }
  @media (prefers-reduced-motion: reduce) { .wl-t, .wl-a, .wl-float-in { transition: none; } }
`;

// One row of the index: a project or concept, with the hover preview. Used by the home page's work section and by
// the business page's concept sites, so both look and behave the same.
export type IndexProject = Pick<Project, "title" | "alt" | "year" | "tags" | "href" | "screenshot"> & { track?: string };

export function ProjectIndex({ projects, shownCount = INDEX_SHOWN }: { projects: IndexProject[]; shownCount?: number }) {
  const { t } = useLang();
  const tr = (key: string, fallback: string) => { const v = t(key); return v === key ? fallback : v; };
  const [showAll, setShowAll] = useState(false);
  const [hover, setHover] = useState<number | null>(null);
  const [open, setOpen] = useState<number | null>(null); // touch: the row whose preview is open
  // Screenshots load the first time a row is looked at, not all at once.
  const [seen, setSeen] = useState<Set<string>>(new Set());
  const floatRef = useRef<HTMLDivElement>(null);
  // null while rendering on the server and during hydration, then the page body
  const host = useSyncExternalStore(() => () => {}, () => document.body, () => null);
  const pos = useRef({ x: 0, y: 0, tx: 0, ty: 0, init: false });

  const list = projects;
  const shown = showAll ? list : list.slice(0, shownCount);
  const hovering = hover !== null;

  // The preview eases toward the cursor and leans a little with its speed.
  useEffect(() => {
    if (!hovering) return;
    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let id = 0;
    const frame = () => {
      const p = pos.current;
      p.x += (p.tx - p.x) * (calm ? 1 : 0.18);
      p.y += (p.ty - p.y) * (calm ? 1 : 0.18);
      const lean = calm ? 0 : Math.max(-8, Math.min(8, (p.tx - p.x) * 0.06));
      if (floatRef.current) floatRef.current.style.transform = `translate3d(${p.x.toFixed(1)}px, ${p.y.toFixed(1)}px, 0) rotate(${lean.toFixed(2)}deg)`;
      id = requestAnimationFrame(frame);
    };
    id = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(id);
  }, [hovering]);

  const aim = (clientX: number, clientY: number) => {
    const p = pos.current;
    p.tx = Math.max(16, Math.min(window.innerWidth - FLOAT_W - 16, clientX + 28));
    p.ty = Math.max(80, Math.min(window.innerHeight - FLOAT_H - 16, clientY - FLOAT_H / 2));
    if (!p.init) { p.x = p.tx; p.y = p.ty; p.init = true; }
  };
  const enter = (i: number, title: string) => {
    setHover(i);
    setSeen((prev) => (prev.has(title) ? prev : new Set(prev).add(title)));
  };
  const leave = () => { setHover(null); pos.current.init = false; };

  return (
    <>
      <style>{WL_CSS}</style>
      <ol className="wl-list" data-reveal onMouseMove={(e) => aim(e.clientX, e.clientY)} onMouseLeave={leave}>
        {shown.map((proj, i) => {
          const hasLink = proj.href && proj.href !== "#";
          const inner = (
            <>
              <span className="wl-n">{String(i + 1).padStart(2, "0")}</span>
              <span className="wl-t">{proj.title}</span>
              <span className="wl-k">
                {tr(`projtag.${proj.tags[0]}`, proj.tags[0])}
                {proj.tags[1] && <i>{`</> ${tr(`projtag.${proj.tags[1]}`, proj.tags[1])}`}</i>}
              </span>
              <span className="wl-y">{proj.year}</span>
              <span className="wl-a" aria-hidden="true">{hasLink ? "↗" : ""}</span>
              {open === i && proj.screenshot && (
                <span className="wl-inline">
                  <Image src={proj.screenshot} alt={proj.alt} fill sizes="100vw" quality={70} style={{ objectFit: "cover", objectPosition: "top center" }} />
                </span>
              )}
            </>
          );
          const handlers = {
            onMouseEnter: () => enter(i, proj.title),
            onFocus: (e: React.FocusEvent<HTMLElement>) => {
              enter(i, proj.title);
              const r = e.currentTarget.getBoundingClientRect();
              aim(r.left + r.width * 0.55, r.top + r.height / 2);
            },
            onBlur: leave,
          };
          return (
            <li key={proj.title}>
              {hasLink ? (
                <a
                  className="wl-row"
                  href={proj.href}
                  data-track-location={proj.track}
                  target="_blank"
                  rel="noopener noreferrer"
                  {...handlers}
                  onClick={(e) => {
                    // On a touch screen the first tap opens the preview, the second opens the site.
                    if (window.matchMedia("(hover: none)").matches && open !== i) {
                      e.preventDefault();
                      setOpen(i);
                    }
                  }}
                >
                  {inner}
                </a>
              ) : (
                <div className="wl-row" tabIndex={0} {...handlers} onClick={() => setOpen(open === i ? null : i)}>
                  {inner}
                </div>
              )}
            </li>
          );
        })}
      </ol>

      {list.length > shownCount && (
        <button type="button" className="wl-more" onClick={() => setShowAll((v) => !v)}>
          {showAll ? "Show fewer projects" : `Show all ${list.length} projects`}
        </button>
      )}

      {/* The preview that follows the cursor. It lives on the page itself (a portal), because the section's
          content-visibility would otherwise trap a fixed-position element inside the section. */}
      {host && createPortal(
        <div ref={floatRef} className={`wl-float${hovering ? " is-on" : ""}`} aria-hidden="true">
          <div className="wl-float-in">
            {shown.map((proj, i) => proj.screenshot && (i === hover || seen.has(proj.title)) && (
              <Image
                key={proj.title}
                src={proj.screenshot}
                alt=""
                fill
                sizes="340px"
                quality={75}
                className={i === hover ? "is-on" : ""}
                style={{ objectFit: "cover", objectPosition: "top center" }}
              />
            ))}
          </div>
        </div>,
        host,
      )}
    </>
  );
}

export default function Projects() {
  const { t } = useLang();
  return (
    <section
      id="work"
      style={{ width: "100%", maxWidth: 1200, margin: "0 auto", padding: "80px 20px" }}
    >
      <div style={{ marginBottom: 40 }}>
        <SpecLabel text={t("projects.eyebrow")} />
        <h2 style={{
          fontFamily: "var(--font-poppins)", fontWeight: 700,
          fontSize: "clamp(28px, 3.5vw, 48px)", letterSpacing: "-1px",
          lineHeight: 1.05, textTransform: "uppercase", color: "var(--fg)",
        }}>
          <RevealWords text={t("projects.h1")} />
        </h2>
      </div>

      <ProjectIndex projects={[...devProjects].sort(byLead)} />
    </section>
  );
}
