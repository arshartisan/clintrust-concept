import { RiAddLine } from "@remixicon/react";
import { cx } from "@/utils/cx";
import { container } from "./frame";
import { HeroCards } from "./hero-cards";
import { HeroIntro } from "./hero-intro";

/**
 * Hero (sprint 9, after the client's "mindset health" reference): the
 * rotating question headline centred and large (hero-intro.tsx, `centered`),
 * the lead and both actions centred under it, and small sticker cards
 * floating round it (hero-cards.tsx: people at work, a pre-invoice).
 *
 * Behind: a faint square grid with a few crosshair marks, fading out toward
 * the edges, and two soft glows (sunny yellow on the left, coral on the
 * right). Decorative only.
 *
 * Below `lg` the floating cards are hidden (they would cover the headline);
 * the headline, lead and buttons stay centred.
 */
export function Hero() {
  return (
    // overflow-x-clip: glows and tilted cards bleed past the column and must not widen the page.
    <section id="top" className="relative overflow-x-clip">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {/* Glows. */}
        <span className="absolute top-[18%] start-[8%] size-[420px] rounded-full [background:radial-gradient(closest-side,color-mix(in_srgb,var(--color-accent-300)_45%,transparent),transparent)] max-sm:size-[260px]" />
        <span className="absolute top-[10%] end-[6%] size-[460px] rounded-full [background:radial-gradient(closest-side,color-mix(in_srgb,var(--color-coral-300)_35%,transparent),transparent)] max-sm:size-[260px]" />
        {/* Grid: 72px squares, strongest behind the headline. */}
        <span className="absolute inset-x-0 top-0 bottom-0 [background-image:linear-gradient(var(--color-separator-border)_1px,transparent_1px),linear-gradient(90deg,var(--color-separator-border)_1px,transparent_1px)] [background-position:center_top] [background-size:72px_72px] [mask-image:radial-gradient(ellipse_48%_52%_at_50%_42%,black_30%,transparent_80%)]" />
      </div>

      <div className={cx(container, "relative")}>
        {/* Crosshair marks on the grid, desktop only. */}
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 hidden text-foreground-icon-tertiary lg:block">
          <RiAddLine className="absolute start-[24%] top-[14%] size-5" />
          <RiAddLine className="absolute end-[26%] top-[20%] size-5" />
          <RiAddLine className="absolute start-[30%] top-[66%] size-5" />
          <RiAddLine className="absolute end-[30%] top-[72%] size-5" />
        </div>

        <HeroCards />

        <div className="relative z-10 flex flex-col items-center py-16 sm:py-20 lg:min-h-[760px] lg:justify-center lg:py-24">
          <div className="w-full max-w-[760px]">
            <HeroIntro centered />
          </div>
        </div>
      </div>
    </section>
  );
}
