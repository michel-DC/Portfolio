import type { Metadata } from "next";
import localFont from "next/font/local";
import "@/styles/globals.css";
import Script from "next/script";
import CinemaTransition from "@/components/ui/cinema-transition";
import SmoothScroll from "@/components/ui/smooth-scroll";
import { Toaster } from "sonner";
import CommandMenu from "@/components/ui/command-menu";
import { trackVisit } from "@/lib/analytics";
import { SITE_URL } from "@/lib/site";
import { createPageMetadata } from "@/lib/seo";

const montserrat = localFont({
  src: "../../public/fonts/montserrat/Montserrat-Variable.ttf",
  variable: "--font-montserrat",
  display: "swap",
  weight: "100 900",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  ...createPageMetadata({
    title: "Michel DJOUMESSI • Développeur Fullstack & Créateur Web",
    description:
      "Découvrez un portfolio mettant en avant des projets web innovants, des expériences professionnelles et des réalisations fullstack axées sur la performance et le design.",
    pathname: "/",
  }),
  keywords: [
    "Michel DJOUMESSI",
    "Michel DJOUMESSI portfolio",
    "projets de développement web",
    "développeur web full-stack",
    "développement frontend et backend",
    "stage en développement web",
    "développeur React Next.js",
    "projets web personnels",
    "portfolio frontend",
    "portfolio backend",
  ],

  authors: [{ name: "Michel DJOUMESSI" }],
  robots:
    "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",
  icons: {
    icon: "/images/svg/favicon.svg",
    shortcut: "/images/svg/favicon.svg",
    apple: "/images/svg/favicon.svg",
  },
};

export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  await trackVisit();

  return (
    <html lang="fr" className={`h-full text-foreground ${montserrat.variable}`}>
      <head>
        <Script id="gtm-script" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-5QMDFMGS');`}
        </Script>
        {/* Canonical and JSON-LD for improved SEO */}
        <link
          rel="sitemap"
          type="application/xml"
          href={`${SITE_URL}/sitemap.xml`}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Michel DJOUMESSI",
              url: SITE_URL,
              jobTitle: "Développeur Front-End / Full-Stack",
              sameAs: [
                "https://github.com/michel-DC",
                "https://www.linkedin.com/in/micheldjoumessi",
              ],
            }),
          }}
        />
      </head>
      <body className="h-full">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5QMDFMGS"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <CinemaTransition />
        <SmoothScroll />
        <CommandMenu />
        <Toaster position="bottom-right" richColors />

        {children}
      </body>
    </html>
  );
}
