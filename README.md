# Yash Sharma — Portfolio

Next.js 15 · React 19 · Tailwind 3.4 · Three.js · GSAP. Statically prerendered, dark-only,
recruiter-facing single page. Same design system as `ayushi-portfolio`; the hero WebGL form differs
(tilted point torus vs. sphere) so the two read as siblings rather than duplicates.

```bash
npm install
npm run dev     # http://localhost:3000
npm run build
```

---

## 1. Set the real domain (do this first)

One line, in [`lib/site.ts`](lib/site.ts):

```ts
export const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://yash-sharma.vercel.app'
```

Change the fallback, **or** set `NEXT_PUBLIC_SITE_URL` in Vercel → Settings → Environment
Variables. Canonical tag, `sitemap.xml`, `robots.txt`, `og:url` and the JSON-LD `Person.url` all
derive from it.

## 2. Portrait — done

`public/yash.jpg` is in place and `lib/site.ts` points at it. The hero tile is square
(the source is an 800x800 crop), so nothing about Yash's face is cropped.

To swap it: replace the file, keeping a square source of at least 800x800. Set
`portrait: null` to fall back to the monogram tile — the hero handles both.

## 3. Résumé — done

`public/yash-sharma-resume.pdf` is in place and linked from two places: the hero and
the contact section. Both carry the `download` attribute, so a click saves the file
rather than opening the browser's PDF viewer.

Note: that PDF contains a phone number the page itself does not display. It is now
publicly downloadable and crawlable. To change that, either replace the PDF with a
variant that omits the number, or set `resumeHref: null` in `lib/site.ts` to remove
both buttons.

## 4. Deploy

```bash
npx vercel --prod
```

---

## Image prompts

No generated imagery is required — the hero is live WebGL and the 1200×630 social card is built
from `app/opengraph-image.tsx`. These are optional additions. All abstract: **do not generate a
face**, since the portrait must be a real photograph.

### A. Hero backdrop texture (optional)

> Abstract dark technical texture, near-black charcoal background (#09090B), a faint indigo point
> field drifting across the frame, subtle depth-of-field falloff at the edges, no shapes, no
> objects, no text, no logos, no people. Very low-intensity film grain. Flat, evenly weighted
> composition suitable as a background. Restrained and editorial. 2560×1440.

### B. Project card thumbnails (optional — two)

> **LUTBuilder.ai** — Abstract colour-grading motif: three overlapping translucent gradient ramps
> (teal, amber, magenta) drifting across a near-black field, soft film grain, cinematic, minimal, no
> text, no interface elements, no people. 1600×1000.

> **StillCollab** — Abstract representation of image proofing: a loose grid of empty rounded frames
> at slight angles on charcoal, one frame outlined in blue as if selected, minimal, technical, no
> photographs inside the frames, no text, no logos. 1600×1000.

Save to `public/work/` and tell me — the project cards need a small layout change to display them,
which I have not built, since the current text-only cards are deliberately dense and fast.

### C. Refactyl diagram (optional, would go in the Experience section)

> Abstract before/after code-migration diagram: two vertical columns of thin horizontal lines
> representing code, left column in muted grey, right column in luminous blue, a few faint
> connecting arcs between them, near-black background, minimal, technical, no readable text, no
> syntax, no logos. 1600×900.

---

### The game — Load

`components/LoadGame.tsx`. Requests fall down three lanes; press 1/2/3 (or tap a lane) to
serve one. Each hit heats that server, heat bleeds off over time, and a server pushed to 100
goes offline for a couple of seconds — so mashing one lane is how you lose. Traffic rate
climbs; three dropped requests ends the run.

`HEAT_PER_HIT`, `COOL_PER_SEC` and the `interval()` ramp at the top of the file are the
difficulty dials.

## Performance & SEO notes

Deliberate decisions worth not undoing:

- **`three` and `gsap` are dynamically imported** and absent from the 111 kB first-load bundle.
  Making either a static top-level import will regress LCP.
- **The WebGL scene defers until on-screen and idle**, paints one frame immediately (so a
  backgrounded tab is never blank), then stops its loop when scrolled away or the tab is hidden.
  DPR is clamped to 1.75 and the point count halves under 640 px.
- **`prefers-reduced-motion` renders one static frame** and never loops; reveal animations are
  skipped and content renders visible.
- **Reveal animations are opt-in.** The inline script in `app/layout.tsx` adds `motion-ready`
  pre-paint; only then does CSS hide `[data-reveal]`. No JS, reduced motion, or a crawler means
  everything is visible. If GSAP fails to load, `Motion.tsx` removes the class so content is never
  trapped behind a broken animation.
- Every route prerenders to static HTML; `sitemap.xml`, `robots.txt` and the OG PNG are generated
  at build.

### Verified on the built output

`lang`, single `<h1>`, sequential headings (no level skips), `<title>` 44 chars, meta description
155 chars, canonical, `og:title/description/image/url`, `twitter:card`, `robots: index, follow`,
viewport (zoom not disabled), `theme-color`, JSON-LD `Person` including `sameAs` → GitHub +
LinkedIn, and a skip link. No horizontal scroll at 375 px; body text 16 px.
