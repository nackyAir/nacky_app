'use client'

import { motion, useScroll, useSpring } from 'framer-motion'

export const ScrollProgress = () => {
  const { scrollYProgress } = useScroll()
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  })

  return (
    <motion.div
      className="bg-navy fixed inset-x-0 top-0 z-[60] h-0.5 origin-left"
      style={{ scaleX }}
    />
  )
}
