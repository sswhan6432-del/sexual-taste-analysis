import type { Metadata } from "next";
import "./globals.css";
import Header from "@/components/Header";

const siteUrl = "https://velvettest.space";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: "Velvet Compass — Discover Your Relationship Archetype",
    template: "%s | Velvet Compass",
  },
  description:
    "72 questions, 8 dimensions, 12 relationship archetypes. Discover your hidden personality map. All data stays on your device.",
  keywords: ["velvet compass", "relationship archetype", "personality test", "archetype analysis", "관계 성향 테스트", "아키타입", "심리 테스트", "relationship dynamics"],
  openGraph: {
    title: "Velvet Compass",
    description: "Discover your relationship style through 12 archetypes",
    url: siteUrl,
    siteName: "Velvet Compass",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Velvet Compass",
    description: "Discover your relationship style through 12 archetypes",
  },
  robots: {
    index: true,
    follow: true,
  },
  alternates: {
    canonical: siteUrl,
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
        {/* Google AdSense */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-3056597383286208"
          crossOrigin="anonymous"
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "WebApplication",
              name: "Velvet Compass",
              url: siteUrl,
              description: "72 questions, 8 dimensions, 12 relationship archetypes",
              applicationCategory: "EntertainmentApplication",
              offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
              publisher: {
                "@type": "Organization",
                name: "Velvet Compass",
              },
            }),
          }}
        />
      </head>
      <body className="antialiased pt-14">
        <Header />
        {children}
      </body>
    </html>
  );
}
