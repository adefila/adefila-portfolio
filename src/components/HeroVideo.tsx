"use client";
import { useEffect, useRef, useState } from "react";
import { useReducedMotion } from "framer-motion";

// The hero's loop: a steady top-down shot of a designer's desk (Pexels, free to use), turned to black and white and multiplied onto the
// lavender of the hero box, so the warm wood and skin tones become the site's own palette instead of fighting it. It restarts with a
// short fade, not a hard cut. With reduced motion it stays on the first frame.
export default function HeroVideo() {
  const ref = useRef<HTMLVideoElement>(null);
  const reduce = useReducedMotion();
  const [dim, setDim] = useState(false);

  useEffect(() => {
    const v = ref.current;
    if (!v || reduce) return;
    const onTime = () => setDim(v.duration - v.currentTime < 0.6);
    const onEnd = () => { v.currentTime = 0; v.play().catch(() => {}); setDim(false); };
    v.addEventListener("timeupdate", onTime);
    v.addEventListener("ended", onEnd);
    v.play().catch(() => {});
    return () => { v.removeEventListener("timeupdate", onTime); v.removeEventListener("ended", onEnd); };
  }, [reduce]);

  return (
    <video
      ref={ref}
      className="hero-video"
      style={{ opacity: dim ? 0 : 1 }}
      src="/hero/workspace.mp4"
      poster="/hero/workspace-poster.jpg"
      muted
      playsInline
      autoPlay={!reduce}
      preload="auto"
      aria-hidden="true"
      tabIndex={-1}
    />
  );
}
