import type { ResumeFileId } from '~/lib/resume/token.types'

export const OWNER_NAME = '林田直樹'

const RESUME_FILE_NAMES = {
  'mynumber-pdf': { label: '本人確認書類', extension: 'pdf' },
  'rirekisho-pdf': { label: '履歴書', extension: 'pdf' },
  'rirekisho-xlsx': { label: '履歴書', extension: 'xlsx' },
  'shokumu-keirekisho-pdf': { label: '職務経歴書', extension: 'pdf' },
  'shokumu-keirekisho-docx': { label: '職務経歴書', extension: 'docx' },
  'skill-sheet-pdf': { label: 'スキルシート', extension: 'pdf' },
  'skill-sheet-xlsx': { label: 'スキルシート', extension: 'xlsx' },
} satisfies Record<ResumeFileId, { label: string; extension: string }>

const DOCUMENT_LABEL_ORDER = [
  '履歴書',
  '職務経歴書',
  'スキルシート',
  '本人確認書類',
] as const

type TimestampPart = 'year' | 'month' | 'day'

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

export function formatResumeDate(date: Date) {
  const parts = new Intl.DateTimeFormat('ja-JP', {
    timeZone: 'Asia/Tokyo',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).formatToParts(date)
  const year = getTimestampPart(parts, 'year')
  const month = getTimestampPart(parts, 'month')
  const day = getTimestampPart(parts, 'day')

  return `${year}-${month}-${day}`
}

export function buildResumeFilename(id: ResumeFileId) {
  const file = RESUME_FILE_NAMES[id]

  return `${OWNER_NAME}_${file.label}.${file.extension}`
}

export function buildBundleFilename(ids: ResumeFileId[], date: Date) {
  const selectedLabels = new Set(ids.map((id) => RESUME_FILE_NAMES[id].label))
  const labels = DOCUMENT_LABEL_ORDER.filter((label) =>
    selectedLabels.has(label)
  )

  return `${OWNER_NAME}_${labels.join('_')}_${formatResumeDate(date)}.zip`
}
