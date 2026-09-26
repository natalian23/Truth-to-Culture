# Truth to Culture — marketing website

A six-page dark marketing site for **Truth to Culture**, the faith-rooted mindset course by
Rita Wright. Built from the `design_handoff_website` bundle ("a world, not a website").

Its job: drive downloads of the companion daily-practice app, and serve as the resource hub
for Rita's Substack essays.

## Stack

- **Next.js 16** (App Router) + **React 19** — real routes, static prerendering
- `next/font/google` — Bebas Neue, Instrument Serif (+italic), Archivo, JetBrains Mono,
  self-hosted at build (no CDN request at runtime)
- Plain CSS with design tokens in `app/globals.css` — no CSS framework

## Run

```bash
npm install
npm run dev      # http://localhost:4321
```

```bash
npm run build && npm start
```

## Routes

| Route | Screen |
| --- | --- |
| `/` | Hero · 01 The World · 02 The App · The Mark · Closer |
| `/about` | Rita Wright — bio, "In her words" letter |
| `/course` | The Mindset Shift — the five elements index |
| `/testimonials` | What Changed For Them |
| `/reading` | The Reading Room — **live from Substack** |
| `/contact` | Say It Out Loud |

## Design tokens

Everything lives as CSS custom properties in `app/globals.css`.

- Background `#08090A`, surface `#0B0C0E` (hover `#101214` / `#0F1113`)
- Ink `#F4F2ED`, accent `#BFD3DE`
- Hairlines `rgba(244,242,237,.12)`; pills `999px`; cards sharp-cornered
- Type: Bebas Neue (display caps), Instrument Serif (pull-quotes, italic taglines),
  Archivo (body), JetBrains Mono (kickers, nav, tags)

Primitive classes: `.display .serif .serif-i .mono .kicker .card-title .tagline .page-title
.pill .pill-solid .pill-outline .chip .field .framed .grid-bordered .grid-hairline .index-row`

## Motion

`components/SiteMotion.jsx` re-arms on every route change and owns:

- staggered scroll reveals (every direct child of a `<section>`, 90ms per sibling)
- the 2px accent scroll-progress bar
- cursor glow, hero-ring parallax, phone 3D tilt, ghost "85" drift
- `h2` letter-spacing that eases wider below the viewport centre

Reveals are applied **in JS, not CSS**, so a visitor without JavaScript still sees the whole
page. Parallax and tilt are skipped under `prefers-reduced-motion`; the fades stay.

The threshold (`components/Threshold.jsx`) shows once per session via `sessionStorage`. A tiny
blocking script in `app/layout.jsx` injects a `display:none` rule before first paint so returning
visitors never see it flash.

## Reading Room ← Substack

Rita's Substack **is the CMS**. `lib/substack.js` fetches
`https://connected565.substack.com/feed` and the page revalidates daily
(`export const revalidate = 86400` in `app/reading/page.jsx`).

If the feed is unreachable at build time the page falls back to archive placeholders, so a bad
network never ships an empty room. Override the feed with `SUBSTACK_FEED_URL`.

## The app's season builder — `POST /api/season`

The companion app sends a finished intake here and gets back which of Rita's five
elements ran loudest, with the person's own words quoted back (`lib/season.js`,
Claude with structured output). The API key never leaves the server.

- Set `ANTHROPIC_API_KEY` in Vercel → Settings → Environment Variables. Without it
  the route answers 503 and the app quietly falls back to its on-device pass.
- Optional `SEASON_API_TOKEN`: if set, requests must carry it as `x-ttc-token`.
- Cost is roughly a cent or two per intake.

## Before launch — still to wire

1. **App store links** — the App Store / Google Play buttons on `/` are `href="#"` placeholders,
   labelled `STORE LINKS GO LIVE AT LAUNCH`. Point them at the real listings (or a waitlist).
2. **Testimonials** — all four quotes on `/testimonials` are placeholders, flagged in the UI.
   Swap in real student quotes and delete the footnote.
3. **Contact form** — set `NEXT_PUBLIC_FORMSPREE_ID` and the form POSTs to Formspree. Until then
   it falls back to opening the visitor's mail client, and the footnote says so.
4. **Social links** — YouTube and Instagram on `/contact` are dimmed placeholders.
5. **Domain** — `metadataBase` in `app/layout.jsx` assumes `https://truthtoculture.com`.

Copy `.env.example` to `.env.local` to set these locally.

## Deploying

Vercel or Netlify, no configuration needed. Do **not** add `output: 'export'` — static export
disables the daily revalidation the Reading Room depends on.

## Copy

All copy is final and client-approved. Rita's bio, her first-person letter, and the footer
disclaimer are **verbatim** — do not rewrite them.
