import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { site } from "@/lib/site";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL(site.domain),
  title: {
    default: "Agjent038",
    template: "%s | Agjent038",
  },
  description: "AI receptionist for Kosovo call centres — from €299 / month",
  authors: [{ name: site.legalName }],
  creator: site.legalName,
  publisher: site.legalName,
  category: "technology",
  icons: {
    icon: "/favicon.png",
    apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Agjent038",
    description: "AI receptionist for Kosovo call centres — from €299 / month",
    url: site.domain,
    siteName: "Agjent038",
    images: [
      {
        url: "/opengraph-image.png",
        width: 1200,
        height: 630,
        alt: "Agjent038 — AI Receptionist for Kosovo Call Centres",
        type: "image/png",
      },
    ],
    locale: "sq_AL",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Agjent038",
    description: "AI receptionist for Kosovo call centres — from €299 / month",
    images: ["/opengraph-image.png"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: { index: true, follow: true, "max-image-preview": "large" },
  },
};

export const viewport: Viewport = {
  themeColor: "#f8f8f6",
  width: "device-width",
  initialScale: 1,
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="sq" dir="ltr">
      <body className="antialiased">{children}</body>
    </html>
  );
}
