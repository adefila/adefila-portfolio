"use client";
import { motion } from "framer-motion";
import SpecLabel from "@/components/SpecLabel";

// Who the business site is for: three cards. Two sit on the purple mosaic (different crops of the same painting as the hero) and one on a
// slowly moving purple gradient, so the row feels alive without any of it asking for attention.
const CARDS: { tag: string; title: string; text: string; bg: "mosaic-a" | "gradient" | "mosaic-b" }[] = [
  { tag: "SaaS and software teams", title: "You sell a product that needs explaining.", text: "A site that makes the product clear and turns visitors into demo requests.", bg: "mosaic-a" },
  { tag: "Service firms and agencies", title: "Your work is better than your website.", text: "A credible site that wins enquiries, with forms you can track from first click.", bg: "gradient" },
  { tag: "Founders and startups", title: "You need to launch, or relaunch, fast.", text: "A fixed-price site live in days or weeks, with a CMS your team runs on its own.", bg: "mosaic-b" },
];

const CSS = `
  .wf { width: 100%; padding: 80px 20px; background: var(--bg); }
  .wf-in { max-width: 1160px; margin: 0 auto; }
  .wf-h { font-family: var(--font-poppins); font-weight: 400; font-size: clamp(28px, 3.5vw, 48px); letter-spacing: -0.03em; line-height: 1.05; color: var(--fg); margin-bottom: 36px; }
  .wf-grid { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); gap: 12px; }
  .wf-card { position: relative; overflow: hidden; min-height: 440px; padding: 28px; display: flex; flex-direction: column; justify-content: space-between; color: #fff; background: #1c0f3f; isolation: isolate; }
  .wf-bg { position: absolute; inset: -4%; z-index: -2; background-size: cover; background-position: center; animation: wfDrift 22s ease-in-out infinite alternate; }
  .wf-card.mosaic-a .wf-bg { background-image: url("/hero/mosaic-a.webp"); }
  .wf-card.mosaic-b .wf-bg { background-image: url("/hero/mosaic-b.webp"); animation-delay: -9s; }
  .wf-card.gradient .wf-bg { inset: 0; background: linear-gradient(125deg, #2a2450 0%, #4a3c8a 24%, #6f5fc4 48%, #a597ec 64%, #5a4caa 84%, #2a2450 100%); background-size: 300% 300%; animation: wfFlow 14s ease-in-out infinite; }
  .wf-card::after { content: ""; position: absolute; inset: 0; z-index: -1; background: linear-gradient(to bottom, rgba(18, 14, 40, 0.05), rgba(18, 14, 40, 0.5)); }
  .wf-tag { display: inline-flex; align-items: center; gap: 10px; font-family: var(--font-inter); font-weight: 500; font-size: 10.5px; letter-spacing: 0.14em; text-transform: uppercase; color: rgba(255, 255, 255, 0.82); }
  .wf-tag::before { content: ""; width: 7px; height: 7px; border-radius: 2px; background: #fff; animation: wfTile 3.2s ease-in-out infinite; }
  .wf-card:nth-child(2) .wf-tag::before { animation-delay: -1s; }
  .wf-card:nth-child(3) .wf-tag::before { animation-delay: -2s; }
  @keyframes wfTile { 0%, 100% { opacity: 0.35; transform: rotate(0deg) scale(0.9); } 50% { opacity: 1; transform: rotate(45deg) scale(1.15); } }
  .wf-t { margin-top: 12px; font-family: var(--font-poppins); font-weight: 400; font-size: clamp(22px, 2.2vw, 28px); line-height: 1.15; letter-spacing: -0.03em; color: #fff; }
  .wf-p { margin-top: 12px; font-family: var(--font-inter); font-size: 15px; line-height: 1.6; letter-spacing: -0.1px; color: rgba(255, 255, 255, 0.82); }
  @keyframes wfDrift { from { transform: scale(1.04) translate3d(-1.5%, 0, 0); } to { transform: scale(1.12) translate3d(1.5%, -1%, 0); } }
  @keyframes wfFlow { 0% { background-position: 0% 50%; } 50% { background-position: 100% 50%; } 100% { background-position: 0% 50%; } }
  @media (max-width: 900px) { .wf-grid { display: flex; overflow-x: auto; overflow-y: hidden; scroll-snap-type: x mandatory; scrollbar-width: none; overscroll-behavior-x: contain; margin: 0 -20px; padding: 0 20px; scroll-padding: 0 20px; } .wf-grid::-webkit-scrollbar { display: none; } .wf-card { flex: 0 0 82%; min-height: 380px; scroll-snap-align: start; } }
  @media (prefers-reduced-motion: reduce) { .wf-bg, .wf-tag::before { animation: none; } }
`;

export default function WhoFor() {
  return (
    <section id="for" className="wf">
      <style>{CSS}</style>
      <div className="wf-in">
        <SpecLabel text="Who it's for" />
        <h2 data-reveal className="wf-h">Built for teams that sell to businesses.</h2>
        <div className="wf-grid">
          {CARDS.map((c, i) => (
            <motion.article
              key={c.tag}
              className={`wf-card ${c.bg}`}
              initial={{ opacity: 0, y: 24 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "0px 0px -10% 0px" }}
              transition={{ duration: 0.7, delay: i * 0.12, ease: [0.2, 0.7, 0.2, 1] }}
            >
              <div className="wf-bg" aria-hidden="true" />
              <p className="wf-tag">{c.tag}</p>
              <div>
                <h3 className="wf-t">{c.title}</h3>
                <p className="wf-p">{c.text}</p>
              </div>
            </motion.article>
          ))}
        </div>
      </div>
    </section>
  );
}
