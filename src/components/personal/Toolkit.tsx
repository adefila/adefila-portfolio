"use client";
import Image from "next/image";
import Term, { TERM_CSS } from "@/components/Term";
import { BUILT } from "@/components/About";

// The toolkit as round logos, each overlapping the one before it (like the side projects): the tools I work in, then the tools I built.
// Hovering a logo shows what it is. The marks are from the open-source Simple Icons set, on a round ground in each brand's colour.
const TOOLS: { name: string; slug: string; stage: string }[] = [
  { name: "Notion", slug: "notion", stage: "Discover: notes and planning" },
  { name: "ClickUp", slug: "clickup", stage: "Discover: project management" },
  { name: "Figma", slug: "figma", stage: "Design: UI/UX and prototypes" },
  { name: "Adobe XD", slug: "adobexd", stage: "Design: wireframes and prototypes" },
  { name: "Framer", slug: "framer", stage: "Build: sites and prototypes" },
  { name: "Webflow", slug: "webflow", stage: "Build: sites with a CMS" },
  { name: "HTML", slug: "html5", stage: "Build: markup" },
  { name: "CSS", slug: "css3", stage: "Build: styling" },
  { name: "JavaScript", slug: "javascript", stage: "Build: interaction" },
  { name: "React", slug: "react", stage: "Build: interfaces" },
  { name: "Next.js", slug: "nextdotjs", stage: "Build: full sites and apps" },
  { name: "Git", slug: "git", stage: "Hand off: version control" },
  { name: "Claude Code", slug: "claude", stage: "Build: AI pair for code" },
  { name: "Cursor", slug: "cursor", stage: "Build: AI code editor" },
];

const CSS = `
  .tk { margin: 0; }
  .tk-group { padding: 0 0 22px; }
  .tk-group:last-child { padding-bottom: 0; }
  .tk-group > p { margin-bottom: 12px; font-family: var(--font-inter); font-size: 14px; color: var(--fg-muted); }
  .tk-row { display: flex; flex-wrap: nowrap; align-items: center; padding-left: 3px; }
  .tk-row .about-term { display: block; position: relative; margin-left: -10px; }
  .tk-row .about-term:first-child { margin-left: 0; }
  .tk-row .about-term { transition: opacity 0.25s ease; }
  .tk-row:hover .about-term { opacity: 0.4; }
  .tk-row .about-term:hover, .tk-row .about-term:focus-within { z-index: 5; opacity: 1; }
  .tk-row .about-term-text { display: block; border-bottom: 0; line-height: 0; border-radius: 50%; }
  .tk-logo { display: block; width: 38px; height: 38px; border-radius: 50%; overflow: hidden; line-height: 0; box-shadow: 0 0 0 2px var(--bg); }
  .tk-logo img { width: 100%; height: 100%; display: block; object-fit: cover; }
  @media (max-width: 640px) { .tk-logo { width: 34px; height: 34px; } .tk-row .about-term { margin-left: -9px; } .tk-row { overflow-x: auto; padding-bottom: 8px; } }
`;

export default function Toolkit() {
  return (
    <div className="tk">
      <style>{CSS}</style>
      <style>{TERM_CSS}</style>
      <div className="tk-group" data-reveal>
        <p>What I work in</p>
        <div className="tk-row" role="list" aria-label="Tools I work in">
          {TOOLS.map((t) => (
            <Term key={t.slug} tip={<><b>{t.name}</b><span>{t.stage}</span></>}>
              <span className="tk-logo" role="listitem"><Image src={`/tools/${t.slug}.svg`} alt={t.name} width={38} height={38} unoptimized /></span>
            </Term>
          ))}
        </div>
      </div>

      <div className="tk-group" data-reveal>
        <p>What I built</p>
        <div className="tk-row" role="list" aria-label="Tools I built">
          {BUILT.map((p) => {
            const linked = p.href !== "#";
            const logo = <Image src={p.logo} alt={p.name} width={38} height={38} unoptimized />;
            return (
              <Term key={p.name} tip={(
                <>
                  <b>{p.name}</b>
                  <span>{[p.label, ...p.stack].join(" · ")}</span>
                  {linked && <a href={p.href} target="_blank" rel="noopener noreferrer">View project</a>}
                </>
              )}>
                {linked ? <a className="tk-logo" role="listitem" href={p.href} target="_blank" rel="noopener noreferrer" aria-label={p.name}>{logo}</a> : <span className="tk-logo" role="listitem">{logo}</span>}
              </Term>
            );
          })}
        </div>
      </div>
    </div>
  );
}
