"use client";
import SpecLabel from "@/components/SpecLabel";

// Experience as plain text: when, the role, where, and what changed. Everything here is from the CV (public/samuel-adefila-cv.pdf),
// in the CV's own words, so it stays in English.
export const ROLES: { when: string; type: string; role: string; org: string; place: string; points: string[] }[] = [
  {
    when: "Jan 2020 to now", type: "Freelance", role: "Web developer and Framer designer", org: "Self-employed", place: "Remote",
    points: ["50+ websites for founders and agencies."],
  },
  {
    when: "Nov 2025 to Mar 2026", type: "Contract", role: "Framer developer", org: "Klimt and Design", place: "Los Angeles, US · Remote",
    points: ["Eight sites shipped from Figma to Framer."],
  },
  {
    when: "Oct 2025 to May 2026", type: "Contract", role: "UI/UX designer", org: "Virvly", place: "Abuja, Nigeria · Remote",
    points: ["30+ component library, waitlist site live in two weeks."],
  },
  {
    when: "Oct 2024 to Sep 2025", type: "Full-time", role: "UI/UX designer and project manager", org: "Trust-Tai Web Agency", place: "Tennessee, US · Remote",
    points: ["95% on-time delivery, 30% less miscommunication."],
  },
  {
    when: "Oct 2024 to Sep 2025", type: "Contract", role: "Framer developer", org: "HitPay", place: "Singapore · Remote",
    points: ["Payment dashboard prototypes and UI components."],
  },
  {
    when: "Sep 2023 to Aug 2025", type: "Contract", role: "Product manager and lead product designer", org: "BookedEZ", place: "Atlanta, US · Remote",
    points: ["Cut booking-flow drop-off by 20%."],
  },
];

const CSS = `
  .ex { width: 100%; max-width: 1200px; margin: 0 auto; padding: 64px 20px; }
  .ex h2 { margin: 18px 0 0; max-width: 20ch; font-family: var(--font-poppins); font-size: clamp(28px, 3.4vw, 44px); line-height: 1.1; color: var(--fg); }
  .ex-list { list-style: none; margin: 36px 0 0; padding: 0; border-top: 0.5px solid var(--line); }
  .ex-row { display: grid; grid-template-columns: 220px minmax(0, 1fr); gap: 32px; padding: 22px 0; border-bottom: 0.5px solid var(--line); }
  .ex-when { font-family: var(--font-inter); font-size: 14px; line-height: 1.5; color: var(--fg-secondary); }
  .ex-when span { display: block; margin-top: 2px; color: var(--fg-muted); }
  .ex-role { font-family: var(--font-poppins); font-size: clamp(19px, 1.9vw, 24px); line-height: 1.25; letter-spacing: -0.02em; color: var(--fg); }
  .ex-org { margin-top: 4px; font-family: var(--font-inter); font-size: 15px; color: var(--fg-secondary); }
  .ex-points { list-style: none; margin: 10px 0 0; padding: 0; display: grid; gap: 6px; font-family: var(--font-inter); font-size: 15px; line-height: 1.6; color: var(--fg-secondary); }
  .ex-points li { position: relative; padding-left: 16px; }
  .ex-points li::before { content: ""; position: absolute; left: 0; top: 0.7em; width: 6px; height: 1px; background: var(--fg-muted); }
  @media (max-width: 760px) { .ex-row { grid-template-columns: 1fr; gap: 10px; padding: 22px 0; } }
`;

export default function Experience() {
  return (
    <section id="experience" className="ex">
      <style>{CSS}</style>
      <SpecLabel text="Experience" />
      <h2 data-reveal>Where I&rsquo;ve worked.</h2>
      <ul className="ex-list">
        {ROLES.map((r) => (
          <li key={`${r.org}-${r.when}`} data-reveal className="ex-row">
            <div className="ex-when">{r.when}<span>{r.type}</span></div>
            <div>
              <p className="ex-role">{r.role}</p>
              <p className="ex-org">{r.org} · {r.place}</p>
              <ul className="ex-points">{r.points.map((p) => <li key={p}>{p}</li>)}</ul>
            </div>
          </li>
        ))}
      </ul>
    </section>
  );
}
