'use client'

import { Avatar, AvatarImage } from '@repo/ui/components/avatar'
import { motion, useReducedMotion } from 'framer-motion'
import Link from 'next/link'
import { Suspense } from 'react'

import { siteConfig } from '~/config/siteConfig'
import { ContactForm } from '~/features/Home/ContactForm'
import { FlightLog } from '~/features/Home/FlightLog'
import {
  PLANE_GLYPH,
  RouteMap,
  RouteMapCompact,
} from '~/features/Home/RouteMap'
import { SkillBadges } from '~/features/Home/SkillBadges'
import { SocialLinks } from '~/features/Home/SocialLinks'
import {
  AVAILABILITY_LABEL,
  LoadingScreen,
  OWNER_NAME,
  OWNER_ROLE,
} from '~/features/Layout'

const EASE = [0.22, 1, 0.36, 1] as const

const TECH_MARKS: ReadonlyArray<{ code: string; name: string }> = [
  { code: 'TS', name: 'TypeScript' },
  { code: 'RE', name: 'React' },
  { code: 'NX', name: 'Next.js' },
  { code: 'TW', name: 'Tailwind CSS' },
  { code: 'ND', name: 'Node.js' },
  { code: 'SB', name: 'Supabase' },
]

function Reveal({
  children,
  delay = 0,
  className,
}: {
  children: React.ReactNode
  delay?: number
  className?: string
}) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={{
        opacity: shouldReduceMotion ? 1 : 0.9,
        y: shouldReduceMotion ? 0 : 8,
      }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-60px' }}
      transition={{
        duration: shouldReduceMotion ? 0 : 0.42,
        delay: shouldReduceMotion ? 0 : delay,
        ease: EASE,
      }}
    >
      {children}
    </motion.div>
  )
}

function Section({
  id,
  title,
  subtitle,
  children,
}: {
  id: string
  title: string
  subtitle: string
  children: React.ReactNode
}) {
  return (
    <section id={id} className="py-12 lg:py-16 scroll-mt-[72px]">
      <div className="gutter mx-auto max-w-[1280px]">
        <Reveal>
          <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
            <h2 className="text-ink font-display text-[clamp(1.75rem,3.4vw,2.5rem)] font-semibold tracking-tight">
              {title}
            </h2>
            <p className="text-ink-muted text-sm">{subtitle}</p>
          </div>
        </Reveal>

        <Reveal delay={0.06} className="mt-8">
          {children}
        </Reveal>
      </div>
    </section>
  )
}

function TechMarks() {
  return (
    <ul className="flex flex-wrap items-center gap-2">
      {TECH_MARKS.map((tech) => (
        <li
          key={tech.code}
          className="border-hairline text-navy flex size-9 items-center justify-center rounded-flat border"
        >
          <span className="label-mono" aria-hidden="true">
            {tech.code}
          </span>
          <span className="sr-only">{tech.name}</span>
        </li>
      ))}
    </ul>
  )
}

function Hero() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <section className="gutter mx-auto flex min-h-[100dvh] max-w-[1280px] items-center pt-[112px] pb-12 lg:pt-[128px]">
      <div className="grid w-full items-center gap-12 lg:grid-cols-2 lg:gap-16">
        <motion.div
          initial={{
            opacity: shouldReduceMotion ? 1 : 0.9,
            y: shouldReduceMotion ? 0 : 10,
          }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: shouldReduceMotion ? 0 : 0.42, ease: EASE }}
        >
          <h1 className="text-ink font-display text-[clamp(2rem,3.9vw,3.1rem)] font-bold leading-[1.2] tracking-tight">
            AI の専門性で、
            <br />
            業界を越えて届ける。
          </h1>

          <p className="text-ink-muted mt-6 max-w-[30em] text-[1.0625rem] leading-[1.9] lg:text-[1.125rem]">
            フルスタックの技術力と AI
            の専門性を掛け合わせ、課題の本質を捉えたプロダクトを、あらゆる業界へ。
          </p>

          <div className="mt-12 flex flex-wrap items-center gap-6">
            <div className="border-hairline shrink-0 rounded-full border p-1">
              <Avatar className="size-24 sm:size-28">
                <AvatarImage src="./avatarImage.jpg" alt={OWNER_NAME} />
              </Avatar>
            </div>

            <div>
              <p className="text-ink text-xl font-bold tracking-tight">
                {OWNER_NAME}
              </p>
              <p className="text-ink-muted mt-0.5 text-sm">{OWNER_ROLE}</p>
              <div className="mt-4">
                <TechMarks />
              </div>
            </div>
          </div>

          <div className="mt-12 flex flex-wrap items-center gap-4">
            <a
              href="#contact"
              className="bg-navy text-surface hover:bg-ink rounded-flat px-8 py-3 text-sm font-bold transition-colors duration-[180ms]"
            >
              お問い合わせ
            </a>
            <Link
              href="/resume"
              className="border-hairline text-ink hover:border-navy hover:text-navy rounded-flat border px-8 py-3 text-sm font-bold transition-colors duration-[180ms]"
            >
              経歴書を見る
            </Link>
          </div>

          <p className="mt-6 flex items-center gap-2 lg:hidden">
            <span className="bg-status-online size-1.5 rounded-full" />
            <span className="text-ink-muted text-xs">{AVAILABILITY_LABEL}</span>
          </p>
        </motion.div>

        <div className="hidden lg:block">
          <RouteMap />
        </div>

        <div className="lg:hidden">
          <RouteMapCompact />
        </div>
      </div>
    </section>
  )
}

function FooterRule() {
  return (
    <div
      className="text-navy flex flex-1 items-center gap-4"
      aria-hidden="true"
    >
      <span className="border-hairline flex-1 border-t border-dotted" />
      <svg
        viewBox="-13 -12 26 24"
        className="size-4 shrink-0"
        aria-hidden="true"
      >
        <path d={PLANE_GLYPH} fill="currentColor" />
      </svg>
      <span className="border-hairline flex-1 border-t border-dotted" />
    </div>
  )
}

function Footer() {
  return (
    <footer className="border-hairline border-t">
      <div className="gutter mx-auto flex max-w-[1280px] flex-col items-center gap-6 py-8 md:flex-row md:gap-12">
        <p className="text-ink-muted shrink-0 text-sm">
          © 2026 Naoki Hayashida
        </p>

        <FooterRule />

        <SocialLinks config={siteConfig} />
      </div>
    </footer>
  )
}

export function HomeWrapper() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <div className="bg-canvas surface-noise text-ink min-h-[100dvh]">
        <Hero />

        <section id="works" className="py-12 lg:py-16 scroll-mt-[72px]">
          <div className="gutter mx-auto max-w-[1280px]">
            <Reveal>
              <FlightLog />
            </Reveal>
          </div>
        </section>

        <Section id="about" title="ABOUT" subtitle="経歴と仕事の進め方">
          <div className="border-hairline grid gap-8 border-t pt-8 lg:grid-cols-[minmax(0,18rem)_minmax(0,1fr)]">
            <p className="label-mono text-ink-muted">PROFILE</p>
            <div className="text-ink-muted max-w-[68ch] space-y-6 leading-[1.9]">
              <p>
                2023年からフロントエンドを中心に7件の案件へ参画してきました。直近は法人向け
                AI SaaS「Resme」で開発責任者として、画面実装から Terraform と
                Google Cloud
                でのインフラ構築、顧客の要件定義まで縦断して担当しました。
              </p>
              <p>
                Claude Code を中心とした AI
                駆動開発を実務のフローに組み込み、自分は要件整理・設計・レビューに集中する進め方を確立しています。TDD
                と型安全のルールを規約として明文化し、生成されたコードの品質を一定に保っています。
              </p>
            </div>
          </div>
        </Section>

        <Section id="skills" title="SKILLS" subtitle="技術スタックと経験年数">
          <SkillBadges />
        </Section>

        <Section id="contact" title="CONTACT" subtitle="お問い合わせ">
          <ContactForm />
        </Section>

        <Footer />
      </div>
    </Suspense>
  )
}
