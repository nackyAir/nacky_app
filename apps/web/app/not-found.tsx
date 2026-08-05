import type { Metadata } from 'next'
import Link from 'next/link'

import { PlaneGlyph } from '~/features/Home/Hero/components/RouteMap'

export const metadata: Metadata = {
  title: 'ページが見つかりません',
  description: 'お探しのページは見つかりませんでした。',
  robots: {
    index: false,
    follow: true,
  },
}

export default function NotFound() {
  return (
    <main className="grain relative flex min-h-screen items-center overflow-hidden bg-background px-6 py-24 text-foreground md:px-10">
      <div
        aria-hidden
        className="rule-grid pointer-events-none absolute inset-0 opacity-30"
      />

      <div className="relative z-[1] mx-auto grid w-full max-w-6xl items-center gap-14 lg:grid-cols-[minmax(0,0.85fr)_minmax(24rem,1fr)]">
        <div>
          <p className="font-mono text-[0.6875rem] uppercase tracking-[0.24em] text-accent-navy">
            Lost — 404
          </p>
          <h1 className="mt-7 max-w-[36rem] font-display text-[clamp(2.25rem,5.5vw,4.25rem)] font-semibold leading-[1.12] tracking-[-0.045em] text-balance-jp">
            この航路は、
            <br />
            <span className="whitespace-nowrap">見つかりません。</span>
          </h1>
          <p className="mt-7 max-w-[31rem] text-[1rem] leading-[2] text-ink-muted">
            お探しのページは移動したか、まだ就航していないようです。
          </p>
          <Link
            href="/home"
            className="mt-9 inline-flex min-h-12 items-center rounded-sm bg-accent-navy px-7 text-sm font-medium text-paper transition-transform duration-300 hover:-translate-y-0.5"
          >
            ホームへ戻る
          </Link>
        </div>

        <svg
          viewBox="0 0 560 300"
          role="img"
          aria-labelledby="lost-route-title lost-route-description"
          className="h-auto w-full text-accent-navy"
        >
          <title id="lost-route-title">目的地を見失った航路</title>
          <desc id="lost-route-description">
            点線の航路の途中を飛ぶ小さな飛行機
          </desc>
          <path
            d="M 28 230 C 150 32 372 38 532 202"
            fill="none"
            stroke="currentColor"
            strokeWidth="1.25"
            strokeLinecap="round"
            strokeDasharray="3 9"
          />
          <circle
            cx="28"
            cy="230"
            r="7"
            fill="var(--paper)"
            stroke="currentColor"
            strokeWidth="1.25"
          />
          <circle
            cx="532"
            cy="202"
            r="18"
            fill="none"
            stroke="currentColor"
            strokeWidth="1"
            strokeDasharray="2 6"
            opacity="0.5"
          />
          <g transform="translate(290 87) rotate(18)" fill="currentColor">
            <PlaneGlyph />
          </g>
          <text
            x="503"
            y="242"
            fill="currentColor"
            className="font-mono text-[11px] tracking-[0.16em]"
          >
            UNKNOWN
          </text>
        </svg>
      </div>
    </main>
  )
}
