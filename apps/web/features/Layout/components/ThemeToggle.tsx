'use client'

import { Moon, Sun } from '@repo/ui/icons/lucide'
import { useTheme } from 'next-themes'
import { useEffect, useState } from 'react'

export function ThemeToggle() {
  const { resolvedTheme, setTheme } = useTheme()
  const [mounted, setMounted] = useState(false)

  useEffect(() => setMounted(true), [])

  const isDark = resolvedTheme === 'dark'

  return (
    <button
      type="button"
      onClick={() => setTheme(isDark ? 'light' : 'dark')}
      aria-label={isDark ? 'ライトモードに切り替える' : 'ダークモードに切り替える'}
      className="inline-flex size-11 items-center justify-center rounded-full text-ink-muted transition-colors duration-300 hover:bg-paper-raised hover:text-ink"
    >
      {mounted && isDark ? (
        <Sun className="size-[18px]" />
      ) : (
        <Moon className="size-[18px]" />
      )}
    </button>
  )
}
