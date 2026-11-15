# 05. Performance and device compatibility

Loading time and smooth animation on every device are requirements, not
polish. This file holds the budgets, how to measure them, and the techniques
that keep the page inside them.

## Budgets

Measured on the production build (`npm run build && npm run start`). A change
that breaks a budget is not done.

| Metric | Budget | Sprint 1 | Sprint 2 | Sprint 3 |
| --- | --- | --- | --- | --- |
| Initial JavaScript, home (gzip, modern browsers) | 160 KB | 260 KB | 148 KB | **153 KB** |
| Initial JavaScript, inner pages | 160 KB | | | **150 to 151 KB** |
| CSS (gzip) | 30 KB | 24 KB | 25 KB | **28 KB** |
| HTML, home (gzip) | 35 KB | 18 KB | 16 KB | **30 KB** |
| HTML, inner pages | 35 KB | | | **5 to 10 KB** |
| Lighthouse mobile: performance | 95+ | not run | 100 | **100, all 5 pages** |
| Lighthouse mobile: accessibility | 100 | not run | 100 | **100, all 5 pages** |
| LCP, mobile (throttled) | under 2.5 s | not run | 1.2 s | **1.1 to 1.2 s** |
| Total blocking time, mobile | under 100 ms | not run | 20 ms | **80 ms home, 20 to 30 ms inner** |
| Cumulative layout shift | under 0.02 | 0.005 | 0 | **0** |
| Horizontal overflow at 360 / 768 / 1024 / 1280 / 1536 | 0 px | 16 px at 390 (fixed) | 0 px | **0 px** |

Sprint 4 (step cards, new footer, smoothed illustrations), homepage: initial
JavaScript 154 KB, CSS 27 KB, HTML 32 KB; Lighthouse mobile and desktop
100 / 100 / 100 / 100; LCP 1.2 s mobile; blocking time 30 ms; layout shift 0;
no horizontal overflow at 360, 768 or 1024. The other pages were spot-checked
(`/about`, `/approach`: 100 across the board).

Two things to watch after sprint 3:

- **Home HTML doubled** (16 to 30 KB), from the inline isometric SVGs and from
  "How it works" rendering both its pinned and its stacked layout. The budget
  was raised from 25 to 35 KB; it has 5 KB left. A seventh illustration, or a
  second pinned section, will need something removed.
- **Home blocking time rose** from 20 to 80 ms (more to hydrate and more SVG
  to lay out). Still inside budget, but it is the number closest to its limit.

Lighthouse desktop, home, sprint 3: 100 / 100 / 100 / 100, LCP 0.3 s.

Read these numbers for what they are: Lighthouse was run against a server on
the same machine, so network latency to a real host is not in them. Re-run
against the deployed URL before launch; expect LCP to rise by the real
time-to-first-byte.

Of the 150 KB, about 117 KB is React and the Next.js runtime, which every page
on this stack pays. Page code is about 33 KB.

## How to measure

```bash
npm run build
npm run start -- --port 3210            # terminal 1

sh scripts/measure-page-weight.sh       # terminal 2: JS / CSS / HTML weight of /
sh scripts/measure-page-weight.sh http://localhost:3210 /about   # any other page
npx lighthouse http://localhost:3210/ --form-factor=mobile \
  --only-categories=performance,accessibility,best-practices,seo \
  --chrome-flags="--headless=new" --view
npx lighthouse http://localhost:3210/ --preset=desktop --view
```

Always measure the production build. `next dev` is several times heavier and
tells you nothing about loading time.

Responsive check without resizing the browser: open the page, then in the
console replace the body with same-origin iframes at the widths you want (360,
390, 768, 1024). Each iframe is a real viewport, so media queries apply.
In each one, `documentElement.scrollWidth - clientWidth` must be 0.

## What keeps it fast

### 1. No animation library on the page

Sprint 1 used `motion` for the ledger, the heading reveal and two content
swaps. Sprint 2 replaced all four with CSS:

| Was (motion) | Now (CSS) |
| --- | --- |
| Ledger row reflow with layout springs | Rows are absolutely positioned and placed with `translate`; a `transition` moves them |
| `AnimatePresence` panel swaps | The new content is keyed in React and carries `.panel-in` |
| `whileInView` heading reveal | `<Reveal>` sets `data-inview`, `.reveal` transitions |
| `useReducedMotion` | `usePrefersReducedMotion()` in `hooks/use-in-view.ts` |

`motion` is still installed because BoardUI's toast uses it, but it is only
downloaded if a visitor submits the demo form.

### 2. Form controls load on demand

The capital slider (home) and the contact form (`/contact`) are the only
things that need react-aria (about 75 KB gzip). Neither is on screen at load.
(Sprint 3 removed the audience switch, and moved the form off the homepage.) Each is split
into its own chunk and mounted by `components/marketing/lazy-widgets.tsx`:

- when it comes within 800px of the viewport, or
- when the browser is idle after load,

whichever is first. Until then a server-rendered placeholder holds its place.

Rules for adding one:

1. The section shell (heading, copy) stays a server component, so the text is
   in the HTML.
2. The widget goes in its own `"use client"` file and is registered in
   `lazy-widgets.tsx` with `React.lazy`.
3. The placeholder must be the same height as the widget at every breakpoint.
   Measure the real widget, then set `min-h-[...]` on both. Check with the
   console: section height before and after mount must match.
4. If the placeholder can show real content, show it.
5. Before reaching for a react-aria control in something that is on every
   page (header, footer), consider whether a plain element will do. The
   navbar dropdowns are disclosure buttons for exactly this reason.

### 3. The largest text is painted in the first frame

The headline and lead paragraph are the page's LCP. They use `.hero-settle`
(a small upward settle) and never start at `opacity: 0`. Fading them in
measured as a 3.3 s LCP on a throttled phone, because the browser does not
count invisible text as painted. Anything that could be the largest element
above the fold must follow this rule; smaller elements may still fade in.

### 4. Animations only run while visible

`<InView>` stamps `data-inview="true"` on a wrapper while it is on screen, and
every looping animation is declared under that attribute. Timers (the ledger,
the step auto-advance) check `useInView` and `document.hidden`. A visitor
reading the hero is not paying for six bento tiles animating below it.

### 5. Animations stay on the compositor

Only these properties are animated: `opacity`, `transform` / `translate` /
`scale`, and `stroke-dashoffset`. Never `width`, `height`, `top`, `left`,
`margin` or anything else that triggers layout. Bars that resize use `scale`
with a transform origin, not `width`.

### 6. Assets

- One font file: Inter variable, latin subset, self-hosted by `next/font`,
  `display: swap`. No request to a font CDN.
- The logo is a single 5 KB WebP, pre-sized, served with a plain `<img>` that
  has `width` and `height` set. `next/image` was removed for it: the file is
  already the right size, and the component added 6 KB of JavaScript.
- Illustrations are inline SVG and CSS. There are no raster images on the page
  other than the logo, and no video.

## Device compatibility rules

| Concern | Rule |
| --- | --- |
| Touch devices | Nothing depends on hover. Hover only adds a border tint. Every animation runs on scroll or on tap. |
| Low-power phones | `filter: blur()` in entrances is switched off under `(hover: none), (max-width: 767px)` via `--enter-blur`. Phones get opacity and transform only. |
| Reduced motion | Every keyframe is disabled under `prefers-reduced-motion: reduce`; timers do not start. The resting state of each visual is the complete picture, so nothing is missing. |
| No JavaScript | Headings are visible (`@media (scripting: none)`), bento visuals show their resting state, the Sponsors audience view is in the HTML. The slider and the form need JavaScript. |
| Safari | `requestIdleCallback` is missing there; `lazy-widgets.tsx` falls back to a timeout. Individual transform properties (`translate`, `scale`) need Safari 14.1+. |
| Small screens | Minimum supported width is 320px. Diagrams are built from flex and percentages with `preserveAspectRatio="none"` connectors, never fixed pixel widths, and shorten their labels below `sm`. |
| Text size | Small text never uses `text-text-tertiary` (3.1:1 on white). That tone is for display-size text only. |
| Tap targets | Buttons are 32px or taller with at least 8px between them. |

### 7. Generated illustrations are client components

`hero-scene.tsx` and `iso-visuals.tsx` start with `"use client"` although they
have no state or effects. A few lines of drawing code expand into a lot of
SVG. As a server component that SVG is sent twice: once as HTML and once in
the page's serialized component tree. As a client component it is sent once
as HTML, and the small generator travels in the script bundle instead.

Measured on the homepage in sprint 4, after the illustrations got rounded
corners (longer paths): 50 KB of HTML as server components, 32 KB as client
components, for 4 KB more JavaScript. The rule: a component whose output is
much larger than its source, and is not needed for search, should be a client
component.

### 8. Decorative text is generated content

The huge wordmark under the footer is drawn with `::before` and
`content: attr(data-wordmark)`, not as text in the document. As real text it
failed the contrast audit on every page (it is meant to be faint), even with
`aria-hidden`. Anything purely decorative that looks like text goes this way.

## Checked in sprint 3, and not

Checked in Chrome on the production build: all five pages; widths 360, 768,
1024, 1280 and 1536 with no horizontal overflow; the pinned section changing
step on scroll; navbar dropdown opening, and closing on Escape; glow card
sweep and pointer glow; contact form present with matching placeholder height;
Lighthouse mobile on all five pages and desktop on the homepage.

Not checked: Safari and Firefox; a real phone or tablet (all device checks
were emulated viewports in desktop Chrome); reduced motion toggled in the OS;
the contact form submitted through the UI; keyboard-only use of the navbar
dropdowns beyond Escape; Lighthouse against a deployed host.

## Checked in sprint 2, and not

Checked in Chrome on the production build: widths 360, 390, 768, 1024 and
1536; no horizontal overflow at any; bento grid at 360, 768 and 1536; lazy
widgets mount and match placeholder height; Lighthouse mobile and desktop.

Not checked: Safari and Firefox, a real phone or tablet (all checks were
emulated viewports on a desktop), reduced motion toggled in the OS, and
Lighthouse against a deployed host.
