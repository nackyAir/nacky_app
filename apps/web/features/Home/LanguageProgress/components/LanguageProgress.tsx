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
      initial={{ opacity: 0, x: -30, scale: 0.9 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.6, 
        delay, 
        ease: [0.25, 0.1, 0.25, 1],
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        scale: 1.02,
        x: 10,
        transition: { duration: 0.2 }
      }}
      className="group relative"
    >
      {/* Glow effect */}
      <div 
        className="absolute -inset-2 rounded-2xl opacity-0 group-hover:opacity-30 blur-xl transition-all duration-500"
        style={{ backgroundColor: config.color }}
      ></div>
      
      {/* Main card */}
      <div className="relative bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-white/20 dark:border-slate-700/20 rounded-2xl p-6 shadow-xl group-hover:shadow-2xl transition-all duration-300">
        {/* Language header */}
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center gap-4">
            <div className="relative">
              {/* Icon background */}
              <div 
                className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold shadow-lg"
                style={{ backgroundColor: config.color }}
              >
                <span className="text-2xl">{config.icon}</span>
              </div>
              {/* Pulse effect */}
              <div 
                className="absolute inset-0 rounded-xl opacity-20 animate-ping"
                style={{ backgroundColor: config.color }}
              ></div>
            </div>
            <div>
              <h3 className="font-bold text-lg text-slate-900 dark:text-white">
                {language}
              </h3>
              <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
                {config.category}
              </p>
            </div>
          </div>
          <div className="text-right">
            <div className="text-2xl font-black text-slate-900 dark:text-white">
              {percentage.toFixed(1)}%
            </div>
            <div className="text-xs text-slate-500 dark:text-slate-400 font-medium">
              {(bytes / 1024).toFixed(1)}KB
            </div>
          </div>
        </div>

        {/* Progress bar */}
        <div className="space-y-2">
          <div className="relative h-3 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${percentage}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1.2, delay: delay + 0.2, ease: "easeOut" }}
              className="h-full rounded-full relative"
              style={{ backgroundColor: config.color }}
            >
              {/* Shimmer effect */}
              <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent animate-pulse"></div>
              {/* Highlight */}
              <div className="absolute top-0 left-0 right-0 h-1 bg-white/40 rounded-full"></div>
            </motion.div>
          </div>
        </div>

        {/* Category badge */}
        <div className="absolute top-4 right-4">
          <div 
            className="px-2 py-1 rounded-full text-xs font-bold text-white"
            style={{ backgroundColor: `${config.color}80` }}
          >
            {config.category}
          </div>
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
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, type: "spring", stiffness: 100 }}
      whileHover={{ scale: 1.05 }}
      className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/20 rounded-xl p-6 text-center shadow-xl"
    >
      <div className={`inline-flex items-center justify-center w-12 h-12 rounded-xl ${color} mb-3`}>
        <Icon className="w-6 h-6 text-white" />
      </div>
      <div className="text-2xl font-black text-slate-900 dark:text-white mb-1">
        {value}
      </div>
      <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">
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
    <div className="relative max-w-6xl mx-auto">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 via-indigo-50/30 to-purple-50/50 dark:from-slate-900/30 dark:via-slate-800/30 dark:to-slate-900/50 rounded-3xl blur-3xl"></div>
      
      <div className="relative">
        {/* Stats overview */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-6 mb-12"
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
            color="bg-indigo-600"
          />
          <StatsCard 
            icon={Database}
            label="Total Code"
            value={`${(totalBytes / 1024).toFixed(0)}KB`}
            color="bg-purple-600"
          />
          <StatsCard 
            icon={Code}
            label="Top Lang"
            value={languages[0]?.name || 'N/A'}
            color="bg-emerald-600"
          />
        </motion.div>

        {/* Language cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
          className="space-y-4"
        >
          {topLanguages.map((lang, index) => (
            <LanguageCard
              key={lang.name}
              language={lang.name}
              percentage={lang.percentage || 0}
              bytes={lang.bytes}
              delay={index * 0.1}
            />
          ))}
        </motion.div>

        {/* Additional languages summary */}
        {languages.length > 5 && (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.8 }}
            className="mt-8 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/20 rounded-2xl p-6 shadow-xl"
          >
            <div className="text-center">
              <div className="text-lg font-semibold text-slate-900 dark:text-white mb-2">
                +{languages.length - 5} その他の言語
              </div>
              <div className="flex flex-wrap justify-center gap-2">
                {languages.slice(5).map((lang) => (
                  <span 
                    key={lang.name}
                    className="px-3 py-1 bg-slate-100 dark:bg-slate-800 rounded-full text-sm text-slate-600 dark:text-slate-400"
                  >
                    {lang.name} ({lang.percentage?.toFixed(1)}%)
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  )
}
