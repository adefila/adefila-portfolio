"use client";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useState, useRef } from "react";

const faqs = [
  {
    q: "WHO DO YOU WORK WITH?",
    a: "Founders, startups, and agencies who need a website that actually does something for their business. If you're serious about your product, I'm serious about your site.",
  },
  {
    q: "WHAT TOOLS DO YOU BUILD WITH?",
    a: "Framer, Shopify, Webflow, WordPress — I choose based on what's right for you, not what I'm most comfortable with. My job is to give you the best tool for the job, then build it well.",
  },
  {
    q: "CAN YOU IMPROVE MY EXISTING WEBSITE?",
    a: "Yes — and that's often the most impactful move. I look at what's working, fix what's not, and improve what could be better. Whether it's a redesign, a migration, or a targeted fix.",
  },
  {
    q: "HOW MUCH DOES IT COST?",
    a: "Pricing is scoped to your project — no surprises, no retainers you don't need. Book a call and you'll leave with a clear number and exactly what's included.",
  },
  {
    q: "HOW FAST IS DELIVERY?",
    a: "Most projects are done in 7–14 days. Larger builds with multiple pages can run 2–3 weeks. You'll know the timeline before we start — and I stick to it.",
  },
  {
    q: "DO YOU USE TEMPLATES?",
    a: "Never. Everything starts from scratch. Your site is designed specifically for you, your audience, and what you're trying to accomplish — not pulled from a library.",
  },
  {
    q: "WILL MY SITE BE EASY TO MANAGE?",
    a: "Yes. I build with content management in mind so you can update things without touching code. I'll walk you through everything after launch so you feel confident on day one.",
  },
  {
    q: "HOW DO WE GET STARTED?",
    a: "Book a free 30-minute call. We'll talk about your project, your goals, and what a good outcome looks like. No pressure — just an honest conversation.",
  },
];

export default function FAQ() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const toggle = (i: number) => setOpenIndex(openIndex === i ? null : i);

  return (
    <section
      id="faq"
      style={{
        width: "100%",
        maxWidth: 1200,
        margin: "0 auto",
        padding: "80px 20px",
      }}
    >
      <div
        className="faq-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "1fr 1fr",
          gap: "0 80px",
          alignItems: "start",
        }}
      >
        {/* Left: sticky header block */}
        <div ref={ref} className="faq-left" style={{ position: "sticky", top: 120 }}>
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
            F . A . Q
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
            animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.5, delay: 0.06 }}
            style={{
              fontFamily: "var(--font-poppins)",
              fontWeight: 700,
              fontSize: "clamp(28px, 3vw, 48px)",
              letterSpacing: "-1px",
              lineHeight: 1.05,
              textTransform: "uppercase",
              color: "var(--fg)",
              marginBottom: 20,
            }}
          >
            STILL DECIDING?
            <br />
            LET ME CLEAR THAT UP.
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.14 }}
            style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 400,
              fontSize: 14,
              letterSpacing: "-0.3px",
              lineHeight: 1.7,
              color: "var(--fg-secondary)",
            }}
          >
            Can&apos;t find what you&apos;re looking for? Reach out directly —{" "}
            <a
              href="mailto:adefilasamuel929@gmail.com"
              style={{
                color: "var(--accent-purple)",
                fontWeight: 500,
                textDecoration: "none",
              }}
            >
              adefilasamuel929@gmail.com
            </a>
          </motion.p>
        </div>

        {/* Right: accordion */}
        <div style={{ borderTop: "1px solid rgba(0,0,0,0.07)" }}>
          {faqs.map((faq, i) => {
            const isOpen = openIndex === i;
            return (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.4, delay: 0.05 + i * 0.05 }}
                style={{
                  borderBottom: "1px solid rgba(0,0,0,0.07)",
                }}
              >
                <button
                  onClick={() => toggle(i)}
                  style={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    width: "100%",
                    padding: "20px 0",
                    background: "none",
                    border: "none",
                    cursor: "pointer",
                    gap: 24,
                    textAlign: "left",
                  }}
                >
                  <span
                    style={{
                      fontFamily: "var(--font-inter)",
                      fontWeight: 600,
                      fontSize: 14,
                      letterSpacing: "0.3px",
                      color: "var(--fg)",
                      textTransform: "uppercase",
                    }}
                  >
                    {faq.q}
                  </span>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.2 }}
                    style={{
                      fontSize: 22,
                      color: "var(--fg)",
                      flexShrink: 0,
                      lineHeight: 1,
                      display: "inline-block",
                    }}
                  >
                    +
                  </motion.span>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: "auto", opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
                      style={{ overflow: "hidden" }}
                    >
                      <p
                        style={{
                          fontFamily: "var(--font-inter)",
                          fontWeight: 400,
                          fontSize: 16,
                          letterSpacing: "-0.2px",
                          lineHeight: 1.7,
                          color: "var(--fg-secondary)",
                          paddingBottom: 20,
                        }}
                      >
                        {faq.a}
                      </p>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
