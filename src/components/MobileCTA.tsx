"use client";
import { useEffect, useState } from "react";
import Image from "next/image";
import { CalendarDays } from "lucide-react";
import { useLang } from "@/context/LangContext";
import { SPOTS_OPEN, useNextStartMonth } from "@/lib/availability";

// Phones only (hidden on wider screens in globals.css). Slides up once the hero's
// own "Book a call" button has scrolled away, and steps aside while the contact
// form or footer is on screen, since those have their own buttons.
export default function MobileCTA() {
  const { t, lang } = useLang();
  const nextStart = useNextStartMonth(lang);
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
      <Image
        src="/samuel-portrait.webp"
        alt=""
        width={40}
        height={40}
        style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover", objectPosition: "50% 25%", flexShrink: 0 }}
      />
      <div style={{ flex: 1, minWidth: 0 }}>
        <p style={{ fontFamily: "var(--font-inter)", fontWeight: 700, fontSize: 12, color: "var(--fg)", lineHeight: 1.3, display: "flex", alignItems: "center", gap: 6 }}>
          <span style={{ width: 7, height: 7, borderRadius: "50%", background: "var(--accent-green)", flexShrink: 0 }} />
          {t("hero.badge").replace("{count}", String(SPOTS_OPEN))}
        </p>
        <p style={{ fontFamily: "var(--font-inter)", fontSize: 11, color: "var(--fg-secondary)", lineHeight: 1.3, whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
          {t("hero.badge2").replace("{date}", nextStart)}
        </p>
      </div>
      <a
        href="https://calendly.com/adefilasamuel929/30min"
        target="_blank"
        rel="noopener noreferrer"
        tabIndex={show ? 0 : -1}
        style={{
          display: "inline-flex", alignItems: "center", gap: 6, flexShrink: 0,
          fontFamily: "var(--font-inter)", fontWeight: 600, fontSize: 13,
          color: "var(--white)", background: "var(--fg)",
          padding: "12px 16px", textDecoration: "none", letterSpacing: "-0.2px",
        }}
      >
        {t("common.bookCall")} <CalendarDays size={14} strokeWidth={2} />
      </a>
    </div>
  );
}
