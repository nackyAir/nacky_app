'use client'

import { AnimatePresence, motion, useReducedMotion } from 'framer-motion'
import { useState } from 'react'

import {
  clientProjects,
  personalProjects,
} from '~/features/Home/ProjectTimeLIne/config'
import { PLANE_GLYPH } from '~/features/Home/RouteMap/config'

import { toFlightLog } from '../flightLog'
import type { FlightLogEntry } from '../type'

const ENTRIES = toFlightLog([...clientProjects, ...personalProjects])

const EASE = [0.22, 1, 0.36, 1] as const
const PANEL_DURATION = 0.42

const ROW_GRID =
  'grid items-center gap-x-4 grid-cols-[6rem_3.5rem_minmax(0,1fr)_5rem_6.5rem_1rem] lg:grid-cols-[7rem_4rem_minmax(0,1fr)_5.5rem_minmax(0,9rem)_7rem_1rem]'

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

function ToggleArrow({ isOpen }: { isOpen: boolean }) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.span
      className="text-navy inline-flex justify-self-end"
      animate={{ rotate: isOpen ? 180 : 0 }}
      transition={{ duration: shouldReduceMotion ? 0 : 0.18, ease: EASE }}
    >
      <svg viewBox="0 0 12 8" className="w-3" aria-hidden="true">
        <path
          d="M 1 1.5 L 6 6.5 L 11 1.5"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.4"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>
    </motion.span>
  )
}

function ActionList({ actions }: { actions: ReadonlyArray<string> }) {
  return (
    <ol className="space-y-2">
      {actions.map((action, index) => (
        <li key={action} className="flex gap-3">
          <span className="text-navy shrink-0 font-mono text-xs leading-[1.9] tracking-[0.12em]">
            {String(index + 1).padStart(2, '0')}
          </span>
          <span>{action}</span>
        </li>
      ))}
    </ol>
  )
}

function DetailField({
  label,
  children,
}: {
  label: string
  children: React.ReactNode
}) {
  return (
    <div className="border-hairline grid gap-1 border-t py-4 first:border-t-0 md:grid-cols-[7rem_minmax(0,1fr)] md:gap-6">
      <dt className="label-mono text-ink-muted pt-1.5">{label}</dt>
      <dd className="text-ink-muted text-sm leading-[1.9]">{children}</dd>
    </div>
  )
}

function StackList({ skills }: { skills: ReadonlyArray<string> }) {
  return (
    <ul className="flex flex-wrap gap-2">
      {skills.map((skill) => (
        <li
          key={skill}
          className="border-hairline text-ink rounded-flat border px-2 py-1 font-mono text-xs"
        >
          {skill}
        </li>
      ))}
    </ul>
  )
}

function FlightDetail({ entry }: { entry: FlightLogEntry }) {
  const details = entry.details

  return (
    <dl className="bg-surface border-hairline border-t px-4 py-2 md:px-6">
      <DetailField label="期間">{entry.period}</DetailField>
      <DetailField label="役割">{entry.role}</DetailField>

      {details?.structure ? (
        <DetailField label="体制">{details.structure}</DetailField>
      ) : null}

      {details?.challenge ? (
        <DetailField label="課題">{details.challenge}</DetailField>
      ) : null}

      {details?.actions ? (
        <DetailField label="取り組み">
          <ActionList actions={details.actions} />
        </DetailField>
      ) : null}

      {details?.outcome ? (
        <DetailField label="成果">{details.outcome}</DetailField>
      ) : null}

      {details ? null : (
        <DetailField label="概要">{entry.description}</DetailField>
      )}

      <DetailField label="STACK">
        <StackList skills={entry.skills} />
      </DetailField>

      {entry.url ? (
        <DetailField label="LINK">
          <a
            href={entry.url}
            target="_blank"
            rel="noreferrer"
            className="text-navy hover:underline"
          >
            {entry.url}
          </a>
        </DetailField>
      ) : null}
    </dl>
  )
}

function DetailPanel({
  entry,
  isOpen,
  panelId,
}: {
  entry: FlightLogEntry
  isOpen: boolean
  panelId: string
}) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <AnimatePresence initial={false}>
      {isOpen ? (
        <motion.div
          key={panelId}
          id={panelId}
          className="overflow-hidden"
          initial={{ height: 0 }}
          animate={{ height: 'auto' }}
          exit={{ height: 0 }}
          transition={{
            duration: shouldReduceMotion ? 0 : PANEL_DURATION,
            ease: EASE,
          }}
        >
          <FlightDetail entry={entry} />
        </motion.div>
      ) : null}
    </AnimatePresence>
  )
}

type FlightRowProps = {
  entry: FlightLogEntry
  index: number
  isOpen: boolean
  panelId: string
  onToggle: () => void
}

function FlightRow({
  entry,
  index,
  isOpen,
  panelId,
  onToggle,
}: FlightRowProps) {
  const shouldReduceMotion = useReducedMotion()

  return (
    <motion.li
      className="border-hairline border-b"
      initial={{
        opacity: shouldReduceMotion ? 1 : 0.9,
        y: shouldReduceMotion ? 0 : 6,
      }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-40px' }}
      transition={{
        duration: shouldReduceMotion ? 0 : PANEL_DURATION,
        delay: shouldReduceMotion ? 0 : index * 0.05,
        ease: EASE,
      }}
    >
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className={`${ROW_GRID} hover:bg-surface w-full cursor-pointer py-6 text-left transition-colors duration-[180ms]`}
      >
        <span className="text-ink font-mono text-sm tracking-[0.12em]">
          {entry.flightNo}
        </span>
        <span className="text-ink font-mono text-sm">{entry.year}</span>
        <span className="text-ink">{entry.project}</span>
        <span>
          <DestinationChip code={entry.destination} />
        </span>
        <span className="hidden lg:block">
          <RouteArrow />
        </span>
        <span className="text-right">
          <StatusCell status={entry.status} />
        </span>
        <ToggleArrow isOpen={isOpen} />
      </button>

      <DetailPanel entry={entry} isOpen={isOpen} panelId={panelId} />
    </motion.li>
  )
}

function FlightCard({ entry, isOpen, panelId, onToggle }: FlightRowProps) {
  return (
    <li className="border-hairline border-b">
      <button
        type="button"
        onClick={onToggle}
        aria-expanded={isOpen}
        aria-controls={panelId}
        className="w-full cursor-pointer py-6 text-left"
      >
        <span className="flex items-center justify-between gap-4">
          <span className="text-ink font-mono text-sm tracking-[0.12em]">
            {entry.flightNo}
          </span>
          <span className="flex items-center gap-3">
            <StatusCell status={entry.status} />
            <ToggleArrow isOpen={isOpen} />
          </span>
        </span>
        <span className="text-ink mt-2 block">{entry.project}</span>
        <span className="mt-2 flex items-center gap-4">
          <span className="text-ink-muted font-mono text-sm">{entry.year}</span>
          <DestinationChip code={entry.destination} />
          <span className="text-ink-muted text-sm">
            {entry.destinationLabel}
          </span>
        </span>
      </button>

      <DetailPanel entry={entry} isOpen={isOpen} panelId={panelId} />
    </li>
  )
}

export function FlightLog() {
  const [openFlights, setOpenFlights] = useState<ReadonlyArray<string>>([])

  const toggleFlight = (flightNo: string) => {
    setOpenFlights((current) =>
      current.includes(flightNo)
        ? current.filter((item) => item !== flightNo)
        : [...current, flightNo]
    )
  }

  return (
    <div>
      <div className="flex flex-wrap items-baseline gap-x-6 gap-y-2">
        <h2 className="text-ink font-display flex items-center gap-4 text-[clamp(1.75rem,3.4vw,2.5rem)] font-semibold tracking-tight">
          <PlaneMark className="text-navy size-6 shrink-0 translate-y-[2px]" />
          FLIGHT LOG
        </h2>
        <p className="text-ink-muted text-sm">
          プロジェクトフライトログ(行を選ぶと詳細が開きます)
        </p>
        <p className="label-mono text-ink-muted ml-auto hidden md:block">
          {ENTRIES.length} FLIGHTS
        </p>
      </div>

      <div className="border-hairline mt-8 hidden border-t md:block">
        <div
          className={`${ROW_GRID} border-hairline text-ink-muted border-b py-4`}
        >
          <span className="label-mono">FLIGHT NO.</span>
          <span className="label-mono">YEAR</span>
          <span className="label-mono">PROJECT</span>
          <span className="label-mono">DESTINATION</span>
          <span className="hidden lg:block">
            <span className="sr-only">路線</span>
          </span>
          <span className="label-mono text-right">STATUS</span>
          <span />
        </div>

        <ul>
          {ENTRIES.map((entry, index) => (
            <FlightRow
              key={entry.flightNo}
              entry={entry}
              index={index}
              isOpen={openFlights.includes(entry.flightNo)}
              panelId={`flight-detail-row-${entry.flightNo}`}
              onToggle={() => toggleFlight(entry.flightNo)}
            />
          ))}
        </ul>
      </div>

      <ul className="border-hairline mt-6 border-t md:hidden">
        {ENTRIES.map((entry, index) => (
          <FlightCard
            key={entry.flightNo}
            entry={entry}
            index={index}
            isOpen={openFlights.includes(entry.flightNo)}
            panelId={`flight-detail-card-${entry.flightNo}`}
            onToggle={() => toggleFlight(entry.flightNo)}
          />
        ))}
      </ul>
    </div>
  )
}
