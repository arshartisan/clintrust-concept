import type { CSSProperties } from "react";
import { cx } from "@/utils/cx";
import { InView } from "./in-view";

type Meter =
  | { kind: "percent"; value: number; from?: number }
  | { kind: "live" }
  | { kind: "start" }
  | { kind: "down" }
  | { kind: "full" };

interface Stat {
  figure: string;
  label: string;
  meter: Meter;
}

/**
 * A row of stats, each a meter above a figure card (sprint 7, after an
 * "efficiency metrics" report reference).
 *
 * Only real percentages are plotted: a "percent" meter shows a 0-100% scale,
 * a marker at the value and, with `from`, a shaded range. Figures that are
 * not numbers ("Real time", "Day 1", "Fewer", "Native") get an indicator
 * with no scale, so nothing reads as a number that does not exist.
 *
 * The bars fill once when the row comes on screen (`.meter-*` in brand.css,
 * keyed off InView's `data-inview`); at rest they show their final state.
 */
export function StatMeters({ stats }: { stats: readonly Stat[] }) {
  return (
    <InView once className="mt-14">
      <dl className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {stats.map((stat, index) => (
          <div key={stat.label} className="flex flex-col" style={{ "--d": `${index * 120}ms` } as CSSProperties}>
            <MeterBar meter={stat.meter} />
            <div className="mt-3 flex flex-1 flex-col-reverse justify-end rounded-2xl bg-background-tertiary-default p-6">
              <dt className="mt-6 text-body-2-regular text-text-secondary">{stat.label}</dt>
              <dd className="text-display-4-medium tracking-tight text-text-primary">{stat.figure}</dd>
            </div>
          </div>
        ))}
      </dl>
    </InView>
  );
}

/** Scale labels and marker row above the bar. */
function Scale({ left, right, at }: { left: string; right: string; at?: number }) {
  return (
    <div aria-hidden="true" className="relative flex h-5 items-end justify-between text-caption-2-semibold text-text-tertiary">
      <span>{left}</span>
      {at !== undefined ? (
        <span
          className="meter-marker absolute bottom-0.5 size-0 -translate-x-1/2 border-x-[5px] border-t-[6px] border-x-transparent border-t-text-primary"
          style={{ left: `${at}%` }}
        />
      ) : null}
      <span>{right}</span>
    </div>
  );
}

function MeterBar({ meter }: { meter: Meter }) {
  const track = "relative mt-1.5 flex h-10 gap-1 overflow-hidden rounded-xl";
  const rest = "h-full flex-1 rounded-xl bg-background-tertiary-default";

  if (meter.kind === "percent") {
    return (
      <div aria-hidden="true">
        <Scale left="0%" right="100%" at={meter.value} />
        <div className={track}>
          <div className="meter-fill relative h-full rounded-xl bg-accent-500" style={{ width: `${meter.value}%` }}>
            {meter.from !== undefined ? (
              // The low end of a range, e.g. 70 of 70-80%: the band above it is lighter.
              <span
                className="absolute inset-y-0 end-0 rounded-e-xl bg-accent-300"
                style={{ width: `${((meter.value - meter.from) / meter.value) * 100}%` }}
              />
            ) : null}
          </div>
          <div className={rest} />
        </div>
      </div>
    );
  }

  if (meter.kind === "live") {
    return (
      <div aria-hidden="true">
        <Scale left="Event" right="Visible" />
        <div className={track}>
          <div className="meter-fill relative h-full w-full overflow-hidden rounded-xl bg-accent-500">
            <span className="meter-sweep absolute inset-y-0 w-1/3 bg-linear-to-r from-transparent via-accent-300 to-transparent" />
          </div>
        </div>
      </div>
    );
  }

  if (meter.kind === "start") {
    return (
      <div aria-hidden="true">
        <Scale left="Day 1" right="Day 140" />
        <div className={track}>
          <div className="meter-fill h-full w-[8%] rounded-xl bg-accent-500" />
          <div className={rest} />
        </div>
      </div>
    );
  }

  if (meter.kind === "down") {
    return (
      <div aria-hidden="true">
        <Scale left="Before" right="With ClinTrust" />
        <div className={track}>
          <div className="meter-shrink h-full w-[30%] rounded-xl bg-brand-blue-400" />
          <div className={rest} />
        </div>
      </div>
    );
  }

  return (
    <div aria-hidden="true">
      <Scale left="EDC" right="CTMS" />
      <div className={cx(track, "items-center")}>
        <div className="meter-fill flex h-full w-full items-center justify-center rounded-xl bg-accent-500 text-caption-1-semibold text-text-white">
          Built in
        </div>
      </div>
    </div>
  );
}
