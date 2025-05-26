'use client'

import React, { useState } from 'react'

import Link from 'next/link'
import * as motion from 'framer-motion/client'

import { Button } from '@repo/ui/components/button'

import { siteConfig } from '~/config/siteConfig'
import { MobileMenu } from './MobileMenu'

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  return (
    <>
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.6, ease: 'easeOut' }}
        className="fixed left-0 right-0 top-0 z-50 w-full"
      >
        {/* Background with blur and gradient */}
        <div className="absolute inset-0 bg-white/80 backdrop-blur-md dark:bg-slate-950/80">
          <div className="absolute bottom-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-slate-200 to-transparent dark:via-slate-700"></div>
        </div>
        
        <div className="relative">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="flex h-20 items-center justify-between">
              {/* Logo/Name with enhanced styling */}
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <Link 
                  href="/home" 
                  className="group relative flex items-center space-x-2"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 to-purple-600">
                    <span className="text-lg font-bold text-white">N</span>
                  </div>
                  <span className="bg-gradient-to-r from-slate-900 to-slate-700 dark:from-white dark:to-slate-300 bg-clip-text text-xl font-bold text-transparent transition-all duration-300 group-hover:from-blue-600 group-hover:to-purple-600">
                    Naoki Hayashida
                  </span>
                </Link>
              </motion.div>

              {/* Navigation - Desktop */}
              <motion.nav
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
                className="hidden items-center space-x-1 lg:flex"
              >
                {siteConfig.map((item, index) => (
                  <motion.div
                    key={item.url}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.4, delay: 0.6 + index * 0.1 }}
                  >
                    <Button 
                      variant="ghost" 
                      size="sm"
                      asChild
                      className="group relative h-10 w-10 rounded-full p-0 transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50 hover:to-purple-50 dark:hover:from-blue-950/50 dark:hover:to-purple-950/50"
                    >
                      <a 
                        href={item.url} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center"
                      >
                        <span className="text-slate-600 transition-colors duration-300 group-hover:text-blue-600 dark:text-slate-400 dark:group-hover:text-blue-400">
                          {item.icon}
                        </span>
                      </a>
                    </Button>
                  </motion.div>
                ))}
              </motion.nav>

              {/* Mobile menu */}
              <motion.div
                className="lg:hidden"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6, delay: 0.4 }}
              >
                <MobileMenu 
                  isOpen={isMobileMenuOpen} 
                  onToggle={toggleMobileMenu} 
                />
              </motion.div>
            </div>
          </div>
        </div>
      </motion.header>
    </>
  )
}
