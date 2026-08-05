import { Suspense } from 'react'

import { siteConfig } from '~/config/siteConfig'
import { AboutMe } from '~/features/Home/AboutMe'
import { AiWorkflow } from '~/features/Home/AiWorkflow'
import { ContactForm } from '~/features/Home/ContactForm'
import { Hero } from '~/features/Home/Hero'
import { Now } from '~/features/Home/Now'
import { Principles } from '~/features/Home/Principles'
import { Section } from '~/features/Home/primitives'
import { SkillList } from '~/features/Home/SkillList'
import { SocialLinks } from '~/features/Home/SocialLinks'
import { LoadingScreen } from '~/features/Layout'
import { WorkSummaryList } from '~/features/Works'

function Footer() {
  return (
    <footer className="border-t border-rule">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-8 px-6 py-14 md:flex-row md:items-end md:justify-between md:px-10">
        <div>
          <p className="font-display text-2xl tracking-tight">林田直樹</p>
          <p className="mt-2 font-mono text-xs uppercase tracking-[0.24em] text-ink-faint">
            Naoki Hayashida
          </p>
          <div className="mt-6">
            <SocialLinks config={siteConfig} />
          </div>
        </div>

        <p className="font-mono text-xs text-ink-faint">
          © {new Date().getFullYear()} Naoki Hayashida
        </p>
      </div>
    </footer>
  )
}

export function HomeWrapper() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <div className="grain relative min-h-screen bg-paper text-ink">
        <div className="relative z-[1]">
          <Hero />

          <Section
            id="now"
            index="01"
            label="Now"
            title="いま作っているもの"
            lead="仕様を渡されて作るだけでなく、何を作るかを決めるところからやってみたくて、自分のプロダクトを開発しています。"
          >
            <Now />
          </Section>

          <Section
            id="about"
            index="02"
            label="About"
            title="なぜフロントエンドなのか"
          >
            <AboutMe />
          </Section>

          <Section
            id="principles"
            index="03"
            label="How I work"
            title="仕事で大事にしていること"
          >
            <Principles />
          </Section>

          <Section
            id="ai"
            index="04"
            label="AI-assisted"
            title="AI と品質を、両立させる。"
            lead="要件から検証までをひとつの工程として設計し、AIの速度を活かしながら、人が品質の判断を担います。"
          >
            <AiWorkflow />
          </Section>

          <Section id="skills" index="05" label="Skills" title="できること">
            <SkillList />
          </Section>

          <Section
            id="works"
            index="06"
            label="Flight Log"
            title="これまでに作ってきたもの"
            lead="正社員として関わった3件は、課題と担当範囲を詳細ページにまとめています。企業名は伏せています。"
          >
            <WorkSummaryList />
          </Section>

          <Section
            id="contact"
            index="07"
            label="Contact"
            title="お気軽にご連絡ください"
            lead="お仕事のご相談、技術的な話、なんでも構いません。3営業日以内にご返信します。"
          >
            <ContactForm />
          </Section>

          <Footer />
        </div>
      </div>
    </Suspense>
  )
}
