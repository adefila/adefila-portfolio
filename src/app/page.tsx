import { jsonLd } from "@/lib/personalJsonLd";
import PersonalNav from "@/components/personal/PersonalNav";
import PersonalToc from "@/components/personal/PersonalToc";
import PersonalPage from "@/components/personal/PersonalPage";
import BookingPopup from "@/components/BookingPopup";
import ScrollReveal from "@/components/ScrollReveal";
import SpecNumbers from "@/components/SpecNumbers";
import SectionTitles from "@/components/SectionTitles";
import MagneticButtons from "@/components/MagneticButtons";
import ClickTracking from "@/components/ClickTracking";

// The personal site (adefilasamuel.com), the one used to apply for roles: written in my own voice and mostly text.
// The business site (what clients buy: process, what you get, pricing, FAQ, contact) is web.adefilasamuel.com, see app/business.
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
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
      <ScrollReveal />
      <SpecNumbers />
      <SectionTitles />
      <MagneticButtons />
      <ClickTracking />
      <BookingPopup />
      <PersonalNav />
      <PersonalToc />
      <PersonalPage />
    </main>
  );
}
