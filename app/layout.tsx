import type { Metadata, Viewport } from "next";
import { PODCAST } from "../lib/podcast";
import { SITE_URL, siteUrl } from "../lib/site";
import "./globals.css";
import "./hero-rebuild.css";

export const viewport: Viewport = {
  themeColor: "#0d0b09",
  colorScheme: "dark",
};

export async function generateMetadata(): Promise<Metadata> {
  const metadataBase = new URL(`${SITE_URL}/`);
  const socialImage = siteUrl("/og.png");

  return {
    metadataBase,
    title: {
      default: "DXB Dads Podcast — Fatherhood, Family & Real Talk in Dubai",
      template: "%s | DXB Dads Podcast",
    },
    description: PODCAST.description,
    applicationName: PODCAST.name,
    authors: [
      { name: "Pranav" },
      { name: "Mustapha" },
      { name: "Pavle Rastovic" },
    ],
    creator: "DXB Dads",
    publisher: "DXB Dads",
    category: "Parenting",
    keywords: [
      "DXB Dads",
      "DXB Dads podcast",
      "Dubai dads",
      "Dubai podcast",
      "UAE podcast",
      "fatherhood podcast",
      "parenting podcast",
      "modern fatherhood",
      "family life Dubai",
      "manhood",
      "dad life",
      "UAE parents",
    ],
    alternates: {
      canonical: siteUrl("/"),
      types: { "application/rss+xml": PODCAST.rss },
    },
    icons: {
      icon: siteUrl("/dxb-dads-logo-clean.png"),
      apple: siteUrl("/dxb-dads-logo-clean.png"),
    },
    manifest: "/manifest.webmanifest",
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        "max-image-preview": "large",
        "max-snippet": -1,
        "max-video-preview": -1,
      },
    },
    openGraph: {
      title: "DXB Dads Podcast",
      description: "Three Dads. Three Cultures. Dubai Life. Real conversations about fatherhood, manhood, friendship and family.",
      type: "website",
      siteName: "DXB Dads",
      locale: "en_AE",
      url: siteUrl("/"),
      images: [
        {
          url: socialImage,
          width: 1200,
          height: 630,
          alt: "DXB Dads Podcast — Pranav, Mustapha and Pavle in their Dubai studio",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "DXB Dads Podcast",
      description: "Three Dads. Three Cultures. Dubai Life.",
      images: [socialImage],
    },
    other: {
      "geo.region": "AE-DU",
      "geo.placename": "Dubai",
      "apple-itunes-app": "app-id=525463029",
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en-AE">
      <body>{children}</body>
    </html>
  );
}
