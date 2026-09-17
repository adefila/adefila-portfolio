"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowLeft, ArrowUpRight } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const DELIVERABLES = [
  "Framer site build from Figma",
  "Responsive layout — mobile, tablet, desktop",
  "Scroll-triggered animations and page transitions",
  "AI-themed micro-interactions",
  "SEO metadata and Open Graph",
  "QA across browsers and devices",
  "Loom handoff walkthrough",
];

const PROCESS_STEPS = [
  {
    n: "01",
    title: "Kick-off Call",
    dur: "Day 1",
    desc: "30 minutes. The client had a complete Figma file and a clear direction — they wanted the site to feel like an AI product without leaning on the usual futuristic clichés. The brief: modern, clean, a little unexpected.",
    detail: "The design had several animation concepts that weren't spec'd. We agreed to treat them as direction, not spec — I'd make calls in the build and flag anything that felt off.",
  },
  {
    n: "02",
    title: "Figma Review",
    dur: "Days 1–2",
    desc: "The Figma file was well-structured but had a few gaps in the interactive states — hover effects, active menu states, and the hero animation were left to interpretation. I documented my read of each and got sign-off before starting.",
    detail: "Better to spend 2 hours clarifying than 2 days rebuilding.",
  },
  {
    n: "03",
    title: "Framer Build",
    dur: "Days 3–12",
    desc: "Built the homepage and key product pages first. The hero animation — a typewriter-style prompt that cycles through AI use cases — was done as a custom Framer component. Live preview link shared on Day 4.",
    detail: "The client requested two changes during the build phase: one to the hero copy cycling speed, one to the card hover behaviour. Both done same day.",
  },
  {
    n: "04",
    title: "QA & Launch",
    dur: "Days 13–14",
    desc: "Full browser and device matrix. The animation performance on lower-end Android devices needed one optimisation pass. Launched to the-initial.com on Day 14.",
    detail: "Delivered a Loom covering page editing, CMS content, and how to swap the hero prompt list without touching code.",
  },
];

export default function TheInitialCaseStudy() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <>
      <Navbar />
      <main style={{ background: "var(--bg)", minHeight: "100vh" }}>

        {/* ── Hero ── */}
        <section style={{ maxWidth: 1200, margin: "0 auto", padding: "120px 40px 80px" }}>
          <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, ease: EASE }}
          >
            <Link
              href="/#work"
              style={{
                display: "inline-flex", alignItems: "center", gap: 8,
                fontFamily: "var(--font-inter)", fontWeight: 500, fontSize: 12,
                letterSpacing: "2px", textTransform: "uppercase",
                color: "var(--fg-secondary)", textDecoration: "none",
                marginBottom: 48,
              }}
            >
              <ArrowLeft size={14} strokeWidth={2} />
              All Projects
            </Link>

            {/* Meta grid */}
            <div style={{
              display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
              gap: 0, borderTop: "1px solid rgba(0,0,0,0.08)",
              borderBottom: "1px solid rgba(0,0,0,0.08)",
              marginBottom: 64,
            }}
              className="cs-meta-grid"
            >
              {[
                { label: "CLIENT", value: "The Initial" },
                { label: "SERVICE", value: "Figma to Framer" },
                { label: "TIMELINE", value: "14 Days" },
                { label: "YEAR", value: "2025" },
              ].map((item, i) => (
                <div key={i} style={{
                  padding: "28px 0",
                  paddingLeft: i > 0 ? 32 : 0,
                  borderLeft: i > 0 ? "1px solid rgba(0,0,0,0.08)" : "none",
                }}>
                  <p style={{
                    fontFamily: "var(--font-inter)", fontWeight: 700, fontSize: 9,
                    letterSpacing: "2.5px", textTransform: "uppercase",
                    color: "var(--accent-purple)", marginBottom: 8,
                  }}>{item.label}</p>
                  <p style={{
                    fontFamily: "var(--font-poppins)", fontWeight: 600, fontSize: 15,
                    letterSpacing: "-0.3px", color: "var(--fg)",
                  }}>{item.value}</p>
                </div>
              ))}
            </div>

            {/* Title + live link */}
            <div style={{ display: "flex", alignItems: "flex-start", justifyContent: "space-between", gap: 32, flexWrap: "wrap", marginBottom: 48 }}>
              <h1 style={{
                fontFamily: "var(--font-poppins)", fontWeight: 700,
                fontSize: "clamp(32px, 4vw, 56px)", letterSpacing: "-1.5px",
                lineHeight: 1.05, textTransform: "uppercase", color: "var(--fg)",
                maxWidth: 700,
              }}>
                The Initial —<br />AI Website Build
              </h1>
              <a
                href="https://the-initial.com/"
                target="_blank" rel="noopener noreferrer"
                style={{
                  display: "inline-flex", alignItems: "center", gap: 8,
                  padding: "14px 24px",
                  border: "1px solid rgba(0,0,0,0.15)",
                  fontFamily: "var(--font-inter)", fontWeight: 700, fontSize: 11,
                  letterSpacing: "2px", textTransform: "uppercase",
                  color: "var(--fg)", textDecoration: "none",
                  flexShrink: 0,
                }}
              >
                View Live <ArrowUpRight size={13} strokeWidth={2.5} />
              </a>
            </div>

            {/* Live screenshot */}
            <div style={{
              width: "100%", aspectRatio: "16/9",
              overflow: "hidden", background: "#111", position: "relative",
            }}>
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={`https://api.microlink.io?url=${encodeURIComponent("https://the-initial.com/")}&screenshot=true&meta=false&embed=screenshot.url`}
                alt="The Initial website screenshot"
                style={{ width: "100%", height: "100%", objectFit: "cover", objectPosition: "top center" }}
              />
            </div>
          </motion.div>
        </section>

        {/* ── Overview ── */}
        <section style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 40px" }}>
          <div className="cs-overview-grid" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 80 }}>
            <div>
              <p style={{
                fontFamily: "var(--font-inter)", fontWeight: 700, fontSize: 9,
                letterSpacing: "2.5px", textTransform: "uppercase",
                color: "var(--accent-purple)", marginBottom: 20,
              }}>THE PROJECT</p>
              <p style={{
                fontFamily: "var(--font-inter)", fontWeight: 400, fontSize: 17,
                lineHeight: 1.7, color: "var(--fg-secondary)",
              }}>
                The Initial is an AI product company that needed a site that could hold its own — modern without the
                generic AI aesthetic, and technically polished enough to earn trust with a technical audience.
                The design was done; the job was to make it feel as good in Framer as it looked in Figma.
              </p>
            </div>
            <div>
              <p style={{
                fontFamily: "var(--font-inter)", fontWeight: 700, fontSize: 9,
                letterSpacing: "2.5px", textTransform: "uppercase",
                color: "var(--fg)", marginBottom: 20,
              }}>THE BRIEF</p>
              <p style={{
                fontFamily: "var(--font-inter)", fontWeight: 400, fontSize: 15,
                lineHeight: 1.75, color: "var(--fg-secondary)", marginBottom: 32,
              }}>
                Take the finished Figma file and build it in Framer — preserving the animation intent without
                making the site feel over-engineered. All interactions smooth on mobile. 14-day deadline.
              </p>
              <p style={{
                fontFamily: "var(--font-inter)", fontWeight: 700, fontSize: 9,
                letterSpacing: "2.5px", textTransform: "uppercase",
                color: "var(--fg)", marginBottom: 16,
              }}>DELIVERABLES</p>
              <ul style={{ listStyle: "none", padding: 0, margin: 0, display: "flex", flexDirection: "column", gap: 10 }}>
                {DELIVERABLES.map((d, i) => (
                  <li key={i} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                    <span style={{
                      width: 5, height: 5, borderRadius: "50%",
                      background: "var(--accent-purple)", flexShrink: 0, marginTop: 8,
                    }} />
                    <span style={{
                      fontFamily: "var(--font-inter)", fontWeight: 400, fontSize: 14,
                      lineHeight: 1.6, color: "var(--fg-secondary)",
                    }}>{d}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </section>

        {/* ── Process ── */}
        <section style={{ background: "#0f0f0f", padding: "100px 0" }}>
          <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 40px" }}>
            <p style={{
              fontFamily: "var(--font-inter)", fontWeight: 700, fontSize: 9,
              letterSpacing: "2.5px", textTransform: "uppercase",
              color: "var(--accent-purple)", marginBottom: 16,
            }}>HOW IT WAS BUILT</p>
            <h2 style={{
              fontFamily: "var(--font-poppins)", fontWeight: 700,
              fontSize: "clamp(24px, 2.5vw, 36px)", letterSpacing: "-0.8px",
              textTransform: "uppercase", color: "#fff", marginBottom: 64,
            }}>
              14 days, step by step.
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 0 }}>
              {PROCESS_STEPS.map((step, i) => (
                <div
                  key={i}
                  className="process-step"
                  style={{
                    display: "grid",
                    gridTemplateColumns: "80px 1fr 1fr",
                    gap: "0 48px",
                    padding: "40px 0",
                    borderTop: "1px solid rgba(255,255,255,0.08)",
                  }}
                >
                  <div>
                    <span style={{
                      fontFamily: "var(--font-poppins)", fontWeight: 700, fontSize: 40,
                      color: "rgba(255,255,255,0.2)", lineHeight: 1,
                    }}>{step.n}</span>
                  </div>
                  <div>
                    <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 16 }}>
                      <h3 style={{
                        fontFamily: "var(--font-poppins)", fontWeight: 700, fontSize: 16,
                        letterSpacing: "-0.3px", textTransform: "uppercase", color: "rgba(255,255,255,0.60)",
                      }}>{step.title}</h3>
                      <span style={{
                        fontFamily: "var(--font-inter)", fontWeight: 700, fontSize: 9,
                        letterSpacing: "1.5px", textTransform: "uppercase",
                        color: "#c4b5fd",
                        padding: "4px 10px", border: "1px solid rgba(196,181,253,0.3)",
                      }}>{step.dur}</span>
                    </div>
                    <p style={{
                      fontFamily: "var(--font-inter)", fontWeight: 400, fontSize: 15,
                      lineHeight: 1.7, color: "rgba(255,255,255,0.5)",
                    }}>{step.desc}</p>
                  </div>
                  <div style={{
                    borderLeft: "1px solid rgba(255,255,255,0.08)",
                    paddingLeft: 48,
                    display: "flex", alignItems: "center",
                  }}>
                    <p style={{
                      fontFamily: "var(--font-inter)", fontWeight: 400, fontSize: 14,
                      lineHeight: 1.7, color: "rgba(255,255,255,0.65)",
                      fontStyle: "italic",
                    }}>{step.detail}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ── Metrics ── */}
        <section style={{ maxWidth: 1200, margin: "0 auto", padding: "80px 40px" }}>
          <div
            className="cs-metrics-grid"
            style={{
              display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
              borderTop: "1px solid rgba(0,0,0,0.08)",
              borderLeft: "1px solid rgba(0,0,0,0.08)",
            }}
          >
            {[
              { n: "14", label: "Days to launch" },
              { n: "8+", label: "Browsers & devices tested" },
              { n: "2", label: "Client revision rounds" },
              { n: "0", label: "Missed deadlines" },
            ].map((m, i) => (
              <div key={i} style={{
                padding: "40px 32px",
                borderRight: "1px solid rgba(0,0,0,0.08)",
                borderBottom: "1px solid rgba(0,0,0,0.08)",
              }}>
                <p style={{
                  fontFamily: "var(--font-poppins)", fontWeight: 700,
                  fontSize: "clamp(40px, 4vw, 60px)", letterSpacing: "-2px",
                  lineHeight: 1, color: "var(--fg)", marginBottom: 8,
                }}>{m.n}</p>
                <p style={{
                  fontFamily: "var(--font-inter)", fontWeight: 400, fontSize: 13,
                  color: "var(--fg-secondary)", textTransform: "uppercase",
                  letterSpacing: "1px",
                }}>{m.label}</p>
              </div>
            ))}
          </div>
        </section>

        {/* ── CTA ── */}
        <section style={{
          maxWidth: 1200, margin: "0 auto", padding: "64px 40px 120px",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: 32, flexWrap: "wrap",
          borderTop: "1px solid rgba(0,0,0,0.08)",
        }}>
          <Link href="/#work" style={{
            display: "inline-flex", alignItems: "center", gap: 8,
            fontFamily: "var(--font-inter)", fontWeight: 700, fontSize: 11,
            letterSpacing: "2px", textTransform: "uppercase",
            color: "var(--fg-secondary)", textDecoration: "none",
          }}>
            <ArrowLeft size={14} strokeWidth={2} />
            View All Projects
          </Link>
          <a href="https://calendly.com/adefilasamuel929/discovery-call" target="_blank" rel="noopener noreferrer"
            style={{
              display: "inline-flex", alignItems: "center", gap: 8,
              padding: "16px 32px", background: "var(--fg)",
              fontFamily: "var(--font-inter)", fontWeight: 700, fontSize: 11,
              letterSpacing: "2px", textTransform: "uppercase",
              color: "#fff", textDecoration: "none",
            }}>
            Start a project <ArrowUpRight size={13} strokeWidth={2.5} />
          </a>
        </section>

        <style>{`
          @media (max-width: 768px) {
            .cs-meta-grid { grid-template-columns: 1fr 1fr !important; }
            .cs-overview-grid { grid-template-columns: 1fr !important; gap: 48px !important; }
            .cs-metrics-grid { grid-template-columns: 1fr 1fr !important; }
            .process-step { grid-template-columns: 40px 1fr !important; gap: 0 16px !important; padding: 24px 0 !important; }
            .process-step > div:last-child {
              grid-column: 1 / -1 !important; margin-top: 12px !important;
              border-left: none !important; border-top: 1px solid rgba(255,255,255,0.08) !important;
              padding-left: 0 !important; padding-top: 12px !important;
            }
          }
        `}</style>
      </main>
      <Footer />
    </>
  );
}
