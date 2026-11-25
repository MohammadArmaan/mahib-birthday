import { gsap } from "@/lib/gsap";

const COLORS = ["#ff5a5f", "#ffd23f", "#2f7df6", "#7be0c3", "#ff8a3d", "#ffffff"];

/** Bursts DOM confetti out of (x, y) viewport coordinates. Cleans itself up. */
export function burstConfetti(x: number, y: number, n = 70) {
    if (typeof document === "undefined") return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    const layer = document.createElement("div");
    layer.setAttribute("aria-hidden", "true");
    layer.style.cssText = "position:fixed;inset:0;pointer-events:none;z-index:60;overflow:hidden";
    document.body.appendChild(layer);
    const pieces = Array.from({ length: n }, (_, i) => {
        const p = document.createElement("i");
        const s = 6 + Math.random() * 8;
        p.style.cssText = `position:absolute;left:${x}px;top:${y}px;width:${s}px;height:${s * (i % 2 ? 1 : 0.5)}px;background:${COLORS[i % COLORS.length]};border-radius:${i % 3 === 0 ? "50%" : "2px"}`;
        layer.appendChild(p);
        return p;
    });
    gsap.to(pieces, {
        x: () => (Math.random() - 0.5) * window.innerWidth * 0.9,
        y: () => -window.innerHeight * (0.25 + Math.random() * 0.45),
        rotation: () => Math.random() * 720 - 360,
        duration: 0.9,
        ease: "power2.out",
    });
    gsap.to(pieces, {
        y: `+=${window.innerHeight * 1.2}`,
        opacity: 0,
        duration: 1.8,
        delay: 0.9,
        ease: "power1.in",
        stagger: 0.004,
        onComplete: () => layer.remove(),
    });
}
