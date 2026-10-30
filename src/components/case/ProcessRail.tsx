"use client";
import { useEffect, useRef, useState } from "react";
import SpecLabel from "@/components/SpecLabel";
import ProcessVisual from "./ProcessVisuals";

export type Step = { title: string; time?: string; body: string };

// The process as a timeline that moves sideways while the page scrolls down: the section stays pinned and the
// stages slide past a progress rail. On narrow screens, short windows and with reduced motion nothing is pinned;
// the stages sit in a row you swipe through instead (the layout is switched in CSS, see .pr rules in globals.css).
export default function ProcessRail({ steps, label, heading }: { steps: Step[]; label: string; heading: string }) {
  const sectionRef = useRef<HTMLElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);
  // A stage stays drawn once it has been the active one, so the ones already passed are not left blank
  const [seen, setSeen] = useState<number[]>([0]);

  useEffect(() => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const pinned = getComputedStyle(section).getPropertyValue("--pr-pinned").trim() === "1";
      let p: number;
      if (pinned) {
        const r = section.getBoundingClientRect();
        const total = section.offsetHeight - window.innerHeight;
        p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
        const max = Math.max(0, track.scrollWidth - (track.parentElement?.clientWidth ?? 0));
        track.style.setProperty("--pr-x", `${-p * max}px`);
      } else {
        const max = Math.max(1, track.scrollWidth - track.clientWidth);
        p = Math.min(1, Math.max(0, track.scrollLeft / max));
        track.style.setProperty("--pr-x", "0px");
      }
      section.style.setProperty("--pr-p", String(p));
      const next = Math.round(p * (steps.length - 1));
      setActive(next);
      setSeen((prev) => (prev.includes(next) ? prev : [...prev, next]));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    track.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      track.removeEventListener("scroll", onScroll);
    };
  }, [steps.length]);

  const goTo = (i: number) => {
    const section = sectionRef.current;
    const track = trackRef.current;
    if (!section || !track) return;
    const pinned = getComputedStyle(section).getPropertyValue("--pr-pinned").trim() === "1";
    const share = i / (steps.length - 1);
    if (pinned) {
      const top = section.getBoundingClientRect().top + window.scrollY;
      window.scrollTo({ top: top + share * (section.offsetHeight - window.innerHeight), behavior: "smooth" });
    } else {
      track.scrollTo({ left: share * (track.scrollWidth - track.clientWidth), behavior: "smooth" });
    }
  };

  return (
    <section ref={sectionRef} className="pr" style={{ ["--pr-n" as string]: steps.length }} aria-labelledby="pr-heading">
      <div className="pr-stick">
        <div className="cs-wrap pr-head">
          <SpecLabel text={label} />
          <h2 id="pr-heading" className="cs-h2">{heading}</h2>
        </div>

        <div className="cs-wrap">
          <div className="pr-rail" role="tablist" aria-label="Project stages">
            <span className="pr-rail-fill" aria-hidden="true" />
            {steps.map((s, i) => (
              <button
                key={s.title}
                type="button"
                role="tab"
                aria-selected={i === active}
                aria-label={`Stage ${i + 1}: ${s.title}`}
                className={`pr-dot${i <= active ? " is-done" : ""}${i === active ? " is-on" : ""}`}
                onClick={() => goTo(i)}
              >
                <span>{String(i + 1).padStart(2, "0")}</span>
              </button>
            ))}
          </div>
        </div>

        <div className="pr-viewport">
          <div ref={trackRef} className="pr-track">
            {steps.map((s, i) => (
              <article key={s.title} className={`pr-card${i === active ? " is-active" : ""}${seen.includes(i) ? " is-seen" : ""}`} aria-label={`${i + 1} of ${steps.length}: ${s.title}`}>
                <div className="pr-visual"><ProcessVisual index={i} /></div>
                <p className="pr-n" aria-hidden="true">{String(i + 1).padStart(2, "0")} / {String(steps.length).padStart(2, "0")}</p>
                <h3>{s.title}</h3>
                {s.time && <p className="pr-time">{s.time}</p>}
                <p className="pr-body">{s.body}</p>
              </article>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
