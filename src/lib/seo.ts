import type { Metadata } from "next";
import { SITE_URL } from "@/lib/site";

interface PageMetadataOptions {
  title: string;
  description: string;
  pathname: string;
}

export function createPageMetadata({
  title,
  description,
  pathname,
}: PageMetadataOptions): Metadata {
  const canonicalUrl = new URL(pathname, SITE_URL).toString();

  return {
    title,
    description,
    alternates: {
      canonical: canonicalUrl,
    },
    openGraph: {
      title,
      description,
      type: "website",
      url: canonicalUrl,
      siteName: "Michel Portfolio",
      locale: "fr_FR",
      images: [
        {
          url: `${SITE_URL}/images/profile/og-image.png`,
          width: 1200,
          height: 630,
          alt: "Portfolio de Michel Djoumessi",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      site: "@Michel",
      creator: "@Michel",
      title,
      description,
      images: [`${SITE_URL}/images/profile/og-image.png`],
    },
  };
}
