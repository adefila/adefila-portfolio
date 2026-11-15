import { T } from "@/i18n/translations";
import type { WorkItem } from "@/components/case/WorkShowcase";

// THE CASE STUDY TEMPLATE. Every project page follows this order, and the page (src/app/case-studies/[slug]/page.tsx) draws it:
//
//   1. Snapshot   title that states the outcome, lede, facts, hero          REQUIRED  (facts: Client, Role, Scope, Timeline, Tools, Status)
//   2. Problem    brief (what they needed), did (what I did), constraint?   REQUIRED
//   3. Process    4 to 6 steps: title, one-line lead, short text, tags      REQUIRED  (an optional board shows the stages as pictures)
//   4. Decisions  3 cards: what mattered and the trade-off                  optional
//   5. The work   the actual pages or screens                               REQUIRED  (a website: `work`, pages scrolling on a laptop with an
//                                                                                     optional phone; an app: the board inside `process`)
//   6. Result     1 to 3 real numbers, then a quote or video                REQUIRED
//   7. Reflection 2 or 3 sentences: what I would do next or learned         optional
//   8. More work  links to the other case studies (automatic)
//
// Every claim is from the project record or the client's own words; nothing is added that was not recorded, and a missing
// optional section is better than an invented one. To add a project: add an entry below, then its slug to
// src/lib/caseStudies.ts. The build prints anything a page is missing (see missingSections).
// DLP Africa and Baton keep their own pages for now but follow the same order.
export type CaseMetric = { prefix?: string; value?: number; suffix?: string; text?: string; label: string };
export type CaseShot = { src: string; width: number; height: number; caption: string };

export type CaseStudy = {
  slug: string;
  client: string;
  industry: string;
  title: string;
  lede: string;
  facts: [string, string][];
  brief: string;
  did: string;
  constraint?: string;
  decisions?: { title: string; body: string }[];
  reflection?: string;
  metric: CaseMetric;
  extraMetrics?: CaseMetric[];
  quote?: { text: string; by: string; role: string };
  video?: { src: string; poster: string; by: string; role: string; length?: string };
  // One sentence that states the outcome in plain words, from recorded facts only. Shown above the numbers in the result.
  outcome?: string;
  site?: string;
  hero:
    | { kind: "site"; src: string; width: number; height: number; alt: string }
    | { kind: "design"; src: string; size: number; alt: string; panel: string }
    | { kind: "devices"; laptop: { src: string; alt: string }; phones: { src: string; alt: string }[] };
  // Still pictures of an app or product, shown with the work (for example the screens of a web app).
  stills?: { src: string; width: number; height: number; alt: string; caption: string }[];
  // One or two sentences that close the result, for projects without a written quote or video.
  closing?: string;
  shots: CaseShot[];
  shotsTitle: string;
  shotsIntro: string;
  // The work for a website project: pick a page, watch it scroll on a laptop (see WorkShowcase). Replaces `shots` when present.
  work?: { title: string; intro: string; items: WorkItem[] };
  // The process: 4 to 6 steps. Each has a short title, a one-line takeaway (lead), a few sentences (text) and tags to scan.
  // For app work, the optional board shows each screen as ideation, wireframe and high fidelity.
  process?: { title: string; intro: string; steps: { title: string; lead?: string; text: string; tags?: string[] }[]; board?: { kind: "post-event" | "pending-requests" | "artist-details"; name: string; note: string; src: string; width: number; height: number; alt: string }[] };
  description: string;
};

const en = (key: string) => T[key]?.en ?? "";

const REQUIRED_FACTS = ["Client", "Role", "Scope", "Timeline", "Tools", "Status"];

// What a case study still needs to meet the template. It is printed when the site builds, never shown to visitors.
export function missingSections(c: CaseStudy): string[] {
  const missing: string[] = [];
  const keys = new Set(c.facts.map(([k]) => k));
  for (const k of REQUIRED_FACTS) if (!keys.has(k)) missing.push(`fact: ${k}`);
  if (!c.process?.steps.length) missing.push("process");
  else if (c.process.steps.length < 4 || c.process.steps.length > 6) missing.push(`process: ${c.process.steps.length} steps, aim for 4 to 6`);
  if (!c.shots.length && !c.work?.items.length && !c.process?.board?.length) missing.push("the work (work, shots or a process board)");
  return missing;
}

export const CASE_STUDY_DATA: CaseStudy[] = [
  {
    slug: "dlp-africa",
    client: "DLP Africa",
    industry: "Telecommunications · Ghana",
    title: "DLP Africa: 12 pages in 4 weeks.",
    lede: "DLP Africa, a telecommunications company in Ghana, asked me to redesign, rebuild and migrate 12 pages of their website without breaking what the old one had earned. This is how it went, from the first call to a handover their team can run on their own.",
    facts: [
      ["Client", "DLP Africa"],
      ["Role", "Design and Framer development"],
      ["Scope", "Redesign and build, 12 pages"],
      ["Timeline", "4 weeks, kickoff to live"],
      ["Tools", "Figma, Framer, GA4"],
      ["Status", "Live"],
    ],
    brief: "DLP Africa already had customers using its site, so the job was bigger than making it look better.",
    did: en("cases.dlp.did"),
    constraint: "The new site had to support custom forms the default tools could not handle, and replace the old one without breaking the links people already used.",
    decisions: [
      { title: "A CMS for seven products", body: "Product content lives in the CMS, so adding or changing a product is an edit rather than a rebuild." },
      { title: "One form per page, all measured", body: "Custom forms replaced the default ones. Each page has its own, and GA4 is wired to every one." },
      { title: "Nothing lost in the move", body: "A new site only helps if the old one's links keep working. Redirects, a URL-by-URL check against what the company had before, and re-indexing on Google meant the switch did not break anything." },
    ],
    metric: { value: 12, label: "pages redesigned and built" },
    extraMetrics: [
      { value: 7, label: "products running from the CMS" },
      { value: 4, label: "weeks from kickoff to live" },
    ],
    outcome: "Live in four weeks, and run by DLP's own team.",
    closing: "The website went live in four weeks with a walkthrough video and a handover document, so DLP Africa's team, technical or not, can look after it themselves.",
    site: "https://dlp.africa/",
    hero: {
      kind: "devices",
      laptop: { src: "/projects/dlp/device/desktop-home.webp", alt: "The DLP Africa home page on a laptop, navigation bar included: phone, chat and payment systems built in Africa, for Africa" },
      phones: [
        { src: "/projects/dlp/device/mobile-home.webp", alt: "The DLP Africa home page on a phone" },
        { src: "/projects/dlp/device/mobile-products.webp", alt: "The DLP Africa products page on a phone" },
      ],
    },
    shots: [],
    shotsTitle: "",
    shotsIntro: "",
    work: {
      title: "A products page, and one page for each.",
      intro: "Pick a page and watch it scroll from the navigation bar to the footer, with the same page at phone width beside it.",
      items: [
        { id: "products", name: "Products", note: "Lists every product from the CMS, each with its own page behind it.", full: { src: "/projects/dlp/products.webp", width: 1400, height: 4532 }, mobile: { src: "/projects/dlp/device/mobile-products.webp" } },
        { id: "fish-africa", name: "Fish Africa", full: { src: "/projects/dlp/fish-africa.webp", width: 1400, height: 6567 }, mobile: { src: "/projects/dlp/device/mobile-fish-africa.webp" } },
        { id: "spider-crm", name: "Spider CRM", full: { src: "/projects/dlp/spider-crm.webp", width: 1400, height: 6359 }, mobile: { src: "/projects/dlp/device/mobile-spider-crm.webp" } },
        { id: "digital-receptionist", name: "Digital Receptionist", full: { src: "/projects/dlp/digital-receptionist.webp", width: 1400, height: 6223 }, mobile: { src: "/projects/dlp/device/mobile-digital-receptionist.webp" } },
        { id: "call-centre", name: "Call Centre", full: { src: "/projects/dlp/call-centre.webp", width: 1400, height: 6555 }, mobile: { src: "/projects/dlp/device/mobile-call-centre.webp" } },
        { id: "konvo", name: "Konvo", full: { src: "/projects/dlp/konvo.webp", width: 1400, height: 6618 }, mobile: { src: "/projects/dlp/device/mobile-konvo.webp" } },
        { id: "sip-trunk", name: "SIP Trunk", full: { src: "/projects/dlp/sip-trunk.webp", width: 1400, height: 6505 }, mobile: { src: "/projects/dlp/device/mobile-sip-trunk.webp" } },
        { id: "wabbit", name: "Wabbit", full: { src: "/projects/dlp/wabbit.webp", width: 1400, height: 6747 }, mobile: { src: "/projects/dlp/device/mobile-wabbit.webp" } },
      ],
    },
    process: {
      title: "Six stages, from kickoff to handover.",
      intro: "DLP Africa already has customers, so the order mattered: design first, build second, and nothing shipped until the old links were safe.",
      steps: [
        {
          title: "Kickoff and design in Figma",
          lead: "Start from what the DLP team needed.",
          text: "The project began with a kickoff call. Before any page was drawn, the company's design system was mapped out: colours, type, spacing and the components every page would share. The 12 pages were designed on top of it and reviewed by the DLP team before anything was built.",
          tags: ["Kickoff call", "Design system", "12 pages", "Team review"],
        },
        {
          title: "Build in Framer",
          lead: "A CMS that runs seven products.",
          text: "The build took 1 to 2 weeks, the longest of the design-and-code stages, because the site runs on a robust CMS for seven products. Product content lives in the CMS, so it is managed there instead of page by page.",
          tags: ["Framer", "CMS", "Seven products"],
        },
        {
          title: "Custom forms and GA4",
          lead: "One form per page, each one tracked.",
          text: "Framer's default form could not do the integration DLP needed, so a custom form was built and GA4 wired to it. Every page has its own unique form, each tracked in GA4.",
          tags: ["Custom forms", "GA4"],
        },
        {
          title: "QA",
          lead: "The slowest stage, on purpose.",
          text: "DLP Africa already has customers, so this stage could not be rushed. The whole site was checked for responsiveness and for everything working properly, so nothing customers rely on broke.",
          tags: ["Responsive", "Full-site check"],
        },
        {
          title: "Redirects and re-indexing",
          lead: "Nothing lost in the move.",
          text: "The old website was pointed at the new one without breaking anything, and every URL was checked against what the company had before. The site was then indexed again on Google.",
          tags: ["Redirects", "URL check", "Google"],
        },
        {
          title: "Handover",
          lead: "A team that can run it without me.",
          text: "The project closed with a walkthrough video made for non-technical teams and a handover document, so DLP's own people can run the site without needing me.",
          tags: ["Walkthrough video", "Handover document"],
        },
      ],
    },
    description: "How I redesigned and built 12 pages of DLP Africa's website: Figma design system, Framer build with a CMS for seven products, custom forms wired to GA4, full QA, redirects and Google re-indexing, then a clean handover. Live in four weeks.",
  },
  {
    slug: "baton",
    client: "Baton",
    industry: "Product · my own",
    title: "Baton: let clients edit their own site.",
    lede: "Baton is a visual editor I designed and built from scratch. A developer connects a site once, and the client can change its words, photos and links themselves, with drafts, publishing and rollback. This is how it went, from the first idea to a live product.",
    facts: [
      ["Client", "Baton, my own product"],
      ["Role", "Founder, design and engineering"],
      ["Scope", "Web app (SaaS) and its website"],
      ["Timeline", "Started October 2026"],
      ["Tools", "Next.js, Supabase, Resend"],
      ["Status", "Live, with a free plan"],
    ],
    brief: "A finished website is only half a delivery: the people who own it often cannot change a sentence on it without asking someone technical.",
    did: "Designed and built a tool where a client can safely edit their live site, a developer stays in control of what is possible, and nobody has to learn code or wait on a ticket.",
    constraint: "It had to work on the sites that already exist, not only on ones built for it.",
    decisions: [
      { title: "Two ways to save an edit", body: "For WordPress, Baton writes the change into the post itself, so nothing extra loads on the page. For other sites, one small script applies the published edits live. The developer sees which route a site uses." },
      { title: "Built to be handed over", body: "Ownership moves from developer to client in one invite. The client gets full control, the developer keeps access to help, and the activity log shows who changed what." },
      { title: "Setup that explains itself", body: "A four-step guide (site added, install, invite the client, first publish) with the right instructions for the platform it detected, and a check that confirms the script is live." },
    ],
    metric: { value: 3, label: "roles: owner, developer, editor" },
    extraMetrics: [
      { value: 22, label: "automated security checks" },
      { value: 4, label: "steps from a new site to a first edit" },
    ],
    outcome: "Live at batonedit.com, with a free plan, a pricing page, documentation and a changelog.",
    closing: "Its script is also installed on this site. If you build sites for clients, or you own one you cannot edit, I would like to hear how it fits.",
    site: "https://batonedit.com/",
    hero: { kind: "site", src: "/projects/baton/hero.webp", width: 1400, height: 875, alt: "Baton's home page: Edit your website yourself, with the editor shown underneath" },
    shots: [],
    shotsTitle: "",
    shotsIntro: "",
    stills: [
      { src: "/projects/baton/editor.webp", width: 1280, height: 800, alt: "Baton's editor: a live website on the left, with the toolbar above and the Click anything to edit panel on the right", caption: "Click anything on the page to edit it." },
      { src: "/projects/baton/text.webp", width: 1142, height: 714, alt: "Editing a headline in Baton: the text changes on the page as it is typed, with colour choices from the site's own palette", caption: "Text changes on the page as it is typed." },
      { src: "/projects/baton/phone.webp", width: 1142, height: 714, alt: "Baton's phone preview: the same page at phone width, with a button selected and its link chosen from a list of the site's pages", caption: "Check the phone view before anyone else sees it." },
      { src: "/projects/baton/account.webp", width: 1142, height: 714, alt: "Baton's sign-up page for an invited client, with their email address already filled in", caption: "An invited client lands on a sign-up with their email already filled in." },
    ],
    work: {
      title: "A product site to match.",
      intro: "Baton's own website, designed and built too. Pick a page and watch it scroll from the navigation bar to the footer.",
      items: [
        { id: "home", name: "Home", full: { src: "/projects/baton/home.webp", width: 1400, height: 10563 } },
        { id: "pricing", name: "Pricing", full: { src: "/projects/baton/pricing.webp", width: 1400, height: 3743 } },
        { id: "docs", name: "Docs", full: { src: "/projects/baton/docs.webp", width: 1400, height: 6429 } },
        { id: "changelog", name: "Changelog", full: { src: "/projects/baton/changelog.webp", width: 1400, height: 7159 } },
      ],
    },
    process: {
      title: "Six stages, from the problem to a live product.",
      intro: "I build websites for clients, and the handover usually ends the same way: the client is afraid to touch their own site. I decided to build the missing piece myself.",
      steps: [
        {
          title: "Name and brand",
          lead: "From Handover to Baton.",
          text: "It began as a working name, Handover. I renamed it Baton, the thing passed on in a relay, and drew the identity myself: a lowercase b whose stem hands over into a circle, flat colours only (ink, signal orange and paper) and a bold wordmark.",
          tags: ["Name", "Identity", "Flat colour"],
        },
        {
          title: "Detect the stack",
          lead: "Paste an address and Baton works out the rest.",
          text: "A developer pastes a site address and Baton works out what it is built with, such as WordPress, Shopify, Webflow or Next.js, and which way edits can be saved. The page then loads in the editor from a separate address, so the real site can be edited safely.",
          tags: ["WordPress", "Shopify", "Webflow", "Next.js"],
        },
        {
          title: "The in-page editor",
          lead: "Click it on the page, change it in a panel.",
          text: "The client clicks text, a picture, a button or an icon on their own page and changes it in a side panel. Text updates as they type, buttons get a separate label and link, and a list of everything on the page reaches text hidden inside tabs and accordions.",
          tags: ["Text", "Images", "Buttons", "Icons"],
        },
        {
          title: "Draft, publish, roll back",
          lead: "A mistake can be undone.",
          text: "Edits are saved as a draft first and can be previewed on desktop and phone. Publishing creates a numbered version. Every version is kept, so a mistake can be rolled back instead of fixed by hand.",
          tags: ["Drafts", "Previews", "Versions", "Rollback"],
        },
        {
          title: "Handing over",
          lead: "From developer to client in one invite.",
          text: "The developer invites the client by email. The client becomes the owner and the developer steps down to developer. Three roles (owner, developer and editor) decide who can change what, and each invite is locked to the email address it was sent to.",
          tags: ["Invites", "Three roles"],
        },
        {
          title: "Security and setup",
          lead: "Hardened before anyone else used it.",
          text: "Before anyone else used it I hardened it: edited HTML is cleaned on the server, the editor refuses private network addresses, passwords are hashed, and accounts can use two-step login and email confirmation. When a tester could not find the install step, I added a guided setup that checks the site is connected.",
          tags: ["Clean HTML", "Hashed passwords", "Two-step login", "Guided setup"],
        },
      ],
    },
    description: "How I designed and built Baton, my own product: a visual editor that lets clients change the words, photos and links on their live website. Stack detection, draft and publish with rollback, roles, security and a guided setup.",
  },
  {
    slug: "the-initial",
    client: "The Initial",
    industry: "Creative agency",
    title: "The Initial: one landing page, 5+ new clients.",
    lede: "The Initial Agency needed a landing page that brings in clients, not just one that looks good. I turned their Figma design into a fast Framer site, then added a page of social proof.",
    facts: [
      ["Client", "The Initial Agency"],
      ["Role", "Figma to Framer development"],
      ["Scope", "Landing page and a social proof page"],
      ["Timeline", "2025"],
      ["Tools", "Figma, Framer"],
      ["Status", "Live"],
    ],
    brief: en("cases.initial.brief"),
    did: en("cases.initial.did"),
    metric: { value: 5, suffix: "+", label: en("cases.initial.metricLabel") },
    outcome: "One landing page brought in 5+ new clients.",
    quote: { text: en("testimonials.t2"), by: "Johnno Van Den Brink", role: "The Initial Agency" },
    site: "https://the-initial.com/",
    hero: { kind: "devices", laptop: { src: "/projects/case/the-initial/hero-home-desktop.webp", alt: "The Initial's home page on a laptop, navigation bar included: a dark, minimal landing page with a call to action and four proof points" }, phones: [{ src: "/projects/case/the-initial/hero-home-mobile.webp", alt: "The same page on a phone" }] },
    shotsTitle: "",
    shotsIntro: "",
    shots: [],
    work: {
      title: "The live site.",
      intro: "Pick a page to see its opening screen, navigation bar included, on a laptop and a phone.",
      items: [
        { id: "home", name: "Home", full: { src: "/projects/case/the-initial/hero-home-desktop.webp", width: 2880, height: 1800 }, mobile: { src: "/projects/case/the-initial/hero-home-mobile.webp" } },
        { id: "agencies", name: "Agencies page", full: { src: "/projects/case/the-initial/hero-agencies-desktop.webp", width: 2880, height: 1800 }, mobile: { src: "/projects/case/the-initial/hero-agencies-mobile.webp" } },
      ],
    },
    process: {
      title: "From Figma to a page that brings in clients.",
      intro: "The agency already had a design. The work was to build it faithfully, make it move, and add the proof that turns visitors into enquiries.",
      steps: [
        {
          title: "From Figma to Framer",
          lead: "Their design, built to the pixel.",
          text: "The agency's Figma design became a fast Framer site that follows the file closely, so what they designed is what visitors see.",
          tags: ["Figma", "Framer", "Pixel-accurate"],
        },
        {
          title: "Interactions and a CMS",
          lead: "Made to move, and set up to be edited.",
          text: "Custom interactions went on top of the layout, and a CMS keeps the content in one place.",
          tags: ["Custom interactions", "CMS"],
        },
        {
          title: "A page of social proof",
          lead: "Evidence for the people the page is meant to win.",
          text: "An additional page was added to carry social proof alongside the landing page.",
          tags: ["Social proof", "Extra page"],
        },
        {
          title: "What came of it",
          lead: "5+ new clients from one landing page.",
          text: "The founder reports finding 5+ new clients through the page, and getting compliments on the design.",
          tags: ["5+ clients", "Client feedback"],
        },
      ],
    },
    description: "How I turned The Initial's Figma design into a fast Framer landing page with custom interactions and a CMS, and added a page of social proof. It has brought in 5+ new clients.",
  },
  {
    slug: "leadopo",
    client: "Leadopo",
    industry: "Lead generation SaaS",
    title: "Leadopo: fixed in every language.",
    lede: "Leadopo's site styles kept breaking across its different language versions. I audited the whole Framer build, found what was causing it and fixed it at the source.",
    facts: [
      ["Client", "Leadopo"],
      ["Role", "Framer audit and fix"],
      ["Scope", "Full build audit and fix"],
      ["Timeline", "2026"],
      ["Tools", "Framer"],
      ["Status", "Live"],
    ],
    brief: en("cases.leadopo.brief"),
    did: en("cases.leadopo.did"),
    metric: { text: en("cases.leadopo.metric"), label: en("cases.leadopo.metricLabel") },
    outcome: "Every language version displays correctly again.",
    quote: { text: en("testimonials.t4"), by: "Michal Kouril", role: "Leadopo" },
    site: "https://www.leadopo.com/",
    hero: { kind: "devices", laptop: { src: "/projects/case/leadopo/hero-english-desktop.webp", alt: "Leadopo's English home page on a laptop, navigation bar included: We generate converting leads, on a bright blue background" }, phones: [{ src: "/projects/case/leadopo/hero-english-mobile.webp", alt: "The same page on a phone" }] },
    shotsTitle: "",
    shotsIntro: "",
    shots: [],
    work: {
      title: "The same site, in two languages.",
      intro: "Pick a page to see its opening screen, navigation bar included, on a laptop and a phone.",
      items: [
        { id: "english", name: "English", full: { src: "/projects/case/leadopo/hero-english-desktop.webp", width: 2880, height: 1800 }, mobile: { src: "/projects/case/leadopo/hero-english-mobile.webp" } },
        { id: "czech", name: "Czech", full: { src: "/projects/case/leadopo/hero-czech-desktop.webp", width: 2880, height: 1800 }, mobile: { src: "/projects/case/leadopo/hero-czech-mobile.webp" } },
        { id: "hubspot", name: "HubSpot page", full: { src: "/projects/case/leadopo/hero-hubspot-desktop.webp", width: 2880, height: 1800 }, mobile: { src: "/projects/case/leadopo/hero-hubspot-mobile.webp" } },
      ],
    },
    process: {
      title: "Find the cause, fix it once.",
      intro: "The site looked right in one language and broke in others. Patching pages would not have lasted, so the work started with the whole build.",
      steps: [
        {
          title: "The problem",
          lead: "Styles kept breaking in the other languages.",
          text: "Leadopo's Framer site is published in several languages, and the styles broke across the language versions.",
          tags: ["Framer", "Languages"],
        },
        {
          title: "Audit the whole build",
          lead: "Look at everything, not just the broken page.",
          text: "The whole Framer setup was audited, rather than only the page that looked wrong.",
          tags: ["Full audit", "Framer setup"],
        },
        {
          title: "Find the cause",
          lead: "Work out why it kept happening.",
          text: "The audit found what was causing the styles to break across the language versions.",
          tags: ["Root cause"],
        },
        {
          title: "Fix it at the source",
          lead: "Fixed in the right place.",
          text: "The fix went to the source of the problem, so every language version displays correctly again.",
          tags: ["Fix at the source", "Every language"],
        },
      ],
    },
    description: "How I audited Leadopo's Framer build, found why styles kept breaking across its language versions and fixed it at the source, so every version displays correctly again.",
  },
  {
    slug: "bookedez",
    client: "BookedEZ",
    industry: "Events marketplace",
    title: "BookedEZ: $10K+ paid out in under a month.",
    lede: "BookedEZ is an event booking platform connecting organizers, vendors and attendees. It needed one designer to own the product, and I designed the full dark-mode mobile app from 2023 to 2025.",
    facts: [
      ["Client", "BookedEZ LLC"],
      ["Role", "Product designer"],
      ["Scope", "Full dark-mode mobile app"],
      ["Timeline", "2023 to 2025"],
      ["Tools", "Figma"],
      ["Status", "Live on stores"],
    ],
    brief: en("cases.bookedez.brief"),
    did: en("cases.bookedez.did"),
    metric: { prefix: "$", value: 10, suffix: "K+", label: "paid out to artists and organizers in under a month" },
    extraMetrics: [{ value: 100, suffix: "+", label: "downloads in the first month" }],
    video: { src: "/davonte-wheeler.mp4", poster: "/davonte-wheeler-poster.jpg", by: "Davonte Wheeler", role: "CEO · BookedEZ LLC", length: "1:40" },
    outcome: "Within a month, the app was in people's hands and money was moving through it.",
    hero: { kind: "design", src: "/projects/design/bookedez.jpg", size: 2000, alt: "BookedEZ's dark-mode mobile app: profiles, membership tiers and the booking flow", panel: "#18181a" },
    shots: [],
    shotsTitle: "",
    shotsIntro: "",
    process: {
      title: "One app, two jobs.",
      intro: "BookedEZ is a two-sided marketplace: organizers book artists for their events, and artists book themselves into events. This is how the app was put together, read straight from the design file, in the order the work builds on itself.",
      steps: [
        {
          title: "The system first",
          lead: "One shared kit sits behind every screen.",
          text: "Named colour and text styles, a mobile grid and shared pieces: header, status bar, tab menu, modals and cards. The product stays consistent as it grows.",
          tags: ["Style guide", "Layout grid", "Components"],
        },
        {
          title: "One sign-up, two accounts",
          lead: "Shared welcome and login, then the road splits.",
          text: "Account creation divides into an organizer account and an artist account. Each asks only what that role needs.",
          tags: ["Onboarding", "Login", "Two roles"],
        },
        {
          title: "The organizer's flow",
          lead: "Find an artist, post an event, review requests.",
          text: "Organizers bookmark artists, send a request to a saved one and see who asks to play. An event history and a notification when an artist responds mean no chasing.",
          tags: ["Browse", "Bookmark", "Post event", "History"],
        },
        {
          title: "The artist's flow",
          lead: "Request an event, or accept an offer.",
          text: "Submitted requests, pending bookings and recent bookings are three separate lists, so an artist always knows which stage a booking is at.",
          tags: ["Open events", "Requests", "Bookings"],
        },
        {
          title: "Shared screens, and the ones people forget",
          lead: "Messages, profile, and every empty or money screen.",
          text: "Messages and notifications work the same for both roles, and profile shows a bio and portfolio with membership and payout settings underneath. Empty notifications, an empty message box, a search with no results and adding a card are designed too, because those are the moments a new user decides whether to trust the app with money.",
          tags: ["Messages", "Profile", "Empty states", "Payment card", "Payouts"],
        },
        {
          title: "Handover, then two years of updates",
          lead: "Built for developers, and kept improving 2023 to 2025.",
          text: "Sections are marked ready for development, with redline specs for shared parts like the status bar and tab menu, plus separate sections for animations and push notifications. Later work sits in its own update sections. The app went live on the stores, and $10K+ was paid out to artists and organizers in under a month.",
          tags: ["Ready for dev", "Redlines", "Animations", "Updates"],
        },
      ],
      board: [
        { kind: "post-event", name: "Post event", note: "The organizer describes the event once: name, place, date, offer, a banner image and the details.", src: "/projects/case/bookedez/post-event.webp", width: 750, height: 2042, alt: "BookedEZ's Post event screen: event name, location, date, offer, description and image upload" },
        { kind: "pending-requests", name: "Pending requests", note: "Every artist who asks to play lands in one list under the event, one tap from their request.", src: "/projects/case/bookedez/pending-requests.webp", width: 750, height: 1728, alt: "BookedEZ's Pending requests screen: an Art Gallery Opening with 26 artist requests" },
        { kind: "artist-details", name: "Artist details", note: "Availability, rate, bio, socials and music in one view, with Book now at the bottom.", src: "/projects/case/bookedez/artist-details.webp", width: 750, height: 1788, alt: "BookedEZ's Artist details screen: availability, rate per event, bio, social links and a Book now button" },
      ],
    },
    description: "How I designed BookedEZ's full dark-mode mobile app (profiles, membership tiers and the booking flow). $10K+ was paid out to artists and organizers in under a month, with 100+ downloads in the first month.",
  },
];

export const getCaseStudy = (slug: string) => CASE_STUDY_DATA.find((c) => c.slug === slug);
