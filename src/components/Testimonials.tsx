"use client";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { Play, X } from "lucide-react";
import { useLang } from "@/context/LangContext";
import SpecLabel from "./SpecLabel";

type TestimonialItem =
  | { type: "video"; name: string; role: string; video: string; preview: string; poster: string; avatar: string|null; logo: string|null }
  | { type: "text";  name: string; role: string; key: string;   avatar: string|null; logo: string|null }
  | { type: "upwork" };

// avatar: path to client headshot  (e.g. "/testimonials/alyssa.jpg")
// logo:   path to company logo     (e.g. "/testimonials/hitpay-logo.png")
// Leave both null → shows styled initials placeholder
const testimonialMeta: TestimonialItem[] = [
  { type: "video", name: "Davonte Wheeler",     role: "CEO · BookedEZ LLC",                     video: "/davonte-wheeler.mp4", preview: "/davonte-wheeler-preview.mp4", poster: "/davonte-wheeler-poster.jpg", avatar: null, logo: null },
  { type: "text",  name: "Nitin",               role: "HitPay App",                             key: "testimonials.t0",  avatar: "/nitin.png",        logo: null },
  { type: "text",  name: "Alyssa Corso",        role: "SEO Consultant for Healthcare Startups", key: "testimonials.t1",  avatar: "/alyssa-corso.png", logo: null },
  { type: "text",  name: "Johnno Van Den Brink",role: "The Initial Agency",                     key: "testimonials.t2",  avatar: null, logo: null },
  { type: "upwork" },
  { type: "text",  name: "Michal Kouril",       role: "Leadopo",                                key: "testimonials.t4",  avatar: null, logo: null },
  { type: "text",  name: "Raffaello Cuccuini",  role: "Humanity",                               key: "testimonials.t5",  avatar: null, logo: null },
  { type: "text",  name: "Heather Burns",       role: "Upside ESG",                             key: "testimonials.t6",  avatar: "/heather-burns.webp", logo: null },
  { type: "text",  name: "Kevin N.",            role: "The Tech Unit",                          key: "testimonials.t7",  avatar: null, logo: null },
  { type: "text",  name: "Layo",                role: "Content Writer",                         key: "testimonials.t3",  avatar: null, logo: null },
];

function UpworkCard() {
  return (
    <div style={{
      background: "var(--surface)",
      border: "1px solid rgba(var(--ink), 0.14)",
      minHeight: 400,
      display: "flex",
      flexDirection: "column",
      justifyContent: "space-between",
      padding: "32px",
    }}>
      {/* Upwork wordmark */}
      <div>
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img src="/upwork-logo.svg" alt="Upwork" width={140} height={38} className="logo-invert" style={{ display: "block" }} />
      </div>

      {/* Center stats */}
      <div style={{ textAlign: "center", flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
        {/* Job Success Score */}
        <div>
          <p style={{
            fontFamily: "var(--font-poppins)", fontWeight: 800,
            fontSize: "clamp(52px, 7vw, 72px)",
            lineHeight: 1, color: "var(--fg)", letterSpacing: "-3px",
            marginBottom: 4,
          }}>
            100%
          </p>
          <p style={{
            fontFamily: "var(--font-mono)", fontWeight: 600, fontSize: 12,
            color: "rgba(var(--ink), 0.45)", letterSpacing: "2px", textTransform: "uppercase",
          }}>
            Job Success Score
          </p>
        </div>

        {/* Stars */}
        <div style={{ display: "flex", gap: 3 }}>
          {[1,2,3,4,5].map(s => (
            <svg key={s} width="16" height="16" viewBox="0 0 16 16" fill="#6FDA44">
              <path d="M8 1l1.85 3.75L14 5.5l-3 2.92.71 4.13L8 10.4l-3.71 2.15L5 8.42 2 5.5l4.15-.75L8 1z"/>
            </svg>
          ))}
        </div>
      </div>

      {/* Footer */}
      <p style={{
        fontFamily: "var(--font-mono)", fontWeight: 400, fontSize: 11,
        color: "rgba(var(--ink), 0.35)", letterSpacing: "1.5px", textTransform: "uppercase",
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
        style={{ width: size, height: size, borderRadius: "50%", objectFit: "cover", flexShrink: 0, border: "2px solid rgba(var(--ink), 0.06)" }}
      />
    );
  }
  if (logo) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={logo}
        alt={name}
        style={{ width: size, height: size, borderRadius: 8, objectFit: "contain", flexShrink: 0, background: "#f5f5f5", padding: 4, border: "1px solid rgba(var(--ink), 0.14)" }}
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

export default function Testimonials() {
  const [videoOpen, setVideoOpen] = useState(false);
  const modalVideoRef = useRef<HTMLVideoElement>(null);
  // The card's silent preview only downloads once the section is close to the screen
  const videoCardRef = useRef<HTMLDivElement>(null);
  const videoNear = useInView(videoCardRef, { once: true, margin: "400px 0px" });
  const { t } = useLang();
  const video = testimonialMeta.find((m) => m.type === "video");
  const quotes = testimonialMeta.filter((m): m is Extract<TestimonialItem, { type: "text" }> => m.type === "text");

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
      <div style={{ maxWidth: 1160, margin: "0 auto" }}>
        {/* Header row */}
        <div className="testimonials-head" style={{ marginBottom: 48 }}>
          <SpecLabel text={t("testimonials.eyebrow")} />
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
            }}
          >
            {t("testimonials.h1")}
          </motion.h2>
        </div>

        {/* Featured row: stat, video testimonial, Upwork record */}
        <div className="testimonials-grid" style={{ display: "grid", gridTemplateColumns: "240px 1.4fr 1fr", gap: 0, alignItems: "stretch" }}>
          <div
            className="testimonials-stat-card"
            data-reveal
            style={{
              background: "var(--accent-purple)",
              borderRadius: 0,
              padding: "32px",
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
                fontFamily: "var(--font-mono)",
                fontWeight: 500,
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

          {video && video.type === "video" && (
            <div ref={videoCardRef} data-reveal className="testimonial-card testimonial-video" style={{ position: "relative", overflow: "hidden", background: "#111", minHeight: 400 }}>
              {/* Silent 8-second preview loops in the card; the full video plays in the modal */}
              <video
                src={videoNear ? video.preview : undefined}
                poster={video.poster}
                autoPlay
                muted
                loop
                playsInline
                preload="none"
                style={{ position: "absolute", inset: 0, width: "100%", height: "100%", objectFit: "cover" }}
              />
              <div style={{ position: "absolute", inset: 0, background: "linear-gradient(to top, rgba(0,0,0,0.65) 30%, rgba(0,0,0,0.12) 100%)" }} />
              <div style={{ position: "relative", zIndex: 1, padding: 32, display: "flex", flexDirection: "column", justifyContent: "space-between", height: "100%", minHeight: "inherit", pointerEvents: "none" }}>
                <span style={{
                  display: "inline-block", alignSelf: "flex-start",
                  fontFamily: "var(--font-mono)", fontWeight: 700, fontSize: 10,
                  letterSpacing: "3px", textTransform: "uppercase",
                  color: "#fff", border: "1px solid rgba(255,255,255,0.4)",
                  padding: "4px 10px",
                }}>
                  Video Testimonial
                </span>
                <div>
                  <p style={{ fontFamily: "var(--font-inter)", fontWeight: 700, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.5px", color: "#fff", marginBottom: 4 }}>
                    {video.name}
                  </p>
                  <p style={{ fontFamily: "var(--font-inter)", fontWeight: 400, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.5px", color: "rgba(255,255,255,0.85)" }}>
                    {video.role}
                  </p>
                </div>
              </div>
              {/* Play button — full-card overlay button, accessibility-tree-safe */}
              <button
                onClick={() => setVideoOpen(true)}
                aria-label={`Play video testimonial from ${video.name}`}
                style={{
                  position: "absolute", inset: 0, zIndex: 2,
                  width: "100%", height: "100%",
                  background: "none", border: "none", cursor: "pointer",
                  display: "flex", alignItems: "center", justifyContent: "center",
                }}
              >
                <div style={{
                  width: 64, height: 64, borderRadius: "50%",
                  background: "rgba(255,255,255,0.18)",
                  backdropFilter: "blur(6px)",
                  border: "1px solid rgba(255,255,255,0.35)",
                  display: "flex", alignItems: "center", justifyContent: "center",
                  pointerEvents: "none",
                }}>
                  <Play size={24} fill="#fff" color="#fff" style={{ marginLeft: 3 }} />
                </div>
              </button>
            </div>
          )}

          <div data-reveal className="testimonial-card testimonial-upwork">
            <UpworkCard />
          </div>
        </div>
      </div>

      {/* Every written testimonial, scrolling slowly; pauses on hover */}
      <div className="testimonials-marquee" data-reveal>
        <div className="testimonials-track">
          {[0, 1].map((copy) => (
            <div key={copy} className="testimonials-set" aria-hidden={copy === 1 ? true : undefined}>
              {quotes.map((item) => (
                <figure key={item.name} className="quote-card">
                  <div aria-label="5 out of 5 stars" role="img" style={{ display: "flex", gap: 2, marginBottom: 16 }}>
                    {[0, 1, 2, 3, 4].map((s) => (
                      <svg key={s} width="14" height="14" viewBox="0 0 16 16" fill="#f5a524" aria-hidden="true">
                        <path d="M8 1l1.85 3.75L14 5.5l-3 2.92.71 4.13L8 10.4l-3.71 2.15L5 8.42 2 5.5l4.15-.75L8 1z" />
                      </svg>
                    ))}
                  </div>
                  <blockquote style={{
                    fontFamily: "var(--font-inter)", fontWeight: 400,
                    fontSize: 15, lineHeight: 1.65,
                    color: "var(--fg-secondary)", letterSpacing: "-0.2px",
                    margin: 0, flex: 1,
                  }}>
                    {t(item.key)}
                  </blockquote>
                  <figcaption style={{ display: "flex", alignItems: "center", gap: 12, marginTop: 24 }}>
                    <Avatar name={item.name} avatar={item.avatar ?? null} logo={item.logo ?? null} size={40} />
                    <div>
                      <p style={{ fontFamily: "var(--font-inter)", fontWeight: 700, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.5px", color: "var(--fg)", marginBottom: 3 }}>
                        {item.name}
                      </p>
                      <p style={{ fontFamily: "var(--font-inter)", fontWeight: 400, fontSize: 11, textTransform: "uppercase", letterSpacing: "0.5px", color: "var(--fg-secondary)" }}>
                        {item.role}
                      </p>
                    </div>
                  </figcaption>
                </figure>
              ))}
            </div>
          ))}
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
              background: "rgba(var(--ink), 0.88)",
              display: "flex", alignItems: "center", justifyContent: "center",
              padding: 24,
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
                src={video && video.type === "video" ? video.video : undefined}
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


