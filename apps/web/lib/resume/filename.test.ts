import { describe, expect, it } from 'vitest'

import {
  buildBundleFilename,
  buildResumeFilename,
  formatResumeDate,
} from '~/lib/resume/filename'
import type { ResumeFileId } from '~/lib/resume/token.types'

const DOWNLOAD_AT = new Date('2026-07-13T07:39:05.000Z')

describe('resume filename', () => {
  it('formats a date in Asia/Tokyo', () => {
    expect(formatResumeDate(DOWNLOAD_AT)).toBe('2026-07-13')
  })

  it.each<[ResumeFileId, string]>([
    ['rirekisho-pdf', '林田直樹_履歴書.pdf'],
    ['rirekisho-xlsx', '林田直樹_履歴書.xlsx'],
    ['shokumu-keirekisho-pdf', '林田直樹_職務経歴書.pdf'],
    ['shokumu-keirekisho-docx', '林田直樹_職務経歴書.docx'],
    ['skill-sheet-pdf', '林田直樹_スキルシート.pdf'],
    ['skill-sheet-xlsx', '林田直樹_スキルシート.xlsx'],
    ['mynumber-pdf', '林田直樹_本人確認書類.pdf'],
  ])('builds the filename for %s', (id, expected) => {
    expect(buildResumeFilename(id)).toBe(expected)
  })

  it('builds the bundle filename with unique labels and a date', () => {
    expect(
      buildBundleFilename(
        ['skill-sheet-xlsx', 'rirekisho-pdf', 'rirekisho-xlsx'],
        DOWNLOAD_AT
      )
    ).toBe('林田直樹_履歴書_スキルシート_2026-07-13.zip')
  })

  it('keeps bundle labels in resume, career history, skill sheet, ID order', () => {
    expect(
      buildBundleFilename(
        ['mynumber-pdf', 'skill-sheet-pdf', 'shokumu-keirekisho-docx'],
        DOWNLOAD_AT
      )
    ).toBe('林田直樹_職務経歴書_スキルシート_本人確認書類_2026-07-13.zip')
  })
})
