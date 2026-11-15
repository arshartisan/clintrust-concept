"use client";

import { useEffect, useRef, useState, type ReactNode } from "react";
import { RiCheckLine } from "@remixicon/react";
import { steps } from "@/content/landing";
import { cx } from "@/utils/cx";
import { container, SectionHeading } from "./frame";
import { Reveal } from "./reveal";

/**
 * Record, Reconcile, Pay: a real sequence, so the steps are numbered.
 *
 * Two layouts, chosen in CSS by the `pinned:` variant (styles/brand.css):
 *
 *   pinned    Desktop-size screens (at least 1024px wide and 640px tall). The
 *             section sticks to the viewport while a tall track scrolls past
 *             behind it, and the scroll position picks the step. No timers:
 *             the visitor's own scrolling is the animation.
 *   stacked   Everything else (phones, tablets, short windows). Pinning a
 *             block taller than the screen traps content off-screen, so here
 *             the three steps are simply laid out one after another.
 */

const PINNED_QUERY = "(min-width: 1024px) and (min-height: 640px)";
const PANELS = [RecordPanel, ReconcilePanel, PayPanel];
const HEADING = {
  title: "From completed visit to settled payment.",
  continuation: "Three steps, one record, no invoices to chase.",
};

export function HowItWorks() {
  const trackRef = useRef<HTMLDivElement>(null);
  const [active, setActive] = useState(0);

  useEffect(() => {
    const track = trackRef.current;
    if (!track) return;
    const pinned = window.matchMedia(PINNED_QUERY);
    let frame = 0;

    const measure = () => {
      frame = 0;
      if (!pinned.matches) return;
      const rect = track.getBoundingClientRect();
      const scrollable = rect.height - window.innerHeight;
      if (scrollable <= 0) return;
      const progress = Math.min(0.9999, Math.max(0, -rect.top / scrollable)) * steps.length;
      const index = Math.floor(progress);
      // Progress within the step drives the rail fill directly in CSS;
      // React only re-renders when the step itself changes.
      track.style.setProperty("--step-progress", (progress - index).toFixed(3));
      setActive(index);
    };
    const onScroll = () => {
      if (!frame) frame = requestAnimationFrame(measure);
    };

    measure();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll, { passive: true });
    return () => {
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
      if (frame) cancelAnimationFrame(frame);
    };
  }, []);

  /** Clicking a step scrolls the page to that step's stretch of the track. */
  const goTo = (index: number) => {
    const track = trackRef.current;
    if (!track) return;
    const scrollable = track.offsetHeight - window.innerHeight;
    const top = track.getBoundingClientRect().top + window.scrollY;
    window.scrollTo({ top: top + ((index + 0.5) / steps.length) * scrollable });
  };

  const ActivePanel = PANELS[active];

  return (
    <section id="how-it-works" className="scroll-mt-16 border-t border-separator-border">
      <div className={container}>
        {/* Pinned layout. The track's height is the scroll distance for all three steps. */}
        <div ref={trackRef} className="hidden pinned:block pinned:h-[300vh]">
          <div className="sticky top-0 flex h-dvh flex-col justify-center pt-20">
            <Reveal>
              <SectionHeading {...HEADING} />
            </Reveal>

            <div className="mt-10 grid grid-cols-12 gap-12">
              <ol className="col-span-5">
                {steps.map((step, index) => {
                  const selected = index === active;
                  return (
                    <li key={step.id} className="relative border-s border-separator-border">
                      {selected ? (
                        <span
                          aria-hidden="true"
                          className="absolute inset-y-0 -start-px w-px origin-top bg-linear-to-b from-accent-400 to-brand-blue-600 [scale:1_var(--step-progress,0)]"
                        />
                      ) : null}
                      <button
                        type="button"
                        aria-current={selected ? "step" : undefined}
                        onClick={() => goTo(index)}
                        className="group w-full cursor-pointer rounded-e-xl py-5 ps-6 pe-4 text-start outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring"
                      >
                        <span
                          className={cx(
                            "flex items-baseline gap-3 text-subsection transition-colors duration-150",
                            selected ? "text-text-primary" : "text-text-tertiary group-hover:text-text-secondary",
                          )}
                        >
                          <span className="text-body-medium tabular-nums">{index + 1}</span>
                          {step.name}
                        </span>
                        <span
                          className={cx(
                            "grid transition-[grid-template-rows,opacity] duration-300 ease-out",
                            selected ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0",
                          )}
                        >
                          <span className="overflow-hidden">
                            <span className="block max-w-[44ch] ps-6 pt-3 text-body-regular text-text-secondary">
                              {step.text}
                            </span>
                          </span>
                        </span>
                      </button>
                    </li>
                  );
                })}
              </ol>

              <div className="col-span-7">
                <Stage>
                  {/* Keyed: mounting the next panel replays the panel-in entrance. */}
                  <div key={steps[active].id} className="panel-in w-full max-w-[440px]">
                    <ActivePanel />
                  </div>
                </Stage>
                <p className="mt-3 text-caption-1-regular text-text-secondary">Illustrative data.</p>
              </div>
            </div>
          </div>
        </div>

        {/* Stacked layout: every step and its panel, in order. */}
        <div className="py-20 pinned:hidden">
          <Reveal>
            <SectionHeading {...HEADING} />
          </Reveal>
          <ol className="mt-12 flex flex-col gap-12">
            {steps.map((step, index) => {
              const StepPanel = PANELS[index];
              return (
                <li key={step.id} className="grid gap-6 md:grid-cols-2 md:items-center md:gap-10">
                  <div>
                    <h3 className="flex items-baseline gap-3 text-subsection text-text-primary">
                      <span className="text-body-medium tabular-nums text-text-secondary">{index + 1}</span>
                      {step.name}
                    </h3>
                    <p className="mt-3 max-w-[48ch] text-body-regular text-text-secondary">{step.text}</p>
                  </div>
                  <Stage compact>
                    <div className="w-full max-w-[440px]">
                      <StepPanel />
                    </div>
                  </Stage>
                </li>
              );
            })}
          </ol>
          <p className="mt-3 text-caption-1-regular text-text-secondary">Illustrative data.</p>
        </div>
      </div>
    </section>
  );
}

function Stage({ children, compact }: { children: ReactNode; compact?: boolean }) {
  return (
    <div
      className={cx(
        "flex items-center justify-center rounded-3xl border border-border-button-default bg-background-secondary-default",
        compact ? "p-4 sm:p-6" : "h-[380px] p-10",
      )}
    >
      {children}
    </div>
  );
}

/* -------------------------------------------------------------------------- */
/*  Step panels                                                                */
/* -------------------------------------------------------------------------- */

function Panel({ title, meta, children }: { title: string; meta: string; children: ReactNode }) {
  return (
    <div className="overflow-hidden rounded-2xl border border-border-button-default bg-background-primary-default shadow-lg">
      <div className="flex items-center justify-between gap-4 border-b border-separator-border px-5 py-3.5">
        <p className="text-body-medium text-text-primary">{title}</p>
        <p className="text-body-2-regular text-text-secondary">{meta}</p>
      </div>
      {children}
    </div>
  );
}

function RecordPanel() {
  const fields = [
    ["Subject", "0042"],
    ["Visit", "Cycle 2, day 1"],
    ["Procedures", "6 logged"],
  ];
  const checks = ["Matched to the EDC entry", "Inside the protocol window", "Source data verified"];

  return (
    <Panel title="Visit record" meta="Site SG-014">
      <dl className="grid grid-cols-3 gap-px bg-separator-border">
        {fields.map(([label, value]) => (
          <div key={label} className="bg-background-primary-default px-4 py-4 sm:px-5">
            <dt className="text-body-2-regular text-text-secondary">{label}</dt>
            <dd className="mt-0.5 text-body-medium text-text-primary">{value}</dd>
          </div>
        ))}
      </dl>
      <ul className="flex flex-col gap-3 border-t border-separator-border px-5 py-5">
        {checks.map((check) => (
          <li key={check} className="flex items-center gap-2.5 text-body-regular text-text-primary">
            <span className="flex size-5 items-center justify-center rounded-full bg-accent-100 text-accent-700">
              <RiCheckLine className="size-3.5" aria-hidden="true" />
            </span>
            {check}
          </li>
        ))}
      </ul>
    </Panel>
  );
}

function ReconcilePanel() {
  const lines = [
    { item: "Cycle visit, per protocol", amount: "$1,150", score: 99 },
    { item: "PK sampling, 4 draws", amount: "$640", score: 97 },
    { item: "CT scan, unscheduled", amount: "$890", score: 71 },
  ];

  return (
    <Panel title="Budget match" meta="3 line items">
      <ul>
        {lines.map((line) => {
          const flagged = line.score < 90;
          return (
            <li key={line.item} className="border-b border-separator-border px-5 py-4 last:border-b-0">
              <div className="flex items-baseline justify-between gap-4">
                <p className="text-body-medium text-text-primary">{line.item}</p>
                <p className="text-body-medium tabular-nums text-text-primary">{line.amount}</p>
              </div>
              <div className="mt-2.5 flex items-center gap-3">
                <span className="h-1 flex-1 overflow-hidden rounded-full bg-background-tertiary-default">
                  <span
                    className={cx("block h-full rounded-full", flagged ? "bg-chart-8-active" : "bg-accent-400")}
                    style={{ width: `${line.score}%` }}
                  />
                </span>
                <span className="w-32 text-end text-caption-1-medium tabular-nums text-text-secondary">
                  {flagged ? `${line.score}%, needs review` : `${line.score}% confidence`}
                </span>
              </div>
            </li>
          );
        })}
      </ul>
    </Panel>
  );
}

function PayPanel() {
  const timeline = [
    { label: "Verified", day: "Day 0" },
    { label: "Funded", day: "Day 2" },
    { label: "Settled", day: "Day 5" },
  ];

  return (
    <Panel title="Payable 2041-118" meta="Site SG-014">
      <div className="grid grid-cols-2 gap-px bg-separator-border">
        <div className="bg-background-primary-default px-5 py-4">
          <p className="text-body-2-regular text-text-secondary">Approved</p>
          <p className="mt-0.5 text-title-2-medium tabular-nums text-text-primary">$2,680.00</p>
          <p className="text-body-2-regular text-text-secondary">US dollars</p>
        </div>
        <div className="bg-background-primary-default px-5 py-4">
          <p className="text-body-2-regular text-text-secondary">Site receives</p>
          <p className="mt-0.5 text-title-2-medium tabular-nums text-text-primary">S$3,611.03</p>
          <p className="text-body-2-regular text-text-secondary">at 1.3474, shown before payout</p>
        </div>
      </div>
      <ol className="grid grid-cols-3 border-t border-separator-border px-5 py-5">
        {timeline.map((point, index) => (
          <li key={point.label} className="relative">
            <span className="flex items-center" aria-hidden="true">
              <span className="size-2 rounded-full bg-accent-500" />
              {index < timeline.length - 1 ? <span className="h-px flex-1 bg-accent-300" /> : null}
            </span>
            <p className="mt-2.5 text-body-medium text-text-primary">{point.label}</p>
            <p className="text-body-2-regular text-text-secondary">{point.day}</p>
          </li>
        ))}
      </ol>
    </Panel>
  );
}
