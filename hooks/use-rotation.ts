"use client";

import { useEffect, useState } from "react";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

interface RotationOptions {
  count: number;
  intervalMs: number;
  /** How long the last item (the answer) stays up. */
  lastMs: number;
}

/**
 * Steps through `count` items on a timer, for the rotating hero headlines.
 * Pausable (WCAG 2.2.2). Under reduced motion it starts paused; `autoPaused`
 * tells the caller the pause came from that setting, not from the visitor.
 */
export function useRotation({ count, intervalMs, lastMs }: RotationOptions) {
  const [index, setIndex] = useState(0);
  // null until the visitor presses pause or play; until then reduced motion decides.
  const [userPaused, setUserPaused] = useState<boolean | null>(null);
  const reducedMotion = useReducedMotion();
  const paused = userPaused ?? reducedMotion;
  const last = count - 1;

  useEffect(() => {
    if (paused) return;
    const timer = window.setTimeout(
      () => setIndex((current) => (current + 1) % count),
      index === last ? lastMs : intervalMs,
    );
    return () => window.clearTimeout(timer);
  }, [index, paused, count, last, intervalMs, lastMs]);

  return {
    index,
    setIndex,
    paused,
    autoPaused: userPaused === null && reducedMotion,
    reducedMotion,
    isLast: index === last,
    togglePaused: () => setUserPaused(!paused),
  };
}
