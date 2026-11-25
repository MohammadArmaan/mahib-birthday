const vercelHost = process.env.VERCEL_PROJECT_PRODUCTION_URL;

export const SITE_URL = (
    process.env.NEXT_PUBLIC_SITE_URL ??
    (vercelHost ? `https://${vercelHost}` : "http://localhost:3000")
).replace(/\/$/, "");

export const CHILD = "Mahib";
export const FULL_NAME = "Syed Mahib";
export const BIRTHDAY = "25 November";
export const SITE_TITLE = "Happy Birthday, Syed Mahib!";
export const SITE_DESCRIPTION =
    "A playful scroll-through party for Mahib's 6th birthday on 25 November. Press play, scroll, and celebrate!";
