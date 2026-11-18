import { RiAddLine, RiArrowRightLine } from "@remixicon/react";
import { ButtonLink } from "@/components/base/buttons/button";
import { pains } from "@/content/landing";
import { Section, SectionHeading } from "./frame";
import { LazyPainAccordion } from "./lazy-widgets";
import { Reveal } from "./reveal";

/**
 * "Which one is you?" (sprint 8): the heading and the demo action on the
 * left, the four worries on the right as a BoardUI accordion. Tapping one
 * opens its one-line fix; opening another closes the first.
 *
 * The accordion (pain-accordion.tsx) loads on demand. Until it arrives, the
 * placeholder below draws the same collapsed rows in the accordion's
 * `contained` style, so nothing shifts when it swaps in.
 */
export function PainPicker() {
  return (
    <Section id="pain">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="flex flex-col items-start lg:col-span-5">
          <Reveal>
            <SectionHeading title={pains.title} continuation={pains.continuation} />
          </Reveal>
          <ButtonLink
            href={pains.cta.href}
            trailingIcon={RiArrowRightLine}
            className="mt-8 lg:mt-10"
            data-track="request_demo_click"
            data-track-location="pain-picker"
          >
            {pains.cta.label}
          </ButtonLink>
        </div>

        <LazyPainAccordion className="lg:col-span-7" fallback={<Placeholder />} />
      </div>
    </Section>
  );
}

/** The accordion's collapsed state, without its script. Mirrors the `contained` variant's classes. */
function Placeholder() {
  return (
    <ul className="flex flex-col gap-[3px] rounded-[26px] border-2 border-text-primary bg-background-secondary-default p-[3px] shadow-sticker dark:bg-background-primary-default">
      {pains.items.map((pain) => (
        <li
          key={pain.id}
          className="flex items-center gap-3 rounded-[23px] bg-background-primary-default px-5 py-4 dark:bg-background-secondary-default"
        >
          <pain.icon className="size-5 shrink-0 text-foreground-icon-secondary" aria-hidden="true" />
          <span className="flex min-w-0 flex-1 flex-col gap-0.5">
            <span className="text-headline-medium text-text-primary">{pain.label}</span>
            <span className="text-body-regular text-text-secondary">{pain.worry}</span>
          </span>
          <RiAddLine className="size-5 shrink-0 text-foreground-icon-tertiary" aria-hidden="true" />
        </li>
      ))}
    </ul>
  );
}
