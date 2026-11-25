import type { MetadataRoute } from "next";
import { FULL_NAME, SITE_DESCRIPTION } from "@/lib/site";

export default function manifest(): MetadataRoute.Manifest {
    return {
        name: `Happy Birthday, ${FULL_NAME}!`,
        short_name: "Mahib's Birthday",
        description: SITE_DESCRIPTION,
        start_url: "/",
        display: "standalone",
        background_color: "#bfe6ff",
        theme_color: "#2f7df6",
        icons: [{ src: "/icon", sizes: "64x64", type: "image/png" }],
    };
}
