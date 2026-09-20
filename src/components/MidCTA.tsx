"use client";
import { CalendarDays } from "lucide-react";
import { useLang } from "@/context/LangContext";
import MagneticButton from "./MagneticButton";

const E = "cubic-bezier(0.22,1,0.36,1)";

export default function MidCTA() {
  const { t } = useLang();
  return (
    <section
      style={{
        width: "100%",
        borderTop: "1px solid rgba(0,0,0,0.08)",
        borderBottom: "1px solid rgba(0,0,0,0.08)",
      }}
    >
      <div
        className="midcta-inner"
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          padding: "56px 20px",
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          flexWrap: "wrap",
          gap: 32,
          animation: `fadeUp 0.5s 0.08s ${E} both`,
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
              color: "var(--fg)",
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
              color: "var(--fg-secondary)",
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
            color: "var(--fg)",
            background: "transparent",
            border: "1px solid rgba(0,0,0,0.22)",
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
            e.currentTarget.style.background = "transparent";
            e.currentTarget.style.borderColor = "rgba(0,0,0,0.22)";
            e.currentTarget.style.color = "var(--fg)";
          }}
        >
          {t("common.bookCall")} <CalendarDays size={14} strokeWidth={2} />
        </MagneticButton>
      </div>
    </section>
  );
}
