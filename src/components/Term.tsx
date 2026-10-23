"use client";
import { useRef, useState } from "react";

// A name inside a sentence that shows a small card on hover, on keyboard focus, or on a tap.
// Used by the About text and the Work text.
export default function Term({ children, tip, below = false }: { children: React.ReactNode; tip: React.ReactNode; below?: boolean }) {
  const [open, setOpen] = useState(false);
  const [alignRight, setAlignRight] = useState(false);
  const ref = useRef<HTMLSpanElement>(null);
  const show = () => {
    const r = ref.current?.getBoundingClientRect();
    if (r) setAlignRight(r.left + 280 > window.innerWidth - 16);
    setOpen(true);
  };
  const cls = ["about-tip", alignRight && "about-tip-right", below && "about-tip-below"].filter(Boolean).join(" ");
  return (
    <span className="about-term" ref={ref} onMouseEnter={show} onMouseLeave={() => setOpen(false)}>
      <span
        className="about-term-text"
        tabIndex={0}
        role="button"
        aria-expanded={open}
        onFocus={(e) => { if (e.currentTarget.matches(":focus-visible")) show(); }}
        onBlur={(e) => { if (!e.currentTarget.parentElement?.contains(e.relatedTarget as Node | null)) setOpen(false); }}
        onClick={() => {
          if (!window.matchMedia("(hover: none)").matches) return;
          if (open) setOpen(false); else show();
        }}
      >
        {children}
      </span>
      {open && <span role="tooltip" className={cls}>{tip}</span>}
    </span>
  );
}

export const TERM_CSS = `
  .about-term { position: relative; display: inline; }
  .about-term-text { color: var(--fg); border-bottom: 1px dotted rgba(var(--ink), 0.55); cursor: help; transition: color 0.15s ease, border-color 0.15s ease; }
  .about-term:hover .about-term-text, .about-term-text:focus-visible { color: var(--accent-purple); border-bottom-color: var(--accent-purple); outline: none; }
  .about-tip { position: absolute; z-index: 30; left: 0; bottom: calc(100% + 8px); width: max-content; max-width: min(280px, calc(100vw - 40px)); display: flex; flex-direction: column; gap: 3px; padding: 10px 12px; text-align: left; font-family: var(--font-inter); font-size: 12px; line-height: 1.45; letter-spacing: 0; text-transform: none; font-weight: 400; color: var(--fg-secondary); background: var(--surface); border: 1px solid rgba(var(--ink), 0.18); box-shadow: 0 10px 28px rgba(0, 0, 0, 0.25); }
  .about-tip-right { left: auto; right: 0; }
  .about-tip-below { bottom: auto; top: calc(100% + 8px); }
  .about-tip b { font-weight: 600; font-size: 12px; color: var(--fg); }
  .about-tip a { align-self: flex-start; margin-top: 4px; font-weight: 600; font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--fg); text-decoration: none; border-bottom: 1px solid currentColor; }
  .about-tip-thumb { display: block; width: 264px; max-width: 100%; height: auto; aspect-ratio: 16 / 8.4; object-fit: cover; object-position: top center; margin: -10px -12px 8px; width: calc(100% + 24px); max-width: none; }
`;
