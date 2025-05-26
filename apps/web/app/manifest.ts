import { MetadataRoute } from 'next'

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: 'Naoki Hayashida（林田直樹） - フロントエンドエンジニア ポートフォリオ',
    short_name: 'Naoki Hayashida',
    description: 'フロントエンドエンジニア・Webサイト制作のプロフェッショナル。React、Next.js、TypeScriptを活用したモダンWeb開発。',
    start_url: '/',
    display: 'standalone',
    background_color: '#ffffff',
    theme_color: '#000000',
    orientation: 'portrait-primary',
    scope: '/',
    lang: 'ja',
    categories: ['business', 'productivity', 'developer-tools'],
    icons: [
      {
        src: '/icon-192.png',
        sizes: '192x192',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/icon-512.png',
        sizes: '512x512',
        type: 'image/png',
        purpose: 'maskable',
      },
      {
        src: '/apple-touch-icon.png',
        sizes: '180x180',
        type: 'image/png',
        purpose: 'any',
      },
    ],
  }
}