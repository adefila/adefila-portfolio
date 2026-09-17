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
  metadataBase: new URL("https://adefilasamuel.com"),
  title: "Samuel Adefila — Framer Developer | 14-Day Builds for Founders",
  description:
    "Samuel Adefila is a Framer developer and designer. He takes projects from brief to live in 14 days — 50+ projects shipped, Top Rated on Upwork with 100% Job Success. Book a free call.",
  keywords: [
    "Framer developer",
    "Figma to Framer",
    "custom Framer website",
    "Framer development",
    "web designer for founders",
    "Upwork Top Rated",
    "Samuel Adefila",
  ],
  openGraph: {
    title: "Samuel Adefila — Framer Developer",
    description:
      "50+ Framer sites shipped for founders and teams. Brief to live in 14 days. Top Rated on Upwork, 100% Job Success. Book a call.",
    type: "website",
    url: "https://adefilasamuel.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Samuel Adefila — Framer Developer",
    description:
      "50+ Framer sites. Brief to live in 14 days. Top Rated on Upwork. Book a free call.",
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
        "Framer developer and designer. Takes projects from brief to live in 14 days with Framer, Shopify, and Webflow. Top Rated on Upwork with 100% Job Success.",
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
      name: "Samuel Adefila — Framer Developer & UI/UX Designer",
      description:
        "Portfolio of Samuel Adefila — 50+ Framer sites built for founders and teams. Brief to live in 14 days.",
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
        <meta name="theme-color" content="#0f0f0f" />
        <meta name="color-scheme" content="light" />
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
