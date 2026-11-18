import type { AnchorHTMLAttributes } from "react";
import { RiArrowRightUpLine } from "@remixicon/react";
import { cx } from "@/utils/cx";

/**
 * A text link led by a small dark square holding an up-right arrow (after
 * the Unlearn "View Case Study" link). The tile nudges up and right on
 * hover. Used at the foot of the pale teal cards (Proof, audience tabs).
 * Pass `data-track*` attributes through for tracking.
 */
export function ArrowLink({ className, children, ...props }: AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a
      {...props}
      className={cx(
        "group inline-flex items-center gap-3 self-start rounded-lg text-body-medium text-text-primary outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring focus-visible:ring-offset-2",
        className,
      )}
    >
      <span className="flex size-10 shrink-0 items-center justify-center rounded-lg bg-text-primary text-text-white transition-transform duration-200 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 motion-reduce:transition-none">
        <RiArrowRightUpLine className="size-5 rtl:-scale-x-100" aria-hidden="true" />
      </span>
      {children}
    </a>
  );
}
