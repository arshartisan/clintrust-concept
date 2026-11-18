import type { Metadata, Viewport } from "next";
import { Bricolage_Grotesque, Manrope } from "next/font/google";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { SmoothScroll } from "@/components/marketing/smooth-scroll";
import { brand } from "@/content/landing";
import "lenis/dist/lenis.css";
import "@/styles/globals.css";

// Sprint 9, client brief: "big chunky headlines, friendly body font".
//   Manrope              body text, as --font-brand (Tailwind's --font-sans)
//   Bricolage Grotesque  headlines, as --font-headline (`font-display`); its
//                        optical-size axis gives the tighter cut at large sizes
// next/font downloads both at build time and serves them from this site:
// latin-subset variable files, and no request to Google at runtime.
// styles/brand.css maps the variables to the font utilities.
const body = Manrope({
  variable: "--font-brand",
  subsets: ["latin"],
  display: "swap",
});

const headline = Bricolage_Grotesque({
  variable: "--font-headline",
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${brand.name} | One verified record. A clean invoice every month.`,
    template: `%s | ${brand.name}`,
  },
  description: `${brand.name} keeps one verified record of clinical trial work that sponsors, CROs and research sites all agree on, and turns it into a clean invoice every month.`,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${body.variable} ${headline.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-background-full text-text-primary">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <SmoothScroll />
      </body>
    </html>
  );
}
