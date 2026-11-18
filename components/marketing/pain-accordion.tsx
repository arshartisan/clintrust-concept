"use client";

import type { Key } from "react";
import { Accordion, AccordionItem } from "@/components/base/accordion/accordion";
import { pains } from "@/content/landing";
import { track } from "@/utils/track";

/**
 * The four worry cards as a BoardUI accordion (contained variant, plus
 * indicator): one open at a time, with BoardUI's smooth height and blur
 * expand. Loaded on demand (lazy-widgets.tsx) because it rides on react-aria;
 * pain-picker.tsx renders a same-size static placeholder until then.
 */
export function PainAccordion() {
  const onExpandedChange = (keys: Set<Key>) => {
    const [opened] = [...keys];
    if (opened !== undefined) track("pain_card_click", { location: "pain-picker", label: String(opened) });
  };

  return (
    <Accordion variant="contained" indicator="plus" onExpandedChange={onExpandedChange}>
      {pains.items.map((pain) => (
        <AccordionItem key={pain.id} id={pain.id} icon={pain.icon} title={pain.label} description={pain.worry}>
          <p className="border-t border-separator-border pt-4 text-body-medium text-pretty text-text-primary">{pain.fix}</p>
        </AccordionItem>
      ))}
    </Accordion>
  );
}
