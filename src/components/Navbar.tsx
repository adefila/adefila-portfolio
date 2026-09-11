"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { CalendarDays } from "lucide-react";

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
          maxWidth: 1200,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          background: "var(--white)",
          border: "1px solid rgba(0,0,0,0.07)",
          borderRadius: 0,
          padding: "12px 12px 12px 28px",
          pointerEvents: "auto",
        }}
      >
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-inter)",
            fontWeight: 700,
            fontSize: 15,
            letterSpacing: "1px",
            textTransform: "uppercase",
            color: "var(--fg)",
            textDecoration: "none",
          }}
        >
          Samuel
        </Link>

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
            display: "flex",
            alignItems: "center",
            gap: 8,
          }}
        >
          SCHEDULE FREE CALL
          <CalendarDays size={14} strokeWidth={2} />
        </a>
      </div>
    </motion.nav>
  );
}
