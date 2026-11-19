import type { Metadata } from "next";
import { demoFormClass } from "@/components/marketing/demo-form-class";
import { container, MarkedText } from "@/components/marketing/frame";
import { DoodleTile, TILE_TONE_ORDER } from "@/components/marketing/doodle-icons";
import { LazyDemoForm } from "@/components/marketing/lazy-widgets";
import { contact } from "@/content/pages";
import { cx } from "@/utils/cx";

export const metadata: Metadata = {
  title: "Contact",
  description: "Request a demo of ClinTrust or get in touch with the team.",
};


export default function ContactPage() {
  return (
    <section>
      <div className={cx(container, "grid gap-12 pt-16 pb-20 lg:grid-cols-12 lg:pt-24 lg:pb-28")}>
        <div className="lg:col-span-5">
          {/* Dark title, lighter continuation, one phrase on a sticker: the home
              section headings' style (SectionHeading), at hero size. */}
          <h1 className="hero-settle title-chunky text-hero text-balance text-text-primary">
            {contact.hero.title}{" "}
            <span className="text-text-tertiary">
              <MarkedText text={contact.hero.continuation} mark={contact.hero.mark} tone="coral" />
            </span>
          </h1>
          <p className="hero-settle mt-6 max-w-[46ch] text-lead text-pretty text-text-secondary">
            {contact.hero.lead}
          </p>

          {/* Ways to reach the team. Emails stay left-to-right in any layout. */}
          <address className="mt-12 grid gap-6 border-t border-separator-border pt-8 not-italic">
            {contact.channels.map((channel, index) => (
              <div key={channel.label} className="flex items-start gap-4">
                <DoodleTile icon={channel.icon} tone={TILE_TONE_ORDER[index % TILE_TONE_ORDER.length]} />
                <div>
                  <p className="text-caption-1-semibold tracking-wide text-text-tertiary uppercase">{channel.label}</p>
                  {"email" in channel ? (
                    <a
                      href={`mailto:${channel.email}`}
                      dir="ltr"
                      className="mt-0.5 inline-flex min-h-7 items-center rounded-sm text-body-medium text-text-primary underline-offset-4 hover:text-accent-600 hover:underline outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring"
                    >
                      {channel.email}
                    </a>
                  ) : (
                    <div className="mt-1">
                      {channel.lines.map((line) => (
                        <p key={line} className="text-body-medium text-text-primary">
                          {line}
                        </p>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            ))}
          </address>
        </div>

        <LazyDemoForm
          className="lg:col-span-7"
          source="contact"
          fallback={<div className={demoFormClass} aria-hidden="true" />}
        />
      </div>
    </section>
  );
}
