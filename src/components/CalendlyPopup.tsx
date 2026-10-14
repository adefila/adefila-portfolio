"use client";
import { useEffect } from "react";
import { trackEvent } from "@/lib/gtag";

// Opens every Calendly link on the page in Calendly's own popup, so visitors book
// without leaving the site, and reports finished bookings to Google Analytics as
// book_call_scheduled. Calendly's script is fetched the first time someone points
// at or taps a booking link, so it costs nothing on page load. If it can't load,
// the link opens Calendly in a new tab as before.
const SCRIPT = "https://assets.calendly.com/assets/external/widget.js";
// Site colours for the booking page (Calendly applies these on paid plans)
const THEME = "hide_gdpr_banner=1&background_color=f7f7f7&text_color=0f0f0f&primary_color=6d28d9";
const themed = (href: string) => href + (href.includes("?") ? "&" : "?") + THEME;
const STYLES = "https://assets.calendly.com/assets/external/widget.css";

type CalendlyApi = { initPopupWidget: (opts: { url: string }) => void };
declare global {
  interface Window {
    Calendly?: CalendlyApi;
  }
}

let loading: Promise<CalendlyApi> | null = null;
function loadCalendly(): Promise<CalendlyApi> {
  if (window.Calendly) return Promise.resolve(window.Calendly);
  if (loading) return loading;
  loading = new Promise<CalendlyApi>((resolve, reject) => {
    const css = document.createElement("link");
    css.rel = "stylesheet";
    css.href = STYLES;
    document.head.appendChild(css);
    const js = document.createElement("script");
    js.src = SCRIPT;
    js.async = true;
    js.onload = () => (window.Calendly ? resolve(window.Calendly) : reject(new Error("Calendly missing")));
    js.onerror = () => reject(new Error("Calendly failed to load"));
    document.head.appendChild(js);
  }).catch((err) => {
    loading = null; // let a later click try again
    throw err;
  });
  return loading;
}

const calendlyLink = (target: EventTarget | null) =>
  (target as Element | null)?.closest?.('a[href*="calendly.com"]') as HTMLAnchorElement | null;

export default function CalendlyPopup() {
  useEffect(() => {
    let lastLocation = "page";

    // Warm up the script as soon as someone shows intent
    const warm = (e: Event) => {
      if (calendlyLink(e.target)) loadCalendly().catch(() => {});
    };

    const onClick = (e: MouseEvent) => {
      const link = calendlyLink(e.target);
      if (!link) return;
      // Let new-tab / new-window clicks behave normally
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      e.preventDefault();
      const area = link.closest("[data-track-location], section[id], footer, nav");
      lastLocation = area?.getAttribute("data-track-location") || area?.id || area?.tagName.toLowerCase() || "page";
      const fallback = setTimeout(() => window.open(link.href, "_blank", "noopener"), 4000);
      loadCalendly()
        .then((api) => {
          clearTimeout(fallback);
          api.initPopupWidget({ url: themed(link.href) });
        })
        .catch(() => {
          clearTimeout(fallback);
          window.open(link.href, "_blank", "noopener");
        });
    };

    const onMessage = (e: MessageEvent) => {
      if (e.origin !== "https://calendly.com") return;
      if (e.data?.event === "calendly.event_scheduled") {
        trackEvent("book_call_scheduled", { location: lastLocation });
      }
    };

    document.addEventListener("pointerover", warm, { passive: true });
    document.addEventListener("touchstart", warm, { passive: true });
    document.addEventListener("focusin", warm);
    document.addEventListener("click", onClick);
    window.addEventListener("message", onMessage);
    return () => {
      document.removeEventListener("pointerover", warm);
      document.removeEventListener("touchstart", warm);
      document.removeEventListener("focusin", warm);
      document.removeEventListener("click", onClick);
      window.removeEventListener("message", onMessage);
    };
  }, []);

  return null;
}
