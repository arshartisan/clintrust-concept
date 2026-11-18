import { brand } from "@/content/landing";
import { cx } from "@/utils/cx";

/**
 * The ClinTrust mark: the teal-to-blue DNA shield.
 *
 * Source artwork: assets/brand/logo-source.png. The files actually served
 * (public/logo.webp, app/icon.png, app/apple-icon.png) are generated from it;
 * see docs/sop/02-design-system.md, "Logo". The mark is the only place the
 * full brand gradient appears, and it needs a light surface: the blue lower
 * half loses contrast on navy.
 */
export function LogoMark({ className }: { className?: string }) {
  return (
    // A plain <img> on purpose. The file is already the right size (80px tall,
    // shown at 24 to 32px), so next/image would add client JavaScript and an
    // optimiser round-trip for nothing.
    // eslint-disable-next-line @next/next/no-img-element
    <img
      src="/logo.webp"
      alt=""
      aria-hidden="true"
      width={77}
      height={80}
      decoding="async"
      className={cx("h-8 w-auto shrink-0", className)}
    />
  );
}

/** Mark plus wordmark, for the header and footer. */
export function Logo({ className }: { className?: string }) {
  return (
    <span className={cx("inline-flex items-center gap-2 text-text-primary", className)}>
      <LogoMark />
      <span className="font-display text-title-2-bold tracking-tight">{brand.name}</span>
    </span>
  );
}
