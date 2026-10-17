"use client";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { ArrowUpRight, ChevronLeft, ChevronRight } from "lucide-react";
import { useLang } from "@/context/LangContext";
import RevealWords, { revealDelayAfter } from "./RevealWords";

const PROJECTS_BASE = [
  {
    name: "CVCraft",
    label: "AI TOOL",
    accent: "#7c3aed",
    stack: ["Claude API", "Next.js"],
    href: "https://cvcraftai.vercel.app/",
    video: "/Cvcraft.mp4",
    poster: "/side-projects/Cvcraft-poster.webp",
    taglineKey: "sideprojects.p0.tagline",
  },
  {
    name: "Video Compressor",
    label: "UTILITY",
    accent: "#0073e6",
    stack: ["Next.js", "FFmpeg WASM"],
    href: "https://video-compressor-bay.vercel.app/",
    video: "/video-compressor.mp4",
    poster: "/side-projects/video-compressor-poster.webp",
    taglineKey: "sideprojects.p1.tagline",
  },
  {
    name: "MeetBot",
    label: "CHROME EXT",
    accent: "#00ab4a",
    stack: ["Chrome Extension", "Recall.ai", "Claude AI"],
    href: "#",
    video: "/MeetBot.mp4",
    poster: "/side-projects/MeetBot-poster.webp",
    taglineKey: "sideprojects.p2.tagline",
  },
];

const STEP_DURATION = 14000;
const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function SideProjects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: false, margin: "-10%" });
  const { t } = useLang();
  const [active, setActive] = useState(0);
  const [dir, setDir] = useState(1);
  const autoTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const fillRef = useRef<HTMLDivElement>(null);

  const projects = PROJECTS_BASE.map((p) => ({ ...p, tagline: t(p.taglineKey) }));
  const project = projects[active];

  const go = useCallback((next: number, d?: number) => {
    const direction = d ?? (next > active ? 1 : -1);
    setDir(direction);
    setActive(next);
  }, [active]);

  const prev = () => go(active === 0 ? projects.length - 1 : active - 1, -1);
  const next = () => go(active === projects.length - 1 ? 0 : active + 1, 1);

  // Progress bar animation
  useEffect(() => {
    const fill = fillRef.current;
    if (!fill) return;
    fill.style.transition = "none";
    fill.style.width = "0%";
    requestAnimationFrame(() => requestAnimationFrame(() => {
      fill.style.transition = `width ${STEP_DURATION}ms linear`;
      fill.style.width = "100%";
    }));
  }, [active]);

  // Autoplay
  useEffect(() => {
    if (autoTimer.current) clearTimeout(autoTimer.current);
    if (!inView) return;
    autoTimer.current = setTimeout(() => {
      setDir(1);
      setActive((prev) => (prev + 1) % projects.length);
    }, STEP_DURATION);
    return () => { if (autoTimer.current) clearTimeout(autoTimer.current); };
  }, [active, inView, projects.length]);

  return (
    <section
      id="side-projects"
      className="section-dark grid-texture grid-texture-dark"
      style={{ width: "100%", background: "var(--dark-bg)", position: "relative" }}
    >
    <div className="side-projects-inner" style={{ position: "relative", zIndex: 1, maxWidth: 1200, margin: "0 auto", padding: "80px 20px" }}>
      {/* Header */}
      <div
        ref={ref}
        style={{
          display: "flex",
          gap: 40,
          alignItems: "flex-end",
          flexWrap: "wrap",
          marginBottom: 40,
          borderBottom: "1px solid rgba(255,255,255,0.1)",
          paddingBottom: 28,
        }}
      >
        <div data-reveal style={{ flex: "1 1 300px" }}>
          <p style={{
            fontFamily: "var(--font-inter)", fontWeight: 700, fontSize: 11,
            letterSpacing: "4px", textTransform: "uppercase",
            color: "var(--accent-purple)", marginBottom: 16,
          }}>
            {t("sideprojects.eyebrow")}
          </p>
          <h2 style={{
            fontFamily: "var(--font-poppins)", fontWeight: 700,
            fontSize: "clamp(28px, 3.5vw, 48px)",
            letterSpacing: "-1px", lineHeight: 1.05,
            textTransform: "uppercase", color: "#fff",
          }}>
            <RevealWords text={t("sideprojects.h1")} />{" "}
            <span style={{ color: "rgb(163,163,163)" }}><RevealWords text={t("sideprojects.h1b")} delay={revealDelayAfter(t("sideprojects.h1"))} /></span>
          </h2>
        </div>

        {/* Nav controls */}
        <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
          <span style={{
            fontFamily: "var(--font-inter)", fontSize: 12, fontWeight: 500,
            color: "rgba(255,255,255,0.68)", letterSpacing: "0.5px",
          }}>
            {String(active + 1).padStart(2, "0")} / {String(projects.length).padStart(2, "0")}
          </span>
          <div style={{ display: "flex", gap: 6 }}>
            <button onClick={prev} aria-label="Previous project" style={{
              width: 40, height: 40, border: "1px solid rgba(255,255,255,0.2)",
              background: "transparent", color: "#fff", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <ChevronLeft size={16} strokeWidth={2} />
            </button>
            <button onClick={next} aria-label="Next project" style={{
              width: 40, height: 40, border: "1px solid rgba(255,255,255,0.2)",
              background: "transparent", color: "#fff", cursor: "pointer",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <ChevronRight size={16} strokeWidth={2} />
            </button>
          </div>
        </div>
      </div>

      {/* Single project view */}
      <div data-reveal>
      <AnimatePresence mode="wait" custom={dir}>
        <motion.div
          key={active}
          custom={dir}
          initial={{ opacity: 0, x: dir * 36 }}
          animate={{ opacity: 1, x: 0 }}
          exit={{ opacity: 0, x: dir * -36 }}
          transition={{ duration: 0.32, ease: EASE }}
          className="sp-card"
          style={{
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            border: "1px solid rgba(255,255,255,0.1)",
            overflow: "hidden",
          }}
        >
          {/* Text */}
          <div className="sp-text" style={{
            padding: "44px 36px",
            display: "flex", flexDirection: "column", justifyContent: "center", gap: 20,
            borderRight: "1px solid rgba(255,255,255,0.1)",
          }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
              <span style={{
                fontFamily: "var(--font-inter)", fontWeight: 700, fontSize: 11,
                letterSpacing: "3px", color: "rgba(255,255,255,0.5)",
              }}>
                {String(active + 1).padStart(2, "0")}
              </span>
              <span style={{
                fontFamily: "var(--font-inter)", fontWeight: 700, fontSize: 10,
                letterSpacing: "2.5px", textTransform: "uppercase",
                color: "#fff",
                background: project.accent,
                padding: "3px 9px",
              }}>
                {project.label}
              </span>
            </div>

            <h3 style={{
              fontFamily: "var(--font-poppins)", fontWeight: 700,
              fontSize: "clamp(16px, 1.6vw, 22px)",
              letterSpacing: "-0.8px", lineHeight: 1.1,
              textTransform: "uppercase", color: "#fff", margin: 0,
            }}>
              {project.name}
            </h3>

            <p style={{
              fontFamily: "var(--font-inter)", fontWeight: 400,
              fontSize: 14, lineHeight: 1.7,
              color: "rgba(255,255,255,0.68)", letterSpacing: "-0.2px", margin: 0,
            }}>
              {project.tagline}
            </p>

            <div style={{ display: "flex", flexWrap: "wrap", gap: 6 }}>
              {project.stack.map((tech) => (
                <span key={tech} style={{
                  fontFamily: "var(--font-inter)", fontWeight: 500, fontSize: 11,
                  letterSpacing: "0.3px", color: "rgba(255,255,255,0.68)",
                  background: "rgba(255,255,255,0.06)",
                  border: "1px solid rgba(255,255,255,0.1)", padding: "4px 10px",
                }}>
                  {tech}
                </span>
              ))}
            </div>

            {project.href && project.href !== "#" && (
              <a
                href={project.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 6,
                  fontFamily: "var(--font-inter)", fontWeight: 600,
                  fontSize: 11, letterSpacing: "1px", textTransform: "uppercase",
                  color: "#fff", textDecoration: "none",
                  borderBottom: "1px solid #fff", paddingBottom: 2,
                  width: "fit-content",
                }}
              >
                View Project <ArrowUpRight size={12} strokeWidth={2} />
              </a>
            )}
          </div>

          {/* Video — only mount the element once section is visible */}
          <div className="sp-video" style={{
            position: "relative", overflow: "hidden", minHeight: 360,
            background: `#111 url(${project.poster}) center / cover no-repeat`,
          }}>
            {inView && (
              <video
                key={project.video}
                src={project.video}
                poster={project.poster}
                autoPlay muted loop playsInline preload="none"
                style={{
                  position: "absolute", inset: 0,
                  width: "100%", height: "100%",
                  objectFit: "cover", display: "block",
                }}
              />
            )}
          </div>
        </motion.div>
      </AnimatePresence>
      </div>

      {/* Progress bar + dots */}
      <div style={{ marginTop: 20 }}>
        {/* Thin progress track */}
        <div style={{
          width: "100%", height: 2,
          background: "rgba(255,255,255,0.1)",
          marginBottom: 16, overflow: "hidden",
        }}>
          <div
            ref={fillRef}
            style={{
              height: "100%",
              background: "var(--surface)",
              width: "0%",
            }}
          />
        </div>

        {/* Dot indicators */}
        <div style={{ display: "flex", gap: 0, justifyContent: "center" }}>
          {projects.map((_, i) => (
            <button
              key={i}
              onClick={() => go(i, i > active ? 1 : -1)}
              aria-label={`Go to project ${i + 1}`}
              style={{
                width: i === active ? 24 : 8, height: 8,
                // 8px dot inside a 24px tap area
                border: "none", cursor: "pointer", padding: 8,
                boxSizing: "content-box", backgroundClip: "content-box",
                background: i === active ? "#fff" : "rgba(255,255,255,0.2)",
                transition: "width 0.3s ease, background 0.2s",
              }}
            />
          ))}
        </div>
      </div>

      <style>{`
        @media (max-width: 860px) {
          .sp-card {
            grid-template-columns: 1fr !important;
          }
          .sp-text {
            border-right: none !important;
            border-bottom: 1px solid rgba(255,255,255,0.1);
            padding: 32px 24px !important;
          }
          .sp-video {
            min-height: 260px !important;
            aspect-ratio: 16/9;
          }
        }
        @media (max-width: 540px) {
          .sp-text {
            padding: 24px 20px !important;
            gap: 16px !important;
          }
          .sp-video {
            min-height: 200px !important;
          }
        }
      `}</style>
    </div>
    </section>
  );
}
