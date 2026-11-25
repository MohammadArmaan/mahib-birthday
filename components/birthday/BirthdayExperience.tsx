"use client";

import { useEffect, useRef, type ReactNode } from "react";
import Lenis from "lenis";
import "lenis/dist/lenis.css";
import { gsap, ScrollTrigger } from "@/lib/gsap";
import { MusicControl } from "./MusicControl";

export function BirthdayExperience({ children }: { children: ReactNode }) {
  const root = useRef<HTMLElement>(null);

  useEffect(() => {
    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    let lenis: Lenis | null = null;
    let tick: ((t: number) => void) | null = null;

    if (!reduce) {
      // Single smooth-scroll engine, driven by GSAP's ticker.
      lenis = new Lenis({ autoRaf: false, lerp: 0.1, smoothWheel: true });
      lenis.on("scroll", ScrollTrigger.update);
      tick = (t) => lenis!.raf(t * 1000);
      gsap.ticker.add(tick);
      gsap.ticker.lagSmoothing(0);
    }

    // Background colour follows the active scene. Created after child scenes
    // (child effects run first) so pin spacing is already accounted for.
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>("[data-bg]").forEach((el) => {
        ScrollTrigger.create({
          trigger: el,
          start: "top 55%",
          end: "bottom 55%",
          onToggle: (self) =>
            self.isActive &&
            gsap.to(root.current, {
              backgroundColor: el.dataset.bg,
              duration: reduce ? 0 : 1.1,
              ease: "power2.out",
              overwrite: "auto",
            }),
        });
      });
    }, root);
    ScrollTrigger.refresh();

    return () => {
      ctx.revert();
      if (tick) gsap.ticker.remove(tick);
      lenis?.destroy();
      gsap.ticker.lagSmoothing(500, 33);
    };
  }, []);

  return (
    <main ref={root} className="relative bg-sky">
      {children}
      <MusicControl />
    </main>
  );
}
