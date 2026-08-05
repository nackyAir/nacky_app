import {
  DESTINATION_LABELS,
  type DestinationCode,
} from '~/features/Home/destination'
import type { TimeLineItem } from '~/features/Home/ProjectTimeLIne/type'

import type { FlightLogEntry, FlightStatus } from './type'

export const FALLBACK_DESTINATION: DestinationCode = 'GEN'

const UNKNOWN_YEAR = '----'

const DESTINATION_KEYWORDS: ReadonlyArray<{
  code: DestinationCode
  keywords: ReadonlyArray<string>
}> = [
  { code: 'LAW', keywords: ['法律', '法務', '弁護士', '債務'] },
  { code: 'ACC', keywords: ['会計', '税理', '経理', '決済', '請求'] },
  { code: 'EST', keywords: ['住宅', '不動産', '建築', '工務'] },
  {
    code: 'CAR',
    keywords: ['キャリア', '転職', '採用', '人材', '勤怠', '労務'],
  },
  { code: 'LIV', keywords: ['配信', 'ライブ', 'ストリーミング'] },
]

function inferDestination(title: string): DestinationCode {
  const matched = DESTINATION_KEYWORDS.find(({ keywords }) =>
    keywords.some((keyword) => title.includes(keyword))
  )

  return matched?.code ?? FALLBACK_DESTINATION
}

function resolveDestination(project: TimeLineItem): DestinationCode {
  return project.destination ?? inferDestination(project.title)
}

function resolveStartKey(period: string): string {
  return period.split('-')[0]?.trim() ?? ''
}

function resolveYear(period: string): string {
  return resolveStartKey(period).match(/\d{4}/)?.[0] ?? UNKNOWN_YEAR
}

function resolveStatus(period: string): FlightStatus {
  return period.includes('現在') ? 'active' : 'completed'
}

function compareByStartDescending(a: TimeLineItem, b: TimeLineItem): number {
  return resolveStartKey(b.period).localeCompare(resolveStartKey(a.period))
}

export function toFlightLog(
  projects: ReadonlyArray<TimeLineItem>
): Array<FlightLogEntry> {
  return [...projects].sort(compareByStartDescending).map((project, index) => {
    const destination = resolveDestination(project)

    return {
      flightNo: `FL-${String(index + 1).padStart(3, '0')}`,
      year: resolveYear(project.period),
      project: project.title,
      destination,
      destinationLabel: DESTINATION_LABELS[destination],
      status: resolveStatus(project.period),
      url: project.url,
    }
  })
}
