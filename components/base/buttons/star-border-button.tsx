import type { CSSProperties } from "react";
import { cx } from "@/utils/cx";
import { Button, ButtonLink, type ButtonLinkProps, type ButtonProps } from "./button";

/**
 * Sprint 9: the ring and the sweeping stars are switched off; the button
 * inside is now the yellow sticker primary (styles/brand.css, .button-glow),
 * which carries the emphasis on its own. To bring the effect back, restore
 * the "star-border" wrapper class and the two `.star-border-star` spans from
 * git history (the CSS is still in styles/brand.css).
 *
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

export function StarBorderButton({
  starColor,
  speed,
  thickness,
  wrapperClassName,
  ...props
}: ButtonProps & StarBorderOptions) {
  return (
    <span className={cx("inline-flex", wrapperClassName)} style={ringStyle({ starColor, speed, thickness })}>
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
    <span className={cx("inline-flex", wrapperClassName)} style={ringStyle({ starColor, speed, thickness })}>
      <ButtonLink {...props} className={cx("relative z-10", props.className)} />
    </span>
  );
}
