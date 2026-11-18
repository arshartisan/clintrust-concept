# 02. Design system

BoardUI supplies the components, the semantic tokens and the motion language.
ClinTrust adds a thin brand layer on top. This file describes that layer.

> **Sprint 9 change (overrides older notes below where they disagree).**
> The accent is now **sunny yellow**, not teal (client brief). The old teal
> ramp lives on as `teal-*`; coral is `coral-*`. Every card and button is a
> **sticker**: `border-2 border-text-primary` plus `shadow-sticker-sm`,
> `shadow-sticker` or `shadow-sticker-lg` (hard, unblurred offset shadows).
> No dark surfaces: the glow card, dark video panel and frosted nav are gone.
> Never put white text on `accent-300` to `accent-500`; use ink
> (`text-text-primary`). Accent-coloured text uses `accent-600` or darker.
> Type: Figtree for body, Bricolage Grotesque for every heading and display
> style (set by a base-layer rule in `styles/brand.css`).

## Where things live

| Concern | File |
| --- | --- |
| BoardUI tokens (do not edit) | `styles/theme.css`, `styles/typography.css` |
| **Brand layer (edit here)** | `styles/brand.css` |
| Stylesheet entry | `styles/globals.css` (imports the three above, in that order) |
| Class merging | `utils/cx.ts` (must list every custom `text-*` style) |
| BoardUI components | `components/base/`, `components/foundations/` |
| Landing sections | `components/marketing/` |
| Copy | `content/landing.ts` |
| Always-on agent rules | `AGENTS.md`, `.claude/skills/boardui/` |

## Colour

Brand literals exist only in `styles/brand.css`. Components use semantic utilities.

| Role | Light | Utility |
| --- | --- | --- |
| Ink (headings, primary text) | navy-900 `#081A3B` | `text-text-primary` |
| Body text | navy-500 `#546381` | `text-text-secondary` |
| Heading continuation (display sizes only) | navy-400 `#8592AC` | `text-text-tertiary` |
| Page ground | white | `bg-background-full` |
| Soft surface | navy-50 `#F6F8FC` | `bg-background-secondary-default` |
| Field and track fill | navy-150 `#E8ECF4` | `bg-background-tertiary-default` |
| Hairlines | navy-200 `#E1E6F0` | `border-separator-border`, `border-border-button-default` |
| Primary (logo teal) | `#02CDAB` at 400 | `accent-50` to `accent-950` |
| Secondary (logo blue) | `#003EAF` at 600 | `brand-blue-50` to `brand-blue-900` |

Since sprint 2 the palette comes from the logo. The mark runs from teal
`#02CDAB` (top left) to royal blue `#003EAF` (bottom right). Teal is the
primary, blue the secondary, and the navy ink is the same hue as the blue
taken down to near-black, so text and the dark band belong to the mark.

Colour has a meaning, and the two brand colours are not interchangeable:

| Colour | Means | Where |
| --- | --- | --- |
| Teal (`accent-*`) | Verified, paid, done by ClinTrust; also every call to action | Primary buttons, focus rings, "Paid" in the ledger, verified output lines, confidence dots, the released-capital figure |
| Blue (`brand-blue-*`) | In progress, raw input, not yet verified | "Recorded" and "Reconciled" bars in the ledger, source lines into the hub, payables still forming |
| Amber (`chart-8-active`) | Needs a person to look | The low-confidence line |

Rules:

- Primary buttons use BoardUI's gradient from `accent-500` to `accent-600`. Those
  two steps are deeper than the logo teal so white labels stay readable.
- `accent-400` (the exact logo teal) and `brand-blue-400` are for data marks.
- Teal text on white uses `accent-600`; on navy use `accent-300`.
- The teal-to-blue gradient belongs to the logo. The only other place it is
  used is the 1px active-step rail in "How it works". Do not put it on
  backgrounds, headings or buttons.
- `text-text-tertiary` is 3.1:1 on white. Use it only for display-size text
  (24px and up). All small text uses `text-text-secondary`.

### Logo

| File | Use |
| --- | --- |
| `assets/brand/logo-source.png` | Source artwork, 1233 x 1276, transparent. Not served. |
| `public/logo.webp` | The mark, 77 x 80, 5 KB. Header, footer, bento hub. |
| `app/icon.png` | Favicon, 96 x 96, transparent. |
| `app/apple-icon.png` | Home-screen icon, 180 x 180, white ground. |

- Use `<Logo />` (mark plus wordmark) or `<LogoMark />` from
  `components/marketing/logo.tsx`. Do not reference the image file directly.
- The name is **ClinTrust**, set in `brand.name` in `content/landing.ts`. The
  registered company name (`brand.legalEntity`) is separate and was not
  changed by the rename.
- Shown at 28px in the navbar, 32px in the footer. It is not printed in the
  isometric scenes: their hubs carry `<IsoShield>` instead (sprint 7), because
  the logo's detail closed up at that size and angle. Minimum 24px: below that
  the helix closes up.
- Light surfaces only. On a dark section, put it on a white tile (the problem
  diagram does). The blue lower half of the mark has too little contrast
  on navy. A single-colour or reversed version is needed before the logo can
  go on the dark band or a dark footer.
- The source file has slightly ragged edges from background removal. They do
  not show at 32px; a vector (SVG) original should replace it when available.

### Dark surfaces

`.dark` remaps every token to the navy palette. Two ways to use it:

- On `<html>` for a fully dark site.
- On a single `<section className="dark bg-background-full">` for one dark band
  on a light page. The capital section does this. Nothing inside writes a dark
  colour by hand, so any BoardUI component dropped in there just works.

Dark is used for emphasis, sparingly. The homepage has two dark sections:
the problem and the APAC bento. (The capital section and the closing panel
were dark in earlier sprints and are now light.) Do not make a section dark
for variety.
The logo on a dark surface always sits on a white tile (see Logo).

## Typography

One family: **Inter**, loaded in `app/layout.tsx` with `next/font/google` as
the CSS variable `--font-brand`; `styles/brand.css` points Tailwind's
`--font-sans` at it, so BoardUI components and every utility use it. The
optical-size axis is loaded, so the browser uses Inter's display drawing at
large sizes and its text drawing at small ones without any setting.

The typeface changed four times in five sprints (Inter Display, Google Sans,
Figtree, Inter), each time by changing that one import. Nothing else in the
codebase names a font.

Two ramps:

| Ramp | Utilities | Use |
| --- | --- | --- |
| Marketing (brand.css) | `text-hero`, `text-section`, `text-subsection`, `text-lead`, `text-figure` | Page-level headings, lead paragraphs, one big figure |
| BoardUI (typography.css) | `text-title-*`, `text-headline-*`, `text-body-*`, `text-body-2-*`, `text-caption-*` | Everything inside panels, forms, lists, footers |

| Style | Size | Leading | Tracking | Weight |
| --- | --- | --- | --- | --- |
| `text-hero` | 36 to 52px (fluid) | 1.04 | -0.03em | 500 |
| `text-section` | 30 to 44px (fluid) | 1.12 | -0.024em | 500 |
| `text-subsection` | 24px | 1.25 | -0.02em | 500 |
| `text-lead` | 18px | 1.6 | -0.006em | 400 |
| `text-figure` | 40 to 64px (fluid) | 1.0 | -0.035em | 500 |
| `text-stat` | 48 to 84px (24% of its column) | 0.95 | -0.04em | 400 |
| `text-wordmark` | 80 to 296px (fluid) | 0.82 | -0.055em | 600 |

Rules:

- Never stack `text-sm font-medium leading-5`. Use a composite utility.
- Adding a style: define it in `brand.css` **and** add its name to
  `MARKETING_TEXT_STYLES` in `utils/cx.ts`. If you skip the second step,
  `cx()` treats it as a colour and silently drops it.
- Headings are sentence case, with a full stop when they are a sentence.
- Measure: body copy is capped with `max-w-[..ch]` (44 to 52ch). Headings use
  `text-balance` and a `ch` cap so they break well.
- Numbers that change or line up use `tabular-nums`.
- Two-tone headings: use `<SectionHeading title continuation />`. The continuation
  is a full second sentence in the tertiary tone. Never tint one word.

## Layout

The page frame is in `components/marketing/frame.tsx`.

- One column, max 1200px, with hairline **rails** on its left and right edges
  from the `lg` breakpoint up. Header, every section and the footer share it,
  so the rails run the full height of the page.
- Sections are separated by a top hairline. Vertical padding is `py-20`, `lg:py-28`.
- Inside a section, a 12-column grid. Text usually takes 5 columns, the
  visual 7. Content is left-aligned everywhere.
- **Grids share borders.** For a set of equal items, use the hairline-grid
  recipe instead of separate cards:
  `grid gap-px bg-separator-border` on the parent, `bg-background-full` on each cell.
- Radius: `rounded-3xl` for panels and framed groups, `rounded-2xl` for a panel
  nested inside one, `rounded-full` for pills. Buttons and inputs keep BoardUI's radii.
- Shadow marks one thing only: a floating product panel (`shadow-xl` on the
  ledger, `shadow-lg` on nested panels and the form). Section-level blocks have none.

Widths reviewed in a browser: 360, 768, 1024, 1280 and 1536 (sprint 3). No
horizontal overflow at any of them. Minimum supported width is 320px.

## Motion

Timings and easings come from BoardUI's motion reference
(`.claude/skills/boardui/references/motion.md`). Read it before adding anything.
All page animation is CSS, defined in `styles/brand.css`; there is no animation
library in the initial bundle (see `05-performance.md` for why).

| Where | What | Recipe |
| --- | --- | --- |
| Navbar | Dropdown opens out of its button | `.menu-in`: fade + scale 0.95 + blur, 150ms |
| Hero, on load | Headline and lead settle; pill, buttons and scene fade in. The scene is large and tucks under the text (see Hero) | `.hero-settle`: 10px rise, no fade (it is the LCP). `.hero-in`: fade + rise + scale + blur, 700ms, staggered via `--d` |
| Hero scene | Pulses travel the wires in and out; verified tiles light up | `.iso-pulse` (2.8s per pulse, staggered), `.iso-blink` (4.5s) |
| Section headings | Condense into focus once, on entering the viewport | `<Reveal>` + `.reveal`: fade + scale 0.985 + blur, 400ms |
| The problem | A light travels the timeline; dots pulse in order; dashes flow along the connectors | `.chain-pulse`, `.iso-blink`, `.flow-dash` |
| How it works | Three cards, each with a small looping scene | `.how-sway` (arc rocking, 5s), `.how-row` + `.how-row-tint` (each row in focus for 2s of a 6s cycle), `.how-ring` (ring spreading, 2.2s) |
| Capital | The sweep, the gauge and the bars draw themselves once on entering the viewport | `.draw-in` (stroke, 1400ms), `.grow-in` (bar, 900ms) |
| APAC bento | Bars slide, dial needle rocks, dashes flow, dots pulse | `.how-row`, `.how-sway`, `.flow-dash`, `.iso-blink` |
| Call-to-action panel | Corner glows drift | `.cta-drift`, 8s alternate |
| Platform cards | Each illustration loops while its card is on screen: parts float, light pools breathe, beams pulse | `.iso-pulse`, `.iso-blink`, `.iso-float`, `.iso-step`, `.iso-halo`, `.iso-beam` |

Rules:

- The hero scene is the one staged, attention-taking moment. Card loops are
  slow, small and inside their cards.
- Entrances are fade + slight scale + small blur. Nothing slides in from a distance.
- Buttons never scale on hover. Press feedback is BoardUI's.
- **Gate every loop on visibility.** Wrap the animated area in `<InView>` and declare the animation under
  `[data-inview="true"]`. Timers use `useInView`.
- **Compositor properties only**: `opacity`, `transform`, `translate`, `scale`,
  `stroke-dashoffset`. Never animate `width`, `height` or position offsets.
- **The resting state is the finished picture.** With no animation running
  (reduced motion, no JavaScript, off screen) every visual must still read.
- **No blur on phones.** Use `var(--enter-blur)` / `var(--enter-blur-sm)`
  instead of a literal blur radius; they are 0 on touch and narrow screens.
- **Nothing that could be the LCP fades in.** See `05-performance.md`.
- **No fill-mode on an animation whose property is also transitioned or
  written from script.** A filling animation keeps owning the property after
  it ends. This caused two bugs: ledger rows that jumped, and a glow sweep
  that overrode the pointer.
- Every keyframe is off under `prefers-reduced-motion`, in `brand.css`.

### Isometric illustrations

The hero scene and the six platform illustrations are drawn in code with the
toolkit in `components/marketing/iso.tsx`, not exported from a design tool.
That keeps one projection, one line weight and one palette across all of
them, and each is a few kilobytes of inline SVG with no image request.

| Helper | Draws |
| --- | --- |
| `IsoBox` | A box with rounded vertical edges (rounded top face and a skirt that follows the same curve). `radius` defaults to 14% of the shorter side. `at` = centre on the ground, `size` = width, depth, height in grid units, `z` = lift |
| `IsoWire` | A connector along the ground with one travelling pulse. Blue = raw input, accent = verified output |
| `IsoLabel` | A flat pill label above a point. Hidden below `sm` where it would be unreadable |
| `IsoShield` | A shield with a tick printed flat on a horizontal surface in true isometric projection (edges parallel to the tile's; do not fake this with a vertical squash). Accent teal by default, meaning "verified"; the hero passes the logo gradient. Used on every hub in place of the logo (`IsoStamp` was removed in sprint 7) |
| `project`, `isoLine` | Grid point to SVG coordinates; a polyline path |

Tones: `paper` (white top, pale blue sides, blue line: the default), `blue`
(plinths), `accent` (verified or paid), `amber` (needs review), `wire`
(outline only, used dashed for "the advance that is no longer needed").

Line quality (the first version looked jagged, and was fixed on request):

- Strokes are 1.25px with round joins and caps (`STROKE` in `iso.tsx`). A 1px
  hairline aliases badly on 30-degree diagonals.
- Box corners are rounded, never a hard point.
- Wire bends are rounded (0.45 units), so a pulse sweeps round a corner.
- Pulses use linear timing; an eased pulse lurches on a short wire.
- Every isometric `<svg>` sets `shapeRendering="geometricPrecision"`.

How to draw a new one:

1. Lay it out on the grid. x runs down-right, y runs down-left, z is up. To
   read left to right on screen, step along (+x, -y).
2. Draw back to front: wires first, then boxes in order of increasing x + y.
3. Set the `viewBox` tightly around the drawing, and check it at card size.
4. Give it one animation class and a resting state that reads on its own.
5. Labels go in a `<g className="max-sm:hidden">`.

### Cards

Cards are plain bordered surfaces: `rounded-3xl`, `border-border-button-default`
and a surface token. A card with a looping illustration is an `<InView>`, so
the loop runs only while it is on screen.

Sprints 3 to 5 had a "glow card" (`BorderGlow`, adapted from React Bits): a
teal-to-blue ring and halo on the card edge that followed the cursor. It was
removed everywhere in sprint 6 at the client's request, with its CSS. It is
in git history (`components/marketing/border-glow.tsx`) if it is wanted again.

**Naming trap, cost an hour** (found while building it): `cx()`
(tailwind-merge) treats any `border-<word>` class as a border colour and
silently drops it when the element also sets a real border colour. Never name
a custom class `border-*`, `text-*`, `bg-*` or any other Tailwind utility
prefix.

### Hero

`components/marketing/hero.tsx` + `hero-intro.tsx` + `hero-scene.tsx`. A
compact text block at the top left; below and behind it, a large isometric scene.

Sprint 8: the headline is a rotating question (`hero.questions`, then
`hero.answer` in teal), every ~4s, with a pause button and clickable progress dots (each jumps to its line). All
lines sit stacked in one grid cell, so the block is as tall as the longest
line and nothing moves as it rotates. Reduced motion: no auto-rotation. The
"in stealth" pill and the standards strip are gone; the standards appear once,
in the footer.

- On `lg` and up the scene is 70% of the column wide (`lg:w-[70%]`), held
  against the right edge, and pulled up under the text with `-mt-[240px]`.
  This only works because the scene's composition runs from bottom left to
  top right and **keeps its top-left corner empty**. If you move anything in
  the scene toward the top left, lengthen the hero copy, or change the width,
  check 1024, 1280 and 1536 for collisions. Width and pull-up go together: a
  smaller scene raises the rack toward the buttons, so reduce the pull-up
  with it (full width used `-mt-[325px]`).
- Below `lg` there is no overlap: the scene follows the text.
- The lead paragraph here is `text-headline-regular` (16px), one step under
  `text-lead`, which the inner page heroes still use.
- The scene: a rack of site-visit records (bottom left), the EDC and CTMS
  feeds (top right), the ClinTrust stack with a shield icon printed on its
  top tile, two upright cards floating above it ("Visit verified", then the
  payable it produced), and three currency coins. The SGD payout line is drawn
  thick and teal, as the one route being followed (`IsoWire strong`).
- Behind it all, an isometric floor grid: two sets of hairlines at plus and
  minus 30 degrees in CSS, faded toward the edges.
- The centre tile carries `IsoShield`, not the logo. The logo was tried first
  (`IsoStamp`); its fine detail closed up at that size and angle. Since sprint 7
  the platform cards' hubs use a teal `IsoShield` too.
- Toolkit pieces added for this scene: `IsoDisc` (coins), `IsoPanel` (the
  upright cards, whose text is sheared with the panel so it stays legible; keep
  text inside the panel width, it does not wrap or clip), and `IsoShield`.

### Buttons

The primary button is the **glow button** (`.button-glow` in `brand.css`),
ported in sprint 7 from the "arcade glow" button in the imtoken-landing
project: a near-black navy body (`navy-950`) lit from below by a stack of
seven inset shadows. The stack uses the logo's two colours: pale teal at the
bottom rim, through teal, into the logo's blue at the top of the glow. There
is no border and no gradient fill. Shape per size is `primaryFit` in
`button.tsx`. `pillFit` is shared by primary and secondary, so a pair of
buttons side by side always has the same height and padding: 44px with `px-6`
at medium, 40px with `px-5` at small (the navbar).

In `components/base/buttons/button.tsx` (BoardUI source, edited):

- `primary` now uses `.button-glow` and is a pill. The stock BoardUI primary
  is noted in a comment there if it is ever wanted back.
- `secondary` is a pill too, so the two sit together.
- Heights are one step taller than BoardUI's (medium 40px, small 36px) and
  horizontal padding is `px-4`, except the primary pill (see above).

Re-installing `button` from BoardUI with overwrite would undo these edits.

**Star border CTA** (`components/base/buttons/star-border-button.tsx`, after
the fd-libra star-border-button): `StarBorderButton` / `StarBorderLink` wrap
the normal pill in a 2px ring with two points of light sweeping round it in
opposite directions (`.star-border` in `brand.css`, `translate` and `opacity`
only). Props on top of Button's: `starColor` (default `accent-400`), `speed`
(default `6s`), `thickness` (px), `wrapperClassName` (margins go here, not on
`className`). Reduced motion: plain ring, no stars. Used on the main action
only: the hero's "Yes, that's me" and the header's "Request a demo".

### Landing sections added in sprint 8

- **Which one is you?** (`pain-picker.tsx`, `pain-accordion.tsx`): heading
  and demo button on the left, BoardUI `Accordion` (contained, plus
  indicator, one open at a time) on the right. Loaded lazily; the placeholder
  copies the contained variant's collapsed classes, so keep the two in step
  if the accordion is reinstalled.
- **Waiting time** (`waiting-counter.tsx`): two cards on one 0 to 140 day
  scale. Counts roll up once on first view; the ClinTrust bar ends in a
  "sent" tick. Server HTML shows the finished numbers.
- **Audience tabs** (`audiences.tsx`): Sponsors / CROs / Sites. Questions
  on the left as numbered cards (01, 02 in `text-figure`, question in
  `text-subsection`) that stretch to the height of the benefit card; on the
  right the same pale teal card as Proof: a "For <role>" eyebrow, the figure
  in `text-stat`, its label, the benefit as a lead and an `ArrowLink`.
  `ArrowLink` (`arrow-link.tsx`) is the shared dark-tile arrow link used by
  both sections.
- **Proof** (`proof.tsx`, after the Unlearn platform stat block): a dark
  glow card (8 columns, `.dark` plus `.glow-card`: a navy-950 to navy-900
  tile lit from the bottom edge by four stacked inner shadows in the teal
  ramp, built to a Figma "glowing tile" recipe whose values are in the
  comment in `brand.css` (its blues were swapped for teal: blue is not a
  glow colour here); the white-hot one is on `::after` with `plus-lighter`. Extra
  bottom padding keeps text out of the glow band) with an accent eyebrow tag, two big figures
  ($15M released, 70 to 80% less held in escrow, both from one model) each
  under its label beside a vertical hairline, and the footnote; next to it a
  pale teal card (`accent-100`) with the headline, one line and an arrow link
  to the demo form. Figures use `text-stat`, sized by their own column
  (`cqi` units, `@container` on the column) so the widest value always fits.
  Fill `proof.quote` to add a quote with a face underneath.
- **Closing panel** (`cta-band.tsx`, `id="demo"`): the demo form sits inside
  the call-to-action panel. Every landing "Request a demo" scrolls here.

Removed in sprint 8 (not in the brief's page flow): problem flow, capital
cards, platform cards (module jargon), APAC bento. Their notes below are kept
as history; the code is in git before sprint 8.

### Tracking

`utils/track.ts` pushes events to `window.dataLayer`. Add
`data-track="event"` (plus `data-track-location`, `data-track-label`) to any
link or button; `instrumentation-client.ts` picks up the click. Tracked now:
`request_demo_click` (every demo button), `pain_card_click`,
`hero_yes_thats_me`, `hero_rotation_toggle`, `hero_question_pick`, `audience_tab`,
`demo_form_submit`. No analytics provider is connected yet.

### Platform cards (removed in sprint 8)

`components/marketing/platform.tsx` and `iso-visuals.tsx` (sprint 7, after a
"glass devices" reference, set in the light theme at the client's request).
Six equal cards, three columns on desktop, two on tablets, one on phones.
Each card is a flat light tile (`.platform-card`: the secondary surface, no
drop shadow, no light wash): the illustration on top, the name and text underneath on
the same surface, no divider.

The illustrations use the card tones in `iso.tsx`: `glass` (frosted white top,
pale blue sides, blue edge), `glow` (teal: verified, paid) and `glowBlue`
(blue: incoming).
No glow: the pools of light and the beam were tried and removed at the
client's request. The only gradient left is the shield's ink fill (ids from
`useId`, so every drawing has its own).

### Our approach page

`app/approach/page.tsx`, laid out after the previous clintrust.ai/solutions
page, with our own copy (`approach` in `content/pages.ts`):

- Hero: an accent eyebrow ("Our approach by stakeholder", `PageHero`'s
  `eyebrow`), title, lead and For sponsors / CROs / sites jump links.
- Platform overview video, full width of the column in its own section right
  under the hero (no hairline between them). The "Platform overview" label and
  the caption sit above the player as an intro row (label left, caption as a
  lead on the right), not squeezed underneath it. Player:
  `components/marketing/video-player.tsx`, a dark navy panel with a round glow
  play button, click to play, `preload="none"`, then the browser's controls.
  Files in `public/video/`: `clintrust-overview.webm` (VP9, 5.9 MB) first,
  `clintrust-overview.mp4` (H.264, 34.5 MB) as the fallback.
- Stats rows (`stat-meters.tsx`, after an "efficiency metrics" reference):
  each stat is a meter bar above a grey figure card, and the bars fill in,
  staggered, when the row comes on screen. Only real percentages are plotted
  on a 0-100% scale with a marker (70-80% shades the range); figures that are
  not numbers get scale-free indicators: "Real time" a full bar with a moving
  light, "Day 1" a short bar at the start, "Fewer" a bar that shrinks,
  "Native" a full "Built in" bar. Set per stat with `meter` in the copy.
- Each role: label, title and text, the stats row, then an "experience"
  subheading (`experienceTitle`) over the features:
  - Sponsors: icon cards two-up beside the **Sponsor command center**
    (`command-center.tsx`), a product picture with example data from the
    previous site (`approach.commandCenter`). It sticks while the cards scroll.
  - CROs: icon cards three-up.
  - Sites: a numbered 01 to 05 list beside the settlement ledger.
  Feature icons are set per feature in the copy (`icon`).

### Advisor cards

`components/marketing/advisor-cards.tsx` on `/about`, after a "metric cards"
reference: four cards two by two, each with the area, a tag pill, an index
figure (01 to 04: an index, not a metric; no advisor metrics exist), a small
chart that draws in once on screen (teal and blue in a checkerboard: row 1 teal, blue; row 2 blue, teal) (`.adv-*` in `brand.css`),
the description, a round arrow to /contact and position dots.

### Insight articles

`app/insights/[slug]/page.tsx`, statically generated for the three slugs.
Bodies are structured blocks (`intro`, `h2`, `p`) in `content/articles.ts`,
taken from the previous clintrust.ai/insights page with light tidying; they
need the client's sign-off. Layout: back link, category and reading time,
title in `text-hero`, teaser as the lead, tags; then a sticky "In this
article" contents rail (from `lg`) beside a 65ch reading column; then "More
insights" (the other two cards) and the closing call to action. The card
(`article-card.tsx`) is shared by /insights and the article pages; the whole
card is clickable through the title link.

### Values and roadmap (About)

The four values sit in a hairline grid, each with a 40px teal icon tile
(`icon` per value in `content/pages.ts`). The roadmap, after the previous
site: a two-tone heading with an intro line, then three phases on a timeline,
each labelled "Phase n · when" (Now, 2026, 2027 and beyond) and followed by
its markets as chips. Country chips carry a small two-letter code instead of
an emoji flag, because emoji flags do not render on Windows. The current
phase is in teal; later phases are neutral.

### How we build (About)

`components/marketing/principle-cards.tsx`, after an "automation for
everyone" reference: an accent eyebrow with a small square, the heading, a
short intro, then four cards stepping down like a staircase (desktop: intro +
two cards on the first row, two cards shifted one column left on the second).
Each card: a thin teal-and-blue line drawing at the top end (draws in once,
`.adv-draw`), the principle, its short line in teal (`tagline`) and the
fuller text from the previous site (`text`). The intro line is new copy and
needs the client's approval.

### Leadership

Four cards on `/about`, four across on desktop, two by two on tablets. The
Chief Commercial Officer has no name or photo published yet (as on the
previous site), so that card shows the title and a "C" monogram in the logo's
teal-to-blue. Add `photo` and the name in `content/pages.ts` when announced.

### Capital cards (removed in sprint 8)

`components/marketing/capital.tsx`. Three result cards stepping down from
left to right, each with a sentence, a label, a figure and a small chart
(range marker, half gauge, two bars), over one soft sweep in the brand
colours. Light section. This replaced the slider calculator, and with it the
last react-aria control on the homepage. The assumptions line under the cards
stays: it explains the $15M figure.

### APAC bento (removed in sprint 8)

`components/marketing/region.tsx`. Dark section, centred heading, four plain
tiles: a tall tile (regulatory), a figure tile (T+5, payment rails), a small
dial tile (FX), and a wide tile (local-currency payouts). The illustrations
are monochrome shapes in the dark surface tones with teal used only for the
thing each tile is about.

### Call-to-action panel

`components/marketing/cta-band.tsx`. A light rounded panel: dot grid, a teal
glow top right and a blue glow bottom left that drift slowly, a few angular
hairlines. Since sprint 8 it holds the demo form beside the heading instead of
a single button. It was a dark panel in sprints 3 and 4.

### Step cards (How it works)

`components/marketing/how-it-works.tsx`. Three plain bordered cards in a row
(stacked on phones): a step label with three ticks showing how far along the
chain the step is, a scene on a soft surface, then the step's name and one
line, both left-aligned.

| Step | Scene | Colour |
| --- | --- | --- |
| Record | Three round badges riding a rocking arc | Blue: recorded, not yet verified |
| Reconcile | Three budget lines, each taking a turn in focus; the third needs review | Teal for matched, amber for the flagged line |
| Pay | A "payment settled" card feeding a row of currencies, one enlarged with a spreading ring | Teal: paid |

It is a server component; each card's `InView` wrapper is its only script. Sprint 3 had this section pinned to
the viewport with the step following the scroll; that was replaced in sprint 4
at the client's request, and the `pinned:` variant was removed with it.

### Footer

`components/marketing/site-footer.tsx`. Logo row with the standards as small
tags, a divider, a "Reach out to us" card beside the link columns, a large
faded wordmark, then the legal line. No social icons: there are no ClinTrust
social accounts on record to link to. Add them to the logo row when there are.

The wordmark is generated content (`::before`), so it is skipped by assistive
technology and by contrast checks. Its lower part fades out into the page
(mask from 8% to 82%), and the legal line sits on its own row below it, never
over the letters. Both footer hairlines (under the logo row and above the
legal line) run rail to rail: negative margins cancel the container padding. It is filled with the logo's teal-to-blue
gradient at half strength (`.wordmark-brand`). Together with the active-step
rail this is one of the few places the logo gradient is used outside the logo.

### Navbar

`components/marketing/site-header.tsx`. Sticky, flush to the top of the
screen at every size, with no top border. From `md` up it is as wide as the
page column (1200px, so it lines up with the rails) with only its bottom
corners rounded (28px), hanging from the top edge. Below `md` it is a
square-edged full-width strip with a bottom hairline (`.nav-glass.nav-bar`
in `brand.css`). Sprint 7 replaced the floating pill, which sat 12px down. Its glass
surface is `.nav-glass` in `brand.css`: 66 to 80% opaque with a 22px blur and
a bright top rim. Do not make it more transparent: below that the links are
unreadable while the bar passes over a dark section. Entries with `items` in
`nav` (`content/landing.ts`) are dropdowns.

A dropdown is a 640px glass panel centred under its button: a small heading
(`heading` in the nav data) and a two-column list of rows, after the identyca
reference. Each row is a 40px icon tile (`icon`), a title and a one-line
description (`description`), all set per item in `nav`. On hover the row takes
the secondary surface and the tile lifts to the primary surface. The panel is nearly opaque (`.nav-glass.nav-menu`), not blurred: it
sits inside the bar, which is already a backdrop-filter surface, and a nested
backdrop-filter cannot see the page behind its parent. There is no "Log in"
item, because the site has no login.

The dropdowns are hand-built disclosure buttons, **not** BoardUI's `dropdown`.
This is a deliberate exception to "install, do not rebuild": that component
loads react-aria (about 75 KB), and the header is on every page. Behaviour
kept: click or Enter toggles, hover opens for a mouse, Escape closes and
returns focus, focus leaving or a press elsewhere closes.

On phones (below `md`) the menu button opens BoardUI's `Drawer`
(`components/marketing/mobile-nav.tsx`): a 320px panel from the end edge over
a dimmed page, with the logo and a close button, the same links grouped in
one column, and the demo button in the footer. The drawer traps focus, locks
page scroll, and closes on Escape, a backdrop press, or a link. It does use
react-aria, so `site-header.tsx` loads it with `React.lazy`: the chunk is
fetched when the menu button is first touched, hovered or focused, and nothing
is added to the first load. An earlier version expanded a panel inside the
pill itself.

## Writing

- Plain verbs, sentence case, no filler. Say what the thing does.
- A button says what happens: "Request a demo", and the toast answers "Demo requested".
- Product panels and illustrations show sample figures without a caption, as
  the previous site's mockups did. ("Illustrative data." captions were added in
  sprint 1 and removed in sprint 3 at the client's request: they repeated on
  every panel.) The one exception is the capital calculator, which keeps a
  line stating its assumptions, because it outputs dollar figures a visitor
  might quote.
- Figures on the page must trace to a source the team can stand behind. The
  current ones come from the previous site (see the sprint log).

## Adding a section: checklist

1. Add its copy to `content/landing.ts`.
2. Create `components/marketing/<name>.tsx`; wrap it in `<Section id="...">`.
3. Open with `<Reveal><SectionHeading /></Reveal>`.
4. Need a control? `list_components` in the BoardUI MCP, then `install_components`.
5. Tokens and composite type utilities only. Merge classes with `cx()`.
6. Does it need motion at all? If yes, take the recipe from the table above,
   CSS only, gated on `<InView>`.
7. Does it need a react-aria control (input, select, slider, switch)? Then it
   is an on-demand widget: follow the rules in `05-performance.md`.
8. Check 360, 768 and 1280px, keyboard focus, and reduced motion.
9. `npx tsc --noEmit`, `npm run lint`, `npm run build`, then
   `sh scripts/measure-page-weight.sh` and Lighthouse against the budgets.
10. Record it in `04-sprint-log.md`.
