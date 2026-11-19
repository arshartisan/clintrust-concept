import type { CSSProperties } from "react";
import Link from "next/link";
import { RiArrowRightLine, RiArrowRightUpLine } from "@remixicon/react";
import { about } from "@/content/pages";
import { cx } from "@/utils/cx";
import { InView } from "./in-view";

/**
 * Advisory areas on /about as four cards, two by two (sprint 7, after a
 * "metric cards" reference): a title and a tag pill, an index figure with an
 * arrow, a small doodle in the card's colour, then the description, a round
 * arrow button and position dots.
 *
 * The figures are the area's index (01 to 04), not metrics: there are no
 * advisor figures on record, and none are invented.
 *
 * The doodles (sprint 10, replacing the sprint 7 line charts) are drawn in the
 * page's sticker style: ink outlines, flat brand fills, a hard offset shadow
 * under the main object, a few sparkles. Each loops quietly while its card is
 * on screen (`.doo-*`, keyed off InView's `data-inview`); at rest each is a
 * finished picture.
 *
 * Colours are yellow and coral in a checkerboard, so no column of the 2 x 2
 * grid is a single colour.
 */

type Tone = { fill: string; soft: string; strong: string; stroke: string; text: string; dot: string };

const SUN: Tone = {
  fill: "fill-accent-200",
  soft: "fill-accent-300",
  strong: "fill-accent-500",
  stroke: "stroke-accent-600",
  text: "text-accent-600",
  dot: "bg-accent-500",
};
const CORAL: Tone = {
  fill: "fill-coral-200",
  soft: "fill-coral-300",
  strong: "fill-coral-500",
  stroke: "stroke-coral-500",
  text: "text-coral-600",
  dot: "bg-coral-500",
};
// Checkerboard in the 2 x 2 grid: row 1 yellow, coral; row 2 coral, yellow.
const TONES = [SUN, CORAL, CORAL, SUN];

/** Ink outline shared by every doodle: the card's own border colour. */
const ink = {
  className: "stroke-text-primary",
  strokeWidth: 2.5,
  strokeLinecap: "round" as const,
  strokeLinejoin: "round" as const,
};

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/** A four-point sparkle centred on (x, y). */
function Sparkle({ x, y, size = 10, fill, wait = 0 }: { x: number; y: number; size?: number; fill: string; wait?: number }) {
  const k = size * 0.2;
  return (
    <path
      {...ink}
      strokeWidth={2}
      className={cx(ink.className, fill, "doo-twinkle")}
      style={delay(wait)}
      d={`M${x} ${y - size} Q${x + k} ${y - k} ${x + size} ${y} Q${x + k} ${y + k} ${x} ${y + size} Q${x - k} ${y + k} ${x - size} ${y} Q${x - k} ${y - k} ${x} ${y - size} Z`}
    />
  );
}

/** A small bank: roof, three columns, a base with a hard shadow. */
function Bank({ x, roof, base }: { x: number; roof: string; base: string }) {
  return (
    <g>
      <rect x={x - 40} y={98} width={80} height={14} rx={3} className="fill-text-primary" transform="translate(4 4)" />
      <path {...ink} d={`M${x - 40} 58 L${x} 38 L${x + 40} 58 Z`} className={cx(ink.className, roof)} />
      {[-28, -8, 12].map((dx) => (
        <rect key={dx} {...ink} strokeWidth={2} x={x + dx} y={62} width={16} height={36} rx={2} className={cx(ink.className, "fill-background-full")} />
      ))}
      <rect {...ink} x={x - 40} y={98} width={80} height={14} rx={3} className={cx(ink.className, base)} />
    </g>
  );
}

/** Four doodles, one per card. Drawn on a 480 x 120 grid; the viewBox crops to the drawn area (x 78-402) so they fill the card. */
function Doodle({ index, tone }: { index: number; tone: Tone }) {
  const frame = "mx-auto block h-auto w-full max-w-[460px] overflow-visible";

  // Clinical operations: a clipboard whose boxes tick themselves, pencil scribbling.
  if (index === 0) {
    const rows = [44, 68, 92];
    const board = "M188 18 Q240 13 292 16 Q297 64 293 112 Q240 117 189 113 Q184 64 188 18 Z";
    return (
      <svg viewBox="78 -14 324 142" className={frame} aria-hidden="true">
        <path d={board} className="fill-text-primary" transform="translate(5 5)" />
        <path {...ink} d={board} className={cx(ink.className, tone.fill)} />
        <rect {...ink} x={220} y={7} width={40} height={17} rx={6} className={cx(ink.className, "fill-background-full")} />
        {rows.map((y, row) => (
          <g key={y}>
            <rect {...ink} strokeWidth={2} x={199} y={y - 9} width={16} height={16} rx={4} className={cx(ink.className, "fill-background-full")} />
            <path
              {...ink}
              strokeWidth={3}
              pathLength={1}
              className={cx(ink.className, "fill-none doo-tick")}
              style={delay(row * 450)}
              d={`M202 ${y - 1} L206 ${y + 3} L214 ${y - 8}`}
            />
            <path {...ink} className="fill-none stroke-text-tertiary" d={`M226 ${y} Q240 ${y - 3} 254 ${y} T${282 - row * 10} ${y}`} />
          </g>
        ))}
        <g className="doo-scribble">
          <path {...ink} d="M318 94 L350 44 L362 52 L330 102 Z" className={cx(ink.className, tone.strong)} />
          <path {...ink} d="M350 44 L356 35 L368 43 L362 52 Z" className={cx(ink.className, "fill-coral-300")} />
          <path {...ink} d="M318 94 L315 110 L330 102 Z" className={cx(ink.className, "fill-background-full")} />
        </g>
        <Sparkle x={150} y={34} size={11} fill={tone.strong} />
        <Sparkle x={128} y={84} size={6} fill="fill-teal-300" wait={700} />
        <Sparkle x={392} y={26} size={7} fill="fill-teal-300" wait={1300} />
      </svg>
    );
  }

  // Regulatory: a rubber stamp comes down and leaves an approval mark.
  if (index === 1) {
    const paper = "M172 58 Q240 54 308 57 Q311 86 308 116 Q240 119 171 116 Q168 86 172 58 Z";
    return (
      <svg viewBox="78 -14 324 142" className={frame} aria-hidden="true">
        <path d={paper} className="fill-text-primary" transform="translate(5 5)" />
        <path {...ink} d={paper} className={cx(ink.className, "fill-background-full")} />
        <path {...ink} strokeWidth={2} className="fill-none stroke-text-tertiary" d="M188 106 H214 M266 106 H292" />
        <g className="doo-imprint">
          <circle cx={240} cy={84} r={17} strokeWidth={3} className={cx("fill-none", tone.stroke)} />
          <path strokeWidth={3} strokeLinecap="round" strokeLinejoin="round" className={cx("fill-none", tone.stroke)} d="M232 84 L238 90 L249 77" />
        </g>
        <path {...ink} className={cx(ink.className, "fill-none doo-burst")} d="M192 72 L180 64 M190 86 L176 86 M288 72 L300 64 M290 86 L304 86" />
        <g className="doo-stamp">
          <circle {...ink} cx={240} cy={10} r={8} className={cx(ink.className, tone.soft)} />
          <rect {...ink} x={234} y={18} width={12} height={14} className={cx(ink.className, tone.fill)} />
          <rect {...ink} x={212} y={32} width={56} height={14} rx={4} className={cx(ink.className, tone.strong)} />
          <rect {...ink} x={216} y={46} width={48} height={6} rx={2} className={cx(ink.className, "fill-text-primary")} />
        </g>
        <Sparkle x={140} y={40} size={10} fill="fill-accent-400" />
        <Sparkle x={346} y={30} size={7} fill={tone.strong} wait={900} />
      </svg>
    );
  }

  // Fintech and payments: a coin hops across the border from one bank to another.
  if (index === 2) {
    return (
      <svg viewBox="78 -14 324 142" className={frame} aria-hidden="true">
        <Bank x={125} roof={tone.soft} base={tone.strong} />
        <Bank x={355} roof="fill-teal-200" base="fill-teal-400" />
        <path {...ink} strokeWidth={2} strokeDasharray="6 9" className="fill-none stroke-text-tertiary doo-dash" d="M135 30 Q240 -20 345 30" />
        <g className="doo-coin-x">
          <g className="doo-coin-y">
            <g className="doo-flip">
              <circle {...ink} cx={240} cy={5} r={13} className={cx(ink.className, "fill-accent-400")} />
              <circle strokeWidth={2} cx={240} cy={5} r={6.5} className="fill-none stroke-accent-700" />
            </g>
          </g>
        </g>
        <Sparkle x={240} y={80} size={8} fill={tone.strong} wait={400} />
      </svg>
    );
  }

  // APAC: a spinning globe with pins dropping onto the region.
  const clip = `doo-globe-${index}`;
  const lands = "M-30 40 Q-14 26 2 36 Q14 50 4 62 Q-12 74 -26 62 Q-38 52 -30 40 Z M20 76 Q34 68 46 78 Q50 92 36 96 Q22 94 20 76 Z";
  const pins = [
    [222, 40],
    [264, 52],
    [248, 86],
  ];
  return (
    <svg viewBox="78 -14 324 142" className={frame} aria-hidden="true">
      <defs>
        <clipPath id={clip}>
          <circle cx={240} cy={62} r={50} />
        </clipPath>
      </defs>
      <circle cx={245} cy={67} r={50} className="fill-text-primary" />
      <circle cx={240} cy={62} r={50} className={tone.fill} />
      <g clipPath={`url(#${clip})`}>
        <g className="doo-spin">
          {[190, 290, 390].map((x) => (
            <path key={x} {...ink} strokeWidth={2} d={lands} transform={`translate(${x} 0)`} className={cx(ink.className, tone.strong)} />
          ))}
        </g>
        <ellipse cx={240} cy={62} rx={22} ry={50} strokeWidth={1.5} strokeOpacity={0.3} className="fill-none stroke-text-primary" />
        <path strokeWidth={1.5} strokeOpacity={0.3} className="fill-none stroke-text-primary" d="M190 62 H290" />
      </g>
      <circle {...ink} cx={240} cy={62} r={50} className={cx(ink.className, "fill-none")} />
      <path {...ink} strokeWidth={2} strokeDasharray="5 7" className="fill-none stroke-text-primary doo-dash" d="M222 40 Q246 26 264 52 Q270 72 248 86" />
      {pins.map(([x, y], pin) => (
        <g key={pin} className="doo-pin" style={delay(pin * 500)}>
          <path {...ink} strokeWidth={2} transform={`translate(${x} ${y})`} d="M0 0 C-8 -9 -8 -20 0 -20 C8 -20 8 -9 0 0 Z" className={cx(ink.className, "fill-coral-500")} />
          <circle cx={x} cy={y - 13} r={2.5} className="fill-background-full" />
        </g>
      ))}
      <Sparkle x={160} y={30} size={10} fill="fill-teal-300" />
      <Sparkle x={330} y={92} size={7} fill={tone.strong} wait={800} />
      <Sparkle x={338} y={22} size={5} fill="fill-coral-300" wait={1500} />
    </svg>
  );
}

export function AdvisorCards() {
  const { areas } = about.advisors;
  return (
    <ul className="grid gap-4 md:grid-cols-2">
      {areas.map((area, index) => {
        const tone = TONES[index];
        return (
          <li key={area.name} className="min-w-0">
            <InView className="flex h-full flex-col rounded-3xl border-2 border-text-primary shadow-sticker bg-background-full p-6 sm:p-8">
              <div className="flex items-start justify-between gap-3">
                <h4 className="text-headline-medium text-text-primary">{area.name}</h4>
                <span className="shrink-0 rounded-full bg-background-secondary-default px-2.5 py-1 text-caption-1-medium text-text-secondary">
                  {area.tag}
                </span>
              </div>

              <p className="mt-8 text-body-2-regular text-text-tertiary">{about.advisors.figureLabel}</p>
              <p className="flex items-start gap-1 text-display-3-medium tracking-tight text-text-primary">
                {String(index + 1).padStart(2, "0")}
                <RiArrowRightUpLine aria-hidden="true" className={cx("mt-1 size-5", tone.text)} />
              </p>

              <div className="mt-6">
                <Doodle index={index} tone={tone} />
              </div>

              <div className="mt-6 flex flex-1 items-end justify-between gap-4">
                <p className="max-w-[40ch] text-body-2-regular text-text-secondary">{area.text}</p>
                <Link
                  href={about.advisors.ctaHref}
                  aria-label={`${about.advisors.ctaLabel} ${area.name.toLowerCase()}`}
                  className={cx(
                    "flex size-10 shrink-0 items-center justify-center rounded-full text-text-white transition-transform duration-200 hover:scale-105 outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring focus-visible:ring-offset-2",
                    tone === CORAL ? "adv-cta-blue" : "adv-cta-teal",
                  )}
                >
                  <RiArrowRightLine aria-hidden="true" className="size-5" />
                </Link>
              </div>

              {/* Which of the four this is. */}
              <div aria-hidden="true" className="mt-6 flex justify-center gap-1">
                {areas.map((other, dot) => (
                  <span
                    key={other.name}
                    className={cx("h-0.5 w-3.5 rounded-full", dot === index ? tone.dot : "bg-border-button-default")}
                  />
                ))}
              </div>
            </InView>
          </li>
        );
      })}
    </ul>
  );
}
