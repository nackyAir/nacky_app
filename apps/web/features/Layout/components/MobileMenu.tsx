'use client'

import React, { useState } from 'react'
import * as motion from 'framer-motion/client'
import { Button } from '@repo/ui/components/button'
import { siteConfig } from '~/config/siteConfig'

interface MobileMenuProps {
  isOpen: boolean
  onToggle: () => void
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onToggle }) => {
  return (
    <>
      {/* Mobile menu button */}
      <Button
        variant="ghost"
        size="sm"
        className="h-10 w-10 rounded-full p-0 lg:hidden"
        onClick={onToggle}
        aria-label="メニューを開く"
      >
        <motion.div
          animate={isOpen ? { rotate: 180 } : { rotate: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
        >
          {isOpen ? (
            <svg
              className="h-5 w-5 text-slate-600 dark:text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M19 9l-7 7-7-7"
              />
            </svg>
          ) : (
            <svg
              className="h-5 w-5 text-slate-600 dark:text-slate-400"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            </svg>
          )}
        </motion.div>
      </Button>

      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.3 }}
        className={`fixed inset-0 z-40 bg-black/50 backdrop-blur-sm lg:hidden ${
          isOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        onClick={onToggle}
      />

      {/* Mobile drawer panel - from bottom */}
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: isOpen ? 0 : '100%' }}
        transition={{ 
          type: 'spring', 
          damping: 30, 
          stiffness: 300,
          duration: 0.5 
        }}
        className="fixed bottom-0 left-0 right-0 z-50 max-h-[80vh] overflow-hidden rounded-t-3xl bg-white/95 backdrop-blur-md dark:bg-slate-950/95 lg:hidden"
      >
        {/* Drag handle */}
        <div className="flex justify-center py-3">
          <div className="h-1 w-12 rounded-full bg-slate-300 dark:bg-slate-600"></div>
        </div>

        <div className="flex max-h-[calc(80vh-2rem)] flex-col overflow-hidden">
          {/* Header */}
          <div className="flex items-center justify-between border-b border-slate-200 px-6 pb-4 dark:border-slate-700">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white">
              メニュー
            </h2>
            <Button
              variant="ghost"
              size="sm"
              className="h-8 w-8 rounded-full p-0"
              onClick={onToggle}
              aria-label="メニューを閉じる"
            >
              <svg
                className="h-4 w-4 text-slate-600 dark:text-slate-400"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </Button>
          </div>

          {/* Scrollable Content */}
          <div className="flex-1 overflow-y-auto px-6 py-6">
            <div className="space-y-8">
              {/* Navigation Section */}
              <div>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  ナビゲーション
                </h3>
                <div className="grid grid-cols-2 gap-3">
                  {[
                    { name: 'About', href: '#about', icon: '👤' },
                    { name: 'Skills', href: '#skills', icon: '⚡' },
                    { name: 'Projects', href: '#projects', icon: '🚀' },
                    { name: 'Contact', href: '#contact', icon: '📧' },
                  ].map((item, index) => (
                    <motion.a
                      key={item.name}
                      href={item.href}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ 
                        opacity: isOpen ? 1 : 0, 
                        y: isOpen ? 0 : 20 
                      }}
                      transition={{ 
                        duration: 0.4, 
                        delay: isOpen ? 0.1 + index * 0.1 : 0 
                      }}
                      className="group flex flex-col items-center rounded-2xl bg-gradient-to-br from-slate-50 to-slate-100 p-4 text-center transition-all duration-300 hover:from-blue-50 hover:to-purple-50 hover:shadow-lg dark:from-slate-800 dark:to-slate-700 dark:hover:from-blue-950/50 dark:hover:to-purple-950/50"
                      onClick={onToggle}
                    >
                      <span className="mb-2 text-2xl">{item.icon}</span>
                      <span className="font-medium text-slate-900 transition-colors duration-300 group-hover:text-blue-600 dark:text-white dark:group-hover:text-blue-400">
                        {item.name}
                      </span>
                    </motion.a>
                  ))}
                </div>
              </div>

              {/* Social Links Section */}
              <div>
                <h3 className="mb-4 text-sm font-semibold uppercase tracking-wider text-slate-500 dark:text-slate-400">
                  ソーシャルリンク
                </h3>
                <div className="space-y-3">
                  {siteConfig.map((item, index) => (
                    <motion.div
                      key={item.url}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ 
                        opacity: isOpen ? 1 : 0, 
                        y: isOpen ? 0 : 20 
                      }}
                      transition={{ 
                        duration: 0.4, 
                        delay: isOpen ? 0.5 + index * 0.1 : 0 
                      }}
                    >
                      <a
                        href={item.url}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group flex items-center space-x-4 rounded-xl bg-gradient-to-r from-slate-50 to-slate-100 p-4 transition-all duration-300 hover:from-blue-50 hover:to-purple-50 hover:shadow-md dark:from-slate-800 dark:to-slate-700 dark:hover:from-blue-950/50 dark:hover:to-purple-950/50"
                        onClick={onToggle}
                      >
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-100 to-purple-100 text-slate-600 transition-all duration-300 group-hover:from-blue-200 group-hover:to-purple-200 group-hover:text-blue-600 dark:from-blue-950/50 dark:to-purple-950/50 dark:text-slate-400 dark:group-hover:from-blue-900/50 dark:group-hover:to-purple-900/50 dark:group-hover:text-blue-400">
                          {item.icon}
                        </div>
                        <div className="flex-1">
                          <p className="font-semibold text-slate-900 dark:text-white">
                            {item.value}
                          </p>
                          <p className="text-sm text-slate-500 dark:text-slate-400">
                            {item.url.replace('https://', '').split('/')[0]}
                          </p>
                        </div>
                        <svg
                          className="h-5 w-5 text-slate-400 transition-transform duration-300 group-hover:translate-x-1 dark:text-slate-500"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth={2}
                            d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14"
                          />
                        </svg>
                      </a>
                    </motion.div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="border-t border-slate-200 px-6 py-4 dark:border-slate-700">
            <p className="text-center text-sm text-slate-500 dark:text-slate-400">
              © 2024 Naoki Hayashida
            </p>
          </div>
        </div>
      </motion.div>
    </>
  )
} 