"use client";
import { CalendarDays } from "lucide-react";
import { useLang } from "@/context/LangContext";
import MagneticButton from "./MagneticButton";


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
            Seen enough?
          </p>
          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 400,
              fontSize: 15,
              letterSpacing: "-0.3px",
              lineHeight: 1.6,
              color: "rgba(255,255,255,0.82)",
              maxWidth: 400,
            }}
          >
            Most clients decide within the first scroll. One call gets you the scope, the timeline, and the exact price.
          </p>
        </div>
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
            flexShrink: 0,
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
      </div>
    </section>
  );
}
