import type { Metadata } from "next";
import HeroClear from "@/components/HeroClear";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import BusinessWork from "@/components/BusinessWork";
import WhoFor from "@/components/WhoFor";
import ClientGrid from "@/components/ClientGrid";
import MidCTA from "@/components/MidCTA";
import WhyMe from "@/components/WhyMe";
import HowIWork from "@/components/HowIWork";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import SpecNumbers from "@/components/SpecNumbers";
import SectionTitles from "@/components/SectionTitles";
import MagneticButtons from "@/components/MagneticButtons";
import ClickTracking from "@/components/ClickTracking";
import MobileCTA from "@/components/MobileCTA";
import BookingPopup from "@/components/BookingPopup";
import ContactPopup from "@/components/ContactPopup";

// The business site, at web.adefilasamuel.com (next.config.ts rewrites that address to this page). It is the page cold emails and
// pitches point at: what you get, the process, pricing, FAQ and contact, with the client logos and testimonials as proof.
// The business site stands on its own: nothing on it links to the personal site.
export const metadata: Metadata = {
  metadataBase: new URL("https://web.adefilasamuel.com"),
  title: "B2B Website Design and Framer Development | Samuel Adefila",
  description:
    "B2B website design and Framer development for SaaS, fintech and service companies: fixed-price websites with a CMS, lead-capture forms and conversion tracking, built to bring in qualified leads. Landing pages live in 5 to 7 days, full rebuilds in about 4 weeks.",
  keywords: ["B2B website design", "Framer developer", "B2B web design", "SaaS website design", "lead generation website", "website redesign", "Framer website", "conversion focused website", "Next.js developer", "web designer for B2B companies"],
  alternates: { canonical: "https://web.adefilasamuel.com" },
  openGraph: { url: "https://web.adefilasamuel.com", siteName: "Samuel Adefila", title: "B2B Website Design and Framer Development", description: "Fixed-price B2B websites in Framer or custom code, built to bring in qualified leads." },
  twitter: { card: "summary_large_image", title: "B2B Website Design and Framer Development", description: "Fixed-price B2B websites in Framer or custom code, built to bring in qualified leads." },
};

const JSON_LD = {
  "@context": "https://schema.org",
  "@type": "ProfessionalService",
  name: "Samuel Adefila: B2B website design and Framer development",
  url: "https://web.adefilasamuel.com",
  description: "B2B website design and development in Framer or custom code, with a CMS, lead-capture forms and conversion tracking, at a fixed scope and price.",
  areaServed: "Worldwide",
  serviceType: ["B2B website design", "Framer development", "Website redesign", "Landing page design", "Conversion rate optimisation"],
  founder: { "@type": "Person", name: "Samuel Adefila" },
  sameAs: ["https://www.linkedin.com/in/adefila-samuel-144448201/", "https://upwork.com/freelancers/adefilasamuel"],
};

export default function BusinessPage() {
  return (
    <main style={{ background: "var(--bg)", minHeight: "100vh", overflowX: "hidden", width: "100%" }}>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(JSON_LD) }} />
      <HeroClear />
      <ScrollReveal />
      <SpecNumbers />
      <SectionTitles />
      <MagneticButtons />
      <ClickTracking />
      <BookingPopup />
      <ContactPopup />
      <Navbar hide={["#about", "#experience"]} contactHref="#contact-popup" />
      <Hero />
      <ClientGrid />
      <WhoFor />
      <BusinessWork />
      <MidCTA />
      <WhyMe />
      <HowIWork />
      <Pricing />
      <Testimonials />
      <FAQ moreHref="expand" />
      <Footer />
      <MobileCTA />
    </main>
  );
}
