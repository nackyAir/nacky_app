import { TimeLineItem } from './type'

export const personalProjects: Array<TimeLineItem> = [
  {
    title: 'ポートフォリオサイト',
    period: '2024.11 - 現在',
    role: '個人開発',
    url: 'https://nacky.me/home',
    skills: [
      'TypeScript',
      'Next.js(App Router)',
      'TailwindCSS',
      'shadcn-ui',
      'flamer motions',
    ],
    description:
      'Nextjs と Tailwind CSS を使用して作成した個人ポートフォリオサイト。アニメーションとレスポンシブデザインを実装。',
  },
  {
    title: 'coffee drip Recipe app coffeerepi',
    period: '2023.09 - 2023.11',
    role: '個人開発',
    skills: ['TypeScript', 'Next.js(Pages Router)', 'Firebase', 'CSS Modules'],
    url: 'https://coffee-recipe-app-fire.vercel.app/',
    description:
      'Next.jsとTypeScriptを使用した、コーヒーラバーがDripレシピを管理できるアプリケーション',
  },
]

export const clientProjects: Array<TimeLineItem> = [
  {
    title: 'AIをもちいた、会計事務所の業務改善アプリケーション開発',
    period: '2024.06 - 現在',
    role: 'インターン',
    skills: [
      'TypeScript',
      'Next.js(App Router)',
      'shadcn-ui',
      'Supabase',
      'GCP',
      'Clerk',
      'Drizzle ORM',
    ],
    description:
      'AIを用いた会計事務所の業務改善アプリケーション開発を行いました。',
  },
  {
    title: '社内勤怠管理ーサービス',
    period: '2023.09 - 2023.12',
    role: '業務委託',
    skills: ['TypeScript', 'Next.js(App Router)', 'Firebase', 'Prisma'],
    description: '業務委託先の会社様の勤怠管理アプリケーションを開発',
  },
  {
    title: '決済アプリケーション管理サービスのフロントエンド開発',
    period: '2023.03 - 2023.12',
    role: '業務委託',
    skills: [
      'TypeScript',
      'Next.js(Page Router)',
      'Ruby on Rails',
      'GraphQL',
      'Hasura',
      'AWS',
    ],
    description:
      'C to C 中小販売店の決済端末と決済アプリケーションの管理サービス開発',
  },
]
