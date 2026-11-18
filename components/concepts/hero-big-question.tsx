"use client";

import type { CSSProperties } from "react";
import { hero, heroConcepts } from "@/content/landing";
import { useRotation } from "@/hooks/use-rotation";
import { cx } from "@/utils/cx";
import { Confetti } from "@/components/marketing/confetti";
import { CalendarDoodle, ClockDoodle, CoinDoodle, PaidStamp, SparkleDoodle, SquiggleDoodle, TickDoodle } from "@/components/marketing/doodles";
import { HeroActions } from "./hero-actions";
import { RotationControls } from "./rotation-controls";

const ITEMS = [...hero.questions, hero.answer];
const ANSWER = ITEMS.length - 1;
const LOCATION = "concept-a";
const concept = heroConcepts.items[0];

/**
 * Concept A, "The big question": a full-screen white page with one huge
 * question in the middle, underlined by a yellow highlighter swipe, and
 * hand-drawn doodles round the edges. On the answer the line turns teal, a
 * PAID stamp drops in and a little confetti fires.
 *
 * Every line is stacked in one grid cell (as in the live hero) so the block
 * never changes height while it rotates.
 */
export function HeroBigQuestion() {
  const rotation = useRotation({ count: ITEMS.length, intervalMs: hero.intervalMs, lastMs: hero.answerMs });
  const { index, isLast } = rotation;

  return (
    <section className="relative isolate flex min-h-[calc(100svh-7.5rem)] items-center overflow-hidden bg-background-primary-default">
      {/* Doodles round the edges. Smaller and fewer on phones. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
        <CoinDoodle className="concept-float absolute start-[6%] top-[12%] size-14 text-sun-500 sm:size-20" />
        <CalendarDoodle
          className="concept-float absolute end-[7%] top-[10%] size-14 rotate-6 text-coral-500 sm:size-20"
          style={{ animationDelay: "-2s" } as CSSProperties}
        />
        <ClockDoodle
          className="concept-float absolute start-[9%] bottom-[12%] hidden size-16 -rotate-6 text-teal-500 md:block"
          style={{ animationDelay: "-4s" } as CSSProperties}
        />
        <TickDoodle
          className="concept-float absolute end-[10%] bottom-[14%] hidden size-16 text-teal-500 md:block"
          style={{ animationDelay: "-1s" } as CSSProperties}
        />
        <SparkleDoodle className="absolute start-[22%] top-[6%] hidden size-8 text-coral-400 lg:block" />
        <SparkleDoodle className="absolute end-[24%] bottom-[8%] hidden size-6 text-sun-500 lg:block" />
        <SquiggleDoodle className="absolute end-[4%] top-[46%] hidden w-28 text-sun-400 lg:block" />
      </div>

      <div className="mx-auto flex w-full max-w-[1200px] flex-col items-center px-6 py-16 text-center sm:px-8 lg:px-12">
        <p
          className="concept-pop inline-block -rotate-3 rounded-full border-2 border-text-primary bg-coral-600 px-4 py-1.5 font-display text-body-semibold text-text-white"
        >
          {concept.eyebrow}
        </p>

        <div className="relative mt-8">
          <h1 className="grid max-w-[18ch] font-display text-poster text-balance text-text-primary">
            {ITEMS.map((line, lineIndex) => {
              const active = lineIndex === index;
              return (
                <span
                  key={line}
                  aria-hidden={!active}
                  className={cx(
                    "col-start-1 row-start-1 self-center transition-[opacity,translate,filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                    active ? "opacity-100" : "pointer-events-none translate-y-4 opacity-0 blur-[3px]",
                  )}
                >
                  {lineIndex === ANSWER ? (
                    <span className="text-teal-600">{line}</span>
                  ) : (
                    // Re-keyed per showing so the swipe redraws each time.
                    <span key={active ? `on-${index}` : "off"} className={cx("concept-highlight", active && "concept-highlight-in")}>
                      {line}
                    </span>
                  )}
                </span>
              );
            })}
          </h1>

          {isLast ? (
            <>
              <Confetti key={`burst-${index}`} />
              <PaidStamp className="concept-pop absolute -end-2 -bottom-10 -rotate-[8deg] sm:-end-10 sm:-bottom-8" />
            </>
          ) : null}
        </div>

        <RotationControls
          className="mt-14"
          count={ITEMS.length}
          index={index}
          paused={rotation.paused}
          onToggle={rotation.togglePaused}
          onPick={rotation.setIndex}
          location={LOCATION}
        />

        <p className="mt-6 max-w-[46ch] font-friendly text-lead text-pretty text-text-secondary">{hero.lead}</p>

        <HeroActions
          className="mt-8 justify-center"
          location={LOCATION}
          question={index === ANSWER ? "answer" : index + 1}
        />
      </div>
    </section>
  );
}
