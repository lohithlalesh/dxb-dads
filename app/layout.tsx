import type { Metadata } from "next";
import { headers } from "next/headers";
import "./globals.css";

export async function generateMetadata(): Promise<Metadata> {
  const requestHeaders = await headers();
  const host =
    requestHeaders.get("x-forwarded-host") ??
    requestHeaders.get("host") ??
    "localhost:3003";
  const protocol =
    requestHeaders.get("x-forwarded-proto") ??
    (host.startsWith("localhost") ? "http" : "https");
  const siteUrl = new URL(`${protocol}://${host}`);
  const socialImage = new URL("/og.png", siteUrl).toString();

  return {
    metadataBase: siteUrl,
    title: "DXB Dads — Real dads · Real talk · Dubai life",
    description:
      "Three dads raising daughters talk honestly about family, business and life in Dubai and the UAE",
    keywords: [
      "DXB Dads",
      "Dubai podcast",
      "UAE podcast",
      "fatherhood",
      "business",
      "family",
    ],
    alternates: {
      canonical: siteUrl,
    },
    openGraph: {
      title: "DXB Dads",
      description: "Real dads · Real talk · Dubai life",
      type: "website",
      url: siteUrl,
      images: [
        {
          url: socialImage,
          width: 1693,
          height: 929,
          alt: "DXB Dads podcast — three hosts in their Dubai studio",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: "DXB Dads",
      description: "Real dads · Real talk · Dubai life",
      images: [socialImage],
    },
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
