"use client";
import { useState } from "react";
import Image from "next/image";
import { Play } from "lucide-react";

// A client's video testimonial as a card: the poster with a flat play button and the running time, so a reader knows what they
// are choosing to watch. The video itself loads only after the click.
export default function VideoCard({ src, poster, by, role, length }: { src: string; poster: string; by: string; role: string; length?: string }) {
  const [playing, setPlaying] = useState(false);
  return (
    <figure className="vc">
      <style>{`
        .vc { margin: 0; border: 0.8px solid var(--line); background: var(--surface); }
        .vc-stage { position: relative; aspect-ratio: 960 / 992; background: #000; overflow: hidden; }
        .vc-stage video, .vc-stage img { display: block; width: 100%; height: 100%; object-fit: cover; }
        .vc-play { position: absolute; inset: 0; display: grid; place-items: center; width: 100%; border: 0; padding: 0; background: rgba(0, 0, 0, 0.28); cursor: pointer; }
        .vc-play span { display: grid; place-items: center; width: 72px; height: 72px; border-radius: 50%; background: #fff; color: #000; transition: transform 0.25s cubic-bezier(0.22, 1, 0.36, 1); }
        .vc-play:hover span { transform: scale(1.08); }
        .vc-play:focus-visible { outline: 3px solid var(--accent-purple); outline-offset: -3px; }
        .vc-time { position: absolute; left: 16px; bottom: 16px; padding: 4px 8px; background: rgba(0, 0, 0, 0.7); font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.02em; text-transform: uppercase; color: #fff; }
        .vc-cap { display: flex; align-items: baseline; justify-content: space-between; gap: 12px; padding: 14px 16px; border-top: 0.8px solid var(--line); font-family: var(--font-inter); font-size: 14px; color: var(--fg-secondary); }
        .vc-cap strong { color: var(--fg); font-weight: 600; margin-right: 8px; }
        @media (prefers-reduced-motion: reduce) { .vc-play span { transition: none; } }
      `}</style>
      <div className="vc-stage">
        {playing ? (
          <video controls autoPlay playsInline aria-label={`Video testimonial from ${by}, ${role}`}>
            <source src={src} type="video/mp4" />
          </video>
        ) : (
          <>
            <Image src={poster} alt="" fill sizes="(max-width: 900px) 92vw, 440px" />
            <button type="button" className="vc-play" onClick={() => setPlaying(true)} aria-label={`Play the video from ${by}${length ? `, ${length}` : ""}`}>
              <span><Play size={26} fill="currentColor" strokeWidth={0} /></span>
            </button>
            {length && <span className="vc-time">Play · {length}</span>}
          </>
        )}
      </div>
      <figcaption className="vc-cap"><span><strong>{by}</strong>{role}</span></figcaption>
    </figure>
  );
}
