'use client'

import { useState } from 'react'
import * as motion from 'framer-motion/client'
import { Briefcase, User, Code2, Sparkles } from '@repo/ui/icons/lucide'

import {
  Timeline,
  clientProjects,
  personalProjects,
} from '~/features/Home/ProjectTimeLIne'

type TabType = 'personal' | 'client'

const tabs: Array<{ 
  id: TabType; 
  label: string; 
  icon: React.ComponentType<any>;
  description: string;
  count: number;
}> = [
  { 
    id: 'personal', 
    label: '個人プロジェクト',
    icon: User,
    description: '自主的な技術探求とイノベーション',
    count: personalProjects.length
  },
  { 
    id: 'client', 
    label: '受託開発・インターン',
    icon: Briefcase,
    description: '実務経験とチーム開発の実績',
    count: clientProjects.length
  },
]

function TabButton({ tab, isActive, onClick }: {
  tab: typeof tabs[0]
  isActive: boolean
  onClick: () => void
}) {
  return (
    <button
      onClick={onClick}
      className={`
        relative flex-1 rounded-xl p-4 md:p-6 text-left transition-all duration-200
        ${isActive 
          ? 'bg-white dark:bg-slate-950 shadow-sm border border-slate-200 dark:border-slate-800' 
          : 'bg-slate-50 dark:bg-slate-900 hover:bg-slate-100 dark:hover:bg-slate-800 border border-transparent'
        }
      `}
    >
      {/* Content */}
      <div className="relative">
        <div className="flex items-center gap-3 md:gap-4 mb-2">
          <div className={`
            p-2 rounded-lg transition-colors duration-200
            ${isActive 
              ? 'bg-blue-600 text-white' 
              : 'bg-slate-200 dark:bg-slate-800 text-slate-500 dark:text-slate-400'
            }
          `}>
            <tab.icon className="w-4 h-4 md:w-5 md:h-5" />
          </div>
          <div>
            <h3 className={`
              font-bold text-base md:text-lg transition-colors duration-200
              ${isActive 
                ? 'text-slate-900 dark:text-white' 
                : 'text-slate-600 dark:text-slate-400'
              }
            `}>
              {tab.label}
            </h3>
          </div>
        </div>
        
        <div className="flex items-center gap-2 pl-1">
          <span className={`
            text-xs md:text-sm transition-colors duration-200 line-clamp-1
            ${isActive 
              ? 'text-slate-600 dark:text-slate-400' 
              : 'text-slate-500 dark:text-slate-500'
            }
          `}>
            {tab.description}
          </span>
          <span className={`
            px-2 py-0.5 rounded-full text-[10px] md:text-xs font-medium transition-all duration-200
            ${isActive
              ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
              : 'bg-slate-200 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
            }
          `}>
            {tab.count}
          </span>
        </div>
      </div>
    </button>
  )
}

function ProjectsHeader({ activeTab }: { activeTab: TabType }) {
  const currentTab = tabs.find(tab => tab.id === activeTab)
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="text-center mb-8 md:mb-12"
    >
      <div className="inline-flex items-center gap-3 mb-3">
        <div className="p-2 rounded-lg bg-blue-600 text-white">
          {currentTab && <currentTab.icon className="w-5 h-5" />}
        </div>
        <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white">
          {currentTab?.label}
        </h3>
      </div>
      <p className="text-sm md:text-base text-slate-600 dark:text-slate-400 max-w-2xl mx-auto px-4">
        {currentTab?.description}を通じて培った技術力と創造性をご紹介します
      </p>
    </motion.div>
  )
}

export function ProjectTabs() {
  const [activeTab, setActiveTab] = useState<TabType>('personal')

  return (
    <div className="relative max-w-7xl mx-auto">
      <div className="relative">
        {/* Tab Navigation */}
        <div className="flex flex-col md:flex-row gap-3 md:gap-4 mb-8 md:mb-12">
          {tabs.map((tab) => (
            <TabButton
              key={tab.id}
              tab={tab}
              isActive={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
            />
          ))}
        </div>

        {/* Projects Header */}
        <ProjectsHeader activeTab={activeTab} />

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative"
        >
          <div className="relative">
            {activeTab === 'personal' && <Timeline items={personalProjects} />}
            {activeTab === 'client' && <Timeline items={clientProjects} />}
          </div>
        </motion.div>

        {/* Stats summary */}
        <div className="mt-12 md:mt-16 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-6">
          <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4 md:p-6 text-center shadow-sm">
            <div className="inline-flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-lg bg-blue-600 mb-2 md:mb-3">
              <Code2 className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </div>
            <div className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-1">
              {personalProjects.length + clientProjects.length}
            </div>
            <div className="text-xs md:text-sm text-slate-600 dark:text-slate-400">
              Total Projects
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4 md:p-6 text-center shadow-sm">
            <div className="inline-flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-lg bg-indigo-600 mb-2 md:mb-3">
              <Briefcase className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </div>
            <div className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-1">
              {clientProjects.length}
            </div>
            <div className="text-xs md:text-sm text-slate-600 dark:text-slate-400">
              Client Work
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4 md:p-6 text-center shadow-sm">
            <div className="inline-flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-lg bg-purple-600 mb-2 md:mb-3">
              <User className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </div>
            <div className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-1">
              {personalProjects.length}
            </div>
            <div className="text-xs md:text-sm text-slate-600 dark:text-slate-400">
              Personal
            </div>
          </div>
          
          <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-4 md:p-6 text-center shadow-sm">
            <div className="inline-flex items-center justify-center w-8 h-8 md:w-10 md:h-10 rounded-lg bg-emerald-600 mb-2 md:mb-3">
              <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-white" />
            </div>
            <div className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-1">
              3+
            </div>
            <div className="text-xs md:text-sm text-slate-600 dark:text-slate-400">
              Years Exp
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
