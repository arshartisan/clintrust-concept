# 03. Build process

The order of work used for sprint 1. Follow it to start another site in this
style, or to rebuild this one.

## 0. Before any code

1. **Read the current site.** Pull every heading, claim, figure, form field and
   footer link. This is the content inventory; the redesign must not lose facts.
2. **Sample the brand.** Ground colour, accent, typeface (browser dev tools, or
   `getComputedStyle` over the page). Here: navy `#091D38`, teal `#1ABC9C`, Inter.
3. **Analyse the references** as described in `01-reference-analysis.md`.
4. **Write the design plan** before building: 4 to 6 named colours, the type
   roles, a layout concept, and the one signature element. Then check it against
   the list of template tells and revise.

## 1. Scaffold

```bash
npx create-next-app@latest clintrust --ts --tailwind --eslint --app \
  --no-src-dir --import-alias "@/*" --use-npm --turbopack --yes
```

`--no-src-dir` matters: BoardUI imports assume `"@/*": ["./*"]`.

## 2. BoardUI: MCP, skill, rules

Docs: https://www.boardui.com/installation, https://www.boardui.com/mcp,
https://www.boardui.com/skill

With the BoardUI MCP server connected (`npx -y boardui@latest mcp`):

| Step | MCP tool | CLI equivalent |
| --- | --- | --- |
| Overview and licence check | `get_started`, `license_status` | |
| Initialise (Tailwind v4 deps, `styles/`, `utils/`, agent rules in `AGENTS.md`) | `init_boardui` | `npx boardui@latest init -y` |
| Install the agent skill into `.claude/skills/boardui` | `install_skill` | `npx boardui@latest skill` |
| See what exists | `list_components` | `npx boardui list` |
| Read an API before using it | `get_usage_examples`, `get_component` | |
| Install components | `install_components` | `npx boardui@latest add <names> --yes` |

Then wire it up:

1. `app/layout.tsx` imports `@/styles/globals.css` (delete `app/globals.css`).
2. Load the site font with `next/font/google` and put its variable class on
   `<html>`. This site uses `Figtree` as `--font-brand`; `brand.css` maps
   `--font-sans` to it. (BoardUI's own default is Inter as `--font-inter`.)
3. Read `.claude/skills/boardui/references/motion.md` before writing any animation.

Components installed (sprint 1; sprint 3 added `textarea`): `button`, `link-button`, `input`, `select`,
`slider`, `segmented-control`, `chip`, `toast`, `status-dot`, `use-count-up`
(plus the foundations they pull in).

Licence: no BoardUI Pro licence was active, so only free components are used.
With a licence, `template-marketing` is worth evaluating for inner pages.

## 3. Brand layer

1. Create `styles/brand.css`; import it last in `styles/globals.css`.
2. Override the accent ramp with **literal** values (BoardUI's accent engine
   cannot read `var()` references).
3. Add the brand neutrals and remap the semantic tokens for `:root` and `.dark`.
   Put `.dark` after `:root` so it wins when both match `<html>`.
4. Register the marketing type ramp in `@theme`, and list the new names in
   `utils/cx.ts`.
5. Add keyframes, each with a `prefers-reduced-motion` guard.

## 4. Build order

1. `content/landing.ts`: all copy first. Writing it surfaces gaps early.
2. `components/marketing/frame.tsx`: container, `Section`, `SectionHeading`.
3. Header and hero, including the signature element. Get this right before
   anything else; the rest of the page takes its tone from it.
4. Remaining sections top to bottom.
5. Footer, then the form endpoint.

Server components by default. Client components (`"use client"`) are only the
parts that hold state: header, ledger, how-it-works, `in-view`, and the three
on-demand widgets (capital widget, audience switch, demo form) with their
loader `lazy-widgets.tsx`. Section shells, headings and all bento visuals are
server components.

## 5. Verify

```bash
npx tsc --noEmit
npm run lint
npm run build
npm run start -- --port 3210
sh scripts/measure-page-weight.sh      # must stay inside the budgets
npx lighthouse http://localhost:3210/ --form-factor=mobile --view
```

Budgets and the full measuring procedure are in `05-performance.md`.

Then, in a browser:

- Walk the page top to bottom at 360, 768 and 1280px (iframe method in `05-performance.md`).
- Tab through it: every control shows a focus ring, in a sensible order.
- Use each interactive piece: step list, slider, audience switch, form.
- Turn on "reduce motion" in the OS and reload: nothing should animate, and
  nothing should be missing.
- Check the browser console for errors.

Note for this machine: the browser used for review could not reach
`localhost`, so pages were checked on the LAN address shown by `next start`
(for example `http://192.168.1.2:3210`). In `next dev`, a non-localhost origin
is blocked from loading dev scripts unless it is listed in `allowedDevOrigins`
in `next.config.ts`; the production build has no such restriction, which is
why review was done against `next start`.

## Changing the logo or brand colours

1. Put the new artwork at `assets/brand/logo-source.png` (transparent PNG).
2. Regenerate the served files from it: `public/logo.webp` (cropped to the
   artwork, 80px tall), `app/icon.png` (96px square, transparent) and
   `app/apple-icon.png` (180px square, white ground). Sprint 2 did this with a
   short Pillow script; any image tool works. Update `width`/`height` in
   `components/marketing/logo.tsx` if the proportions change.
3. Sample the artwork's two end colours. Put the primary on the accent ramp at
   step 400 and the secondary on the `brand-blue` ramp at step 600, in
   `styles/brand.css`. Deepen accent 500/600 until white text on them passes
   contrast.
4. Rebuild and re-run Lighthouse: a colour change can fail contrast.

## 6. Document

Update `02-design-system.md` for any new token, type style or motion recipe,
and add a dated entry to `04-sprint-log.md`.

## Commands

| Task | Command |
| --- | --- |
| Develop | `npm run dev` |
| Type-check | `npx tsc --noEmit` |
| Lint | `npm run lint` |
| Production build | `npm run build` |
| Serve the build | `npm run start` |
| Add a BoardUI component | `npx boardui@latest add <name> --yes` |
| Update the BoardUI skill | `npx boardui@latest skill --force` |
