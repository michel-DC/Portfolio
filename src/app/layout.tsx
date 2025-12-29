import type { Metadata } from "next";
import "@/styles/globals.css";
import Script from "next/script";
import CustomCursor from "@/components/ui/custom-cursor";
import SmoothScroll from "@/components/ui/smooth-scroll";
import { Toaster } from "sonner";

export const metadata: Metadata = {
  metadataBase: new URL("https://onlinemichel.dev"),
  title: "Michel DJOUMESSI • Développeur Fullstack & Créateur Web",
  description:
    "Découvrez un portfolio mettant en avant des projets web innovants, des expériences professionnelles et des réalisations fullstack axées sur la performance et le design.",
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

  openGraph: {
    title: "Michel DJOUMESSI • Développeur Fullstack & Créateur Web",
    description:
      "Découvrez un portfolio mettant en avant des projets web innovants, des expériences professionnelles et des réalisations fullstack axées sur la performance et le design.",
    type: "website",
    url: "https://onlinemichel.dev",
    siteName: "Michel Portfolio",
    locale: "fr_FR",
    images: [
      {
        url: "/images/profile/og-image.png",
        width: 1200,
        height: 630,
        alt: "Bannière de Michel Djoumessi",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "@Michel",
    creator: "@Michel",
    title: "Michel DJOUMESSI • Développeur Fullstack & Créateur Web",
    description:
      "Découvrez un portfolio mettant en avant des projets web innovants, des expériences professionnelles et des réalisations fullstack axées sur la performance et le design.",
    images: ["/images/profile/og-image.png"],
  },
  icons: {
    icon: "/images/svg/logo-noir.svg",
    shortcut: "/images/svg/favicon.svg",
    apple: "/images/svg/favicon.svg",
  },
};

// Helper for templates / routes that need the absolute site URL
const SITE_URL =
  metadata.metadataBase instanceof URL
    ? metadata.metadataBase.href
    : String(metadata.metadataBase);
export const viewport = {
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="fr" className={`h-full text-foreground`}>
      <head>
        <Script id="gtm-script" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-5QMDFMGS');`}
        </Script>
        {/* Canonical and JSON-LD for improved SEO */}
        <link rel="canonical" href={SITE_URL} />
        <link
          rel="sitemap"
          type="application/xml"
          href={`${SITE_URL}sitemap.xml`}
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
        <CustomCursor />
        <SmoothScroll />
        <Toaster position="bottom-right" richColors />

        {children}
      </body>
    </html>
  );
}
