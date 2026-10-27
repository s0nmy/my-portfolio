import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./styles/globals.css";

export const metadata: Metadata = {
  title: "Miyu Sone",
  description:
    "Go・TypeScript・Reactを中心に、Web・モバイルアプリ開発とプロダクトマネジメントに取り組む、神戸電子専門学校ITエキスパート科・曽根望夢のポートフォリオです。",
  icons: { icon: "/favicon.svg" },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
