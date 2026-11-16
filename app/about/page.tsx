import type { Metadata } from "next";
import { RiGlobalLine } from "@remixicon/react";
import { AdvisorCards } from "@/components/marketing/advisor-cards";
import { CtaBand } from "@/components/marketing/cta-band";
import { Section, SectionHeading } from "@/components/marketing/frame";
import { PageHero } from "@/components/marketing/page-hero";
import { PrincipleCards } from "@/components/marketing/principle-cards";
import { Reveal } from "@/components/marketing/reveal";
import { about } from "@/content/pages";
import { cx } from "@/utils/cx";

export const metadata: Metadata = {
  title: "About",
  description: about.hero.lead,
};

export default function AboutPage() {
  return (
    <>
      <PageHero {...about.hero} />

      <Section id="mission">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-6">
            <SectionHeading title={about.mission.title} className="max-w-[18ch]" />
          </Reveal>
          <div className="flex flex-col gap-5 lg:col-span-6">
            {about.mission.text.map((paragraph) => (
              <p key={paragraph} className="max-w-[56ch] text-lead text-text-secondary">
                {paragraph}
              </p>
            ))}
          </div>
        </div>

        {/* Hairline grid: four values sharing borders. */}
        <ul className="mt-16 grid gap-px overflow-hidden rounded-3xl border border-border-button-default bg-separator-border sm:grid-cols-2 lg:grid-cols-4">
          {about.values.map((value) => (
            <li key={value.name} className="bg-background-full p-7">
              <span
                aria-hidden="true"
                className="mb-5 flex size-10 items-center justify-center rounded-xl border border-accent-200 bg-accent-50 text-accent-600"
              >
                <value.icon className="size-5" />
              </span>
              <h3 className="text-headline-medium text-text-primary">{value.name}</h3>
              <p className="mt-2 text-body-regular text-text-secondary">{value.text}</p>
            </li>
          ))}
        </ul>
      </Section>

      <Section id="leadership">
        <Reveal>
          <SectionHeading title={about.leadership.title} />
        </Reveal>
        <ul className="mt-14 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {about.leadership.people.map((person) => (
            <li key={person.name}>
              <div className="h-full rounded-3xl border border-border-button-default bg-background-full">
                <div className="flex h-full flex-col p-5">
                  {person.photo ? (
                    // eslint-disable-next-line @next/next/no-img-element -- pre-sized 224px WebP; next/image adds nothing here
                    <img
                      src={person.photo}
                      alt={`Portrait of ${person.name}`}
                      width={224}
                      height={224}
                      loading="lazy"
                      decoding="async"
                      className="size-20 rounded-full object-cover ring-1 ring-border-button-default"
                    />
                  ) : (
                    // No photo yet: a monogram in the logo's teal-to-blue.
                    <span
                      aria-hidden="true"
                      className="flex size-20 items-center justify-center rounded-full bg-linear-135 from-accent-400 to-brand-blue-600 text-title-1-medium text-text-white ring-1 ring-border-button-default"
                    >
                      {"monogram" in person ? person.monogram : person.name[0]}
                    </span>
                  )}
                  <h3 className="mt-4 text-title-3-medium text-text-primary">{person.name}</h3>
                  {person.role ? <p className="text-body-medium text-accent-600">{person.role}</p> : null}
                  <p className="mt-3 mb-5 text-body-regular text-text-secondary">{person.bio}</p>
                  <ul className="mt-auto flex flex-wrap gap-2">
                    {person.tags.map((tag) => (
                      <li
                        key={tag}
                        className="rounded-full border border-border-button-default px-2.5 py-1 text-caption-1-medium text-text-secondary"
                      >
                        {tag}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </li>
          ))}
        </ul>

        <div className="mt-20">
          <p className="flex items-center gap-2 text-body-2-medium text-accent-600">
            <span aria-hidden="true" className="size-2 rounded-xs bg-accent-500" />
            {about.advisors.eyebrow}
          </p>
          <Reveal className="mt-4">
            <h3 className="max-w-[22ch] text-subsection text-text-primary">{about.advisors.title}</h3>
          </Reveal>
          <p className="mt-4 max-w-[60ch] text-lead text-pretty text-text-secondary">{about.advisors.text}</p>
          <div className="mt-10">
            <AdvisorCards />
          </div>
        </div>
      </Section>

      {/* A real sequence, so the phases are ordered and connected. */}
      <Section id="roadmap" className="bg-background-secondary-default">
        <Reveal>
          <SectionHeading title={about.roadmap.title} continuation={about.roadmap.continuation} />
        </Reveal>
        <ol className="mt-14 grid gap-10 lg:grid-cols-3 lg:gap-8">
          {about.roadmap.phases.map((phase, index) => (
            <li key={phase.name} className="relative border-t border-border-button-hover pt-6">
              <span
                aria-hidden="true"
                className={
                  index === 0
                    ? "absolute -top-[5px] start-0 size-[9px] rounded-full bg-accent-500 ring-4 ring-accent-400/25"
                    : "absolute -top-[5px] start-0 size-[9px] rounded-full bg-border-button-hover"
                }
              />
              <p className={cx("text-body-medium", index === 0 ? "text-accent-600" : "text-text-secondary")}>
                {phase.phase} · {phase.when}
              </p>
              <h3 className="mt-2 text-title-3-medium text-text-primary">{phase.name}</h3>
              <p className="mt-2 max-w-[40ch] text-body-regular text-text-secondary">{phase.text}</p>
              {/* Markets in this phase. The current phase's are in teal. */}
              <ul className="mt-5 flex flex-wrap gap-2" aria-label={`${phase.phase} markets`}>
                {phase.markets.map((market) => (
                  <li
                    key={market.name}
                    className={cx(
                      "flex items-center gap-1.5 rounded-full border px-2.5 py-1 text-caption-1-medium",
                      index === 0
                        ? "border-accent-200 bg-accent-50 text-accent-700"
                        : "border-border-button-default bg-background-full text-text-secondary",
                    )}
                  >
                    {market.code ? (
                      <span aria-hidden="true" className="text-caption-2-semibold opacity-70">
                        {market.code}
                      </span>
                    ) : market.name === "+4 markets" ? null : (
                      <RiGlobalLine aria-hidden="true" className="size-3.5" />
                    )}
                    {market.name}
                  </li>
                ))}
              </ul>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="principles">
        <PrincipleCards />
      </Section>


      <CtaBand />
    </>
  );
}
