"use client";
import { motion } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowUpRight, Send } from "lucide-react";
import { useLang } from "@/context/LangContext";
import FormSuccess from "./FormSuccess";
import { trackEvent } from "@/lib/gtag";
import RevealWords, { revealDelayAfter } from "./RevealWords";

const EMAIL = "samuel@adefilasamuel.com";

function CopyEmailRow() {
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState(false);
  // Checked at the moment of the event: copy-on-click only on devices with a real hover
  const canHover = () => window.matchMedia("(hover: hover)").matches;

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (!canHover()) return;
    e.preventDefault();
    navigator.clipboard.writeText(EMAIL).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 1600);
    });
  };

  return (
    <a
      href={`mailto:${EMAIL}`}
      onClick={handleClick}
      onMouseEnter={() => canHover() && setHovered(true)}
      onMouseLeave={() => { setHovered(false); }}
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "space-between",
        padding: "14px 0",
        borderBottom: "1px solid rgba(0,0,0,0.07)",
        textDecoration: "none",
      }}
    >
      <div>
        <p style={{ fontFamily: "var(--font-inter)", fontSize: 10, letterSpacing: "2px", textTransform: "uppercase", color: "var(--fg-muted)", marginBottom: 3 }}>
          Email
        </p>
        <p style={{
          fontFamily: "var(--font-inter)", fontSize: 14, color: "var(--fg)", letterSpacing: "-0.2px",
          borderBottom: `1px solid ${hovered ? "rgba(0,0,0,0.35)" : "transparent"}`,
          paddingBottom: 1,
          transition: "border-color 0.2s ease",
          display: "inline",
        }}>
          {EMAIL}
        </p>
      </div>
      <span style={{
        fontFamily: "var(--font-inter)",
        fontWeight: 600,
        fontSize: 10,
        letterSpacing: "1.5px",
        textTransform: "uppercase",
        color: copied ? "var(--accent-purple)" : "var(--fg-muted)",
        opacity: hovered ? 1 : 0,
        transform: hovered ? "translateX(0)" : "translateX(6px)",
        transition: "opacity 0.22s ease, transform 0.22s ease, color 0.15s ease",
        whiteSpace: "nowrap",
        pointerEvents: "none",
      }}>
        {copied ? "Copied ✓" : "Copy"}
      </span>
    </a>
  );
}


const services = [
  "Framer Website",
  "Webflow Build",
  "Shopify Store",
  "Landing Page",
  "Redesign / Migration",
  "Ongoing Support",
  "Other",
];

const budgets = [
  "Under $600",
  "$600 – $1,500",
  "$1,500 – $3,000",
  "$3,000+",
];

type Status = "idle" | "submitting" | "success" | "error";


export default function ContactForm() {
  const { t } = useLang();

  const [status, setStatus] = useState<Status>("idle");
  const [countdown, setCountdown] = useState(5);
  const loadedAt = useRef<number>(0);
  const [honey, setHoney] = useState("");

  useEffect(() => { loadedAt.current = Date.now(); }, []);

  const [form, setForm] = useState({
    name: "",
    email: "",
    service: "",
    budget: "",
    message: "",
  });

  // The FAQ's "send my question" button fills in the message
  useEffect(() => {
    const onPrefill = (e: Event) => {
      const message = (e as CustomEvent<{ message?: string }>).detail?.message;
      if (message) setForm((f) => ({ ...f, message }));
    };
    window.addEventListener("prefill-contact", onPrefill);
    return () => window.removeEventListener("prefill-contact", onPrefill);
  }, []);

  // After a successful send, count down and reset the form (countdown starts at 5 in handleSubmit)
  useEffect(() => {
    if (status !== "success") return;
    const interval = setInterval(() => setCountdown((c) => c - 1), 1000);
    const reset = setTimeout(() => { setStatus("idle"); setForm({ name: "", email: "", service: "", budget: "", message: "" }); }, 5000);
    return () => { clearInterval(interval); clearTimeout(reset); };
  }, [status]);

  const set = (k: keyof typeof form) => (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
    setForm((f) => ({ ...f, [k]: e.target.value }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("submitting");

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, _t: loadedAt.current, _h: honey }),
      });
      if (res.ok) {
        setCountdown(5);
        setStatus("success");
        trackEvent("generate_lead", {
          service: form.service || "unspecified",
          budget: form.budget || "unspecified",
        });
        setForm({ name: "", email: "", service: "", budget: "", message: "" });
      } else {
        setStatus("error");
      }
    } catch {
      setStatus("error");
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px 16px",
    fontFamily: "var(--font-inter)",
    fontSize: 16,
    letterSpacing: "-0.2px",
    color: "var(--fg)",
    background: "var(--bg)",
    border: "1px solid rgba(0,0,0,0.12)",
    outline: "none",
    borderRadius: 0,
    appearance: "none",
    WebkitAppearance: "none",
    transition: "border-color 0.18s",
  };

  return (
    <section
      id="contact"
      className="grid-texture"
      style={{
        width: "100%",
        maxWidth: 1200,
        margin: "0 auto",
        padding: "80px 20px",
        borderTop: "1px solid rgba(0,0,0,0.08)",
      }}
    >
      <div
        className="contact-grid"
        style={{ display: "grid", gridTemplateColumns: "1fr 1.4fr", gap: 80, alignItems: "start" }}
      >
        {/* Left: copy */}
        <div>
          <motion.p
            data-reveal
            style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 700,
              fontSize: 11,
              letterSpacing: "4px",
              textTransform: "uppercase",
              color: "var(--accent-purple)",
              marginBottom: 16,
            }}
          >
            {t("contact.eyebrow")}
          </motion.p>
          <motion.h2
            data-reveal
            style={{
              fontFamily: "var(--font-poppins)",
              fontWeight: 700,
              fontSize: "clamp(28px, 3.5vw, 48px)",
              letterSpacing: "-1px",
              lineHeight: 1.05,
              textTransform: "uppercase",
              color: "var(--fg)",
              marginBottom: 20,
            }}
          >
            <RevealWords text={t("contact.h1")} />{" "}
            <span style={{ color: "rgb(163,163,163)" }}>
              <RevealWords text={t("contact.h1b")} delay={revealDelayAfter(t("contact.h1"))} />
            </span>
          </motion.h2>

          <motion.p
            data-reveal
            style={{
              fontFamily: "var(--font-inter)",
              fontSize: 15,
              lineHeight: 1.7,
              color: "var(--fg-secondary)",
              letterSpacing: "-0.2px",
              marginBottom: 40,
            }}
          >
            {t("contact.desc")}
          </motion.p>

          <motion.div
            data-reveal
            style={{ display: "flex", flexDirection: "column" }}
          >
            <CopyEmailRow />
            {[
              { label: "Upwork", value: "Samuel Adefila. Top Rated", href: "https://upwork.com/freelancers/adefilasamuel" },
              { label: "LinkedIn", value: "linkedin.com/in/adefila-samuel", href: "https://www.linkedin.com/in/adefila-samuel-144448201/" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "space-between",
                  padding: "14px 0",
                  borderBottom: "1px solid rgba(0,0,0,0.07)",
                  textDecoration: "none",
                }}
              >
                <div>
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: 10, letterSpacing: "2px", textTransform: "uppercase", color: "var(--fg-muted)", marginBottom: 3 }}>
                    {item.label}
                  </p>
                  <p style={{ fontFamily: "var(--font-inter)", fontSize: 14, color: "var(--fg)", letterSpacing: "-0.2px" }}>
                    {item.value}
                  </p>
                </div>
                <ArrowUpRight size={14} color="rgba(0,0,0,0.25)" strokeWidth={1.5} />
              </a>
            ))}
          </motion.div>
        </div>

        {/* Right: form */}
        <motion.div
          data-reveal
        >
          {status === "success" ? (
            <FormSuccess title={t("contact.success.title")} desc={t("contact.success.desc")} resetLabel={`Form resets in ${countdown}s`} />
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {/* Name + Email */}
              <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label htmlFor="contact-name" style={{ fontFamily: "var(--font-inter)", fontSize: 10, letterSpacing: "2px", textTransform: "uppercase", color: "var(--fg-muted)", display: "block", marginBottom: 6 }}>
                    {t("contact.label.name")} *
                  </label>
                  <input
                    id="contact-name"
                    required
                    type="text"
                    placeholder={t("contact.ph.name")}
                    value={form.name}
                    onChange={set("name")}
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = "var(--accent-purple)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(0,0,0,0.12)")}
                  />
                </div>
                <div>
                  <label htmlFor="contact-email" style={{ fontFamily: "var(--font-inter)", fontSize: 10, letterSpacing: "2px", textTransform: "uppercase", color: "var(--fg-muted)", display: "block", marginBottom: 6 }}>
                    {t("contact.label.email")} *
                  </label>
                  <input
                    id="contact-email"
                    required
                    type="email"
                    placeholder="your@email.com"
                    value={form.email}
                    onChange={set("email")}
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = "var(--accent-purple)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(0,0,0,0.12)")}
                  />
                </div>
              </div>

              {/* Service + Budget */}
              <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label htmlFor="contact-service" style={{ fontFamily: "var(--font-inter)", fontSize: 10, letterSpacing: "2px", textTransform: "uppercase", color: "var(--fg-muted)", display: "block", marginBottom: 6 }}>
                    {t("contact.label.service")}
                  </label>
                  <select
                    id="contact-service"
                    value={form.service}
                    onChange={set("service")}
                    style={{ ...inputStyle, cursor: "pointer" }}
                    onFocus={(e) => (e.target.style.borderColor = "var(--accent-purple)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(0,0,0,0.12)")}
                  >
                    <option value="">Select service</option>
                    {services.map((s) => <option key={s} value={s}>{s}</option>)}
                  </select>
                </div>
                <div>
                  <label htmlFor="contact-budget" style={{ fontFamily: "var(--font-inter)", fontSize: 10, letterSpacing: "2px", textTransform: "uppercase", color: "var(--fg-muted)", display: "block", marginBottom: 6 }}>
                    {t("contact.label.budget")}
                  </label>
                  <select
                    id="contact-budget"
                    value={form.budget}
                    onChange={set("budget")}
                    style={{ ...inputStyle, cursor: "pointer" }}
                    onFocus={(e) => (e.target.style.borderColor = "var(--accent-purple)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(0,0,0,0.12)")}
                  >
                    <option value="">Select budget</option>
                    {budgets.map((b) => <option key={b} value={b}>{b}</option>)}
                  </select>
                </div>
              </div>

              {/* Message */}
              <div>
                <label htmlFor="contact-message" style={{ fontFamily: "var(--font-inter)", fontSize: 10, letterSpacing: "2px", textTransform: "uppercase", color: "var(--fg-muted)", display: "block", marginBottom: 6 }}>
                  {t("contact.label.message")} *
                </label>
                <textarea
                  id="contact-message"
                  required
                  rows={5}
                  placeholder={t("contact.ph.message")}
                  value={form.message}
                  onChange={set("message")}
                  style={{ ...inputStyle, resize: "vertical", minHeight: 130 }}
                  onFocus={(e) => (e.target.style.borderColor = "var(--accent-purple)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(0,0,0,0.12)")}
                />
              </div>

              {/* Honeypot. hidden from real users, bots fill it */}
              <div style={{ position: "absolute", left: "-9999px", top: 0, height: 0, overflow: "hidden" }} aria-hidden="true">
                <input
                  type="text"
                  name="website"
                  value={honey}
                  onChange={(e) => setHoney(e.target.value)}
                  tabIndex={-1}
                  autoComplete="off"
                />
              </div>

              {status === "error" && (
                <p style={{ fontFamily: "var(--font-inter)", fontSize: 13, color: "#e53e3e" }}>
                  {t("contact.error")}
                </p>
              )}

              <button
                type="submit"
                disabled={status === "submitting"}
                style={{
                  display: "inline-flex",
                  alignItems: "center",
                  justifyContent: "center",
                  gap: 8,
                  padding: "14px 26px",
                  background: "var(--fg)",
                  color: "#fff",
                  fontFamily: "var(--font-inter)",
                  fontWeight: 600,
                  lineHeight: "20px",
                  fontSize: 13,
                  letterSpacing: "0.5px",
                  textTransform: "uppercase",
                  border: "none",
                  borderRadius: 0,
                  cursor: status === "submitting" ? "not-allowed" : "pointer",
                  opacity: status === "submitting" ? 0.6 : 1,
                  transition: "opacity 0.2s",
                  alignSelf: "flex-start",
                }}
              >
                {status === "submitting" ? t("contact.btn.sending") : t("contact.btn.send")}
                {status !== "submitting" && <Send size={13} strokeWidth={2} />}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
