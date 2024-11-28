import { Suspense } from 'react'

import { Avatar, AvatarImage } from '@repo/ui/components/avatar'
import { Loader2 } from '@repo/ui/icon/lucide'
import * as motion from 'framer-motion/client'

import { siteConfig } from '~/config/siteConfig'
import { ContactForm } from '~/features/Home/Form/ContactForm/components/ContactForm'
import { LanguageProgress } from '~/features/Home/Progress/LanguageProgress'
import { ProjectTabs } from '~/features/Home/ProjectTabs/components/ProjectTabs'
import { SkillBadges } from '~/features/Home/SkillBadges'
import { SocialLinks } from '~/features/Home/SocialLinks'

const ANIMATION_CONFIG = {
  initial: { opacity: 0, y: 20 },
  animate: { opacity: 1, y: 0 },
  transition: { duration: 0.5 },
} as const

interface SectionProps {
  title: string
  children: React.ReactNode
  className?: string
  delay?: number
}

const Section = ({
  title,
  children,
  className = '',
  delay = 0,
}: SectionProps) => (
  <div className={`container mx-auto px-4 py-20 ${className}`}>
    <motion.h2
      {...ANIMATION_CONFIG}
      className="mb-8 text-center text-3xl font-bold"
    >
      {title}
    </motion.h2>
    <motion.div {...ANIMATION_CONFIG} transition={{ duration: 0.5, delay }}>
      {children}
    </motion.div>
  </div>
)

const Profile = () => (
  <div className="flex min-h-screen items-center justify-center">
    <motion.div
      {...ANIMATION_CONFIG}
      className="flex flex-col items-center justify-center text-center"
    >
      <Avatar className="my-4 size-40 border-2 border-slate-400">
        <AvatarImage src="./avatarImage.jpg" alt="Naoki Hayashida" />
      </Avatar>
      <h1 className="mb-4 text-4xl font-bold">Naoki Hayashida</h1>
      <p className="mb-8 text-xl">フロントエンドエンジニア</p>
      <SocialLinks config={siteConfig} />
    </motion.div>
  </div>
)

export const HomeWrapper = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <div className="bg-background text-foreground min-h-screen">
        <Profile />

        <Section title="About Me">
          <p className="mx-auto max-w-2xl text-center text-lg">
            私は3年間のフロントエンド開発経験を持つエンジニアです。
            モダンなWeb技術を駆使して、ユーザーフレンドリーなインターフェースの構築に情熱を注いでいます。
            常に新しい技術トレンドをキャッチアップし、効率的で美しいWebアプリケーションの開発に取り組んでいます。
          </p>
        </Section>

        <Section title="Skills" className="bg-muted">
          <SkillBadges />
        </Section>

        <Section title="Language Progress">
          <LanguageProgress />
        </Section>

        <Section title="Projects">
          <ProjectTabs />
        </Section>

        <Section title="Contact">
          <ContactForm />
        </Section>
      </div>
    </Suspense>
  )
}

const LoadingScreen = () => (
  <div className="bg-background/90 fixed inset-0 z-50 flex items-center justify-center backdrop-blur-sm">
    <div className="h-10 w-10 animate-spin rounded-full border-4 border-slate-400 border-t-transparent">
      <Loader2 className="h-5 w-5" />
    </div>
  </div>
)
