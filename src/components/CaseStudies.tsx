"use client";
import Image from "next/image";
import { ArrowUpRight, Play } from "lucide-react";
import { useLang } from "@/context/LangContext";
import RevealWords, { revealDelayAfter } from "./RevealWords";

// Every claim here comes from the client's own testimonial or the project record —
// add a case only when there's a real result to show.
type Case = {
  id: string;
  client: string;
  logo: string;          // brand-colour logo in /public/clients
  logoAspect: number;    // width / height
  metric: string;        // literal ("5+") or a translation key
  metricIsKey?: boolean;
  quoteKey?: string;     // existing testimonial text
  quoteBy?: string;
  href?: string;         // live site
  videoLink?: boolean;   // points to the video testimonial instead of a quote
};

const CASES: Case[] = [
  {
    id: "initial", client: "The Initial", logo: "/clients/the-initial-color.svg", logoAspect: 3.37,
    metric: "5+", quoteKey: "testimonials.t2", quoteBy: "Johnno Van Den Brink · The Initial Agency",
    href: "https://the-initial.com/",
  },
  {
    id: "leadopo", client: "Leadopo", logo: "/clients/leadopo-color.svg", logoAspect: 7.37,
    metric: "cases.leadopo.metric", metricIsKey: true, quoteKey: "testimonials.t4", quoteBy: "Michal Kouril · Leadopo",
    href: "https://www.leadopo.com/",
  },
  {
    id: "bookedez", client: "BookedEZ", logo: "/clients/bookedez-color.svg", logoAspect: 5.08,
    metric: "$10K+", videoLink: true,
  },
];

const LOGO_HEIGHT = 26;

const label: React.CSSProperties = {
  fontFamily: "var(--font-inter)", fontWeight: 700, fontSize: 10,
  letterSpacing: "2.5px", textTransform: "uppercase", color: "var(--fg-muted)", marginBottom: 6,
};
const body: React.CSSProperties = {
  fontFamily: "var(--font-inter)", fontSize: 14, lineHeight: 1.6,
  color: "var(--fg-secondary)", letterSpacing: "-0.2px",
};

export default function CaseStudies() {
  const { t } = useLang();

  return (
    <section id="results" style={{ width: "100%", maxWidth: 1200, margin: "0 auto", padding: "80px 20px" }}>
      <div style={{ marginBottom: 48 }}>
        <p data-reveal style={{
          fontFamily: "var(--font-inter)", fontWeight: 700, fontSize: 11,
          letterSpacing: "4px", textTransform: "uppercase",
          color: "var(--accent-purple)", marginBottom: 16,
        }}>
          {t("cases.eyebrow")}
        </p>
        <h2 style={{
          fontFamily: "var(--font-poppins)", fontWeight: 700,
          fontSize: "clamp(28px, 3.5vw, 48px)", letterSpacing: "-1px",
          lineHeight: 1.05, textTransform: "uppercase", color: "var(--fg)",
        }}>
          <RevealWords text={t("cases.h1")} />{" "}
          <span style={{ color: "rgb(163,163,163)" }}><RevealWords text={t("cases.h1b")} delay={revealDelayAfter(t("cases.h1"))} /></span>
        </h2>
      </div>

      <div className="cases-grid">
        {CASES.map((c) => (
          <article key={c.id} data-reveal className="case-card">
            {/* Client */}
            <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 12, marginBottom: 28 }}>
              <Image
                src={c.logo}
                alt={c.client}
                unoptimized
                width={Math.round(LOGO_HEIGHT * c.logoAspect)}
                height={LOGO_HEIGHT}
                style={{ height: LOGO_HEIGHT, width: "auto", maxWidth: "70%" }}
              />
              {c.href && (
                <a href={c.href} target="_blank" rel="noopener noreferrer" className="case-link" aria-label={`${t("cases.visit")}: ${c.client}`}>
                  {t("cases.visit")} <ArrowUpRight size={12} strokeWidth={2} />
                </a>
              )}
            </div>

            {/* Result */}
            <p style={{
              fontFamily: "var(--font-poppins)", fontWeight: 700,
              fontSize: c.metricIsKey ? "clamp(26px, 2.6vw, 34px)" : "clamp(44px, 4.4vw, 60px)",
              letterSpacing: "-0.04em", lineHeight: 1, color: "var(--fg)", textTransform: "uppercase", marginBottom: 12,
            }}>
              {c.metricIsKey ? t(c.metric) : c.metric}
            </p>
            <p style={{
              fontFamily: "var(--font-inter)", fontWeight: 400, fontSize: 13, letterSpacing: "0.02em",
              textTransform: "uppercase", color: "var(--fg-secondary)", lineHeight: 1.4, marginBottom: 24,
            }}>
              {t(`cases.${c.id}.metricLabel`)}
            </p>

            <div style={{ borderTop: "1px solid rgba(0,0,0,0.08)", paddingTop: 20, display: "flex", flexDirection: "column", gap: 16 }}>
              <div>
                <p style={label}>{t("cases.brief")}</p>
                <p style={body}>{t(`cases.${c.id}.brief`)}</p>
              </div>
              <div>
                <p style={label}>{t("cases.did")}</p>
                <p style={body}>{t(`cases.${c.id}.did`)}</p>
              </div>
            </div>

            {/* Client's own words */}
            <div style={{ marginTop: "auto", paddingTop: 24 }}>
              {c.quoteKey ? (
                <figure style={{ margin: 0, borderTop: "1px solid rgba(0,0,0,0.08)", paddingTop: 20 }}>
                  <blockquote style={{ margin: 0, fontFamily: "var(--font-inter)", fontSize: 14, lineHeight: 1.65, color: "var(--fg-secondary)", letterSpacing: "-0.2px" }}>
                    &ldquo;{t(c.quoteKey)}&rdquo;
                  </blockquote>
                  <figcaption style={{ marginTop: 14 }}>
                    <span style={{ display: "block", fontFamily: "var(--font-inter)", fontWeight: 700, fontSize: 13, textTransform: "uppercase", letterSpacing: "0.5px", color: "var(--fg)", marginBottom: 3 }}>
                      {c.quoteBy?.split(" · ")[0]}
                    </span>
                    <span style={{ display: "block", fontFamily: "var(--font-inter)", fontSize: 11, textTransform: "uppercase", letterSpacing: "0.5px", color: "var(--fg-secondary)" }}>
                      {c.quoteBy?.split(" · ")[1]}
                    </span>
                  </figcaption>
                </figure>
              ) : c.videoLink ? (
                <div style={{ borderTop: "1px solid rgba(0,0,0,0.08)", paddingTop: 20 }}>
                  <a href="#testimonials" className="case-video-link">
                    <span style={{ width: 32, height: 32, borderRadius: "50%", background: "var(--fg)", display: "inline-flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                      <Play size={13} fill="#fff" color="#fff" style={{ marginLeft: 2 }} />
                    </span>
                    <span className="case-video-text">{t("cases.watch")}</span>
                  </a>
                </div>
              ) : null}
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
