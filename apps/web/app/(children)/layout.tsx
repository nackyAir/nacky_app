import React, { Suspense } from 'react'

import { Header, ScrollProgress } from '~/features/Layout'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <div className="min-w-screen flex flex-col">
      <ScrollProgress />

      <Suspense fallback={null}>
        <Header />
      </Suspense>

      <main className="my-20 flex-1">{children}</main>
    </div>
  )
}
