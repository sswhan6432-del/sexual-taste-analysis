import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "Velvet Compass — Discover Your Intimate Archetype";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OGImage() {
  return new ImageResponse(
    (
      <div
        style={{
          background: "linear-gradient(135deg, #0a0a0f 0%, #1a1a2e 50%, #16162a 100%)",
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          fontFamily: "serif",
        }}
      >
        <div style={{ fontSize: 24, color: "#D4B87A", letterSpacing: "0.4em", marginBottom: 20 }}>
          VELVET COMPASS
        </div>
        <div style={{ fontSize: 52, fontWeight: 400, color: "#E8E4DE", marginBottom: 12, fontStyle: "italic" }}>
          Discover Your Intimate Archetype
        </div>
        <div style={{ fontSize: 20, color: "#666" }}>
          72 questions · 8 dimensions · 12 archetypes
        </div>
      </div>
    ),
    { ...size }
  );
}
