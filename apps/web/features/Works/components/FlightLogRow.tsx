import { ArrowRight, ArrowUpRight } from '@repo/ui/icons/lucide'
import Link from 'next/link'

import type { Destination } from '../type'

type FlightLogRowProps = {
  flightNumber: string
  year: string
  title: string
  destination?: Destination
  href: string
  external?: boolean
}

function RowContent({
  flightNumber,
  year,
  title,
  destination,
  external,
}: Omit<FlightLogRowProps, 'href'>) {
  const Arrow = external ? ArrowUpRight : ArrowRight

  return (
    <>
      <span className="col-start-1 row-start-1 font-mono text-[0.6875rem] tracking-[0.12em] text-ink-muted md:col-auto md:row-auto">
        {flightNumber}
      </span>
      <span className="col-start-2 row-start-1 font-mono text-[0.6875rem] text-ink-faint md:col-auto md:row-auto">
        {year}
      </span>
      <span className="col-span-3 col-start-1 row-start-2 min-w-0 font-display text-[1.05rem] leading-relaxed tracking-tight underline decoration-transparent underline-offset-4 transition-colors duration-300 group-hover:text-accent-navy group-hover:decoration-accent-navy md:col-auto md:row-auto md:text-lg">
        {title}
      </span>
      <span className="col-span-2 col-start-1 row-start-3 justify-self-start md:col-auto md:row-auto md:justify-self-end">
        {destination ? (
          <span className="inline-flex items-center gap-2 rounded-sm border border-accent-navy px-2 py-1 font-mono text-[0.625rem] tracking-[0.12em] text-accent-navy">
            {destination.code}
            <span className="tracking-normal text-ink-muted">
              {destination.label}
            </span>
          </span>
        ) : (
          <span className="font-mono text-xs text-ink-faint" aria-hidden>
            —
          </span>
        )}
      </span>
      <Arrow
        aria-hidden
        strokeWidth={1.25}
        className="col-start-3 row-start-3 size-4 justify-self-end text-ink-faint transition-transform duration-300 group-hover:translate-x-1 group-hover:text-accent-navy md:col-auto md:row-auto"
      />
    </>
  )
}

export function FlightLogRow({ href, external, ...props }: FlightLogRowProps) {
  const className =
    'group grid min-h-20 grid-cols-[4.75rem_minmax(0,1fr)_1.25rem] items-center gap-x-3 gap-y-3 border-t border-rule py-5 transition-colors duration-300 hover:bg-paper-raised md:grid-cols-[5.25rem_3.5rem_minmax(0,1fr)_auto_1.25rem] md:gap-x-5'
  const content = <RowContent {...props} external={external} />

  if (external) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={className}
      >
        {content}
      </a>
    )
  }

  return (
    <Link href={href} className={className}>
      {content}
    </Link>
  )
}

export function FlightLogHeader() {
  return (
    <div className="hidden grid-cols-[5.25rem_3.5rem_minmax(0,1fr)_auto_1.25rem] gap-x-5 border-b border-rule pb-3 font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-faint md:grid">
      <span>Flight</span>
      <span>Year</span>
      <span>Project</span>
      <span className="justify-self-end">Destination</span>
      <span aria-hidden />
    </div>
  )
}
