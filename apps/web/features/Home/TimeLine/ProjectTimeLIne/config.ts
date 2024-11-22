import { TimelineItem } from "./type"

export const personalProjects: Array<TimelineItem> = [
  {
    title: "ポートフォリオサイト",
    period: "2024.11 - 現在",
    role: "個人開発",
    skills: [
      "Next.js",
      "TypeScript",
      "TailwindCSS",
      "shadcn-ui",
      "flamer motions",
    ],
    description:
      "React と Tailwind CSS を使用して作成した個人ポートフォリオサイト。アニメーションとレスポンシブデザインを実装。",
  },
  {
    title: "coffee drip Recipe app coffeerepi",
    period: "2023.09 - 2023.11",
    role: "個人開発",
    skills: ["Next.js", "TypeScript", "Firebase", "CSS Modules"],
    description:
      "Next.jsとTypeScriptを使用した、コーヒーラバーがDripレシピを管理できるアプリケーション",
  },
]

export const clientProjects = [
  {
    title: "AIをもちいた、会計事務所の業務改善アプリケーション開発",
    period: "2024.06 - 現在",
    role: "フロントエンド開発",
    skills: ["React", "Next.js", "Supabase", "shadcn-ui"],
    description:
      "AIを用いた会計事務所の業務改善アプリケーション開発を行いました。",
  },
  {
    title: "社内勤怠管理ーサービス",
    period: "2023.09 - 2023.12",
    role: "フロントエンド開発",
    skills: ["Next.js", "Firebase", "TypeScript"],
    description: "業務委託先の会社様の勤怠管理アプリケーションを開発",
  },
  {
    title: "決済アプリケーション管理サービスのフロントエンド開発",
    period: "2023.03 - 2023.12",
    role: "フロントエンドエンジニア",
    skills: ["React", "Next.js", "Ruby on Rails", "GraphQL", "Hasura", "AWS"],
    description:
      "C to C 中小販売店の決済端末と決済アプリケーションの管理サービス開発",
  },
]
