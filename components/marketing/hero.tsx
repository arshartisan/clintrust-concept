import type { CSSProperties } from "react";
import { cx } from "@/utils/cx";
import { container } from "./frame";
import { HeroIntro } from "./hero-intro";
import { HeroScene } from "./hero-scene";
import { InView } from "./in-view";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/**
 * Hero (sprint 8): the visitor's worry first. A rotating question headline
 * (hero-intro.tsx) at the top left over an isometric floor grid, and a large
 * isometric scene that fills the rest and tucks in under the text. The
 * "in stealth" pill and the standards strip were removed on client feedback;
 * the standards now appear once, in the footer.
 *
 * On desktop the scene is pulled up behind the text with a negative margin.
 * That only works because the scene keeps its top-left corner empty (see
 * hero-scene.tsx): change one and check the other. Below `lg` there is no
 * overlap; the scene simply follows the text.
 */
export function Hero() {
  return (
    // overflow-x-clip: the scene and dot field bleed past the column and must not widen the page.
    <section id="top" className="relative overflow-x-clip">
      <div className={cx(container, "relative")}>
        {/* Isometric floor grid: two sets of hairlines at plus and minus 30 degrees,
            strongest behind the scene and fading out toward the edges. */}
        <div
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 [background-image:repeating-linear-gradient(30deg,var(--color-separator-border)_0_1px,transparent_1px_34px),repeating-linear-gradient(150deg,var(--color-separator-border)_0_1px,transparent_1px_34px)] [mask-image:radial-gradient(ellipse_75%_70%_at_62%_58%,black_20%,transparent_78%)]"
        />
        <div className="pt-12 pb-12 lg:pt-16 lg:pb-16">
          <div className="relative z-10 max-w-[600px]">
            <HeroIntro />
          </div>

          {/* lg:w-[70%] sets the scene's size; ms-auto keeps it against the right edge.
              -mt-[240px]: how far the scene's empty top-left corner reaches under the text.
              The two go together: a smaller scene lifts the rack toward the buttons. */}
          <div className="hero-in relative mt-6 lg:ms-auto lg:-me-8 lg:-mt-[240px] lg:w-[70%]" style={delay(200)}>
            <InView className="relative">
              <HeroScene className="h-auto w-full" />
            </InView>
          </div>
        </div>

      </div>
    </section>
  );
}
