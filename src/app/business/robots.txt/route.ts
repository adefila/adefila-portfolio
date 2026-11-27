// robots.txt for web.adefilasamuel.com (served at /robots.txt on that host).
export function GET() {
  return new Response("User-agent: *\nAllow: /\n\nSitemap: https://web.adefilasamuel.com/sitemap.xml\n", { headers: { "Content-Type": "text/plain" } });
}
