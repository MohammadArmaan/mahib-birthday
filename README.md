# Syed Mahib — A Birthday Experience

A cinematic, scroll-driven birthday website built with Next.js (App Router), GSAP ScrollTrigger, Lenis, Framer Motion and a synthesised playful kids-pop loop (Web Audio).
The birthday text lives in `lib/site.ts`, so the site can be reused every 25 November (Mahib's birthday).

## Stack

- Next.js 16 · React 19 · TypeScript · Tailwind CSS 4 · Shadcn UI (configured, unused by the page)
- GSAP + ScrollTrigger for scroll choreography
- Lenis for smooth scrolling, driven by GSAP's ticker
- Framer Motion for micro-interactions (hero entrance, music control)
- Web Audio API for the music loop (no Three.js, by design: CSS balloons and stars are lighter)
- `next/font`: Cormorant Garamond, DM Sans, Great Vibes

## Getting started

```bash
npm install
npm run dev      # http://localhost:3000
npm run build && npm start
npm run lint
```

## Project structure

```
app/                  layout + metadata, page, sitemap, robots, manifest, icons, OG/Twitter images, globals.css (tokens)
components/birthday/
  BirthdayExperience  Lenis + GSAP sync, scene background colours, music control
  WelcomeScene        title, hero cutout, balloons, clouds
  ThroneScene         pinned "Birthday King" scene
  RhymeScene          karaoke-style rhymes that light up on scroll
  GalleryScene        pinned horizontal gallery (vertical on mobile)
  GameScene           pinned HUD scene, "Level 6 unlocked"
  ParadeScene         sticker / polaroid photos with speech bubbles
  BirthdayReveal      "Happy Birthday" + confetti
  ClosingScene        cake and candles
  Decor / FlipPhoto / Chars / MusicControl   shared pieces
hooks/                useGsapScene, useReducedMotion, useIsMobile, useMedia
lib/                  site.ts (name, date, URL), photos.ts (image registry), gsap.ts, confetti.ts, birthday-music.ts
public/images/        web/ (framed photos), cutout/ (transparent), og-mahib.png
```

## Music

- Never autoplays. The floating button (bottom right) starts it with a fade-in; tap again to pause.
- If `public/audio/happy-birthday.mp3` exists it is used; otherwise a playful loop is synthesised with Web Audio.
- The audio code is dynamically imported on first tap.

## Customising

| What                     | Where                                                |
| ------------------------ | ---------------------------------------------------- |
| Name, date, description  | `lib/site.ts`                                        |
| Site URL (canonical, OG) | `NEXT_PUBLIC_SITE_URL`, or Vercel's production URL   |
| Scene copy and captions  | the scene components in `components/birthday/`       |
| Colours, fonts           | `app/globals.css` (`--color-*`) and `app/layout.tsx` |
| Photos                   | `lib/photos.ts` and `public/images/`                 |
| Scene background colours | `data-bg` attribute on each `<section>`              |

## SEO

Title, description, canonical, Open Graph and Twitter cards come from `app/layout.tsx` and `lib/site.ts`. The share image is generated in `app/opengraph-image.tsx` (reused by `twitter-image.tsx`). `sitemap.xml`, `robots.txt` and the web manifest are generated routes.

## Performance & accessibility

- Server-rendered shell; only animated scenes are client components.
- Animations use transform/opacity/clip-path; balloons, stars and clouds are pure CSS.
- Below-the-fold images are lazy-loaded; only the hero image has `priority`.
- `prefers-reduced-motion`: Lenis and all GSAP animation are skipped and content is shown statically.
- Mobile gets lighter pinning, fewer floating decorations and no horizontal scrolling.

See [animations.md](animations.md) for how the animation system works.
