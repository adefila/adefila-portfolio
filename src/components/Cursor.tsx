"use client";
import { useEffect, useRef } from "react";

export default function Cursor() {
  const ref = useRef<HTMLDivElement>(null);
  const labelRef = useRef<HTMLSpanElement>(null);
  const hovered = useRef(false);

  useEffect(() => {
    // Only show on non-touch devices
    if (!window.matchMedia("(hover: hover)").matches) return;

    const el = ref.current;
    if (!el) return;
    el.style.opacity = "1";

    let tx = -100, ty = -100, cx = -100, cy = -100;
    let raf: number;

    const onMove = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY; };

    const onOver = (e: MouseEvent) => {
      const target = e.target as Element;
      const label = target.closest("[data-cursor]")?.getAttribute("data-cursor");
      if (label && labelRef.current) {
        // a labelled target: a larger ring that says what a click does
        hovered.current = true;
        labelRef.current.textContent = label;
        labelRef.current.style.opacity = "1";
        el.style.width = "64px";
        el.style.height = "64px";
        el.style.background = "transparent";
        el.style.border = "1.5px solid white";
      } else if (target.closest("a, button")) {
        hovered.current = true;
        el.style.width = "40px";
        el.style.height = "40px";
        el.style.background = "transparent";
        el.style.border = "1.5px solid white";
      }
    };

    const onOut = (e: MouseEvent) => {
      if ((e.target as Element).closest("a, button, [data-cursor]")) {
        hovered.current = false;
        if (labelRef.current) labelRef.current.style.opacity = "0";
        el.style.width = "10px";
        el.style.height = "10px";
        el.style.background = "white";
        el.style.border = "none";
      }
    };

    const tick = () => {
      cx += (tx - cx) * 0.14;
      cy += (ty - cy) * 0.14;
      const offset = hovered.current ? (parseFloat(el.style.width) || 40) / 2 : 5;
      el.style.transform = `translate(${cx - offset}px, ${cy - offset}px)`;
      raf = requestAnimationFrame(tick);
    };

    window.addEventListener("mousemove", onMove);
    document.addEventListener("mouseover", onOver);
    document.addEventListener("mouseout", onOut);
    raf = requestAnimationFrame(tick);

    return () => {
      window.removeEventListener("mousemove", onMove);
      document.removeEventListener("mouseover", onOver);
      document.removeEventListener("mouseout", onOut);
      cancelAnimationFrame(raf);
    };
  }, []);

  return (
    <div
      ref={ref}
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: 10,
        height: 10,
        borderRadius: "50%",
        background: "#fff",
        pointerEvents: "none",
        zIndex: 9999,
        mixBlendMode: "difference",
        willChange: "transform",
        opacity: 0,
        transition: "width 0.25s cubic-bezier(0.22,1,0.36,1), height 0.25s cubic-bezier(0.22,1,0.36,1), background 0.2s, border 0.2s",
        display: "grid",
        placeItems: "center",
      }}
    >
      <span
        ref={labelRef}
        aria-hidden="true"
        style={{ opacity: 0, transition: "opacity 0.2s", fontFamily: "var(--font-mono)", fontSize: 10, letterSpacing: "0.12em", color: "#fff", textTransform: "uppercase", whiteSpace: "nowrap" }}
      />
    </div>
  );
}
