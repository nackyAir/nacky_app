'use client'

import React, { useState, useEffect } from 'react'
import * as motion from 'framer-motion/client'
import { Button } from '@repo/ui/components/button'
import { Menu, X, User, Code, Briefcase, Mail, Sparkles, TrendingUp } from '@repo/ui/icons/lucide'
import { siteConfig } from '~/config/siteConfig'

interface MobileMenuProps {
  isOpen: boolean
  onToggle: () => void
}

interface ParticleData {
  id: number
  left: string
  top: string
  delay: number
  duration: number
}

export const MobileMenu: React.FC<MobileMenuProps> = ({ isOpen, onToggle }) => {
  const [particles, setParticles] = useState<ParticleData[]>([])
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    // Create deterministic particle positions
    const particleData: ParticleData[] = Array.from({ length: 8 }, (_, i) => ({
      id: i,
      left: `${10 + (i * 12)}%`,
      top: `${15 + (i * 10)}%`,
      delay: i * 0.3,
      duration: 4 + (i % 3),
    }))
    setParticles(particleData)
  }, [])

  return (
    <>
      {/* Enhanced Mobile menu button */}
      <Button
        variant="ghost"
        size="sm"
        className="relative h-12 w-12 rounded-2xl p-0 lg:hidden group overflow-hidden"
        onClick={onToggle}
        aria-label="メニューを開く"
      >
        {/* Glow effect */}
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-purple-600/20 opacity-0 group-hover:opacity-100 blur-sm transition-all duration-300"></div>
        
        {/* Button background */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-blue-50/50 to-indigo-50/50 dark:from-blue-950/30 dark:to-indigo-950/30 opacity-0 group-hover:opacity-100 transition-all duration-300"></div>
        
        <motion.div
          animate={isOpen ? { rotate: 180, scale: 1.1 } : { rotate: 0, scale: 1 }}
          transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative z-10"
        >
          {isOpen ? (
            <X className="h-6 w-6 text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300" />
          ) : (
            <Menu className="h-6 w-6 text-slate-600 dark:text-slate-400 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors duration-300" />
          )}
        </motion.div>
      </Button>

      {/* Enhanced Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: isOpen ? 1 : 0 }}
        transition={{ duration: 0.4, ease: [0.25, 0.1, 0.25, 1] }}
        className={`fixed inset-0 z-40 lg:hidden ${
          isOpen ? 'pointer-events-auto' : 'pointer-events-none'
        }`}
        onClick={onToggle}
      >
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-blue-900/20 to-indigo-900/30 backdrop-blur-xl" />
        
        {/* Floating particles - only render on client */}
        {isMounted && (
          <div className="absolute inset-0 overflow-hidden">
            {particles.map((particle) => (
              <motion.div
                key={particle.id}
                animate={{
                  y: [0, -100, 0],
                  x: [0, 25 - 12.5, 0],
                  opacity: [0.2, 0.8, 0.2],
                  scale: [0.5, 1, 0.5],
                }}
                transition={{
                  duration: particle.duration,
                  repeat: Infinity,
                  ease: "easeInOut",
                  delay: particle.delay,
                }}
                className="absolute w-2 h-2 bg-blue-400/40 rounded-full"
                style={{
                  left: particle.left,
                  top: particle.top,
                }}
              />
            ))}
          </div>
        )}
      </motion.div>

      {/* Enhanced Mobile drawer panel */}
      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        animate={{ 
          y: isOpen ? 0 : '100%',
          opacity: isOpen ? 1 : 0
        }}
        transition={{ 
          type: 'spring', 
          damping: 30, 
          stiffness: 300,
          duration: 0.6,
          ease: [0.25, 0.1, 0.25, 1]
        }}
        className="fixed bottom-0 left-0 right-0 z-50 max-h-[85vh] overflow-hidden lg:hidden"
      >
        {/* Panel background with advanced styling */}
        <div className="relative rounded-t-3xl bg-white/95 dark:bg-slate-950/95 backdrop-blur-2xl border-t border-white/20 dark:border-slate-800/20 shadow-2xl">
          {/* Top gradient decoration */}
          <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600"></div>
          
          {/* Enhanced drag handle */}
          <div className="flex justify-center py-4">
            <motion.div 
              whileHover={{ scale: 1.2 }}
              className="h-1.5 w-16 rounded-full bg-gradient-to-r from-blue-400 to-indigo-400 shadow-lg"
            />
          </div>

          <div className="flex max-h-[calc(85vh-3rem)] flex-col overflow-hidden">
            {/* Enhanced Header */}
            <div className="flex items-center justify-between border-b border-slate-200/50 dark:border-slate-700/50 px-8 pb-6">
              <motion.div
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: isOpen ? 1 : 0, x: isOpen ? 0 : -20 }}
                transition={{ duration: 0.4, delay: 0.2 }}
              >
                <h2 className="text-2xl font-black bg-gradient-to-r from-slate-900 via-blue-800 to-indigo-800 dark:from-white dark:via-blue-300 dark:to-indigo-300 bg-clip-text text-transparent">
                  メニュー
                </h2>
                <p className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                  ナビゲーション & リンク
                </p>
              </motion.div>
              
              <motion.div
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: isOpen ? 1 : 0, scale: isOpen ? 1 : 0.8 }}
                transition={{ duration: 0.4, delay: 0.3 }}
              >
                <Button
                  variant="ghost"
                  size="sm"
                  className="h-10 w-10 rounded-2xl p-0 bg-gradient-to-r from-red-50 to-pink-50 dark:from-red-950/50 dark:to-pink-950/50 hover:from-red-100 hover:to-pink-100 dark:hover:from-red-900/50 dark:hover:to-pink-900/50"
                  onClick={onToggle}
                  aria-label="メニューを閉じる"
                >
                  <X className="h-5 w-5 text-red-600 dark:text-red-400" />
                </Button>
              </motion.div>
            </div>

            {/* Enhanced Scrollable Content */}
            <div className="flex-1 overflow-y-auto px-8 py-8">
              <div className="space-y-10">
                {/* Enhanced Navigation Section */}
                <div>
                  <motion.h3 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 20 }}
                    transition={{ duration: 0.4, delay: 0.4 }}
                    className="mb-6 text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2"
                  >
                    <Sparkles className="w-4 h-4" />
                    ナビゲーション
                  </motion.h3>
                  <div className="grid grid-cols-2 gap-4">
                    {[
                      { name: 'About', href: '#about', icon: User, color: 'from-blue-500 to-cyan-400' },
                      { name: 'Skills', href: '#skills', icon: Code, color: 'from-indigo-500 to-purple-400' },
                      { name: 'Projects', href: '#projects', icon: Briefcase, color: 'from-purple-500 to-pink-400' },
                      { name: 'Contact', href: '#contact', icon: Mail, color: 'from-emerald-500 to-teal-400' },
                    ].map((item, index) => (
                      <motion.a
                        key={item.name}
                        href={item.href}
                        initial={{ opacity: 0, y: 30, scale: 0.9 }}
                        animate={{ 
                          opacity: isOpen ? 1 : 0, 
                          y: isOpen ? 0 : 30,
                          scale: isOpen ? 1 : 0.9
                        }}
                        transition={{ 
                          duration: 0.5, 
                          delay: isOpen ? 0.5 + index * 0.1 : 0,
                          ease: [0.25, 0.1, 0.25, 1]
                        }}
                        whileHover={{ scale: 1.05, rotateY: 5 }}
                        whileTap={{ scale: 0.95 }}
                        className="group relative overflow-hidden"
                        onClick={onToggle}
                      >
                        {/* Glow effect */}
                        <div className={`absolute -inset-1 rounded-2xl bg-gradient-to-r ${item.color} opacity-0 group-hover:opacity-30 blur-sm transition-all duration-300`}></div>
                        
                        {/* Card */}
                        <div className="relative flex flex-col items-center rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/20 p-6 text-center shadow-xl group-hover:shadow-2xl transition-all duration-300">
                          <div className={`mb-4 flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-r ${item.color} shadow-lg`}>
                            <item.icon className="h-6 w-6 text-white" />
                          </div>
                          <span className="font-bold text-slate-900 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text transition-all duration-300"
                                style={{ backgroundImage: item.color.includes('from-') ? `linear-gradient(to right, var(--tw-gradient-stops))` : undefined }}>
                            {item.name}
                          </span>
                        </div>
                      </motion.a>
                    ))}
                  </div>
                </div>

                {/* Enhanced Social Links Section */}
                <div>
                  <motion.h3 
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 20 }}
                    transition={{ duration: 0.4, delay: 0.7 }}
                    className="mb-6 text-sm font-bold uppercase tracking-wider text-slate-500 dark:text-slate-400 flex items-center gap-2"
                  >
                    <TrendingUp className="w-4 h-4" />
                    ソーシャルリンク
                  </motion.h3>
                  <div className="space-y-4">
                    {siteConfig.map((item, index) => (
                      <motion.div
                        key={item.url}
                        initial={{ opacity: 0, x: -30, scale: 0.9 }}
                        animate={{ 
                          opacity: isOpen ? 1 : 0, 
                          x: isOpen ? 0 : -30,
                          scale: isOpen ? 1 : 0.9
                        }}
                        transition={{ 
                          duration: 0.5, 
                          delay: isOpen ? 0.8 + index * 0.1 : 0,
                          ease: [0.25, 0.1, 0.25, 1]
                        }}
                        whileHover={{ scale: 1.02, x: 5 }}
                        whileTap={{ scale: 0.98 }}
                      >
                        <a
                          href={item.url}
                          target="_blank"
                          rel="noopener noreferrer"
                          className="group relative flex items-center space-x-4 rounded-2xl bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/20 p-5 shadow-xl hover:shadow-2xl transition-all duration-300 overflow-hidden"
                          onClick={onToggle}
                        >
                          {/* Background gradient on hover */}
                          <div className="absolute inset-0 bg-gradient-to-r from-blue-50/0 via-indigo-50/0 to-purple-50/0 group-hover:from-blue-50/50 group-hover:via-indigo-50/50 group-hover:to-purple-50/50 dark:group-hover:from-blue-950/20 dark:group-hover:via-indigo-950/20 dark:group-hover:to-purple-950/20 transition-all duration-300"></div>
                          
                          {/* Icon */}
                          <div className="relative flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-r from-blue-100 via-indigo-100 to-purple-100 dark:from-blue-950/50 dark:via-indigo-950/50 dark:to-purple-950/50 text-slate-600 dark:text-slate-400 shadow-lg group-hover:shadow-xl transition-all duration-300 group-hover:scale-110">
                            {item.icon}
                          </div>
                          
                          {/* Content */}
                          <div className="flex-1 relative">
                            <p className="font-bold text-slate-900 dark:text-white text-lg">
                              {item.value}
                            </p>
                            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                              {item.url.replace('https://', '').split('/')[0]}
                            </p>
                          </div>
                          
                          {/* Arrow */}
                          <div className="relative text-slate-400 transition-all duration-300 group-hover:text-blue-600 dark:group-hover:text-blue-400 group-hover:translate-x-1">
                            <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                            </svg>
                          </div>
                        </a>
                      </motion.div>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* Enhanced Footer */}
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: isOpen ? 1 : 0, y: isOpen ? 0 : 20 }}
              transition={{ duration: 0.4, delay: 1.2 }}
              className="border-t border-slate-200/50 dark:border-slate-700/50 px-8 py-6 bg-gradient-to-r from-slate-50/50 to-blue-50/50 dark:from-slate-900/50 dark:to-blue-950/50"
            >
              <div className="text-center space-y-2">
                <p className="text-sm font-bold text-slate-900 dark:text-white">
                  © 2024 Naoki Hayashida
                </p>
                <p className="text-xs text-slate-500 dark:text-slate-400">
                  Crafted with passion and cutting-edge technology
                </p>
              </div>
            </motion.div>
          </div>
        </div>
      </motion.div>
    </>
  )
} 