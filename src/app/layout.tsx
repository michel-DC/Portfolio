import type { Metadata } from "next";
import { Bricolage_Grotesque, Galada } from "next/font/google";
import "@/styles/globals.css";
import { Header } from "@/components/layout/header";
import { Footer } from "@/components/layout/footer";
import { Background } from "@/components/background/background";
import Script from "next/script";

const bricolageGrotesque = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-bricolage-grotesque",
});

const playfair = Galada({
  subsets: ["latin"],
  weight: ["400"],
  variable: "--font-galada",
});
export const metadata: Metadata = {
  metadataBase: new URL("https://onlinemichel.dev"),
  title: "Michel DJOUMESSI - Développeur Fullstack Junior",
  description:
    "Découvrez un portfolio mettant en avant des projets web innovants, des expériences professionnelles et des réalisations fullstack axées sur la performance et le design.",
  keywords: [
    "Michel DJOUMESSI",
    "Michel DJOUMESSI portfolio",
    "web development projects",
    "full-stack web developer",
    "frontend and backend development",
    "web development internship",
    "React Next.js developer",
    "personal web projects",
    "frontend portfolio",
    "backend portfolio",
  ],

  authors: [{ name: "Michel DJOUMESSI" }],
  robots:
    "index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1",

  openGraph: {
    title: "Michel DJOUMESSI - Développeur Fullstack Junior",
    description:
      "Découvrez un portfolio mettant en avant des projets web innovants, des expériences professionnelles et des réalisations fullstack axées sur la performance et le design.",
    type: "website",
    url: "https://onlinemichel.dev",
    siteName: "Michel Portfolio",
    locale: "fr_FR",
    images: [
      {
        url: "/images/logo/og-image.png",
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
    title: "Michel DJOUMESSI - Développeur Fullstack Junior",
    description:
      "Découvrez un portfolio mettant en avant des projets web innovants, des expériences professionnelles et des réalisations fullstack axées sur la performance et le design.",
    images: ["/images/logo/avatar.png"],
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
    <html
      lang="fr"
      className={`h-full text-foreground ${bricolageGrotesque.variable} ${playfair.variable}`}
    >
      <head>
        <Script id="gtm-script" strategy="afterInteractive">
          {`(function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
        new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
        j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
        'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
        })(window,document,'script','dataLayer','GTM-5QMDFMGS');`}
        </Script>
        <link
          rel="shortcut icon"
          href="/images/logo/favicon.png"
          type="image/x-icon"
        />
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
              jobTitle: "Front-End / Full-Stack Developer",
              sameAs: [
                "https://github.com/michel-DC",
                "https://www.linkedin.com/in/micheldjoumessi",
              ],
            }),
          }}
        />
      </head>
      <body className="font-bricolage-grotesque h-full">
        <noscript>
          <iframe
            src="https://www.googletagmanager.com/ns.html?id=GTM-5QMDFMGS"
            height="0"
            width="0"
            style={{ display: "none", visibility: "hidden" }}
          ></iframe>
        </noscript>
        <Background>
          <Header />
          {children}
          <Footer />
        </Background>
      </body>
    </html>
  );
}
