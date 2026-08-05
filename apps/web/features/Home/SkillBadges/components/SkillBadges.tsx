'use client'

import { motion, useReducedMotion } from 'framer-motion'

import {
  clientProjects,
  personalProjects,
} from '~/features/Home/ProjectTimeLIne/config'

type SkillType = {
  name: string
  category: string
  minYears: number | null
  maxYears: number
}

const EASE = [0.22, 1, 0.36, 1] as const

const SKILLS: ReadonlyArray<SkillType> = [
  { name: 'TypeScript', category: 'Language', minYears: 3, maxYears: 5 },
  { name: 'JavaScript', category: 'Language', minYears: 3, maxYears: 5 },
  { name: 'Next.js', category: 'Framework', minYears: 3, maxYears: 5 },
  { name: 'Figma', category: 'Design', minYears: 2, maxYears: 3 },
  { name: 'Google Cloud', category: 'Infra', minYears: 2, maxYears: 3 },
  { name: 'PostgreSQL', category: 'Database', minYears: 2, maxYears: 3 },
  { name: 'GraphQL', category: 'API', minYears: null, maxYears: 1 },
  { name: 'Ruby', category: 'Language', minYears: null, maxYears: 1 },
]

const LONGEST_YEARS = Math.max(...SKILLS.map((skill) => skill.maxYears))

const SUMMARY: ReadonlyArray<{ value: string; label: string }> = [
  { value: String(SKILLS.length), label: 'TECHNOLOGIES' },
  { value: String(clientProjects.length), label: 'CLIENT PROJECTS' },
  { value: String(personalProjects.length), label: 'PERSONAL PROJECTS' },
  { value: '3年+', label: 'EXPERIENCE' },
]

function toYearsLabel(skill: SkillType): string {
  if (skill.minYears === null) {
    return `〜${skill.maxYears}年`
  }

  return `${skill.minYears}〜${skill.maxYears}年`
}

function SkillRow({ skill, index }: { skill: SkillType; index: number }) {
  const shouldReduceMotion = useReducedMotion()
  const ratio = skill.maxYears / LONGEST_YEARS

  return (
    <li className="border-hairline flex items-center gap-4 border-b py-4">
      <span className="text-ink w-[9rem] shrink-0 text-sm font-bold">
        {skill.name}
      </span>
      <span className="label-mono text-ink-muted hidden w-[6.5rem] shrink-0 sm:block">
        {skill.category}
      </span>
      <span className="bg-hairline relative h-px flex-1">
        <motion.span
          className="bg-navy absolute inset-y-0 left-0 block origin-left"
          initial={{ scaleX: shouldReduceMotion ? ratio : 0 }}
          whileInView={{ scaleX: ratio }}
          viewport={{ once: true }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.42,
            delay: shouldReduceMotion ? 0 : index * 0.04,
            ease: EASE,
          }}
          style={{ width: '100%' }}
        />
      </span>
      <span className="text-ink w-[4.5rem] shrink-0 text-right font-mono text-xs">
        {toYearsLabel(skill)}
      </span>
    </li>
  )
}

export function SkillBadges() {
  return (
    <div>
      <ul className="border-hairline grid border-t md:grid-cols-2 md:gap-x-16">
        {SKILLS.map((skill, index) => (
          <SkillRow key={skill.name} skill={skill} index={index} />
        ))}
      </ul>

      <dl className="border-hairline bg-hairline mt-12 grid grid-cols-2 gap-px border sm:grid-cols-4">
        {SUMMARY.map((item) => (
          <div key={item.label} className="bg-canvas px-4 py-6">
            <dt className="label-mono text-ink-muted">{item.label}</dt>
            <dd className="text-ink font-display mt-0.5 text-2xl font-semibold tracking-tight">
              {item.value}
            </dd>
          </div>
        ))}
      </dl>
    </div>
  )
}
