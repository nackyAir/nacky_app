'use client'

import { Menu, X } from '@repo/ui/icons/lucide'
import { AnimatePresence, motion } from 'framer-motion'
import Link from 'next/link'
import { useEffect, useState } from 'react'

import { ThemeToggle } from './ThemeToggle'

const NAV_ITEMS = [
  { label: 'Now', href: '/home#now' },
  { label: 'About', href: '/home#about' },
  { label: 'Works', href: '/home#works' },
  { label: '経歴書', href: '/resume' },
]

const EASE = [0.16, 1, 0.3, 1] as const

export const Header = () => {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 80)

    handleScroll()
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = menuOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [menuOpen])

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-colors duration-500 ${
          scrolled
            ? 'border-b border-rule bg-paper/92 backdrop-blur-lg'
            : 'border-b border-transparent'
        }`}
      >
        <div className="mx-auto flex h-16 w-full max-w-6xl items-center justify-between px-6 md:h-18 md:px-10">
          <Link
            href="/home"
            className="font-display text-lg tracking-tight transition-opacity duration-500"
            style={{ opacity: scrolled ? 1 : 0 }}
            aria-hidden={!scrolled}
            tabIndex={scrolled ? 0 : -1}
          >
            林田直樹
          </Link>

          <div className="flex items-center gap-1 md:gap-3">
            <nav className="hidden items-center gap-7 md:flex">
              {NAV_ITEMS.map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="font-mono text-xs uppercase tracking-[0.16em] text-ink-muted transition-colors duration-300 hover:text-ink"
                >
                  {item.label}
                </Link>
              ))}
            </nav>

            <ThemeToggle />

            <Link
              href="/home#contact"
              className="hidden min-h-11 items-center rounded-full bg-ink px-5 text-xs font-medium text-paper transition-transform duration-300 hover:-translate-y-0.5 sm:inline-flex"
            >
              お問い合わせ
            </Link>

            <button
              type="button"
              onClick={() => setMenuOpen(true)}
              aria-label="メニューを開く"
              className="inline-flex size-11 items-center justify-center rounded-full text-ink-muted transition-colors duration-300 hover:bg-paper-raised hover:text-ink md:hidden"
            >
              <Menu className="size-5" />
            </button>
          </div>
        </div>
      </header>

      <AnimatePresence>
        {menuOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.35, ease: EASE }}
            className="fixed inset-0 z-[60] bg-paper md:hidden"
          >
            <div className="flex h-16 items-center justify-end px-6">
              <button
                type="button"
                onClick={() => setMenuOpen(false)}
                aria-label="メニューを閉じる"
                className="inline-flex size-11 items-center justify-center rounded-full text-ink-muted transition-colors hover:text-ink"
              >
                <X className="size-5" />
              </button>
            </div>

            <nav className="px-6 pt-6">
              {NAV_ITEMS.map((item, i) => (
                <motion.div
                  key={item.href}
                  initial={{ opacity: 0, y: 16 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, ease: EASE, delay: 0.06 * i }}
                >
                  <Link
                    href={item.href}
                    onClick={() => setMenuOpen(false)}
                    className="flex min-h-16 items-center border-b border-rule font-display text-2xl tracking-tight"
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}

              <motion.div
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, ease: EASE, delay: 0.3 }}
                className="pt-10"
              >
                <Link
                  href="/home#contact"
                  onClick={() => setMenuOpen(false)}
                  className="inline-flex min-h-12 items-center rounded-full bg-ink px-7 text-sm font-medium text-paper"
                >
                  お問い合わせ
                </Link>
              </motion.div>
            </nav>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
