import Link from "next/link";
import { brand, footer } from "@/content/landing";
import { cx } from "@/utils/cx";
import { container } from "./frame";
import { Logo } from "./logo";

const linkClass =
  "rounded-sm text-body-regular text-text-secondary transition-colors duration-150 hover:text-text-primary outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring";

/**
 * Footer as a floating card over a large, fading wordmark (sprint 3).
 * Every link points at a page or section that exists.
 */
export function SiteFooter() {
  return (
    <footer>
      <div className={cx(container, "overflow-hidden pt-4 lg:pt-6")}>
        <div className="relative z-10 rounded-3xl border border-border-button-default bg-background-primary-default p-7 shadow-lg sm:p-10">
          <div className="grid gap-12 lg:grid-cols-12">
            <div className="lg:col-span-4">
              <Link
                href="/"
                aria-label={`${brand.name} home`}
                className="inline-flex rounded-md outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring"
              >
                <Logo />
              </Link>
              <p className="mt-4 max-w-[36ch] text-body-regular text-text-secondary">
                Payment orchestration for clinical trial sites, sponsors and CROs.
              </p>
            </div>

            <nav aria-label="Footer" className="grid grid-cols-2 gap-10 sm:grid-cols-4 lg:col-span-8">
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

          <div className="mt-12 flex flex-col gap-4 border-t border-separator-border pt-6 sm:flex-row sm:items-center sm:justify-between">
            <p className="text-body-2-regular text-text-secondary">{footer.legal}</p>
            <ul className="flex flex-wrap gap-x-5 gap-y-1">
              {footer.certifications.map((item) => (
                <li key={item} className="text-body-2-regular text-text-secondary">
                  {item}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Decorative wordmark: fades out downward and is cut off by the page
            edge. Drawn as generated content (::before), not as text in the
            document, so assistive technology and contrast checks skip it. */}
        <div
          aria-hidden="true"
          data-wordmark={brand.name}
          className="pointer-events-none -mb-[0.16em] pt-8 text-center text-wordmark text-background-tertiary-default select-none [mask-image:linear-gradient(to_bottom,black_10%,transparent_92%)] before:content-[attr(data-wordmark)]"
        />
      </div>
    </footer>
  );
}
