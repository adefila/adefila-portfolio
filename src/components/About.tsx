"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

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

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [photoIndex, setPhotoIndex] = useState(0);
  const visibleCount = 3;
  const maxIndex = photos.length - visibleCount;

  const prev = () => setPhotoIndex((p) => Math.max(0, p - 1));
  const next = () => setPhotoIndex((p) => Math.min(maxIndex, p + 1));

  return (
    <section
      id="about"
      style={{
        width: "100%",
        maxWidth: 1200,
        margin: "0 auto",
        padding: "60px 20px",
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

      <div style={{ display: "flex", gap: 80, alignItems: "flex-start", flexWrap: "wrap" }}>
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
        initial={{ opacity: 0, y: 20 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.35 }}
        style={{ marginTop: 64 }}
      >
        {/* Carousel header */}
        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            marginBottom: 20,
          }}
        >
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

        {/* Carousel track */}
        <div style={{ overflow: "hidden" }}>
          <motion.div
            animate={{ x: `calc(-${photoIndex} * (33.333% + 12px))` }}
            transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
            style={{
              display: "flex",
              gap: 12,
            }}
          >
            {photos.map((photo) => (
              <div
                key={photo.id}
                style={{
                  flexShrink: 0,
                  width: "calc(33.333% - 8px)",
                  aspectRatio: "4/3",
                  borderRadius: 12,
                  background: "rgba(0,0,0,0.06)",
                  border: "1px solid rgba(0,0,0,0.07)",
                  overflow: "hidden",
                  cursor: "pointer",
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

        {/* Dot indicators */}
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
                transition: "all 0.25s ease",
              }}
            />
          ))}
        </div>
      </motion.div>
    </section>
  );
}
