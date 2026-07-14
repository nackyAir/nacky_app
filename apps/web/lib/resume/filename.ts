import type { ResumeFileId } from '~/lib/resume/token.types'

export const OWNER_NAME = '林田直樹'

const RESUME_FILE_NAMES = {
  'mynumber-pdf': { label: '本人確認書類', extension: 'pdf' },
  'rirekisho-pdf': { label: '履歴書', extension: 'pdf' },
  'rirekisho-xlsx': { label: '履歴書', extension: 'xlsx' },
  'shokumu-keirekisho-pdf': { label: '職務経歴書', extension: 'pdf' },
  'shokumu-keirekisho-xlsx': { label: '職務経歴書', extension: 'xlsx' },
} satisfies Record<ResumeFileId, { label: string; extension: string }>

type TimestampPart = 'year' | 'month' | 'day' | 'hour' | 'minute' | 'second'

function getTimestampPart(
  parts: Intl.DateTimeFormatPart[],
  type: TimestampPart
) {
  const value = parts.find((part) => part.type === type)?.value

  if (!value) {
    throw new Error(`Missing resume timestamp part: ${type}`)
  }

  return value
}

export function formatResumeTimestamp(date: Date) {
  const parts = new Intl.DateTimeFormat('ja-JP', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hourCycle: 'h23',
  }).formatToParts(date)
  const year = getTimestampPart(parts, 'year')
  const month = getTimestampPart(parts, 'month')
  const day = getTimestampPart(parts, 'day')
  const hour = getTimestampPart(parts, 'hour')
  const minute = getTimestampPart(parts, 'minute')
  const second = getTimestampPart(parts, 'second')

  return `${year}_${month}_${day}_${hour}-${minute}-${second}`
}

export function buildResumeFilename(id: ResumeFileId, date: Date) {
  const file = RESUME_FILE_NAMES[id]

  return `${OWNER_NAME}_${file.label}_${formatResumeTimestamp(date)}.${file.extension}`
}

export function buildBundleFilename(date: Date) {
  return `${OWNER_NAME}_${formatResumeTimestamp(date)}.zip`
}
