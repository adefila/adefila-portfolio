// llms.txt for the business site (web.adefilasamuel.com), served at /llms.txt on that host (see the rewrites in next.config.ts).
// A short, plain description of the offer for AI assistants and search tools. See https://llmstxt.org.
const BODY = `# Samuel Adefila: B2B website design and Framer development

> Fixed-scope, fixed-price websites for B2B companies, built in Framer or custom code (Next.js) with a CMS your team controls, forms that track every enquiry, and redirects that protect your Google traffic. A landing page is live in 5 to 7 days; a full B2B rebuild takes about 4 weeks; custom builds 4 to 8 weeks.

## Pages
- [Home](https://web.adefilasamuel.com/): What you get, process, pricing, client work and testimonials.
- [Contact and FAQ](https://web.adefilasamuel.com/contact): Book a free discovery call or send a project brief; answers to the questions people ask before hiring.

## Services
- B2B website design and development in Framer, Webflow or Next.js
- Website redesign and migration without losing search traffic (redirects and re-indexing)
- Landing pages built to convert
- CMS setup so your team can edit without code
- Conversion tracking: forms wired to GA4
- Ongoing support on a monthly retainer

## How it works
1. Discovery call: a free 15-minute call to understand goals, audience and what done looks like.
2. Design review: pages and design system in Figma, reviewed before any code.
3. Website and CMS build: live preview early, with forms and analytics wired in as it is built.
4. Launch and handoff: QA on every device, redirects, deploy to your domain, a walkthrough video and a handover document.

## Results
- DLP Africa: 12 pages redesigned and built in 4 weeks, with a CMS for seven products.
- The Initial: one landing page brought in 5+ new clients.
- BookedEZ: $10K+ paid out in under a month.
- 50+ websites and apps shipped since 2020.

## Contact
- Book a free discovery call: https://web.adefilasamuel.com/contact
- Email: samuel@adefilasamuel.com
`;

export function GET() {
  return new Response(BODY, { headers: { "Content-Type": "text/plain; charset=utf-8", "Cache-Control": "public, max-age=3600" } });
}
