import type { Metadata, Viewport } from 'next'
import { IBM_Plex_Mono, Zen_Kaku_Gothic_New } from 'next/font/google'
import localFont from 'next/font/local'

import '@repo/ui/globals.css'
import { Toaster } from 'sonner'
import { GoogleAnalytics, MicrosoftClarity } from '~/lib/components/analytics'
import { ThemeProvider } from '~/lib/components/theme-provider'

const displaySans = localFont({
  src: './fonts/Satoshi-Variable.woff2',
  weight: '300 900',
  style: 'normal',
  variable: '--font-satoshi',
  display: 'swap',
  preload: true,
})

const bodySans = Zen_Kaku_Gothic_New({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  variable: '--font-zen-kaku',
  display: 'swap',
  preload: true,
})

const labelMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500'],
  variable: '--font-plex-mono',
  display: 'swap',
})

export const metadata: Metadata = {
  title: {
    default:
      'Naoki Hayashida（林田直樹） - フロントエンドエンジニア | nacky.me',
    template: '%s | Naoki Hayashida - フロントエンドエンジニア',
  },
  description:
    'Naoki Hayashida（林田直樹）のポートフォリオサイト。フロントエンドエンジニア・Webサイト制作のプロフェッショナル。React、Next.js、TypeScriptを活用したモダンWeb開発を提供します。',
  keywords: [
    'Naoki Hayashida',
    '林田直樹',
    'Nacky',
    'フロントエンドエンジニア',
    'FrontEnd developer',
    'Frontend engineer',
    'Webサイト制作',
    'Web developer',
    'Web制作',
    'React',
    'Next.js',
    'TypeScript',
    'JavaScript',
    'UI/UX',
    'レスポンシブデザイン',
    'モダンWeb開発',
    'ポートフォリオ',
    'エンジニア',
    '東京',
    '日本',
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
    description:
      'フロントエンドエンジニア・Webサイト制作のプロフェッショナル。React、Next.js、TypeScriptを活用したモダンWeb開発を提供します。',
    siteName: 'Naoki Hayashida Portfolio',
    images: [
      {
        url: '/api/og',
        width: 1200,
        height: 630,
        alt: 'Naoki Hayashida（林田直樹） - フロントエンドエンジニア',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Naoki Hayashida（林田直樹） - フロントエンドエンジニア',
    description:
      'フロントエンドエンジニア・Webサイト制作のプロフェッショナル。React、Next.js、TypeScriptを活用したモダンWeb開発。',
    images: ['/api/og'],
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
    { media: '(prefers-color-scheme: light)', color: '#fafaf8' },
    { media: '(prefers-color-scheme: dark)', color: '#0e1420' },
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
    <html lang="ja" suppressHydrationWarning>
      <body
        className={`${bodySans.variable} ${displaySans.variable} ${labelMono.variable} font-sans antialiased`}
      >
        <ThemeProvider>
          <Toaster position="bottom-right" />
          {children}
        </ThemeProvider>
        {gaId && <GoogleAnalytics measurementId={gaId} />}
        {clarityId && <MicrosoftClarity projectId={clarityId} />}
      </body>
    </html>
  )
}
