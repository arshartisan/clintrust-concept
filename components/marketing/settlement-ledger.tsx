"use client";

import { useEffect, useRef, useState } from "react";
import { StatusDot } from "@/components/base/badges/status-dot";
import { useCountUp } from "@/hooks/use-count-up";
import { useInView, usePrefersReducedMotion } from "@/hooks/use-in-view";
import { cx } from "@/utils/cx";

/**
 * The hero's one staged moment: a live settlement ledger. Site visits enter
 * as Recorded, move to Reconciled, then Paid, and the "paid this cycle" total
 * rolls up as they land. All data is illustrative.
 *
 * Motion is CSS only. Each row is absolutely positioned and placed with
 * `translate`, so reordering is a compositor-only transition (no layout, no
 * animation library). A new row slides in from above (`.ledger-row-in`) in
 * step with the rows moving down, so rows never overlap. The timer stops while the ledger is off screen, the tab
 * is hidden, or the visitor prefers reduced motion.
 */

const STAGES = ["Recorded", "Reconciled", "Paid"] as const;

interface Visit {
  site: string;
  visit: string;
  amount: number;
}

// Fixed order (no randomness) so server and client render the same first frame.
const POOL: Visit[] = [
  { site: "SG-014", visit: "Cycle 2, day 1", amount: 4280 },
  { site: "KR-031", visit: "Screening", amount: 1150 },
  { site: "AU-007", visit: "Cycle 1, day 15", amount: 2960 },
  { site: "TW-022", visit: "End of treatment", amount: 3410 },
  { site: "MY-005", visit: "Cycle 3, day 1", amount: 4280 },
  { site: "TH-018", visit: "Follow-up, week 12", amount: 890 },
  { site: "SG-009", visit: "Cycle 1, day 1", amount: 5120 },
  { site: "KR-012", visit: "Unscheduled visit", amount: 640 },
];

interface Row extends Visit {
  id: number;
  stage: number;
}

interface LedgerState {
  rows: Row[];
  cursor: number;
  paid: number;
}

const INITIAL: LedgerState = {
  rows: [
    { ...POOL[4], id: 4, stage: 0 },
    { ...POOL[3], id: 3, stage: 1 },
    { ...POOL[2], id: 2, stage: 2 },
    { ...POOL[1], id: 1, stage: 2 },
    { ...POOL[0], id: 0, stage: 2 },
  ],
  cursor: 5,
  paid: 184_390,
};

const VISIBLE_ROWS = 5;
const ROW_PX = 62;
const TICK_MS = 2400;

function advance(state: LedgerState): LedgerState {
  let paid = state.paid;
  const moved = state.rows.map((row) => {
    if (row.stage >= 2) return row;
    const stage = row.stage + 1;
    if (stage === 2) paid += row.amount;
    return { ...row, stage };
  });
  const next: Row = { ...POOL[state.cursor % POOL.length], id: state.cursor, stage: 0 };
  return {
    // One row more than is visible: the oldest slides below the clip and is
    // dropped on the following tick, so it never disappears in view.
    rows: [next, ...moved].slice(0, VISIBLE_ROWS + 1),
    cursor: state.cursor + 1,
    paid,
  };
}

const usd = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function SettlementLedger({ className }: { className?: string }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref);
  const reduced = usePrefersReducedMotion();
  const [state, setState] = useState(INITIAL);
  const paid = useCountUp(state.paid, 600);
  const running = inView && !reduced;

  useEffect(() => {
    if (!running) return;
    const timer = window.setInterval(() => {
      if (!document.hidden) setState(advance);
    }, TICK_MS);
    return () => window.clearInterval(timer);
  }, [running]);

  return (
    <figure
      ref={ref}
      className={cx(
        "overflow-hidden rounded-3xl border-2 border-text-primary bg-background-primary-default shadow-sticker-lg",
        className,
      )}
    >
      <figcaption className="flex items-center justify-between gap-4 border-b border-separator-border px-5 py-4">
        <div>
          <p className="text-body-medium text-text-primary">Site payments</p>
          <p className="text-body-2-regular text-text-secondary">Protocol ONC-2041, phase III</p>
        </div>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-border-button-default px-2.5 py-1 text-caption-1-medium text-text-secondary">
          <StatusDot color="green" />
          Live
        </span>
      </figcaption>

      {/* Fixed height: rows move inside it, the panel never resizes the hero. */}
      <ul
        className="relative overflow-hidden"
        style={{ height: VISIBLE_ROWS * ROW_PX }}
        aria-label="Recent site visits and their payment status"
      >
        {state.rows.map((row, index) => (
          <li
            key={row.id}
            aria-hidden={index >= VISIBLE_ROWS}
            style={{ height: ROW_PX, translate: `0 ${index * ROW_PX}px` }}
            className={cx(
              "absolute inset-x-0 top-0 grid grid-cols-[1fr_auto] items-center gap-x-4 border-b border-separator-border px-5 sm:grid-cols-[1fr_auto_128px]",
              "transition-[translate] duration-[400ms] ease-[cubic-bezier(0.22,1,0.36,1)] will-change-[translate]",
              row.id >= INITIAL.cursor && "ledger-row-in",
            )}
          >
            <div className="min-w-0">
              <p className="truncate text-body-medium text-text-primary">{row.site}</p>
              <p className="truncate text-body-2-regular text-text-secondary">{row.visit}</p>
            </div>
            <div className="text-end">
              <p className="text-body-medium tabular-nums text-text-primary">{usd.format(row.amount)}</p>
              <StageLabel stage={row.stage} className="sm:hidden" />
            </div>
            <div className="hidden flex-col gap-1.5 sm:flex">
              <div className="flex gap-1" aria-hidden="true">
                {STAGES.map((name, stageIndex) => (
                  <span
                    key={name}
                    className={cx(
                      "h-1 flex-1 rounded-full transition-colors duration-200 ease-out",
                      // Blue while a payment is in progress, teal once it is paid.
                      stageIndex > row.stage
                        ? "bg-background-tertiary-default"
                        : row.stage === 2
                          ? "bg-accent-400"
                          : "bg-coral-400",
                    )}
                  />
                ))}
              </div>
              <StageLabel stage={row.stage} />
            </div>
          </li>
        ))}
      </ul>

      <div className="grid grid-cols-2 gap-px bg-separator-border">
        <div className="bg-background-primary-default px-5 py-4">
          <p className="text-body-2-regular text-text-secondary">Paid this cycle</p>
          <p className="text-title-2-medium tabular-nums text-text-primary">{usd.format(paid)}</p>
        </div>
        <div className="bg-background-primary-default px-5 py-4">
          <p className="text-body-2-regular text-text-secondary">Final invoice</p>
          <p className="text-title-2-medium tabular-nums text-text-primary">T+5</p>
        </div>
      </div>
    </figure>
  );
}

function StageLabel({ stage, className }: { stage: number; className?: string }) {
  return (
    // Keyed so each stage change replays BoardUI's label-in swap.
    <p
      key={stage}
      className={cx(
        "animate-label-in text-caption-1-medium",
        stage === 2 ? "text-accent-600" : "text-text-secondary",
        className,
      )}
    >
      {STAGES[stage]}
    </p>
  );
}
