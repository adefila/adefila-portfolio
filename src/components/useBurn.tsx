"use client";
import { useId, useRef } from "react";
import { animate } from "framer-motion";

// A "burn into pieces" transition for any element. A noise mask eats the element away in speckled pieces that scatter a little,
// with a purple ember along the edge of every piece; run(el, swap) burns the element away, calls swap() while it is gone, then re-forms it.
// Put `svg` once in the page (it holds the filter) and call run() with the element to animate.
type Opts = { freq?: string; scatter?: number; lift?: number; seed?: number; k?: number; ms?: number; ember?: string };

export function useBurn({ freq = "0.016 0.02", scatter = 110, lift = 22, seed = 5, k = 28, ms = 620, ember = "#a78bfa" }: Opts = {}) {
  const id = useId().replace(/:/g, "");
  const maskA = useRef<SVGFEFuncAElement>(null);
  const maskB = useRef<SVGFEFuncAElement>(null);
  const disp = useRef<SVGFEDisplacementMapElement>(null);

  const apply = (p: number, el: HTMLElement | null) => {
    const t = 0.12 + p * 0.64;
    maskA.current?.setAttribute("intercept", String(-k * t));
    maskB.current?.setAttribute("intercept", String(-k * (t + 0.07)));
    disp.current?.setAttribute("scale", String(p * scatter));
    if (el) el.style.transform = `translateY(${-p * lift}px)`;
  };
  const play = (from: number, to: number, el: HTMLElement | null) =>
    new Promise<void>((done) => {
      animate(from, to, { duration: ms / 1000, ease: [0.45, 0, 0.55, 1], onUpdate: (p) => apply(p, el), onComplete: () => done() });
    });

  const run = async (el: HTMLElement | null, swap: () => void) => {
    if (!el) { swap(); return; }
    el.style.filter = `url(#${id})`;
    el.style.willChange = "filter, transform";
    await play(0, 1, el);
    swap();
    await new Promise((r) => requestAnimationFrame(() => requestAnimationFrame(r)));
    await play(1, 0, el);
    el.style.filter = "none";
    el.style.transform = "none";
    el.style.willChange = "auto";
  };

  const svg = (
    <svg width="0" height="0" aria-hidden="true" style={{ position: "absolute" }}>
      <filter id={id} x="-12%" y="-12%" width="124%" height="124%" colorInterpolationFilters="sRGB">
        <feTurbulence type="fractalNoise" baseFrequency={freq} numOctaves="3" seed={seed} result="noise" />
        <feColorMatrix in="noise" type="matrix" values="0 0 0 0 0  0 0 0 0 0  0 0 0 0 0  1 0 0 0 0" result="r" />
        <feComponentTransfer in="r" result="maskA"><feFuncA ref={maskA} type="linear" slope={k} intercept={-k * 0.12} /></feComponentTransfer>
        <feComponentTransfer in="r" result="maskB"><feFuncA ref={maskB} type="linear" slope={k} intercept={-k * 0.19} /></feComponentTransfer>
        <feDisplacementMap ref={disp} in="SourceGraphic" in2="noise" scale="0" xChannelSelector="R" yChannelSelector="G" result="scattered" />
        <feComposite in="scattered" in2="maskA" operator="in" result="body" />
        <feComposite in="maskA" in2="maskB" operator="out" result="edge" />
        <feFlood floodColor={ember} result="emberColor" />
        <feComposite in="emberColor" in2="edge" operator="in" result="glow" />
        <feMerge><feMergeNode in="body" /><feMergeNode in="glow" /></feMerge>
      </filter>
    </svg>
  );

  return { svg, run };
}
