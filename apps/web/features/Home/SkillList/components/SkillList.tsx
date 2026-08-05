import { Reveal } from '~/features/Home/primitives'
import type { SkillCategory } from '../type'

const SKILL_CATEGORIES: Array<SkillCategory> = [
  {
    index: '01',
    label: 'Frontend',
    items: [
      { name: 'TypeScript', note: '3–5y' },
      { name: 'JavaScript', note: '3–5y' },
      { name: 'Next.js', note: '3–5y' },
      { name: 'React' },
      { name: 'Tailwind CSS' },
      { name: 'React Hook Form + Zod' },
    ],
  },
  {
    index: '02',
    label: 'Backend',
    items: [
      { name: 'Hono' },
      { name: 'PostgreSQL', note: '2–3y' },
      { name: 'Drizzle ORM' },
      { name: 'Supabase' },
      { name: 'Firebase' },
      { name: 'GraphQL / Hasura' },
      { name: 'Auth0 / Clerk' },
    ],
  },
  {
    index: '03',
    label: 'Product Engineering',
    items: [
      { name: 'Google Cloud', note: '2–3y' },
      { name: 'AWS' },
      { name: 'Terraform' },
      { name: 'Figma', note: '2–3y' },
      { name: 'WebRTC' },
      { name: 'Playwright / Vitest' },
    ],
  },
]

export function SkillList() {
  return (
    <div className="border-b border-rule">
      {SKILL_CATEGORIES.map((category, index) => (
        <Reveal key={category.index} delay={index * 0.05}>
          <section className="grid gap-5 border-t border-rule py-7 md:grid-cols-[3rem_13rem_minmax(0,1fr)] md:items-baseline md:gap-6 md:py-8">
            <span className="font-mono text-[0.6875rem] tracking-[0.16em] text-ink-faint">
              {category.index}
            </span>
            <h3 className="font-display text-xl tracking-tight md:text-2xl">
              {category.label}
            </h3>
            <p className="font-mono text-[0.6875rem] leading-[2] tracking-[0.04em] text-ink-muted">
              {category.items.map((item, itemIndex) => (
                <span key={item.name}>
                  {itemIndex > 0 && (
                    <span className="px-2 text-rule-strong" aria-hidden>
                      /
                    </span>
                  )}
                  <span className="text-ink">{item.name}</span>
                  {item.note && (
                    <span className="ml-1 text-ink-faint">{item.note}</span>
                  )}
                </span>
              ))}
            </p>
          </section>
        </Reveal>
      ))}
    </div>
  )
}
