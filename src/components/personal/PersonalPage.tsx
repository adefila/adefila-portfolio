"use client";
import { useState } from "react";
import { motion } from "framer-motion";
import Gallery from "@/components/personal/Gallery";
import { ArrowUp3, DocumentDownload, Sms } from "iconsax-react";
import Toolkit from "@/components/personal/Toolkit";
import { ROLES } from "@/components/personal/Experience";
import { Btn, IndexList, PP_CSS, Reveal } from "@/components/personal/ui";
import type { Detail, Row } from "@/components/personal/ui";
import { devProjects } from "@/components/Projects";
import { CASE_STUDIES } from "@/lib/caseStudies";
import { BOOKING_URL } from "@/lib/booking";
import { CASE_STUDY_DATA } from "@/lib/caseStudyData";

// The personal site (adefilasamuel.com), written for people hiring: one narrow column of plain text and index rows.
// No boxes, no dividers: spacing separates the blocks. Motion is framer-motion springs, kept small (see ui.tsx). English only.
const PROCESS: Row[] = [
  { key: "discover", title: "Discover", note: "Goals, users and limits, written down before a pixel moves." },
  { key: "design", title: "Design", note: "Flows, wireframes, then high fidelity in Figma, tested early." },
  { key: "build", title: "Build", note: "Framer or Next.js, with Claude Code and Cursor to move fast." },
  { key: "handoff", title: "Hand off", note: "Components, notes and a walkthrough so your team runs it." },
];
const FIRST = ["DLP Africa", "The Initial", "BindHQ", "Leadopo", "Upside ESG", "VPA London"];
const UPWORK = "https://upwork.com/freelancers/adefilasamuel";
const B2B_SITE = "https://web.adefilasamuel.com";

// A few photographs: the desk, the work, and me away from it.
const GALLERY: { src: string; alt: string }[] = [
  { src: "/gallery/photo-6.webp", alt: "Samuel in an orange striped polo, looking down at his phone" },
  { src: "/gallery/photo-1.webp", alt: "Samuel standing in front of a car" },
  { src: "/gallery/photo-2.webp", alt: "A standing desk with a monitor and laptops, lit in blue" },
  { src: "/gallery/photo-3.webp", alt: "A quote management dashboard on a monitor" },
  { src: "/gallery/photo-4.webp", alt: "Samuel smiling at a National Youth Service Corps event" },
  { src: "/gallery/photo-5.webp", alt: "A desk setup with a monitor and a hand holding a black ball" },
  { src: "/gallery/photo-7.webp", alt: "A black and white mirror selfie holding a phone" },
  { src: "/gallery/photo-8.webp", alt: "Samuel taking a mirror photo in a gym" },
];

// Reading: what is on the table now, a line worth keeping, and an open door for someone to recommend the next one.
const BOOKS: Row[] = [
  { key: "keep-going", title: "Keep Going", note: "Austin Kleon", right: "Reading now", href: "https://www.goodreads.com/book/show/40591677", external: true },
];

// Each kind word in three parts: before, the part that is marked, after. The marked part is what the person is really saying.
const QUOTES: { q: [string, string, string]; name: string; role: string }[] = [
  { q: ["I've found ", "5+ new clients", " through it."], name: "Johnno Van Den Brink", role: "The Initial Agency" },
  { q: ["He consistently delivered ", "high-quality work on time", "."], name: "Nitin", role: "HitPay" },
  { q: ["He is ", "reliable, knowledgeable, patient and kind", "."], name: "Heather Burns", role: "Upside ESG" },
];

// The whole case study, as the story shown when a row is opened, so there is nowhere else to go to read it. Every line comes from the
// recorded case study (src/lib/caseStudyData.ts); Neetly is written here because it has no case study page yet.
const metricText = (m: { prefix?: string; value?: number; suffix?: string; text?: string; label: string }) =>
  `${m.text ?? `${m.prefix ?? ""}${m.value ?? ""}${m.suffix ?? ""}`} ${m.label}`.trim();

const detailFor = (title: string): Detail | undefined => {
  const slug = CASE_STUDIES[title];
  const c = slug ? CASE_STUDY_DATA.find((x) => `/case-studies/${x.slug}` === slug) : undefined;
  if (!c) return undefined;
  return {
    facts: c.facts.filter(([k]) => k !== "Client" && k !== "Status"),
    brief: c.brief,
    did: c.did,
    constraint: c.constraint,
    steps: c.process?.steps.map((s) => ({ title: s.title, lead: s.lead })),
    decisions: c.decisions,
    result: c.outcome ?? metricText(c.metric),
    metrics: [c.metric, ...(c.extraMetrics ?? [])].map(metricText),
    quote: c.quote,
    closing: c.closing,
    links: c.site ? [{ label: "Visit the site", href: c.site, external: true }] : undefined,
  };
};

const NEETLY: Detail = {
  facts: [["Role", "UI/UX design"], ["Scope", "Mobile app"], ["Tools", "Figma"]],
  brief: "A laundry app where customers book a pickup, follow their order and pay, without calling anyone.",
  did: "Mapped the order journey first, then designed the orders list, the account settings and a quick payment checkout, in light and dark.",
  steps: [
    { title: "Order journey.", lead: "From booking a pickup to receiving clean clothes, with every state in between." },
    { title: "Wireframes.", lead: "The orders list, the account settings and the checkout, at low fidelity first." },
    { title: "High fidelity.", lead: "Screens designed in light and dark, with a clear payment step." },
  ],
  result: "A complete, clickable app design, ready to hand to a developer.",
};

// "Nov 2025 to Mar 2026" -> "2025 to 2026", "Jan 2020 to now" -> "2020 to now"
const years = (when: string) => when.replace(/[A-Z][a-z]{2} (20\d\d)/g, "$1");

const CSS = `
  .pp { width: 100%; padding: 140px 20px 0; }
  .pp-col { max-width: 720px; margin: 0 auto; }
  .pp h1 { font-family: var(--font-poppins); font-weight: 400; font-size: clamp(32px, 4.4vw, 48px); line-height: 1.08; letter-spacing: -0.035em !important; color: var(--fg); }
  .pp-intro { margin-top: 16px; font-family: var(--font-inter); font-size: 17px; line-height: 1.65; letter-spacing: -0.15px; color: var(--fg-secondary); }
  .pp-intro + .pp-intro { margin-top: 12px; }
  .pp-link { color: var(--fg); text-decoration: none; background-image: linear-gradient(currentColor, currentColor); background-size: 100% 1px; background-position: 0 100%; background-repeat: no-repeat; padding-bottom: 1px; transition: background-size 0.4s cubic-bezier(0.2, 0.7, 0.2, 1), color 0.3s ease; }
  .pp-link:hover { background-size: 0% 1px; background-position: 100% 100%; color: var(--accent-purple); }
  .pp-cta { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 24px; }

  .pp-block { display: grid; grid-template-columns: 110px minmax(0, 1fr); gap: 16px; margin-top: 64px; scroll-margin-top: 90px; align-items: baseline; }
  #gallery > .pp-label { align-self: start; padding-top: 3px; }
  .pp-label { padding-top: 0; font-family: var(--font-inter); font-size: 14px; color: var(--fg-muted); }
  .pp-note { margin-bottom: 18px; font-family: var(--font-inter); font-size: 16px; line-height: 1.6; letter-spacing: -0.15px; color: var(--fg-secondary); }
  .pp-more { margin-top: 12px; padding: 0 0 2px; border: 0; cursor: pointer; font-family: var(--font-inter); font-weight: 600; font-size: 12px; letter-spacing: 0.08em; color: var(--accent-purple); background-color: transparent; background-image: linear-gradient(currentColor, currentColor); background-size: 0% 1px; background-position: 0 100%; background-repeat: no-repeat; transition: background-size 0.4s cubic-bezier(0.2, 0.7, 0.2, 1); }
  .pp-more:hover { background-size: 100% 1px; }
  .pp-quote { padding: 9px 0; }
  .pp-mark { color: inherit; background: linear-gradient(#ece3fd, #ece3fd) no-repeat 0 0 / 0% 100%; padding: 1px 3px; margin: 0 -3px; -webkit-box-decoration-break: clone; box-decoration-break: clone; }
  .pp-quote p { font-family: var(--font-inter); font-size: 16px; line-height: 1.5; letter-spacing: -0.15px; color: var(--fg); }
  .pp-quote span { display: block; margin-top: 2px; font-size: 14px; color: var(--fg-muted); }
  .pp-bq { margin: 22px 0 0; padding: 0; }
  .pp-bq p { font-family: var(--font-poppins); font-weight: 400; font-size: clamp(18px, 2.4vw, 22px); line-height: 1.4; letter-spacing: -0.02em; color: var(--fg); }
  .pp-ask { margin: 22px 0 0; }
  .pp-bq footer { margin-top: 10px; font-family: var(--font-inter); font-size: 14px; color: var(--fg-muted); }
  .pp-strip { position: relative; overflow: hidden; margin: 88px -20px 0; padding: 72px 20px 28px; background: #6d28d9; color: #fff; }
  .pp-strip > *:not(.pp-art) { position: relative; z-index: 1; }
  .pp-art { position: absolute; right: 0; bottom: 0; width: min(560px, 62vw); height: auto; pointer-events: none; fill: none; stroke: rgba(255, 255, 255, 0.17); stroke-width: 1; }
  .pp-art .pp-dot-a { fill: rgba(255, 255, 255, 0.85); stroke: none; }
  .pp-orbit { transform-origin: 600px 600px; }
  .pp-orbit-a { animation: ppSpin 46s linear infinite; }
  .pp-orbit-b { animation: ppSpin 70s linear infinite reverse; }
  @keyframes ppSpin { to { transform: rotate(360deg); } }
  @media (prefers-reduced-motion: reduce) { .pp-orbit { animation: none; } }
  .pp-strip-in { max-width: 720px; margin: 0 auto; display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 1fr); gap: clamp(32px, 6vw, 96px); align-items: start; }
  .pp-strip-h { font-family: var(--font-poppins); font-weight: 400; font-size: clamp(30px, 4vw, 44px); line-height: 1.08; letter-spacing: -0.035em; color: #fff; }
  .pp-strip-p { margin-top: 16px; font-family: var(--font-inter); font-size: 15px; line-height: 1.6; color: rgba(255, 255, 255, 0.92); }
  .pp-strip-list { list-style: none; margin: 0; padding: 0; }
  .pp-strip-list a { display: grid; grid-template-columns: 78px minmax(0, 1fr) auto; align-items: baseline; gap: 12px; padding: 9px 0; font-family: var(--font-inter); font-size: 15px; color: #fff; text-decoration: none; transition: opacity 0.3s ease; }
  .pp-strip-list span { color: rgba(255, 255, 255, 0.88); font-size: 14px; }
  .pp-strip-list em { font-style: normal; overflow-wrap: anywhere; }
  .pp-strip-list svg { align-self: center; opacity: 0.6; transition: transform 0.3s ease, opacity 0.3s ease; }
  .pp-strip-list:hover a { opacity: 0.55; }
  .pp-strip-list a:hover { opacity: 1; }
  .pp-strip-list a:hover svg { opacity: 1; transform: translate(2px, -2px) rotate(45deg) !important; }
  .pp-strip-foot { max-width: 720px; margin: 64px auto 0; font-family: var(--font-inter); font-size: 13px; color: rgba(255, 255, 255, 0.9); }
  @media (max-width: 760px) { .pp-strip-in { grid-template-columns: 1fr; } }
  @media (max-width: 640px) { .pp { padding-top: 112px; } .pp-block { grid-template-columns: minmax(0, 1fr); gap: 10px; margin-top: 44px; } }
  @media (max-width: 640px) { .pp-intro { margin-top: 14px; } .pp-intro + .pp-intro { margin-top: 10px; } .pp-cta { margin-top: 20px; } }
`;

export default function PersonalPage() {
  const [all, setAll] = useState(false);
  const first = FIRST.map((t) => devProjects.find((p) => p.title === t)).filter((p): p is (typeof devProjects)[number] => !!p);
  const rest = devProjects.filter((p) => !FIRST.includes(p.title));
  const projects = all ? [...first, ...rest] : first;

  const workRows: Row[] = [
    { key: "recorder", title: "Grossrec", note: "Screen recorder, building now", right: "Now", href: "https://reel.samuel-cb7.workers.dev/", external: true },
    { key: "neetly", title: "Neetly", note: "Laundry app, UI/UX", right: "2025", detail: NEETLY, badge: "Case study" },
    ...projects.map((p): Row => {
      const study = CASE_STUDIES[p.title];
      const href = study ?? (p.href !== "#" ? p.href : undefined);
      const detail = detailFor(p.title);
      return { key: p.title, title: p.title, note: p.tags[0], right: p.year, href: detail ? undefined : href, external: !study, detail, badge: detail ? "Case study" : undefined };
    }),
  ];
  const expRows: Row[] = ROLES.map((r) => ({ key: `${r.org}-${r.when}`, title: r.role, note: r.org, right: years(r.when) }));
  const contactRows: Row[] = [
    { key: "mail", title: "Email", note: "samuel@adefilasamuel.com", href: "mailto:samuel@adefilasamuel.com" },
    { key: "li", title: "LinkedIn", note: "adefila-samuel", href: "https://www.linkedin.com/in/adefila-samuel-144448201/", external: true },
    { key: "up", title: "Upwork", note: "Top Rated", href: UPWORK, external: true },
    { key: "call", title: "Call", note: "Book a free discovery call", href: BOOKING_URL, external: true },
  ];

  return (
    <section id="hero" className="pp">
      <style>{CSS}</style>
      <style>{PP_CSS}</style>
      <div className="pp-col">
        <Reveal now><h1>Product designer who ships in code.</h1></Reveal>
        <Reveal now delay={0.08}>
          <p className="pp-intro">
            I design, prototype and help build web and mobile products: UX thinking and visual design, then Figma, Framer and Next.js,
            with Claude Code and Cursor to get from idea to a working interface fast.
          </p>
          <p className="pp-intro">
            I started with websites for small businesses, so I know a site has to work, not just look good.{" "}
            <a className="pp-link" href={UPWORK} target="_blank" rel="noopener noreferrer">Top Rated on Upwork</a> and a{" "}
            <a className="pp-link" href="https://www.framer.com/@adefila-samuel/" target="_blank" rel="noopener noreferrer">Framer Expert</a>, with 100% Job Success across 50+ projects.
          </p>
        </Reveal>
        <Reveal now delay={0.16}>
          <div className="pp-cta">
            <Btn primary download href="/samuel-adefila-cv.pdf" label="Download CV" icon={<DocumentDownload size={16} variant="Broken" color="currentColor" />} />
            <Btn href="mailto:samuel@adefilasamuel.com" label="Email me" icon={<Sms size={16} variant="Broken" color="currentColor" />} />
          </div>
        </Reveal>

        <Reveal id="toolkit" className="pp-block">
          <p className="pp-label">Toolkit</p>
          <Toolkit />
        </Reveal>

        <Reveal id="process" className="pp-block">
          <p className="pp-label">Process</p>
          <IndexList rows={PROCESS} />
        </Reveal>

        <Reveal id="work" className="pp-block">
          <p className="pp-label">Work</p>
          <div>
            <IndexList rows={workRows} />
            <button type="button" className="pp-more" onClick={() => setAll((v) => !v)}>{all ? "Show less" : `Show all ${devProjects.length} projects`}</button>
          </div>
        </Reveal>

        <Reveal id="b2b" className="pp-block">
          <p className="pp-label">B2B</p>
          <div>
            <p className="pp-note">
              Alongside this, I build websites for B2B companies: Framer or custom code, one fixed scope and price, and a site made to bring in qualified enquiries.
              If your company needs one, everything is on the{" "}
              <a className="pp-link" href={B2B_SITE} target="_blank" rel="noopener noreferrer">B2B page</a>.
            </p>
          </div>
        </Reveal>

        <Reveal id="experience" className="pp-block">
          <p className="pp-label">Experience</p>
          <IndexList rows={expRows} />
        </Reveal>

        <Reveal id="gallery" className="pp-block">
          <p className="pp-label">Gallery</p>
          <Gallery images={GALLERY} />
        </Reveal>

        <Reveal id="books" className="pp-block">
          <p className="pp-label">Books</p>
          <div>
            <IndexList rows={BOOKS} />
            <blockquote className="pp-bq">
              <p>&ldquo;None of us know what will happen. Don&rsquo;t spend time worrying about it. Make the most beautiful thing you can. Try to do that every day. That&rsquo;s it.&rdquo;</p>
              <footer>Laurie Anderson, in Keep Going. My favourite line right now.</footer>
            </blockquote>
            <p className="pp-note pp-ask">
              Read something good lately? Tell me what to read next:{" "}
              <a className="pp-link" href="mailto:samuel@adefilasamuel.com?subject=A%20book%20for%20you">recommend me a book</a>.
            </p>
          </div>
        </Reveal>

        <Reveal id="testimonials" className="pp-block">
          <p className="pp-label">Kind words</p>
          <ul className="pp-list">
            {QUOTES.map((x, i) => (
              <li key={x.name} className="pp-quote">
                <p>
                  &ldquo;{x.q[0]}
                  <motion.mark
                    className="pp-mark"
                    initial={{ backgroundSize: "0% 100%" }}
                    whileInView={{ backgroundSize: "100% 100%" }}
                    viewport={{ once: true, margin: "0px 0px -12% 0px" }}
                    transition={{ duration: 0.9, delay: 0.35 + i * 0.18, ease: [0.2, 0.7, 0.2, 1] }}
                  >{x.q[1]}</motion.mark>
                  {x.q[2]}&rdquo;
                </p>
                <span>{x.name}, {x.role}</span>
              </li>
            ))}
          </ul>
        </Reveal>

      </div>

      <footer id="contact" className="pp-strip">
        <svg className="pp-art" viewBox="0 0 600 600" aria-hidden="true" focusable="false">
          {[70, 130, 190, 250, 310, 370, 430, 490, 550].map((r) => <circle key={r} cx="600" cy="600" r={r} />)}
          <g className="pp-orbit pp-orbit-a"><circle className="pp-dot-a" cx="600" cy="410" r="5" /></g>
          <g className="pp-orbit pp-orbit-b"><circle className="pp-dot-a" cx="600" cy="230" r="3.5" /></g>
          <line x1="0" y1="600" x2="600" y2="600" />
          <line x1="600" y1="0" x2="600" y2="600" />
        </svg>
        <div className="pp-strip-in">
          <Reveal>
            <p className="pp-strip-h">Open to roles.</p>
            <p className="pp-strip-p">Remote, or relocating with visa sponsorship. Send me the role and I&rsquo;ll reply within 24 hours.</p>
          </Reveal>
          <Reveal delay={0.08}>
            <ul className="pp-strip-list">
              {contactRows.map((r) => (
                <li key={r.key}>
                  <a href={r.href} {...(r.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>
                    <span>{r.title}</span><em>{r.note}</em>
                    <ArrowUp3 size={16} variant="Broken" color="currentColor" style={{ transform: "rotate(45deg)" }} aria-hidden="true" />
                  </a>
                </li>
              ))}
            </ul>
          </Reveal>
        </div>
        <p className="pp-strip-foot">&copy; 2026 Samuel Adefila. Product designer and Framer developer, based in Ibadan, Nigeria.</p>
      </footer>
    </section>
  );
}
