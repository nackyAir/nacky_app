import { Suspense } from 'react'

import { RichTextEditor } from '@repo/ui/components/RichTextEditor'
import { Form } from '@repo/ui/components/form'

import { BlogCreateWrapper } from '~/features/Blog/BlogCreateWrapper'
import { LoadingScreen } from '~/features/Layout'

export default function Page() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <BlogCreateWrapper />
    </Suspense>
  )
}
