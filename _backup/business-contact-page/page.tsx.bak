import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import ContactForm from "@/components/ContactForm";
import FAQ from "@/components/FAQ";
import Footer from "@/components/Footer";
import BookingPopup from "@/components/BookingPopup";
import ScrollReveal from "@/components/ScrollReveal";
import SpecNumbers from "@/components/SpecNumbers";
import SectionTitles from "@/components/SectionTitles";
import MagneticButtons from "@/components/MagneticButtons";
import ClickTracking from "@/components/ClickTracking";

// web.adefilasamuel.com/contact: its own page for people who want a B2B website quote or a discovery call.
export const metadata: Metadata = {
  metadataBase: new URL("https://web.adefilasamuel.com"),
  title: "Contact: Book a Free Discovery Call for Your B2B Website | Samuel Adefila",
  description: "Tell me about your B2B website project and book a free discovery call. Framer or custom-code websites with a CMS and lead tracking, with a reply within 24 hours.",
  alternates: { canonical: "https://web.adefilasamuel.com/contact" },
  openGraph: { url: "https://web.adefilasamuel.com/contact", siteName: "Samuel Adefila", title: "Contact: Book a Free Discovery Call for Your B2B Website", description: "Tell me about your B2B website project and book a free discovery call." },
  twitter: { card: "summary_large_image", title: "Contact: Book a Free Discovery Call for Your B2B Website", description: "Tell me about your B2B website project and book a free discovery call." },
};

export default function BusinessContactPage() {
  return (
    <main style={{ background: "var(--bg)", minHeight: "100vh", overflowX: "hidden", width: "100%" }}>
      <ScrollReveal />
      <SpecNumbers />
      <SectionTitles />
      <MagneticButtons />
      <ClickTracking />
      <BookingPopup />
      <Navbar hide={["#about", "#experience"]} contactHref="/contact" brandHref="/business" />
      <div style={{ paddingTop: 72 }}>
        <ContactForm />
        <FAQ all />
      </div>
      <Footer />
    </main>
  );
}
