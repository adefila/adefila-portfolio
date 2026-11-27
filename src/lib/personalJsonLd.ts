// Structured data for the personal site (adefilasamuel.com) only. The business site (web.adefilasamuel.com) has its own.
export const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://adefilasamuel.com/#person",
      name: "Samuel Adefila",
      alternateName: "Adefila Samuel",
      url: "https://adefilasamuel.com",
      jobTitle: "B2B Website Developer",
      description:
        "B2B website developer based in Nigeria. Redesigns and rebuilds company websites in Framer or custom code (Next.js), with a CMS, tracked forms, SEO-safe redirects and a clean handover. Top Rated on Upwork with 100% Job Success.",
      homeLocation: { "@type": "Country", name: "Nigeria" },
      knowsAbout: ["Web development", "Website design", "Framer", "Webflow", "Shopify", "Next.js", "UI/UX design"],
      sameAs: [
        "https://www.linkedin.com/in/adefila-samuel-144448201/",
        "https://x.com/adeyemiS_",
        "https://dribbble.com/Adeyemisamuel020",
        "https://www.behance.net/adefilasamuel",
        "https://layers.to/adeyemisamuel",
        "https://www.instagram.com/adeyemi929_",
        "https://upwork.com/freelancers/adefilasamuel",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://adefilasamuel.com/#website",
      url: "https://adefilasamuel.com",
      name: "Samuel Adefila | B2B Website Developer (Framer & Custom)",
      description:
        "Portfolio of Samuel Adefila. B2B websites rebuilt in Framer or custom code, including DLP Africa: 12 pages live in 4 weeks.",
      author: { "@id": "https://adefilasamuel.com/#person" },
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://adefilasamuel.com/#service",
      name: "Samuel Adefila. Web Design & Development",
      url: "https://adefilasamuel.com",
      provider: { "@id": "https://adefilasamuel.com/#person" },
      serviceType: [
        "Framer Development",
        "Webflow Development",
        "Shopify Development",
        "UI/UX Design",
        "Figma to Framer",
        "Website Migrations",
      ],
      areaServed: "Worldwide",
      hasOfferCatalog: {
        "@type": "OfferCatalog",
        name: "Web Design Services",
        itemListElement: [
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Framer Website Design & Development" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Shopify Store Design" } },
          { "@type": "Offer", itemOffered: { "@type": "Service", name: "Webflow Development" } },
        ],
      },
    },
  ],
};
