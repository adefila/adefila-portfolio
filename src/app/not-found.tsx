import type { Metadata } from "next";
import Link from "next/link";
import { ArrowLeft, ArrowUpRight } from "lucide-react";

export const metadata: Metadata = {
  title: "Page not found | Samuel Adefila",
  robots: { index: false },
};

const EASE = "cubic-bezier(0.22, 1, 0.36, 1)";

const button = {
  fontFamily: "var(--font-inter)",
  fontWeight: 600,
  fontSize: 14,
  letterSpacing: "-0.2px",
  padding: "14px 24px",
  borderRadius: 0,
  textDecoration: "none",
  display: "inline-flex",
  alignItems: "center",
  gap: 8,
} as const;

export default function NotFound() {
  return (
    <main style={{ background: "var(--bg)", minHeight: "100vh", width: "100%", display: "flex", flexDirection: "column" }}>
      <header style={{ maxWidth: 1200, width: "100%", margin: "0 auto", padding: "28px 20px 0" }}>
        <Link
          href="/"
          style={{
            fontFamily: "var(--font-inter)",
            fontWeight: 700,
            fontSize: 15,
            letterSpacing: "1px",
            textTransform: "uppercase",
            color: "var(--fg)",
            textDecoration: "none",
          }}
        >
          Samuel
        </Link>
      </header>

      <section style={{ flex: 1, display: "flex", alignItems: "center", width: "100%" }}>
        <div style={{ maxWidth: 1200, width: "100%", margin: "0 auto", padding: "64px 20px 96px" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 8, marginBottom: 28, animation: `heroFadeUp 0.6s 0.05s ${EASE} both` }}>
            <span style={{ position: "relative", width: 8, height: 8, display: "inline-flex" }}>
              <span style={{ position: "absolute", inset: 0, borderRadius: "50%", background: "var(--accent-green)", animation: "pulseRipple 2s ease-out infinite" }} />
              <span style={{ width: 8, height: 8, borderRadius: "50%", background: "var(--accent-green)", position: "relative" }} />
            </span>
            <span style={{ fontFamily: "var(--font-inter)", fontWeight: 600, fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "#006b2e" }}>
              Error 404
            </span>
          </div>

          <h1 style={{ margin: "0 0 24px" }}>
            {["This page", "took a wrong turn."].map((line, i) => (
              <span
                key={line}
                style={{
                  display: "block",
                  fontFamily: "var(--font-poppins)",
                  fontWeight: 700,
                  fontSize: "clamp(36px, 6vw, 84px)",
                  letterSpacing: "-0.04em",
                  lineHeight: 1.04,
                  textTransform: "uppercase",
                  color: i === 0 ? "var(--fg)" : "var(--fg-muted)",
                  animation: `heroFadeUp 0.55s ${0.12 + i * 0.12}s ${EASE} both`,
                }}
              >
                {line}
              </span>
            ))}
          </h1>

          <p
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: 16,
              lineHeight: 1.65,
              letterSpacing: "-0.3px",
              color: "var(--fg-secondary)",
              maxWidth: 520,
              margin: "0 0 36px",
              animation: `heroFadeUp 0.6s 0.36s ${EASE} both`,
            }}
          >
            The link may be old, or the page has moved. Everything I build is on the home page, and I am one
            click away if you have a project in mind.
          </p>

          <div style={{ display: "flex", gap: 12, flexWrap: "wrap", animation: `heroFadeUp 0.6s 0.48s ${EASE} both` }}>
            <Link href="/" style={{ ...button, background: "var(--fg)", color: "var(--white)" }}>
              <ArrowLeft size={15} strokeWidth={2} /> Back to home
            </Link>
            <Link href="/#work" style={{ ...button, background: "transparent", color: "var(--fg)", border: "1px solid rgba(0,0,0,0.15)" }}>
              See my work <ArrowUpRight size={15} strokeWidth={2} />
            </Link>
          </div>
        </div>
      </section>

      <footer style={{ maxWidth: 1200, width: "100%", margin: "0 auto", padding: "0 20px 28px", fontFamily: "var(--font-inter)", fontSize: 12, color: "var(--fg-muted)" }}>
        <a href="mailto:samuel@adefilasamuel.com" style={{ color: "inherit", textDecoration: "none" }}>samuel@adefilasamuel.com</a>
      </footer>
    </main>
  );
}
