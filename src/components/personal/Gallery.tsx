"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion, MotionValue, useMotionValue, useReducedMotion, useScroll, useSpring, useTransform } from "framer-motion";
import { ArrowLeft2, ArrowRight2, CloseSquare } from "iconsax-react";

// The personal gallery: a calm grid that arrives with the page.
//  - the photographs start as one small fanned stack and, as you scroll the gallery into view, spread out into their places in the grid
//    (the movement follows your scroll, so it is as slow or as fast as you are, and it works the same on a phone);
//  - once spread, hovering one softens the others a little. Nothing moves, lifts or zooms under the cursor;
//  - the grid adapts to the width and to how many photos there are: four across on desktop, three on a phone, any number of rows;
//  - a click or tap opens the photo large on a pale veil, with arrows, the arrow keys and Esc.
// With "reduce motion" on, the photos simply sit in the grid.
export type GalleryImage = { src: string; alt: string };

const CSS = `
  .gl-grid { position: relative; width: 100%; }
  .gl-tile { position: absolute; left: 0; top: 0; will-change: transform; }
  /* a white mat of 3px with a hairline outside it, so photos that start overlapped sit on each other like prints */
  .gl-fig { position: relative; width: 100%; height: 100%; margin: 0; overflow: hidden; background: #fff; border: 3px solid #fff; box-shadow: 0 0 0 0.5px #cfcfd8; cursor: zoom-in; transition: opacity 0.4s ease; }
  .gl-grid:hover .gl-fig { opacity: 0.62; }
  .gl-grid:hover .gl-fig:hover, .gl-grid:hover .gl-fig:focus-visible { opacity: 1; }
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

const GAP = 12;

// One photograph: it travels from its place in the stack to its place in the grid as the shared progress goes from 0 to 1
function Tile({ i, n, g, p, w, tileW, tileH, cols, onOpen }: {
  i: number; n: number; g: GalleryImage; p: MotionValue<number>; w: number; tileW: number; tileH: number; cols: number; onOpen: () => void;
}) {
  const mid = (n - 1) / 2;
  const fx = (i % cols) * (tileW + GAP);
  const fy = Math.floor(i / cols) * (tileH + GAP);
  const x = useTransform(p, [0, 1], [(w - tileW) / 2 + (i - mid) * 7, fx]);
  const y = useTransform(p, [0, 1], [0, fy]);
  const rotate = useTransform(p, [0, 1], [(i - mid) * 2.6, 0]);
  return (
    <motion.div className="gl-tile" role="listitem" style={{ x, y, rotate, width: tileW, height: tileH, zIndex: i + 1 }}>
      <figure
        className="gl-fig"
        tabIndex={0}
        onClick={onOpen}
        onKeyDown={(e) => { if (e.key === "Enter" || e.key === " ") { e.preventDefault(); onOpen(); } }}
        aria-label={`Open photo ${i + 1} of ${n}: ${g.alt}`}
      >
        <span className="gl-pic"><Image src={g.src} alt={g.alt} fill sizes="(max-width: 640px) 33vw, 160px" draggable={false} /></span>
      </figure>
    </motion.div>
  );
}

export default function Gallery({ images }: { images: GalleryImage[] }) {
  const reduced = useReducedMotion();
  const wrap = useRef<HTMLDivElement>(null);
  const [w, setW] = useState(594);
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

  // Progress of the spread: 0 while the gallery is still low on the screen, 1 once it has come up to the middle of it. The spring takes the edges off the scroll.
  const { scrollYProgress } = useScroll({ target: wrap, offset: ["start 90%", "start 40%"] });
  const spring = useSpring(scrollYProgress, { stiffness: 110, damping: 26, mass: 0.6 });
  const done = useMotionValue(1);
  const p = reduced ? done : spring;

  const cols = w < 480 ? 3 : 4;
  const tileW = Math.floor((w - GAP * (cols - 1)) / cols);
  const tileH = Math.round((tileW * 4) / 3);
  const rows = Math.ceil(n / cols);
  const height = rows * tileH + (rows - 1) * GAP + 4;

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
      <div ref={wrap} className="gl-grid" role="list" aria-label="Photographs" style={{ height }}>
        {images.map((g, i) => (
          <Tile key={g.src} i={i} n={n} g={g} p={p} w={w} tileW={tileW} tileH={tileH} cols={cols} onOpen={() => setOpen(i)} />
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
