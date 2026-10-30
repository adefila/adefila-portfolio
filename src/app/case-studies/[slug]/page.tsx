import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowLeft, ArrowUpRight, CalendarDays } from "lucide-react";
import Navbar from "@/components/Navbar";
import SpecLabel from "@/components/SpecLabel";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import SpecNumbers from "@/components/SpecNumbers";
import ScrollRuler from "@/components/ScrollRuler";
import SectionTitles from "@/components/SectionTitles";
import MagneticButtons from "@/components/MagneticButtons";
import ClickTracking from "@/components/ClickTracking";
import BookingPopup from "@/components/BookingPopup";
import ScrollShot from "@/components/case/ScrollShot";
import CountUp from "@/components/case/CountUp";
import { BOOKING_URL } from "@/lib/booking";
import { CASE_STUDY_DATA, getCaseStudy } from "@/lib/caseStudyData";

// One template for the case studies that have a page (src/lib/caseStudyData.ts). The DLP Africa page is its own file.
export function generateStaticParams() {
  return CASE_STUDY_DATA.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const c = getCaseStudy((await params).slug);
  if (!c) return {};
  const url = `https://adefilasamuel.com/case-studies/${c.slug}`;
  return {
    title: `${c.client} case study | Samuel Adefila`,
    description: c.description,
    alternates: { canonical: url },
    openGraph: { title: `${c.client} case study | Samuel Adefila`, description: c.description, type: "article", url },
  };
}

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const c = getCaseStudy((await params).slug);
  if (!c) notFound();

  return (
    <main style={{ background: "var(--bg)", minHeight: "100vh", overflowX: "clip", width: "100%" }}>
      <ScrollReveal />
      <SpecNumbers />
      <ScrollRuler />
      <SectionTitles />
      <MagneticButtons />
      <ClickTracking />
      <BookingPopup />
      <Navbar />

      <header className="cs-hero">
        <div className="cs-wrap">
          <Link href="/#work" className="cs-back">
            <ArrowLeft size={14} strokeWidth={2} /> All work
          </Link>
          <p className="cs-eyebrow cs-in" style={{ ["--d" as string]: "0.1s" }}>Case study · {c.industry}</p>
          <h1 className="cs-title cs-title-sm cs-line" style={{ ["--d" as string]: "0.2s" }}>{c.title}</h1>
          <p className="cs-lede cs-in" style={{ ["--d" as string]: "0.5s" }}>{c.lede}</p>

          <dl className="cs-facts">
            {c.facts.map(([k, v], i) => (
              <div key={k} className="cs-in" style={{ ["--d" as string]: `${0.65 + i * 0.07}s` }}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>

          <div className="cs-actions cs-in" style={{ ["--d" as string]: "1.1s" }}>
            {c.site && (
              <a href={c.site} target="_blank" rel="noopener noreferrer" data-track-location={`case_${c.slug}_visit`} className="btn-ticks cs-btn-quiet">
                Visit {c.site.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")} <ArrowUpRight size={15} strokeWidth={2} />
              </a>
            )}
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" data-track-location={`case_${c.slug}_book`} className="btn-primary cs-btn">
              Book a free call <CalendarDays size={15} strokeWidth={2} />
            </a>
          </div>

          {c.hero.kind === "site" ? (
            <figure className="cs-frame hero-scan" style={{ ["--hero-delay" as string]: "0.9s" }}>
              <span className="cs-frame-bar" aria-hidden="true"><i /><i /><i /></span>
              <div className="cs-crop" style={{ aspectRatio: "1400 / 875" }}>
                <Image src={c.hero.src} alt={c.hero.alt} width={c.hero.width} height={c.hero.height} priority sizes="(max-width: 1240px) 92vw, 1200px" className="cs-shot" />
              </div>
            </figure>
          ) : (
            <figure className="cs-design hero-scan" style={{ background: c.hero.panel, ["--hero-delay" as string]: "0.9s" }}>
              <Image src={c.hero.src} alt={c.hero.alt} width={c.hero.size} height={c.hero.size} priority sizes="(max-width: 900px) 92vw, 640px" className="cs-design-img" />
            </figure>
          )}
        </div>
      </header>

      <div className="spec-rule" aria-hidden="true" />

      <section className="cs-section" aria-labelledby="cs-brief">
        <div className="cs-wrap cs-split">
          <div>
            <SpecLabel text="The brief" />
            <h2 id="cs-brief" className="cs-h2">{c.brief}</h2>
          </div>
          <div className="cs-prose" data-reveal>
            <p className="cs-prose-label">What I did</p>
            <p>{c.did}</p>
          </div>
        </div>
      </section>

      <div className="spec-rule" aria-hidden="true" />

      <section className="cs-section" aria-labelledby="cs-result">
        <div className="cs-wrap">
          <SpecLabel text="The result" />
          <h2 id="cs-result" className="cs-h2 cs-sr">The result</h2>
          <div className="cs-metric" data-reveal>
            <div className="cs-metric-n">
              {c.metric.value !== undefined ? <CountUp to={c.metric.value} prefix={c.metric.prefix} suffix={c.metric.suffix} /> : c.metric.text}
            </div>
            <p>{c.metric.label}</p>
          </div>

          {c.quote && (
            <figure className="cs-quote" data-reveal>
              <blockquote>&ldquo;{c.quote.text}&rdquo;</blockquote>
              <figcaption><strong>{c.quote.by}</strong> <span>{c.quote.role}</span></figcaption>
            </figure>
          )}

          {c.video && (
            <figure className="cs-video" data-reveal>
              <video controls preload="none" poster={c.video.poster} playsInline aria-label={`Video testimonial from ${c.video.by}, ${c.video.role}`}>
                <source src={c.video.src} type="video/mp4" />
              </video>
              <figcaption><strong>{c.video.by}</strong> <span>{c.video.role}</span></figcaption>
            </figure>
          )}
        </div>
      </section>

      {c.shots.length > 0 && (
        <>
          <div className="spec-rule" aria-hidden="true" />
          <section className="cs-section pp" aria-labelledby="cs-pages">
            <div className="cs-wrap">
              <SpecLabel text="The work" />
              <h2 id="cs-pages" className="cs-h2">{c.shotsTitle}</h2>
              <p className="cs-prose-line" data-reveal>{c.shotsIntro}</p>
            </div>
            <div className="pp-track" role="group" aria-label={c.shotsTitle}>
              {c.shots.map((s) => (
                <ScrollShot key={s.src} src={s.src} alt={`${c.client}: ${s.caption}`} width={s.width} height={s.height} caption={s.caption} />
              ))}
            </div>
          </section>
        </>
      )}


      <div className="spec-rule" aria-hidden="true" />
      <ContactForm />
      <div className="spec-rule" aria-hidden="true" />
      <Footer />
    </main>
  );
}
