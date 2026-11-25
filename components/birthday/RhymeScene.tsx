"use client";

import { useRef } from "react";
import { useGsapScene } from "@/hooks/useGsapScene";
import { gsap } from "@/lib/gsap";
import { Note } from "./Decor";

const rhymes = [
    {
        title: "The Candles on the Cake",
        lines: [
            "The candles on the cake go blow, blow, blow,",
            "Blow, blow, blow, blow, blow, blow,",
            "The candles on the cake go blow, blow, blow,",
            "Happy birthday, Mahib!",
        ],
    },
    {
        title: "Twinkle, Twinkle, Birthday Boy",
        lines: [
            "Twinkle, twinkle, birthday boy,",
            "You bring us all so much joy,",
            "Six years old and shining bright,",
            "Mahib, you're our guiding light!",
        ],
    },
];

export function RhymeScene() {
    const scope = useRef<HTMLElement>(null);

    useGsapScene(scope, () => {
        gsap.utils.toArray<HTMLElement>("[data-rhyme]").forEach((block) => {
            const words = block.querySelectorAll("[data-w]");
            gsap.fromTo(
                words,
                { color: "rgba(18,48,107,0.25)", scale: 0.95 },
                {
                    color: "#2f7df6",
                    scale: 1,
                    stagger: 0.12,
                    ease: "back.out(2)",
                    scrollTrigger: { trigger: block, start: "top 75%", end: "bottom 40%", scrub: 0.6 },
                },
            );
            gsap.from(block.querySelector("[data-rhyme-title]"), {
                y: 40,
                opacity: 0,
                scale: 0.8,
                duration: 0.8,
                ease: "back.out(2)",
                scrollTrigger: { trigger: block, start: "top 85%", toggleActions: "play none none reverse" },
            });
        });
        gsap.utils.toArray<HTMLElement>("[data-note]").forEach((n, i) => {
            gsap.to(n, {
                yPercent: -300 - i * 60,
                rotate: i % 2 ? 40 : -40,
                ease: "none",
                scrollTrigger: { trigger: scope.current, start: "top bottom", end: "bottom top", scrub: true },
            });
        });
    });

    return (
        <section ref={scope} data-bg="#fff0b8" className="relative overflow-hidden px-6 py-[18svh] text-center">
            {["left-[6%] top-[20%] w-10", "right-[8%] top-[34%] w-14", "left-[12%] top-[62%] w-12", "right-[10%] top-[78%] w-9"].map((p, i) => (
                <Note key={i} data-note={true} color={["#2f7df6", "#ff5a5f", "#7be0c3", "#ff8a3d"][i]} className={`absolute ${p}`} />
            ))}
            <p className="font-display text-sm font-semibold tracking-[0.3em] text-orange uppercase">Level 2 · Sing along!</p>
            <div className="mx-auto mt-10 flex max-w-3xl flex-col gap-[16svh]">
                {rhymes.map((r) => (
                    <div key={r.title} data-rhyme>
                        <h2 data-rhyme-title className="font-display text-3xl font-bold text-navy md:text-5xl">
                            {r.title}
                        </h2>
                        <div className="mt-8 flex flex-col gap-3 font-display text-2xl leading-snug font-semibold md:text-4xl">
                            {r.lines.map((l, i) => (
                                <p key={i}>
                                    {l.split(" ").map((w, j) => (
                                        <span key={j} data-w className="inline-block pr-[0.28em]">
                                            {w}
                                        </span>
                                    ))}
                                </p>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
