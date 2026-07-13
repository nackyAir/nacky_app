import type { Metadata } from 'next'

import { AdminLoginForm, AdminPanel } from '~/features/Resume/AdminPanel'
import { hasValidAdminSession } from '~/lib/resume/admin-session'

export const metadata: Metadata = {
  title: 'Resume Admin',
  robots: { index: false, follow: false },
}

export default async function AdminResumePage() {
  const isLoggedIn = await hasValidAdminSession(new Date())

  return (
    <div className="flex min-h-screen items-center justify-center bg-background px-6 py-20 text-foreground">
      {isLoggedIn ? <AdminPanel /> : <AdminLoginForm />}
    </div>
  )
}
