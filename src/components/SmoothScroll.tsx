"use client";
import { useEffect } from "react";

// Smooth scrolling for a mouse wheel: each notch of the wheel eases the page to its new position (a short glide) instead of jumping a
// fixed distance. It stays out of the way everywhere else:
//  - touch screens and "reduce motion" keep the browser's own scrolling;
//  - trackpads (small, frequent wheel steps) already glide, so they are left alone;
//  - anything inside the page that scrolls by itself (a popup, the contact form, a list) keeps its own wheel;
//  - while a popup holds the page still (body overflow hidden), nothing moves;
//  - the keyboard, the scrollbar, in-page links and the contents list all work as before, and the glide picks up from wherever they left the page.
const EASE = 0.1;      // share of the remaining distance covered each frame: lower is longer and softer
const MIN_STEP = 50;   // wheel steps smaller than this are a trackpad

export default function SmoothScroll() {
  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    if (window.matchMedia("(pointer: coarse)").matches) return;

    let target = window.scrollY;
    let current = window.scrollY;
    let raf = 0;

    const max = () => Math.max(0, document.documentElement.scrollHeight - window.innerHeight);
    const insideScroller = (start: EventTarget | null, dy: number) => {
      let el = start as HTMLElement | null;
      while (el && el !== document.body && el !== document.documentElement) {
        if (el.scrollHeight > el.clientHeight + 1) {
          const oy = getComputedStyle(el).overflowY;
          if (oy === "auto" || oy === "scroll") {
            const atTop = el.scrollTop <= 0;
            const atBottom = el.scrollTop + el.clientHeight >= el.scrollHeight - 1;
            if ((dy < 0 && !atTop) || (dy > 0 && !atBottom)) return true;
          }
        }
        el = el.parentElement;
      }
      return false;
    };

    const tick = () => {
      current += (target - current) * EASE;
      if (Math.abs(target - current) < 0.4) current = target;
      window.scrollTo({ top: current, behavior: "instant" as ScrollBehavior });
      raf = current === target ? 0 : requestAnimationFrame(tick);
    };

    const onWheel = (e: WheelEvent) => {
      if (e.ctrlKey || e.defaultPrevented || Math.abs(e.deltaX) > Math.abs(e.deltaY)) return;
      if (document.body.style.overflow === "hidden") return;
      const dy = e.deltaMode === 1 ? e.deltaY * 32 : e.deltaMode === 2 ? e.deltaY * window.innerHeight : e.deltaY;
      if (e.deltaMode === 0 && Math.abs(dy) < MIN_STEP) return;
      if (insideScroller(e.target, dy)) return;
      e.preventDefault();
      if (!raf) { target = window.scrollY; current = window.scrollY; }
      target = Math.min(max(), Math.max(0, target + dy));
      if (!raf) raf = requestAnimationFrame(tick);
    };

    // Anything else that moves the page (keys, scrollbar, links) while the glide is idle: start the next glide from there
    const onScroll = () => { if (!raf) { target = window.scrollY; current = window.scrollY; } };

    window.addEventListener("wheel", onWheel, { passive: false });
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      window.removeEventListener("wheel", onWheel);
      window.removeEventListener("scroll", onScroll);
      if (raf) cancelAnimationFrame(raf);
    };
  }, []);

  return null;
}
