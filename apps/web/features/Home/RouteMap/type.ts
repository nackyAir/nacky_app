export type RouteNode = {
  code: string
  label: string
  cx: number
  cy: number
  dot: { x: number; y: number }
  text: { x: number; y: number; anchor: 'start' | 'middle' | 'end' }
  route: string
}
