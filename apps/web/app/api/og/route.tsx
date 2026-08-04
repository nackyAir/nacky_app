import { ImageResponse } from 'next/og'
import type { NextRequest } from 'next/server'

export const runtime = 'edge'

const PAPER = '#f6f4f0'
const INK = '#1c1a18'
const INK_MUTED = '#6f6a63'
const RULE = '#d8d4cd'

export async function GET(request: NextRequest) {
  try {
    const { searchParams } = new URL(request.url)
    const title = searchParams.get('title') || 'Naoki Hayashida'
    const description =
      searchParams.get('description') ||
      'フロントエンドを軸に、バックエンド・インフラまで並走するエンジニア'
    const label = searchParams.get('label') || 'PORTFOLIO'

    return new ImageResponse(
      <div
        style={{
          height: '100%',
          width: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          backgroundColor: PAPER,
          padding: '72px 80px',
        }}
      >
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            fontSize: 22,
            letterSpacing: '0.28em',
            color: INK_MUTED,
          }}
        >
          <span>{label}</span>
          <span>NACKY.ME</span>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column' }}>
          <div
            style={{
              display: 'flex',
              fontSize: 84,
              lineHeight: 1.15,
              color: INK,
              letterSpacing: '-0.02em',
            }}
          >
            {title}
          </div>
          <div
            style={{
              display: 'flex',
              marginTop: 28,
              fontSize: 30,
              lineHeight: 1.6,
              color: INK_MUTED,
              maxWidth: 900,
            }}
          >
            {description}
          </div>
        </div>

        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'space-between',
            borderTop: `1px solid ${RULE}`,
            paddingTop: 28,
            fontSize: 24,
            color: INK,
          }}
        >
          <span>林田直樹</span>
          <span style={{ color: INK_MUTED }}>
            React · Next.js · TypeScript · Google Cloud
          </span>
        </div>
      </div>,
      {
        width: 1200,
        height: 630,
      },
    )
  } catch (error) {
    console.error('OG image generation failed:', error)
    return new Response('Failed to generate the image', { status: 500 })
  }
}
