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
    value === 'mynumber-pdf' ||
    value === 'rirekisho-pdf' ||
    value === 'rirekisho-xlsx' ||
    value === 'shokumu-keirekisho-pdf' ||
    value === 'shokumu-keirekisho-xlsx'
  )
}

function normalizeResumeFileIds(ids: readonly string[]) {
  if (ids.length === 0) {
    return null
  }

  const normalizedIds = new Set<ResumeFileId>()

  for (const id of ids) {
    if (!isResumeFileId(id)) {
      return null
    }

    normalizedIds.add(id)
  }

  return Array.from(normalizedIds).sort()
}

export function createResumeToken(
  input: { ids: ResumeFileId[]; expiresAt: Date },
  secret: string
): ResumeToken {
  const ids = normalizeResumeFileIds(input.ids)

  if (!ids) {
    throw new Error('At least one resume file is required')
  }

  const exp = Math.floor(input.expiresAt.getTime() / 1000)
  const sig = createSignature(`${ids.join(',')}:${exp}`, secret)

  return { ids, exp, sig }
}

export function encodeResumeToken(token: ResumeToken): string {
  const payload = `${token.ids.join(',')}:${token.exp}`
  const encodedPayload = Buffer.from(payload).toString('base64url')

  return `${encodedPayload}.${token.sig}`
}

export function decodeResumeToken(
  value: string
): { ids: string[]; exp: string; sig: string } | null {
  const parts = value.split('.')

  if (parts.length !== 2) {
    return null
  }

  const [encodedPayload, sig] = parts

  if (
    !encodedPayload ||
    sig === undefined ||
    !/^[A-Za-z0-9_-]+$/.test(encodedPayload)
  ) {
    return null
  }

  try {
    const payloadBuffer = Buffer.from(encodedPayload, 'base64url')

    if (payloadBuffer.toString('base64url') !== encodedPayload) {
      return null
    }

    const payload = payloadBuffer.toString()
    const separatorIndex = payload.lastIndexOf(':')

    if (separatorIndex === -1) {
      return null
    }

    return {
      ids: payload.slice(0, separatorIndex).split(','),
      exp: payload.slice(separatorIndex + 1),
      sig,
    }
  } catch {
    return null
  }
}

export function verifyResumeToken(
  token: { ids: string[]; exp: string; sig: string },
  secret: string,
  now: Date
): VerifyResult {
  const ids = normalizeResumeFileIds(token.ids)

  if (!ids || !/^\d+$/.test(token.exp)) {
    return { ok: false, reason: 'invalid' }
  }

  const exp = Number(token.exp)

  if (!Number.isSafeInteger(exp)) {
    return { ok: false, reason: 'invalid' }
  }

  const expected = createSignature(`${ids.join(',')}:${token.exp}`, secret)

  if (!signaturesMatch(token.sig, expected)) {
    return { ok: false, reason: 'invalid' }
  }

  if (Math.floor(now.getTime() / 1000) > exp) {
    return { ok: false, reason: 'expired' }
  }

  return { ok: true, ids }
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
