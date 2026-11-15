"use client";

import { useState } from "react";
import { Slider } from "@/components/base/slider/slider";
import { useCountUp } from "@/hooks/use-count-up";

const MIN = 25;
const MAX = 500;
const ESCROW_RATE = 0.2;
const BUFFER_RATE = 0.05;

/** $M with at most two decimals: 20 -> "$20M", 1.25 -> "$1.25M". */
const millions = (value: number) =>
  `$${value.toLocaleString("en-US", { maximumFractionDigits: 2 })}M`;

/** Shared by the widget and its loading placeholder so both are one size. */
export const capitalCardClass =
  "min-h-[434px] sm:min-h-[459px] lg:min-h-[474px] rounded-3xl border border-border-button-default bg-background-secondary-default p-6 sm:p-8";

/** The interactive escrow model. Loaded on demand: see lazy-widgets.tsx. */
export function CapitalWidget() {
  const [portfolio, setPortfolio] = useState(100);

  const escrow = portfolio * ESCROW_RATE;
  const buffer = portfolio * BUFFER_RATE;
  // useCountUp rounds to integers, so roll in hundredths of a million.
  const released = useCountUp(Math.round((escrow - buffer) * 100), 320) / 100;

  const scale = MAX * ESCROW_RATE;

  return (
    <div className={capitalCardClass}>
      <Slider
        label="Annual trial payment portfolio"
        value={portfolio}
        onChange={setPortfolio}
        minValue={MIN}
        maxValue={MAX}
        step={25}
        formatValue={(value) => millions(value)}
      />

      <div className="mt-10 flex flex-col gap-6">
        <Bar label="Escrow held today" value={millions(escrow)} width={(escrow / scale) * 100} tone="muted" />
        <Bar label="Buffer with ClinTrust" value={millions(buffer)} width={(buffer / scale) * 100} tone="accent" />
      </div>

      <div className="mt-10 border-t border-separator-border pt-8">
        <p className="text-body-medium text-text-secondary">Capital released</p>
        <p className="mt-2 text-figure tabular-nums text-accent-300" aria-live="polite">
          {millions(released)}
        </p>
      </div>
    </div>
  );
}

function Bar({
  label,
  value,
  width,
  tone,
}: {
  label: string;
  value: string;
  width: number;
  tone: "muted" | "accent";
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-4">
        <p className="text-body-medium text-text-secondary">{label}</p>
        <p className="text-title-2-medium tabular-nums text-text-primary">{value}</p>
      </div>
      <div className="mt-2.5 h-2 overflow-hidden rounded-full bg-background-tertiary-default" aria-hidden="true">
        {/* scale, not width: resizing the bar never triggers layout. */}
        <div
          className={
            tone === "accent"
              ? "h-full origin-left rounded-full bg-accent-400 transition-[scale] duration-300 ease-out"
              : "h-full origin-left rounded-full bg-foreground-icon-tertiary transition-[scale] duration-300 ease-out"
          }
          style={{ scale: `${Math.max(width, 1) / 100} 1` }}
        />
      </div>
    </div>
  );
}
