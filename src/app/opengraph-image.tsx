import { ImageResponse } from "next/og";
import { readFileSync } from "node:fs";
import { join } from "node:path";
import { GYM } from "@/lib/constants";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const logoData = readFileSync(join(process.cwd(), "public/images/logo.png"));
  const logoSrc = `data:image/png;base64,${logoData.toString("base64")}`;

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
          background: "#090b0d",
          position: "relative",
        }}
      >
        <div
          style={{
            position: "absolute",
            top: -180,
            left: "50%",
            transform: "translateX(-50%)",
            width: 720,
            height: 720,
            borderRadius: "50%",
            background:
              "radial-gradient(circle, rgba(111,224,31,0.35) 0%, rgba(111,224,31,0) 70%)",
            display: "flex",
          }}
        />
        {/* eslint-disable-next-line @next/next/no-img-element */}
        <img
          src={logoSrc}
          alt=""
          width={200}
          height={200}
          style={{ borderRadius: "50%" }}
        />
        <div
          style={{
            marginTop: 36,
            display: "flex",
            fontSize: 84,
            fontWeight: 700,
            color: "#f5f6f4",
            letterSpacing: 2,
          }}
        >
          RAVEN&nbsp;<span style={{ color: "#6fe01f" }}>BOXING CLUB</span>
        </div>
        <div style={{ marginTop: 20, display: "flex", fontSize: 34, color: "#6fe01f" }}>
          {GYM.slogan}
        </div>
        <div style={{ marginTop: 14, display: "flex", fontSize: 26, color: "#8b929b" }}>
          {GYM.legalCity}, Alicante
        </div>
      </div>
    ),
    { ...size }
  );
}
