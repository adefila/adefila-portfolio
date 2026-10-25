import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { FORCE_DARK } from "@/lib/theme";

// One typeface for the whole site. The latin-ext subset covers the accents of French, Spanish, German and Portuguese;
// Chinese and Japanese fall back to the visitor's system font.
const geist = Geist({ subsets: ["latin", "latin-ext"], variable: "--font-geist", display: "swap" });
// The second voice: small technical labels (section numbers, tags, years). Used sparingly.
const geistMono = Geist_Mono({ subsets: ["latin"], variable: "--font-geist-mono", display: "swap" });

export const metadata: Metadata = {
  metadataBase: new URL("https://adefilasamuel.com"),
  title: "Samuel Adefila | Web Developer & Framer Designer",
  description:
    "Samuel Adefila is a web developer and Framer designer in Nigeria, building websites for founders and small businesses worldwide. Brief to live in 14 days. Top Rated on Upwork.",
  keywords: [
    "web developer",
    "freelance web developer",
    "web developer Nigeria",
    "Framer developer",
    "Figma to Framer",
    "custom Framer website",
    "Framer development",
    "web designer for founders",
    "Upwork Top Rated",
    "Samuel Adefila",
  ],
  openGraph: {
    title: "Samuel Adefila | Web Developer & Framer Designer",
    description:
      "50+ Framer sites shipped for founders and teams. Brief to live in 14 days. Top Rated on Upwork, 100% Job Success. Book a call.",
    type: "website",
    url: "https://adefilasamuel.com",
  },
  twitter: {
    card: "summary_large_image",
    title: "Samuel Adefila | Web Developer & Framer Designer",
    description:
      "50+ Framer sites. Brief to live in 14 days. Top Rated on Upwork. Book a free call.",
  },
  alternates: {
    canonical: "https://adefilasamuel.com",
  },
};

import Cursor from "@/components/Cursor";
import VisitBeacon from "@/components/VisitBeacon";
import { LangProvider } from "@/context/LangContext";
import LanguageSwitcher from "@/components/LanguageSwitcher";
import { GoogleAnalytics } from "@next/third-parties/google";

const jsonLd = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Person",
      "@id": "https://adefilasamuel.com/#person",
      name: "Samuel Adefila",
      alternateName: "Adefila Samuel",
      url: "https://adefilasamuel.com",
      jobTitle: "Web Developer & Framer Designer",
      description:
        "Web developer and Framer designer based in Nigeria. Takes projects from brief to live in 14 days with Framer, Webflow, Shopify and Next.js. Top Rated on Upwork with 100% Job Success.",
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
      name: "Samuel Adefila | Web Developer & Framer Designer",
      description:
        "Portfolio of Samuel Adefila. 50+ Framer sites built for founders and teams. Brief to live in 14 days.",
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
    <html lang="en" className={`${geist.variable} ${geistMono.variable}`} suppressHydrationWarning>
      <head>
        <meta name="theme-color" content="#0f0f0f" />
        <meta name="color-scheme" content={FORCE_DARK ? "dark" : "light dark"} />
        {/* Applies the saved colour theme before first paint (same rule as ThemeToggle.tsx): light unless the visitor chose dark, or "match my device" on a dark device. */}
        <script
          dangerouslySetInnerHTML={{
            __html: FORCE_DARK
              ? `document.documentElement.setAttribute("data-theme","dark")`
              : `try{var p=localStorage.getItem("sam-theme");var d=p==="dark"||(p==="system"&&matchMedia("(prefers-color-scheme: dark)").matches);document.documentElement.setAttribute("data-theme",d?"dark":"light")}catch(e){}`,
          }}
        />
        {/* Runs before first paint: enable scroll reveals (ScrollReveal.tsx), skip the preloader after its first showing in
            this tab, and make a reload start from the hero instead of the
            section hash the navbar wrote into the URL while scrolling. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `document.documentElement.setAttribute("data-reveal-ready","");try{if(sessionStorage.getItem("preloader-seen"))document.documentElement.setAttribute("data-preloader-seen","");else if(location.pathname==="/")document.documentElement.setAttribute("data-hero-wait","");history.scrollRestoration="manual";var n=performance.getEntriesByType("navigation")[0];if(n&&n.type==="reload"){if(location.hash)history.replaceState(null,"",location.pathname+location.search);var toHero=function(){scrollTo({top:0,left:0,behavior:"instant"})};toHero();addEventListener("DOMContentLoaded",toHero);addEventListener("load",toHero)}}catch(e){}`,
          }}
        />
        {/* The page is pre-rendered in English. If the visitor will be shown another language (link, saved choice or
            browser language, same order as LangContext), hold the content back until LangProvider has switched, so
            English never flashes first. A timeout releases it in any case. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `try{var d=document.documentElement,q=new URLSearchParams(location.search).get("lang"),c=localStorage.getItem("sam-lang-chosen")==="1",b=(navigator.language||"en").toLowerCase().split("-")[0];if(b==="nb"||b==="nn")b="no";var w=q||(c?localStorage.getItem("sam-lang"):b);if(w&&["fr","es","de","pt","zh","ja","nl","no"].indexOf(w)>-1&&!((w==="nl"||w==="no")&&location.pathname.indexOf("/local-business")!==0)){d.setAttribute("data-lang-pending","");setTimeout(function(){d.removeAttribute("data-lang-pending")},1500)}}catch(e){}`,
          }}
        />
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
        <VisitBeacon />
        <script src="https://batonedit.com/h.js" data-site="c276307dec" defer></script>
      </body>
      <GoogleAnalytics gaId={process.env.NEXT_PUBLIC_GA_ID!} />
    </html>
  );
}
