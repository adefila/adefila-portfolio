"use client";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useState, useRef } from "react";

const faqs = [
  {
    q: "WHO DO YOU WORK WITH?",
    a: "I work with startups, founders, agencies, and businesses of all sizes who want high-quality Framer websites. Whether you're launching something new or improving an existing site, I'm here to help.",
  },
  {
    q: "CAN YOU IMPROVE MY EXISTING WEBSITE?",
    a: "Absolutely. I specialize in auditing, redesigning, and improving existing websites — fixing bugs, improving performance, enhancing UI, or migrating from another platform to Framer.",
  },
  {
    q: "DO YOU BUILD FROM SCRATCH?",
    a: "Yes. I design and develop fully custom Framer websites from scratch, tailored to your brand, audience, and goals — no templates, no shortcuts.",
  },
  {
    q: "HOW MUCH DOES IT COST?",
    a: "Clear costs, no hidden fees. I offer monthly subscriptions or individual project rates depending on your needs. Book a call and I'll walk you through the options.",
  },
  {
    q: "HOW FAST IS DELIVERY?",
    a: "Most Framer websites are delivered within 7–14 days depending on scope. Complex projects with multiple pages and custom animations may take 2–3 weeks. I'll give you a clear timeline before we begin.",
  },
  {
    q: "DO YOU USE TEMPLATES OR CUSTOM DESIGN?",
    a: "Everything is custom. I don't use pre-made templates. Every project starts from a blank canvas and is designed specifically for you and your audience.",
  },
  {
    q: "WILL MY SITE BE EASY TO MANAGE?",
    a: "Yes. Framer's CMS makes it simple to update content without touching any code. I'll also provide a walkthrough so you feel confident managing your site after launch.",
  },
  {
    q: "HOW DO WE GET STARTED?",
    a: "Book a free 30-minute call. We'll talk about your project, timeline, and goals — and I'll give you a clear plan to move forward.",
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
          HAVE A QUESTION?
          <br />
          I&apos;M HAPPY TO CHAT
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
