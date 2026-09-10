import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import Projects from "@/components/Projects";
import WhyMe from "@/components/WhyMe";
import FeaturedProjects from "@/components/FeaturedProjects";
import About from "@/components/About";
import Testimonials from "@/components/Testimonials";
import Playground from "@/components/Playground";
import FAQ from "@/components/FAQ";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main
      style={{
        background: "var(--bg)",
        minHeight: "100vh",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: 0,
        overflowX: "hidden",
      }}
    >
      <Navbar />

      {/* Hero */}
      <Hero />

      {/* Stats - full-width dark section */}
      <Stats />

      {/* Recent Projects grid */}
      <Projects />

      {/* Why Me */}
      <WhyMe />

      {/* Featured Projects */}
      <FeaturedProjects />

      {/* About */}
      <About />

      {/* Playground */}
      <Playground />

      {/* Testimonials */}
      <Testimonials />

      {/* FAQ */}
      <FAQ />

      {/* Contact / CTA */}
      <Contact />

      {/* Footer */}
      <Footer />
    </main>
  );
}
