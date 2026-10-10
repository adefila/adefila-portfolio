// ─── Case studies ────────────────────────────────────────────────────────────
//
// Each entry becomes a page at /work/<slug>. To add one, copy TEMPLATE below into the list,
// fill it in, and set published: true.
//
// - Drafts (published: false) can still be opened at /work/<slug> to preview, show a
//   "Draft" banner, are hidden from Google and are not linked from the site.
// - Published ones get a "Read case study" link on their project card and go in the sitemap.
// - Leave any optional field out (or empty) and its section simply doesn't show.
// - Images go in /public/projects (e.g. "/projects/talon-tyres.webp"). Use wide screenshots,
//   about 1600 x 840, so they match the project cards.
// - Only write results you can stand behind (numbers the client gave you, or that you measured).
//
// const TEMPLATE: CaseStudy = {
//   slug: "project-name",                 // the address: adefilasamuel.com/work/project-name
//   title: "Project Name",                // must match the title on the project card
//   published: false,
//   summary: "One sentence: what it is and who it is for.",
//   year: "2026",
//   tags: ["Industry", "Build type"],
//   client: "Client name, or 'Concept project'",
//   role: "Design and development",
//   timeline: "3 weeks",
//   stack: ["Framer", "Figma"],
//   liveUrl: "https://example.com",
//   cover: "/projects/project-name.webp",
//   brief: ["What the client needed and why. One or two short paragraphs."],
//   built: ["How you approached it."],
//   features: ["A thing you built", "Another thing you built"],
//   results: [{ value: "2x", label: "more enquiries in the first month" }],
//   gallery: [{ src: "/projects/project-name-2.webp", alt: "Describe the screen", caption: "Optional caption" }],
//   quote: { text: "What the client said.", name: "Their name", role: "Their role, Company" },
// };

export interface CaseStudy {
  slug: string;
  title: string;
  published: boolean;
  summary: string;
  year: string;
  tags: string[];
  client?: string;
  role?: string;
  timeline?: string;
  stack?: string[];
  liveUrl?: string;
  cover: string;
  brief?: string[];
  built?: string[];
  features?: string[];
  results?: { value: string; label: string }[];
  gallery?: { src: string; alt: string; caption?: string }[];
  quote?: { text: string; name: string; role?: string };
}

export const caseStudies: CaseStudy[] = [
  {
    slug: "talon-tyres",
    title: "Talon Tyres",
    published: false,
    summary: "A performance tyre brand website with a 3D car hero and a set builder that helps drivers choose the right tyres.",
    year: "2026",
    tags: ["Automotive", "Next.js + 3D"],
    // TODO: client name, or "Concept project"
    role: "Design and development",
    // TODO: timeline
    stack: ["Next.js", "React", "Three.js", "React Three Fiber", "Framer Motion"],
    liveUrl: "https://talon-tyres.vercel.app/",
    cover: "/projects/talon-tyres.webp",
    brief: [
      "Tyres all look alike in a product grid, so the brand needed a site that feels as fast as the products are meant to be, and that helps a driver pick the right set without phoning a shop.",
      // TODO: anything the client asked for in their own words
    ],
    built: [
      "The home page opens on a 3D car built with Three.js, so the first thing a visitor sees is the product doing its job. Around it, a bold motorsport look: dark backgrounds, red accents and big condensed type.",
      "A set builder walks drivers through their car and how they drive, then suggests a set they can take to a store.",
    ],
    features: [
      "3D car hero rendered in the browser with React Three Fiber",
      "Product range split into performance, all-season and off-road",
      "Build your set configurator",
      "Technology, blog, FAQ and contact pages",
    ],
    // results: [{ value: "", label: "" }],
  },
  {
    slug: "calder-health",
    title: "Calder Health",
    published: false,
    summary: "A telehealth website for personalised online care, with a content editor so the team can update pages without code.",
    year: "2026",
    tags: ["HealthTech", "Next.js Build"],
    // TODO: client name, or "Concept project"
    role: "Design and development",
    // TODO: timeline
    stack: ["Next.js", "Custom CSS design system", "Decap CMS"],
    liveUrl: "https://calder-health.vercel.app/",
    cover: "/projects/calder-health.webp",
    brief: [
      "People looking for care online want to feel safe before they book. The site had to be calm, clear and trustworthy, and the team needed to change pages themselves without waiting on a developer.",
    ],
    built: [
      "A custom design system in plain CSS keeps every page consistent: soft colours, generous spacing and simple type, so nothing feels clinical or pushy.",
      "The content lives in Decap CMS, so the team edits text, services and providers in a simple dashboard and the site updates on its own.",
    ],
    features: [
      "Service and provider pages built from one design system",
      "Content editor (Decap CMS) for non-technical staff",
      "Fast, mobile-first pages",
    ],
  },
];

export const publishedStudies = caseStudies.filter(s => s.published);

export function studyBySlug(slug: string): CaseStudy | undefined {
  return caseStudies.find(s => s.slug === slug);
}

// The published case study for a project card, matched by title.
export function studyForTitle(title: string): CaseStudy | undefined {
  return publishedStudies.find(s => s.title === title);
}
