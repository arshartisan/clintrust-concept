import Image from "next/image";
import { proof } from "@/content/landing";
import { ArrowLink } from "./arrow-link";
import { Section } from "./frame";
import { Reveal } from "./reveal";

/**
 * Proof (after the Unlearn "platform" stat block): two cards side by side.
 *
 *   - A dark glow card (`.dark` remaps the tokens; `.glow-card` in
 *     styles/brand.css is a near-black tile lit from the bottom edge by
 *     stacked inner shadows) with an accent eyebrow tag,
 *     two big figures, each under its label and set off by a vertical
 *     hairline, and the footnote that states how they were modelled.
 *   - A pale teal card with the headline, one line of text and an arrow link
 *     to the demo form.
 *
 * Both figures come from the same model (see `proof` in content/landing.ts).
 * When `proof.quote` is filled in, the quote with the person's face follows
 * underneath.
 */
export function Proof() {
  const { quote } = proof;

  return (
    <Section id="proof">
      <Reveal className="grid gap-3 lg:grid-cols-12">
        <div className="dark glow-card flex flex-col rounded-[2rem] p-6 pb-24 sm:p-8 sm:pb-28 lg:col-span-8 lg:p-10 lg:pb-28">
          <p className="inline-flex items-center gap-2 self-start rounded-md border border-border-button-default bg-background-primary-default/60 px-2.5 py-1.5 text-caption-1-semibold tracking-wider text-text-secondary uppercase">
            <span aria-hidden="true" className="size-2.5 rounded-[2px] bg-accent-400" />
            {proof.eyebrow}
          </p>

          <dl className="mt-10 grid gap-8 sm:grid-cols-2 sm:gap-6 lg:mt-12">
            {proof.stats.map((stat) => (
              <div
                key={stat.label}
                className="@container flex min-h-40 flex-col justify-between gap-8 border-s border-separator-border ps-5 sm:min-h-56 sm:ps-6"
              >
                <dt className="max-w-[24ch] text-body-medium text-text-secondary">{stat.label}</dt>
                <dd className="text-stat whitespace-nowrap text-accent-300 tabular-nums">{stat.value}</dd>
              </div>
            ))}
          </dl>

          <p className="mt-8 text-body-2-regular text-text-secondary">{proof.footnote}</p>
        </div>

        <div className="flex flex-col rounded-[2rem] bg-accent-100 p-6 sm:p-8 lg:col-span-4 lg:p-10">
          <h2 className="max-w-[16ch] text-subsection text-balance text-text-primary">{proof.title}</h2>
          <p className="mt-4 max-w-[40ch] text-body-regular text-pretty text-text-primary">{proof.text}</p>

          <ArrowLink
            href={proof.cta.href}
            data-track="request_demo_click"
            data-track-location="proof"
            className="mt-10 lg:mt-auto lg:pt-10"
          >
            {proof.cta.label}
          </ArrowLink>
        </div>
      </Reveal>

      {quote ? (
        <figure className="mt-3 rounded-3xl border border-border-button-default bg-background-secondary-default p-7 sm:p-9">
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
