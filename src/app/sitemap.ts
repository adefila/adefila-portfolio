import { MetadataRoute } from "next";

const BASE = "https://adefilasamuel.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...["dlp-africa", "baton", "the-initial", "leadopo", "bookedez"].map((slug) => ({
      url: `${BASE}/case-studies/${slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.7,
    })),
  ];
}
