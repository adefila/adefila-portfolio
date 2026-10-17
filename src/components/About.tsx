"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X, Download } from "lucide-react";
import MagneticButton from "./MagneticButton";
import { useLang } from "@/context/LangContext";

const PHOTO_W = 380;
const PHOTO_H = 300;
const PHOTO_GAP = 16;

const techStacks = ["Figma", "Framer", "Webflow", "WordPress", "Shopify", "React", "Claude"];

// `points` are optional: a few short lines about what the role involved.
const workHistory: { period: string; role: string; company: string; location: string; points?: string[] }[] = [
  {
    period: "2020 – Present", role: "Freelance Web Developer & Framer Designer", company: "Self-employed", location: "Remote",
    points: [
      "50+ websites for founders, agencies and small businesses.",
      "Top Rated on Upwork with 100% Job Success.",
    ],
  },
  {
    period: "Sep 2025 – Oct 2026", role: "Framer Developer (Contract)", company: "Klimt and Design", location: "Los Angeles, CA. Remote",
    points: [
      "Turned design concepts into pixel-perfect, user-friendly websites in Framer.",
      "Worked with designers to make sure functionality and usability matched what clients expected.",
    ],
  },
  {
    period: "Oct 2024 – Sep 2025", role: "UI/UX Designer & Project Manager (Full-time)", company: "Trust-Tai Agency", location: "Murfreesboro, TN. Remote",
    points: [
      "Led multidisciplinary teams on client projects spanning UI/UX design, branding and development.",
      "Managed client communication and project timelines, delivering on time.",
      "Introduced agile practices that made the team 25% more efficient.",
    ],
  },
  {
    period: "Oct 2024 – Jul 2025", role: "Framer Developer (Contract)", company: "Hitpay", location: "Singapore. Remote",
    points: [
      "Built high-fidelity prototypes in Framer to speed up user testing and developer handoff.",
      "Worked with design and product teams to improve the experience across core payment tools.",
      "Streamlined design workflows, cutting time-to-ship by 30%.",
    ],
  },
  {
    period: "Sep 2023 – Sep 2025", role: "Lead Product Designer (Full-time)", company: "BookedEZ LLC", location: "Atlanta, GA. Remote",
    points: [
      "Directed the redesign of the core booking flows, increasing conversion by 20%.",
      "Ran user research, wireframing and usability testing for continuous product improvement.",
      "Mentored junior designers and led design reviews across teams.",
    ],
  },
  {
    period: "Jan 2021 – Jul 2021", role: "Intern WordPress Developer", company: "Davis Enterprises", location: "United States. Remote",
    points: [
      "Helped build and update client websites with WordPress and Elementor.",
      "Worked with cross-functional teams on real-world design challenges.",
    ],
  },
];

const photos = [
  { id: 1, src: "/gallery/photo-1.jpeg" },
  { id: 2, src: "/gallery/photo-2.jpeg" },
  { id: 3, src: "/gallery/photo-3.jpeg" },
  { id: 4, src: "/gallery/photo-4.jpeg" },
  { id: 5, src: "/gallery/photo-5.jpeg" },
];

const ONE_SET_PX = photos.length * (PHOTO_W + PHOTO_GAP);

const MARQUEE_CSS = `
  @keyframes photo-marquee {
    0%   { transform: translateX(0); }
    100% { transform: translateX(-${ONE_SET_PX}px); }
  }
  .photo-strip {
    animation: photo-marquee ${photos.length * 5}s linear infinite;
  }
  .photo-strip:hover {
    animation-play-state: paused;
  }
  .photo-strip-img {
    filter: grayscale(100%) contrast(1.05);
    transition: filter 0.45s ease;
  }
  .photo-strip-img:hover {
    filter: grayscale(0%) contrast(1);
  }
`;

function TechTag({ label }: { label: string }) {
  const [hovered, setHovered] = useState(false);
  return (
    <span
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        fontFamily: "var(--font-inter)",
        fontWeight: 500,
        fontSize: 11,
        letterSpacing: "0.5px",
        textTransform: "uppercase",
        color: hovered ? "#fff" : "var(--fg)",
        background: hovered ? "var(--accent-purple)" : "var(--surface)",
        border: `1px solid ${hovered ? "var(--accent-purple)" : "rgba(var(--ink), 0.12)"}`,
        padding: "8px 16px",
        borderRadius: 0,
        cursor: "default",
        transition: "all 0.18s ease",
        userSelect: "none",
      }}
    >
      {label}
    </span>
  );
}

// The first roles show; the rest open on request, so the page stays short.
const HISTORY_SHOWN = 2;

// The photo library is hidden everywhere for now: pass `gallery` to bring it back.
export default function About({ gallery = false }: { gallery?: boolean }) {
  const { t } = useLang();
  const tr = (key: string, fallback: string) => { const v = t(key); return v === key ? fallback : v; };
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [fullHistory, setFullHistory] = useState(false);

  const lbPrev = () => setLightbox((p) => (p !== null ? (p - 1 + photos.length) % photos.length : 0));
  const lbNext = () => setLightbox((p) => (p !== null ? (p + 1) % photos.length : 0));

  useEffect(() => {
    if (lightbox === null) return;
    const handler = (e: KeyboardEvent) => {
      if (e.key === "ArrowLeft") lbPrev();
      if (e.key === "ArrowRight") lbNext();
      if (e.key === "Escape") setLightbox(null);
    };
    window.addEventListener("keydown", handler);
    return () => window.removeEventListener("keydown", handler);
  });

  return (
    <section
      id="about"
      style={{ width: "100%", maxWidth: 1200, margin: "0 auto", padding: "80px 20px" }}
    >
      <style>{MARQUEE_CSS}</style>

      <motion.p
        data-reveal
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
        {t("about.eyebrow")}
      </motion.p>

      <div className="about-columns" style={{ display: "flex", gap: 80, alignItems: "flex-start", flexWrap: "wrap" }}>
        {/* Left: Bio */}
        <div style={{ flex: 2, minWidth: 300 }}>
          <motion.h2
            data-reveal
            style={{
              fontFamily: "var(--font-poppins)",
              fontWeight: 700,
              fontSize: "clamp(28px, 3.5vw, 48px)",
              letterSpacing: "-1px",
              lineHeight: 1.05,
              textTransform: "uppercase",
              color: "var(--fg)",
              marginBottom: 16,
              maxWidth: 720,
            }}
          >
            {t("about.h1")}
          </motion.h2>

          <motion.div
            data-reveal
            style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 400,
              fontSize: 16,
              letterSpacing: "-0.7px",
              lineHeight: 1.7,
              color: "var(--fg-secondary)",
              display: "flex",
              flexDirection: "column",
              gap: 16,
            }}
          >
            <p>{t("about.p1")}</p>
            <p>{t("about.p2")}</p>
          </motion.div>

          {/* Tech stacks */}
          <motion.div
            data-reveal
            style={{ marginTop: 40 }}
          >
            <p style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 700,
              fontSize: 11,
              letterSpacing: "4px",
              textTransform: "uppercase",
              color: "var(--accent-purple)",
              marginBottom: 16,
            }}>
              {t("about.techLabel")}
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {techStacks.map((tech) => (
                <TechTag key={tech} label={tech} />
              ))}
            </div>
          </motion.div>

          {/* CV download */}
          <motion.div
            data-reveal
            style={{ marginTop: 32 }}
          >
            <MagneticButton
              href="/samuel-adefila-cv.pdf"
              download
              style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 600,
                lineHeight: "20px",
                fontSize: 13,
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                color: "var(--fg)",
                background: "transparent",
                border: "1px solid rgba(var(--ink), 0.2)",
                padding: "13px 25px",
                textDecoration: "none",
                alignItems: "center",
                gap: 8,
                transition: "background 0.2s ease, border-color 0.2s ease, color 0.2s ease",
              }}
              onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.currentTarget.style.background = "var(--fg)";
                e.currentTarget.style.borderColor = "var(--fg)";
                e.currentTarget.style.color = "var(--on-fg)";
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = "rgba(var(--ink), 0.2)";
                e.currentTarget.style.color = "var(--fg)";
              }}
            >
              {t("hero.downloadCv")} <Download size={13} strokeWidth={2} />
            </MagneticButton>
          </motion.div>
        </div>

        {/* Right: Work history */}
        <motion.div
          data-reveal
          style={{ flex: 1, minWidth: 260 }}
        >
          <p style={{
            fontFamily: "var(--font-inter)",
            fontWeight: 700,
            fontSize: 11,
            letterSpacing: "4px",
            textTransform: "uppercase",
            color: "var(--accent-purple)",
            marginBottom: 24,
          }}>
            {t("about.historyLabel")}
          </p>
          {/* Timeline: a line down the left with a dot per role; the current role is highlighted */}
          <ol style={{ position: "relative", listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column" }}>
            <span aria-hidden="true" style={{ position: "absolute", left: 5, top: 28, bottom: 28, width: 1, background: "rgba(var(--ink), 0.12)" }} />
            {(fullHistory ? workHistory : workHistory.slice(0, HISTORY_SHOWN)).map((job, i) => {
              const current = i === 0; // the first role is the one that is still going
              return (
              <li key={i} style={{ position: "relative", padding: "24px 0 24px 32px" }}>
                <span
                  aria-hidden="true"
                  className={current ? "timeline-dot timeline-dot-current" : "timeline-dot"}
                  style={{
                    position: "absolute", left: 0, top: 24,
                    width: 11, height: 11, borderRadius: "50%",
                    background: current ? "var(--accent-purple)" : "var(--bg)",
                    border: `2px solid ${current ? "var(--accent-purple)" : "rgba(var(--ink), 0.25)"}`,
                  }}
                />
                <p style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: 11,
                  color: current ? "var(--accent-purple)" : "var(--fg-muted)",
                  fontWeight: current ? 600 : 400,
                  marginBottom: 8,
                  letterSpacing: "0.02em",
                  textTransform: "uppercase",
                  display: "flex", alignItems: "center", gap: 8,
                }}>
                  {tr(`wh${i}.period`, job.period)}
                  {current && (
                    <span style={{ fontSize: 9, fontWeight: 700, letterSpacing: "0.12em", color: "#fff", background: "var(--accent-purple)", padding: "2px 6px" }}>
                      {t("wh.now")}
                    </span>
                  )}
                </p>
                <p style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 600,
                  fontSize: 14,
                  color: "var(--fg)",
                  marginBottom: 2,
                  letterSpacing: "-0.3px",
                  textTransform: "uppercase",
                }}>
                  {tr(`wh${i}.role`, job.role)}
                </p>
                <p style={{ fontFamily: "var(--font-inter)", fontSize: 13, color: "var(--fg-secondary)", letterSpacing: "-0.2px" }}>
                  {tr(`wh${i}.company`, job.company)}
                  <span style={{ fontFamily: "var(--font-inter)", fontSize: 11, color: "var(--fg-muted)", letterSpacing: "0.01em", marginLeft: 6 }}>
                    · {tr(`wh${i}.location`, job.location)}
                  </span>
                </p>
                {job.points?.length ? (
                  <ul style={{ listStyle: "none", margin: "12px 0 0", padding: 0, display: "grid", gap: 8 }}>
                    {job.points.map((point, j) => (
                      <li
                        key={point}
                        style={{
                          position: "relative", paddingLeft: 14,
                          fontFamily: "var(--font-inter)", fontSize: 13, lineHeight: 1.55,
                          color: "var(--fg-secondary)", letterSpacing: "-0.1px",
                        }}
                      >
                        <span aria-hidden="true" style={{ position: "absolute", left: 0, top: 8, width: 5, height: 1.5, background: "rgba(var(--ink), 0.35)" }} />
                        {tr(`wh${i}.p${j}`, point)}
                      </li>
                    ))}
                  </ul>
                ) : null}
              </li>
              );
            })}
          </ol>
          {workHistory.length > HISTORY_SHOWN && (
            <button
              type="button"
              onClick={() => setFullHistory(v => !v)}
              aria-expanded={fullHistory}
              style={{
                marginTop: 8, marginLeft: 32, background: "transparent", border: 0, padding: "4px 0", cursor: "pointer",
                fontFamily: "var(--font-inter)", fontWeight: 600, fontSize: 12, letterSpacing: "0.08em", textTransform: "uppercase",
                color: "var(--accent-purple)", borderBottom: "1px solid currentColor",
              }}
            >
              {fullHistory ? t("wh.less") : t("wh.more").replace("{n}", String(workHistory.length - HISTORY_SHOWN))}
            </button>
          )}
        </motion.div>
      </div>

      {gallery && (
        <>
      {/* Photo marquee strip */}
      <motion.div
        data-reveal
        style={{ marginTop: 64 }}
      >
        <p style={{
          fontFamily: "var(--font-inter)",
          fontWeight: 700,
          fontSize: 11,
          letterSpacing: "4px",
          textTransform: "uppercase",
          color: "var(--accent-purple)",
          marginBottom: 24,
        }}>
          {t("about.photoLabel")}
        </p>

        {/* Cubic 3D perspective wrapper */}
        <div style={{ perspective: "700px", perspectiveOrigin: "50% 40%" }}>
        {/* Viewport — clips overflow, fades edges, tilted on the 3D plane */}
        <div style={{
          overflow: "hidden",
          transform: "rotateX(10deg) scale(1.02)",
          transformStyle: "preserve-3d",
          WebkitMaskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
          maskImage: "linear-gradient(to right, transparent 0%, black 8%, black 92%, transparent 100%)",
        }}>
          {/* The scrolling strip — doubled for seamless loop */}
          <div
            className="photo-strip"
            style={{
              display: "flex",
              gap: PHOTO_GAP,
              width: "max-content",
            }}
          >
            {[...photos, ...photos].map((photo, i) => (
              <div
                key={i}
                onClick={() => setLightbox(i % photos.length)}
                style={{
                  flexShrink: 0,
                  width: PHOTO_W,
                  height: PHOTO_H,
                  overflow: "hidden",
                  cursor: "zoom-in",
                  background: "rgba(var(--ink), 0.06)",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.src}
                  alt={`Gallery photo ${(i % photos.length) + 1}`}
                  className="photo-strip-img"
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
            ))}
          </div>
        </div>
        </div>
      </motion.div>

      {/* Lightbox */}
      <AnimatePresence>
        {lightbox !== null && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setLightbox(null)}
            style={{
              position: "fixed",
              inset: 0,
              background: "rgba(var(--ink), 0.92)",
              zIndex: 1000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <button
              aria-label="Close photo viewer"
              onClick={() => setLightbox(null)}
              style={{
                position: "absolute", top: 20, right: 20,
                width: 40, height: 40, borderRadius: 0,
                background: "rgba(255,255,255,0.12)", border: "none",
                cursor: "pointer", display: "flex", alignItems: "center",
                justifyContent: "center", color: "#fff",
              }}
            >
              <X size={18} />
            </button>

            <button
              aria-label="Previous photo"
              onClick={(e) => { e.stopPropagation(); lbPrev(); }}
              style={{
                position: "absolute", left: 20,
                width: 44, height: 44, borderRadius: 0,
                background: "rgba(255,255,255,0.12)", border: "none",
                cursor: "pointer", display: "flex", alignItems: "center",
                justifyContent: "center", color: "#fff",
              }}
            >
              <ChevronLeft size={22} />
            </button>

            <motion.div
              key={lightbox}
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.25 }}
              onClick={(e) => e.stopPropagation()}
              style={{ maxWidth: "80vw", maxHeight: "85vh", borderRadius: 0, overflow: "hidden" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photos[lightbox].src}
                alt={`Gallery photo ${lightbox + 1}`}
                style={{ maxWidth: "80vw", maxHeight: "85vh", objectFit: "contain", display: "block" }}
              />
            </motion.div>

            <button
              aria-label="Next photo"
              onClick={(e) => { e.stopPropagation(); lbNext(); }}
              style={{
                position: "absolute", right: 20,
                width: 44, height: 44, borderRadius: 0,
                background: "rgba(255,255,255,0.12)", border: "none",
                cursor: "pointer", display: "flex", alignItems: "center",
                justifyContent: "center", color: "#fff",
              }}
            >
              <ChevronRight size={22} />
            </button>

            <p style={{
              position: "absolute", bottom: 20,
              left: "50%", transform: "translateX(-50%)",
              fontFamily: "var(--font-inter)", fontSize: 12,
              color: "rgba(255,255,255,0.5)", letterSpacing: "1px",
            }}>
              {lightbox + 1} / {photos.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
        </>
      )}
    </section>
  );
}
