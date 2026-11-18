"use client";

import { RiPauseLine, RiPlayLine } from "@remixicon/react";
import { Button } from "@/components/base/buttons/button";
import { hero } from "@/content/landing";
import { cx } from "@/utils/cx";
import { track } from "@/utils/track";

interface RotationControlsProps {
  count: number;
  index: number;
  paused: boolean;
  onToggle: () => void;
  onPick: (index: number) => void;
  /** Tracking location, e.g. "concept-a". */
  location: string;
  className?: string;
}

/**
 * Pause/play plus one dot per line, for the concept heroes. Same behaviour as
 * the live hero's controls (hero-intro.tsx), in the concepts' yellow and ink.
 */
export function RotationControls({ count, index, paused, onToggle, onPick, location, className }: RotationControlsProps) {
  const last = count - 1;
  return (
    <div className={cx("flex items-center gap-3", className)}>
      <Button
        variant="secondary"
        size="small"
        iconOnly
        leadingIcon={paused ? RiPlayLine : RiPauseLine}
        aria-label={paused ? hero.playLabel : hero.pauseLabel}
        aria-pressed={paused}
        onClick={() => {
          track("hero_rotation_toggle", { location, action: paused ? "play" : "pause", question: index + 1 });
          onToggle();
        }}
      />
      <div className="flex" role="group" aria-label="Choose a question">
        {Array.from({ length: count }, (_, lineIndex) => {
          const current = lineIndex === index;
          return (
            <button
              key={lineIndex}
              type="button"
              aria-label={lineIndex === last ? "Show the answer" : `Show question ${lineIndex + 1}`}
              aria-current={current}
              onClick={() => {
                track("hero_question_pick", { location, question: lineIndex === last ? "answer" : lineIndex + 1 });
                onPick(lineIndex);
              }}
              className="group/dot flex h-6 min-w-6 cursor-pointer items-center justify-center rounded-full outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring"
            >
              <span
                className={cx(
                  "h-2 rounded-full transition-[width,background-color] duration-300",
                  current ? "w-7 bg-text-primary" : "w-2 bg-sun-300 group-hover/dot:w-3.5 group-hover/dot:bg-sun-400",
                )}
              />
            </button>
          );
        })}
      </div>
    </div>
  );
}
