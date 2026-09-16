"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Check, ArrowUpRight } from "lucide-react";
import { useLang } from "@/context/LangContext";
import { CURRENCIES, CurrencyCode } from "@/i18n/translations";

const PLANS = [
  {
    label: "LANDING PAGE",
    name: "Single Page",
    usdPrice: 500,
    desc: "One focused page built to convert — for launches, lead gen, or a clear product pitch.",
    features: [
      "Custom Framer or Webflow design",
      "Mobile-responsive, pixel-perfect",
      "Animations & micro-interactions",
      "CMS content management",
      "Delivered in 5–7 days",
    ],
    featured: false,
  },
  {
    label: "FULL WEBSITE",
    name: "Multi-Page Build",
    usdPrice: 2000,
    desc: "A complete site for founders and businesses who need more than a landing page.",
    features: [
      "Up to 8 pages",
      "Figma wireframe before we build",
      "Blog or portfolio CMS setup",
      "SEO basics + sitemap",
      "Delivered in 10–14 days",
      "Loom handoff walkthrough",
    ],
    featured: true,
  },
  {
    label: "E-COMMERCE",
    name: "Shopify / WooCommerce",
    usdPrice: 3000,
    desc: "Conversion-focused store design for brands ready to sell online the right way.",
    features: [
      "Custom Shopify or WooCommerce theme",
      "Product pages built to sell",
      "Payment & checkout optimisation",
      "Mobile-first, fast-loading",
      "Delivered in 14 days",
    ],
    featured: false,
  },
];

const ADDONS = [
  { label: "Any Platform → Framer",    usdPrice: 1000, perMonth: false },
  { label: "Ongoing monthly support",   usdPrice: 250,  perMonth: true  },
  { label: "Design only (Figma)",       usdPrice: 500,  perMonth: false },
  { label: "SEO audit + fixes",         usdPrice: 500,  perMonth: false },
];

const EASE = [0.22, 1, 0.36, 1] as [number, number, number, number];

export default function Pricing() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-10%" });
  const { t, formatPrice, currency, setCurrency } = useLang();

  const currentCurr = CURRENCIES.find((c) => c.code === currency) ?? CURRENCIES[0];

  return (
    <section
      id="pricing"
      style={{ width: "100%", maxWidth: 1200, margin: "0 auto", padding: "80px 20px" }}
    >
      {/* Header */}
      <div
        ref={ref}
        className="pricing-header"
        style={{
          display: "flex",
          gap: 80,
          alignItems: "flex-end",
          flexWrap: "wrap",
          marginBottom: 56,
          borderBottom: "1px solid rgba(0,0,0,0.08)",
          paddingBottom: 40,
        }}
      >
        <div style={{ flex: "1 1 360px" }}>
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
            {t("pricing.eyebrow")}
          </motion.p>
          <motion.h2
            initial={{ opacity: 0, y: 10, filter: "blur(8px)" }}
            animate={inView ? { opacity: 1, y: 0, filter: "blur(0px)" } : {}}
            transition={{ duration: 0.5, delay: 0.06, ease: EASE }}
            style={{
              fontFamily: "var(--font-poppins)",
              fontWeight: 700,
              fontSize: "clamp(26px, 3.2vw, 44px)",
              letterSpacing: "-1px",
              lineHeight: 1.08,
              textTransform: "uppercase",
              color: "var(--fg)",
            }}
          >
            {t("pricing.h2a")}{" "}
            <span style={{ color: "rgb(163,163,163)" }}>
              {t("pricing.h2b")}
            </span>
          </motion.h2>
        </div>

        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.14 }}
          style={{
            flex: "1 1 280px",
            fontFamily: "var(--font-inter)",
            fontWeight: 400,
            fontSize: 15,
            lineHeight: 1.7,
            color: "var(--fg-secondary)",
            letterSpacing: "-0.3px",
          }}
        >
          {t("pricing.desc")}
        </motion.p>
      </div>

      {/* Currency strip */}
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.4, delay: 0.08, ease: EASE }}
        style={{
          display: "flex",
          alignItems: "center",
          gap: 8,
          marginBottom: 20,
          flexWrap: "wrap",
        }}
      >
        <span style={{
          fontFamily: "var(--font-inter)",
          fontSize: 10,
          fontWeight: 700,
          letterSpacing: "2px",
          textTransform: "uppercase",
          color: "var(--fg-muted)",
          marginRight: 4,
        }}>
          Prices in:
        </span>
        {CURRENCIES.map((c) => {
          const active = currency === c.code;
          return (
            <button
              key={c.code}
              onClick={() => setCurrency(c.code as CurrencyCode)}
              title={c.name}
              style={{
                padding: "4px 10px",
                background: active ? "var(--fg)" : "transparent",
                border: `1px solid ${active ? "var(--fg)" : "rgba(0,0,0,0.12)"}`,
                cursor: "pointer",
                fontFamily: "var(--font-inter)",
                fontSize: 11,
                fontWeight: active ? 700 : 500,
                color: active ? "#fff" : "var(--fg-secondary)",
                letterSpacing: "0.3px",
                transition: "all 0.15s",
                lineHeight: 1.6,
              }}
            >
              {c.code}
            </button>
          );
        })}
        {currency !== "USD" && (
          <span style={{
            fontFamily: "var(--font-inter)",
            fontSize: 10,
            color: "var(--fg-muted)",
            marginLeft: 4,
            letterSpacing: "-0.1px",
          }}>
            · indicative rates vs USD · {currentCurr.symbol}1 = ${(1 / currentCurr.rate).toFixed(4)}
          </span>
        )}
      </motion.div>

      {/* Plans */}
      <div
        className="pricing-grid"
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(3, 1fr)",
          gap: 1,
          background: "rgba(0,0,0,0.06)",
          border: "1px solid rgba(0,0,0,0.06)",
          marginBottom: 1,
        }}
      >
        {PLANS.map((plan, i) => (
          <motion.div
            key={plan.name}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 + i * 0.08, ease: EASE }}
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "32px 28px",
              background: plan.featured ? "var(--fg)" : "var(--bg)",
              position: "relative",
            }}
          >
            {plan.featured && (
              <span style={{
                position: "absolute",
                top: 0,
                left: 0,
                right: 0,
                height: 3,
                background: "var(--accent-purple)",
              }} />
            )}

            <p style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 700,
              fontSize: 10,
              letterSpacing: "2.5px",
              textTransform: "uppercase",
              color: plan.featured ? "rgba(255,255,255,0.4)" : "var(--accent-purple)",
              marginBottom: 12,
            }}>
              {plan.label}
            </p>

            <p style={{
              fontFamily: "var(--font-poppins)",
              fontWeight: 700,
              fontSize: 20,
              letterSpacing: "-0.5px",
              color: plan.featured ? "#fff" : "var(--fg)",
              marginBottom: 8,
              textTransform: "uppercase",
            }}>
              {plan.name}
            </p>

            <p style={{
              fontFamily: "var(--font-poppins)",
              fontWeight: 700,
              fontSize: 28,
              letterSpacing: "-1px",
              color: plan.featured ? "#fff" : "var(--fg)",
              marginBottom: 4,
              lineHeight: 1,
            }}>
              from {formatPrice(plan.usdPrice)}
            </p>
            {currency !== "USD" && (
              <p style={{
                fontFamily: "var(--font-inter)",
                fontSize: 11,
                color: plan.featured ? "rgba(255,255,255,0.4)" : "var(--fg-muted)",
                marginBottom: 12,
                letterSpacing: "-0.1px",
              }}>
                ≈ ${plan.usdPrice.toLocaleString()} USD
              </p>
            )}
            {currency === "USD" && <div style={{ marginBottom: 12 }} />}

            <p style={{
              fontFamily: "var(--font-inter)",
              fontSize: 14,
              lineHeight: 1.65,
              color: plan.featured ? "rgba(255,255,255,0.55)" : "var(--fg-secondary)",
              letterSpacing: "-0.2px",
              marginBottom: 24,
              paddingBottom: 24,
              borderBottom: `1px solid ${plan.featured ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.07)"}`,
            }}>
              {plan.desc}
            </p>

            <div style={{ display: "flex", flexDirection: "column", gap: 10, flex: 1, marginBottom: 28 }}>
              {plan.features.map((f) => (
                <div key={f} style={{ display: "flex", alignItems: "flex-start", gap: 10 }}>
                  <Check
                    size={13}
                    strokeWidth={2.5}
                    color="var(--accent-purple)"
                    style={{ flexShrink: 0, marginTop: 2 }}
                  />
                  <span style={{
                    fontFamily: "var(--font-inter)",
                    fontSize: 13,
                    color: plan.featured ? "rgba(255,255,255,0.7)" : "var(--fg-secondary)",
                    lineHeight: 1.5,
                    letterSpacing: "-0.1px",
                  }}>
                    {f}
                  </span>
                </div>
              ))}
            </div>

            <a
              href="https://calendly.com/adefilasamuel929/30min"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                padding: "13px 20px",
                background: plan.featured ? "var(--accent-purple)" : "var(--fg)",
                color: "#fff",
                fontFamily: "var(--font-inter)",
                fontWeight: 600,
                fontSize: 13,
                letterSpacing: "0.3px",
                textDecoration: "none",
                textTransform: "uppercase",
                transition: "opacity 0.2s",
              }}
              onMouseEnter={(e) => (e.currentTarget.style.opacity = "0.85")}
              onMouseLeave={(e) => (e.currentTarget.style.opacity = "1")}
            >
              {t("pricing.cta")}
              <ArrowUpRight size={14} strokeWidth={2} />
            </a>
          </motion.div>
        ))}
      </div>

      {/* Add-ons strip */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.4, ease: EASE }}
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(4, 1fr)",
          gap: 1,
          background: "rgba(0,0,0,0.06)",
          border: "1px solid rgba(0,0,0,0.06)",
          borderTop: "none",
        }}
        className="addons-grid"
      >
        {ADDONS.map((addon, i) => (
          <div
            key={i}
            style={{
              padding: "18px 20px",
              background: "var(--bg)",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              gap: 12,
            }}
          >
            <span style={{
              fontFamily: "var(--font-inter)",
              fontSize: 13,
              color: "var(--fg-secondary)",
              letterSpacing: "-0.1px",
            }}>
              {addon.label}
            </span>
            <span style={{
              fontFamily: "var(--font-inter)",
              fontWeight: 600,
              fontSize: 13,
              color: "var(--fg)",
              letterSpacing: "-0.2px",
              flexShrink: 0,
            }}>
              {formatPrice(addon.usdPrice, addon.perMonth)}
            </span>
          </div>
        ))}
      </motion.div>

      <motion.p
        initial={{ opacity: 0 }}
        animate={inView ? { opacity: 1 } : {}}
        transition={{ duration: 0.5, delay: 0.5 }}
        style={{
          fontFamily: "var(--font-inter)",
          fontSize: 12,
          color: "var(--fg-muted)",
          marginTop: 16,
          letterSpacing: "-0.1px",
        }}
      >
        {t("pricing.disclaimer")}
      </motion.p>
    </section>
  );
}
