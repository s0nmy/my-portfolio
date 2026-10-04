import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./globals.css";

export const metadata: Metadata = {
  title: "Miyu Sone",
  description:
    "Go・TypeScript・Reactを中心に、Web・モバイルアプリ開発とプロダクトマネジメントに取り組む、神戸電子専門学校ITエキスパート科・曽根望夢のポートフォリオです。",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja" className="scroll-smooth [scroll-padding-top:var(--header-height,6rem)] motion-reduce:scroll-auto">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className="overflow-x-hidden bg-white font-main leading-[1.8] text-ink">{children}</body>
    </html>
  );
}
