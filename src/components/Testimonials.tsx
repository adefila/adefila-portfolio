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
  { type: "text",  name: "Kevin N.",            role: "The Tech Unit",                          key: "testimonials.t7",  avatar: null, logo: null },
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
      {/* Upwork wordmark — official SVG */}
      <div>
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 153" width="140" height="42" aria-label="Upwork" style={{ display: "block" }}>
          <path d="M140.106589,96.6278184 C131.785652,96.6278184 123.989458,93.1045388 116.905417,87.3698389 L118.629575,79.2737921 L118.704539,78.9739385 C120.241288,70.3531479 125.113909,55.8852123 140.106589,55.8852123 C151.351098,55.8852123 160.496633,65.0307467 160.496633,76.2752562 C160.459151,87.482284 151.313616,96.6278184 140.106589,96.6278184 Z M140.106589,35.2327965 C120.953441,35.2327965 106.110688,47.6767204 100.076135,68.1417277 C90.8556369,54.310981 83.884041,37.7065886 79.7985359,23.7259151 L59.1836018,23.7259151 L59.1836018,77.3622255 C59.1836018,87.9320644 50.5628111,96.5528551 39.9929722,96.5528551 C29.4231332,96.5528551 20.8023426,87.9320644 20.8023426,77.3622255 L20.8023426,23.7259151 L0.187408492,23.7259151 L0.187408492,77.3622255 C0.112445095,99.3265007 17.9912152,117.355198 39.9554905,117.355198 C61.9197657,117.355198 79.7985359,99.3265007 79.7985359,77.3622255 L79.7985359,68.3666179 C83.8090776,76.7250366 88.7191801,85.1584187 94.6787701,92.6547584 L82.0474378,152.025769 L103.149634,152.025769 L112.295168,108.959297 C120.316252,114.09429 129.53675,117.317716 140.106589,117.317716 C162.708053,117.317716 181.111567,98.801757 181.111567,76.2002928 C181.111567,53.6363104 162.708053,35.2327965 140.106589,35.2327965 Z" fill="#6FDA44"/>
          <path d="M244.043338,37.5566618 L257.349341,91.1929722 L272.004685,37.5566618 L289.471157,37.5566618 L266.944656,115.068814 L249.478184,115.068814 L235.647438,61.0951684 L221.854173,115.031332 L204.387701,115.031332 L181.861201,37.5191801 L199.327672,37.5191801 L213.983016,91.1554905 L227.289019,37.5191801 L244.043338,37.5191801 L244.043338,37.5566618 Z M331.26325,35.2327965 C308.586823,35.2327965 290.220791,53.6363104 290.220791,76.2752562 C290.220791,98.9516837 308.624305,117.317716 331.26325,117.317716 C353.939678,117.317716 372.343192,98.9516837 372.343192,76.2752562 C372.343192,53.5988287 353.939678,35.2327965 331.26325,35.2327965 Z M331.26325,100.450952 C317.919766,100.450952 307.125037,89.6562225 307.125037,76.3127379 C307.125037,62.9692533 317.957247,52.1745242 331.26325,52.1745242 C344.606735,52.1745242 355.401464,62.9692533 355.401464,76.3127379 C355.401464,89.6187408 344.606735,100.450952 331.26325,100.450952 Z M422.231332,54.9106881 C410.499561,54.9106881 401.016691,64.4310395 401.016691,76.1253294 L401.016691,115.031332 L383.437775,115.031332 L383.437775,37.5566618 L401.016691,37.5566618 L401.016691,49.4758419 C401.016691,49.4758419 408.513031,37.5191801 423.918009,37.5191801 L429.315373,37.5191801 L429.315373,54.9106881 L422.231332,54.9106881 Z M481.227526,73.2767204 C493.708931,66.2301611 502.179795,52.8491947 502.179795,37.5191801 L484.600878,37.5191801 C484.600878,50.450366 474.106003,60.9452416 461.174817,60.9452416 L458.81347,60.9452416 L458.81347,0.149926794 L441.234553,0.149926794 L441.234553,115.031332 L458.81347,115.031332 L458.81347,78.5241581 L460.912445,78.5241581 C462.636603,78.5241581 464.885505,79.6486091 465.897511,81.0354319 L490.860322,115.031332 L511.925037,115.031332 L481.227526,73.2767204 Z" fill="#000000"/>
        </svg>
      </div>

      {/* Center stats */}
      <div style={{ textAlign: "center", flex: 1, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
        {/* Top Rated badge */}
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 7,
          background: "#f0fae5", border: "1.5px solid #6FDA44",
          borderRadius: 999, padding: "7px 16px",
        }}>
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
            <circle cx="8" cy="8" r="8" fill="#6FDA44"/>
            <path d="M4.5 8.5l2.5 2.5 4.5-5" stroke="#fff" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <span style={{
            fontFamily: "var(--font-inter)", fontWeight: 700, fontSize: 13,
            color: "#5bba00", letterSpacing: "0.3px",
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
            <svg key={s} width="16" height="16" viewBox="0 0 16 16" fill="#6FDA44">
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

const AUTOPLAY_DELAY = 10000;

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


