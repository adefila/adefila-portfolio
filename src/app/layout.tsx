import type { Metadata } from "next";
import { Inter, Poppins } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Samuel Adefila — Framer Developer & UI/UX Designer | Websites That Convert",
  description:
    "Samuel Adefila is a product designer and no-code developer. He builds with Framer, Shopify, and Webflow — 50+ projects delivered, Top Rated on Upwork with 100% Job Success. Book a free call.",
  keywords: [
    "Framer developer",
    "UI/UX designer",
    "Framer website",
    "Figma to Framer",
    "custom website design",
    "conversion-focused web design",
    "Upwork Top Rated",
    "Samuel Adefila",
  ],
  openGraph: {
    title: "Samuel Adefila — Framer Developer & UI/UX Designer",
    description:
      "50+ custom Framer websites delivered for founders and agencies. Top Rated on Upwork with 100% Job Success. Book a free strategy call.",
    type: "website",
    url: "https://adefilasamuel.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Samuel Adefila — Framer Developer & UI/UX Designer",
    description:
      "50+ conversion-focused Framer websites. Top Rated on Upwork. Book a free call.",
  },
};

import Cursor from "@/components/Cursor";
import { LangProvider } from "@/context/LangContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://adefilasamuel.com/#person",
      name: "Samuel Adefila",
      url: "https://adefilasamuel.com",
      jobTitle: "Framer Developer & UI/UX Designer",
      description:
        "Product designer and no-code developer building conversion-focused websites with Framer, Shopify, and Webflow. Top Rated on Upwork with 100% Job Success.",
      sameAs: [
        "https://www.linkedin.com/in/adefila-samuel-144448201/",
        "https://x.com/adeyemiS_",
        "https://dribbble.com/Adeyemisamuel020",
        "https://www.behance.net/adefilasamuel",
        "https://layers.to/adeyemisamuel",
        "https://www.instagram.com/adeyemi929_",
        "https://www.upwork.com/freelancers/samueladefila",
      ],
    },
    {
      "@type": "WebSite",
      "@id": "https://adefilasamuel.com/#website",
      url: "https://adefilasamuel.com",
      name: "Samuel Adefila — Framer Developer & UI/UX Designer",
      description:
        "Portfolio of Samuel Adefila — 50+ conversion-focused websites built with Framer, Shopify, and Webflow.",
      author: { "@id": "https://adefilasamuel.com/#person" },
    },
    {
      "@type": "ProfessionalService",
      "@id": "https://adefilasamuel.com/#service",
      name: "Samuel Adefila — Web Design & Development",
      url: "https://adefilasamuel.com",
      provider: { "@id": "https://adefilasamuel.com/#person" },
      serviceType: [
        "Framer Development",
        "Webflow Development",
        "Shopify Development",
        "UI/UX Design",
        "Figma to Framer",
        "Website Migration",
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

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={`${inter.variable} ${poppins.variable}`}>
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
      </head>
      <body>
        <LangProvider>
          <Cursor />
          {children}
          <LanguageSwitcher />
        </LangProvider>
      </body>
    </html>
  );
}
