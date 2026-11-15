# 02. Design system

BoardUI supplies the components, the semantic tokens and the motion language.
ClinTrust adds a thin brand layer on top. This file describes that layer.

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
- Shown at 28px in the navbar, 32px in the footer. In the isometric scenes it
  is printed flat on a surface with `<IsoStamp>`. Minimum 24px: below that the
  helix closes up.
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
| `text-hero` | 40 to 64px (fluid) | 1.04 | -0.03em | 500 |
| `text-section` | 30 to 44px (fluid) | 1.12 | -0.024em | 500 |
| `text-subsection` | 24px | 1.25 | -0.02em | 500 |
| `text-lead` | 18px | 1.6 | -0.006em | 400 |
| `text-figure` | 40 to 64px (fluid) | 1.0 | -0.035em | 500 |
| `text-wordmark` | 64 to 240px (fluid) | 0.82 | -0.055em | 600 |

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
| Platform cards | Each illustration loops while its card is on screen | `.iso-pulse`, `.iso-blink`, `.iso-float`, `.iso-step` |
| Glow cards | Border lights toward the cursor; one sweep when first seen | See "Glow card" below |

Rules:

- The hero scene is the one staged, attention-taking moment. Card loops are
  slow, small and inside their cards.
- Entrances are fade + slight scale + small blur. Nothing slides in from a distance.
- Buttons never scale on hover. Press feedback is BoardUI's.
- **Gate every loop on visibility.** Wrap the animated area in `<InView>` (or a
  `<BorderGlow>`, which does the same) and declare the animation under
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
| `IsoStamp` | The logo printed flat on a horizontal surface in true isometric projection: its width runs 30 degrees up-right, its height 30 degrees down-right, so its edges are parallel to the tile's. Do not fake this with a vertical squash, which leaves the logo at 45 degrees to the tile |
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

### Glow card

`components/marketing/border-glow.tsx` + `.glow-card*` in `brand.css`.
Adapted from React Bits' BorderGlow (https://reactbits.dev/components/border-glow).
Used for: platform cards, the audience panel, leadership cards, insight cards.

What it does: a teal-to-blue ring on the card edge and a soft halo outside it,
both masked to a cone that points at the cursor and brightening as the cursor
nears the edge. On first appearing, the glow sweeps once around the border;
on touch screens that sweep is the whole effect.

How it differs from the original, and why:

| Original | Here | Reason |
| --- | --- | --- |
| Pointer position held in React state | Two CSS variables written straight to the element, once per frame | No re-render of the card or its children on pointer move |
| Literal colours passed as props | Brand tokens in CSS | Token rule; one place to re-colour |
| 13 box-shadow layers | 3 | Same look on a light page, far cheaper to paint |
| Intro sweep driven by JavaScript timers | One CSS animation of registered custom properties | No script; honours reduced motion |
| Always tracks the pointer | Only for a real mouse (`hover: hover` and `pointer: fine`) | Touch has no hover |

Rules: the card needs a border radius and a background. Do not put
`overflow-hidden` on the `BorderGlow` itself (it would clip the halo): put it
on a child, as the platform cards do. Stagger a grid with `sweepDelay`.

**Naming trap, cost an hour:** the classes are `glow-card*`, not
`border-glow*`. `cx()` (tailwind-merge) treats any `border-<word>` class as a
border colour and silently drops it when the element also sets a real border
colour. Never name a custom class `border-*`, `text-*`, `bg-*` or any other
Tailwind utility prefix.

### Hero

`components/marketing/hero.tsx` + `hero-scene.tsx`. A compact text block at
the top left; below and behind it, a large isometric scene.

- On `lg` and up the scene is pulled up under the text with `-mt-[325px]`.
  This only works because the scene's composition runs from bottom left to
  top right and **keeps its top-left corner empty**. If you move anything in
  the scene toward the top left, or lengthen the hero copy, check 1024, 1280
  and 1536 for collisions.
- Below `lg` there is no overlap: the scene follows the text.
- The scene: a rack of site-visit records (bottom left), the EDC and CTMS
  feeds (top right), the ClinTrust stack with a shield icon printed on its
  top tile, two upright cards floating above it ("Visit verified", then the
  payable it produced), and three currency coins. The SGD payout line is drawn
  thick and teal, as the one route being followed (`IsoWire strong`).
- Behind it all, an isometric floor grid: two sets of hairlines at plus and
  minus 30 degrees in CSS, faded toward the edges.
- The centre tile carries `IsoShield`, not the logo. The logo was tried first
  (`IsoStamp`); its fine detail closed up at that size and angle. The platform
  cards' hubs still use the logo.
- Under the hero, the standards sit in a full-width strip of four cells. A
  floating card version was tried and reverted at the client's request.
- Toolkit pieces added for this scene: `IsoDisc` (coins), `IsoPanel` (the
  upright cards, whose text is sheared with the panel so it stays legible; keep
  text inside the panel width, it does not wrap or clip), and `IsoShield`.

### Buttons

The primary button is the **glow pill**, carried over from the Vernius
project's BoardUI button (`variant="glow"` there): a deep accent body, a lit
lower rim and a soft bloom, defined as `.button-glow` in `brand.css`. Because
it reads the accent ramp it is ClinTrust teal with no change to the recipe.

In `components/base/buttons/button.tsx` (BoardUI source, edited):

- `primary` now uses `.button-glow` and is a pill. The stock BoardUI primary
  is noted in a comment there if it is ever wanted back.
- `secondary` is a pill too, so the two sit together.
- Heights are one step taller than BoardUI's (medium 40px, small 36px) and
  horizontal padding is `px-4`.

Re-installing `button` from BoardUI with overwrite would undo these edits.

### Capital cards

`components/marketing/capital.tsx`. Three result cards stepping down from
left to right, each with a sentence, a label, a figure and a small chart
(range marker, half gauge, two bars), over one soft sweep in the brand
colours. Light section. This replaced the slider calculator, and with it the
last react-aria control on the homepage. The assumptions line under the cards
stays: it explains the $15M figure.

### APAC bento

`components/marketing/region.tsx`. Dark section, centred heading, four glow
tiles: a tall tile (regulatory), a figure tile (T+5, payment rails), a small
dial tile (FX), and a wide tile (local-currency payouts). The illustrations
are monochrome shapes in the dark surface tones with teal used only for the
thing each tile is about.

### Call-to-action panel

`components/marketing/cta-band.tsx`. A light rounded panel: dot grid, a teal
glow top right and a blue glow bottom left that drift slowly, a few angular
hairlines, one button. It was a dark panel in sprints 3 and 4.

### Step cards (How it works)

`components/marketing/how-it-works.tsx`. Three glow cards in a row (stacked
on phones): a step label with three ticks showing how far along the chain the
step is, a scene on a soft surface, then the step's name and one line.

| Step | Scene | Colour |
| --- | --- | --- |
| Record | Three round badges riding a rocking arc | Blue: recorded, not yet verified |
| Reconcile | Three budget lines, each taking a turn in focus; the third needs review | Teal for matched, amber for the flagged line |
| Pay | A "payment settled" card feeding a row of currencies, one enlarged with a spreading ring | Teal: paid |

It is a server component with no script. Sprint 3 had this section pinned to
the viewport with the step following the scroll; that was replaced in sprint 4
at the client's request, and the `pinned:` variant was removed with it.

### Footer

`components/marketing/site-footer.tsx`. Logo row with the standards as small
tags, a divider, a "Reach out to us" card beside the link columns, a large
faded wordmark, then the legal line. No social icons: there are no ClinTrust
social accounts on record to link to. Add them to the logo row when there are.

The wordmark is generated content (`::before`), so it is skipped by assistive
technology and by contrast checks. It is filled with the logo's teal-to-blue
gradient at half strength (`.wordmark-brand`). Together with the active-step
rail this is one of the few places the logo gradient is used outside the logo.

### Navbar

`components/marketing/site-header.tsx`. A full pill, sticky 12px from the top,
as wide as the page column (1200px) so it lines up with the rails. Its glass
surface is `.nav-glass` in `brand.css`: 66 to 80% opaque with a 22px blur and
a bright top rim. Do not make it more transparent: below that the links are
unreadable while the bar passes over a dark section. Entries with `items` in
`nav` (`content/landing.ts`) are dropdowns.

The dropdowns are hand-built disclosure buttons, **not** BoardUI's `dropdown`.
This is a deliberate exception to "install, do not rebuild": that component
loads react-aria (about 75 KB), and the header is on every page. Behaviour
kept: click or Enter toggles, hover opens for a mouse, Escape closes and
returns focus, focus leaving or a press elsewhere closes.

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
