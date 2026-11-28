"use client";
import { useEffect, useState } from "react";
import { CalendarDays } from "lucide-react";
import { useLang } from "@/context/LangContext";
import { BOOKING_URL } from "@/lib/booking";

// Phones only (hidden on wider screens in globals.css). Slides up once the hero's
// own "Book a free discovery call" button has scrolled away, and steps aside while the contact
// form or footer is on screen, since those have their own buttons.
export default function MobileCTA() {
  const { t, lang } = useLang();
  const [pastHero, setPastHero] = useState(false);
  const [nearEnd, setNearEnd] = useState(false);
  const show = pastHero && !nearEnd;

  useEffect(() => {
    const heroCta = document.querySelector(".hero-cta");
    const endZones = [document.getElementById("contact"), document.querySelector("footer")].filter(Boolean) as Element[];
    const visibleEnds = new Set<Element>();

    const heroObs = new IntersectionObserver(([e]) => {
      // Past the hero = its CTA is off screen *above* us, not still below
      setPastHero(!e.isIntersecting && e.boundingClientRect.top < 0);
    });
    if (heroCta) heroObs.observe(heroCta);

    const endObs = new IntersectionObserver((entries) => {
      entries.forEach((e) => (e.isIntersecting ? visibleEnds.add(e.target) : visibleEnds.delete(e.target)));
      setNearEnd(visibleEnds.size > 0);
    });
    endZones.forEach((el) => endObs.observe(el));

    return () => {
      heroObs.disconnect();
      endObs.disconnect();
    };
  }, []);

  // Lets the floating language switcher move up out of the bar's way
  useEffect(() => {
    if (show) document.documentElement.setAttribute("data-mobile-cta", "");
    else document.documentElement.removeAttribute("data-mobile-cta");
  }, [show]);

  return (
    <div className={show ? "mobile-cta is-visible" : "mobile-cta"} data-track-location="mobile_bar" aria-hidden={!show}>
      <span style={{ flex: 1, minWidth: 0, fontFamily: "var(--font-inter)", fontWeight: 500, fontSize: 13, lineHeight: 1.3, letterSpacing: "-0.2px", color: "var(--fg-secondary)" }}>Fixed scope.<br />Fixed price.</span>
      <a
        href={BOOKING_URL}
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={show ? 0 : -1}
        className="btn-primary"
        style={{
          display: "inline-flex", alignItems: "center", gap: 6, flexShrink: 0,
          fontFamily: "var(--font-inter)", fontWeight: 600, fontSize: 13,
                    padding: "12px 16px", textDecoration: "none", letterSpacing: "-0.2px",
        }}
      >
        {t("common.bookCall")} <CalendarDays size={14} strokeWidth={2} />
      </a>
    </div>
  );
}
