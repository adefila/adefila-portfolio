import Image from "next/image";

// A laptop and up to three phones on a flat dark stage, drawn in CSS (no downloaded mockup files, so the frames stay
// sharp at any size). The laptop shows a 16:10 desktop capture, each phone a 390:844 mobile capture. The devices float a few
// pixels, slowly, and stand still with reduced motion.
// A laptop shot can be a whole page (tall): the image then scrolls once from the top to the bottom of the screen, starting
// with the navigation bar in view, and stops when the pointer is on it.
export type DeviceShot = { src: string; alt: string; tall?: { width: number; height: number; seconds?: number } };

const CSS = `
  .ds { position: relative; overflow: hidden; padding: clamp(36px, 7vw, 84px) clamp(16px, 4vw, 48px) clamp(44px, 8vw, 96px); border: 1px solid rgba(var(--ink), 0.14); background: #0b0b0d; }
  .ds-scene { position: relative; width: min(100%, 1040px); margin: 0 auto; aspect-ratio: 16 / 9.6; }

  .ds-lp { position: absolute; left: 50%; top: 0; width: 74%; transform: translateX(-50%); animation: dsFloat 9s ease-in-out infinite alternate; }
  .ds-lid { position: relative; padding: 2.4% 2.4% 2.8%; background: #141417; border: 1px solid #2e2e33; border-radius: 1.8cqw 1.8cqw 0.5cqw 0.5cqw;
    box-shadow: 0 50px 90px rgba(0, 0, 0, 0.6), 0 0 0 1px #000, inset 0 1px 0 rgba(255, 255, 255, 0.08); }
  .ds-lid::before { content: ""; position: absolute; top: 1.1%; left: 50%; width: 0.7%; aspect-ratio: 1; border-radius: 50%; background: #16161a; box-shadow: 0 0 0 1px #2a2a30; transform: translateX(-50%); }
  .ds-screen { position: relative; aspect-ratio: 16 / 10; overflow: hidden; background: #fff; border-radius: 0.5cqw; }
  .ds-screen img, .ds-ph-screen img { display: block; width: 100%; height: 100%; object-fit: cover; object-position: top; }
  .ds-base { position: relative; width: 118%; margin-left: -9%; height: 2.6cqw; min-height: 10px; background: #8b8e96; border-radius: 0 0 2.4cqw 2.4cqw / 0 0 1.4cqw 1.4cqw; box-shadow: 0 24px 40px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255, 255, 255, 0.5); }
  .ds-base::after { content: ""; position: absolute; top: 0; left: 50%; width: 17%; height: 38%; transform: translateX(-50%); background: #6c6f77; border-radius: 0 0 0.8cqw 0.8cqw; }

  .ds-ph { position: absolute; width: var(--w); left: var(--x); bottom: var(--y); z-index: var(--z, 2); container-type: inline-size; transform: rotate(var(--r, 0deg)); animation: dsFloat 7s ease-in-out infinite alternate; animation-delay: var(--d, 0s); }
  .ds-ph-body { position: relative; padding: 2.7cqw; border-radius: 16cqw; background: #1b1b1f;
    box-shadow: 0 0 0 0.6cqw #08080a, 0 3cqw 8cqw rgba(0, 0, 0, 0.7), 0 1.2cqw 3cqw rgba(0, 0, 0, 0.5), inset 0 0 0 0.35cqw rgba(255, 255, 255, 0.18); }
  .ds-ph-body::before, .ds-ph-body::after { content: ""; position: absolute; width: 1.1cqw; background: #2b2b30; border-radius: 0.6cqw; }
  .ds-ph-body::before { left: -1.3cqw; top: 22cqw; height: 12cqw; box-shadow: 0 17cqw 0 #2b2b30; }
  .ds-ph-body::after { right: -1.3cqw; top: 30cqw; height: 20cqw; }
  .ds-ph-screen { position: relative; aspect-ratio: 390 / 844; overflow: hidden; border-radius: 13.4cqw; background: #fff; }
  .ds-ph-screen::before { content: ""; position: absolute; z-index: 2; top: 3.4cqw; left: 50%; width: 27cqw; height: 7.8cqw; transform: translateX(-50%); background: #000; border-radius: 6cqw; }

  .ds-screen img.ds-tall { height: auto; object-fit: fill; animation: dsScroll var(--dur, 14s) linear 1.1s 1 both; will-change: transform; }
  .ds:hover .ds-tall { animation-play-state: paused; }
  @keyframes dsScroll { from { transform: translate3d(0, 0, 0); } to { transform: translate3d(0, var(--shift, 0%), 0); } }
  @media (prefers-reduced-motion: reduce) { .ds-screen img.ds-tall { animation: none; } }
  .ds-cap { position: relative; margin: 28px 0 0; text-align: center; font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.1em; text-transform: uppercase; color: rgba(255, 255, 255, 0.5); }
  @keyframes dsFloat { from { translate: 0 0; } to { translate: 0 -7px; } }
  @media (prefers-reduced-motion: reduce) { .ds-lp, .ds-ph { animation: none; } }
  @media (max-width: 640px) { .ds-scene { aspect-ratio: 16 / 12; } .ds-lp { width: 86%; } }
`;

// Where each phone sits for one, two or three phones: left edge, distance from the bottom, width, tilt, stacking.
const SLOTS: Record<number, { x: string; y: string; w: string; r: string; z: number; d: string }[]> = {
  1: [{ x: "74%", y: "-1%", w: "21%", r: "5deg", z: 3, d: "0s" }],
  2: [
    { x: "2%", y: "-2%", w: "19%", r: "-5deg", z: 3, d: "0s" },
    { x: "79%", y: "-1%", w: "19%", r: "5deg", z: 3, d: "-3s" },
  ],
  3: [
    { x: "1%", y: "2%", w: "17.5%", r: "-6deg", z: 2, d: "0s" },
    { x: "40.5%", y: "-4%", w: "19%", r: "0deg", z: 3, d: "-2s" },
    { x: "81.5%", y: "2%", w: "17.5%", r: "6deg", z: 2, d: "-4s" },
  ],
};

export default function DeviceStage({ laptop, phones, caption, priority = false }: { laptop: DeviceShot; phones: DeviceShot[]; caption?: string; priority?: boolean }) {
  const slots = SLOTS[Math.min(3, Math.max(1, phones.length))];
  return (
    <figure className="ds corners-in" style={{ margin: 0 }}>
      <style>{CSS}</style>
      <div className="ds-scene" style={{ containerType: "inline-size" }}>
        <div className="ds-lp">
          <div className="ds-lid">
            <div className="ds-screen">
              {laptop.tall ? (
                <Image
                  className="ds-tall"
                  src={laptop.src}
                  alt={laptop.alt}
                  width={laptop.tall.width}
                  height={laptop.tall.height}
                  priority={priority}
                  unoptimized
                  sizes="(max-width: 1100px) 90vw, 780px"
                  style={{ ["--shift" as string]: `-${((1 - 0.625 / (laptop.tall.height / laptop.tall.width)) * 100).toFixed(2)}%`, ["--dur" as string]: `${laptop.tall.seconds ?? 14}s` }}
                />
              ) : (
                <Image src={laptop.src} alt={laptop.alt} width={2880} height={1800} priority={priority} sizes="(max-width: 1100px) 90vw, 780px" />
              )}
            </div>
          </div>
          <div className="ds-base" aria-hidden="true" />
        </div>
        {phones.slice(0, 3).map((p, i) => {
          const s = slots[i];
          return (
            <div key={p.src} className="ds-ph" style={{ ["--x" as string]: s.x, ["--y" as string]: s.y, ["--w" as string]: s.w, ["--r" as string]: s.r, ["--z" as string]: s.z, ["--d" as string]: s.d }}>
              <div className="ds-ph-body">
                <div className="ds-ph-screen">
                  <Image src={p.src} alt={p.alt} width={1170} height={2532} priority={priority} sizes="(max-width: 1100px) 24vw, 200px" />
                </div>
              </div>
            </div>
          );
        })}
      </div>
      {caption && <figcaption className="ds-cap">{caption}</figcaption>}
    </figure>
  );
}
