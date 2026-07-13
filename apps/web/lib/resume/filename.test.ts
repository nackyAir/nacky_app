import { describe, expect, it } from 'vitest'

import {
  buildBundleFilename,
  buildResumeFilename,
  formatResumeTimestamp,
} from '~/lib/resume/filename'
import type { ResumeFileId } from '~/lib/resume/token.types'

const DOWNLOAD_AT = new Date('2026-07-13T07:39:05.000Z')

describe('resume filename', () => {
  it('formats a timestamp in Asia/Tokyo', () => {
    expect(formatResumeTimestamp(DOWNLOAD_AT)).toBe('2026_07_13_16-39-05')
  })

  it.each<[ResumeFileId, string]>([
    ['rirekisho-pdf', '林田直樹_履歴書_2026_07_13_16-39-05.pdf'],
    ['rirekisho-xlsx', '林田直樹_履歴書_2026_07_13_16-39-05.xlsx'],
    ['shokumu-keirekisho-pdf', '林田直樹_職務経歴書_2026_07_13_16-39-05.pdf'],
    ['shokumu-keirekisho-xlsx', '林田直樹_職務経歴書_2026_07_13_16-39-05.xlsx'],
  ])('builds the filename for %s', (id, expected) => {
    expect(buildResumeFilename(id, DOWNLOAD_AT)).toBe(expected)
  })

  it('builds the bundle filename', () => {
    expect(buildBundleFilename(DOWNLOAD_AT)).toBe(
      '林田直樹_2026_07_13_16-39-05.zip'
    )
  })
})
