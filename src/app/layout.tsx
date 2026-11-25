import type { Metadata, Viewport } from "next";
import { Header, MobileBar } from "@/components/navigation";
import { Footer } from "@/components/shared";
import { MotionController } from "@/components/motion-controller";
import { RouteLoader } from "@/components/route-loader";
import { BusinessSchema } from "@/lib/seo";
import { SITE_URL } from "@/lib/content";
import { IS_PRODUCTION_SITE } from "@/lib/deployment";
import { GoogleTagManager } from "@/components/analytics/google-tag-manager";
import "./globals.css";
import "./motion.css";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  robots: {
    index: IS_PRODUCTION_SITE,
    follow: IS_PRODUCTION_SITE,
    googleBot: { index: IS_PRODUCTION_SITE, follow: IS_PRODUCTION_SITE },
  },
  icons: { icon: "/images/favicon.png", apple: "/images/favicon.png" },
  applicationName: "Halo Property Inspection",
};
export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: "#173f35",
};
export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <GoogleTagManager />
        <link
          rel="preload"
          href="/fonts/urbanist-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
        <link
          rel="preload"
          href="/fonts/manrope-latin.woff2"
          as="font"
          type="font/woff2"
          crossOrigin="anonymous"
        />
      </head>
      <body>
        <a href="#main-content" className="skip-link">
          Skip to content
        </a>
        <BusinessSchema />
        <Header />
        <main id="main-content">{children}</main>
        <Footer />
        <MobileBar />
        <MotionController />
        <RouteLoader />
      </body>
    </html>
  );
}
