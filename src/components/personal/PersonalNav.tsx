"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Btn } from "@/components/personal/ui";
import Term, { TERM_CSS } from "@/components/Term";
import { Sms } from "iconsax-react";

// The top bar of the personal site: my name on the left, and on the right where I'd work from (flags), the time in Ibadan, and the hire button.
// Flags are the countries I'm open to relocating to, with visa sponsorship (edit this list to change them).
const OPEN_TO: { code: string; name: string }[] = [
  { code: "us", name: "United States" },
  { code: "gb", name: "United Kingdom" },
  { code: "ca", name: "Canada" },
  { code: "nl", name: "Netherlands" },
  { code: "au", name: "Australia" },
];

const CSS = `
  .pn { position: fixed; top: 0; left: 0; right: 0; z-index: 50; display: flex; align-items: center; justify-content: space-between; height: 64px; padding: 0 max(24px, calc((100vw - 1200px) / 2 + 24px)); background: color-mix(in srgb, var(--bg) 88%, transparent); backdrop-filter: blur(10px); -webkit-backdrop-filter: blur(10px); border-bottom: 0.8px solid var(--line); }
  .pn-name { font-family: var(--font-inter); font-weight: 600; font-size: 13px; letter-spacing: 0.08em; color: var(--fg); text-decoration: none; }
  .pn-right { display: flex; align-items: center; gap: 22px; }
  .pn-open { display: flex; align-items: center; gap: 10px; font-family: var(--font-inter); font-size: 12px; color: var(--fg-muted); }
  .pn-flags { display: flex; padding-left: 2px; }
  .pn-flags .about-term { display: block; margin-left: -6px; }
  .pn-flags .about-term:first-child { margin-left: 0; }
  .pn-flags .about-term-text { display: block; border-bottom: 0; line-height: 0; border-radius: 50%; }
  .pn-flags img { display: block; margin-left: 0 !important; width: 20px; height: 20px; border-radius: 50%; object-fit: cover; margin-left: -6px; box-shadow: 0 0 0 2px var(--bg); }
  .pn-flags img:first-child { margin-left: 0; }
  .pn-time { font-family: var(--font-inter); font-size: 12px; color: var(--fg-muted); font-variant-numeric: tabular-nums; white-space: nowrap; }
  .pn-time b { font-weight: 500; color: var(--fg); }
  .pn .pp-btn { padding: 10px 18px; font-size: 12px; }
  @media (max-width: 760px) { .pn { padding: 0 16px; } .pn-name { font-size: 12px; letter-spacing: 0.06em; white-space: nowrap; } .pn-open span, .pn-city { display: none; } .pn-right { gap: 8px; } .pn-name { letter-spacing: 0.04em; } .pn .pp-btn { padding: 9px 11px; gap: 6px; justify-content: center; } .pn .pp-btn svg { width: 14px; height: 14px; } }
`;

export default function PersonalNav() {
  const [time, setTime] = useState("");
  useEffect(() => {
    const fmt = new Intl.DateTimeFormat("en-GB", { timeZone: "Africa/Lagos", hour: "2-digit", minute: "2-digit", hour12: false });
    const tick = () => setTime(fmt.format(new Date()));
    tick();
    const id = setInterval(tick, 15000);
    return () => clearInterval(id);
  }, []);

  return (
    <motion.header className="pn" initial={{ y: -16, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}>
      <style>{CSS}</style>
      <style>{TERM_CSS}</style>
      <a className="pn-name" href="#hero" aria-label="Samuel Adefila, back to top">SAMUEL ADEFILA.</a>
      <div className="pn-right">
        <div className="pn-open">
          <span>Open to roles in</span>
          <div className="pn-flags">
            {OPEN_TO.map((c) => (
              <Term key={c.code} below tip={<><b>{c.name}</b><span>Open to roles here</span></>}>
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img src={`/flags/${c.code}.svg`} alt={c.name} width={20} height={20} />
              </Term>
            ))}
          </div>
        </div>
        {time && <span className="pn-time" title="Local time in Ibadan, Nigeria"><span className="pn-city">Ibadan </span><b>{time}</b></span>}
        <Btn primary href="#contact" label="Hire me" icon={<Sms size={15} variant="Broken" color="currentColor" />} />
      </div>
    </motion.header>
  );
}
