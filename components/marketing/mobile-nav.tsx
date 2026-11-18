"use client";

import Link from "next/link";
import { ButtonLink } from "@/components/base/buttons/button";
import { Drawer, DrawerBody, DrawerFooter, DrawerHeader } from "@/components/base/drawer/drawer";
import { brand, demoCta, nav } from "@/content/landing";
import { LogoMark } from "./logo";

/**
 * The phone menu: BoardUI's Drawer, dropping down from the top over a dimmed
 * page. A top drawer is as tall as its content (sprint 9: the full-height
 * side drawer was mostly empty space for three links). The drawer traps focus, stops the page scrolling, closes on
 * Escape or a press on the backdrop, and returns focus to the menu button.
 *
 * Kept in its own file because Drawer is built on react-aria (about 75 KB
 * compressed). site-header.tsx loads this file on demand, so that weight is
 * not in any page's first load (docs/sop/05-performance.md, section 2).
 */

const linkClass =
  "block rounded-xl px-3 py-2.5 text-headline-regular text-text-primary transition-colors duration-150 hover:bg-background-secondary-default outline-none focus-visible:ring-2 focus-visible:ring-border-focus-ring";

interface MobileNavProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  pathname: string;
}

export function MobileNav({ isOpen, onOpenChange, pathname }: MobileNavProps) {
  const close = () => onOpenChange(false);

  return (
    <Drawer isOpen={isOpen} onOpenChange={onOpenChange} placement="top">
      <DrawerHeader
        closeLabel="Close menu"
        className="items-center"
        title={
          <span className="flex items-center gap-2">
            <LogoMark className="h-7" />
            <span className="font-display text-title-2-bold tracking-tight">{brand.name}</span>
          </span>
        }
      />
      {/* px-3: the rows carry their own px-3, so their text lines up with the header. */}
      <DrawerBody className="px-3">
        <nav aria-label="Primary" className="flex flex-col gap-1">
          {nav.map((entry) =>
            "items" in entry ? (
              <div key={entry.label}>
                <p className="px-3 pb-1 text-caption-1-medium text-text-tertiary">{entry.label}</p>
                <ul>
                  {entry.items.map((item) => (
                    <li key={item.label}>
                      <Link href={item.href} onClick={close} className={linkClass}>
                        {item.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </div>
            ) : (
              <Link
                key={entry.label}
                href={entry.href}
                onClick={close}
                aria-current={pathname === entry.href ? "page" : undefined}
                className={linkClass}
              >
                {entry.label}
              </Link>
            ),
          )}
        </nav>
      </DrawerBody>
      <DrawerFooter>
        <ButtonLink
          href={demoCta.href}
          onClick={close}
          className="w-full"
          data-track="request_demo_click"
          data-track-location="mobile-nav"
        >
          {demoCta.label}
        </ButtonLink>
      </DrawerFooter>
    </Drawer>
  );
}
