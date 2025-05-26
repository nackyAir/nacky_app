import { Metadata } from 'next'
import Link from 'next/link'

export const metadata: Metadata = {
  title: 'ページが見つかりません',
  description: 'お探しのページは見つかりませんでした。URLを確認するか、ホームページから目的のページをお探しください。',
  robots: {
    index: false,
    follow: true,
  },
}

export default function NotFound() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50 dark:bg-gray-900">
      <div className="max-w-md w-full space-y-8">
        <div className="text-center">
          <div className="text-9xl font-bold text-gray-300 dark:text-gray-600">
            404
          </div>
          <h1 className="mt-6 text-3xl font-bold text-gray-900 dark:text-gray-100">
            ページが見つかりません
          </h1>
          <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
            お探しのページは存在しないか、移動した可能性があります。
          </p>
        </div>
        
        <div className="space-y-4">
          <Link
            href="/"
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            ホームページに戻る
          </Link>
          
          <Link
            href="/blog"
            className="w-full flex justify-center py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 dark:hover:bg-gray-700"
          >
            ブログを見る
          </Link>
        </div>
        
        <div className="text-center">
          <p className="text-xs text-gray-500 dark:text-gray-400">
            問題が続く場合は、お手数ですがお問い合わせください。
          </p>
        </div>
      </div>
    </div>
  )
} 