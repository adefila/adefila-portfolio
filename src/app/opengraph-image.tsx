import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const alt = "Samuel Adefila, product designer and Framer developer, open to work";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Link preview of the personal site (adefilasamuel.com): the site itself in miniature. Plain white, one quiet column, small caps name,
// a calm headline, a hairline rule and a short list. No colour, no mosaic. Font: Geist.
// The business site has its own (app/business/opengraph-image.tsx).
export default async function Image() {
  const geist = readFileSync(join(process.cwd(), "node_modules/next/dist/compiled/@vercel/og/Geist-Regular.ttf"));
  const row = (a: string) => (
    <div style={{ display: "flex", padding: "16px 0", borderTop: "1px solid #dcdce3", fontSize: 24, color: "#14112a" }}>{a}</div>
  );

  return new ImageResponse(
    (
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "center", gap: 56, width: "100%", height: "100%", padding: "64px 96px", background: "#ffffff", color: "#14112a", fontFamily: "Geist" }}>
        <div style={{ display: "flex", flexDirection: "column", fontSize: 84, lineHeight: 1.04, letterSpacing: -3.5 }}>
          <div style={{ display: "flex" }}>Product designer</div>
          <div style={{ display: "flex" }}>who ships in code.</div>
        </div>
        <div style={{ display: "flex", flexDirection: "column", borderBottom: "1px solid #dcdce3" }}>
          {row("Product design")}
          {row("Websites")}
          {row("Open to work")}
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Geist", data: geist, style: "normal", weight: 400 }] }
  );
}
