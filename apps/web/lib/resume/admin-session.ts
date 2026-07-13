import { cookies } from 'next/headers'

import { getRequiredResumeEnv } from '~/lib/resume/env'
import { verifyAdminSessionToken } from '~/lib/resume/token'

export const ADMIN_SESSION_COOKIE_NAME = 'resume_admin_session'

export async function hasValidAdminSession(now: Date) {
  const cookieStore = await cookies()
  const token = cookieStore.get(ADMIN_SESSION_COOKIE_NAME)?.value
  const secret = getRequiredResumeEnv('RESUME_SIGNING_SECRET')

  return verifyAdminSessionToken(token, secret, now)
}
