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
  authors: [{ name: site.legalName }],
  creator: site.legalName,
  publisher: site.legalName,
  category: "technology",
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
