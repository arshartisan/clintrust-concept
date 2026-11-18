import { RiArrowRightLine } from "@remixicon/react";
import { ButtonLink } from "@/components/base/buttons/button";
import { pains } from "@/content/landing";
import { Section, SectionHeading } from "./frame";
import { PainCards } from "./pain-cards";
import { Reveal } from "./reveal";

/**
 * "Which one is you?" (sprint 8, cards since sprint 9): the heading and the
 * demo action on the left, the four worries on the right as tappable sticker
 * cards (pain-cards.tsx). Tapping one shows its one-line fix.
 */
export function PainPicker() {
  return (
    <Section id="pain">
      <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
        <div className="flex flex-col items-start lg:col-span-5">
          <Reveal>
            <SectionHeading title={pains.title} continuation={pains.continuation} mark={pains.mark} markTone="coral" />
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

        <PainCards className="lg:col-span-7" />
      </div>
    </Section>
  );
}
