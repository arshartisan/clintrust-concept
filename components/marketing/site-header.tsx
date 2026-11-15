"use client";

import { useEffect, useRef, useState, type ComponentType } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  RiArrowDownSLine,
  RiBuilding2Line,
  RiCloseLine,
  RiFundsLine,
  RiGroupLine,
  RiHospitalLine,
  RiMailLine,
  RiMenuLine,
  RiTeamLine,
} from "@remixicon/react";
import { Button, ButtonLink } from "@/components/base/buttons/button";
import { brand, nav } from "@/content/landing";
import { cx } from "@/utils/cx";
import { LogoMark } from "./logo";

/**
 * Floating pill navbar with dropdown menus (sprint 3).
 *
 * The menus are plain disclosure buttons (the WAI-ARIA "disclosure navigation"
 * pattern), not BoardUI's dropdown. That component is built on react-aria,
 * which is about 75 KB compressed, and the header is on every page: using it
 * here would put that weight in every page's first load. The behaviour kept
 * by hand: click or Enter toggles, hover opens for a mouse, Escape closes and
 * returns focus, and moving focus or clicking elsewhere closes.
 */

type IconName = (typeof nav)[number] extends infer Item
  ? Item extends { items: readonly { icon: infer Name }[] }
    ? Name
    : never
  : never;

const ICONS: Record<IconName, ComponentType<{ className?: string }>> = {
  sponsors: RiFundsLine,
  cros: RiTeamLine,
  sites: RiHospitalLine,
  about: RiBuilding2Line,
  leadership: RiGroupLine,
  contact: RiMailLine,
};

const itemClass =
  "flex h-9 items-center gap-0.5 rounded-full px-3.5 text-body-medium text-text-secondary transition-colors duration-150 hover:bg-background-secondary-default hover:text-text-primary outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring cursor-pointer";

export function SiteHeader() {
  const pathname = usePathname();
  const barRef = useRef<HTMLDivElement>(null);
  const [openMenu, setOpenMenu] = useState<string | null>(null);
  const [mobileOpen, setMobileOpen] = useState(false);

  // Every link inside a menu closes it on click, so navigation needs no effect.

  // Escape, and a press anywhere outside the bar, close the open menu.
  useEffect(() => {
    if (!openMenu && !mobileOpen) return;
    const onKey = (event: KeyboardEvent) => {
      if (event.key !== "Escape") return;
      const trigger = barRef.current?.querySelector<HTMLElement>('[aria-expanded="true"]');
      setOpenMenu(null);
      setMobileOpen(false);
      trigger?.focus();
    };
    const onPress = (event: PointerEvent) => {
      if (!barRef.current?.contains(event.target as Node)) {
        setOpenMenu(null);
        setMobileOpen(false);
      }
    };
    document.addEventListener("keydown", onKey);
    document.addEventListener("pointerdown", onPress);
    return () => {
      document.removeEventListener("keydown", onKey);
      document.removeEventListener("pointerdown", onPress);
    };
  }, [openMenu, mobileOpen]);

  return (
    // Sticky wrapper is click-through; only the pill itself takes pointer events.
    <header className="pointer-events-none sticky top-3 z-40 mt-3 px-3">
      <div
        ref={barRef}
        // A full pill. With the phone menu open the bar is taller than it is
        // round, so it relaxes to a large radius.
        className={cx(
          // 1200px: the same width as the page column, so the bar lines up with the rails.
          "nav-glass pointer-events-auto relative mx-auto w-full max-w-[1200px]",
          mobileOpen ? "rounded-[1.75rem]" : "rounded-full",
        )}
      >
        <div className="flex items-center gap-1 p-2 lg:px-3">
          <Link
            href="/"
            aria-label={`${brand.name} home`}
            className="me-1 flex h-9 items-center gap-2 rounded-full ps-2.5 pe-3 outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring"
          >
            <LogoMark className="h-7" />
            <span className="text-headline-semibold tracking-tight text-text-primary">{brand.name}</span>
          </Link>

          <nav aria-label="Primary" className="hidden flex-1 items-center justify-center gap-0.5 md:flex">
            {nav.map((entry) => {
              if (!("items" in entry)) {
                return (
                  <Link
                    key={entry.label}
                    href={entry.href}
                    aria-current={pathname === entry.href ? "page" : undefined}
                    className={cx(itemClass, pathname === entry.href && "text-text-primary")}
                  >
                    {entry.label}
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
                    // pt-3 bridges the gap so the pointer can travel from button to panel.
                    <div id={panelId} className="absolute start-0 top-full pt-3">
                      <ul className="menu-in w-[320px] origin-top-left rounded-2xl border border-border-button-default bg-background-primary-default p-2 shadow-xl">
                        {entry.items.map((item) => {
                          const Icon = ICONS[item.icon];
                          return (
                            <li key={item.label}>
                              <Link
                                href={item.href}
                                onClick={() => setOpenMenu(null)}
                                className="flex items-center gap-3 rounded-xl p-2 transition-colors duration-150 hover:bg-background-secondary-default outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring"
                              >
                                <span className="flex size-10 shrink-0 items-center justify-center rounded-xl bg-accent-50 text-accent-600">
                                  <Icon className="size-5" />
                                </span>
                                <span>
                                  <span className="block text-body-medium text-text-primary">{item.label}</span>
                                  <span className="block text-body-2-regular text-text-secondary">{item.text}</span>
                                </span>
                              </Link>
                            </li>
                          );
                        })}
                      </ul>
                    </div>
                  ) : null}
                </div>
              );
            })}
          </nav>

          <ButtonLink href="/contact" size="small" className="ms-auto md:ms-1">
            Request a demo
          </ButtonLink>
          <Button
            className="md:hidden"
            variant="secondary"
            size="small"
            iconOnly
            leadingIcon={mobileOpen ? RiCloseLine : RiMenuLine}
            aria-label={mobileOpen ? "Close menu" : "Open menu"}
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen((value) => !value)}
          />
        </div>

        {/* Phones: one panel under the pill with every link, grouped. */}
        {mobileOpen ? (
          <nav
            id="mobile-nav"
            aria-label="Primary"
            className="menu-in max-h-[70dvh] origin-top overflow-y-auto border-t border-separator-border p-2 md:hidden"
          >
            {nav.map((entry) =>
              "items" in entry ? (
                <div key={entry.label} className="pb-2">
                  <p className="px-2 pt-2 pb-1 text-caption-1-medium text-text-secondary">{entry.label}</p>
                  {entry.items.map((item) => (
                    <Link
                      key={item.label}
                      href={item.href}
                      onClick={() => setMobileOpen(false)}
                      className="block rounded-xl px-2 py-2 text-body-medium text-text-primary outline-none hover:bg-background-secondary-default focus-visible:ring-2 focus-visible:ring-border-focus-ring"
                    >
                      {item.label}
                    </Link>
                  ))}
                </div>
              ) : (
                <Link
                  key={entry.label}
                  href={entry.href}
                  onClick={() => setMobileOpen(false)}
                  className="block rounded-xl px-2 py-2 text-body-medium text-text-primary outline-none hover:bg-background-secondary-default focus-visible:ring-2 focus-visible:ring-border-focus-ring"
                >
                  {entry.label}
                </Link>
              ),
            )}
          </nav>
        ) : null}
      </div>
    </header>
  );
}
