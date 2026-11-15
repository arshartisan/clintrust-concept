import type { Metadata, Viewport } from "next";
import { Figtree } from "next/font/google";
import { SiteFooter } from "@/components/marketing/site-footer";
import { SiteHeader } from "@/components/marketing/site-header";
import { brand } from "@/content/landing";
import "@/styles/globals.css";

// Figtree (variable, 300 to 900) for the whole site.
// next/font downloads it at build time and serves it from this site: one
// latin-subset variable file, and no request to Google at runtime.
// styles/brand.css points Tailwind's --font-sans at --font-brand.
const figtree = Figtree({
  variable: "--font-brand",
  subsets: ["latin"],
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
    <html lang="en" className={`${figtree.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-background-full text-text-primary">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  );
}
