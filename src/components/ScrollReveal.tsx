"use client";
import { useEffect } from "react";

// One observer for the whole page. Any element with a `data-reveal` attribute
// starts hidden (see globals.css) and fades up the first time it scrolls into
// view. Elements that come into view together are staggered left-to-right,
// top-to-bottom, so a row of cards or a list of stats arrives one after another.
const STAGGER_S = 0.07;
const MAX_STEPS = 6;

export default function ScrollReveal() {
  useEffect(() => {
    const reveal = (els: Element[]) => {
      const sorted = els
        .map((el) => ({ el, r: el.getBoundingClientRect() }))
        .sort((a, b) => Math.round(a.r.top - b.r.top) || a.r.left - b.r.left);
      sorted.forEach(({ el }, i) => {
        (el as HTMLElement).style.setProperty("--reveal-delay", `${Math.min(i, MAX_STEPS) * STAGGER_S}s`);
        el.setAttribute("data-revealed", "");
      });
    };

    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).map((e) => e.target);
        visible.forEach((el) => io.unobserve(el));
        if (visible.length) reveal(visible);
      },
      { rootMargin: "0px 0px -8% 0px" },
    );

    const watch = (root: ParentNode) =>
      root.querySelectorAll("[data-reveal]:not([data-revealed])").forEach((el) => io.observe(el));
    watch(document);

    // Pick up elements added later (tab switches, carousels, language changes)
    const mo = new MutationObserver((records) => {
      for (const r of records) {
        r.addedNodes.forEach((n) => {
          if (!(n instanceof Element)) return;
          if (n.matches("[data-reveal]:not([data-revealed])")) io.observe(n);
          watch(n);
        });
      }
    });
    mo.observe(document.body, { childList: true, subtree: true });

    return () => {
      io.disconnect();
      mo.disconnect();
    };
  }, []);

  return null;
}
