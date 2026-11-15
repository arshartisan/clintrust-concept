# 04. Sprint log

Newest sprint first. One entry per sprint: what shipped, why, how it was
checked, what is open.

---

## Sprint 5: hero, capital, APAC, call to action, buttons, navbar (2026-11-15)

Another round of section-by-section changes against supplied references.

### Shipped

| Change | Detail |
| --- | --- |
| Hero | Text block at the top left; a much larger isometric scene fills the rest and tucks under the text. New scene built from the platform's parts |
| The problem | Connector lines now meet their dots; the blue glow rises from the bottom edge of the band instead of ending in a hard line |
| Capital | Slider calculator replaced by three stepped result cards over a sweep, in a light section |
| APAC | Plain list replaced by a dark four-tile bento |
| Call to action | Dark panel replaced by a light panel with corner glows, dot grid and angular hairlines |
| Buttons | Primary is now the glow pill from the Vernius project; secondary is a pill; both slightly larger |
| Navbar | Glass surface, pill-shaped, 1200px wide to match the page column |
| Footer | Wordmark filled with the logo's teal-to-blue gradient |
| About | Leadership photos from the previous site |
| Typeface | Inter |
| Toolkit | `IsoDisc` and `IsoPanel` added to `iso.tsx` |

Removed: `capital-calculator.tsx`, `capital-widget.tsx` and the lazy capital
widget. The homepage now loads no react-aria code at all.

After review, the hero was taken closer to the KOVA reference (Pinterest pin
1048986938340607777): an isometric floor grid, a second floating card above
the platform, one highlighted payout line, and a shield icon in place of the
logo on the centre tile. A floating standards card was added with it and
then reverted to the four-cell strip. Homepage HTML is now 37 KB.

### Decisions and their reasons

1. **The hero overlaps text and scene on purpose**, using a negative margin
   and a scene whose top-left corner is kept empty. It is the only way to get
   the reference's scale without the scene pushing the headline off screen.
   The cost is a coupling between hero copy length and scene composition,
   written up in `02-design-system.md`.
2. **The calculator was dropped, not restyled.** The reference is a set of
   result cards. The slider's one real job, letting a sponsor see their own
   number, is gone; the cards state the $100M case.
3. **The glow button replaced BoardUI's primary** rather than being added as a
   fifth variant, so every existing primary button changed at once. This is an
   edit to BoardUI's own source file and would be lost on a re-install.
4. **The navbar glass is less transparent than first built.** At 42 to 62%
   the links disappeared over the dark sections. It is now 66 to 80%.
5. **Team photos follow the previous site's placement, not its file names.**
   On that site `team-amanvir.jpg` is displayed as Larisa Nagra and
   `team-larisa.jpg` as Amanvir Mundra. Either the files are misnamed or the
   old site shows two people under each other's names. The new site shows each
   photo beside the same name the old site does. **Needs confirming before
   launch**: it is the kind of mistake that is embarrassing in public.

### How it was checked

- `npx tsc --noEmit`, `npm run lint`, `npm run build`: all pass.
- Homepage Lighthouse mobile and desktop: 100 / 100 / 100 / 100. `/about`: 100.
- Chrome, production build: hero, problem, capital, APAC, call to action,
  footer and the About leadership cards viewed at desktop width.
- No horizontal overflow at 360, 768, 1024 or 1280. Hero text and scene do
  not collide at 1024 (measured) or at the desktop width viewed.

Not checked: the hero overlap at 1280 was measured by bounding boxes only,
which reported touches that are probably empty corners of shapes, but it was
not looked at; the new sections at phone width were measured for overflow but
not looked at; and the standing list at the end of `05-performance.md`.

### Open items

- [ ] **Confirm which leadership photo is whose** (see decision 5).
- [ ] Look at the hero at 1280 and on a real laptop.
- [ ] Everything still open from sprints 3 and 4: the contact form delivers
      nowhere; inner-page content sign-off; name and legal line; legal pages.

---

## Sprint 4: step cards, footer, line quality (2026-11-15)

Short sprint of follow-ups after the client reviewed sprint 3.

### Shipped

| Change | Detail |
| --- | --- |
| How it works | The scroll-pinned step list became three animated cards (Record, Reconcile, Pay), each with its own looping scene. Now a server component with no script |
| Footer | Rebuilt to a supplied layout: logo row with standards tags, contact card beside the link columns, large faded wordmark, legal line |
| Illustration line quality | Rounded box corners, rounded wire bends, 1.25px strokes, linear pulses, across the hero scene and all six platform illustrations |
| Hero logo | Smaller on the centre tile |
| Captions | "Illustrative data." removed from product panels (the previous site has none) |
| Performance | Hero scene and platform illustrations made client components, bringing homepage HTML from 50 KB back to 32 KB |
| Repository | Initialised and pushed to `github.com/arshartisan/clintrust-concept` |

### Decisions and their reasons

1. **Pinned scrolling was dropped one sprint after it was added.** It was
   built on request in sprint 3; the client then supplied a three-card
   reference for the same section. The cards are simpler, need no script, and
   behave the same on every device.
2. **A footer scene was built and removed.** An isometric conveyor (records
   in, verified payments out) was built to one reference, then replaced when a
   different footer layout was supplied. It is in the git history
   (`components/marketing/footer-scene.tsx`) if it is wanted elsewhere.
3. **No social icons in the footer.** The reference has them; ClinTrust has no
   social accounts on record. The standards tags take that position.
4. **Generated illustrations became client components**, the opposite of the
   usual default, because their output is far larger than their source. See
   `05-performance.md`, section 7.

### How it was checked

- `npx tsc --noEmit`, `npm run lint`, `npm run build`: all pass.
- Homepage: Lighthouse mobile and desktop 100 / 100 / 100 / 100; page weight
  inside every budget. `/about` and `/approach` spot-checked at 100.
- Chrome, production build: the step cards, the footer and the hero viewed at
  desktop width; no horizontal overflow at 360, 768 or 1024.

Not checked: the step-card and footer layouts were measured at phone width
but not looked at; the other items listed at the end of `05-performance.md`
still stand.

### Open items

Unchanged from sprint 3, except that git is now set up. The contact form
still delivers nowhere, and the inner-page content still needs sign-off.

---

## Sprint 3: homepage redesign, inner pages, new typeface (2026-11-15)

### Goal

The homepage was "not wow enough". Redesign it section by section against
supplied references, and build the inner pages.

### Shipped

Homepage:

| Section | Before | After |
| --- | --- | --- |
| Navbar | Full-width bar with anchor links | Floating pill with two dropdown menus (Our approach, Company) and Insights |
| Hero | Left text, live ledger on the right | Centred headline over an animated isometric scene, logo printed flat on the centre tile in true isometric projection (edges parallel to the tile's) |
| The problem | Light comparison table | Dark flow diagram: four-step timeline, then four frictions through ClinTrust to two results |
| How it works | Auto-advancing step list | Pinned on desktop, the step follows the scroll; stacked on phones and tablets |
| Capital | Unchanged | Unchanged |
| Audiences | One audience at a time behind a switch | Three columns in one tinted panel, each with a headline figure and a button |
| Platform | Flat charts in bento tiles | Six blueprint-style isometric illustrations in glow cards |
| APAC | Unchanged | Unchanged |
| Demo form | Section with the form | Dark rounded call-to-action panel; the form moved to `/contact` |
| Footer | Plain columns, placeholder links | Floating card over a large faded wordmark; every link works |

New pages: `/approach`, `/about`, `/insights`, `/contact`.

Site-wide: Figtree replaces Inter Display (Google Sans was tried first in the
same sprint, then changed to Figtree at the client's request). Header and footer moved into
the root layout.

New building blocks: `iso.tsx` (isometric toolkit), `hero-scene.tsx`,
`iso-visuals.tsx`, `border-glow.tsx` (glow card), `cta-band.tsx`,
`page-hero.tsx`, `content/pages.ts`. BoardUI `textarea` installed.

Removed: `bento-visuals.tsx`, `audience-switch.tsx`, `audience-panel.tsx`,
`demo-request.tsx`. `settlement-ledger.tsx` left the homepage and is now the
site-view visual on `/approach`.

After first review, three follow-ups were made in the same sprint: the logo
on the centre tile was re-projected so its edges are parallel to the tile's
(a vertical squash had left it at 45 degrees); the typeface changed from
Google Sans to Figtree; and all isometric line work was smoothed (rounded
tile corners, rounded wire bends, 1.25px strokes). The project was then put
under git and pushed to `github.com/arshartisan/clintrust-concept`. Last, the
"Illustrative data." captions under the product panels were removed (the
previous site has none); the capital calculator keeps its assumptions line.

### Decisions and their reasons

1. **Illustrations are drawn in code.** One projection helper produces every
   isometric drawing, so they match each other and weigh a few kilobytes. The
   cost is that they are geometric; anything organic would need real artwork.
2. **The glow card was rewritten, not installed.** The React Bits source sets
   React state on every pointer move and paints 13 shadows. The version here
   keeps the look and does neither.
3. **Pinned scrolling is desktop only.** On a phone the pinned block would be
   taller than the screen. Phones get all three steps in order.
4. **Three dark areas on the homepage**, up from one, because two of the
   references were dark and were clearly what was wanted. Each one marks a
   money argument.
5. **The form moved to its own page.** The requested closing section is a
   panel with one button. A side effect: the homepage no longer loads the
   form's code at all.
6. **Navbar dropdowns are hand-built**, an exception to the BoardUI-first
   rule, to keep 75 KB out of every page's first load.
7. **Inner pages use the old site's content.** Structure, facts, names and
   figures were carried over; wording was tightened.
8. **Things left out rather than invented:**
   - No APAC page: the old site's `apac.html` served the homepage's content.
   - No article pages: the old site had a teaser per article and no full text.
     `/insights` shows the three summaries, unlinked.
   - No privacy, terms or security pages: the old links pointed nowhere and
     there is no text. They are not in the footer.
   - No email addresses on `/contact`: they are obfuscated on the old site and
     could not be read.
   - The Chief Commercial Officer is omitted from leadership: the old site
     lists the role with no name.
9. **Roadmap dates were replaced with Now / Next / Later.** The old site
   dates the phases "2026" and "2027+", which will go stale. **Needs confirming.**

### Bugs found and fixed during the sprint

| Bug | Cause | Fix |
| --- | --- | --- |
| Glow invisible; 1px sideways scroll on every page with a card | Class `border-glow` was dropped by `cx()`, which read it as a border colour, so the glow layers positioned against the page | Renamed to `glow-card*` |
| Connector lines in the problem diagram were tiny | An `<svg>` sized by flexbox keeps its aspect ratio | Wrap it in a stretching div and fill that |
| 68px sideways overflow at 1024px | The three-part diagram needs about 940px in a row | Row layout from `xl` (1280px) up; stacked below |
| Footer wordmark failed the contrast audit on all pages | Faint decorative text counted as content | Drawn as generated content |

### How it was checked

- `npx tsc --noEmit`, `npm run lint`, `npm run build`: all pass. Five static
  routes plus the API route.
- Lighthouse mobile on all five pages and desktop on the homepage:
  100 / 100 / 100 / 100 on each. Page weight per page with the script.
  Numbers in `05-performance.md`.
- Chrome, production build: every page viewed; widths 360, 768, 1024, 1280
  and 1536 with no horizontal overflow.
- Pinned section: step changes with scroll. Navbar: dropdown opens, closes on
  Escape. Glow card: sweep and pointer glow visible.

Not checked: see the list at the end of `05-performance.md`.

### Open items for sprint 4

Blocking launch:

- [ ] **Deliver contact and demo requests** (carried over twice). The form
      still only logs on the server.
- [ ] **Content sign-off for the inner pages**, above all the three leadership
      bios, the advisory board descriptions and the figures on `/approach`
      (~85%, ~80%, $10 to 15M). All carried from the old site, none re-verified.
- [ ] **Confirm the name** ("ClinTrust" vs "Clintrust") and the legal entity
      line (carried over).
- [ ] **Legal pages**: privacy, terms, security. Need real text.
- [ ] **Homepage copy sign-off** (carried over), now including the labels in
      the hero scene and the problem diagram.

Should do:

- [ ] Insight articles: full text and a page each.
- [ ] Contact details (email addresses) for `/contact`.
- [ ] Confirm the roadmap wording, and whether to name the CCO.
- [ ] A vector logo, and a reversed version for dark surfaces (carried over).
- [ ] Test on real iOS Safari and Android Chrome, Firefox, and with a keyboard
      only (the navbar dropdowns especially).
- [ ] Re-run Lighthouse on the deployed site.
- [ ] Open Graph image, sitemap, robots.
- [x] Initialise git (done at the end of sprint 3).
- [ ] Set up deployment.

---

## Sprint 2: rename, logo and colours, animated bento, performance (2026-11-15)

### Goal

1. Rename the product from "ClinTrust.ai" to "ClinTrust".
2. Use the supplied logo (teal-to-blue DNA shield) everywhere, and take the
   primary and secondary colours from it.
3. Adopt suitable animated section and card layouts from the Pinterest mood
   board (https://pin.it/cxTa5yq1g, 85 pins).
4. Make every animation work on every device, keep the site responsive, and
   treat loading time as a requirement.

### Shipped

| Area | Detail |
| --- | --- |
| Name | "ClinTrust" in the header, footer, page title, meta description and accessible labels. One constant: `brand.name` in `content/landing.ts` |
| Logo | Source at `assets/brand/logo-source.png`; generated `public/logo.webp` (5 KB), `app/icon.png`, `app/apple-icon.png`. Used in header, footer, favicon, home-screen icon and the hub of both connector diagrams |
| Colours | Primary = logo teal `#02CDAB` (accent ramp). Secondary = logo blue `#003EAF` (new `brand-blue` ramp). Navy ink re-hued to the logo blue. Blue now means "in progress", teal means "verified / paid" |
| Platform section | Rebuilt as a bento grid of six tiles, each with its own looping visual: line items arriving, hub-and-spoke capture, dot-matrix confidence, rising bars, funding meter, hub-and-spoke payout |
| Animation engine | All page animation moved from the `motion` library to CSS. New `useInView` hook and `<InView>` wrapper: every loop and timer runs only while on screen |
| Loading | Slider, audience switch and demo form split into on-demand chunks with same-size placeholders. Toast loads only when the form is used |
| Hero | Headline and lead no longer fade in (they are the LCP); ledger rows slide in from above; ledger works on phones (stage label under the amount) |
| Accessibility | Small text moved off the low-contrast tertiary tone; invalid `dl` markup fixed |
| Tooling | `scripts/measure-page-weight.sh` |
| Docs | New `05-performance.md`; `01`, `02`, `03` and `README` updated |

### Measured (production build, this machine)

| | Sprint 1 | Sprint 2 |
| --- | --- | --- |
| Initial JavaScript, gzip | 260 KB | 148 KB |
| Lighthouse mobile (perf / a11y / best practices / SEO) | not run | 100 / 100 / 100 / 100 |
| Lighthouse desktop | not run | 100 / 100 / 100 / 100 |
| LCP mobile, throttled | not run | 1.2 s |
| Total blocking time, mobile | not run | 20 ms |
| Layout shift | 0.005 | 0 |

Mid-sprint, before the fixes, mobile Lighthouse was 92 performance and 89
accessibility with a 3.3 s LCP. The causes and fixes are in `05-performance.md`.
These are local-server numbers; re-run against the deployed site.

### Decisions and their reasons

1. **"ClinTrust", capital T.** The request was typed "Clintrust"; the existing
   brand capitalises the T, so that was kept. Changing it is one line
   (`brand.name`). **Needs confirming.**
2. **The legal entity name was not renamed.** The footer still reads
   "ClinTrust.ai Pte. Ltd." because that is the registered company, which a
   product rename does not change. It is a separate constant
   (`brand.legalEntity`). **Needs confirming.**
3. **Teal primary, blue secondary.** The logo is a gradient between the two.
   Teal was already the call-to-action colour, so it stays primary and the
   buttons do not change role. Blue was given a job (in progress / unverified)
   rather than being sprinkled around as decoration.
4. **The gradient stays in the logo.** Using it on headings, buttons or
   backgrounds would cheapen the mark. One exception: the 1px active-step rail.
5. **Three patterns taken from the board, three left.** Bento grid, connectors
   and dot matrix were adopted because the platform's six modules and its
   "many sources in, one record out" story fit them. Isometric illustration
   needs real artwork; the dark glowing style conflicts with the light page;
   FAQ and pricing blocks have no content to hold. Details in
   `01-reference-analysis.md`.
6. **Only the platform section became a bento.** The other sections already
   have a structure that carries their argument (table, step list, calculator).
   Turning everything into tiles would make the page one repeated pattern.
7. **CSS instead of an animation library.** It removed about 40 KB, runs on
   the compositor, and behaves the same on every browser that supports the
   properties used. The cost: no exit animations on content swaps (new content
   simply enters).
8. **Form controls load on demand rather than being replaced.** BoardUI's
   controls are built on react-aria, which is heavy. Keeping the components
   and deferring their code keeps the design system intact and still takes
   75 KB off the first load.
9. **No blur on phones.** Blur is the costly part of the entrance recipe on
   low-power GPUs. Phones get the same entrance without it.

### How it was checked

- `npx tsc --noEmit`, `npm run lint`, `npm run build`: all pass.
- Page weight with `scripts/measure-page-weight.sh`; Lighthouse mobile and desktop.
- Chrome, production build: widths 360, 390, 768, 1024, 1536. No horizontal
  overflow at any width.
- Bento grid viewed at 360, 768 and 1536; all six visuals animate.
- Ledger watched across several ticks: rows stay evenly spaced while moving.
- On-demand widgets mount; slider, audience switch and form are present and
  the audience switch changes content. Placeholder and widget heights match.
- `POST /api/demo-request` returns 200 for a valid payload.
- Favicon and home-screen icon links are in the HTML and return 200.

Not checked: Safari and Firefox; a real phone or tablet (all device checks
were emulated viewports in desktop Chrome); reduced motion toggled in the OS;
the form submitted through the UI and its toast; Lighthouse against a deployed
host.

### Open items for sprint 3

Blocking launch:

- [ ] **Deliver demo requests** (carried over). The form still only logs on the server.
- [ ] **Confirm the name** ("ClinTrust" vs "Clintrust") and whether the legal
      entity line should change.
- [ ] **Copy and claims sign-off** (carried over), now including the bento
      visuals' sample data (EDC / CTMS / site logs, the four currencies).
- [ ] **Footer links** (carried over). Inner pages still do not exist.

Should do:

- [ ] A vector (SVG) logo, and a reversed or single-colour version for dark
      surfaces. The supplied PNG has rough edges and cannot sit on navy.
- [ ] Test on real iOS Safari and Android Chrome, and in Firefox.
- [ ] Re-run Lighthouse on the deployed site.
- [ ] Open Graph image using the new logo; sitemap, robots.
- [ ] Inner pages: About, Our approach, Insights, APAC.
- [ ] Decide whether the header should invert over the dark band.
- [ ] Initialise git and set up deployment.

---

## Sprint 1: landing page revamp (2026-11-15)

### Goal

Replace the look of clintrust.ai with a landing page at the level of the
reference sites (Stripe, Polar, Attio, identyca, Vernius), on Next.js with
BoardUI, in Inter Display, with purposeful motion and no template layout.

### Shipped

| Area | Detail |
| --- | --- |
| Project | New Next.js 16.4.6 app (App Router, Turbopack, React 19, Tailwind v4) in `F:\Projects\clintrust` |
| BoardUI | Initialised through the BoardUI MCP; agent skill installed to `.claude/skills/boardui`; always-on rules in `AGENTS.md`; 10 free components installed |
| Brand layer | `styles/brand.css`: teal accent ramp, navy ramp, light and dark semantic overrides, marketing type ramp, keyframes |
| Font | Inter variable with the optical-size axis pinned to the Display cut, site-wide |
| Page | Header, hero with live settlement ledger, compliance strip, problem table, how it works, capital calculator (dark band), audiences, platform modules, APAC, demo form, footer |
| Endpoint | `POST /api/demo-request`: validates and logs. **Does not deliver anywhere yet.** |
| Docs | This `docs/sop` folder |

### Section by section: before and after

| Before (old site) | After | Why |
| --- | --- | --- |
| Dark navy page throughout | Light page, navy ink, one navy band | Matches the Stripe/Attio end of the references and makes the single dark band mean something |
| Centred hero, one phrase tinted teal, pill label | Left-aligned hero, one-colour headline, live ledger beside it | The tinted phrase and pill label are template tells; the ledger shows the product instead of describing it |
| "Speed / Trust / Compliance" three-up | Removed; compliance standards moved to a strip under the hero | The three words restated the headline. The standards are the concrete proof |
| Sponsor to CRO to Site flow diagram with arrows | A table: three parties across, "Today" and "With ClinTrust" down | Same parties, different outcome per cell, readable in one pass |
| Three numbered step cards | Numbered step list that drives a product panel, auto-advancing | It is a real sequence, so numbers stay; each step now shows what it produces |
| Static $20M vs $5M comparison | Interactive calculator with a portfolio slider | Lets a sponsor see their own number; motion only in response to input |
| Three stakeholder blocks stacked | One block with a Sponsors / CROs / Sites switch | A visitor is one of the three; they should not scroll past the other two |
| Six module cards with emoji | Six cells in a shared-border grid, line icons | Removes the identical-card pattern and the emoji |
| Stealth banner across the top | Status pill in the hero | Same information, less chrome |

### Decisions and their reasons

1. **Light theme with one dark band**, not a dark site. Three of five references
   are light; the existing brand navy becomes the text colour and the band.
2. **Teal stays as the accent**, deepened at the 500/600 steps so white button
   labels pass contrast. The exact brand teal is used for data marks.
3. **Inter Display for all text**, as requested, by pinning the optical-size
   axis. One line in `brand.css` reverts to automatic optical sizing.
4. **The settlement ledger is the signature.** Chosen because the product's
   promise is a payment moving through states; nothing else on the page
   self-animates so it keeps the attention.
5. **Marketing type ramp added** next to BoardUI's. BoardUI's display styles
   have no tracking and loose leading, right for dashboards and too slack here.
6. **Copy was rewritten** for plain, specific wording. Facts and figures were
   carried from the old site unchanged. Needs sign-off (see below).
7. **Free BoardUI components only.** No Pro licence was active on this machine.

### How it was checked

- `npx tsc --noEmit`, `npm run lint`, `npm run build`: all pass.
- Production build reviewed in Chrome at 1536px wide and at 390px wide, top to bottom.
- Exercised: step list (all three panels), capital slider by keyboard,
  audience switch, mobile menu button present.
- `POST /api/demo-request`: valid payload returns 200, incomplete payload returns 422.
- Browser console: no errors.

Not checked: 768 and 1024 widths; `prefers-reduced-motion` in a browser (the
guards are in the code but were not exercised); Safari and Firefox; the form
submitted through the UI; Lighthouse and a screen-reader pass.

### Open items for sprint 2

Blocking launch:

- [ ] **Deliver demo requests.** Connect `app/api/demo-request/route.ts` to a CRM
      or email. Until then a visitor sees "Demo requested" and nobody is told.
      Add rate limiting and spam protection at the same time.
- [x] **Real logo.** Done in sprint 2.
- [ ] **Copy and claims sign-off.** All of `content/landing.ts`, especially: the
      six module descriptions and the three APAC points (written in sprint 1 from
      the module names), the capital model's assumptions, and the SOC 2 mention
      in the footer (carried from the old site).
- [ ] **Footer links.** About, Our approach, Insights and Legal pages do not exist
      yet; every footer link currently returns to the top of the page.

Should do:

- [ ] Inner pages: About, Our approach (sponsors, CROs, sites), Insights, APAC.
- [ ] Open Graph image, sitemap, robots, structured data.
- [ ] Review at 768 and 1024, in Safari and Firefox, and with reduced motion on.
- [ ] Accessibility pass with a screen reader; Lighthouse.
- [ ] Decide whether the header should invert while it sits over the dark band.
- [ ] Analytics, and a consent approach to match.
- [ ] Initialise git and set up deployment.
