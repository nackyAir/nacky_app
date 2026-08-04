'use client'

import { ArrowUpRight } from '@repo/ui/icons/lucide'
import { motion } from 'framer-motion'

import { Reveal } from '~/features/Home/primitives'

const STACK = [
  'Next.js 16',
  'Hono',
  'AI SDK v5',
  'Claude',
  'Drizzle ORM',
  'PostgreSQL',
  'Cloudflare Workers',
]

export function Now() {
  return (
    <div className="space-y-10">
      <Reveal>
        <motion.a
          href="https://madoguchi.co"
          target="_blank"
          rel="noopener noreferrer"
          whileHover={{ y: -4 }}
          transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
          className="group block rounded-lg border border-rule bg-paper-raised p-7 md:p-10"
        >
          <div className="flex flex-wrap items-baseline justify-between gap-3">
            <span className="font-mono text-xs uppercase tracking-[0.24em] text-ink-faint">
              個人開発 / 2026.05 —
            </span>
            <span className="font-mono text-xs text-ink-faint">
              madoguchi.co
            </span>
          </div>

          <h3 className="mt-5 flex items-center gap-2 font-display text-3xl tracking-tight md:text-4xl">
            madoguchi
            <ArrowUpRight className="size-6 text-ink-faint transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-ink" />
          </h3>

          <p className="mt-5 max-w-[40rem] text-[1rem] leading-[2] text-ink-muted">
            住宅系事業者向けの、問い合わせ一次対応とリード獲得を担う AI
            チャットボットです。営業時間外に来た問い合わせを、翌営業日にすぐ追客できる情報に変えることを狙っています。
          </p>

          <p className="mt-4 max-w-[40rem] text-[1rem] leading-[2] text-ink-muted">
            ナレッジに書かれていないことは断定させず、金額や契約の話は必ず有人に渡す設計にしました。
            1行のスクリプトタグで埋め込めるマルチテナント対応のウィジェットまで実装しています。
          </p>

          <ul className="mt-8 flex flex-wrap gap-x-3 gap-y-2 border-t border-rule pt-6 font-mono text-xs text-ink-faint">
            {STACK.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
        </motion.a>
      </Reveal>

      <Reveal delay={0.05}>
        <p className="max-w-[42rem] text-[0.95rem] leading-[2] text-ink-muted">
          受託で作ってきたものと違って、これは自分で課題を見つけて、作って、売り方まで考えているプロダクトです。
          仕様を渡されて作るのと、何を作るか決めるところからやるのは全然違うということを、いま実地で学んでいます。
        </p>
      </Reveal>
    </div>
  )
}
