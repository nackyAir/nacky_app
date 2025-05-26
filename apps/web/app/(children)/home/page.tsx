import type { Metadata } from 'next'
import { HomeWrapper } from '~/features/Home/HomeWrapper'
import { StructuredData } from '~/lib/components/structured-data'
import { 
  generateWebsiteStructuredData, 
  generatePersonStructuredData,
  generateProfessionalServiceStructuredData
} from '~/lib/structured-data'

export const metadata: Metadata = {
  title: 'ホーム',
  description: 'Naoki Hayashida（林田直樹）のポートフォリオサイト。フロントエンドエンジニアとして、React・Next.js・TypeScriptを使用したWebサイト制作・Web開発を行っています。モダンで高品質なWeb体験を提供します。',
  keywords: [
    'Naoki Hayashida', '林田直樹', 'Nacky',
    'ポートフォリオ', 'portfolio',
    'フロントエンドエンジニア', 'frontend engineer', 'frontend developer',
    'Webサイト制作', 'Web開発', 'web development',
    'React', 'Next.js', 'TypeScript', 'JavaScript',
    'UI/UX', 'レスポンシブデザイン'
  ],
  openGraph: {
    title: 'Naoki Hayashida（林田直樹） - フロントエンドエンジニア',
    description: 'フロントエンドエンジニアとして、React・Next.js・TypeScriptを使用したWebサイト制作・Web開発を行っています。',
    type: 'website',
    images: [
      {
        url: '/og-home.png',
        width: 1200,
        height: 630,
        alt: 'Naoki Hayashida（林田直樹） - フロントエンドエンジニア ポートフォリオ',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Naoki Hayashida（林田直樹） - フロントエンドエンジニア',
    description: 'React・Next.js・TypeScriptを使用したWebサイト制作・Web開発のプロフェッショナル。',
    images: ['/og-home.png'],
  },
  alternates: {
    canonical: '/home',
  },
}

export default function Home() {
  const websiteData = generateWebsiteStructuredData()
  const personData = generatePersonStructuredData()
  const serviceData = generateProfessionalServiceStructuredData()

  return (
    <>
      <StructuredData data={websiteData} />
      <StructuredData data={personData} />
      <StructuredData data={serviceData} />
      <HomeWrapper />
    </>
  )
}
