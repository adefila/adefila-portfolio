"use client";
import Image from "next/image";
import { useCallback, useEffect, useMemo, useRef, useState } from "react";
import { ArrowLeft, ArrowRight, ArrowUpRight, Play } from "lucide-react";
import { useLang } from "@/context/LangContext";
import SpecLabel from "./SpecLabel";
import RevealWords, { revealDelayAfter } from "./RevealWords";

// Every claim here comes from the client's own testimonial or the project record —
// add a case only when there's a real result to show.
type Case = {
  id: string;
  client: string;
  logo: string;          // single-colour logo in /public/clients (shown white on the visual panel)
  logoAspect: number;    // width / height
  image: string;         // screenshot or app design shown on the panel
  imageSize: [number, number];
  imageMaxWidth?: number; // keeps a small screenshot at its real size so it stays sharp
  frame?: boolean;       // show a screenshot in a browser frame (app designs fill the panel instead)
  panel: string;         // panel background, matched to the picture
  metric: string;        // literal ("5+") or a translation key
  metricIsKey?: boolean;
  quoteKey?: string;     // existing testimonial text
  quoteBy?: string;
  href?: string;         // live site
  study?: string;        // the full case study page on this site
  videoLink?: boolean;   // points to the video testimonial instead of a quote
};

const CASES: Case[] = [
  {
    id: "dlp", client: "DLP Africa", logo: "/clients/dlp-africa.svg", logoAspect: 2.08,
    image: "/projects/dlp-africa-desktop.webp", imageSize: [1400, 875], frame: true, panel: "#0b1f6b",
    metric: "4 weeks", href: "https://dlp.africa/", study: "/case-studies/dlp-africa",
  },
  {
    id: "initial", client: "The Initial", logo: "/clients/the-initial.svg", logoAspect: 3.37,
    image: "/projects/the-initial.png", imageSize: [1280, 800], frame: true, panel: "#031319",
    metric: "5+", quoteKey: "testimonials.t2", quoteBy: "Johnno Van Den Brink · The Initial Agency",
    href: "https://the-initial.com/",
  },
  {
    id: "leadopo", client: "Leadopo", logo: "/clients/leadopo.svg", logoAspect: 7.37,
    image: "/projects/leadopo.png", imageSize: [440, 256], imageMaxWidth: 440, frame: true, panel: "#1536d6",
    metric: "cases.leadopo.metric", metricIsKey: true, quoteKey: "testimonials.t4", quoteBy: "Michal Kouril · Leadopo",
    href: "https://www.leadopo.com/",
  },
  {
    id: "bookedez", client: "BookedEZ", logo: "/clients/bookedez.svg", logoAspect: 5.08,
    image: "/projects/design/bookedez.jpg", imageSize: [2000, 2000], panel: "#18181a",
    metric: "$10K+", videoLink: true,
  },
];

const LOGO_HEIGHT = 26;
const prefersReducedMotion = () => typeof window !== "undefined" && window.matchMedia("(prefers-reduced-motion: reduce)").matches;

// Counts a number up each time its slide comes into view. "5+" and "$10K+" are split into a prefix,
// the number and a suffix; anything without a number is shown as it is. Reduced motion shows the final value.
function Metric({ value, small, active }: { value: string; small?: boolean; active: boolean }) {
  const match = useMemo(() => value.match(/^(\D*)(\d+)(.*)$/), [value]);
  const target = match ? Number(match[2]) : 0;
  const [n, setN] = useState(target);

  useEffect(() => {
    if (!match || !active || prefersReducedMotion()) return;
    let frame = 0;
    const start = performance.now();
    const tick = (now: number) => {
      const p = Math.min((now - start) / 1100, 1);
      setN(Math.round(target * (1 - Math.pow(1 - p, 3))));
      if (p < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [active, match, target]);

  return (
    <p className={`csl-metric${small ? " csl-metric-small" : ""}`} aria-label={value}>
      <span aria-hidden="true">{match ? `${match[1]}${n}${match[3]}` : value}</span>
    </p>
  );
}

export default function CaseStudies() {
  const { t } = useLang();
  const trackRef = useRef<HTMLDivElement>(null);
  const sectionRef = useRef<HTMLElement>(null);
  const [index, setIndex] = useState(0);
  const [inView, setInView] = useState(false);

  // Which slide is showing follows the scroll position, so swiping, the arrows and the keyboard all agree
  const onScroll = useCallback(() => {
    const el = trackRef.current;
    if (!el || !el.clientWidth) return;
    setIndex(Math.max(0, Math.min(CASES.length - 1, Math.round(el.scrollLeft / el.clientWidth))));
  }, []);

  const goTo = useCallback((i: number) => {
    const el = trackRef.current;
    if (!el) return;
    const next = Math.max(0, Math.min(CASES.length - 1, i));
    el.scrollTo({ left: next * el.clientWidth, behavior: prefersReducedMotion() ? "auto" : "smooth" });
  }, []);

  // The count-up waits until the section is on screen
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([entry]) => setInView(entry.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const onKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "ArrowRight") { e.preventDefault(); goTo(index + 1); }
    if (e.key === "ArrowLeft") { e.preventDefault(); goTo(index - 1); }
  };

  return (
    <section id="results" ref={sectionRef} className="csl-section">
      <SpecLabel text={t("cases.eyebrow")} />
      <div className="csl-head">
        <div>
          <h2 style={{
            fontFamily: "var(--font-poppins)", fontWeight: 700,
            fontSize: "clamp(28px, 3.5vw, 48px)", letterSpacing: "-1px",
            lineHeight: 1.05, textTransform: "uppercase", color: "var(--fg)",
          }}>
            <RevealWords text={t("cases.h1")} />{" "}
            <span style={{ color: "rgb(163,163,163)" }}><RevealWords text={t("cases.h1b")} delay={revealDelayAfter(t("cases.h1"))} /></span>
          </h2>
        </div>

        <div className="csl-controls">
          <span className="csl-count" aria-hidden="true">
            <strong>{String(index + 1).padStart(2, "0")}</strong> / {String(CASES.length).padStart(2, "0")}
          </span>
          <button type="button" className="csl-arrow" onClick={() => goTo(index - 1)} disabled={index === 0} aria-label="Previous case study">
            <ArrowLeft size={18} strokeWidth={2} />
          </button>
          <button type="button" className="csl-arrow" onClick={() => goTo(index + 1)} disabled={index === CASES.length - 1} aria-label="Next case study">
            <ArrowRight size={18} strokeWidth={2} />
          </button>
        </div>
      </div>

      <div
        ref={trackRef}
        className="csl-track"
        onScroll={onScroll}
        onKeyDown={onKeyDown}
        tabIndex={0}
        role="region"
        aria-roledescription="carousel"
        aria-label={t("cases.h1")}
      >
        {CASES.map((c, i) => (
          <article key={c.id} className="csl-slide" role="group" aria-roledescription="slide" aria-label={`${i + 1} / ${CASES.length}: ${c.client}`}>
            {/* The work */}
            <div className="csl-visual" style={{ background: c.panel }}>
              <Image
                src={c.logo}
                alt={c.client}
                unoptimized
                width={Math.round(LOGO_HEIGHT * c.logoAspect)}
                height={LOGO_HEIGHT}
                className="csl-logo"
                style={{ height: LOGO_HEIGHT, width: "auto" }}
              />
              {c.frame ? (
                <div className="csl-frame" style={c.imageMaxWidth ? { maxWidth: c.imageMaxWidth } : undefined}>
                  <span className="csl-frame-bar" aria-hidden="true"><i /><i /><i /></span>
                  <Image src={c.image} alt="" width={c.imageSize[0]} height={c.imageSize[1]} sizes="(max-width: 900px) 100vw, 620px" className="csl-shot" />
                </div>
              ) : (
                <Image src={c.image} alt="" width={c.imageSize[0]} height={c.imageSize[1]} sizes="(max-width: 900px) 100vw, 620px" className="csl-cover" />
              )}
            </div>

            {/* The result and the story */}
            <div className="csl-content">
              <Metric value={c.metricIsKey ? t(c.metric) : c.metric} small={c.metricIsKey} active={inView && index === i} />
              <p className="csl-metric-label">{t(`cases.${c.id}.metricLabel`)}</p>

              <div className="csl-story">
                <div>
                  <p className="csl-label">{t("cases.brief")}</p>
                  <p className="csl-body">{t(`cases.${c.id}.brief`)}</p>
                </div>
                <div>
                  <p className="csl-label">{t("cases.did")}</p>
                  <p className="csl-body">{t(`cases.${c.id}.did`)}</p>
                </div>
              </div>

              <div className="csl-foot">
                {c.quoteKey ? (
                  <figure className="csl-quote">
                    <blockquote>&ldquo;{t(c.quoteKey)}&rdquo;</blockquote>
                    <figcaption>
                      <strong>{c.quoteBy?.split(" · ")[0]}</strong>
                      <span>{c.quoteBy?.split(" · ")[1]}</span>
                    </figcaption>
                  </figure>
                ) : c.videoLink ? (
                  <a href="#testimonials" className="csl-video">
                    <span className="csl-play"><Play size={14} fill="#fff" color="#fff" style={{ marginLeft: 2 }} /></span>
                    <span>{t("cases.watch")}</span>
                  </a>
                ) : null}
                {c.study && (
                  <a href={c.study} className="csl-link" aria-label={`${t("cases.read")}: ${c.client}`}>
                    {t("cases.read")} <ArrowRight size={14} strokeWidth={2} />
                  </a>
                )}
                {c.href && (
                  <a href={c.href} target="_blank" rel="noopener noreferrer" className="csl-link" aria-label={`${t("cases.visit")}: ${c.client}`}>
                    {t("cases.visit")} <ArrowUpRight size={14} strokeWidth={2} />
                  </a>
                )}
              </div>
            </div>
          </article>
        ))}
      </div>

      <div className="csl-dots" role="tablist" aria-label="Case studies">
        {CASES.map((c, i) => (
          <button
            key={c.id}
            type="button"
            role="tab"
            aria-selected={i === index}
            aria-label={c.client}
            className={`csl-dot${i === index ? " is-active" : ""}`}
            onClick={() => goTo(i)}
          />
        ))}
      </div>
    </section>
  );
}
