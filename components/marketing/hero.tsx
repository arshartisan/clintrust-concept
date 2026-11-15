import type { CSSProperties } from "react";
import { RiShieldCheckLine } from "@remixicon/react";
import { StatusDot } from "@/components/base/badges/status-dot";
import { ButtonLink } from "@/components/base/buttons/button";
import { hero } from "@/content/landing";
import { cx } from "@/utils/cx";
import { container } from "./frame";
import { HeroScene } from "./hero-scene";
import { InView } from "./in-view";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as CSSProperties;

/**
 * Hero: a compact headline block at the top left over an isometric floor
 * grid, a large isometric scene that fills the rest and tucks in under the
 * text, and the standards as a full-width strip of four cells underneath.
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
        <div className="pt-12 pb-8 lg:pt-14 lg:pb-10">
          <div className="relative z-10 max-w-[560px]">
            <p
              className="hero-in inline-flex items-center gap-2 rounded-full border border-border-button-default bg-background-full py-1 ps-2.5 pe-3 text-body-2-medium text-text-secondary"
              style={delay(0)}
            >
              <StatusDot color="green" />
              {hero.status}
            </p>

            {/* hero-settle, not hero-in: this is the LCP and must not start invisible. */}
            <h1 className="hero-settle mt-5 max-w-[15ch] text-hero text-balance text-text-primary">{hero.title}</h1>

            {/* One step under text-lead: the home hero's lead sits beside the scene, not alone. */}
            <p className="hero-settle mt-4 max-w-[52ch] text-headline-regular text-pretty text-text-secondary">{hero.lead}</p>

            <div className="hero-in mt-7 flex flex-wrap items-center gap-3" style={delay(120)}>
              <ButtonLink href={hero.primaryCta.href}>{hero.primaryCta.label}</ButtonLink>
              <ButtonLink href={hero.secondaryCta.href} variant="secondary">
                {hero.secondaryCta.label}
              </ButtonLink>
            </div>
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

        {/* Standards: a full-width strip of four cells under the hero. */}
        <ul className="relative grid grid-cols-2 gap-px border-t border-separator-border bg-separator-border lg:-mx-12 lg:grid-cols-4">
          {hero.compliance.map((item) => (
            <li
              key={item}
              className="flex items-center gap-2.5 bg-background-full px-1 py-5 text-body-medium text-text-secondary sm:px-4 lg:px-12"
            >
              <RiShieldCheckLine className="size-[18px] shrink-0 text-foreground-icon-tertiary" aria-hidden="true" />
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
