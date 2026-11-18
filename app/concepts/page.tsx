import Link from "next/link";
import { RiArrowRightUpLine } from "@remixicon/react";
import { CalendarDoodle, CoinDoodle, TickDoodle } from "@/components/marketing/doodles";
import { heroConcepts } from "@/content/landing";
import { cx } from "@/utils/cx";

const DOODLES = [CoinDoodle, CalendarDoodle, TickDoodle];
const TONES = ["bg-sun-300", "bg-coral-100", "bg-teal-100"];

/** /concepts: the three hero concepts, one card each, for client review. */
export default function ConceptsIndex() {
  return (
    <section className="mx-auto w-full max-w-[1200px] px-6 py-16 sm:px-8 lg:px-12 lg:py-24">
      <h1 className="font-display text-poster text-text-primary">
        <span className="concept-highlight">{heroConcepts.indexTitle}</span>
      </h1>
      <p className="mt-6 max-w-[56ch] text-lead text-pretty text-text-secondary">{heroConcepts.indexText}</p>

      <ul className="mt-12 grid gap-5 md:grid-cols-3">
        {heroConcepts.items.map((item, index) => {
          const Doodle = DOODLES[index];
          return (
            <li key={item.slug}>
              <Link
                href={`/concepts/${item.slug}`}
                className="group flex h-full flex-col rounded-3xl border-2 border-text-primary bg-background-primary-default p-6 shadow-[4px_4px_0_0_var(--color-text-primary)] transition-[translate,box-shadow] duration-150 outline-none hover:translate-x-[2px] hover:translate-y-[2px] hover:shadow-[2px_2px_0_0_var(--color-text-primary)] focus-visible:ring-2 focus-visible:ring-border-focus-ring"
              >
                <span className="flex items-center justify-between">
                  <span
                    className={cx(
                      "flex size-12 items-center justify-center rounded-full border-2 border-text-primary font-display text-title-2-semibold text-text-primary",
                      TONES[index],
                    )}
                  >
                    {item.letter}
                  </span>
                  <Doodle className="size-12 text-text-tertiary" />
                </span>
                <span className="mt-6 font-display text-title-2-semibold text-text-primary">{item.name}</span>
                <span className="mt-2 mb-6 text-body-regular text-pretty text-text-secondary">{item.summary}</span>
                <span className="mt-auto inline-flex items-center gap-1.5 font-display text-headline-semibold text-text-primary">
                  /concepts/{item.slug}
                  <RiArrowRightUpLine
                    className="size-5 transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 rtl:-scale-x-100"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </li>
          );
        })}
      </ul>
    </section>
  );
}
