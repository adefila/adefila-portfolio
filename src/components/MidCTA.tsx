"use client";
import { CalendarDays } from "lucide-react";
import Image from "next/image";
import { useLang } from "@/context/LangContext";
import MagneticButton from "./MagneticButton";

const EMAIL = "samuel@adefilasamuel.com";

export default function MidCTA() {
  const { t } = useLang();
  return (
    <section
      style={{
        width: "100%",
        background: "var(--accent-purple)",
      }}
    >
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
              {t("hero.badge")} <span aria-hidden="true">·</span> {t("hero.badge2")}
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
            href="https://calendly.com/adefilasamuel929/30min"
            target="_blank"
            rel="noopener noreferrer"
            style={{
              alignItems: "center",
              gap: 8,
              fontFamily: "var(--font-inter)",
              fontWeight: 600,
              fontSize: 13,
              letterSpacing: "0.5px",
              textTransform: "uppercase",
              color: "var(--accent-purple)",
              background: "#fff",
              border: "1px solid #fff",
              padding: "13px 26px",
              textDecoration: "none",
              transition: "background 0.2s ease, border-color 0.2s ease, color 0.2s ease",
            }}
            onMouseEnter={(e: React.MouseEvent<HTMLAnchorElement>) => {
              e.currentTarget.style.background = "var(--fg)";
              e.currentTarget.style.borderColor = "var(--fg)";
              e.currentTarget.style.color = "#fff";
            }}
            onMouseLeave={(e: React.MouseEvent<HTMLAnchorElement>) => {
              e.currentTarget.style.background = "#fff";
              e.currentTarget.style.borderColor = "#fff";
              e.currentTarget.style.color = "var(--accent-purple)";
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
