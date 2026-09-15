import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const size = { width: 32, height: 32 };
export const contentType = "image/png";

export default function Icon() {
  const poppinsBold = readFileSync(
    join(process.cwd(), "node_modules/@fontsource/poppins/files/poppins-latin-700-normal.woff")
  );

  return new ImageResponse(
    (
      <div
        style={{
          width: 32,
          height: 32,
          background: "#0f0f0f",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        <span style={{ fontSize: 18, fontWeight: 700, color: "#6d28d9", letterSpacing: -1, lineHeight: 1 }}>
          S
        </span>
        <span style={{ fontSize: 18, fontWeight: 700, color: "#ffffff", letterSpacing: -1, lineHeight: 1 }}>
          A
        </span>
      </div>
    ),
    {
      ...size,
      fonts: [{ name: "Poppins", data: poppinsBold, style: "normal", weight: 700 }],
    }
  );
}
