import { ImageResponse } from "next/og";
import { readFileSync } from "fs";
import { join } from "path";

export const alt = "Samuel Adefila. Framer Developer & UI/UX Designer";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
  const poppinsBold = readFileSync(
    join(process.cwd(), "node_modules/@fontsource/poppins/files/poppins-latin-700-normal.woff")
  );

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex",
          width: "100%",
          height: "100%",
          fontFamily: "Poppins, sans-serif",
        }}
      >
        {/* ── LEFT PANEL (dark) ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            flex: 1,
            background: "#0f0f0f",
            padding: "56px 64px",
          }}
        >
          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "#6d28d9",
            }}
          >
            SAMUEL ADEFILA
          </div>

          <div style={{ display: "flex", flexDirection: "column" }}>
            <div
              style={{
                fontSize: 88,
                fontWeight: 700,
                letterSpacing: -4,
                lineHeight: 1,
                color: "#ffffff",
                textTransform: "uppercase",
              }}
            >
              DESIGN &amp;
            </div>
            <div
              style={{
                fontSize: 88,
                fontWeight: 700,
                letterSpacing: -4,
                lineHeight: 1,
                color: "#ffffff",
                textTransform: "uppercase",
              }}
            >
              DEVELOPMENT
            </div>
            <div
              style={{
                fontSize: 88,
                fontWeight: 700,
                letterSpacing: -4,
                lineHeight: 1,
                color: "rgba(255,255,255,0.16)",
                textTransform: "uppercase",
              }}
            >
              THAT CONVERTS.
            </div>
          </div>

          <div
            style={{
              fontSize: 13,
              fontWeight: 700,
              letterSpacing: 3,
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.35)",
            }}
          >
            FRAMER · SHOPIFY · WEBFLOW
          </div>
        </div>

        {/* ── RIGHT PANEL (light) ── */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "space-between",
            width: 380,
            background: "#f7f7f7",
            paddingBottom: 48,
            position: "relative",
          }}
        >
          {/* Purple top bar */}
          <div
            style={{
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: 4,
              background: "#6d28d9",
            }}
          />

          {/* Stats */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              padding: "60px 52px 0",
            }}
          >
            {[
              { n: "50+", label: "PROJECTS SHIPPED" },
              { n: "14", label: "DAYS AVG. LAUNCH" },
              { n: "5+", label: "YEARS BUILDING" },
            ].map((s, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  flexDirection: "column",
                  paddingBottom: 20,
                  marginBottom: 20,
                  borderBottom: "1px solid rgba(0,0,0,0.08)",
                }}
              >
                <div
                  style={{
                    fontSize: 68,
                    fontWeight: 700,
                    letterSpacing: -3,
                    lineHeight: 1,
                    color: "#0f0f0f",
                  }}
                >
                  {s.n}
                </div>
                <div
                  style={{
                    fontSize: 11,
                    fontWeight: 700,
                    letterSpacing: 1.5,
                    textTransform: "uppercase",
                    color: "#9ca3af",
                    marginTop: 4,
                  }}
                >
                  {s.label}
                </div>
              </div>
            ))}
          </div>

          <div
            style={{
              fontSize: 11,
              fontWeight: 700,
              letterSpacing: 2,
              textTransform: "uppercase",
              color: "#0f0f0f",
              padding: "0 52px",
            }}
          >
            FRAMER DEV &amp; UI/UX DESIGNER
          </div>
        </div>
      </div>
    ),
    {
      ...size,
      fonts: [
        {
          name: "Poppins",
          data: poppinsBold,
          style: "normal",
          weight: 700,
        },
      ],
    }
  );
}
