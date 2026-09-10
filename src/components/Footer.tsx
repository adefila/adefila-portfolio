"use client";
import { motion } from "framer-motion";

const socials = [
  { label: "Twitter", href: "https://twitter.com" },
  { label: "LinkedIn", href: "https://linkedin.com" },
  { label: "Dribbble", href: "https://dribbble.com" },
  { label: "Upwork", href: "https://upwork.com" },
];

export default function Footer() {
  return (
    <footer
      style={{
        background: "rgb(250, 250, 250)",
        borderTop: "1px solid rgba(0,0,0,0.06)",
        padding: "80px 20px",
        width: "100%",
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
        {/* Left */}
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            style={{
              fontFamily: "var(--font-poppins)",
              fontWeight: 700,
              fontSize: 24,
              letterSpacing: "-0.5px",
              color: "var(--fg)",
              marginBottom: 8,
            }}
          >
            Adefila.
          </motion.h3>
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: 14,
              color: "var(--fg-secondary)",
              letterSpacing: "-0.3px",
              maxWidth: 300,
              lineHeight: 1.6,
            }}
          >
            Framer Developer &amp; UI/UX Designer. Building websites that convert.
          </p>
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: 13,
              color: "var(--accent-green)",
              marginTop: 12,
              display: "flex",
              alignItems: "center",
              gap: 6,
            }}
          >
            <span
              style={{
                width: 6,
                height: 6,
                borderRadius: "50%",
                background: "var(--accent-green)",
                display: "inline-block",
              }}
            />
            Available for work
          </p>
        </div>

        {/* Nav links */}
        <div style={{ display: "flex", gap: 80, flexWrap: "wrap" }}>
          <div>
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 600,
                fontSize: 12,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                color: "var(--fg-muted)",
                marginBottom: 16,
              }}
            >
              Navigate
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {["Work", "About", "FAQ", "Contact"].map((item) => (
                <a
                  key={item}
                  href={`#${item.toLowerCase()}`}
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: 14,
                    color: "var(--fg-secondary)",
                    textDecoration: "none",
                    letterSpacing: "-0.2px",
                  }}
                >
                  {item}
                </a>
              ))}
            </div>
          </div>

          <div>
            <p
              style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 600,
                fontSize: 12,
                letterSpacing: "0.05em",
                textTransform: "uppercase",
                color: "var(--fg-muted)",
                marginBottom: 16,
              }}
            >
              Connect
            </p>
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {socials.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: 14,
                    color: "var(--fg-secondary)",
                    textDecoration: "none",
                    letterSpacing: "-0.2px",
                  }}
                >
                  {s.label} ↗
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div
        style={{
          maxWidth: 1200,
          margin: "48px auto 0",
          paddingTop: 24,
          borderTop: "1px solid rgba(0,0,0,0.06)",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          flexWrap: "wrap",
          gap: 12,
        }}
      >
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: 12,
            color: "var(--fg-muted)",
            letterSpacing: "-0.2px",
          }}
        >
          © {new Date().getFullYear()} Adefila Samuel. All rights reserved.
        </p>
        <p
          style={{
            fontFamily: "var(--font-inter)",
            fontSize: 12,
            color: "var(--fg-muted)",
            letterSpacing: "-0.2px",
          }}
        >
          Built with Next.js &amp; Framer Motion
        </p>
      </div>
    </footer>
  );
}
