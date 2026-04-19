import { ImageResponse } from "next/og";
import { profile } from "@/content";

export const runtime = "edge";
export const alt = `${profile.name} — ${profile.alias}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: 72,
          background:
            "radial-gradient(circle at 85% 15%, rgba(52,211,154,0.18), transparent 55%), #0a0f1a",
          color: "#f4f4f5",
          fontFamily: "system-ui, -apple-system, sans-serif",
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            fontSize: 22,
            fontFamily: "monospace",
            color: "#9aa0a6",
          }}
        >
          <span style={{ color: "#34d39a", marginRight: 10 }}>❯</span>
          {profile.alias}.dev
        </div>

        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
          <div
            style={{
              display: "flex",
              fontSize: 28,
              fontFamily: "monospace",
              color: "#9aa0a6",
            }}
          >
            haxurn@tech:~$ whoami
          </div>
          <div
            style={{
              display: "flex",
              fontSize: 108,
              fontWeight: 500,
              letterSpacing: -2,
              lineHeight: 1,
            }}
          >
            {profile.name}
            <span style={{ color: "#9aa0a6" }}> — </span>
            <span style={{ color: "#34d39a" }}>{profile.alias}</span>
          </div>
          <div style={{ display: "flex", fontSize: 32, color: "#b8bcc4", maxWidth: 960 }}>
            {profile.tagline}
          </div>
        </div>

        <div
          style={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            fontSize: 20,
            fontFamily: "monospace",
            color: "#70757d",
          }}
        >
          <span>{profile.role.toLowerCase()}</span>
          <span>{profile.location}</span>
        </div>
      </div>
    ),
    { ...size },
  );
}
