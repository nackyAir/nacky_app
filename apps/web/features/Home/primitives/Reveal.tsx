'use client'

import { motion, useReducedMotion } from 'framer-motion'

const EASE: [number, number, number, number] = [0.22, 1, 0.36, 1]

type RevealProps = {
  children: React.ReactNode
  delay?: number
  className?: string
}

export function Reveal({ children, delay = 0, className }: RevealProps) {
  const reducedMotion = useReducedMotion()

  return (
    <motion.div
      className={className}
      initial={reducedMotion ? false : { clipPath: 'inset(0 0 100% 0)' }}
      whileInView={reducedMotion ? undefined : { clipPath: 'inset(0 0 0% 0)' }}
      viewport={{ once: true, margin: '-80px' }}
      transition={
        reducedMotion ? undefined : { duration: 0.42, ease: EASE, delay }
      }
    >
      {children}
    </motion.div>
  )
}
