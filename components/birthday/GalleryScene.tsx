"use client";

import { useRef } from "react";
import { useGsapScene } from "@/hooks/useGsapScene";
import { gsap } from "@/lib/gsap";
import { photos, type Photo } from "@/lib/photos";
import { Chars } from "./Chars";
import { Star } from "./Decor";
import { FlipPhoto } from "./FlipPhoto";

const panel = "relative flex shrink-0 items-center justify-center px-6 md:px-[3vw]";

function Message({ small, big, color }: { small: string; big: string; color: string }) {
    return (
        <div className={`${panel} w-full py-8 md:h-full md:w-[36vw]`}>
            <div data-msg className="max-w-sm text-center md:text-left">
                <Star color={color} className="mx-auto mb-3 w-9 md:mx-0" />
                <p className="font-display text-sm font-semibold tracking-[0.3em] text-royal uppercase">{small}</p>
                <p className="mt-2 font-display text-4xl leading-tight font-bold text-navy md:text-6xl">{big}</p>
            </div>
        </div>
    );
}

function Pair({ frames, caption, tilt }: { frames: readonly [Photo] | readonly [Photo, Photo]; caption: string; tilt: number }) {
    return (
        <div className={`${panel} w-full py-6 md:h-full md:w-[30vw]`}>
            <div data-photo className="flex flex-col items-center" style={{ rotate: `${tilt}deg` }}>
                <FlipPhoto frames={frames} sizes="(max-width: 768px) 70vw, 30vw" className="w-[min(68vw,300px)] md:h-[62svh] md:w-auto" />
                <p className="mt-3 rounded-full bg-white px-5 py-1.5 font-display text-lg font-semibold text-navy shadow-md">{caption}</p>
            </div>
        </div>
    );
}

export function GalleryScene() {
    const scope = useRef<HTMLElement>(null);
    const track = useRef<HTMLDivElement>(null);

    useGsapScene(scope, ({ desktop }) => {
        if (desktop) {
            const el = track.current;
            if (!el) return;
            const dist = () => Math.max(0, el.scrollWidth - window.innerWidth);
            const move = gsap.to(el, {
                x: () => -dist(),
                ease: "none",
                scrollTrigger: { trigger: scope.current, pin: true, scrub: 1, start: "top top", end: () => `+=${dist()}`, invalidateOnRefresh: true },
            });
            gsap.fromTo("[data-progress]", { scaleX: 0 }, {
                scaleX: 1,
                ease: "none",
                scrollTrigger: { trigger: scope.current, start: "top top", end: () => `+=${dist()}`, scrub: true, invalidateOnRefresh: true },
            });
            gsap.utils.toArray<HTMLElement>("[data-photo]").forEach((p, i) => {
                gsap.from(p, {
                    y: 220,
                    scale: 0.6,
                    opacity: 0,
                    rotate: i % 2 ? 14 : -14,
                    ease: "back.out(1.6)",
                    scrollTrigger: { trigger: p, containerAnimation: move, start: "left 98%", end: "left 62%", scrub: true },
                });
                gsap.to(p, {
                    y: -18,
                    ease: "none",
                    scrollTrigger: { trigger: p, containerAnimation: move, start: "left 60%", end: "right left", scrub: true },
                });
            });
            gsap.utils.toArray<HTMLElement>("[data-msg]").forEach((m) => {
                gsap.from(m, {
                    opacity: 0,
                    x: 100,
                    scale: 0.85,
                    duration: 0.8,
                    ease: "back.out(2)",
                    scrollTrigger: { trigger: m, containerAnimation: move, start: "left 88%", toggleActions: "play none none reverse" },
                });
            });
        } else {
            gsap.utils.toArray<HTMLElement>("[data-photo]").forEach((p, i) => {
                gsap.from(p, {
                    y: 80,
                    scale: 0.7,
                    opacity: 0,
                    rotate: i % 2 ? 10 : -10,
                    duration: 0.9,
                    ease: "back.out(1.8)",
                    scrollTrigger: { trigger: p, start: "top 88%" },
                });
            });
            gsap.utils.toArray<HTMLElement>("[data-msg]").forEach((m) => {
                gsap.from(m, { opacity: 0, y: 30, duration: 0.8, ease: "power3.out", scrollTrigger: { trigger: m, start: "top 88%" } });
            });
        }
        gsap.from("[data-story-title] [data-char]", {
            yPercent: 120,
            rotate: 8,
            stagger: 0.04,
            duration: 0.9,
            ease: "back.out(2)",
            scrollTrigger: { trigger: "[data-story-title]", start: "top 88%" },
        });
    });

    return (
        <section ref={scope} data-bg="#d3ecff" className="relative overflow-hidden md:h-svh">
            <div ref={track} className="flex flex-col md:h-full md:w-max md:flex-row md:items-center">
                <div className={`${panel} w-full pt-16 pb-2 md:h-full md:w-[48vw] md:pt-0`}>
                    <h2 data-story-title className="font-display text-6xl leading-[0.95] font-bold text-navy md:text-8xl">
                        <Chars text="Little" /> <br />
                        <Chars text="moments," className="rainbow-text" /> <br />
                        <Chars text="big smiles!" />
                    </h2>
                </div>
                <Pair frames={photos.store} caption="With Mama" tilt={-3} />
                <Message small="Level 3" big="Shopping adventure!" color="#ffd23f" />
                <Pair frames={photos.trio} caption="With Mama" tilt={3} />
                <Message small="Zoom zoom" big="Every day is a party." color="#ff5a5f" />
                <Pair frames={photos.sherwani} caption="Holding hands" tilt={-2} />
                <Message small="Best buddies" big="Playtime never ends!" color="#7be0c3" />
                <Pair frames={photos.airport} caption="Family time" tilt={2} />
                <Message small="Next stop" big="More fun ahead!" color="#ff8a3d" />
                <div className="w-[8vw] shrink-0 max-md:hidden" />
            </div>
            <div className="absolute inset-x-[6vw] bottom-8 h-2 rounded-full bg-white/60 max-md:hidden">
                <div data-progress className="h-full origin-left rounded-full bg-royal" />
            </div>
        </section>
    );
}
