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

const CAROUSEL_GAP = 0;

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
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
              I started in 2020 doing{" "}
              <strong style={{ color: "var(--accent-purple)", fontWeight: 500 }}>WordPress sites</strong>{" "}
              for small businesses — nothing glamorous, but those early projects taught me more about what clients actually need than anything I&apos;ve read since. I figured out quickly that most people don&apos;t need a beautiful site. They need one that works.
            </p>
            <p>
              That led me into{" "}
              <strong style={{ color: "var(--accent-purple)", fontWeight: 500 }}>UI/UX Design</strong>{" "}
              in 2022, then Framer — and that&apos;s where everything clicked. Being able to take a project from blank Figma canvas to live, indexed, and converting without the broken-telephone of handoffs means what ships actually looks like what was designed. I&apos;ve done it across SaaS dashboards, agency sites, e-commerce, and everything in between.
            </p>
            <p>
              That track record earned me{" "}
              <strong style={{ color: "var(--fg)", fontWeight: 600 }}>Top Rated on Upwork</strong>{" "}
              — 100% Job Success across 50+ projects. Most clients keep coming back — not because they have to, but because we got the result right the first time. That&apos;s the part I&apos;m most proud of.
            </p>
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
            PHOTO LIBRARY
          </p>
          <div style={{ display: "flex", gap: 8 }}>
            <button
              onClick={prev}
              disabled={photoIndex === 0}
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
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
              onClick={next}
              disabled={photoIndex >= maxIndex}
              style={{
                width: 36,
                height: 36,
                borderRadius: "50%",
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
              onClick={() => setPhotoIndex(i)}
              style={{
                width: photoIndex === i ? 20 : 6,
                height: 6,
                borderRadius: 100,
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
              onClick={() => setLightbox(null)}
              style={{
                position: "absolute",
                top: 20,
                right: 20,
                width: 40,
                height: 40,
                borderRadius: "50%",
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
              onClick={(e) => { e.stopPropagation(); lbPrev(); }}
              style={{
                position: "absolute",
                left: 20,
                width: 44,
                height: 44,
                borderRadius: "50%",
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
              style={{ maxWidth: "80vw", maxHeight: "85vh", borderRadius: 12, overflow: "hidden" }}
            >
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={photos[lightbox].src}
                alt={`Gallery photo ${lightbox + 1}`}
                style={{ maxWidth: "80vw", maxHeight: "85vh", objectFit: "contain", display: "block" }}
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
