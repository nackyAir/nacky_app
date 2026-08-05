'use client'

import { Menu, X } from '@repo/ui/icons/lucide'
import { motion, useReducedMotion } from 'framer-motion'
import type React from 'react'
import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

import { siteConfig } from '~/config/siteConfig'

import { AVAILABILITY_LABEL, NAV_ITEMS, OWNER_ROLE } from '../navigation'

interface MobileMenuProps {
  isOpen: boolean
  onToggle: () => void
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onToggle }) => {
  const [mounted, setMounted] = useState(false)
  const shouldReduceMotion = useReducedMotion()

  useEffect(() => {
    setMounted(true)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : 'unset'
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <>
      <button
        type="button"
        className="border-hairline text-ink hover:border-navy flex size-10 items-center justify-center rounded-flat border transition-colors lg:hidden"
        onClick={onToggle}
        aria-label={isOpen ? 'メニューを閉じる' : 'メニューを開く'}
        aria-expanded={isOpen}
      >
        {isOpen ? <X className="size-5" /> : <Menu className="size-5" />}
      </button>

      {mounted &&
        createPortal(
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: isOpen ? 1 : 0 }}
              transition={{ duration: shouldReduceMotion ? 0 : 0.18 }}
              className={`bg-ink/30 fixed inset-0 z-[9998] backdrop-blur-sm lg:hidden ${
                isOpen ? 'pointer-events-auto' : 'pointer-events-none'
              }`}
              onClick={onToggle}
            />

            <motion.div
              initial={{ y: '-100%' }}
              animate={{ y: isOpen ? 0 : '-100%' }}
              transition={{
                duration: shouldReduceMotion ? 0 : 0.42,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="border-hairline bg-canvas fixed inset-x-0 top-0 z-[9999] border-b lg:hidden"
            >
              <div className="gutter flex h-16 items-center justify-between">
                <span className="label-mono text-ink-muted">MENU</span>
                <button
                  type="button"
                  className="border-hairline text-ink flex size-10 items-center justify-center rounded-flat border"
                  onClick={onToggle}
                  aria-label="メニューを閉じる"
                >
                  <X className="size-5" />
                </button>
              </div>

              <nav className="gutter pb-8" aria-label="モバイルナビゲーション">
                <ul className="border-hairline border-t">
                  {NAV_ITEMS.map((item) => (
                    <li key={item.href} className="border-hairline border-b">
                      <a
                        href={item.href}
                        onClick={onToggle}
                        className="text-ink hover:text-navy flex items-baseline gap-4 py-4 transition-colors"
                      >
                        <span className="label-mono">{item.label}</span>
                      </a>
                    </li>
                  ))}
                </ul>

                <div className="mt-6 flex items-center justify-between">
                  <p className="flex items-center gap-2">
                    <span className="bg-status-online size-1.5 rounded-full" />
                    <span className="text-ink text-xs font-bold">
                      {AVAILABILITY_LABEL}
                    </span>
                  </p>
                  <div className="flex items-center gap-4">
                    {siteConfig.map((item) => (
                      <a
                        key={item.url}
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={item.value}
                        className="text-ink-muted hover:text-navy transition-colors"
                      >
                        {item.icon}
                      </a>
                    ))}
                  </div>
                </div>

                <p className="text-ink-muted mt-4 text-xs">{OWNER_ROLE}</p>
              </nav>
            </motion.div>
          </>,
          document.body
        )}
    </>
  )
}
