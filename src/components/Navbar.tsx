"use client";
import { motion } from "framer-motion";
import Link from "next/link";

export default function Navbar() {
  return (
    <motion.nav
      initial={{ opacity: 0, y: -20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] as [number, number, number, number] }}
      style={{
        position: "fixed",
        top: 16,
        left: 0,
        right: 0,
        zIndex: 100,
        display: "flex",
        justifyContent: "center",
        pointerEvents: "none",
      }}
    >
      <div
        style={{
          width: "calc(100% - 48px)",
          maxWidth: 1100,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "rgba(245, 244, 240, 0.88)",
          backdropFilter: "blur(24px)",
          WebkitBackdropFilter: "blur(24px)",
          border: "1px solid rgba(0,0,0,0.07)",
          borderRadius: 100,
          padding: "12px 20px 12px 28px",
          pointerEvents: "auto",
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-poppins)",
            fontWeight: 700,
            fontSize: 16,
            letterSpacing: "-0.5px",
            color: "var(--fg)",
            textDecoration: "none",
          }}
        >
          Adefila.
        </Link>

        <div style={{ display: "flex", gap: 28, alignItems: "center" }}>
          {["Work", "About", "FAQ"].map((item) => (
            <a
              key={item}
              href={`#${item.toLowerCase()}`}
              style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 500,
                fontSize: 13,
                color: "var(--fg-secondary)",
                textDecoration: "none",
                letterSpacing: "-0.2px",
              }}
            >
              {item}
            </a>
          ))}
        </div>

        <a
          href="#contact"
          style={{
            fontFamily: "var(--font-inter)",
            fontWeight: 600,
            fontSize: 13,
            color: "var(--white)",
            background: "var(--fg)",
            padding: "10px 22px",
            borderRadius: 100,
            textDecoration: "none",
            letterSpacing: "-0.2px",
          }}
        >
          Book a call
        </a>
      </div>
    </motion.nav>
  );
}
