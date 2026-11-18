import type { CSSProperties } from "react";
import { cx } from "@/utils/cx";
import { Button, ButtonLink, type ButtonLinkProps, type ButtonProps } from "./button";

/**
 * Star border CTA (after the fd-libra "star-border-button"): the normal
 * BoardUI pill inside a thin ring, with two points of light sweeping round
 * the ring in opposite directions.
 *
 * Use it for the one main action in a view (hero, header). It takes every
 * Button / ButtonLink prop, plus:
 *   - starColor  any CSS colour; defaults to the logo teal (accent-400)
 *   - speed      one sweep, e.g. "6s"
 *   - thickness  ring width in px
 *   - wrapperClassName  layout classes (margins) for the outer ring
 *
 * CSS: `.star-border` in styles/brand.css. Under reduced motion the stars
 * stop and the ring stays as a plain hairline.
 */

interface StarBorderOptions {
  starColor?: string;
  speed?: string;
  thickness?: number;
  wrapperClassName?: string;
}

function ringStyle({ starColor, speed, thickness }: StarBorderOptions) {
  return {
    ...(starColor ? { "--star-color": starColor } : null),
    ...(speed ? { "--star-speed": speed } : null),
    ...(thickness !== undefined ? { "--star-thickness": `${thickness}px` } : null),
  } as CSSProperties;
}

function Stars() {
  return (
    <>
      <span aria-hidden="true" data-edge="bottom" className="star-border-star" />
      <span aria-hidden="true" data-edge="top" className="star-border-star" />
    </>
  );
}

export function StarBorderButton({
  starColor,
  speed,
  thickness,
  wrapperClassName,
  ...props
}: ButtonProps & StarBorderOptions) {
  return (
    <span className={cx("star-border", wrapperClassName)} style={ringStyle({ starColor, speed, thickness })}>
      <Stars />
      <Button {...props} className={cx("relative z-10", props.className)} />
    </span>
  );
}

export function StarBorderLink({
  starColor,
  speed,
  thickness,
  wrapperClassName,
  ...props
}: ButtonLinkProps & StarBorderOptions) {
  return (
    <span className={cx("star-border", wrapperClassName)} style={ringStyle({ starColor, speed, thickness })}>
      <Stars />
      <ButtonLink {...props} className={cx("relative z-10", props.className)} />
    </span>
  );
}
