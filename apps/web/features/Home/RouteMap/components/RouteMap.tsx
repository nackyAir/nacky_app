'use client'

import { motion, useAnimationFrame, useReducedMotion } from 'framer-motion'
import { useCallback, useEffect, useRef } from 'react'

import {
  GRID_TICKS,
  HUB,
  MAP_VIEW_BOX,
  NODE_RADIUS,
  PLANE_GLYPH,
  PLANE_ROUTE_CODE,
  ROUTE_NODES,
} from '../config'

const DRAW_EASE = [0.22, 1, 0.36, 1] as const
const PLANE_CYCLE_MS = 16000
const PLANE_RESTING_PROGRESS = 0.62
const PLANE_SCALE = 0.85
const PLANE_TRAVEL_START = 0.18
const PLANE_TRAVEL_END = 0.84

const planeRoute =
  ROUTE_NODES.find((node) => node.code === PLANE_ROUTE_CODE)?.route ?? ''

export function RouteMap() {
  const shouldReduceMotion = useReducedMotion()
  const planeRef = useRef<SVGGElement>(null)
  const trackRef = useRef<SVGPathElement>(null)

  const positionPlane = useCallback((cycleProgress: number) => {
    const track = trackRef.current
    const plane = planeRef.current
    if (!track || !plane) return

    const progress =
      PLANE_TRAVEL_START +
      cycleProgress * (PLANE_TRAVEL_END - PLANE_TRAVEL_START)
    const total = track.getTotalLength()
    const point = track.getPointAtLength(total * progress)
    const ahead = track.getPointAtLength(total * Math.min(progress + 0.02, 1))
    const angle =
      (Math.atan2(ahead.y - point.y, ahead.x - point.x) * 180) / Math.PI

    plane.setAttribute(
      'transform',
      `translate(${point.x} ${point.y}) rotate(${angle}) scale(${PLANE_SCALE})`
    )
  }, [])

  useEffect(() => {
    if (shouldReduceMotion) positionPlane(PLANE_RESTING_PROGRESS)
  }, [shouldReduceMotion, positionPlane])

  useAnimationFrame((elapsed) => {
    if (shouldReduceMotion) return
    positionPlane((elapsed % PLANE_CYCLE_MS) / PLANE_CYCLE_MS)
  })

  return (
    <svg
      viewBox={MAP_VIEW_BOX}
      className="h-auto w-full text-navy"
      role="img"
      aria-labelledby="route-map-title route-map-desc"
    >
      <title id="route-map-title">就航路線図</title>
      <desc id="route-map-desc">
        ハブ AI × FULL-STACK から法律・会計・住宅・キャリア・配信の 5
        業界へ伸びる路線図
      </desc>

      <mask id="route-reveal">
        <g
          fill="none"
          stroke="#fff"
          strokeWidth={8}
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          {ROUTE_NODES.map((node, index) => (
            <motion.path
              key={node.code}
              d={node.route}
              initial={{ pathLength: shouldReduceMotion ? 1 : 0 }}
              animate={{ pathLength: 1 }}
              transition={{
                duration: shouldReduceMotion ? 0 : 1.1,
                delay: shouldReduceMotion ? 0 : 0.25 + index * 0.14,
                ease: DRAW_EASE,
              }}
            />
          ))}
        </g>
      </mask>

      <g stroke="currentColor" strokeWidth={1} opacity={0.28}>
        {GRID_TICKS.map((tick) => (
          <g key={`${tick.x}-${tick.y}`}>
            <line x1={tick.x - 5} y1={tick.y} x2={tick.x + 5} y2={tick.y} />
            <line x1={tick.x} y1={tick.y - 5} x2={tick.x} y2={tick.y + 5} />
          </g>
        ))}
      </g>

      <g mask="url(#route-reveal)">
        {ROUTE_NODES.map((node) => (
          <path
            key={node.code}
            d={node.route}
            fill="none"
            stroke="currentColor"
            strokeWidth={1.25}
            strokeDasharray="2 7"
            strokeLinecap="round"
            opacity={0.75}
          />
        ))}
      </g>

      <path ref={trackRef} d={planeRoute} fill="none" stroke="none" />

      <motion.g
        initial={{ opacity: shouldReduceMotion ? 1 : 0 }}
        animate={{ opacity: 1 }}
        transition={{
          duration: shouldReduceMotion ? 0 : 0.42,
          delay: shouldReduceMotion ? 0 : 1.1,
          ease: DRAW_EASE,
        }}
      >
        <g
          ref={planeRef}
          transform="translate(486 219) rotate(-22) scale(0.85)"
        >
          <path d={PLANE_GLYPH} fill="currentColor" />
        </g>
      </motion.g>

      <circle
        cx={HUB.cx}
        cy={HUB.cy}
        r={HUB.ring}
        fill="none"
        stroke="currentColor"
        strokeWidth={1}
        opacity={0.32}
      />
      <circle
        cx={HUB.cx}
        cy={HUB.cy}
        r={HUB.r}
        fill="var(--surface)"
        stroke="currentColor"
        strokeWidth={1.5}
      />
      <g
        transform={`translate(${HUB.cx} ${HUB.cy - 30}) rotate(-45) scale(0.7)`}
      >
        <path d={PLANE_GLYPH} fill="currentColor" />
      </g>
      <text
        x={HUB.cx}
        y={HUB.cy + 4}
        textAnchor="middle"
        className="fill-ink font-display text-[22px] font-semibold tracking-tight"
      >
        AI ×
      </text>
      <text
        x={HUB.cx}
        y={HUB.cy + 30}
        textAnchor="middle"
        className="fill-ink font-display text-[20px] font-semibold tracking-tight"
      >
        FULL-STACK
      </text>
      <circle
        cx={HUB.cx - 42}
        cy={HUB.cy + 100}
        r={4}
        fill="var(--status-online)"
      />
      <text
        x={HUB.cx - 30}
        y={HUB.cy + 104}
        className="fill-ink-muted font-mono text-[11px] tracking-[0.12em]"
      >
        ONLINE
      </text>

      {ROUTE_NODES.map((node) => (
        <g key={node.code}>
          <circle
            cx={node.cx}
            cy={node.cy}
            r={NODE_RADIUS}
            fill="var(--surface)"
            stroke="currentColor"
            strokeWidth={1.25}
          />
          <text
            x={node.cx}
            y={node.cy + 5}
            textAnchor="middle"
            className="fill-navy font-mono text-[15px] tracking-[0.1em]"
          >
            {node.code}
          </text>
          <circle
            cx={node.dot.x}
            cy={node.dot.y}
            r={3.5}
            fill="var(--status-online)"
          />
          <text
            x={node.text.x}
            y={node.text.y}
            textAnchor={node.text.anchor}
            className="fill-ink text-[14px]"
          >
            {node.label}
          </text>
        </g>
      ))}
    </svg>
  )
}

export function RouteMapCompact() {
  return (
    <div className="border-hairline border-t border-b py-4">
      <p className="label-mono text-ink-muted">HUB / AI × FULL-STACK</p>
      <ul className="mt-2 flex flex-wrap gap-x-6 gap-y-2">
        {ROUTE_NODES.map((node) => (
          <li key={node.code} className="flex items-center gap-1">
            <span className="size-1.5 rounded-full bg-status-online" />
            <span className="label-mono text-navy">{node.code}</span>
            <span className="text-ink-muted text-sm">{node.label}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}
