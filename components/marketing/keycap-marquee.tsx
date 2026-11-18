import { hero } from "@/content/landing";
import { cx } from "@/utils/cx";
import { SparkleDoodle } from "./doodles";
import { InView } from "./in-view";

/** Face and side colours, cycled along the strip. */
const TONES = [
  { face: "bg-accent-300", side: "bg-linear-to-br from-accent-500 to-coral-400" },
  { face: "bg-background-primary-default", side: "bg-linear-to-br from-accent-200 to-coral-300" },
  { face: "bg-teal-300", side: "bg-linear-to-br from-teal-500 to-brand-blue-400" },
  { face: "bg-coral-300", side: "bg-linear-to-br from-coral-600 to-accent-400" },
];

function Key({ label, index }: { label: string; index: number }) {
  const tone = TONES[index % TONES.length];
  return (
    <span className="relative inline-flex shrink-0">
      <span className={cx("absolute inset-0 translate-x-[4px] translate-y-[6px] rounded-2xl border-2 border-text-primary", tone.side)} />
      <span
        className={cx(
          "relative rounded-2xl border-2 border-text-primary px-5 py-2.5 font-display text-title-3-bold whitespace-nowrap text-text-primary sm:px-6 sm:py-3 sm:text-title-2-bold",
          "shadow-[inset_0_-4px_0_0_color-mix(in_srgb,var(--color-text-primary)_14%,transparent)]",
          tone.face,
        )}
      >
        {label}
      </span>
    </span>
  );
}

/**
 * A strip of 3D keycaps that loops sideways under the hero (after
 * overflow.sui.io's keycap marquee), set on a slightly tilted band like a
 * strip of tape. The phrases are a decorative echo of the page, so the strip
 * is hidden from assistive technology. Motion: `.km-*` in styles/brand.css.
 */
export function KeycapMarquee() {
  const phrases = hero.marquee;
  // Two copies: the track slides by exactly one copy's width, then repeats.
  const copies = [0, 1];
  return (
    <InView className="relative overflow-x-clip py-6 sm:py-10">
      <div
        aria-hidden="true"
        className="km-band -mx-4 -rotate-[1.5deg] overflow-hidden border-y-2 border-text-primary bg-accent-100 py-4 sm:py-5"
      >
        {/* Physical direction on purpose: the strip is decorative motion. */}
        <div dir="ltr" className="km-track flex w-max">
          {copies.map((copy) => (
            <div key={copy} className="flex shrink-0 items-center gap-5 pe-5 sm:gap-7 sm:pe-7">
              {phrases.map((phrase, index) => (
                <span key={phrase} className="flex items-center gap-5 sm:gap-7">
                  <Key label={phrase} index={index} />
                  <SparkleDoodle className="size-7 shrink-0 text-coral-500" />
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
    </InView>
  );
}
