import Image from "next/image";
import { proof } from "@/content/landing";
import { cx } from "@/utils/cx";
import { ArrowLink } from "./arrow-link";
import { CountUp } from "./count-up";
import { Section } from "./frame";
import { Reveal } from "./reveal";

/**
 * Sprint 9: both cards are stickers (ink outline, hard shadow); the dark
 * glow card became a sunny yellow one and the pale card is teal.
 *
 * Proof (after the Unlearn "platform" stat block): two cards side by side.
 *
 *   - A sunny yellow card with an eyebrow tag, the big figure under its
 *     label (set off by an ink rule) and the footnote saying how it was
 *     modelled.
 *   - A pale teal card with the headline, one line of text and an arrow link
 *     to the demo form.
 *
 * Sprint 9 cut this to one figure (the brief: "one short quote or number").
 * The figures come from one model (see `proof` in content/landing.ts).
 * When `proof.quote` is filled in, the quote with the person's face follows
 * underneath.
 */
export function Proof() {
  const { quote } = proof;

  return (
    <Section id="proof">
      <Reveal className="grid gap-3 lg:grid-cols-12">
        <div className="flex flex-col rounded-[2rem] border-2 border-text-primary bg-accent-300 p-6 shadow-sticker-lg sm:p-8 lg:col-span-8 lg:p-10">
          <p className="inline-flex items-center gap-2 self-start rounded-md border-2 border-text-primary bg-background-primary-default px-2.5 py-1.5 text-caption-1-semibold tracking-wider text-text-secondary uppercase">
            <span aria-hidden="true" className="size-2.5 rounded-[2px] bg-coral-500" />
            {proof.eyebrow}
          </p>

          <dl className={cx("mt-10 grid gap-8 sm:gap-6 lg:mt-12", proof.stats.length > 1 && "sm:grid-cols-2")}>
            {proof.stats.map((stat) => (
              <div
                key={stat.label}
                className="@container flex min-h-40 flex-col justify-between gap-8 border-s-2 border-text-primary ps-5 sm:min-h-56 sm:ps-6"
              >
                <dt className="max-w-[24ch] text-body-medium text-text-primary">{stat.label}</dt>
                <dd className="text-stat whitespace-nowrap text-text-primary tabular-nums">
                  <CountUp value={stat.value} />
                </dd>
              </div>
            ))}
          </dl>

          <p className="mt-8 text-body-2-regular text-text-primary">{proof.footnote}</p>
        </div>

        <div className="flex flex-col rounded-[2rem] border-2 border-text-primary shadow-sticker bg-teal-100 p-6 sm:p-8 lg:col-span-4 lg:p-10">
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
        <figure className="mt-3 rounded-3xl border-2 border-text-primary shadow-sticker bg-background-secondary-default p-7 sm:p-9">
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
