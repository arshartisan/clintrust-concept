import type { Metadata } from "next";
import { container } from "@/components/marketing/frame";
import { LazyDemoForm } from "@/components/marketing/lazy-widgets";
import { about, contact } from "@/content/pages";
import { cx } from "@/utils/cx";

export const metadata: Metadata = {
  title: "Contact",
  description: "Request a demo of ClinTrust or get in touch with the team.",
};

// Must match `demoFormClass` in components/marketing/demo-form.tsx. Repeated
// here rather than imported so this server page does not pull the form's chunk.
const placeholderClass =
  "min-h-[860px] rounded-3xl border border-border-button-default bg-background-primary-default p-6 shadow-lg sm:min-h-[646px] sm:p-8";

export default function ContactPage() {
  return (
    <section>
      <div className={cx(container, "grid gap-12 pt-16 pb-20 lg:grid-cols-12 lg:pt-24 lg:pb-28")}>
        <div className="lg:col-span-5">
          <h1 className="hero-settle text-hero text-balance text-text-primary">{contact.hero.title}</h1>
          <p className="hero-settle mt-6 max-w-[46ch] text-lead text-pretty text-text-secondary">
            {contact.hero.lead}
          </p>

          <address className="mt-12 border-t border-separator-border pt-6 not-italic">
            <p className="text-body-medium text-text-primary">Head office</p>
            {about.contact.office.map((line) => (
              <p key={line} className="text-body-regular text-text-secondary">
                {line}
              </p>
            ))}
          </address>
        </div>

        <LazyDemoForm
          className="lg:col-span-7"
          fallback={<div className={placeholderClass} aria-hidden="true" />}
        />
      </div>
    </section>
  );
}
