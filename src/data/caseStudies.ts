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
  // Drafts waiting for details from "Case study details.txt". Fill in, then set published: true.
  {
    slug: "upside-esg",
    title: "Upside ESG",
    published: false,
    summary: "An ESG reporting platform website with live data integrations, custom chart components and a resource library, built in Framer.",
    year: "2026",
    tags: ["ESG SaaS", "Framer + Integrations"],
    liveUrl: "https://upside-esg.com/",
    cover: "/projects/upside-esg.png",
  },
  {
    slug: "the-initial",
    title: "The Initial",
    published: false,
    summary: "An AI-powered creative agency website, taken from Figma designs to pixel-perfect Framer with custom interactions and a CMS.",
    year: "2025",
    tags: ["Creative Agency", "Figma to Framer"],
    liveUrl: "https://the-initial.com/",
    cover: "/projects/the-initial.png",
  },
  {
    slug: "bindhq",
    title: "BindHQ",
    published: false,
    summary: "An insurance management SaaS website, with a template customised to their design system, complex navigation and data-dense layouts.",
    year: "2026",
    tags: ["InsurTech", "Template Customization"],
    liveUrl: "https://www.bindhq.com/",
    cover: "/projects/bindhq.png",
  },
  {
    slug: "the-prime-media",
    title: "The Prime Media",
    published: false,
    summary: "A digital media agency website built in Framer for a Canadian creative studio, with a bold editorial layout and motion-forward sections.",
    year: "2025",
    tags: ["Media Agency", "Framer Build"],
    liveUrl: "https://theprimemedia.ca/",
    cover: "/projects/the-prime-media.png",
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
