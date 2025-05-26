# NackyApp Portfolio

<!-- Language Switcher -->
<div align="center">
  <p>
    <a href="#日本語版">🇯🇵 日本語</a> |
    <a href="#english-version">🇺🇸 English</a>
  </p>
</div>

---

## 日本語版

### 📝 プロジェクト概要

NackyAppは、Next.js 15とReact 19を使用して構築されたモダンなポートフォリオWebサイトです。個人のスキル、プロジェクト、経歴を紹介し、ブログ機能とお問い合わせフォームを含む包括的なWebアプリケーションです。

### ✨ 主な機能

- **🎨 モダンなUI/UX**: TailwindCSS v4とFramer Motionによる美しいアニメーション
- **📱 レスポンシブデザイン**: すべてのデバイスで最適化された表示
- **📝 ブログシステム**: 記事の作成・管理機能
- **📧 お問い合わせフォーム**: アニメーション付きのインタラクティブなフォーム
- **🚀 パフォーマンス**: Next.js 15の最新機能による高速表示
- **🎯 SEO最適化**: 構造化データとメタデータの完全対応
- **📊 プロジェクトタイムライン**: 経歴とプロジェクトの可視化
- **💼 スキルバッジ**: 技術スタックの表示
- **📈 言語統計**: GitHubリポジトリからの言語使用状況
- **🔗 ソーシャルリンク**: X、Instagram、GitHubへのリンク

### 🛠️ 技術スタック

#### フロントエンド
- **[Next.js 15](https://nextjs.org/)** - Reactフレームワーク
- **[React 19](https://react.dev/)** - UIライブラリ
- **[TypeScript](https://www.typescriptlang.org/)** - 型安全性
- **[TailwindCSS v4](https://tailwindcss.com/)** - ユーティリティファーストCSS
- **[Framer Motion](https://www.framer.com/motion/)** - アニメーションライブラリ

#### 開発ツール
- **[Turborepo](https://turbo.build/)** - モノレポ管理
- **[pnpm](https://pnpm.io/)** - パッケージマネージャー
- **[ESLint](https://eslint.org/)** - コード品質
- **[Prettier](https://prettier.io/)** - コードフォーマット

#### フォームとバリデーション
- **[React Hook Form](https://react-hook-form.com/)** - フォーム管理
- **[Zod](https://zod.dev/)** - スキーマバリデーション
- **[Next Safe Action](https://next-safe-action.dev/)** - サーバーアクション

#### UI コンポーネント
- **[Radix UI](https://www.radix-ui.com/)** - アクセシブルなプリミティブ
- **[Sonner](https://sonner.emilkowal.ski/)** - トースト通知

### 🚀 セットアップ

#### 前提条件
- Node.js 18.17以上
- pnpm 8.0以上

#### インストール

```bash
# リポジトリをクローン
git clone https://github.com/nackyAir/nacky_app.git
cd nacky_app

# 依存関係をインストール
pnpm install

# 開発サーバーを起動
pnpm dev
```

#### 環境変数

`.env.local`ファイルを`apps/web`ディレクトリに作成し、以下の変数を設定してください：

```env
# Resend (メール送信用)
RESEND_API_KEY=your_resend_api_key
CONTACT_EMAIL=your_contact_email@example.com

# GitHub (言語統計用)
GITHUB_TOKEN=your_github_token
```

### 📁 プロジェクト構造

```
nacky_app/
├── apps/
│   └── web/                    # メインWebアプリケーション
│       ├── actions/            # サーバーアクション
│       ├── app/                # App Router
│       ├── components/         # 共通コンポーネント
│       ├── features/           # 機能別コンポーネント
│       │   ├── Blog/          # ブログ機能
│       │   ├── Home/          # ホームページ機能
│       │   └── Layout/        # レイアウトコンポーネント
│       ├── lib/               # ユーティリティ関数
│       └── public/            # 静的ファイル
├── packages/                   # 共有パッケージ
└── docs/                      # ドキュメント
```

### 🏃‍♂️ 開発

#### 利用可能なスクリプト

```bash
# 開発サーバー起動
pnpm dev

# プロダクションビルド
pnpm build

# プロダクションサーバー起動
pnpm start

# リンターの実行
pnpm lint

# 型チェック
pnpm type-check
```

#### 開発ガイドライン

1. **コード品質**: ESLintとPrettierの設定に従ってください
2. **型安全性**: TypeScriptを積極的に活用してください
3. **コンポーネント設計**: 再利用可能で保守しやすいコンポーネントを作成してください
4. **パフォーマンス**: Next.js 15の最新機能を活用してください

### 🎯 主要機能

#### ホームページ
- プロフィール紹介
- スキルバッジ表示
- プロジェクトタイムライン
- 言語使用状況グラフ
- ソーシャルリンク

#### ブログ
- 記事の作成・編集
- Markdownサポート
- SEO最適化

#### お問い合わせ
- バリデーション付きフォーム
- アニメーション効果
- メール送信機能

### 🤝 コントリビューション

1. このリポジトリをフォーク
2. フィーチャーブランチを作成 (`git checkout -b feature/amazing-feature`)
3. 変更をコミット (`git commit -m 'Add some amazing feature'`)
4. ブランチにプッシュ (`git push origin feature/amazing-feature`)
5. プルリクエストを作成

### 📄 ライセンス

このプロジェクトはMITライセンスの下で公開されています。詳細は[LICENSE](LICENSE)ファイルをご覧ください。

### 👤 作者

**nackyAir**
- GitHub: [@nackyAir](https://github.com/nackyAir)
- X: [@naoki__0509](https://x.com/naoki__0509)
- Instagram: [@nacky_coffee](https://www.instagram.com/nacky_coffee)

---

## English Version

### 📝 Project Overview

NackyApp is a modern portfolio website built with Next.js 15 and React 19. It's a comprehensive web application that showcases personal skills, projects, and experience, featuring a blog system and contact form functionality.

### ✨ Key Features

- **🎨 Modern UI/UX**: Beautiful animations with TailwindCSS v4 and Framer Motion
- **📱 Responsive Design**: Optimized display across all devices
- **📝 Blog System**: Article creation and management functionality
- **📧 Contact Form**: Interactive form with animated effects
- **🚀 Performance**: Fast loading with Next.js 15's latest features
- **🎯 SEO Optimized**: Complete structured data and metadata support
- **📊 Project Timeline**: Visualization of experience and projects
- **💼 Skill Badges**: Technology stack display
- **📈 Language Statistics**: GitHub repository language usage
- **🔗 Social Links**: Links to X, Instagram, and GitHub

### 🛠️ Tech Stack

#### Frontend
- **[Next.js 15](https://nextjs.org/)** - React framework
- **[React 19](https://react.dev/)** - UI library
- **[TypeScript](https://www.typescriptlang.org/)** - Type safety
- **[TailwindCSS v4](https://tailwindcss.com/)** - Utility-first CSS
- **[Framer Motion](https://www.framer.com/motion/)** - Animation library

#### Development Tools
- **[Turborepo](https://turbo.build/)** - Monorepo management
- **[pnpm](https://pnpm.io/)** - Package manager
- **[ESLint](https://eslint.org/)** - Code quality
- **[Prettier](https://prettier.io/)** - Code formatting

#### Forms and Validation
- **[React Hook Form](https://react-hook-form.com/)** - Form management
- **[Zod](https://zod.dev/)** - Schema validation
- **[Next Safe Action](https://next-safe-action.dev/)** - Server actions

#### UI Components
- **[Radix UI](https://www.radix-ui.com/)** - Accessible primitives
- **[Sonner](https://sonner.emilkowal.ski/)** - Toast notifications

### 🚀 Getting Started

#### Prerequisites
- Node.js 18.17 or higher
- pnpm 8.0 or higher

#### Installation

```bash
# Clone the repository
git clone https://github.com/nackyAir/nacky_app.git
cd nacky_app

# Install dependencies
pnpm install

# Start the development server
pnpm dev
```

#### Environment Variables

Create a `.env.local` file in the `apps/web` directory and set the following variables:

```env
# Resend (for email sending)
RESEND_API_KEY=your_resend_api_key
CONTACT_EMAIL=your_contact_email@example.com

# GitHub (for language statistics)
GITHUB_TOKEN=your_github_token
```

### 📁 Project Structure

```
nacky_app/
├── apps/
│   └── web/                    # Main web application
│       ├── actions/            # Server actions
│       ├── app/                # App Router
│       ├── components/         # Shared components
│       ├── features/           # Feature-specific components
│       │   ├── Blog/          # Blog functionality
│       │   ├── Home/          # Homepage functionality
│       │   └── Layout/        # Layout components
│       ├── lib/               # Utility functions
│       └── public/            # Static files
├── packages/                   # Shared packages
└── docs/                      # Documentation
```

### 🏃‍♂️ Development

#### Available Scripts

```bash
# Start development server
pnpm dev

# Build for production
pnpm build

# Start production server
pnpm start

# Run linter
pnpm lint

# Type checking
pnpm type-check
```

#### Development Guidelines

1. **Code Quality**: Follow ESLint and Prettier configurations
2. **Type Safety**: Leverage TypeScript extensively
3. **Component Design**: Create reusable and maintainable components
4. **Performance**: Utilize Next.js 15's latest features

### 🎯 Main Features

#### Homepage
- Profile introduction
- Skill badges display
- Project timeline
- Language usage charts
- Social links

#### Blog
- Article creation and editing
- Markdown support
- SEO optimization

#### Contact
- Validated forms
- Animation effects
- Email sending functionality

### 🤝 Contributing

1. Fork this repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Create a Pull Request

### 📄 License

This project is released under the MIT License. See the [LICENSE](LICENSE) file for details.

### 👤 Author

**nackyAir**
- GitHub: [@nackyAir](https://github.com/nackyAir)
- X: [@naoki__0509](https://x.com/naoki__0509)
- Instagram: [@nacky_coffee](https://www.instagram.com/nacky_coffee)

---

<div align="center">
  <p>Made with ❤️ by <a href="https://github.com/nackyAir">nackyAir</a></p>
  <p>
    <a href="#top">⬆️ Back to top</a>
  </p>
</div>