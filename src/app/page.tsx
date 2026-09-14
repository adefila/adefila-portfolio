import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import SocialProof from "@/components/SocialProof";
import Projects from "@/components/Projects";
import WhyMe from "@/components/WhyMe";
import HowIWork from "@/components/HowIWork";
import Testimonials from "@/components/Testimonials";
import About from "@/components/About";
import FAQ from "@/components/FAQ";
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
      <Testimonials />
      <About />
      <FAQ />
      <Footer />
    </main>
  );
}
