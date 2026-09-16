"use client";
import { useLang } from "@/context/LangContext";

const ITEM_KEYS = [
  "social.item0", "social.item1", "social.item2", "social.item3",
  "social.item4", "social.item5", "social.item6", "social.item7",
];

const Sep = () => (
  <span style={{ color: "var(--accent-purple)", margin: "0 20px", fontWeight: 700, fontSize: 10 }}>◆</span>
);

export default function SocialProof() {
  const { t } = useLang();
  const items = ITEM_KEYS.map((k) => t(k));
  const track = [...items, ...items];
  return (
    <div
      style={{
        width: "100%",
        borderTop: "1px solid rgba(0,0,0,0.07)",
        borderBottom: "1px solid rgba(0,0,0,0.07)",
        overflow: "hidden",
        padding: "14px 0",
        background: "var(--bg)",
      }}
    >
      <div
        className="ticker-track"
        style={{
          display: "flex",
          alignItems: "center",
          whiteSpace: "nowrap",
          width: "max-content",
        }}
      >
        {track.map((item, i) => (
          <span key={i} style={{ display: "inline-flex", alignItems: "center" }}>
            <span
              style={{
                fontFamily: "var(--font-inter)",
                fontWeight: 700,
                fontSize: 11,
                letterSpacing: "0.1em",
                color: "var(--fg)",
              }}
            >
              {item}
            </span>
            <Sep />
          </span>
        ))}
      </div>
    </div>
  );
}
