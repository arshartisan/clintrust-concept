import type { CSSProperties } from "react";
import { RiCheckLine } from "@remixicon/react";
import { about } from "@/content/pages";
import { cx } from "@/utils/cx";
import { SparkleDoodle, SquiggleDoodle } from "./doodles";
import { HeroPlay } from "./hero-play";
import { CardBubble, CoinBuddy, RecordShield, SceneBit as Bit } from "./hero-stickers";
import { InView } from "./in-view";

/**
 * The /about hero's scene (sprint 10), telling the lead's one line: "a
 * structural rebuild, not another workaround".
 *
 * Centre: three chunky blocks (Record, Verify, Paid) drop in one by one and
 * stack into a tower, then a tick pops on top; the loop rebuilds it every few
 * seconds (`.ab-*`, styles/brand.css). Round it: a tangled "Workaround"
 * sticker that gets struck out, a wrench rocking, and the home hero's coin
 * buddy, card bubble and shield.
 *
 * Shares the home hero's play layer (hero-play.tsx): pieces follow the mouse
 * at their own depth, the coin's eyes follow the cursor, and a click makes a
 * piece react with a confetti pop. Loops run only while on screen (InView);
 * at rest, and under reduced motion, the tower stands built. Decorative:
 * aria-hidden, the copy carries the message.
 */

const { blocks, workaround } = about.hero.scene;

// Bottom to top. Each block: face colour, side gradient, width.
const BLOCKS = [
  { face: "bg-teal-300", side: "bg-linear-to-br from-teal-500 to-brand-blue-400", width: "w-52 sm:w-60" },
  { face: "bg-accent-300", side: "bg-linear-to-br from-accent-500 to-coral-400", width: "w-44 sm:w-52" },
  { face: "bg-coral-400", side: "bg-linear-to-br from-coral-600 to-accent-400", width: "w-36 sm:w-44" },
];

function Tower() {
  return (
    <InView className="flex flex-col-reverse items-center">
      {blocks.map((label, index) => (
        <span
          key={label}
          className={cx("ab-block relative -mt-1 block h-14 sm:h-16", BLOCKS[index].width)}
          style={{ "--i": index } as CSSProperties}
        >
          <span className={cx("absolute inset-0 translate-x-[6px] translate-y-[7px] rounded-2xl border-2 border-text-primary", BLOCKS[index].side)} />
          <span
            className={cx(
              "absolute inset-0 flex items-center justify-center rounded-2xl border-2 border-text-primary font-display text-title-3-bold tracking-wide text-text-primary uppercase",
              BLOCKS[index].face,
            )}
          >
            {label}
          </span>
        </span>
      ))}
      {/* Last in the DOM, so on top of the column-reverse stack: the tick. */}
      <span className="ab-tick mb-3 flex size-14 items-center justify-center rounded-full border-2 border-text-primary bg-teal-400 text-text-primary shadow-sticker">
        <RiCheckLine className="size-7" />
      </span>
    </InView>
  );
}

/** The struck-out workaround: a tangle of scribble with its label crossed through. */
function Workaround() {
  return (
    <InView className="relative -rotate-6">
      <svg viewBox="0 0 140 60" className="ab-tangle mx-auto block w-32 overflow-visible text-text-tertiary" aria-hidden="true">
        <path
          d="M8 40c10-30 30-34 34-14s-22 22-14 4 40-26 44-4-30 20-18 0 40-24 46-2-18 22-10 6 24-18 34-4"
          fill="none"
          stroke="currentColor"
          strokeWidth={2.5}
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
      <span className="relative mt-1 block rounded-full border-2 border-text-primary bg-background-primary-default px-3 py-1 font-display text-body-semibold text-text-secondary shadow-sticker-sm">
        {workaround}
        <svg viewBox="0 0 100 20" preserveAspectRatio="none" className="absolute inset-x-1 top-1/2 h-4 w-[calc(100%-0.5rem)] -translate-y-1/2 overflow-visible" aria-hidden="true">
          <path className="ab-strike stroke-coral-500" pathLength={1} d="M2 14C30 8 60 12 98 4" fill="none" strokeWidth={4} strokeLinecap="round" />
        </svg>
      </span>
    </InView>
  );
}

function Wrench({ className }: { className?: string }) {
  const shape = "M22 6a14 14 0 0 0-13 19l-5 5 9 9 5-5a14 14 0 0 0 19-13l-8 8-8-2-2-8 8-8a14 14 0 0 0-5-5Z";
  return (
    <svg viewBox="0 0 48 48" className={cx("block overflow-visible", className)} aria-hidden="true">
      <path d={shape} transform="translate(3 4)" className="fill-text-primary" />
      <path d={shape} className="fill-brand-blue-300 stroke-text-primary" strokeWidth={2.5} strokeLinejoin="round" />
    </svg>
  );
}

export function AboutHeroScene() {
  return (
    <HeroPlay className="relative mx-auto h-[360px] w-full max-w-[560px] sm:h-[440px]">
      {/* Soft sun behind the tower, and a dot grid. */}
      <span aria-hidden="true" className="absolute top-1/2 left-1/2 size-[340px] -translate-1/2 rounded-full [background:radial-gradient(closest-side,color-mix(in_srgb,var(--color-accent-300)_55%,transparent),transparent)] sm:size-[420px]" />
      <span aria-hidden="true" className="absolute inset-0 [background-image:radial-gradient(var(--color-separator-border)_1.5px,transparent_1.5px)] [background-size:22px_22px] [mask-image:radial-gradient(ellipse_60%_60%_at_50%_50%,black_30%,transparent_75%)]" />

      <Bit className="bottom-[6%] left-1/2 -translate-x-1/2" depth={10} enter={150}>
        <Tower />
      </Bit>

      <Bit className="top-[4%] left-[2%]" depth={-26} bob={-1.5} enter={400}>
        <Workaround />
      </Bit>
      <Bit className="top-[10%] right-[6%]" depth={30} poke="spin" bob={-3} enter={500}>
        <InView>
          <Wrench className="ab-wrench w-14" />
        </InView>
      </Bit>
      <Bit className="top-[44%] left-[0%] max-sm:hidden" depth={-34} bob={-2.4} enter={650}>
        <CardBubble className="w-24 -rotate-6" />
      </Bit>
      <Bit className="right-[2%] bottom-[22%]" depth={22} poke="blink" look bob={-0.6} enter={750}>
        <CoinBuddy className="size-16 rotate-6" />
      </Bit>
      <Bit className="top-[40%] right-[10%] max-sm:hidden" depth={-20} poke="spin" bob={-3.6} enter={850}>
        <RecordShield className="w-12 -rotate-6" />
      </Bit>
      <Bit className="top-[2%] left-[48%]" depth={40} poke="spin" enter={900}>
        <SparkleDoodle className="size-8 text-teal-500" />
      </Bit>
      <Bit className="bottom-[2%] left-[2%]" depth={16} enter={950}>
        <SquiggleDoodle className="w-24 text-coral-400" />
      </Bit>
    </HeroPlay>
  );
}
