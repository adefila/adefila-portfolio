import { T } from "@/i18n/translations";

// The case studies built from this one template (DLP Africa has its own page, with its own process timeline).
// Every claim here is from the project record or the client's own words (src/i18n/translations.ts); nothing is
// added that was not recorded. Add a project here, then to src/lib/caseStudies.ts, to give it a page.
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
  metric: CaseMetric;
  quote?: { text: string; by: string; role: string };
  video?: { src: string; poster: string; by: string; role: string };
  site?: string;
  hero: { kind: "site"; src: string; width: number; height: number; alt: string } | { kind: "design"; src: string; size: number; alt: string; panel: string };
  shots: CaseShot[];
  shotsTitle: string;
  shotsIntro: string;
  description: string;
};

const en = (key: string) => T[key]?.en ?? "";

export const CASE_STUDY_DATA: CaseStudy[] = [
  {
    slug: "the-initial",
    client: "The Initial",
    industry: "Creative agency",
    title: "The Initial: one landing page, 5+ new clients.",
    lede: "The Initial Agency needed a landing page that brings in clients, not just one that looks good. I turned their Figma design into a fast Framer site, then added a page of social proof.",
    facts: [
      ["Client", "The Initial Agency"],
      ["Industry", "Creative agency"],
      ["Scope", "Landing page and a social proof page"],
      ["Platform", "Figma to Framer, with a CMS"],
      ["Year", "2025"],
      ["Result", "5+ new clients"],
    ],
    brief: en("cases.initial.brief"),
    did: en("cases.initial.did"),
    metric: { value: 5, suffix: "+", label: en("cases.initial.metricLabel") },
    quote: { text: en("testimonials.t2"), by: "Johnno Van Den Brink", role: "The Initial Agency" },
    site: "https://the-initial.com/",
    hero: { kind: "site", src: "/projects/case/the-initial/home.webp", width: 1400, height: 8594, alt: "The Initial's home page: a dark, minimal landing page with a call to action and four proof points" },
    shotsTitle: "The live site.",
    shotsIntro: "Hover a page to scroll it from top to bottom. On a phone, each one scrolls by itself as it comes into view.",
    shots: [
      { src: "/projects/case/the-initial/home.webp", width: 1400, height: 8594, caption: "Home" },
      { src: "/projects/case/the-initial/cro-agencies.webp", width: 1400, height: 7552, caption: "Agencies page" },
    ],
    description: "How I turned The Initial's Figma design into a fast Framer landing page with custom interactions and a CMS, and added a page of social proof. It has brought in 5+ new clients.",
  },
  {
    slug: "leadopo",
    client: "Leadopo",
    industry: "Lead generation SaaS",
    title: "Leadopo: a Framer site fixed in every language.",
    lede: "Leadopo's site styles kept breaking across its different language versions. I audited the whole Framer build, found what was causing it and fixed it at the source.",
    facts: [
      ["Client", "Leadopo"],
      ["Industry", "Lead generation SaaS"],
      ["Scope", "Full build audit and fix"],
      ["Platform", "Framer"],
      ["Year", "2026"],
      ["Result", "Every language version fixed"],
    ],
    brief: en("cases.leadopo.brief"),
    did: en("cases.leadopo.did"),
    metric: { text: en("cases.leadopo.metric"), label: en("cases.leadopo.metricLabel") },
    quote: { text: en("testimonials.t4"), by: "Michal Kouril", role: "Leadopo" },
    site: "https://www.leadopo.com/",
    hero: { kind: "site", src: "/projects/case/leadopo/home.webp", width: 1400, height: 7732, alt: "Leadopo's English home page: We generate converting leads, on a bright blue background" },
    shotsTitle: "The same site, in two languages.",
    shotsIntro: "Hover a page to scroll it from top to bottom. On a phone, each one scrolls by itself as it comes into view.",
    shots: [
      { src: "/projects/case/leadopo/home.webp", width: 1400, height: 7732, caption: "English" },
      { src: "/projects/case/leadopo/czech.webp", width: 1400, height: 7876, caption: "Czech" },
      { src: "/projects/case/leadopo/hubspot.webp", width: 1400, height: 9000, caption: "HubSpot page" },
    ],
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
      ["Industry", "Events marketplace"],
      ["Scope", "Full mobile app design"],
      ["Platform", "Dark-mode mobile app"],
      ["Years", "2023 to 2025"],
      ["Status", "Live on stores"],
    ],
    brief: en("cases.bookedez.brief"),
    did: en("cases.bookedez.did"),
    metric: { prefix: "$", value: 10, suffix: "K+", label: en("cases.bookedez.metricLabel") },
    video: { src: "/davonte-wheeler.mp4", poster: "/davonte-wheeler-poster.jpg", by: "Davonte Wheeler", role: "CEO · BookedEZ LLC" },
    hero: { kind: "design", src: "/projects/design/bookedez.jpg", size: 2000, alt: "BookedEZ's dark-mode mobile app: profiles, membership tiers and the booking flow", panel: "#18181a" },
    shots: [],
    shotsTitle: "",
    shotsIntro: "",
    description: "How I designed BookedEZ's full dark-mode mobile app (profiles, membership tiers and the booking flow). $10K+ was paid out to artists and organizers in under a month, with 100+ downloads in the first month.",
  },
];

export const getCaseStudy = (slug: string) => CASE_STUDY_DATA.find((c) => c.slug === slug);
