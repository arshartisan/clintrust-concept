"use client";

import { useEffect, useState, type CSSProperties } from "react";
import { RiPauseLine, RiPlayLine } from "@remixicon/react";
import { Button, ButtonLink } from "@/components/base/buttons/button";
import { StarBorderLink } from "@/components/base/buttons/star-border-button";
import { hero } from "@/content/landing";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cx } from "@/utils/cx";
import { track } from "@/utils/track";

const ITEMS = [...hero.questions, hero.answer];
const ANSWER = ITEMS.length - 1;

/**
 * The hero's text block: a headline that rotates through the visitor's
 * worries and then flips to the answer, the one-line explanation, and the
 * two actions.
 *
 * Every line is in the DOM, stacked in one grid cell, so the block is always
 * as tall as its longest line and nothing below it moves as it rotates. Only
 * the current line is visible and exposed to assistive technology.
 *
 * The first question is painted in the first frame (it is the page's LCP).
 * Rotation can be paused (WCAG 2.2.2) and does not start under reduced
 * motion; the play button still steps through the lines there.
 */
export function HeroIntro() {
  const [index, setIndex] = useState(0);
  // null until the visitor presses the button; until then reduced motion decides.
  const [userPaused, setUserPaused] = useState<boolean | null>(null);
  const reducedMotion = useReducedMotion();
  const paused = userPaused ?? reducedMotion;

  useEffect(() => {
    if (paused) return;
    const timer = window.setTimeout(
      () => setIndex((current) => (current + 1) % ITEMS.length),
      index === ANSWER ? hero.answerMs : hero.intervalMs,
    );
    return () => window.clearTimeout(timer);
  }, [index, paused]);

  const togglePaused = () => {
    track("hero_rotation_toggle", { action: paused ? "play" : "pause", question: index + 1 });
    setUserPaused(!paused);
  };

  // Which line was showing when an action was clicked.
  const context = { location: "hero", question: index === ANSWER ? "answer" : index + 1 };

  return (
    <>
      <h1 className="hero-settle grid text-hero text-balance text-text-primary">
        {ITEMS.map((line, lineIndex) => {
          const active = lineIndex === index;
          return (
            <span
              key={line}
              aria-hidden={!active}
              className={cx(
                "col-start-1 row-start-1 transition-[opacity,translate,filter] duration-500 ease-[cubic-bezier(0.22,1,0.36,1)] motion-reduce:transition-none",
                lineIndex === ANSWER && "text-accent-600",
                active ? "opacity-100" : "pointer-events-none translate-y-3 opacity-0 blur-[2px]",
              )}
            >
              {line}
            </span>
          );
        })}
      </h1>

      <div className="mt-5 flex items-center gap-3">
        <Button
          variant="secondary"
          size="small"
          iconOnly
          leadingIcon={paused ? RiPlayLine : RiPauseLine}
          aria-label={paused ? hero.playLabel : hero.pauseLabel}
          aria-pressed={paused}
          onClick={togglePaused}
        />
        {/* Each dot jumps to its line. The button is a 24px tap target around
            the small visible dot; picking a line restarts that line's timer. */}
        <div className="flex" role="group" aria-label="Choose a question">
          {ITEMS.map((line, lineIndex) => {
            const current = lineIndex === index;
            return (
              <button
                key={line}
                type="button"
                aria-label={lineIndex === ANSWER ? "Show the answer" : `Show question ${lineIndex + 1}`}
                aria-current={current}
                onClick={() => {
                  track("hero_question_pick", { location: "hero", question: lineIndex === ANSWER ? "answer" : lineIndex + 1 });
                  setIndex(lineIndex);
                }}
                className="group/dot flex h-6 cursor-pointer items-center rounded-full px-[3px] outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring"
              >
                <span
                  className={cx(
                    "h-1.5 rounded-full transition-[width,background-color] duration-300",
                    current
                      ? "w-6 bg-accent-500"
                      : "w-1.5 bg-background-tertiary-default group-hover/dot:w-3 group-hover/dot:bg-accent-200",
                  )}
                />
              </button>
            );
          })}
        </div>
      </div>

      <p className="hero-settle mt-6 max-w-[52ch] text-headline-regular text-pretty text-text-secondary">{hero.lead}</p>

      <div className="hero-in mt-7 flex flex-wrap items-center gap-3" style={{ "--d": "120ms" } as CSSProperties}>
        <StarBorderLink
          href={hero.primaryCta.href}
          onClick={() => track("hero_yes_thats_me", context)}
        >
          {hero.primaryCta.label}
        </StarBorderLink>
        <ButtonLink
          href={hero.secondaryCta.href}
          variant="secondary"
          onClick={() => track("request_demo_click", context)}
        >
          {hero.secondaryCta.label}
        </ButtonLink>
      </div>
    </>
  );
}
