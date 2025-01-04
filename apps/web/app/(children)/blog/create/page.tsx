import { Suspense } from 'react'

import { BlogCreateWrapper } from '~/features/Blog/BlogCreateWrapper'
import { LoadingScreen } from '~/features/Layout'

export default function Page() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <BlogCreateWrapper />
    </Suspense>
  )
}
