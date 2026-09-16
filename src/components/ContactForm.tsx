"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import { ArrowUpRight, Send } from "lucide-react";
import { useLang } from "@/context/LangContext";


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

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function ContactForm() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const { t } = useLang();

  const [status, setStatus] = useState<Status>("idle");
  const [countdown, setCountdown] = useState(5);
  const loadedAt = useRef<number>(0);
  const [honey, setHoney] = useState("");

  useEffect(() => { loadedAt.current = Date.now(); }, []);

  useEffect(() => {
    if (status !== "success") return;
    setCountdown(5);
    const interval = setInterval(() => setCountdown((c) => c - 1), 1000);
    const reset = setTimeout(() => { setStatus("idle"); setForm({ name: "", email: "", service: "", budget: "", message: "" }); }, 5000);
    return () => { clearInterval(interval); clearTimeout(reset); };
  }, [status]);
  const [form, setForm] = useState({
    name: "",
    email: "",
    service: "",
    budget: "",
    message: "",
  });

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
        setStatus("success");
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
        <div ref={ref}>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5 }}
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
            initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
            animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.5, delay: 0.06, ease: EASE }}
            style={{
              fontFamily: "var(--font-poppins)",
              fontWeight: 700,
              fontSize: "clamp(26px, 3vw, 40px)",
              letterSpacing: "-1px",
              lineHeight: 1.08,
              textTransform: "uppercase",
              color: "var(--fg)",
              marginBottom: 20,
            }}
          >
            {t("contact.h1")}{" "}
            <span style={{ color: "rgb(163,163,163)" }}>
              {t("contact.h1b")}
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.14 }}
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
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ display: "flex", flexDirection: "column", gap: 16 }}
          >
            {[
              { label: "Email", value: "adefilasamuel929@gmail.com", href: "mailto:adefilasamuel929@gmail.com" },
              { label: "Upwork", value: "Samuel Adefila — Top Rated", href: "https://upwork.com/freelancers/adefilasamuel" },
              { label: "LinkedIn", value: "linkedin.com/in/adefila-samuel", href: "https://www.linkedin.com/in/adefila-samuel-144448201/" },
            ].map((item) => (
              <a
                key={item.label}
                href={item.href}
                target={item.href.startsWith("mailto") ? undefined : "_blank"}
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
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.12, ease: EASE }}
        >
          {status === "success" ? (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.45, ease: EASE }}
              style={{
                padding: "52px 32px",
                border: "1px solid rgba(0,0,0,0.08)",
                textAlign: "center",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                gap: 0,
              }}
            >
              {/* Isometric outline icon */}
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                style={{ marginBottom: 32 }}
              >
                <svg width="160" height="130" viewBox="0 0 160 130" fill="none" xmlns="http://www.w3.org/2000/svg">
                  {/* Subtle face fills for depth */}
                  <polygon points="80,10 132,38 80,66 28,38" fill="rgba(0,0,0,0.04)"/>
                  <polygon points="28,38 28,92 80,120 80,66" fill="rgba(0,0,0,0.07)"/>
                  <polygon points="132,38 132,92 80,120 80,66" fill="rgba(0,0,0,0.05)"/>
                  {/* Top face edges */}
                  <polygon points="80,10 132,38 80,66 28,38" stroke="var(--fg)" strokeWidth="1.8" fill="none"/>
                  {/* Left face edges */}
                  <polyline points="28,38 28,92 80,120 80,66" stroke="var(--fg)" strokeWidth="1.8"/>
                  {/* Right face edges */}
                  <polyline points="132,38 132,92 80,120" stroke="var(--fg)" strokeWidth="1.8"/>
                  {/* Checkmark on top face */}
                  <polyline
                    points="55,40 70,53 106,22"
                    stroke="var(--fg)"
                    strokeWidth="3.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </motion.div>

              <p style={{ fontFamily: "var(--font-poppins)", fontWeight: 700, fontSize: "clamp(18px,2.5vw,26px)", color: "var(--fg)", letterSpacing: "-0.5px", marginBottom: 8, lineHeight: 1.1, textTransform: "uppercase" }}>
                {t("contact.success.title")}
              </p>
              <p style={{ fontFamily: "var(--font-inter)", fontSize: 14, color: "var(--fg-secondary)", lineHeight: 1.6, maxWidth: 320, marginBottom: 24 }}>
                {t("contact.success.desc")}
              </p>

              {/* Countdown bar */}
              <div style={{ width: "100%", maxWidth: 200, height: 2, background: "rgba(0,0,0,0.07)", borderRadius: 1, overflow: "hidden" }}>
                <motion.div
                  initial={{ width: "100%" }}
                  animate={{ width: "0%" }}
                  transition={{ duration: 5, ease: "linear" }}
                  style={{ height: "100%", background: "var(--fg)" }}
                />
              </div>
              <p style={{ fontFamily: "var(--font-inter)", fontSize: 11, color: "var(--fg-muted)", letterSpacing: "0.05em", marginTop: 10 }}>
                Form resets in {countdown}s
              </p>
            </motion.div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {/* Name + Email */}
              <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={{ fontFamily: "var(--font-inter)", fontSize: 10, letterSpacing: "2px", textTransform: "uppercase", color: "var(--fg-muted)", display: "block", marginBottom: 6 }}>
                    {t("contact.label.name")} *
                  </label>
                  <input
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
                  <label style={{ fontFamily: "var(--font-inter)", fontSize: 10, letterSpacing: "2px", textTransform: "uppercase", color: "var(--fg-muted)", display: "block", marginBottom: 6 }}>
                    {t("contact.label.email")} *
                  </label>
                  <input
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
                  <label style={{ fontFamily: "var(--font-inter)", fontSize: 10, letterSpacing: "2px", textTransform: "uppercase", color: "var(--fg-muted)", display: "block", marginBottom: 6 }}>
                    {t("contact.label.service")}
                  </label>
                  <select
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
                  <label style={{ fontFamily: "var(--font-inter)", fontSize: 10, letterSpacing: "2px", textTransform: "uppercase", color: "var(--fg-muted)", display: "block", marginBottom: 6 }}>
                    {t("contact.label.budget")}
                  </label>
                  <select
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
                <label style={{ fontFamily: "var(--font-inter)", fontSize: 10, letterSpacing: "2px", textTransform: "uppercase", color: "var(--fg-muted)", display: "block", marginBottom: 6 }}>
                  {t("contact.label.message")} *
                </label>
                <textarea
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

              {/* Honeypot — hidden from real users, bots fill it */}
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
                  padding: "14px 28px",
                  background: "var(--fg)",
                  color: "#fff",
                  fontFamily: "var(--font-inter)",
                  fontWeight: 600,
                  fontSize: 13,
                  letterSpacing: "-0.2px",
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
