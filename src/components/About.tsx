"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const techStacks = ["Figma", "Framer", "Webflow", "WordPress"];

const workHistory = [
  { year: "2024 – Present", role: "Senior Framer Developer", company: "Freelance (Upwork)", badge: "Top Rated" },
  { year: "2022 – 2024", role: "UI/UX Designer", company: "Freelance", badge: null },
  { year: "2020 – 2022", role: "WordPress Developer", company: "Freelance", badge: null },
];

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

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
          letterSpacing: "10px",
          textTransform: "uppercase",
          color: "var(--fg-secondary)",
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
              fontSize: "clamp(24px, 3vw, 44px)",
              letterSpacing: "-2px",
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
                fontFamily: "var(--font-poppins)",
                fontWeight: 500,
                fontSize: 16,
                letterSpacing: "-0.7px",
                textTransform: "uppercase",
                color: "var(--fg)",
                marginBottom: 16,
              }}
            >
              My tech stacks
            </p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              {techStacks.map((tech) => (
                <span
                  key={tech}
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontWeight: 500,
                    fontSize: 12,
                    letterSpacing: "-0.4px",
                    color: "var(--white)",
                    background: "var(--fg)",
                    padding: "8px 16px",
                    borderRadius: 100,
                  }}
                >
                  {tech}
                </span>
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
              fontFamily: "var(--font-poppins)",
              fontWeight: 500,
              fontSize: 16,
              letterSpacing: "-0.7px",
              textTransform: "uppercase",
              color: "var(--fg)",
              marginBottom: 24,
            }}
          >
            My work history
          </p>
          <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
            {workHistory.map((job, i) => (
              <div
                key={i}
                style={{
                  padding: "20px 0",
                  borderBottom: i < workHistory.length - 1 ? "1px solid rgba(0,0,0,0.08)" : "none",
                }}
              >
                <p
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: 12,
                    color: "var(--fg-muted)",
                    marginBottom: 6,
                    letterSpacing: "-0.2px",
                  }}
                >
                  {job.year}
                </p>
                <p
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontWeight: 600,
                    fontSize: 14,
                    color: "var(--fg)",
                    marginBottom: 4,
                    letterSpacing: "-0.3px",
                  }}
                >
                  {job.role}
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
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
                  {job.badge && (
                    <span
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontWeight: 600,
                        fontSize: 10,
                        color: "#14a800",
                        background: "rgba(20,168,0,0.1)",
                        padding: "3px 8px",
                        borderRadius: 100,
                        letterSpacing: "0.02em",
                      }}
                    >
                      {job.badge}
                    </span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
