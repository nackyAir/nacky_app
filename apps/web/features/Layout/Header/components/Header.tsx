'use client'

import { useState } from 'react'

import Link from 'next/link'

import { Button } from '@repo/ui/components/button'
import { Sheet, SheetContent, SheetTrigger } from '@repo/ui/components/sheet'
import { Menu, X } from '@repo/ui/icon/lucide'

const Header = () => {
  const [isFullscreenOpen, setIsFullscreenOpen] = useState(false)

  const menuItems = [
    { name: 'ホーム', href: '/' },
    { name: '製品', href: '/products' },
    { name: 'サービス', href: '/services' },
    { name: '会社概要', href: '/about' },
    { name: 'お問い合わせ', href: '/contact' },
  ]

  const toggleFullscreen = () => {
    setIsFullscreenOpen(!isFullscreenOpen)
    // スクロール制御
    document.body.style.overflow = !isFullscreenOpen ? 'hidden' : 'auto'
  }

  const FullscreenNav = () => (
    <div
      className={`fixed inset-0 z-50 bg-black/95 transition-opacity duration-300 ${
        isFullscreenOpen ? 'opacity-100' : 'pointer-events-none opacity-0'
      }`}
    >
      <div className="container mx-auto flex h-full flex-col px-4">
        <div className="flex justify-end pt-6">
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleFullscreen}
            className="text-white hover:text-gray-300"
          >
            <X className="h-8 w-8" />
          </Button>
        </div>
        <nav className="flex flex-1 items-center justify-center">
          <ul className="space-y-8">
            {menuItems.map((item) => (
              <li key={item.name} className="text-center">
                <a
                  href={item.href}
                  className="text-4xl text-white transition-colors duration-200 hover:text-gray-300"
                  onClick={toggleFullscreen}
                >
                  {item.name}
                </a>
              </li>
            ))}
          </ul>
        </nav>
      </div>
    </div>
  )

  return (
    <>
      <header className="sticky top-0 z-40 w-full border-b bg-white">
        <div className="container mx-auto px-4">
          <div className="flex h-16 items-center justify-between lg:h-20">
            <div className="flex items-center">
              <Link
                href="/"
                className="text-xl font-bold text-gray-900 lg:text-2xl"
              >
                Logo
              </Link>
            </div>

            <nav className="hidden items-center space-x-8 lg:flex">
              {menuItems.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className="text-gray-600 transition-colors duration-200 hover:text-gray-900"
                >
                  {item.name}
                </Link>
              ))}
              <Button>ログイン</Button>
            </nav>

            {/* Tablet Navigation (Medium screens) */}
            <div className="hidden md:block lg:hidden">
              <Button variant="ghost" size="icon" onClick={toggleFullscreen}>
                <Menu className="h-6 w-6" />
              </Button>
            </div>

            <div>
              <Sheet>
                <SheetTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <Menu className="h-6 w-6" />
                  </Button>
                </SheetTrigger>
                <SheetContent>
                  <nav className="mt-8 flex flex-col space-y-4">
                    {menuItems.map((item) => (
                      <Link
                        key={item.name}
                        href={item.href}
                        className="px-4 py-2 text-gray-600 transition-colors duration-200 hover:text-gray-900"
                      >
                        {item.name}
                      </Link>
                    ))}
                    <Button className="w-full">ログイン</Button>
                  </nav>
                </SheetContent>
              </Sheet>
            </div>
          </div>
        </div>
      </header>
      <FullscreenNav />
    </>
  )
}

export default Header
