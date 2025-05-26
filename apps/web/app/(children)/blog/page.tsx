import type { Metadata } from 'next'
import { Suspense } from 'react'

import { LoadingScreen } from '~/features/Layout'
import { StructuredData } from '~/lib/components/structured-data'
import { generateBreadcrumbStructuredData } from '~/lib/structured-data'

export const metadata: Metadata = {
  title: 'ブログ',
  description: 'Naoki Hayashida（林田直樹）の技術ブログ。フロントエンド開発、React、Next.js、TypeScriptに関する最新情報、開発ノウハウ、実装のTipsを共有しています。',
  keywords: [
    'ブログ', 'tech blog', 'technical blog',
    'Naoki Hayashida', '林田直樹',
    'フロントエンド開発', 'frontend development',
    'React', 'Next.js', 'TypeScript', 'JavaScript',
    'Web開発', 'web development',
    'プログラミング', 'programming',
    '技術記事', '開発ノウハウ'
  ],
  openGraph: {
    title: 'ブログ | Naoki Hayashida（林田直樹） - フロントエンドエンジニア',
    description: 'フロントエンド開発、React、Next.js、TypeScriptに関する技術情報・開発ノウハウを発信しています。',
    type: 'website',
    images: [
      {
        url: '/og-blog.png',
        width: 1200,
        height: 630,
        alt: 'Naoki Hayashida 技術ブログ',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'ブログ | Naoki Hayashida（林田直樹）',
    description: 'フロントエンド開発、React、Next.js、TypeScriptに関する技術情報・開発ノウハウを発信。',
    images: ['/og-blog.png'],
  },
  alternates: {
    canonical: '/blog',
  },
}

export default function Page() {
  const breadcrumbData = generateBreadcrumbStructuredData([
    { name: 'ホーム', url: '/' },
    { name: 'ブログ', url: '/blog' },
  ])

  return (
    <Suspense fallback={<LoadingScreen />}>
      <StructuredData data={breadcrumbData} />
      <div className="min-w-screen flex flex-col">
        <header>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-100">
            技術ブログ
          </h1>
          <p className="mt-2 text-lg text-gray-600 dark:text-gray-400">
            フロントエンド開発の最新情報・ノウハウを発信しています
          </p>
        </header>
        <main className="mt-8">
          {/* TODO: ブログ記事一覧コンポーネントを実装 */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
            <h2 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
              Coming Soon
            </h2>
            <p className="text-gray-600 dark:text-gray-400">
              フロントエンド開発に関する技術記事を準備中です。React、Next.js、TypeScriptの実装ノウハウやパフォーマンス最適化のTipsを公開予定です。
            </p>
          </div>
        </main>
      </div>
    </Suspense>
  )
}
