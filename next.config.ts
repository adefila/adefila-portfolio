import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  compress: true,
  images: {
    formats: ["image/avif", "image/webp"],
    remotePatterns: [
      { protocol: "https", hostname: "covers.openlibrary.org" },
      { protocol: "https", hostname: "i.scdn.co" },
      { protocol: "https", hostname: "api.microlink.io" },
    ],
  },
  // web.adefilasamuel.com is the business site: the same app, showing /business at its root. (web.localhost is for testing.)
  async rewrites() {
    return {
      beforeFiles: [
        { source: "/", has: [{ type: "host" as const, value: "web\\.(adefilasamuel\\.com|localhost)" }], destination: "/business" },
        { source: "/contact", has: [{ type: "host" as const, value: "web\\.(adefilasamuel\\.com|localhost)" }], destination: "/business/contact" },
        { source: "/sitemap.xml", has: [{ type: "host" as const, value: "web\\.(adefilasamuel\\.com|localhost)" }], destination: "/business/sitemap.xml" },
        { source: "/robots.txt", has: [{ type: "host" as const, value: "web\\.(adefilasamuel\\.com|localhost)" }], destination: "/business/robots.txt" },
      ],
      afterFiles: [],
      fallback: [],
    };
  },
  async redirects() {
    return [
      // the old business page, linked from emails already sent
      { source: "/local-business", destination: "https://web.adefilasamuel.com/", permanent: true },
      // /business is only an internal address; the public one is web.adefilasamuel.com
      { source: "/business", has: [{ type: "host" as const, value: "(www\\.)?adefilasamuel\\.com" }], destination: "https://web.adefilasamuel.com/", permanent: true },
      { source: "/business/contact", has: [{ type: "host" as const, value: "(www\\.)?adefilasamuel\\.com" }], destination: "https://web.adefilasamuel.com/contact", permanent: true },
    ];
  },
  async headers() {
    const isDev = process.env.NODE_ENV === "development";
    return [
      {
        // Immutable cache for hashed static assets (JS/CSS bundles) — production only
        source: "/_next/static/:path*",
        headers: [
          {
            key: "Cache-Control",
            value: isDev ? "no-store" : "public, max-age=31536000, immutable",
          },
        ],
      },
      {
        // Images: cache for 7 days, allow revalidation
        source: "/_next/image/:path*",
        headers: [
          { key: "Cache-Control", value: "public, max-age=604800, stale-while-revalidate=86400" },
        ],
      },
      {
        // HTML pages: always revalidate so deploys propagate instantly
        source: "/",
        headers: [
          { key: "Cache-Control", value: "public, max-age=0, must-revalidate" },
        ],
      },
    ];
  },
};

export default nextConfig;
