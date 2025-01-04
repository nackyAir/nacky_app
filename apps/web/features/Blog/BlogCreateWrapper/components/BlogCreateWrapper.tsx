import { Suspense } from 'react'

import { RichTextEditor } from '@repo/ui/components/RichTextEditor'

import { LoadingScreen } from '~/features/Layout'

export const BlogCreateWrapper = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <div className="flex flex-col gap-4 p-4">
        <RichTextEditor />
      </div>
    </Suspense>
  )
}
