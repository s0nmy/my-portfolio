export type Project = {
  slug: string;
  title: string;
  description: string;
  technologies: string;
  images: readonly string[];
  imageAlt: string;
  href?: string;
};

export const projects: readonly Project[] = [
  {
    slug: "chronome",
    title: "ChronoMe",
    description: "時間記録・管理Webアプリ。初めての個人制作で要件定義から設計、実装、テストまで幅広く学ぶ。",
    technologies: "Go / React / TypeScript / PostgreSQL",
    images: ["/images/ChronoMe/00_ChronoMe.png", "/images/ChronoMe/02_GanttChart.png", "/images/ChronoMe/03_Top.png"],
    imageAlt: "ChronoMeの画面",
    href: "https://github.com/s0nmy/ChronoMe",
  },
  {
    slug: "surekku",
    title: "すれック",
    description: "近距離音楽交換SNS。Google Developer Groups on Campus Hackathon 2026 でのチーム制作。PdM・バックエンド・iOSフロントエンドを担当。ゴネンゴ賞受賞。",
    technologies: "Go / Swift / SwiftUI / BLE / GCP",
    images: ["/images/hackathon/00_hackathon.png", "/images/hackathon/01_hackathon.png"],
    imageAlt: "すれックの画面",
    href: "https://github.com/Digix00/hackathon",
  },
  {
    slug: "kuguri",
    title: "Kuguri",
    description: "チーム制作プロジェクト。PdM・フロントエンドとして、UI実装・UX改善・プロダクト管理を担当。",
    technologies: "React / TypeScript / React Native (Expo)",
    images: ["/images/Kuguri.png"],
    imageAlt: "Kuguriの画面",
    href: "https://github.com/TeamH04/team-production",
  },
  {
    slug: "sparkday",
    title: "SparkDay",
    description: "Alpha+ Projectでのチーム制作プロジェクト。",
    technologies: "詳細準備中",
    images: ["/images/Sparkday.png"],
    imageAlt: "SparkDayの画面",
  },
];
