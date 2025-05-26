import { Metadata } from 'next'

const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://nacky.me'

interface SEOConfig {
  title: string
  description: string
  keywords?: string[]
  path: string
  ogImage?: string
  noIndex?: boolean
  canonicalUrl?: string
}

export function generateSEOMetadata({
  title,
  description,
  keywords = [],
  path,
  ogImage,
  noIndex = false,
  canonicalUrl,
}: SEOConfig): Metadata {
  const fullTitle = title === 'ホーム' 
    ? 'Naoki Hayashida（林田直樹） - フロントエンドエンジニア | nacky.me' 
    : `${title} | Naoki Hayashida - フロントエンドエンジニア`
  const url = `${baseUrl}${path}`
  const imageUrl = ogImage ? `${baseUrl}${ogImage}` : `${baseUrl}/og-image.png`
  
  const defaultKeywords = [
    'Naoki Hayashida', '林田直樹', 'Nacky',
    'フロントエンドエンジニア', 'frontend engineer', 'frontend developer',
    'Webサイト制作', 'web development', 'React', 'Next.js', 'TypeScript'
  ]
  
  return {
    title: fullTitle,
    description,
    keywords: [...keywords, ...defaultKeywords],
    openGraph: {
      title: fullTitle,
      description,
      url,
      type: 'website',
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 630,
          alt: fullTitle,
        },
      ],
      locale: 'ja_JP',
      siteName: 'Naoki Hayashida Portfolio',
    },
    twitter: {
      card: 'summary_large_image',
      title: fullTitle,
      description,
      images: [imageUrl],
      creator: '@nacky_hayashida',
      site: '@nacky_hayashida',
    },
    alternates: {
      canonical: canonicalUrl || url,
    },
    robots: noIndex ? {
      index: false,
      follow: false,
    } : {
      index: true,
      follow: true,
    },
  }
}

export function generateBreadcrumbs(items: Array<{ name: string; href: string }>) {
  return items.map((item, index) => ({
    '@type': 'ListItem' as const,
    position: index + 1,
    name: item.name,
    item: `${baseUrl}${item.href}`,
  }))
}

export function truncateDescription(text: string, maxLength: number = 160): string {
  if (text.length <= maxLength) return text
  return text.substring(0, maxLength - 3) + '...'
}

export function generateArticleKeywords(content: string, baseKeywords: string[] = []): string[] {
  // フロントエンド関連の技術用語
  const frontendTerms = [
    'React', 'Next.js', 'TypeScript', 'JavaScript', 'CSS', 'HTML', 
    'Tailwind CSS', 'Styled Components', 'Sass', 'SCSS',
    'Webpack', 'Vite', 'ESLint', 'Prettier', 'Jest', 'Cypress',
    'Redux', 'Zustand', 'SWR', 'React Query', 'GraphQL', 'REST API',
    'UI/UX', 'レスポンシブデザイン', 'アクセシビリティ', 'パフォーマンス最適化',
    'SEO', 'PWA', 'SSG', 'SSR', 'SPA'
  ]
  
  const foundTerms = frontendTerms.filter(term => 
    content.toLowerCase().includes(term.toLowerCase())
  )
  
  // 個人ブランドキーワードを追加
  const personalKeywords = ['Naoki Hayashida', '林田直樹', 'Nacky']
  
  return [...new Set([...baseKeywords, ...foundTerms, ...personalKeywords])]
} 