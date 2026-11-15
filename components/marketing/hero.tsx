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
 * Centred headline over a wide isometric scene (sprint 3). The scene is the
 * page's one staged moment: data pulses into the platform and verified
 * payments pulse out.
 */
export function Hero() {
  return (
    // overflow-x-clip: the dot field bleeds past the column and must not widen the page on phones.
    <section id="top" className="relative overflow-x-clip">
      <div className={cx(container, "relative")}>
        <div className="mx-auto flex max-w-[860px] flex-col items-center pt-14 text-center lg:pt-20">
          <p
            className="hero-in inline-flex items-center gap-2 rounded-full border border-border-button-default py-1 ps-2.5 pe-3 text-start text-body-2-medium text-text-secondary"
            style={delay(0)}
          >
            <StatusDot color="green" />
            {hero.status}
          </p>

          {/* hero-settle, not hero-in: this is the LCP and must not start invisible. */}
          <h1 className="hero-settle mt-6 max-w-[17ch] text-hero text-balance text-text-primary">{hero.title}</h1>

          <p className="hero-settle mt-6 max-w-[58ch] text-lead text-pretty text-text-secondary">{hero.lead}</p>

          <div className="hero-in mt-8 flex flex-wrap items-center justify-center gap-3" style={delay(120)}>
            <ButtonLink href={hero.primaryCta.href}>{hero.primaryCta.label}</ButtonLink>
            <ButtonLink href={hero.secondaryCta.href} variant="secondary">
              {hero.secondaryCta.label}
            </ButtonLink>
          </div>
        </div>

        <div className="hero-in relative mx-auto mt-4 w-full max-w-[1040px] pb-6 lg:mt-2 lg:pb-10" style={delay(200)}>
          {/* Dot field under the scene, faded out toward its edges. */}
          <div
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 [background-image:radial-gradient(var(--color-border-button-hover)_1px,transparent_1px)] [background-size:18px_18px] [mask-image:radial-gradient(ellipse_at_center,black_30%,transparent_70%)]"
          />
          <InView className="relative">
            <HeroScene className="h-auto w-full" />
          </InView>
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
