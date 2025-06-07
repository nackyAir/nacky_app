export function debounce<T extends (...args: any[]) => any>(
  func: T,
  wait: number
): (...args: Parameters<T>) => void {
  let timeout: NodeJS.Timeout
  return function executedFunction(...args: Parameters<T>) {
    const later = () => {
      clearTimeout(timeout)
      func(...args)
    }
    clearTimeout(timeout)
    timeout = setTimeout(later, wait)
  }
}

export function throttle<T extends (...args: any[]) => any>(
  func: T,
  limit: number
): (...args: Parameters<T>) => void {
  let inThrottle: boolean
  return function executedFunction(...args: Parameters<T>) {
    if (!inThrottle) {
      func(...args)
      inThrottle = true
      setTimeout(() => inThrottle = false, limit)
    }
  }
}

export function memoize<T extends (...args: any[]) => any>(
  fn: T,
  getKey?: (...args: Parameters<T>) => string
): T {
  const cache = new Map<string, ReturnType<T>>()
  
  return ((...args: Parameters<T>): ReturnType<T> => {
    const key = getKey ? getKey(...args) : JSON.stringify(args)
    
    if (cache.has(key)) {
      return cache.get(key)!
    }
    
    const result = fn(...args)
    cache.set(key, result)
    return result
  }) as T
}

export function createRetry<T>(
  fn: () => Promise<T>,
  options: {
    maxRetries: number
    delay: number
    backoff?: boolean
  }
): Promise<T> {
  const { maxRetries, delay, backoff = true } = options
  
  return new Promise((resolve, reject) => {
    let attempts = 0
    
    const attemptFn = async () => {
      try {
        const result = await fn()
        resolve(result)
      } catch (error) {
        attempts++
        
        if (attempts >= maxRetries) {
          reject(error)
          return
        }
        
        const currentDelay = backoff ? delay * Math.pow(2, attempts - 1) : delay
        setTimeout(attemptFn, currentDelay)
      }
    }
    
    attemptFn()
  })
}