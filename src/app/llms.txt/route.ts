// llms.txt for the personal site (adefilasamuel.com): a short, plain description of the site for AI assistants and search tools.
// See https://llmstxt.org. Everything here is also on the page itself.
const BODY = `# Samuel Adefila

> Product designer and Framer developer based in Ibadan, Nigeria. UX and visual design in Figma, built in Framer, Next.js or custom code. Working remotely since 2020, Top Rated on Upwork with 100% Job Success across 50+ projects. Open to roles, remote or with relocation and visa sponsorship.

## About
- [Home](https://adefilasamuel.com/): Intro, toolkit, process, selected work with short case studies, experience, and ways to get in touch.
- [CV (PDF)](https://adefilasamuel.com/samuel-adefila-cv.pdf): Full CV with roles and results.

## What I do
- Product and UI/UX design for web and mobile: flows, wireframes, high-fidelity Figma, prototypes.
- Front-end build: Framer, Next.js and custom code, with Claude Code and Cursor to move from idea to working interface quickly.
- Websites with a CMS, tracked forms and clean handover.

## Selected work (case studies on the home page)
- DLP Africa: 12-page telecom website redesigned in Figma and built in Framer, live in 4 weeks.
- The Initial: one landing page that brought in 5+ new clients.
- Leadopo: multilingual styles fixed across every language version.
- BookedEZ: events marketplace app, $10K+ paid out in under a month.
- Neetly: laundry app UI/UX.

## Experience
- Web developer and Framer designer, self-employed (2020 to now)
- Framer developer, Klimt and Design (2025 to 2026)
- UI/UX designer, Virvly (2025 to 2026)
- UI/UX designer and project manager, Trust-Tai Web Agency (2024 to 2025)
- Framer developer, HitPay (2024 to 2025)
- Product manager and lead product designer, BookedEZ (2023 to 2025)

## Contact
- Email: samuel@adefilasamuel.com
- LinkedIn: https://www.linkedin.com/in/adefila-samuel-144448201/
- Upwork: https://upwork.com/freelancers/adefilasamuel
`;

export function GET() {
  return new Response(BODY, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
