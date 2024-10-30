import React, { Suspense } from 'react'

import Header from '~/features/Layout/Header/components/Header'

const Layout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="flex h-[100dvh] overflow-y-hidden">
      <Suspense fallback={null}>
        <Header />
      </Suspense>
      <main className="h-full flex-1 overflow-x-hidden overflow-y-scroll">
        {children}
      </main>
    </div>
  )
}

export default Layout
