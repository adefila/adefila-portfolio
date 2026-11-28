"use client";
import { useEffect, useRef, useState } from "react";
import { X } from "lucide-react";
import ContactForm from "@/components/ContactForm";
import { trackEvent } from "@/lib/gtag";
import { useLang } from "@/context/LangContext";

// "Contact me" on the business site opens the contact form in a window, in the same style as the booking window (same overlay, panel and
// square close button), instead of going to a separate page. Any link to #contact-popup opens it. Esc, the close button or a click
// outside closes it. Modifier-clicks are left alone.
const CSS = `
  .cp-body { position: relative; flex: 1; overflow-y: auto; background: var(--bg); }
  .cp-body #contact { padding: 32px 32px 36px !important; max-width: none !important; }
  .cp-body .contact-grid { grid-template-columns: minmax(0, 1fr) minmax(0, 1.3fr) !important; gap: 40px !important; }
  .cp-body h2 { font-size: clamp(24px, 3vw, 32px) !important; }
  .cp-body [data-reveal] { opacity: 1 !important; transform: none !important; translate: none !important; }
  @media (max-width: 768px) {
    .cp-body #contact { padding: 24px 20px 32px !important; }
    .cp-body .contact-grid { grid-template-columns: minmax(0, 1fr) !important; gap: 28px !important; }
  }
`;

export default function ContactPopup() {
  const { t } = useLang();
  const [open, setOpen] = useState(false);
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.('a[href="#contact-popup"], [data-contact-popup]');
      if (!link || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault();
      const area = link.closest("[data-track-location], section[id], footer, nav");
      trackEvent("contact_popup_open", { location: area?.getAttribute("data-track-location") || area?.id || area?.tagName.toLowerCase() || "page" });
      setOpen(true);
    };
    const onOpen = () => setOpen(true);
    document.addEventListener("click", onClick);
    window.addEventListener("open-contact", onOpen);
    return () => { document.removeEventListener("click", onClick); window.removeEventListener("open-contact", onOpen); };
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setOpen(false); };
    document.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => { document.body.style.overflow = prev; document.removeEventListener("keydown", onKey); };
  }, [open]);

  if (!open) return null;
  return (
    <div className="booking-overlay" onClick={(e) => { if (e.target === e.currentTarget) setOpen(false); }}>
      <style>{CSS}</style>
      <div className="booking-panel" role="dialog" aria-modal="true" aria-labelledby="contact-title" style={{ width: "min(960px, 100%)" }}>
        <header className="booking-header">
          <p id="contact-title" style={{ fontFamily: "var(--font-poppins)", fontWeight: 700, fontSize: 16, letterSpacing: "-0.3px", textTransform: "uppercase", color: "var(--fg)", lineHeight: 1.2 }}>
            {t("biz.contactTitle")}
          </p>
          <button ref={closeRef} type="button" className="booking-close" onClick={() => setOpen(false)} aria-label="Close">
            <X size={16} strokeWidth={2} />
          </button>
        </header>
        <div className="cp-body"><ContactForm /></div>
      </div>
    </div>
  );
}
