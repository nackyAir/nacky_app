'use client'

import React from 'react'

import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from '@repo/ui/components/card'
import { Progress } from '@repo/ui/components/progress'
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from '@repo/ui/components/tooltip'
import { Loader2 } from '@repo/ui/icons/lucide'

import { useGithubLanguages } from '../hooks/useGithubLanguages'

export function LanguageProgress() {
  const { languages, isLoading, error } = useGithubLanguages('nackyAir')

  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin text-gray-500" />
      </div>
    )
  }

  if (error) {
    return (
      <div className="rounded-lg bg-red-50 p-4 text-center text-red-800">
        <p>{error}</p>
        <button
          onClick={() => window.location.reload()}
          className="mt-2 text-sm text-red-600 hover:text-red-800"
        >
          再試行
        </button>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-2xl">
      <Card className="w-full max-w-2xl">
        <CardHeader>
          <CardTitle>Language Statistics</CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <TooltipProvider>
            {languages.map((lang) => (
              <div key={lang.name} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-2">
                    <div
                      className="h-3 w-3 rounded-full"
                      style={{ backgroundColor: lang.color }}
                    />
                    <span>{lang.name}</span>
                  </div>
                  <span>{lang.percentage?.toFixed(1)}%</span>
                </div>
                <Tooltip>
                  <TooltipTrigger asChild>
                    <Progress
                      value={lang.percentage}
                      className="h-2"
                      style={
                        {
                          backgroundColor: `${lang.color}20`,
                          ['--progress-background']: lang.color,
                        } as React.CSSProperties
                      }
                    />
                  </TooltipTrigger>
                  <TooltipContent>
                    <p className="text-sm">
                      {lang.name}: {lang.percentage?.toFixed(1)}%
                      <br />
                      {(lang.bytes / 1024).toFixed(1)}KB
                    </p>
                  </TooltipContent>
                </Tooltip>
              </div>
            ))}
          </TooltipProvider>
        </CardContent>
      </Card>
    </div>
  )
}
