import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import { ArrowRight, ArrowUpRight, CalendarDays } from "lucide-react";
import Navbar from "@/components/Navbar";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import ScrollRuler from "@/components/ScrollRuler";
import MagneticButtons from "@/components/MagneticButtons";
import ClickTracking from "@/components/ClickTracking";
import BookingPopup from "@/components/BookingPopup";
import ScrollShot from "@/components/case/ScrollShot";
import CountUp from "@/components/case/CountUp";
import DeviceStage from "@/components/case/DeviceStage";
import ProcessBoard from "@/components/case/ProcessBoard";
import VideoCard from "@/components/case/VideoCard";
import WorkShowcase from "@/components/case/WorkShowcase";
import ChapterNav, { type Chapter } from "@/components/case/ChapterNav";
import { BOOKING_URL } from "@/lib/booking";
import { CASE_STUDY_DATA, getCaseStudy, missingSections, type CaseMetric } from "@/lib/caseStudyData";
import { CASE_STUDIES, CASE_SUMMARY } from "@/lib/caseStudies";

// The one case study page. Every project is an entry in src/lib/caseStudyData.ts (the structure and rules are written at the top of
// that file) and is drawn here: an overview, a chapter bar, then the problem, the process, the decisions, the work, the result and
// the next case study.
export function generateStaticParams() {
  // The standard is enforced: a production build stops if a case study is missing a required section. Development only warns.
  const failures: string[] = [];
  for (const c of CASE_STUDY_DATA) {
    const gaps = missingSections(c);
    if (gaps.length) failures.push(`${c.slug}: ${gaps.join(", ")}`);
  }
  if (failures.length) {
    const message = `[case study] These pages do not meet the template yet.\n  ${failures.join("\n  ")}`;
    if (process.env.NODE_ENV === "production") throw new Error(message);
    console.warn(message);
  }
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

const CSS = `
  .v2-wrap { max-width: 1200px; margin: 0 auto; padding: 0 20px; }

  /* the chapter bar sits under the site navigation */
  .v2-chapters { position: sticky; top: 48px; z-index: 20; background: var(--bg); border-bottom: 1px solid rgba(var(--ink), 0.14); }
  .v2-chapters ul { list-style: none; margin: 0 auto; padding: 0 20px; max-width: 1200px; display: flex; gap: 28px; overflow-x: auto; scrollbar-width: none; }
  .v2-chapters a { display: block; padding: 14px 0 13px; font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.02em; text-transform: uppercase; color: var(--fg-muted); text-decoration: none; border-bottom: 2px solid transparent; white-space: nowrap; transition: color 0.2s ease; }
  .v2-chapters a:hover { color: var(--fg); }
  .v2-chapters a[aria-current="true"] { color: var(--fg); border-bottom-color: var(--accent-purple); }
  .v2-chapters a:focus-visible { outline: 2px solid var(--accent-purple); outline-offset: 2px; }
  .v2-progress { position: absolute; left: 0; right: 0; bottom: -1px; height: 1px; background: var(--accent-purple); transform-origin: left; }

  /* overview */
  .v2-hero { padding: 72px 0 0; }
  .v2-back { display: inline-flex; align-items: center; gap: 8px; font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.02em; text-transform: uppercase; color: var(--fg-secondary); text-decoration: none; }
  .v2-eyebrow { margin: 40px 0 0; font-family: var(--font-mono); font-size: 12px; letter-spacing: 0.02em; text-transform: uppercase; color: var(--accent-purple); }
  .v2-title { margin: 18px 0 0; max-width: 21ch; font-family: var(--font-poppins); font-weight: 400; font-size: clamp(34px, 5vw, 64px); letter-spacing: -0.04em; line-height: 1.02; color: var(--fg); }
  .v2-lede { margin: 28px 0 0; max-width: 58ch; font-family: var(--font-inter); font-size: 19px; line-height: 1.55; color: var(--fg-secondary); }
  .v2-numbers { display: flex; flex-wrap: wrap; gap: 0; margin-top: 56px; border-top: 1px solid rgba(var(--ink), 0.14); }
  .v2-num { flex: 1 1 220px; padding: 28px 28px 28px 0; }
  .v2-num + .v2-num { padding-left: 28px; border-left: 1px solid rgba(var(--ink), 0.14); }
  .v2-num b { display: block; font-family: var(--font-poppins); font-weight: 400; font-size: clamp(44px, 6vw, 80px); letter-spacing: -0.045em; line-height: 1; color: var(--fg); font-variant-numeric: tabular-nums; }
  .v2-num > span { display: block; margin-top: 12px; max-width: 30ch; font-family: var(--font-inter); font-size: 14px; line-height: 1.5; color: var(--fg-secondary); }
  .v2-glance { display: grid; grid-template-columns: repeat(6, minmax(0, 1fr)); margin: 0; border-top: 1px solid rgba(var(--ink), 0.14); border-bottom: 1px solid rgba(var(--ink), 0.14); }
  .v2-glance div { padding: 18px 16px 18px 0; }
  .v2-glance div + div { padding-left: 16px; border-left: 1px solid rgba(var(--ink), 0.14); }
  .v2-glance dt { font-family: var(--font-mono); font-size: 10px; letter-spacing: 0.02em; text-transform: uppercase; color: var(--fg-muted); }
  .v2-glance dd { margin: 6px 0 0; font-family: var(--font-inter); font-size: 14px; line-height: 1.4; color: var(--fg); }
  .v2-actions { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 32px; }
  .v2-visual { margin: 56px 0 0; display: flex; justify-content: center; padding: clamp(24px, 5vw, 56px); background: var(--surface); border: 1px solid rgba(var(--ink), 0.14); }
  .v2-visual img { display: block; width: 100%; max-width: 620px; height: auto; }
  .v2-site { margin: 56px 0 0; border: 1px solid rgba(var(--ink), 0.14); background: var(--surface); }
  .v2-site img { display: block; width: 100%; height: auto; }
  .v2-devices { margin-top: 56px; }

  /* chapters: a short label on the left, the content on the right */
  .v2-sec { scroll-margin-top: 110px; display: grid; grid-template-columns: 200px minmax(0, 1fr); column-gap: clamp(32px, 6vw, 88px); padding: 104px 0; border-top: 1px solid rgba(var(--ink), 0.14); }
  .v2-rail { align-self: start; position: sticky; top: 120px; font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.02em; text-transform: uppercase; color: var(--fg-secondary); }
  .v2-rail b { display: block; margin-bottom: 8px; font-weight: 500; color: var(--accent-purple); }
  .v2-body { min-width: 0; }
  .v2-h2 { margin: 0; max-width: 22ch; font-family: var(--font-poppins); font-weight: 400; font-size: clamp(26px, 3.2vw, 40px); letter-spacing: -0.035em; line-height: 1.08; color: var(--fg); }
  .v2-statement { margin: 0; max-width: 30ch; font-family: var(--font-poppins); font-weight: 400; font-size: clamp(24px, 2.8vw, 36px); letter-spacing: -0.03em; line-height: 1.2; color: var(--fg); }
  .v2-p { margin: 0; max-width: 62ch; font-family: var(--font-inter); font-size: 17px; line-height: 1.7; color: var(--fg-secondary); }
  .v2-sub { margin: 48px 0 12px; font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.02em; text-transform: uppercase; color: var(--accent-purple); }

  /* process: one line down the left with a square at each step */
  .v2-steps { list-style: none; margin: 48px 0 0; padding: 0; }
  .v2-step { position: relative; padding: 0 0 56px 40px; border-left: 1px solid rgba(var(--ink), 0.2); margin-left: 5px; }
  .v2-step:last-child { padding-bottom: 0; border-left-color: transparent; }
  .v2-step::before { content: ""; position: absolute; left: -6px; top: 6px; width: 11px; height: 11px; background: var(--bg); border: 1px solid var(--accent-purple); }
  .v2-step-n { font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.02em; color: var(--accent-purple); }
  .v2-step h3 { margin: 6px 0 0; font-family: var(--font-poppins); font-weight: 400; font-size: clamp(20px, 2vw, 26px); letter-spacing: -0.03em; line-height: 1.15; color: var(--fg); }
  .v2-step-lead { margin: 12px 0 0; max-width: 46ch; font-family: var(--font-inter); font-size: 18px; line-height: 1.45; color: var(--fg); }
  .v2-step-text { margin: 10px 0 0; max-width: 62ch; font-family: var(--font-inter); font-size: 15px; line-height: 1.7; color: var(--fg-secondary); }
  .v2-tags { list-style: none; margin: 16px 0 0; padding: 0; display: flex; flex-wrap: wrap; gap: 6px; }
  .v2-tags li { padding: 4px 9px; border: 1px solid rgba(var(--ink), 0.2); font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.02em; text-transform: uppercase; color: var(--fg-secondary); }

  /* decisions: three columns divided by hairlines */
  .v2-decs { display: grid; grid-template-columns: repeat(3, minmax(0, 1fr)); margin-top: 48px; border-top: 1px solid rgba(var(--ink), 0.14); }
  .v2-dec { padding: 28px 28px 8px 0; }
  .v2-dec + .v2-dec { padding-left: 28px; border-left: 1px solid rgba(var(--ink), 0.14); }
  .v2-dec h3 { margin: 0; font-family: var(--font-poppins); font-weight: 400; font-size: 20px; letter-spacing: -0.025em; line-height: 1.25; color: var(--fg); }
  .v2-dec p { margin: 12px 0 0; font-family: var(--font-inter); font-size: 15px; line-height: 1.65; color: var(--fg-secondary); }

  /* the work: stills of the app, then the pages */
  .v2-stills { display: grid; grid-template-columns: repeat(2, minmax(0, 1fr)); gap: 24px; }
  .v2-still { margin: 0; }
  .v2-still div { border: 1px solid rgba(var(--ink), 0.14); background: var(--surface); }
  .v2-still img { display: block; width: 100%; height: auto; }
  .v2-still figcaption { margin-top: 12px; font-family: var(--font-inter); font-size: 14px; line-height: 1.5; color: var(--fg-secondary); }

  /* result: the outcome in one sentence, then the proof in numbers beside the client's own voice */
  .v2-res { display: grid; grid-template-columns: minmax(0, 1fr) minmax(0, 440px); gap: clamp(32px, 6vw, 88px); align-items: start; margin-top: 64px; }
  .v2-proof { padding: 28px 0; border-top: 1px solid rgba(var(--ink), 0.14); }
  .v2-proof b { display: block; font-family: var(--font-poppins); font-weight: 400; font-size: clamp(56px, 7vw, 96px); letter-spacing: -0.045em; line-height: 1; color: var(--fg); font-variant-numeric: tabular-nums; }
  .v2-proof > span { display: block; margin-top: 12px; max-width: 32ch; font-family: var(--font-inter); font-size: 15px; line-height: 1.5; color: var(--fg-secondary); }
  .v2-ask { display: inline-flex; align-items: center; gap: 10px; margin-top: 12px; padding: 18px 0 0; border-top: 1px solid rgba(var(--ink), 0.14); width: 100%; font-family: var(--font-inter); font-size: 15px; color: var(--fg); text-decoration: none; }
  .v2-ask:hover { color: var(--accent-purple); }
  .v2-ask:focus-visible { outline: 2px solid var(--accent-purple); outline-offset: 4px; }
  .v2-pull { margin: 0; padding: 4px 0 0 24px; border-left: 2px solid var(--accent-purple); }
  .v2-pull blockquote { margin: 0; font-family: var(--font-poppins); font-weight: 400; font-size: clamp(22px, 2.4vw, 30px); letter-spacing: -0.02em; line-height: 1.35; color: var(--fg); }
  .v2-pull figcaption { margin-top: 20px; font-family: var(--font-inter); font-size: 14px; color: var(--fg-secondary); }
  .v2-pull strong { display: block; color: var(--fg); font-weight: 600; }
  .v2-closing { margin: 0; max-width: 40ch; font-family: var(--font-inter); font-size: 17px; line-height: 1.65; color: var(--fg-secondary); }
  .v2-closing-links { display: flex; flex-wrap: wrap; gap: 12px; margin-top: 24px; }

  /* what comes next */
  .v2-next { display: block; padding: 48px 0 0; border-top: 1px solid rgba(var(--ink), 0.14); color: var(--fg); text-decoration: none; }
  .v2-next small { display: block; font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.02em; text-transform: uppercase; color: var(--fg-secondary); }
  .v2-next strong { display: flex; align-items: center; justify-content: space-between; gap: 24px; margin-top: 16px; font-family: var(--font-poppins); font-weight: 400; font-size: clamp(30px, 5vw, 64px); letter-spacing: -0.04em; line-height: 1.05; transition: color 0.2s ease; }
  .v2-next:hover strong { color: var(--accent-purple); }
  .v2-next span { display: block; margin-top: 12px; font-family: var(--font-inter); font-size: 16px; color: var(--fg-secondary); }
  .v2-next:focus-visible { outline: 2px solid var(--accent-purple); outline-offset: 4px; }

  @media (max-width: 900px) {
    .v2-glance { grid-template-columns: repeat(2, minmax(0, 1fr)); }
    .v2-glance div:nth-child(odd) { padding-left: 0; border-left: 0; }
    .v2-glance div:nth-child(n+3) { border-top: 1px solid rgba(var(--ink), 0.14); }
    .v2-sec { grid-template-columns: minmax(0, 1fr); row-gap: 28px; padding: 72px 0; }
    .v2-rail { position: static; }
    .v2-res { grid-template-columns: minmax(0, 1fr); }
    .v2-num + .v2-num { padding-left: 0; border-left: 0; border-top: 1px solid rgba(var(--ink), 0.14); }
    .v2-decs { grid-template-columns: minmax(0, 1fr); }
    .v2-dec, .v2-dec + .v2-dec { padding: 24px 0 8px; border-left: 0; }
    .v2-dec + .v2-dec { border-top: 1px solid rgba(var(--ink), 0.14); }
    .v2-stills { grid-template-columns: minmax(0, 1fr); }
  }
`;

const stat = (m: CaseMetric) => (m.value !== undefined ? <CountUp to={m.value} prefix={m.prefix} suffix={m.suffix} /> : m.text);

export default async function CaseStudyPage({ params }: { params: Promise<{ slug: string }> }) {
  const c = getCaseStudy((await params).slug);
  if (!c) notFound();

  const order = Object.entries(CASE_STUDIES);
  const here = order.findIndex(([, path]) => path.endsWith(`/${c.slug}`));
  const [nextName, nextPath] = order[(here + 1) % order.length];
  const metrics = [c.metric, ...(c.extraMetrics ?? [])];
  const hasWork = !!c.work?.items.length || !!c.stills?.length || c.shots.length > 0;

  const chapters: Chapter[] = [
    { id: "v2-top", label: "Overview" },
    { id: "v2-problem", label: "The problem" },
    ...(c.process ? [{ id: "v2-process", label: "Process" }] : []),
    ...(c.decisions?.length ? [{ id: "v2-decisions", label: "Decisions" }] : []),
    ...(hasWork ? [{ id: "v2-work", label: "The work" }] : []),
    { id: "v2-result", label: "Result" },
    ...(c.reflection ? [{ id: "v2-reflection", label: "Reflection" }] : []),
    { id: "v2-next", label: "Next" },
  ];
  let n = 1;
  const num = () => String(++n).padStart(2, "0");

  return (
    <main style={{ background: "var(--bg)", minHeight: "100vh", overflowX: "clip", width: "100%" }}>
      <style>{CSS}</style>
      <ScrollReveal />
      <ScrollRuler />
      <MagneticButtons />
      <ClickTracking />
      <BookingPopup />
      <Navbar />

      <ChapterNav chapters={chapters} />

      <header id="v2-top" className="v2-hero">
        <div className="v2-wrap">
          <Link href="/#work" className="v2-back"><ArrowRight size={14} style={{ transform: "rotate(180deg)" }} /> All work</Link>
          <p className="v2-eyebrow">Case study · {c.industry}</p>
          <h1 className="v2-title">{c.title}</h1>
          <p className="v2-lede">{c.lede}</p>

          <div className="v2-numbers">
            {metrics.map((m) => (
              <div key={m.label} className="v2-num">
                <b>{stat(m)}</b>
                <span>{m.label}</span>
              </div>
            ))}
          </div>

          <dl className="v2-glance">
            {c.facts.map(([k, v]) => (
              <div key={k}><dt>{k}</dt><dd>{v}</dd></div>
            ))}
          </dl>

          <div className="v2-actions">
            {c.site && (
              <a href={c.site} target="_blank" rel="noopener noreferrer" data-track-location={`case_${c.slug}_visit`} className="btn-ticks cs-btn-quiet">
                Visit {c.site.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")} <ArrowUpRight size={15} strokeWidth={2} />
              </a>
            )}
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" data-track-location={`case_${c.slug}_book`} className="btn-primary cs-btn">
              Book a free call <CalendarDays size={15} strokeWidth={2} />
            </a>
          </div>

          {c.hero.kind === "design" && (
            <figure className="v2-visual" style={{ background: c.hero.panel }}>
              <Image src={c.hero.src} alt={c.hero.alt} width={c.hero.size} height={c.hero.size} priority sizes="(max-width: 900px) 92vw, 620px" />
            </figure>
          )}
          {c.hero.kind === "site" && (
            <figure className="v2-site">
              <Image src={c.hero.src} alt={c.hero.alt} width={c.hero.width} height={c.hero.height} priority sizes="(max-width: 1240px) 92vw, 1160px" />
            </figure>
          )}
          {c.hero.kind === "devices" && (
            <div className="v2-devices"><DeviceStage priority laptop={c.hero.laptop} phones={c.hero.phones} /></div>
          )}
        </div>
      </header>

      <div className="v2-wrap" style={{ marginTop: 104 }}>
        <section id="v2-problem" className="v2-sec" aria-labelledby="v2-problem-h">
          <div className="v2-rail"><b>{num()}</b>The problem</div>
          <div className="v2-body">
            <h2 id="v2-problem-h" className="v2-statement" data-reveal>{c.brief}</h2>
            <p className="v2-sub">What I did</p>
            <p className="v2-p" data-reveal>{c.did}</p>
            {c.constraint && (<><p className="v2-sub">The constraint</p><p className="v2-p">{c.constraint}</p></>)}
          </div>
        </section>
      </div>

      {c.process && (
        <>
          <div className="v2-wrap">
            <section id="v2-process" className="v2-sec" aria-labelledby="v2-process-h">
              <div className="v2-rail"><b>{num()}</b>Process</div>
              <div className="v2-body">
                <h2 id="v2-process-h" className="v2-h2" data-reveal>{c.process.title}</h2>
                <p className="v2-p" style={{ marginTop: 20 }} data-reveal>{c.process.intro}</p>
                <ol className="v2-steps">
                  {c.process.steps.map((s, i) => (
                    <li key={s.title} className="v2-step" data-reveal>
                      <span className="v2-step-n">{String(i + 1).padStart(2, "0")}</span>
                      <h3>{s.title}</h3>
                      {s.lead && <p className="v2-step-lead">{s.lead}</p>}
                      <p className="v2-step-text">{s.text}</p>
                      {s.tags && <ul className="v2-tags" aria-label="Covers">{s.tags.map((t) => <li key={t}>{t}</li>)}</ul>}
                    </li>
                  ))}
                </ol>
              </div>
            </section>
          </div>
          {c.process.board && <ProcessBoard screens={c.process.board} label={`${c.client} screens`} />}
        </>
      )}

      {c.decisions && c.decisions.length > 0 && (
        <div className="v2-wrap">
          <section id="v2-decisions" className="v2-sec" aria-labelledby="v2-decisions-h">
            <div className="v2-rail"><b>{num()}</b>Decisions</div>
            <div className="v2-body">
              <h2 id="v2-decisions-h" className="v2-h2" data-reveal>What mattered.</h2>
              <div className="v2-decs">
                {c.decisions.map((d) => (
                  <article key={d.title} className="v2-dec" data-reveal>
                    <h3>{d.title}</h3>
                    <p>{d.body}</p>
                  </article>
                ))}
              </div>
            </div>
          </section>
        </div>
      )}

      {hasWork && (
        <div className="v2-wrap">
          <section id="v2-work" className="v2-sec" aria-labelledby="v2-work-h">
            <div className="v2-rail"><b>{num()}</b>The work</div>
            <div className="v2-body">
              {c.stills?.length ? (
                <>
                  <h2 id="v2-work-h" className="v2-h2" data-reveal>What the client sees.</h2>
                  <div className="v2-stills" style={{ marginTop: 40 }}>
                    {c.stills.map((s) => (
                      <figure key={s.src} className="v2-still" data-reveal>
                        <div><Image src={s.src} alt={s.alt} width={s.width} height={s.height} sizes="(max-width: 900px) 92vw, 480px" /></div>
                        <figcaption>{s.caption}</figcaption>
                      </figure>
                    ))}
                  </div>
                </>
              ) : (
                <h2 id="v2-work-h" className="v2-h2" data-reveal>{c.work?.title ?? c.shotsTitle}</h2>
              )}
              {c.work && (
                <>
                  {c.stills?.length ? <h2 className="v2-h2" style={{ marginTop: 96 }} data-reveal>{c.work.title}</h2> : null}
                  <p className="v2-p" style={{ marginTop: 20 }}>{c.work.intro}</p>
                </>
              )}
            </div>
            {c.work && <div style={{ gridColumn: "1 / -1" }}><WorkShowcase items={c.work.items} label={`${c.client} pages`} /></div>}
            {!c.work && c.shots.length > 0 && (
              <div style={{ gridColumn: "1 / -1", display: "flex", gap: 24, overflowX: "auto", marginTop: 40 }} role="group" aria-label={c.shotsTitle}>
                {c.shots.map((s) => <ScrollShot key={s.src} src={s.src} alt={`${c.client}: ${s.caption}`} width={s.width} height={s.height} caption={s.caption} />)}
              </div>
            )}
          </section>
        </div>
      )}

      <div className="v2-wrap">
        <section id="v2-result" className="v2-sec" aria-labelledby="v2-result-h">
          <div className="v2-rail"><b>{num()}</b>Result</div>
          <div className="v2-body">
            <h2 id="v2-result-h" className="v2-statement" data-reveal>{c.outcome ?? c.metric.label}</h2>
            <div className="v2-res">
              <div className="v2-res-left">
                <p className="v2-sub" style={{ marginTop: 0 }}>In numbers</p>
                {metrics.map((m) => (
                  <div key={m.label} className="v2-proof" data-reveal>
                    <b>{stat(m)}</b>
                    <span>{m.label}</span>
                  </div>
                ))}
                <a href="#contact" className="v2-ask">Planning something like this? Tell me about it <ArrowRight size={16} aria-hidden="true" /></a>
              </div>
              <div className="v2-res-right" data-reveal>
                {(c.video || c.quote) && <p className="v2-sub" style={{ marginTop: 0 }}>{c.video ? "In the client's words" : "What the client said"}</p>}
                {c.video && <VideoCard src={c.video.src} poster={c.video.poster} by={c.video.by} role={c.video.role} length={c.video.length} />}
                {c.quote && (
                  <figure className="v2-pull">
                    <blockquote>{c.quote.text}</blockquote>
                    <figcaption><strong>{c.quote.by}</strong>{c.quote.role}</figcaption>
                  </figure>
                )}
                {!c.video && !c.quote && c.closing && (
                  <>
                    <p className="v2-sub" style={{ marginTop: 0 }}>Where it stands</p>
                    <p className="v2-closing">{c.closing}</p>
                    {c.site && (
                      <div className="v2-closing-links">
                        <a href={c.site} target="_blank" rel="noopener noreferrer" data-track-location={`case_${c.slug}_visit_end`} className="btn-ticks cs-btn-quiet">
                          Visit {c.site.replace(/^https?:\/\/(www\.)?/, "").replace(/\/$/, "")} <ArrowUpRight size={15} strokeWidth={2} />
                        </a>
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          </div>
        </section>
      </div>

      {c.reflection && (
        <div className="v2-wrap">
          <section id="v2-reflection" className="v2-sec" aria-labelledby="v2-reflection-h">
            <div className="v2-rail"><b>{num()}</b>Reflection</div>
            <div className="v2-body">
              <h2 id="v2-reflection-h" className="v2-h2" data-reveal>Looking back.</h2>
              <p className="v2-p" style={{ marginTop: 20 }} data-reveal>{c.reflection}</p>
            </div>
          </section>
        </div>
      )}

      <div className="v2-wrap">
        <Link id="v2-next" href={nextPath} className="v2-next">
          <small>Next case study</small>
          <strong>{nextName} <ArrowUpRight size={36} strokeWidth={1.6} aria-hidden="true" /></strong>
          <span>{CASE_SUMMARY[nextName]}</span>
        </Link>
      </div>

      <ContactForm />
      <Footer showCta={false} />
    </main>
  );
}
