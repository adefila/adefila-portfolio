"use client";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import SpecLabel from "@/components/SpecLabel";
import ProjectCards from "@/components/personal/ProjectCards";
import type { Card } from "@/components/personal/ProjectCards";
import { devProjects } from "@/components/Projects";

// Work for the business site (web.adefilasamuel.com), as cards: the title sits on the picture and the picture softens under it.
// Two tabs: websites built for clients (each opens the live site), and concept websites designed and built on my own to show a direction.
// All pictures are real desktop captures taken at 2x (2880 x 1800) in /public/work, shown as they are so they stay sharp.
const CLIENT: [string, string][] = [
  ["DLP Africa", "dlp-africa"], ["The Initial", "the-initial"], ["BindHQ", "bindhq"],
  ["Leadopo", "leadopo"], ["Upside ESG", "upside-esg"], ["VPA London", "vpa-london"],
  ["Alyssa Corso", "alyssa-corso"], ["The Prime Media", "prime-media"],
];

const CONCEPTS: Card[] = [
  { key: "paver-pro", title: "Paver Pro", note: "Outdoor construction", year: "2026", image: "/work/paver-pro.webp" },
  { key: "datum", title: "Datum Build", note: "Contractor, West Africa", year: "2026", image: "/work/datum-build.webp", href: "https://datum-build.samuel-cb7.workers.dev/", external: true },
  { key: "calder", title: "Calder Health", note: "Telehealth", year: "2026", image: "/work/calder-health.webp", href: "https://calder-health.samuel-cb7.workers.dev/", external: true },
  { key: "talon", title: "Talon Tyres", note: "Automotive e-commerce", year: "2026", image: "/work/talon-tyres.webp", href: "https://talon-tyres.samuel-cb7.workers.dev/", external: true },
];

const TABS = [
  { id: "client", label: "Client work" },
  { id: "concept", label: "Concept websites" },
] as const;

const CSS = `
  .bw-tabs { display: flex; gap: 28px; margin: 0 0 32px; }
  .bw-tab { position: relative; padding: 0 0 10px; border: 0; background: none; cursor: pointer; font-family: var(--font-inter); font-weight: 600; font-size: 13px; letter-spacing: 0.06em; text-transform: uppercase; color: var(--fg-muted); transition: color 0.3s ease; }
  .bw-tab[aria-selected="true"], .bw-tab:hover { color: var(--fg); }
  .bw-line { position: absolute; left: 0; right: 0; bottom: 0; height: 2px; background: var(--accent-purple); }
  .bw-grid .pc-list { grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 28px; }
  @media (max-width: 760px) { .bw-grid .pc-list { grid-template-columns: 1fr; gap: 20px; } }
`;

export default function BusinessWork() {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("client");
  const client: Card[] = CLIENT.map(([t, slug]) => ({ p: devProjects.find((x) => x.title === t), slug }))
    .filter((x): x is { p: (typeof devProjects)[number]; slug: string } => !!x.p)
    .map(({ p, slug }) => ({ key: p.title, title: p.title, note: p.tags[0], year: p.year, image: `/work/${slug}.webp`, href: p.href !== "#" ? p.href : undefined, external: true }));

  return (
    <section id="work" style={{ width: "100%", padding: "80px 20px", background: "var(--bg)" }}>
      <style>{CSS}</style>
      <div style={{ maxWidth: 1160, margin: "0 auto" }}>
        <SpecLabel text="Work" />
        <h2 data-reveal style={{ fontFamily: "var(--font-poppins)", fontWeight: 400, fontSize: "clamp(28px, 3.5vw, 48px)", letterSpacing: "-0.03em", lineHeight: 1.05, color: "var(--fg)", marginBottom: 36 }}>
          Recent B2B website projects.
        </h2>
        <div className="bw-tabs" role="tablist" aria-label="Kinds of work">
          {TABS.map((t) => (
            <button key={t.id} type="button" role="tab" aria-selected={tab === t.id} className="bw-tab" onClick={() => setTab(t.id)}>
              {t.label}
              {tab === t.id && <motion.span layoutId="bw-line" className="bw-line" transition={{ type: "spring", stiffness: 500, damping: 40 }} />}
            </button>
          ))}
        </div>
        <div className="bw-grid">
          <AnimatePresence mode="wait" initial={false}>
            <motion.div key={tab} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -6 }} transition={{ duration: 0.3, ease: [0.2, 0.7, 0.2, 1] }}>
              <ProjectCards cards={tab === "client" ? client : CONCEPTS} />
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
}
