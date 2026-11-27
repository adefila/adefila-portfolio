"use client";
import Image from "next/image";
import { motion } from "framer-motion";
import { ArrowUp3 } from "iconsax-react";

// Project cards: a desktop capture of the live site, with the title set over a progressive blur at the foot of the picture.
// Eight blur layers, each stronger than the last and each revealed a little lower, so the softening has no visible steps; the layers
// are wider than the card (and clipped by it) so no halo shows at the edges. Under the blur sits a dark tint on an eased curve,
// which keeps white type readable on any site, light or dark.
export type Card = { key: string; title: string; note?: string; year?: string; image?: string; bg?: string; href?: string; external?: boolean };

const BLURS = [0.4, 0.9, 1.8, 3.2, 5, 7.5, 10.5, 14];
const layerStyle = (i: number) => {
  const n = BLURS.length;
  const step = 100 / (n + 1);
  const a = i * step, b = (i + 1) * step, c = (i + 2) * step, d = (i + 3) * step;
  const mask = i === n - 1
    ? `linear-gradient(to bottom, transparent ${a}%, #000 ${b}%)`
    : `linear-gradient(to bottom, transparent ${a}%, #000 ${b}%, #000 ${c}%, transparent ${d}%)`;
  const blur = `blur(${BLURS[i]}px)`;
  return { backdropFilter: blur, WebkitBackdropFilter: blur, maskImage: mask, WebkitMaskImage: mask } as React.CSSProperties;
};

// an eased tint: slow start, steeper middle, then a firm base for the type
const TINT = "linear-gradient(to bottom, rgba(10,10,14,0) 0%, rgba(10,10,14,0.03) 12%, rgba(10,10,14,0.1) 26%, rgba(10,10,14,0.24) 42%, rgba(10,10,14,0.42) 60%, rgba(10,10,14,0.6) 80%, rgba(10,10,14,0.7) 100%)";

const CSS = `
  .pc-list { list-style: none; margin: 0; padding: 0; display: grid; gap: 20px; }
  .pc-card { position: relative; display: block; aspect-ratio: 16 / 10; overflow: hidden; background: var(--surface); text-decoration: none; color: #fff; isolation: isolate; }
  .pc-img { position: absolute; inset: 0; transition: opacity 0.35s ease; }
  .pc-list:hover .pc-card:not(:hover) .pc-img { opacity: 0.6; }
  .pc-foot { position: absolute; left: 0; right: 0; bottom: 0; height: 52%; pointer-events: none; }
  .pc-blur { position: absolute; top: 0; bottom: 0; left: -40px; right: -40px; }
  .pc-blur i { position: absolute; inset: 0; }
  .pc-tint { position: absolute; inset: 0; background: ${TINT}; }
  .pc-text { position: absolute; left: 26px; right: 26px; bottom: 22px; display: flex; align-items: flex-end; justify-content: space-between; gap: 16px; }
  .pc-title { font-family: var(--font-poppins); font-weight: 500; font-size: clamp(20px, 2.1vw, 26px); line-height: 1.15; letter-spacing: -0.025em; color: #fff; }
  .pc-meta { margin-top: 5px; font-family: var(--font-inter); font-size: 14px; letter-spacing: -0.1px; color: rgba(255, 255, 255, 0.78); }
  .pc-go { display: inline-flex; color: #fff; }
  @media (max-width: 640px) { .pc-card { aspect-ratio: 4 / 3; } .pc-text { left: 18px; right: 18px; bottom: 16px; } }
`;

export default function ProjectCards({ cards }: { cards: Card[] }) {
  return (
    <ul className="pc-list">
      <style>{CSS}</style>
      {cards.map((c) => {
        const body = (
          <>
            <div className="pc-img" style={{ background: c.bg }}>
              {c.image && <Image src={c.image} alt={`${c.title} website, ${c.note ?? "client project"}`} fill sizes="(max-width: 760px) 92vw, 580px" quality={82} style={{ objectFit: "cover", objectPosition: "top center" }} />}
            </div>
            <div className="pc-foot" aria-hidden="true">
              <div className="pc-blur">{BLURS.map((_, i) => <i key={i} style={layerStyle(i)} />)}</div>
              <div className="pc-tint" />
            </div>
            <div className="pc-text">
              <div>
                <p className="pc-title">{c.title}</p>
                <p className="pc-meta">{[c.note, c.year].filter(Boolean).join(" · ")}</p>
              </div>
              {c.href && (
                <motion.span className="pc-go" aria-hidden="true" initial={{ opacity: 0.55, x: 0, y: 0 }} whileHover={{ opacity: 1, x: 2, y: -2 }} transition={{ type: "spring", stiffness: 400, damping: 28 }}>
                  <ArrowUp3 size={20} variant="Broken" color="currentColor" style={{ transform: "rotate(45deg)" }} />
                </motion.span>
              )}
            </div>
          </>
        );
        return (
          <li key={c.key}>
            {c.href ? (
              <a className="pc-card" href={c.href} {...(c.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{body}</a>
            ) : (
              <div className="pc-card">{body}</div>
            )}
          </li>
        );
      })}
    </ul>
  );
}
