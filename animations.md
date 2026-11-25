# Animation guide

## Ownership rules

| Library | Owns |
| --- | --- |
| **GSAP / ScrollTrigger** | everything tied to scroll: reveals, pinning, parallax, background colours |
| **Lenis** | smooth scrolling only, no other scroll engine |
| **Framer Motion** | hero entrance, music button, hint label |
| **CSS keyframes** | floating balloons/stars, clouds, flip-book blink, scroll cue |

Never animate the same element with two systems. When both are needed, put GSAP on the parent and Framer on a child (see `WelcomeScene`: GSAP moves `[data-hero-img]`, Framer reveals the child).

## Smooth scroll (`BirthdayExperience.tsx`)

```ts
lenis = new Lenis({ autoRaf: false });
lenis.on("scroll", ScrollTrigger.update);
gsap.ticker.add((t) => lenis.raf(t * 1000));
gsap.ticker.lagSmoothing(0);
```

Cleanup removes the ticker callback and destroys Lenis. Don't add `scroll-behavior: smooth` or another smooth-scroll library.

## Writing a scene animation

Use the `useGsapScene` hook. It scopes selectors to your ref, handles `matchMedia`, skips everything under reduced motion, and reverts on unmount.

```tsx
const scope = useRef<HTMLElement>(null);

useGsapScene(scope, ({ desktop }) => {
  gsap.from("[data-fade]", {
    opacity: 0, y: 24, stagger: 0.2,
    scrollTrigger: { trigger: scope.current, start: "top 70%" },
  });
});
```

Tips:
- Mark targets with `data-*` attributes; selectors are scoped to the section.
- Use `desktop` to give mobile different distances or no pinning.
- Content must look right with no GSAP running (reduced motion), so set hidden states with `gsap.from/fromTo`, not in CSS.
- Read refs inside function-based values or capture the element first (`const el = ref.current; if (!el) return;`), since GSAP re-runs them on refresh.

## Recipes

**Character reveal**: `<Chars text="Happy Birthday" />`, then
`gsap.from("[data-char]", { yPercent: 115, stagger: 0.04, ease: "power4.out", scrollTrigger: {...} })`.

**Clip-path image reveal (scrubbed)**:
`gsap.fromTo(el, { clipPath: "inset(100% 0 0 0)" }, { clipPath: "inset(0)", scrollTrigger: { trigger: el, start: "top 70%", end: "center 40%", scrub: 1 } })`.

**Parallax**: `gsap.to(el, { yPercent: -10, ease: "none", scrollTrigger: { trigger: section, start: "top bottom", end: "bottom top", scrub: true } })`.

**Pinned scrubbed timeline** (`ThroneScene`, `GameScene`): one timeline with `pin: true, scrub: 1, end: "+=220%"`. Position tweens with the third argument to sync text, image and effects.

**Horizontal scroll** (`GalleryScene`, desktop only): tween the track's `x` by `-(scrollWidth - innerWidth)` with `pin: true` and `end: "+=" + distance`. Animate things inside panels using `containerAnimation: move` on their ScrollTriggers.

**Scene background colour**: add `data-bg="#hex"` to a `<section>`. `BirthdayExperience` tweens the page background when it becomes active.

## Framer Motion usage

Use it for state-driven micro-interactions only (`whileHover`, `whileTap`, `AnimatePresence`). Don't drive it from scroll position or React state updates on scroll.

## Floating decorations

`<FloatingBits count={10} />` renders deterministic CSS-animated balloons, stars and notes (no `Math.random`, so no hydration mismatch). Items beyond the sixth are hidden on mobile. Reduced motion freezes them. `Clouds` and `Twinkles` follow the same rules.

## Adding a new scene

1. Create `components/birthday/MyScene.tsx` (`"use client"`), add `data-bg` to its section.
2. Animate with `useGsapScene`.
3. Add it to `app/page.tsx` in order.

## Checklist

- Animate transform/opacity/clip-path, not layout properties.
- Keep selectors scoped; no global `ScrollTrigger.getAll().kill()`.
- Test with reduced motion, a narrow viewport, and a hard refresh mid-page.
