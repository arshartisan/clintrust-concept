"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "@/hooks/use-in-view";
import { useReducedMotion } from "@/hooks/use-reduced-motion";

const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

interface CountUpProps {
  /** The finished figure, e.g. "70–80%" or "$15M". Every number in it counts up from 0. */
  value: string;
  durationMs?: number;
  className?: string;
}

/**
 * A figure that counts up from zero the first time it scrolls into view (the
 * brief: "counters that count up"). The same pattern as the waiting counter:
 * the server renders the finished value, so it is right without script and
 * under reduced motion. Screen readers get the finished value only.
 */
export function CountUp({ value, durationMs = 1400, className }: CountUpProps) {
  const ref = useRef<HTMLSpanElement>(null);
  const inView = useInView(ref, { once: true, rootMargin: "0px 0px -15% 0px" });
  const reducedMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!inView || reducedMotion) return;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, Math.max(0, (now - start) / durationMs));
      setProgress(easeOutCubic(t));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reducedMotion, durationMs]);

  const shown = reducedMotion ? 1 : progress;
  const text = value.replace(/\d+(?:\.\d+)?/g, (match) => String(Math.round(Number(match) * shown)));

  return (
    <span ref={ref} className={className}>
      <span aria-hidden="true">{text}</span>
      <span className="sr-only">{value}</span>
    </span>
  );
}
