"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowUpRight } from "lucide-react";

// ── Isometric icon palette ───────────────────────────────────────────────────
const IC = {
  top:    "#ede9fe",
  left:   "#ddd6fe",
  right:  "#c4b5fd",
  stroke: "#7c3aed",
  fill:   "#7c3aed",
  sw:     1.5,
};

// Shared cube: top T(26,6) R(44,15) B(26,24) L(8,15), sides to y=43 — 52×48 viewBox
// Top-face center: (26,15). Local coords: screenX = 26+18u, screenY = 15−9v

function IsoSpeedIcon() {
  return (
    <svg width="52" height="48" viewBox="0 0 52 48" fill="none" aria-hidden>
      {/* Cube */}
      <path d="M26 6 L44 15 L26 24 L8 15 Z"       fill={IC.top}   stroke={IC.stroke} strokeWidth={IC.sw} strokeLinejoin="round"/>
      <path d="M8 15 L8 34 L26 43 L26 24 Z"        fill={IC.left}  stroke={IC.stroke} strokeWidth={IC.sw} strokeLinejoin="round"/>
      <path d="M26 24 L26 43 L44 34 L44 15 Z"      fill={IC.right} stroke={IC.stroke} strokeWidth={IC.sw} strokeLinejoin="round"/>
      {/* Double chevron ∧∧ pointing "up" on the top face */}
      <polyline points="21,17 26,11 31,17" fill="none" stroke={IC.fill} strokeWidth={IC.sw} strokeLinecap="round" strokeLinejoin="round"/>
      <polyline points="21,20 26,14 31,20" fill="none" stroke={IC.fill} strokeWidth={IC.sw} strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  );
}

function IsoAudienceIcon() {
  return (
    <svg width="52" height="48" viewBox="0 0 52 48" fill="none" aria-hidden>
      {/* Cube */}
      <path d="M26 6 L44 15 L26 24 L8 15 Z"       fill={IC.top}   stroke={IC.stroke} strokeWidth={IC.sw} strokeLinejoin="round"/>
      <path d="M8 15 L8 34 L26 43 L26 24 Z"        fill={IC.left}  stroke={IC.stroke} strokeWidth={IC.sw} strokeLinejoin="round"/>
      <path d="M26 24 L26 43 L44 34 L44 15 Z"      fill={IC.right} stroke={IC.stroke} strokeWidth={IC.sw} strokeLinejoin="round"/>
      {/* Two person silhouettes on top face */}
      {/* Left person: head + body */}
      <ellipse cx="20" cy="11" rx="2" ry="1.2" fill={IC.fill}/>
      <line x1="20" y1="12.2" x2="20" y2="19" stroke={IC.fill} strokeWidth={IC.sw} strokeLinecap="round"/>
      <line x1="17" y1="15" x2="23" y2="15" stroke={IC.fill} strokeWidth={IC.sw} strokeLinecap="round"/>
      {/* Right person: head + body */}
      <ellipse cx="32" cy="11" rx="2" ry="1.2" fill={IC.fill}/>
      <line x1="32" y1="12.2" x2="32" y2="19" stroke={IC.fill} strokeWidth={IC.sw} strokeLinecap="round"/>
      <line x1="29" y1="15" x2="35" y2="15" stroke={IC.fill} strokeWidth={IC.sw} strokeLinecap="round"/>
    </svg>
  );
}

function IsoOwnershipIcon() {
  return (
    <svg width="52" height="48" viewBox="0 0 52 48" fill="none" aria-hidden>
      {/* Cube */}
      <path d="M26 6 L44 15 L26 24 L8 15 Z"       fill={IC.top}   stroke={IC.stroke} strokeWidth={IC.sw} strokeLinejoin="round"/>
      <path d="M8 15 L8 34 L26 43 L26 24 Z"        fill={IC.left}  stroke={IC.stroke} strokeWidth={IC.sw} strokeLinejoin="round"/>
      <path d="M26 24 L26 43 L44 34 L44 15 Z"      fill={IC.right} stroke={IC.stroke} strokeWidth={IC.sw} strokeLinejoin="round"/>
      {/* Single person centered on top face */}
      <ellipse cx="26" cy="10" rx="2.5" ry="1.5" fill={IC.fill}/>
      <line x1="26" y1="11.5" x2="26" y2="20" stroke={IC.fill} strokeWidth={IC.sw} strokeLinecap="round"/>
      {/* Arms */}
      <line x1="22" y1="15" x2="30" y2="15" stroke={IC.fill} strokeWidth={IC.sw} strokeLinecap="round"/>
    </svg>
  );
}

function IsoToolsIcon() {
  return (
    <svg width="52" height="48" viewBox="0 0 52 48" fill="none" aria-hidden>
      {/* Cube */}
      <path d="M26 6 L44 15 L26 24 L8 15 Z"       fill={IC.top}   stroke={IC.stroke} strokeWidth={IC.sw} strokeLinejoin="round"/>
      <path d="M8 15 L8 34 L26 43 L26 24 Z"        fill={IC.left}  stroke={IC.stroke} strokeWidth={IC.sw} strokeLinejoin="round"/>
      <path d="M26 24 L26 43 L44 34 L44 15 Z"      fill={IC.right} stroke={IC.stroke} strokeWidth={IC.sw} strokeLinejoin="round"/>
      {/* Cross/plus on top face — horizontal and vertical in iso plane */}
      <line x1="18" y1="15" x2="34" y2="15" stroke={IC.fill} strokeWidth={IC.sw} strokeLinecap="round"/>
      <line x1="26" y1="9"  x2="26" y2="21" stroke={IC.fill} strokeWidth={IC.sw} strokeLinecap="round"/>
      {/* End dots for "tool handle" feel */}
      <circle cx="18" cy="15" r="1.8" fill={IC.fill}/>
      <circle cx="34" cy="15" r="1.8" fill={IC.fill}/>
      <circle cx="26" cy="9"  r="1.8" fill={IC.fill}/>
      <circle cx="26" cy="21" r="1.8" fill={IC.fill}/>
    </svg>
  );
}

const benefits = [
  {
    Icon: IsoSpeedIcon,
    title: "SPEED WITHOUT COMPROMISE",
    desc: "Launched in 7–14 days without cutting corners. Your timeline is real. I treat it that way.",
  },
  {
    Icon: IsoAudienceIcon,
    title: "MADE FOR YOUR AUDIENCE",
    desc: "No templates, no guesswork. Everything built from scratch around your brand, your users, and what they need to say yes.",
  },
  {
    Icon: IsoOwnershipIcon,
    title: "ONE PERSON. FULL OWNERSHIP.",
    desc: "One point of contact from first call to launch. No handoffs, no gaps, no 'let me check with the team.'",
  },
  {
    Icon: IsoToolsIcon,
    title: "TOOLS THAT FIT THE JOB",
    desc: "Framer, Shopify, Webflow. I choose what's right for your project, not what's easiest for me.",
  },
];

export default function Benefits() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      style={{
        width: "100%",
        maxWidth: 1200,
        margin: "0 auto",
        padding: "80px 20px",
      }}
    >
      {/* Header */}
      <div ref={ref} style={{ marginBottom: 48 }}>
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
            marginBottom: 20,
          }}
        >
          BENEFITS
        </motion.p>
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
            maxWidth: 700,
          }}
        >
          50 PROJECTS IN. THE BAR HAS ONLY GONE UP.
        </motion.h2>
      </div>

      {/* 2×2 grid */}
      <div
        className="benefits-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "0 80px",
          marginBottom: 48,
        }}
      >
        {benefits.map((item, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 16 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.4, delay: i * 0.08, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            style={{
              borderTop: "1px solid rgba(0,0,0,0.1)",
              padding: "32px 0",
            }}
          >
            {/* Isometric icon */}
            <div style={{ marginBottom: 16 }}>
              <item.Icon />
            </div>

            <h3
              style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 700,
                fontSize: 14,
                letterSpacing: "0.3px",
                textTransform: "uppercase",
                color: "var(--fg)",
                lineHeight: 1,
                marginBottom: 12,
              }}
            >
              {item.title}
            </h3>
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 400,
                fontSize: 14,
                letterSpacing: "-0.2px",
                lineHeight: 1.6,
                color: "var(--fg-secondary)",
              }}
            >
              {item.desc}
            </p>
          </motion.div>
        ))}
      </div>

      {/* Upwork card */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{
          background: "var(--white)",
          border: "1px solid rgba(0,0,0,0.07)",
          borderRadius: "var(--radius-md)",
          padding: "28px 32px",
        }}
      >
        {/* Top row: logo + badges */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: 24,
          }}
        >
          <div
            style={{
              width: 48,
              height: 48,
              borderRadius: "50%",
              background: "#14a800",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 900,
                fontSize: 16,
                color: "#fff",
                letterSpacing: "-1px",
              }}
            >
              up
            </span>
          </div>

          <div style={{ display: "flex", gap: 16, alignItems: "center" }}>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  border: "2px solid #1d9bf0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                }}
              >
                ðŸ''
              </div>
              <span style={{ fontFamily: "var(--font-inter)", fontWeight: 600, fontSize: 13, color: "var(--fg)" }}>
                100% Job Success
              </span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
              <div
                style={{
                  width: 32,
                  height: 32,
                  borderRadius: "50%",
                  border: "2px solid #1d9bf0",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  fontSize: 14,
                }}
              >
                ⭐
              </div>
              <span style={{ fontFamily: "var(--font-inter)", fontWeight: 600, fontSize: 13, color: "var(--fg)" }}>
                Top Rated
              </span>
            </div>
          </div>
        </div>

        {/* Bottom row: text + button */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-end",
            flexWrap: "wrap",
            gap: 20,
          }}
        >
          <div>
            <h3
              style={{
                fontFamily: "var(--font-poppins)",
                fontWeight: 700,
                fontSize: 18,
                letterSpacing: "-0.5px",
                textTransform: "uppercase",
                color: "var(--fg)",
                marginBottom: 8,
              }}
            >
              WORK WITH ME ON UPWORK
            </h3>
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: 14,
                color: "var(--fg-secondary)",
                letterSpacing: "-0.3px",
                lineHeight: 1.5,
                maxWidth: 480,
              }}
            >
              50+ founders and agencies have worked with me through Upwork.{" "}
              <span style={{ color: "var(--accent-purple)", fontWeight: 500 }}>
                Top Rated. 100% Job Success.
              </span>{" "}
              I show up, I deliver, and I make the process easy.
            </p>
          </div>
          <a
            href="https://upwork.com/freelancers/adefilasamuel"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 600,
              fontSize: 13,
              color: "var(--white)",
              background: "var(--fg)",
              padding: "14px 28px",
              borderRadius: 100,
              textDecoration: "none",
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              whiteSpace: "nowrap",
            }}
          >
            HIRE ME ON UPWORK <ArrowUpRight size={14} strokeWidth={2.5} />
          </a>
        </div>
      </motion.div>
    </section>
  );
}
