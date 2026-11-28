"use client";
import { useRef, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

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
      <AnimatePresence>
        {open && (
          <motion.span
            role="tooltip"
            className={cls}
            initial={{ opacity: 0, y: below ? -6 : 6, filter: "blur(4px)" }}
            animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            exit={{ opacity: 0, y: below ? -3 : 3, filter: "blur(2px)", transition: { duration: 0.12 } }}
            transition={{ type: "spring", stiffness: 460, damping: 34 }}
          >
            {tip}
          </motion.span>
        )}
      </AnimatePresence>
    </span>
  );
}

export const TERM_CSS = `
  .about-term { position: relative; display: inline; }
  .about-term-text { color: var(--fg); border-bottom: 1px dotted rgba(var(--ink), 0.55); cursor: pointer; transition: color 0.15s ease, border-color 0.15s ease; }
  .about-term-text a { color: inherit; text-decoration: none; }
  .about-term:hover .about-term-text, .about-term-text:focus-visible { color: var(--accent-purple); border-bottom-color: var(--accent-purple); outline: none; }
  .about-tip { position: absolute; z-index: 30; left: 0; bottom: calc(100% + 8px); width: max-content; max-width: min(280px, calc(100vw - 40px)); display: flex; flex-direction: column; gap: 3px; padding: 10px 12px; text-align: left; font-family: var(--font-inter); font-size: 12px; line-height: 1.45; letter-spacing: 0; text-transform: none; font-weight: 400; color: var(--fg-secondary); background: var(--surface); border: 0.5px solid var(--line); box-shadow: 0 6px 28px rgba(0, 0, 0, 0.06); }
  .about-tip::after { content: ""; position: absolute; left: 0; right: 0; top: 100%; height: 14px; }
  .about-tip-below::after { top: auto; bottom: 100%; }
  .about-tip-right { left: auto; right: 0; }
  .about-tip-below { bottom: auto; top: calc(100% + 8px); }
  .about-tip b { font-weight: 600; font-size: 12px; color: var(--fg); }
  .about-tip a { align-self: flex-start; display: inline-flex; align-items: center; gap: 6px; margin-top: 8px; padding: 7px 12px; font-weight: 600; font-size: 12px; letter-spacing: 0; text-transform: none; color: #fff; background: var(--btn-bg); text-decoration: none; border: 0; transition: background 0.2s ease; }
  .about-tip a::after { content: "↗"; font-size: 12px; }
  .about-tip a:hover { background: var(--btn-bg-hover); }
  .about-tip-thumb { display: block; width: 264px; max-width: 100%; height: auto; aspect-ratio: 16 / 8.4; object-fit: cover; object-position: top center; margin: -10px -12px 8px; width: calc(100% + 24px); max-width: none; }
`;
