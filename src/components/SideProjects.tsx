"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

const projects = [
  {
    name: "CVCraft",
    tagline: "I kept getting ghosted after applying. Turned out my CV wasn't making it past ATS. Built this to fix that — it rewrites your CV and lets you run it through an HR simulator before you send it.",
    stack: ["Claude API", "Next.js"],
    href: "https://cvcraftai.vercel.app/",
    accent: "#7c3aed",
    label: "AI TOOL",
  },
  {
    name: "Video Compressor",
    tagline: "I had a 400MB Loom recording I needed to send to a client. Every tool online wanted my email or had a file limit. Built this in a weekend — compresses in the browser, nothing ever leaves your device.",
    stack: ["Next.js", "FFmpeg WASM"],
    href: "https://video-compressor-bay.vercel.app/",
    accent: "#0073e6",
    label: "UTILITY",
  },
  {
    name: "CourseShare",
    tagline: "My uni course materials lived across 12 different WhatsApp groups and no one could find anything. Built one place where students upload notes, anyone can search, and nothing gets buried.",
    stack: ["Next.js", "Supabase"],
    href: "https://courseshare-delta.vercel.app/",
    accent: "#00ab4a",
    label: "PLATFORM",
  },
];

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function SideProjects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      id="side-projects"
      style={{
        width: "100%",
        maxWidth: 1200,
        margin: "0 auto",
        padding: "80px 20px",
      }}
    >
      {/* Header — matches other sections */}
      <div
        ref={ref}
        style={{
          display: "flex",
          gap: 80,
          alignItems: "flex-end",
          flexWrap: "wrap",
          marginBottom: 56,
          borderBottom: "1px solid rgba(0,0,0,0.08)",
          paddingBottom: 40,
        }}
      >
        <div style={{ flex: "1 1 360px" }}>
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
            SIDE PROJECTS
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
            animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.5, delay: 0.06, ease: EASE }}
            style={{
              fontFamily: "var(--font-poppins)",
              fontWeight: 700,
              fontSize: "clamp(26px, 3.2vw, 44px)",
              letterSpacing: "-1px",
              lineHeight: 1.08,
              textTransform: "uppercase",
              color: "var(--fg)",
            }}
          >
            Stuff I built{" "}
            <span style={{ color: "rgb(163,163,163)" }}>
              because I needed it.
            </span>
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.14 }}
          style={{
            flex: "1 1 280px",
            fontFamily: "var(--font-inter)",
            fontWeight: 400,
            fontSize: 15,
            lineHeight: 1.7,
            color: "var(--fg-secondary)",
            letterSpacing: "-0.3px",
          }}
        >
          Not client work. Three things I built because I ran into the problem myself.
        </motion.p>
      </div>

      {/* Cards grid */}
      <div
        className="side-projects-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 1,
          background: "rgba(0,0,0,0.06)",
          border: "1px solid rgba(0,0,0,0.07)",
        }}
      >
        {projects.map((project, i) => (
          <motion.a
            key={project.name}
            href={project.href}
            target="_blank"
            rel="noopener noreferrer"
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.1, ease: EASE }}
            style={{
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              padding: "32px 28px",
              background: "var(--bg)",
              textDecoration: "none",
              borderRight: i < projects.length - 1 ? "1px solid rgba(0,0,0,0.07)" : "none",
              transition: "background 0.2s",
              minHeight: 260,
              position: "relative",
              overflow: "hidden",
            }}
            whileHover={{ background: "var(--white)" } as never}
          >
            {/* Accent top bar */}
            <div
              style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 2,
                background: project.accent,
              }}
            />

            {/* Top: label + arrow */}
            <div>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  marginBottom: 16,
                }}
              >
                <span
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontWeight: 600,
                    fontSize: 10,
                    letterSpacing: "2px",
                    textTransform: "uppercase",
                    color: project.accent,
                  }}
                >
                  {project.label}
                </span>
                <ArrowUpRight
                  size={16}
                  strokeWidth={1.5}
                  color="rgba(0,0,0,0.25)"
                />
              </div>

              <h3
                style={{
                  fontFamily: "var(--font-poppins)",
                  fontWeight: 700,
                  fontSize: "clamp(18px, 1.6vw, 22px)",
                  letterSpacing: "-0.5px",
                  color: "var(--fg)",
                  marginBottom: 12,
                  lineHeight: 1.2,
                }}
              >
                {project.name}
              </h3>

              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 400,
                  fontSize: 14,
                  lineHeight: 1.65,
                  color: "var(--fg-secondary)",
                  letterSpacing: "-0.2px",
                }}
              >
                {project.tagline}
              </p>
            </div>

            {/* Bottom: stack tags */}
            <div
              style={{
                display: "flex",
                flexWrap: "wrap",
                gap: 6,
                marginTop: 24,
              }}
            >
              {project.stack.map((tech) => (
                <span
                  key={tech}
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontWeight: 500,
                    fontSize: 11,
                    letterSpacing: "0.3px",
                    color: "var(--fg-secondary)",
                    background: "rgba(0,0,0,0.04)",
                    border: "1px solid rgba(0,0,0,0.08)",
                    padding: "4px 10px",
                    borderRadius: 100,
                  }}
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.a>
        ))}
      </div>
    </section>
  );
}
