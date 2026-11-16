import type { CSSProperties } from "react";
import Link from "next/link";
import { RiArrowRightLine, RiArrowRightUpLine } from "@remixicon/react";
import { about } from "@/content/pages";
import { cx } from "@/utils/cx";
import { InView } from "./in-view";

/**
 * Advisory areas on /about as four cards, two by two (sprint 7, after a
 * "metric cards" reference): a title and a tag pill, an index figure with an arrow, a small
 * chart drawn in the card's colour, then the description, a round arrow
 * button and position dots.
 *
 * The figures are the area's index (01 to 04), not metrics: there are no
 * advisor figures on record, and none are invented. The charts are
 * decorative. Each one draws in once while the card is on screen
 * (`.adv-draw`, keyed off InView's `data-inview`); the resting state is the
 * finished drawing.
 *
 * Colours are the logo's teal and blue in a checkerboard, so no column of
 * the 2 x 2 grid is a single colour.
 */

type Tone = { line: string; soft: string; text: string; dot: string };

const TEAL: Tone = {
  line: "var(--color-accent-500)",
  soft: "var(--color-accent-300)",
  text: "text-accent-600",
  dot: "bg-accent-500",
};
const BLUE: Tone = {
  line: "var(--color-brand-blue-500)",
  soft: "var(--color-brand-blue-300)",
  text: "text-brand-blue-500",
  dot: "bg-brand-blue-500",
};
// Checkerboard in the 2 x 2 grid: row 1 teal, blue; row 2 blue, teal.
const TONES = [TEAL, BLUE, BLUE, TEAL];

/** Four small charts, one per card. viewBox 0 0 480 110 (cards are two-up). */
function Chart({ index, tone }: { index: number; tone: Tone }) {
  const id = `adv-${index}`;
  const stroke = { stroke: `url(#${id}-line)` };
  const defs = (
    <defs>
      <linearGradient id={`${id}-fill`} x1="0" y1="0" x2="0" y2="1">
        <stop offset="0" style={{ stopColor: tone.soft, stopOpacity: 0.55 }} />
        <stop offset="1" style={{ stopColor: tone.soft, stopOpacity: 0 }} />
      </linearGradient>
      <linearGradient id={`${id}-line`} x1="0" y1="0" x2="1" y2="0">
        <stop offset="0" style={{ stopColor: tone.soft, stopOpacity: 0.25 }} />
        <stop offset="0.35" style={{ stopColor: tone.line, stopOpacity: 1 }} />
        <stop offset="1" style={{ stopColor: tone.line, stopOpacity: 1 }} />
      </linearGradient>
    </defs>
  );

  const frame = "h-28 w-full overflow-visible";

  // Rising plateau with a filled area and a marker at its end.
  if (index === 0) {
    return (
      <svg viewBox="0 0 480 110" className={frame} aria-hidden="true">
        {defs}
        <path className="adv-fade" d="M2 84 L120 30 H372 V110 H2 Z" fill={`url(#${id}-fill)`} />
        <path className="adv-draw" pathLength={1} d="M2 84 L113 33 Q120 30 128 30 H372" fill="none" style={stroke} strokeWidth={2.5} strokeLinecap="round" strokeLinejoin="round" />
        <path d="M372 30 V108" fill="none" stroke={tone.line} strokeOpacity={0.5} strokeDasharray="2 4" />
        <circle className="adv-pop" cx={372} cy={14} r={3.5} fill={tone.line} />
      </svg>
    );
  }
  // A wave peaking at the centre, marker on the peak.
  if (index === 1) {
    return (
      <svg viewBox="0 0 480 110" className={frame} aria-hidden="true">
        {defs}
        <path
          className="adv-draw"
          pathLength={1}
          d="M0 84 C60 70 100 100 150 86 C200 72 210 22 240 20 C270 18 282 72 330 86 C380 100 420 82 480 88"
          fill="none"
          style={{ stroke: tone.soft }}
          strokeWidth={10}
          strokeOpacity={0.35}
          strokeLinecap="round"
        />
        <path
          className="adv-draw"
          pathLength={1}
          d="M140 88 C180 80 205 30 240 20 C275 30 300 80 340 88"
          fill="none"
          stroke={tone.line}
          strokeWidth={4}
          strokeLinecap="round"
        />
        <circle cx={240} cy={20} r={7} fill={tone.line} className="adv-pop stroke-background-full" strokeWidth={2} />
      </svg>
    );
  }
  // A curve accelerating up to a glowing marker.
  if (index === 2) {
    return (
      <svg viewBox="0 0 480 110" className={frame} aria-hidden="true">
        {defs}
        <path className="adv-draw" pathLength={1} d="M0 104 C180 100 340 76 440 22" fill="none" style={stroke} strokeWidth={4} strokeLinecap="round" />
        <circle className="adv-pop" cx={440} cy={22} r={17} fill={tone.soft} fillOpacity={0.35} />
        <circle cx={440} cy={22} r={7} fill={tone.line} className="adv-pop stroke-background-full" strokeWidth={2} />
      </svg>
    );
  }
  // Bars stepping up across the region, the last one in full colour.
  const bars = [34, 48, 42, 62, 70, 88];
  return (
    <svg viewBox="0 0 480 110" className={frame} aria-hidden="true">
      {defs}
      {bars.map((height, bar) => (
        <rect
          key={bar}
          className="adv-rise"
          style={{ "--d": `${bar * 90}ms` } as CSSProperties}
          x={8 + bar * 80}
          y={110 - height}
          width={56}
          height={height}
          rx={10}
          fill={bar === bars.length - 1 ? tone.line : `url(#${id}-fill)`}
          stroke={bar === bars.length - 1 ? undefined : tone.soft}
          strokeOpacity={0.6}
        />
      ))}
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
            <InView
              once
              className="flex h-full flex-col rounded-3xl border border-border-button-default bg-background-full p-6 shadow-xs sm:p-8"
            >
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

              <div className="mt-4">
                <Chart index={index} tone={tone} />
              </div>

              <div className="mt-6 flex flex-1 items-end justify-between gap-4">
                <p className="max-w-[40ch] text-body-2-regular text-text-secondary">{area.text}</p>
                <Link
                  href={about.advisors.ctaHref}
                  aria-label={`${about.advisors.ctaLabel} ${area.name.toLowerCase()}`}
                  className={cx(
                    "flex size-10 shrink-0 items-center justify-center rounded-full text-text-white transition-transform duration-200 hover:scale-105 outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring focus-visible:ring-offset-2",
                    tone === BLUE ? "adv-cta-blue" : "adv-cta-teal",
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
