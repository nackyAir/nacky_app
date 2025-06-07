'use client'

import { useEffect, useState } from 'react'
import * as motion from 'framer-motion/client'

import { siteConfig } from '~/config/siteConfig'

interface SocialLinksProps {
  config: typeof siteConfig
}

interface ParticlePosition {
  left: string
  top: string
  delay: number
}

function SocialButton({ item, index }: { 
  item: typeof siteConfig[0]; 
  index: number 
}) {
  return (
    <motion.a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.1 }}
      className="group"
      aria-label={item.value}
    >
      <div className="w-12 h-12 rounded-lg bg-blue-600 hover:bg-blue-700 transition-colors duration-200 flex items-center justify-center shadow-md">
        <div className="w-6 h-6 text-white">
          {item.icon}
        </div>
      </div>
    </motion.a>
  )
}

export function SocialLinks({ config }: SocialLinksProps) {
  return (
    <div className="flex justify-center items-center gap-4">
      {config.map((item, index) => (
        <SocialButton 
          key={item.value} 
          item={item} 
          index={index} 
        />
      ))}
    </div>
  )
}
