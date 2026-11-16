import { ImageResponse } from "next/og";

export const dynamic = "force-static";
export const size = { width: 180, height: 180 };
export const contentType = "image/png";

/** Apple touch icon — same red brand mark as the header logo. */
export default function AppleIcon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#f2f3f0",
        }}
      >
        <div
          style={{
            width: 148,
            height: 148,
            background: "#b5301f",
            borderRadius: "74px 74px 74px 18px",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div
            style={{
              width: 52,
              height: 52,
              borderRadius: 26,
              background: "#f2f3f0",
            }}
          />
        </div>
      </div>
    ),
    { ...size }
  );
}
