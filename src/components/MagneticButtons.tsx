"use client";
import { useEffect } from "react";

// Primary buttons lean a few pixels toward the cursor while it is near them and settle back when it leaves.
// Uses the `translate` property so it never fights a button's own transform.
const PULL = 0.22;
const MAX_PX = 7;
const REACH_PX = 46;

export default function MagneticButtons() {
  useEffect(() => {
    if (!window.matchMedia("(hover: hover) and (pointer: fine)").matches) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

    let active: HTMLElement | null = null;
    const release = () => {
      if (!active) return;
      active.style.translate = "";
      active.style.transition = "translate 0.35s cubic-bezier(0.22, 1, 0.36, 1)";
      active = null;
    };

    const onMove = (e: MouseEvent) => {
      const near = (e.target as Element | null)?.closest?.<HTMLElement>(".btn-primary, .btn-ticks");
      let el = near ?? null;
      if (!el && active) {
        // keep the pull while the cursor is within reach of the button's edge
        const r = active.getBoundingClientRect();
        const inReach = e.clientX > r.left - REACH_PX && e.clientX < r.right + REACH_PX && e.clientY > r.top - REACH_PX && e.clientY < r.bottom + REACH_PX;
        if (inReach) el = active;
      }
      if (!el) return release();
      if (active && active !== el) release();
      active = el;
      const r = el.getBoundingClientRect();
      const dx = Math.max(-MAX_PX, Math.min(MAX_PX, (e.clientX - (r.left + r.width / 2)) * PULL));
      const dy = Math.max(-MAX_PX, Math.min(MAX_PX, (e.clientY - (r.top + r.height / 2)) * PULL));
      el.style.transition = "translate 0.12s ease-out";
      el.style.translate = `${dx}px ${dy}px`;
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    document.addEventListener("mouseleave", release);
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseleave", release);
      release();
    };
  }, []);

  return null;
}
