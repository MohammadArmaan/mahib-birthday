export type Photo = { src: string; w: number; h: number; alt: string };

const cut = (name: string, w: number, h: number, alt: string): Photo => ({
    src: `/images/cutout/${name}.webp`,
    w,
    h,
    alt,
});
const web = (name: string, w: number, h: number, alt: string): Photo => ({
    src: `/images/web/${name}.webp`,
    w,
    h,
    alt,
});

export const photos = {
    hero: cut("orange-shades", 504, 1241, "Mahib in an orange shirt with sunglasses on his head"),
    throne: cut("throne", 516, 1317, "Mahib in a mint green kurta"),
    car: cut("toddler-car", 576, 1218, "Baby Mahib in a red toy car with Mama"),
    stage: web("stage-suit", 960, 1280, "Mahib in a black suit on a stage"),
    hug: web("hug-selfie", 1200, 1599, "Mahib giving a big hug"),
    kiss: [
        cut("kiss-a", 814, 1159, "Mahib getting a kiss on the cheek"),
        cut("kiss-b", 847, 1160, "Mahib getting a kiss on the cheek"),
    ],
    store: [
        cut("store-a", 814, 1472, "Mahib with Mama at the store"),
        cut("store-b", 788, 1425, "Mahib with Mama at the store"),
    ],
    trio: [
        cut("trio-a", 900, 1204, "Mahib with Mama and family"),
        cut("trio-b", 900, 1198, "Mahib with Mama and family"),
    ],
    sherwani: [
        cut("sherwani-a", 559, 1140, "Mahib in a black sherwani holding hands with a little girl"),
        cut("sherwani-b", 543, 1141, "Mahib in a black sherwani holding hands with a little girl"),
    ],
    airport: [
        cut("airport-family-a", 879, 1094, "Mahib with his family at the airport"),
        cut("airport-family-b", 840, 1057, "Mahib with his family at the airport"),
    ],
} as const;
