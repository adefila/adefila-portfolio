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
        left: "50%",
        transform: "translateX(-50%)",
        zIndex: 100,
        width: "calc(100% - 40px)",
        maxWidth: 1160,
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        background: "rgba(245, 244, 240, 0.85)",
        backdropFilter: "blur(20px)",
        WebkitBackdropFilter: "blur(20px)",
        border: "1px solid rgba(0,0,0,0.08)",
        borderRadius: 100,
        padding: "12px 24px",
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

      <div style={{ display: "flex", gap: 32, alignItems: "center" }}>
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
          padding: "10px 20px",
          borderRadius: 100,
          textDecoration: "none",
          letterSpacing: "-0.2px",
          transition: "opacity 0.2s",
        }}
        onMouseEnter={(e) => ((e.target as HTMLElement).style.opacity = "0.8")}
        onMouseLeave={(e) => ((e.target as HTMLElement).style.opacity = "1")}
      >
        Book a call
      </a>
    </motion.nav>
  );
}
