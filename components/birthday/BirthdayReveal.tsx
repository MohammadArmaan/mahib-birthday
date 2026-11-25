"use client";

import { useRef } from "react";
import { useGsapScene } from "@/hooks/useGsapScene";
import { gsap } from "@/lib/gsap";
import { burstConfetti } from "@/lib/confetti";
import { BIRTHDAY } from "@/lib/site";
import { Balloon } from "./Decor";
import { Chars } from "./Chars";

const balloons = ["#ff5a5f", "#ffd23f", "#7be0c3", "#ff8a3d", "#ffffff", "#ff5a5f", "#ffd23f", "#7be0c3"];

export function BirthdayReveal() {
    const scope = useRef<HTMLElement>(null);

    useGsapScene(scope, () => {
        gsap.fromTo(
            "[data-balloon]",
            { yPercent: 130, opacity: 1 },
            { yPercent: -140, stagger: 0.15, ease: "none", scrollTrigger: { trigger: scope.current, start: "top bottom", end: "bottom top", scrub: 1.2 } },
        );
        const tl = gsap.timeline({
            scrollTrigger: {
                trigger: scope.current,
                start: "top 50%",
                toggleActions: "play none none reverse",
                onEnter: () => burstConfetti(window.innerWidth / 2, window.innerHeight * 0.55),
            },
        });
        tl.from("[data-six]", { scale: 0, rotate: -30, duration: 1.2, ease: "elastic.out(1, 0.5)" }, 0)
            .from("[data-char]", { yPercent: 120, rotate: 6, stagger: 0.05, duration: 0.9, ease: "back.out(2.5)" }, 0.3)
            .from("[data-date]", { opacity: 0, y: 20, scale: 0.8, duration: 0.8, ease: "back.out(2)" }, 1.2);
    });

    return (
        <section ref={scope} data-bg="#3d95ff" className="relative flex min-h-[110svh] flex-col items-center justify-center overflow-hidden px-6 text-center text-white">
            <div aria-hidden className="pointer-events-none absolute inset-0">
                {balloons.map((c, i) => (
                    <div key={i} data-balloon className="absolute top-1/2" style={{ left: `${6 + i * 12}%`, width: 56 + (i % 3) * 22 }}>
                        <Balloon color={c} className="bob w-full" style={{ animationDelay: `${-i * 0.6}s` }} />
                    </div>
                ))}
            </div>
            <p data-six className="relative font-display font-bold sun-text drop-shadow-lg" style={{ fontSize: "clamp(8rem, 30vw, 22rem)", lineHeight: 0.9 }}>
                6
            </p>
            <h2 className="relative font-display leading-[1] font-bold" style={{ fontSize: "clamp(2.8rem, 10vw, 8rem)" }}>
                <Chars text="Happy Birthday," /> <br />
                <Chars text="Mahib!" className="sun-text" />
            </h2>
            <p data-date className="relative mt-8 rounded-full bg-white px-8 py-3 font-display text-2xl font-bold text-royal md:text-4xl">
                {BIRTHDAY}
            </p>
        </section>
    );
}
