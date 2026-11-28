"use client";
import { useEffect, useRef } from "react";

// Ambient life for the business hero, with nothing to hover: a few tiles of the mosaic catch the light and fade, here and there, and the
// mosaic itself rides a little slower than the page as you scroll. Both stop for visitors who ask for less motion, and the sparkle stops
// drawing while the hero is off screen.
export default function HeroAlive() {
  const canvas = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const cv = canvas.current;
    if (!cv) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const ctx = cv.getContext("2d");
    if (!ctx) return;
    const mosaic = document.querySelector<HTMLElement>(".hero-mosaic");
    const dpr = Math.min(2, window.devicePixelRatio || 1);
    const CELL = 13;
    let w = 0, h = 0, raf = 0, visible = true, last = performance.now();
    const sparks: { x: number; y: number; age: number; dur: number; peak: number }[] = [];

    const resize = () => {
      const r = cv.getBoundingClientRect();
      w = r.width; h = r.height;
      cv.width = Math.round(w * dpr); cv.height = Math.round(h * dpr);
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };
    const tick = (now: number) => {
      if (!visible) { raf = 0; return; }
      const dt = Math.min(64, now - last); last = now;
      ctx.clearRect(0, 0, w, h);
      if (sparks.length < 44 && Math.random() < 0.45) {
        // tiles light up mostly in the lower, fuller part of the mosaic
        const y = h * (0.3 + 0.7 * Math.random());
        sparks.push({ x: Math.floor((Math.random() * w) / CELL) * CELL, y: Math.floor(y / CELL) * CELL, age: 0, dur: 1800 + Math.random() * 2200, peak: 0.28 + Math.random() * 0.34 });
      }
      for (let i = sparks.length - 1; i >= 0; i--) {
        const s = sparks[i];
        s.age += dt;
        if (s.age >= s.dur) { sparks.splice(i, 1); continue; }
        const a = Math.sin((Math.PI * s.age) / s.dur) * s.peak;
        ctx.fillStyle = `rgba(255,255,255,${a.toFixed(3)})`;
        ctx.beginPath();
        ctx.roundRect(s.x + 1, s.y + 1, CELL - 3, CELL - 3, 2);
        ctx.fill();
      }
      raf = requestAnimationFrame(tick);
    };
    const io = new IntersectionObserver(([e]) => {
      visible = !!e?.isIntersecting;
      if (visible && !raf) { last = performance.now(); raf = requestAnimationFrame(tick); }
    });
    const onScroll = () => {
      const y = Math.min(window.scrollY, 900) * 0.14;
      const t = `0 ${y.toFixed(1)}px`;
      if (mosaic) mosaic.style.translate = t;
      cv.style.translate = t;
    };

    resize();
    io.observe(cv);
    raf = requestAnimationFrame(tick);
    window.addEventListener("resize", resize);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => {
      cancelAnimationFrame(raf);
      io.disconnect();
      window.removeEventListener("resize", resize);
      window.removeEventListener("scroll", onScroll);
      if (mosaic) mosaic.style.translate = "";
    };
  }, []);

  return <canvas ref={canvas} className="hero-sparkle" aria-hidden="true" />;
}
