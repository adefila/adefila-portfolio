"use client";
import Image from "next/image";
import { ArrowUpRight } from "lucide-react";
import { useLang } from "@/context/LangContext";
import RevealWords from "@/components/RevealWords";
import SpecLabel from "@/components/SpecLabel";
import { BookingIllustration, QuoteIllustration, ReviewIllustration, SiteIllustration } from "./Illustrations";

// The sections that belong to /local-business alone. Every word comes from the page's translations
// (src/i18n/local-business), so they follow the visitor's language like the rest of the page.

const h2Style = { fontFamily: "var(--font-poppins)", fontWeight: 700, fontSize: "clamp(28px, 3.5vw, 48px)", letterSpacing: "-1px", lineHeight: 1.05, textTransform: "uppercase", color: "var(--fg)" } as const;
const bodyStyle = { fontFamily: "var(--font-inter)", fontSize: 14, lineHeight: 1.65, letterSpacing: "-0.2px", color: "var(--fg-secondary)", margin: 0, maxWidth: 520 } as const;
const chip = { fontFamily: "var(--font-mono)", fontWeight: 400, fontSize: 10, letterSpacing: "0.8px", textTransform: "uppercase", color: "var(--fg-secondary)", background: "rgba(var(--ink), 0.04)", border: "1px solid rgba(var(--ink), 0.08)", padding: "3px 9px" } as const;
const cardTitle = { fontFamily: "var(--font-poppins)", fontWeight: 700, fontSize: "clamp(15px, 1.2vw, 18px)", letterSpacing: "-0.4px", textTransform: "uppercase", color: "var(--fg)", margin: 0 } as const;

const SYSTEMS = [
  { key: "book", tags: ["clinics", "salons"], illo: <BookingIllustration />, tall: false },
  { key: "quote", tags: ["trades", "services"], illo: <QuoteIllustration />, tall: false },
  { key: "review", tags: ["any"], illo: <ReviewIllustration />, tall: true },
  { key: "site", tags: ["site"], illo: <SiteIllustration />, tall: true },
];

// Same layout as the homepage's "Selected work" grid, with an animated illustration for each system.
export function Systems() {
  const { t } = useLang();
  return (
    <section id="work" style={{ width: "100%", maxWidth: 1200, margin: "0 auto", padding: "80px 20px" }}>
      <SpecLabel text={t("lb.sys.eyebrow")} />
      <div className="lb-sec-head" style={{ marginBottom: 48 }}>
        <h2 style={h2Style}>
          <RevealWords text={t("lb.sys.h1")} />{" "}
          <span style={{ color: "rgb(163,163,163)" }}><RevealWords text={t("lb.sys.h2")} delay={0.1} /></span>
        </h2>
      </div>
      <div className="lb-grid">
        {SYSTEMS.map((s) => (
          <article key={s.key} data-reveal>
            <div className={`lb-illo${s.tall ? " lb-illo-tall" : ""}`}>{s.illo}</div>
            <div style={{ paddingTop: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
                <h3 style={cardTitle}>{t(`lb.sys.${s.key}.title`)}</h3>
                {s.tags.map((tag) => <span key={tag} style={chip}>{t(`lb.tag.${tag}`)}</span>)}
              </div>
              <p style={bodyStyle}>{t(`lb.sys.${s.key}.detail`)}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

// The payment terms, under the pricing: 70% / 30% / 2 weeks
export function TermsStrip() {
  const { t } = useLang();
  const terms = [
    { big: "70%", text: t("lb.terms.t0") },
    { big: "30%", text: t("lb.terms.t1") },
    { big: t("lb.terms.big2"), text: t("lb.terms.t2") },
  ];
  return (
    <div className="lb-terms-wrap">
      <div data-reveal className="lb-terms">
        {terms.map((term) => (
          <div key={term.text} style={{ padding: "24px", background: "var(--bg)", display: "grid", gap: 8 }}>
            <span style={{ fontFamily: "var(--font-poppins)", fontWeight: 700, fontSize: 28, letterSpacing: "-1px", lineHeight: 1, color: "var(--fg)" }}>{term.big}</span>
            <span style={{ fontFamily: "var(--font-inter)", fontWeight: 600, fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--fg-muted)" }}>{term.text}</span>
          </div>
        ))}
      </div>
    </div>
  );
}

const CONCEPTS = [
  { key: "datum", name: "Datum Build Co.", url: "https://datum-build.vercel.app/", image: "/local/concept-datum.webp" },
  { key: "calder", name: "Calder Health", url: "https://calder-health.vercel.app/", image: "/local/concept-calder.webp" },
];

// Practice sites, clearly marked as concepts (not past clients), for niches without client work to show.
export function ConceptWork() {
  const { t } = useLang();
  return (
    <section id="concept" style={{ width: "100%", maxWidth: 1200, margin: "0 auto", padding: "80px 20px" }}>
      <SpecLabel text={t("lb.concept.eyebrow")} />
      <div className="lb-head lb-sec-head" style={{ marginBottom: 48 }}>
        <div>
          <h2 style={h2Style}>
            <RevealWords text={t("lb.concept.h1")} />{" "}
            <span style={{ color: "rgb(163,163,163)" }}><RevealWords text={t("lb.concept.h2")} delay={0.1} /></span>
          </h2>
        </div>
        <p data-reveal style={{ ...bodyStyle, fontSize: 15, flex: "1 1 280px", maxWidth: 440 }}>{t("lb.concept.desc")}</p>
      </div>
      <div className="lb-concepts">
        {CONCEPTS.map((c) => (
          <article key={c.key} data-reveal>
            <a href={c.url} target="_blank" rel="noopener noreferrer" data-track-location={`concept_${c.key}`} className="lb-browser" aria-label={`${c.name}: ${t("lb.concept.cta")}`}>
              <span className="lb-browser-bar" aria-hidden="true">
                <i /><i /><i />
                <em>{c.url.replace(/^https:\/\//, "").replace(/\/$/, "")}</em>
              </span>
              <span className="lb-browser-shot">
                <Image src={c.image} alt={`${c.name} (${t(`lb.concept.${c.key}.type`)})`} width={1200} height={750} sizes="(max-width: 860px) 100vw, 580px" />
              </span>
            </a>
            <div style={{ paddingTop: 24 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
                <h3 style={cardTitle}>{c.name}</h3>
                <span style={{ ...chip, color: "var(--accent-purple)", borderColor: "rgba(109,40,217,0.3)", background: "rgba(109,40,217,0.06)" }}>{t("lb.concept.label")}</span>
                <span style={chip}>{t(`lb.concept.${c.key}.type`)}</span>
              </div>
              <p style={{ ...bodyStyle, marginBottom: 16 }}>{t(`lb.concept.${c.key}.desc`)}</p>
              <a href={c.url} target="_blank" rel="noopener noreferrer" data-track-location={`concept_${c.key}`} className="lb-concept-link">
                {t("lb.concept.cta")} <ArrowUpRight size={15} strokeWidth={2.2} aria-hidden="true" />
              </a>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}
