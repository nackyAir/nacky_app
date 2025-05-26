'use client'

import React, { useState, useEffect } from 'react'

import Link from 'next/link'
import * as motion from 'framer-motion/client'

import { Button } from '@repo/ui/components/button'

import { siteConfig } from '~/config/siteConfig'
import { MobileMenu } from './MobileMenu'

export const Header = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [isMounted, setIsMounted] = useState(false)

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  useEffect(() => {
    setIsMounted(true)
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    
    // Set initial scroll position
    setScrolled(window.scrollY > 20)
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <>
      <motion.header 
        initial={{ y: -100, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.8, ease: [0.25, 0.1, 0.25, 1] }}
        className="fixed left-0 right-0 top-0 z-50 w-full"
      >
        {/* Enhanced background with dynamic blur and gradient */}
        <motion.div 
          animate={{ 
            backdropFilter: scrolled ? 'blur(20px)' : 'blur(10px)',
            background: scrolled 
              ? 'linear-gradient(135deg, rgba(255,255,255,0.95) 0%, rgba(248,250,252,0.9) 100%)'
              : 'linear-gradient(135deg, rgba(255,255,255,0.8) 0%, rgba(248,250,252,0.7) 100%)'
          }}
          transition={{ duration: 0.3 }}
          className="absolute inset-0 bg-white/80 backdrop-blur-xl dark:bg-slate-950/80 border-b border-white/20 dark:border-slate-800/20"
        >
          {/* Animated gradient border */}
          <div className="absolute bottom-0 left-0 right-0 h-px">
            <motion.div
              animate={{ 
                background: scrolled
                  ? 'linear-gradient(90deg, transparent, rgb(59 130 246), rgb(147 51 234), transparent)'
                  : 'linear-gradient(90deg, transparent, rgb(148 163 184), transparent)'
              }}
              transition={{ duration: 0.5 }}
              className="h-full w-full"
            />
          </div>
          
          {/* Floating particles - only render on client */}
          {isMounted && (
            <div className="absolute inset-0 overflow-hidden pointer-events-none">
              {Array.from({ length: 3 }).map((_, i) => (
                <motion.div
                  key={i}
                  animate={{
                    x: [0, 100, 0],
                    y: [0, -20, 0],
                    opacity: [0.2, 0.5, 0.2],
                  }}
                  transition={{
                    duration: 8 + i * 2,
                    repeat: Infinity,
                    ease: "easeInOut",
                    delay: i * 2,
                  }}
                  className="absolute w-2 h-2 bg-blue-500/30 rounded-full"
                  style={{
                    left: `${20 + i * 30}%`,
                    top: `${30 + i * 20}%`,
                  }}
                />
              ))}
            </div>
          )}
        </motion.div>
        
        <div className="relative">
          <div className="container mx-auto px-6 lg:px-8">
            <div className="flex h-20 items-center justify-between">
              {/* Enhanced Logo/Name */}
              <motion.div
                initial={{ opacity: 0, x: -30, scale: 0.9 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.2, ease: [0.25, 0.1, 0.25, 1] }}
              >
                <Link 
                  href="/home" 
                  className="group relative flex items-center space-x-3"
                >
                  {/* Enhanced avatar with glow */}
                  <div className="relative">
                    <div className="absolute -inset-1 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 opacity-30 blur-sm group-hover:opacity-60 transition-all duration-300"></div>
                    <div className="relative flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 shadow-xl">
                      <span className="text-xl font-black text-white">N</span>
                      <div className="absolute inset-1 rounded-full bg-white/20"></div>
                    </div>
                  </div>
                  
                  {/* Enhanced name with gradient */}
                  <div className="hidden sm:block">
                    <span className="block text-xl font-black bg-gradient-to-r from-slate-900 via-blue-800 to-indigo-800 dark:from-white dark:via-blue-300 dark:to-indigo-300 bg-clip-text text-transparent transition-all duration-300 group-hover:from-blue-600 group-hover:via-indigo-600 group-hover:to-purple-600">
                      Naoki Hayashida
                    </span>
                    <span className="text-sm font-medium text-blue-600 dark:text-blue-400 opacity-80">
                      Frontend Engineer
                    </span>
                  </div>
                </Link>
              </motion.div>

              {/* Enhanced Navigation - Desktop */}
              <motion.nav
                initial={{ opacity: 0, x: 30 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.8, delay: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
                className="hidden items-center space-x-2 lg:flex"
              >
                {siteConfig.map((item, index) => (
                  <motion.div
                    key={item.url}
                    initial={{ opacity: 0, y: -20, scale: 0.8 }}
                    animate={{ opacity: 1, y: 0, scale: 1 }}
                    transition={{ 
                      duration: 0.6, 
                      delay: 0.6 + index * 0.1,
                      ease: [0.25, 0.1, 0.25, 1]
                    }}
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <Button 
                      variant="ghost" 
                      size="sm"
                      asChild
                      className="group relative h-12 w-12 rounded-2xl p-0 transition-all duration-300 hover:bg-gradient-to-r hover:from-blue-50/80 hover:via-indigo-50/80 hover:to-purple-50/80 dark:hover:from-blue-950/50 dark:hover:via-indigo-950/50 dark:hover:to-purple-950/50 hover:shadow-lg hover:shadow-blue-500/25"
                    >
                      <a 
                        href={item.url} 
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center justify-center relative"
                      >
                        {/* Glow effect */}
                        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 blur-sm transition-all duration-300"></div>
                        
                        {/* Icon */}
                        <span className="relative text-slate-600 transition-all duration-300 group-hover:text-blue-600 group-hover:scale-110 dark:text-slate-400 dark:group-hover:text-blue-400">
                          {item.icon}
                        </span>
                        
                        {/* Tooltip */}
                        <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
                          <div className="px-2 py-1 rounded-lg bg-slate-900 dark:bg-slate-100 text-white dark:text-slate-900 text-xs font-medium shadow-lg">
                            {item.value}
                            <div className="absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-slate-900 dark:bg-slate-100 rotate-45"></div>
                          </div>
                        </div>
                      </a>
                    </Button>
                  </motion.div>
                ))}
              </motion.nav>

              {/* Enhanced Mobile menu */}
              <motion.div
                className="lg:hidden"
                initial={{ opacity: 0, x: 30, scale: 0.8 }}
                animate={{ opacity: 1, x: 0, scale: 1 }}
                transition={{ duration: 0.8, delay: 0.4 }}
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
