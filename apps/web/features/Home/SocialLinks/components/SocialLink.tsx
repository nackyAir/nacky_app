'use client'

import * as motion from 'framer-motion/client'

import { siteConfig } from '~/config/siteConfig'

interface SocialLinksProps {
  config: typeof siteConfig
}

function SocialButton({ item, index }: { 
  item: typeof siteConfig[0]; 
  index: number 
}) {
  const colors = [
    'bg-blue-500',
    'bg-indigo-500', 
    'bg-purple-500',
    'bg-emerald-500',
    'bg-orange-500',
    'bg-pink-500',
  ]
  
  const colorClass = colors[index % colors.length]
  
  return (
    <motion.a
      href={item.url}
      target="_blank"
      rel="noopener noreferrer"
      initial={{ opacity: 0, scale: 0.8 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ 
        duration: 0.4, 
        delay: index * 0.1, 
        ease: "easeOut"
      }}
      whileHover={{ 
        scale: 1.1, 
        transition: { duration: 0.2 }
      }}
      whileTap={{ scale: 0.95 }}
      className="group relative"
      aria-label={item.value}
    >
      {/* Main button */}
      <div className={`relative w-12 h-12 rounded-xl ${colorClass} shadow-md flex items-center justify-center transition-all duration-300 group-hover:shadow-lg`}>
        {/* Icon container */}
        <div className="relative w-6 h-6 text-white">
          {item.icon}
        </div>
      </div>
      
      {/* Tooltip */}
      <div className="absolute -bottom-10 left-1/2 -translate-x-1/2 opacity-0 group-hover:opacity-100 transition-all duration-200 pointer-events-none whitespace-nowrap">
        <div className="px-2 py-1 rounded bg-slate-800 text-white text-xs font-medium shadow-sm">
          {item.value}
        </div>
      </div>
    </motion.a>
  )
}

export function SocialLinks({ config }: SocialLinksProps) {
  return (
    <div className="relative">
      {/* Links container */}
      <div className="relative flex justify-center items-center gap-4 p-6">
        {config.map((item, index) => (
          <SocialButton 
            key={item.value} 
            item={item} 
            index={index} 
          />
        ))}
      </div>
    </div>
  )
}
