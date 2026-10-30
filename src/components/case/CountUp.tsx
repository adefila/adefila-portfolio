"use client";
import { useEffect, useRef, useState } from "react";

// A number that counts up from zero the first time it is on screen, with an optional prefix and suffix ("$10K+").
// Reduced motion shows the final value.
export default function CountUp({ to, ms = 1100, prefix = "", suffix = "" }: { to: number; ms?: number; prefix?: string; suffix?: string }) {
  const ref = useRef<HTMLElement>(null);
  const [n, setN] = useState(to);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let frame = 0;
    const io = new IntersectionObserver(([e]) => {
      if (!e.isIntersecting) return;
      io.disconnect();
      const start = performance.now();
      const tick = (now: number) => {
        const p = Math.min((now - start) / ms, 1);
        setN(Math.round(to * (1 - Math.pow(1 - p, 3))));
        if (p < 1) frame = requestAnimationFrame(tick);
      };
      setN(0);
      frame = requestAnimationFrame(tick);
    }, { threshold: 0.6 });
    io.observe(el);
    return () => { io.disconnect(); cancelAnimationFrame(frame); };
  }, [to, ms]);

  return <strong ref={ref} aria-label={`${prefix}${to}${suffix}`}><span aria-hidden="true">{prefix}{n}{suffix}</span></strong>;
}
