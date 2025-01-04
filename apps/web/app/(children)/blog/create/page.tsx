import { Suspense } from 'react'

import { RichTextEditor } from '@repo/ui/components/RichTextEditor'

import { LoadingScreen } from '~/features/Layout'

export default function Page() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <div className="min-w-screen flex flex-col py-20">
        <RichTextEditor />
      </div>
    </Suspense>
  )
}
