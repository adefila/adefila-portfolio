import type { Metadata } from "next";
import { ArrowLeft, Sms } from "iconsax-react";

export const metadata: Metadata = {
  title: "Page not found | Samuel Adefila",
  robots: { index: false },
};

// The 404, in the same language as the rest of the site: white, one calm headline, the three-tile eyebrow, a soft wash at the top and
// the purple mosaic rising from the bottom. Links are relative, so it works on both sites (adefilasamuel.com and web.adefilasamuel.com).
const CSS = `
  .nf { position: relative; min-height: 100vh; width: 100%; overflow: hidden; display: flex; flex-direction: column; background: var(--bg); }
  .nf::before { content: ""; position: absolute; left: 0; right: 0; top: 0; height: 70%; z-index: 0; pointer-events: none;
    background:
      radial-gradient(55% 60% at 18% 30%, rgba(222, 208, 255, 0.28), transparent 70%),
      radial-gradient(50% 60% at 82% 22%, rgba(238, 230, 255, 0.5), transparent 72%),
      radial-gradient(60% 70% at 52% 78%, rgba(255, 255, 255, 1), transparent 75%);
    background-size: 150% 150%; animation: heroFlow 18s ease-in-out infinite alternate; }
  .nf-top { position: relative; z-index: 2; padding: 22px 24px; }
  .nf-name { font-family: var(--font-inter); font-weight: 600; font-size: 13px; letter-spacing: 0.08em; color: var(--fg); text-decoration: none; }
  .nf-body { position: relative; z-index: 2; flex: 1; display: flex; flex-direction: column; align-items: center; text-align: center; padding: clamp(72px, 16vh, 160px) 20px 0; }
  .nf-h { max-width: 14ch; margin: 0; font-family: var(--font-poppins); font-weight: 400; font-size: clamp(40px, 6.2vw, 88px); line-height: 1.02; letter-spacing: -0.045em; color: var(--fg); animation: heroFadeUp 0.7s 0.1s cubic-bezier(0.22, 1, 0.36, 1) both; }
  .nf-p { max-width: 420px; margin: 22px 0 0; font-family: var(--font-inter); font-size: 17px; line-height: 1.6; letter-spacing: -0.2px; color: var(--fg-secondary); animation: heroFadeUp 0.7s 0.2s cubic-bezier(0.22, 1, 0.36, 1) both; }
  .nf-cta { display: flex; flex-wrap: wrap; justify-content: center; gap: 12px; margin-top: 34px; animation: heroFadeUp 0.7s 0.3s cubic-bezier(0.22, 1, 0.36, 1) both; }
  .nf-btn { display: inline-flex; align-items: center; gap: 8px; padding: 14px 24px; font-family: var(--font-inter); font-weight: 600; font-size: 13px; letter-spacing: 0.06em; text-decoration: none; text-transform: uppercase !important; }
  .nf-mosaic { position: absolute; left: 0; right: 0; bottom: 0; height: 40%; z-index: 1; pointer-events: none; opacity: 0.8; background: #1a1434 url("/hero/mosaic.webp") center 40% / cover no-repeat;
    -webkit-mask-image: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.35) 35%, #000 75%); mask-image: linear-gradient(to bottom, transparent 0%, rgba(0, 0, 0, 0.35) 35%, #000 75%); }
`;

export default function NotFound() {
  return (
    <main className="nf">
      <style>{CSS}</style>
      <header className="nf-top">
        <a className="nf-name" href="/">SAMUEL ADEFILA.</a>
      </header>
      <section className="nf-body">
        <p className="hero-kicker">
          <span className="hero-kicker-tiles" aria-hidden="true"><i /><i /><i /></span>
          Error 404
        </p>
        <h1 className="nf-h">This page took a wrong turn.</h1>
        <p className="nf-p">The link may be old, or the page has moved. Head back and you will find your way.</p>
        <div className="nf-cta">
          <a className="btn-primary nf-btn" href="/"><ArrowLeft size={16} variant="Broken" color="currentColor" /> Back to home</a>
          <a className="hero-ghost nf-btn" href="mailto:samuel@adefilasamuel.com">Email me <Sms size={16} variant="Broken" color="currentColor" /></a>
        </div>
      </section>
      <div className="nf-mosaic" aria-hidden="true" />
    </main>
  );
}
