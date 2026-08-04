import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const alt = "Agjent038 — AI Receptionist for Kosovo Call Centres";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: "#f8f8f6",
          padding: "72px",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 14,
              background: "#0e2440",
              color: "#fff",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: 30,
            }}
          >
            A
          </div>
          <div style={{ fontSize: 28, color: "#0b1220" }}>Agjent038</div>
          <div
            style={{
              marginLeft: 12,
              fontSize: 18,
              color: "#6b7488",
              letterSpacing: 3,
              textTransform: "uppercase",
            }}
          >
            Prishtina
          </div>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <div
            style={{
              fontSize: 68,
              lineHeight: 1.08,
              color: "#0b1220",
              maxWidth: 900,
            }}
          >
            Every call answered. Every hour. In their language.
          </div>
          <div style={{ marginTop: 28, fontSize: 28, color: "#3a4356" }}>
            AI receptionist for Kosovo call centres — from $499 / month
          </div>
        </div>

        <div
          style={{
            display: "flex",
            gap: 48,
            borderTop: "1px solid #e6e5e0",
            paddingTop: 28,
            fontSize: 22,
            color: "#6b7488",
          }}
        >
          <div style={{ display: "flex" }}>0.4s answer time</div>
          <div style={{ display: "flex" }}>68% containment</div>
          <div style={{ display: "flex" }}>5 languages</div>
          <div style={{ display: "flex" }}>Live in 14 days</div>
        </div>
      </div>
    ),
    size,
  );
}
