"use client";
import { motion, useInView, useMotionValue, useSpring, AnimatePresence } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef, useState, useCallback, useEffect } from "react";
import { useLang } from "@/context/LangContext";

const projects = [
  { title: "The Prime Media", meta: "Figma to Framer Development", year: "2025", href: "https://theprimemedia.ca/" },
  { title: "The Initial — AI Website", meta: "Figma to Framer", year: "2025", href: "https://the-initial.com/" },
  { title: "HitPay — SaaS Website", meta: "Framer Development", year: "2024", href: "https://hitpayapp.com/" },
  { title: "BindHQ", meta: "Framer Template Customization", year: "2026", href: "https://www.bindhq.com/" },
  { title: "Clipmaster — Video Agency", meta: "Web Design", year: "2024", href: "https://clipmasters.io/" },
  { title: "VPA London — Talent Website", meta: "Framer Development", year: "2025", href: "https://www.vpalondon.co.uk/" },
  { title: "Virvly", meta: "Framer Development", year: "2025", href: "https://virvly.com/" },
  { title: "Jamal Muse — Personal Portfolio", meta: "Claude to Framer", year: "2025", href: "https://www.jamalmuse.com/" },
  { title: "Alyssa Corso — Personal Portfolio", meta: "Framer Development", year: "2026", href: "https://alyssacorso.com/" },
  { title: "Venara Talent", meta: "Framer Development", year: "2026", href: "https://www.venaratalent.com/" },
  { title: "Emalbu", meta: "HTML to Framer Development", year: "2026", href: "https://emalbu.com/" },
  { title: "Upside ESG", meta: "SaaS Framer Development and Integrations", year: "2026", href: "https://upside-esg.com/" },
];

const COLS = 3;
const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

function screenshotUrl(href: string) {
  return `https://api.microlink.io?url=${encodeURIComponent(href)}&screenshot=true&meta=false&embed=screenshot.url`;
}

function FloatingPreview({
  project,
  index,
  springX,
  springY,
}: {
  project: (typeof projects)[0];
  index: number;
  springX: ReturnType<typeof useSpring>;
  springY: ReturnType<typeof useSpring>;
}) {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);

  return (
    <motion.div
      style={{
        position: "fixed",
        left: springX,
        top: springY,
        pointerEvents: "none",
        zIndex: 9999,
        width: 300,
        boxShadow: "0 24px 64px rgba(0,0,0,0.32)",
      }}
      initial={{ opacity: 0, scale: 0.9, y: 10 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.9, y: 10 }}
      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
    >
      {/* Screenshot container */}
      <div
        style={{
          width: 300,
          height: 190,
          position: "relative",
          overflow: "hidden",
          background: "#111",
        }}
      >
        {/* Skeleton shimmer while loading */}
        {!loaded && !errored && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              background: "linear-gradient(90deg, #1a1a1a 25%, #252525 50%, #1a1a1a 75%)",
              backgroundSize: "200% 100%",
              animation: "shimmer 1.4s infinite",
            }}
          />
        )}

        {/* Fallback if screenshot fails */}
        {errored && (
          <div
            style={{
              position: "absolute",
              inset: 0,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              background: "#111",
            }}
          >
            <span style={{
              fontFamily: "var(--font-poppins)",
              fontWeight: 700,
              fontSize: 48,
              color: "rgba(255,255,255,0.06)",
              letterSpacing: "-2px",
            }}>
              {String(index + 1).padStart(2, "0")}
            </span>
          </div>
        )}

        {/* Actual screenshot */}
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={screenshotUrl(project.href)}
          alt={project.title}
          onLoad={() => setLoaded(true)}
          onError={() => setErrored(true)}
          style={{
            position: "absolute",
            inset: 0,
            width: "100%",
            height: "100%",
            objectFit: "cover",
            objectPosition: "top center",
            opacity: loaded ? 1 : 0,
            transition: "opacity 0.3s ease",
          }}
        />

        {/* Gradient overlay */}
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(to top, rgba(0,0,0,0.88) 0%, rgba(0,0,0,0.1) 55%, transparent 100%)",
          }}
        />

        {/* Project info overlay */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: 0,
            right: 0,
            padding: "16px",
          }}
        >
          <p style={{
            fontFamily: "var(--font-inter)",
            fontWeight: 500,
            fontSize: 9,
            letterSpacing: "2px",
            textTransform: "uppercase",
            color: "rgba(255,255,255,0.55)",
            marginBottom: 4,
          }}>
            {project.meta} · {project.year}
          </p>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8 }}>
            <p style={{
              fontFamily: "var(--font-poppins)",
              fontWeight: 700,
              fontSize: 14,
              letterSpacing: "-0.3px",
              lineHeight: 1.2,
              color: "#fff",
              textTransform: "uppercase",
            }}>
              {project.title}
            </p>
            <div style={{
              width: 28,
              height: 28,
              background: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              flexShrink: 0,
            }}>
              <ArrowUpRight size={13} strokeWidth={2.5} color="#0f0f0f" />
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </motion.div>
  );
}

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const { t } = useLang();

  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);
  const [hasHover, setHasHover] = useState(false);

  useEffect(() => {
    setHasHover(window.matchMedia("(hover: hover) and (pointer: fine)").matches);
  }, []);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);
  const springX = useSpring(rawX, { stiffness: 220, damping: 22 });
  const springY = useSpring(rawY, { stiffness: 220, damping: 22 });

  const handleMouseMove = useCallback(
    (e: React.MouseEvent) => {
      rawX.set(e.clientX + 24);
      rawY.set(e.clientY - 100);
    },
    [rawX, rawY]
  );

  return (
    <section
      id="work"
      style={{ width: "100%", maxWidth: 1200, margin: "0 auto", padding: "80px 20px" }}
      onMouseMove={handleMouseMove}
    >
      <AnimatePresence>
        {hasHover && hoveredIndex !== null && (
          <FloatingPreview
            key={hoveredIndex}
            project={projects[hoveredIndex]}
            index={hoveredIndex}
            springX={springX}
            springY={springY}
          />
        )}
      </AnimatePresence>

      {/* Header */}
      <div style={{ marginBottom: 40 }}>
        <motion.p
          ref={ref}
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          style={{
            fontFamily: "var(--font-inter)",
            fontWeight: 700,
            fontSize: 11,
            letterSpacing: "4px",
            textTransform: "uppercase",
            color: "var(--accent-purple)",
            marginBottom: 16,
          }}
        >
          {t("projects.eyebrow")}
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.05 }}
          style={{
            fontFamily: "var(--font-poppins)",
            fontWeight: 700,
            fontSize: "clamp(28px, 3.5vw, 48px)",
            letterSpacing: "-1px",
            lineHeight: 1,
            textTransform: "uppercase",
            color: "var(--fg)",
          }}
        >
          {t("projects.h1")}
        </motion.h2>
      </div>

      {/* Grid */}
      <div
        className="projects-grid"
        style={{
          borderTop: "1px solid rgba(0,0,0,0.08)",
          display: "grid",
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
        }}
      >
        {projects.map((project, i) => {
          const col = i % COLS;
          const isLastRow = i >= projects.length - COLS;
          const isHovered = hoveredIndex === i;

          return (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.04, ease: EASE }}
              className="project-row"
              onMouseEnter={() => hasHover && setHoveredIndex(i)}
              onMouseLeave={() => hasHover && setHoveredIndex(null)}
              onClick={() => project.href && window.open(project.href, "_blank", "noopener,noreferrer")}
              style={{
                display: "flex",
                alignItems: "flex-start",
                gap: 16,
                padding: "28px",
                paddingLeft: col !== 0 ? 28 : 28,
                paddingRight: 28,
                borderBottom: isLastRow ? "none" : "1px solid rgba(0,0,0,0.08)",
                borderRight: col !== COLS - 1 ? "1px solid rgba(0,0,0,0.08)" : "none",
                transition: "background 0.25s",
                cursor: project.href ? "pointer" : "default",
                background: isHovered ? "#0f0f0f" : "transparent",
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: 16, flex: 1, minWidth: 0 }}>
                <span
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontWeight: 400,
                    fontSize: 13,
                    flexShrink: 0,
                    paddingTop: 2,
                    color: isHovered ? "rgba(255,255,255,0.4)" : "var(--fg-muted)",
                    transition: "color 0.2s",
                  }}
                >
                  {String(i + 1).padStart(2, "0")}
                </span>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginBottom: 4 }}>
                    <motion.h3
                      animate={{ x: isHovered ? 4 : 0 }}
                      transition={{ duration: 0.2, ease: [0.22, 1, 0.36, 1] }}
                      style={{
                        fontFamily: "var(--font-poppins)",
                        fontWeight: 600,
                        fontSize: "clamp(14px, 1.1vw, 15px)",
                        letterSpacing: "-0.3px",
                        textTransform: "uppercase",
                        color: isHovered ? "#fff" : "var(--fg)",
                        lineHeight: 1.3,
                        transition: "color 0.2s",
                      }}
                    >
                      {project.title}
                    </motion.h3>
                    {project.href && (
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`Visit ${project.title}`}
                        className="project-link-icon"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: 26,
                          height: 26,
                          background: isHovered ? "#fff" : "transparent",
                          border: `1px solid ${isHovered ? "#fff" : "rgba(0,0,0,0.1)"}`,
                          color: isHovered ? "#0f0f0f" : "var(--fg-secondary)",
                          flexShrink: 0,
                          transition: "background 0.2s, color 0.2s, border-color 0.2s",
                          textDecoration: "none",
                        }}
                      >
                        <ArrowUpRight size={13} strokeWidth={2} />
                      </a>
                    )}
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontWeight: 400,
                      fontSize: 11,
                      color: isHovered ? "rgba(255,255,255,0.5)" : "var(--fg-secondary)",
                      letterSpacing: "0.5px",
                      textTransform: "uppercase",
                      transition: "color 0.2s",
                    }}
                  >
                    {project.meta} &nbsp;·&nbsp; {project.year}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
