"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowUpRight, Send } from "lucide-react";

// Get a free form ID at formspree.io → create a new form → paste the ID in .env.local as NEXT_PUBLIC_FORMSPREE_ID
const FORMSPREE_ID = process.env.NEXT_PUBLIC_FORMSPREE_ID;

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

  const [status, setStatus] = useState<Status>("idle");
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

    if (FORMSPREE_ID) {
      try {
        const res = await fetch(`https://formspree.io/f/${FORMSPREE_ID}`, {
          method: "POST",
          headers: { "Content-Type": "application/json", Accept: "application/json" },
          body: JSON.stringify(form),
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
    } else {
      // Fallback: open mail client
      const subject = encodeURIComponent(`Project enquiry from ${form.name}`);
      const body = encodeURIComponent(`Name: ${form.name}\nEmail: ${form.email}\nService: ${form.service}\nBudget: ${form.budget}\n\n${form.message}`);
      window.location.href = `mailto:adefilasamuel929@gmail.com?subject=${subject}&body=${body}`;
      setStatus("success");
    }
  };

  const inputStyle: React.CSSProperties = {
    width: "100%",
    padding: "14px 16px",
    fontFamily: "var(--font-inter)",
    fontSize: 14,
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
            GET IN TOUCH
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
            NOT READY FOR A CALL?{" "}
            <span style={{ color: "rgb(163,163,163)" }}>
              JUST DROP A MESSAGE.
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
            Tell me what you&apos;re working on and I&apos;ll come back to you within 24 hours with an honest take on whether I can help — and what that would look like.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.2 }}
            style={{ display: "flex", flexDirection: "column", gap: 16 }}
          >
            {[
              { label: "Email", value: "adefilasamuel929@gmail.com", href: "mailto:adefilasamuel929@gmail.com" },
              { label: "Upwork", value: "Samuel Adefila — Top Rated", href: "https://www.upwork.com/freelancers/samueladefila" },
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
            <div style={{
              padding: "48px 32px",
              border: "1px solid rgba(0,0,0,0.08)",
              textAlign: "center",
            }}>
              <p style={{ fontSize: 32, marginBottom: 16 }}>✓</p>
              <p style={{ fontFamily: "var(--font-poppins)", fontWeight: 700, fontSize: 18, color: "var(--fg)", letterSpacing: "-0.5px", marginBottom: 8 }}>
                Message sent.
              </p>
              <p style={{ fontFamily: "var(--font-inter)", fontSize: 14, color: "var(--fg-secondary)", lineHeight: 1.6 }}>
                I&apos;ll get back to you within 24 hours.
              </p>
            </div>
          ) : (
            <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 12 }}>
              {/* Name + Email */}
              <div className="form-row" style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                <div>
                  <label style={{ fontFamily: "var(--font-inter)", fontSize: 10, letterSpacing: "2px", textTransform: "uppercase", color: "var(--fg-muted)", display: "block", marginBottom: 6 }}>
                    Name *
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="Your name"
                    value={form.name}
                    onChange={set("name")}
                    style={inputStyle}
                    onFocus={(e) => (e.target.style.borderColor = "var(--accent-purple)")}
                    onBlur={(e) => (e.target.style.borderColor = "rgba(0,0,0,0.12)")}
                  />
                </div>
                <div>
                  <label style={{ fontFamily: "var(--font-inter)", fontSize: 10, letterSpacing: "2px", textTransform: "uppercase", color: "var(--fg-muted)", display: "block", marginBottom: 6 }}>
                    Email *
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
                    Service
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
                    Budget
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
                  Tell me about your project *
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="What are you building, what's the goal, and when do you need it?"
                  value={form.message}
                  onChange={set("message")}
                  style={{ ...inputStyle, resize: "vertical", minHeight: 130 }}
                  onFocus={(e) => (e.target.style.borderColor = "var(--accent-purple)")}
                  onBlur={(e) => (e.target.style.borderColor = "rgba(0,0,0,0.12)")}
                />
              </div>

              {status === "error" && (
                <p style={{ fontFamily: "var(--font-inter)", fontSize: 13, color: "#e53e3e" }}>
                  Something went wrong — try emailing me directly at adefilasamuel929@gmail.com
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
                  borderRadius: 100,
                  cursor: status === "submitting" ? "not-allowed" : "pointer",
                  opacity: status === "submitting" ? 0.6 : 1,
                  transition: "opacity 0.2s",
                  alignSelf: "flex-start",
                }}
              >
                {status === "submitting" ? "Sending…" : "Send message"}
                {status !== "submitting" && <Send size={13} strokeWidth={2} />}
              </button>
            </form>
          )}
        </motion.div>
      </div>
    </section>
  );
}
