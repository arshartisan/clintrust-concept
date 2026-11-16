import { about } from "@/content/pages";
import { cx } from "@/utils/cx";
import { InView } from "./in-view";

/**
 * "How we build" on /about (sprint 7, after an "automation for everyone"
 * reference): an eyebrow and heading, a short intro, then four staggered
 * cards. On desktop the grid is three columns: the intro and two cards on
 * the first row, two cards on the second row shifted one column left, so the
 * cards step down like a staircase. Each card has a thin line drawing (top
 * end), the principle, its short line in teal, and the fuller text.
 *
 * The drawings draw in once while on screen (`.adv-draw`, shared with the
 * advisor cards); at rest they are complete.
 */

const line = "fill-none stroke-accent-500";
const soft = "fill-none stroke-brand-blue-300";

/** Four small line drawings, viewBox 0 0 160 64. */
function Drawing({ index }: { index: number }) {
  const common = { strokeWidth: 1.25, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
  return (
    <svg viewBox="0 0 160 64" className="h-20 w-52 overflow-visible" aria-hidden="true">
      {index === 0 ? (
        // Structural: a root diamond feeding one clear line forward.
        <>
          <path className={cx(soft, "adv-draw")} pathLength={1} {...common} d="M98 32 L114 16 L130 32 L114 48 Z" />
          <path className={cx(line, "adv-draw")} pathLength={1} {...common} d="M54 32 L76 10 L98 32 L76 54 Z" />
          <path className={cx(line, "adv-draw")} pathLength={1} {...common} d="M62 32 H146 M138 25 L146 32 L138 39" />
        </>
      ) : index === 1 ? (
        // Compliance first: the foundation layer drawn before the layers above.
        <>
          <path className={cx(line, "adv-draw")} pathLength={1} {...common} d="M40 52 H150" />
          <path className={cx(soft, "adv-draw")} pathLength={1} {...common} d="M52 40 H138 M64 28 H126 M76 16 H114" />
          <path className={cx(line, "adv-draw")} pathLength={1} {...common} d="M40 52 V44 M150 52 V44 M70 52 V46 M95 52 V46 M120 52 V46" />
        </>
      ) : index === 2 ? (
        // Explainability: each decision traceable back through its inputs.
        <>
          <circle className={cx(soft, "adv-draw")} pathLength={1} {...common} cx={50} cy={20} r={8} />
          <circle className={cx(soft, "adv-draw")} pathLength={1} {...common} cx={50} cy={44} r={8} />
          <circle className={cx(line, "adv-draw")} pathLength={1} {...common} cx={88} cy={32} r={10} />
          <path className={cx(line, "adv-draw")} pathLength={1} {...common} d="M58 22 L78 29 M58 42 L78 35 M98 32 H146 M138 25 L146 32 L138 39" />
        </>
      ) : (
        // Site sustainability: steady parallel flows reaching the site.
        <>
          <path className={cx(soft, "adv-draw")} pathLength={1} {...common} d="M30 18 H96 Q108 18 116 26" />
          <path className={cx(soft, "adv-draw")} pathLength={1} {...common} d="M30 46 H96 Q108 46 116 38" />
          <path className={cx(line, "adv-draw")} pathLength={1} {...common} d="M30 32 H146 M138 25 L146 32 L138 39" />
        </>
      )}
    </svg>
  );
}

export function PrincipleCards() {
  const { eyebrow, title, intro, items } = about.principles;
  // Desktop placement (3 columns): row 1 = intro, card 1, card 2; row 2 = card 3, card 4.
  const place = ["lg:col-start-2 lg:row-start-1", "lg:col-start-3 lg:row-start-1", "lg:col-start-1 lg:row-start-2", "lg:col-start-2 lg:row-start-2"];

  return (
    <div>
      <p className="flex items-center gap-2 text-body-2-medium text-accent-600">
        <span aria-hidden="true" className="size-2 rounded-xs bg-accent-500" />
        {eyebrow}
      </p>
      <h2 className="mt-4 text-section text-text-primary">{title}</h2>

      <div className="mt-12 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        <p className="max-w-[32ch] text-lead text-pretty text-text-secondary md:col-span-2 lg:col-span-1 lg:col-start-1 lg:row-start-1">
          {intro}
        </p>
        {items.map((item, index) => (
          <InView
            key={item.name}
            once
            className={cx(
              "flex flex-col rounded-3xl border border-border-button-default bg-background-secondary-default p-6 sm:p-7",
              place[index],
            )}
          >
            <div className="flex justify-end">
              <Drawing index={index} />
            </div>
            <h3 className="mt-6 text-title-3-medium text-text-primary">{item.name}</h3>
            <p className="mt-8 text-body-2-medium text-accent-600">{item.tagline}</p>
            <p className="mt-2 text-body-2-regular text-text-secondary">{item.text}</p>
          </InView>
        ))}
      </div>
    </div>
  );
}
