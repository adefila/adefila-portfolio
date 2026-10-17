"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/context/LangContext";
import { trackEvent } from "@/lib/gtag";
import RevealWords, { revealDelayAfter } from "./RevealWords";
import FormSuccess from "./FormSuccess";

// "Not ready to call?" offer: a free ~5-minute Loom review of the visitor's site.
// Laid out like the Contact section and posts to /api/contact like the main form,
// so it lands in Samuel's inbox and in Lead Finder with the same spam checks
// (honeypot + minimum fill time) and shows the same success screen.
type Status = "idle" | "sending" | "success" | "error";
const EMPTY = { name: "", email: "", url: "" };

const labelStyle: React.CSSProperties = {
  fontFamily: "var(--font-inter)", fontSize: 10, letterSpacing: "2px",
  textTransform: "uppercase", color: "var(--fg-muted)", display: "block", marginBottom: 8,
};
const inputStyle: React.CSSProperties = {
  width: "100%", padding: "14px 16px", fontFamily: "var(--font-inter)", fontSize: 16,
  letterSpacing: "-0.2px", color: "var(--fg)", background: "var(--bg)",
  border: "1px solid rgba(var(--ink), 0.12)", outline: "none", borderRadius: 0,
  appearance: "none", WebkitAppearance: "none", transition: "border-color 0.18s",
};
const focus = (e: React.FocusEvent<HTMLInputElement>) => (e.target.style.borderColor = "var(--accent-purple)");
const blur = (e: React.FocusEvent<HTMLInputElement>) => (e.target.style.borderColor = "rgba(var(--ink), 0.12)");

export default function Teardown() {
  const { t } = useLang();
  const [form, setForm] = useState(EMPTY);
  const [honey, setHoney] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [countdown, setCountdown] = useState(5);
  const loadedAt = useRef(0);
  useEffect(() => { loadedAt.current = Date.now(); }, []);

  // Same as the contact form: show the success screen, count down, then reset
  useEffect(() => {
    if (status !== "success") return;
    const interval = setInterval(() => setCountdown((c) => c - 1), 1000);
    const reset = setTimeout(() => { setStatus("idle"); setForm(EMPTY); }, 5000);
    return () => { clearInterval(interval); clearTimeout(reset); };
  }, [status]);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          service: "Free website teardown",
          message: `Please send a video teardown of: ${form.url}`,
          _t: loadedAt.current,
          _h: honey,
        }),
      });
      if (!res.ok) throw new Error(String(res.status));
      setCountdown(5);
      setStatus("success");
      trackEvent("generate_lead", { service: "teardown" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="teardown" data-track-location="teardown" className="teardown-section">
      <div className="teardown-grid">
        {/* Left: same header pattern as every other section */}
        <div>
          <p data-reveal style={{
            fontFamily: "var(--font-inter)", fontWeight: 700, fontSize: 11,
            letterSpacing: "4px", textTransform: "uppercase",
            color: "var(--accent-purple)", marginBottom: 16,
          }}>
            {t("teardown.label")}
          </p>
          <h2 style={{
            fontFamily: "var(--font-poppins)", fontWeight: 700,
            fontSize: "clamp(28px, 3.5vw, 48px)", letterSpacing: "-1px",
            lineHeight: 1.05, textTransform: "uppercase", color: "var(--fg)", marginBottom: 16,
          }}>
            <RevealWords text={t("teardown.h1")} />{" "}
            <span style={{ color: "rgb(163,163,163)" }}><RevealWords text={t("teardown.h1b")} delay={revealDelayAfter(t("teardown.h1"))} /></span>
          </h2>
          <p data-reveal style={{
            fontFamily: "var(--font-inter)", fontWeight: 400, fontSize: 15,
            letterSpacing: "-0.3px", lineHeight: 1.7, color: "var(--fg-secondary)", maxWidth: 440,
          }}>
            {t("teardown.desc")}
          </p>
        </div>

        {/* Right: form, styled exactly like the contact form */}
        <div data-reveal>
          {status === "success" ? (
            <FormSuccess title={t("teardown.successTitle")} desc={t("teardown.successDesc")} resetLabel={`Form resets in ${countdown}s`} />
          ) : (
            <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
              {/* Honeypot: hidden from people, filled by bots */}
              <input
                type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true"
                value={honey} onChange={(e) => setHoney(e.target.value)}
                style={{ position: "absolute", left: -9999, width: 1, height: 1, opacity: 0 }}
              />
              <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                <div>
                  <label htmlFor="teardown-name" style={labelStyle}>{t("contact.label.name")} *</label>
                  <input id="teardown-name" required autoComplete="name" placeholder={t("contact.ph.name")} value={form.name} onChange={set("name")} style={inputStyle} onFocus={focus} onBlur={blur} />
                </div>
                <div>
                  <label htmlFor="teardown-email" style={labelStyle}>{t("contact.label.email")} *</label>
                  <input id="teardown-email" required type="email" autoComplete="email" placeholder="your@email.com" value={form.email} onChange={set("email")} style={inputStyle} onFocus={focus} onBlur={blur} />
                </div>
              </div>
              <div>
                <label htmlFor="teardown-url" style={labelStyle}>{t("teardown.urlLabel")} *</label>
                <input id="teardown-url" required inputMode="url" autoComplete="url" placeholder={t("teardown.url")} value={form.url} onChange={set("url")} style={inputStyle} onFocus={focus} onBlur={blur} />
              </div>
              {status === "error" && (
                <p role="alert" style={{ fontFamily: "var(--font-inter)", fontSize: 13, color: "#e53e3e" }}>{t("teardown.error")}</p>
              )}
              <button
                type="submit"
                disabled={status === "sending"}
                style={{
                  display: "inline-flex", alignItems: "center", justifyContent: "center", gap: 8,
                  padding: "14px 26px", background: "var(--fg)", color: "var(--on-fg)",
                  fontFamily: "var(--font-inter)", fontWeight: 600, lineHeight: "20px", fontSize: 13,
                  letterSpacing: "0.5px", textTransform: "uppercase", border: "none", borderRadius: 0,
                  cursor: status === "sending" ? "not-allowed" : "pointer",
                  opacity: status === "sending" ? 0.6 : 1, transition: "opacity 0.2s", alignSelf: "flex-start",
                }}
              >
                {status === "sending" ? t("teardown.sending") : t("teardown.cta")}
                {status !== "sending" && <ArrowRight size={14} strokeWidth={2} />}
              </button>
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
