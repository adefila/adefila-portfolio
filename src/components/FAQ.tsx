"use client";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useState, useRef } from "react";
import { useLang } from "@/context/LangContext";

export default function FAQ() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const { t } = useLang();

  const faqs = Array.from({ length: 10 }, (_, i) => ({
    q: t(`faq.q${i}`),
    a: t(`faq.a${i}`),
  }));

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
            {t("faq.eyebrow")}
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
            {t("faq.h1")}
            <br />
            {t("faq.h2")}
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
              marginBottom: 40,
            }}
          >
            {t("faq.desc")}{" "}
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
                transition={{ duration: 0.4, delay: 0.05 + i * 0.04 }}
                style={{
                  borderBottom: "1px solid rgba(0,0,0,0.07)",
                  background: isOpen ? "rgba(109,40,217,0.025)" : "transparent",
                  transition: "background 0.25s ease",
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
                  <div style={{ display: "flex", alignItems: "center", gap: 16, minWidth: 0, flex: 1 }}>
                    <span style={{
                      fontFamily: "var(--font-inter)",
                      fontWeight: 400,
                      fontSize: 10,
                      letterSpacing: "0.5px",
                      color: isOpen ? "var(--accent-purple)" : "rgba(0,0,0,0.2)",
                      flexShrink: 0,
                      transition: "color 0.2s",
                      fontVariantNumeric: "tabular-nums",
                      minWidth: 20,
                    }}>
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    <span
                      style={{
                        fontFamily: "var(--font-inter)",
                        fontWeight: 600,
                        fontSize: 13,
                        letterSpacing: "0.3px",
                        color: isOpen ? "var(--accent-purple)" : "var(--fg)",
                        textTransform: "uppercase",
                        transition: "color 0.2s",
                      }}
                    >
                      {faq.q}
                    </span>
                  </div>
                  <motion.span
                    animate={{ rotate: isOpen ? 45 : 0 }}
                    transition={{ duration: 0.22 }}
                    style={{
                      fontSize: 20,
                      color: isOpen ? "var(--accent-purple)" : "var(--fg)",
                      flexShrink: 0,
                      lineHeight: 1,
                      display: "inline-block",
                      transition: "color 0.2s",
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
                          fontSize: 15,
                          letterSpacing: "-0.2px",
                          lineHeight: 1.75,
                          color: "var(--fg-secondary)",
                          paddingTop: 4,
                          paddingBottom: 28,
                          paddingLeft: 36,
                          paddingRight: 16,
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
