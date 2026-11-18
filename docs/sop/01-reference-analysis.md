# 01. Reference analysis

Sprint 1 started by looking at the existing site and the five references in a
browser (hero plus two scroll positions each). This file records what each one
does, what we took, and what we left.

## The starting point: clintrust.ai (before)

- Dark navy ground (`#091D38`), teal accent (`#1ABC9C`), Inter.
- Centre-weighted hero with one headline phrase tinted teal, a tinted pill label
  above it, emoji icons, and a three-up "Speed / Trust / Compliance" strip.
- Content was sound; presentation read as a template. The facts, figures and
  section order were kept. The palette was kept as the brand (navy ink, teal
  accent). The layout, type treatment and all decoration were replaced.

## What each reference contributes

| Reference | What it does well | Taken | Not taken |
| --- | --- | --- | --- |
| stripe.com | Light page, navy text, left-aligned hero, headline that continues in a quieter tone, hairline column guides, a full-width logo strip under the hero. | Navy ink on a light ground. Left-aligned hero. Two-tone headings. The strip under the hero (ours carries compliance standards, since there are no customer logos to show). | The multicolour gradient ribbon. It is Stripe's signature, not ours. |
| attio.com | The whole page sits inside two vertical hairline rails; sections are split by hairlines, not cards. Small, quiet buttons. A left-hand list that drives a visual on the right. | The railed page frame (`components/marketing/frame.tsx`). Hairline grids instead of card grids. The step list driving a panel in "How it works". Small buttons. | The centred hero. |
| polar.sh | Monochrome restraint. A real-looking product panel is the hero image. Heading plus grey continuation. | The product panel as the hero's subject (our settlement ledger). | Full dark theme, the `01` numbering on non-sequential content. |
| identyca.io | Dark, connector lines converging on the product mark, headings that blur into focus as they enter, a dotted grid fading at its edges. | The blur-in entrance for headings (it matches BoardUI's own entrance recipe). The dot field behind the ledger. | Dot-matrix display type, mono uppercase eyebrow labels. |
| vernius-concept.vercel.app | One strong object in the hero, large confident type, a dark band with hairline grid, annotation cards around the object. | The idea of one dark band used once for emphasis (our capital section). Large, tight display type. | Uppercase mono section labels (`02 — CAPABILITIES`), per-card arrows. |

## Sprint 2: the Pinterest mood board

Board: "Mood" by Arsh Artisan, 85 pins (https://pin.it/cxTa5yq1g). Reviewed
in full in a browser. It is a board of still images, so the motion in each
pattern below is our reading of what the layout implies, not something copied.

The pins fall into six groups:

| Group | Roughly how many | What it is | Used? |
| --- | --- | --- | --- |
| Bento feature grids | 25+ | Tiles of unequal size, each with a small product illustration above a title and one line of copy | **Yes.** The platform section |
| Hub-and-spoke connectors | 10+ | Sources on one side, a central product node, outputs on the other, joined by curved lines | **Yes.** Two bento tiles (capture, payout) |
| Dot-matrix charts | 5 | Values drawn as rows or columns of dots instead of bars | **Yes.** The reconciliation tile |
| Isometric line illustration | 15+ | Wireframe isometric objects with one accent colour | No. Needs commissioned artwork; hand-built it would look cheap |
| Dark pages with a glowing accent | 20+ | Near-black ground, orange or blue glow behind the hero | No. The site is light with one dark band; a second treatment would fight it |
| FAQ, pricing, testimonial blocks | 5 | Standard sections | No. ClinTrust has no public pricing, FAQ or testimonials to put in them |

How the three adopted patterns were adapted:

- **Bento grid.** Six modules in a 6-column grid: 2+4 / 3+3 / 2+4. The two wide
  tiles carry the connector diagrams. On tablet it becomes two columns with the
  wide tiles spanning both; on phones, one column. Each tile is a visual on a
  soft surface above a title and one line.
- **Connectors.** Chips, a hub holding the logo, and curved lines with dashes
  that flow in the direction of the data. Blue lines are raw input, teal lines
  are verified output.
- **Dot matrix.** Three budget lines, fourteen dots each; the filled dots are
  the match confidence. The low-confidence line is amber.

What was left on the board on purpose: per-tile corner arrows, glow gradients,
uppercase mono labels, and glassmorphism. They are the parts of these pins
that date fastest.

## Sprint 3: references supplied section by section

In sprint 3 the homepage was judged "not wow enough" and a reference image
was supplied for each section in turn. What each asked for, and what was built:

| Section | Reference | What was taken | How it was adapted |
| --- | --- | --- | --- |
| Hero | Two isometric heroes: a central platform with tiles and connected chips (a toolchain site), and a server tower with satellite nodes (Servera) | Centred headline over a wide isometric scene; a platform in the middle; nodes joined by lines with signals moving along them | Inputs (sponsor, CRO, EDC, CTMS) on the left send blue pulses in; verified tiles light up teal; outputs (sites in three currencies, audit trail) on the right receive teal pulses. The logo is printed flat on the centre tile, as in a later reference, not floating above it |
| Platform cards | Ordiva: four blueprint-style isometric line illustrations | White tops, pale blue sides, blue line work, one accent colour | Six illustrations drawn with the same toolkit as the hero. The numbered mono labels were not taken |
| Cards | React Bits "Border Glow" | A border that lights up toward the cursor | Rewritten for this project, then removed in sprint 6: see `02-design-system.md`, "Cards" |
| The problem | A dark "How it works" panel: a four-step timeline, then inputs flowing through a centre node to outputs | The timeline with glowing dots; the three-part flow with curved connectors; the dark ground with a blue glow | Timeline = today's payment chain. Flow = today's four frictions into ClinTrust, out as two results |
| How it works | A request, not an image: pin the section and change the step on scroll | Scroll-pinned steps | Pinned on desktop-size screens only; stacked on phones and tablets |
| Audiences | A three-plan pricing panel: one column on a tinted ground, two in a raised white card | The panel-in-panel structure; icon tile, big figure, bullet list, button per column | Sponsors (the buyer) on the tint with the primary button; CROs and sites in the white card. The figure is each audience's headline number |
| Closing call to action and footer | Nexiron: a dark rounded panel with one button, then a floating footer card over a huge faded wordmark | All three parts | The demo form moved to `/contact`, since the panel has only a button |
| Navbar | A floating pill with dropdown menus (icon, title, description per row) | The pill, the dropdown rows | Light theme. Two dropdowns (Our approach, Company) and one plain link |
| Typeface | Google Sans, then Figtree, now Manrope | Whole site body | Manrope is the current body face (headlines: Bricolage Grotesque) |

Sprint 4 added three more:

| Section | Reference | What was taken | How it was adapted |
| --- | --- | --- | --- |
| How it works | Three feature cards, each with a label, a small animated scene and a centred title and line | The card anatomy; one distinct looping scene per card | Record, Reconcile, Pay. This replaced the scroll-pinned version from sprint 3 |
| Footer, first attempt | An isometric conveyor feeding a machine | A conveyor scene drawn for ClinTrust: plain tiles in, ticked teal tiles out | Built, then removed the same day in favour of the layout below |
| Footer, final | Logo row with social icons, a contact card beside link columns, a giant faded wordmark, a legal line | All of it except the social icons | Standards tags sit where the social icons were |

Sprint 5:

| Section | Reference | What was taken | How it was adapted |
| --- | --- | --- | --- |
| Hero | SwarmOne and KOVA: text block top left, a large isometric scene filling the rest | The layout; a scene made of the product's own parts | Rack of visit records, EDC and CTMS feeds, the ClinTrust stack with a payable card, currency coins |
| APAC | A dark "Why choose us" bento: one tall tile, a big-figure tile, a dial tile, a wide tile, all in monochrome shapes | The tile arrangement and the monochrome illustration style | Regulatory, T+5 on regional rails, FX, local-currency payouts |
| Capital | A light "Result and impact" layout: staggered stat cards over a sweeping curve | Stepped cards, a small chart in each, the sweep | Idle capital, less escrow, capital released. Replaced the slider |
| Call to action | Sincera: a panel with corner glows, a dot grid and angular outlines | All of it, in a light theme as asked | Teal and blue glows on a soft surface |
| Buttons | The glow button from the client's Vernius project | The recipe, unchanged | It reads the accent ramp, so it came out teal |
| Navbar | Two notes: wider and glassier, then pill-shaped and as wide as the sections; then identyca's dropdown (heading plus a two-column list of plain links) | All three | A 1200px glass pill with two-column menus, in the light theme. "Log in" left out: there is no login |

A pattern worth noting for future sprints: the references the client responds
to are **illustrated and spatial** (isometric scenes, flows with moving
signals, panels inside panels). The sprint 1 and 2 direction, flat product
panels and hairline grids, read as too plain. Start there next time.

## The pattern all five share

These are the things that make a site read as "that tier", and they are what
to look for first when analysing a new set of references:

1. **One typeface, used with confidence.** Large display sizes, tight tracking
   (around -0.03em), tight leading (about 1.05), medium weight rather than bold.
2. **Structure drawn with hairlines.** Rails, dividers and shared-border grids.
   Almost no drop shadows; where a shadow exists it marks a floating product panel.
3. **The product is the illustration.** No stock art, no abstract blobs. The hero
   shows the thing itself, or a believable slice of it, and it moves.
4. **Two tones of text do the work of colour.** Primary ink for the claim, a
   quiet grey for the continuation. Accent colour is rare and means something.
5. **Small controls.** 32 to 36px buttons. Nothing shouts.
6. **Motion is short and purposeful.** One staged moment near the top; after
   that, things move when the visitor does something.

## What we chose not to do (the "AI layout" tells)

Checked against the build before shipping:

- No tracked-out uppercase eyebrow label above each heading.
- No single word of a headline tinted in the accent colour.
- No grid of identical rounded cards with the same soft shadow.
- No gradient washes as background decoration.
- No numbered markers on content that is not a sequence. (The three steps in
  "How it works" are a sequence, so they are numbered. The six modules are not.)
- No trailing arrows on buttons and links.
- No emoji icons. Icons are Remix line icons, one weight.
- No monospace face for small labels; figures use Inter with tabular numerals.
- No fade-and-slide-up on every block as it scrolls in.

## How to run this analysis for a new project

1. Open each reference at desktop width. Capture the hero and two scroll positions.
2. For each, write one line under: ground colour, text colours, type size and
   weight of the hero, how sections are separated, what the hero image is,
   what moves and when.
3. Line the answers up. What three or more references share is the brief.
   What only one does is that brand's signature: leave it with them.
4. Decide the one thing that will be this site's own. Here: a live settlement
   ledger, because the product's whole promise is a payment moving through states.
5. Write the "not taken" column. It is as useful later as the "taken" one.
