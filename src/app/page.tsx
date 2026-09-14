import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhyMe from "@/components/WhyMe";
import Projects from "@/components/Projects";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
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
      <WhyMe />
      <Projects />
      <About />
      <Testimonials />
      <FAQ />
      <Footer />
    </main>
  );
}
