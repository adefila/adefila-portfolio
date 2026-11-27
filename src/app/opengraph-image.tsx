import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const alt = "Samuel Adefila, product designer and Framer developer, open to work";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Link preview of the personal site (WhatsApp, LinkedIn, X, Slack): one headline on flat brand purple, in the site's own font (Geist).
// The business site has its own (app/business/opengraph-image.tsx).
export default async function Image() {
  const geist = readFileSync(join(process.cwd(), "node_modules/next/dist/compiled/@vercel/og/Geist-Regular.ttf"));

  return new ImageResponse(
    (
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", padding: "72px 80px", background: "#6d28d9", color: "#ffffff", fontFamily: "Geist" }}>
        <div style={{ display: "flex", fontSize: 30, letterSpacing: -0.5, opacity: 0.9 }}>Samuel Adefila</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 104, lineHeight: 1.02, letterSpacing: -4 }}>Product designer</div>
          <div style={{ display: "flex", fontSize: 104, lineHeight: 1.02, letterSpacing: -4 }}>who ships in code.</div>
        </div>
        <div style={{ display: "flex", fontSize: 28, letterSpacing: -0.3, opacity: 0.85 }}>adefilasamuel.com</div>
      </div>
    ),
    { ...size, fonts: [{ name: "Geist", data: geist, style: "normal", weight: 400 }] }
  );
}
