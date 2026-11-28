"use client";
import Image from "next/image";
import { ArrowRight, Download } from "lucide-react";
import MagneticButton from "./MagneticButton";
import Term, { TERM_CSS } from "./Term";
import Signature from "./Signature";
import { useLang } from "@/context/LangContext";
import SpecLabel from "./SpecLabel";

// Everything about roles, dates, education and skills here comes from the CV (public/samuel-adefila-cv.pdf), in the CV's own words.
// The newest role is first; the freelance work that runs through all of it is on top.
const WORK: { period: string; role: string; company: string; place: string; win: string }[] = [
  { period: "2020 to now", role: "Freelance web developer and Framer designer", company: "Self-employed", place: "Remote", win: "50+ websites for founders, agencies and small businesses. Top Rated on Upwork with 100% Job Success." },
  { period: "Oct 2025 to May 2026", role: "UI/UX designer", company: "Virvly", place: "Abuja, Nigeria · Contract · Remote", win: "Built a component library covering 30+ UI elements, and launched the company's waitlist website in Framer in under two weeks." },
  { period: "Nov 2025 to Mar 2026", role: "Framer developer", company: "Klimt and Design", place: "Los Angeles, US · Contract · Remote", win: "Delivered eight production-ready websites from Figma designs, and cut average revision rounds from three to one." },
  { period: "Oct 2024 to Sep 2025", role: "UI/UX designer and project manager", company: "Trust-Tai Web Agency", place: "Tennessee, US · Full-time · Remote", win: "Introduced structured design handoffs that cut cross-team miscommunication by 30%, with 95% on-time delivery." },
  { period: "Oct 2024 to Sep 2025", role: "Framer developer", company: "HitPay", place: "Singapore · Contract · Remote", win: "Designed interactive prototypes for payment and merchant dashboard workflows, improving design-to-development handoff." },
  { period: "Sep 2023 to Aug 2025", role: "Product manager and lead product designer", company: "BookedEZ", place: "Atlanta, US · Contract · Remote", win: "Reduced booking-flow drop-off by 20% through usability testing, and late-stage rework by about 33%." },
];

// The stack, packed as the path a product takes from an idea to a live site, so the list says what I can do and not only what I use.


// Side projects named inside the text. Hovering a name shows a small card; no big section of their own.
export const BUILT = [
  { name: "Baton", label: "Visual editor for client sites", stack: ["Next.js", "Supabase"], href: "https://batonedit.com", logo: "/side-projects/baton.svg" },
  { name: "CVCraft", label: "AI tool", stack: ["Claude API", "Next.js"], href: "https://cvcraftai-f0y.pages.dev/", logo: "/side-projects/cvcraft.svg" },
  { name: "Video Compressor", label: "Utility", stack: ["Next.js", "FFmpeg WASM"], href: "https://video-compressor.samuel-cb7.workers.dev/", logo: "/side-projects/video-compressor.svg" },
  { name: "Grossrec", label: "Screen recorder, in progress", stack: [] as string[], href: "https://reel.samuel-cb7.workers.dev/", logo: "/side-projects/screen-recorder.svg" },
  { name: "DocSign", label: "PDF signing", stack: ["Next.js", "pdf-lib"], href: "https://docsign.samuel-cb7.workers.dev/", logo: "/side-projects/docsign.svg" },
  { name: "MeetBot", label: "Chrome extension", stack: ["Recall.ai", "Claude AI"], href: "#", logo: "/side-projects/meetbot.png" },
];

// "Teams at {0}, {1} and {2}": the translated sentence with the hoverable names put in place of {0} {1} {2}.
function fillSentence(template: string, nodes: React.ReactNode[]): React.ReactNode[] {
  return template.split(/\{(\d)\}/).map((part, i) => (i % 2 === 1 ? <span key={i}>{nodes[Number(part)]}</span> : part));
}

const RECENT = ["Klimt and Design", "Trust-Tai Web Agency", "HitPay"];

const CSS = `
  .ab-grid.ab-solo { grid-template-columns: minmax(0, 1fr); }
  .ab-grid.ab-solo .ab-text { max-width: 760px; }
  /* the tools I built: round logos in one row, each overlapping the one before it (negative space), lifted on hover */
  .ab-actions { display: flex; flex-wrap: wrap; align-items: center; gap: 20px 32px; margin-top: 32px; }
  .ab-built { display: flex; flex-direction: row; align-items: center; padding-left: 3px; }
  .ab-built .about-term { display: block; position: relative; margin-left: -14px; transition: transform 0.2s ease; }
  .ab-built .about-term:first-child { margin-left: 0; }
  .ab-built .about-term:hover, .ab-built .about-term:focus-within { z-index: 5; transform: translateY(-3px); }
  .ab-built .about-term-text { display: block; border-bottom: 0; line-height: 0; border-radius: 50%; }
  .ab-logo { display: block; width: 52px; height: 52px; border-radius: 50%; overflow: hidden; line-height: 0; box-shadow: 0 0 0 3px var(--bg); }
  .ab-logo img { width: 100%; height: 100%; display: block; object-fit: cover; }
  .ab-grid { display: grid; grid-template-columns: minmax(0, 5fr) minmax(0, 7fr); gap: clamp(32px, 6vw, 88px); align-items: stretch; margin-top: 8px; }
  .ab-portrait { position: relative; margin: 0; min-height: 440px; }
  .ab-photo { position: absolute; inset: 0; }
  /* corner marks and a hairline frame, in the same language as the rest of the site */
  .ab-photo img { object-fit: cover; object-position: top center; }
  /* the picture fades into the page: clear at the top, darker towards the bottom until it is the page colour */
  .ab-fade { position: absolute; inset: 0; background: linear-gradient(to bottom, rgba(0, 0, 0, 0) 0%, rgba(0, 0, 0, 0) 32%, color-mix(in srgb, var(--bg) 62%, transparent) 68%, var(--bg) 100%); pointer-events: none; }
  .ab-cap { position: absolute; left: 0; right: 0; bottom: 0; padding: 0 4px 6px; }
  .ab-cap p { margin: 6px 0 0; font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.02em; text-transform: uppercase; color: var(--fg-secondary); }

  .ab-copy h2 { margin: 18px 0 0; max-width: 18ch; font-size: clamp(28px, 3.4vw, 44px); }
  .ab-text { display: grid; gap: 16px; margin-top: 24px; font-family: var(--font-inter); font-size: 17px; line-height: 1.7; color: var(--fg-secondary); max-width: 62ch; }
  .ab-text a { color: inherit; text-decoration: underline; text-decoration-style: dotted; text-underline-offset: 3px; }
  .ab-facts { margin: 40px 0 0; border-top: 0.8px solid var(--line); }
  .ab-facts div { display: grid; grid-template-columns: 110px minmax(0, 1fr); gap: 16px; padding: 12px 0; border-bottom: 0.8px solid var(--line); }
  .ab-facts dt { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.02em; text-transform: uppercase; color: var(--fg-muted); padding-top: 2px; }
  .ab-facts dd { margin: 0; font-family: var(--font-inter); font-size: 15px; line-height: 1.5; color: var(--fg); }
  .ab-cv { margin: 0; }

  .ab-block { margin-top: 96px; }
  .ab-block h3 { margin: 0; font-size: clamp(22px, 2.4vw, 30px); letter-spacing: -0.03em; line-height: 1.15; color: var(--fg); }
  .ab-block > p { margin: 12px 0 0; max-width: 56ch; font-family: var(--font-inter); font-size: 16px; line-height: 1.6; color: var(--fg-secondary); }

  .ab-work { list-style: none; margin: 32px 0 0; padding: 0; border-top: 0.8px solid var(--line); }
  .ab-job { display: grid; grid-template-columns: 170px minmax(0, 0.9fr) minmax(0, 1.4fr); gap: 24px; padding: 22px 0; border-bottom: 0.8px solid var(--line); }
  .ab-job time { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.02em; text-transform: uppercase; color: var(--fg-muted); padding-top: 4px; }
  .ab-job b { display: block; font-family: var(--font-poppins); font-weight: 400; font-size: 19px; letter-spacing: -0.02em; line-height: 1.25; color: var(--fg); }
  .ab-job small { display: block; margin-top: 4px; font-family: var(--font-inter); font-size: 13px; line-height: 1.4; color: var(--fg-muted); }
  .ab-job p { margin: 0; font-family: var(--font-inter); font-size: 15px; line-height: 1.6; color: var(--fg-secondary); }

  /* the stack as a path: design, build, speed up, run */
  .ab-stack { display: grid; grid-template-columns: repeat(4, minmax(0, 1fr)); margin-top: 32px; border-top: 0.8px solid var(--line); border-bottom: 0.8px solid var(--line); }
  .ab-step { position: relative; padding: 24px 20px 24px 0; }
  .ab-step + .ab-step { padding-left: 20px; border-left: 0.8px solid var(--line); }
  .ab-step + .ab-step::before { content: ""; position: absolute; left: -4px; top: 30px; width: 7px; height: 7px; background: var(--bg); border: 0.8px solid var(--accent-purple); }
  .ab-step-n { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.02em; text-transform: uppercase; color: var(--accent-purple); }
  .ab-step h4 { margin: 8px 0 0; font-family: var(--font-poppins); font-weight: 400; font-size: 20px; letter-spacing: -0.025em; color: var(--fg); }
  .ab-step p { margin: 6px 0 0; font-family: var(--font-inter); font-size: 13px; line-height: 1.5; color: var(--fg-muted); }
  .ab-step ul { list-style: none; margin: 16px 0 0; padding: 0; display: grid; gap: 6px; }
  .ab-step li { font-family: var(--font-inter); font-size: 15px; line-height: 1.4; color: var(--fg); }

  @media (max-width: 900px) {
    .ab-grid { grid-template-columns: minmax(0, 1fr); }
    .ab-portrait { align-self: start; width: 100%; max-width: 420px; min-height: 0; }
    .ab-photo { position: relative; inset: auto; width: 100%; aspect-ratio: 4 / 5; }
    .ab-block { margin-top: 72px; }
    .ab-job { grid-template-columns: minmax(0, 1fr); gap: 6px; }
    .ab-stack { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .ab-step:nth-child(odd) { padding-left: 0; border-left: 0; }
    .ab-step:nth-child(odd)::before { display: none; }
    .ab-step:nth-child(n+3) { border-top: 0.8px solid var(--line); }
  }
  @media (max-width: 520px) { .ab-facts div { grid-template-columns: minmax(0, 1fr); gap: 2px; } }
`;

export default function About({ portrait = true, minimal = false }: { portrait?: boolean; minimal?: boolean } = {}) {
  const { t } = useLang();

  return (
    <section id="about" style={{ width: "100%", maxWidth: 1200, margin: "0 auto", padding: "80px 20px" }}>
      <style>{CSS}</style>
      <style>{TERM_CSS}</style>

      <SpecLabel text={t("about.eyebrow")} />

      <div className={`ab-grid${portrait ? "" : " ab-solo"}`}>
        {portrait && <figure className="ab-portrait">
          <div className="ab-photo corners-in">
            <Image src="/samuel-portrait-cutout.webp" alt="Samuel Adefila" fill sizes="(max-width: 900px) 420px, 480px" priority={false} />
            <div className="ab-fade" aria-hidden="true" />
            <figcaption className="ab-cap">
              <Signature name="Samuel Adefila" />
              <p>Product designer · Ibadan, Nigeria</p>
            </figcaption>
          </div>
        </figure>}

        <div className="ab-copy">
          <h2 data-reveal>{t("about.h1")}</h2>
          <div className="ab-text" data-reveal>
            <p>{t("about.p1")}</p>
            <p>{t("about.p2")}</p>
            {!minimal && <p>
              {fillSentence(t("about.p3"), RECENT.map((name) => {
                const job = WORK.find((w) => w.company === name)!;
                return (
                  <Term key={name} tip={(
                    <>
                      <b>{job.role}</b>
                      <span>{job.period} · {job.place}</span>
                      <span>{job.win}</span>
                    </>
                  )}>
                    {name}
                  </Term>
                );
              }))}
            </p>}
          </div>

          {!minimal && <div className="ab-actions">
          <div className="ab-built" data-reveal role="list" aria-label="Tools I built">
            {BUILT.map((p) => {
              const linked = p.href !== "#";
              const logo = <Image src={p.logo} alt={p.name} width={48} height={48} unoptimized />;
              return (
                <Term key={p.name} tip={(
                  <>
                    <b>{p.name}</b>
                    <span>{p.label} · {p.stack.join(", ")}</span>
                    {linked && <a href={p.href} target="_blank" rel="noopener noreferrer">{t("about.viewProject")}</a>}
                  </>
                )}>
                  {linked ? <a className="ab-logo" role="listitem" href={p.href} target="_blank" rel="noopener noreferrer" aria-label={p.name}>{logo}</a> : <span className="ab-logo" role="listitem">{logo}</span>}
                </Term>
              );
            })}
          </div>

          <div className="ab-cv" data-reveal>
            <MagneticButton
              href="/samuel-adefila-cv.pdf"
              download
              className="btn-ticks"
              style={{ fontFamily: "var(--font-inter)", fontWeight: 600, lineHeight: "20px", fontSize: 13, letterSpacing: "0.5px", textTransform: "uppercase", color: "var(--fg)", background: "transparent", border: "0.8px solid var(--line)", padding: "13px 25px", textDecoration: "none", alignItems: "center", gap: 8, transition: "background 0.2s ease, border-color 0.2s ease, color 0.2s ease" }}
              onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.background = "var(--btn-bg)"; e.currentTarget.style.borderColor = "var(--btn-bg)"; e.currentTarget.style.color = "#fff"; }}
              onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => { e.currentTarget.style.background = "transparent"; e.currentTarget.style.borderColor = "rgba(var(--ink), 0.2)"; e.currentTarget.style.color = "var(--fg)"; }}
            >
              {t("hero.downloadCv")} <Download size={13} strokeWidth={2} />
            </MagneticButton>
          </div>
          </div>}
        </div>
      </div>
    </section>
  );
}
