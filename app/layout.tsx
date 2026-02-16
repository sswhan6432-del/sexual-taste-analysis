import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

const siteUrl = "https://tastanalysis.com";

export const metadata: Metadata = {
  title: "Sexual Taste Analysis — Discover Your Intimate Archetype",
  description:
    "72 questions, 8 dimensions, 12 intimate archetypes. Discover your hidden desire map. All data stays on your device.",
  keywords: ["sexual taste", "intimate archetype", "BDSM", "personality test", "archetype analysis", "성적 취향", "아키타입"],
  openGraph: {
    title: "Sexual Taste Analysis",
    description: "Discover your intimate desires through 12 archetypes",
    url: siteUrl,
    siteName: "Sexual Taste Analysis",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sexual Taste Analysis",
    description: "Discover your intimate desires through 12 archetypes",
  },
  robots: {
    index: true,
    follow: true,
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ko">
      <head>
        <link rel="icon" href="/favicon.ico" sizes="any" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,300;0,400;0,500;0,600;0,700;1,300;1,400&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="antialiased pt-14">
        <Header />
        {children}
      </body>
    </html>
  );
}
