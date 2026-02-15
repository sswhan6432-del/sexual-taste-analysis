import type { Metadata } from "next";
import "./globals.css";

const siteUrl = "https://tastanalysis.com";

export const metadata: Metadata = {
  title: "Sexual Taste Analysis — 당신의 성적 취향 아키타입 분석",
  description:
    "72개 질문, 8개 차원, 12가지 성적 아키타입. 당신만의 은밀한 욕망 지도를 그려보세요. 모든 데이터는 기기에만 저장됩니다.",
  keywords: ["sexual taste", "성적 취향", "아키타입", "BDSM", "성향 테스트", "intimate archetype"],
  openGraph: {
    title: "Sexual Taste Analysis",
    description: "당신의 은밀한 욕망을 12가지 아키타입으로 해부합니다",
    url: siteUrl,
    siteName: "Sexual Taste Analysis",
    locale: "ko_KR",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Sexual Taste Analysis",
    description: "당신의 은밀한 욕망을 12가지 아키타입으로 해부합니다",
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
      <body className="antialiased">{children}</body>
    </html>
  );
}
