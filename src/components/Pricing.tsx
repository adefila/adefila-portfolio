"use client";
import { Check, ArrowUpRight } from "lucide-react";
import { useLang } from "@/context/LangContext";
import RevealWords, { revealDelayAfter } from "./RevealWords";

const PLANS_BASE = [
  { usdPrice: 500,  featured: false, featureCount: 5, planKey: "plan0" },
  { usdPrice: 2000, featured: true,  featureCount: 6, planKey: "plan1" },
  { usdPrice: 3000, featured: false, featureCount: 5, planKey: "plan2" },
];

const ADDONS_BASE = [
  { addonKey: "addon0", usdPrice: 1000, perMonth: false },
  { addonKey: "addon1", usdPrice: 250,  perMonth: true  },
  { addonKey: "addon2", usdPrice: 500,  perMonth: false },
  { addonKey: "addon3", usdPrice: 500,  perMonth: false },
];


export default function Pricing() {
  const { t, formatPrice, currency } = useLang();

  const plans = PLANS_BASE.map(({ planKey, usdPrice, featured, featureCount }) => ({
    label: t(`pricing.${planKey}.label`),
    name: t(`pricing.${planKey}.name`),
    desc: t(`pricing.${planKey}.desc`),
    features: Array.from({ length: featureCount }, (_, i) => t(`pricing.${planKey}.f${i}`)),
    usdPrice,
    featured,
  }));

  const addons = ADDONS_BASE.map(({ addonKey, usdPrice, perMonth }) => ({
    label: t(`pricing.${addonKey}`),
    usdPrice,
    perMonth,
  }));

  return (
    <section
      id="pricing"
      style={{ width: "100%", maxWidth: 1200, margin: "0 auto", padding: "80px 20px" }}
    >
      {/* Header */}
      <div
        className="pricing-header"
        style={{
          display: "flex", gap: 80, alignItems: "flex-end",
          flexWrap: "wrap", marginBottom: 56,
          borderBottom: "1px solid rgba(0,0,0,0.08)", paddingBottom: 40,
        }}
      >
        <div data-reveal style={{ flex: "1 1 360px" }}>
          <p style={{
            fontFamily: "var(--font-inter)", fontWeight: 700, fontSize: 11,
            letterSpacing: "4px", textTransform: "uppercase",
            color: "var(--accent-purple)", marginBottom: 16,
          }}>
            {t("pricing.eyebrow")}
          </p>
          <h2 style={{
            fontFamily: "var(--font-poppins)", fontWeight: 700,
            fontSize: "clamp(28px, 3.5vw, 48px)", letterSpacing: "-1px",
            lineHeight: 1.05, textTransform: "uppercase", color: "var(--fg)",
          }}>
            <RevealWords text={t("pricing.h2a")} />{" "}
            <span style={{ color: "rgb(163,163,163)" }}><RevealWords text={t("pricing.h2b")} delay={revealDelayAfter(t("pricing.h2a"))} /></span>
          </h2>
        </div>

        <p data-reveal style={{
          flex: "1 1 280px",
          fontFamily: "var(--font-inter)", fontWeight: 400, fontSize: 15,
          lineHeight: 1.7, color: "var(--fg-secondary)", letterSpacing: "-0.3px",
        }}>
          {t("pricing.desc")}
        </p>
      </div>

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
        {plans.map((plan) => {
          return (
          <div
            key={plan.name}
            data-reveal style={{
              display: "flex", flexDirection: "column",
              padding: "32px 28px",
              background: plan.featured ? "var(--fg)" : "var(--bg)",
              position: "relative",
            }}
          >
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
              {t("pricing.from")} {formatPrice(plan.usdPrice)}
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
              data-track-label={plan.name}
              target="_blank"
              rel="noopener noreferrer"
              style={{
                display: "inline-flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                padding: "14px 20px",
                background: plan.featured ? "var(--accent-purple)" : "var(--fg)",
                color: "#fff",
                fontFamily: "var(--font-inter)",
                fontWeight: 600,
                lineHeight: "20px",
                fontSize: 13,
                letterSpacing: "0.5px",
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
          </div>
          );
        })}
      </div>

      {/* Add-ons strip */}
      <div
        className="addons-grid"
        data-reveal
        style={{
          display: "grid", gridTemplateColumns: "repeat(4, 1fr)",
          gap: 1, background: "rgba(0,0,0,0.06)",
          border: "1px solid rgba(0,0,0,0.06)", borderTop: "none",
        }}
      >
        {addons.map((addon, i) => (
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
      </div>

      {/* Promises: the risk-reversal right where people decide */}
      <ul data-reveal className="pricing-guarantees">
        {["pricing.guarantee1", "pricing.guarantee2"].map((key) => (
          <li key={key}>
            <span aria-hidden="true" className="pricing-guarantee-icon">
              <Check size={12} strokeWidth={3} color="#fff" />
            </span>
            {t(key)}
          </li>
        ))}
      </ul>

      <p data-reveal style={{
        fontFamily: "var(--font-inter)", fontSize: 12,
        color: "var(--fg-muted)", marginTop: 16, letterSpacing: "-0.1px",
      }}>
        {t("pricing.disclaimer")}
      </p>
    </section>
  );
}
