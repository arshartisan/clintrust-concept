import type { CSSProperties } from "react";
import { insights } from "@/content/pages";
import { cx } from "@/utils/cx";
import { SparkleDoodle, SquiggleDoodle } from "./doodles";
import { HeroPlay } from "./hero-play";
import { CoinBuddy, SceneBit as Bit } from "./hero-stickers";
import { InView } from "./in-view";

/**
 * The /insights hero's scene (sprint 10): reading and thinking about trial
 * payments. Centre: three article sheets fanned like a fresh stack, each with
 * a headline bar and text lines, gently breathing apart. Round them: a bulb
 * that glows (an idea), a pencil scribbling a note, a mini chart whose bars
 * rise in turn, a quote bubble typing, and the coin buddy watching.
 *
 * Same play layer as the home and about heroes (hero-play.tsx): mouse
 * parallax per piece, eyes that follow, click reactions with a confetti pop.
 * Loops run only on screen (InView) and are off under reduced motion; at rest
 * every piece is the finished picture. Decorative: aria-hidden.
 */

const ink = { className: "stroke-text-primary", strokeWidth: 2.5, strokeLinecap: "round" as const, strokeLinejoin: "round" as const };

// Back to front: tilt at rest and the far end of its breathing.
const SHEETS = [
  { x: -46, r0: "-14deg", r1: "-18deg", head: "fill-teal-300" },
  { x: 46, r0: "12deg", r1: "16deg", head: "fill-coral-300" },
  { x: 0, r0: "-2deg", r1: "1deg", head: "fill-accent-300" },
];

function Sheets() {
  return (
    <InView>
      <svg viewBox="-110 -10 220 200" className="block w-56 overflow-visible sm:w-64" aria-hidden="true">
        {SHEETS.map((sheet) => (
          <g
            key={sheet.x}
            className="in-sheet"
            style={{ rotate: sheet.r0, "--r0": sheet.r0, "--r1": sheet.r1 } as CSSProperties}
          >
            <g transform={`translate(${sheet.x} 0)`}>
              <rect x={-58} y={10} width={116} height={160} rx={12} className="fill-text-primary" transform="translate(6 7)" />
              <rect {...ink} x={-58} y={10} width={116} height={160} rx={12} className={cx(ink.className, "fill-background-primary-default")} />
              <rect {...ink} strokeWidth={2} x={-44} y={26} width={60} height={12} rx={6} className={cx(ink.className, sheet.head)} />
              <g className="fill-text-tertiary" opacity={0.4}>
                <rect x={-44} y={52} width={88} height={6} rx={3} />
                <rect x={-44} y={66} width={76} height={6} rx={3} />
                <rect x={-44} y={80} width={82} height={6} rx={3} />
                <rect x={-44} y={104} width={88} height={6} rx={3} />
                <rect x={-44} y={118} width={60} height={6} rx={3} />
              </g>
              <rect {...ink} strokeWidth={2} x={-44} y={140} width={34} height={16} rx={8} className={cx(ink.className, "fill-background-secondary-default")} />
            </g>
          </g>
        ))}
      </svg>
    </InView>
  );
}

function Bulb({ className }: { className?: string }) {
  return (
    <InView className={className}>
      <svg viewBox="0 0 60 80" className="block w-14 overflow-visible" aria-hidden="true">
        <circle cx={30} cy={28} r={30} className="in-glow fill-accent-300" opacity={0.6} />
        <path d="M30 6C42 6 50 15 50 26C50 34 45 39 41 44V52H19V44C15 39 10 34 10 26C10 15 18 6 30 6Z" className="fill-text-primary" transform="translate(3 4)" />
        <path {...ink} d="M30 6C42 6 50 15 50 26C50 34 45 39 41 44V52H19V44C15 39 10 34 10 26C10 15 18 6 30 6Z" className={cx(ink.className, "fill-accent-300")} />
        <path {...ink} strokeWidth={2} className={cx(ink.className, "fill-none")} d="M24 36L30 28L36 36M30 28V50" />
        <rect {...ink} strokeWidth={2} x={19} y={52} width={22} height={8} rx={2} className={cx(ink.className, "fill-background-primary-default")} />
        <rect {...ink} strokeWidth={2} x={22} y={60} width={16} height={7} rx={3} className={cx(ink.className, "fill-background-primary-default")} />
        <path {...ink} strokeWidth={2} className={cx(ink.className, "fill-none")} d="M2 14L-6 10M58 14L66 10M30 -4V-12" />
      </svg>
    </InView>
  );
}

function Pencil() {
  return (
    <InView>
      <svg viewBox="0 0 90 70" className="block w-24 overflow-visible" aria-hidden="true">
        <path {...ink} strokeWidth={2} pathLength={1} className={cx(ink.className, "fill-none doo-tick")} d="M4 60C14 50 20 64 30 54S44 58 52 52" />
        <g className="doo-scribble">
          <path {...ink} d="M54 50L80 14L90 21L64 57Z" className={cx(ink.className, "fill-brand-blue-300")} />
          <path {...ink} d="M80 14L85 7L95 14L90 21Z" className={cx(ink.className, "fill-coral-300")} />
          <path {...ink} d="M54 50L51 64L64 57Z" className={cx(ink.className, "fill-background-primary-default")} />
        </g>
      </svg>
    </InView>
  );
}

function MiniChart() {
  const bars = [
    { h: 18, fill: "fill-teal-300" },
    { h: 30, fill: "fill-teal-300" },
    { h: 24, fill: "fill-teal-300" },
    { h: 42, fill: "fill-teal-500" },
  ];
  return (
    <InView>
      <svg viewBox="0 0 100 74" className="block w-24 overflow-visible" aria-hidden="true">
        <rect x={2} y={2} width={92} height={66} rx={10} className="fill-text-primary" transform="translate(4 5)" />
        <rect {...ink} x={2} y={2} width={92} height={66} rx={10} className={cx(ink.className, "fill-background-primary-default")} />
        {bars.map((bar, index) => (
          <rect
            key={index}
            {...ink}
            strokeWidth={2}
            x={14 + index * 19}
            y={58 - bar.h}
            width={13}
            height={bar.h}
            rx={3}
            className={cx(ink.className, bar.fill, "in-bar")}
            style={{ "--d": `${index * 160}ms` } as CSSProperties}
          />
        ))}
        <path {...ink} strokeWidth={2} className={cx(ink.className, "fill-none")} d="M10 58H86" />
      </svg>
    </InView>
  );
}

function QuoteBubble() {
  const body = "M14 4h68a10 10 0 0 1 10 10v24a10 10 0 0 1-10 10H40L24 60l3-12H14A10 10 0 0 1 4 38V14A10 10 0 0 1 14 4Z";
  return (
    <InView className="relative">
      <svg viewBox="0 0 96 64" className="block w-28 overflow-visible" aria-hidden="true">
        <path d={body} className="fill-text-primary" transform="translate(4 5)" />
        <path {...ink} d={body} className={cx(ink.className, "fill-coral-300")} />
      </svg>
      <span className="absolute inset-x-0 top-0 flex h-[78%] items-center justify-center gap-1.5">
        <span className="font-display text-body-semibold text-text-primary">{insights.hero.quote}</span>
        {[0, 1, 2].map((dot) => (
          <span key={dot} className="in-dot size-1.5 rounded-full bg-text-primary" style={{ "--d": `${dot * 150}ms` } as CSSProperties} />
        ))}
      </span>
    </InView>
  );
}

export function InsightsHeroScene() {
  return (
    <HeroPlay className="relative mx-auto h-[360px] w-full max-w-[560px] sm:h-[440px]">
      <span aria-hidden="true" className="absolute top-1/2 left-1/2 size-[340px] -translate-1/2 rounded-full [background:radial-gradient(closest-side,color-mix(in_srgb,var(--color-teal-200)_55%,transparent),transparent)] sm:size-[420px]" />
      <span aria-hidden="true" className="absolute inset-0 [background-image:radial-gradient(var(--color-separator-border)_1.5px,transparent_1.5px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black_30%,transparent_75%)]" />

      <Bit className="top-[12%] left-1/2 -translate-x-1/2" depth={10} enter={150}>
        <Sheets />
      </Bit>
      <Bit className="top-[2%] right-[8%]" depth={30} poke="spin" bob={-1.2} enter={400}>
        <Bulb />
      </Bit>
      <Bit className="top-[6%] left-[2%]" depth={-26} bob={-2.6} enter={500}>
        <QuoteBubble />
      </Bit>
      <Bit className="bottom-[8%] left-[0%]" depth={-20} enter={650}>
        <Pencil />
      </Bit>
      <Bit className="right-[2%] bottom-[14%]" depth={24} bob={-0.8} enter={750}>
        <MiniChart />
      </Bit>
      <Bit className="top-[44%] right-[0%] max-sm:hidden" depth={-34} poke="blink" look bob={-3.4} enter={850}>
        <CoinBuddy className="size-14 rotate-6" />
      </Bit>
      <Bit className="top-[46%] left-[4%] max-sm:hidden" depth={38} poke="spin" enter={900}>
        <SparkleDoodle className="size-8 text-coral-500" />
      </Bit>
      <Bit className="bottom-[0%] left-[40%]" depth={14} enter={950}>
        <SquiggleDoodle className="w-24 text-teal-500" />
      </Bit>
    </HeroPlay>
  );
}
