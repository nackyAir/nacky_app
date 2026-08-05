import type { Metadata } from 'next'

import {
  createFlightNumber,
  FlightLogHeader,
  FlightLogRow,
  featuredWorks,
  freelanceTimeline,
  getFlightYear,
} from '~/features/Works'

export const metadata: Metadata = {
  title: 'Works — Flight Log',
  description:
    '林田直樹がこれまでに携わったプロダクト開発の実績を、フライトログ形式で紹介します。',
  alternates: { canonical: '/works' },
}

export default function WorksPage() {
  const works = [...featuredWorks, ...freelanceTimeline]

  return (
    <div className="grain relative min-h-screen bg-paper text-ink">
      <main className="relative z-[1] mx-auto w-full max-w-6xl px-6 pt-32 pb-24 md:px-10 md:pt-40">
        <header className="grid gap-8 border-b border-rule pb-12 md:grid-cols-[9rem_minmax(0,1fr)] md:gap-14 md:pb-16">
          <div className="flex items-baseline gap-3 md:flex-col md:gap-2 md:pt-2">
            <span className="font-mono text-xs text-ink-faint">06</span>
            <p className="font-mono text-xs uppercase tracking-[0.28em] text-ink-muted">
              Flight Log
            </p>
          </div>
          <div>
            <h1 className="font-display text-[clamp(2.25rem,6vw,4.5rem)] leading-[1.12] tracking-[-0.035em] text-balance-jp">
              これまでの就航記録。
            </h1>
            <p className="mt-6 max-w-[40rem] text-[1rem] leading-[2] text-ink-muted">
              業界を越えて、課題整理から設計・実装・検証まで携わったプロジェクトの記録です。
            </p>
          </div>
        </header>

        <section className="pt-12 md:pt-16" aria-labelledby="flight-log-title">
          <div className="mb-8 flex items-end justify-between gap-6">
            <h2
              id="flight-log-title"
              className="font-mono text-xs uppercase tracking-[0.24em] text-ink-muted"
            >
              All Flights
            </h2>
            <p className="font-mono text-[0.625rem] uppercase tracking-[0.14em] text-ink-faint">
              {String(works.length).padStart(2, '0')} records
            </p>
          </div>

          <FlightLogHeader />
          <ol>
            {works.map((work, index) => (
              <li key={work.slug}>
                <FlightLogRow
                  flightNumber={createFlightNumber(index)}
                  year={getFlightYear(work.period)}
                  title={work.title}
                  destination={work.destination}
                  href={`/works/${work.slug}`}
                />
              </li>
            ))}
          </ol>
        </section>
      </main>
    </div>
  )
}
