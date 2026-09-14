"use client";

const items = [
  "TOP RATED ON UPWORK",
  "50+ PROJECTS SHIPPED",
  "100% JOB SUCCESS",
  "FRAMER DEVELOPER",
  "5★ CLIENT RATING",
  "FIGMA TO FRAMER",
  "SHOPIFY · WEBFLOW",
  "WORKS GLOBALLY",
];

const Sep = () => (
  <span style={{ color: "var(--accent-purple)", margin: "0 20px", fontWeight: 700, fontSize: 10 }}>◆</span>
);

const track = [...items, ...items];

export default function SocialProof() {
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
