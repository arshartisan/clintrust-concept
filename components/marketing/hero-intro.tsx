"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { RiCheckLine, RiPauseLine, RiPlayLine } from "@remixicon/react";
import { Button, ButtonLink } from "@/components/base/buttons/button";
import { StarBorderLink } from "@/components/base/buttons/star-border-button";
import { hero } from "@/content/landing";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cx } from "@/utils/cx";
import { track } from "@/utils/track";

const QUESTIONS = hero.questions;
/** Question 1, answer, question 2, answer, … : two steps per question. */
const STEPS = QUESTIONS.length * 2;

/**
 * The hero's text block. Per the brief, "one large question rotates every ~4
 * seconds, then flips to its answer": each question shows for `intervalMs`,
 * flips to the answer for `answerMs`, then the next question comes in. Below
 * it, the two actions (and, in the left-aligned layout, the lead).
 *
 * Every line is in the DOM, stacked in one grid cell, so the block is always
 * as tall as its tallest line and nothing below it moves as it rotates. Only
 * the current line is visible and exposed to assistive technology.
 *
 * The first question is painted in the first frame (it is the page's LCP).
 * Rotation can be paused (WCAG 2.2.2) and does not start under reduced
 * motion. So that the answer is never hidden there, a static copy of it sits
 * under the question whenever the visitor asks for reduced motion. That copy
 * is switched on by CSS (`motion-reduce:`), not script, so server and client
 * render the same thing and nothing shifts on load.
 *
 * `centered`: the centred hero (sprint 9). Bigger, chunkier headline, and
 * every row centred.
 */
export function HeroIntro({ centered = false }: { centered?: boolean }) {
  const [step, setStep] = useState(0);
  // null until the visitor presses the button; until then reduced motion decides.
  const [userPaused, setUserPaused] = useState<boolean | null>(null);
  const reducedMotion = useReducedMotion();
  const paused = userPaused ?? reducedMotion;

  const question = Math.floor(step / 2);
  const showingAnswer = step % 2 === 1;

  useEffect(() => {
    if (paused) return;
    const timer = window.setTimeout(
      () => setStep((current) => (current + 1) % STEPS),
      showingAnswer ? hero.answerMs : hero.intervalMs,
    );
    return () => window.clearTimeout(timer);
  }, [step, paused, showingAnswer]);

  const togglePaused = () => {
    track("hero_rotation_toggle", { action: paused ? "play" : "pause", question: question + 1 });
    setUserPaused(!paused);
  };

  // Which line was showing when an action was clicked.
  const context = { location: "hero", question: showingAnswer ? "answer" : question + 1 };

  const lineClass = (active: boolean) =>
    cx(
      "col-start-1 row-start-1 transition-[opacity,translate,filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
      // Centred hero: each line sits in the middle of the slot, so spare
      // space splits evenly above and below.
      centered && "self-center",
      active ? "opacity-100" : "pointer-events-none translate-y-3 opacity-0 blur-[2px]",
    );

  return (
    <>
      <h1
        className={cx(
          "hero-settle grid text-hero text-balance text-text-primary",
          centered && "mx-auto max-w-[16ch] justify-items-center text-center text-poster",
        )}
      >
        {QUESTIONS.map((line, index) => {
          const active = !showingAnswer && index === question;
          return (
            <span key={line} aria-hidden={!active} className={lineClass(active)}>
              {line}
            </span>
          );
        })}
        {/* The answer, built as a left-aligned checklist (the block itself is
            centred in the slot). Each showing re-mounts the rows so their
            entrance plays again: a row slides in, its tick pops, and the last
            row gets the highlighter. One size down from the questions, so
            the slot stays the height of the longest question. */}
        <span
          aria-hidden={!showingAnswer}
          className={cx(lineClass(showingAnswer), "text-section text-start", centered && "justify-self-center")}
        >
          <span key={showingAnswer ? `answer-${step}` : "answer"} className="flex flex-col gap-2 sm:gap-3">
            {hero.answerParts.map((part, index) => (
              <span
                key={part}
                className={cx("flex items-center gap-3 sm:gap-4", showingAnswer && "answer-row-in")}
                style={{ "--i": index } as CSSProperties}
              >
                <span className="answer-tick flex size-8 shrink-0 items-center justify-center rounded-full border-2 border-text-primary bg-teal-400 text-text-primary sm:size-10">
                  <RiCheckLine className="size-4 sm:size-5" aria-hidden="true" />
                </span>
                <span className={cx(index === hero.answerParts.length - 1 && "concept-highlight")}>{part}</span>
              </span>
            ))}
          </span>
        </span>
      </h1>

      {/* Reduced motion: the rotation does not run, so show the answer under
          the question. Hidden again once the visitor presses play. */}
      {userPaused === false ? null : (
        <p
          className={cx(
            "hero-settle mt-4 hidden text-headline-semibold text-pretty text-accent-700 motion-reduce:block",
            centered && "mx-auto max-w-[40ch] text-center",
          )}
        >
          {hero.answer}
        </p>
      )}

      <div className={cx("mt-5 flex items-center gap-3", centered && "justify-center")}>
        <Button
          variant="secondary"
          size="small"
          iconOnly
          leadingIcon={paused ? RiPlayLine : RiPauseLine}
          aria-label={paused ? hero.playLabel : hero.pauseLabel}
          aria-pressed={paused}
          onClick={togglePaused}
        />
        {/* One dot per question; the answer belongs to whichever question is
            current. The button is a 24px tap target round the small dot;
            picking one restarts from that question. */}
        <div className="flex" role="group" aria-label="Choose a question">
          {QUESTIONS.map((line, index) => {
            const current = index === question;
            return (
              <button
                key={line}
                type="button"
                aria-label={`Show question ${index + 1}`}
                aria-current={current}
                onClick={() => {
                  track("hero_question_pick", { location: "hero", question: index + 1 });
                  setStep(index * 2);
                }}
                className="group/dot flex h-6 min-w-6 cursor-pointer items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring"
              >
                <span
                  className={cx(
                    "h-1.5 rounded-full transition-[width,background-color] duration-300",
                    current
                      ? cx("w-6", showingAnswer ? "bg-accent-600" : "bg-accent-500")
                      : "w-1.5 bg-background-tertiary-default group-hover/dot:w-3 group-hover/dot:bg-accent-200",
                  )}
                />
              </button>
            );
          })}
        </div>
      </div>

      {/* The centred hero carries only what the brief lists: the questions,
          the answer and the two buttons. */}
      {centered ? null : (
        <p className="hero-settle mt-6 max-w-[52ch] text-headline-regular text-pretty text-text-secondary">{hero.lead}</p>
      )}

      <div
        className={cx("hero-in flex flex-wrap items-center gap-3", centered ? "mt-9 justify-center" : "mt-7")}
        style={{ "--d": "120ms" } as CSSProperties}
      >
        <StarBorderLink href={hero.primaryCta.href} onClick={() => track("hero_yes_thats_me", context)}>
          {hero.primaryCta.label}
        </StarBorderLink>
        <ButtonLink href={hero.secondaryCta.href} variant="secondary" onClick={() => track("request_demo_click", context)}>
          {hero.secondaryCta.label}
        </ButtonLink>
      </div>
    </>
  );
}
