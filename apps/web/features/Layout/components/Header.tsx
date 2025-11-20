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

  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen)
  }

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20)
    }
    
    setScrolled(window.scrollY > 20)
    
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  return (
    <motion.header 
      initial={{ y: -100, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5, ease: 'easeOut' }}
      className={`fixed left-0 right-0 top-0 z-50 w-full transition-all duration-300 ${
        scrolled 
          ? 'bg-white/80 dark:bg-slate-950/80 backdrop-blur-md border-b border-slate-200 dark:border-slate-800' 
          : 'bg-transparent'
      }`}
    >
      <div className="container mx-auto px-6 lg:px-8">
        <div className="flex h-16 lg:h-20 items-center justify-between">
          {/* Logo/Name */}
          <Link 
            href="/home" 
            className="flex items-center space-x-3 group"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-slate-900 dark:bg-white text-white dark:text-slate-900 font-bold text-xl">
              N
            </div>
            
            <div className="hidden sm:block">
              <span className="block text-lg font-bold text-slate-900 dark:text-white">
                Naoki Hayashida
              </span>
              <span className="text-xs font-medium text-slate-500 dark:text-slate-400">
                Frontend Engineer
              </span>
            </div>
          </Link>

          {/* Navigation - Desktop */}
          <nav className="hidden lg:flex items-center space-x-1">
            {siteConfig.map((item) => (
              <Button 
                key={item.url}
                variant="ghost" 
                size="sm"
                asChild
                className="text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <a 
                  href={item.url} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 px-2"
                >
                  <span>{item.icon}</span>
                  <span className="font-medium">{item.value}</span>
                </a>
              </Button>
            ))}
          </nav>

          {/* Mobile menu */}
          <div className="lg:hidden">
            <MobileMenu 
              isOpen={isMobileMenuOpen} 
              onToggle={toggleMobileMenu} 
            />
          </div>
        </div>
      </div>
    </motion.header>
  )
}
