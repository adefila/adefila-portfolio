"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

export default function Contact() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const [formData, setFormData] = useState({ name: "", email: "", message: "" });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <section
      id="contact"
      style={{
        background: "#fff",
        width: "100%",
        padding: "80px 20px",
      }}
    >
      <div style={{ maxWidth: 1200, margin: "0 auto" }}>
        <div style={{ display: "flex", gap: 80, alignItems: "flex-start", flexWrap: "wrap" }}>
          {/* Left: CTA */}
          <div style={{ flex: 1, minWidth: 300 }}>
            <motion.p
              ref={ref}
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5 }}
              style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 700,
                fontSize: 11,
                letterSpacing: "12px",
                textTransform: "uppercase",
                color: "var(--fg-label)",
                marginBottom: 20,
              }}
            >
              READY TO START?
            </motion.p>

            <motion.h2
              initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
              animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
              transition={{ duration: 0.5, delay: 0.06 }}
              style={{
                fontFamily: "var(--font-poppins)",
                fontWeight: 700,
                fontSize: "clamp(32px, 4vw, 64px)",
                letterSpacing: "-2px",
                lineHeight: 1,
                textTransform: "uppercase",
                color: "var(--fg)",
                marginBottom: 24,
              }}
            >
              READY TO START ALREADY?
            </motion.h2>

            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.12 }}
              style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 400,
                fontSize: 16,
                letterSpacing: "-0.4px",
                lineHeight: 1.6,
                color: "var(--fg-secondary)",
                marginBottom: 32,
                maxWidth: 400,
              }}
            >
              Book a 30-minute call to talk about your project and get things kicked off.
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: 0.18 }}
              style={{ display: "flex", flexDirection: "column", gap: 12 }}
            >
              <a
                href="https://calendly.com"
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  fontFamily: "var(--font-inter)",
                  fontWeight: 600,
                  fontSize: 14,
                  color: "var(--accent-purple)",
                  textDecoration: "none",
                  letterSpacing: "-0.3px",
                }}
              >
                📞 Book a call — 30 mins, no commitment
              </a>
              <a
                href="mailto:adefilasamuel929@gmail.com"
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 8,
                  fontFamily: "var(--font-inter)",
                  fontWeight: 500,
                  fontSize: 14,
                  color: "var(--fg-secondary)",
                  textDecoration: "none",
                  letterSpacing: "-0.3px",
                }}
              >
                ✉️ adefilasamuel929@gmail.com
              </a>
            </motion.div>
          </div>

          {/* Right: Contact form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            style={{ flex: 1, minWidth: 300 }}
          >
            {submitted ? (
              <div
                style={{
                  textAlign: "center",
                  padding: 48,
                  background: "var(--card-bg)",
                  borderRadius: "var(--radius-md)",
                }}
              >
                <p style={{ fontSize: 48, marginBottom: 16 }}>🎉</p>
                <h3
                  style={{
                    fontFamily: "var(--font-poppins)",
                    fontWeight: 600,
                    fontSize: 24,
                    color: "var(--fg)",
                    marginBottom: 8,
                  }}
                >
                  Message sent!
                </h3>
                <p style={{ color: "var(--fg-secondary)", fontSize: 14 }}>
                  I&apos;ll get back to you within 24 hours.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                {[
                  { label: "Name", key: "name", type: "text", placeholder: "Your name" },
                  { label: "Email", key: "email", type: "email", placeholder: "your@email.com" },
                ].map((field) => (
                  <div key={field.key}>
                    <label
                      style={{
                        display: "block",
                        fontFamily: "var(--font-inter)",
                        fontWeight: 500,
                        fontSize: 12,
                        color: "rgb(136, 136, 136)",
                        marginBottom: 8,
                        letterSpacing: "-0.2px",
                      }}
                    >
                      {field.label}
                    </label>
                    <input
                      type={field.type}
                      placeholder={field.placeholder}
                      value={formData[field.key as keyof typeof formData]}
                      onChange={(e) => setFormData({ ...formData, [field.key]: e.target.value })}
                      required
                      style={{
                        width: "100%",
                        padding: "14px 16px",
                        borderRadius: 12,
                        border: "1px solid rgba(0,0,0,0.1)",
                        background: "var(--card-bg)",
                        fontFamily: "var(--font-inter)",
                        fontSize: 14,
                        color: "var(--fg)",
                        outline: "none",
                        letterSpacing: "-0.3px",
                      }}
                    />
                  </div>
                ))}

                <div>
                  <label
                    style={{
                      display: "block",
                      fontFamily: "var(--font-inter)",
                      fontWeight: 500,
                      fontSize: 12,
                      color: "rgb(136, 136, 136)",
                      marginBottom: 8,
                    }}
                  >
                    Message
                  </label>
                  <textarea
                    placeholder="Tell me about your project..."
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    required
                    rows={5}
                    style={{
                      width: "100%",
                      padding: "14px 16px",
                      borderRadius: 12,
                      border: "1px solid rgba(0,0,0,0.1)",
                      background: "var(--card-bg)",
                      fontFamily: "var(--font-inter)",
                      fontSize: 14,
                      color: "var(--fg)",
                      outline: "none",
                      resize: "vertical",
                      letterSpacing: "-0.3px",
                    }}
                  />
                </div>

                <button
                  type="submit"
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontWeight: 600,
                    fontSize: 14,
                    color: "var(--white)",
                    background: "var(--fg)",
                    padding: "16px 32px",
                    borderRadius: 100,
                    border: "none",
                    cursor: "pointer",
                    letterSpacing: "-0.2px",
                    transition: "opacity 0.2s",
                  }}
                >
                  Send Message →
                </button>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}
