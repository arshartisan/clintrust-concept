"use client";

import { RiCheckLine, RiLineChartLine } from "@remixicon/react";
import { hero, heroConcepts } from "@/content/landing";
import { useRotation } from "@/hooks/use-rotation";
import { cx } from "@/utils/cx";
import { Confetti } from "@/components/marketing/confetti";
import { ArrowDoodle, CoinDoodle, SparkleDoodle } from "@/components/marketing/doodles";
import { HeroActions } from "./hero-actions";
import { PhotoSticker } from "@/components/marketing/photo-sticker";
import { RotationControls } from "./rotation-controls";

const ITEMS = [...hero.questions, hero.answer];
const ANSWER = ITEMS.length - 1;
const LOCATION = "concept-b";
const concept = heroConcepts.items[1];

/**
 * Concept B, "Your cash flow called": the brief's own copy line as the
 * headline, and the worries arriving one by one as chat messages from the
 * visitor's cash flow. On the last step ClinTrust replies in teal with the
 * answer (and a little confetti). Beside the chat, real people on sticker
 * cards (photo slots until photos are cleared).
 *
 * Messages build up rather than replace each other, so the chat has a fixed
 * height with every bubble's space reserved: nothing below it moves. Under
 * reduced motion, before the visitor touches the controls, the whole
 * conversation shows at once.
 */
export function HeroCashFlowCalled() {
  const rotation = useRotation({ count: ITEMS.length, intervalMs: hero.intervalMs, lastMs: hero.answerMs });
  const { index } = rotation;
  const shown = rotation.autoPaused ? ITEMS.length : index + 1;

  return (
    <section className="relative isolate overflow-hidden bg-background-primary-default">
      <div className="mx-auto grid w-full max-w-[1200px] items-center gap-12 px-6 py-14 sm:px-8 lg:min-h-[calc(100svh-7.5rem)] lg:grid-cols-12 lg:gap-10 lg:px-12 lg:py-16">
        <div className="lg:col-span-7">
          <h1 className="font-display text-poster text-text-primary">
            {concept.chatHeadline}{" "}
            <span className="concept-highlight">{concept.chatHeadlineContinuation}</span>
          </h1>

          {/* The chat. Each bubble stays in the layout and fades in when its turn comes. */}
          <div className="relative mt-8 max-w-[560px] rounded-3xl border-2 border-text-primary bg-sun-50 p-4 shadow-[5px_5px_0_0_var(--color-text-primary)] sm:p-5">
            <div className="flex items-center gap-2.5 border-b-2 border-dashed border-sun-300 pb-3">
              <span className="flex size-9 items-center justify-center rounded-full bg-coral-600 text-text-white">
                <RiLineChartLine className="size-5" aria-hidden="true" />
              </span>
              <span className="font-display text-headline-semibold text-text-primary">{concept.chatFrom}</span>
              <span className="ms-auto text-caption-1-medium text-text-tertiary">{concept.chatStatus}</span>
            </div>

            <ol className="mt-4 flex flex-col gap-2.5">
              {ITEMS.map((line, lineIndex) => {
                const visible = lineIndex < shown;
                const isAnswer = lineIndex === ANSWER;
                return (
                  <li
                    key={line}
                    aria-hidden={!visible}
                    className={cx(
                      "relative max-w-[88%] rounded-2xl px-4 py-2.5 font-friendly text-body-medium text-pretty",
                      isAnswer
                        ? "ms-auto rounded-ee-md border-2 border-text-primary bg-teal-600 text-text-white"
                        : "rounded-es-md bg-background-primary-default text-text-primary shadow-xs",
                      visible ? "concept-bubble" : "invisible",
                    )}
                  >
                    {isAnswer ? (
                      <>
                        <span className="mb-1 flex items-center gap-1.5 text-caption-1-semibold text-teal-100">
                          <RiCheckLine className="size-4" aria-hidden="true" />
                          {concept.chatReplyFrom}
                        </span>
                        {line}
                        {visible && !rotation.autoPaused ? <Confetti key={`burst-${index}`} /> : null}
                      </>
                    ) : (
                      line
                    )}
                  </li>
                );
              })}
            </ol>
          </div>

          <RotationControls
            className="mt-6"
            count={ITEMS.length}
            index={index}
            paused={rotation.paused}
            onToggle={rotation.togglePaused}
            onPick={rotation.setIndex}
            location={LOCATION}
          />

          <p className="mt-5 max-w-[46ch] font-friendly text-lead text-pretty text-text-secondary">{hero.lead}</p>
          <HeroActions className="mt-7" location={LOCATION} question={index === ANSWER ? "answer" : index + 1} />
        </div>

        {/* People. Two stickers, overlapping, with doodles around them. */}
        <div className="relative mx-auto w-full max-w-[420px] lg:col-span-5 lg:max-w-none">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            <CoinDoodle className="concept-float absolute -start-2 top-[2%] size-14 text-sun-500" />
            <SparkleDoodle className="absolute end-[6%] -top-4 size-9 text-coral-500" />
            <ArrowDoodle className="absolute start-[30%] bottom-[-2%] hidden w-24 -rotate-12 text-teal-500 sm:block" />
          </div>
          <div className="relative grid grid-cols-2 gap-4 pt-6">
            <PhotoSticker role={concept.people[0].role} tag={concept.people[0].tag} tilt={-4} tone="sun" />
            <PhotoSticker role={concept.people[1].role} tag={concept.people[1].tag} tilt={3} tone="teal" className="mt-16" />
          </div>
        </div>
      </div>
    </section>
  );
}
