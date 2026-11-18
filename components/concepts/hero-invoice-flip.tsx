"use client";

import { useEffect, useState } from "react";
import { hero, heroConcepts } from "@/content/landing";
import { useRotation } from "@/hooks/use-rotation";
import { cx } from "@/utils/cx";
import { Confetti } from "@/components/marketing/confetti";
import { CalendarDoodle, ClockDoodle, CoinDoodle, PaidStamp, SparkleDoodle, SquiggleDoodle } from "@/components/marketing/doodles";
import { HeroActions } from "./hero-actions";
import { RotationControls } from "./rotation-controls";

const ANSWER = hero.questions.length;
const COUNT = ANSWER + 1;
const LOCATION = "concept-c";
const concept = heroConcepts.items[2];

/**
 * Counts from `from` to `to` over `ms` when `run` turns true, and back to
 * `from` when it turns false. Jumps straight to the end under reduced motion.
 */
function useCountTo(run: boolean, from: number, to: number, ms: number, instant: boolean) {
  const [value, setValue] = useState(from);
  useEffect(() => {
    if (!run || instant) {
      const frame = requestAnimationFrame(() => setValue(run ? to : from));
      return () => cancelAnimationFrame(frame);
    }
    let frame = 0;
    const start = performance.now();
    const step = (now: number) => {
      const t = Math.min(1, (now - start) / ms);
      const eased = 1 - Math.pow(1 - t, 3);
      setValue(Math.round(from + (to - from) * eased));
      if (t < 1) frame = requestAnimationFrame(step);
    };
    frame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(frame);
  }, [run, from, to, ms, instant]);
  return value;
}

/**
 * Concept C, "The invoice flip": a short chunky headline on the left, and a
 * big yellow invoice card on the right. The card's front asks the current
 * question; on the answer it flips over to a white card stamped PAID, and a
 * day counter under it runs 140 down to one month.
 *
 * Both faces are always in the DOM (stacked in one grid cell, so the card's
 * height never changes); the face turned away is hidden from assistive tech.
 */
export function HeroInvoiceFlip() {
  const rotation = useRotation({ count: COUNT, intervalMs: hero.intervalMs, lastMs: hero.answerMs });
  const { index, isLast } = rotation;
  // The front keeps showing the last question while it turns away.
  const frontQuestion = hero.questions[Math.min(index, ANSWER - 1)];
  const days = useCountTo(isLast, concept.counterFrom, concept.counterTo, 1200, rotation.reducedMotion);

  return (
    <section className="relative isolate overflow-hidden bg-background-primary-default">
      <div className="mx-auto grid w-full max-w-[1200px] items-center gap-12 px-6 py-14 sm:px-8 lg:min-h-[calc(100svh-7.5rem)] lg:grid-cols-12 lg:gap-12 lg:px-12 lg:py-16">
        <div className="lg:col-span-5">
          <p className="inline-flex items-center gap-2 rounded-full bg-sun-100 px-3 py-1 font-display text-body-2-semibold text-sun-700">
            <CoinDoodle className="size-5" />
            {concept.eyebrow}
          </p>
          <h1 className="mt-5 font-display text-poster text-text-primary">
            <span className="concept-highlight">{concept.headline}</span>
          </h1>
          <p className="mt-6 max-w-[40ch] font-friendly text-lead text-pretty text-text-secondary">{hero.lead}</p>

          <RotationControls
            className="mt-7"
            count={COUNT}
            index={index}
            paused={rotation.paused}
            onToggle={rotation.togglePaused}
            onPick={rotation.setIndex}
            location={LOCATION}
          />
          <HeroActions className="mt-7" location={LOCATION} question={index === ANSWER ? "answer" : index + 1} />
        </div>

        <div className="relative lg:col-span-7">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0 -z-10">
            <SparkleDoodle className="absolute -start-3 -top-6 size-10 text-coral-500" />
            <SquiggleDoodle className="absolute -end-2 -bottom-8 w-32 text-teal-400" />
            <ClockDoodle className="concept-float absolute -end-4 -top-8 hidden size-16 rotate-12 text-coral-500 sm:block" />
          </div>

          <div className="concept-flip relative">
            <div className="concept-flip-inner" data-flipped={isLast}>
              {/* Front: the question, on a yellow invoice. */}
              <div
                aria-hidden={isLast}
                className="flex min-h-[320px] flex-col rounded-[2rem] border-2 border-text-primary bg-sun-300 p-7 shadow-[6px_6px_0_0_var(--color-text-primary)] sm:min-h-[380px] sm:p-10"
              >
                <div className="flex items-center justify-between gap-4 border-b-2 border-dashed border-text-primary/30 pb-4">
                  <span className="font-display text-headline-semibold text-text-primary">{concept.cardEyebrow}</span>
                  <CalendarDoodle className="size-10 text-coral-600" />
                </div>
                <p
                  key={frontQuestion}
                  className="concept-bubble my-auto pt-6 font-display text-poster-sm text-balance text-text-primary"
                >
                  {frontQuestion}
                </p>
              </div>

              {/* Back: the answer, stamped. */}
              <div
                aria-hidden={!isLast}
                className="relative flex min-h-[320px] flex-col rounded-[2rem] border-2 border-text-primary bg-background-primary-default p-7 shadow-[6px_6px_0_0_var(--color-text-primary)] sm:min-h-[380px] sm:p-10"
              >
                <div className="flex items-center justify-between gap-4 border-b-2 border-dashed border-teal-300 pb-4">
                  <span className="font-display text-headline-semibold text-teal-700">{concept.cardBackEyebrow}</span>
                  <PaidStamp className={cx("-rotate-[8deg]", isLast && "concept-pop")} />
                </div>
                <p className="my-auto pt-6 font-display text-poster-sm text-balance text-teal-600">
                  {hero.answer}
                </p>
                {isLast ? <Confetti key={`burst-${index}`} /> : null}
              </div>
            </div>
          </div>

          {/* The day counter. */}
          <p className="mt-8 flex items-baseline gap-3">
            <span
              className={cx(
                "font-display text-counter tabular-nums transition-colors duration-500",
                isLast ? "text-teal-600" : "text-coral-600",
              )}
            >
              {days}
            </span>
            <span className="font-friendly text-body-medium text-text-secondary">{concept.counterLabel}</span>
          </p>
        </div>
      </div>
    </section>
  );
}
