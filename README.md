# Naoki Hayashida Portfolioです🚀

## 概要
技術スタック、従事したサービスなどを掲載するNaoki Hayashidaのポートフォリオサイト。

## 技術スタック
- [Next.js](https://nextjs.org/) - Appルーター採用のReactフレームワーク
- [Supabase](https://supabase.com/) - バックエンドサービス（認証、データベース、ストレージ）
- [TypeScript](https://www.typescriptlang.org/) - 型安全な開発環境
- [Tailwind CSS](https://tailwindcss.com/) - ユーティリティファーストCSSフレームワーク
- [Zod](https://zod.dev/) - スキーマ検証ライブラリ
- [shadcnUI](https://ui.shadcn.com/) - UIコンポーネントライブラリ

## 開発環境のセットアップ

### 前提条件
- Node.js 20.x以上
- pnpm 8.x以上

### インストール手順
1. リポジトリをクローン
```bash
git clone https://github.com/nackyAir/nacky_app.git
cd nacky_app
```

2. 依存関係のインストール
```bash
pnpm install
```

4. 開発サーバーの起動
```bash
pnpm dev
```

## プロジェクト構造
```
├── apps/                 # アプリケーションディレクトリ
│   ├── web/              # メインのWebアプリケーション
│   │   ├── app/          # Appルーターのルート
│   │   │   ├── (auth)/   # 認証関連のルート
│   │   │   ├── (dashboard)/ # ダッシュボード関連のルート
│   │   │   ├── api/      # APIルート
│   │   │   └── layout.tsx # ルートレイアウト
│   │   ├── components/   # アプリ固有のコンポーネント
│   │   ├── lib/          # アプリ固有のユーティリティ
│   │   ├── public/       # 静的ファイル
│   │   └── types/        # アプリ固有の型定義
├── packages/             # 共有パッケージディレクトリ
│   ├── ui/               # 共有UIコンポーネントライブラリ
│   │   ├── components/   # shadcnのUIコンポーネント
│   ├── tsconfig/         # 共有TypeScript設定
│   └── utils/            # 共有ユーティリティ関数

```

## 主な機能
- githubAPIを用いて、技術の使用率をProgress化して、一覧して表示。
- 従事したサービス一覧を表示
- 技術ブログを作成できるようにする（WIP）

## デプロイ
Vercelへのデプロイ手順：
1. [Vercel](https://vercel.com)でアカウントを作成
2. リポジトリを接続
3. 環境変数を設定
4. デプロイボタンをクリック

## ライセンス
[MIT](LICENSE)