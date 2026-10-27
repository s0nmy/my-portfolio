import type { Metadata } from "next";
import type { ReactNode } from "react";
import "./styles/globals.css";

const title = "Miyu Sone";
const description =
  "Go・TypeScript・Reactを中心に、Web・モバイルアプリ開発とプロダクトマネジメントに取り組む、神戸電子専門学校ITエキスパート科・曽根望夢のポートフォリオです。";

const ogImageAlt = "Miyu Soneのプロフィールカード。Software engineer & product thinker";

// The canonical URL is set as a build variable so the domain stays out of the repository.
const siteUrl = process.env.SITE_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title,
  description,
  icons: { icon: "/favicon.svg" },
  openGraph: {
    type: "website",
    url: "/",
    siteName: title,
    title,
    description,
    locale: "ja_JP",
    images: [{ url: "/og-image.png", width: 1200, height: 630, alt: ogImageAlt }],
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
    images: [{ url: "/og-image.png", alt: ogImageAlt }],
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="ja">
      <body>{children}</body>
    </html>
  );
}
