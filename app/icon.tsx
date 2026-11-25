import { ImageResponse } from "next/og";

export const size = { width: 64, height: 64 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          background: "#2f7df6",
          borderRadius: 18,
          color: "#ffd23f",
          fontSize: 42,
          fontWeight: 800,
        }}
      >
        M
      </div>
    ),
    size,
  );
}
