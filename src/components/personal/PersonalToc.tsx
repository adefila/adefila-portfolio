"use client";
import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";

// A small table of contents pinned to the left edge, like the contents of a printed page: just the words, and a dot that glides to the
// section you are reading. Only on wide screens, where there is room beside the column.
const ITEMS: { id: string; label: string }[] = [
  { id: "hero", label: "Intro" },
  { id: "toolkit", label: "Toolkit" },
  { id: "process", label: "Process" },
  { id: "work", label: "Work" },
  { id: "experience", label: "Experience" },
  { id: "gallery", label: "Gallery" },
  { id: "books", label: "Books" },
  { id: "testimonials", label: "Kind words" },
  { id: "contact", label: "Contact" },
];

const CSS = `
  .pt { position: fixed; left: max(24px, calc((100vw - 1200px) / 2 + 24px)); top: 164px; z-index: 40; display: none; transition: opacity 0.4s ease; }
  @media (min-width: 1180px) { .pt { display: block; } }
  .pt ol { list-style: none; margin: 0; padding: 0 0 0 14px; position: relative; }
  .pt a { position: relative; display: block; padding: 6px 0; font-family: var(--font-inter); font-size: 12px; line-height: 1.2; letter-spacing: -0.1px; color: var(--fg-muted); text-decoration: none; transition: color 0.4s ease; }
  .pt a:hover, .pt a[aria-current="true"], .pt a[data-lit="true"] { color: var(--fg); }
  .pt li { position: relative; }
  .pt-inv a { color: rgba(255, 255, 255, 0.62); }
  .pt-inv a:hover, .pt-inv a[aria-current="true"], .pt-inv a[data-lit="true"] { color: #fff; }
  .pt-inv .pt-mark { background: #fff; }
  .pt-mark { position: absolute; left: -14px; top: 50%; width: 5px; height: 5px; margin-top: -2.5px; background: var(--accent-purple); border-radius: 50%; }
`;

export default function PersonalToc() {
  const [active, setActive] = useState("hero");
  const [onPurple, setOnPurple] = useState(false);
  const lock = useRef<string | null>(null); // the item that was clicked: stays lit until the visitor scrolls by hand
  const [lit, setLit] = useState<string | null>(null); // a section still on screen above the end, kept in the bright colour (without the dot)

  useEffect(() => {
    // The section being read is the last one whose top has passed 45% of the screen. At the very bottom of the page, the last item (Contact)
    // is the one, because the short final section can never reach that line.
    let raf = 0;
    const update = () => {
      raf = 0;
      if (lock.current) { setActive(lock.current); setLit(null); return; }
      const atEnd = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 8;
      let current = ITEMS[0].id;
      for (const i of ITEMS) {
        const el = document.getElementById(i.id);
        if (el && el.getBoundingClientRect().top <= Math.min(window.innerHeight * 0.45, 170)) current = i.id;
      }
      const next = atEnd ? ITEMS[ITEMS.length - 1].id : current;
      setActive(next);
      // At the very bottom the dot belongs to Contact, but if Kind words is still on screen above it, its label stays lit as well
      const kw = document.getElementById("testimonials");
      setLit(next === "contact" && kw && kw.getBoundingClientRect().bottom > window.innerHeight * 0.2 ? "testimonials" : null);
    };
    const onScroll = update;
    update();
    // a hand on the wheel, the screen, the keys or the scrollbar hands the highlight back to the scroll position
    const unlock = (e: Event) => { if (lock.current && !(e.target as Element | null)?.closest?.(".pt")) { lock.current = null; update(); } };
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    window.addEventListener("wheel", unlock, { passive: true });
    window.addEventListener("touchstart", unlock, { passive: true });
    window.addEventListener("keydown", unlock);
    window.addEventListener("pointerdown", unlock);
    // the strip is behind the list while it crosses the upper band of the screen, where the list sits
    const strip = document.getElementById("contact");
    const band = new IntersectionObserver(([e]) => { setOnPurple(!!e?.isIntersecting); }, { rootMargin: "-15% 0px -55% 0px" });
    if (strip) band.observe(strip);
    return () => { band.disconnect(); window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); window.removeEventListener("wheel", unlock); window.removeEventListener("touchstart", unlock); window.removeEventListener("keydown", unlock); window.removeEventListener("pointerdown", unlock); if (raf) cancelAnimationFrame(raf); };
  }, []);

  const go = (id: string) => (e: React.MouseEvent) => {
    e.preventDefault();
    lock.current = id;
    setActive(id);
    setLit(null);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <nav className={`pt${onPurple ? " pt-inv" : ""}`} aria-label="On this page">
      <style>{CSS}</style>
      <ol>
        {ITEMS.map((i) => (
          <li key={i.id}>
            {active === i.id && <motion.span layoutId="pt-mark" className="pt-mark" aria-hidden="true" transition={{ type: "spring", stiffness: 420, damping: 36 }} />}
            <a href={`#${i.id}`} onClick={go(i.id)} aria-current={active === i.id} data-lit={lit === i.id || undefined}>{i.label}</a>
          </li>
        ))}
      </ol>
    </nav>
  );
}
