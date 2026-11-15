import type { Metadata } from "next";
import { ButtonLink } from "@/components/base/buttons/button";
import { BorderGlow } from "@/components/marketing/border-glow";
import { CtaBand } from "@/components/marketing/cta-band";
import { Section, SectionHeading } from "@/components/marketing/frame";
import { PageHero } from "@/components/marketing/page-hero";
import { Reveal } from "@/components/marketing/reveal";
import { about } from "@/content/pages";

export const metadata: Metadata = {
  title: "About",
  description: about.hero.lead,
};

const initials = (name: string) =>
  name
    .split(" ")
    .map((part) => part[0])
    .join("");

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
        <ul className="mt-14 grid gap-4 md:grid-cols-3">
          {about.leadership.people.map((person, index) => (
            <li key={person.name}>
              <BorderGlow
                sweepDelay={index * 140}
                className="h-full rounded-3xl border border-border-button-default bg-background-full"
              >
                <div className="flex h-full flex-col p-7">
                  <span
                    aria-hidden="true"
                    className="flex size-12 items-center justify-center rounded-2xl bg-background-secondary-default text-headline-medium text-text-primary"
                  >
                    {initials(person.name)}
                  </span>
                  <h3 className="mt-5 text-title-3-medium text-text-primary">{person.name}</h3>
                  <p className="text-body-medium text-accent-600">{person.role}</p>
                  <p className="mt-4 mb-6 text-body-regular text-text-secondary">{person.bio}</p>
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
              </BorderGlow>
            </li>
          ))}
        </ul>

        <div className="mt-20 grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <h3 className="max-w-[18ch] text-subsection text-text-primary">{about.advisors.title}</h3>
          </Reveal>
          <dl className="lg:col-span-7">
            {about.advisors.areas.map((area) => (
              <div
                key={area.name}
                className="grid gap-1 border-t border-separator-border py-6 first:border-t-0 first:pt-0 sm:grid-cols-[220px_1fr] sm:gap-6"
              >
                <dt className="text-headline-medium text-text-primary">{area.name}</dt>
                <dd className="max-w-[52ch] text-body-regular text-text-secondary">{area.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      {/* A real sequence, so the phases are ordered and connected. */}
      <Section id="roadmap" className="bg-background-secondary-default">
        <Reveal>
          <SectionHeading title={about.roadmap.title} />
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
              <p className="text-body-medium text-text-secondary">{phase.when}</p>
              <h3 className="mt-2 text-title-3-medium text-text-primary">{phase.name}</h3>
              <p className="mt-2 max-w-[40ch] text-body-regular text-text-secondary">{phase.text}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section id="principles">
        <div className="grid gap-12 lg:grid-cols-12">
          <Reveal className="lg:col-span-5">
            <SectionHeading title={about.principles.title} />
          </Reveal>
          <dl className="lg:col-span-7">
            {about.principles.items.map((item) => (
              <div
                key={item.name}
                className="grid gap-1 border-t border-separator-border py-6 first:border-t-0 first:pt-0 sm:grid-cols-[260px_1fr] sm:gap-6"
              >
                <dt className="text-headline-medium text-text-primary">{item.name}</dt>
                <dd className="max-w-[48ch] text-body-regular text-text-secondary">{item.text}</dd>
              </div>
            ))}
          </dl>
        </div>
      </Section>

      <Section id="contact">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-end lg:justify-between">
          <div>
            <SectionHeading title={about.contact.title} />
            <p className="mt-5 max-w-[48ch] text-lead text-text-secondary">{about.contact.text}</p>
            <address className="mt-6 text-body-regular text-text-secondary not-italic">
              {about.contact.office.join(", ")}
            </address>
          </div>
          <ButtonLink href="/contact" className="self-start lg:self-auto">
            Contact us
          </ButtonLink>
        </div>
      </Section>

      <CtaBand />
    </>
  );
}
