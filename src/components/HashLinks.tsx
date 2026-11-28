"use client";
import { useEffect } from "react";

// In-page links (#work, #contact, the name that goes back to the top) scroll smoothly to their section without writing "#work" into the
// address bar. Popups that use a "#" link of their own (#contact-popup) are left to their own code.
export default function HashLinks() {
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (e.defaultPrevented || e.metaKey || e.ctrlKey || e.shiftKey || e.button !== 0) return;
      const a = (e.target as Element | null)?.closest?.('a[href^="#"]') as HTMLAnchorElement | null;
      if (!a) return;
      let id = "";
      try { id = decodeURIComponent((a.getAttribute("href") || "").slice(1)); } catch { return; }
      if (!id || id === "contact-popup") return;
      const el = document.getElementById(id);
      if (!el) return;
      e.preventDefault();
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    };
    document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, []);
  return null;
}
