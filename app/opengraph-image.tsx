import { ImageResponse } from "next/og";
import { readFile } from "node:fs/promises";
import { join } from "node:path";
import { BIRTHDAY, CHILD } from "@/lib/site";

export const alt = "Happy Birthday, Syed Mahib!";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default async function Image() {
    const photo = await readFile(join(process.cwd(), "public/images/og-mahib.png"));
    const src = `data:image/png;base64,${photo.toString("base64")}`;

    return new ImageResponse(
        <div
            style={{
                width: "100%",
                height: "100%",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                background: "linear-gradient(135deg, #7cc4ff 0%, #2f7df6 100%)",
                color: "#fff",
                padding: "0 90px",
            }}
        >
            <div style={{ display: "flex", flexDirection: "column" }}>
                <div style={{ fontSize: 30, letterSpacing: 6, color: "#ffd23f", textTransform: "uppercase" }}>
                    {`${BIRTHDAY} · Level 6`}
                </div>
                <div style={{ fontSize: 96, lineHeight: 1.02, marginTop: 24, display: "flex", flexDirection: "column", fontWeight: 800 }}>
                    <span>Happy Birthday,</span>
                    <span style={{ color: "#ffd23f" }}>{`${CHILD}!`}</span>
                </div>
            </div>
            <img src={src} alt="" height={560} width={227} style={{ objectFit: "contain" }} />
        </div>,
        size,
    );
}
