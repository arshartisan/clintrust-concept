import type { SVGProps } from "react";
import { cx } from "@/utils/cx";

/**
 * Hand-drawn doodles for the hero concepts (the brief: "hand-drawn doodles and
 * stickers: coins, calendars, ticks"). Drawn with slightly uneven strokes so
 * they read as marker sketches, not icons. All decorative: aria-hidden, and
 * coloured through `currentColor` so a token class sets the ink.
 */

type DoodleProps = SVGProps<SVGSVGElement>;

const stroke = {
  fill: "none",
  stroke: "currentColor",
  strokeWidth: 3,
  strokeLinecap: "round",
  strokeLinejoin: "round",
} as const;

export function CoinDoodle(props: DoodleProps) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" {...props}>
      <path {...stroke} d="M32 6c14 0 26 11.5 25.5 26.5C57 46 46 58 31.5 57.5 17 57 6.5 46 7 31.5 7.5 17 18.5 6 32 6Z" />
      <path {...stroke} strokeWidth={2.5} d="M32 13c10 .2 18.5 8.5 18 19.5-.5 10.5-8.8 18-19 17.6C20.5 49.7 13.4 41.5 14 31c.6-10 8.3-18.2 18-18Z" opacity=".55" />
      <path {...stroke} d="M38 24.5c-1.6-2.2-4-3.2-6.6-3-3.2.3-5.4 2.3-5 4.8.5 3 4.6 3.6 7.2 4.6 2.8 1 4.6 3 4 5.6-.7 2.8-3.6 4.2-6.8 4-2.6-.2-4.6-1.4-5.8-3.4M32 17.5v4M32 40.6v4.4" />
    </svg>
  );
}

export function CalendarDoodle(props: DoodleProps) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" {...props}>
      <path {...stroke} d="M10.5 15.5c14-1 29-1.3 43.5-.5 1 12.5 1.2 25 .3 38.2-14.5.8-29 .9-43.6.3-.9-12.6-1-25.3-.2-38Z" />
      <path {...stroke} d="M10.8 25.5c14.4-.6 28.6-.7 43.2-.2M21 9.5v10M43 9v10.5" />
      <path {...stroke} d="M20 33.5l9.5 11M29.8 33.3 19.6 44.8" />
      <path {...stroke} strokeWidth={2.5} d="M38 34h7M38 41.5h7" opacity=".55" />
    </svg>
  );
}

export function TickDoodle(props: DoodleProps) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" {...props}>
      <path {...stroke} d="M33 6.5c13.5-.5 25 9.5 24.5 24.5-.5 14.5-11 26-25.5 26C17.5 57 6.5 46.5 7 32 7.5 18 18.8 7 33 6.5Z" />
      <path {...stroke} strokeWidth={4} d="M19.5 33.5l8.5 8.5L45 22.5" />
    </svg>
  );
}

export function ClockDoodle(props: DoodleProps) {
  return (
    <svg viewBox="0 0 64 64" aria-hidden="true" {...props}>
      <path {...stroke} d="M31 7c14-.6 26 10 26 25 0 14-11 25.5-25.5 25.3C17 57 6.6 46 7 31.7 7.4 18 17.7 7.6 31 7Z" />
      <path {...stroke} d="M32 17.5V33l9.5 6" />
      <path {...stroke} strokeWidth={2} d="M4 10l5 4M60 10l-5 4" />
    </svg>
  );
}

export function SquiggleDoodle(props: DoodleProps) {
  return (
    <svg viewBox="0 0 120 32" aria-hidden="true" {...props}>
      <path {...stroke} d="M4 20c8-12 14-12 18 0s10 12 18 0 12-12 18 0 10 12 18 0 12-12 18 0 10 10 18 0" />
    </svg>
  );
}

export function SparkleDoodle(props: DoodleProps) {
  return (
    <svg viewBox="0 0 48 48" aria-hidden="true" {...props}>
      <path {...stroke} d="M24 4c1 9 4.8 14.2 20 20-15 5.5-19 10.5-20 20-1.5-9.6-5.4-14.4-20-20 14.6-5.2 18.8-11 20-20Z" />
    </svg>
  );
}

export function ArrowDoodle(props: DoodleProps) {
  return (
    <svg viewBox="0 0 96 64" aria-hidden="true" {...props}>
      <path {...stroke} d="M6 10c20-6 44 0 52 16 6 12-2 22-12 18s-6-18 8-20c14-2 28 6 36 22" />
      <path {...stroke} d="M78 34.5l12.5 11.8-15.3 4.2" />
    </svg>
  );
}

/**
 * A rubber "PAID" stamp with a tick, for the answer moment. Coral ink,
 * tilted. Carries real text for its label, so it is not hidden.
 */
export function PaidStamp({ className, label = "Paid" }: { className?: string; label?: string }) {
  return (
    <span
      className={cx(
        "inline-flex items-center gap-1.5 rounded-xl border-[3px] border-coral-600 bg-background-primary-default px-3 py-1 font-display text-title-2-semibold tracking-wider text-coral-600 uppercase",
        className,
      )}
    >
      <TickDoodle className="size-7" />
      {label}
    </span>
  );
}
