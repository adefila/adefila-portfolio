import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ClientGrid from "@/components/ClientGrid";
import WhyMe from "@/components/WhyMe";
import HowIWork from "@/components/HowIWork";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import ClickTracking from "@/components/ClickTracking";
import MobileCTA from "@/components/MobileCTA";
import BookingPopup from "@/components/BookingPopup";
import LocalCopy from "@/components/local/LocalCopy";
import { ConceptWork, Systems, TermsStrip } from "@/components/local/LocalSections";

// The page cold emails to local businesses point at. It is the homepage, section for section, with
// the wording swapped for business owners (LocalCopy, in the visitor's language: src/i18n/local-business)
// and the "Selected work" grid replaced by the systems I set up. The language follows the visitor's
// country, or ?lang=nl (Dutch), no, fr, de, es, pt, zh, ja, en in the link.
export const metadata: Metadata = {
  title: "More bookings, fewer missed calls | Samuel Adefila",
  description:
    "Simple systems for clinics, trades and local businesses: online booking with reminders, quote requests straight to your phone, automatic review requests, and websites that work on a phone. Live in two weeks.",
  alternates: { canonical: "https://adefilasamuel.com/local-business" },
};

// Everyday words that point at each of the six questions (see the FAQ's "Ask your own question" box).
// English words; a visitor typing in their own language is matched on the question text instead.
const FAQ_WORDS: Record<number, string[]> = {
  0: ["website", "site", "redesign", "new", "existing", "keep", "current", "replace", "need"],
  1: ["calendar", "google", "outlook", "email", "phone", "software", "integrate", "integration", "system", "already", "tool", "connect", "whatsapp", "sms", "text", "crm", "use"],
  2: ["technical", "tech", "skills", "learn", "difficult", "complicated", "hard", "easy", "train", "training", "walkthrough", "simple", "staff", "team"],
  3: ["long", "time", "fast", "quick", "week", "day", "deadline", "live", "ready", "launch", "start", "soon", "urgent", "setup"],
  4: ["pay", "price", "pricing", "cost", "much", "charge", "fee", "deposit", "upfront", "invoice", "quote", "budget", "cheap", "expensive", "payment", "afford", "percent", "installment"],
  5: ["change", "later", "update", "edit", "support", "maintenance", "help", "ongoing", "monthly", "after", "fix", "problem", "issue"],
};

export default function LocalBusinessPage() {
  return (
    <main style={{ background: "var(--bg)", minHeight: "100vh", overflowX: "hidden", width: "100%" }}>
      <ScrollReveal />
      <ClickTracking />
      <BookingPopup />
      <LocalCopy>
        <Navbar hide={["#about"]} />
        <Hero altHref="/" />
        <ClientGrid />
        <Systems />
        <ConceptWork />
        <WhyMe />
        <HowIWork />
        <Pricing prices={[500, 1500, 2000]} />
        <TermsStrip />
        <Testimonials />
        <FAQ synonyms={FAQ_WORDS} />
        <ContactForm variant="local" />
        <Footer />
        <MobileCTA />
      </LocalCopy>
    </main>
  );
}
