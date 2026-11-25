"use client";

import { useRef, useState } from "react";
import { useGsapScene } from "@/hooks/useGsapScene";
import { gsap } from "@/lib/gsap";
import { burstConfetti } from "@/lib/confetti";
import { Twinkles } from "./Decor";

export function ClosingScene() {
    const scope = useRef<HTMLElement>(null);
    const [blown, setBlown] = useState(false);

    useGsapScene(scope, () => {
        gsap.from("[data-close]", {
            opacity: 0,
            y: 40,
            scale: 0.9,
            stagger: 0.25,
            duration: 1,
            ease: "back.out(1.6)",
            scrollTrigger: { trigger: scope.current, start: "top 60%" },
        });
    });

    function blow(e: React.MouseEvent) {
        if (blown) return;
        setBlown(true);
        gsap.to("[data-flame]", { scale: 0, opacity: 0, duration: 0.4, stagger: 0.08, transformOrigin: "50% 100%" });
        gsap.fromTo("[data-smoke]", { opacity: 0.8, y: 0 }, { opacity: 0, y: -30, duration: 1.4, stagger: 0.08 });
        burstConfetti(e.clientX, e.clientY, 110);
    }

    return (
        <section ref={scope} data-bg="#162a63" className="relative flex min-h-[90svh] flex-col items-center justify-center overflow-hidden px-6 py-24 text-center text-white">
            <Twinkles count={36} />
            <p data-close className="relative font-display text-4xl font-bold md:text-6xl">
                {blown ? "Yay! Your wish will come true!" : "Make a wish, Mahib!"}
            </p>

            <svg data-close viewBox="0 0 200 190" aria-hidden className="relative mt-8 w-56 md:w-72">
                <rect x="20" y="110" width="160" height="70" rx="10" fill="#ff8a3d" />
                <rect x="20" y="110" width="160" height="26" rx="10" fill="#fff" />
                <path d="M20 128c14 14 26-2 40 6s26-6 40 4 26-6 40 2 26-4 40 2v-14H20z" fill="#fff" />
                <rect x="30" y="70" width="140" height="50" rx="10" fill="#2f7df6" />
                <path d="M30 88c12 12 22-4 35 4s22-6 35 4 22-6 35 2 22-4 35 2V80H30z" fill="#fff" />
                {[60, 100, 140].map((x, i) => (
                    <g key={x}>
                        <rect x={x - 5} y="38" width="10" height="34" rx="3" fill={["#ff5a5f", "#ffd23f", "#7be0c3"][i]} />
                        <path data-flame={true} className="flame" d={`M${x} 14c-8 8-6 18 0 22 6-4 8-14 0-22z`} fill="#ffd23f" stroke="#ff8a3d" strokeWidth="2" />
                        <circle data-smoke={true} cx={x} cy="30" r="5" fill="#fff" opacity="0" />
                    </g>
                ))}
            </svg>

            <button
                data-close
                type="button"
                onClick={blow}
                disabled={blown}
                className="relative mt-8 rounded-full bg-sun px-8 py-4 font-display text-xl font-bold text-navy shadow-xl transition hover:scale-105 active:scale-95 disabled:opacity-70"
            >
                {blown ? "Happy Birthday!" : "Blow the candles!"}
            </button>

            <footer data-close className="relative mt-14 font-display text-sm font-semibold tracking-[0.2em] text-white/70 uppercase">
                Made with love by Mama · Mohammad Armaan
            </footer>
        </section>
    );
}
