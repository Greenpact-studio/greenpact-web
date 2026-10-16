import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { SmoothScroll } from "@/components/SmoothScroll";
import { AnciennesAncres } from "@/components/AnciennesAncres";
import { SITE } from "@/data/config";
import { JsonLd } from "@/components/JsonLd";
import { ORGANISATION, SITE_WEB } from "@/data/seo";

const poppins = Poppins({
  weight: ["300", "400", "500", "600"],
  subsets: ["latin"],
  display: "swap",
  variable: "--font-poppins",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE.url),
  title: {
    default: SITE.nom,
    template: `%s | ${SITE.nom}`,
  },
  description: SITE.description,
  openGraph: {
    type: "website",
    locale: "fr_FR",
    siteName: SITE.nom,
    images: [{ url: "/images/og-greenpact.jpg", width: 1200, height: 630, alt: "Greenpact, forêt vue du ciel" }],
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html lang="fr" className={poppins.variable}>
      <body>
        <a href="#contenu" className="evitement">
          Aller au contenu
        </a>
        <JsonLd data={[ORGANISATION, SITE_WEB]} />
        <SmoothScroll />
        <AnciennesAncres />
        <Header />
        <main id="contenu">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
