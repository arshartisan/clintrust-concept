# 04. Sprint log

Newest sprint first. One entry per sprint: what shipped, why, how it was
checked, what is open.

---

## Sprint 9: narrower content (2026-11-18)

Client feedback on sprint 8: "she wants it more narrow content-wise;
currently the content looks the same". Read as: the site still had the old
site's breadth (inner pages, two dropdown menus) and long, old-site copy.

### What changed

| Area | Change |
| --- | --- |
| Nav | Dropdowns replaced by three anchors into the home page (Which one is you?, Waiting time, How it works). Dropdown support stays in `site-header.tsx` |
| Request a demo | Header, phone menu and footer now go to `/#demo` (the form at the foot of the page), not `/contact` |
| Footer | One "On this page" column instead of four |
| Inner pages | `/approach`, `/about`, `/insights`, `/contact` still build but nothing links to them. Delete or redirect once the client confirms |
| Copy | Every fix, step, waiting-time and demo line cut to one short sentence. Hero lead shortened |
| Audience tabs | Shorter questions; the escrow/reconciliation figures dropped; one benefit line and a "Show me how" link to the form (tracked) |
| Proof | One number (70 to 80% less capital in escrow) instead of two; $15M dropped |

### Theme: sunny accent and sticker shapes

Client feedback on the concepts: the sunny accent should replace the old
teal/navy theme everywhere (the glow buttons, the teal footer card and the
dark Proof card did not suit it), and every card should take the concepts'
sticker look. Also: no dark panels, and no circuit-board lines in the demo
panel.

| Area | Change |
| --- | --- |
| Accent ramp | BoardUI's accent is now sunny yellow (`styles/brand.css` section 1); 600+ deepened to amber so accent text passes contrast. Teal kept as `teal-*` |
| Buttons | Primary (`.button-glow`) is a yellow sticker with ink text; secondary a white sticker. Both press into their shadow on hover. Star border ring and stars switched off |
| Cards | Ink outline + hard offset shadow (`shadow-sticker*` tokens) on every card: pain accordion, waiting rows, audience cards, how-it-works, Proof, demo panel and form, footer card, ledger, article/advisor/principle cards, video panel, nav bar and menu |
| Dark | Proof's dark glow card is now yellow; the video panel is pale yellow; the nav is solid white, not frosted glass |
| Demo panel | Dot grid, corner glows and circuit hairlines removed; plain pale-yellow panel (`.cta-drift` CSS is now unused) |
| Footer | Teal card and badges restyled as stickers; wordmark gradient yellow, coral, teal |

### Type, imagery, motion (brief: colour and type, imagery, motion)

| Area | Change |
| --- | --- |
| Type | Site-wide: Figtree body (`--font-brand`, was Inter) and Bricolage Grotesque headlines (`--font-headline`, `font-display`), loaded in `app/layout.tsx`. A base-layer rule in `styles/brand.css` sets every `h1`-`h3` and display text style in Bricolage; the marketing ramp weights went up to 700-800 ("big chunky headlines") |
| Hero imagery | The isometric platform scene and floor grid are replaced by `hero-stickers.tsx`: three people on photo stickers (site coordinator, finance lead, investigator) with tags, over doodles and a PAID stamp. `hero-scene.tsx` and `iso.tsx` are no longer used on the home page |
| Shared parts | `doodles.tsx`, `photo-sticker.tsx` and `confetti.tsx` moved from `components/concepts/` to `components/marketing/` |
| Motion | Confetti burst from the demo form's button on a successful send; Proof's figure counts up on first view (`count-up.tsx`). Existing: heading reveals on scroll, waiting-time count-up and tick, sticker press on hover. All off under reduced motion |
| Inner pages | Back in reach from a "More" footer column (Our approach, About, Insights, Contact); the main nav stays three anchors |

Hero photos: three free Unsplash stock photos in `public/people/` (credits and source links beside `hero.people` in `content/landing.ts`). Still open: real team or customer photos to replace them.

Demo email sender: clintrust.ai (`website@clintrust.ai` in `.env.example`). `.env.local` keeps the Resend test sender until the domain is verified.

### Centred hero (client reference)

The home hero now follows the client's reference ("mindset health"): the
rotating question centred and large (`HeroIntro centered`), lead and buttons
centred, sticker cards floating round it (`hero-cards.tsx`: site
coordinator and finance lead progress cards, investigator and sponsor pills
with pointers, a tilted "pre-invoice ready" card), soft yellow and coral
glows over a faint grid. Cards are lg-and-up only. Role labels, not invented
customer names. `hero-stickers.tsx` is no longer used on the home page.

### Hero answer and pain flip cards

- The hero follows the brief literally: each question shows for 4 s, then
  flips to the answer for 4 s, then the next question (was: all four
  questions, then the answer once). One dot per question. The hero carries
  only the questions, the answer and the two buttons (no lead line).
- The answer has its own entrance, unlike the questions' cross-fade: a
  left-aligned checklist of its three sentences (`hero.answerParts`), each
  row sliding in with a teal tick that pops, the last row highlighted
  (`.answer-row-in` in styles/brand.css). Shown for 5 s.
- Under reduced motion the rotation does not run, so a static copy of the
  answer shows under the first question (`motion-reduce:` in CSS, so server
  and client match and nothing shifts).
- "Which one is you?" is four tappable flip cards (`pain-cards.tsx`) instead
  of the accordion: the front shows the worry, tapping turns the card over in
  3D to a yellow back with the one-line fix. Under reduced motion the faces
  swap without turning. `pain-accordion.tsx` and its lazy loader removed.

### Full-width funky hero, scroll motion, paid moment

- The hero is full width and full screen (no 1200px column). The
  interface-style cards (progress bars, pre-invoice) are gone, per "fewer
  interface mockups". In their place (`hero-decor.tsx`): the three people on
  large tilted photo stickers with tag stickers, a "No more chasing!"
  starburst, and hand-drawn coin, calendar, tick, clock, sparkle, squiggle
  and an arrow pointing at "Yes, that's me". Stickers straighten and lift on
  hover. Phones and tablets: the people as a row of small stickers under the
  buttons.
- Paid moment: each time the answer finishes building, a PAID stamp drops
  on beside it and confetti fires.
- Scroll-driven (CSS scroll timelines, `@supports`-guarded): hero stickers
  drift at their own speeds (`.hero-drift`), and the pain cards, waiting
  rows and how-it-works steps rise in as they enter view (`.scroll-pop`).
- The "ClinTrust" name in the header, phone menu and footer logo is set in
  the headline font (Bricolage Grotesque, bold).
- All motion off under reduced motion. Lighthouse mobile still 100 / 100,
  CLS 0.
- Body font: Manrope replaces Figtree (client request). Headlines stay
  Bricolage Grotesque. One import in `app/layout.tsx`.

### Lighthouse and accessibility (brief: 90+ and WCAG AA)

Production build, mobile, 2026-11-18: **100 / 100 / 100 / 100** on `/`,
`/approach`, `/about`, `/insights`, `/contact`; desktop `/` 100 / 100.
LCP 1.1 to 1.2 s, CLS 0. (`/concepts` SEO 60 is the intended noindex.)

Fixed on the way: accent-600 deepened to `#8f5c00` (was 4.4:1);
`text-tertiary` moved to a new `navy-450` (`#5e6c8a`, was 3.1:1); hero
question dots widened to 24px targets; stat meters' `<dl>` markup; two
inner-page labels that used accent-500 or opacity for text.

### Hero concepts for review

The brief's first deliverable ("two or three hero concepts first for
review"), built in the brief's new look and kept on their own routes:

| Route | Concept |
| --- | --- |
| `/concepts` | Index: one card per concept |
| `/concepts/big-question` | A. One huge rotating question, yellow highlighter, doodles; the answer gets a PAID stamp and confetti |
| `/concepts/your-cash-flow-called` | B. Worries arrive as chat messages from "your cash flow"; ClinTrust replies in teal; two photo-slot stickers |
| `/concepts/invoice-flip` | C. A yellow invoice card that flips to the answer, stamped PAID; a day counter runs 140 down to 35 |

- New tokens in `styles/brand.css` section 6: `sun-*` and `coral-*` ramps, `font-display` (Bricolage Grotesque) and `font-friendly` (Figtree), loaded in `app/concepts/layout.tsx` only; `text-poster`, `text-poster-sm`, `text-counter` (mirrored in `utils/cx.ts`).
- Copy in `heroConcepts` (`content/landing.ts`); the questions and answer are the same `hero` copy as the live page.
- Shared parts in `components/concepts/` (rotation controls, doodles, PAID stamp, confetti, photo stickers, sticker buttons) and `hooks/use-rotation.ts`.
- Pausable, reduced-motion safe (no rotation, flip or confetti), tracked with `location: concept-a|b|c`. Pages are `noindex` and not linked from the site.
- Photo slots show a silhouette and "Photo to come": no photos of real coordinators, finance leads or investigators are cleared yet.

### How it was checked

`npx tsc --noEmit`, `npm run lint`, `npm run build`: all pass. The concept
routes return 200 from the production server. Not yet viewed in a browser
(the Chrome extension was not connected).

### Open

- Confirm with the client that "narrow" means one page, then delete or redirect the inner pages.
- Confirm the one Proof number, or supply a quote.
- Client picks a hero concept; move its tokens and fonts into the main theme and build the full page in that direction.
- Photos of real people for the concept photo slots.
- Still open from sprint 8: visual redesign (palette, doodles, photos, confetti, hero concepts), Lighthouse on a phone profile, real Resend/CRM settings.

---

## Sprint 8: client brief, new landing flow, Resend (2026-11-18)

Worked from `docs/feedback/ClinTrust Website Redesign.docx`. Scope agreed
with the user: content and page structure inside the current visual system.
The brief's new palette (yellow, coral, teal), doodles, photos of real people,
confetti and the 2 to 3 hero concepts for review are **not** done yet.

### Shipped

| Area | Change |
| --- | --- |
| Page flow | Hero, Which one is you?, Waiting time, Audience tabs, How it works, Proof, Closing panel with the demo form (the brief's order) |
| Hero | Rotating question headline (4 questions, then the answer), pause button, "Yes, that's me" (to `#pain`) and "Request a demo" (to `#demo`). Stealth pill and standards strip removed |
| Which one is you? | Four worries in a BoardUI accordion beside the heading (user request: its smooth expand), each with a one-line fix |
| Waiting time | Old way 90 to 140 days against the ClinTrust way, animated counters and bars |
| Audiences | Tabs with questions and one benefit each (replaces the three columns) |
| How it works | Plain-language Record / Reconcile / Pay; Pay card reads "Final invoice sent, T+5" |
| Proof | One figure ($15M released on $100M) with its basis |
| Removed | Problem flow, capital cards, platform modules, APAC bento, and their CSS |
| Must-fix | Jargon cut ("payment orchestration", "CTMS and EDC ingestion", "Native EDC and CTMS integration"); T+5 now means the final invoice after a 5-day review, never "paid in five days" (landing, nav, ledger on /approach, metadata); standards once (footer); legal name "ClinTrust Pte. Ltd." |
| Demo form | `/api/demo-request` sends through Resend (reply-to the visitor) and optionally to `CRM_WEBHOOK_URL`. Honeypot field, `source` field (landing / contact). Returns 503 if `RESEND_API_KEY` or `CONTACT_TO_EMAIL` is missing |
| Proof | Rebuilt as two cards after the Unlearn stat block: dark glow card (`.glow-card`: navy tile lit from the bottom edge by stacked teal and white inner shadows, from a Figma recipe recoloured to the brand) with two big figures ($15M, 70 to 80%) and the model footnote, pale teal card with the headline and a Request a demo arrow link. New `text-stat` style |
| Audience tabs | Panel enlarged to match Proof: numbered question cards (01, 02) stretched to the benefit card, benefit on the pale teal card with a "For <role>" eyebrow, the figure in `text-stat` and the shared `ArrowLink` |
| Star border CTA | Hero primary and header "Request a demo" now use `StarBorderLink` (ring with sweeping light, after fd-libra). CSS only, off under reduced motion |
| Tracking | `data-track` attributes + `instrumentation-client.ts`, events into `window.dataLayer` |

### Checked

`tsc`, `eslint`, `next build` clean. Landing HTML has every section, no
"stealth" / "orchestration" / "within five days", and one visible standards
row. API returns 503 until `CONTACT_TO_EMAIL` is set. Not yet checked in a
browser this sprint: run `scripts/responsive-audit.mjs` and check the hero at
1024, 1280 and 1536 (the rotating headline is taller than the old title and
sits over the scene).

### Open

- Confirm with the client: legal entity name, SOC 2 in the footer, the
  "35 days, visit to final invoice" figure in `waiting.newWay`, and the
  "~80%" and "70 to 80%" figures.
- A real quote and photo for Proof (`proof.quote`).
- Set `CONTACT_TO_EMAIL`; verify a sending domain in Resend and set
  `CONTACT_FROM_EMAIL` (the test sender only delivers to the account owner).
- Connect an analytics provider (GTM reads `dataLayer` as is) and the CRM.
- Visual redesign from the brief (palette, doodles, photos, confetti, hero concepts).
- Lighthouse 90+ check on a phone profile.

---

## Sprint 7: navbar menus, smooth scroll, phone fixes (2026-11-16)

UI fixes from a screenshot review.

### Shipped

| Area | Change |
| --- | --- |
| Navbar dropdowns | Each row is now an icon tile, a title and a one-line description (identyca reference). Icons and descriptions live in `nav` in `content/landing.ts`. Panel 640px (was 520) |
| Navbar, phones | Below `md` the bar is a square-edged full-width strip with a bottom hairline, not a floating pill. Also fixed a broken `px-` class on the header (now `md:px-4`) |
| Navbar, desktop | No longer a floating pill: flush to the top edge, no top border, bottom corners rounded only |
| Smooth scroll | Lenis (`lenis@1.3`), loaded after idle by `smooth-scroll.tsx`, mounted in `app/layout.tsx`. Reduced motion and touch keep native scrolling; hash links glide and respect `scroll-mt-16`; stops while the drawer locks the page |
| Platform cards | Hub tiles print a teal `IsoShield` instead of the logo. `IsoStamp` deleted |
| Hero status pill | Phones show `hero.statusShort` so the pill stays on one line |
| Footer | Wordmark larger (up to 296px) and fades out into the page; legal line on its own row; both hairlines run rail to rail |
| Call to action, phones | Smaller glows, no circuit hairlines, fainter dot grid, 16px lead, tighter padding |
| Platform cards | Rebuilt after a "glass devices" reference: six equal cards (3 x 2), new glowing isometric scenes for all six modules, new `glass`/`glow`/`glowBlue` tones and `.iso-halo`/`.iso-beam` animations. The old bento layout is gone. First built dark, then switched to the light theme at the client's request |
| Primary button | Ported the imtoken-landing "arcade glow" button: navy-950 body lit from below by stacked inset glows in the logo's teal and blue. A pill, 48px with 26px sides (navbar: 40px). A gradient-border version was tried first and rejected |
| Platform overview video | On `/approach`, full width under the hero (first tried on the homepage, then beside the hero title). WebM (5.9 MB) with the MP4 (34.5 MB) as fallback; ffmpeg was installed with winget for the conversion. Click to play, `preload="none"`. `video-player.tsx` |
| Our approach page | Layout from the old clintrust.ai/solutions page with our copy: hero eyebrow and jump links, "experience" subheadings, icon feature cards, a Sponsor command center mockup (example data from the old site), a numbered list for sites |
| About | Advisory areas rebuilt as four metric-style cards with drawn charts (`advisor-cards.tsx`). Leadership has a fourth card: Chief Commercial Officer, no name or photo yet, monogram avatar |
| Buttons | Primary and secondary share one size (`pillFit`): same height and padding side by side |
| Platform cards | Drop shadow, light wash, light pools and beams removed: flat tiles, no glow |
| Insights | Article pages at `/insights/[slug]` with the full text of the three articles from the old site (`content/articles.ts`), contents rail and "More insights"; cards on /insights link to them |
| Call to action | Corner glows toned down (teal 70% to 28%, blue 55% to 22%) |
| Leadership cards | Padding reduced (`p-7` to `p-5`) |
| About values | Icon tile on each of the four values |
| Contact page | Form panel shadow removed. Contact details from the old site added beside the form: headquarters, general inquiries (info@), business development (partnerships@), security and compliance (security@), each with an icon tile; emails are `mailto:` links kept left to right (`contact.channels`) |
| About | "Get in touch" section removed (the Contact page and the closing call to action cover it); the footer's Contact link now goes to /contact |
| Advisors heading | "Advisory board" eyebrow and the old site's description line added above the cards |
| Approach stats | Stats rows rebuilt as animated meters over figure cards (`stat-meters.tsx`); only real percentages are plotted |
| Browsers and devices | Audit script added (`scripts/responsive-audit.mjs`); tap targets raised to 28px in the footer, contact emails and article back link; "how it works" labels no longer truncate; branded thin scrollbar (teal to blue) |
| How we build | Rebuilt as staggered cards with line drawings, teal taglines and the old site's fuller text (`principle-cards.tsx`); the old two-column list is gone |
| Roadmap | Content from the old site added: intro line, phase labels with timing (Phase 1 · Now, Phase 2 · 2026, Phase 3 · 2027 and beyond) and each phase's markets as chips |

### How it was checked

- `npx tsc --noEmit`, `eslint` on `app`, `components`, `content`, `npm run build`: all pass.
- All five routes return 200 from the dev server, and the new markup is present.
- Headless Chrome screenshots at 1400px: platform cards, the video panel and
  the hero button were looked at and adjusted.

Not checked: the dropdown panel, the phone navbar, the CTA band and the cards
at phone width, and the scroll feel (the Chrome extension was not connected);
bundle sizes and Lighthouse were not measured.

Open: confirm the Chief Commercial Officer's name and photo; confirm the
example figures in the Sponsor command center are fine to show; client
sign-off on the article text and the new "How we build" intro line; a react-aria "no visible label" console warning
seen in dev, source not yet traced.

---

## Sprint 6: client review pass (2026-11-15)

Small changes from a screenshot-by-screenshot review with the client.

### Shipped

| Area | Change |
| --- | --- |
| Hero scene | 70% of the column on desktop (was full width), held to the right; pull-up reduced from 325px to 240px to match |
| Hero scene | CTMS block moved back (`[-0.6, -6.2]`): its left edge was hidden behind the payable card |
| Hero text | `text-hero` is now 36 to 52px (was 40 to 64px). This is the shared token, so the inner page heroes shrank with it. The home lead is 16px (`text-headline-regular`) |
| Phone menu | Rebuilt on BoardUI's `Drawer` (`mobile-nav.tsx`), loaded on demand. Installed `drawer`, `modal`, `spinner` |
| Border glow | Removed from the whole site: platform, step, APAC, leadership and insight cards and the audience panel. `border-glow.tsx` and the `.glow-card*` CSS are deleted. Cards with a looping illustration use `InView` instead |
| Step cards | Name and text left-aligned |
| Footer | More space between the link columns and the wordmark (`mt-16`, `lg:mt-20`) |

### How it was checked

- `npx tsc --noEmit`, `eslint` on `app` and `components`, `npm run build`: all pass.
- Dev server in Chrome at a 1920px viewport: hero, platform cards, footer
  looked at; drawer opened by script, 14 links present, Escape closes it.

Not checked: the drawer at a real phone width (the test window could not be
narrowed); the hero at 1024 and 1280 (sizes were calculated, not looked at);
bundle sizes and Lighthouse; the pages after the glow was removed.

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

Last, the navbar dropdowns were restyled to the identyca reference: a wide
panel with a heading and a two-column list of plain links, six per menu,
replacing the icon-and-description rows.

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
