import type { ReactNode } from "react";
import { modules } from "@/content/landing";
import { Section, SectionHeading } from "./frame";
import { InView } from "./in-view";
import {
  BudgetVisual,
  CaptureVisual,
  FundingVisual,
  PayableVisual,
  PayoutVisual,
  ReconcileVisual,
} from "./iso-visuals";
import { Reveal } from "./reveal";

/**
 * Six equal dark cards, after a "glass devices" reference (sprint 7):
 *   lg: three columns, two rows.  md: two columns.  Below md: one column.
 * Same order as `modules` in content/landing.ts. Each card is a light tile
 * (`.platform-card`) washed with faint teal and blue light: the illustration
 * on top, the name and text underneath on the same surface, no divider.
 */
const VISUALS: ReactNode[] = [
  <BudgetVisual key="budget" />,
  <CaptureVisual key="capture" />,
  <ReconcileVisual key="reconcile" />,
  <PayableVisual key="payable" />,
  <FundingVisual key="funding" />,
  <PayoutVisual key="payout" />,
];

export function Platform() {
  return (
    <Section id="platform">
      <Reveal>
        <SectionHeading
          title="Six modules, one payment layer."
          continuation="Adopt the whole platform or connect it to the systems you already run."
        />
      </Reveal>

      <ul className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {modules.map((module, index) => (
          <li key={module.name} className="min-w-0">
            {/* InView switches the illustration's animation on while the card is visible. */}
            <InView className="platform-card flex h-full flex-col overflow-hidden rounded-3xl border border-border-button-default">
              <div className="h-60 px-4 pt-6 pb-2">{VISUALS[index]}</div>
              <div className="px-6 pb-7 sm:px-7">
                <h3 className="text-headline-medium text-text-primary">{module.name}</h3>
                <p className="mt-1.5 max-w-[46ch] text-body-regular text-text-secondary">{module.text}</p>
              </div>
            </InView>
          </li>
        ))}
      </ul>
    </Section>
  );
}
