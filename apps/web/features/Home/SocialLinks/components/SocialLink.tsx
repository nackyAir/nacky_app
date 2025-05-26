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
  const colors = [
    'from-blue-600 to-cyan-500',
    'from-indigo-600 to-blue-500', 
    'from-purple-600 to-indigo-500',
    'from-emerald-600 to-teal-500',
    'from-orange-600 to-red-500',
    'from-pink-600 to-rose-500',
  ]
  
  const colorClass = colors[index % colors.length]
  
  return (
    <motion.a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.5, rotateY: -90 }}
      animate={{ opacity: 1, scale: 1, rotateY: 0 }}
      transition={{ 
        duration: 0.6, 
        delay: index * 0.1, 
        ease: [0.25, 0.1, 0.25, 1],
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        scale: 1.2, 
        rotateY: 10,
        rotateZ: 5,
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.9 }}
      className="group relative"
      aria-label={item.value}
    >
      {/* Glow effect */}
      <div className={`absolute -inset-2 rounded-2xl bg-gradient-to-r ${colorClass} opacity-0 group-hover:opacity-40 blur-xl transition-all duration-500`}></div>
      
      {/* Outer ring animation */}
      <div className={`absolute inset-0 rounded-2xl bg-gradient-to-r ${colorClass} opacity-20 animate-ping group-hover:animate-none`}></div>
      
      {/* Main button */}
      <div className={`relative w-14 h-14 rounded-2xl bg-gradient-to-r ${colorClass} shadow-2xl flex items-center justify-center transform transition-all duration-300 group-hover:shadow-3xl`}>
        {/* Icon container */}
        <div className="relative w-8 h-8 text-white transform group-hover:scale-110 transition-transform duration-200">
          {item.icon}
        </div>
        
        {/* Inner highlight */}
        <div className="absolute inset-1 rounded-xl bg-white/20 group-hover:bg-white/30 transition-all duration-200"></div>
        
        {/* Shimmer effect */}
        <div className="absolute inset-0 rounded-2xl bg-gradient-to-r from-transparent via-white/20 to-transparent transform -skew-x-12 -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
      </div>
      
      {/* Tooltip */}
      <div className="absolute -bottom-12 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-300 pointer-events-none">
        <div className={`px-3 py-1.5 rounded-lg bg-gradient-to-r ${colorClass} text-white text-xs font-bold shadow-lg`}>
          {item.value}
          <div className={`absolute -top-1 left-1/2 -translate-x-1/2 w-2 h-2 bg-gradient-to-r ${colorClass} rotate-45`}></div>
        </div>
      </div>
    </motion.a>
  )
}

export function SocialLinks({ config }: SocialLinksProps) {
  const [particlePositions, setParticlePositions] = useState<ParticlePosition[]>([])
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
    // Create deterministic particle positions on client side only
    const positions: ParticlePosition[] = Array.from({ length: 6 }, (_, i) => ({
      left: `${20 + (i * 12)}%`,
      top: `${30 + (i * 8)}%`,
      delay: i * 0.5,
    }))
    setParticlePositions(positions)
  }, [])

  return (
    <div className="relative">
      {/* Background decoration */}
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.8, delay: 0.2 }}
        className="absolute inset-0 bg-gradient-to-r from-blue-500/10 via-indigo-500/10 to-purple-500/10 rounded-3xl blur-2xl"
      ></motion.div>
      
      {/* Links container */}
      <div className="relative flex justify-center items-center gap-6 p-6">
        {config.map((item, index) => (
          <SocialButton 
            key={item.value} 
            item={item} 
            index={index} 
          />
        ))}
      </div>
      
      {/* Floating particles - only render on client */}
      {isMounted && (
        <div className="absolute inset-0 pointer-events-none">
          {particlePositions.map((position, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0 }}
              animate={{ 
                opacity: [0, 1, 0],
                x: [0, 50 - 25, 0],
                y: [0, 50 - 25, 0],
              }}
              transition={{
                duration: 3,
                repeat: Infinity,
                delay: position.delay,
                ease: "easeInOut"
              }}
              className="absolute w-1 h-1 bg-blue-400 rounded-full"
              style={{
                left: position.left,
                top: position.top,
              }}
            />
          ))}
        </div>
      )}
    </div>
  )
}
