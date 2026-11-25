import Image from "next/image";
import type { Photo } from "@/lib/photos";

/** Two near-identical frames blinking like a cartoon flip-book. Pass one frame for a still sticker. */
export function FlipPhoto({
    frames,
    sizes,
    className = "",
    priority,
}: {
    frames: readonly [Photo] | readonly [Photo, Photo];
    sizes: string;
    className?: string;
    priority?: boolean;
}) {
    const [a, b] = frames;
    const cls = "sticker object-contain object-bottom";
    return (
        <div className={`relative ${className}`} style={{ aspectRatio: `${a.w} / ${a.h}` }}>
            <Image src={a.src} alt={a.alt} fill sizes={sizes} priority={priority} className={cls} />
            {b && <Image src={b.src} alt="" aria-hidden fill sizes={sizes} className={`${cls} flipbook-b`} />}
        </div>
    );
}

/** Framed photo (non-cutout) with a handwritten-style caption. */
export function Polaroid({
    photo,
    caption,
    sizes,
    className = "",
    ...rest
}: {
    photo: Photo;
    caption: string;
    sizes: string;
    className?: string;
} & React.HTMLAttributes<HTMLDivElement>) {
    return (
        <figure {...rest} className={`polaroid relative ${className}`}>
            <div className="relative overflow-hidden rounded-lg" style={{ aspectRatio: `${photo.w} / ${photo.h}` }}>
                <Image src={photo.src} alt={photo.alt} fill sizes={sizes} className="object-cover" />
            </div>
            <figcaption className="absolute inset-x-0 bottom-2 text-center font-display text-lg font-semibold text-navy">
                {caption}
            </figcaption>
        </figure>
    );
}
