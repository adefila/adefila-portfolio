"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "WORK", href: "#work" },
  { label: "BENEFITS", href: "#benefits" },
  { label: "TESTIMONIALS", href: "#testimonials" },
  { label: "ABOUT", href: "#about" },
  { label: "FAQ", href: "#faq" },
];

const SECTION_IDS = ["hero", "work", "benefits", "testimonials", "about", "faq"];

export default function Navbar() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY + window.innerHeight * 0.35;
      let current = "hero";
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && el.offsetTop <= scrollY) current = id;
      }
      setActive(current === "hero" ? "" : current);
    };

    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

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
          borderRadius: 100,
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

        {/* Nav links */}
        <div style={{ display: "flex", gap: 2 }}>
          {NAV_LINKS.map(({ label, href }) => {
            const id = href.slice(1);
            const isActive = active === id;
            return (
              <a
                key={href}
                href={href}
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 600,
                  fontSize: 11,
                  letterSpacing: "0.06em",
                  color: isActive ? "var(--fg)" : "var(--fg-secondary)",
                  textDecoration: "none",
                  padding: "7px 12px",
                  borderRadius: 100,
                  background: isActive ? "rgba(0,0,0,0.06)" : "transparent",
                  transition: "color 0.2s, background 0.2s",
                }}
              >
                {label}
              </a>
            );
          })}
        </div>

        <a
          href="#contact"
          className="nav-cta"
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
            transition: "opacity 0.2s",
          }}
        >
          SCHEDULE FREE CALL
          <CalendarDays size={14} strokeWidth={2} />
        </a>
      </div>
    </motion.nav>
  );
}
