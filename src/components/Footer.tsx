"use client";
import { motion } from "framer-motion";
import { ArrowUpRight, CalendarDays } from "lucide-react";
import MagneticButton from "./MagneticButton";
import { useLang } from "@/context/LangContext";
import { useState } from "react";
import { BOOKING_URL } from "@/lib/booking";

const FOOTER_EMAIL = "samuel@adefilasamuel.com";

function FooterCopyEmail() {
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState(false);
  // Checked at the moment of the event: copy-on-click only on devices with a real hover
  const canHover = () => window.matchMedia("(hover: hover)").matches;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!canHover()) return;
    e.preventDefault();
    navigator.clipboard.writeText(FOOTER_EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    });
  };

  return (
    <a
      href={`mailto:${FOOTER_EMAIL}`}
      onClick={handleClick}
      onMouseEnter={() => canHover() && setHovered(true)}
      onMouseLeave={() => setHovered(false)}
      style={{
        display: "inline-flex",
        alignItems: "center",
        gap: 8,
        fontFamily: "var(--font-inter)",
        fontSize: 14,
        color: "rgba(255,255,255,0.9)",
        textDecoration: "none",
      }}
    >
      <span style={{
        borderBottom: `1px solid ${hovered ? "rgba(255,255,255,0.45)" : "transparent"}`,
        paddingBottom: 1,
        transition: "border-color 0.2s ease",
      }}>
        {FOOTER_EMAIL}
      </span>
      <span style={{
        fontFamily: "var(--font-inter)",
        fontWeight: 600,
        fontSize: 10,
        letterSpacing: "1.5px",
        textTransform: "uppercase",
        color: copied ? "#c4b5fd" : "rgba(255,255,255,0.4)",
        opacity: hovered ? 1 : 0,
        transform: hovered ? "translateX(0)" : "translateX(6px)",
        transition: "opacity 0.22s ease, transform 0.22s ease, color 0.15s ease",
        whiteSpace: "nowrap",
        pointerEvents: "none",
      }}>
        {copied ? "Copied ✓" : "Copy"}
      </span>
    </a>
  );
}

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

// Splits a paragraph into two lines: at the sentence end nearest its middle, or, for one sentence,
// at the comma or word break nearest the middle
function twoLines(text: string, cls: string) {
  const at = (re: RegExp, shift: (m: RegExpMatchArray) => number) =>
    [...text.matchAll(re)].map((m) => shift(m)).filter((i) => i > 0 && i < text.trim().length);
  const ends = at(/[.!?。]s*/g, (m) => (m.index as number) + 1);
  const soft = at(/[，,、]s*|s+/g, (m) => (m.index as number) + (/[，,、]/.test(m[0][0]) ? 1 : 0));
  const options = ends.length ? ends : soft;
  if (!options.length) return text;
  const mid = text.length / 2;
  const cut = options.reduce((x, y) => (Math.abs(y - mid) < Math.abs(x - mid) ? y : x));
  return <><span className={cls}>{text.slice(0, cut).trim()}</span><br /><span className={cls}>{text.slice(cut).trim()}</span></>;
}

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
          padding: "80px 20px",
          position: "relative",
          overflow: "hidden",
        }}
      >
        <div
          style={{
            maxWidth: 1160,
            margin: "0 auto",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: "wrap",
            gap: 40,
          }}
        >
          {/* Left: headline + subheading */}
          <div style={{ flex: "1 1 560px" }}>
            <motion.h2
              initial={{ opacity: 0, y: 10 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.5, delay: 0.06 }}
              style={{
                fontFamily: "var(--font-poppins)",
                fontWeight: 700,
                // Scales with the screen so each sentence fits on one line (see .footer-cta-line)
                fontSize: "clamp(20px, 7.4vw, 56px)",
                letterSpacing: "-1px",
                lineHeight: 1.05,
                textTransform: "uppercase",
                color: "var(--white)",
                marginBottom: 16,
              }}
            >
              {(() => {
                const s = t("footer.cta");
                const mid = s.indexOf(". ");
                if (mid < 0) return s;
                // Each sentence on its own line, kept whole on desktop (see .footer-cta-line)
                return <><span className="footer-cta-line">{s.slice(0, mid + 1)}</span><br /><span className="footer-cta-line">{s.slice(mid + 2)}</span></>;
              })()}
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
                color: "rgba(255,255,255,0.85)",
                maxWidth: 760,
              }}
            >
              {twoLines(t("footer.ctaDesc"), "footer-two-line")}
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
              href={BOOKING_URL}
              target="_blank"
              rel="noopener noreferrer"
              className="btn-cta"
              style={{
                alignItems: "center",
                justifyContent: "center",
                gap: 8,
                fontFamily: "var(--font-inter)",
                fontWeight: 600,
                textTransform: "uppercase",
                lineHeight: "20px",
                fontSize: 13,
                color: "var(--accent-purple)",
                background: "#fff",
                padding: "14px 26px",
                borderRadius: 0,
                textDecoration: "none",
                letterSpacing: "0.5px",
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
            maxWidth: 1160,
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
                marginBottom: 16,
              }}
            >
              Samuel
            </p>
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 400,
                fontSize: 13,
                color: "rgba(255,255,255,0.8)",
                lineHeight: 1.6,
              }}
            >
              {twoLines(t("footer.tagline"), "footer-tag-line")}
            </p>
          </div>

          {/* Portfolio links */}
          <div>
            <p
              style={{
                fontFamily: "var(--font-mono)",
                fontWeight: 600,
                fontSize: 11,
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.88)",
                marginBottom: 16,
              }}
            >
              {t("footer.portfolioLabel")}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {portfolioLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: 14,
                    color: "rgba(255,255,255,0.9)",
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
                fontFamily: "var(--font-mono)",
                fontWeight: 600,
                fontSize: 11,
                letterSpacing: "2px",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.88)",
                marginBottom: 16,
              }}
            >
              {t("footer.followLabel")}
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {socialLinks.map((link) => (
                <a
                  key={link.label}
                  href={link.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: 14,
                    color: "rgba(255,255,255,0.9)",
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
            <FooterCopyEmail />
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontSize: 12,
                color: "rgba(255,255,255,0.85)",
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
