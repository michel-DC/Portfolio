import type { Metadata } from "next";
import cn from "classnames";
import { Geist, Geist_Mono } from "next/font/google";
import { GeistSans } from "geist/font/sans";
import { GeistMono } from "geist/font/mono";
import "./globals.css";
import { Anek_Telugu } from "next/font/google";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const AnekTelugu = Anek_Telugu({
  variable: "--font-caption",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Michel portfolio",
  description: "Let's take a look at my portfolio.",
  keywords: [
    "portfolio",
    "Michel",
    "internship",
    "web development",
    "full-stack developer",
    "web developer",
    "front-end developer",
    "projects",
    "frontend",
    "backend",
  ],
  authors: [{ name: "Michel DJOUMESSI" }],
  robots: "index, follow",
  openGraph: {
    title: "Michel portfolio",
    description: "Let's take a look at my portfolio.",
    type: "website",
    url: "https://www.michelportfolio.com",
    images: [
      {
        url: "https://www.michelportfolio.com/og-image.jpg",
        width: 800,
        height: 600,
        alt: "Michel portfolio",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@michel",
    title: "Michel portfolio",
    description: "Let's take a look at my portfolio.",
    images: ["https://www.michelportfolio.com/twitter-image.jpg"],
  },
};

export const viewport = {
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="h-full bg-background text-foreground">
      <body
        className={cn(
          GeistSans.variable,
          AnekTelugu.variable,
          GeistMono.variable,
          "font-sans h-full"
        )}
      >
        {children}
      </body>
    </html>
  );
}
