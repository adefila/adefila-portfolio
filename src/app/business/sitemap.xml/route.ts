// Sitemap for web.adefilasamuel.com (served at /sitemap.xml on that host; see the rewrites in next.config.ts).
const BASE = "https://web.adefilasamuel.com";

export function GET() {
  const now = new Date().toISOString();
  const urls = [{ loc: `${BASE}/`, priority: "1.0" }, { loc: `${BASE}/contact`, priority: "0.8" }];
  const xml = `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${urls
    .map((u) => `  <url><loc>${u.loc}</loc><lastmod>${now}</lastmod><changefreq>weekly</changefreq><priority>${u.priority}</priority></url>`)
    .join("\n")}\n</urlset>\n`;
  return new Response(xml, { headers: { "Content-Type": "application/xml" } });
}
