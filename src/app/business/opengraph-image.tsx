import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const alt = "Samuel Adefila: websites that bring B2B companies new clients";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Link preview of the business site (web.adefilasamuel.com): one headline on flat brand purple, in the site's own font (Geist).
export default async function Image() {
  const geist = readFileSync(join(process.cwd(), "node_modules/next/dist/compiled/@vercel/og/Geist-Regular.ttf"));

  return new ImageResponse(
    (
      <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", width: "100%", height: "100%", padding: "72px 80px", background: "#6d28d9", color: "#ffffff", fontFamily: "Geist" }}>
        <div style={{ display: "flex", fontSize: 30, letterSpacing: -0.5, opacity: 0.9 }}>Samuel Adefila</div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ display: "flex", fontSize: 88, lineHeight: 1.04, letterSpacing: -3.5 }}>Websites that bring</div>
          <div style={{ display: "flex", fontSize: 88, lineHeight: 1.04, letterSpacing: -3.5 }}>B2B companies</div>
          <div style={{ display: "flex", fontSize: 88, lineHeight: 1.04, letterSpacing: -3.5 }}>new clients.</div>
        </div>
        <div style={{ display: "flex", fontSize: 28, letterSpacing: -0.3, opacity: 0.85 }}>web.adefilasamuel.com</div>
      </div>
    ),
    { ...size, fonts: [{ name: "Geist", data: geist, style: "normal", weight: 400 }] }
  );
}
