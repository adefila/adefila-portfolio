"use client";
import { CalendarDays } from "lucide-react";
import Image from "next/image";
import { useLang } from "@/context/LangContext";
import { SPOTS_OPEN, useNextStartMonth } from "@/lib/availability";
import MagneticButton from "./MagneticButton";
import { BOOKING_URL } from "@/lib/booking";

const EMAIL = "samuel@adefilasamuel.com";

export default function MidCTA() {
  const { t, lang } = useLang();
  const nextStart = useNextStartMonth(lang);
  return (
    <section
      data-track-location="mid_cta"
      className="corners-in grid-texture grid-texture-dark"
      style={{
        width: "100%",
        background: "var(--accent-purple)",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Blueprint linework — mirrored against the footer: small figure top-right, large one bottom-left */}
      <svg aria-hidden="true" className="footer-blueprint" width="220" height="200" viewBox="0 0 220 200" fill="none" style={{ right: -30, top: -30, opacity: 0.25 }}>
        <rect x="52" y="52" width="120" height="88" stroke="#fff" strokeWidth="1" strokeDasharray="6 6" />
        <path d="M180 32h20M190 22v20" stroke="#fff" strokeWidth="1" />
        <path d="M20 150h20M30 140v20" stroke="#fff" strokeWidth="1" />
        <line x1="52" y1="168" x2="172" y2="168" stroke="#fff" strokeWidth="1" />
        <line x1="52" y1="162" x2="52" y2="174" stroke="#fff" strokeWidth="1" />
        <line x1="172" y1="162" x2="172" y2="174" stroke="#fff" strokeWidth="1" />
        <text x="128" y="42" fill="#fff" fontSize="11" fontFamily="monospace" letterSpacing="2" textAnchor="end">FIG. 03</text>
      </svg>
      <svg aria-hidden="true" className="footer-blueprint footer-blueprint-lg" width="560" height="360" viewBox="0 0 560 360" fill="none" style={{ left: -60, bottom: -40, opacity: 0.3 }}>
        <rect x="70" y="34" width="420" height="252" stroke="#fff" strokeWidth="1" strokeDasharray="7 7" />
        <circle cx="280" cy="160" r="92" stroke="#fff" strokeWidth="1" strokeDasharray="4 6" />
        <line x1="280" y1="34" x2="280" y2="286" stroke="#fff" strokeWidth="1" opacity="0.5" />
        <line x1="70" y1="160" x2="490" y2="160" stroke="#fff" strokeWidth="1" opacity="0.5" />
        <line x1="40" y1="34" x2="104" y2="34" stroke="#fff" strokeWidth="1.5" />
        <line x1="70" y1="4" x2="70" y2="68" stroke="#fff" strokeWidth="1.5" />
        <line x1="456" y1="252" x2="520" y2="252" stroke="#fff" strokeWidth="1.5" />
        <line x1="490" y1="218" x2="490" y2="282" stroke="#fff" strokeWidth="1.5" />
        <path d="M516 60h18M525 51v18" stroke="#fff" strokeWidth="1" />
        <path d="M24 300h18M33 291v18" stroke="#fff" strokeWidth="1" />
        <line x1="70" y1="318" x2="490" y2="318" stroke="#fff" strokeWidth="1" />
        <line x1="70" y1="311" x2="70" y2="325" stroke="#fff" strokeWidth="1" />
        <line x1="490" y1="311" x2="490" y2="325" stroke="#fff" strokeWidth="1" />
        <text x="70" y="24" fill="#fff" fontSize="11" fontFamily="monospace" letterSpacing="2">FIG. 04 — SCOPE</text>
        <text x="380" y="150" fill="#fff" fontSize="10" fontFamily="monospace" letterSpacing="1">R 92</text>
        <text x="236" y="332" fill="#fff" fontSize="10" fontFamily="monospace" letterSpacing="1">PANEL — 420</text>
      </svg>
      <div
        className="midcta-inner"
        data-reveal style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "72px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 32,
          position: "relative",
          zIndex: 1,
        }}
      >
        <div style={{ flex: "1 1 340px" }}>
          {/* Who you'd be talking to, and whether there's room */}
          <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 20 }}>
            <span style={{ position: "relative", flexShrink: 0 }}>
              <Image
                src="/samuel-portrait.webp"
                alt="Samuel Adefila"
                width={52}
                height={52}
                style={{ width: 52, height: 52, borderRadius: "50%", objectFit: "cover", objectPosition: "50% 25%", border: "2px solid rgba(255,255,255,0.9)", display: "block" }}
              />
              <span
                aria-hidden="true"
                style={{ position: "absolute", right: 1, bottom: 1, width: 12, height: 12, borderRadius: "50%", background: "var(--accent-green)", border: "2px solid var(--accent-purple)" }}
              />
            </span>
            <p style={{ fontFamily: "var(--font-inter)", fontWeight: 600, fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "rgba(255,255,255,0.9)", lineHeight: 1.6 }}>
              {t("hero.badge").replace("{count}", String(SPOTS_OPEN))} <span aria-hidden="true">·</span> {t("hero.badge2").replace("{date}", nextStart)}
            </p>
          </div>
          <p
            style={{
              fontFamily: "var(--font-poppins)",
              fontWeight: 700,
              fontSize: "clamp(22px, 2.8vw, 36px)",
              letterSpacing: "-0.6px",
              lineHeight: 1.1,
              textTransform: "uppercase",
              color: "#fff",
              marginBottom: 10,
            }}
          >
            {t("midcta.headline")}
          </p>
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 400,
              fontSize: 15,
              letterSpacing: "-0.3px",
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.82)",
              maxWidth: 420,
            }}
          >
            {t("midcta.desc")}
          </p>
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-start", gap: 14, flexShrink: 0 }}>
          <MagneticButton
            href={BOOKING_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-white"
            style={{
              alignItems: "center",
              gap: 8,
              fontFamily: "var(--font-inter)",
              fontWeight: 600,
              lineHeight: "20px",
              fontSize: 13,
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              padding: "14px 26px",
              textDecoration: "none",
            }}
          >
            {t("common.bookCall")} <CalendarDays size={14} strokeWidth={2} />
          </MagneticButton>
          <a
            href={`mailto:${EMAIL}`}
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: 13,
              color: "rgba(255,255,255,0.85)",
              textDecoration: "underline",
              textUnderlineOffset: 3,
            }}
          >
            {t("midcta.email")}
          </a>
        </div>
      </div>
    </section>
  );
}
