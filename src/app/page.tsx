import dynamic from "next/dynamic";

// Above-the-fold — eager
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";

// Below-the-fold — code-split, load on demand
const Projects    = dynamic(() => import("@/components/Projects"));
const WhyMe       = dynamic(() => import("@/components/WhyMe"));
const HowIWork    = dynamic(() => import("@/components/HowIWork"));
const Pricing     = dynamic(() => import("@/components/Pricing"));
const Testimonials = dynamic(() => import("@/components/Testimonials"));
const About       = dynamic(() => import("@/components/About"));
const Currently   = dynamic(() => import("@/components/Currently"));
const SideProjects = dynamic(() => import("@/components/SideProjects"));
const FAQ         = dynamic(() => import("@/components/FAQ"));
const ContactForm  = dynamic(() => import("@/components/ContactForm"));
const Footer      = dynamic(() => import("@/components/Footer"));

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
