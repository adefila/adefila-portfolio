"use client";
import { useEffect, useRef, useState } from "react";

// A name in a signature script (the font is loaded in the layout), written on from left to right when it scrolls into view, with a
// hand-drawn underline that follows. With reduced motion it simply sits there. The text is decoration: the name is given to screen readers once.

export default function Signature({ name }: { name: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [written, setWritten] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) { setWritten(true); return; }
    const io = new IntersectionObserver(([e]) => { if (e.isIntersecting) { setWritten(true); io.disconnect(); } }, { threshold: 0.6 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <div ref={ref} className={`sig${written ? " on" : ""}`} role="img" aria-label={`Signature: ${name}`}>
      <style>{`
        .sig { position: relative; display: inline-block; padding: 0 12px 14px 0; }
        .sig-name { display: block; font-family: var(--font-signature), cursive; font-size: clamp(60px, 7.5vw, 96px); line-height: 0.9; color: var(--fg); transform: rotate(-4deg); transform-origin: left bottom; clip-path: inset(-10% 100% -20% 0); white-space: nowrap; }
        .sig.on .sig-name { clip-path: inset(-10% -4% -20% 0); transition: clip-path 2.4s cubic-bezier(0.45, 0.05, 0.25, 1); }
        .sig-line { position: absolute; left: 4%; right: 0; bottom: 4px; width: 88%; height: 18px; overflow: visible; }
        .sig-line path { fill: none; stroke: var(--fg); stroke-width: 1.6; stroke-linecap: round; stroke-dasharray: 1; stroke-dashoffset: 1; }
        .sig.on .sig-line path { stroke-dashoffset: 0; transition: stroke-dashoffset 0.9s cubic-bezier(0.4, 0, 0.2, 1) 2.2s; }
        @media (prefers-reduced-motion: reduce) { .sig-name { clip-path: none; } .sig-line path { stroke-dashoffset: 0; } }
      `}</style>
      <span className="sig-name" aria-hidden="true">{name}</span>
      <svg className="sig-line" viewBox="0 0 300 18" preserveAspectRatio="none" aria-hidden="true">
        <path pathLength={1} d="M2 12 C 60 2, 140 2, 210 8 S 280 12, 298 4" />
      </svg>
    </div>
  );
}
