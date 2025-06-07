'use client'

import { memo } from 'react'
import { motion, useScroll, useSpring } from 'framer-motion'
import { cn } from '@repo/ui/utils'

interface ScrollProgressProps {
  className?: string
  height?: string
  color?: string
  showPercentage?: boolean
}

export const ScrollProgress = memo(({ 
  className, 
  height = "h-1", 
  color = "bg-primary",
  showPercentage = false 
}: ScrollProgressProps) => {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <>
      <motion.div
        className={cn(
          "fixed left-0 right-0 top-0 z-50",
          height,
          color,
          className
        )}
        style={{ scaleX, transformOrigin: "0%" }}
        role="progressbar"
        aria-label="ページの読み進み状況"
      />
      {showPercentage && (
        <motion.div
          className="fixed top-4 right-4 z-50 text-xs bg-background/80 px-2 py-1 rounded backdrop-blur-sm"
          style={{ opacity: scrollYProgress }}
        >
          {Math.round(scrollYProgress.get() * 100)}%
        </motion.div>
      )}
    </>
  )
})

ScrollProgress.displayName = 'ScrollProgress'
