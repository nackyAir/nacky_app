import { useState, useEffect, useCallback, useRef } from 'react'

interface UseIntersectionObserverOptions {
  threshold?: number | number[]
  rootMargin?: string
  triggerOnce?: boolean
  root?: Element | null
}

export function useIntersectionObserver(
  options: UseIntersectionObserverOptions = {}
) {
  const [ref, setRef] = useState<Element | null>(null)
  const [isIntersecting, setIsIntersecting] = useState(false)
  const [hasTriggered, setHasTriggered] = useState(false)
  
  // Use useRef to store stable references to options
  const optionsRef = useRef(options)
  optionsRef.current = options

  useEffect(() => {
    if (!ref) return

    const { 
      threshold = 0.1, 
      rootMargin = '0px', 
      triggerOnce = true,
      root = null 
    } = optionsRef.current

    if (triggerOnce && hasTriggered) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        const isVisible = entry.isIntersecting
        setIsIntersecting(isVisible)
        
        if (isVisible && triggerOnce) {
          setHasTriggered(true)
        }
      },
      { threshold, rootMargin, root }
    )

    observer.observe(ref)
    return () => observer.unobserve(ref)
  }, [ref, hasTriggered]) // Remove options from dependencies

  const resetTrigger = useCallback(() => {
    setHasTriggered(false)
    setIsIntersecting(false)
  }, [])

  return [setRef, isIntersecting, resetTrigger] as const
}