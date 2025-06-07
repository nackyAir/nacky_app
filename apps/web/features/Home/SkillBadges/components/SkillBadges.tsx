'use client'

import * as motion from 'framer-motion/client'
import { useState, useEffect } from 'react'

type SkillType = {
  name: string
  category: string
  level: number
  icon: string
  color: string
}

const SKILLS: SkillType[] = [
  { 
    name: 'React', 
    category: 'Frontend',
    level: 95,
    icon: '⚛️',
    color: 'from-blue-500 to-cyan-400'
  },
  { 
    name: 'TypeScript', 
    category: 'Language',
    level: 90,
    icon: '📘',
    color: 'from-blue-600 to-blue-800'
  },
  { 
    name: 'Next.js', 
    category: 'Framework',
    level: 88,
    icon: '⚡',
    color: 'from-slate-800 to-slate-600'
  },
  { 
    name: 'Tailwind CSS', 
    category: 'Styling',
    level: 92,
    icon: '🎨',
    color: 'from-cyan-500 to-teal-400'
  },
  { 
    name: 'Node.js', 
    category: 'Backend',
    level: 80,
    icon: '🟢',
    color: 'from-green-600 to-green-400'
  },
  { 
    name: 'Supabase', 
    category: 'Database',
    level: 85,
    icon: '🗄️',
    color: 'from-emerald-600 to-emerald-400'
  },
  { 
    name: 'Firebase', 
    category: 'Backend',
    level: 75,
    icon: '🔥',
    color: 'from-orange-500 to-yellow-400'
  },
  { 
    name: 'React Native', 
    category: 'Mobile',
    level: 70,
    icon: '📱',
    color: 'from-purple-600 to-blue-500'
  },
  { 
    name: 'Hono', 
    category: 'Framework',
    level: 75,
    icon: '🔥',
    color: 'from-red-500 to-pink-400'
  },
  { 
    name: 'NestJS', 
    category: 'Backend',
    level: 78,
    icon: '🦁',
    color: 'from-red-600 to-red-400'
  },
]

function SkillCard({ skill, delay }: { skill: SkillType; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="group"
    >
      <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-4 hover:border-slate-300 dark:hover:border-slate-700 transition-colors duration-200">
        <div className="flex items-center gap-3 mb-3">
          <span className="text-2xl">{skill.icon}</span>
          <div>
            <h3 className="font-semibold text-slate-900 dark:text-white">
              {skill.name}
            </h3>
            <p className="text-sm text-slate-600 dark:text-slate-400">
              {skill.category}
            </p>
          </div>
        </div>

        <div className="space-y-1">
          <div className="flex justify-between items-center">
            <span className="text-xs text-slate-600 dark:text-slate-400">
              Proficiency
            </span>
            <span className="text-xs font-medium text-slate-900 dark:text-white">
              {skill.level}%
            </span>
          </div>
          <div className="h-1.5 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.level}%` }}
              viewport={{ once: true }}
              transition={{ duration: 0.8, delay: delay + 0.2, ease: "easeOut" }}
              className="h-full bg-blue-600 dark:bg-blue-500 rounded-full"
            />
          </div>
        </div>
      </div>
    </motion.div>
  )
}

export function SkillBadges() {
  const [isMounted, setIsMounted] = useState(false)

  useEffect(() => {
    setIsMounted(true)
  }, [])

  return (
    <div className="max-w-6xl mx-auto">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6 }}
      >
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {SKILLS.map((skill, index) => (
            <SkillCard 
              key={skill.name} 
              skill={skill} 
              delay={index * 0.05} 
            />
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="mt-8 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-6"
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
            <div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {SKILLS.length}
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Technologies
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                3+
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Years Exp
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                {Math.round(SKILLS.reduce((acc, skill) => acc + skill.level, 0) / SKILLS.length)}%
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Avg Proficiency
              </div>
            </div>
            <div>
              <div className="text-2xl font-bold text-slate-900 dark:text-white">
                10+
              </div>
              <div className="text-sm text-slate-600 dark:text-slate-400">
                Projects
              </div>
            </div>
          </div>
        </motion.div>
      </motion.div>
    </div>
  )
}
