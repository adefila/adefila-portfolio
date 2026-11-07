"use client";
import { useEffect, useRef } from "react";
import { Check, MessageSquareText, Phone, Star } from "lucide-react";
import { useLang } from "@/context/LangContext";

// The four systems as one short film that loops, directed the way the product-launch films are:
//  - one shape that is never cut: the same card morphs from a booking calendar into a quote form, a text message,
//    a review and a phone, its size and corners on springs (width, height and corners on different springs, so it stretches)
//  - a cursor does every change, with real presses and a ripple
//  - content swaps with a short blur, and exits early so old and new never overlap
//  - the camera pushes in on the moment that matters (the Book button) and pulls back
// Every style is computed from the time in seek(t): no CSS transitions, no timers, no state between frames.
// It plays only while on screen. With "reduce motion" on it shows one finished frame. Decoration only:
// the cards below say the same thing in words. Its words come from the page's translations (il.*).

const LOOP = 24;
const W = 960, H = 540, CX = W / 2, CY = H / 2;

// ── motion helpers ────────────────────────────────────────────────────────────────────
const clamp = (x: number, a = 0, b = 1) => Math.min(b, Math.max(a, x));
const lerp = (a: number, b: number, k: number) => a + (b - a) * k;
const smooth = (x: number) => { const k = clamp(x); return k * k * (3 - 2 * k); };
// closed-form damped spring step response (zeta < 1: a tiny overshoot at most)
const spring = (t: number, w = 11, z = 0.86) => {
  if (t <= 0) return 0;
  const wd = w * Math.sqrt(1 - z * z);
  return 1 - Math.exp(-z * w * t) * (Math.cos(wd * t) + ((z * w) / wd) * Math.sin(wd * t));
};
const typed = (text: string, t: number, start: number, cps: number) => text.slice(0, Math.max(0, Math.floor((t - start) * cps)));

// a scene is visible between `inAt` and `outAt`; it enters a beat after its shape starts to morph and exits early
function window_(t: number, inAt: number, outAt: number) {
  const op = Math.min(smooth((t - inAt) / 0.35), smooth((outAt - t) / 0.2));
  const dir = t < (inAt + outAt) / 2 ? 1 : -1;
  return { op, blur: (1 - op) * 7, y: (1 - op) * 10 * dir };
}

// ── the one shape: [time it starts to morph, centre x, y, width, height, corner radius] ─────
type Key = { t: number; x: number; y: number; w: number; h: number; r: number };
const KEYS: Key[] = [
  { t: 0, x: CX, y: CY, w: 520, h: 300, r: 18 },      // booking calendar
  { t: 4.6, x: CX, y: CY, w: 340, h: 360, r: 22 },    // quote form
  { t: 8.9, x: CX, y: CY, w: 380, h: 96, r: 20 },     // notification
  { t: 10.9, x: CX, y: CY, w: 430, h: 120, r: 60 },   // text message
  { t: 13.4, x: CX, y: CY, w: 400, h: 200, r: 16 },   // review
  { t: 17.4, x: CX, y: CY, w: 230, h: 420, r: 38 },   // phone
  { t: 22.0, x: CX, y: CY, w: 520, h: 300, r: 18 },   // back to the calendar
];

// ── the cursor: it leaves each place at `t0` and springs to the next ──────────────────────
type Leg = { t0: number; x: number; y: number };
const REST = { x: 720, y: 450 };
const LEGS: Leg[] = [
  { t0: 1.0, x: 384, y: 284 },   // the free slot
  { t0: 3.0, x: 580, y: 210 },
  { t0: 5.4, x: 650, y: 350 },
  { t0: 7.3, x: 480, y: 406 },   // Send
  { t0: 9.3, x: 650, y: 300 },
  { t0: 11.5, x: 375, y: 306 },  // the review link
  { t0: 13.6, x: 645, y: 205 },  // the fifth star
  { t0: 15.4, x: 660, y: 310 },
  { t0: 18.0, x: 480, y: 444 },  // Book now
  { t0: 20.6, x: REST.x, y: REST.y },
];
const PRESSES = [2.3, 8.2, 12.2, 14.4, 19.0];

function cursorAt(t: number) {
  let from = { x: REST.x, y: REST.y };
  let x = from.x, y = from.y;
  for (const leg of LEGS) {
    if (t < leg.t0) break;
    const k = spring(t - leg.t0, 9, 0.9);
    x = lerp(from.x, leg.x, k);
    y = lerp(from.y, leg.y, k);
    from = { x: leg.x, y: leg.y };
  }
  return { x, y };
}

const BOOKED: [number, number, string][] = [
  [0, 0, "Ben"], [0, 2, "Sara"], [1, 2, "Tom"], [2, 0, "Lea"], [2, 1, "Kofi"], [3, 2, "Mia"], [4, 0, "Joe"], [4, 1, "Ivy"],
];

export default function SystemsReel() {
  const { t: tr } = useLang();
  const stageRef = useRef<HTMLDivElement>(null);
  const fitRef = useRef<HTMLDivElement>(null);
  const days = tr("il.days").split("|");
  const sms = tr("il.sms");
  const revText = tr("il.rev.text");
  const f1 = tr("il.quote.f1");
  const f2 = tr("il.quote.f2");

  useEffect(() => {
    const stage = stageRef.current;
    const fit = fitRef.current;
    if (!stage || !fit) return;
    // every animated element carries data-k="name"; they are looked up once, then driven directly
    const E: Record<string, HTMLElement> = {};
    stage.querySelectorAll<HTMLElement>("[data-k]").forEach((n) => { E[n.dataset.k as string] = n; });
    const set = (k: string, css: Partial<CSSStyleDeclaration>) => { const n = E[k]; if (n) Object.assign(n.style, css); };
    const show = (k: string, w: { op: number; blur: number; y: number }, extra = "") => {
      set(k, { opacity: String(w.op), filter: w.blur > 0.2 ? `blur(${w.blur.toFixed(1)}px)` : "none", transform: `translateY(${w.y.toFixed(1)}px) ${extra}`, visibility: w.op < 0.01 ? "hidden" : "visible" });
    };
    const txt = (k: string, v: string) => { const n = E[k]; if (n && n.textContent !== v) n.textContent = v; };
    const swap = (k: string, op: number) => set(k, { opacity: String(op), filter: op < 0.99 ? `blur(${((1 - op) * 5).toFixed(1)}px)` : "none" });
    const pop = (k: string, at: number, t: number, from = 0.6) => {
      const s = spring(t - at, 12, 0.8);
      set(k, { opacity: String(clamp((t - at) / 0.15)), transform: `scale(${lerp(from, 1, s).toFixed(3)})` });
    };

    const seek = (time: number) => {
      const t = ((time % LOOP) + LOOP) % LOOP;
      const ta = t > 12 ? t - LOOP : t; // the calendar scene wraps round the loop point

      // the shape
      let ci = 0;
      for (let i = 0; i < KEYS.length; i++) if (KEYS[i].t <= t) ci = i;
      const cur = KEYS[ci];
      const prev = KEYS[(ci - 1 + KEYS.length) % KEYS.length];
      const dt = t - cur.t;
      const kw = spring(dt, 10), kh = spring(dt, 13), kr = spring(dt, 9), kp = spring(dt, 11);
      const w = lerp(prev.w, cur.w, kw), h = lerp(prev.h, cur.h, kh), r = lerp(prev.r, cur.r, kr);
      set("shape", { width: `${w}px`, height: `${h}px`, borderRadius: `${r}px`, left: `${lerp(prev.x, cur.x, kp) - w / 2}px`, top: `${lerp(prev.y, cur.y, kp) - h / 2}px` });

      // A: booking
      show("a", window_(ta, -1.6, 4.4));
      const pressA = spring(t - 2.3, 12, 0.8);
      swap("a-8", 1 - smooth((t - 2.3) / 0.25));
      swap("a-9", smooth((t - 2.38) / 0.3));
      set("a-ring", { opacity: String(t > 1.0 && t < 2.3 ? 0.5 + 0.5 * Math.sin(t * 9) : 0) });
      set("a-anna", { opacity: String(clamp((t - 2.3) / 0.12)), transform: `scale(${lerp(0.7, 1, pressA).toFixed(3)})` });
      pop("a-toast", 2.9, t, 0.85);
      if (t > 4 && t < 10) set("a-toast", { opacity: String(1 - smooth((t - 4.0) / 0.2)) });

      // B: quote form, then the notification it becomes
      show("b", window_(t, 5.0, 8.8));
      txt("b-f1", typed(f1, t, 5.4, 22));
      txt("b-f2", typed(f2, t, 6.5, 22));
      pop("b-th1", 7.2, t); pop("b-th2", 7.35, t); pop("b-th3", 7.5, t);
      const pressB = spring(t - 8.2, 14, 0.8);
      swap("b-send", 1 - smooth((t - 8.22) / 0.2));
      swap("b-sent", smooth((t - 8.3) / 0.2));
      set("b-btn", { transform: `scale(${(1 - 0.06 * Math.sin(Math.PI * clamp((t - 8.2) / 0.25))).toFixed(3)})`, background: pressB > 0.5 ? "var(--accent-purple)" : "var(--fg)" });
      show("n", window_(t, 9.3, 10.7));

      // C: the text message, then the review it brings back
      show("c1", window_(t, 11.3, 13.2));
      set("c1-link", { opacity: String(smooth((t - 11.6) / 0.3)), background: t > 12.2 && t < 12.45 ? "rgba(139,92,246,0.35)" : "rgba(139,92,246,0.15)" });
      show("c2", window_(t, 13.8, 17.2));
      for (let i = 0; i < 5; i++) {
        const fill = spring(t - (14.4 + i * 0.12), 13, 0.8);
        set(`star-${i}`, { color: fill > 0.4 ? "#f5b301" : "rgba(var(--ink), 0.28)", transform: `scale(${(1 + 0.35 * Math.sin(Math.PI * clamp((t - (14.4 + i * 0.12)) / 0.3))).toFixed(3)})` });
      }
      txt("c2-text", typed(revText, t, 15.1, 30));
      pop("c2-plus", 16.2, t, 0.7);
      if (t > 17.2) set("c2-plus", { opacity: String(1 - smooth((t - 17.2) / 0.2)) });

      // D: the phone, with the camera pushing in on Book now
      show("d", window_(t, 17.8, 21.8));
      const bookedOp = smooth((t - 19.05) / 0.2);
      swap("d-book", 1 - bookedOp);
      swap("d-booked", bookedOp);
      set("d-btn", { transform: `scale(${(1 - 0.07 * Math.sin(Math.PI * clamp((t - 19.0) / 0.25))).toFixed(3)})`, background: bookedOp > 0.5 ? "#16a34a" : "var(--accent-purple)" });
      const bn = spring(t - 19.4, 12, 0.85);
      set("d-banner", { opacity: String(clamp((t - 19.4) / 0.12) * (1 - smooth((t - 21.2) / 0.25))), transform: `translateY(${lerp(-60, 0, bn).toFixed(1)}px)` });
      const cam = lerp(1, 1.42, spring(t - 18.4, 8, 0.9)) - (lerp(1, 1.42, spring(t - 20.4, 8, 0.9)) - 1);
      set("world", { transform: `scale(${cam.toFixed(4)})` });

      // the cursor
      const c = cursorAt(t);
      let press = 0, ripple = -1;
      for (const p of PRESSES) {
        const d = t - p;
        press = Math.max(press, Math.exp(-Math.pow((d - 0.07) / 0.06, 2)));
        if (d >= 0 && d < 0.55) ripple = d / 0.55;
      }
      set("cursor", { transform: `translate(${c.x.toFixed(1)}px, ${c.y.toFixed(1)}px) scale(${(1 - 0.18 * press).toFixed(3)})` });
      set("ripple", { opacity: ripple < 0 ? "0" : String(0.55 * (1 - ripple)), transform: `translate(${c.x.toFixed(1)}px, ${c.y.toFixed(1)}px) translate(-50%, -50%) scale(${(0.3 + (ripple < 0 ? 0 : ripple) * 1.6).toFixed(3)})` });
    };

    // size the film to its box: full size on a desktop, no smaller than 0.68 on a phone (the frame crops evenly)
    const layout = () => {
      const cw = stage.clientWidth;
      const s = clamp(cw / W, 0.68, 1.3);
      stage.style.height = `${H * s}px`;
      fit.style.transform = `scale(${s})`;
      fit.style.left = `${(cw - W * s) / 2}px`;
    };
    layout();
    const ro = new ResizeObserver(layout);
    ro.observe(stage);

    const calm = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (calm) { seek(3.4); return () => ro.disconnect(); }

    let raf = 0, running = false, base = 0, visible = false;
    const frame = (now: number) => { seek((now - base) / 1000); raf = requestAnimationFrame(frame); };
    const start = () => { if (running || !visible || document.hidden) return; running = true; base = performance.now() - 0.0; raf = requestAnimationFrame(frame); };
    const stop = () => { running = false; cancelAnimationFrame(raf); };
    seek(0);
    const io = new IntersectionObserver(([e]) => { visible = e.isIntersecting; if (visible) start(); else stop(); }, { threshold: 0.25 });
    io.observe(stage);
    const onVis = () => { if (document.hidden) stop(); else start(); };
    document.addEventListener("visibilitychange", onVis);
    return () => { stop(); io.disconnect(); ro.disconnect(); document.removeEventListener("visibilitychange", onVis); };
  }, [days.length, f1, f2, revText]);

  return (
    <div ref={stageRef} className="sr-stage" aria-hidden="true">
      <div ref={fitRef} className="sr-fit">
        <div data-k="world" className="sr-world" style={{ transformOrigin: "480px 400px" }}>
          <div data-k="shape" className="sr-shape">
            {/* A: booking */}
            <div data-k="a" className="sr-sc sr-a">
              <div className="sr-a-head">
                <b>{tr("il.week")}</b>
                <span className="sr-odo"><span data-k="a-8">{tr("il.booked8")}</span><span data-k="a-9">{tr("il.booked9")}</span></span>
              </div>
              <div className="sr-grid">
                {days.map((d) => <span key={d} className="sr-day">{d}</span>)}
                {Array.from({ length: 15 }, (_, i) => {
                  const day = i % 5, row = Math.floor(i / 5);
                  const slot = BOOKED.find(([d, r]) => d === day && r === row);
                  if (day === 1 && row === 1) {
                    return <span key={i} className="sr-cell sr-free"><i data-k="a-ring" className="sr-ring" /><b data-k="a-anna" className="sr-anna">Anna</b></span>;
                  }
                  return <span key={i} className={slot ? "sr-cell sr-on" : "sr-cell"}>{slot?.[2]}</span>;
                })}
              </div>
              <div data-k="a-toast" className="sr-toast">
                <span className="sr-ico"><MessageSquareText size={14} /></span>
                <span><b>{tr("il.reminder")}</b><small>{tr("il.reminder.sub")}</small></span>
                <Check size={15} strokeWidth={3} className="sr-tick" />
              </div>
            </div>

            {/* B: quote form, then the notification it becomes */}
            <div data-k="b" className="sr-sc sr-b">
              <b className="sr-title">{tr("il.quote.title")}</b>
              <div className="sr-field"><span data-k="b-f1" /></div>
              <div className="sr-field"><span data-k="b-f2" /></div>
              <div className="sr-thumbs"><i data-k="b-th1" /><i data-k="b-th2" /><i data-k="b-th3" /></div>
              <div data-k="b-btn" className="sr-btn">
                <span data-k="b-send">{tr("il.send")}</span>
                <span data-k="b-sent" className="sr-abs"><Check size={13} strokeWidth={3} /> {tr("il.sent")}</span>
              </div>
            </div>
            <div data-k="n" className="sr-sc sr-n">
              <span className="sr-nico"><Phone size={16} /></span>
              <span className="sr-ntext"><b>{tr("il.notif.title")}</b><small>{tr("il.notif.sub")}</small></span>
              <span className="sr-reply">{tr("il.reply")} →</span>
            </div>

            {/* C: the text message and the review */}
            <div data-k="c1" className="sr-sc sr-c1">
              <p>{sms}</p>
              <span data-k="c1-link" className="sr-link">g.page/your-business/review</span>
            </div>
            <div data-k="c2" className="sr-sc sr-c2">
              <div className="sr-rhead">
                <span className="sr-av">L</span>
                <b>Lisa K.</b>
                <span className="sr-stars">{[0, 1, 2, 3, 4].map((i) => <i key={i} data-k={`star-${i}`}><Star size={15} fill="currentColor" strokeWidth={0} /></i>)}</span>
              </div>
              <p data-k="c2-text" />
            </div>

            {/* D: the phone */}
            <div data-k="d" className="sr-sc sr-d">
              <div data-k="d-banner" className="sr-banner"><MessageSquareText size={12} /> <span><b>Bright Smile</b><small>{tr("il.phone.booked")}</small></span></div>
              <b className="sr-brand">Bright Smile</b>
              <div className="sr-hero"><b>{tr("il.phone.headline")}</b><small>{tr("il.phone.open")}</small><span>{tr("il.phone.rate")}</span></div>
              <ul className="sr-svc">
                <li><span>{tr("il.phone.svc1")}</span><b>$60</b></li>
                <li><span>{tr("il.phone.svc2")}</span><b>$85</b></li>
                <li><span>{tr("il.phone.svc3")}</span><b>$190</b></li>
              </ul>
              <div className="sr-slot"><span>{tr("il.phone.slot")}</span><b>{tr("il.time")}</b></div>
              <div data-k="d-btn" className="sr-bookbtn">
                <span data-k="d-book">{tr("il.phone.book")}</span>
                <span data-k="d-booked" className="sr-abs"><Check size={12} strokeWidth={3} /> {tr("il.phone.booked")}</span>
              </div>
            </div>
          </div>
          <span data-k="c2-plus" className="sr-plus">{tr("il.plus")}</span>
          <i data-k="ripple" className="sr-ripple" />
          <div data-k="cursor" className="sr-cursor">
            <svg width="22" height="22" viewBox="0 0 24 24"><path d="M5 3l14 8-6 1.8L9.8 19 5 3z" fill="#fff" stroke="#0f0f0f" strokeWidth="1.6" strokeLinejoin="round" /></svg>
            <em>{tr("il.cursor")}</em>
          </div>
        </div>
      </div>
    </div>
  );
}
