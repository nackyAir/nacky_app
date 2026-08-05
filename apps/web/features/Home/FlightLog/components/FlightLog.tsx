'use client'

import { motion, useReducedMotion } from 'framer-motion'
import {
  clientProjects,
  personalProjects,
} from '~/features/Home/ProjectTimeLIne/config'
import { PLANE_GLYPH } from '~/features/Home/RouteMap/config'

import { toFlightLog } from '../flightLog'
import type { FlightLogEntry } from '../type'

const ENTRIES = toFlightLog([...clientProjects, ...personalProjects])

function StatusCell({ status }: { status: FlightLogEntry['status'] }) {
  if (status === 'active') {
    return (
      <span className="inline-flex items-center gap-2">
        <span className="size-1.5 rounded-full bg-status-online" />
        <span className="text-ink text-sm">運航中</span>
      </span>
    )
  }

  return <span className="label-mono text-ink-muted">COMPLETED</span>
}

function DestinationChip({ code }: { code: string }) {
  return (
    <span className="border-navy text-navy label-mono inline-flex items-center rounded-flat border px-2.5 py-1">
      {code}
    </span>
  )
}

function RouteArrow() {
  return (
    <svg
      viewBox="0 0 160 8"
      className="text-navy h-2 w-full max-w-[160px]"
      aria-hidden="true"
    >
      <line
        x1="0"
        y1="4"
        x2="153"
        y2="4"
        stroke="currentColor"
        strokeWidth="1"
        opacity="0.5"
      />
      <path
        d="M 152 1.6 L 157 4 L 152 6.4"
        fill="none"
        stroke="currentColor"
        strokeWidth="1"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  )
}

function PlaneMark({ className }: { className?: string }) {
  return (
    <svg viewBox="-13 -12 26 24" className={className} aria-hidden="true">
      <g transform="rotate(-45)">
        <path d={PLANE_GLYPH} fill="currentColor" />
      </g>
    </svg>
  )
}

export function FlightLog() {
  const shouldReduceMotion = useReducedMotion()

  return (
    <div>
      <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
        <h2 className="text-ink font-display flex items-center gap-4 text-[clamp(1.75rem,3.4vw,2.5rem)] font-semibold tracking-tight">
          <PlaneMark className="text-navy size-6 shrink-0 translate-y-[2px]" />
          FLIGHT LOG
        </h2>
        <p className="text-ink-muted text-sm">プロジェクトフライトログ</p>
        <p className="label-mono text-ink-muted ml-auto hidden md:block">
          {ENTRIES.length} FLIGHTS
        </p>
      </div>

      <div className="border-hairline mt-8 hidden border-t md:block">
        <table className="w-full border-collapse text-left">
          <thead>
            <tr className="border-hairline border-b">
              <th className="label-mono text-ink-muted py-4 pr-4 font-normal">
                FLIGHT NO.
              </th>
              <th className="label-mono text-ink-muted py-4 pr-4 font-normal">
                YEAR
              </th>
              <th className="label-mono text-ink-muted py-4 pr-4 font-normal">
                PROJECT
              </th>
              <th className="label-mono text-ink-muted py-4 pr-4 font-normal">
                DESTINATION
              </th>
              <th className="py-4 pr-4">
                <span className="sr-only">路線</span>
              </th>
              <th className="label-mono text-ink-muted py-4 text-right font-normal">
                STATUS
              </th>
            </tr>
          </thead>
          <tbody>
            {ENTRIES.map((entry, index) => (
              <motion.tr
                key={entry.flightNo}
                initial={{
                  opacity: shouldReduceMotion ? 1 : 0.9,
                  y: shouldReduceMotion ? 0 : 6,
                }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: '-40px' }}
                transition={{
                  duration: shouldReduceMotion ? 0 : 0.42,
                  delay: shouldReduceMotion ? 0 : index * 0.05,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="border-hairline hover:bg-surface border-b transition-colors"
              >
                <td className="text-ink font-mono py-6 pr-4 text-sm tracking-[0.12em]">
                  {entry.flightNo}
                </td>
                <td className="text-ink font-mono py-6 pr-4 text-sm">
                  {entry.year}
                </td>
                <td className="text-ink py-6 pr-4">{entry.project}</td>
                <td className="py-6 pr-4">
                  <DestinationChip code={entry.destination} />
                </td>
                <td className="py-6 pr-4">
                  <RouteArrow />
                </td>
                <td className="py-6 text-right">
                  <StatusCell status={entry.status} />
                </td>
              </motion.tr>
            ))}
          </tbody>
        </table>
      </div>

      <ul className="border-hairline mt-6 border-t md:hidden">
        {ENTRIES.map((entry) => (
          <li key={entry.flightNo} className="border-hairline border-b py-6">
            <div className="flex items-center justify-between gap-4">
              <span className="text-ink font-mono text-sm tracking-[0.12em]">
                {entry.flightNo}
              </span>
              <StatusCell status={entry.status} />
            </div>
            <p className="text-ink mt-2">{entry.project}</p>
            <div className="mt-2 flex items-center gap-4">
              <span className="text-ink-muted font-mono text-sm">
                {entry.year}
              </span>
              <DestinationChip code={entry.destination} />
              <span className="text-ink-muted text-sm">
                {entry.destinationLabel}
              </span>
            </div>
          </li>
        ))}
      </ul>
    </div>
  )
}
