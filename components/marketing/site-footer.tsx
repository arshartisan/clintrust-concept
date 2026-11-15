import Link from "next/link";
import { RiArrowRightUpLine, RiMailSendLine } from "@remixicon/react";
import { brand, footer } from "@/content/landing";
import { cx } from "@/utils/cx";
import { container } from "./frame";
import { Logo } from "./logo";

const linkClass =
  "rounded-sm text-body-regular text-text-secondary transition-colors duration-150 hover:text-text-primary outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring";

/**
 * Footer (sprint 4, second version): a logo row, a contact card beside the
 * link columns, a large faded wordmark, then the legal line.
 *
 * There is no social-media row: ClinTrust has no public social accounts on
 * record to link to. The standards the platform is built to sit there instead.
 * Every link points at a page or section that exists.
 */
export function SiteFooter() {
  return (
    <footer>
      <div className={cx(container, "overflow-hidden pt-12 lg:pt-16")}>
        <div className="flex flex-wrap items-center justify-between gap-x-8 gap-y-4 border-b border-separator-border pb-6">
          <Link
            href="/"
            aria-label={`${brand.name} home`}
            className="inline-flex rounded-md outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring"
          >
            <Logo />
          </Link>
          <ul className="flex flex-wrap items-center gap-2" aria-label="Standards">
            {footer.certifications.map((item) => (
              <li
                key={item}
                className="rounded-lg border border-border-button-default px-2.5 py-1 text-caption-1-medium text-text-secondary"
              >
                {item}
              </li>
            ))}
          </ul>
        </div>

        <div className="grid gap-12 pt-8 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <h2 className="text-body-medium text-text-primary">Reach out to us</h2>
            <Link
              href="/contact"
              className="group mt-4 flex max-w-[340px] items-center gap-3 rounded-2xl border border-accent-200 bg-accent-50 p-3 transition-colors duration-150 hover:border-accent-300 hover:bg-accent-100 outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring"
            >
              <span className="flex size-10 shrink-0 items-center justify-center rounded-full bg-accent-500 text-text-white">
                <RiMailSendLine className="size-5" aria-hidden="true" />
              </span>
              <span className="min-w-0 flex-1">
                <span className="block text-body-medium text-text-primary">Request a demo</span>
                <span className="block text-body-2-regular text-text-secondary">
                  A 45-minute walkthrough of your payment flow
                </span>
              </span>
              <RiArrowRightUpLine
                className="size-5 shrink-0 text-foreground-icon-secondary transition-transform duration-150 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                aria-hidden="true"
              />
            </Link>
          </div>

          <nav aria-label="Footer" className="grid grid-cols-2 gap-x-8 gap-y-10 sm:grid-cols-4 lg:col-span-7">
            {footer.columns.map((column) => (
              <div key={column.title}>
                <h2 className="text-body-medium text-text-primary">{column.title}</h2>
                <ul className="mt-4 flex flex-col gap-2.5">
                  {column.links.map((link) => (
                    <li key={link.label}>
                      <Link href={link.href} className={linkClass}>
                        {link.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </nav>
        </div>

        {/* Decorative wordmark. Drawn as generated content (::before), not as
            text in the document, so assistive technology and contrast checks
            skip it. Filled with the logo's teal-to-blue gradient (`.wordmark-brand`
            in styles/brand.css). The legal line sits over its lower edge. */}
        <div
          aria-hidden="true"
          data-wordmark={brand.name}
          className="wordmark-brand pointer-events-none mt-16 -mb-[0.2em] text-center text-wordmark select-none [mask-image:linear-gradient(to_bottom,black_20%,transparent_96%)] lg:mt-20"
        />

        <p className="relative pb-6 text-body-2-regular text-text-secondary">{footer.legal}</p>
      </div>
    </footer>
  );
}
