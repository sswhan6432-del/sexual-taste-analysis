import { ImageResponse } from "next/og";
import { archetypeMap } from "@/lib/types";

export const runtime = "edge";
export const alt = "Velvet Compass Result";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OgImage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const archetype = archetypeMap[id];

  if (!archetype) {
    return new ImageResponse(
      (
        <div
          style={{
            width: "100%",
            height: "100%",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            backgroundColor: "#000",
            color: "#D4B87A",
            fontSize: 48,
          }}
        >
          Velvet Compass
        </div>
      ),
      size
    );
  }

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          backgroundColor: "#000000",
          padding: "60px 80px",
          position: "relative",
        }}
      >
        {/* Top border accent */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: "20%",
            right: "20%",
            height: 2,
            background:
              "linear-gradient(to right, transparent, #D4B87A80, transparent)",
          }}
        />

        {/* Site name */}
        <div
          style={{
            fontSize: 14,
            letterSpacing: "0.5em",
            color: "rgba(212,184,122,0.35)",
            textTransform: "uppercase",
            marginBottom: 40,
          }}
        >
          Velvet Compass
        </div>

        {/* Type numeral */}
        <div
          style={{
            fontSize: 16,
            letterSpacing: "0.4em",
            color: "rgba(212,184,122,0.4)",
            textTransform: "uppercase",
            marginBottom: 12,
          }}
        >
          Type {archetype.numeral}
        </div>

        {/* Archetype English name */}
        <div
          style={{
            fontSize: 56,
            color: "#D4B87A",
            marginBottom: 8,
            textAlign: "center",
            lineHeight: 1.2,
          }}
        >
          {archetype.nameEn}
        </div>

        {/* Archetype Korean name */}
        <div
          style={{
            fontSize: 22,
            color: "rgba(255,255,255,0.4)",
            fontStyle: "italic",
            marginBottom: 32,
          }}
        >
          {archetype.name}
        </div>

        {/* Divider */}
        <div
          style={{
            width: 80,
            height: 1,
            background:
              "linear-gradient(to right, transparent, rgba(212,184,122,0.3), transparent)",
            marginBottom: 32,
          }}
        />

        {/* Description */}
        <div
          style={{
            fontSize: 18,
            color: "rgba(255,255,255,0.55)",
            textAlign: "center",
            maxWidth: 700,
            lineHeight: 1.7,
          }}
        >
          {archetype.descriptionEn}
        </div>

        {/* CTA */}
        <div
          style={{
            position: "absolute",
            bottom: 50,
            display: "flex",
            alignItems: "center",
            gap: 16,
          }}
        >
          <div
            style={{
              fontSize: 14,
              letterSpacing: "0.2em",
              color: "rgba(212,184,122,0.5)",
              border: "1px solid rgba(212,184,122,0.3)",
              padding: "10px 32px",
            }}
          >
            Discover Your Archetype →
          </div>
        </div>

        {/* Bottom accent */}
        <div
          style={{
            position: "absolute",
            bottom: 0,
            left: "20%",
            right: "20%",
            height: 2,
            background:
              "linear-gradient(to right, transparent, rgba(212,184,122,0.3), transparent)",
          }}
        />
      </div>
    ),
    size
  );
}
