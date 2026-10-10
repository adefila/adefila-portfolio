import { MetadataRoute } from "next";
import { publishedStudies } from "@/data/caseStudies";

const BASE = "https://adefilasamuel.com";

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: BASE,
      lastModified: new Date(),
      changeFrequency: "weekly",
      priority: 1,
    },
    ...publishedStudies.map(s => ({
      url: `${BASE}/work/${s.slug}`,
      lastModified: new Date(),
      changeFrequency: "monthly" as const,
      priority: 0.8,
    })),
  ];
}
