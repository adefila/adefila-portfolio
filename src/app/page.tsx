import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import Projects from "@/components/Projects";
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
      <Navbar />
      <Hero />
      <SocialProof />
      <Projects />
      <WhyMe />
      <HowIWork />
      <Pricing />
      <Testimonials />
      <About />
      <Currently />
      <SideProjects />
      <FAQ />
      <ContactForm />
      <Footer />
    </main>
  );
}
