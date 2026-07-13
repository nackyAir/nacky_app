import type { Metadata } from 'next'

import { DownloadForm } from '~/features/Resume/DownloadForm'

export const metadata: Metadata = {
  title: 'Resume Download',
  robots: { index: false, follow: false },
}

export default function ResumePage() {
  return (
    <div className="flex min-h-[calc(100vh-4rem)] items-center justify-center bg-background px-6 py-20 text-foreground">
      <DownloadForm />
    </div>
  )
}
