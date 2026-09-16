"use client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { CalendarDays } from "lucide-react";
import { useEffect, useState, useMemo } from "react";
import MagneticButton from "./MagneticButton";
import { useLang } from "@/context/LangContext";

const NAV_HREFS = [
  { key: "nav.work",         href: "#work"         },
  { key: "nav.benefits",     href: "#benefits"     },
  { key: "nav.process",      href: "#process"      },
  { key: "nav.pricing",      href: "#pricing"      },
  { key: "nav.testimonials", href: "#testimonials" },
  { key: "nav.about",        href: "#about"        },
  { key: "nav.faq",          href: "#faq"          },
  { key: "nav.contact",      href: "#contact"      },
];

const SECTION_IDS = ["hero", "work", "benefits", "process", "pricing", "testimonials", "about", "faq", "contact"];

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

function HamburgerIcon({ open }: { open: boolean }) {
  return (
    <div
      style={{
        width: 32,
        height: 32,
        display: "flex",
        flexDirection: "column",
        alignItems: "flex-end",
        justifyContent: "center",
        gap: 5,
        cursor: "pointer",
        position: "relative",
      }}
    >
      <motion.span
        animate={open ? { rotate: 45, y: 10, width: "100%" } : { rotate: 0, y: 0, width: "100%" }}
        transition={{ duration: 0.35, ease: EASE }}
        style={{
          display: "block",
          height: 1.5,
          background: open ? "var(--white)" : "var(--fg)",
          borderRadius: 2,
          transformOrigin: "center",
          width: "100%",
        }}
      />
      <motion.span
        animate={open ? { opacity: 0, x: 8 } : { opacity: 1, x: 0 }}
        transition={{ duration: 0.2, ease: EASE }}
        style={{
          display: "block",
          height: 1.5,
          background: open ? "var(--white)" : "var(--fg)",
          borderRadius: 2,
          width: "68%",
        }}
      />
      <motion.span
        animate={open ? { rotate: -45, y: -10, width: "100%" } : { rotate: 0, y: 0, width: "84%" }}
        transition={{ duration: 0.35, ease: EASE }}
        style={{
          display: "block",
          height: 1.5,
          background: open ? "var(--white)" : "var(--fg)",
          borderRadius: 2,
          transformOrigin: "center",
          width: "84%",
        }}
      />
    </div>
  );
}

export default function Navbar() {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const { t } = useLang();
  const navLinks = useMemo(
    () => NAV_HREFS.map(({ key, href }) => ({ label: t(key), href })),
    [t],
  );

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 60);
      // getBoundingClientRect is accurate regardless of lazy-loaded layout shifts
      const trigger = window.innerHeight * 0.45;
      let current = "hero";
      for (const id of SECTION_IDS) {
        const el = document.getElementById(id);
        if (el && el.getBoundingClientRect().top <= trigger) current = id;
      }
      setActive(current === "hero" ? "" : current);
      // Sync URL hash to current section without pushing a history entry
      const hash = current === "hero" ? "" : `#${current}`;
      if (window.location.hash !== hash) {
        history.replaceState(null, "", hash || window.location.pathname);
      }
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <>
      <motion.nav
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        style={{
          position: "fixed",
          top: 16,
          left: 0,
          right: 0,
          zIndex: 200,
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
            background: menuOpen
              ? "var(--fg)"
              : scrolled
              ? "rgba(255,255,255,0.82)"
              : "var(--white)",
            backdropFilter: scrolled && !menuOpen ? "blur(20px)" : "none",
            WebkitBackdropFilter: scrolled && !menuOpen ? "blur(20px)" : "none",
            border: menuOpen ? "1px solid rgba(255,255,255,0.08)" : "1px solid rgba(0,0,0,0.07)",
            borderRadius: 0,
            padding: "12px 12px 12px 28px",
            pointerEvents: "auto",
            transition: "background 0.4s, border 0.3s",
          }}
        >
          <Link
            href="#hero"
            style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 700,
              fontSize: 15,
              letterSpacing: "1px",
              textTransform: "uppercase",
              color: menuOpen ? "var(--white)" : "var(--fg)",
              textDecoration: "none",
              transition: "color 0.3s",
            }}
          >
            Samuel
          </Link>

          {/* Desktop nav links */}
          <div className="nav-links" style={{ display: "flex", gap: 2 }}>
            {navLinks.map(({ label, href }) => {
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
                    borderRadius: 0,
                    background: isActive ? "rgba(0,0,0,0.06)" : "transparent",
                    transition: "color 0.2s, background 0.2s",
                  }}
                >
                  {label}
                </a>
              );
            })}
          </div>

          {/* Desktop CTA */}
          <MagneticButton
            href="https://calendly.com/adefilasamuel929/30min"
            target="_blank"
            rel="noopener noreferrer"
            className="nav-cta nav-cta-desktop"
            style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 600,
              fontSize: 13,
              color: "var(--white)",
              background: "var(--fg)",
              padding: "10px 20px",
              borderRadius: 0,
              textDecoration: "none",
              letterSpacing: "-0.2px",
              alignItems: "center",
              gap: 8,
            }}
          >
            {t("common.scheduleCall")}
            <CalendarDays size={14} strokeWidth={2} />
          </MagneticButton>

          {/* Mobile hamburger */}
          <button
            className="hamburger-btn"
            onClick={() => setMenuOpen((v) => !v)}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            style={{
              background: "none",
              border: "none",
              padding: "4px 8px",
              display: "none",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <HamburgerIcon open={menuOpen} />
          </button>
        </div>
      </motion.nav>

      {/* Full-screen mobile menu */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
            style={{
              position: "fixed",
              inset: 0,
              zIndex: 190,
              background: "var(--fg)",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "flex-start",
              padding: "100px 40px 60px",
            }}
          >
            {/* Nav links */}
            <nav style={{ width: "100%" }}>
              {navLinks.map(({ label, href }, i) => {
                const id = href.slice(1);
                const isActive = active === id;
                return (
                  <motion.div
                    key={href}
                    initial={{ opacity: 0, x: -24 }}
                    animate={{ opacity: 1, x: 0 }}
                    exit={{ opacity: 0, x: -16 }}
                    transition={{ duration: 0.35, delay: i * 0.055, ease: EASE }}
                    style={{ borderBottom: "1px solid rgba(255,255,255,0.07)" }}
                  >
                    <a
                      href={href}
                      onClick={close}
                      style={{
                        display: "block",
                        fontFamily: "var(--font-poppins)",
                        fontWeight: 700,
                        fontSize: "clamp(28px, 8vw, 52px)",
                        letterSpacing: "-1px",
                        textTransform: "uppercase",
                        color: isActive ? "rgba(255,255,255,1)" : "rgba(255,255,255,0.4)",
                        textDecoration: "none",
                        padding: "20px 0",
                        lineHeight: 1,
                        transition: "color 0.2s",
                      }}
                    >
                      {label}
                    </a>
                  </motion.div>
                );
              })}
            </nav>

            {/* CTA button at bottom */}
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: navLinks.length * 0.055 + 0.05, ease: EASE }}
              style={{ marginTop: 40 }}
            >
              <a
                href="https://calendly.com/adefilasamuel929/30min"
                target="_blank"
                rel="noopener noreferrer"
                onClick={close}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  gap: 10,
                  fontFamily: "var(--font-inter)",
                  fontWeight: 600,
                  fontSize: 14,
                  color: "var(--fg)",
                  background: "var(--white)",
                  padding: "14px 28px",
                  borderRadius: 0,
                  textDecoration: "none",
                  letterSpacing: "-0.2px",
                }}
              >
                {t("common.scheduleCall")}
                <CalendarDays size={15} strokeWidth={2} />
              </a>
            </motion.div>

            {/* Subtle bottom tag */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.4 }}
              style={{
                position: "absolute",
                bottom: 32,
                left: 40,
                fontFamily: "var(--font-inter)",
                fontSize: 11,
                letterSpacing: "0.08em",
                textTransform: "uppercase",
                color: "rgba(255,255,255,0.2)",
              }}
            >
              SAMUEL ADEFILA · FRAMER DEVELOPER
            </motion.p>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
