"use client";

import { useRef } from "react";
import { motion } from "framer-motion";
import { useGsapScene } from "@/hooks/useGsapScene";
import { useReducedMotion } from "@/hooks/useReducedMotion";
import { gsap } from "@/lib/gsap";
import { photos } from "@/lib/photos";
import { Balloon, Clouds, FloatingBits, Star } from "./Decor";
import { FlipPhoto } from "./FlipPhoto";

function Word({ text, delay, className = "" }: { text: string; delay: number; className?: string }) {
    return (
        <span className={`block ${className}`} aria-hidden>
            {[...text].map((c, i) => (
                <motion.span
                    key={i}
                    className="inline-block"
                    initial={{ y: "-120%", rotate: -12, opacity: 0 }}
                    animate={{ y: 0, rotate: 0, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 260, damping: 12, delay: delay + i * 0.07 }}
                >
                    {c === " " ? "\u00A0" : c}
                </motion.span>
            ))}
        </span>
    );
}

export function WelcomeScene() {
    const scope = useRef<HTMLElement>(null);
    const reduce = useReducedMotion();

    useGsapScene(scope, () => {
        const tl = gsap.timeline({
            scrollTrigger: { trigger: scope.current, start: "top top", end: "bottom top", scrub: true },
        });
        tl.to("[data-hero-name]", { yPercent: -35, opacity: 0.15, ease: "none" }, 0)
            .to("[data-hero-img]", { yPercent: 18, scale: 1.1, ease: "none" }, 0)
            .to("[data-hero-balloon]", { yPercent: (i) => -60 - i * 25, ease: "none" }, 0)
            .to("[data-hero-cue]", { opacity: 0, ease: "none", duration: 0.2 }, 0);
    });

    return (
        <section
            ref={scope}
            data-bg="#bfe6ff"
            className="relative flex min-h-svh items-center justify-center overflow-hidden bg-gradient-to-b from-sky-deep/60 via-sky to-white/70"
        >
            <Clouds />
            <FloatingBits count={10} />
            <div className="pointer-events-none absolute top-1/2 left-1/2 size-[85vmin] -translate-x-1/2 -translate-y-1/2 rounded-full bg-sun/40 blur-3xl" />

            <div
                data-hero-name
                className="absolute inset-x-0 top-[5svh] z-0 text-center font-display leading-[0.9] font-bold text-royal"
                style={{ fontSize: "clamp(2.6rem, 10vw, 8.5rem)" }}
            >
                <h1 aria-label="Happy Birthday, Mahib!">
                    <Word text="Happy Birthday" delay={0.2} className="text-[0.55em] text-navy" />
                    <Word text="Mahib!" delay={1.3} className="rainbow-text" />
                </h1>
            </div>

            {[
                ["left-[8%] top-[48%] w-14 md:w-24", "#ff5a5f"],
                ["right-[9%] top-[40%] w-12 md:w-20", "#ffd23f"],
                ["left-[22%] bottom-[12%] w-10 md:w-16", "#7be0c3"],
                ["right-[24%] bottom-[16%] w-12 md:w-20", "#ff8a3d"],
            ].map(([pos, color], i) => (
                <div key={i} data-hero-balloon className={`absolute z-20 ${pos}`}>
                    <Balloon color={color} className="bob w-full" style={{ animationDelay: `${i * -0.8}s` }} />
                </div>
            ))}

            <div data-hero-img className="relative z-10 mt-[30svh]">
                <motion.div
                    initial={reduce ? false : { y: 140, scale: 0.6, opacity: 0 }}
                    animate={{ y: 0, scale: 1, opacity: 1 }}
                    transition={{ type: "spring", stiffness: 120, damping: 11, delay: 1.9 }}
                    className="relative h-[46svh] max-h-[520px]"
                >
                    <FlipPhoto frames={[photos.hero]} priority sizes="(max-width: 768px) 40vw, 300px" className="h-full" />
                    <Star className="absolute -top-2 -right-6 w-9" />
                    <Star color="#ff5a5f" className="absolute top-1/3 -left-8 w-7" />
                </motion.div>
            </div>

            <motion.p
                data-hero-cue
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 3, duration: 1 }}
                className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 flex-col items-center gap-2 font-display text-sm font-semibold tracking-[0.25em] text-navy uppercase"
            >
                Scroll to play!
                <span className="scroll-cue block h-10 w-1 rounded-full bg-royal" />
            </motion.p>
        </section>
    );
}
