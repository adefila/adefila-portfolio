"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";

// A whole page inside a browser frame. Hover it (or focus it) and the page scrolls from top to bottom; on touch
// screens it scrolls by itself the first time it comes into view. The page image is much taller than the frame,
// so the distance to travel is measured and the time taken follows from it.
export default function ScrollShot({ src, alt, width, height, caption }: { src: string; alt: string; width: number; height: number; caption?: string }) {
  const frameRef = useRef<HTMLDivElement>(null);
  const imgWrapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const frame = frameRef.current;
    const wrap = imgWrapRef.current;
    if (!frame || !wrap) return;
    const measure = () => {
      const shift = Math.max(0, wrap.offsetHeight - frame.clientHeight);
      frame.style.setProperty("--shift", `${shift}px`);
      frame.style.setProperty("--dur", `${Math.min(14, Math.max(3, shift / 220))}s`);
    };
    measure();
    const ro = new ResizeObserver(measure);
    ro.observe(frame);

    let io: IntersectionObserver | undefined;
    if (window.matchMedia("(hover: none)").matches && !window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      io = new IntersectionObserver(([e]) => {
        if (e.isIntersecting) { frame.classList.add("is-run"); io?.disconnect(); }
      }, { threshold: 0.7 });
      io.observe(frame);
    }
    return () => { ro.disconnect(); io?.disconnect(); };
  }, []);

  return (
    <figure className="ss">
      <div ref={frameRef} className="ss-frame" tabIndex={0} aria-label={alt}>
        <span className="cs-frame-bar" aria-hidden="true"><i /><i /><i /></span>
        <div className="ss-window">
          <div ref={imgWrapRef} className="ss-page">
            <Image src={src} alt="" width={width} height={height} unoptimized loading="lazy" sizes="(max-width: 900px) 86vw, 520px" className="cs-shot" />
          </div>
        </div>
      </div>
      {caption && <figcaption>{caption}</figcaption>}
    </figure>
  );
}
