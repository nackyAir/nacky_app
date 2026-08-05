'use server'

import { headers } from 'next/headers'
import type { z } from 'zod'

import { schema } from '~/actions/resume/issueDownloadUrl/schema'
import { createSafeAction } from '~/lib/create-safe-action'
import { hasValidAdminSession } from '~/lib/resume/admin-session'
import { getRequiredResumeEnv } from '~/lib/resume/env'
import { createResumeToken, encodeResumeToken } from '~/lib/resume/token'

function getRequestOrigin(headerStore: Headers) {
  const host = headerStore.get('host')
  const forwardedProto = headerStore
    .get('x-forwarded-proto')
    ?.split(',')[0]
    ?.trim()
  const protocol = forwardedProto === 'http' ? 'http' : 'https'

  if (!host) {
    throw new Error('Resume URL issue error: host header is not set')
  }

  return `${protocol}://${host}`
}

export async function handler(input: z.infer<typeof schema>) {
  const now = new Date()

  if (!(await hasValidAdminSession(now))) {
    return { error: '認証が必要です' }
  }

  const expiresAt = new Date(
    now.getTime() + Number(input.expiresInDays) * 24 * 60 * 60 * 1000
  )
  const secret = getRequiredResumeEnv('RESUME_SIGNING_SECRET')
  const token = createResumeToken({ ids: input.ids, expiresAt }, secret)
  const searchParams = new URLSearchParams({ t: encodeResumeToken(token) })
  const headerStore = await headers()
  const origin = getRequestOrigin(headerStore)

  return {
    data: {
      url: `${origin}/api/resume/download?${searchParams}`,
      expiresAt: expiresAt.toISOString(),
    },
  }
}

export const issueDownloadUrl = createSafeAction(
  'issueDownloadUrl',
  schema,
  handler
)
