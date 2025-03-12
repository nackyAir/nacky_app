'use client'

import * as React from 'react'

import * as ProgressPrimitive from '@radix-ui/react-progress'

import { cn } from '../../lib/utils'

// 各セグメントの型定義
type ProgressSegment = {
  value: number
  color?: string
}

// コンポーネントのProps型
type Props = React.ComponentPropsWithoutRef<typeof ProgressPrimitive.Root> & {
  segments: ProgressSegment[]
}

const LanguageProgress = React.forwardRef<
  React.ElementRef<typeof ProgressPrimitive.Root>,
  Props
>(({ className, segments, ...props }, ref) => {
  // 値で昇順ソート
  const sortedSegments = segments.sort((a, b) => a.value - b.value)

  return (
    <ProgressPrimitive.Root
      ref={ref}
      className={cn(
        'bg-secondary relative h-6 w-full overflow-hidden rounded-xs',
        className
      )}
      {...props}
    >
      {sortedSegments.map((segment, index) => (
        <ProgressPrimitive.Indicator
          key={index}
          className={cn(
            'absolute h-full transition-all',
            segment.color ? segment.color : 'bg-primary'
          )}
          style={{
            width: `${segment.value}%`,
            zIndex: sortedSegments.length - index,
          }}
        />
      ))}
    </ProgressPrimitive.Root>
  )
})

LanguageProgress.displayName = 'LanguageProgress'

export { LanguageProgress }
