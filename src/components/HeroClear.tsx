"use client";
import { useEffect } from "react";

// Keeps the hero clear: the floating Framer badge and the language and currency cards (both live in .lang-switcher) fade away
// while the hero is on screen and come back once you scroll past it. Used by the business site, whose hero carries a video.
export default function HeroClear() {
  useEffect(() => {
    const hero = document.getElementById("hero");
    if (!hero) return;
    const root = document.documentElement;
    const io = new IntersectionObserver(([e]) => {
      if (e?.isIntersecting) root.setAttribute("data-hero-clear", "1");
      else root.removeAttribute("data-hero-clear");
    }, { threshold: 0.2 });
    io.observe(hero);
    return () => { io.disconnect(); root.removeAttribute("data-hero-clear"); };
  }, []);
  return null;
}
