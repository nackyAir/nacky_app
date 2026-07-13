import { createHash, createHmac, timingSafeEqual } from 'node:crypto'

import type {
  ResumeFileId,
  ResumeToken,
  VerifyResult,
} from '~/lib/resume/token.types'

function createSignature(message: string, secret: string) {
  return createHmac('sha256', secret).update(message).digest('base64url')
}

function signaturesMatch(actual: string, expected: string) {
  const actualBuffer = createHash('sha256').update(actual).digest()
  const expectedBuffer = createHash('sha256').update(expected).digest()

  return timingSafeEqual(actualBuffer, expectedBuffer)
}

export function isResumeFileId(value: string): value is ResumeFileId {
  return (
    value === 'rirekisho-pdf' ||
    value === 'rirekisho-xlsx' ||
    value === 'shokumu-keirekisho-pdf' ||
    value === 'shokumu-keirekisho-xlsx'
  )
}

export function createResumeToken(
  input: { id: ResumeFileId; expiresAt: Date },
  secret: string
): ResumeToken {
  const exp = Math.floor(input.expiresAt.getTime() / 1000)
  const sig = createSignature(`${input.id}:${exp}`, secret)

  return { id: input.id, exp, sig }
}

export function verifyResumeToken(
  token: { id: string; exp: string; sig: string },
  secret: string,
  now: Date
): VerifyResult {
  if (!isResumeFileId(token.id) || !/^\d+$/.test(token.exp)) {
    return { ok: false, reason: 'invalid' }
  }

  const exp = Number(token.exp)

  if (!Number.isSafeInteger(exp)) {
    return { ok: false, reason: 'invalid' }
  }

  const expected = createSignature(`${token.id}:${token.exp}`, secret)

  if (!signaturesMatch(token.sig, expected)) {
    return { ok: false, reason: 'invalid' }
  }

  if (Math.floor(now.getTime() / 1000) > exp) {
    return { ok: false, reason: 'expired' }
  }

  return { ok: true, id: token.id }
}

export function createAdminSessionToken(expiresAt: Date, secret: string) {
  const exp = Math.floor(expiresAt.getTime() / 1000)
  const message = `admin:${exp}`
  const sig = createSignature(message, secret)

  return `${message}:${sig}`
}

export function verifyAdminSessionToken(
  token: string | undefined,
  secret: string,
  now: Date
) {
  if (!token) {
    return false
  }

  const parts = token.split(':')

  if (parts.length !== 3) {
    return false
  }

  const [scope, exp, sig] = parts

  if (scope !== 'admin' || !exp || !sig || !/^\d+$/.test(exp)) {
    return false
  }

  const expiresAt = Number(exp)

  if (!Number.isSafeInteger(expiresAt)) {
    return false
  }

  const expected = createSignature(`admin:${exp}`, secret)

  return (
    signaturesMatch(sig, expected) &&
    Math.floor(now.getTime() / 1000) <= expiresAt
  )
}
