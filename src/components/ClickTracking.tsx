"use client";
import { useEffect } from "react";
import { trackEvent } from "@/lib/gtag";

// Sends a Google Analytics event for every lead-intent click on the page, so you can
// see which section's button actually brings in calls and emails:
//   book_call_click  — any link to Calendly
//   email_click      — any mailto: link
//   upwork_click     — any link to the Upwork profile
// `location` is the nearest data-track-location, else the section's id. Add
// data-track-label to a link to tell apart buttons in the same section (e.g. a plan name).
export default function ClickTracking() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      const link = (e.target as Element | null)?.closest?.("a[href]");
      if (!link) return;
      const href = link.getAttribute("href") ?? "";
      const name = href.includes("calendly.com")
        ? "book_call_click"
        : href.startsWith("mailto:")
          ? "email_click"
          : href.includes("upwork.com")
            ? "upwork_click"
            : null;
      if (!name) return;
      const area = link.closest("[data-track-location], section[id], footer, nav");
      const location =
        area?.getAttribute("data-track-location") ||
        area?.id ||
        area?.tagName.toLowerCase() ||
        "page";
      const label = link.closest("[data-track-label]")?.getAttribute("data-track-label");
      trackEvent(name, label ? { location, label } : { location });
    };
    document.addEventListener("click", onClick, true);
    return () => document.removeEventListener("click", onClick, true);
  }, []);
  return null;
}
