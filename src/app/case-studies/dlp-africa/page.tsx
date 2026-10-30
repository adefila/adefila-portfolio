import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
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
import ProcessRail from "@/components/case/ProcessRail";
import ProductsShowcase from "@/components/case/ProductsShowcase";
import ScrollShot from "@/components/case/ScrollShot";
import CountUp from "@/components/case/CountUp";
import { BOOKING_URL } from "@/lib/booking";

export const metadata: Metadata = {
  title: "DLP Africa case study: 12 pages redesigned and built in 4 weeks | Samuel Adefila",
  description:
    "How I redesigned and built 12 pages of DLP Africa's website: Figma design system, Framer build with a CMS for seven products, custom forms wired to GA4, full QA, redirects and Google re-indexing, then a clean handover. Live in four weeks.",
  alternates: { canonical: "https://adefilasamuel.com/case-studies/dlp-africa" },
  openGraph: {
    title: "DLP Africa case study | Samuel Adefila",
    description: "A telecommunications website in Ghana, redesigned and rebuilt in four weeks without breaking what the old one had earned.",
    type: "article",
    url: "https://adefilasamuel.com/case-studies/dlp-africa",
  },
};

// Everything on this page comes from the project record. Add a number only when it is a real one.
const FACTS: [string, string][] = [
  ["Client", "DLP Africa"],
  ["Location", "Ghana"],
  ["Industry", "Telecommunications"],
  ["Scope", "Redesign and build, 12 pages"],
  ["Tools", "Figma, Framer, GA4"],
  ["Timeline", "4 weeks, kickoff to live"],
];

const STEPS: { title: string; time?: string; body: string }[] = [
  {
    title: "Kickoff call",
    body: "The project began with a kickoff call with the DLP team, so the design could start from what they needed.",
  },
  {
    title: "Design in Figma",
    body: "Before any page was drawn, I mapped out the company's design system: colours, type, spacing and the components every page would share. The 12 pages were then designed on top of it and reviewed by the DLP team before anything was built.",
  },
  {
    title: "Build in Framer",
    time: "1 to 2 weeks",
    body: "The build took the longest of the design-and-code stages because the site runs on a robust CMS for seven products. Product content lives in the CMS, so it can be managed there instead of page by page.",
  },
  {
    title: "Custom forms and GA4",
    body: "Framer's default form could not do the integration DLP needed, so I built a custom form instead and wired GA4 to it. Every page has its own unique form, each one tracked in GA4.",
  },
  {
    title: "QA",
    time: "The slowest stage",
    body: "DLP Africa already has customers, so this stage could not be rushed. I went through the whole site checking responsiveness and that everything worked properly, so nothing customers rely on broke.",
  },
  {
    title: "Redirects and re-indexing",
    body: "I pointed the old website at the new one without breaking anything, then checked every URL against what the company had before. The site was then indexed again on Google.",
  },
  {
    title: "Handover",
    body: "The project closed with a walkthrough video made for non-technical teams and a handover document, so DLP's own people can run the site without needing me.",
  },
];

const DETAILS: { title: string; body: string }[] = [
  {
    title: "A CMS for seven products",
    body: "Product content lives in the CMS, so adding or changing a product is an edit rather than a rebuild.",
  },
  {
    title: "One form per page, all measured",
    body: "Custom forms replaced the default ones. Each page has its own, and GA4 is wired to every one.",
  },
  {
    title: "Nothing lost in the move",
    body: "A new site only helps if the old one's links keep working. Redirects, a URL-by-URL check against what the company had before, and re-indexing on Google meant the switch did not break anything.",
  },
];

const RESULTS: [number, string][] = [
  [12, "pages redesigned and built"],
  [7, "products running from the CMS"],
  [4, "weeks from kickoff to live"],
];

// Full-page captures of the finished site, public/projects/dlp. [file, product, width, height]
const PRODUCT_PAGES: [string, string, number, number][] = [
  ["fish-africa", "Fish Africa", 1400, 6567],
  ["spider-crm", "Spider CRM", 1400, 6359],
  ["digital-receptionist", "Digital Receptionist", 1400, 6223],
  ["call-centre", "Call Centre", 1400, 6555],
  ["konvo", "Konvo", 1400, 6618],
  ["sip-trunk", "SIP Trunk", 1400, 6505],
  ["wabbit", "Wabbit", 1400, 6747],
];

export default function DlpAfricaCaseStudy() {
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
          <p className="cs-eyebrow cs-in" style={{ ["--d" as string]: "0.1s" }}>Case study · Telecommunications · Ghana</p>
          <h1 className="cs-title" aria-label="DLP Africa: 12 pages redesigned and built in 4 weeks.">
            <span className="cs-line" aria-hidden="true" style={{ ["--d" as string]: "0.2s" }}>DLP Africa: 12 pages</span>
            <span className="cs-line" aria-hidden="true" style={{ ["--d" as string]: "0.34s" }}>redesigned and built in</span>
            <span className="cs-line cs-accent" aria-hidden="true" style={{ ["--d" as string]: "0.48s" }}>4 weeks.</span>
          </h1>
          <p className="cs-lede cs-in" style={{ ["--d" as string]: "0.7s" }}>
            DLP Africa, a telecommunications company in Ghana, asked me to redesign and build 12 pages of their website. This is how it went, from the first call to a handover their team can run on their own.
          </p>

          <dl className="cs-facts">
            {FACTS.map(([k, v], i) => (
              <div key={k} className="cs-in" style={{ ["--d" as string]: `${0.85 + i * 0.07}s` }}>
                <dt>{k}</dt>
                <dd>{v}</dd>
              </div>
            ))}
          </dl>

          <div className="cs-actions cs-in" style={{ ["--d" as string]: "1.3s" }}>
            <a href="https://dlp.africa/" target="_blank" rel="noopener noreferrer" data-track-location="case_dlp_visit" className="btn-ticks cs-btn-quiet">
              Visit dlp.africa <ArrowUpRight size={15} strokeWidth={2} />
            </a>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" data-track-location="case_dlp_book" className="btn-primary cs-btn">
              Book a free call <CalendarDays size={15} strokeWidth={2} />
            </a>
          </div>

          <figure className="cs-frame hero-scan" style={{ ["--hero-delay" as string]: "1s" }}>
            <span className="cs-frame-bar" aria-hidden="true"><i /><i /><i /></span>
            <Image
              src="/projects/dlp-africa-desktop.webp"
              alt="The DLP Africa home page after the redesign: phone, chat and payment systems built in Africa, for Africa"
              width={1400}
              height={875}
              priority
              sizes="(max-width: 1240px) 92vw, 1200px"
              className="cs-shot"
            />
          </figure>
        </div>
      </header>

      <div className="spec-rule" aria-hidden="true" />

      <section className="cs-section" aria-labelledby="cs-brief">
        <div className="cs-wrap cs-split">
          <div>
            <SpecLabel text="The brief" />
            <h2 id="cs-brief" className="cs-h2">A full redesign, with a live customer base to protect.</h2>
          </div>
          <div className="cs-prose" data-reveal>
            <p>
              DLP Africa contacted me to redesign and build 12 pages of their website. The company works in telecommunications in Ghana and already has customers using the site, so the job was bigger than making it look better.
            </p>
            <p>
              The new site had to support custom forms the default tools could not handle, and replace the old one without breaking the links people already used.
            </p>
          </div>
        </div>
      </section>

      <div className="spec-rule" aria-hidden="true" />

      <ProcessRail steps={STEPS} label="The process" heading="Seven stages, from kickoff call to handover." />

      <div className="spec-rule" aria-hidden="true" />

      <ProductsShowcase src="/projects/dlp/products.webp" width={1400} height={4532} products={PRODUCT_PAGES.map((p) => p[1])} />

      <div className="spec-rule" aria-hidden="true" />

      <section className="cs-section pp" aria-labelledby="cs-pages">
        <div className="cs-wrap">
          <SpecLabel text="The product pages" />
          <h2 id="cs-pages" className="cs-h2">Each product, its own page.</h2>
          <p className="cs-prose-line" data-reveal>Hover a page to scroll it from top to bottom. On a phone, each one scrolls by itself as it comes into view.</p>
        </div>
        <div className="pp-track" role="group" aria-label="The seven product pages">
          {PRODUCT_PAGES.map(([file, name, w, h]) => (
            <ScrollShot key={file} src={`/projects/dlp/${file}.webp`} alt={`The ${name} page on dlp.africa`} width={w} height={h} caption={name} />
          ))}
        </div>
      </section>

      <div className="spec-rule" aria-hidden="true" />

      <section className="cs-section" aria-labelledby="cs-details">
        <div className="cs-wrap">
          <SpecLabel text="What made the difference" />
          <h2 id="cs-details" className="cs-h2">Three things that mattered most.</h2>
          <div className="cs-cards">
            {DETAILS.map((d) => (
              <article key={d.title} className="cs-card corners-in" data-reveal>
                <h3>{d.title}</h3>
                <p>{d.body}</p>
              </article>
            ))}
          </div>

        </div>
      </section>

      <div className="spec-rule" aria-hidden="true" />

      <section className="cs-section" aria-labelledby="cs-result">
        <div className="cs-wrap">
          <SpecLabel text="The result" />
          <h2 id="cs-result" className="cs-h2">Live in four weeks, and handed over properly.</h2>
          <ul className="cs-results">
            {RESULTS.map(([n, label]) => (
              <li key={label} data-reveal>
                <CountUp to={n} />
                <span>{label}</span>
              </li>
            ))}
          </ul>
          <p className="cs-closing" data-reveal>
            The website went live in four weeks with a walkthrough video and a handover document, so DLP Africa&rsquo;s team, technical or not, can look after it themselves.
          </p>
          <div className="cs-actions" data-reveal>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" data-track-location="case_dlp_book_end" className="btn-primary cs-btn">
              Book a free call <CalendarDays size={15} strokeWidth={2} />
            </a>
            <Link href="/#work" className="btn-ticks cs-btn-quiet">See more work</Link>
          </div>
        </div>
      </section>

      <div className="spec-rule" aria-hidden="true" />
      <ContactForm />
      <div className="spec-rule" aria-hidden="true" />
      <Footer />
    </main>
  );
}
