'use server'

import { cookies } from 'next/headers'
import type { z } from 'zod'

import { schema } from '~/actions/resume/adminLogin/schema'
import { createSafeAction } from '~/lib/create-safe-action'
import { ADMIN_SESSION_COOKIE_NAME } from '~/lib/resume/admin-session'
import { getRequiredResumeEnv } from '~/lib/resume/env'
import { verifyPassword } from '~/lib/resume/password'
import { createAdminSessionToken } from '~/lib/resume/token'

export async function handler(input: z.infer<typeof schema>) {
  const expectedPassword = getRequiredResumeEnv('RESUME_ADMIN_PASSWORD')

  if (!verifyPassword(input.password, expectedPassword)) {
    return { error: 'パスワードが違います' }
  }

  const expiresAt = new Date(Date.now() + 24 * 60 * 60 * 1000)
  const secret = getRequiredResumeEnv('RESUME_SIGNING_SECRET')
  const token = createAdminSessionToken(expiresAt, secret)
  const cookieStore = await cookies()

  cookieStore.set(ADMIN_SESSION_COOKIE_NAME, token, {
    httpOnly: true,
    secure: true,
    sameSite: 'lax',
    path: '/admin/resume',
    expires: expiresAt,
  })

  return { data: { success: true } }
}

export const adminLogin = createSafeAction('adminLogin', schema, handler)
