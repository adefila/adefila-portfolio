"use client";
import { useEffect, useLayoutEffect, useRef, useState } from "react";
import { useBurn } from "@/components/useBurn";
import { animate, motion, useInView, useReducedMotion } from "framer-motion";
import { ArrowDown, CalendarDays } from "lucide-react";
import MagneticButton from "./MagneticButton";
import { useLang } from "@/context/LangContext";
import { BOOKING_URL } from "@/lib/booking";

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

// Cycles the last word of the headline. The box around the word is exactly as wide as the word in view and eases to the next word's
// width as it changes, so a short word never leaves a gap beside it and the centred line stays centred. The word burns away into small
// pieces that scatter, and the next one re-forms in its place.
export function RotatingWord({ words }: { words: string[] }) {
  const [index, setIndex] = useState(0);
  const [width, setWidth] = useState<number | undefined>(undefined);
  const reducedMotion = useReducedMotion();
  const wordRef = useRef<HTMLSpanElement>(null);
  const burn = useBurn({ freq: "0.06 0.075", scatter: 42, lift: 8, seed: 9, k: 24, ms: 520 });
  const run = burn.run;
  const active = index % words.length;

  useLayoutEffect(() => {
    const el = wordRef.current;
    if (el) setWidth(Math.ceil(el.getBoundingClientRect().width * 100) / 100);
  }, [active, words]);

  useEffect(() => {
    if (reducedMotion || words.length < 2) return;
    let alive = true;
    let first = true; // the first change waits until the page has finished loading, so the moving word is not what the speed tests wait for
    (async () => {
      while (alive) {
        await new Promise((r) => setTimeout(r, first ? 9000 : 2600));
        first = false;
        if (!alive) break;
        await run(wordRef.current, () => setIndex((i) => (i + 1) % words.length));
      }
    })();
    return () => { alive = false; };
  }, [reducedMotion, words.length, run]);

  return (
    <span className="rw" style={{ width }}>
      {burn.svg}
      <span ref={wordRef} className="rw-word" style={{ color: "var(--hero-word)" }}>{words[active]}</span>
    </span>
  );
}


// "4 weeks", "$10K+", "50+": the number inside counts up from 0 the first time it is on screen
function CountText({ text }: { text: string }) {
  const m = text.match(/^(\D*)(\d+)(.*)$/);
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true });
  const [n, setN] = useState(0);
  const reduced = useReducedMotion();
  useEffect(() => {
    if (!m || !inView || reduced) return;
    const c = animate(0, +m[2], { duration: 1.6, ease: [0.2, 0.7, 0.2, 1], delay: 0.2, onUpdate: (v) => setN(Math.round(v)) });
    return () => c.stop();
  }, [inView, reduced]); // eslint-disable-line react-hooks/exhaustive-deps
  if (!m) return <>{text}</>;
  return <span ref={ref}>{m[1]}{reduced ? m[2] : n}{m[3]}</span>;
}

export default function Hero({ workHref = "#work" }: { workHref?: string }) {
  const { t, lang } = useLang();
  const words = t("hero.h2.words").split("|");
  // Real results from the case studies, as a strip of numbers under the headline
  const PROOF = [
    { n: t("hero.stat1.n"), label: t("hero.stat1.l"), by: "DLP Africa" },
    { n: "5+", label: t("hero.stat2.l"), by: "The Initial" },
    { n: "$10K+", label: t("hero.stat3.l"), by: "BookedEZ" },
    { n: "50+", label: t("hero.stat4.l"), by: t("hero.stat4.by") },
  ];
  const reducedMotion = useReducedMotion();

  return (
    <section
      id="hero"
      className="hero-section"
      style={{ position: "relative", paddingTop: 128, paddingBottom: 80, width: "100%", overflow: "hidden" }}
      onPointerMove={(e) => {
        // the lit grid follows the mouse (not touch)
        if (e.pointerType !== "mouse") return;
        const r = e.currentTarget.getBoundingClientRect();
        e.currentTarget.style.setProperty("--mx", `${e.clientX - r.left}px`);
        e.currentTarget.style.setProperty("--my", `${e.clientY - r.top}px`);
      }}
    >
      {/* the mosaic is the hero's background: white at the top, where the text sits, and full purple below */}
      <div aria-hidden="true" className="hero-mosaic" />
      <div className="hero-grid" style={{ position: "relative", zIndex: 1, maxWidth: 1240, margin: "0 auto", paddingLeft: 20, paddingRight: 20, display: "block" }}>
        <p className="hero-kicker" style={{ animation: `heroFadeUp 0.6s 0.05s ${EASE} both` }}>
          <span className="hero-kicker-tiles" aria-hidden="true"><i /><i /><i /></span>
          {t("hero.kicker")}
        </p>
        <h1
          aria-label={`${t("hero.h1")} ${t("hero.h2.prefix")} ${words[0]}`.replace(/\s+/g, " ").trim()}
          style={{ margin: "0 auto 14px", maxWidth: 1100, fontSize: "inherit", fontWeight: "inherit" }}
        >
          {[t("hero.h1"), null].map((line, i) => (
            <span
              key={i}
              aria-hidden="true"
              className="hero-headline"
              style={{
                fontFamily: "var(--font-poppins)",
                fontWeight: 700,
                fontSize: "clamp(44px, 6.6vw, 96px)",
                letterSpacing: "-0.04em",
                lineHeight: 1.05,
                textTransform: "uppercase",
                color: "var(--fg)",
                display: "block",
                maxWidth: "100%",
                overflowWrap: "break-word",
                animation: `heroMask 0.95s calc(var(--hero-delay, 0s) + ${0.15 + i * 0.14}s) ${EASE} both`,
              }}
            >
              {line ?? (
                <>
                  {/* two fixed lines: everything but the last word of the prefix, then that word with the rotating word, so the line count never changes */}
                  {(() => {
                    const parts = (t("hero.h2.prefix") || "").trim().split(/\s+/);
                    const last = parts.pop() ?? "";
                    return (
                      <>
                        {parts.length > 0 && <span style={{ display: "block" }}>{parts.join(" ")}</span>}
                        <span className="rw-line" style={{ display: "block" }}><span className="rw-last">{last}</span>{" "}<RotatingWord words={words} /></span>
                      </>
                    );
                  })()}
                </>
              )}
            </span>
          ))}
        </h1>

        <div className="hero-stack">
          <p className="hero-subtitle" style={{ animation: `heroFadeUp 0.6s 0.35s ${EASE} both` }}>{t("hero.subtitle")}</p>
          <div className="hero-cta" style={{ animation: `heroFadeUp 0.6s 0.5s ${EASE} both` }}>
            <MagneticButton
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-primary hero-shine"
              style={{ fontFamily: "var(--font-mono)", fontWeight: 500, textTransform: "uppercase", lineHeight: "20px", fontSize: 13, padding: "14px 26px", borderRadius: 0, textDecoration: "none", letterSpacing: "0.02em", alignItems: "center", gap: 8 }}
            >
              {t("hero.cta")} <CalendarDays size={15} strokeWidth={2} />
            </MagneticButton>
            <MagneticButton
              href={workHref}
              className="btn-ticks hero-ghost"
              style={{ fontFamily: "var(--font-mono)", fontWeight: 500, fontSize: 13, color: "var(--fg)", background: "#fff", border: "0.8px solid var(--line)", padding: "13px 25px", lineHeight: "20px", textTransform: "uppercase", borderRadius: 0, textDecoration: "none", letterSpacing: "0.02em", alignItems: "center", gap: 8, transition: "background 0.2s ease, border-color 0.2s ease, color 0.2s ease" }}
            >
              {t("hero.ctaWork")} <ArrowDown size={15} strokeWidth={2} />
            </MagneticButton>
          </div>
        </div>

        <dl className="hero-stats">
          {PROOF.map((p, i) => (
            <motion.div key={p.n} className="hero-stat" initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 1.1 + i * 0.1, duration: 0.6, ease: [0.2, 0.7, 0.2, 1] }}>
              <dt><CountText text={p.n} /></dt>
              <dd>{p.label}<span>{p.by}</span></dd>
            </motion.div>
          ))}
        </dl>
      </div>
    </section>
  );
}
