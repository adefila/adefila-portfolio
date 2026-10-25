"use client";
import { useEffect, useRef } from "react";

// A measuring bar on the left edge of the frame: tick marks, a purple marker that follows how far down the page you are,
// and the number of the section you are in. Wide screens only (the frame has side margins there). One scroll listener,
// throttled to animation frames, and it only moves a transform and a text node.
export default function ScrollRuler() {
  const marker = useRef<HTMLDivElement>(null);
  const label = useRef<HTMLSpanElement>(null);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    let lastNumber = "";
    const update = () => {
      frame = 0;
      const el = marker.current;
      if (!el) return;
      const max = Math.max(1, document.documentElement.scrollHeight - window.innerHeight);
      const progress = Math.min(1, Math.max(0, window.scrollY / max));
      el.style.transform = `translateY(${(progress * (window.innerHeight - 2)).toFixed(1)}px)`;
      // the section whose label has most recently passed the upper middle of the screen
      let number = "";
      document.querySelectorAll<HTMLElement>(".spec-label b").forEach((b) => {
        if (b.getBoundingClientRect().top < window.innerHeight * 0.45) number = b.getAttribute("data-n") ?? number;
      });
      if (number !== lastNumber && label.current) {
        label.current.textContent = number;
        lastNumber = number;
      }
    };
    const onScroll = () => { if (!frame) frame = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  return (
    <div aria-hidden="true" className="scroll-ruler">
      <div className="scroll-ruler-marker" ref={marker}>
        <span ref={label} className="scroll-ruler-num" />
      </div>
    </div>
  );
}
