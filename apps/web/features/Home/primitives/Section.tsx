import { Reveal } from './Reveal'

type SectionProps = {
  id?: string
  index: string
  label: string
  title?: string
  lead?: string
  children: React.ReactNode
}

export function Section({
  id,
  index,
  label,
  title,
  lead,
  children,
}: SectionProps) {
  return (
    <section
      id={id}
      className="scroll-mt-20 border-t border-rule py-16 md:py-24"
    >
      <div className="mx-auto w-full max-w-6xl px-6 md:px-10">
        <div className="grid gap-8 md:grid-cols-[9rem_minmax(0,1fr)] md:gap-14">
          <Reveal className="flex items-baseline gap-3 md:flex-col md:gap-2 md:pt-2">
            <span className="font-mono text-xs text-ink-faint">{index}</span>
            <h2 className="font-mono text-xs uppercase tracking-[0.28em] text-ink-muted">
              {label}
            </h2>
          </Reveal>

          <div>
            {title && (
              <Reveal delay={0.05}>
                <p className="font-display text-2xl leading-[1.5] tracking-tight text-balance-jp md:text-[2rem]">
                  {title}
                </p>
              </Reveal>
            )}
            {lead && (
              <Reveal delay={0.1}>
                <p className="mt-5 max-w-[42rem] text-[1rem] leading-[2] text-ink-muted">
                  {lead}
                </p>
              </Reveal>
            )}
            <div className={title || lead ? 'mt-10 md:mt-12' : ''}>
              {children}
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
