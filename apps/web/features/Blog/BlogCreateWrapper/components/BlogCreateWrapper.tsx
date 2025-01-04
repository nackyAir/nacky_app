import { Suspense } from 'react'

import { FormContents } from '~/features/Blog/BlogCreateForm/components/formContents'
import { LoadingScreen } from '~/features/Layout'

export const BlogCreateWrapper = () => {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <div className="gap-4 p-20">
        <h1 className="text-2xl font-bold">Create a new blog post</h1>
        <FormContents />
      </div>
    </Suspense>
  )
}
