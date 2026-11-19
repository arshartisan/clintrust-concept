import type { CSSProperties } from "react";
import { about } from "@/content/pages";
import { cx } from "@/utils/cx";
import { InView } from "./in-view";

/**
 * "How we build" on /about (sprint 7, after an "automation for everyone"
 * reference): an eyebrow and heading, a short intro, then four staggered
 * cards. On desktop the grid is three columns: the intro and two cards on
 * the first row, two cards on the second row shifted one column left, so the
 * cards step down like a staircase. Each card has a doodle (top end), the
 * principle, its short line in the card's colour, and the fuller
 * text.
 *
 * Card colours (sprint 10): pale yellow and pale teal, alternating so no two
 * cards that touch share a colour in the staircase.
 *
 * Doodles (sprint 10, replacing thin line drawings): sticker-style pictures
 * in ink with flat fills and a hard shadow, one per rule, each looping
 * quietly while its card is on screen (`.doo-*` shared with the advisor
 * cards, plus `.pr-*`). At rest each is the finished picture. Cards press
 * into their shadow on hover, like the pain and how-it-works cards.
 */

const TONES = [
  { card: "bg-accent-100", tagline: "text-accent-700" },
  { card: "bg-teal-100", tagline: "text-teal-700" },
];

const ink = { className: "stroke-text-primary", strokeWidth: 2.25, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };
const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/** Four doodles, viewBox 0 0 160 76. */
function Doodle({ index }: { index: number }) {
  const frame = "h-28 w-60 max-w-full overflow-visible";

  // Structural, not symptomatic: a sprout whose roots draw down through the soil.
  if (index === 0) {
    const roots = ["M80 44C78 54 70 58 64 70", "M80 44C83 55 92 59 98 71", "M80 44V74", "M70 57C64 58 58 56 52 61", "M93 60C99 60 104 62 109 66"];
    return (
      <svg viewBox="0 0 160 76" className={frame} aria-hidden="true">
        <rect x={22} y={34} width={116} height={10} rx={4} className="fill-text-primary" transform="translate(3 4)" />
        <g className="pr-sway">
          <path {...ink} className={cx(ink.className, "fill-none")} d="M80 34 V14" />
          <path {...ink} className={cx(ink.className, "fill-teal-300")} d="M80 22C70 8 56 12 58 19C61 26 72 27 80 22Z" />
          <path {...ink} className={cx(ink.className, "fill-teal-400")} d="M80 16C88 2 104 5 102 12C99 20 88 21 80 16Z" />
        </g>
        <rect {...ink} x={22} y={34} width={116} height={10} rx={4} className={cx(ink.className, "fill-accent-500")} />
        {roots.map((d, root) => (
          <path key={d} {...ink} strokeWidth={2} pathLength={1} className={cx(ink.className, "fill-none doo-tick")} style={delay(root * 180)} d={d} />
        ))}
        <path {...ink} strokeWidth={1.75} className={cx(ink.className, "fill-background-primary-default doo-twinkle")} d="M124 10Q125.5 16 131 17Q125.5 18 124 24Q122.5 18 117 17Q122.5 16 124 10Z" />
      </svg>
    );
  }

  // Compliance first, features second: the shield on its foundation, features dropping on after.
  if (index === 1) {
    const shield = "M80 8L100 14V30C100 42 92 50 80 54C68 50 60 42 60 30V14Z";
    return (
      <svg viewBox="0 0 160 76" className={frame} aria-hidden="true">
        <rect x={26} y={54} width={108} height={14} rx={4} className="fill-text-primary" transform="translate(4 4)" />
        <rect {...ink} x={26} y={54} width={108} height={14} rx={4} className={cx(ink.className, "fill-accent-300")} />
        <path d={shield} className="fill-text-primary" transform="translate(4 4)" />
        <path {...ink} d={shield} className={cx(ink.className, "fill-background-primary-default")} />
        <path strokeWidth={4.5} strokeLinecap="round" strokeLinejoin="round" pathLength={1} className="fill-none stroke-teal-500 doo-tick" d="M71 30L78 37L90 23" />
        <rect {...ink} strokeWidth={2} x={34} y={40} width={16} height={14} rx={3} className={cx(ink.className, "fill-coral-300 doo-pin")} style={delay(600)} />
        <rect {...ink} strokeWidth={2} x={110} y={42} width={14} height={12} rx={3} className={cx(ink.className, "fill-coral-400 doo-pin")} style={delay(900)} />
      </svg>
    );
  }

  // Explainability as standard: a magnifier sweeping along the decision trail.
  if (index === 2) {
    return (
      <svg viewBox="0 0 160 76" className={frame} aria-hidden="true">
        <path {...ink} strokeWidth={2} className={cx(ink.className, "fill-none")} d="M30 26L62 40M30 56L62 40M62 40H134" />
        <circle {...ink} strokeWidth={2} cx={30} cy={26} r={7} className={cx(ink.className, "fill-teal-300")} />
        <circle {...ink} strokeWidth={2} cx={30} cy={56} r={7} className={cx(ink.className, "fill-teal-300")} />
        <circle {...ink} cx={62} cy={40} r={9} className={cx(ink.className, "fill-coral-400")} />
        <circle {...ink} strokeWidth={2} cx={100} cy={40} r={7} className={cx(ink.className, "fill-accent-300")} />
        <rect {...ink} x={124} y={30} width={22} height={20} rx={5} className={cx(ink.className, "fill-background-primary-default")} />
        <path strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" className="fill-none stroke-teal-600" d="M129 40L133 44L141 35" />
        <g className="pr-sweep">
          <path {...ink} strokeWidth={5} className={cx(ink.className, "fill-none")} d="M58 30L68 40" />
          <circle {...ink} strokeWidth={3} cx={48} cy={20} r={13} className={cx(ink.className, "fill-background-primary-default")} fillOpacity={0.55} />
          <path strokeWidth={2} strokeLinecap="round" className="fill-none stroke-background-primary-default" d="M41 15Q43 11 47 11" />
        </g>
      </svg>
    );
  }

  // Site sustainability matters: a healthy site, heart beating, coins coming in.
  const heart = "M128 26C120 20 115 16 115 11C115 7 118 4 122 4C124.5 4 126.5 5.5 128 8C129.5 5.5 131.5 4 134 4C138 4 141 7 141 11C141 16 136 20 128 26Z";
  return (
    <svg viewBox="0 0 160 76" className={frame} aria-hidden="true">
      <rect x={50} y={30} width={60} height={38} rx={4} className="fill-text-primary" transform="translate(4 4)" />
      <rect {...ink} x={50} y={30} width={60} height={38} rx={4} className={cx(ink.className, "fill-background-primary-default")} />
      <rect {...ink} x={46} y={22} width={68} height={10} rx={3} className={cx(ink.className, "fill-coral-400")} />
      <path strokeWidth={3.5} strokeLinecap="round" className="fill-none stroke-coral-500" d="M64 41H74M69 36V46" />
      <rect {...ink} strokeWidth={2} x={88} y={37} width={12} height={9} rx={2} className={cx(ink.className, "fill-teal-200")} />
      <rect {...ink} strokeWidth={2} x={72} y={52} width={16} height={16} rx={2} className={cx(ink.className, "fill-accent-300")} />
      <path {...ink} className={cx(ink.className, "fill-none")} d="M20 68H140" />
      <g className="doo-pin" style={delay(0)}>
        <circle {...ink} strokeWidth={2} cx={30} cy={61} r={6.5} className={cx(ink.className, "fill-accent-400")} />
      </g>
      <g className="doo-pin" style={delay(400)}>
        <circle {...ink} strokeWidth={2} cx={30} cy={48} r={6.5} className={cx(ink.className, "fill-accent-400")} />
      </g>
      <path {...ink} strokeWidth={2} className={cx(ink.className, "fill-coral-400 pr-beat")} d={heart} />
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
        {items.map((item, index) => {
          const tone = TONES[index % 2];
          return (
            <InView
              key={item.name}
              className={cx(
                "flex flex-col rounded-3xl border-2 border-text-primary p-6 shadow-sticker transition-[translate,box-shadow] duration-150 ease-out hover:translate-x-px hover:translate-y-px hover:shadow-sticker-sm active:translate-x-1 active:translate-y-1 active:shadow-none motion-reduce:transition-none sm:p-7",
                tone.card,
                place[index],
              )}
            >
              <div className="flex justify-end">
                <Doodle index={index} />
              </div>
              <h3 className="mt-6 text-title-3-medium text-text-primary">{item.name}</h3>
              <p className={cx("mt-8 text-body-2-medium", tone.tagline)}>{item.tagline}</p>
              <p className="mt-2 text-body-2-regular text-text-secondary">{item.text}</p>
            </InView>
          );
        })}
      </div>
    </div>
  );
}
