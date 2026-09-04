import { describe, expect, it } from 'vitest'

import {
  createResumeToken,
  decodeResumeToken,
  encodeResumeToken,
  isResumeFileId,
  verifyResumeToken,
} from '~/lib/resume/token'
import type { ResumeFileId } from '~/lib/resume/token.types'

const SECRET = 'test-signing-secret'
const CREATED_AT = new Date('2026-07-13T00:00:00.000Z')
const EXPIRES_AT = new Date('2026-07-13T00:05:00.000Z')
const ENCODE_CASES: { name: string; ids: ResumeFileId[] }[] = [
  { name: 'one file', ids: ['rirekisho-pdf'] },
  {
    name: 'multiple files',
    ids: ['rirekisho-pdf', 'shokumu-keirekisho-pdf'],
  },
]

describe('resume token', () => {
  it.each(ENCODE_CASES)('encodes, decodes, and verifies a token for $name', ({
    ids,
  }) => {
    const token = createResumeToken({ ids, expiresAt: EXPIRES_AT }, SECRET)
    const decodedToken = decodeResumeToken(encodeResumeToken(token))

    expect(decodedToken).not.toBeNull()

    if (!decodedToken) {
      return
    }

    expect(verifyResumeToken(decodedToken, SECRET, CREATED_AT)).toEqual({
      ok: true,
      ids,
    })
  })

  it('rejects an encoded token without a separator', () => {
    expect(decodeResumeToken('invalid')).toBeNull()
  })

  it('rejects an encoded token with an invalid base64url payload', () => {
    expect(decodeResumeToken('invalid+payload.signature')).toBeNull()
  })

  it('rejects an encoded token whose decoded payload has no separator', () => {
    const payload = Buffer.from('invalid').toString('base64url')

    expect(decodeResumeToken(`${payload}.signature`)).toBeNull()
  })

  it('fails verification when an encoded token payload is tampered with', () => {
    const token = createResumeToken(
      { ids: ['rirekisho-pdf'], expiresAt: EXPIRES_AT },
      SECRET
    )
    const encodedToken = encodeResumeToken(token)
    const separatorIndex = encodedToken.indexOf('.')
    const tamperedPayload = Buffer.from(
      `shokumu-keirekisho-pdf:${token.exp}`
    ).toString('base64url')
    const decodedToken = decodeResumeToken(
      `${tamperedPayload}${encodedToken.slice(separatorIndex)}`
    )

    expect(decodedToken).not.toBeNull()

    if (!decodedToken) {
      return
    }

    expect(verifyResumeToken(decodedToken, SECRET, CREATED_AT)).toEqual({
      ok: false,
      reason: 'invalid',
    })
  })

  it('fails verification when an encoded token signature is tampered with', () => {
    const token = createResumeToken(
      { ids: ['rirekisho-pdf'], expiresAt: EXPIRES_AT },
      SECRET
    )
    const encodedToken = encodeResumeToken(token)
    const separatorIndex = encodedToken.indexOf('.')
    const decodedToken = decodeResumeToken(
      `${encodedToken.slice(0, separatorIndex + 1)}tampered`
    )

    expect(decodedToken).not.toBeNull()

    if (!decodedToken) {
      return
    }

    expect(verifyResumeToken(decodedToken, SECRET, CREATED_AT)).toEqual({
      ok: false,
      reason: 'invalid',
    })
  })

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

  it('creates and verifies a token for a My Number card', () => {
    const token = createResumeToken(
      { ids: ['mynumber-pdf'], expiresAt: EXPIRES_AT },
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
    ).toEqual({ ok: true, ids: ['mynumber-pdf'] })
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

  it('normalizes a My Number card mixed with a resume file', () => {
    const token = createResumeToken(
      {
        ids: ['rirekisho-pdf', 'mynumber-pdf', 'mynumber-pdf'],
        expiresAt: EXPIRES_AT,
      },
      SECRET
    )

    expect(token.ids).toEqual(['mynumber-pdf', 'rirekisho-pdf'])
    expect(
      verifyResumeToken(
        {
          ids: ['rirekisho-pdf', 'mynumber-pdf'],
          exp: String(token.exp),
          sig: token.sig,
        },
        SECRET,
        CREATED_AT
      )
    ).toEqual({ ok: true, ids: ['mynumber-pdf', 'rirekisho-pdf'] })
  })

  it('recognizes the My Number card file ID', () => {
    expect(isResumeFileId('mynumber-pdf')).toBe(true)
  })

  it('recognizes skill sheet and Word career history file IDs', () => {
    expect(isResumeFileId('skill-sheet-pdf')).toBe(true)
    expect(isResumeFileId('skill-sheet-xlsx')).toBe(true)
    expect(isResumeFileId('shokumu-keirekisho-docx')).toBe(true)
  })

  it('rejects the retired Excel career history file ID', () => {
    expect(isResumeFileId('shokumu-keirekisho-xlsx')).toBe(false)
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
