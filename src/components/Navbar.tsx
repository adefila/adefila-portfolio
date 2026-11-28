"use client";
import { motion, AnimatePresence } from "framer-motion";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useRef, useState, useMemo } from "react";
import MagneticButton from "./MagneticButton";
import { useLang } from "@/context/LangContext";
import { trackEvent } from "@/lib/gtag";

const NAV_HREFS = [
  { key: "nav.work",         href: "#work"         },
  { key: "nav.experience",   href: "#experience"   },
  { key: "nav.benefits",     href: "#benefits"     },
  { key: "nav.process",      href: "#process"      },
  { key: "nav.pricing",      href: "#pricing"      },
  { key: "nav.testimonials", href: "#testimonials" },
  { key: "nav.faq",          href: "#faq"          },
];

const SECTION_PAGES = ["/", "/business"];

const SECTION_IDS = ["hero", "work", "experience", "benefits", "process", "pricing", "testimonials", "faq", "contact"];

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

const MENU_CSS = `
  .mm { position: fixed; inset: 0; z-index: 190; display: flex; flex-direction: column; background: var(--bg); padding: 84px 24px 40px; overflow-y: auto; }
  .mm-art { position: absolute; left: 0; right: 0; bottom: 0; height: 38%; pointer-events: none; opacity: 0.85; background: #1a1434 url("/hero/mosaic.webp") center 40% / cover no-repeat;
    -webkit-mask-image: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.4) 35%, #000 80%); mask-image: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.4) 35%, #000 80%); }
  .mm-nav, .mm-cta { position: relative; z-index: 1; }
  .mm-row { border-bottom: 0.5px solid var(--line); }
  .mm-row:first-child { border-top: 0.5px solid var(--line); }
  .mm-link { position: relative; display: flex; align-items: center; gap: 12px; padding: 17px 0; font-family: var(--font-poppins); font-weight: 400; font-size: clamp(26px, 7.4vw, 36px); line-height: 1.05; letter-spacing: -0.03em; color: var(--fg-muted); text-decoration: none; transition: color 0.25s ease; }
  .mm-link.is-on, .mm-link:hover { color: var(--fg); }
  .mm-dot { width: 6px; height: 6px; flex: none; background: var(--accent-purple); opacity: 0; transform: scale(0.4); transition: opacity 0.25s ease, transform 0.25s ease; }
  .mm-link.is-on .mm-dot { opacity: 1; transform: scale(1); }
  .mm-cta { margin-top: 28px; }
  .mm-btn { display: flex; align-items: center; justify-content: center; width: 100%; padding: 15px 24px; font-family: var(--font-inter); font-weight: 600; font-size: 13px; letter-spacing: 0.06em; text-transform: uppercase; text-decoration: none; border-radius: 0; }
`;

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
          background: "var(--fg)",
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
          background: "var(--fg)",
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
          background: "var(--fg)",
          borderRadius: 2,
          transformOrigin: "center",
          width: "84%",
        }}
      />
    </div>
  );
}

// `hide`: section links to leave out on pages that do not have that section (e.g. ["#about"]).
export default function Navbar({ hide = [], contactHref, brandHref }: { hide?: string[]; contactHref?: string; brandHref?: string }) {
  const [active, setActive] = useState("");
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const [marker, setMarker] = useState<{ left: number; width: number } | null>(null);
  const linksRef = useRef<HTMLDivElement>(null);
  const { t } = useLang();
  // Pages built from the homepage sections scroll in place; elsewhere (case studies, 404)
  // the section links lead back to home.
  const onHome = SECTION_PAGES.includes(usePathname());
  const base = onHome ? "" : "/";
  const hidden = hide.join(","); // a string, so the list below only recomputes when its contents change
  const navLinks = useMemo(
    () => NAV_HREFS.filter(({ href }) => !hidden.split(",").includes(href)).map(({ key, href }) => ({ label: t(key), href: `${base}${href}` })),
    [t, base, hidden],
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
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    onScroll();
    return () => {
      window.removeEventListener("scroll", onScroll);
    };
  }, []);

  // The purple marker under the link of the section being read slides to it.
  useEffect(() => {
    const place = () => {
      const el = linksRef.current?.querySelector<HTMLElement>('[data-current="true"]');
      setMarker(el ? { left: el.offsetLeft + 12, width: el.offsetWidth - 24 } : null);
    };
    place();
    window.addEventListener("resize", place);
    return () => window.removeEventListener("resize", place);
  }, [active, navLinks]);

  // Lock body scroll when menu is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    document.body.toggleAttribute("data-menu-open", menuOpen);
    return () => { document.body.style.overflow = ""; document.body.removeAttribute("data-menu-open"); };
  }, [menuOpen]);

  const close = () => setMenuOpen(false);

  return (
    <>
      <motion.nav
        className="site-nav"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, ease: EASE }}
        style={{
          position: "fixed",
          top: 0,
          left: 0,
          right: 0,
          zIndex: 200,
          display: "flex",
          justifyContent: "center",
          pointerEvents: "none",
        }}
      >
        <div
          className="site-nav-bar"
          style={{
            width: "100%",
            maxWidth: 1320,
            minHeight: 60,
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 16,
            background: "var(--bg)",
            backdropFilter: scrolled && !menuOpen ? "blur(20px)" : "none",
            WebkitBackdropFilter: scrolled && !menuOpen ? "blur(20px)" : "none",
            borderBottom: "0.5px solid var(--line)",
            borderLeft: "0.5px solid var(--line)",
            borderRight: "0.5px solid var(--line)",
            borderRadius: 0,
            padding: "8px 8px 8px 28px",
            pointerEvents: "auto",
            transition: "background 0.4s, border 0.3s",
          }}
        >
          <Link
            href={brandHref ?? (onHome ? "#hero" : "/")}
            style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 600,
              fontSize: 13,
              letterSpacing: "0.08em",
              color: "var(--fg)",
              textDecoration: "none",
              transition: "color 0.3s",
            }}
          >
            SAMUEL ADEFILA.
          </Link>

          {/* Desktop nav links */}
          <div className="nav-links" ref={linksRef} style={{ display: "flex", gap: 2, position: "relative" }}>
            {navLinks.map(({ label, href }, n) => {
              const id = href.split("#")[1];
              const isActive = active === id;
              return (
                <a
                  key={href}
                  href={href}
                  className={`nav-link-anim${isActive ? " on" : ""}`}
                  data-current={isActive ? "true" : undefined}
                  aria-current={isActive ? "true" : undefined}
                  style={{
                    fontFamily: "var(--font-inter)",
                    fontWeight: 600,
                    fontSize: 11,
                    letterSpacing: "0.06em",
                    color: isActive ? "var(--fg)" : "var(--fg-secondary)",
                    textDecoration: "none",
                    padding: "7px 12px",
                    borderRadius: 0,
                    background: "transparent",
                    transition: "color 0.2s",
                    display: "inline-flex",
                    alignItems: "center",
                  }}
                >
                  <span className="nav-link-clip">
                    <span className="nav-link-inner" data-text={label}>
                      {label}
                    </span>
                  </span>
                </a>
              );
            })}
            <span className="nav-marker" aria-hidden="true" style={marker ? { left: marker.left, width: marker.width, opacity: 1 } : { opacity: 0 }} />
          </div>


          {/* Desktop CTA */}
          <MagneticButton
            href={contactHref ?? `${base}#contact`}
            onClick={() => trackEvent("cta_click", { location: "navbar" })}
            className="nav-cta nav-cta-desktop btn-primary"
            style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 600,
              fontSize: 13,
              padding: "10px 20px",
              borderRadius: 0,
              textDecoration: "none",
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              alignItems: "center",
              gap: 8,
            }}
          >
            {t("nav.contact")}
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

      {/* Full-screen mobile menu: the site's own look (white, hairlines, one purple button) with the mosaic rising from the bottom */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="mm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25, ease: EASE }}
          >
            <style>{MENU_CSS}</style>
            <div className="mm-art" aria-hidden="true" />
            <nav className="mm-nav">
              {navLinks.map(({ label, href }, i) => {
                const id = href.split("#")[1];
                const isActive = active === id;
                return (
                  <motion.div
                    key={href}
                    className="mm-row"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 0.4, delay: 0.05 + i * 0.05, ease: EASE }}
                  >
                    <a href={href} onClick={close} className={isActive ? "mm-link is-on" : "mm-link"}>
                      <span className="mm-dot" aria-hidden="true" />
                      <span className="mm-t">{label}</span>
                    </a>
                  </motion.div>
                );
              })}
            </nav>

            <motion.div
              className="mm-cta"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.4, delay: 0.1 + navLinks.length * 0.05, ease: EASE }}
            >
              <a href={contactHref ?? `${base}#contact`} onClick={close} className="btn-primary mm-btn">
                {t("nav.contact")}
              </a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
