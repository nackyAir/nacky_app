'use client'

import { motion } from 'framer-motion'

import { RouteMap } from './RouteMap'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

const container = {
  hidden: {},
  visible: {
    transition: { staggerChildren: 0.08, delayChildren: 0.08 },
  },
}

const rise = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE },
  },
}

export function Hero() {
  return (
    <header className="relative overflow-hidden">
      <div
        aria-hidden
        className="rule-grid pointer-events-none absolute inset-0 opacity-30"
      />

      <motion.div
        variants={container}
        initial="hidden"
        animate="visible"
        className="relative mx-auto flex min-h-[88svh] w-full max-w-7xl flex-col justify-center px-6 pt-24 pb-14 md:px-10 md:pt-28 md:pb-20"
      >
        <div className="grid items-center gap-x-8 gap-y-8 lg:grid-cols-[minmax(0,1fr)_minmax(28rem,1fr)] lg:gap-x-12">
          <motion.div variants={rise} className="lg:col-start-1 lg:row-start-1">
            <p className="font-mono text-[0.6875rem] uppercase tracking-[0.24em] text-ink-muted">
              Naoki Hayashida — Portfolio
            </p>
            <h1 className="mt-7 max-w-[36rem] font-display text-[clamp(1.65rem,4.2vw,3.5rem)] font-semibold leading-[1.08] tracking-[-0.045em]">
              <span className="block whitespace-nowrap">AI の専門性で、</span>
              <span className="block whitespace-nowrap">
                業界を越えて届ける。
              </span>
            </h1>
          </motion.div>

          <motion.div
            variants={rise}
            className="mx-auto w-full max-w-[34rem] lg:col-start-2 lg:row-span-2 lg:row-start-1 lg:max-w-none"
          >
            <RouteMap />
          </motion.div>

          <motion.div
            variants={rise}
            className="lg:col-start-1 lg:row-start-2 lg:self-start"
          >
            <p className="max-w-[35rem] text-[1.05rem] leading-[1.95] text-ink-muted text-balance-jp md:text-lg">
              フルスタックの技術力と AI
              の専門性を掛け合わせ、課題の本質を捉えたプロダクトを、あらゆる業界へ。
            </p>

            <p className="mt-7 flex items-center gap-3 font-mono text-[0.6875rem] tracking-[0.16em] text-ink-muted">
              <span
                aria-hidden
                className="size-2 rounded-full bg-status-green ring-4 ring-status-green/10"
              />
              相談受付中
            </p>

            <div className="mt-9 flex flex-wrap items-center gap-5">
              <a
                href="#contact"
                className="inline-flex min-h-12 items-center rounded-sm bg-accent-navy px-7 text-sm font-medium text-paper transition-transform duration-300 hover:-translate-y-0.5"
              >
                お問い合わせ
              </a>
              <a
                href="/resume"
                className="group inline-flex min-h-12 items-center px-1 text-sm"
              >
                <span className="border-b border-ink/30 pb-0.5 transition-colors duration-300 group-hover:border-accent-navy group-hover:text-accent-navy">
                  経歴書を見る
                </span>
              </a>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </header>
  )
}
