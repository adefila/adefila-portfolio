"use client";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect, useCallback } from "react";
import { ChevronLeft, ChevronRight, Play, X } from "lucide-react";
import { useLang } from "@/context/LangContext";

type TestimonialItem =
  | { type: "video"; name: string; role: string; video: string; avatar: string|null; logo: string|null }
  | { type: "text";  name: string; role: string; key: string;   avatar: string|null; logo: string|null }
  | { type: "upwork" };

// avatar: path to client headshot  (e.g. "/testimonials/alyssa.jpg")
// logo:   path to company logo     (e.g. "/testimonials/hitpay-logo.png")
// Leave both null → shows styled initials placeholder
const testimonialMeta: TestimonialItem[] = [
  { type: "video", name: "Davonte Wheeler",     role: "CEO · BookedEZ LLC",                     video: "/davonte-wheeler.mp4", avatar: null, logo: null },
  { type: "text",  name: "Nitin",               role: "HitPay App",                             key: "testimonials.t0",  avatar: null, logo: null },
  { type: "text",  name: "Alyssa Corso",        role: "SEO Consultant for Healthcare Startups", key: "testimonials.t1",  avatar: null, logo: null },
  { type: "text",  name: "Johnno Van Den Brink",role: "The Initial Agency",                     key: "testimonials.t2",  avatar: null, logo: null },
  { type: "upwork" },
  { type: "text",  name: "Layo",                role: "Content Writer",                         key: "testimonials.t3",  avatar: null, logo: null },
  { type: "text",  name: "Michal Kouril",       role: "Leadopo",                                key: "testimonials.t4",  avatar: null, logo: null },
  { type: "text",  name: "Raffaello Cuccuini",  role: "Humanity",                               key: "testimonials.t5",  avatar: null, logo: null },
  { type: "text",  name: "Heather Burns",       role: "Upside ESG",                             key: "testimonials.t6",  avatar: null, logo: null },
];

function UpworkCard() {
  return (
    <div style={{
      background: "#fff",
      border: "1px solid rgba(0,0,0,0.07)",
      minHeight: 400,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "32px 28px",
    }}>
      {/* Upwork wordmark */}
      <div>
        <svg width="120" height="32" viewBox="0 0 120 32" fill="none" xmlns="http://www.w3.org/2000/svg" aria-label="Upwork">
          <path d="M24.587 19.24c-1.952 0-3.733-.782-5.055-2.053l.374-1.76.017-.08c.29-1.63 1.2-4.366 4.664-4.366 2.45 0 4.443 2.002 4.443 4.13 0 2.13-1.993 4.13-4.443 4.13zm0-11.24c-3.842 0-6.853 2.594-7.932 6.44-.912-1.716-1.595-3.77-2.002-5.894H11v7.186C11 17.94 9.56 19.38 7.353 19.38c-2.208 0-3.648-1.44-3.648-3.648V9h-3.7v7.186C0 20.22 2.652 23 7.353 23c4.7 0 7.352-2.78 7.352-6.814V15.13c.51 1.06 1.143 2.1 1.903 3.04L14.76 23h3.76l1.24-5.848C21.254 18.932 22.85 19.68 24.587 19.68c4.323 0 7.413-3.205 7.413-7.04C32 8.81 28.91 8 24.587 8z" fill="#14a800"/>
          <path d="M40.5 8.5v8.25c0 2.071-1.179 3.25-3.25 3.25-2.07 0-3.25-1.179-3.25-3.25V8.5H30v8.25C30 20.679 32.321 23 36.25 23c3.929 0 6.25-2.321 6.25-6.25V8.5H40.5z" fill="#222222"/>
          <path d="M51.5 8.25C49.07 8.25 47 9.5 46 11.5V8.5h-3v19h3V20.5c1 2 3.07 3.25 5.5 3.25C55.8 23.75 59 20.55 59 16s-3.2-7.75-7.5-7.75zm-.5 12.5c-2.76 0-5-2.24-5-5s2.24-5 5-5 5 2.24 5 5-2.24 5-5 5z" fill="#222222"/>
          <path d="M64 8.5l-5 15h3.25l1-3h6.5l1 3H74l-5-15h-5zm.5 9l2-6 2 6h-4z" fill="#222222"/>
          <path d="M87.5 8.5l-4 8-4-8H76l6 14.5-3 6.5h3.25L91 8.5h-3.5z" fill="#222222"/>
          <path d="M100 8.5l-4.75 6.25L91.5 8.5H88l6 7.75L88 23h3.5l4.75-6.25L101 23h3.5l-6-6.75 6-7.75H100z" fill="#222222"/>
        </svg>
      </div>

      {/* Center stats */}
      <div style={{ textAlign: "center", flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
        {/* Top Rated badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 7,
          background: "#f0fae5", border: "1.5px solid #14a800",
          borderRadius: 999, padding: "7px 16px",
        }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="8" fill="#14a800"/>
            <path d="M4.5 8.5l2.5 2.5 4.5-5" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span style={{
            fontFamily: "var(--font-inter)", fontWeight: 700, fontSize: 13,
            color: "#14a800", letterSpacing: "0.3px",
          }}>
            Top Rated
          </span>
        </div>

        {/* Job Success Score */}
        <div>
          <p style={{
            fontFamily: "var(--font-poppins)", fontWeight: 800,
            fontSize: "clamp(52px, 7vw, 72px)",
            lineHeight: 1, color: "#222", letterSpacing: "-3px",
            marginBottom: 4,
          }}>
            100%
          </p>
          <p style={{
            fontFamily: "var(--font-inter)", fontWeight: 600, fontSize: 12,
            color: "rgba(0,0,0,0.45)", letterSpacing: "2px", textTransform: "uppercase",
          }}>
            Job Success Score
          </p>
        </div>

        {/* Stars */}
        <div style={{ display: "flex", gap: 3 }}>
          {[1,2,3,4,5].map(s => (
            <svg key={s} width="16" height="16" viewBox="0 0 16 16" fill="#14a800">
              <path d="M8 1l1.85 3.75L14 5.5l-3 2.92.71 4.13L8 10.4l-3.71 2.15L5 8.42 2 5.5l4.15-.75L8 1z"/>
            </svg>
          ))}
        </div>
      </div>

      {/* Footer */}
      <p style={{
        fontFamily: "var(--font-inter)", fontWeight: 500, fontSize: 11,
        color: "rgba(0,0,0,0.35)", letterSpacing: "1.5px", textTransform: "uppercase",
        textAlign: "center",
      }}>
        Verified on Upwork
      </p>
    </div>
  );
}

const AVATAR_COLORS = ["#7c3aed","#0073e6","#d4a853","#00ab4a","#e05a8a","#c0a060","#6366f1","#0891b2"];

function getInitials(name: string) {
  const parts = name.trim().split(" ");
  return parts.length === 1
    ? parts[0][0]
    : parts[0][0] + parts[parts.length - 1][0];
}

function Avatar({ name, avatar, logo, size = 44 }: { name: string; avatar: string|null; logo: string|null; size?: number }) {
  const color = AVATAR_COLORS[Math.abs(name.split("").reduce((a, c) => a + c.charCodeAt(0), 0)) % AVATAR_COLORS.length];
  if (avatar) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={avatar}
        alt={name}
        style={{ width: size, height: size, borderRadius: "50%", objectFit: "cover", flexShrink: 0, border: "2px solid rgba(0,0,0,0.06)" }}
      />
    );
  }
  if (logo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={logo}
        alt={name}
        style={{ width: size, height: size, borderRadius: 8, objectFit: "contain", flexShrink: 0, background: "#f5f5f5", padding: 4, border: "1px solid rgba(0,0,0,0.06)" }}
      />
    );
  }
  return (
    <div style={{
      width: size, height: size, borderRadius: "50%",
      background: color, flexShrink: 0,
      display: "flex", alignItems: "center", justifyContent: "center",
    }}>
      <span style={{
        fontFamily: "var(--font-inter)", fontWeight: 700,
        fontSize: size * 0.36, color: "#fff", letterSpacing: "0.5px",
        textTransform: "uppercase", userSelect: "none",
      }}>
        {getInitials(name)}
      </span>
    </div>
  );
}

const AUTOPLAY_DELAY = 6000;

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [page, setPage] = useState(0);
  const [videoOpen, setVideoOpen] = useState(false);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  const autoTimer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const { t } = useLang();
  const perPage = 2;
  const totalPages = Math.ceil(testimonialMeta.length / perPage);
  const visible = testimonialMeta.slice(page * perPage, page * perPage + perPage);

  const goPage = useCallback((next: number) => {
    setPage(next);
    if (autoTimer.current) clearTimeout(autoTimer.current);
  }, []);

  // Autoplay
  useEffect(() => {
    if (videoOpen) return;
    if (autoTimer.current) clearTimeout(autoTimer.current);
    autoTimer.current = setTimeout(() => {
      setPage(p => (p + 1) % totalPages);
    }, AUTOPLAY_DELAY);
    return () => { if (autoTimer.current) clearTimeout(autoTimer.current); };
  }, [page, videoOpen, totalPages]);

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
              onClick={() => goPage((page - 1 + totalPages) % totalPages)}
              style={{
                width: 44, height: 44, borderRadius: 0,
                border: "1px solid rgba(0,0,0,0.15)",
                background: "var(--white)", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}
            >
              <ChevronLeft size={18} strokeWidth={2} />
            </button>
            <button
              aria-label="Next testimonials"
              onClick={() => goPage((page + 1) % totalPages)}
              style={{
                width: 44, height: 44, borderRadius: 0,
                border: "1px solid rgba(0,0,0,0.15)",
                background: "var(--white)", cursor: "pointer",
                display: "flex", alignItems: "center", justifyContent: "center",
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
                {item.type === "upwork" ? (
                  <UpworkCard />
                ) : item.type === "video" ? (
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
                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                      <Avatar name={item.name} avatar={item.avatar ?? null} logo={item.logo ?? null} size={44} />
                      <div>
                        <p style={{
                          fontFamily: "var(--font-inter)", fontWeight: 700, fontSize: 13,
                          textTransform: "uppercase", letterSpacing: "0.5px",
                          color: "var(--fg)", marginBottom: 3,
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


