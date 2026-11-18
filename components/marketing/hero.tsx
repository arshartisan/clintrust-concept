import { HeroDecor, HeroPeopleRow } from "./hero-decor";
import { HeroIntro } from "./hero-intro";

/**
 * Hero (sprint 9): full width and full screen, after the client's reference
 * and the brief ("Bright, full-screen, mostly white with one sunny accent").
 *
 * The rotating question is centred and large (hero-intro.tsx, `centered`),
 * with the two actions under it. Round it, across the whole width, the
 * brief's imagery: real people on photo stickers, hand-drawn doodles, a
 * starburst and a PAID stamp (hero-decor.tsx). Behind: a faint square grid
 * fading out toward the edges and two soft glows, yellow left, coral right.
 *
 * No 1200px column here: the decoration spreads to the screen edges. Phones
 * and tablets get the people as a row of stickers under the buttons.
 */
export function Hero() {
  return (
    // overflow-x-clip: glows and tilted stickers bleed past the edges and must not widen the page.
    <section id="top" className="relative overflow-x-clip">
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <span className="absolute top-[18%] start-[6%] size-[460px] rounded-full [background:radial-gradient(closest-side,color-mix(in_srgb,var(--color-accent-300)_45%,transparent),transparent)] max-sm:size-[260px]" />
        <span className="absolute top-[8%] end-[4%] size-[500px] rounded-full [background:radial-gradient(closest-side,color-mix(in_srgb,var(--color-coral-300)_35%,transparent),transparent)] max-sm:size-[260px]" />
        <span className="absolute inset-0 [background-image:linear-gradient(var(--color-separator-border)_1px,transparent_1px),linear-gradient(90deg,var(--color-separator-border)_1px,transparent_1px)] [background-position:center_top] [background-size:72px_72px] [mask-image:radial-gradient(ellipse_50%_55%_at_50%_45%,black_30%,transparent_80%)]" />
      </div>

      <HeroDecor />

      <div className="pointer-events-none relative z-10 mx-auto flex w-full flex-col items-center justify-center px-6 py-16 sm:px-8 sm:py-20 lg:min-h-[max(720px,calc(100svh-4.5rem))] lg:py-20">
        {/* Click-through outside the text, so the stickers behind still get hover. */}
        <div className="pointer-events-auto w-full max-w-[760px]">
          <HeroIntro centered />
        </div>
        <HeroPeopleRow />
      </div>
    </section>
  );
}
