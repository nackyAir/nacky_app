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
      <header className="fixed left-0 right-0 top-0 z-50 w-full">
        <div className={`bg-white/80 backdrop-blur-sm dark:bg-slate-950/80 border-b border-slate-200 dark:border-slate-800 transition-all duration-200 ${
          scrolled ? 'backdrop-blur-md' : ''
        }`}>
          <div className="container mx-auto px-6 lg:px-8">
            <div className="flex h-16 items-center justify-between">
              <div>
                <Link 
                  href="/home" 
                  className="flex items-center space-x-3"
                >
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-blue-600 shadow-sm">
                    <span className="text-lg font-bold text-white">N</span>
                  </div>
                  
                  <div className="hidden sm:block">
                    <span className="block text-lg font-semibold text-slate-900 dark:text-white">
                      Naoki Hayashida
                    </span>
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      Frontend Engineer
                    </span>
                  </div>
                </Link>
              </div>

              <nav className="hidden items-center space-x-2 lg:flex">
                {siteConfig.map((item) => (
                  <Button 
                    key={item.url}
                    variant="ghost" 
                    size="sm"
                    asChild
                    className="h-10 w-10 rounded-lg p-0 hover:bg-slate-100 dark:hover:bg-slate-800"
                  >
                    <a 
                      href={item.url} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center justify-center"
                      title={item.value}
                    >
                      <span className="text-slate-600 hover:text-blue-600 dark:text-slate-400 dark:hover:text-blue-400 transition-colors duration-200">
                        {item.icon}
                      </span>
                    </a>
                  </Button>
                ))}
              </nav>

              <div className="lg:hidden">
                <MobileMenu 
                  isOpen={isMobileMenuOpen} 
                  onToggle={toggleMobileMenu} 
                />
              </div>
            </div>
          </div>
        </div>
      </header>
    </>
  )
}
