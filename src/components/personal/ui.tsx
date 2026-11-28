"use client";
import { useId, useState } from "react";
import type { ReactNode } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowDown2, ArrowUp3 } from "iconsax-react";

// Small pieces shared by the personal site: a block that settles in as it enters the screen, a button whose label rolls on hover,
// and an index list where a dot glides to the row you are on while the other rows step back. All motion is springs from
// framer-motion, so it eases in and out instead of snapping. Icons are the "Broken" style of the Iconsax set.
const EASE = [0.2, 0.7, 0.2, 1] as const;

export function Reveal({ children, delay = 0, id, className }: { children: ReactNode; delay?: number; id?: string; className?: string }) {
  return (
    <motion.div
      id={id}
      className={className}
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "0px 0px -8% 0px" }}
      transition={{ duration: 0.7, ease: EASE, delay }}
    >
      {children}
    </motion.div>
  );
}

// A button or link whose label rolls up and is replaced by a second copy from below; the icon drifts a little. Nothing grows or throws a shadow.
export function Btn({ href, label, icon, primary, download, external }: { href: string; label: string; icon: ReactNode; primary?: boolean; download?: boolean; external?: boolean }) {
  const on = false; // the rolling label on hover is switched off for now
  const spring = { type: "spring" as const, stiffness: 420, damping: 36 };
  return (
    <motion.a
      href={href}
      {...(download ? { download: true } : {})}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      className={`pp-btn ${primary ? "btn-primary" : "pp-sec"}`}
      whileTap={{ scale: 0.98 }}
    >
      <span className="pp-roll">
        <motion.span animate={{ y: on ? "-110%" : "0%" }} transition={spring}>{label}</motion.span>
        <motion.span className="pp-roll-b" aria-hidden="true" animate={{ y: on ? "0%" : "110%" }} transition={spring}>{label}</motion.span>
      </span>
      <motion.span className="pp-ico" animate={{ x: on ? 3 : 0 }} transition={spring}>{icon}</motion.span>
    </motion.a>
  );
}

export type Detail = {
  facts?: [string, string][];
  brief: string;
  did: string;
  constraint?: string;
  steps?: { title: string; lead?: string }[];
  decisions?: { title: string; body: string }[];
  result: string;
  metrics?: string[];
  quote?: { text: string; by: string; role: string };
  closing?: string;
  links?: { label: string; href: string; external?: boolean }[];
};
export type Row = { key: string; title: string; note?: string; right?: string; href?: string; external?: boolean; detail?: Detail; badge?: string };

export function IndexList({ rows }: { rows: Row[] }) {
  const [active, setActive] = useState<string | null>(null);
  const [open, setOpen] = useState<string | null>(null);
  const dot = useId();
  return (
    <ul className="pp-list" onMouseLeave={() => setActive(null)}>
      {rows.map((r) => {
        const on = active === r.key;
        const isOpen = open === r.key;
        const inner = (
          <>
            <span className="pp-t">
              {r.title}
              {r.note && <em>{r.note}</em>}
              {r.badge && <b className="pp-badge">{r.badge}</b>}
              {r.href && (
                <motion.span className="pp-go" aria-hidden="true" initial={false} animate={{ opacity: on ? 1 : 0, x: on ? 0 : -6, y: on ? 0 : 4 }} transition={{ type: "spring", stiffness: 380, damping: 30 }}>
                  <ArrowUp3 size={14} variant="Broken" color="currentColor" style={{ transform: "rotate(45deg)" }} />
                </motion.span>
              )}
            </span>
            <span className="pp-d" style={{ color: on || isOpen ? "var(--fg)" : undefined }}>
              {r.right}
              {!r.detail && <span className="pp-chev pp-chev-empty" aria-hidden="true" />}
              {r.detail && (
                <motion.span className="pp-chev" aria-hidden="true" animate={{ rotate: isOpen ? 180 : 0 }} transition={{ type: "spring", stiffness: 360, damping: 28 }}>
                  <ArrowDown2 size={14} variant="Broken" color="currentColor" />
                </motion.span>
              )}
            </span>
          </>
        );
        return (
          <motion.li key={r.key} onHoverStart={() => setActive(r.key)} onFocus={() => setActive(r.key)} animate={{ opacity: active === null || on || isOpen ? 1 : 0.38 }} transition={{ duration: 0.3, ease: "easeOut" }}>
            {on && <motion.span layoutId={dot} className="pp-dot" aria-hidden="true" transition={{ type: "spring", stiffness: 500, damping: 38 }} />}
            {r.detail ? (
              <button type="button" className="pp-row pp-rowbtn" aria-expanded={isOpen} onClick={() => setOpen(isOpen ? null : r.key)}>{inner}</button>
            ) : r.href ? (
              <a className="pp-row" href={r.href} {...(r.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{inner}</a>
            ) : (
              <span className="pp-row">{inner}</span>
            )}
            <AnimatePresence initial={false}>
              {r.detail && isOpen && (
                <motion.div
                  className="pp-detail"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ height: { type: "spring", stiffness: 260, damping: 32 }, opacity: { duration: 0.25 } }}
                >
                  <div className="pp-detail-in">
                    {r.detail.facts && (
                      <dl className="pp-facts">
                        {r.detail.facts.map(([k, v]) => <div key={k}><dt>{k}</dt><dd>{v}</dd></div>)}
                      </dl>
                    )}
                    <div><h4>The brief</h4><p>{r.detail.brief}</p></div>
                    <div><h4>What I did</h4><p>{r.detail.did}</p>{r.detail.constraint && <p className="pp-sub">{r.detail.constraint}</p>}</div>
                    {r.detail.steps && (
                      <div>
                        <h4>The process</h4>
                        <ol className="pp-steps">
                          {r.detail.steps.map((st) => <li key={st.title}><b>{st.title}</b>{st.lead && <span> {st.lead}</span>}</li>)}
                        </ol>
                      </div>
                    )}
                    {r.detail.decisions && (
                      <div>
                        <h4>Decisions that mattered</h4>
                        <ul className="pp-steps">
                          {r.detail.decisions.map((d) => <li key={d.title}><b>{d.title}</b><span> {d.body}</span></li>)}
                        </ul>
                      </div>
                    )}
                    <div>
                      <h4>The result</h4>
                      <p>{r.detail.result}</p>
                      {r.detail.metrics && <p className="pp-metrics">{r.detail.metrics.map((m) => <span key={m}>{m}</span>)}</p>}
                      {r.detail.closing && <p className="pp-sub">{r.detail.closing}</p>}
                    </div>
                    {r.detail.quote && (
                      <blockquote className="pp-quote-in">
                        <p>&ldquo;{r.detail.quote.text}&rdquo;</p>
                        <cite>{r.detail.quote.by}, {r.detail.quote.role}</cite>
                      </blockquote>
                    )}
                  </div>
                  {r.detail.links && (
                    <p className="pp-detail-links">
                      {r.detail.links.map((l) => (
                        <a key={l.href} className="pp-link" href={l.href} {...(l.external ? { target: "_blank", rel: "noopener noreferrer" } : {})}>{l.label}</a>
                      ))}
                    </p>
                  )}
                </motion.div>
              )}
            </AnimatePresence>
          </motion.li>
        );
      })}
    </ul>
  );
}

export const PP_CSS = `
  .pp-btn { display: inline-flex; align-items: center; gap: 10px; padding: 13px 22px; font-family: var(--font-inter); font-weight: 600; font-size: 13px; line-height: 1; text-decoration: none; letter-spacing: 0.06em; }
  .pp-sec { color: var(--fg); background: transparent; border: 0.5px solid var(--line); transition: border-color 0.3s ease; }
  .pp-sec:hover, .pp-sec:focus-visible { border-color: var(--fg); }
  .pp-roll { position: relative; display: inline-block; overflow: hidden; line-height: 1.25; }
  .pp-roll-b { position: absolute; left: 0; top: 0; }
  .pp-ico { display: inline-flex; }

  .pp-list { list-style: none; margin: 0; padding: 0; }
  .pp-list li { position: relative; }
  .pp-dot { position: absolute; left: -16px; top: 50%; width: 5px; height: 5px; margin-top: -2.5px; border-radius: 50%; background: var(--accent-purple); }
  .pp-row { display: grid; grid-template-columns: minmax(0, 1fr) auto; gap: 16px; align-items: baseline; padding: 7px 0; font-family: var(--font-inter); font-size: 16px; line-height: 1.45; letter-spacing: -0.15px; color: var(--fg); text-decoration: none; }
  .pp-t { display: inline-flex; align-items: baseline; gap: 8px; min-width: 0; flex-wrap: wrap; }
  .pp-t em { font-style: normal; color: var(--fg-muted); }
  .pp-go { display: inline-flex; align-self: center; color: var(--accent-purple); }
  .pp-rowbtn { width: 100%; padding-left: 0; padding-right: 0; border: 0; background: none; text-align: left; cursor: pointer; }
  .pp-badge { font-family: var(--font-inter); font-weight: 500; font-size: 14px; font-style: normal; color: var(--accent-purple); }
  .pp-chev { position: absolute; right: -24px; top: 50%; margin-top: -7px; display: inline-flex; width: 14px; height: 14px; }
  .pp-detail { overflow: hidden; }
  .pp-detail-in { margin: 6px 0 0; padding: 8px 0 4px; display: grid; gap: 22px; }
  .pp-detail-in h4 { font-family: var(--font-inter); font-weight: 500; font-size: 12px; color: var(--fg-muted); }
  .pp-detail-in p { margin-top: 4px; font-family: var(--font-inter); font-size: 15px; line-height: 1.65; letter-spacing: -0.15px; color: var(--fg-secondary); }
  .pp-detail-in p.pp-sub { margin-top: 8px; color: var(--fg-muted); }
  .pp-facts { margin: 0; display: grid; grid-template-columns: repeat(auto-fit, minmax(120px, 1fr)); gap: 12px 20px; }
  .pp-facts dt { font-family: var(--font-inter); font-size: 12px; color: var(--fg-muted); }
  .pp-facts dd { margin: 2px 0 0; font-family: var(--font-inter); font-size: 14px; line-height: 1.4; color: var(--fg); }
  .pp-steps { list-style: none; margin: 6px 0 0; padding: 0; display: grid; gap: 8px; }
  .pp-steps li { font-family: var(--font-inter); font-size: 15px; line-height: 1.6; letter-spacing: -0.15px; color: var(--fg-secondary); }
  .pp-steps b { font-weight: 500; color: var(--fg); }
  .pp-metrics { display: flex; flex-wrap: wrap; gap: 6px 20px; }
  .pp-metrics span { font-family: var(--font-poppins); font-size: 17px; letter-spacing: -0.02em; color: var(--fg); }
  .pp-quote-in { margin: 0; padding-left: 16px; border-left: 2px solid var(--accent-purple); }
  .pp-quote-in p { margin: 0; font-family: var(--font-poppins); font-size: 17px; line-height: 1.45; letter-spacing: -0.02em; color: var(--fg); }
  .pp-quote-in cite { display: block; margin-top: 8px; font-style: normal; font-family: var(--font-inter); font-size: 13px; color: var(--fg-muted); }
  .pp-detail-links { display: flex; flex-wrap: wrap; gap: 6px 22px; margin: 14px 0 12px; font-family: var(--font-inter); font-size: 14px; }
  .pp-d { position: relative; font-size: 14px; color: var(--fg-muted); font-variant-numeric: tabular-nums; white-space: nowrap; }
  .pp-chev-empty { display: none; }
  @media (max-width: 640px) {
    .pp-dot { display: none; }
    .pp-row { gap: 10px; font-size: 15px; }
    .pp-t { flex-wrap: wrap; gap: 2px 8px; overflow-wrap: anywhere; }
    .pp-d { display: inline-flex; align-items: center; font-size: 13px; }
    .pp-chev { position: static; margin: 0 0 0 6px; flex: none; }
    .pp-chev-empty { display: inline-flex; }
  }
`;
