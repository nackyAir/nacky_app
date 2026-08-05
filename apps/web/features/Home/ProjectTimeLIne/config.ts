import type { TimeLineItem } from './type'

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
    title: 'Resme(レスミー)プロダクト開発',
    period: '2025.08 - 2026.04',
    role: 'フルスタックエンジニア(開発責任者)',
    skills: [
      'TypeScript',
      'Next.js(App Router)',
      'Google Cloud',
      'Terraform',
      'PostgreSQL',
      'Figma',
    ],
    description:
      'Gmail・カレンダー連携型の法人向け AI SaaS。再連携動線の整備、課金モデルのユーザー単位移行、議事録ボット等をフロントからインフラまで縦断して開発。顧客要件定義の窓口も担当。',
    destination: 'CAR',
  },
  {
    title: '弁護士事務所向け 債務整理業務改善サービス',
    period: '2025.08 - 2025.12',
    role: 'フロントエンドエンジニア',
    skills: [
      'TypeScript',
      'Next.js(App Router)',
      'Hono',
      'Google Cloud',
      'Terraform',
      'PostgreSQL',
    ],
    description:
      '相談者向けアプリと事務所向け管理画面をフロントエンド一人称で担い 5ヶ月でリリース。Auth0 認証基盤、LINE 配信、CSV 一括インポートを実装。',
  },
  {
    title: '会計事務所向け AI SaaS 開発',
    period: '2024.06 - 2025.06',
    role: 'フロントエンドエンジニア',
    skills: [
      'TypeScript',
      'Next.js(App Router)',
      'Supabase',
      'Google Cloud',
      'Figma',
    ],
    description:
      '13ヶ月継続参画。画面遷移・エラーハンドリングの詳細設計から実装・テストまで一人称で担当し、UI/UX 改善提案を起点にユーザーの入力負荷を削減。',
  },
  {
    title: 'toC 占いチャットボットアプリ開発',
    period: '2023.12 - 2024.02',
    role: 'フロントエンドエンジニア',
    skills: ['TypeScript', 'Next.js(App Router)', 'Firebase', 'ChatGPT API'],
    description:
      'ChatGPT API を用いた対話機能を実装からテストまで担当し、3ヶ月でフロントエンドを実装完了。',
    destination: 'GEN',
  },
  {
    title: 'toC ライブ配信ストリーミングサービス',
    period: '2023.12 - 2024.03',
    role: 'フロントエンドエンジニア',
    skills: [
      'TypeScript',
      'Next.js(Pages Router)',
      'WebRTC',
      'Firebase',
      'Express',
    ],
    description:
      'WebRTC を用いたリアルタイム配信画面を実装。Firebase でのデータ処理、UI/UX 改善、コードレビューまで担当。',
  },
  {
    title: '社内勤怠管理ツール開発',
    period: '2023.09 - 2023.12',
    role: 'フロントエンドエンジニア',
    skills: ['TypeScript', 'Next.js', 'Chakra UI', 'Firebase'],
    description:
      '立ち上げ期から参画し 4ヶ月で画面実装を完了。GitHub Issue でのチケット管理まで自走。',
  },
  {
    title: 'POS アプリケーション管理サービス開発',
    period: '2023.03 - 2024.03',
    role: 'フロントエンドエンジニア',
    skills: [
      'TypeScript',
      'Next.js(Pages Router)',
      'GraphQL(Hasura)',
      'AWS',
      'MySQL',
      'Mantine',
    ],
    description:
      '13ヶ月継続参画。GraphQL でのデータ取得と UI 反映、react-hook-form + zod のフォーム構築、仕様整理まで担当。',
    destination: 'GEN',
  },
]
