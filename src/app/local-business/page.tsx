import type { Metadata } from "next";
import { CopyOverride } from "@/context/LangContext";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import ClientGrid from "@/components/ClientGrid";
import WhyMe from "@/components/WhyMe";
import HowIWork from "@/components/HowIWork";
import Pricing from "@/components/Pricing";
import Testimonials from "@/components/Testimonials";
import FAQ from "@/components/FAQ";
import ContactForm from "@/components/ContactForm";
import Footer from "@/components/Footer";
import ScrollReveal from "@/components/ScrollReveal";
import ClickTracking from "@/components/ClickTracking";
import MobileCTA from "@/components/MobileCTA";
import BookingPopup from "@/components/BookingPopup";
import RevealWords from "@/components/RevealWords";
import {
  BookingIllustration, QuoteIllustration, ReviewIllustration, SiteIllustration,
} from "@/components/local/Illustrations";

// The page cold emails to local businesses point at. It is the homepage, section for
// section, with the wording swapped for business owners (CopyOverride) and the
// "Selected work" grid replaced by the systems I set up.
export const metadata: Metadata = {
  title: "More bookings, fewer missed calls | Samuel Adefila",
  description:
    "Simple systems for clinics, trades and local businesses: online booking with reminders, quote requests straight to your phone, automatic review requests, and websites that work on a phone. Live in two weeks.",
  alternates: { canonical: "https://adefilasamuel.com/local-business" },
};

const COPY: Record<string, string> = {
  // Hero
  "hero.h1": "MORE BOOKINGS.",
  "hero.h2.prefix": "FEWER",
  "hero.h2.words": "NO-SHOWS.|MISSED CALLS.|LOST QUOTES.",
  "hero.subtitle": "I set up simple systems for clinics, salons and trades: online booking with reminders, quote requests straight to your phone, and automatic review requests. Live in two weeks.",
  "hero.ctaWork": "SEE WHAT I SET UP",
  "clients.label": "BUSINESSES I'VE BUILT FOR",
  "hero.proof": "50+ Projects Delivered  ·  Fixed Price  ·  Live In Two Weeks",
  "hero.tagTopRated": "Fixed price · 2 weeks",
  "hero.localLink": "Building a startup or product? See my main portfolio",

  // What you get
  "whyme.eyebrow": "WHY WORK WITH ME",
  "whyme.h1": "Less time on the phone.",
  "whyme.h1b": "More time with customers.",
  "whyme.b0.title": "LIVE IN TWO WEEKS.",
  "whyme.b0.desc": "From our first call to customers using it in two weeks. You see it working before it goes live.",
  "whyme.b1.title": "BUILT AROUND HOW YOU WORK",
  "whyme.b1.desc": "I fit it to your calendar, email and phone, so you and your team don't have to learn a new way of working.",
  "whyme.b2.title": "ONE PERSON, START TO FINISH.",
  "whyme.b2.desc": "You deal with me from the first call to launch and after. No handoffs, no waiting on a team.",
  "whyme.b3.title": "NO TECH SKILLS NEEDED",
  "whyme.b3.desc": "Everything is set up for you, with a short walkthrough. If you can use email, you can use this.",
  "whyme.svc1": "DENTISTS & CLINICS",
  "whyme.svc2": "PHYSIOS & THERAPISTS",
  "whyme.svc3": "SALONS & SPAS",
  "whyme.svc4": "PLUMBERS, ROOFERS & BUILDERS",
  "whyme.svc5": "RESTAURANTS & BAKERIES",
  "whyme.svc6": "LAWYERS & ACCOUNTANTS",

  // Process
  "process.h1": "From first call to live.",
  "process.h1b": "Two weeks, start to finish.",
  "process.desc": "Day 1 is a short call. By Day 4 you've seen how it will work. By Day 14 your customers are using it. That's the schedule, not a rough estimate.",
  "process.s0.title": "Free Call",
  "process.s0.desc": "A 15-minute call about how bookings, calls and enquiries work today. I suggest the one or two changes that would save you the most time, with a fixed price.",
  "process.s0.detail": "No sales pitch. If you don't need anything, I'll tell you.",
  "process.s1.title": "The Plan",
  "process.s1.desc": "I show you exactly how it will work for your customers: the booking page, the reminder texts, the quote form. You change anything you want.",
  "process.s1.detail": "Nothing gets built until you're happy with how it works.",
  "process.s2.title": "The Setup",
  "process.s2.desc": "I build it and connect it to your calendar, email and phone. You get a preview link to try it yourself before customers see it.",
  "process.s2.detail": "If you already have a website, I add it to that. No need to start over.",
  "process.s3.title": "Live & Handover",
  "process.s3.desc": "It goes live, I test it on every device, and I record a short video showing you and your team how it works.",
  "process.s3.detail": "After that it runs on its own, and I'm a message away if you need anything.",

  // FAQ (unused slots are blanked so only these show)
  "faq.q0": "DO I NEED A NEW WEBSITE?",
  "faq.a0": "Not always. Many businesses only need booking, reminders or a quote form added to the site they already have. I'll tell you honestly on the call.",
  "faq.q1": "WILL IT WORK WITH WHAT I ALREADY USE?",
  "faq.a1": "Where possible, yes. I build around your current calendar, email and phone, so your team doesn't have to learn a whole new way of working.",
  "faq.q2": "DO I NEED TO BE TECHNICAL?",
  "faq.a2": "No. Everything is set up for you, and you get a short video walkthrough. If you can use email, you can use this.",
  "faq.q3": "HOW LONG DOES IT TAKE?",
  "faq.a3": "Two weeks from the day we start to the day it's live. You see it working before your customers do.",
  "faq.q4": "HOW DO I PAY?",
  "faq.a4": "We agree a fixed price on the call, before any work starts. You pay 70% to start and the remaining 30% when it's live. No hourly billing and no surprises.",
  "faq.q5": "WHAT IF I NEED CHANGES LATER?",
  "faq.a5": "Just message me. Small changes are quick, and ongoing support is available if you'd like someone looking after it every month.",
  "faq.q6": "", "faq.q7": "", "faq.q8": "", "faq.q9": "",
  "faq.ask.placeholder": "e.g. Will it work with my calendar?",

  // Pricing: the same price points as the main site, described as what a business owner gets
  "pricing.eyebrow": "WHAT IT COSTS",
  "pricing.h2a": "FIXED PRICE.",
  "pricing.h2b": "NO SURPRISES.",
  "pricing.desc": "Every setup has one fixed price, agreed on a free call before any work starts. You pay 70% to start and 30% when it's live. No hourly billing and no monthly fees you didn't ask for.",
  "pricing.cta": "Book a free call",
  "pricing.disclaimer": "All prices are starting points. Your fixed price is confirmed on a free 15-minute call, with no obligation.",
  "pricing.plan0.label": "START SMALL",
  "pricing.plan0.name": "One System",
  "pricing.plan0.desc": "One thing fixed well: online booking with reminders, or quote requests straight to your phone.",
  "pricing.plan0.f0": "Online booking with text and email reminders, or a quote form",
  "pricing.plan0.f1": "Works with your current calendar and phone",
  "pricing.plan0.f2": "Looks right and loads fast on any phone",
  "pricing.plan0.f3": "A short video showing you and your team how to use it",
  "pricing.plan0.f4": "Live within 2 weeks",
  "pricing.plan1.label": "FULL SETUP",
  "pricing.plan1.name": "Complete Setup",
  "pricing.plan1.desc": "Everything working together: a clear website, booking, reminders, quote requests and review requests.",
  "pricing.plan1.f0": "A clear, fast website for your business",
  "pricing.plan1.f1": "Online booking with reminders",
  "pricing.plan1.f2": "Quote and enquiry form that goes to your phone",
  "pricing.plan1.f3": "Automatic Google review requests",
  "pricing.plan1.f4": "A short video for you and your team",
  "pricing.plan1.f5": "Live within 2 weeks",
  "pricing.plan2.label": "SELL ONLINE",
  "pricing.plan2.name": "Setup + Online Orders",
  "pricing.plan2.desc": "For shops, bakeries and studios that also want to take orders, deposits or payments online.",
  "pricing.plan2.f0": "Everything in Complete Setup",
  "pricing.plan2.f1": "Online orders or deposit payments",
  "pricing.plan2.f2": "Product or service pages that make it easy to buy",
  "pricing.plan2.f3": "Order and booking alerts straight to your phone",
  "pricing.plan2.f4": "Live within 2 weeks",
  "pricing.addon0": "Move your existing website",
  "pricing.addon1": "Monthly care and changes",
  "pricing.addon2": "Add booking or reviews to your current site",
  "pricing.addon3": "Google Business Profile tune-up",

  // Contact
  "contact.h1": "WANT FEWER MISSED CALLS?",
  "contact.h1b": "TELL ME ABOUT YOUR BUSINESS.",
  "contact.desc": "Tell me how bookings and enquiries work today and I'll come back within 24 hours with an honest take on what would help, and what it would cost.",
  "contact.label.service": "What would help most?",
  "contact.label.budget": "Rough budget",
  "contact.label.message": "Tell me about your business",
  "contact.label.business": "Business name (and website, if you have one)",
  "contact.ph.business": "e.g. Bright Smile Dental, brightsmile.com",
  "contact.ph.message": "What does your business do, and what takes up the most time: calls, no-shows, quotes or reviews?",
};

// Everyday words that point at each of the six questions above (see the FAQ's "Ask your own question" box).
const FAQ_WORDS: Record<number, string[]> = {
  0: ["website", "site", "redesign", "new", "existing", "keep", "current", "replace", "need"],
  1: ["calendar", "google", "outlook", "email", "phone", "software", "integrate", "integration", "system", "already", "tool", "connect", "whatsapp", "sms", "text", "crm", "use"],
  2: ["technical", "tech", "skills", "learn", "difficult", "complicated", "hard", "easy", "train", "training", "walkthrough", "simple", "staff", "team"],
  3: ["long", "time", "fast", "quick", "week", "day", "deadline", "live", "ready", "launch", "start", "soon", "urgent", "setup"],
  4: ["pay", "price", "pricing", "cost", "much", "charge", "fee", "deposit", "upfront", "invoice", "quote", "budget", "cheap", "expensive", "payment", "afford", "percent", "installment"],
  5: ["change", "later", "update", "edit", "support", "maintenance", "help", "ongoing", "monthly", "after", "fix", "problem", "issue"],
};

// Payment terms, shown under the shared pricing section.
const TERMS = [
  { big: "70%", text: "to start" },
  { big: "30%", text: "when it's live" },
  { big: "2 weeks", text: "from start to live" },
];

const SYSTEMS = [
  { illo: <BookingIllustration />, title: "Booking + reminders", tags: ["Clinics", "Salons"], detail: "Customers book any time, even at 10pm, and get a text the day before. Fewer empty slots and no-shows." },
  { illo: <QuoteIllustration />, title: "Quote requests", tags: ["Trades", "Services"], detail: "Job details and photos land on your phone in one go. Reply faster, and a gentle follow-up goes out if they go quiet." },
  { illo: <ReviewIllustration />, title: "Review requests", tags: ["Any business"], detail: "After each visit, a friendly message asks for a Google review. More reviews means more people choose you." },
  { illo: <SiteIllustration />, title: "Phone-friendly website", tags: ["New or existing"], detail: "Prices, hours and a booking button where people expect them. Fast on a phone, and easy for you to update." },
];

const chip = { fontFamily: "var(--font-inter)", fontWeight: 500, fontSize: 10, letterSpacing: "0.8px", textTransform: "uppercase", color: "var(--fg-secondary)", background: "rgba(0,0,0,0.04)", border: "1px solid rgba(0,0,0,0.08)", padding: "3px 9px" } as const;

// Same layout as the homepage's "Selected work" grid, with illustrations for each system.
function Systems() {
  return (
    <section id="work" style={{ width: "100%", maxWidth: 1200, margin: "0 auto", padding: "80px 20px" }}>
      <div style={{ marginBottom: 48 }}>
        <p data-reveal style={{ fontFamily: "var(--font-inter)", fontWeight: 700, fontSize: 11, letterSpacing: "4px", textTransform: "uppercase", color: "var(--accent-purple)", marginBottom: 16 }}>
          What I set up
        </p>
        <h2 style={{ fontFamily: "var(--font-poppins)", fontWeight: 700, fontSize: "clamp(28px, 3.5vw, 48px)", letterSpacing: "-1px", lineHeight: 1.05, textTransform: "uppercase", color: "var(--fg)" }}>
          <RevealWords text="Small changes." />{" "}
          <span style={{ color: "rgb(163,163,163)" }}><RevealWords text="Hours saved every week." delay={0.1} /></span>
        </h2>
      </div>
      <div className="lb-grid">
        {SYSTEMS.map((s) => (
          <article key={s.title} data-reveal>
            <div className="lb-illo">{s.illo}</div>
            <div style={{ paddingTop: 20 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8, flexWrap: "wrap", marginBottom: 8 }}>
                <h3 style={{ fontFamily: "var(--font-poppins)", fontWeight: 700, fontSize: "clamp(15px, 1.2vw, 18px)", letterSpacing: "-0.4px", textTransform: "uppercase", color: "var(--fg)", margin: 0 }}>{s.title}</h3>
                {s.tags.map((tag) => <span key={tag} style={chip}>{tag}</span>)}
              </div>
              <p style={{ fontFamily: "var(--font-inter)", fontSize: 14, lineHeight: 1.65, letterSpacing: "-0.2px", color: "var(--fg-secondary)", margin: 0, maxWidth: 520 }}>{s.detail}</p>
            </div>
          </article>
        ))}
      </div>
    </section>
  );
}

export default function LocalBusinessPage() {
  return (
    <main style={{ background: "var(--bg)", minHeight: "100vh", overflowX: "hidden", width: "100%" }}>
      <ScrollReveal />
      <ClickTracking />
      <BookingPopup />
      <CopyOverride copy={COPY}>
        <Navbar hide={["#about"]} />
        <Hero altHref="/" />
        <ClientGrid />
        <Systems />
        <WhyMe />
        <HowIWork />
        <Pricing />
        <div style={{ maxWidth: 1200, margin: "-48px auto 0", padding: "0 20px 40px" }}>
          <div data-reveal className="lb-terms">
            {TERMS.map((term) => (
              <div key={term.text} style={{ padding: "22px 24px", background: "var(--bg)", display: "grid", gap: 4 }}>
                <span style={{ fontFamily: "var(--font-poppins)", fontWeight: 700, fontSize: 28, letterSpacing: "-1px", lineHeight: 1, color: "var(--fg)" }}>{term.big}</span>
                <span style={{ fontFamily: "var(--font-inter)", fontWeight: 600, fontSize: 11, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--fg-muted)" }}>{term.text}</span>
              </div>
            ))}
          </div>
        </div>
        <Testimonials />
        <FAQ synonyms={FAQ_WORDS} />
        <ContactForm variant="local" />
        <Footer />
        <MobileCTA />
      </CopyOverride>
    </main>
  );
}
