import type { Metadata, Viewport } from 'next'
import localFont from 'next/font/local'

import '@repo/ui/globals.css'
import { Toaster } from 'sonner'
import { GoogleAnalytics, MicrosoftClarity } from '~/lib/components/analytics'

const geistSans = localFont({
  src: './fonts/GeistVF.woff',
  variable: '--font-geist-sans',
  display: 'swap',
  preload: true,
})
const geistMono = localFont({
  src: './fonts/GeistMonoVF.woff',
  variable: '--font-geist-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default: 'Naoki Hayashida（林田直樹） - フロントエンドエンジニア | nacky.me',
    template: '%s | Naoki Hayashida - フロントエンドエンジニア',
  },
  description: 'Naoki Hayashida（林田直樹）のポートフォリオサイト。フロントエンドエンジニア・Webサイト制作のプロフェッショナル。React、Next.js、TypeScriptを活用したモダンWeb開発を提供します。',
  keywords: [
    'Naoki Hayashida', '林田直樹', 'Nacky', 
    'フロントエンドエンジニア', 'FrontEnd developer', 'Frontend engineer',
    'Webサイト制作', 'Web developer', 'Web制作',
    'React', 'Next.js', 'TypeScript', 'JavaScript',
    'UI/UX', 'レスポンシブデザイン', 'モダンWeb開発',
    'ポートフォリオ', 'エンジニア', '東京', '日本'
  ],
  authors: [{ name: 'Naoki Hayashida', url: 'https://nacky.me' }],
  creator: 'Naoki Hayashida（林田直樹）',
  publisher: 'Naoki Hayashida',
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || 'https://nacky.me'),
  alternates: {
    canonical: '/',
  },
  openGraph: {
    type: 'website',
    locale: 'ja_JP',
    url: '/',
    title: 'Naoki Hayashida（林田直樹） - フロントエンドエンジニア',
    description: 'フロントエンドエンジニア・Webサイト制作のプロフェッショナル。React、Next.js、TypeScriptを活用したモダンWeb開発を提供します。',
    siteName: 'Naoki Hayashida Portfolio',
    images: [
      {
        url: '/og-image.png',
        width: 1200,
        height: 630,
        alt: 'Naoki Hayashida（林田直樹） - フロントエンドエンジニア',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Naoki Hayashida（林田直樹） - フロントエンドエンジニア',
    description: 'フロントエンドエンジニア・Webサイト制作のプロフェッショナル。React、Next.js、TypeScriptを活用したモダンWeb開発。',
    images: ['/og-image.png'],
    creator: '@nacky_hayashida',
    site: '@nacky_hayashida',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  verification: {
    google: process.env.NEXT_PUBLIC_GOOGLE_SITE_VERIFICATION,
  },
  category: 'technology',
}

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#ffffff' },
    { media: '(prefers-color-scheme: dark)', color: '#000000' },
  ],
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const gaId = process.env.NEXT_PUBLIC_GA_MEASUREMENT_ID
  const clarityId = process.env.NEXT_PUBLIC_CLARITY_PROJECT_ID

  return (
    <html lang="ja">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <Toaster position="bottom-right" />
        {children}
        {gaId && <GoogleAnalytics measurementId={gaId} />}
        {clarityId && <MicrosoftClarity projectId={clarityId} />}
      </body>
    </html>
  )
}
