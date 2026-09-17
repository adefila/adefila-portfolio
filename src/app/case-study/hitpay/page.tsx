"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowLeft, ArrowUpRight, ExternalLink } from "lucide-react";
import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const DELIVERABLES = [
  "Framer site build from Figma",
  "Responsive layout — mobile, tablet, desktop",
  "Scroll-triggered animations",
  "CMS integration for blog & changelog",
  "SEO metadata and Open Graph",
  "QA across 8 browsers/devices",
  "Loom handoff walkthrough",
];

const PROCESS_STEPS = [
  {
    n: "01",
    title: "Kick-off Call",
    dur: "Day 1",
    desc: "30 minutes. Covered the brief, the Figma file, brand constraints, and the one thing the team was most worried about — the animations. They had references; I had questions.",
    detail: "The existing Figma file had 40+ frames. We agreed on which ones were priority and which were nice-to-have.",
  },
  {
    n: "02",
    title: "Figma Review",
    dur: "Days 1–2",
    desc: "Before touching Framer, I spent half a day in the Figma file making a component map — which elements repeat, where the spacing system breaks, what the mobile layouts assume vs. what's actually specified.",
    detail: "Found 3 places where the mobile designs were missing. Flagged them before build started, not after.",
  },
  {
    n: "03",
    title: "Framer Build",
    dur: "Days 3–11",
    desc: "Built in order of page priority: homepage first, pricing second, product pages third. Live preview link shared on Day 3 — the team was watching it come together in real time.",
    detail: "The hero scroll animation was the trickiest part. Ended up using a combination of scroll progress and opacity curves to get it right.",
  },
  {
    n: "04",
    title: "QA & Launch",
    dur: "Days 12–14",
    desc: "Tested across Chrome, Safari, Firefox, and Edge — on both Mac and Windows. Mobile tested on iOS and Android. Two rounds of client feedback, both addressed within 24 hours.",
    detail: "Deployed to hitpayapp.com and recorded a Loom walkthrough for the content team. They were editing on day one.",
  },
];

const METRICS = [
  { value: "14", label: "Days to launch" },
  { value: "8+", label: "Browsers & devices tested" },
  { value: "40+", label: "Figma frames to build" },
  { value: "0", label: "Missed deadlines" },
];

function ScreenshotCard() {
  const [loaded, setLoaded] = useState(false);
  const [errored, setErrored] = useState(false);
  const url = "https://hitpayapp.com/";
  const src = `https://api.microlink.io?url=${encodeURIComponent(url)}&screenshot=true&meta=false&embed=screenshot.url`;

  return (
    <div
      style={{
        width: "100%",
        aspectRatio: "16/9",
        position: "relative",
        overflow: "hidden",
        background: "#111",
      }}
    >
      {!loaded && !errored && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            background: "linear-gradient(90deg, #1a1a1a 25%, #252525 50%, #1a1a1a 75%)",
            backgroundSize: "200% 100%",
            animation: "shimmer 1.4s infinite",
          }}
        />
      )}
      {errored && (
        <div
          style={{
            position: "absolute",
            inset: 0,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            background: "#111",
          }}
        >
          <span style={{
            fontFamily: "var(--font-poppins)",
            fontWeight: 700,
            fontSize: 48,
            color: "rgba(255,255,255,0.06)",
            letterSpacing: "-2px",
          }}>
            HITPAY
          </span>
        </div>
      )}
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img
        src={src}
        alt="HitPay website screenshot"
        onLoad={() => setLoaded(true)}
        onError={() => setErrored(true)}
        style={{
          position: "absolute",
          inset: 0,
          width: "100%",
          height: "100%",
          objectFit: "cover",
          objectPosition: "top center",
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.4s ease",
        }}
      />
      <style>{`
        @keyframes shimmer {
          0% { background-position: 200% 0; }
          100% { background-position: -200% 0; }
        }
      `}</style>
    </div>
  );
}

export default function HitPayCaseStudy() {
  const heroRef = useRef(null);
  const overviewRef = useRef(null);
  const processRef = useRef(null);
  const metricsRef = useRef(null);

  const heroInView = useInView(heroRef, { once: true });
  const overviewInView = useInView(overviewRef, { once: true, margin: "-10%" });
  const processInView = useInView(processRef, { once: true, margin: "-10%" });
  const metricsInView = useInView(metricsRef, { once: true, margin: "-10%" });

  return (
    <main style={{ background: "var(--bg)", minHeight: "100vh", overflowX: "hidden" }}>
      <Navbar />

      {/* ── Hero ── */}
      <section
        ref={heroRef}
        style={{
          width: "100%",
          maxWidth: 1200,
          margin: "0 auto",
          padding: "120px 20px 80px",
        }}
      >
        {/* Back link */}
        <motion.div
          initial={{ opacity: 0, x: -8 }}
          animate={heroInView ? { opacity: 1, x: 0 } : {}}
          transition={{ duration: 0.45, ease: EASE }}
          style={{ marginBottom: 48 }}
        >
          <Link
            href="/#work"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              fontFamily: "var(--font-inter)",
              fontWeight: 500,
              fontSize: 13,
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              color: "var(--fg-secondary)",
              textDecoration: "none",
            }}
          >
            <ArrowLeft size={14} strokeWidth={2} />
            All Projects
          </Link>
        </motion.div>

        {/* Meta row */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.45, delay: 0.05, ease: EASE }}
          style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 24, flexWrap: "wrap" }}
        >
          <span style={{
            fontFamily: "var(--font-inter)",
            fontWeight: 700,
            fontSize: 11,
            letterSpacing: "4px",
            textTransform: "uppercase",
            color: "var(--accent-purple)",
          }}>
            Case Study
          </span>
          <span style={{ width: 1, height: 14, background: "rgba(0,0,0,0.15)", flexShrink: 0 }} />
          <span style={{
            fontFamily: "var(--font-inter)",
            fontWeight: 400,
            fontSize: 13,
            color: "var(--fg-secondary)",
          }}>
            Framer Development · 2024
          </span>
        </motion.div>

        {/* Title */}
        <motion.h1
          initial={{ opacity: 0, y: 12 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.55, delay: 0.1, ease: EASE }}
          style={{
            fontFamily: "var(--font-poppins)",
            fontWeight: 700,
            fontSize: "clamp(36px, 6vw, 88px)",
            letterSpacing: "-2px",
            lineHeight: 0.95,
            textTransform: "uppercase",
            color: "var(--fg)",
            marginBottom: 40,
          }}
        >
          HitPay —{" "}
          <span style={{ color: "rgb(163,163,163)" }}>SaaS Website</span>
        </motion.h1>

        {/* Summary row */}
        <motion.div
          initial={{ opacity: 0, y: 8 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.18, ease: EASE }}
          style={{
            display: "flex",
            gap: 1,
            background: "rgba(0,0,0,0.07)",
            flexWrap: "wrap",
          }}
        >
          {[
            { label: "CLIENT", value: "HitPay" },
            { label: "SERVICE", value: "Framer Development" },
            { label: "TIMELINE", value: "14 Days" },
            { label: "YEAR", value: "2024" },
          ].map((item) => (
            <div
              key={item.label}
              style={{
                background: "var(--bg)",
                padding: "24px 32px",
                flex: "1 1 160px",
              }}
            >
              <p style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 700,
                fontSize: 10,
                letterSpacing: "3px",
                textTransform: "uppercase",
                color: "var(--fg-muted)",
                marginBottom: 8,
              }}>
                {item.label}
              </p>
              <p style={{
                fontFamily: "var(--font-poppins)",
                fontWeight: 600,
                fontSize: 16,
                letterSpacing: "-0.3px",
                color: "var(--fg)",
              }}>
                {item.value}
              </p>
            </div>
          ))}
        </motion.div>
      </section>

      {/* ── Screenshot ── */}
      <section style={{ width: "100%", maxWidth: 1200, margin: "0 auto", padding: "0 20px 80px" }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={heroInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6, delay: 0.24, ease: EASE }}
          style={{ position: "relative" }}
        >
          <ScreenshotCard />
          <a
            href="https://hitpayapp.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              position: "absolute",
              bottom: 24,
              right: 24,
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              background: "#fff",
              padding: "10px 20px",
              fontFamily: "var(--font-inter)",
              fontWeight: 600,
              fontSize: 12,
              letterSpacing: "1px",
              textTransform: "uppercase",
              color: "#0f0f0f",
              textDecoration: "none",
            }}
          >
            View Live
            <ExternalLink size={12} strokeWidth={2.5} />
          </a>
        </motion.div>
      </section>

      {/* ── Overview ── */}
      <section
        ref={overviewRef}
        style={{ width: "100%", maxWidth: 1200, margin: "0 auto", padding: "0 20px 80px" }}
      >
        <div
          style={{
            borderTop: "1px solid rgba(0,0,0,0.08)",
            paddingTop: 64,
            display: "grid",
            gridTemplateColumns: "1fr 1fr",
            gap: 80,
            alignItems: "start",
          }}
          className="cs-overview-grid"
        >
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={overviewInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE }}
          >
            <p style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 700,
              fontSize: 11,
              letterSpacing: "4px",
              textTransform: "uppercase",
              color: "var(--accent-purple)",
              marginBottom: 24,
            }}>
              THE PROJECT
            </p>
            <h2 style={{
              fontFamily: "var(--font-poppins)",
              fontWeight: 700,
              fontSize: "clamp(24px, 2.8vw, 40px)",
              letterSpacing: "-1px",
              lineHeight: 1.1,
              textTransform: "uppercase",
              color: "var(--fg)",
              marginBottom: 24,
            }}>
              A PAYMENT PLATFORM THAT HAD OUTGROWN ITS SITE
            </h2>
            <p style={{
              fontFamily: "var(--font-inter)",
              fontSize: 15,
              lineHeight: 1.75,
              color: "var(--fg-secondary)",
              letterSpacing: "-0.2px",
            }}>
              HitPay is a Southeast Asian payment infrastructure company — the kind of product that processes millions in transactions but whose website hadn&apos;t kept pace with the product itself. The Figma designs were done. They needed someone to build them in Framer, properly, without the usual agency lag.
            </p>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={overviewInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1, ease: EASE }}
          >
            <p style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 700,
              fontSize: 11,
              letterSpacing: "4px",
              textTransform: "uppercase",
              color: "var(--accent-purple)",
              marginBottom: 24,
            }}>
              THE BRIEF
            </p>
            <p style={{
              fontFamily: "var(--font-inter)",
              fontSize: 15,
              lineHeight: 1.75,
              color: "var(--fg-secondary)",
              letterSpacing: "-0.2px",
              marginBottom: 32,
            }}>
              Take a complete Figma file and build it in Framer — responsive across all breakpoints, with the scroll animations the design called for. Hand it off ready to edit without needing a developer.
            </p>

            <p style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 700,
              fontSize: 11,
              letterSpacing: "4px",
              textTransform: "uppercase",
              color: "var(--fg-muted)",
              marginBottom: 16,
            }}>
              DELIVERABLES
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {DELIVERABLES.map((item) => (
                <div key={item} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                  <div style={{
                    width: 4,
                    height: 4,
                    background: "var(--accent-purple)",
                    borderRadius: "50%",
                    flexShrink: 0,
                    marginTop: 8,
                  }} />
                  <span style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: 14,
                    color: "var(--fg-secondary)",
                    lineHeight: 1.5,
                  }}>
                    {item}
                  </span>
                </div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Process ── */}
      <section
        ref={processRef}
        style={{
          width: "100%",
          background: "#0f0f0f",
          padding: "80px 20px",
        }}
      >
        <div style={{ maxWidth: 1200, margin: "0 auto" }}>
          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={processInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, ease: EASE }}
            style={{
              display: "flex",
              gap: 80,
              alignItems: "flex-end",
              flexWrap: "wrap",
              marginBottom: 64,
              borderBottom: "1px solid rgba(255,255,255,0.08)",
              paddingBottom: 40,
            }}
          >
            <div style={{ flex: "1 1 360px" }}>
              <p style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 700,
                fontSize: 11,
                letterSpacing: "4px",
                textTransform: "uppercase",
                color: "var(--accent-purple)",
                marginBottom: 16,
              }}>
                HOW IT WENT
              </p>
              <h2 style={{
                fontFamily: "var(--font-poppins)",
                fontWeight: 700,
                fontSize: "clamp(26px, 3.2vw, 44px)",
                letterSpacing: "-1px",
                lineHeight: 1.08,
                textTransform: "uppercase",
                color: "#ffffff",
              }}>
                14 DAYS.{" "}
                <span style={{ color: "rgba(255,255,255,0.35)" }}>STEP BY STEP.</span>
              </h2>
            </div>
            <p style={{
              flex: "1 1 280px",
              fontFamily: "var(--font-inter)",
              fontSize: 15,
              lineHeight: 1.7,
              color: "rgba(255,255,255,0.5)",
              letterSpacing: "-0.3px",
            }}>
              No surprises, no check-in calls that should have been emails. Every day had a clear job.
            </p>
          </motion.div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            {PROCESS_STEPS.map((step, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                animate={processInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.1 + i * 0.1, ease: EASE }}
                className="process-step"
                style={{
                  display: "grid",
                  gridTemplateColumns: "80px 1fr 1fr",
                  gap: "0 48px",
                  padding: "40px 0",
                  borderBottom: i < PROCESS_STEPS.length - 1 ? "1px solid rgba(255,255,255,0.08)" : "none",
                  alignItems: "start",
                }}
              >
                <span style={{
                  fontFamily: "var(--font-satoshi)",
                  fontWeight: 700,
                  fontSize: "clamp(32px, 3vw, 48px)",
                  letterSpacing: "-0.04em",
                  color: "rgba(255,255,255,0.2)",
                  lineHeight: 1,
                  display: "block",
                }}>
                  {step.n}
                </span>

                <div>
                  <div style={{ display: "inline-flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
                    <h3 style={{
                      fontFamily: "var(--font-poppins)",
                      fontWeight: 700,
                      fontSize: "clamp(16px, 1.4vw, 20px)",
                      letterSpacing: "-0.4px",
                      textTransform: "uppercase",
                      color: "#ffffff",
                      lineHeight: 1,
                    }}>
                      {step.title}
                    </h3>
                    <span style={{
                      fontFamily: "var(--font-inter)",
                      fontWeight: 500,
                      fontSize: 11,
                      letterSpacing: "0.5px",
                      textTransform: "uppercase",
                      color: "#c4b5fd",
                      background: "rgba(109,40,217,0.35)",
                      padding: "3px 8px",
                      flexShrink: 0,
                    }}>
                      {step.dur}
                    </span>
                  </div>
                  <p style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: 15,
                    lineHeight: 1.7,
                    color: "rgba(255,255,255,0.5)",
                    letterSpacing: "-0.2px",
                  }}>
                    {step.desc}
                  </p>
                </div>

                <div style={{
                  borderLeft: "2px solid rgba(109,40,217,0.4)",
                  paddingLeft: 20,
                  marginTop: 4,
                }}>
                  <p style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: 14,
                    lineHeight: 1.65,
                    color: "rgba(255,255,255,0.65)",
                    letterSpacing: "-0.1px",
                    fontStyle: "italic",
                  }}>
                    {step.detail}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* ── Metrics ── */}
      <section
        ref={metricsRef}
        style={{ width: "100%", maxWidth: 1200, margin: "0 auto", padding: "80px 20px" }}
      >
        <div style={{ borderTop: "1px solid rgba(0,0,0,0.08)", paddingTop: 64 }}>
          <motion.p
            initial={{ opacity: 0, y: 8 }}
            animate={metricsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.45, ease: EASE }}
            style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 700,
              fontSize: 11,
              letterSpacing: "4px",
              textTransform: "uppercase",
              color: "var(--accent-purple)",
              marginBottom: 48,
            }}
          >
            BY THE NUMBERS
          </motion.p>

          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(4, 1fr)",
              gap: 1,
              background: "rgba(0,0,0,0.07)",
            }}
            className="cs-metrics-grid"
          >
            {METRICS.map((m, i) => (
              <motion.div
                key={m.label}
                initial={{ opacity: 0, y: 12 }}
                animate={metricsInView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.45, delay: i * 0.08, ease: EASE }}
                style={{
                  background: "var(--bg)",
                  padding: "40px 32px",
                }}
              >
                <p style={{
                  fontFamily: "var(--font-satoshi)",
                  fontWeight: 700,
                  fontSize: "clamp(40px, 5vw, 64px)",
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                  color: "var(--fg)",
                  marginBottom: 8,
                }}>
                  {m.value}
                </p>
                <p style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: 13,
                  letterSpacing: "0.02em",
                  textTransform: "uppercase",
                  color: "var(--fg-muted)",
                }}>
                  {m.label}
                </p>
              </motion.div>
            ))}
          </div>

          {/* Testimonial block */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={metricsInView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.3, ease: EASE }}
            style={{
              marginTop: 64,
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: 1,
              background: "rgba(0,0,0,0.07)",
            }}
            className="cs-testimonial-grid"
          >
            <div style={{ background: "#0f0f0f", padding: "48px 40px" }}>
              <p style={{
                fontFamily: "var(--font-inter)",
                fontSize: 18,
                lineHeight: 1.7,
                color: "rgba(255,255,255,0.85)",
                letterSpacing: "-0.3px",
                marginBottom: 32,
              }}>
                &ldquo;I had a great experience working with Adefila. They conducted a thorough audit of our current Framer setup and quickly identified why styles were breaking across different language versions.&rdquo;
              </p>
              <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                <div style={{
                  width: 40,
                  height: 40,
                  background: "rgba(109,40,217,0.4)",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  flexShrink: 0,
                }}>
                  <span style={{
                    fontFamily: "var(--font-poppins)",
                    fontWeight: 700,
                    fontSize: 14,
                    color: "#c4b5fd",
                  }}>
                    H
                  </span>
                </div>
                <div>
                  <p style={{
                    fontFamily: "var(--font-poppins)",
                    fontWeight: 600,
                    fontSize: 14,
                    letterSpacing: "-0.2px",
                    color: "#ffffff",
                  }}>
                    HitPay Team
                  </p>
                  <p style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: 12,
                    color: "rgba(255,255,255,0.4)",
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                  }}>
                    Via Upwork · 5★
                  </p>
                </div>
              </div>
            </div>

            <div style={{ background: "var(--bg)", padding: "48px 40px", display: "flex", flexDirection: "column", justifyContent: "space-between" }}>
              <div>
                <p style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 700,
                  fontSize: 11,
                  letterSpacing: "4px",
                  textTransform: "uppercase",
                  color: "var(--fg-muted)",
                  marginBottom: 16,
                }}>
                  WHAT MADE THIS WORK
                </p>
                <p style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: 15,
                  lineHeight: 1.75,
                  color: "var(--fg-secondary)",
                  letterSpacing: "-0.2px",
                  marginBottom: 24,
                }}>
                  The Figma file was thorough but had gaps in the mobile designs. Catching them before build — not during — meant the timeline stayed intact. That&apos;s the kind of thing that only matters when it goes wrong.
                </p>
                <p style={{
                  fontFamily: "var(--font-inter)",
                  fontSize: 15,
                  lineHeight: 1.75,
                  color: "var(--fg-secondary)",
                  letterSpacing: "-0.2px",
                }}>
                  The CMS handoff was clean enough that the content team was managing their own blog updates on day one — no follow-up calls, no &ldquo;how do I edit this&rdquo; messages.
                </p>
              </div>

              <a
                href="https://hitpayapp.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  marginTop: 32,
                  fontFamily: "var(--font-inter)",
                  fontWeight: 700,
                  fontSize: 12,
                  letterSpacing: "2px",
                  textTransform: "uppercase",
                  color: "var(--fg)",
                  textDecoration: "none",
                  borderBottom: "1px solid rgba(0,0,0,0.15)",
                  paddingBottom: 2,
                  width: "fit-content",
                }}
              >
                Visit hitpayapp.com
                <ArrowUpRight size={13} strokeWidth={2.5} />
              </a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ── Next Project CTA ── */}
      <section style={{ width: "100%", maxWidth: 1200, margin: "0 auto", padding: "0 20px 80px" }}>
        <div style={{
          borderTop: "1px solid rgba(0,0,0,0.08)",
          paddingTop: 64,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 32,
        }}>
          <div>
            <p style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 700,
              fontSize: 11,
              letterSpacing: "4px",
              textTransform: "uppercase",
              color: "var(--fg-muted)",
              marginBottom: 12,
            }}>
              NEXT PROJECT
            </p>
            <Link
              href="/#work"
              style={{
                fontFamily: "var(--font-poppins)",
                fontWeight: 700,
                fontSize: "clamp(22px, 2.5vw, 36px)",
                letterSpacing: "-0.8px",
                textTransform: "uppercase",
                color: "var(--fg)",
                textDecoration: "none",
                display: "flex",
                alignItems: "center",
                gap: 16,
              }}
            >
              View All Projects
              <ArrowUpRight size={28} strokeWidth={2} />
            </Link>
          </div>

          <Link
            href="/#contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 12,
              background: "#0f0f0f",
              color: "#fff",
              padding: "16px 32px",
              fontFamily: "var(--font-inter)",
              fontWeight: 700,
              fontSize: 13,
              letterSpacing: "2px",
              textTransform: "uppercase",
              textDecoration: "none",
            }}
          >
            Start a project
            <ArrowUpRight size={16} strokeWidth={2.5} />
          </Link>
        </div>
      </section>

      {/* Responsive CSS */}
      <style>{`
        @media (max-width: 768px) {
          .cs-overview-grid {
            grid-template-columns: 1fr !important;
            gap: 48px !important;
          }
          .cs-metrics-grid {
            grid-template-columns: 1fr 1fr !important;
          }
          .cs-testimonial-grid {
            grid-template-columns: 1fr !important;
          }
          .process-step {
            grid-template-columns: 40px 1fr !important;
            gap: 0 16px !important;
            padding: 24px 0 !important;
          }
          .process-step > div:last-child {
            grid-column: 1 / -1 !important;
            margin-top: 12px !important;
            border-left: none !important;
            border-top: 1px solid rgba(109,40,217,0.12) !important;
            padding-left: 0 !important;
            padding-top: 12px !important;
          }
        }
        @media (max-width: 480px) {
          .cs-metrics-grid {
            grid-template-columns: 1fr !important;
          }
        }
      `}</style>

      <Footer />
    </main>
  );
}
