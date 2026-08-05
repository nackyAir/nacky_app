import type { PersonalWorkItem, TimelineItem, WorkItem } from './type'

export const featuredWorks: Array<WorkItem> = [
  {
    slug: 'resme',
    title: 'Resme',
    destination: { code: 'CAR', label: 'キャリア' },
    summary:
      'Gmail・カレンダー連携型の法人向け AI SaaS。フロントからインフラまで一人で縦断し、開発責任者として機能を届けた。',
    period: '2025.08 - 2026.04',
    duration: '9ヶ月',
    engagement: '正社員',
    role: 'フルスタック / 開発責任者',
    team: '10人未満・リモートメイン',
    stack: [
      'TypeScript',
      'Next.js (App Router)',
      'Google Cloud',
      'Terraform',
      'PostgreSQL',
      'Figma',
    ],
    challenge:
      '外部サービスへの依存が多く、連携が切れるとユーザーが自力で復旧できない状態だった。加えて課金の仕組みが実際の売り方と噛み合っていなかった。',
    actions: [
      '権限切れ・トークン失効を検知し、再連携へ導く動線を Web・Chrome 拡張・通知メールの3経路に実装',
      '課金モデルを組織単位からユーザー単位へ移行（フロント〜決済連携〜DB まで通して対応）',
      'メール返信の下書き生成、カスタムプロンプト、議事録ボット、カレンダー同期を開発',
      '社内管理画面を新規立ち上げ、インフラを Terraform 化し CI・QA を整備',
    ],
    outcome:
      '一人でフロントからインフラまで縦断して機能を届ける体制を構築した。連携が切れても利用者が自力で復旧できるようにし、無料プラン・トライアル・法人契約を同一基盤で扱えるようにした。顧客要件を詰める窓口も担当した。',
  },
  {
    slug: 'legal-debt-workflow',
    title: '弁護士事務所向け 債務整理業務改善サービス',
    destination: { code: 'LAW', label: '法律' },
    summary:
      '相談者向けと事務所向けの両方の画面をフロントエンド一人称で担当し、5ヶ月でリリースまで持っていった受託開発。',
    period: '2025.08 - 2025.12',
    duration: '5ヶ月',
    engagement: '正社員',
    role: 'フロントエンド',
    team: '10人未満・リモートメイン',
    stack: [
      'TypeScript',
      'Next.js (App Router)',
      'Hono',
      'Google Cloud',
      'Terraform',
      'PostgreSQL',
      'Auth0',
    ],
    challenge:
      '債務整理は連絡・書類・債権者との交渉状況の管理が事務所の手作業に依存していた。相談者側も、次に何をすべきかが分かりにくい状態だった。',
    actions: [
      '相談者向けアプリ: 案件チャット、次の手続きを示すステップ UI、下書き確認から送信までのフローを実装',
      '事務所向け管理画面: 案件・交渉相手・メンバー管理、CSV 一括インポート、LINE 配信メッセージの作成と送信を実装',
      'Auth0 による認証基盤（パスワードリセット・権限制御）を構築',
      'Hono での API 追加とバグ改善、Terraform でのステージング環境構築、E2E・ユニットテストを実施',
    ],
    outcome:
      '相談者・事務所双方の画面をフロントエンド一人称で担い、5ヶ月でリリース。事務所の手作業だった案件管理と連絡を、画面上で完結できるようにした。',
  },
  {
    slug: 'accounting-ai-saas',
    title: '会計事務所向け AI SaaS',
    destination: { code: 'ACC', label: '会計' },
    summary:
      '13ヶ月の継続参画。指示待ちではなく UI/UX の改善提案を起点にした開発で、ユーザーの入力負荷を下げた。',
    period: '2024.06 - 2025.06',
    duration: '13ヶ月',
    engagement: '正社員',
    role: 'フロントエンド',
    team: '10人未満・リモートメイン',
    stack: [
      'TypeScript',
      'Next.js (App Router)',
      'Supabase',
      'Clerk',
      'Google Cloud',
      'Figma',
    ],
    challenge:
      '会計業務は入力項目・確認事項が多く、画面が複雑になりやすい。専門知識のないユーザーでも迷わず進められる UI に落とし込む必要があった。',
    actions: [
      '画面遷移とエラーハンドリングの詳細設計を担当し、チケット単位で機能開発を推進',
      'Figma を基に新規ページを実装。Server Action によるデータ処理、Supabase のデータ取得とテーブル項目の追加修正を担当',
      'Supabase SDK / Clerk による認証・データ連携を実装',
      '入力フォームのステップ削減、一覧へのフィルタ・検索追加、エラー文言の改善を継続的に提案・実装',
      'ユニット・E2E テストを実施し、レビューを経て検証環境へマージ',
    ],
    outcome:
      '13ヶ月にわたり継続参画し、設計から実装・テストまでを一人称で担当。指示待ちではなく UI/UX の改善提案を起点にした開発で、ユーザーの入力負荷を下げた。',
  },
]

export const freelanceTimeline: Array<TimelineItem> = [
  {
    slug: 'consumer-live-streaming',
    period: '2023.12 - 2024.03',
    title: 'toC ライブ配信サービス',
    destination: { code: 'LIV', label: '配信' },
    role: 'フロントエンド',
    stack: ['TypeScript', 'Next.js', 'WebRTC', 'Firebase', 'Express'],
    note: 'WebRTC を用いたリアルタイム配信画面を実装。UI/UX の改善も継続して担当した。',
  },
  {
    slug: 'consumer-fortune-chatbot',
    period: '2023.12 - 2024.02',
    title: 'toC 占いチャットボット',
    role: 'フロントエンド',
    stack: ['TypeScript', 'Next.js', 'ChatGPT API', 'Firebase'],
    note: '当時まだ知見の少なかった生成 AI API での対話機能を、実装からテストまで一人称で担当。',
  },
  {
    slug: 'internal-attendance-tool',
    period: '2023.09 - 2023.12',
    title: '社内勤怠管理ツール',
    role: 'フロントエンド',
    stack: ['TypeScript', 'Next.js', 'Firestore', 'Chakra UI'],
    note: '画面仕様もタスクも未整備の初期フェーズから参画し、3名体制で立ち上げた。',
  },
  {
    slug: 'pos-management-service',
    period: '2023.03 - 2024.03',
    title: 'POS アプリケーション管理サービス',
    role: 'フロントエンド',
    stack: ['TypeScript', 'Next.js', 'GraphQL (Hasura)', 'AWS', 'MySQL'],
    note: '13ヶ月継続。要件ヒアリングから UI 実装・テストまで担当し、仕様整理の役割も任された。',
  },
]

export const personalWorks: Array<PersonalWorkItem> = [
  {
    title: 'madoguchi',
    period: '2026.05 - 現在',
    url: 'https://madoguchi.co',
    destination: { code: 'EST', label: '住宅' },
    description:
      '住宅系事業者向けの、問い合わせ一次対応とリード獲得を担う AI チャットボット。',
    stack: [
      'Next.js 16',
      'Hono',
      'AI SDK v5',
      'Claude',
      'Drizzle ORM',
      'PostgreSQL',
      'Cloudflare Workers',
    ],
  },
  {
    title: 'coffeerepi',
    period: '2023.09 - 2023.11',
    url: 'https://coffee-recipe-app-fire.vercel.app/',
    description:
      'コーヒーのドリップレシピを記録・管理するアプリ。自分が使いたくて作った。',
    stack: ['TypeScript', 'Next.js', 'Firebase'],
  },
  {
    title: 'このポートフォリオサイト',
    period: '2024.11 - 現在',
    url: 'https://github.com/nackyAir/nacky_app',
    description:
      'Turborepo のモノレポ構成。Next.js App Router と Hono で組んでいる。',
    stack: ['TypeScript', 'Next.js', 'Tailwind CSS', 'Turborepo'],
  },
]

export function findWorkBySlug(
  slug: string
): WorkItem | TimelineItem | undefined {
  return (
    featuredWorks.find((work) => work.slug === slug) ??
    freelanceTimeline.find((work) => work.slug === slug)
  )
}
