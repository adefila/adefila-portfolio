import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import WhyMe from "@/components/WhyMe";
import Projects from "@/components/Projects";
import Benefits from "@/components/Benefits";
import FeaturedProjects from "@/components/FeaturedProjects";
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
      <div
        style={{
          maxWidth: 1200,
          margin: "0 auto",
          width: "100%",
          padding: "0 20px",
          boxSizing: "border-box",
        }}
      >
        <Navbar />
        <Hero />
        <WhyMe />
        <Projects />
        <Benefits />
        <FeaturedProjects />
        <About />
        <Testimonials />
        <FAQ />
      </div>
      <Footer />
    </main>
  );
}
