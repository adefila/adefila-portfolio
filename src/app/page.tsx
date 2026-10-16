import Preloader from "@/components/Preloader";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ClientGrid from "@/components/ClientGrid";
import Projects from "@/components/Projects";
import CaseStudies from "@/components/CaseStudies";
import Teardown from "@/components/Teardown";
import MidCTA from "@/components/MidCTA";
import WhyMe from "@/components/WhyMe";
import HowIWork from "@/components/HowIWork";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import About from "@/components/About";
import Currently from "@/components/Currently";
import SideProjects from "@/components/SideProjects";
import FAQ from "@/components/FAQ";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
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
      <ClickTracking />
      <BookingPopup />
      <Navbar />
      <Hero />
      <ClientGrid />
      <Projects />
      <CaseStudies />
      <MidCTA />
      <WhyMe />
      <HowIWork />
      <Pricing />
      <Teardown />
      <Testimonials />
      <About />
      <Currently />
      <SideProjects />
      <FAQ />
      <ContactForm />
      <Footer />
      <MobileCTA />
    </main>
  );
}
