"use client";
import { useEffect, useState } from "react";

// A slim bar that stays under the site navigation while a case study is read: the chapters as links, the one being read marked
// with a purple line, and a thin reading-progress line along its bottom edge. Flat and quiet, like a table of contents.
export type Chapter = { id: string; label: string };

export default function ChapterNav({ chapters }: { chapters: Chapter[] }) {
  const [active, setActive] = useState(chapters[0]?.id);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const els = chapters.map((c) => document.getElementById(c.id)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setActive(visible[0].target.id);
      },
      { rootMargin: "-30% 0px -60% 0px" },
    );
    els.forEach((el) => io.observe(el));
    const onScroll = () => {
      const h = document.documentElement.scrollHeight - window.innerHeight;
      setProgress(h > 0 ? Math.min(1, window.scrollY / h) : 0);
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => { io.disconnect(); window.removeEventListener("scroll", onScroll); };
  }, [chapters]);

  return (
    <nav className="v2-chapters" aria-label="Chapters">
      <ul>
        {chapters.map((c) => (
          <li key={c.id}>
            <a href={`#${c.id}`} aria-current={active === c.id ? "true" : undefined}>{c.label}</a>
          </li>
        ))}
      </ul>
      <span className="v2-progress" aria-hidden="true" style={{ transform: `scaleX(${progress})` }} />
    </nav>
  );
}
