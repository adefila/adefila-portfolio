import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ClientGrid from "@/components/ClientGrid";
import Projects from "@/components/Projects";
import MidCTA from "@/components/MidCTA";
import WhyMe from "@/components/WhyMe";
import HowIWork from "@/components/HowIWork";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import About from "@/components/About";
import FAQ from "@/components/FAQ";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import SpecNumbers from "@/components/SpecNumbers";
import ScrollRuler from "@/components/ScrollRuler";
import SectionTitles from "@/components/SectionTitles";
import MagneticButtons from "@/components/MagneticButtons";
import ClickTracking from "@/components/ClickTracking";
import MobileCTA from "@/components/MobileCTA";
import BookingPopup from "@/components/BookingPopup";

export default function Home() {
  return (
    <main
      style={{
        background: "var(--bg)",
        minHeight: "100vh",
        overflowX: "hidden",
        width: "100%",
      }}
    >
      <Preloader />
      <ScrollReveal />
      <SpecNumbers />
      <ScrollRuler />
      <SectionTitles />
      <MagneticButtons />
      <ClickTracking />
      <BookingPopup />
      <Navbar />
      <Hero />
      <div className="spec-rule" aria-hidden="true" />
      <ClientGrid />
      <div className="spec-rule" aria-hidden="true" />
      <Projects />
      <div className="spec-rule" aria-hidden="true" />
      <MidCTA />
      <WhyMe />
      <div className="spec-rule" aria-hidden="true" />
      <HowIWork />
      <div className="spec-rule" aria-hidden="true" />
      <Pricing />
      <div className="spec-rule" aria-hidden="true" />
      <Testimonials />
      <div className="spec-rule" aria-hidden="true" />
      <About />
      <div className="spec-rule" aria-hidden="true" />
      <FAQ />
      <div className="spec-rule" aria-hidden="true" />
      <ContactForm />
      <div className="spec-rule" aria-hidden="true" />
      <Footer />
      <MobileCTA />
    </main>
  );
}
