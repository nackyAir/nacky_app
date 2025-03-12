import { Suspense } from 'react'

import { LoadingScreen } from '~/features/Layout'

export default function Page() {
  return (
    <Suspense fallback={<LoadingScreen />}>
      <div className="min-w-screen flex flex-col">
        <h1>Blog</h1>
      </div>
    </Suspense>
  )
}
