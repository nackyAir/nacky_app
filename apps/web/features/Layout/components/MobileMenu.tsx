'use client'

import React, { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import * as motion from 'framer-motion/client'
import { Button } from '@repo/ui/components/button'
import { Menu, X, User, Code, Briefcase, Mail, Sparkles, TrendingUp } from '@repo/ui/icons/lucide'
import { siteConfig } from '~/config/siteConfig'

interface MobileMenuProps {
  isOpen: boolean
  onToggle: () => void
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onToggle }) => {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = 'unset'
    }
    return () => {
      document.body.style.overflow = 'unset'
    }
  }, [isOpen])

  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="sm"
        className="relative h-10 w-10 rounded-lg p-0 lg:hidden"
        onClick={onToggle}
        aria-label="メニューを開く"
      >
        <motion.div
          animate={isOpen ? { rotate: 90 } : { rotate: 0 }}
          transition={{ duration: 0.2 }}
        >
          {isOpen ? (
            <X className="h-6 w-6 text-slate-600 dark:text-slate-400" />
          ) : (
            <Menu className="h-6 w-6 text-slate-600 dark:text-slate-400" />
          )}
        </motion.div>
      </Button>

      {/* Portal for Backdrop and Drawer */}
      {mounted && createPortal(
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: isOpen ? 1 : 0 }}
            transition={{ duration: 0.3 }}
            className={`fixed inset-0 z-[9998] lg:hidden ${
              isOpen ? 'pointer-events-auto' : 'pointer-events-none'
            }`}
            onClick={onToggle}
          >
            <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
          </motion.div>

          {/* Mobile drawer panel */}
          <motion.div
            initial={{ y: '100%' }}
            animate={{ 
              y: isOpen ? 0 : '100%',
            }}
            transition={{ 
              type: 'spring', 
              damping: 30, 
              stiffness: 300,
            }}
            className="fixed bottom-0 left-0 right-0 z-[9999] max-h-[85vh] overflow-hidden lg:hidden"
          >
            {/* Panel background */}
            <div className="relative rounded-t-2xl bg-white dark:bg-slate-950 border-t border-slate-200 dark:border-slate-800 shadow-2xl">
              
              {/* Drag handle */}
              <div className="flex justify-center py-3">
                <div className="h-1 w-12 rounded-full bg-slate-200 dark:bg-slate-800" />
              </div>

              <div className="flex max-h-[calc(85vh-3rem)] flex-col overflow-hidden">
                {/* Header */}
                <div className="flex items-center justify-between border-b border-slate-100 dark:border-slate-800 px-6 pb-4">
                  <div>
                    <h2 className="text-xl font-bold text-slate-900 dark:text-white">
                      メニュー
                    </h2>
                  </div>
                  
                  <Button
                    variant="ghost"
                    size="sm"
                    className="h-8 w-8 rounded-full p-0 hover:bg-slate-100 dark:hover:bg-slate-800"
                    onClick={onToggle}
                    aria-label="メニューを閉じる"
                  >
                    <X className="h-5 w-5 text-slate-500 dark:text-slate-400" />
                  </Button>
                </div>

                {/* Scrollable Content */}
                <div className="flex-1 overflow-y-auto px-6 py-6">
                  <div className="space-y-8">
                    {/* Navigation Section */}
                    <div>
                      <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
                        <Sparkles className="w-3 h-3" />
                        ナビゲーション
                      </h3>
                      <div className="grid grid-cols-2 gap-3">
                        {[
                          { name: 'About', href: '#about', icon: User },
                          { name: 'Skills', href: '#skills', icon: Code },
                          { name: 'Projects', href: '#projects', icon: Briefcase },
                          { name: 'Contact', href: '#contact', icon: Mail },
                        ].map((item) => (
                          <a
                            key={item.name}
                            href={item.href}
                            className="flex flex-col items-center rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-4 text-center hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            onClick={onToggle}
                          >
                            <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-lg bg-white dark:bg-slate-800 shadow-sm text-slate-700 dark:text-slate-300">
                              <item.icon className="h-5 w-5" />
                            </div>
                            <span className="font-medium text-slate-900 dark:text-white text-sm">
                              {item.name}
                            </span>
                          </a>
                        ))}
                      </div>
                    </div>

                    {/* Social Links Section */}
                    <div>
                      <h3 className="mb-4 text-xs font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2">
                        <TrendingUp className="w-3 h-3" />
                        ソーシャルリンク
                      </h3>
                      <div className="space-y-3">
                        {siteConfig.map((item) => (
                          <a
                            key={item.url}
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center space-x-4 rounded-xl bg-slate-50 dark:bg-slate-900 border border-slate-100 dark:border-slate-800 p-4 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
                            onClick={onToggle}
                          >
                            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white dark:bg-slate-800 shadow-sm text-slate-700 dark:text-slate-300">
                              {item.icon}
                            </div>
                            
                            <div className="flex-1">
                              <p className="font-bold text-slate-900 dark:text-white text-sm">
                                {item.value}
                              </p>
                              <p className="text-xs text-slate-500 dark:text-slate-400">
                                {item.url.replace('https://', '').split('/')[0]}
                              </p>
                            </div>
                            
                            <div className="text-slate-400">
                              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                              </svg>
                            </div>
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Footer */}
                <div className="border-t border-slate-100 dark:border-slate-800 px-6 py-4 bg-slate-50 dark:bg-slate-900">
                  <div className="text-center space-y-1">
                    <p className="text-xs font-bold text-slate-900 dark:text-white">
                      © 2024 Naoki Hayashida
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </>,
        document.body
      )}
    </>
  )
}