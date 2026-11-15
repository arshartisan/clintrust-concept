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
 * Hero (sprint 5): a compact headline block at the top left, and a large
 * isometric scene that fills the rest and tucks in under the text.
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

            <p className="hero-settle mt-5 max-w-[44ch] text-lead text-pretty text-text-secondary">{hero.lead}</p>

            <div className="hero-in mt-7 flex flex-wrap items-center gap-3" style={delay(120)}>
              <ButtonLink href={hero.primaryCta.href}>{hero.primaryCta.label}</ButtonLink>
              <ButtonLink href={hero.secondaryCta.href} variant="secondary">
                {hero.secondaryCta.label}
              </ButtonLink>
            </div>
          </div>

          {/* -mt-[250px]: how far the scene's empty top-left corner reaches under the text. */}
          <div className="hero-in relative mt-6 lg:-mt-[250px] lg:ms-[3%] lg:-me-8" style={delay(200)}>
            {/* Dot field under the scene, faded out toward its edges. */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 [background-image:radial-gradient(var(--color-border-button-hover)_1px,transparent_1px)] [background-size:18px_18px] [mask-image:radial-gradient(ellipse_at_60%_55%,black_25%,transparent_70%)]"
            />
            <InView className="relative">
              <HeroScene className="h-auto w-full" />
            </InView>
          </div>
        </div>

        <ul className="grid grid-cols-2 gap-px border-t border-separator-border bg-separator-border lg:-mx-12 lg:grid-cols-4">
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
