import type { CSSProperties, ReactNode } from "react";
import { hero } from "@/content/landing";
import { cx } from "@/utils/cx";
import {
  ArrowDoodle,
  CalendarDoodle,
  ClockDoodle,
  CoinDoodle,
  SparkleDoodle,
  SquiggleDoodle,
  TickDoodle,
} from "./doodles";
import { HeroBubble, HeroKeys } from "./hero-keys";
import { HeroPlay } from "./hero-play";
import { CardBubble, CoinBuddy, InvoiceSticker, RecordShield } from "./hero-stickers";
import { InView } from "./in-view";
import { PhotoSticker } from "./photo-sticker";

const [coordinator, financeLead, investigator] = hero.people;

type Poke = "wiggle" | "flip" | "spin" | "stamp" | "blink";

/**
 * One decoration on the hero, in nested layers so their motions never fight
 * over the same element:
 *   `.hero-in`       staged entrance (transform), `enter` ms delay
 *   `.hero-drift`    scroll-driven drift (translate), `drift` px over the
 *                    first screen of scrolling
 *   `.hero-par`      follows the mouse (transform), `depth` px at the screen
 *                    edge; negative depths move against the pointer
 *   `.concept-float` gentle bob (translate), optional
 *   `[data-poke]`    click reaction (`poke` kind), see hero-play.tsx
 * All are off under reduced motion.
 */
function Piece({
  className,
  enter,
  drift,
  depth = 18,
  poke = "wiggle",
  look = false,
  float = true,
  bob = 0,
  children,
}: {
  className: string;
  enter: number;
  drift: number;
  depth?: number;
  poke?: Poke;
  look?: boolean;
  float?: boolean;
  bob?: number;
  children: ReactNode;
}) {
  return (
    <div className={cx("hero-in absolute", className)} style={{ "--d": `${enter}ms` } as CSSProperties}>
      <div className="hero-drift" style={{ "--drift": `${drift}px` } as CSSProperties}>
        <div className="hero-par" style={{ "--depth": depth } as CSSProperties}>
          <div className={cx(float && "concept-float")} style={{ animationDelay: `${bob}s` }}>
            <div data-poke={poke} data-look={look || undefined} className="hero-poke pointer-events-auto cursor-pointer">
              {children}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/** A spiky starburst sticker with a short line on it. */
function Starburst({ label, className }: { label: string; className?: string }) {
  const points = Array.from({ length: 28 }, (_, index) => {
    const angle = (Math.PI * 2 * index) / 28 - Math.PI / 2;
    const radius = index % 2 === 0 ? 50 : 41;
    return `${(50 + radius * Math.cos(angle)).toFixed(2)},${(50 + radius * Math.sin(angle)).toFixed(2)}`;
  }).join(" ");
  return (
    <span className={cx("relative flex items-center justify-center", className)}>
      <svg viewBox="0 0 100 100" className="absolute inset-0 size-full overflow-visible" aria-hidden="true">
        <polygon points={points} className="fill-coral-500 stroke-text-primary" strokeWidth="2" strokeLinejoin="round" />
      </svg>
      <span className="relative max-w-[70%] text-center font-display text-body-semibold text-text-white">{label}</span>
    </span>
  );
}

/**
 * The hero's imagery (sprint 9, per the brief: "hand-drawn doodles and
 * stickers (coins, calendars, ticks) plus real people … Fewer interface
 * mockups"). Replaces the interface-style progress and invoice cards.
 *
 * Desktop (xl+, 1280px; below that the stickers crowded the headline): three people on tilted photo stickers, a starburst sticker
 * and hand-drawn doodles spread across the full width, with an
 * arrow pointing at "Yes, that's me". Stickers lift and straighten on hover.
 * Phones, tablets and small laptops: the three photo stickers in a row under the buttons
 * (HeroPeopleRow) and two doodles.
 *
 * Decorative: hidden from assistive technology; the brief's message is all in
 * the headline and buttons.
 *
 * Sprint 10: every piece drifts with the mouse at its own depth and reacts
 * when clicked (hero-play.tsx), and four sticker pieces were added
 * (hero-stickers.tsx).
 */
export function HeroDecor() {
  const sticker = "pointer-events-auto transition-[rotate,scale] duration-300 ease-out hover:rotate-0! hover:scale-105 motion-reduce:transition-none";

  return (
    <HeroPlay className="pointer-events-none absolute inset-0">
      {/* Phones and tablets: two doodles near the headline, tappable. */}
      <span data-poke="flip" className="hero-poke pointer-events-auto absolute start-[5%] top-[3%] xl:hidden">
        <CoinDoodle className="concept-float block size-11 text-accent-500" />
      </span>
      <span data-poke="spin" className="hero-poke pointer-events-auto absolute end-[7%] top-[5%] xl:hidden">
        <SparkleDoodle className="block size-8 text-coral-500" />
      </span>

      <div className="hidden xl:block">
        {/* People. */}
        <Piece className="start-[3%] top-[9%] w-[150px] xl:w-[190px]" enter={150} drift={-90} depth={12}>
          <PhotoSticker {...coordinator} tilt={-6} tone="sun" sizes="190px" className={sticker} />
        </Piece>
        <Piece className="end-[3.5%] top-[7%] w-[150px] xl:w-[190px]" enter={300} drift={-60} depth={-12} bob={-2.5}>
          <PhotoSticker {...financeLead} tilt={5} tone="teal" sizes="190px" className={sticker} />
        </Piece>
        <Piece className="start-[8%] top-[57%] w-[130px] xl:w-[160px]" enter={450} drift={-130} depth={16} bob={-1.2}>
          <PhotoSticker {...investigator} tilt={4} tone="coral" sizes="160px" className={sticker} />
        </Piece>

        {/* Stickers. */}
        <Piece className="end-[9%] top-[69%]" enter={800} drift={-100} depth={-20} poke="spin" bob={-3.4}>
          <InView className="relative">
            {/* Text ring turning round the starburst (after the Moxie badge). */}
            <svg viewBox="0 0 200 200" className="ring-spin pointer-events-none absolute -inset-7 size-[calc(100%+3.5rem)] overflow-visible xl:-inset-8 xl:size-[calc(100%+4rem)]" aria-hidden="true">
              <defs>
                <path id="hero-ring" d="M100 100m-86 0a86 86 0 1 1 172 0a86 86 0 1 1-172 0" />
              </defs>
              <text className="fill-text-primary font-display text-[15px] font-bold tracking-[0.18em] uppercase">
                <textPath href="#hero-ring" textLength="530" lengthAdjust="spacing">
                  {hero.ring}
                </textPath>
              </text>
            </svg>
            <Starburst label={hero.burst} className={cx("size-28 rotate-[8deg] xl:size-32", sticker)} />
          </InView>
        </Piece>

        {/* 3D pieces (after the client's keycap reference): PAID typed out
            on keycaps by a cursor, and a chat bubble that ticks once it is. */}
        <Piece className="end-[6%] top-[46%] xl:end-[6.5%]" enter={950} drift={-120} depth={14} float={false}>
          <HeroKeys />
        </Piece>
        <Piece className="start-[8%] top-[45%] xl:start-[16%] xl:top-[44%]" enter={1050} drift={-70} depth={-26} bob={-2.2}>
          <HeroBubble className="-rotate-6" />
        </Piece>

        {/* Sticker pieces (sprint 10, after the client's flat 3D icon
            reference), each about the product. The coin's eyes follow the
            cursor. The three larger ones need 2xl (1536px) to clear the
            headline; the coin sits under the buttons from xl. */}
        <Piece className="start-[37%] bottom-[5%]" enter={1150} drift={-30} depth={-22} poke="blink" look bob={-3}>
          <CoinBuddy className="size-16 rotate-[-8deg]" />
        </Piece>
        <div className="hidden 2xl:block">
          <Piece className="end-[17%] top-[22%]" enter={1100} drift={-80} depth={26} poke="stamp" bob={-1.4}>
            <InvoiceSticker className="w-24 rotate-[7deg]" />
          </Piece>
          <Piece className="start-[16.5%] top-[24%]" enter={1200} drift={-60} depth={-24} bob={-2.8}>
            <CardBubble className="w-28 -rotate-[5deg]" />
          </Piece>
          <Piece className="end-[21%] top-[60%]" enter={1250} drift={-90} depth={30} poke="spin" bob={-0.8}>
            <RecordShield className="w-16 rotate-[6deg]" />
          </Piece>
        </div>

        {/* Doodles. */}
        <Piece className="start-[24%] top-[7%]" enter={500} drift={-50} depth={34} poke="flip">
          <CoinDoodle className="size-14 text-accent-500" />
        </Piece>
        <Piece className="end-[25%] top-[9%]" enter={600} drift={-70} depth={-30} bob={-2}>
          <CalendarDoodle className="size-14 rotate-6 text-coral-500" />
        </Piece>
        <Piece className="start-[47%] top-[3%]" enter={700} drift={-30} depth={40} poke="spin" float={false}>
          <SparkleDoodle className="size-9 text-teal-500" />
        </Piece>
        <Piece className="start-[25%] bottom-[9%]" enter={750} drift={-80} depth={28} poke="spin" bob={-4}>
          <TickDoodle className="size-14 text-teal-500" />
        </Piece>
        <Piece className="end-[30%] bottom-[6%]" enter={850} drift={-60} depth={-34} poke="spin" bob={-1.6}>
          <ClockDoodle className="size-12 -rotate-6 text-accent-600" />
        </Piece>
        <Piece className="start-[2%] bottom-[5%]" enter={900} drift={-40} depth={20} float={false}>
          <SquiggleDoodle className="w-28 text-coral-400" />
        </Piece>
        {/* Points at "Yes, that's me". */}
        <Piece className="start-[27%] top-[64%] xl:start-[28%]" enter={1000} drift={-20} depth={10} float={false}>
          <ArrowDoodle className="w-24 rotate-[18deg] text-text-primary" />
        </Piece>
      </div>
    </HeroPlay>
  );
}

/** Below xl: the three people in a row of tilted stickers, under the buttons. */
export function HeroPeopleRow() {
  return (
    // gap, not overlap: overlapping neighbours clipped each other's captions.
    <div aria-hidden="true" className="mt-12 flex justify-center gap-2 sm:gap-4 xl:hidden">
      <div className="hero-in w-[31%] max-w-[150px]" style={{ "--d": "250ms" } as CSSProperties}>
        <PhotoSticker {...coordinator} tag={undefined} tilt={-6} tone="sun" size="sm" sizes="150px" />
      </div>
      <div className="hero-in mt-6 w-[31%] max-w-[150px]" style={{ "--d": "400ms" } as CSSProperties}>
        {/* No tag sticker here: at this size it ran off the card. */}
        <PhotoSticker {...financeLead} tag={undefined} tilt={3} tone="teal" size="sm" sizes="150px" />
      </div>
      <div className="hero-in w-[31%] max-w-[150px]" style={{ "--d": "550ms" } as CSSProperties}>
        <PhotoSticker {...investigator} tag={undefined} tilt={-2} tone="coral" size="sm" sizes="150px" />
      </div>
    </div>
  );
}
