"use client";

import { lazy, Suspense, useEffect, useRef, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { RiArrowDownSLine, RiMenuLine } from "@remixicon/react";
import { Button } from "@/components/base/buttons/button";
import { StarBorderLink } from "@/components/base/buttons/star-border-button";
import { brand, demoCta, nav } from "@/content/landing";
import { cx } from "@/utils/cx";
import { LogoMark } from "./logo";

/**
 * Navbar (sprint 9: logo, centred link pill, CTA; see the comment in the
 * markup), with dropdown menus.
 *
 * Each dropdown is a glass panel under its button: a small heading, then a
 * two-column list of links. Each link is an icon tile, a title and a one-line
 * description (after the identyca reference, sprint 5).
 *
 * The menus are plain disclosure buttons (the WAI-ARIA "disclosure navigation"
 * pattern), not BoardUI's dropdown. That component is built on react-aria,
 * which is about 75 KB compressed, and the header is on every page: using it
 * here would put that weight in every page's first load. The behaviour kept
 * by hand: click or Enter toggles, hover opens for a mouse, Escape closes and
 * returns focus, and moving focus or clicking elsewhere closes.
 *
 * The phone menu is BoardUI's Drawer (mobile-nav.tsx). It does use react-aria,
 * so it is split into its own chunk and fetched when the menu button is first
 * touched, hovered or focused: nothing is added to the first load.
 */

const loadMobileNav = () => import("./mobile-nav").then((m) => ({ default: m.MobileNav }));
const MobileNav = lazy(loadMobileNav);
const preloadMobileNav = () => void loadMobileNav();

const itemClass =
  "flex h-9 items-center gap-0.5 rounded-full px-4 text-body-medium text-text-primary transition-colors duration-150 hover:bg-background-secondary-default hover:text-text-primary outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring cursor-pointer";

const menuLinkClass =
  "group flex items-start gap-3 rounded-2xl p-3 transition-colors duration-150 hover:bg-background-secondary-default outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring";

const menuIconClass =
  "flex size-10 shrink-0 items-center justify-center rounded-xl border border-border-button-default bg-background-secondary-default text-foreground-icon-secondary transition-colors duration-150 group-hover:border-border-button-hover group-hover:bg-background-primary-default group-hover:text-foreground-icon-primary";

export function SiteHeader() {
  const pathname = usePathname();
  const barRef = useRef<HTMLDivElement>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);
  // The drawer's code is fetched, and the drawer mounted, on first use.
  const [mobileLoaded, setMobileLoaded] = useState(false);

  // Every link inside a menu closes it on click, so navigation needs no effect.

  // Escape, and a press anywhere outside the bar, close the open dropdown.
  // (The phone drawer handles its own dismissal.)
  useEffect(() => {
    if (!openMenu) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      const trigger = barRef.current?.querySelector<HTMLElement>('[aria-expanded="true"]');
      setOpenMenu(null);
      trigger?.focus();
    };
    const onPress = (event: PointerEvent) => {
      if (!barRef.current?.contains(event.target as Node)) setOpenMenu(null);
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPress);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPress);
    };
  }, [openMenu]);

  return (
    // Sprint 9, after the client's Moxie navbar: a solid strip in the page
    // colour (content never shows behind it), holding the plain logo on the
    // start side, the links in a centred sticker pill (ink outline, hard
    // shadow) and the yellow CTA on the end side.
    // Below lg (1024px) the pill does not fit beside the CTA: phones get the
    // logo and the menu button, tablets the logo, CTA and menu button.
    <header className="sticky top-0 z-40 bg-background-primary-default px-4 py-3 sm:px-6 lg:py-4">
      <div
        ref={barRef}
        // 1200px: the page column's width, so the pieces line up with the rails.
        className="mx-auto flex w-full max-w-[1200px] items-center justify-between gap-3 lg:grid lg:grid-cols-[1fr_auto_1fr]"
      >
          <Link
            href="/"
            aria-label={`${brand.name} home`}
            className="flex h-11 items-center gap-2 justify-self-start rounded-full outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring"
          >
            <LogoMark className="h-7" />
            <span className="font-display text-title-2-bold tracking-tight text-text-primary">{brand.name}</span>
          </Link>

          <nav aria-label="Primary" className="nav-glass hidden items-center gap-0.5 rounded-full p-1.5 lg:flex">
            {nav.map((entry) => {
              if (!("items" in entry)) {
                return (
                  <Link
                    key={entry.label}
                    href={entry.href}
                    aria-current={pathname === entry.href ? "page" : undefined}
                    className={cx(itemClass, "roll-host", pathname === entry.href && "text-text-primary")}
                  >
                    {/* The label rolls up on hover (.roll in brand.css). */}
                    <span className="roll" data-text={entry.label}>
                      <span>{entry.label}</span>
                    </span>
                  </Link>
                );
              }

              const open = openMenu === entry.label;
              const panelId = `nav-${entry.label.replace(/\s+/g, "-").toLowerCase()}`;
              return (
                <div
                  key={entry.label}
                  className="relative"
                  // Hover opens for a mouse only; touch and pen use the click.
                  onPointerEnter={(event) => event.pointerType === "mouse" && setOpenMenu(entry.label)}
                  onPointerLeave={(event) => event.pointerType === "mouse" && setOpenMenu(null)}
                  onBlur={(event) => {
                    if (!event.currentTarget.contains(event.relatedTarget)) setOpenMenu(null);
                  }}
                >
                  <button
                    type="button"
                    aria-expanded={open}
                    aria-controls={panelId}
                    onClick={() => setOpenMenu(open ? null : entry.label)}
                    className={cx(itemClass, open && "bg-background-secondary-default text-text-primary")}
                  >
                    {entry.label}
                    <RiArrowDownSLine
                      aria-hidden="true"
                      className={cx("size-4 transition-transform duration-150", open && "rotate-180")}
                    />
                  </button>

                  {open ? (
                    // Centred under its button. pt-4 bridges the gap so the
                    // pointer can travel from the button to the panel.
                    <div id={panelId} className="absolute top-full left-1/2 -translate-x-1/2 pt-4">
                      <div className="nav-glass nav-menu menu-in w-[640px] origin-top rounded-3xl p-3">
                        <p className="px-3 pt-2 text-body-2-medium text-text-tertiary">{entry.heading}</p>
                        <ul className="mt-1 grid grid-cols-2 gap-1">
                          {entry.items.map((item) => (
                            <li key={item.label}>
                              <Link href={item.href} onClick={() => setOpenMenu(null)} className={menuLinkClass}>
                                <span aria-hidden="true" className={menuIconClass}>
                                  <item.icon className="size-5" />
                                </span>
                                <span className="flex min-w-0 flex-col gap-0.5">
                                  <span className="text-headline-medium text-text-primary">{item.label}</span>
                                  <span className="text-body-2-regular text-text-secondary">{item.description}</span>
                                </span>
                              </Link>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </nav>

          <div className="flex items-center gap-2 justify-self-end">
            <StarBorderLink
              href={demoCta.href}
              // Bigger than the default: the reference's chunky end-side CTA.
              className="h-12 px-6 text-headline-semibold"
              // Phones: the drawer carries this link; the logo needs the room.
              wrapperClassName="max-sm:hidden"
              data-track="request_demo_click"
              data-track-location="header"
            >
              {demoCta.label}
            </StarBorderLink>
            <Button
              className="lg:hidden"
              variant="secondary"
              size="small"
              iconOnly
              leadingIcon={RiMenuLine}
              aria-label="Open menu"
              aria-haspopup="dialog"
              aria-expanded={mobileOpen}
              // Start fetching the drawer as soon as a press looks likely.
              onPointerEnter={preloadMobileNav}
              onTouchStart={preloadMobileNav}
              onFocus={preloadMobileNav}
              onClick={() => {
                setMobileLoaded(true);
                setMobileOpen(true);
              }}
            />
          </div>
      </div>

      {/* Phones: every link, grouped, in a drawer. Mounted on first use. */}
      {mobileLoaded ? (
        <Suspense fallback={null}>
          <MobileNav isOpen={mobileOpen} onOpenChange={setMobileOpen} pathname={pathname} />
        </Suspense>
      ) : null}
    </header>
  );
}
