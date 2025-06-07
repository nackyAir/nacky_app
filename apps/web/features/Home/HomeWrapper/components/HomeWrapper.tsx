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

const ANIMATION_CONFIG = {
  initial: { opacity: 0, y: 40 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.8, ease: [0.25, 0.1, 0.25, 1] },
} as const

type SectionProps = {
  title: string
  subtitle?: string
  children: React.ReactNode
  className?: string
  delay?: number
  variant?: 'default' | 'accent' | 'dark'
}

function Section({ 
  title, 
  subtitle,
  children, 
  className = '', 
  delay = 0, 
  variant = 'default' 
}: SectionProps) {
  const getBgClass = () => {
    switch (variant) {
      case 'accent':
        return 'bg-slate-50/50 dark:bg-slate-900/50'
      case 'dark':
        return 'bg-slate-900 dark:bg-slate-950'
      default:
        return 'bg-white dark:bg-slate-950'
    }
  }
  
  return (
    <section className={`relative py-16 lg:py-20 ${getBgClass()} ${className}`}>
      <div className="container mx-auto px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.6, delay, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-12"
        >
          <h2 className="text-3xl lg:text-4xl font-bold tracking-tight mb-4">
            <span className="text-slate-900 dark:text-white">
              {title}
            </span>
          </h2>
          {subtitle && (
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
              {subtitle}
            </p>
          )}
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.6, delay: delay + 0.1, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  )
}

function Profile() {
  return (
    <section className="relative flex min-h-[70vh] items-center justify-center overflow-hidden pt-20">
      {/* Simple gradient background */}
      <div className="absolute inset-0 bg-gradient-to-b from-slate-50 to-white dark:from-slate-950 dark:to-slate-900" />
      
      <div className="relative z-10 container mx-auto px-6 lg:px-8 max-w-5xl">
        <motion.div
          {...ANIMATION_CONFIG}
          className="text-center space-y-12"
        >
          {/* Enhanced Avatar */}
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="relative flex justify-center"
          >
            <Avatar className="size-32 sm:size-40 border-2 border-slate-200 dark:border-slate-700">
              <AvatarImage src="./avatarImage.jpg" alt="Naoki Hayashida" />
            </Avatar>
          </motion.div>
          
          {/* Enhanced Name and title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="space-y-6"
          >
            <div className="space-y-3">
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-slate-900 dark:text-white">
                Naoki Hayashida
              </h1>
              <p className="text-xl sm:text-2xl text-blue-600 dark:text-blue-400">
                Frontend Engineer
              </p>
            </div>
            <p className="text-lg text-slate-600 dark:text-slate-400 max-w-xl mx-auto">
              モダンなWeb技術でユーザーエクスペリエンスを創造する<br />
              3年間の実務経験を持つエンジニア
            </p>
          </motion.div>
          
          {/* Call to Action */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative"
          >
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              <a
                href="#contact"
                className="px-6 py-3 rounded-lg bg-blue-600 text-white font-medium hover:bg-blue-700 transition-colors duration-200"
              >
                お問い合わせ
              </a>
              
              <a
                href="#projects"
                className="px-6 py-3 rounded-lg border border-slate-300 dark:border-slate-600 text-slate-700 dark:text-slate-300 font-medium hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors duration-200"
              >
                ポートフォリオを見る
              </a>
            </div>
          </motion.div>
        </motion.div>

      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="relative bg-slate-900 text-white">
      <div className="container mx-auto px-6 lg:px-8 max-w-6xl py-12">
        <div className="text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h3 className="text-2xl font-semibold text-white">
              Naoki Hayashida
            </h3>
            <p className="text-slate-300 max-w-xl mx-auto">
              技術的な課題から創造的なソリューションまで、お気軽にご相談ください。
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative inline-block"
          >
            <SocialLinks config={siteConfig} />
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="pt-8 border-t border-slate-700"
          >
            <p className="text-slate-400 text-sm">
              © 2024 Naoki Hayashida
            </p>
          </motion.div>
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
          delay={0.1}
        >
          <div className="max-w-4xl mx-auto">
            <motion.div
              initial={{ opacity: 0, y: 30, scale: 0.95 }}
              whileInView={{ opacity: 1, y: 0, scale: 1 }}
              viewport={{ once: true }}
              transition={{ duration: 0.8 }}
              className="relative group"
            >
              <div className="rounded-xl bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 p-8 lg:p-10">
                <p className="text-base lg:text-lg leading-relaxed text-slate-600 dark:text-slate-300">
                  私は3年間のフロントエンド開発経験を持つエンジニアです。
                  React、TypeScript、Next.jsを中心としたモダンなWeb技術を駆使して、
                  ユーザーエクスペリエンスを最優先に考えた
                  高品質なアプリケーションの開発に取り組んでいます。
                  <br /><br />
                  常に最新の技術トレンドをキャッチアップし、パフォーマンス最適化から
                  アクセシビリティまで、総合的な視点でプロダクト開発に貢献します。
                </p>
              </div>
            </motion.div>
          </div>
        </Section>

        <Section 
          title="Skills" 
          subtitle="最新技術スタックを駆使した高品質なフロントエンド開発"
          variant="accent" 
          delay={0.2}
        >
          <SkillBadges />
        </Section>

        <Section 
          title="Language Progress" 
          subtitle="GitHubアクティビティから見る技術的専門性と継続的な学習"
          delay={0.3}
        >
          <LanguageProgress />
        </Section>

        <Section 
          title="Projects" 
          subtitle="実務経験と個人プロジェクトで培った技術力とクリエイティビティ"
          variant="accent" 
          delay={0.4}
        >
          <ProjectTabs />
        </Section>

        <Section 
          title="Contact" 
          subtitle="次のプロジェクトでご一緒できることを楽しみにしています"
          delay={0.5}
        >
          <ContactForm />
        </Section>

        <Footer />
      </div>
    </Suspense>
  )
}
