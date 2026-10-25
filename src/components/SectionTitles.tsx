"use client";
import { useEffect } from "react";

// Section headings rise through a mask the first time they scroll into view,
// the same motion as the hero headline. Marked from here so no component changes.
export default function SectionTitles() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const heads = Array.from(document.querySelectorAll<HTMLElement>("main section h2"));
    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (!e.isIntersecting) return;
          io.unobserve(e.target);
          e.target.setAttribute("data-in", "");
        });
      },
      { rootMargin: "0px 0px -10% 0px" },
    );
    heads.forEach((h) => {
      // anything already on screen when the page settles is left alone
      if (h.getBoundingClientRect().top < window.innerHeight * 0.9) return;
      h.setAttribute("data-title-mask", "");
      io.observe(h);
    });
    return () => io.disconnect();
  }, []);

  return null;
}
