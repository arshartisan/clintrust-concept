"use client";

import { RiArrowDownLine } from "@remixicon/react";
import { ButtonLink } from "@/components/base/buttons/button";
import { hero } from "@/content/landing";
import { cx } from "@/utils/cx";
import { track } from "@/utils/track";
import { stickerPrimary, stickerSecondary } from "./sticker-styles";

interface HeroActionsProps {
  /** Tracking location, e.g. "concept-a". */
  location: string;
  /** Which line was showing when the action was clicked. */
  question: number | "answer";
  className?: string;
}

/**
 * The hero's two actions as sticker buttons. The concept routes are not the
 * home page, so both go to the home page's sections.
 */
export function HeroActions({ location, question, className }: HeroActionsProps) {
  const context = { location, question };
  return (
    <div className={cx("flex flex-wrap items-center gap-3", className)}>
      <ButtonLink
        href={`/${hero.primaryCta.href}`}
        variant="secondary"
        trailingIcon={RiArrowDownLine}
        className={cx(stickerPrimary)}
        onClick={() => track("hero_yes_thats_me", context)}
      >
        {hero.primaryCta.label}
      </ButtonLink>
      <ButtonLink
        href={`/${hero.secondaryCta.href}`}
        variant="secondary"
        className={cx(stickerSecondary)}
        onClick={() => track("request_demo_click", context)}
      >
        {hero.secondaryCta.label}
      </ButtonLink>
    </div>
  );
}
