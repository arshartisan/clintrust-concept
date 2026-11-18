"use client";

import { useEffect, useRef, useState } from "react";
import { RiCheckLine } from "@remixicon/react";
import { waiting } from "@/content/landing";
import { useInView } from "@/hooks/use-in-view";
import { useReducedMotion } from "@/hooks/use-reduced-motion";
import { cx } from "@/utils/cx";
import { Section, SectionHeading } from "./frame";
import { Reveal } from "./reveal";

const DURATION_MS = 1800;
const easeOutCubic = (t: number) => 1 - Math.pow(1 - t, 3);

/**
 * Waiting-time counter (sprint 8): the old way against the ClinTrust way.
 * When the panel scrolls into view both day counts roll up from zero on one
 * clock, the bars grow on the same 0 to 140 day scale, and the ClinTrust row
 * gets a small "invoice sent" tick when it lands.
 *
 * The server renders the finished state, so the figures are right without
 * script and under reduced motion (useReducedMotion reports true on the
 * server). With motion allowed the client starts from zero and counts once,
 * on first view.
 */
export function WaitingCounter() {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, rootMargin: "0px 0px -20% 0px" });
  const reducedMotion = useReducedMotion();
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    if (!inView || reducedMotion) return;
    const start = performance.now();
    let frame = 0;
    const tick = (now: number) => {
      const t = Math.min(1, Math.max(0, (now - start) / DURATION_MS));
      setProgress(easeOutCubic(t));
      if (t < 1) frame = requestAnimationFrame(tick);
    };
    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [inView, reducedMotion]);

  const shownProgress = reducedMotion ? 1 : progress;
  const finished = shownProgress >= 1;
  const rows = [
    { ...waiting.oldWay, tone: "old" as const },
    { ...waiting.newWay, tone: "new" as const },
  ];

  return (
    <Section id="waiting">
      <Reveal>
        <SectionHeading title={waiting.title} continuation={waiting.continuation} mark={waiting.mark} markTone="sun" />
      </Reveal>

      <div ref={ref} className="mt-14 grid gap-4 lg:grid-cols-2">
        {rows.map((row) => {
          const shown = Math.round(row.days * shownProgress);
          const isNew = row.tone === "new";
          return (
            <div
              key={row.label}
              className={cx(
                "scroll-pop flex flex-col rounded-3xl border-2 border-text-primary p-6 shadow-sticker sm:p-8",
                isNew
                  ? "bg-teal-50"
                  : "bg-coral-50",
              )}
            >
              <p className="text-body-2-medium text-text-secondary">{row.label}</p>

              <p className="mt-4 flex items-baseline gap-2 text-text-primary">
                {/* The rolling number is decorative; the sentence after it is what is read out. */}
                {/* The prefix ("90–", "≤") joins once the count lands: "90–37" mid-count would read as nonsense. */}
                <span aria-hidden="true" className={cx("text-figure tabular-nums", isNew ? "text-teal-700" : "text-coral-700")}>
                  {finished ? row.prefix : null}
                  {shown}
                </span>
                <span aria-hidden="true" className="text-title-2-medium text-text-secondary">
                  {row.unit}
                </span>
                <span className="sr-only">
                  {row.prefix}
                  {row.days} {row.unit}
                </span>
              </p>

              {/* One shared day scale for both bars. */}
              <div className="relative mt-6 h-3 rounded-full bg-background-tertiary-default" aria-hidden="true">
                {"from" in row ? (
                  // The 90 to 140 day range the old way usually lands in.
                  <span
                    className="absolute inset-y-0 rounded-full bg-coral-300 opacity-40"
                    style={{
                      insetInlineStart: `${(row.from / waiting.scaleDays) * 100}%`,
                      insetInlineEnd: `${100 - (row.days / waiting.scaleDays) * 100}%`,
                    }}
                  />
                ) : null}
                <span
                  className={cx("absolute inset-y-0 start-0 rounded-full", isNew ? "bg-teal-500" : "bg-coral-500")}
                  style={{ width: `${(row.days / waiting.scaleDays) * 100 * shownProgress}%` }}
                />
                {isNew ? (
                  <span
                    className={cx(
                      "absolute top-1/2 flex size-7 -translate-x-1/2 -translate-y-1/2 items-center justify-center rounded-full bg-teal-600 text-text-white shadow-md ring-4 ring-teal-100 transition-[opacity,scale] duration-300 ease-[cubic-bezier(0.34,1.56,0.64,1)] rtl:translate-x-1/2",
                      finished ? "scale-100 opacity-100" : "scale-50 opacity-0",
                    )}
                    style={{ insetInlineStart: `${(row.days / waiting.scaleDays) * 100}%` }}
                  >
                    <RiCheckLine className="size-4" />
                  </span>
                ) : null}
              </div>
              <div className="mt-2 flex justify-between text-caption-1-medium text-text-tertiary" aria-hidden="true">
                <span>Day 0</span>
                <span>Day {waiting.scaleDays}</span>
              </div>

              <p className="mt-6 max-w-[52ch] text-body-regular text-pretty text-text-secondary">{row.text}</p>
            </div>
          );
        })}
      </div>

      <p className="mt-6 max-w-[70ch] text-body-2-regular text-pretty text-text-tertiary">{waiting.note}</p>
    </Section>
  );
}
