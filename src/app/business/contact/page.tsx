import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import BookingPopup from "@/components/BookingPopup";
import ScrollReveal from "@/components/ScrollReveal";
import SpecNumbers from "@/components/SpecNumbers";
import ScrollRuler from "@/components/ScrollRuler";
import SectionTitles from "@/components/SectionTitles";
import MagneticButtons from "@/components/MagneticButtons";
import ClickTracking from "@/components/ClickTracking";

// web.adefilasamuel.com/contact: its own page for people who want a B2B website quote or a discovery call.
export const metadata: Metadata = {
  title: "Contact: Book a Free Discovery Call for Your B2B Website | Samuel Adefila",
  description: "Tell me about your B2B website project and book a free discovery call. Framer or custom-code websites with a CMS and lead tracking, with a reply within 24 hours.",
  alternates: { canonical: "https://web.adefilasamuel.com/contact" },
  openGraph: { url: "https://web.adefilasamuel.com/contact", siteName: "Samuel Adefila" },
};

export default function BusinessContactPage() {
  return (
    <main style={{ background: "var(--bg)", minHeight: "100vh", overflowX: "hidden", width: "100%" }}>
      <ScrollReveal />
      <SpecNumbers />
      <ScrollRuler />
      <SectionTitles />
      <MagneticButtons />
      <ClickTracking />
      <BookingPopup />
      <Navbar hide={["#work", "#about", "#experience", "#benefits", "#process", "#pricing", "#testimonials", "#faq"]} contactHref="/contact" />
      <div style={{ paddingTop: 72 }}>
        <ContactForm />
      </div>
      <Footer />
    </main>
  );
}
