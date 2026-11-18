import type { CSSProperties } from "react";
import { hero } from "@/content/landing";
import { CalendarDoodle, ClockDoodle, CoinDoodle, PaidStamp, SparkleDoodle, SquiggleDoodle, TickDoodle } from "./doodles";
import { PhotoSticker } from "./photo-sticker";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/**
 * The hero's picture (sprint 9; replaces the isometric platform scene, per
 * the brief: "hand-drawn doodles and stickers (coins, calendars, ticks) plus
 * real people … Fewer interface mockups").
 *
 * Three people on tilted photo stickers (a site coordinator, a finance lead,
 * an investigator), each with a tag, scattered over hand-drawn doodles and a
 * PAID stamp. The stickers settle in one after another (`.hero-in`, the
 * hero's existing staged entrance); the doodles bob gently (`.concept-float`).
 * Both are off under reduced motion. Entirely decorative except the roles and
 * tags, which are real text.
 *
 * Stock photos for now (see `hero.people` in content/landing.ts).
 */
export function HeroStickers({ className }: { className?: string }) {
  const [coordinator, financeLead, investigator] = hero.people;

  return (
    <div className={className}>
      <div className="relative mx-auto aspect-[6/5] w-full max-w-[560px]">
        {/* Doodles behind and around the stickers. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0">
          <CoinDoodle className="concept-float absolute start-[2%] top-[4%] size-14 text-accent-500 sm:size-16" />
          <CalendarDoodle
            className="concept-float absolute end-[0%] top-[36%] size-14 rotate-6 text-coral-500 sm:size-16"
            style={{ animationDelay: "-2s" }}
          />
          <ClockDoodle
            className="concept-float absolute start-[36%] bottom-[0%] size-12 -rotate-6 text-teal-500 sm:size-14"
            style={{ animationDelay: "-4s" }}
          />
          <TickDoodle className="absolute end-[6%] bottom-[4%] size-12 text-teal-500 sm:size-14" />
          <SparkleDoodle className="absolute start-[46%] top-[0%] size-8 text-coral-400" />
          <SquiggleDoodle className="absolute start-[-4%] bottom-[22%] w-24 text-accent-400" />
        </div>

        {/* Three people, overlapping, each tilted a little. */}
        <div className="hero-in absolute start-[6%] top-[14%] w-[38%]" style={delay(150)}>
          <PhotoSticker role={coordinator.role} tag={coordinator.tag} photo={coordinator.photo} focus={coordinator.focus} tilt={-5} tone="sun" sizes="(min-width: 1024px) 210px, 38vw" />
        </div>
        <div className="hero-in absolute start-[34%] top-[2%] w-[36%]" style={delay(300)}>
          <PhotoSticker role={financeLead.role} tag={financeLead.tag} photo={financeLead.photo} focus={financeLead.focus} tilt={3} tone="teal" sizes="(min-width: 1024px) 200px, 36vw" />
        </div>
        <div className="hero-in absolute end-[4%] top-[30%] w-[36%]" style={delay(450)}>
          <PhotoSticker role={investigator.role} tag={investigator.tag} photo={investigator.photo} focus={investigator.focus} tilt={-2} tone="coral" sizes="(min-width: 1024px) 200px, 36vw" />
        </div>

        <div className="hero-in absolute start-[30%] bottom-[6%]" style={delay(650)}>
          <PaidStamp className="-rotate-[8deg] text-headline-semibold sm:text-title-2-semibold" />
        </div>
      </div>
    </div>
  );
}
