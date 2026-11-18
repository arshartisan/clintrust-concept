import Image from "next/image";
import { proof } from "@/content/landing";
import { Section } from "./frame";
import { Reveal } from "./reveal";

/**
 * Proof (sprint 8): one number, said plainly, with its basis beside it.
 * When `proof.quote` is filled in content/landing.ts, the quote (and the
 * person's photo, if given) follows underneath.
 */
export function Proof() {
  const { quote } = proof;

  return (
    <Section id="proof">
      <Reveal className="grid items-end gap-6 lg:grid-cols-12 lg:gap-12">
        <div className="lg:col-span-5">
          <p className="text-body-2-medium text-text-secondary">{proof.title}</p>
          <p className="mt-3 text-figure text-accent-600 tabular-nums">{proof.figure}</p>
        </div>
        <div className="lg:col-span-7">
          <p className="max-w-[28ch] text-title-1-medium text-balance text-text-primary">{proof.label}</p>
          <p className="mt-3 max-w-[60ch] text-body-2-regular text-pretty text-text-tertiary">{proof.basis}</p>
        </div>
      </Reveal>

      {quote ? (
        <figure className="mt-10 rounded-3xl border border-border-button-default bg-background-secondary-default p-7 sm:p-9">
          <blockquote className="max-w-[48ch] text-title-2-medium text-pretty text-text-primary">
            &ldquo;{quote.text}&rdquo;
          </blockquote>
          <figcaption className="mt-6 flex items-center gap-3">
            {quote.photo ? (
              <Image src={quote.photo} alt="" width={48} height={48} className="size-12 rounded-full object-cover" />
            ) : null}
            <span>
              <span className="block text-body-medium text-text-primary">{quote.name}</span>
              <span className="block text-body-2-regular text-text-secondary">{quote.role}</span>
            </span>
          </figcaption>
        </figure>
      ) : null}
    </Section>
  );
}
