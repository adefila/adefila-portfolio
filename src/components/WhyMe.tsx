"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useEffect, useState } from "react";
import { ChevronsRight, Tag, CircleDot, TrendingUp } from "lucide-react";

const stats = [
  { value: 50, suffix: "+", label: "Projects Shipped On Time" },
  { value: 100, suffix: "%", label: "Average Client Conversion Lift" },
  { value: 5, suffix: "+", label: "Years Building For The Web" },
];

function CountUp({ target, suffix, inView }: { target: number; suffix: string; inView: boolean }) {
  const [count, setCount] = useState(0);

  useEffect(() => {
    if (!inView) return;
    let start = 0;
    const duration = 1600;
    const stepTime = 16;
    const steps = Math.ceil(duration / stepTime);
    const increment = target / steps;
    const timer = setInterval(() => {
      start += increment;
      if (start >= target) {
        setCount(target);
        clearInterval(timer);
      } else {
        setCount(Math.floor(start));
      }
    }, stepTime);
    return () => clearInterval(timer);
  }, [inView, target]);

  return <>{count}{suffix}</>;
}

const benefits = [
  {
    icon: ChevronsRight,
    title: "SPEED WITHOUT COMPROMISE",
    desc: "Launched in 7–14 days without cutting corners. Your timeline is real — I treat it that way.",
  },
  {
    icon: Tag,
    title: "MADE FOR YOUR AUDIENCE",
    desc: "No templates, no guesswork. Everything built from scratch around your brand, your users, and what they need to say yes.",
  },
  {
    icon: CircleDot,
    title: "ONE PERSON. FULL OWNERSHIP.",
    desc: "One point of contact from first call to launch. No handoffs, no gaps, no 'let me check with the team.'",
  },
  {
    icon: TrendingUp,
    title: "TOOLS THAT FIT THE JOB",
    desc: "Framer, Shopify, Webflow — I choose what's right for your project, not what's easiest for me.",
  },
];

const services = [
  { n: "1", label: "RESPONSIVE DESIGN" },
  { n: "2", label: "FIGMA TO FRAMER" },
  { n: "3", label: "WEBSITE MIGRATION" },
  { n: "4", label: "USER INTERFACE & UX" },
  { n: "5", label: "SHOPIFY INTEGRATION" },
  { n: "6", label: "FIGMA TO WEBFLOW" },
];

export default function WhyMe() {
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
      {/* Top row: heading left, stats right */}
      <div
        ref={ref}
        style={{
          display: "flex",
          gap: 80,
          alignItems: "flex-start",
          flexWrap: "wrap",
          marginBottom: 64,
        }}
      >
        {/* Left: label + heading */}
        <div style={{ flex: "1 1 400px" }}>
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
            WHY ME
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
            animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.5, delay: 0.06 }}
            style={{
              fontFamily: "var(--font-poppins)",
              fontWeight: 700,
              fontSize: "clamp(28px, 3.5vw, 48px)",
              letterSpacing: "-1px",
              lineHeight: 1.05,
              textTransform: "uppercase",
              color: "var(--fg)",
            }}
          >
            Good design is table stakes.{" "}
            <span style={{ color: "rgb(163,163,163)" }}>
              I go further.
            </span>
          </motion.h2>
        </div>

        {/* Right: stats */}
        <div
          style={{
            flex: "1 1 300px",
            display: "flex",
            flexDirection: "column",
            gap: 32,
            paddingTop: 8,
          }}
        >
          {stats.map((s, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 16 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.1 + i * 0.08 }}
              style={{
                display: "flex",
                alignItems: "baseline",
                gap: 16,
                borderBottom: "1px solid rgba(0,0,0,0.07)",
                paddingBottom: 24,
              }}
            >
              <span
                style={{
                  fontFamily: "var(--font-satoshi)",
                  fontWeight: 700,
                  fontSize: "clamp(40px, 5vw, 64px)",
                  letterSpacing: "-0.04em",
                  lineHeight: 1,
                  color: "var(--fg)",
                  flexShrink: 0,
                }}
              >
                <CountUp target={s.value} suffix={s.suffix} inView={inView} />
              </span>
              <span
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 400,
                  fontSize: 13,
                  letterSpacing: "0.02em",
                  textTransform: "uppercase",
                  color: "var(--fg-secondary)",
                  lineHeight: 1.4,
                }}
              >
                {s.label}
              </span>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Benefits 2×2 grid */}
      <div
        className="benefits-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(2, 1fr)",
          gap: "0 80px",
          marginBottom: 48,
        }}
      >
        {benefits.map((item, i) => {
          const Icon = item.icon;
          return (
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
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 8,
                  marginBottom: 12,
                }}
              >
                <Icon size={16} strokeWidth={1.5} color="var(--fg-secondary)" />
                <h3
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontWeight: 700,
                    fontSize: 14,
                    letterSpacing: "0.3px",
                    textTransform: "uppercase",
                    color: "var(--fg)",
                    lineHeight: 1,
                  }}
                >
                  {item.title}
                </h3>
              </div>
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
          );
        })}
      </div>

      {/* Services numbered list */}
      <div
        className="services-grid"
        style={{
          borderTop: "1px solid rgba(0,0,0,0.08)",
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          marginBottom: 64,
        }}
      >
        {services.map((s, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 12 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.4, delay: 0.2 + i * 0.06 }}
            style={{
              display: "flex",
              alignItems: "center",
              gap: 20,
              padding: "28px 0",
              borderBottom: "1px solid rgba(0,0,0,0.08)",
              borderRight: (i + 1) % 3 !== 0 ? "1px solid rgba(0,0,0,0.08)" : "none",
              paddingLeft: i % 3 !== 0 ? 28 : 0,
            }}
          >
            <span
              style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 400,
                fontSize: 13,
                color: "var(--fg-muted)",
                flexShrink: 0,
              }}
            >
              {s.n}
            </span>
            <span
              style={{
                fontFamily: "var(--font-poppins)",
                fontWeight: 600,
                fontSize: "clamp(13px, 1.2vw, 16px)",
                letterSpacing: "-0.3px",
                textTransform: "uppercase",
                color: "var(--fg)",
              }}
            >
              {s.label}
            </span>
          </motion.div>
        ))}
      </div>

    </section>
  );
}
