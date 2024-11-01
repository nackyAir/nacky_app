import React from 'react'

import Link from 'next/link'

import { Button } from '@repo/ui/components/button'
import { Sheet, SheetContent, SheetTrigger } from '@repo/ui/components/sheet'
import { Menu } from '@repo/ui/icon/lucide'

const Header = () => {
  const menuItems = [
    { name: 'ホーム', href: '/home' },
    { name: '製品', href: '/products' },
    { name: 'サービス', href: '/services' },
    { name: '会社概要', href: '/about' },
    { name: 'お問い合わせ', href: '/contact' },
  ]

  return (
    <header className="bg-background/80 fixed left-0 right-0 top-0 z-40 flex w-full border-b border-gray-200 backdrop-blur-sm">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-end lg:justify-between">
          <nav className="mx-8 hidden items-center space-x-8 lg:flex">
            {menuItems.map((item) => (
              <Link
                key={item.name}
                href={item.href}
                className="hover:text-primary text-gray-500 transition-colors duration-200"
              >
                {item.name}
              </Link>
            ))}
          </nav>

          <Button variant="default" className="hidden border-black lg:flex">
            ログイン
          </Button>

          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6 text-gray-700" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <nav className="mt-8 flex flex-col space-y-4">
                {menuItems.map((item) => (
                  <Link
                    key={item.name}
                    href={item.href}
                    className="hover:text-primary px-4 py-2 text-gray-500 transition-colors duration-200"
                  >
                    {item.name}
                  </Link>
                ))}
                <Button variant="default" className="w-full">
                  ログイン
                </Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

export default Header
