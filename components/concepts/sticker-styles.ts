/**
 * Class overrides that turn BoardUI's secondary ButtonLink into the concepts'
 * chunky "sticker" buttons: a thick ink outline and a hard offset shadow that
 * the button presses into on hover.
 */
const base =
  "h-12 border-2 border-text-primary px-6 font-display text-headline-semibold text-text-primary shadow-[3px_3px_0_0_var(--color-text-primary)] transition-[translate,box-shadow,background-color] duration-150 hover:translate-x-[1px] hover:translate-y-[1px] hover:border-text-primary hover:shadow-[1px_1px_0_0_var(--color-text-primary)] active:shadow-none";

export const stickerPrimary = `${base} bg-sun-300 hover:bg-sun-200 active:bg-sun-200`;
export const stickerSecondary = `${base} bg-background-primary-default hover:bg-coral-50 active:bg-coral-50`;
