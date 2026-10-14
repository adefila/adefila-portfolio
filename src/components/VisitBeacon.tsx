"use client";
import { usePathname } from "next/navigation";
import { useEffect } from "react";

// One small beacon per page view to /api/visit (see src/lib/leadfinder.ts).
export default function VisitBeacon() {
  const pathname = usePathname();
  useEffect(() => {
    const body = JSON.stringify({ path: pathname, referrer: document.referrer });
    try {
      if (navigator.sendBeacon?.("/api/visit", new Blob([body], { type: "text/plain" }))) return;
    } catch { /* fall back to fetch */ }
    fetch("/api/visit", { method: "POST", body, keepalive: true }).catch(() => {});
  }, [pathname]);
  return null;
}
