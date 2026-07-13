import { describe, expect, it } from 'vitest'

import { createResumeToken, verifyResumeToken } from '~/lib/resume/token'

const SECRET = 'test-signing-secret'
const CREATED_AT = new Date('2026-07-13T00:00:00.000Z')
const EXPIRES_AT = new Date('2026-07-13T00:05:00.000Z')

describe('resume token', () => {
  it('creates and verifies a token for one file', () => {
    const token = createResumeToken(
      { ids: ['rirekisho-pdf'], expiresAt: EXPIRES_AT },
      SECRET
    )

    expect(
      verifyResumeToken(
        {
          ids: token.ids,
          exp: String(token.exp),
          sig: token.sig,
        },
        SECRET,
        CREATED_AT
      )
    ).toEqual({ ok: true, ids: ['rirekisho-pdf'] })
  })

  it('creates and verifies a token for multiple files', () => {
    const token = createResumeToken(
      {
        ids: ['rirekisho-xlsx', 'shokumu-keirekisho-pdf'],
        expiresAt: EXPIRES_AT,
      },
      SECRET
    )

    expect(
      verifyResumeToken(
        {
          ids: token.ids,
          exp: String(token.exp),
          sig: token.sig,
        },
        SECRET,
        CREATED_AT
      )
    ).toEqual({
      ok: true,
      ids: ['rirekisho-xlsx', 'shokumu-keirekisho-pdf'],
    })
  })

  it('uses the same signature regardless of order or duplicates', () => {
    const first = createResumeToken(
      {
        ids: ['shokumu-keirekisho-pdf', 'rirekisho-pdf', 'rirekisho-pdf'],
        expiresAt: EXPIRES_AT,
      },
      SECRET
    )
    const second = createResumeToken(
      {
        ids: ['rirekisho-pdf', 'shokumu-keirekisho-pdf'],
        expiresAt: EXPIRES_AT,
      },
      SECRET
    )

    expect(first.sig).toBe(second.sig)
    expect(first.ids).toEqual(['rirekisho-pdf', 'shokumu-keirekisho-pdf'])
    expect(
      verifyResumeToken(
        {
          ids: ['shokumu-keirekisho-pdf', 'rirekisho-pdf'],
          exp: String(first.exp),
          sig: first.sig,
        },
        SECRET,
        CREATED_AT
      )
    ).toEqual({
      ok: true,
      ids: ['rirekisho-pdf', 'shokumu-keirekisho-pdf'],
    })
  })

  it('rejects an empty file list', () => {
    const token = createResumeToken(
      { ids: ['rirekisho-pdf'], expiresAt: EXPIRES_AT },
      SECRET
    )

    expect(
      verifyResumeToken(
        { ids: [], exp: String(token.exp), sig: token.sig },
        SECRET,
        CREATED_AT
      )
    ).toEqual({ ok: false, reason: 'invalid' })
  })

  it('rejects a list containing an invalid file ID', () => {
    const token = createResumeToken(
      { ids: ['rirekisho-pdf'], expiresAt: EXPIRES_AT },
      SECRET
    )

    expect(
      verifyResumeToken(
        {
          ids: ['rirekisho-pdf', 'invalid-file'],
          exp: String(token.exp),
          sig: token.sig,
        },
        SECRET,
        CREATED_AT
      )
    ).toEqual({ ok: false, reason: 'invalid' })
  })

  it('rejects an expired token', () => {
    const token = createResumeToken(
      { ids: ['rirekisho-pdf'], expiresAt: EXPIRES_AT },
      SECRET
    )

    expect(
      verifyResumeToken(
        {
          ids: token.ids,
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
      ids: ['rirekisho-pdf'],
      signature: 'tampered',
      secret: SECRET,
    },
    {
      name: 'file list',
      ids: ['shokumu-keirekisho-pdf'],
      signature: undefined,
      secret: SECRET,
    },
    {
      name: 'secret',
      ids: ['rirekisho-pdf'],
      signature: undefined,
      secret: 'different-secret',
    },
  ])('rejects a token with a tampered $name', ({ ids, signature, secret }) => {
    const token = createResumeToken(
      { ids: ['rirekisho-pdf'], expiresAt: EXPIRES_AT },
      SECRET
    )

    expect(
      verifyResumeToken(
        {
          ids,
          exp: String(token.exp),
          sig: signature ?? token.sig,
        },
        secret,
        CREATED_AT
      )
    ).toEqual({ ok: false, reason: 'invalid' })
  })
})
