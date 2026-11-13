"use client";
import { useCallback, useEffect, useRef, useState } from "react";
import Image from "next/image";
import { motion, useReducedMotion } from "framer-motion";

// The hero picture for the job-search page: four of Samuel's app designs that take turns. Each new one wipes up over the
// last while it settles from a slight zoom, one easing curve for everything. It pauses while the pointer or keyboard
// focus is on it, the thin rail shows how long until the next one, and with reduced motion it only changes when picked.
const SLIDES = [
  { src: "/hero/design-1.webp", label: "Wallet app", alt: "A crypto wallet app in light and dark mode: balance, assets and transactions" },
  { src: "/hero/design-2.webp", label: "News app", alt: "A news app: trending stories and a reading view" },
  { src: "/hero/design-3.webp", label: "Laundry orders app", alt: "A laundry orders app: account settings and a payment checkout" },
  { src: "/hero/design-4.webp", label: "Coffee ordering app", alt: "A coffee ordering app welcome screen" },
];
const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];
const HOLD_MS = 5200;

const CSS = `
  .hs { position: relative; width: 100%; }
  .hs-box { position: relative; aspect-ratio: 1 / 1; overflow: hidden; background: var(--surface); border: 1px solid rgba(var(--ink), 0.2); }
  .hs-layer { position: absolute; inset: 0; }
  .hs-rail { display: grid; grid-template-columns: repeat(4, 1fr); gap: 6px; margin-top: 14px; }
  .hs-seg { position: relative; height: 18px; padding: 0; background: none; border: 0; cursor: pointer; }
  .hs-seg::before { content: ""; position: absolute; left: 0; right: 0; top: 8px; height: 2px; background: rgba(var(--ink), 0.16); }
  .hs-seg i { position: absolute; left: 0; top: 8px; height: 2px; width: 0; background: var(--accent-purple); }
  .hs-seg.done i { width: 100%; }
  .hs-seg.on i { animation: hsFill ${HOLD_MS}ms linear forwards; }
  .hs.paused .hs-seg.on i { animation-play-state: paused; }
  .hs-seg:focus-visible { outline: 2px solid var(--accent-purple); outline-offset: 2px; }
  .hs-cap { margin-top: 4px; display: flex; justify-content: space-between; gap: 12px; font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.08em; text-transform: uppercase; color: var(--fg-muted); }
  .hs-cap b { font-weight: 400; color: var(--fg-secondary); }
  @keyframes hsFill { to { width: 100%; } }
  @media (prefers-reduced-motion: reduce) { .hs-seg.on i { animation: none; width: 100%; } }
`;

export default function HeroShowcase() {
  const reduce = useReducedMotion();
  const [cur, setCur] = useState(0);
  const [prev, setPrev] = useState<number | null>(null);
  const [paused, setPaused] = useState(false);
  const curRef = useRef(0);
  const startRef = useRef(0);
  const elapsedRef = useRef(0);

  const go = useCallback((i: number) => {
    if (i === curRef.current) return;
    setPrev(curRef.current);
    curRef.current = i;
    elapsedRef.current = 0;
    setCur(i);
  }, []);

  useEffect(() => {
    if (reduce) return;
    // Pausing keeps what was already shown, so the rail and the timer stay together
    if (paused) { elapsedRef.current += Date.now() - startRef.current; return; }
    startRef.current = Date.now();
    const id = window.setTimeout(() => go((cur + 1) % SLIDES.length), Math.max(400, HOLD_MS - elapsedRef.current));
    return () => window.clearTimeout(id);
  }, [cur, paused, reduce, go]);

  return (
    <div
      className={`hs${paused ? " paused" : ""}`}
      onMouseEnter={() => setPaused(true)}
      onMouseLeave={() => setPaused(false)}
      onFocus={() => setPaused(true)}
      onBlur={() => setPaused(false)}
    >
      <style>{CSS}</style>
      <div className="hs-box hero-scan" role="img" aria-label={SLIDES[cur].alt}>
        {prev !== null && (
          <div key={`p${prev}`} className="hs-layer" style={{ zIndex: 1 }}>
            <Image src={SLIDES[prev].src} alt="" fill sizes="(max-width: 768px) 90vw, 400px" style={{ objectFit: "cover" }} />
          </div>
        )}
        <motion.div
          key={`c${cur}`}
          className="hs-layer"
          style={{ zIndex: 2 }}
          initial={prev === null || reduce ? false : { clipPath: "inset(100% 0% 0% 0%)" }}
          animate={{ clipPath: "inset(0% 0% 0% 0%)" }}
          transition={{ duration: reduce ? 0 : 0.95, ease: EASE }}
          onAnimationComplete={() => setPrev(null)}
        >
          <motion.div
            style={{ position: "absolute", inset: 0 }}
            initial={prev === null || reduce ? false : { scale: 1.14 }}
            animate={{ scale: 1 }}
            transition={{ duration: reduce ? 0 : 1.4, ease: EASE }}
          >
            <Image src={SLIDES[cur].src} alt="" fill priority={cur === 0} loading={cur === 0 ? "eager" : undefined} sizes="(max-width: 768px) 90vw, 400px" style={{ objectFit: "cover" }} />
          </motion.div>
        </motion.div>
      </div>

      <div className="hs-rail" role="tablist" aria-label="App designs">
        {SLIDES.map((s, i) => (
          <button key={s.label} type="button" role="tab" aria-selected={cur === i} aria-label={s.label} className={`hs-seg${cur === i ? " on" : i < cur ? " done" : ""}`} onClick={() => go(i)}>
            <i key={cur} />
          </button>
        ))}
      </div>
      <p className="hs-cap"><span>Fig. 0{cur + 1} / 04</span><b>{SLIDES[cur].label}</b></p>
    </div>
  );
}
