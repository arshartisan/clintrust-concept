import type { Metadata } from "next";
import { CtaBand } from "@/components/marketing/cta-band";
import { Section, SectionHeading } from "@/components/marketing/frame";
import { PageHero } from "@/components/marketing/page-hero";
import { Reveal } from "@/components/marketing/reveal";
import { SettlementLedger } from "@/components/marketing/settlement-ledger";
import { approach } from "@/content/pages";
import { cx } from "@/utils/cx";

export const metadata: Metadata = {
  title: "Our approach",
  description: approach.hero.lead,
};

export default function ApproachPage() {
  return (
    <>
      <PageHero {...approach.hero} />

      {approach.roles.map((role, index) => (
        <Section key={role.id} id={role.id} className={index === 1 ? "bg-background-secondary-default" : undefined}>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12">
            <div className="lg:col-span-6">
              <p className="text-body-medium text-accent-600">{role.label}</p>
              <Reveal className="mt-3">
                <SectionHeading title={role.title} className="max-w-[20ch]" />
              </Reveal>
            </div>
            <p className="max-w-[56ch] text-lead text-text-secondary lg:col-span-6 lg:pt-9">{role.text}</p>
          </div>

          {role.stats.length > 0 ? (
            <dl className="mt-14 grid grid-cols-2 gap-px overflow-hidden rounded-3xl border border-border-button-default bg-separator-border lg:grid-cols-4">
              {role.stats.map((stat) => (
                <div key={stat.label} className="flex flex-col-reverse bg-background-full p-6 sm:p-7">
                  <dt className="mt-1 text-body-regular text-text-secondary">{stat.label}</dt>
                  <dd className="text-display-4-medium tracking-tight text-text-primary">{stat.figure}</dd>
                </div>
              ))}
            </dl>
          ) : null}

          <div className={cx("mt-14 grid gap-12", role.id === "sites" && "lg:grid-cols-12")}>
            <dl
              className={cx(
                "grid gap-x-12 gap-y-8",
                role.id === "sites" ? "lg:col-span-7" : "sm:grid-cols-2 lg:grid-cols-3",
              )}
            >
              {role.features.map((feature) => (
                <div key={feature.name} className="border-t border-separator-border pt-5">
                  <dt className="text-headline-medium text-text-primary">{feature.name}</dt>
                  <dd className="mt-1.5 max-w-[44ch] text-body-regular text-text-secondary">{feature.text}</dd>
                </div>
              ))}
            </dl>

            {/* The site's own view of the same record: visits moving to paid. */}
            {role.id === "sites" ? (
              <div className="lg:col-span-5">
                <SettlementLedger />
                <p className="mt-3 text-caption-1-regular text-text-secondary">Illustrative data.</p>
              </div>
            ) : null}
          </div>
        </Section>
      ))}

      <CtaBand />
    </>
  );
}
