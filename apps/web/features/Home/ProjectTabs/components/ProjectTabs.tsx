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
    <motion.button
      onClick={onClick}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className={`
        relative flex-1 rounded-2xl p-8 text-left transition-all duration-300
        ${isActive 
          ? 'bg-white dark:bg-slate-900 shadow-2xl border border-blue-200 dark:border-blue-800' 
          : 'bg-white/60 dark:bg-slate-900/60 hover:bg-white/80 dark:hover:bg-slate-900/80 border border-transparent'
        }
      `}
    >
      {/* Glow effect for active tab */}
      {isActive && (
        <div className="absolute -inset-1 rounded-2xl bg-gradient-to-r from-blue-600/20 via-indigo-600/20 to-purple-600/20 blur-xl"></div>
      )}
      
      {/* Content */}
      <div className="relative">
        <div className="flex items-center gap-4 mb-3">
          <div className={`
            p-3 rounded-xl transition-all duration-300
            ${isActive 
              ? 'bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg' 
              : 'bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400'
            }
          `}>
            <tab.icon className="w-6 h-6" />
          </div>
          <div>
            <h3 className={`
              font-bold text-lg transition-colors duration-300
              ${isActive 
                ? 'text-slate-900 dark:text-white' 
                : 'text-slate-700 dark:text-slate-300'
              }
            `}>
              {tab.label}
            </h3>
            <div className="flex items-center gap-2">
              <span className={`
                text-sm transition-colors duration-300
                ${isActive 
                  ? 'text-slate-600 dark:text-slate-400' 
                  : 'text-slate-500 dark:text-slate-500'
                }
              `}>
                {tab.description}
              </span>
              <span className={`
                px-2 py-1 rounded-full text-xs font-bold transition-all duration-300
                ${isActive
                  ? 'bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300'
                  : 'bg-slate-100 text-slate-600 dark:bg-slate-800 dark:text-slate-400'
                }
              `}>
                {tab.count}
              </span>
            </div>
          </div>
        </div>
        
        {/* Active indicator */}
        {isActive && (
          <motion.div
            layoutId="activeTabIndicator"
            className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 rounded-full"
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
          />
        )}
      </div>
    </motion.button>
  )
}

function ProjectsHeader({ activeTab }: { activeTab: TabType }) {
  const currentTab = tabs.find(tab => tab.id === activeTab)
  
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      className="text-center mb-12"
    >
      <div className="inline-flex items-center gap-3 mb-4">
        <div className="p-2 rounded-xl bg-gradient-to-r from-blue-600 to-indigo-600 text-white">
          {currentTab && <currentTab.icon className="w-6 h-6" />}
        </div>
        <h3 className="text-2xl font-bold text-slate-900 dark:text-white">
          {currentTab?.label}
        </h3>
      </div>
      <p className="text-slate-600 dark:text-slate-400 max-w-2xl mx-auto">
        {currentTab?.description}を通じて培った技術力と創造性をご紹介します
      </p>
    </motion.div>
  )
}

export function ProjectTabs() {
  const [activeTab, setActiveTab] = useState<TabType>('personal')

  return (
    <div className="relative max-w-7xl mx-auto">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/30 via-indigo-50/20 to-purple-50/30 dark:from-slate-900/20 dark:via-slate-800/20 dark:to-slate-900/30 rounded-3xl blur-3xl"></div>
      
      <div className="relative">
        {/* Enhanced Tab Navigation */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="flex flex-col md:flex-row gap-6 mb-16"
        >
          {tabs.map((tab) => (
            <TabButton
              key={tab.id}
              tab={tab}
              isActive={activeTab === tab.id}
              onClick={() => setActiveTab(tab.id)}
            />
          ))}
        </motion.div>

        {/* Projects Header */}
        <ProjectsHeader activeTab={activeTab} />

        {/* Enhanced Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 40, scale: 0.95 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, ease: [0.25, 0.1, 0.25, 1] }}
          className="relative"
        >
          {/* Content background */}
          <div className="absolute inset-0 bg-white/40 dark:bg-slate-900/40 rounded-3xl backdrop-blur-sm"></div>
          
          {/* Content */}
          <div className="relative p-8">
            {activeTab === 'personal' && <Timeline items={personalProjects} />}
            {activeTab === 'client' && <Timeline items={clientProjects} />}
          </div>
        </motion.div>

        {/* Stats summary */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/20 rounded-xl p-6 text-center shadow-xl">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-blue-600 mb-3">
              <Code2 className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white mb-1">
              {personalProjects.length + clientProjects.length}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">
              Total Projects
            </div>
          </div>
          
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/20 rounded-xl p-6 text-center shadow-xl">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-indigo-600 mb-3">
              <Briefcase className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white mb-1">
              {clientProjects.length}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">
              Client Work
            </div>
          </div>
          
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/20 rounded-xl p-6 text-center shadow-xl">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-purple-600 mb-3">
              <User className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white mb-1">
              {personalProjects.length}
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">
              Personal
            </div>
          </div>
          
          <div className="bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/20 rounded-xl p-6 text-center shadow-xl">
            <div className="inline-flex items-center justify-center w-12 h-12 rounded-xl bg-emerald-600 mb-3">
              <Sparkles className="w-6 h-6 text-white" />
            </div>
            <div className="text-2xl font-black text-slate-900 dark:text-white mb-1">
              3+
            </div>
            <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">
              Years Exp
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
