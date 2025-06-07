'use client'

import React from 'react'
import * as motion from 'framer-motion/client'
import { Loader2, TrendingUp, Code, Database } from '@repo/ui/icons/lucide'

import { useGithubLanguages } from '../hooks/useGithubLanguages'

// 言語ごとの色とカテゴリ定義
const LANGUAGE_CONFIG: Record<string, { 
  color: string; 
  category: 'Frontend' | 'Backend' | 'Mobile' | 'Data' | 'System' | 'Styling';
  icon: string;
}> = {
  'JavaScript': { color: '#f7df1e', category: 'Frontend', icon: '🟨' },
  'TypeScript': { color: '#3178c6', category: 'Frontend', icon: '🔷' },
  'Python': { color: '#3776ab', category: 'Backend', icon: '🐍' },
  'Java': { color: '#ed8b00', category: 'Backend', icon: '☕' },
  'C++': { color: '#00599c', category: 'System', icon: '⚡' },
  'C': { color: '#a8b9cc', category: 'System', icon: '🔧' },
  'Go': { color: '#00add8', category: 'Backend', icon: '🔵' },
  'Rust': { color: '#ce422b', category: 'System', icon: '🦀' },
  'PHP': { color: '#777bb4', category: 'Backend', icon: '🐘' },
  'Ruby': { color: '#cc342d', category: 'Backend', icon: '💎' },
  'Swift': { color: '#fa7343', category: 'Mobile', icon: '🍎' },
  'Kotlin': { color: '#7f52ff', category: 'Mobile', icon: '📱' },
  'Dart': { color: '#0175c2', category: 'Mobile', icon: '🎯' },
  'HTML': { color: '#e34f26', category: 'Styling', icon: '🏗️' },
  'CSS': { color: '#1572b6', category: 'Styling', icon: '🎨' },
  'SCSS': { color: '#cf649a', category: 'Styling', icon: '💅' },
  'Vue': { color: '#4fc08d', category: 'Frontend', icon: '🟢' },
  'React': { color: '#61dafb', category: 'Frontend', icon: '⚛️' },
  'Angular': { color: '#dd0031', category: 'Frontend', icon: '🅰️' },
  'Svelte': { color: '#ff3e00', category: 'Frontend', icon: '🔥' },
}

function LanguageCard({ language, percentage, bytes, delay }: { 
  language: string
  percentage: number
  bytes: number
  delay: number
}) {
  const config = LANGUAGE_CONFIG[language] || { 
    color: '#6b7280', 
    category: 'System' as const, 
    icon: '⚪' 
  }
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
    >
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-3">
            <div 
              className="w-10 h-10 rounded-lg flex items-center justify-center text-white"
              style={{ backgroundColor: config.color }}
            >
              <span className="text-xl">{config.icon}</span>
            </div>
            <div>
              <h3 className="font-semibold text-slate-900 dark:text-white">
                {language}
              </h3>
              <p className="text-sm text-slate-600 dark:text-slate-400">
                {config.category}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-lg font-semibold text-slate-900 dark:text-white">
              {percentage.toFixed(1)}%
            </div>
            <div className="text-xs text-slate-600 dark:text-slate-400">
              {(bytes / 1024).toFixed(1)}KB
            </div>
          </div>
        </div>

        <div className="h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <motion.div
            initial={{ width: 0 }}
            whileInView={{ width: `${percentage}%` }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: delay + 0.1, ease: "easeOut" }}
            className="h-full rounded-full"
            style={{ backgroundColor: config.color }}
          />
        </div>
      </div>
    </motion.div>
  )
}

function StatsCard({ icon: Icon, label, value, color }: {
  icon: React.ComponentType<any>
  label: string
  value: string | number
  color: string
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4 text-center"
    >
      <div className={`inline-flex items-center justify-center w-10 h-10 rounded-lg ${color} mb-2`}>
        <Icon className="w-5 h-5 text-white" />
      </div>
      <div className="text-xl font-semibold text-slate-900 dark:text-white">
        {value}
      </div>
      <div className="text-sm text-slate-600 dark:text-slate-400">
        {label}
      </div>
    </motion.div>
  )
}

export function LanguageProgress() {
  const { languages, isLoading, error } = useGithubLanguages('nackyAir')

  if (isLoading) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-white/20 dark:border-slate-700/20 rounded-3xl shadow-2xl p-12">
          <div className="flex items-center justify-center">
            <div className="relative">
              <Loader2 className="h-12 w-12 animate-spin text-blue-600" />
              <div className="absolute inset-0 h-12 w-12 animate-ping rounded-full bg-blue-600/20"></div>
            </div>
            <span className="ml-4 text-xl text-slate-600 dark:text-slate-400 font-medium">
              言語統計を分析中...
            </span>
          </div>
        </div>
      </div>
    )
  }

  if (error) {
    return (
      <div className="max-w-6xl mx-auto">
        <div className="bg-red-50/90 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-3xl p-12 text-center backdrop-blur-xl">
          <div className="text-red-600 dark:text-red-400 text-6xl mb-6">⚠️</div>
          <h3 className="text-xl font-bold text-red-800 dark:text-red-200 mb-4">
            データの読み込みに失敗しました
          </h3>
          <p className="text-red-700 dark:text-red-300 mb-6">{error}</p>
          <button
            onClick={() => window.location.reload()}
            className="px-6 py-3 bg-red-600 hover:bg-red-700 text-white rounded-xl font-medium transition-colors shadow-lg"
          >
            再試行
          </button>
        </div>
      </div>
    )
  }

  const topLanguages = languages.slice(0, 5)
  const totalBytes = languages.reduce((acc, lang) => acc + lang.bytes, 0)
  const avgPercentage = languages.reduce((acc, lang) => acc + (lang.percentage || 0), 0) / languages.length

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
        className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8"
      >
        <StatsCard 
          icon={Code}
          label="Languages"
          value={languages.length}
          color="bg-blue-600"
        />
        <StatsCard 
          icon={TrendingUp}
          label="Avg Usage"
          value={`${avgPercentage.toFixed(1)}%`}
          color="bg-blue-600"
        />
        <StatsCard 
          icon={Database}
          label="Total Code"
          value={`${(totalBytes / 1024).toFixed(0)}KB`}
          color="bg-blue-600"
        />
        <StatsCard 
          icon={Code}
          label="Top Lang"
          value={languages[0]?.name || 'N/A'}
          color="bg-blue-600"
        />
      </motion.div>

      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="space-y-3"
      >
        {topLanguages.map((lang, index) => (
          <LanguageCard
            key={lang.name}
            language={lang.name}
            percentage={lang.percentage || 0}
            bytes={lang.bytes}
            delay={index * 0.05}
          />
        ))}
      </motion.div>

      {languages.length > 5 && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-6 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4"
        >
          <div className="text-center">
            <div className="text-base font-medium text-slate-900 dark:text-white mb-2">
              +{languages.length - 5} その他の言語
            </div>
            <div className="flex flex-wrap justify-center gap-2">
              {languages.slice(5).map((lang) => (
                <span 
                  key={lang.name}
                  className="px-2 py-1 bg-slate-100 dark:bg-slate-800 rounded text-sm text-slate-600 dark:text-slate-400"
                >
                  {lang.name} ({lang.percentage?.toFixed(1)}%)
                </span>
              ))}
            </div>
          </div>
        </motion.div>
      )}
    </div>
  )
}
