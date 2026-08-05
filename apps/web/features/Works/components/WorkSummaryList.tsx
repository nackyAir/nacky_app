import { Reveal } from '~/features/Home/primitives'
import { featuredWorks, freelanceTimeline, personalWorks } from '../config'
import { createFlightNumber, getFlightYear } from '../flightLog'
import { FlightLogHeader, FlightLogRow } from './FlightLogRow'

type FlightLogGroupProps = {
  title: string
  note: string
  children: React.ReactNode
}

function FlightLogGroup({ title, note, children }: FlightLogGroupProps) {
  return (
    <div>
      <Reveal>
        <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
          <h3 className="font-mono text-xs uppercase tracking-[0.24em] text-ink-muted">
            {title}
          </h3>
          <p className="font-mono text-xs text-ink-faint">{note}</p>
        </div>
      </Reveal>
      <div className="mt-8">
        <FlightLogHeader />
        <ul>{children}</ul>
      </div>
    </div>
  )
}

export function WorkSummaryList() {
  const freelanceOffset = featuredWorks.length
  const personalOffset = featuredWorks.length + freelanceTimeline.length

  return (
    <div className="space-y-16 md:space-y-20">
      <FlightLogGroup title="Employee" note="2024.06 — 2026.04">
        {featuredWorks.map((work, index) => (
          <li key={work.slug}>
            <Reveal delay={index * 0.05}>
              <FlightLogRow
                flightNumber={createFlightNumber(index)}
                year={getFlightYear(work.period)}
                title={work.title}
                destination={work.destination}
                href={`/works/${work.slug}`}
              />
            </Reveal>
          </li>
        ))}
      </FlightLogGroup>

      <FlightLogGroup title="Freelance" note="2023.03 — 2024.03">
        {freelanceTimeline.map((work, index) => (
          <li key={work.slug}>
            <Reveal delay={index * 0.05}>
              <FlightLogRow
                flightNumber={createFlightNumber(freelanceOffset + index)}
                year={getFlightYear(work.period)}
                title={work.title}
                destination={work.destination}
                href={`/works/${work.slug}`}
              />
            </Reveal>
          </li>
        ))}
      </FlightLogGroup>

      <FlightLogGroup title="Personal" note="2023.09 —">
        {personalWorks.map((work, index) => (
          <li key={work.title}>
            <Reveal delay={index * 0.05}>
              <FlightLogRow
                flightNumber={createFlightNumber(personalOffset + index)}
                year={getFlightYear(work.period)}
                title={work.title}
                destination={work.destination}
                href={work.url}
                external
              />
            </Reveal>
          </li>
        ))}
      </FlightLogGroup>
    </div>
  )
}
