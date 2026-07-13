'use server'

import type { z } from 'zod'

import { schema } from '~/actions/resume/requestDownloadUrl/schema'
import { createSafeAction } from '~/lib/create-safe-action'
import { getRequiredResumeEnv } from '~/lib/resume/env'
import { verifyPassword } from '~/lib/resume/password'
import { createResumeToken } from '~/lib/resume/token'

export async function handler(input: z.infer<typeof schema>) {
  const expectedPassword = getRequiredResumeEnv('RESUME_PASSWORD')

  if (!verifyPassword(input.password, expectedPassword)) {
    return { error: 'パスワードが違います' }
  }

  const secret = getRequiredResumeEnv('RESUME_SIGNING_SECRET')
  const expiresAt = new Date(Date.now() + 5 * 60 * 1000)
  const token = createResumeToken({ id: input.id, expiresAt }, secret)
  const searchParams = new URLSearchParams({
    id: token.id,
    exp: String(token.exp),
    sig: token.sig,
  })

  return { data: { url: `/api/resume/download?${searchParams}` } }
}

export const requestDownloadUrl = createSafeAction(
  'requestDownloadUrl',
  schema,
  handler
)
