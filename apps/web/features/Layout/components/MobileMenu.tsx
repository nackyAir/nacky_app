'use client'

import React from 'react'

import { Menu, X } from '@repo/ui/icons/lucide'
import * as motion from 'framer-motion/client'

import { Button } from '@repo/ui/components/button'
import {
  Drawer,
  DrawerContent,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from '@repo/ui/components/drawer'

import { siteConfig } from '~/config/siteConfig'

interface MobileMenuProps {
  isOpen: boolean
  onToggle: () => void
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onToggle }) => {
  return (
    <Drawer open={isOpen} onOpenChange={onToggle} direction="bottom">
      <DrawerTrigger asChild>
        <Button
          variant="ghost"
          size="icon"
          className="h-10 w-10 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
          aria-label="メニューを開く"
        >
          <Menu className="size-5 text-slate-600 dark:text-slate-400" />
        </Button>
      </DrawerTrigger>

      <DrawerContent className="bg-white/95 backdrop-blur-md dark:bg-slate-950/95">
        <DrawerHeader>
          <DrawerTitle className="sr-only">ナビゲーションメニュー</DrawerTitle>
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-slate-200 dark:border-slate-800">
            <div className="flex items-center space-x-3">
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-blue-600 shadow-sm">
                <span className="text-sm font-bold text-white">N</span>
              </div>
              <div>
                <span className="block text-sm font-semibold text-slate-900 dark:text-white">
                  Naoki Hayashida
                </span>
                <span className="text-xs text-slate-600 dark:text-slate-400">
                  Frontend Engineer
                </span>
              </div>
            </div>

            <Button
              variant="ghost"
              size="icon"
              onClick={onToggle}
              className="h-8 w-8 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              aria-label="メニューを閉じる"
            >
              <X className="size-4 text-slate-600 dark:text-slate-400" />
            </Button>
          </div>

          {/* Navigation Links */}
          <nav className="p-4">
            <div className="space-y-2">
              <h3 className="text-xs font-medium text-slate-500 dark:text-slate-400 uppercase tracking-wider mb-3">
                ソーシャルリンク
              </h3>

              {siteConfig.map((item, index) => (
                <motion.div
                  key={item.url}
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Button
                    variant="ghost"
                    size="sm"
                    asChild
                    className="w-full justify-start h-10 px-3 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors duration-200"
                  >
                    <a
                      href={item.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center space-x-3"
                      onClick={onToggle}
                    >
                      <span className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors duration-200">
                        {item.icon}
                      </span>
                      <span className="text-slate-900 dark:text-white font-medium">
                        {item.value}
                      </span>
                    </a>
                  </Button>
                </motion.div>
              ))}
            </div>
          </nav>

          {/* Footer */}
          <div className="p-4 border-t border-slate-200 dark:border-slate-800">
            <p className="text-xs text-slate-500 dark:text-slate-400 text-center">
              © 2024 Naoki Hayashida
            </p>
          </div>
        </DrawerHeader>
      </DrawerContent>
    </Drawer>
  )
}
