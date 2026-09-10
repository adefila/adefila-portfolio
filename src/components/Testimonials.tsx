"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const testimonials = [
  {
    text: "Samuel was a fantastic collaborator throughout the entire project. He brought a high level of professionalism, attention to detail, and technical skill to the website build. Communication was smooth, and he consistently delivered high-quality work on time. I'd gladly work with him again on future projects and highly recommend him to anyone looking for a reliable and capable framer developer.",
    name: "Nitin",
    role: "HitPay App",
    stars: 5,
  },
  {
    text: "I recently had the pleasure working with Adeyemi on the development of my Wordpress website, and I am happy to share my exceptional experience and satisfaction with his service.",
    name: "Layo",
    role: "Content Writer",
    stars: 5,
  },
  {
    text: "Outstanding work from start to finish. The attention to detail was remarkable and the final product exceeded all expectations. Highly recommended for any Framer project.",
    name: "Marcus",
    role: "Startup Founder",
    stars: 5,
  },
];

function Stars({ count }: { count: number }) {
  return (
    <div style={{ display: "flex", gap: 2 }}>
      {Array.from({ length: count }).map((_, i) => (
        <span key={i} style={{ color: "#f59e0b", fontSize: 14 }}>★</span>
      ))}
    </div>
  );
}

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      id="testimonials"
      style={{
        width: "100%",
        maxWidth: 1200,
        margin: "0 auto",
        padding: "60px 20px",
      }}
    >
      {/* Section header */}
      <div style={{ textAlign: "center", marginBottom: 64 }}>
        <motion.p
          ref={ref}
          initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
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
          /TESTIMONIALS
        </motion.p>
        <motion.h2
          initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
          animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
          transition={{ duration: 0.5, delay: 0.06 }}
          style={{
            fontFamily: "var(--font-poppins)",
            fontWeight: 700,
            fontSize: "clamp(28px, 3.5vw, 48px)",
            letterSpacing: "-2px",
            lineHeight: 1.1,
            textTransform: "uppercase",
            color: "var(--fg)",
          }}
        >
          Real feedback,{" "}
          <span style={{ color: "rgba(32,46,60,0.4)" }}>Real results.</span>
        </motion.h2>
      </div>

      {/* Testimonial cards */}
      <div style={{ display: "flex", gap: 20, flexWrap: "wrap" }}>
        {testimonials.map((t, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, y: 20, filter: "blur(8px)" }}
            animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.6, delay: 0.1 + i * 0.1, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
            style={{
              flex: "1 1 300px",
              background: "var(--card-bg)",
              borderRadius: "var(--radius-md)",
              padding: 32,
              display: "flex",
              flexDirection: "column",
              justifyContent: "space-between",
              gap: 24,
            }}
          >
            <div>
              <Stars count={t.stars} />
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 400,
                  fontSize: 14,
                  letterSpacing: "0.3px",
                  lineHeight: 1.6,
                  color: "var(--fg-secondary)",
                  marginTop: 16,
                }}
              >
                &ldquo;{t.text}&rdquo;
              </p>
            </div>
            <div>
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 700,
                  fontSize: 14,
                  color: "var(--fg)",
                  marginBottom: 4,
                }}
              >
                {t.name}
              </p>
              <p
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 400,
                  fontSize: 12,
                  letterSpacing: "0.05em",
                  textTransform: "uppercase",
                  color: "var(--fg-secondary)",
                }}
              >
                {t.role}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Testimonials section header 2 (50+ founders) */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        style={{
          marginTop: 40,
          padding: "32px",
          background: "var(--dark-bg)",
          borderRadius: "var(--radius-md)",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 24,
        }}
      >
        <div>
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 700,
              fontSize: 11,
              letterSpacing: "12px",
              textTransform: "uppercase",
              color: "rgba(245,244,240,0.5)",
              marginBottom: 12,
            }}
          >
            TESTIMONIALS
          </p>
          <h3
            style={{
              fontFamily: "var(--font-poppins)",
              fontWeight: 500,
              fontSize: "clamp(20px, 2.5vw, 40px)",
              letterSpacing: "-2.5px",
              lineHeight: 1,
              textTransform: "uppercase",
              color: "var(--white)",
              maxWidth: 590,
            }}
          >
            50+ FOUNDERS TRUST SAMUEL TO BUILD CONVERTING WEBSITES
          </h3>
        </div>
        <div>
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 700,
              fontSize: 18,
              textTransform: "uppercase",
              color: "var(--white)",
              marginBottom: 8,
            }}
          >
            More reviews from clients
          </p>
          <a
            href="https://www.upwork.com"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 600,
              fontSize: 13,
              color: "var(--fg)",
              background: "var(--white)",
              padding: "12px 24px",
              borderRadius: 100,
              textDecoration: "none",
              display: "inline-block",
            }}
          >
            View Upwork Reviews →
          </a>
        </div>
      </motion.div>
    </section>
  );
}
