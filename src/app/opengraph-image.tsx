import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const alt = "Samuel Adefila, web developer and Framer designer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

// Link preview (WhatsApp, LinkedIn, X, Slack): the hero headline on the left, the portrait on the
// right, with the proof that matters in one line. Plain flex layout so it renders the same everywhere.
export default async function Image() {
  const poppinsBold = readFileSync(
    join(process.cwd(), "node_modules/@fontsource/poppins/files/poppins-latin-700-normal.woff")
  );
  const portrait = `data:image/jpeg;base64,${readFileSync(join(process.cwd(), "src/app/og-portrait.jpg")).toString("base64")}`;

  const line = {
    fontSize: 84,
    fontWeight: 700,
    letterSpacing: -3.5,
    lineHeight: 1.02,
    textTransform: "uppercase" as const,
    display: "flex",
  };

  return new ImageResponse(
    (
      <div style={{ display: "flex", width: "100%", height: "100%", fontFamily: "Poppins, sans-serif", background: "#f7f7f7" }}>
        {/* Left: headline and proof */}
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", flex: 1, padding: "52px 56px 48px 64px" }}>
          <div style={{ display: "flex", alignItems: "center" }}>
            <div style={{ width: 10, height: 10, borderRadius: 5, background: "#00ab4a", marginRight: 12 }} />
            <div style={{ display: "flex", fontSize: 15, fontWeight: 700, letterSpacing: 4, color: "#0f0f0f" }}>SAMUEL ADEFILA</div>
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ ...line, color: "#0f0f0f" }}></div>
            <div style={{ ...line, color: "#0f0f0f" }}>sites that</div>
            <div style={{ ...line, color: "#6d28d9" }}>sell.</div>
            <div style={{ display: "flex", fontSize: 24, fontWeight: 700, letterSpacing: -0.4, color: "#545c68", marginTop: 26, lineHeight: 1.35 }}>
              Web developer &amp; Framer designer.
            </div>
          </div>

          <div style={{ display: "flex", alignItems: "center", fontSize: 14, fontWeight: 700, letterSpacing: 2, color: "#0f0f0f" }}>
            <div style={{ display: "flex", background: "#0f0f0f", color: "#ffffff", padding: "10px 16px", marginRight: 16 }}>50+ SITES SHIPPED</div>
            <div style={{ display: "flex", marginRight: 16 }}>TOP RATED ON UPWORK</div>
            <div style={{ display: "flex", color: "#6b7280" }}>14 DAYS TO LAUNCH</div>
          </div>
        </div>

        {/* Right: portrait, full height */}
        <div style={{ display: "flex", position: "relative", width: 440, height: 630 }}>
          {/* eslint-disable-next-line @next/next/no-img-element, jsx-a11y/alt-text */}
          <img src={portrait} width={440} height={630} style={{ width: 440, height: 630, objectFit: "cover" }} />
          <div style={{ position: "absolute", top: 0, left: 0, bottom: 0, width: 8, background: "#6d28d9", display: "flex" }} />
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Poppins", data: poppinsBold, style: "normal", weight: 700 }],
    }
  );
}
