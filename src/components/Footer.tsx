"use client";
import { motion } from "framer-motion";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import MagneticButton from "./MagneticButton";
import { useLang } from "@/context/LangContext";

const portfolioLinks = [
  { label: "Dribbble", href: "https://dribbble.com/Adeyemisamuel020" },
  { label: "Behance", href: "https://www.behance.net/adefilasamuel" },
  { label: "Layers", href: "https://layers.to/adeyemisamuel" },
];

const socialLinks = [
  { label: "Twitter (X)", href: "https://x.com/adeyemiS_" },
  { label: "LinkedIn", href: "https://www.linkedin.com/in/adefila-samuel-144448201/" },
  { label: "Instagram", href: "https://www.instagram.com/adeyemi929_" },
];

export default function Footer() {
  const { t } = useLang();
  return (
    <footer style={{ width: "100%" }}>
      {/* GET STARTED CTA */}
      <div
        className="footer-cta"
        style={{
          width: "100%",
          background: "var(--accent-purple)",
          padding: "72px 20px",
          position: "relative",
          overflow: "hidden",
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
            gap: 48,
          }}
        >
          {/* Left: headline + subheading */}
          <div style={{ flex: "1 1 480px", maxWidth: 600 }}>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.06 }}
              style={{
                fontFamily: "var(--font-poppins)",
                fontWeight: 700,
                fontSize: "clamp(32px, 4vw, 56px)",
                letterSpacing: "-1px",
                lineHeight: 1.05,
                textTransform: "uppercase",
                color: "var(--white)",
                marginBottom: 20,
                maxWidth: 560,
              }}
            >
              {t("footer.cta")}
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.12 }}
              style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 400,
                fontSize: 15,
                letterSpacing: "-0.3px",
                lineHeight: 1.65,
                color: "rgba(255,255,255,0.7)",
                maxWidth: 460,
              }}
            >
              {t("footer.ctaDesc")}
            </motion.p>
          </div>

          {/* Right: buttons */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.18 }}
            style={{ display: "flex", flexDirection: "column", gap: 12, flexShrink: 0 }}
          >
            <MagneticButton
              href="https://calendly.com/adefilasamuel929/30min"
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta"
              style={{
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                fontFamily: "var(--font-inter)",
                fontWeight: 600,
                fontSize: 14,
                color: "var(--accent-purple)",
                background: "var(--white)",
                padding: "14px 28px",
                borderRadius: 0,
                textDecoration: "none",
                letterSpacing: "-0.2px",
                whiteSpace: "nowrap",
              }}
            >
              {t("common.bookCall")} <CalendarDays size={14} strokeWidth={2} />
            </MagneticButton>
          </motion.div>
        </div>
      </div>

      {/* Footer bar — deep purple */}
      <div
        style={{
          width: "100%",
          background: "var(--accent-purple)",
          padding: "48px 20px",
          borderTop: "1px solid rgba(255,255,255,0.12)",
        }}
      >
        <div
          className="footer-bar-inner"
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
          {/* Brand */}
          <div>
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 700,
                fontSize: 15,
                letterSpacing: "1px",
                textTransform: "uppercase",
                color: "var(--white)",
                marginBottom: 12,
              }}
            >
              Samuel
            </p>
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 400,
                fontSize: 13,
                color: "rgba(255,255,255,0.45)",
                lineHeight: 1.6,
                maxWidth: 200,
              }}
            >
              Framer & Web Developer building fast, beautiful sites.
            </p>
          </div>

          {/* Portfolio links */}
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
              PORTFOLIO
            </p>
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
          <div style={{ display: "flex", flexDirection: "column", gap: 16, alignItems: "flex-start" }}>
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
                color: "rgba(255,255,255,0.3)",
                letterSpacing: "0.5px",
                textTransform: "uppercase",
              }}
            >
              &copy; SAMUEL ADEFILA 2026. ALL RIGHTS RESERVED
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
