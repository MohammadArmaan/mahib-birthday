"use client";

import { useRef } from "react";
import Image from "next/image";
import { useGsapScene } from "@/hooks/useGsapScene";
import { gsap } from "@/lib/gsap";
import { photos } from "@/lib/photos";
import { Star, Twinkles } from "./Decor";

export function GameScene() {
    const scope = useRef<HTMLElement>(null);
    const score = useRef<HTMLSpanElement>(null);
    const level = useRef<HTMLSpanElement>(null);

    useGsapScene(scope, ({ desktop }) => {
        const counter = { v: 0 };
        const coins = gsap.utils.toArray<HTMLElement>("[data-coin]");
        const tl = gsap.timeline({
            defaults: { ease: "none" },
            scrollTrigger: { trigger: scope.current, pin: true, scrub: 1, start: "top top", end: desktop ? "+=260%" : "+=200%", anticipatePin: 1 },
        });
        tl.fromTo("[data-car]", { xPercent: -150 }, { xPercent: 150, duration: 6 }, 0)
            .fromTo("[data-road]", { backgroundPositionX: "0px" }, { backgroundPositionX: "-1600px", duration: 6 }, 0)
            .to(counter, {
                v: 6,
                duration: 6,
                onUpdate: () => {
                    if (score.current) score.current.textContent = String(Math.floor(counter.v) * 100).padStart(4, "0");
                    if (level.current) level.current.textContent = String(Math.min(6, Math.floor(counter.v) + (counter.v > 0.01 ? 1 : 0)));
                },
            }, 0)
            .fromTo("[data-throwback]", { opacity: 0, y: 30 }, { opacity: 1, y: 0, duration: 0.8 }, 0.4)
            .fromTo("[data-unlocked]", { scale: 0, opacity: 0, rotate: -15 }, { scale: 1, opacity: 1, rotate: -4, duration: 1, ease: "back.out(2.5)" }, 4.8);
        coins.forEach((c, i) => {
            tl.fromTo(c, { scale: 1, opacity: 1 }, { scale: 2.2, opacity: 0, y: -60, duration: 0.5 }, 1 + (i / coins.length) * 4);
        });
    });

    return (
        <section ref={scope} data-bg="#162a63" className="relative flex h-svh flex-col items-center justify-between overflow-hidden py-8 text-white">
            <Twinkles />
            <div className="relative z-10 flex w-full max-w-4xl items-center justify-between px-6 font-display text-lg font-bold md:text-2xl">
                <span className="rounded-xl bg-white/15 px-4 py-2">SCORE <span ref={score} className="tabular-nums text-sun">0000</span></span>
                <span className="rounded-xl bg-white/15 px-4 py-2">LEVEL <span ref={level} className="tabular-nums text-sun">0</span></span>
            </div>

            <div className="relative z-10 text-center">
                <p data-throwback className="font-display text-sm font-semibold tracking-[0.3em] text-mint uppercase">Throwback level · Mahib&apos;s first car!</p>
                <p data-unlocked className="mt-4 font-display font-bold sun-text" style={{ fontSize: "clamp(2.4rem, 9vw, 6.5rem)" }}>
                    LEVEL 6 UNLOCKED!
                </p>
            </div>

            <div className="relative w-full">
                <div className="absolute inset-x-0 top-1/3 flex justify-around px-[10vw]">
                    {Array.from({ length: 6 }, (_, i) => (
                        <Star key={i} data-coin={true} className="w-8 md:w-12" />
                    ))}
                </div>
                <div data-car className="relative mx-auto h-[40svh] max-h-[420px]" style={{ aspectRatio: `${photos.car.w} / ${photos.car.h}` }}>
                    <Image src={photos.car.src} alt={photos.car.alt} fill sizes="240px" className="sticker object-contain object-bottom" />
                    <p className="absolute -bottom-1 left-1/2 -translate-x-1/2 rounded-full bg-white px-4 py-1 font-display text-sm font-semibold whitespace-nowrap text-navy">With Mama</p>
                </div>
                <div data-road className="mt-5 h-5 w-full" style={{ backgroundImage: "repeating-linear-gradient(90deg, #ffd23f 0 60px, transparent 60px 120px)", backgroundSize: "auto 6px", backgroundRepeat: "repeat-x", backgroundPosition: "0 50%" }} />
            </div>
        </section>
    );
}
