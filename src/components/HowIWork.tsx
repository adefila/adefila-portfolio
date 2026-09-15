"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const steps = [
  {
    n: "01",
    title: "Discovery Call",
    duration: "Day 1",
    desc: "A 30-minute call where I ask more questions than I talk. I need to understand your goals, your audience, and what done looks like for you — before anything gets designed.",
    detail: "No pitch. No slide deck. Just a conversation that gives me enough to work with.",
  },
  {
    n: "02",
    title: "Design Review",
    duration: "Days 2–4",
    desc: "I build a clickable Figma wireframe based on what we talked about. You can see exactly how the site will flow before a single line of code is written — and change anything you want.",
    detail: "Most revision cycles happen here. That's intentional — it's cheaper to fix a wireframe than a built page.",
  },
  {
    n: "03",
    title: "Framer Build",
    duration: "Days 5–12",
    desc: "Development starts and you get a live Framer preview link on Day 5. You're not waiting two weeks to see something — you're watching it come together in real time.",
    detail: "Animations, interactions, and responsive behaviour are all built in, not added as an afterthought.",
  },
  {
    n: "04",
    title: "Launch & Handoff",
    duration: "Days 13–14",
    desc: "I deploy to your domain, QA every screen on every device, and record a short Loom walkthrough showing you exactly how to edit your own site. You own it — no dependency on me.",
    detail: "Most clients are live and editing on their own within 48 hours of handoff.",
  },
];


const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function HowIWork() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      id="process"
      style={{
        width: "100%",
        maxWidth: 1200,
        margin: "0 auto",
        padding: "80px 20px",
      }}
    >
      {/* Header */}
      <div
        ref={ref}
        style={{
          display: "flex",
          gap: 80,
          alignItems: "flex-end",
          flexWrap: "wrap",
          marginBottom: 64,
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
            THE PROCESS
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
            From first call to live site —{" "}
            <span style={{ color: "rgb(163,163,163)" }}>
              here&apos;s exactly how we do it.
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
          Most projects ship in 14 days. The timeline is tight because the
          process is tight — no ambiguity, no waiting, no surprises.
        </motion.p>
      </div>

      {/* Steps */}
      <div style={{ display: "flex", flexDirection: "column" }}>
        {steps.map((step, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.1, ease: EASE }}
            className="process-step"
            style={{
              display: "grid",
              gridTemplateColumns: "80px 1fr 1fr",
              gap: "0 48px",
              padding: "40px 0",
              borderBottom: i < steps.length - 1 ? "1px solid rgba(0,0,0,0.07)" : "none",
              alignItems: "start",
            }}
          >
            {/* Step number */}
            <div>
              <span
                style={{
                  fontFamily: "var(--font-satoshi)",
                  fontWeight: 700,
                  fontSize: "clamp(32px, 3vw, 48px)",
                  letterSpacing: "-0.04em",
                  color: "rgba(0,0,0,0.07)",
                  lineHeight: 1,
                  display: "block",
                }}
              >
                {step.n}
              </span>
            </div>

            {/* Title + duration */}
            <div>
              <div
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  marginBottom: 12,
                }}
              >
                <h3
                  style={{
                    fontFamily: "var(--font-poppins)",
                    fontWeight: 700,
                    fontSize: "clamp(16px, 1.4vw, 20px)",
                    letterSpacing: "-0.4px",
                    textTransform: "uppercase",
                    color: "var(--fg)",
                    lineHeight: 1,
                  }}
                >
                  {step.title}
                </h3>
                <span
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontWeight: 500,
                    fontSize: 11,
                    letterSpacing: "0.5px",
                    textTransform: "uppercase",
                    color: "var(--accent-purple)",
                    background: "rgba(109,40,217,0.08)",
                    padding: "3px 8px",
                    borderRadius: 100,
                    flexShrink: 0,
                  }}
                >
                  {step.duration}
                </span>
              </div>
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 400,
                  fontSize: 15,
                  lineHeight: 1.7,
                  color: "var(--fg-secondary)",
                  letterSpacing: "-0.2px",
                }}
              >
                {step.desc}
              </p>
            </div>

            {/* Detail callout */}
            <div
              style={{
                borderLeft: "2px solid rgba(109,40,217,0.15)",
                paddingLeft: 20,
                marginTop: 4,
              }}
            >
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 400,
                  fontSize: 14,
                  lineHeight: 1.65,
                  color: "var(--fg-secondary)",
                  letterSpacing: "-0.1px",
                  fontStyle: "italic",
                }}
              >
                {step.detail}
              </p>
            </div>
          </motion.div>
        ))}
      </div>
    </section>
  );
}
