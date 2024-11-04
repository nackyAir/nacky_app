import React, { Suspense } from 'react'

import Header from '~/features/Layout/Header'
import { ScrollProgress } from '~/features/Layout/ScrollProgress'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-w-screen flex flex-col">
      <ScrollProgress />

      <Suspense fallback={null}>
        <Header />
      </Suspense>

      <main className="flex-1">{children}</main>
    </div>
  )
}
