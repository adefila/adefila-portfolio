"use client";
import { useEffect, useRef, useState } from "react";
import { ArrowRight, Check, Video } from "lucide-react";
import { useLang } from "@/context/LangContext";
import { trackEvent } from "@/lib/gtag";

// "Not ready to book?" offer: a free ~5-minute Loom review of the visitor's site.
// Goes through /api/contact like the main form, so it lands in Samuel's inbox and
// in Lead Finder, with the same spam checks (honeypot + minimum fill time).
type Status = "idle" | "sending" | "done" | "error";

export default function Teardown() {
  const { t } = useLang();
  const [form, setForm] = useState({ name: "", email: "", url: "" });
  const [honey, setHoney] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const loadedAt = useRef(0);
  useEffect(() => { loadedAt.current = Date.now(); }, []);

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
      setStatus("done");
      trackEvent("generate_lead", { service: "teardown" });
    } catch {
      setStatus("error");
    }
  };

  return (
    <section id="teardown" data-track-location="teardown" style={{ width: "100%", maxWidth: 1200, margin: "0 auto", padding: "0 20px 80px" }}>
      <div data-reveal className="teardown-box grid-texture grid-texture-dark">
        <div style={{ flex: "1 1 380px" }}>
          <p style={{ display: "flex", alignItems: "center", gap: 8, fontFamily: "var(--font-inter)", fontWeight: 700, fontSize: 11, letterSpacing: "3px", textTransform: "uppercase", color: "rgba(255,255,255,0.7)", marginBottom: 14 }}>
            <Video size={14} strokeWidth={2} /> {t("teardown.eyebrow")}
          </p>
          <h3 style={{ fontFamily: "var(--font-poppins)", fontWeight: 700, fontSize: "clamp(22px, 2.4vw, 32px)", letterSpacing: "-0.6px", lineHeight: 1.1, textTransform: "uppercase", color: "#fff", marginBottom: 14, textWrap: "balance" as const }}>
            {t("teardown.title")}
          </h3>
          <p style={{ fontFamily: "var(--font-inter)", fontSize: 15, lineHeight: 1.65, color: "rgba(255,255,255,0.72)", maxWidth: 460 }}>
            {t("teardown.desc")}
          </p>
        </div>

        <div style={{ flex: "1 1 340px" }}>
          {status === "done" ? (
            <p role="status" style={{ display: "flex", gap: 12, alignItems: "flex-start", fontFamily: "var(--font-inter)", fontSize: 15, lineHeight: 1.6, color: "#fff", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.14)", padding: 20 }}>
              <span style={{ width: 24, height: 24, borderRadius: "50%", background: "var(--accent-green)", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Check size={14} color="#fff" strokeWidth={3} />
              </span>
              {t("teardown.success")}
            </p>
          ) : (
            <form onSubmit={submit} style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {/* Honeypot: hidden from people, filled by bots */}
              <input
                type="text" name="company" tabIndex={-1} autoComplete="off" aria-hidden="true"
                value={honey} onChange={(e) => setHoney(e.target.value)}
                style={{ position: "absolute", left: -9999, width: 1, height: 1, opacity: 0 }}
              />
              <input className="teardown-input" required name="name" autoComplete="name" placeholder={t("contact.ph.name")} aria-label={t("contact.ph.name")} value={form.name} onChange={set("name")} />
              <input className="teardown-input" required type="email" name="email" autoComplete="email" placeholder="your@email.com" aria-label="Email" value={form.email} onChange={set("email")} />
              <input className="teardown-input" required name="url" inputMode="url" autoComplete="url" placeholder={t("teardown.url")} aria-label={t("teardown.url")} value={form.url} onChange={set("url")} />
              <button type="submit" disabled={status === "sending"} className="teardown-submit">
                {status === "sending" ? t("teardown.sending") : t("teardown.cta")} <ArrowRight size={15} strokeWidth={2} />
              </button>
              {status === "error" && (
                <p role="alert" style={{ fontFamily: "var(--font-inter)", fontSize: 13, color: "#fca5a5" }}>{t("teardown.error")}</p>
              )}
            </form>
          )}
        </div>
      </div>
    </section>
  );
}
