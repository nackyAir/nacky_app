'use client'

import { Suspense } from 'react'

import { Avatar, AvatarImage } from '@repo/ui/components/avatar'
import * as motion from 'framer-motion/client'

import { siteConfig } from '~/config/siteConfig'
import { ContactForm } from '~/features/Home/ContactForm'
import { LanguageProgress } from '~/features/Home/LanguageProgress'
import { ProjectTabs } from '~/features/Home/ProjectTabs'
import { SkillBadges } from '~/features/Home/SkillBadges'
import { SocialLinks } from '~/features/Home/SocialLinks'
import { LoadingScreen } from '~/features/Layout'

const FADE_IN_ANIMATION = {
  initial: { opacity: 0, y: 20 },
  whileInView: { opacity: 1, y: 0 },
  viewport: { once: true, margin: '-50px' },
  transition: { duration: 0.5, ease: 'easeOut' },
} as const

type SectionProps = {
  title: string
  subtitle?: string
  children: React.ReactNode
  className?: string
  variant?: 'default' | 'alternate'
}

function Section({ 
  title, 
  subtitle,
  children, 
  className = '', 
  variant = 'default' 
}: SectionProps) {
  const bgClass = variant === 'alternate' 
    ? 'bg-slate-50 dark:bg-slate-900/50' 
    : 'bg-white dark:bg-slate-950'
  
  return (
    <section className={`py-20 lg:py-32 ${bgClass} ${className}`}>
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        <motion.div
          {...FADE_IN_ANIMATION}
          className="mb-16 md:mb-24"
        >
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4 text-slate-900 dark:text-white">
            {title}
          </h2>
          {subtitle && (
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl leading-relaxed">
              {subtitle}
            </p>
          )}
        </motion.div>
        
        <motion.div
          {...FADE_IN_ANIMATION}
          transition={{ duration: 0.5, delay: 0.2, ease: 'easeOut' }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  )
}

function Profile() {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center pt-20 bg-white dark:bg-slate-950">
      <div className="container mx-auto px-6 lg:px-8 max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: 'easeOut' }}
          className="flex flex-col md:flex-row items-center gap-12 md:gap-20"
        >
          {/* Avatar */}
          <div className="relative shrink-0">
            <div className="rounded-full p-1 border border-slate-200 dark:border-slate-800">
              <Avatar className="size-40 sm:size-48">
                <AvatarImage src="./avatarImage.jpg" alt="Naoki Hayashida" />
              </Avatar>
            </div>
          </div>
          
          {/* Text Content */}
          <div className="text-center md:text-left space-y-6">
            <div className="space-y-2">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white">
                Naoki Hayashida
              </h1>
              <p className="text-xl sm:text-2xl font-medium text-slate-600 dark:text-slate-400">
                Frontend Engineer
              </p>
            </div>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl leading-relaxed">
              モダンなWeb技術で革新的なユーザーエクスペリエンスを創造する<br className="hidden md:block" />
              3年間の実務経験を持つプロフェッショナル
            </p>
            
            <div className="flex flex-wrap gap-4 justify-center md:justify-start pt-4">
              <a
                href="#contact"
                className="px-8 py-3 rounded-lg bg-slate-900 text-white dark:bg-white dark:text-slate-900 font-medium hover:opacity-90 transition-opacity"
              >
                お問い合わせ
              </a>
              <a
                href="#projects"
                className="px-8 py-3 rounded-lg border border-slate-200 dark:border-slate-800 font-medium hover:bg-slate-50 dark:hover:bg-slate-900 transition-colors"
              >
                ポートフォリオを見る
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="bg-slate-50 dark:bg-slate-900 border-t border-slate-200 dark:border-slate-800">
      <div className="container mx-auto px-6 lg:px-8 max-w-6xl py-16">
        <div className="flex flex-col md:flex-row justify-between items-center gap-8">
          <div className="text-center md:text-left space-y-4">
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
              Naoki Hayashida
            </h3>
            <p className="text-slate-600 dark:text-slate-400 text-sm max-w-md">
              次世代のWebエクスペリエンスを一緒に創造しませんか？<br />
              技術的な課題から創造的なソリューションまで、お気軽にご相談ください。
            </p>
          </div>
          
          <div className="flex flex-col items-center md:items-end gap-6">
            <SocialLinks config={siteConfig} />
            <p className="text-slate-500 dark:text-slate-500 text-sm">
              © 2024 Naoki Hayashida.
            </p>
          </div>
        </div>
      </div>
    </footer>
  )
}

export function HomeWrapper() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <div className="min-h-screen bg-white text-slate-900 dark:bg-slate-950 dark:text-white">
        <Profile />

        <Section 
          title="About Me" 
          subtitle="テクノロジーへの情熱と実務経験を組み合わせ、ユーザー中心の革新的なソリューションを提供"
          variant="alternate"
        >
          <div className="max-w-3xl">
            <p className="text-lg leading-relaxed text-slate-600 dark:text-slate-300">
              私は3年間のフロントエンド開発経験を持つエンジニアです。
              React、TypeScript、Next.jsを中心としたモダンなWeb技術を駆使して、
              ユーザーエクスペリエンスを最優先に考えた高品質なアプリケーションの開発に取り組んでいます。
              <br /><br />
              常に最新の技術トレンドをキャッチアップし、パフォーマンス最適化から
              アクセシビリティまで、総合的な視点でプロダクト開発に貢献します。
            </p>
          </div>
        </Section>

        <Section 
          title="Skills" 
          subtitle="最新技術スタックを駆使した高品質なフロントエンド開発"
        >
          <SkillBadges />
        </Section>

        <Section 
          title="Language Progress" 
          subtitle="GitHubアクティビティから見る技術的専門性と継続的な学習"
          variant="alternate"
        >
          <LanguageProgress />
        </Section>

        <Section 
          title="Projects" 
          subtitle="実務経験と個人プロジェクトで培った技術力とクリエイティビティ"
        >
          <ProjectTabs />
        </Section>

        <Section 
          title="Contact" 
          subtitle="次のプロジェクトでご一緒できることを楽しみにしています"
          variant="alternate"
        >
          <ContactForm />
        </Section>

        <Footer />
      </div>
    </Suspense>
  )
}

