"use client";
import { useState } from "react";
import Image from "next/image";
import { Pause, Play } from "lucide-react";

// A wide design board: each app screen is shown three ways, left to right, as ideation, wireframe and high fidelity. The groups
// slide past at one steady speed (a linear loop) and stop under the pointer, on focus, or with the pause button. With reduced
// motion the board does not move and scrolls sideways instead. The ideation and wireframe frames are redrawn from the final
// screen's structure, and the board says so.
export type BoardKind = "post-event" | "pending-requests" | "artist-details";
export type BoardScreen = { kind: BoardKind; name: string; note: string; src: string; width: number; height: number; alt: string };

const CSS = `
  .pb { position: relative; margin-top: 56px; border-top: 0.8px solid var(--line); border-bottom: 0.8px solid var(--line); background-color: rgba(var(--ink), 0.025); }
  .pb-bar { display: flex; align-items: center; justify-content: space-between; gap: 16px; padding: 12px max(20px, calc((100% - 1200px) / 2 + 20px)); font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.02em; text-transform: uppercase; color: var(--fg-muted); border-bottom: 0.8px solid var(--line); }
  .pb-bar b { font-weight: 500; color: var(--accent-purple); }
  .pb-btn { display: inline-flex; align-items: center; gap: 6px; background: none; border: 0.8px solid var(--line); color: var(--fg-secondary); font: inherit; letter-spacing: inherit; text-transform: inherit; padding: 5px 10px; cursor: pointer; }
  .pb-btn:hover { color: var(--fg); border-color: rgba(var(--ink), 0.4); }
  .pb-btn:focus-visible { outline: 2px solid var(--accent-purple); outline-offset: 2px; }
  .pb-view { overflow: hidden; padding: 40px 0 36px; }
  .pb-track { display: flex; width: max-content; animation: pbMove var(--pb-dur, 70s) linear infinite; will-change: transform; }
  .pb:hover .pb-track, .pb:focus-within .pb-track, .pb.paused .pb-track { animation-play-state: paused; }
  @keyframes pbMove { to { transform: translate3d(-50%, 0, 0); } }
  .pb-set { display: flex; flex-shrink: 0; }
  .pb-group { flex-shrink: 0; padding: 0 44px; border-right: 0.8px solid var(--line); position: relative; }
  .pb-head { margin-bottom: 18px; }
  .pb-head b { display: block; font-family: var(--font-poppins); font-weight: 600; font-size: 20px; letter-spacing: -0.02em; color: var(--fg); }
  .pb-head span { display: block; margin-top: 4px; max-width: 520px; font-family: var(--font-inter); font-size: 13px; line-height: 1.5; color: var(--fg-secondary); }
  .pb-frames { display: flex; align-items: flex-start; gap: 0; }
  .pb-step { width: 208px; flex-shrink: 0; }
  .pb-frame { position: relative; width: 208px; aspect-ratio: 200 / 378; overflow: hidden; background: #0d0d0f; border: 0.8px solid var(--line); box-shadow: 0 18px 40px rgba(0, 0, 0, 0.35); }
  .pb-frame svg, .pb-frame img { display: block; width: 100%; height: 100%; }
  .pb-frame img { object-fit: cover; object-position: top; }
  .pb-lab { margin-top: 12px; display: flex; gap: 8px; font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.02em; text-transform: uppercase; color: var(--fg-secondary); }
  .pb-lab i { font-style: normal; color: var(--accent-purple); }
  .pb-arrow { width: 56px; flex-shrink: 0; align-self: flex-start; margin-top: 180px; display: flex; align-items: center; color: rgba(var(--ink), 0.4); }
  .pb-arrow svg { width: 100%; height: 12px; }
  .pb-note { padding: 0 max(20px, calc((100% - 1200px) / 2 + 20px)) 18px; font-family: var(--font-mono); font-size: 11px; letter-spacing: 0.02em; color: var(--fg-muted); }
  @media (prefers-reduced-motion: reduce) {
    .pb-track { animation: none; }
    .pb-view { overflow-x: auto; -webkit-mask-image: none; mask-image: none; }
    .pb-set + .pb-set { display: none; }
    .pb-btn { display: none; }
  }
  @media (max-width: 640px) { .pb-group { padding: 0 28px; } .pb-step, .pb-frame { width: 168px; } .pb-arrow { width: 36px; margin-top: 150px; } }
`;

const LINE = "rgba(255,255,255,0.4)";
const SOFT = "rgba(255,255,255,0.07)";
const BAR = "rgba(255,255,255,0.3)";
const ACCENT = "rgba(139,92,246,0.5)";

type P = { sk: boolean };

function Box({ x, y, w, h, r = 6, fill, sk }: { x: number; y: number; w: number; h: number; r?: number; fill?: string; sk: boolean }) {
  return <rect x={x} y={y} width={w} height={h} rx={r} fill={sk ? "none" : fill ?? SOFT} stroke={LINE} strokeWidth={sk ? 1.5 : 1} />;
}
function Bar({ x, y, w, h = 5, sk }: { x: number; y: number; w: number; h?: number; sk: boolean }) {
  if (sk) {
    const n = Math.max(2, Math.round(w / 10));
    let d = `M${x} ${y + h / 2}`;
    for (let i = 1; i <= n; i++) d += ` L${x + (w * i) / n} ${y + h / 2 + (i % 2 ? -1.6 : 1.6)}`;
    return <path d={d} fill="none" stroke={BAR} strokeWidth={1.4} strokeLinecap="round" />;
  }
  return <rect x={x} y={y} width={w} height={h} rx={h / 2} fill={BAR} />;
}
function Tag({ x, y, children, sk }: { x: number; y: number; children: string; sk: boolean }) {
  return sk ? <text x={x} y={y + 5} fill="rgba(255,255,255,0.6)" fontSize="7.5" style={{ fontFamily: "var(--font-inter)" }} letterSpacing="0.3">{children}</text> : null;
}
function Header({ sk, title }: { sk: boolean; title: string }) {
  return (
    <g>
      <path d="M20 22l-7 7 7 7" fill="none" stroke={LINE} strokeWidth={sk ? 1.5 : 1.2} strokeLinecap="round" strokeLinejoin="round" />
      {sk ? <text x="100" y="32" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="9" style={{ fontFamily: "var(--font-inter)" }}>{title}</text> : <Bar x={70} y={26} w={60} sk={false} />}
      <circle cx="184" cy="24" r="1.6" fill={LINE} /><circle cx="184" cy="29" r="1.6" fill={LINE} /><circle cx="184" cy="34" r="1.6" fill={LINE} />
    </g>
  );
}

function PostEvent({ sk }: P) {
  const labels = ["Event name", "Location", "Date and time", "Offer"];
  return (
    <g>
      <Header sk={sk} title="Post event" />
      {labels.map((l, i) => (
        <g key={l}>
          {sk ? <Tag x={14} y={50 + i * 42} sk>{l}</Tag> : <Bar x={14} y={56 + i * 42} w={44 + (i % 2) * 14} sk={false} />}
          <Box x={14} y={64 + i * 42} w={172} h={20} r={10} sk={sk} />
        </g>
      ))}
      {sk ? <Tag x={14} y={218} sk>Upload image</Tag> : <Bar x={14} y={224} w={56} sk={false} />}
      <Box x={14} y={232} w={172} h={20} r={10} sk={sk} />
      <rect x="22" y="237" width="10" height="10" rx="2" fill="none" stroke={LINE} strokeWidth="1" />
      {sk ? <Tag x={14} y={260} sk>Details</Tag> : <Bar x={14} y={266} w={50} sk={false} />}
      <Box x={14} y={274} w={172} h={54} r={10} sk={sk} />
      <Box x={14} y={342} w={78} h={22} r={11} sk={sk} fill="transparent" />
      <Box x={100} y={342} w={86} h={22} r={11} sk={sk} fill={ACCENT} />
      {sk ? <Tag x={122} y={348} sk>Post</Tag> : <Bar x={124} y={351} w={38} sk={false} />}
    </g>
  );
}

function PendingRequests({ sk }: P) {
  return (
    <g>
      <Header sk={sk} title="Pending requests" />
      <Box x={14} y={48} w={172} h={64} r={8} sk={sk} />
      <path d="M14 48L186 112M186 48L14 112" stroke="rgba(255,255,255,0.14)" strokeWidth="1" />
      {sk ? <Tag x={20} y={76} sk>Event banner</Tag> : null}
      {sk ? <text x="14" y="136" fill="rgba(255,255,255,0.7)" fontSize="8.5" style={{ fontFamily: "var(--font-inter)" }}>Event name (26 requests)</text> : <Bar x={14} y={130} w={120} h={6} sk={false} />}
      <line x1="14" y1="144" x2="186" y2="144" stroke={LINE} strokeWidth="1" strokeDasharray={sk ? "3 3" : undefined} opacity="0.5" />
      {[0, 1, 2, 3].map((i) => {
        const y = 154 + i * 48;
        return (
          <g key={i}>
            <Box x={14} y={y} w={172} h={40} r={8} sk={sk} />
            <circle cx="34" cy={y + 20} r="11" fill={sk ? "none" : SOFT} stroke={LINE} strokeWidth={sk ? 1.5 : 1} />
            <Bar x={52} y={y + 11} w={52} sk={sk} />
            <Bar x={52} y={y + 23} w={38} h={4} sk={sk} />
            <Box x={126} y={y + 10} w={50} h={20} r={10} sk={sk} fill={ACCENT} />
            {sk && i === 0 ? <Tag x={133} y={y + 15} sk>View</Tag> : null}
          </g>
        );
      })}
    </g>
  );
}

function ArtistDetails({ sk }: P) {
  return (
    <g>
      <Header sk={sk} title="Artist details" />
      <circle cx="100" cy="72" r="26" fill={sk ? "none" : SOFT} stroke={LINE} strokeWidth={sk ? 1.5 : 1} />
      {sk ? <text x="100" y="75" textAnchor="middle" fill="rgba(255,255,255,0.6)" fontSize="7.5" style={{ fontFamily: "var(--font-inter)" }}>photo</text> : null}
      <Bar x={54} y={108} w={58} h={6} sk={sk} />
      <Box x={120} y={106} w={36} h={12} r={6} sk={sk} />
      {sk ? <Tag x={50} y={122} sk>Artist · city · rate per event</Tag> : <Bar x={46} y={126} w={108} h={4} sk={false} />}
      <Box x={14} y={142} w={172} h={22} r={11} sk={sk} />
      <Box x={16} y={144} w={56} h={18} r={9} sk={sk} fill={ACCENT} />
      {sk ? <text x="44" y="156" textAnchor="middle" fill="rgba(255,255,255,0.7)" fontSize="7.5" style={{ fontFamily: "var(--font-inter)" }}>About</text> : <Bar x={30} y={151} w={28} sk={false} />}
      <Bar x={92} y={151} w={22} sk={sk} /><Bar x={140} y={151} w={28} sk={sk} />
      <Box x={14} y={176} w={172} h={58} r={8} sk={sk} />
      {sk ? <Tag x={24} y={182} sk>Bio</Tag> : <Bar x={24} y={186} w={28} sk={false} />}
      <Bar x={24} y={202} w={148} h={4} sk={sk} /><Bar x={24} y={214} w={116} h={4} sk={sk} />
      <Box x={14} y={244} w={172} h={62} r={8} sk={sk} />
      {[0, 1, 2].map((i) => (
        <g key={i}>
          <circle cx="30" cy={258 + i * 16} r="5" fill="none" stroke={LINE} strokeWidth="1" />
          <Bar x={42} y={256 + i * 16} w={92} h={4} sk={sk} />
        </g>
      ))}
      <Box x={14} y={314} w={172} h={24} r={8} sk={sk} />
      {sk ? <Tag x={24} y={320} sk>Music links</Tag> : <><Bar x={24} y={323} w={30} h={5} sk={false} /><Bar x={64} y={323} w={30} h={5} sk={false} /><Bar x={104} y={323} w={30} h={5} sk={false} /></>}
      <Box x={14} y={346} w={78} h={22} r={11} sk={sk} fill="transparent" />
      <Box x={100} y={346} w={86} h={22} r={11} sk={sk} fill={ACCENT} />
      {sk ? <Tag x={120} y={352} sk>Book now</Tag> : <Bar x={124} y={355} w={38} sk={false} />}
    </g>
  );
}

function Sketch({ kind, sk, label }: { kind: BoardKind; sk: boolean; label: string }) {
  const body = kind === "post-event" ? <PostEvent sk={sk} /> : kind === "pending-requests" ? <PendingRequests sk={sk} /> : <ArtistDetails sk={sk} />;
  return (
    <svg viewBox="0 0 200 378" role="img" aria-label={label} preserveAspectRatio="xMidYMid slice">
      {sk && (
        <defs>
          <filter id="pb-rough" x="-5%" y="-5%" width="110%" height="110%">
            <feTurbulence type="fractalNoise" baseFrequency="0.035" numOctaves="2" seed="4" result="n" />
            <feDisplacementMap in="SourceGraphic" in2="n" scale="2.6" />
          </filter>
        </defs>
      )}
      <g filter={sk ? "url(#pb-rough)" : undefined}>{body}</g>
    </svg>
  );
}

function Arrow() {
  return (
    <div className="pb-arrow" aria-hidden="true">
      <svg viewBox="0 0 56 12" fill="none"><line x1="0" y1="6" x2="50" y2="6" stroke="currentColor" strokeWidth="1" strokeDasharray="3 3" /><path d="M46 1.5L52 6L46 10.5" stroke="currentColor" strokeWidth="1" /></svg>
    </div>
  );
}

function Group({ s, hidden }: { s: BoardScreen; hidden?: boolean }) {
  return (
    <div className="pb-group" aria-hidden={hidden || undefined}>
      <div className="pb-head"><b>{s.name}</b><span>{s.note}</span></div>
      <div className="pb-frames">
        <div className="pb-step">
          <div className="pb-frame"><Sketch kind={s.kind} sk label={`Ideation sketch of the ${s.name} screen`} /></div>
          <div className="pb-lab"><i>01</i> Ideation</div>
        </div>
        <Arrow />
        <div className="pb-step">
          <div className="pb-frame"><Sketch kind={s.kind} sk={false} label={`Wireframe of the ${s.name} screen`} /></div>
          <div className="pb-lab"><i>02</i> Wireframe</div>
        </div>
        <Arrow />
        <div className="pb-step">
          <div className="pb-frame"><Image src={s.src} alt={hidden ? "" : s.alt} width={s.width} height={s.height} sizes="208px" /></div>
          <div className="pb-lab"><i>03</i> High fidelity</div>
        </div>
      </div>
    </div>
  );
}

export default function ProcessBoard({ screens, label, seconds = 70 }: { screens: BoardScreen[]; label: string; seconds?: number }) {
  const [paused, setPaused] = useState(false);
  return (
    <div className={`pb${paused ? " paused" : ""}`} role="region" aria-label={label} style={{ ["--pb-dur" as string]: `${seconds}s` }}>
      <style>{CSS}</style>
      <div className="pb-bar">
        <span><b>Board</b> · {label}</span>
        <button type="button" className="pb-btn" onClick={() => setPaused((p) => !p)} aria-pressed={paused}>
          {paused ? <Play size={12} /> : <Pause size={12} />} {paused ? "Play" : "Pause"}
        </button>
      </div>
      <div className="pb-view">
        <div className="pb-track">
          <div className="pb-set">{screens.map((s) => <Group key={s.kind} s={s} />)}</div>
          <div className="pb-set" aria-hidden="true">{screens.map((s) => <Group key={s.kind} s={s} hidden />)}</div>
        </div>
      </div>
      <p className="pb-note">Ideation and wireframe frames are redrawn from the structure of the final screens.</p>
    </div>
  );
}
