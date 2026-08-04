import { ArrowUpRight } from '@repo/ui/icons/lucide'
import Link from 'next/link'

import { Reveal } from '~/features/Home/primitives'
import { featuredWorks, freelanceTimeline, personalWorks } from '../config'

function GroupLabel({ title, note }: { title: string; note: string }) {
  return (
    <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
      <h3 className="font-mono text-xs uppercase tracking-[0.24em] text-ink-muted">
        {title}
      </h3>
      <p className="font-mono text-xs text-ink-faint">{note}</p>
    </div>
  )
}

export function WorkSummaryList() {
  return (
    <div className="space-y-20">
      <div>
        <Reveal>
          <GroupLabel title="正社員として" note="2024.06 — 2026.04" />
        </Reveal>

        <ul className="mt-8">
          {featuredWorks.map((work, i) => (
            <Reveal key={work.slug} delay={i * 0.06}>
              <li className="border-t border-rule">
                <Link
                  href={`/works/${work.slug}`}
                  className="group block py-8 transition-colors duration-300 hover:bg-paper-raised"
                >
                  <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1 font-mono text-xs text-ink-faint">
                    <span>{work.period}</span>
                    <span aria-hidden>/</span>
                    <span>{work.duration}</span>
                    <span aria-hidden>/</span>
                    <span>{work.role}</span>
                  </div>

                  <h4 className="mt-3 flex items-start gap-2 font-display text-2xl leading-snug tracking-tight md:text-3xl">
                    {work.title}
                    <ArrowUpRight className="mt-1.5 size-5 shrink-0 text-ink-faint transition-transform duration-300 group-hover:-translate-y-1 group-hover:translate-x-1 group-hover:text-ink" />
                  </h4>

                  <p className="mt-4 max-w-[42rem] text-[0.95rem] leading-[2] text-ink-muted">
                    {work.summary}
                  </p>

                  <p className="mt-4 font-mono text-xs leading-relaxed text-ink-faint">
                    {work.stack.join(' · ')}
                  </p>
                </Link>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>

      <div>
        <Reveal>
          <GroupLabel title="業務委託として" note="2023.03 — 2024.03" />
        </Reveal>

        <ul className="mt-8">
          {freelanceTimeline.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.05}>
              <li className="grid gap-2 border-t border-rule py-6 md:grid-cols-[11rem_minmax(0,1fr)] md:gap-8">
                <span className="font-mono text-xs text-ink-faint md:pt-1">
                  {item.period}
                </span>
                <div>
                  <h4 className="text-[1.05rem] font-medium">{item.title}</h4>
                  <p className="mt-2 max-w-[40rem] text-[0.9rem] leading-[1.9] text-ink-muted">
                    {item.note}
                  </p>
                  <p className="mt-3 font-mono text-xs text-ink-faint">
                    {item.stack.join(' · ')}
                  </p>
                </div>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>

      <div>
        <Reveal>
          <GroupLabel title="個人開発" note="2023.09 —" />
        </Reveal>

        <ul className="mt-8 grid gap-px overflow-hidden rounded-lg border border-rule bg-rule md:grid-cols-3">
          {personalWorks.map((item, i) => (
            <Reveal key={item.title} delay={i * 0.06} className="h-full">
              <li className="flex h-full flex-col bg-paper-raised p-6">
                <a
                  href={item.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group flex flex-1 flex-col"
                >
                  <span className="font-mono text-xs text-ink-faint">
                    {item.period}
                  </span>
                  <h4 className="mt-3 flex items-center gap-1.5 font-display text-xl tracking-tight">
                    {item.title}
                    <ArrowUpRight className="size-4 text-ink-faint transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-ink" />
                  </h4>
                  <p className="mt-3 flex-1 text-[0.9rem] leading-[1.9] text-ink-muted">
                    {item.description}
                  </p>
                  <p className="mt-5 font-mono text-xs leading-relaxed text-ink-faint">
                    {item.stack.join(' · ')}
                  </p>
                </a>
              </li>
            </Reveal>
          ))}
        </ul>
      </div>
    </div>
  )
}
