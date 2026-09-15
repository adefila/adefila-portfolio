"use client";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const techStacks = ["Figma", "Framer", "Webflow", "WordPress", "Shopify", "React", "Claude"];

const workHistory = [
  { period: "2020–2021", role: "Wordpress Intern Web Developer", company: "Davis Enterprises" },
  { period: "2024–2025", role: "UX/UI Designer", company: "Trust Tai Web Agency" },
  { period: "2024–2025", role: "Framer Developer", company: "HitPay" },
  { period: "Sep 2023–Sep 2025", role: "Lead Product Designer", company: "BookedEZ LLC" },
  { period: "2025–2026", role: "Framer Developer — Remote", company: "Klimt & Design" },
];

const photos = [
  { id: 1, src: "/gallery/photo-1.jpeg" },
  { id: 2, src: "/gallery/photo-2.jpeg" },
  { id: 3, src: "/gallery/photo-3.jpeg" },
  { id: 4, src: "/gallery/photo-4.jpeg" },
  { id: 5, src: "/gallery/photo-5.jpeg" },
];

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
        background: hovered ? "var(--accent-purple)" : "var(--white)",
        border: `1px solid ${hovered ? "var(--accent-purple)" : "rgba(0,0,0,0.12)"}`,
        padding: "8px 16px",
        borderRadius: 100,
        cursor: "default",
        transition: "all 0.18s ease",
        userSelect: "none",
      }}
    >
      {label}
    </span>
  );
}

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [photoIndex, setPhotoIndex] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const [isHoveringMain, setIsHoveringMain] = useState(false);

  const prev = () => setPhotoIndex((p) => (p - 1 + photos.length) % photos.length);
  const next = () => setPhotoIndex((p) => (p + 1) % photos.length);

  const lbPrev = () => setLightbox((p) => (p !== null ? (p - 1 + photos.length) % photos.length : 0));
  const lbNext = () => setLightbox((p) => (p !== null ? (p + 1) % photos.length : 0));

  useEffect(() => {
    if (isHoveringMain) return;
    const id = setInterval(() => {
      setPhotoIndex((p) => (p + 1) % photos.length);
    }, 4500);
    return () => clearInterval(id);
  }, [isHoveringMain]);

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
      style={{
        width: "100%",
        maxWidth: 1200,
        margin: "0 auto",
        padding: "80px 20px 0",
      }}
    >
      {/* Section header */}
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
        ABOUT ME
      </motion.p>

      <div className="about-columns" style={{ display: "flex", gap: 80, alignItems: "flex-start", flexWrap: "wrap" }}>
        {/* Left: Bio */}
        <div style={{ flex: 2, minWidth: 300 }}>
          <motion.h2
            initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
            animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.5, delay: 0.05 }}
            style={{
              fontFamily: "var(--font-poppins)",
              fontWeight: 700,
              fontSize: "clamp(28px, 3.5vw, 48px)",
              letterSpacing: "-1px",
              lineHeight: 1.05,
              textTransform: "uppercase",
              color: "var(--fg)",
              marginBottom: 32,
              maxWidth: 720,
            }}
          >
            FROM WORDPRESS TO FRAMER: 6 YEARS BUILDING WEBSITES THAT CONVERT
          </motion.h2>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.15 }}
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
            <p>
              I began my journey in 2020 as a{" "}
              <strong style={{ color: "var(--accent-purple)", fontWeight: 500 }}>WordPress Developer</strong>,
              building a solid foundation in HTML, CSS3, and JavaScript. In 2022, I transitioned into{" "}
              <strong style={{ color: "var(--accent-purple)", fontWeight: 500 }}>UI/UX Design</strong>,
              driven by a deep passion for crafting intuitive and user-centered digital experiences. Over the years, I&apos;ve collaborated with diverse teams to bring ideas to life, translating vision into engaging, functional products.
            </p>
            <p>
              To strengthen my strategic thinking, I recently completed a{" "}
              <strong style={{ color: "var(--accent-purple)", fontWeight: 500 }}>Product Design Management</strong>{" "}
              course with the MTF Institute of Management Technology &amp; Finance. This experience has refined my ability to align design with business goals and lead design efforts with clarity and purpose.
            </p>
            <p>
              My commitment to delivering high-quality, impactful work has been recognized on{" "}
              <strong style={{ color: "var(--fg)", fontWeight: 600 }}>Upwork</strong>, where I&apos;ve earned the{" "}
              <strong style={{ color: "var(--fg)", fontWeight: 600 }}>Top Rated</strong> badge for my performance as a{" "}
              <strong style={{ color: "var(--fg)", fontWeight: 600 }}>Framer Developer</strong>. I&apos;m focused on helping forward-thinking teams build exceptional digital products that make a difference.
            </p>
          </motion.div>

          {/* Tech stacks */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.25 }}
            style={{ marginTop: 40, paddingBottom: 80 }}
          >
            <p
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
              MY TECH STACKS
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {techStacks.map((tech) => (
                <TechTag key={tech} label={tech} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Right: Work history */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
          style={{ flex: 1, minWidth: 260 }}
        >
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 700,
              fontSize: 11,
              letterSpacing: "4px",
              textTransform: "uppercase",
              color: "var(--accent-purple)",
              marginBottom: 24,
            }}
          >
            MY WORK HISTORY
          </p>
          <div style={{ display: "flex", flexDirection: "column" }}>
            {workHistory.map((job, i) => (
              <div
                key={i}
                style={{
                  padding: "20px 0",
                  borderBottom: "1px solid rgba(0,0,0,0.08)",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: 11,
                    color: "var(--fg-muted)",
                    marginBottom: 6,
                    letterSpacing: "0.02em",
                    textTransform: "uppercase",
                  }}
                >
                  {job.period}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontWeight: 600,
                    fontSize: 14,
                    color: "var(--fg)",
                    marginBottom: 2,
                    letterSpacing: "-0.3px",
                    textTransform: "uppercase",
                  }}
                >
                  {job.role}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: 13,
                    color: "var(--fg-secondary)",
                    letterSpacing: "-0.2px",
                  }}
                >
                  {job.company}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* ── Cinematic Gallery ── */}
      <motion.div
        className="about-cinema"
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.8, delay: 0.45 }}
        style={{
          width: "100vw",
          position: "relative",
          left: "50%",
          transform: "translateX(-50%)",
          background: "#080808",
        }}
      >
        {/* Purple accent line */}
        <div style={{
          height: 1,
          background: "linear-gradient(to right, transparent 0%, rgba(109,40,217,0.5) 30%, rgba(109,40,217,0.2) 70%, transparent 100%)",
        }} />

        {/* Header row */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 28px 16px",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              style={{
                display: "inline-block",
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "#6d28d9",
                boxShadow: "0 0 10px rgba(109,40,217,0.9)",
                flexShrink: 0,
              }}
            />
            <span style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 600,
              fontSize: 10,
              letterSpacing: "3.5px",
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.3)",
            }}>
              IN FRAMES
            </span>
          </div>
          <span style={{
            fontFamily: "var(--font-inter)",
            fontWeight: 400,
            fontSize: 10,
            letterSpacing: "2px",
            color: "rgba(255,255,255,0.18)",
            fontVariantNumeric: "tabular-nums",
          }}>
            {String(photoIndex + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
          </span>
        </div>

        {/* Main photo */}
        <div
          style={{ position: "relative", overflow: "hidden" }}
          onMouseEnter={() => setIsHoveringMain(true)}
          onMouseLeave={() => setIsHoveringMain(false)}
        >
          <AnimatePresence mode="wait">
            <motion.div
              key={photoIndex}
              initial={{ opacity: 0, scale: 1.04 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.97 }}
              transition={{ duration: 0.6, ease: EASE }}
              onClick={() => setLightbox(photoIndex)}
              style={{
                width: "100%",
                height: "clamp(220px, 38vw, 560px)",
                overflow: "hidden",
                cursor: "zoom-in",
                position: "relative",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photos[photoIndex].src}
                alt={`Gallery photo ${photoIndex + 1}`}
                style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
              />
              {/* Cinematic letterbox gradient */}
              <div style={{
                position: "absolute",
                inset: 0,
                background: "linear-gradient(to bottom, rgba(8,8,8,0.65) 0%, transparent 22%, transparent 62%, rgba(8,8,8,0.75) 100%)",
                pointerEvents: "none",
              }} />
              {/* Film grain */}
              <div style={{
                position: "absolute",
                inset: 0,
                backgroundImage: `url("data:image/svg+xml,%3Csvg viewBox='0 0 200 200' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='100%25' height='100%25' filter='url(%23n)'/%3E%3C/svg%3E")`,
                backgroundSize: "180px",
                opacity: 0.07,
                mixBlendMode: "overlay",
                pointerEvents: "none",
              }} />
              {/* Expand hint */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: isHoveringMain ? 1 : 0 }}
                transition={{ duration: 0.2 }}
                style={{
                  position: "absolute",
                  bottom: 18,
                  right: 22,
                  fontFamily: "var(--font-inter)",
                  fontSize: 9,
                  letterSpacing: "2.5px",
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.4)",
                  pointerEvents: "none",
                }}
              >
                EXPAND ↗
              </motion.div>
            </motion.div>
          </AnimatePresence>

          {/* Prev hit zone */}
          <button
            onClick={prev}
            aria-label="Previous photo"
            style={{
              position: "absolute",
              left: 0,
              top: 0,
              bottom: 0,
              width: "18%",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              paddingLeft: 20,
              color: "rgba(255,255,255,0.45)",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.9)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
          >
            <ChevronLeft size={30} strokeWidth={1.2} />
          </button>

          {/* Next hit zone */}
          <button
            onClick={next}
            aria-label="Next photo"
            style={{
              position: "absolute",
              right: 0,
              top: 0,
              bottom: 0,
              width: "18%",
              background: "transparent",
              border: "none",
              cursor: "pointer",
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              paddingRight: 20,
              color: "rgba(255,255,255,0.45)",
              transition: "color 0.2s",
            }}
            onMouseEnter={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.9)")}
            onMouseLeave={(e) => (e.currentTarget.style.color = "rgba(255,255,255,0.45)")}
          >
            <ChevronRight size={30} strokeWidth={1.2} />
          </button>
        </div>

        {/* Film strip thumbnails */}
        <div style={{
          display: "flex",
          gap: 4,
          justifyContent: "center",
          padding: "18px 28px 32px",
        }}>
          {photos.map((photo, i) => (
            <button
              key={i}
              onClick={() => setPhotoIndex(i)}
              style={{
                width: 68,
                height: 42,
                border: `1px solid ${i === photoIndex ? "rgba(109,40,217,0.7)" : "rgba(255,255,255,0.07)"}`,
                padding: 2,
                overflow: "hidden",
                background: "rgba(255,255,255,0.02)",
                cursor: "pointer",
                opacity: i === photoIndex ? 1 : 0.3,
                transition: "opacity 0.3s ease, border-color 0.3s ease",
                flexShrink: 0,
                outline: "none",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photo.src}
                alt=""
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                  filter: i === photoIndex ? "none" : "grayscale(100%)",
                  transition: "filter 0.3s ease",
                }}
              />
            </button>
          ))}
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
              background: "rgba(0,0,0,0.94)",
              zIndex: 1000,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <button
              onClick={() => setLightbox(null)}
              style={{
                position: "absolute",
                top: 20,
                right: 20,
                width: 40,
                height: 40,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.1)",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
              }}
            >
              <X size={18} />
            </button>

            <button
              onClick={(e) => { e.stopPropagation(); lbPrev(); }}
              style={{
                position: "absolute",
                left: 20,
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.1)",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
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
              style={{
                maxWidth: "85vw",
                maxHeight: "88vh",
                overflow: "hidden",
              }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photos[lightbox].src}
                alt={`Gallery photo ${lightbox + 1}`}
                style={{ maxWidth: "85vw", maxHeight: "88vh", objectFit: "contain", display: "block" }}
              />
            </motion.div>

            <button
              onClick={(e) => { e.stopPropagation(); lbNext(); }}
              style={{
                position: "absolute",
                right: 20,
                width: 44,
                height: 44,
                borderRadius: "50%",
                background: "rgba(255,255,255,0.1)",
                border: "none",
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                color: "#fff",
              }}
            >
              <ChevronRight size={22} />
            </button>

            <p style={{
              position: "absolute",
              bottom: 20,
              left: "50%",
              transform: "translateX(-50%)",
              fontFamily: "var(--font-inter)",
              fontSize: 11,
              color: "rgba(255,255,255,0.35)",
              letterSpacing: "2px",
              fontVariantNumeric: "tabular-nums",
            }}>
              {String(lightbox + 1).padStart(2, "0")} / {String(photos.length).padStart(2, "0")}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
