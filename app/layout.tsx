import type { Metadata, Viewport } from "next";
import { Inter } from "next/font/google";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { SmoothScroll } from "@/components/marketing/smooth-scroll";
import { brand } from "@/content/landing";
import "lenis/dist/lenis.css";
import "@/styles/globals.css";

// Inter (variable, with its optical-size axis) for the whole site. With the
// axis loaded, the browser switches to Inter's display drawing at large sizes
// on its own, so headings get the tighter cut and body text the text cut.
// next/font downloads it at build time and serves it from this site: one
// latin-subset variable file, and no request to Google at runtime.
// styles/brand.css points Tailwind's --font-sans at --font-brand.
const inter = Inter({
  variable: "--font-brand",
  subsets: ["latin"],
  axes: ["opsz"],
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: `${brand.name} | Clinical trial site payments, settled on verified work`,
    template: `%s | ${brand.name}`,
  },
  description: `${brand.name} is the payment orchestration layer between sponsors, CROs and research sites. One verified record of trial activity, continuous reconciliation, and site payments that settle at T+5.`,
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#ffffff",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-background-full text-text-primary">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
        <SmoothScroll />
      </body>
    </html>
  );
}
