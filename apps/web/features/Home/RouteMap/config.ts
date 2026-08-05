import type { RouteNode } from './type'

export const MAP_VIEW_BOX = '0 0 680 560'

export const HUB = { cx: 340, cy: 280, r: 64, ring: 78 } as const

export const NODE_RADIUS = 28

export const ROUTE_NODES: ReadonlyArray<RouteNode> = [
  {
    code: 'LAW',
    label: '法律',
    cx: 340,
    cy: 72,
    dot: { x: 340, y: 114 },
    text: { x: 340, y: 28, anchor: 'middle' },
    route: 'M 340 216 L 340 100',
  },
  {
    code: 'ACC',
    label: '会計',
    cx: 96,
    cy: 168,
    dot: { x: 56, y: 168 },
    text: { x: 42, y: 174, anchor: 'end' },
    route: 'M 282 253 C 240 252, 178 208, 122 180',
  },
  {
    code: 'EST',
    label: '住宅',
    cx: 592,
    cy: 176,
    dot: { x: 632, y: 176 },
    text: { x: 646, y: 182, anchor: 'start' },
    route: 'M 399 256 C 450 246, 510 214, 566 187',
  },
  {
    code: 'CAR',
    label: 'キャリア',
    cx: 152,
    cy: 448,
    dot: { x: 112, y: 448 },
    text: { x: 98, y: 454, anchor: 'end' },
    route: 'M 292 323 C 262 360, 220 398, 173 429',
  },
  {
    code: 'LIV',
    label: '配信',
    cx: 556,
    cy: 464,
    dot: { x: 596, y: 464 },
    text: { x: 610, y: 470, anchor: 'start' },
    route: 'M 389 322 C 430 366, 486 412, 535 446',
  },
]

export const PLANE_ROUTE_CODE = 'EST'

export const PLANE_GLYPH =
  'M 9 0 L 4.5 2.2 L -0.5 2.2 L -5 10 L -7 10 L -5 2.2 L -8 2.2 L -10 4.5 L -11.5 4.5 L -10.5 0 L -11.5 -4.5 L -10 -4.5 L -8 -2.2 L -5 -2.2 L -7 -10 L -5 -10 L -0.5 -2.2 L 4.5 -2.2 Z'

export const GRID_TICKS: ReadonlyArray<{ x: number; y: number }> = [
  { x: 178, y: 92 },
  { x: 494, y: 108 },
  { x: 108, y: 306 },
  { x: 618, y: 314 },
  { x: 262, y: 512 },
  { x: 430, y: 62 },
]
