"use client";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";

// A small table of contents pinned to the left edge, like the contents of a printed page: just the words, and a dot that glides to the
// section you are reading. Only on wide screens, where there is room beside the column.
const ITEMS: { id: string; label: string }[] = [
  { id: "hero", label: "Intro" },
  { id: "toolkit", label: "Toolkit" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "testimonials", label: "Kind words" },
  { id: "contact", label: "Contact" },
];

const CSS = `
  .pt { position: fixed; left: clamp(24px, 3vw, 56px); top: 50%; z-index: 40; transform: translateY(-50%); display: none; transition: opacity 0.4s ease; }
  @media (min-width: 1180px) { .pt { display: block; } }
  .pt ol { list-style: none; margin: 0; padding: 0 0 0 14px; position: relative; }
  .pt a { position: relative; display: block; padding: 6px 0; font-family: var(--font-inter); font-size: 12px; line-height: 1.2; letter-spacing: -0.1px; color: var(--fg-muted); text-decoration: none; transition: color 0.3s ease; }
  .pt a:hover, .pt a[aria-current="true"] { color: var(--fg); }
  .pt li { position: relative; }
  .pt-mark { position: absolute; left: -14px; top: 50%; width: 5px; height: 5px; margin-top: -2.5px; background: var(--accent-purple); border-radius: 50%; }
`;

export default function PersonalToc() {
  const [active, setActive] = useState("hero");

  useEffect(() => {
    const els = ITEMS.map((i) => document.getElementById(i.id)).filter((e): e is HTMLElement => !!e);
    const io = new IntersectionObserver(
      (entries) => {
        const seen = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top)[0];
        if (seen) setActive(seen.target.id);
      },
      { rootMargin: "-35% 0px -55% 0px" },
    );
    els.forEach((e) => io.observe(e));
    return () => io.disconnect();
  }, []);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav className="pt" aria-label="On this page" style={{ opacity: active === "contact" ? 0 : 1, pointerEvents: active === "contact" ? "none" : "auto" }}>
      <style>{CSS}</style>
      <ol>
        {ITEMS.map((i) => (
          <li key={i.id}>
            {active === i.id && <motion.span layoutId="pt-mark" className="pt-mark" aria-hidden="true" transition={{ type: "spring", stiffness: 420, damping: 36 }} />}
            <a href={`#${i.id}`} onClick={go(i.id)} aria-current={active === i.id}>{i.label}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
