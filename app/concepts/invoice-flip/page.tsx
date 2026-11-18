import type { Metadata } from "next";
import { ConceptBar } from "@/components/concepts/concept-bar";
import { HeroInvoiceFlip } from "@/components/concepts/hero-invoice-flip";
import { heroConcepts } from "@/content/landing";

const concept = heroConcepts.items[2];

export const metadata: Metadata = { title: `Concept ${concept.letter}: ${concept.name}` };

export default function Page() {
  return (
    <>
      <ConceptBar slug={concept.slug} />
      <HeroInvoiceFlip />
    </>
  );
}
