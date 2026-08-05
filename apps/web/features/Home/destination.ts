export const DESTINATION_CODES = [
  'LAW',
  'ACC',
  'EST',
  'CAR',
  'LIV',
  'GEN',
] as const

export type DestinationCode = (typeof DESTINATION_CODES)[number]

export const DESTINATION_LABELS: Record<DestinationCode, string> = {
  LAW: '法律',
  ACC: '会計',
  EST: '住宅',
  CAR: 'キャリア',
  LIV: '配信',
  GEN: 'その他',
}
