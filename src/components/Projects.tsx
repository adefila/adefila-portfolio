"use client";
import { motion, useInView } from "framer-motion";
import { ArrowUpRight } from "lucide-react";
import { useRef } from "react";

const projects = [
  { title: "The Prime Media", meta: "Figma to Framer Development", year: "2025", href: "https://theprimemedia.ca/" },
  { title: "The Initial — AI Website", meta: "Figma to Framer", year: "2025", href: "https://the-initial.com/" },
  { title: "HitPay — SaaS Website", meta: "Framer Development", year: "2024", href: "https://hitpayapp.com/" },
  { title: "BindHQ", meta: "Framer Template Customization", year: "2026", href: "https://www.bindhq.com/" },
  { title: "Clipmaster — Video Agency", meta: "Web Design", year: "2024", href: "https://clipmasters.io/" },
  { title: "VPA London — Talent Website", meta: "Framer Development", year: "2025", href: "https://www.vpalondon.co.uk/" },
  { title: "Virvly", meta: "Framer Development", year: "2025", href: "https://virvly.com/" },
  { title: "Jamal Muse — Personal Portfolio", meta: "Claude to Framer", year: "2025", href: "https://www.jamalmuse.com/" },
  { title: "Alyssa Corso — Personal Portfolio", meta: "Framer Development", year: "2026", href: "https://alyssacorso.com/" },
  { title: "Venara Talent", meta: "Framer Development", year: "2026", href: "https://www.venaratalent.com/" },
  { title: "Emalbu", meta: "HTML to Framer Development", year: "2026", href: "https://emalbu.com/" },
  { title: "Upside ESG", meta: "SaaS Framer Development and Integrations", year: "2026", href: "https://upside-esg.com/" },
];

const COLS = 3;
const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function Projects() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      id="work"
      style={{
        width: "100%",
        maxWidth: 1200,
        margin: "0 auto",
        padding: "80px 20px",
      }}
    >
      {/* Header */}
      <div style={{ marginBottom: 40 }}>
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
          RECENT PROJECTS
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.5, delay: 0.05 }}
          style={{
            fontFamily: "var(--font-poppins)",
            fontWeight: 700,
            fontSize: "clamp(28px, 3.5vw, 48px)",
            letterSpacing: "-1px",
            lineHeight: 1,
            textTransform: "uppercase",
            color: "var(--fg)",
          }}
        >
          Featured Projects
        </motion.h2>
      </div>

      {/* Numbered grid */}
      <div
        className="projects-grid"
        style={{
          borderTop: "1px solid rgba(0,0,0,0.08)",
          display: "grid",
          gridTemplateColumns: `repeat(${COLS}, 1fr)`,
        }}
      >
        {projects.map((project, i) => {
          const col = i % COLS;
          const isLastRow = i >= projects.length - COLS;
          return (
            <motion.div
              key={project.title}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.1 + i * 0.04, ease: EASE }}
              className="project-row"
              style={{
                display: "flex",
                alignItems: "flex-start",
                justifyContent: "space-between",
                gap: 16,
                padding: "28px 0",
                paddingLeft: col !== 0 ? 28 : 0,
                paddingRight: col !== COLS - 1 ? 28 : 0,
                borderBottom: isLastRow ? "none" : "1px solid rgba(0,0,0,0.08)",
                borderRight: col !== COLS - 1 ? "1px solid rgba(0,0,0,0.08)" : "none",
                transition: "background 0.2s",
              }}
            >
              <div style={{ display: "flex", alignItems: "flex-start", gap: 16, flex: 1, minWidth: 0 }}>
                <span
                  className="project-num"
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontWeight: 400,
                    fontSize: 13,
                    color: "var(--fg-muted)",
                    flexShrink: 0,
                    paddingTop: 2,
                    transition: "color 0.2s",
                  }}
                >
                  {i + 1}
                </span>
                <div style={{ minWidth: 0, flex: 1 }}>
                  <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 8, marginBottom: 4 }}>
                    <h3
                      style={{
                        fontFamily: "var(--font-poppins)",
                        fontWeight: 600,
                        fontSize: "clamp(12px, 1.1vw, 15px)",
                        letterSpacing: "-0.3px",
                        textTransform: "uppercase",
                        color: "var(--fg)",
                        lineHeight: 1.3,
                      }}
                    >
                      {project.title}
                    </h3>
                    {project.href && (
                      <a
                        href={project.href}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link-icon"
                        onClick={(e) => e.stopPropagation()}
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          justifyContent: "center",
                          width: 26,
                          height: 26,
                          borderRadius: "50%",
                          border: "1px solid rgba(0,0,0,0.1)",
                          color: "var(--fg-secondary)",
                          flexShrink: 0,
                          transition: "background 0.2s, color 0.2s, border-color 0.2s",
                          textDecoration: "none",
                        }}
                      >
                        <ArrowUpRight size={13} strokeWidth={2} />
                      </a>
                    )}
                  </div>
                  <p
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontWeight: 400,
                      fontSize: 11,
                      color: "var(--fg-secondary)",
                      letterSpacing: "0.5px",
                      textTransform: "uppercase",
                    }}
                  >
                    {project.meta} &nbsp;·&nbsp; {project.year}
                  </p>
                </div>
              </div>
            </motion.div>
          );
        })}
      </div>
    </section>
  );
}
