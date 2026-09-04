import { describe, expect, it } from 'vitest'

import { schema as issueDownloadUrlSchema } from '~/actions/resume/issueDownloadUrl/schema'
import { schema as requestDownloadUrlSchema } from '~/actions/resume/requestDownloadUrl/schema'

describe('resume download schemas', () => {
  it('allows the admin action to issue a My Number card URL', () => {
    expect(
      issueDownloadUrlSchema.safeParse({
        ids: ['mynumber-pdf'],
        expiresInDays: '1',
      }).success
    ).toBe(true)
  })

  it('prevents the public action from requesting a My Number card URL', () => {
    expect(
      requestDownloadUrlSchema.safeParse({
        password: 'shared-password',
        ids: ['mynumber-pdf'],
      }).success
    ).toBe(false)
  })

  it('allows the public action to request skill sheets and Word career history', () => {
    expect(
      requestDownloadUrlSchema.safeParse({
        password: 'shared-password',
        ids: [
          'skill-sheet-pdf',
          'skill-sheet-xlsx',
          'shokumu-keirekisho-pdf',
          'shokumu-keirekisho-docx',
        ],
      }).success
    ).toBe(true)
  })
})
