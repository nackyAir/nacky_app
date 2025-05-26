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
      initial={{ opacity: 0, scale: 0.8, rotateY: -15 }}
      whileInView={{ opacity: 1, scale: 1, rotateY: 0 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.6, 
        delay, 
        ease: [0.25, 0.1, 0.25, 1],
        type: "spring",
        stiffness: 100
      }}
      whileHover={{ 
        scale: 1.05, 
        rotateY: 5,
        transition: { duration: 0.2 }
      }}
      className="group relative"
    >
      {/* Glow effect */}
      <div className={`absolute -inset-1 rounded-xl bg-gradient-to-r ${skill.color} opacity-0 group-hover:opacity-30 blur-sm transition-all duration-500`}></div>
      
      {/* Main card */}
      <div className="relative bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-white/20 dark:border-slate-700/20 rounded-xl p-6 shadow-xl group-hover:shadow-2xl transition-all duration-300">
        {/* Skill icon and name */}
        <div className="flex items-center gap-4 mb-4">
          <div className="text-3xl transform group-hover:scale-110 transition-transform duration-300">
            {skill.icon}
          </div>
          <div>
            <h3 className="font-bold text-lg text-slate-900 dark:text-white group-hover:text-transparent group-hover:bg-gradient-to-r group-hover:bg-clip-text transition-all duration-300" 
                style={{ 
                  backgroundImage: skill.color.includes('from-') 
                    ? `linear-gradient(to right, var(--tw-gradient-stops))` 
                    : undefined 
                }}>
              {skill.name}
            </h3>
            <p className="text-sm text-slate-500 dark:text-slate-400 font-medium">
              {skill.category}
            </p>
          </div>
        </div>

        {/* Skill level */}
        <div className="space-y-2">
          <div className="flex justify-between items-center">
            <span className="text-sm font-medium text-slate-600 dark:text-slate-300">
              Proficiency
            </span>
            <span className="text-sm font-bold text-slate-900 dark:text-white">
              {skill.level}%
            </span>
          </div>
          <div className="relative h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              whileInView={{ width: `${skill.level}%` }}
              viewport={{ once: true }}
              transition={{ duration: 1, delay: delay + 0.3, ease: "easeOut" }}
              className={`h-full rounded-full bg-gradient-to-r ${skill.color} relative`}
            >
              <div className="absolute inset-0 bg-white/20 animate-pulse"></div>
            </motion.div>
          </div>
        </div>

        {/* Decorative corner */}
        <div className="absolute top-4 right-4 w-3 h-3 rounded-full bg-gradient-to-r from-blue-500 to-indigo-500 opacity-60 group-hover:opacity-100 transition-opacity duration-300"></div>
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
    <div className="relative">
      {/* Background decoration */}
      <div className="absolute inset-0 bg-gradient-to-r from-blue-50/50 via-indigo-50/30 to-purple-50/50 dark:from-slate-900/30 dark:via-slate-800/30 dark:to-slate-900/50 rounded-3xl blur-3xl"></div>
      
      <div className="relative max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
          className="relative"
        >
          {/* Tech grid background - only render on client */}
          {isMounted && (
            <div className="absolute inset-0 opacity-5 dark:opacity-10">
              <div className="grid grid-cols-8 gap-4 h-full">
                {Array.from({ length: 32 }).map((_, i) => (
                  <div key={i} className="bg-blue-500 rounded opacity-20"></div>
                ))}
              </div>
            </div>
          )}

          {/* Skills grid */}
          <div className="relative grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 p-8">
            {SKILLS.map((skill, index) => (
              <SkillCard 
                key={skill.name} 
                skill={skill} 
                delay={index * 0.08} 
              />
            ))}
          </div>

          {/* Stats summary */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mt-12 bg-white/80 dark:bg-slate-900/80 backdrop-blur-xl border border-white/20 dark:border-slate-700/20 rounded-2xl p-8 shadow-xl"
          >
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
              <div>
                <div className="text-3xl font-black text-blue-600 dark:text-blue-400">
                  {SKILLS.length}
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                  Technologies
                </div>
              </div>
              <div>
                <div className="text-3xl font-black text-indigo-600 dark:text-indigo-400">
                  3+
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                  Years Exp
                </div>
              </div>
              <div>
                <div className="text-3xl font-black text-purple-600 dark:text-purple-400">
                  {Math.round(SKILLS.reduce((acc, skill) => acc + skill.level, 0) / SKILLS.length)}%
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                  Avg Proficiency
                </div>
              </div>
              <div>
                <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
                  10+
                </div>
                <div className="text-sm text-slate-600 dark:text-slate-400 font-medium">
                  Projects
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
