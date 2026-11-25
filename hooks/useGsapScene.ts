"use client";

import { useEffect, type RefObject } from "react";
import { gsap, ScrollTrigger } from "@/lib/gsap";

export type SceneConditions = { desktop: boolean };

/**
 * Runs `setup` inside a scoped gsap.context + matchMedia. Skipped entirely for
 * prefers-reduced-motion (content stays in its natural, visible state).
 * Everything created is reverted on unmount.
 */
export function useGsapScene(
  scope: RefObject<HTMLElement | null>,
  setup: (c: SceneConditions) => void,
) {
  useEffect(() => {
    const ctx = gsap.context(() => {
      const mm = gsap.matchMedia();
      mm.add(
        {
          motion: "(prefers-reduced-motion: no-preference)",
          desktop: "(min-width: 768px)",
        },
        (mc) => {
          if (!mc.conditions?.motion) return;
          setup({ desktop: !!mc.conditions.desktop });
        },
      );
    }, scope);
    return () => {
      ctx.revert();
      ScrollTrigger.refresh();
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
}
