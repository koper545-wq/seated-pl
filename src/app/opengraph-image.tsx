import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Seated - Kulinarne doświadczenia we Wrocławiu";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "#FAF7F2",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "system-ui, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            gap: "24px",
          }}
        >
          <div
            style={{
              fontSize: 96,
              fontWeight: 800,
              color: "#C05C36",
              letterSpacing: "-2px",
            }}
          >
            Seated
          </div>
          <div
            style={{
              fontSize: 32,
              color: "#6B7280",
              fontWeight: 400,
            }}
          >
            Kulinarne doświadczenia we Wrocławiu
          </div>
          <div
            style={{
              width: 80,
              height: 4,
              backgroundColor: "#C05C36",
              borderRadius: 2,
              marginTop: 8,
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
