import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const alt = "Samuel Adefila: websites that bring B2B companies new clients";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Link preview of the business site (web.adefilasamuel.com): the hero in miniature. White page, the three-tile eyebrow, one centred headline,
// and the purple mosaic rising from the bottom. Font: Geist, like the site.
export default async function Image() {
  const geist = readFileSync(join(process.cwd(), "node_modules/next/dist/compiled/@vercel/og/Geist-Regular.ttf"));
  const mosaic = "data:image/jpeg;base64," + readFileSync(join(process.cwd(), "public/hero/og-mosaic.jpg")).toString("base64");
  const tile = (c: string) => <div style={{ display: "flex", width: 12, height: 12, background: c, borderRadius: 2 }} />;

  return new ImageResponse(
    (
      <div style={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%", height: "100%", background: "#ffffff", color: "#14112a", fontFamily: "Geist", position: "relative" }}>
        <img src={mosaic} width={1200} height={250} style={{ position: "absolute", left: 0, bottom: 0, opacity: 0.95 }} />
        <div style={{ display: "flex", position: "absolute", left: 0, right: 0, bottom: 250, height: 120, background: "#ffffff", opacity: 0.0 }} />
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginTop: 80, fontSize: 20, letterSpacing: 4, color: "#4a4660" }}>
          <div style={{ display: "flex", gap: 3 }}>{tile("#c4b5fd")}{tile("#7c6bd0")}{tile("#1a1434")}</div>
          B2B WEB DESIGN AND DEVELOPMENT
        </div>
        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", marginTop: 26, fontSize: 84, lineHeight: 1.02, letterSpacing: -3.5 }}>
          <div style={{ display: "flex" }}>Websites that bring B2B</div>
          <div style={{ display: "flex" }}>companies new clients.</div>
        </div>
      </div>
    ),
    { ...size, fonts: [{ name: "Geist", data: geist, style: "normal", weight: 400 }] }
  );
}
