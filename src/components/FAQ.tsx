"use client";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useState, useRef } from "react";
import { ArrowRight } from "lucide-react";

const faqs = [
  {
    q: "How long does a typical project take?",
    a: "Most Framer websites are delivered within 7–14 days depending on scope. Complex projects with multiple pages and custom animations may take 2–3 weeks. I'll give you a clear timeline before we begin.",
  },
  {
    q: "What is your pricing?",
    a: "Clear costs, no hidden fees. I offer monthly subscriptions or individual project rates depending on your needs. Book a call and I'll walk you through the options.",
  },
  {
    q: "Can you redesign my existing website?",
    a: "Absolutely. I specialize in both building from scratch and improving existing websites — whether that's a full redesign, fixing bugs, or migrating from another platform to Framer.",
  },
  {
    q: "Do you offer post-launch support?",
    a: "Yes, I provide post-launch support to ensure everything runs smoothly. For ongoing work, I offer monthly retainer plans so you always have someone reliable on your side.",
  },
  {
    q: "What do you need from me to get started?",
    a: "A brief overview of your project, your goals, any references or existing brand assets, and your timeline. We'll sort out the rest in our kickoff call.",
  },
];

function FAQItem({ faq, index }: { faq: { q: string; a: string }; index: number }) {
  const [open, setOpen] = useState(false);

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.4, delay: index * 0.07 }}
      style={{
        borderBottom: "1px solid rgba(0,0,0,0.08)",
        overflow: "hidden",
      }}
    >
      <button
        onClick={() => setOpen(!open)}
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          width: "100%",
          padding: "24px 0",
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
            fontWeight: 500,
            fontSize: 16,
            letterSpacing: "-0.4px",
            lineHeight: 1.3,
            color: "var(--fg)",
          }}
        >
          {faq.q}
        </span>
        <motion.span
          animate={{ rotate: open ? 45 : 0 }}
          transition={{ duration: 0.2 }}
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: 24,
            color: "var(--fg)",
            flexShrink: 0,
            lineHeight: 1,
          }}
        >
          +
        </motion.span>
      </button>

      <AnimatePresence initial={false}>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
          >
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 400,
                fontSize: 15,
                letterSpacing: "-0.4px",
                lineHeight: 1.6,
                color: "var(--fg-secondary)",
                paddingBottom: 24,
                maxWidth: 680,
              }}
            >
              {faq.a}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.div>
  );
}

export default function FAQ() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      id="faq"
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
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
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
          f.a.q
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
            lineHeight: 1.05,
            textTransform: "uppercase",
            color: "var(--fg)",
          }}
        >
          Have a question?
          <br />
          I&apos;m happy to chat
        </motion.h2>
      </div>

      {/* FAQ layout */}
      <div style={{ display: "flex", gap: 80, alignItems: "flex-start", flexWrap: "wrap" }}>
        {/* Side text */}
        <div style={{ flex: "0 0 300px" }}>
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 700,
              fontSize: "clamp(28px, 3.5vw, 48px)",
              letterSpacing: "-0.05em",
              lineHeight: 1.1,
              textTransform: "uppercase",
              color: "rgba(102,113,133,0.5)",
            }}
          >
            FREQ ASKED QUESTIONS
          </p>
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 400,
              fontSize: 16,
              lineHeight: 1.5,
              color: "var(--fg-secondary)",
              marginTop: 20,
            }}
          >
            Clear costs, no hidden fees. Select from monthly subscription or individual project rate.
          </p>
          <a
            href="#contact"
            style={{
              display: "inline-flex",
              alignItems: "center",
              gap: 8,
              marginTop: 24,
              fontFamily: "var(--font-inter)",
              fontWeight: 600,
              fontSize: 14,
              color: "var(--accent-purple)",
              textDecoration: "none",
            }}
          >
            BOOK A 30MIN CALL <ArrowRight size={14} strokeWidth={2.5} />
          </a>
        </div>

        {/* FAQ list */}
        <div style={{ flex: 1, minWidth: 300 }}>
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
