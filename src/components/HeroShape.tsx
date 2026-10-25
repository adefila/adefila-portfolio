"use client";
import { useEffect, useRef } from "react";

// A small wireframe solid drawn on a 2D canvas (no 3D library, so nothing heavy to download).
// It turns slowly, leans toward the cursor, and stops drawing when it is off screen or the tab is hidden.
const PHI = (1 + Math.sqrt(5)) / 2;
const RAW: [number, number, number][] = [
  [-1, PHI, 0], [1, PHI, 0], [-1, -PHI, 0], [1, -PHI, 0],
  [0, -1, PHI], [0, 1, PHI], [0, -1, -PHI], [0, 1, -PHI],
  [PHI, 0, -1], [PHI, 0, 1], [-PHI, 0, -1], [-PHI, 0, 1],
];
const VERTS = RAW.map(([x, y, z]) => { const l = Math.hypot(x, y, z); return [x / l, y / l, z / l] as const; });
// an edge joins any two vertices at the icosahedron's edge length
const EDGES: [number, number][] = [];
for (let i = 0; i < VERTS.length; i++)
  for (let j = i + 1; j < VERTS.length; j++) {
    const d = Math.hypot(VERTS[i][0] - VERTS[j][0], VERTS[i][1] - VERTS[j][1], VERTS[i][2] - VERTS[j][2]);
    if (d < 1.06) EDGES.push([i, j]);
  }

export default function HeroShape() {
  const ref = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = ref.current;
    const ctx = canvas?.getContext("2d");
    if (!canvas || !ctx) return;
    const still = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const SIZE = 168;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    canvas.width = SIZE * dpr;
    canvas.height = SIZE * dpr;
    ctx.scale(dpr, dpr);

    const ax = 0.5;
    let ay = 0, lx = 0, ly = 0, tx = 0, ty = 0;
    let raf = 0, last = 0, visible = true;

    const onMove = (e: PointerEvent) => {
      if (e.pointerType !== "mouse") return;
      tx = (e.clientX / window.innerWidth - 0.5) * 2;
      ty = (e.clientY / window.innerHeight - 0.5) * 2;
    };

    const draw = (now: number) => {
      const dt = Math.min(now - last, 50) / 1000; last = now;
      if (!still) ay += dt * 0.35;
      lx += (tx - lx) * 0.06; ly += (ty - ly) * 0.06;
      const rx = ax + ly * 0.5, ry = ay + lx * 0.7;
      const cx = SIZE / 2, cy = SIZE / 2, R = SIZE * 0.4;
      const sx = Math.sin(rx), cxr = Math.cos(rx), sy = Math.sin(ry), cyr = Math.cos(ry);
      const pts = VERTS.map(([x, y, z]) => {
        const x1 = x * cyr + z * sy, z1 = -x * sy + z * cyr;
        const y2 = y * cxr - z1 * sx, z2 = y * sx + z1 * cxr;
        return { x: cx + x1 * R, y: cy + y2 * R, z: z2 };
      });
      ctx.clearRect(0, 0, SIZE, SIZE);
      ctx.lineWidth = 1;
      for (const [i, j] of EDGES) {
        const depth = (pts[i].z + pts[j].z) / 2; // -1 far .. 1 near
        ctx.strokeStyle = `rgba(167, 139, 250, ${0.22 + (depth + 1) * 0.3})`;
        ctx.beginPath(); ctx.moveTo(pts[i].x, pts[i].y); ctx.lineTo(pts[j].x, pts[j].y); ctx.stroke();
      }
      for (const p of pts) {
        ctx.fillStyle = `rgba(255, 255, 255, ${0.35 + (p.z + 1) * 0.3})`;
        ctx.fillRect(Math.round(p.x) - 1.5, Math.round(p.y) - 1.5, 3, 3);
      }
    };

    const loop = (now: number) => {
      draw(now);
      raf = requestAnimationFrame(loop);
    };
    const start = () => { if (!raf && visible && !document.hidden && !still) { last = performance.now(); raf = requestAnimationFrame(loop); } };
    const stop = () => { cancelAnimationFrame(raf); raf = 0; };

    draw(performance.now());
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start(); else stop(); });
    io.observe(canvas);
    const onVis = () => { if (document.hidden) stop(); else start(); };
    document.addEventListener("visibilitychange", onVis);
    window.addEventListener("pointermove", onMove, { passive: true });
    start();
    return () => { stop(); io.disconnect(); document.removeEventListener("visibilitychange", onVis); window.removeEventListener("pointermove", onMove); };
  }, []);

  return <canvas ref={ref} aria-hidden="true" className="hero-shape" style={{ width: 168, height: 168 }} />;
}
