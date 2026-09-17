"use client";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, X, Download } from "lucide-react";
import MagneticButton from "./MagneticButton";
import { useLang } from "@/context/LangContext";

const techStacks = ["Figma", "Framer", "Webflow", "WordPress", "Shopify", "React", "Claude"];

const workHistory = [
  { period: "Sep 2025 – Present", role: "Framer Developer", company: "Klimt and Design", location: "Los Angeles, CA — Remote" },
  { period: "Aug 2025 – May 2026", role: "UX Designer", company: "Virvly", location: "Dubai, UAE — Remote" },
  { period: "Oct 2024 – Sep 2025", role: "UI/UX Designer & Project Manager", company: "Trust-Tai Agency", location: "Murfreesboro, TN — Remote" },
  { period: "Sep 2023 – Sep 2025", role: "Lead Product Designer", company: "BookedEZ LLC", location: "Atlanta, GA — Remote" },
  { period: "Oct 2024 – Jul 2025", role: "Framer Developer", company: "Hitpay", location: "Singapore — Remote" },
  { period: "Jan 2021 – Jul 2021", role: "Intern WordPress Developer", company: "Davis Enterprises", location: "United States — Remote" },
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

const CAROUSEL_GAP = 0;

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const { t } = useLang();
  const [photoIndex, setPhotoIndex] = useState(0);
  const [lightbox, setLightbox] = useState<number | null>(null);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [slideWidth, setSlideWidth] = useState(0);
  const [isMobile, setIsMobile] = useState(false);
  const directionRef = useRef(1);

  useEffect(() => {
    const update = () => {
      const mobile = window.innerWidth < 768;
      setIsMobile(mobile);
      if (carouselRef.current) {
        const w = carouselRef.current.clientWidth;
        const visible = mobile ? 1 : 3;
        setSlideWidth(w / visible);
      }
    };
    update();
    window.addEventListener("resize", update);
    return () => window.removeEventListener("resize", update);
  }, []);

  const visibleCount = isMobile ? 1 : 3;
  const maxIndex = photos.length - visibleCount;

  const prev = () => setPhotoIndex((p) => Math.max(0, p - 1));
  const next = () => setPhotoIndex((p) => Math.min(maxIndex, p + 1));

  const lbPrev = () => setLightbox((p) => (p !== null ? (p - 1 + photos.length) % photos.length : 0));
  const lbNext = () => setLightbox((p) => (p !== null ? (p + 1) % photos.length : 0));

  useEffect(() => {
    const id = setInterval(() => {
      setPhotoIndex((p) => {
        if (p >= maxIndex) directionRef.current = -1;
        if (p <= 0) directionRef.current = 1;
        return Math.max(0, Math.min(maxIndex, p + directionRef.current));
      });
    }, 4500);
    return () => clearInterval(id);
  }, [maxIndex]);

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
        padding: "80px 20px",
      }}
    >
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
        {t("about.eyebrow")}
      </motion.p>

      <div className="about-columns" style={{ display: "flex", gap: 80, alignItems: "flex-start", flexWrap: "wrap" }}>
        {/* Left: Bio */}
        <div style={{ flex: 2, minWidth: 300 }}>
          <motion.h2
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
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
            {t("about.h1")}
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
            <p>{t("about.p1")}</p>
            <p>{t("about.p2")}</p>
            <p>{t("about.p3")}</p>
          </motion.div>

          {/* Tech stacks */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.25 }}
            style={{ marginTop: 40 }}
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
              {t("about.techLabel")}
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {techStacks.map((tech) => (
                <TechTag key={tech} label={tech} />
              ))}
            </div>
          </motion.div>

          {/* CV download — magnetic button matching Book a Call style */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.32 }}
            style={{ marginTop: 32 }}
          >
            <MagneticButton
              href="/samuel-adefila-cv.pdf"
              download
              style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 600,
                fontSize: 13,
                letterSpacing: "0.5px",
                textTransform: "uppercase",
                color: "var(--fg)",
                background: "transparent",
                border: "1px solid rgba(0,0,0,0.2)",
                padding: "11px 22px",
                textDecoration: "none",
                alignItems: "center",
                gap: 8,
                transition: "background 0.2s ease, border-color 0.2s ease, color 0.2s ease",
              }}
              onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.currentTarget.style.background = "var(--fg)";
                e.currentTarget.style.borderColor = "var(--fg)";
                e.currentTarget.style.color = "#fff";
              }}
              onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
                e.currentTarget.style.background = "transparent";
                e.currentTarget.style.borderColor = "rgba(0,0,0,0.2)";
                e.currentTarget.style.color = "var(--fg)";
              }}
            >
              {t("hero.downloadCv")} <Download size={13} strokeWidth={2} />
            </MagneticButton>
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
            {t("about.historyLabel")}
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
                  {"location" in job && (
                    <span style={{
                      fontFamily: "var(--font-inter)",
                      fontSize: 11,
                      color: "var(--fg-muted)",
                      letterSpacing: "0.01em",
                      marginLeft: 6,
                    }}>
                      · {job.location}
                    </span>
                  )}
                </p>
              </div>
            ))}
          </div>
        </motion.div>
      </div>

      {/* Photo carousel */}
      <motion.div
        className="about-carousel"
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.35 }}
        style={{ marginTop: 64 }}
      >
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 20 }}>
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 700,
              fontSize: 11,
              letterSpacing: "4px",
              textTransform: "uppercase",
              color: "var(--accent-purple)",
            }}
          >
            {t("about.photoLabel")}
          </p>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              aria-label="Previous photo"
              onClick={prev}
              disabled={photoIndex === 0}
              style={{
                width: 36,
                height: 36,
                borderRadius: 0,
                border: "1px solid rgba(0,0,0,0.12)",
                background: photoIndex === 0 ? "rgba(0,0,0,0.03)" : "var(--white)",
                cursor: photoIndex === 0 ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: photoIndex === 0 ? 0.4 : 1,
                transition: "opacity 0.2s",
              }}
            >
              <ChevronLeft size={16} strokeWidth={2} />
            </button>
            <button
              aria-label="Next photo"
              onClick={next}
              disabled={photoIndex >= maxIndex}
              style={{
                width: 36,
                height: 36,
                borderRadius: 0,
                border: "1px solid rgba(0,0,0,0.12)",
                background: photoIndex >= maxIndex ? "rgba(0,0,0,0.03)" : "var(--white)",
                cursor: photoIndex >= maxIndex ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: photoIndex >= maxIndex ? 0.4 : 1,
                transition: "opacity 0.2s",
              }}
            >
              <ChevronRight size={16} strokeWidth={2} />
            </button>
          </div>
        </div>

        <div ref={carouselRef} style={{ overflow: "hidden" }}>
          <motion.div
            animate={{ x: slideWidth > 0 ? -(photoIndex * (slideWidth + CAROUSEL_GAP)) : 0 }}
            transition={{ type: "spring", stiffness: 280, damping: 36, mass: 0.9 }}
            style={{ display: "flex", gap: CAROUSEL_GAP, willChange: "transform" }}
          >
            {photos.map((photo, i) => (
              <div
                key={photo.id}
                onClick={() => setLightbox(i)}
                style={{
                  flexShrink: 0,
                  width: slideWidth > 0 ? slideWidth : "calc(33.333%)",
                  height: isMobile ? 280 : 400,
                  borderRadius: 0,
                  background: "rgba(0,0,0,0.06)",
                  overflow: "hidden",
                  cursor: "zoom-in",
                }}
              >
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src={photo.src}
                  alt={`Gallery photo ${photo.id}`}
                  style={{ width: "100%", height: "100%", objectFit: "cover", display: "block" }}
                />
              </div>
            ))}
          </motion.div>
        </div>

        <div style={{ display: "flex", gap: 6, justifyContent: "center", marginTop: 16 }}>
          {Array.from({ length: maxIndex + 1 }).map((_, i) => (
            <button
              key={i}
              aria-label={`Go to photo ${i + 1}`}
              onClick={() => setPhotoIndex(i)}
              style={{
                width: photoIndex === i ? 20 : 6,
                height: 6,
                borderRadius: 0,
                background: photoIndex === i ? "var(--fg)" : "rgba(0,0,0,0.15)",
                border: "none",
                cursor: "pointer",
                padding: 0,
                transition: "width 0.4s cubic-bezier(0.16,1,0.3,1), background 0.3s ease",
              }}
            />
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
              background: "rgba(0,0,0,0.92)",
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
                position: "absolute",
                top: 20,
                right: 20,
                width: 40,
                height: 40,
                borderRadius: 0,
                background: "rgba(255,255,255,0.12)",
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
              aria-label="Previous photo"
              onClick={(e) => { e.stopPropagation(); lbPrev(); }}
              style={{
                position: "absolute",
                left: 20,
                width: 44,
                height: 44,
                borderRadius: 0,
                background: "rgba(255,255,255,0.12)",
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
                position: "absolute",
                right: 20,
                width: 44,
                height: 44,
                borderRadius: 0,
                background: "rgba(255,255,255,0.12)",
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

            <p
              style={{
                position: "absolute",
                bottom: 20,
                left: "50%",
                transform: "translateX(-50%)",
                fontFamily: "var(--font-inter)",
                fontSize: 12,
                color: "rgba(255,255,255,0.5)",
                letterSpacing: "1px",
              }}
            >
              {lightbox + 1} / {photos.length}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
