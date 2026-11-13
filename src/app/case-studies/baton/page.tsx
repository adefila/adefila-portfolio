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
import ScrollShot from "@/components/case/ScrollShot";
import CountUp from "@/components/case/CountUp";
import { BOOKING_URL } from "@/lib/booking";

export const metadata: Metadata = {
  title: "Baton case study: a website editor clients can actually use | Samuel Adefila",
  description:
    "How I designed and built Baton, my own product: a visual editor that lets clients change the words, photos and links on their live website. Stack detection, draft and publish with rollback, roles, security and a guided setup.",
  alternates: { canonical: "https://adefilasamuel.com/case-studies/baton" },
  openGraph: {
    title: "Baton case study | Samuel Adefila",
    description: "A visual editor so clients can edit their own website without waiting for a developer, designed and built from scratch.",
    type: "article",
    url: "https://adefilasamuel.com/case-studies/baton",
  },
};

// Everything on this page comes from the project record. Add a number only when it is a real one.
const FACTS: [string, string][] = [
  ["Product", "Baton"],
  ["Type", "Web app (SaaS)"],
  ["Role", "Founder, design and engineering"],
  ["Stack", "Next.js, Supabase, Resend"],
  ["Started", "October 2026"],
  ["Status", "Live, with a free plan"],
];

const STEPS: { title: string; time?: string; body: string }[] = [
  {
    title: "The problem",
    body: "I build websites for clients, and the handover usually ends the same way: the client is afraid to touch their own site. Every small change, a word, a photo or a link, becomes a ticket back to the developer. I decided to build the missing piece myself.",
  },
  {
    title: "Name and brand",
    body: "It began as a working name, Handover. I renamed it Baton, the thing passed on in a relay, and drew the identity myself: a lowercase b whose stem hands over into a circle, flat colours only (ink, signal orange and paper) and a bold wordmark.",
  },
  {
    title: "Detect the stack",
    body: "A developer pastes a site address and Baton works out what it is built with, such as WordPress, Shopify, Webflow or Next.js, and which way edits can be saved. The page then loads in the editor from a separate address, so the real site can be edited safely.",
  },
  {
    title: "The in-page editor",
    body: "The client clicks text, a picture, a button or an icon on their own page and changes it in a side panel. Text updates as they type, buttons get a separate label and link, and a list of everything on the page reaches text hidden inside tabs and accordions.",
  },
  {
    title: "Draft, publish, roll back",
    body: "Edits are saved as a draft first and can be previewed on desktop and phone. Publishing creates a numbered version. Every version is kept, so a mistake can be rolled back instead of fixed by hand.",
  },
  {
    title: "Handing over",
    body: "The developer invites the client by email. The client becomes the owner and the developer steps down to developer. Three roles (owner, developer and editor) decide who can change what, and each invite is locked to the email address it was sent to.",
  },
  {
    title: "Security and setup",
    body: "Before anyone else used it I hardened it: edited HTML is cleaned on the server, the editor refuses private network addresses, passwords are hashed, and accounts can use two-step login and email confirmation. When a tester could not find the install step, I added a guided setup that checks the site is connected.",
  },
];

const DETAILS: { title: string; body: string }[] = [
  {
    title: "Two ways to save an edit",
    body: "For WordPress, Baton writes the change into the post itself, so nothing extra loads on the page. For other sites, one small script applies the published edits live. The developer sees which route a site uses.",
  },
  {
    title: "Built to be handed over",
    body: "Ownership moves from developer to client in one invite. The client gets full control, the developer keeps access to help, and the activity log shows who changed what.",
  },
  {
    title: "Setup that explains itself",
    body: "A four-step guide (site added, install, invite the client, first publish) with the right instructions for the platform it detected, and a check that confirms the script is live.",
  },
];

const RESULTS: [number, string][] = [
  [3, "roles: owner, developer, editor"],
  [22, "automated security checks"],
  [4, "steps from a new site to a first edit"],
];

// Full-page captures of Baton's own website, public/projects/baton. [file, caption, width, height]
const SITE_PAGES: [string, string, number, number][] = [
  ["home", "Home", 1400, 10563],
  ["pricing", "Pricing", 1400, 3743],
  ["docs", "Docs", 1400, 6429],
  ["changelog", "Changelog", 1400, 7159],
];

// Stills of the app itself. [file, alt, caption]
const APP_SHOTS: [string, string, string][] = [
  ["editor", "Baton's editor: a live website on the left, with the toolbar above and the Click anything to edit panel on the right", "Click anything on the page to edit it."],
  ["text", "Editing a headline in Baton: the text changes on the page as it is typed, with colour choices from the site's own palette", "Text changes on the page as it is typed."],
  ["phone", "Baton's phone preview: the same page at phone width, with a button selected and its link chosen from a list of the site's pages", "Check the phone view before anyone else sees it."],
  ["account", "Baton's sign-up page for an invited client, with their email address already filled in", "An invited client lands on a sign-up with their email already filled in."],
];

export default function BatonCaseStudy() {
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
          <p className="cs-eyebrow cs-in" style={{ ["--d" as string]: "0.1s" }}>Case study · Product · My own</p>
          <h1 className="cs-title" aria-label="Baton: let clients edit their own site.">
            <span className="cs-line" aria-hidden="true" style={{ ["--d" as string]: "0.2s" }}>Baton:</span>
            <span className="cs-line cs-accent" aria-hidden="true" style={{ ["--d" as string]: "0.34s" }}>let clients edit their own site.</span>
          </h1>
          <p className="cs-lede cs-in" style={{ ["--d" as string]: "0.7s" }}>
            Baton is a visual editor I designed and built from scratch. A developer connects a site once, and the client can change its words, photos and links themselves, with drafts, publishing and rollback. This is how it went, from the first idea to a live product.
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
            <a href="https://batonedit.com/" target="_blank" rel="noopener noreferrer" data-track-location="case_baton_visit" className="btn-ticks cs-btn-quiet">
              Visit batonedit.com <ArrowUpRight size={15} strokeWidth={2} />
            </a>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" data-track-location="case_baton_book" className="btn-primary cs-btn">
              Book a free call <CalendarDays size={15} strokeWidth={2} />
            </a>
          </div>

          <figure className="cs-frame hero-scan" style={{ ["--hero-delay" as string]: "1s" }}>
            <span className="cs-frame-bar" aria-hidden="true"><i /><i /><i /></span>
            <Image
              src="/projects/baton/hero.webp"
              alt="Baton's home page: Edit your website yourself, with the editor shown underneath"
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
            <h2 id="cs-brief" className="cs-h2">Hand it over, then let go.</h2>
          </div>
          <div className="cs-prose" data-reveal>
            <p>
              A finished website is only half a delivery. The people who own it, business owners and marketing teams, often cannot change a sentence on it without asking someone technical. The developer becomes a bottleneck, and the client stops trusting their own site.
            </p>
            <p>
              The brief I set myself: a tool where a client can safely edit their live site, a developer stays in control of what is possible, and nobody has to learn code or wait on a ticket. It had to work on the sites that already exist, not only on ones built for it.
            </p>
          </div>
        </div>
      </section>

      <div className="spec-rule" aria-hidden="true" />

      <ProcessRail steps={STEPS} label="The process" heading="Seven stages." visuals="baton" />

      <div className="spec-rule" aria-hidden="true" />

      <section className="cs-section" aria-labelledby="cs-app">
        <div className="cs-wrap">
          <SpecLabel text="Inside the app" />
          <h2 id="cs-app" className="cs-h2">What the client sees.</h2>
          <div className="bt-grid">
            {APP_SHOTS.map(([file, alt, caption]) => (
              <figure key={file} className="bt-fig" data-reveal>
                <div className="cs-frame">
                  <span className="cs-frame-bar" aria-hidden="true"><i /><i /><i /></span>
                  <Image src={`/projects/baton/${file}.webp`} alt={alt} width={file === "editor" ? 1280 : 1142} height={file === "editor" ? 800 : 714} sizes="(max-width: 900px) 92vw, 580px" className="cs-shot" />
                </div>
                <figcaption>{caption}</figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      <div className="spec-rule" aria-hidden="true" />

      <section className="cs-section pp" aria-labelledby="cs-pages">
        <div className="cs-wrap">
          <SpecLabel text="The website" />
          <h2 id="cs-pages" className="cs-h2">A product site to match.</h2>
          <p className="cs-prose-line" data-reveal>Baton&rsquo;s own site, designed and built too. Hover a page to scroll it from top to bottom. On a phone, each one scrolls by itself as it comes into view.</p>
        </div>
        <div className="pp-track" role="group" aria-label="Pages of the Baton website">
          {SITE_PAGES.map(([file, name, w, h]) => (
            <ScrollShot key={file} src={`/projects/baton/${file}.webp`} alt={`The ${name} page on batonedit.com`} width={w} height={h} caption={name} />
          ))}
        </div>
      </section>

      <div className="spec-rule" aria-hidden="true" />

      <section className="cs-section" aria-labelledby="cs-details">
        <div className="cs-wrap">
          <SpecLabel text="What made the difference" />
          <h2 id="cs-details" className="cs-h2">What mattered.</h2>
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
          <h2 id="cs-result" className="cs-h2">Live, and in use.</h2>
          <ul className="cs-results">
            {RESULTS.map(([n, label]) => (
              <li key={label} data-reveal>
                <CountUp to={n} />
                <span>{label}</span>
              </li>
            ))}
          </ul>
          <p className="cs-closing" data-reveal>
            Baton is live at batonedit.com with a free plan, a pricing page, documentation and a changelog. Its script is also installed on this site. If you build sites for clients, or you own one you cannot edit, I would like to hear how it fits.
          </p>
          <div className="cs-actions" data-reveal>
            <a href="https://batonedit.com/" target="_blank" rel="noopener noreferrer" data-track-location="case_baton_visit_end" className="btn-ticks cs-btn-quiet">
              Try Baton <ArrowUpRight size={15} strokeWidth={2} />
            </a>
            <a href={BOOKING_URL} target="_blank" rel="noopener noreferrer" data-track-location="case_baton_book_end" className="btn-primary cs-btn">
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
