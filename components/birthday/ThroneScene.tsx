"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGsapScene } from "@/hooks/useGsapScene";
import { gsap } from "@/lib/gsap";
import { photos } from "@/lib/photos";
import { Chars } from "./Chars";
import { Crown, Star } from "./Decor";

export function ThroneScene() {
    const scope = useRef<HTMLElement>(null);

    useGsapScene(scope, ({ desktop }) => {
        const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: {
                trigger: scope.current,
                pin: true,
                scrub: 1,
                start: "top top",
                end: desktop ? "+=200%" : "+=150%",
                anticipatePin: 1,
            },
        });
        tl.fromTo("[data-rays]", { scale: 0.2, opacity: 0, rotate: 0 }, { scale: 1.3, opacity: 1, rotate: 120, duration: 3 }, 0)
            .fromTo("[data-throne-img]", { yPercent: 110, scale: 0.7 }, { yPercent: 0, scale: 1, duration: 1.4, ease: "back.out(1.2)" }, 0)
            .fromTo("[data-crown]", { y: -300, opacity: 0, rotate: -40 }, { y: 0, opacity: 1, rotate: -6, duration: 0.9, ease: "bounce.out" }, 1.4)
            .fromTo("[data-throne-star]", { scale: 0, opacity: 0 }, { scale: 1, opacity: 1, stagger: 0.2, duration: 0.5, ease: "back.out(3)" }, 1.6)
            .fromTo("[data-throne-text] [data-char]", { yPercent: 120, rotate: 8 }, { yPercent: 0, rotate: 0, stagger: 0.07, duration: 0.8, ease: "back.out(2)" }, 1.8)
            .to("[data-throne-img]", { scale: 1.1, duration: 1.6 }, 2.4);
    });

    const spots = ["left-[10%] top-[24%] w-8", "right-[12%] top-[20%] w-10", "left-[18%] bottom-[22%] w-7", "right-[16%] bottom-[26%] w-9"];

    return (
        <section ref={scope} data-bg="#7cc4ff" className="relative flex h-svh flex-col items-center justify-center overflow-hidden">
            <div
                data-rays
                aria-hidden
                className="absolute top-1/2 left-1/2 size-[130vmax] -translate-x-1/2 -translate-y-1/2 opacity-0"
                style={{ background: "repeating-conic-gradient(from 0deg, rgba(255,255,255,0.35) 0 10deg, transparent 10deg 20deg)", maskImage: "radial-gradient(circle, #000 5%, transparent 55%)", WebkitMaskImage: "radial-gradient(circle, #000 5%, transparent 55%)" }}
            />
            {spots.map((s, i) => (
                <Star key={i} data-throne-star={true} color={i % 2 ? "#ffd23f" : "#ff8a3d"} className={`absolute ${s}`} />
            ))}
            <p className="relative z-10 mb-2 font-display text-sm font-semibold tracking-[0.3em] text-navy uppercase">Level 1</p>
            <div data-throne-text className="relative z-10 text-center font-display leading-none font-bold text-navy" style={{ fontSize: "clamp(2.6rem, 9vw, 7rem)" }}>
                <Chars text="Birthday" /> <br />
                <Chars text="King!" className="sun-text" />
            </div>
            <div data-throne-img className="relative z-10 mt-4 h-[52svh] max-h-[560px]" style={{ aspectRatio: `${photos.throne.w} / ${photos.throne.h}` }}>
                <Crown data-crown className="absolute -top-8 left-1/2 z-10 w-20 -translate-x-1/2 md:w-28" />
                <Image src={photos.throne.src} alt={photos.throne.alt} fill sizes="300px" className="sticker object-contain object-bottom" />
            </div>
        </section>
    );
}
