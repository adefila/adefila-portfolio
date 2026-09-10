"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";

const testimonials = [
  {
    text: "Samuel was a fantastic collaborator throughout the entire project. He brought a high level of professionalism, attention to detail, and technical skill to the website build. Communication was smooth, and he consistently delivered high-quality work on time. I'd gladly work with him again on future projects and highly recommend him to anyone looking for a reliable and capable framer developer.",
    name: "Nitin",
    role: "HitPay App",
  },
  {
    text: "Adefila was amazing in helping me complete my website on Framer. When he finished, my website was ready to go live. I really appreciate his quick communication and solution-oriented attitude. Hoping to work together in the future",
    name: "Alyssa Corso",
    role: "SEO Consultant for Healthcare Startups",
  },
  {
    text: "I recently had the pleasure working with Samuel on the development of my Wordpress website, and I am happy to share my exceptional experience and satisfaction with his service.",
    name: "Layo",
    role: "Content Writer",
  },
  {
    text: "Outstanding work from start to finish. The attention to detail was remarkable and the final product exceeded all expectations. Highly recommended for any Framer project.",
    name: "Marcus",
    role: "Startup Founder",
  },
];

export default function Testimonials() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [page, setPage] = useState(0);
  const perPage = 2;
  const totalPages = Math.ceil(testimonials.length / perPage);
  const visible = testimonials.slice(page * perPage, page * perPage + perPage);

  return (
    <section
      id="testimonials"
      style={{ width: "100%", padding: "80px 20px", background: "var(--bg)" }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        {/* Header row */}
        <div
          ref={ref}
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            marginBottom: 40,
            flexWrap: "wrap",
            gap: 24,
          }}
        >
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 700,
                fontSize: 11,
                letterSpacing: "10px",
                textTransform: "uppercase",
                color: "var(--accent-purple)",
                marginBottom: 16,
              }}
            >
              TESTIMONIALS
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
              animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.5, delay: 0.06 }}
              style={{
                fontFamily: "var(--font-poppins)",
                fontWeight: 700,
                fontSize: "clamp(24px, 3vw, 44px)",
                letterSpacing: "-2px",
                lineHeight: 1.05,
                textTransform: "uppercase",
                color: "var(--fg)",
                maxWidth: 580,
              }}
            >
              50+ FOUNDERS TRUST SAMUEL TO BUILD CONVERTING WEBSITES
            </motion.h2>
          </div>

          {/* Nav arrows */}
          <div style={{ display: "flex", gap: 12, alignSelf: "flex-start", marginTop: 8 }}>
            <button
              onClick={() => setPage((p) => Math.max(0, p - 1))}
              disabled={page === 0}
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                border: "1px solid rgba(0,0,0,0.15)",
                background: page === 0 ? "rgba(0,0,0,0.04)" : "var(--white)",
                cursor: page === 0 ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: page === 0 ? 0.4 : 1,
                transition: "opacity 0.2s",
              }}
            >
              <ChevronLeft size={18} strokeWidth={2} />
            </button>
            <button
              onClick={() => setPage((p) => Math.min(totalPages - 1, p + 1))}
              disabled={page === totalPages - 1}
              style={{
                width: 44,
                height: 44,
                borderRadius: "50%",
                border: "1px solid rgba(0,0,0,0.15)",
                background: page === totalPages - 1 ? "rgba(0,0,0,0.04)" : "var(--white)",
                cursor: page === totalPages - 1 ? "not-allowed" : "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                opacity: page === totalPages - 1 ? 0.4 : 1,
                transition: "opacity 0.2s",
              }}
            >
              <ChevronRight size={18} strokeWidth={2} />
            </button>
          </div>
        </div>

        {/* Main content: stat card + testimonials */}
        <div style={{ display: "grid", gridTemplateColumns: "240px 1fr", gap: 20, alignItems: "stretch" }}>
          {/* Left: purple stat card */}
          <div
            style={{
              background: "var(--accent-purple)",
              borderRadius: "var(--radius-md)",
              padding: 32,
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-end",
              minHeight: 320,
            }}
          >
            <p
              style={{
                fontFamily: "var(--font-satoshi)",
                fontWeight: 700,
                fontSize: "clamp(64px, 8vw, 96px)",
                lineHeight: 1,
                color: "var(--white)",
                marginBottom: 8,
              }}
            >
              50+
            </p>
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 400,
                fontSize: 14,
                color: "rgba(255,255,255,0.7)",
                lineHeight: 1.4,
              }}
            >
              Successfully Delivered projects
            </p>
          </div>

          {/* Right: two testimonial cards */}
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 20 }}>
            {visible.map((t, i) => (
              <motion.div
                key={`${page}-${i}`}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.4, delay: i * 0.08 }}
                style={{
                  background: "var(--white)",
                  border: "1px solid rgba(109,40,217,0.15)",
                  borderRadius: "var(--radius-md)",
                  padding: 28,
                  display: "flex",
                  flexDirection: "column",
                  justifyContent: "space-between",
                  gap: 20,
                }}
              >
                <div>
                  <p style={{ fontSize: 28, color: "var(--fg)", lineHeight: 1, marginBottom: 16 }}>&ldquo;</p>
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
                    {t.text}
                  </p>
                </div>
                <div>
                  <p
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontWeight: 700,
                      fontSize: 13,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
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
                      fontSize: 11,
                      textTransform: "uppercase",
                      letterSpacing: "0.5px",
                      color: "var(--fg-secondary)",
                    }}
                  >
                    {t.role}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
