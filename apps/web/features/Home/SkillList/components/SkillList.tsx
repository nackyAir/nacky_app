import { Reveal } from '~/features/Home/primitives'
import type { SkillTier } from '../type'

const SKILL_TIERS: Array<SkillTier> = [
  {
    label: '主戦場',
    caption: '業務で継続的に使っている',
    items: [
      { name: 'TypeScript', note: '3-5年' },
      { name: 'JavaScript', note: '3-5年' },
      { name: 'Next.js', note: '3-5年' },
      { name: 'React' },
      { name: 'Tailwind CSS' },
      { name: 'React Hook Form + Zod' },
    ],
  },
  {
    label: '並走できる',
    caption: '必要になった時に自分で通せる',
    items: [
      { name: 'Google Cloud', note: '2-3年' },
      { name: 'PostgreSQL', note: '2-3年' },
      { name: 'Terraform' },
      { name: 'Hono' },
      { name: 'Drizzle ORM' },
      { name: 'Supabase' },
      { name: 'Firebase' },
      { name: 'Auth0 / Clerk' },
    ],
  },
  {
    label: '扱える',
    caption: '案件で触れてきた',
    items: [
      { name: 'Figma', note: '2-3年' },
      { name: 'GraphQL / Hasura', note: '〜1年' },
      { name: 'AWS' },
      { name: 'WebRTC' },
      { name: 'Playwright / Vitest' },
    ],
  },
]

export function SkillList() {
  return (
    <div className="space-y-px">
      {SKILL_TIERS.map((tier, i) => (
        <Reveal key={tier.label} delay={i * 0.06}>
          <div className="grid gap-4 border-t border-rule py-7 first:border-t-0 first:pt-0 md:grid-cols-[11rem_minmax(0,1fr)] md:gap-8">
            <div>
              <h3 className="text-[0.95rem] font-medium">{tier.label}</h3>
              <p className="mt-1 font-mono text-xs leading-relaxed text-ink-faint">
                {tier.caption}
              </p>
            </div>

            <ul className="flex flex-wrap gap-x-5 gap-y-3">
              {tier.items.map((item) => (
                <li
                  key={item.name}
                  className="flex items-baseline gap-1.5 text-[0.95rem] text-ink-muted"
                >
                  <span className="text-ink">{item.name}</span>
                  {item.note && (
                    <span className="font-mono text-xs text-ink-faint">
                      {item.note}
                    </span>
                  )}
                </li>
              ))}
            </ul>
          </div>
        </Reveal>
      ))}

      <Reveal delay={0.2}>
        <p className="border-t border-rule pt-7 text-[0.9rem] leading-[1.9] text-ink-faint">
          バックエンドは TypeScript の範囲で書いています。Ruby・Python・Go
          も触ったことはありますが、主戦力ではありません。
          要件を一人で切るところは、PM
          やシニアエンジニアと並走しながら詰めていく形が現状の得意な進め方です。
        </p>
      </Reveal>
    </div>
  )
}
