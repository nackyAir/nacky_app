'use client'

import { motion } from 'framer-motion'

const EASE = [0.16, 1, 0.3, 1] as const

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.09, delayChildren: 0.15 },
  },
}

const rise = {
  hidden: { opacity: 0, y: 24 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.9, ease: EASE },
  },
}

export function Hero() {
  return (
    <header className="relative overflow-hidden">
      <div
        aria-hidden
        className="rule-grid pointer-events-none absolute inset-0 opacity-40"
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative mx-auto flex min-h-[88svh] w-full max-w-6xl flex-col justify-between px-6 pt-28 pb-14 md:px-10 md:pt-36 md:pb-20"
      >
        <motion.p
          variants={rise}
          className="font-mono text-xs uppercase tracking-[0.3em] text-ink-muted"
        >
          Portfolio — 2026
        </motion.p>

        <div className="py-14 md:py-20">
          <motion.h1
            variants={rise}
            className="font-display text-[clamp(3.75rem,15vw,10rem)] leading-[0.95] tracking-[0.02em]"
          >
            林田直樹
          </motion.h1>

          <motion.p
            variants={rise}
            className="mt-6 font-mono text-sm tracking-[0.22em] text-ink-muted uppercase md:text-base"
          >
            Naoki Hayashida
          </motion.p>

          <motion.p
            variants={rise}
            className="mt-10 max-w-[34rem] font-display text-lg leading-[1.9] text-balance-jp md:text-xl"
          >
            フロントエンドを軸に、
            <br className="hidden sm:block" />
            バックエンド・インフラまで並走するエンジニアです。
          </motion.p>
        </div>

        <motion.div
          variants={rise}
          className="flex flex-col gap-6 border-t border-rule pt-8 sm:flex-row sm:items-end sm:justify-between"
        >
          <div className="flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="inline-flex min-h-12 items-center rounded-full bg-ink px-7 text-sm font-medium text-paper transition-transform duration-300 hover:-translate-y-0.5"
            >
              お問い合わせ
            </a>
            <a
              href="/resume"
              className="group inline-flex min-h-12 items-center px-1 text-sm"
            >
              <span className="border-b border-ink/30 pb-0.5 transition-colors duration-300 group-hover:border-ink">
                経歴書を見る
              </span>
            </a>
          </div>

          <p className="font-mono text-xs leading-relaxed text-ink-faint">
            React · Next.js · TypeScript
            <br />
            Hono · PostgreSQL · Google Cloud · Terraform
          </p>
        </motion.div>
      </motion.div>
    </header>
  )
}
