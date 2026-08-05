'use client'

import Link from 'next/link'
import { useState } from 'react'

import {
  AVAILABILITY_LABEL,
  NAV_ITEMS,
  OWNER_NAME,
  OWNER_ROLE,
} from '../navigation'
import { MobileMenu } from './MobileMenu'

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  return (
    <header className="border-hairline bg-canvas/90 fixed inset-x-0 top-0 z-50 border-b backdrop-blur-md">
      <div className="gutter mx-auto flex h-16 max-w-[1280px] items-center justify-between lg:h-[72px]">
        <Link href="/home" className="flex items-baseline gap-4">
          <span className="text-ink text-lg font-bold tracking-tight">
            {OWNER_NAME}
          </span>
          <span className="text-ink-muted hidden text-xs sm:block">
            {OWNER_ROLE}
          </span>
        </Link>

        <div className="hidden items-center gap-8 lg:flex">
          <nav aria-label="メインナビゲーション">
            <ul className="flex items-center gap-8">
              {NAV_ITEMS.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="label-mono text-ink-muted hover:text-navy transition-colors duration-[180ms]"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          <p className="flex items-center gap-2">
            <span className="bg-status-online size-1.5 rounded-full" />
            <span className="text-ink text-xs font-bold">
              {AVAILABILITY_LABEL}
            </span>
          </p>
        </div>

        <div className="flex items-center gap-4 lg:hidden">
          <p className="hidden items-center gap-2 sm:flex">
            <span className="bg-status-online size-1.5 rounded-full" />
            <span className="text-ink text-xs font-bold">
              {AVAILABILITY_LABEL}
            </span>
          </p>
          <MobileMenu
            isOpen={isMobileMenuOpen}
            onToggle={() => setIsMobileMenuOpen((open) => !open)}
          />
        </div>
      </div>
    </header>
  )
}
