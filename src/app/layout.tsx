import type { Metadata } from "next";
import { Bricolage_Grotesque, Galada } from "next/font/google";
import "@/styles/globals.css";
import { LenisProvider } from "@/components/lenis/lenis-provider";

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
  title: "Découvrez l'ensemble de mes projets",
  description:
    "Explore Michel  portfolio showcasing innovative web development projects, internships, and front-end works.",
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
    title: "Michel DJOUMESSI - Front-End Developer Portfolio",
    description:
      "Explore cutting-edge web projects and internships by Michel DJOUMESSI.",
    type: "website",
    url: "null",
    siteName: "Michel Portfolio",
    locale: "en_US",
    images: [
      {
        url: "null",
        width: 1200,
        height: 630,
        alt: "Michel DJOUMESSI working on a web project",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",
    site: "null",
    creator: "@Michel",
    title: "Michel DJOUMESSI - Web Developer Portfolio",
    description: "Check out innovative web projects by Michel DJOUMESSI.",
    images: ["null"],
  },
};

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
    <html lang="en" className={`h-full bg-background text-foreground ${bricolageGrotesque.variable} ${playfair.variable}`}>
      <head>
        <link rel="shortcut icon" href="/images/logo/favicon.png" type="image/x-icon" />
      </head>
      <LenisProvider>
      <body className="font-bricolage-grotesque h-full">{children}</body>
      </LenisProvider>
    </html>
  );
}
