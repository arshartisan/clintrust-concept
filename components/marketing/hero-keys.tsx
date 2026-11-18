import type { CSSProperties } from "react";
import { RiCheckLine } from "@remixicon/react";
import { hero } from "@/content/landing";
import { cx } from "@/utils/cx";
import { InView } from "./in-view";

/**
 * Chunky 3D pieces for the hero (sprint 9, after the client's keyboard-keycap
 * reference): keycaps that type out PAID, a cursor that clicks the last key,
 * and a chat bubble that goes from "typing…" to a tick.
 *
 * Built in the site's sticker language rather than true isometric: every piece
 * is a face with a 2px ink outline sitting on an offset "side" layer, the same
 * down-right offset as the sticker shadows. The sides carry a two-colour
 * gradient, the reference's one funky touch, in the brand's yellow, coral and
 * teal.
 *
 * Motion is CSS only (`.hk-*` in styles/brand.css), runs only while the hero
 * is on screen (InView) and is off under reduced motion. At rest every piece
 * reads on its own: keys up, cursor on the D, bubble showing its tick. All
 * three loops share one 5s cycle, so the bubble ticks right after the D press.
 */

const TONES = {
  sun: { face: "bg-accent-300", side: "bg-linear-to-br from-accent-500 to-coral-400" },
  coral: { face: "bg-coral-400", side: "bg-linear-to-br from-coral-600 to-accent-400" },
  teal: { face: "bg-teal-300", side: "bg-linear-to-br from-teal-500 to-brand-blue-400" },
  paper: { face: "bg-background-primary-default", side: "bg-linear-to-br from-accent-200 to-coral-300" },
} as const;

type Tone = keyof typeof TONES;
const KEY_TONES: Tone[] = ["coral", "paper", "teal", "sun"];

/** One keycap: a face that presses down into its side layer. */
function Keycap({ letter, tone, index, cursor = false }: { letter: string; tone: Tone; index: number; cursor?: boolean }) {
  return (
    <span className="relative block size-(--k)" style={{ "--i": index } as CSSProperties}>
      <span className={cx("absolute inset-0 translate-x-[5px] translate-y-[7px] rounded-2xl border-2 border-text-primary", TONES[tone].side)} />
      <span
        className={cx(
          "hk-key absolute inset-0 flex items-center justify-center rounded-2xl border-2 border-text-primary font-display text-title-1-bold text-text-primary uppercase",
          // The keycap's dish: a darker band along the bottom of the face.
          "shadow-[inset_0_-5px_0_0_color-mix(in_srgb,var(--color-text-primary)_14%,transparent)]",
          TONES[tone].face,
        )}
      >
        {letter}
      </span>
      {cursor ? <Cursor className="absolute start-[70%] top-[66%] z-10 w-9 xl:w-10" /> : null}
    </span>
  );
}

/** A chunky arrow pointer with a hard ink shadow. Its tip is the SVG's top-left. */
function Cursor({ className }: { className?: string }) {
  const arrow = "M3 2.5V37l9-8 6.2 14.2 7.4-3.2-6.2-13.8H31Z";
  return (
    <svg viewBox="0 0 38 50" className={cx("hk-cursor overflow-visible", className)} aria-hidden="true">
      <path d={arrow} transform="translate(3 4)" className="fill-text-primary" />
      <path d={arrow} className="fill-background-primary-default stroke-text-primary" strokeWidth="2.5" strokeLinejoin="round" />
    </svg>
  );
}

/** PAID on four staggered keycaps, the cursor resting on the D. */
export function HeroKeys({ className }: { className?: string }) {
  const letters = hero.keys.split("");
  return (
    <InView className={cx("[--k:3.5rem] xl:[--k:4rem]", className)}>
      {/* The word reads left to right in every language direction. */}
      <div dir="ltr" className="grid -rotate-[9deg] grid-cols-[repeat(2,var(--k))] gap-x-3 gap-y-4">
        {letters.map((letter, index) => (
          <span key={`${letter}-${index}`} className={cx(index >= 2 && "translate-x-[calc(var(--k)*0.45)]")}>
            <Keycap letter={letter} tone={KEY_TONES[index % KEY_TONES.length]} index={index} cursor={index === letters.length - 1} />
          </span>
        ))}
      </div>
    </InView>
  );
}

/** A speech bubble: typing dots, then a tick once PAID has been typed. */
export function HeroBubble({ className }: { className?: string }) {
  const body = "M30 4h60a24 24 0 0 1 0 48H36L15 67l5-19.5A24 24 0 0 1 30 4Z";
  return (
    <InView className={cx("relative w-28 xl:w-32", className)}>
      <svg viewBox="0 0 120 72" className="block w-full overflow-visible" aria-hidden="true">
        <defs>
          <linearGradient id="hero-bubble-side" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" style={{ stopColor: "var(--color-coral-400)" }} />
            <stop offset="1" style={{ stopColor: "var(--color-brand-blue-400)" }} />
          </linearGradient>
        </defs>
        <path d={body} transform="translate(5 7)" fill="url(#hero-bubble-side)" className="stroke-text-primary" strokeWidth="2.5" strokeLinejoin="round" />
        <path d={body} className="fill-background-primary-default stroke-text-primary" strokeWidth="2.5" strokeLinejoin="round" />
      </svg>
      {/* Over the bubble's body (its top 52 of 72 units), the two states share one cell. */}
      <div className="absolute inset-x-0 top-0 grid h-[78%] place-items-center">
        <span className="hk-dots col-start-1 row-start-1 flex gap-1.5">
          {[0, 1, 2].map((dot) => (
            <span
              key={dot}
              className="hk-dot size-3.5 rounded-full border-2 border-text-primary bg-background-primary-default"
              style={{ "--i": dot } as CSSProperties}
            />
          ))}
        </span>
        <span className="hk-tick col-start-1 row-start-1 flex size-9 items-center justify-center rounded-full border-2 border-text-primary bg-teal-400 text-text-primary">
          <RiCheckLine className="size-5" aria-hidden="true" />
        </span>
      </div>
    </InView>
  );
}
