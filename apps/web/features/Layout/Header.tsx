import React from 'react'

import Link from 'next/link'

import { Button } from '@repo/ui/components/button'

import { siteConfig } from '~/config/siteConfig'

const Header = () => {
  return (
    <header className="bg-background/80 fixed left-0 right-0 top-0 z-40 flex w-full border-b border-gray-200 backdrop-blur-sm">
      <div className="container mx-auto">
        <div className="flex h-16 items-center justify-center lg:justify-between">
          <div className="flex items-center">
            <Link href="/home" className="text-xl font-bold">
              Naoki Hayashida
            </Link>
          </div>

          <div className="hidden items-center gap-2 lg:flex">
            {siteConfig.map((item) => (
              <Button variant="ghost" asChild>
                <a href={item.url} target="_blank">
                  {item.icon}
                </a>
              </Button>
            ))}
          </div>
        </div>
      </div>
    </header>
  )
}

export default Header
