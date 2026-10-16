"use client";
import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import { ArrowUpRight, X } from "lucide-react";
import { useLang } from "@/context/LangContext";
import { SPOTS_OPEN, useNextStartMonth } from "@/lib/availability";
import { trackEvent } from "@/lib/gtag";
import { BOOKING_HOST, isBookingHref } from "@/lib/booking";

// Every booking link on the page opens this window instead of a new tab: a panel in the
// site's own style (photo, title, availability, square close button) with the Cal.com
// booking page embedded inside. Finished bookings are reported to Google Analytics as
// book_call_scheduled. Modifier-clicks still open a new tab, and the header links to the
// booking page directly in case the embed is slow or blocked.
// Colours (purple accent) are set in the Cal.com account's appearance settings; the embed
// only chooses the light theme and the month view.
const EMBED = "embed=true&embedType=inline&theme=light&layout=month_view";

const bookingLink = (target: EventTarget | null) => {
  const link = (target as Element | null)?.closest?.("a[href]") as HTMLAnchorElement | null;
  return link && isBookingHref(link.href) ? link : null;
};

export default function BookingPopup() {
  const { t, lang } = useLang();
  const nextStart = useNextStartMonth(lang);
  const [url, setUrl] = useState<string | null>(null);
  const [loaded, setLoaded] = useState(false);
  const lastLocation = useRef("page");
  const booked = useRef(false); // one event per opened window, however many messages Cal.com sends
  const closeRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = bookingLink(e.target);
      if (!link || link.closest(".booking-panel")) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault();
      const area = link.closest("[data-track-location], section[id], footer, nav");
      lastLocation.current = area?.getAttribute("data-track-location") || area?.id || area?.tagName.toLowerCase() || "page";
      setLoaded(false);
      booked.current = false;
      setUrl(link.href);
    };
    const onMessage = (e: MessageEvent) => {
      // The Cal.com embed reports a finished booking as a "bookingSuccessful" action.
      let host = "";
      try { host = new URL(e.origin).hostname; } catch { return; }
      if (host !== BOOKING_HOST && !host.endsWith(`.${BOOKING_HOST}`)) return;
      let text = "";
      try { text = typeof e.data === "string" ? e.data : JSON.stringify(e.data); } catch { return; }
      if (text.includes("bookingSuccessful") && !booked.current) {
        booked.current = true;
        trackEvent("book_call_scheduled", { location: lastLocation.current });
      }
    };
    document.addEventListener("click", onClick);
    window.addEventListener("message", onMessage);
    return () => {
      document.removeEventListener("click", onClick);
      window.removeEventListener("message", onMessage);
    };
  }, []);

  // While open: no page scroll behind it, Esc closes, focus starts on the close button
  useEffect(() => {
    if (!url) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const onKey = (e: KeyboardEvent) => { if (e.key === "Escape") setUrl(null); };
    document.addEventListener("keydown", onKey);
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [url]);

  if (!url) return null;
  const join = url.includes("?") ? "&" : "?";
  const src = `${url}${join}${EMBED}`;

  return (
    <div className="booking-overlay" onClick={(e) => { if (e.target === e.currentTarget) setUrl(null); }}>
      <div className="booking-panel" role="dialog" aria-modal="true" aria-labelledby="booking-title">
        <header className="booking-header">
          <div style={{ display: "flex", alignItems: "center", gap: 12, minWidth: 0 }}>
            <Image
              src="/samuel-portrait.webp"
              alt=""
              width={40}
              height={40}
              style={{ width: 40, height: 40, borderRadius: "50%", objectFit: "cover", objectPosition: "50% 25%", flexShrink: 0 }}
            />
            <div style={{ minWidth: 0 }}>
              <p id="booking-title" style={{ fontFamily: "var(--font-poppins)", fontWeight: 700, fontSize: 16, letterSpacing: "-0.3px", textTransform: "uppercase", color: "var(--fg)", lineHeight: 1.2 }}>
                {t("common.bookCall")}
              </p>
              <p style={{ display: "flex", alignItems: "center", gap: 6, fontFamily: "var(--font-inter)", fontSize: 11, fontWeight: 600, letterSpacing: "0.06em", textTransform: "uppercase", color: "var(--fg-secondary)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                <span style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--accent-green)", flexShrink: 0 }} />
                {t("hero.badge").replace("{count}", String(SPOTS_OPEN))} · {t("hero.badge2").replace("{date}", nextStart)}
              </p>
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 16, flexShrink: 0 }}>
            <a href={url} target="_blank" rel="noopener noreferrer" className="case-link booking-newtab">
              {t("booking.newTab")} <ArrowUpRight size={12} strokeWidth={2} />
            </a>
            <button ref={closeRef} type="button" className="booking-close" onClick={() => setUrl(null)} aria-label={t("booking.close")}>
              <X size={16} strokeWidth={2} />
            </button>
          </div>
        </header>

        <div className="booking-body">
          {!loaded && (
            <div className="booking-loading" aria-live="polite">
              <div style={{ display: "flex", gap: 24, width: "min(640px, 90%)" }}>
                <div style={{ flex: 1, display: "flex", flexDirection: "column", gap: 12 }}>
                  <span className="skeleton-light" style={{ height: 18, width: "60%" }} />
                  <span className="skeleton-light" style={{ height: 12, width: "40%" }} />
                  <span className="skeleton-light" style={{ height: 120, width: "100%", marginTop: 12 }} />
                </div>
                <div className="booking-loading-cal" style={{ flex: 1.3, display: "grid", gridTemplateColumns: "repeat(7, 1fr)", gap: 8 }}>
                  {Array.from({ length: 35 }, (_, i) => <span key={i} className="skeleton-light" style={{ aspectRatio: "1", borderRadius: "50%" }} />)}
                </div>
              </div>
              <p style={{ fontFamily: "var(--font-inter)", fontSize: 12, fontWeight: 600, letterSpacing: "0.08em", textTransform: "uppercase", color: "var(--fg-muted)", marginTop: 28 }}>
                {t("booking.loading")}
              </p>
            </div>
          )}
          <iframe
            src={src}
            title={t("common.bookCall")}
            onLoad={() => setLoaded(true)}
            style={{ position: "absolute", inset: 0, width: "100%", height: "100%", border: 0, opacity: loaded ? 1 : 0, transition: "opacity 0.3s" }}
          />
        </div>
      </div>
    </div>
  );
}
