"use client";
import { useEffect, useRef } from "react";
import Image from "next/image";
import SpecLabel from "@/components/SpecLabel";

// The products page, scrolled by the visitor's own scrolling: the section stays pinned and the full page moves
// up through the browser frame as you scroll down. Without room to pin (phones, short windows, reduced motion)
// the frame just shows the top of the page and the section scrolls normally (see .ps rules in globals.css).
export default function ProductsShowcase({ src, width, height, products }: { src: string; width: number; height: number; products: string[] }) {
  const sectionRef = useRef<HTMLElement>(null);
  const frameRef = useRef<HTMLDivElement>(null);
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const section = sectionRef.current;
    const frame = frameRef.current;
    const page = pageRef.current;
    if (!section || !frame || !page) return;
    let raf = 0;
    const update = () => {
      raf = 0;
      const pinned = getComputedStyle(section).getPropertyValue("--ps-pinned").trim() === "1";
      if (!pinned) { page.style.transform = "none"; section.style.setProperty("--ps-p", "0"); return; }
      const r = section.getBoundingClientRect();
      const total = section.offsetHeight - window.innerHeight;
      const p = total > 0 ? Math.min(1, Math.max(0, -r.top / total)) : 0;
      const shift = Math.max(0, page.offsetHeight - frame.clientHeight);
      page.style.transform = `translate3d(0, ${-p * shift}px, 0)`;
      section.style.setProperty("--ps-p", String(p));
    };
    const onScroll = () => { if (!raf) raf = requestAnimationFrame(update); };
    update();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => { cancelAnimationFrame(raf); window.removeEventListener("scroll", onScroll); window.removeEventListener("resize", onScroll); };
  }, []);

  return (
    <section ref={sectionRef} className="ps" aria-labelledby="ps-heading">
      <div className="ps-stick">
        <div className="cs-wrap ps-grid">
          <div className="ps-copy">
            <SpecLabel text="The products page" />
            <h2 id="ps-heading" className="cs-h2">Seven products, one page that sells them.</h2>
            <p>
              The products page lists every product from the CMS, each with its own page behind it. Scroll to see the page move.
            </p>
            <ul className="ps-list" aria-label="The seven products">
              {products.map((p) => <li key={p}>{p}</li>)}
            </ul>
            <div className="ps-progress" aria-hidden="true"><span /></div>
          </div>
          <div ref={frameRef} className="ps-frame">
            <span className="cs-frame-bar" aria-hidden="true"><i /><i /><i /></span>
            <div className="ps-window">
              <div ref={pageRef} className="ps-page">
                <Image src={src} alt="The full DLP Africa products page: a grid of seven products, each with a picture, a one-line description and tags" width={width} height={height} unoptimized loading="lazy" sizes="(max-width: 900px) 92vw, 640px" className="cs-shot" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
