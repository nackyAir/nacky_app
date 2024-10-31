import React from 'react'

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
    <header className="z-40 w-full border-b bg-white">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center lg:h-20">
          <a
            href="/home"
            className="text-xl font-bold text-gray-900 lg:text-2xl"
          >
            Logo
          </a>

          <nav className="mx-8 hidden items-center space-x-8 lg:flex">
            {menuItems.map((item) => (
              <a
                key={item.name}
                href={item.href}
                className="text-gray-600 transition-colors duration-200 hover:text-gray-900"
              >
                {item.name}
              </a>
            ))}
            <Button>ログイン</Button>
          </nav>

          <Sheet>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-6 w-6" />
              </Button>
            </SheetTrigger>
            <SheetContent>
              <nav className="mt-8 flex flex-col space-y-4">
                {menuItems.map((item) => (
                  <a
                    key={item.name}
                    href={item.href}
                    className="px-4 py-2 text-gray-600 transition-colors duration-200 hover:text-gray-900"
                  >
                    {item.name}
                  </a>
                ))}
                <Button className="w-full">ログイン</Button>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}

export default Header
