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
        return 'bg-gradient-to-br from-blue-50/50 via-indigo-50/30 to-purple-50/50 dark:from-slate-900/50 dark:via-slate-800/50 dark:to-slate-900/80'
      case 'dark':
        return 'bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 dark:from-slate-950 dark:via-slate-900 dark:to-slate-950'
      default:
        return 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-sm'
    }
  }
  
  return (
    <section className={`relative py-24 lg:py-32 ${getBgClass()} ${className}`}>
      {/* Background decorations */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-1/4 h-96 w-96 rounded-full bg-gradient-to-br from-blue-400/10 to-indigo-400/10 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 h-96 w-96 rounded-full bg-gradient-to-br from-indigo-400/10 to-purple-400/10 blur-3xl"></div>
      </div>

      <div className="relative z-10 container mx-auto px-6 lg:px-8 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          transition={{ duration: 0.8, delay, ease: [0.25, 0.1, 0.25, 1] }}
          className="text-center mb-20"
        >
          <h2 className="text-4xl lg:text-6xl font-black tracking-tight mb-6">
            <span className="bg-gradient-to-r from-slate-900 via-blue-800 to-indigo-800 dark:from-white dark:via-blue-300 dark:to-indigo-300 bg-clip-text text-transparent">
              {title}
            </span>
          </h2>
          {subtitle && (
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-3xl mx-auto leading-relaxed">
              {subtitle}
            </p>
          )}
          <div className="relative mx-auto mt-8 w-24 h-1">
            <div className="absolute inset-0 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-full"></div>
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 via-indigo-400 to-purple-400 rounded-full blur-sm"></div>
          </div>
        </motion.div>
        
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          transition={{ duration: 0.8, delay: delay + 0.2, ease: [0.25, 0.1, 0.25, 1] }}
        >
          {children}
        </motion.div>
      </div>
    </section>
  )
}

function Profile() {
  return (
    <section className="relative flex min-h-[80vh] items-center justify-center overflow-hidden pt-20">
      {/* Dynamic gradient background */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50 dark:from-slate-950 dark:via-slate-900 dark:to-slate-800">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_30%_20%,theme(colors.blue.500/20),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_70%_80%,theme(colors.indigo.500/20),transparent_50%)]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_20%_80%,theme(colors.purple.500/15),transparent_50%)]"></div>
      </div>
      
      {/* Floating tech icons */}
      <div className="absolute inset-0">
        <motion.div
          animate={{ 
            y: [0, -20, 0],
            rotate: [0, 5, 0]
          }}
          transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-20 left-20 w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 opacity-20"
        />
        <motion.div
          animate={{ 
            y: [0, 15, 0],
            rotate: [0, -3, 0]
          }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute top-40 right-32 w-6 h-6 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 opacity-25"
        />
        <motion.div
          animate={{ 
            y: [0, -10, 0],
            x: [0, 5, 0]
          }}
          transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-32 left-1/4 w-4 h-8 rounded-full bg-gradient-to-br from-purple-500 to-pink-600 opacity-20"
        />
      </div>
      
      <div className="relative z-10 container mx-auto px-6 lg:px-8 max-w-5xl">
        <motion.div
          {...ANIMATION_CONFIG}
          className="text-center space-y-12"
        >
          {/* Enhanced Avatar */}
          <motion.div
            initial={{ scale: 0.8, opacity: 0, rotateY: -20 }}
            animate={{ scale: 1, opacity: 1, rotateY: 0 }}
            transition={{ duration: 1, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
            className="relative flex justify-center"
          >
            <div className="relative">
              {/* Outer glow */}
              <div className="absolute -inset-6 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 opacity-20 blur-2xl"></div>
              {/* Main avatar container */}
              <div className="relative rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-1.5 shadow-2xl">
                <div className="rounded-full bg-white dark:bg-slate-900 p-2">
                  <Avatar className="size-40 sm:size-48 border-4 border-white/50 dark:border-slate-800/50">
                    <AvatarImage src="./avatarImage.jpg" alt="Naoki Hayashida" />
                  </Avatar>
                </div>
              </div>
              {/* Status indicator */}
              <div className="absolute bottom-4 right-4 w-6 h-6 bg-green-500 rounded-full border-4 border-white dark:border-slate-900 shadow-lg">
                <div className="w-full h-full bg-green-400 rounded-full animate-pulse"></div>
              </div>
            </div>
          </motion.div>
          
          {/* Enhanced Name and title */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5, ease: [0.25, 0.1, 0.25, 1] }}
            className="space-y-6"
          >
            <div className="space-y-4">
              <h1 className="text-5xl sm:text-6xl lg:text-7xl font-black tracking-tight">
                <span className="block bg-gradient-to-r from-slate-900 via-blue-800 to-indigo-800 dark:from-white dark:via-blue-300 dark:to-indigo-300 bg-clip-text text-transparent">
                  Naoki Hayashida
                </span>
              </h1>
              <div className="relative">
                <p className="text-2xl sm:text-3xl font-bold text-blue-600 dark:text-blue-400">
                  Frontend Engineer
                </p>
                <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-32 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 rounded-full"></div>
              </div>
            </div>
            <p className="text-xl text-slate-600 dark:text-slate-400 max-w-2xl mx-auto leading-relaxed">
              モダンなWeb技術で革新的なユーザーエクスペリエンスを創造する<br />
              <span className="font-semibold text-blue-600 dark:text-blue-400">3年間</span>の実務経験を持つプロフェッショナル
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
              <motion.a
                href="#contact"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 text-white font-bold text-lg shadow-2xl hover:shadow-3xl transition-all duration-300"
              >
                <span className="relative z-10">お問い合わせ</span>
                <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-700 via-indigo-700 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              </motion.a>
              
              <motion.a
                href="#projects"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="group relative px-8 py-4 rounded-2xl border-2 border-blue-600 text-blue-600 dark:text-blue-400 font-bold text-lg hover:bg-blue-600 hover:text-white transition-all duration-300"
              >
                ポートフォリオを見る
              </motion.a>
            </div>
          </motion.div>
        </motion.div>

        {/* Enhanced Scroll indicator */}
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8, delay: 1.2, ease: [0.25, 0.1, 0.25, 1] }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 12, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="flex flex-col items-center text-slate-500 dark:text-slate-400"
          >
            <span className="text-sm font-medium mb-3 tracking-wider">SCROLL</span>
            <div className="relative w-6 h-10 border-2 border-slate-300 dark:border-slate-600 rounded-full bg-white/30 dark:bg-slate-900/30 backdrop-blur-sm">
              <motion.div
                animate={{ y: [2, 20, 2] }}
                transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
                className="absolute left-1/2 top-2 w-1.5 h-3 -translate-x-1/2 rounded-full bg-gradient-to-b from-blue-600 to-indigo-600"
              />
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  )
}

function Footer() {
  return (
    <footer className="relative bg-gradient-to-br from-slate-900 via-slate-800 to-slate-900 text-white overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0">
        <div className="absolute top-0 left-1/4 h-64 w-64 rounded-full bg-gradient-to-br from-blue-600/20 to-indigo-600/20 blur-3xl"></div>
        <div className="absolute bottom-0 right-1/4 h-64 w-64 rounded-full bg-gradient-to-br from-indigo-600/20 to-purple-600/20 blur-3xl"></div>
      </div>
      
      <div className="relative z-10 container mx-auto px-6 lg:px-8 max-w-6xl py-16">
        <div className="text-center space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
            className="space-y-6"
          >
            <h3 className="text-3xl font-bold bg-gradient-to-r from-white via-blue-200 to-indigo-200 bg-clip-text text-transparent">
              Naoki Hayashida
            </h3>
            <p className="text-slate-300 max-w-2xl mx-auto text-lg leading-relaxed">
              次世代のWebエクスペリエンスを一緒に創造しませんか？<br />
              技術的な課題から創造的なソリューションまで、お気軽にご相談ください。
            </p>
          </motion.div>
          
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="relative inline-block rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20 p-6"
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
              © 2024 Naoki Hayashida. Crafted with passion and cutting-edge technology.
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
              <div className="absolute -inset-6 rounded-3xl bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-purple-600/20 blur-2xl group-hover:blur-3xl transition-all duration-500"></div>
              <div className="relative rounded-3xl bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-white/20 dark:border-slate-700/20 p-12 lg:p-16 shadow-2xl">
                <div className="absolute top-8 left-8 flex gap-2">
                  <div className="w-3 h-3 rounded-full bg-red-500/60"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-500/60"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500/60"></div>
                </div>
                <div className="mt-8">
                  <p className="text-lg lg:text-xl leading-relaxed text-slate-600 dark:text-slate-300 font-medium">
                    私は<span className="font-bold text-blue-600 dark:text-blue-400">3年間</span>のフロントエンド開発経験を持つエンジニアです。
                    React、TypeScript、Next.jsを中心としたモダンなWeb技術を駆使して、
                    <span className="font-bold text-indigo-600 dark:text-indigo-400">ユーザーエクスペリエンス</span>を最優先に考えた
                    高品質なアプリケーションの開発に取り組んでいます。
                    <br /><br />
                    常に最新の技術トレンドをキャッチアップし、パフォーマンス最適化から
                    アクセシビリティまで、総合的な視点でプロダクト開発に貢献します。
                  </p>
                </div>
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
