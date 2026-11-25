"use client";

import { useRef } from "react";
import { useGsapScene } from "@/hooks/useGsapScene";
import { gsap } from "@/lib/gsap";
import { photos } from "@/lib/photos";
import { Clouds, Star } from "./Decor";
import { FlipPhoto, Polaroid } from "./FlipPhoto";

function Bubble({ text, className }: { text: string; className: string }) {
    return (
        <span data-bubble className={`absolute z-20 rounded-3xl border-4 border-navy bg-white px-4 py-1 font-display text-xl font-bold text-navy md:text-3xl ${className}`}>
            {text}
        </span>
    );
}

export function ParadeScene() {
    const scope = useRef<HTMLElement>(null);

    useGsapScene(scope, () => {
        gsap.utils.toArray<HTMLElement>("[data-pop]").forEach((el, i) => {
            gsap.from(el, {
                scale: 0.3,
                opacity: 0,
                rotate: i % 2 ? 18 : -18,
                y: 100,
                duration: 1,
                ease: "elastic.out(1, 0.55)",
                scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none reverse" },
            });
            gsap.to(el, {
                yPercent: i % 2 ? -8 : 8,
                ease: "none",
                scrollTrigger: { trigger: el, start: "top bottom", end: "bottom top", scrub: true },
            });
        });
        gsap.utils.toArray<HTMLElement>("[data-bubble]").forEach((b) => {
            gsap.from(b, {
                scale: 0,
                rotate: -12,
                duration: 0.5,
                delay: 0.3,
                ease: "back.out(3)",
                scrollTrigger: { trigger: b, start: "top 88%", toggleActions: "play none none reverse" },
            });
        });
        gsap.from("[data-parade-title]", { y: 60, opacity: 0, scale: 0.8, duration: 0.9, ease: "back.out(2)", scrollTrigger: { trigger: "[data-parade-title]", start: "top 88%" } });
    });

    return (
        <section ref={scope} data-bg="#c9f3e5" className="relative overflow-hidden px-6 py-[14svh]">
            <Clouds />
            <h2 data-parade-title className="relative text-center font-display text-5xl leading-tight font-bold text-navy md:text-7xl">
                Smart, stylish &amp; <span className="rainbow-text">super cool!</span>
            </h2>

            <div className="relative mx-auto mt-[10svh] grid max-w-5xl gap-[14svh] md:grid-cols-2 md:gap-x-10">
                <div data-pop className="relative mx-auto w-[min(78vw,340px)] -rotate-3">
                    <Polaroid photo={photos.stage} caption="Showtime!" sizes="340px" />
                    <Bubble text="Wow!" className="-top-5 -right-4 rotate-6" />
                    <Star className="absolute -bottom-4 -left-6 w-10" />
                </div>
                <div data-pop className="relative mx-auto w-[min(78vw,340px)] rotate-2 md:mt-[18svh]">
                    <Polaroid photo={photos.hug} caption="Squishy hugs!" sizes="340px" />
                    <Bubble text="Squish!" className="-top-5 -left-4 -rotate-6" />
                    <Star color="#ff5a5f" className="absolute -right-5 -bottom-4 w-9" />
                </div>
                <div data-pop className="relative mx-auto flex flex-col items-center md:col-span-2">
                    <FlipPhoto frames={photos.kiss} sizes="(max-width: 768px) 70vw, 360px" className="w-[min(70vw,340px)]" />
                    <Bubble text="Mwah!" className="top-6 right-[-6%] rotate-6 md:right-[22%]" />
                    <p className="mt-3 rounded-full bg-white px-5 py-1.5 font-display text-lg font-semibold text-navy shadow-md">Kisses!</p>
                </div>
            </div>
        </section>
    );
}
