"use client";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { useLang } from "@/context/LangContext";


const testimonialMeta = [
  { name: "Davonte Wheeler",     role: "CEO · BookedEZ LLC",                    key: "", video: "/davonte-wheeler.mp4" },
  { name: "Nitin",               role: "HitPay App",                            key: "testimonials.t0" },
  { name: "Alyssa Corso",        role: "SEO Consultant for Healthcare Startups", key: "testimonials.t1" },
  { name: "Johnno Van Den Brink",role: "The Initial Agency",                    key: "testimonials.t2" },
  { name: "Layo",                role: "Content Writer",                        key: "testimonials.t3" },
  { name: "Michal Kouril",       role: "Leadopo",                               key: "testimonials.t4" },
  { name: "Raffaello Cuccuini",  role: "Humanity",                              key: "testimonials.t5" },
  { name: "Heather Burns",       role: "Upside ESG",                            key: "testimonials.t6" },
];

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [page, setPage] = useState(0);
  const [videoOpen, setVideoOpen] = useState(false);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const { t } = useLang();
  const perPage = 2;
  const totalPages = Math.ceil(testimonialMeta.length / perPage);
  const visible = testimonialMeta.slice(page * perPage, page * perPage + perPage);

  // Close modal on Escape
  useEffect(() => {
    if (!videoOpen) return;
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setVideoOpen(false); };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [videoOpen]);

  // Pause modal video when closing
  useEffect(() => {
    if (!videoOpen && modalVideoRef.current) {
      modalVideoRef.current.pause();
      modalVideoRef.current.currentTime = 0;
    }
    if (videoOpen && modalVideoRef.current) {
      modalVideoRef.current.play().catch(() => {});
    }
  }, [videoOpen]);

  return (
    <section
      id="testimonials"
      style={{ width: "100%", padding: "80px 20px", background: "var(--bg)" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header row */}
        <div
          ref={ref}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 40,
            flexWrap: "wrap",
            gap: 24,
          }}
        >
          <div>
            <motion.p
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
              {t("testimonials.eyebrow")}
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.06 }}
              style={{
                fontFamily: "var(--font-poppins)",
                fontWeight: 700,
                fontSize: "clamp(28px, 3.5vw, 48px)",
                letterSpacing: "-1px",
                lineHeight: 1.05,
                textTransform: "uppercase",
                color: "var(--fg)",
              }}
            >
              {t("testimonials.h1")}
            </motion.h2>
          </div>

          {/* Nav arrows */}
          <div style={{ display: "flex", gap: 8, alignSelf: "flex-end" }}>
            <button
              aria-label="Previous testimonials"
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              style={{
                width: 44,
                height: 44,
                borderRadius: 0,
                border: "1px solid rgba(0,0,0,0.15)",
                background: page === 0 ? "rgba(0,0,0,0.04)" : "var(--white)",
                cursor: page === 0 ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: page === 0 ? 0.4 : 1,
                transition: "opacity 0.2s",
              }}
            >
              <ChevronLeft size={18} strokeWidth={2} />
            </button>
            <button
              aria-label="Next testimonials"
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              style={{
                width: 44,
                height: 44,
                borderRadius: 0,
                border: "1px solid rgba(0,0,0,0.15)",
                background: page === totalPages - 1 ? "rgba(0,0,0,0.04)" : "var(--white)",
                cursor: page === totalPages - 1 ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: page === totalPages - 1 ? 0.4 : 1,
                transition: "opacity 0.2s",
              }}
            >
              <ChevronRight size={18} strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* Main content: stat card + testimonials */}
        <div className="testimonials-grid" style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: 0, alignItems: "stretch" }}>
          {/* Left: purple stat card */}
          <div
            className="testimonials-stat-card"
            style={{
              background: "var(--accent-purple)",
              borderRadius: 0,
              padding: "32px 28px",
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              minHeight: 400,
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-satoshi)",
                fontWeight: 700,
                fontSize: "clamp(64px, 8vw, 96px)",
                lineHeight: 1,
                color: "var(--white)",
                marginBottom: 12,
              }}
            >
              50+
            </p>
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 600,
                fontSize: 11,
                letterSpacing: "1.5px",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.85)",
                lineHeight: 1.5,
              }}
            >
              {t("testimonials.statLabel")}
            </p>
          </div>

          {/* Right: two testimonial cards */}
          <div className="testimonials-cards" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 0 }}>
            {visible.map((item, i) => (
              <motion.div
                key={`${page}-${i}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                className="testimonial-card"
                style={{
                  position: "relative",
                  overflow: "hidden",
                  background: "var(--white)",
                  border: "1px solid rgba(0,0,0,0.07)",
                  borderLeft: i === 0 ? "none" : "1px solid rgba(0,0,0,0.07)",
                  minHeight: 400,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: 20,
                }}
              >
                {"video" in item && item.video ? (
                  /* ── Video testimonial card ── */
                  <>
                    {/* Silent preview — plays muted in the card */}
                    <video
                      src={item.video}
                      autoPlay
                      muted
                      loop
                      playsInline
                      preload="none"
                      style={{
                        position: "absolute", inset: 0,
                        width: "100%", height: "100%",
                        objectFit: "cover",
                      }}
                    />
                    {/* Subtle dark vignette */}
                    <div style={{
                      position: "absolute", inset: 0,
                      background: "linear-gradient(to top, rgba(0,0,0,0.65) 30%, rgba(0,0,0,0.12) 100%)",
                    }} />
                    {/* Name / role at the bottom */}
                    <div style={{ position: "relative", zIndex: 1, padding: 28, display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%", minHeight: 400, pointerEvents: "none" }}>
                      <span style={{
                        display: "inline-block", alignSelf: "flex-start",
                        fontFamily: "var(--font-inter)", fontWeight: 700, fontSize: 10,
                        letterSpacing: "3px", textTransform: "uppercase",
                        color: "#fff", border: "1px solid rgba(255,255,255,0.4)",
                        padding: "4px 10px",
                      }}>
                        Video Testimonial
                      </span>
                      <div>
                        <p style={{
                          fontFamily: "var(--font-inter)", fontWeight: 700, fontSize: 13,
                          textTransform: "uppercase", letterSpacing: "0.5px",
                          color: "#fff", marginBottom: 4,
                        }}>
                          {item.name}
                        </p>
                        <p style={{
                          fontFamily: "var(--font-inter)", fontWeight: 400, fontSize: 11,
                          textTransform: "uppercase", letterSpacing: "0.5px",
                          color: "rgba(255,255,255,0.85)",
                        }}>
                          {item.role}
                        </p>
                      </div>
                    </div>
                    {/* Play button — full-card overlay button, accessibility-tree-safe */}
                    <button
                      onClick={() => setVideoOpen(true)}
                      aria-label={`Play video testimonial from ${item.name}`}
                      style={{
                        position: "absolute", inset: 0, zIndex: 2,
                        width: "100%", height: "100%",
                        background: "none", border: "none", cursor: "pointer",
                        display: "flex", alignItems: "center", justifyContent: "center",
                      }}
                    >
                      <div style={{
                        width: 56, height: 56, borderRadius: "50%",
                        background: "rgba(255,255,255,0.18)",
                        backdropFilter: "blur(6px)",
                        border: "1px solid rgba(255,255,255,0.35)",
                        display: "flex", alignItems: "center", justifyContent: "center",
                        transition: "background 0.2s, transform 0.2s",
                        pointerEvents: "none",
                      }}>
                        <Play size={22} fill="#fff" color="#fff" style={{ marginLeft: 3 }} />
                      </div>
                    </button>
                  </>
                ) : (
                  /* ── Text testimonial card ── */
                  <div style={{ padding: 28, display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%", gap: 20 }}>
                    <div>
                      <p style={{ fontSize: 96, color: "var(--fg)", opacity: 0.1, lineHeight: 0.8, marginBottom: 8, fontFamily: "var(--font-poppins)", fontWeight: 700 }}>&ldquo;</p>
                      <p style={{
                        fontFamily: "var(--font-inter)", fontWeight: 400,
                        fontSize: 15, lineHeight: 1.65,
                        color: "var(--fg-secondary)", letterSpacing: "-0.2px",
                      }}>
                        {t(item.key)}
                      </p>
                    </div>
                    <div>
                      <p style={{
                        fontFamily: "var(--font-inter)", fontWeight: 700, fontSize: 13,
                        textTransform: "uppercase", letterSpacing: "0.5px",
                        color: "var(--fg)", marginBottom: 4,
                      }}>
                        {item.name}
                      </p>
                      <p style={{
                        fontFamily: "var(--font-inter)", fontWeight: 400, fontSize: 11,
                        textTransform: "uppercase", letterSpacing: "0.5px",
                        color: "var(--fg-secondary)",
                      }}>
                        {item.role}
                      </p>
                    </div>
                  </div>
                )}
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Video modal ── */}
      <AnimatePresence>
        {videoOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.2 }}
            onClick={() => setVideoOpen(false)}
            style={{
              position: "fixed", inset: 0, zIndex: 1000,
              background: "rgba(0,0,0,0.88)",
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: 20,
            }}
          >
            <motion.div
              initial={{ scale: 0.93, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              transition={{ duration: 0.22 }}
              onClick={e => e.stopPropagation()}
              style={{
                position: "relative",
                width: "100%", maxWidth: 900,
                aspectRatio: "16/9",
                background: "#000",
              }}
            >
              <video
                ref={modalVideoRef}
                src="/davonte-wheeler.mp4"
                controls
                playsInline
                style={{ width: "100%", height: "100%", display: "block", objectFit: "contain" }}
              />
              <button
                onClick={() => setVideoOpen(false)}
                aria-label="Close video"
                style={{
                  position: "absolute", top: -44, right: 0,
                  background: "none", border: "none", cursor: "pointer",
                  color: "#fff", display: "flex", alignItems: "center", gap: 6,
                  fontFamily: "var(--font-inter)", fontSize: 13, opacity: 0.8,
                }}
              >
                <X size={18} /> Close
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}


