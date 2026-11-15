# ClinTrust website

Marketing site for ClinTrust: payment orchestration for clinical trial sites,
sponsors and CROs.

Next.js 16 (App Router), React 19, Tailwind CSS v4, BoardUI components.

## Run it

```bash
npm install
npm run dev          # http://localhost:3000
```

```bash
npm run build && npm run start     # production build
npx tsc --noEmit && npm run lint   # checks
sh scripts/measure-page-weight.sh  # page weight (needs the build running on :3210)
```

## Where things are

| | |
| --- | --- |
| Pages | `app/` (`/`, `/approach`, `/about`, `/insights`, `/contact`) |
| Page sections and illustrations | `components/marketing/` |
| BoardUI components (source-owned) | `components/base/`, `components/foundations/` |
| All copy | `content/landing.ts`, `content/pages.ts` |
| Brand colours, type, animation | `styles/brand.css` |
| Logo source | `assets/brand/logo-source.png` |

## Read before changing anything

`docs/sop/` records how the site was designed and built, sprint by sprint:
references, the design system, the build process, performance budgets, and
what is still open. Start at `docs/sop/README.md`.

Known gap: the contact form validates and logs on the server but does not
deliver the message anywhere yet (`app/api/demo-request/route.ts`).
