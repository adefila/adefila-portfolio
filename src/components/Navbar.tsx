"use client";
import { motion } from "framer-motion";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { useEffect, useState } from "react";

const NAV_LINKS = [
  { label: "Work", href: "#work" },
  { label: "About", href: "#about" },
  { label: "FAQ", href: "#faq" },
];

export default function Navbar() {
  const [active, setActive] = useState("");

  useEffect(() => {
    const ids = ["work", "about", "testimonials", "faq"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => { if (e.isIntersecting) setActive(e.target.id); });
      },
      { rootMargin: "-40% 0px -55% 0px" }
    );
    ids.forEach((id) => { const el = document.getElementById(id); if (el) observer.observe(el); });
    return () => observer.disconnect();
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
            const isActive = active === id || (id === "work" && active === "testimonials");
            return (
              <a
                key={href}
                href={href}
                style={{
                  fontFamily: "var(--font-inter)",
                  fontWeight: 500,
                  fontSize: 13,
                  color: isActive ? "var(--fg)" : "var(--fg-secondary)",
                  textDecoration: "none",
                  padding: "7px 14px",
                  borderRadius: 100,
                  background: isActive ? "rgba(0,0,0,0.06)" : "transparent",
                  transition: "color 0.2s, background 0.2s",
                  letterSpacing: "-0.2px",
                }}
              >
                {label}
              </a>
            );
          })}
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
            display: "flex",
            alignItems: "center",
            gap: 8,
            transition: "opacity 0.2s",
          }}
          className="nav-cta"
        >
          SCHEDULE FREE CALL
          <CalendarDays size={14} strokeWidth={2} />
        </a>
      </div>
    </motion.nav>
  );
}
