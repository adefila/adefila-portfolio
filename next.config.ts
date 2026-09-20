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
