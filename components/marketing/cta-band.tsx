import { RiArrowRightUpLine } from "@remixicon/react";
import { ButtonLink } from "@/components/base/buttons/button";
import { demo } from "@/content/landing";
import { cx } from "@/utils/cx";
import { container } from "./frame";
import { InView } from "./in-view";

/**
 * Closing call to action (sprint 5, light version).
 *
 * One rounded panel on a soft surface: a dot grid, a teal glow in the top
 * right corner and a blue one in the bottom left, a few angular hairlines,
 * and a single action. The glows drift slowly while the panel is on screen.
 * The form itself lives on /contact, so no form code loads with this panel.
 */
export function CtaBand() {
  return (
    <section className="border-t border-separator-border">
      <div className={cx(container, "pt-16 lg:pt-24")}>
        <InView className="relative overflow-hidden rounded-[2rem] border border-border-button-default bg-background-secondary-default px-6 py-20 text-center sm:rounded-[2.5rem] sm:py-28">
          <div aria-hidden="true" className="pointer-events-none absolute inset-0">
            {/* Corner glows. */}
            <span className="cta-drift absolute -top-40 -end-32 size-[520px] rounded-full [background:radial-gradient(closest-side,color-mix(in_srgb,var(--color-accent-400)_70%,transparent),transparent)]" />
            <span
              className="cta-drift absolute -bottom-48 -start-36 size-[560px] rounded-full [background:radial-gradient(closest-side,color-mix(in_srgb,var(--color-brand-blue-400)_55%,transparent),transparent)]"
              style={{ animationDelay: "-4s" }}
            />
            {/* Dot grid, strongest toward the two glowing corners. */}
            <span className="absolute inset-0 [background-image:radial-gradient(var(--color-border-button-hover)_1px,transparent_1px)] [background-size:16px_16px] [mask-image:linear-gradient(115deg,black,transparent_38%,transparent_62%,black)]" />
            {/* Angular hairlines, like the edges of a circuit board. */}
            <svg
              className="absolute inset-0 size-full text-border-button-hover"
              viewBox="0 0 1100 460"
              preserveAspectRatio="none"
              fill="none"
              stroke="currentColor"
            >
              <path d="M96 0 V86 L60 122 V330 L96 366 V460" vectorEffect="non-scaling-stroke" />
              <path d="M380 460 V392 L344 356 H300" vectorEffect="non-scaling-stroke" />
              <path d="M640 0 V70 L676 106 H720" vectorEffect="non-scaling-stroke" />
              <path d="M1100 62 H1052 L1016 98 V300 L1052 336 V460" vectorEffect="non-scaling-stroke" />
            </svg>
          </div>

          <div className="relative flex flex-col items-center">
            <h2 className="max-w-[18ch] text-section text-balance text-text-primary">{demo.title}</h2>
            <p className="mt-5 max-w-[48ch] text-lead text-pretty text-text-secondary">{demo.text}</p>
            <ButtonLink href="/contact" leadingIcon={RiArrowRightUpLine} className="mt-9">
              Request a demo
            </ButtonLink>
          </div>
        </InView>
      </div>
    </section>
  );
}
