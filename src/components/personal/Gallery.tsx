"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowLeft2, ArrowRight2, CloseSquare } from "iconsax-react";

// The personal gallery: the photographs lie in one row, each one overlapping the one before it (negative spacing), like a hand of cards.
//  - they rise in one after another when the row comes into view;
//  - hovering (or tabbing to) one brings it to the front and eases the others aside, to the left if they sit before it and to the right if they sit
//    after it (the ones next to it the most), so it opens a gap to be seen. It does not move or zoom itself;
//  - the stack is centred, and its spacing adapts to the width and to how many photos there are, so any number fits one row;
//  - a click or tap opens the photo large on a pale veil, with arrows, the arrow keys and Esc.
// Nothing bounces or flashes (soft springs). With "reduce motion" on, the movement is off.
export type GalleryImage = { src: string; alt: string };

const CSS = `
  .gl-stack { position: relative; width: 100%; }
  .gl-tile { position: absolute; will-change: transform; }
  /* a white mat of 3px with a hairline outside it, so overlapping photos sit on each other like prints */
  .gl-fig { position: relative; width: 100%; height: 100%; margin: 0; overflow: hidden; background: #fff; border: 3px solid #fff; box-shadow: 0 0 0 0.5px #cfcfd8; cursor: zoom-in; }
  .gl-fig:focus-visible { outline: 2px solid var(--accent-purple); outline-offset: 2px; }
  .gl-fig img { object-fit: cover; user-select: none; -webkit-user-drag: none; }
  .gl-pic { position: absolute; inset: 0; }

  .gl-lb { position: fixed; inset: 0; z-index: 9000; display: flex; flex-direction: column; align-items: center; justify-content: center; gap: 18px; padding: 24px; background: rgba(250, 249, 255, 0.9); backdrop-filter: blur(14px); -webkit-backdrop-filter: blur(14px); }
  .gl-lb-fig { position: relative; margin: 0; aspect-ratio: 3 / 4; height: min(72vh, 680px); max-width: 100%; border: 0.5px solid var(--line); background: var(--surface); }
  .gl-lb-fig > span { position: absolute; inset: 0; display: block; }
  .gl-lb-fig img { object-fit: contain; }
  .gl-lb-ui { display: flex; align-items: center; gap: 16px; font-family: var(--font-inter); font-size: 13px; letter-spacing: 0.04em; color: var(--fg-muted); font-variant-numeric: tabular-nums; }
  .gl-btns { display: flex; gap: 6px; }
  .gl-btn { width: 36px; height: 36px; display: inline-flex; align-items: center; justify-content: center; background: #fff; border: 0.5px solid var(--line); color: var(--fg); cursor: pointer; transition: background-color 0.2s ease, color 0.2s ease, border-color 0.2s ease, opacity 0.2s ease; }
  .gl-btn:hover:not(:disabled) { background: #1a1434; color: #fff; border-color: #1a1434; }
  .gl-btn:disabled { opacity: 0.35; cursor: default; }
  .gl-lb-close { position: absolute; top: 18px; right: 18px; }
  @media (max-width: 640px) { .gl-lb { padding: 16px; } .gl-lb-fig { height: min(68vh, 600px); } }
`;

const SHIFT = 44;     // how far the nearest neighbour moves aside; the same room is kept free on both sides of the stack
const OVERLAP = 0.42; // the step between photos, as a share of a photo's width (so each photo is about 40% uncovered)

export default function Gallery({ images }: { images: GalleryImage[] }) {
  const reduced = useReducedMotion();
  const wrap = useRef<HTMLDivElement>(null);
  const seen = useInView(wrap, { once: true, margin: "0px 0px -8% 0px" });
  const [w, setW] = useState(594);
  const [hover, setHover] = useState<number | null>(null);
  const [open, setOpen] = useState<number | null>(null);
  const n = images.length;

  useEffect(() => {
    const el = wrap.current;
    if (!el) return;
    const ro = new ResizeObserver(() => setW(el.clientWidth));
    ro.observe(el);
    setW(el.clientWidth);
    return () => ro.disconnect();
  }, []);

  // The size of a photo follows the width; the step between photos is whatever lets all of them fit the row (never wider than 80% of a photo)
  const tileW = Math.round(Math.min(190, Math.max(112, w * 0.31)));
  const tileH = Math.round((tileW * 4) / 3);
  const step = n > 1 ? Math.min(tileW * OVERLAP, (w - 2 * SHIFT - tileW) / (n - 1)) : 0;
  const left0 = Math.max(SHIFT, (w - (tileW + (n - 1) * step)) / 2);

  const onMove = (e: React.MouseEvent<HTMLDivElement>) => {
    if (n < 2) return;
    const x = e.clientX - e.currentTarget.getBoundingClientRect().left;
    const total = tileW + (n - 1) * step;
    if (x < left0 - 6 || x > left0 + total + 6) { if (hover !== null) setHover(null); return; }
    // every photo owns one slice of the resting stack, so moving the pointer along the row steps through the photos one by one
    const idx = Math.max(0, Math.min(n - 1, Math.floor((x - left0) / step)));
    if (idx !== hover) setHover(idx);
  };

  const offset = (i: number) => {
    if (hover === null || reduced || i === hover) return 0;
    const d = Math.abs(i - hover);
    const fall = 1 / (1 + (d - 1) * 0.7); // the nearest move most, the rest less
    return (i > hover ? 1 : -1) * SHIFT * fall;
  };

  // The large view
  useEffect(() => {
    if (open === null) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(null);
      else if (e.key === "ArrowRight") setOpen((i) => (i === null ? i : Math.min(n - 1, i + 1)));
      else if (e.key === "ArrowLeft") setOpen((i) => (i === null ? i : Math.max(0, i - 1)));
    };
    document.addEventListener("keydown", onKey);
    return () => { document.body.style.overflow = prev; document.removeEventListener("keydown", onKey); };
  }, [open, n]);

  return (
    <div className="gl">
      <style>{CSS}</style>
      <div ref={wrap} className="gl-stack" role="list" aria-label="Photographs" style={{ height: tileH + 4 }} onMouseMove={onMove} onMouseLeave={() => setHover(null)}>
        {images.map((g, i) => (
          <motion.div
            key={g.src}
            role="listitem"
            className="gl-tile"
            style={{ left: left0 + i * step, top: 2, width: tileW, height: tileH, zIndex: hover === i ? n + 1 : i + 1 }}
            initial={reduced ? false : { opacity: 0, y: 18 }}
            animate={seen || reduced ? { opacity: 1, y: 0 } : { opacity: 0, y: 18 }}
            transition={{ duration: 0.7, delay: i * 0.08, ease: [0.2, 0.7, 0.2, 1] }}
          >
            <motion.div
              style={{ width: "100%", height: "100%" }}
              animate={{ x: offset(i) }}
              transition={{ type: "spring", stiffness: 170, damping: 28, mass: 0.9 }}
            >
              <figure
                className="gl-fig"
                tabIndex={0}
                onFocus={() => setHover(i)}
                onBlur={() => setHover(null)}
                onClick={() => setOpen(i)}
                onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); setOpen(i); } }}
                aria-label={`Open photo ${i + 1} of ${n}: ${g.alt}`}
              >
                <span className="gl-pic"><Image src={g.src} alt={g.alt} fill sizes="200px" draggable={false} /></span>
              </figure>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {open !== null && (
          <motion.div
            className="gl-lb"
            role="dialog"
            aria-modal="true"
            aria-label="Photo"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3, ease: "easeOut" }}
            onClick={(e) => { if (e.target === e.currentTarget) setOpen(null); }}
          >
            <button type="button" className="gl-btn gl-lb-close" onClick={() => setOpen(null)} aria-label="Close"><CloseSquare size={16} variant="Broken" color="currentColor" /></button>
            <AnimatePresence mode="wait" initial={false}>
              <motion.figure
                key={open}
                className="gl-lb-fig"
                initial={reduced ? false : { opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, transition: { duration: 0.14 } }}
                transition={{ duration: 0.4, ease: [0.2, 0.7, 0.2, 1] }}
              >
                <span><Image src={images[open].src} alt={images[open].alt} fill sizes="(max-width: 640px) 92vw, 520px" priority /></span>
              </motion.figure>
            </AnimatePresence>
            <div className="gl-lb-ui">
              <div className="gl-btns">
                <button type="button" className="gl-btn" onClick={() => setOpen((i) => (i === null ? i : Math.max(0, i - 1)))} disabled={open === 0} aria-label="Previous photo"><ArrowLeft2 size={16} variant="Broken" color="currentColor" /></button>
                <button type="button" className="gl-btn" onClick={() => setOpen((i) => (i === null ? i : Math.min(n - 1, i + 1)))} disabled={open === n - 1} aria-label="Next photo"><ArrowRight2 size={16} variant="Broken" color="currentColor" /></button>
              </div>
              <span>{open + 1} / {n}</span>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
