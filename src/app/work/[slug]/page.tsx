import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowRight, ArrowUpRight } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { caseStudies, publishedStudies, studyBySlug } from "@/data/caseStudies";

type Params = { slug: string };

// Every case study gets a page, drafts included, so they can be previewed before publishing.
export function generateStaticParams(): Params[] {
  return caseStudies.map(s => ({ slug: s.slug }));
}
export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const study = studyBySlug((await params).slug);
  if (!study) return {};
  const title = `${study.title} case study | Samuel Adefila, Web Developer`;
  return {
    title,
    description: study.summary,
    alternates: { canonical: `https://adefilasamuel.com/work/${study.slug}` },
    openGraph: { title, description: study.summary, images: [study.cover], type: "article" },
    robots: study.published ? undefined : { index: false, follow: false },
  };
}

const label = {
  fontFamily: "var(--font-inter)", fontWeight: 600, fontSize: 11,
  letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--fg-muted)",
} as const;
const body = {
  fontFamily: "var(--font-inter)", fontSize: 16, lineHeight: 1.7,
  letterSpacing: "-0.2px", color: "var(--fg-secondary)", margin: 0,
} as const;
const sectionTitle = {
  fontFamily: "var(--font-poppins)", fontWeight: 700, fontSize: "clamp(22px, 2.4vw, 32px)",
  letterSpacing: "-0.03em", lineHeight: 1.1, textTransform: "uppercase", color: "var(--fg)", margin: 0,
} as const;
const wrap = { maxWidth: 1200, margin: "0 auto", padding: "0 20px" } as const;

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section style={{ ...wrap, paddingTop: 72 }}>
      <div className="cs-row" style={{ display: "grid", gridTemplateColumns: "minmax(0, 1fr) minmax(0, 2fr)", gap: 32, borderTop: "1px solid rgba(0,0,0,0.08)", paddingTop: 32 }}>
        <h2 style={sectionTitle}>{title}</h2>
        <div style={{ display: "grid", gap: 16, minWidth: 0 }}>{children}</div>
      </div>
    </section>
  );
}

export default async function CaseStudyPage({ params }: { params: Promise<Params> }) {
  const study = studyBySlug((await params).slug);
  if (!study) notFound();

  // Next project: the following published study (or, while previewing a draft, any study).
  const pool = publishedStudies.length > 1 ? publishedStudies : caseStudies;
  const next = pool[(pool.findIndex(s => s.slug === study.slug) + 1) % pool.length];
  const facts = [
    ["Client", study.client],
    ["Role", study.role],
    ["Timeline", study.timeline],
    ["Year", study.year],
  ].filter(([, v]) => v) as [string, string][];

  return (
    <main style={{ background: "var(--bg)", minHeight: "100vh", width: "100%", overflowX: "hidden" }}>
      <Navbar />

      {!study.published && (
        <div style={{ position: "fixed", left: 16, bottom: 16, zIndex: 60, background: "#d97706", color: "#fff", fontFamily: "var(--font-inter)", fontWeight: 600, fontSize: 12, padding: "8px 12px" }}>
          Draft: hidden from Google and not linked from the site
        </div>
      )}

      {/* Hero */}
      <header style={{ ...wrap, paddingTop: 150 }}>
        <Link href="/#work" style={{ ...label, color: "var(--fg-secondary)", textDecoration: "none", display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 32 }}>
          <ArrowLeft size={13} strokeWidth={2} /> All work
        </Link>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginBottom: 20 }}>
          {study.tags.map(tag => (
            <span key={tag} style={{ ...label, fontSize: 10, color: "var(--fg-secondary)", background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.08)", padding: "3px 9px" }}>{tag}</span>
          ))}
        </div>
        <h1 style={{ fontFamily: "var(--font-poppins)", fontWeight: 700, fontSize: "clamp(40px, 7vw, 96px)", letterSpacing: "-0.045em", lineHeight: 1, textTransform: "uppercase", color: "var(--fg)", margin: "0 0 24px" }}>
          {study.title}
        </h1>
        <p style={{ ...body, fontSize: 18, maxWidth: 640, marginBottom: 40 }}>{study.summary}</p>

        <div className="cs-facts" style={{ display: "grid", gridTemplateColumns: `repeat(${facts.length + (study.liveUrl ? 1 : 0)}, minmax(0, 1fr))`, gap: 24, borderTop: "1px solid rgba(0,0,0,0.08)", paddingTop: 24 }}>
          {facts.map(([k, v]) => (
            <div key={k} style={{ display: "grid", gap: 6, minWidth: 0 }}>
              <span style={label}>{k}</span>
              <span style={{ fontFamily: "var(--font-inter)", fontWeight: 500, fontSize: 15, color: "var(--fg)" }}>{v}</span>
            </div>
          ))}
          {study.liveUrl && (
            <div style={{ display: "grid", gap: 6, minWidth: 0 }}>
              <span style={label}>Live site</span>
              <a href={study.liveUrl} target="_blank" rel="noopener noreferrer" style={{ fontFamily: "var(--font-inter)", fontWeight: 600, fontSize: 15, color: "var(--fg)", display: "inline-flex", alignItems: "center", gap: 4, overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>
                Visit <ArrowUpRight size={14} strokeWidth={2} />
              </a>
            </div>
          )}
        </div>
      </header>

      {/* Cover */}
      <div style={{ ...wrap, paddingTop: 48 }}>
        <div style={{ position: "relative", width: "100%", aspectRatio: "1600/840", overflow: "hidden", boxShadow: "0 8px 32px rgba(0,0,0,0.08)", background: "var(--card-bg)" }}>
          <Image src={study.cover} alt={`${study.title} website`} fill priority sizes="(max-width: 1240px) 100vw, 1200px" style={{ objectFit: "cover", objectPosition: "top center" }} />
        </div>
      </div>

      {study.stack?.length ? (
        <div style={{ ...wrap, paddingTop: 24, display: "flex", flexWrap: "wrap", gap: 8, alignItems: "center" }}>
          <span style={{ ...label, marginRight: 4 }}>Built with</span>
          {study.stack.map(s => (
            <span key={s} style={{ fontFamily: "var(--font-inter)", fontWeight: 500, fontSize: 13, color: "var(--fg)", border: "1px solid rgba(0,0,0,0.12)", padding: "5px 10px" }}>{s}</span>
          ))}
        </div>
      ) : null}

      {study.brief?.length ? (
        <Section title="The brief">
          {study.brief.map((p, i) => <p key={i} style={body}>{p}</p>)}
        </Section>
      ) : null}

      {study.built?.length || study.features?.length ? (
        <Section title="What I built">
          {study.built?.map((p, i) => <p key={i} style={body}>{p}</p>)}
          {study.features?.length ? (
            <ul style={{ listStyle: "none", margin: "8px 0 0", padding: 0, display: "grid", gap: 10 }}>
              {study.features.map(f => (
                <li key={f} style={{ ...body, color: "var(--fg)", display: "flex", gap: 12, alignItems: "baseline" }}>
                  <span aria-hidden style={{ width: 6, height: 6, background: "var(--accent-green)", flexShrink: 0, transform: "translateY(-2px)" }} />
                  {f}
                </li>
              ))}
            </ul>
          ) : null}
        </Section>
      ) : null}

      {study.results?.length ? (
        <Section title="Results">
          <div className="cs-results" style={{ display: "grid", gridTemplateColumns: `repeat(${Math.min(3, study.results.length)}, minmax(0, 1fr))`, gap: 16 }}>
            {study.results.map(r => (
              <div key={r.label} style={{ background: "var(--white)", border: "1px solid rgba(0,0,0,0.07)", padding: 24, display: "grid", gap: 6 }}>
                <span style={{ fontFamily: "var(--font-poppins)", fontWeight: 700, fontSize: "clamp(32px, 3.4vw, 48px)", letterSpacing: "-0.04em", lineHeight: 1, color: "var(--fg)" }}>{r.value}</span>
                <span style={{ ...body, fontSize: 14 }}>{r.label}</span>
              </div>
            ))}
          </div>
        </Section>
      ) : null}

      {study.quote ? (
        <section style={{ ...wrap, paddingTop: 72 }}>
          <figure style={{ margin: 0, background: "var(--fg)", color: "var(--white)", padding: "clamp(28px, 5vw, 56px)" }}>
            <blockquote style={{ margin: 0, fontFamily: "var(--font-poppins)", fontWeight: 600, fontSize: "clamp(20px, 2.4vw, 30px)", lineHeight: 1.3, letterSpacing: "-0.02em" }}>
              &ldquo;{study.quote.text}&rdquo;
            </blockquote>
            <figcaption style={{ marginTop: 20, fontFamily: "var(--font-inter)", fontSize: 14, color: "rgba(255,255,255,0.7)" }}>
              {study.quote.name}{study.quote.role ? `, ${study.quote.role}` : ""}
            </figcaption>
          </figure>
        </section>
      ) : null}

      {study.gallery?.length ? (
        <section style={{ ...wrap, paddingTop: 72, display: "grid", gap: 24 }}>
          {study.gallery.map(g => (
            <figure key={g.src} style={{ margin: 0 }}>
              <div style={{ position: "relative", width: "100%", aspectRatio: "1600/840", overflow: "hidden", background: "var(--card-bg)" }}>
                <Image src={g.src} alt={g.alt} fill sizes="(max-width: 1240px) 100vw, 1200px" style={{ objectFit: "cover", objectPosition: "top center" }} />
              </div>
              {g.caption && <figcaption style={{ ...body, fontSize: 13, marginTop: 10 }}>{g.caption}</figcaption>}
            </figure>
          ))}
        </section>
      ) : null}

      {/* Next project */}
      {next && next.slug !== study.slug && (
        <section style={{ ...wrap, padding: "96px 20px 96px" }}>
          <Link href={`/work/${next.slug}`} style={{ display: "flex", alignItems: "center", justifyContent: "space-between", gap: 24, borderTop: "1px solid rgba(0,0,0,0.08)", paddingTop: 32, textDecoration: "none", color: "var(--fg)" }}>
            <span style={{ display: "grid", gap: 8, minWidth: 0 }}>
              <span style={label}>Next project</span>
              <span style={{ fontFamily: "var(--font-poppins)", fontWeight: 700, fontSize: "clamp(28px, 4vw, 56px)", letterSpacing: "-0.04em", lineHeight: 1, textTransform: "uppercase" }}>{next.title}</span>
            </span>
            <span style={{ width: 56, height: 56, flexShrink: 0, display: "grid", placeItems: "center", background: "var(--fg)", color: "var(--white)" }}>
              <ArrowRight size={20} strokeWidth={2} />
            </span>
          </Link>
        </section>
      )}
      {(!next || next.slug === study.slug) && <div style={{ height: 96 }} />}

      <Footer />
    </main>
  );
}
