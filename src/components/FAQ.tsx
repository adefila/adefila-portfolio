"use client";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useState, useRef } from "react";

const faqs = [
  {
    q: "WHO DO YOU WORK WITH?",
    a: "Founders, startups, and agencies who are ready to turn their website into a client-getting machine. If you have a product worth selling, I'll build the site that sells it.",
  },
  {
    q: "CAN YOU IMPROVE MY EXISTING WEBSITE?",
    a: "Yes — and often that's the highest-leverage move. I audit what's hurting you, fix what's broken, and rebuild what's holding you back. Platform migration, performance, UI overhaul — all covered.",
  },
  {
    q: "DO YOU BUILD FROM SCRATCH?",
    a: "Every time. No templates, no recycled layouts. Your site starts from a blank canvas and is designed entirely around your brand, your audience, and what makes them convert.",
  },
  {
    q: "HOW MUCH DOES IT COST?",
    a: "Pricing is scoped to your project — no retainers you don't need, no surprise invoices. Book a call and you'll leave with a clear number and a clear plan.",
  },
  {
    q: "HOW FAST IS DELIVERY?",
    a: "Most projects ship in 7–14 days. Multi-page builds with custom animations run 2–3 weeks. Either way, you'll have a firm timeline before we start — and I stick to it.",
  },
  {
    q: "DO YOU USE TEMPLATES OR CUSTOM DESIGN?",
    a: "Never templates. Every project is built from scratch, designed specifically for you. Cookie-cutter sites don't convert — that's why I don't make them.",
  },
  {
    q: "WILL MY SITE BE EASY TO MANAGE?",
    a: "Absolutely. Framer's CMS lets you update content without touching code. I'll also walk you through everything after launch so you feel fully in control from day one.",
  },
  {
    q: "HOW DO WE GET STARTED?",
    a: "Book a free 30-minute call. We'll map out your project, set a realistic timeline, and I'll tell you exactly what to expect — no fluff, no pressure, no obligation.",
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
      {/* Centered header */}
      <div style={{ textAlign: "center", marginBottom: 56 }}>
        <motion.p
          ref={ref}
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
            marginBottom: 20,
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
            fontSize: "clamp(28px, 3.5vw, 52px)",
            letterSpacing: "-2px",
            lineHeight: 1.05,
            textTransform: "uppercase",
            color: "var(--fg)",
          }}
        >
          STILL DECIDING?
          <br />
          LET ME CLEAR THAT UP.
        </motion.h2>
      </div>

      {/* Full-width accordion */}
      <div style={{ maxWidth: 780, margin: "0 auto" }}>
        {faqs.map((faq, i) => {
          const isOpen = openIndex === i;
          return (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 12 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.4, delay: 0.05 + i * 0.05 }}
              style={{
                background: "var(--white)",
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
                  padding: "22px 24px",
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
                        fontSize: 14,
                        letterSpacing: "-0.2px",
                        lineHeight: 1.7,
                        color: "var(--fg-secondary)",
                        padding: "0 24px 24px",
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
    </section>
  );
}
