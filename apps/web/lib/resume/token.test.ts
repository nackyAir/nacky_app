import { describe, expect, it } from 'vitest'

import { createResumeToken, verifyResumeToken } from '~/lib/resume/token'
import type { ResumeFileId } from '~/lib/resume/token.types'

const SECRET = 'test-signing-secret'
const CREATED_AT = new Date('2026-07-13T00:00:00.000Z')
const EXPIRES_AT = new Date('2026-07-13T00:05:00.000Z')
const FILE_IDS: ResumeFileId[] = [
  'rirekisho-pdf',
  'rirekisho-xlsx',
  'shokumu-keirekisho-pdf',
  'shokumu-keirekisho-xlsx',
]

describe('resume token', () => {
  it.each(
    FILE_IDS
  )('creates a token that verifies with the same file: %s', (id) => {
    const token = createResumeToken({ id, expiresAt: EXPIRES_AT }, SECRET)

    expect(
      verifyResumeToken(
        {
          id: token.id,
          exp: String(token.exp),
          sig: token.sig,
        },
        SECRET,
        CREATED_AT
      )
    ).toEqual({ ok: true, id })
  })

  it('rejects an expired token', () => {
    const token = createResumeToken(
      { id: 'rirekisho-pdf', expiresAt: EXPIRES_AT },
      SECRET
    )

    expect(
      verifyResumeToken(
        {
          id: token.id,
          exp: String(token.exp),
          sig: token.sig,
        },
        SECRET,
        new Date('2026-07-13T00:05:01.000Z')
      )
    ).toEqual({ ok: false, reason: 'expired' })
  })

  it.each([
    {
      name: 'signature',
      id: 'rirekisho-pdf',
      signature: 'tampered',
      secret: SECRET,
    },
    {
      name: 'file',
      id: 'shokumu-keirekisho-pdf',
      signature: undefined,
      secret: SECRET,
    },
    {
      name: 'secret',
      id: 'rirekisho-pdf',
      signature: undefined,
      secret: 'different-secret',
    },
  ])('rejects a token with a tampered $name', ({ id, signature, secret }) => {
    const token = createResumeToken(
      {
        id: 'rirekisho-pdf',
        expiresAt: EXPIRES_AT,
      },
      SECRET
    )

    expect(
      verifyResumeToken(
        {
          id,
          exp: String(token.exp),
          sig: signature ?? token.sig,
        },
        secret,
        CREATED_AT
      )
    ).toEqual({ ok: false, reason: 'invalid' })
  })
})
