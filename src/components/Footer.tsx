"use client";
import { motion } from "framer-motion";
import { ArrowUpRight, ArrowRight } from "lucide-react";

const portfolioLinks = [
  { label: "Dribbble", href: "https://dribbble.com" },
  { label: "Behance", href: "https://behance.net" },
  { label: "Layers", href: "https://layers.to" },
];

const socialLinks = [
  { label: "Twitter (X)", href: "https://twitter.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Instagram", href: "https://instagram.com" },
  { label: "Facebook", href: "https://facebook.com" },
];

export default function Footer() {
  return (
    <footer style={{ width: "100%" }}>
      {/* GET STARTED CTA */}
      <div
        style={{
          width: "100%",
          background: "var(--accent-purple)",
          padding: "80px 20px",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 40,
          }}
        >
          <div>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5 }}
              style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 700,
                fontSize: 11,
                letterSpacing: "10px",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.6)",
                marginBottom: 16,
              }}
            >
              GET STARTED
            </motion.p>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.06 }}
              style={{
                fontFamily: "var(--font-poppins)",
                fontWeight: 700,
                fontSize: "clamp(32px, 4vw, 60px)",
                letterSpacing: "-2px",
                lineHeight: 1,
                textTransform: "uppercase",
                color: "var(--white)",
              }}
            >
              READY TO WORK WITH ME?
            </motion.h2>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.12 }}
            style={{ display: "flex", gap: 12, flexWrap: "wrap" }}
          >
            <a
              href="#contact"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontFamily: "var(--font-inter)",
                fontWeight: 600,
                fontSize: 14,
                color: "var(--accent-purple)",
                background: "var(--white)",
                padding: "14px 28px",
                textDecoration: "none",
                letterSpacing: "-0.2px",
              }}
            >
              BOOK A CALL <ArrowRight size={14} strokeWidth={2.5} />
            </a>
            <a
              href="#work"
              style={{
                display: "inline-flex",
                alignItems: "center",
                gap: 8,
                fontFamily: "var(--font-inter)",
                fontWeight: 600,
                fontSize: 14,
                color: "var(--white)",
                background: "transparent",
                padding: "14px 28px",
                border: "1px solid rgba(255,255,255,0.4)",
                textDecoration: "none",
                letterSpacing: "-0.2px",
              }}
            >
              VIEW MORE WORKS <ArrowUpRight size={14} strokeWidth={2.5} />
            </a>
          </motion.div>
        </div>
      </div>

      {/* Footer bar */}
      <div
        style={{
          width: "100%",
          background: "#0f0f0f",
          padding: "48px 20px",
        }}
      >
        <div
          style={{
            maxWidth: 1200,
            margin: "0 auto",
            display: "flex",
            justifyContent: "space-between",
            alignItems: "flex-start",
            flexWrap: "wrap",
            gap: 40,
          }}
        >
          {/* Portfolio links */}
          <div>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {portfolioLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: 14,
                    color: "rgba(255,255,255,0.7)",
                    textDecoration: "none",
                    display: "flex",
                    alignItems: "center",
                    gap: 4,
                  }}
                >
                  {link.label} <ArrowUpRight size={13} strokeWidth={2} />
                </a>
              ))}
            </div>
          </div>

          {/* Social links */}
          <div>
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 600,
                fontSize: 11,
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.4)",
                marginBottom: 14,
              }}
            >
              FOLLOW ME ON
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: 14,
                    color: "rgba(255,255,255,0.7)",
                    textDecoration: "none",
                  }}
                >
                  {link.label}
                </a>
              ))}
            </div>
          </div>

          {/* Email + copyright */}
          <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-end" }}>
            <a
              href="mailto:adefilasamuel929@gmail.com"
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: 14,
                color: "rgba(255,255,255,0.7)",
                textDecoration: "none",
              }}
            >
              adefilasamuel929@gmail.com
            </a>
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: 12,
                color: "rgba(255,255,255,0.35)",
                letterSpacing: "0.5px",
                textTransform: "uppercase",
              }}
            >
              © ADEYEMI 2025. ALL RIGHTS RESERVED
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
