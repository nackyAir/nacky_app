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
    details: {
      structure: '10人未満 / リモートメイン',
      challenge:
        '外部サービスへの依存が多く、連携が切れるとユーザーが自力で復旧できない状態。課金の仕組みが実際の売り方と噛み合っていなかった。',
      actions: [
        '権限切れ・トークン失効を検知し再連携へ導く動線を Web・Chrome 拡張・通知メールに実装',
        '課金モデルを組織単位からユーザー単位へ移行(フロント〜決済連携〜DB)',
        'メール返信下書き生成・カスタムプロンプト・議事録ボット・カレンダー同期機能を開発',
        '社内管理画面の新規立ち上げ、インフラの Terraform 化、CI・QA 整備',
      ],
      outcome:
        '一人でフロントからインフラまで縦断して機能を届ける体制を構築。連携断からの自力復旧を可能にし、無料プラン・トライアル・法人契約を同一基盤で扱えるようにした。顧客要件定義の窓口も担当。',
    },
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
    details: {
      structure: '10人未満 / リモートメイン',
      challenge:
        '連絡・書類・債権者との交渉状況の管理が事務所の手作業に依存。相談者側も次に何をすべきか分かりにくい状態だった。',
      actions: [
        '相談者向けアプリに案件チャットと次の手続きを示すステップ UI、下書きの確認〜送信フローを実装',
        '事務所向け管理画面に案件・交渉相手・メンバー管理、CSV 一括インポート、LINE 配信メッセージの作成・送信を実装',
        'Auth0 による認証基盤(パスワードリセット・権限制御)を構築',
        'Hono での API 追加・バグ改善、Terraform でのステージング環境構築、E2E・ユニットテスト',
      ],
      outcome:
        '相談者・事務所の双方の画面をフロントエンド一人称で担い、5ヶ月でリリース。手作業だった案件管理と連絡を画面上で完結できるようにした。',
    },
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
    details: {
      structure: '10人未満 / リモートメイン',
      challenge:
        '会計業務は入力項目・確認事項が多く、画面が複雑になりやすい。専門知識のないユーザーでも迷わず進められる UI に落とし込む必要があった。',
      actions: [
        '画面遷移・エラーハンドリングの詳細設計を担当しチケット単位で機能開発を推進',
        'Figma を基に新規ページを実装、Server Action によるデータ処理と Supabase のデータ取得を担当',
        'Supabase SDK / Clerk による認証・データ連携',
        '入力フォームのステップ削減、一覧へのフィルタ・検索追加、エラー文言の改善を継続的に提案・実装',
      ],
      outcome:
        '13ヶ月にわたり継続参画し、設計から実装・テストまでを一人称で担当。UI/UX の改善提案を起点にした開発で、ユーザーの入力負荷を下げた。',
    },
  },
  {
    title: 'toC 占いチャットボットアプリ開発',
    period: '2023.12 - 2024.02',
    role: 'フロントエンドエンジニア',
    skills: ['TypeScript', 'Next.js(App Router)', 'Firebase', 'ChatGPT API'],
    description:
      'ChatGPT API を用いた対話機能を実装からテストまで担当し、3ヶ月でフロントエンドを実装完了。',
    destination: 'GEN',
    details: {
      structure: '10人未満 / フルリモート',
      challenge:
        'ChatGPT API を用いた対話機能という当時まだ知見の少ない領域を、短期間で立ち上げる必要があった。',
      actions: [
        'Figma を参照して Next.js(App Router)でページレイアウトを作成・修正しユニットテストまで実施',
        'ChatGPT API を用いたチャット機能の実装とテスト',
        'GitHub Issue でチケットを自ら作成・管理し 5 名チームの開発を進行',
      ],
      outcome:
        '3ヶ月で toC 向けチャットボットアプリのフロントエンドを実装完了。生成 AI API を扱う新規領域に主体的に取り組んだ。',
    },
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
    details: {
      structure: '10人未満 / フルリモート',
      challenge:
        'WebRTC を用いたリアルタイム配信画面という難度の高い実装に加え、ユーザーが直接触れるサービスとして UI/UX の継続的な改善が必要だった。',
      actions: [
        'Figma を参照して画面・コンポーネントを実装し UI/UX 改善を継続',
        'WebRTC を用いた配信画面を実装',
        'Firebase でのデータ処理',
        '実装・修正・ユニットテストとコードレビュー',
      ],
      outcome:
        '4ヶ月でリアルタイム配信画面を含むフロントエンドを実装。低レイヤ寄りの新規領域に取り組みつつ UI/UX 改善まで担当した。',
    },
  },
  {
    title: '社内勤怠管理ツール開発',
    period: '2023.09 - 2023.12',
    role: 'フロントエンドエンジニア',
    skills: ['TypeScript', 'Next.js', 'Chakra UI', 'Firebase'],
    description:
      '立ち上げ期から参画し 4ヶ月で画面実装を完了。GitHub Issue でのチケット管理まで自走。',
    details: {
      structure: '10人未満 / フルリモート',
      challenge:
        '初期フェーズのため画面仕様もタスクも未整備。3 名の少人数チームで設計から実装・テストまで進める体制づくりが求められた。',
      actions: [
        'Figma を参照して Next.js + Chakra UI で画面を構築',
        'Firebase(Firestore)からのデータ取得を実装',
        'GitHub Issue でチケットを自ら作成・管理して進行を可視化',
      ],
      outcome:
        '立ち上げ期から 4ヶ月で勤怠管理アプリの画面実装を完了。実装者としてだけでなく進行管理の一部も担った。',
    },
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
    details: {
      structure: '10〜50人未満 / フルリモート',
      challenge:
        'クライアント要望が未整理のままタスク化する必要があった。GraphQL 経由のデータの UI 反映と、項目数の多い管理画面フォームの実装・品質担保が求められた。',
      actions: [
        'Backlog でタスク作成・編集まで実施',
        'GraphQL(Hasura)でのデータ取得と UI 反映',
        'Mantine による画面実装・改善',
        'react-hook-form + zod でのフォーム構築',
        'ステージング環境で単体テスト・パフォーマンステスト',
      ],
      outcome:
        'フロントエンド開発支援として長期継続で参画。要件ヒアリングから UI 実装・テストまでを一貫して担当し、仕様整理の役割も任された。',
    },
  },
]
