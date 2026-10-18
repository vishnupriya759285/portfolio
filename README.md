# Vishnupriya M V — Portfolio

## Run it

```bash
npm install
npm run dev
```

Open http://localhost:3000.

## Add your video

Drop your keyboard-typing clip at:

```
public/videos/keyboard-hero.mp4
```

Keep it under ~8-10MB if possible (compress with Handbrake / ffmpeg) so it
loads fast and loops smoothly. An `.mp4` (H.264) works everywhere; add a
`.webm` fallback via a second `<source>` tag in `Hero.tsx` if you want
better compression on top of it.

## Syncing typing speed to the video

Open `components/Hero.tsx` and look for the constants block near the top:

```ts
const MS_PER_CHAR = 145;
const JITTER = 45;
const START_DELAY = 600;
const CURSOR_LINGER_MS = 1400;
```

- **MS_PER_CHAR** — delay between typed letters. Watch your clip, count the
  keystrokes-per-second in the section you want to sync to, then set this to
  `1000 / (keystrokes per second)`.
- **JITTER** — random +/- variance per letter so it doesn't feel mechanical.
- **START_DELAY** — pushes typing start later so the first video keystroke
  and the first letter land together.
- **CURSOR_LINGER_MS** — how long the cursor keeps blinking alone once
  "Vishnupriya M V" is fully typed, before it fades.

There's no way to read literal frame-accurate keystroke timestamps out of an
MP4 — this is a hand-tuned match, not a true audio/video sync. In practice,
setting `MS_PER_CHAR` by eye against the clip and previewing a few times gets
it feeling tightly synced within a couple of tries.

## Notes

- Everything (nav, hero copy, CTA, socials) renders on first paint — there's
  no intro/loading gate anywhere in this code.
- Only the name (`Vishnupriya M V`) animates character-by-character;
  everything else uses a single Framer Motion fade/slide-in.
- `prefers-reduced-motion` is respected in `globals.css` — animations
  collapse to near-instant for users who've asked for reduced motion.
- Performance: the video is the heaviest asset. Keep it short (5–10s loop),
  compressed, and served at a sane resolution (1920x1080 is plenty for a
  hero) to keep this smooth on mid-range devices.
