'use client'

import { motion, useReducedMotion } from 'framer-motion'

type SkillType = {
  name: string
  category: string
  level: number
}

const EASE = [0.22, 1, 0.36, 1] as const

const SKILLS: ReadonlyArray<SkillType> = [
  { name: 'React', category: 'Frontend', level: 95 },
  { name: 'TypeScript', category: 'Language', level: 90 },
  { name: 'Next.js', category: 'Framework', level: 88 },
  { name: 'Tailwind CSS', category: 'Styling', level: 92 },
  { name: 'Node.js', category: 'Backend', level: 80 },
  { name: 'Supabase', category: 'Database', level: 85 },
  { name: 'Firebase', category: 'Backend', level: 75 },
  { name: 'React Native', category: 'Mobile', level: 70 },
  { name: 'Hono', category: 'Framework', level: 75 },
  { name: 'NestJS', category: 'Backend', level: 78 },
]

const AVERAGE_LEVEL = Math.round(
  SKILLS.reduce((total, skill) => total + skill.level, 0) / SKILLS.length
)

const SUMMARY: ReadonlyArray<{ value: string; label: string }> = [
  { value: String(SKILLS.length), label: 'TECHNOLOGIES' },
  { value: '3+', label: 'YEARS' },
  { value: `${AVERAGE_LEVEL}%`, label: 'AVG LEVEL' },
  { value: '10+', label: 'PROJECTS' },
]

function SkillRow({ skill, index }: { skill: SkillType; index: number }) {
  const shouldReduceMotion = useReducedMotion()

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
          initial={{ scaleX: shouldReduceMotion ? skill.level / 100 : 0 }}
          whileInView={{ scaleX: skill.level / 100 }}
          viewport={{ once: true }}
          transition={{
            duration: shouldReduceMotion ? 0 : 0.42,
            delay: shouldReduceMotion ? 0 : index * 0.04,
            ease: EASE,
          }}
          style={{ width: '100%' }}
        />
      </span>
      <span className="text-ink-muted w-[3rem] shrink-0 text-right font-mono text-xs">
        {skill.level}
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
