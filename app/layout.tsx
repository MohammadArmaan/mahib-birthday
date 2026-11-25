import type { Metadata, Viewport } from "next";
import { FULL_NAME, SITE_DESCRIPTION, SITE_TITLE, SITE_URL } from "@/lib/site";
import { Fredoka, Nunito } from "next/font/google";
import "./globals.css";

const fredoka = Fredoka({
    variable: "--font-fredoka",
    subsets: ["latin"],
    weight: ["400", "500", "600", "700"],
});
const nunito = Nunito({
    variable: "--font-nunito",
    subsets: ["latin"],
    weight: ["400", "600", "700"],
});

export const metadata: Metadata = {
    metadataBase: new URL(SITE_URL),
    title: { default: SITE_TITLE, template: `%s · ${FULL_NAME}` },
    description: SITE_DESCRIPTION,
    applicationName: `${FULL_NAME} — Birthday`,
    keywords: [
        "Syed Mahib",
        "Mahib birthday",
        "6th birthday",
        "25 November",
        "birthday wishes",
    ],
    authors: [{ name: "Mohammad Armaan" }],
    creator: "Mohammad Armaan",
    alternates: { canonical: "/" },
    robots: { index: true, follow: true },
    openGraph: {
        type: "website",
        url: "/",
        siteName: FULL_NAME,
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
        locale: "en_US",
    },
    twitter: {
        card: "summary_large_image",
        title: SITE_TITLE,
        description: SITE_DESCRIPTION,
    },
};

export const viewport: Viewport = {
    themeColor: "#2f7df6",
    colorScheme: "light",
    width: "device-width",
    initialScale: 1,
};

export default function RootLayout({ children }: LayoutProps<"/">) {
    return (
        <html
            lang="en"
            className={`${fredoka.variable} ${nunito.variable} h-full antialiased`}
        >
            <body className="min-h-full flex flex-col">{children}</body>
        </html>
    );
}
