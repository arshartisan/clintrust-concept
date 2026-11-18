# ClinTrust website: SOP

How this site was designed and built, written so the next sprint (or the next
site of this kind) can start from here instead of from scratch.

| File | Read it when |
| --- | --- |
| [01-reference-analysis.md](01-reference-analysis.md) | You want to know what was taken from each reference site, and what was deliberately left out. |
| [02-design-system.md](02-design-system.md) | You are about to add or restyle anything. Tokens, type, layout frame, motion rules. |
| [03-build-process.md](03-build-process.md) | You are starting a new site in this style, or setting this one up on a new machine. Step-by-step. |
| [04-sprint-log.md](04-sprint-log.md) | You want to know what shipped in each sprint, the decisions behind it, and what is still open. |
| [05-performance.md](05-performance.md) | You are adding anything that loads or moves. Budgets, how to measure, device rules. |

## Ground rules (short version)

0. **Client brief.** `docs/feedback/ClinTrust Website Redesign.docx` is the current brief (sprint 8). Its must-fix list (no jargon, T+5 wording, no stealth banner, standards once, "ClinTrust" with no suffix) applies to every page.
1. **BoardUI first.** Check `components/base/` and the BoardUI MCP (`list_components`)
   before building any control. Install, do not rebuild.
2. **Semantic tokens only.** No hex values and no raw palette classes in components.
   Brand literals live in exactly one file: `styles/brand.css`.
3. **Copy lives in `content/landing.ts`.** Components do not hold marketing copy.
4. **One staged animation in the hero** (the isometric scene). Below it, card
   illustrations may loop quietly while on screen; everything else moves only
   in response to the visitor (scrolling, hovering, clicking).
   Timings come from `.claude/skills/boardui/references/motion.md`.
5. **Stay inside the performance budgets** in `05-performance.md`. Animation is
   CSS only; measure the production build before calling a change done.
6. **Update this folder in the same change** as the design or code it describes.
   Add a dated entry to `04-sprint-log.md` for every sprint.

## Stack

- Next.js 16.4 (App Router, Turbopack, Cache Components enabled), React 19
- Tailwind CSS v4 via `@tailwindcss/turbopack`
- BoardUI (source-owned components under `components/`, free tier)
- CSS for all page animation (no animation library in the initial bundle), `@remixicon/react` for icons
- Inter (variable with optical sizing, self-hosted by `next/font`)

## Site map

| Route | Content | Source of the copy |
| --- | --- | --- |
| `/` | Landing page | `content/landing.ts` |
| `/approach` | Sponsors, CROs, sites | `content/pages.ts` |
| `/about` | Mission, leadership, roadmap, principles | `content/pages.ts` |
| `/insights` | Three article cards, each linking to its article | `content/pages.ts` |
| `/insights/[slug]` | Article pages (static), with an "In this article" contents rail and "More insights" | `content/articles.ts` (bodies), `content/pages.ts` (titles, teasers, slugs) |
| `/contact` | Contact and demo form | `content/pages.ts` |
| `/api/demo-request` | Form endpoint. Validates, emails the team through Resend, and posts to a CRM webhook if `CRM_WEBHOOK_URL` is set. Env vars in `.env.example` | |
