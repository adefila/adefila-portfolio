"use client";
import { useEffect, useRef, useState } from "react";
import { Pause, Play } from "lucide-react";
import DeviceStage from "./DeviceStage";

// THE WORK, for projects that are websites: one list of pages and one stage. The chosen page scrolls once from top to bottom
// on the laptop (the phone shows the same page at phone width when there is a capture), then the next page takes over. It
// stops under the pointer, on focus, or with the pause button, and with reduced motion it only changes when picked.
export type WorkItem = {
  id: string;
  name: string;
  note?: string;
  full: { src: string; width: number; height: number };
  mobile?: { src: string };
};

const SCREEN_RATIO = 0.625;
const PX_PER_SECOND = 240;
const HOLD = 3.2;

// How long the page takes to scroll: the distance it travels at a steady speed, within sensible limits.
const isTall = (it: WorkItem) => it.full.height / it.full.width > 0.7;
const scrollSeconds = (it: WorkItem) => {
  if (!isTall(it)) return 1.3;
  const travel = Math.max(0, it.full.height / it.full.width - SCREEN_RATIO) * 780;
  return Math.min(24, Math.max(8, Math.round(travel / PX_PER_SECOND)));
};

const CSS = `
  .ws { display: grid; grid-template-columns: minmax(230px, 0.7fr) minmax(0, 2fr); gap: clamp(24px, 4vw, 56px); align-items: start; margin-top: 48px; }
  .ws-list { order: -1; list-style: none; margin: 0; padding: 0; border-top: 1px solid rgba(var(--ink), 0.14); }
  .ws-row { position: relative; display: grid; grid-template-columns: 34px minmax(0, 1fr); column-gap: 8px; width: 100%; padding: 16px 0 16px 4px; text-align: left; background: none; border: 0; border-bottom: 1px solid rgba(var(--ink), 0.14); color: var(--fg-secondary); cursor: pointer; transition: color 0.2s ease, background 0.2s ease; font: inherit; }
  .ws-row:hover { background: rgba(var(--ink), 0.03); color: var(--fg); }
  .ws-row:focus-visible { outline: 2px solid var(--accent-purple); outline-offset: -2px; }
  .ws-row[aria-selected="true"] { color: var(--fg); }
  .ws-n { padding-top: 4px; font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.02em; color: var(--fg-muted); }
  .ws-row[aria-selected="true"] .ws-n { color: var(--accent-purple); }
  .ws-name { font-family: var(--font-poppins); font-weight: 600; font-size: 18px; letter-spacing: -0.02em; line-height: 1.25; }
  .ws-note { display: block; margin-top: 4px; font-family: var(--font-inter); font-size: 13px; line-height: 1.5; color: var(--fg-secondary); }
  .ws-rail { position: absolute; left: 0; right: 0; bottom: -1px; height: 2px; background: transparent; overflow: hidden; }
  .ws-rail i { display: block; height: 100%; width: 0; background: var(--accent-purple); }
  .ws-row[aria-selected="true"] .ws-rail i { animation: wsFill var(--ws-dur, 12s) linear forwards; }
  .ws.paused .ws-rail i, .ws-stage:hover ~ .ws-list .ws-rail i { animation-play-state: paused; }
  @keyframes wsFill { to { width: 100%; } }
  .ws-stage { min-width: 0; animation: wsIn 0.6s cubic-bezier(0.22, 1, 0.36, 1) both; }
  .ws-bar { display: flex; align-items: center; justify-content: space-between; gap: 12px; margin-top: 14px; font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.02em; text-transform: uppercase; color: var(--fg-muted); }
  .ws-btn { display: inline-flex; align-items: center; gap: 6px; background: none; border: 1px solid rgba(var(--ink), 0.2); color: var(--fg-secondary); font: inherit; letter-spacing: inherit; text-transform: inherit; padding: 5px 10px; cursor: pointer; }
  .ws-btn:hover { color: var(--fg); border-color: rgba(var(--ink), 0.4); }
  .ws-btn:focus-visible { outline: 2px solid var(--accent-purple); outline-offset: 2px; }
  @keyframes wsIn { from { opacity: 0; transform: translateY(10px); } to { opacity: 1; transform: none; } }
  @media (max-width: 900px) { .ws { grid-template-columns: minmax(0, 1fr); } .ws-list { order: 0; } .ws-stage { order: -1; } }
  @media (prefers-reduced-motion: reduce) { .ws-stage { animation: none; } .ws-row[aria-selected="true"] .ws-rail i { animation: none; width: 100%; } .ws-btn { display: none; } }
`;

export default function WorkShowcase({ items, label }: { items: WorkItem[]; label: string }) {
  const [active, setActive] = useState(0);
  const [paused, setPaused] = useState(false);
  const [hover, setHover] = useState(false);
  const reduce = useRef(false);
  const elapsed = useRef(0);
  const started = useRef(0);
  const cur = items[active];
  const seconds = scrollSeconds(cur);
  const total = seconds + HOLD;

  useEffect(() => { reduce.current = window.matchMedia("(prefers-reduced-motion: reduce)").matches; }, []);
  useEffect(() => { elapsed.current = 0; }, [active]);

  // Pausing keeps the time already shown, so the progress line and the timer stay together
  useEffect(() => {
    if (reduce.current || items.length < 2) return;
    if (paused || hover) { elapsed.current += (Date.now() - started.current) / 1000; return; }
    started.current = Date.now();
    const id = window.setTimeout(() => setActive((a) => (a + 1) % items.length), Math.max(400, (total - elapsed.current) * 1000));
    return () => window.clearTimeout(id);
  }, [active, paused, hover, total, items.length]);

  return (
    <div className={`ws${paused ? " paused" : ""}`} style={{ ["--ws-dur" as string]: `${total}s` }}>
      <style>{CSS}</style>
      <div className="ws-stage" key={cur.id} id="ws-panel" role="tabpanel" aria-label={`${cur.name}, ${label}`} onMouseEnter={() => setHover(true)} onMouseLeave={() => setHover(false)}>
        <DeviceStage
          laptop={isTall(cur) ? { src: cur.full.src, alt: `${cur.name} page on a laptop, scrolling from the navigation bar to the footer`, tall: { width: cur.full.width, height: cur.full.height, seconds } } : { src: cur.full.src, alt: `${cur.name}: the opening screen on a laptop, navigation bar included` }}
          phones={cur.mobile ? [{ src: cur.mobile.src, alt: `${cur.name} page on a phone` }] : []}
        />
        <div className="ws-bar">
          <span>{String(active + 1).padStart(2, "0")} / {String(items.length).padStart(2, "0")} · {cur.name}</span>
          <button type="button" className="ws-btn" onClick={() => setPaused((p) => !p)} aria-pressed={paused}>
            {paused ? <Play size={12} /> : <Pause size={12} />} {paused ? "Play" : "Pause"}
          </button>
        </div>
      </div>
      <ol className="ws-list" role="tablist" aria-label={label}>
        {items.map((it, i) => (
          <li key={it.id}>
            <button type="button" role="tab" className="ws-row" aria-selected={i === active} aria-controls="ws-panel" onClick={() => setActive(i)}>
              <span className="ws-n">{String(i + 1).padStart(2, "0")}</span>
              <span>
                <span className="ws-name">{it.name}</span>
                {it.note && <span className="ws-note">{it.note}</span>}
              </span>
              <span className="ws-rail" aria-hidden="true"><i /></span>
            </button>
          </li>
        ))}
      </ol>
    </div>
  );
}
