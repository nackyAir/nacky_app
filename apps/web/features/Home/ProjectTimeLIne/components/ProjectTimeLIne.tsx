'use client'

import React from 'react'
import Link from 'next/link'
import * as motion from 'framer-motion/client'
import { ExternalLink, Calendar, Code, Award, ArrowRight } from '@repo/ui/icons/lucide'

import { TimeLineItem } from '../type'

function SkillTag({ skill, index }: { skill: string; index: number }) {
  const colors = [
    'from-blue-500 to-cyan-400',
    'from-indigo-500 to-purple-400',
    'from-purple-500 to-pink-400',
    'from-emerald-500 to-teal-400',
    'from-orange-500 to-red-400',
    'from-rose-500 to-pink-400',
    'from-cyan-500 to-blue-400',
    'from-amber-500 to-orange-400',
  ]
  
  const colorClass = colors[index % colors.length]
  
  return (
    <motion.span
      initial={{ opacity: 0, scale: 0.8 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay: index * 0.05 }}
      whileHover={{ scale: 1.1 }}
      className={`inline-flex items-center px-3 py-1.5 rounded-full text-xs font-bold text-white bg-gradient-to-r ${colorClass} shadow-lg hover:shadow-xl transition-all duration-200`}
    >
      {skill}
    </motion.span>
  )
}

function ProjectCard({ item, index }: { item: TimeLineItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, x: index % 2 === 0 ? -50 : 50, scale: 0.9 }}
      whileInView={{ opacity: 1, x: 0, scale: 1 }}
      viewport={{ once: true }}
      transition={{ 
        duration: 0.8, 
        delay: index * 0.15, 
        ease: [0.25, 0.1, 0.25, 1],
        type: "spring",
        stiffness: 100
      }}
      className="group relative"
    >
      {/* Glow effect */}
      <div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-blue-600/10 via-indigo-600/10 to-purple-600/10 opacity-0 group-hover:opacity-100 blur-2xl transition-all duration-500"></div>
      
      {/* Timeline connector */}
      <div className="absolute left-6 top-20 bottom-0 w-px bg-gradient-to-b from-blue-400 via-indigo-400 to-transparent"></div>
      
      {/* Main card */}
      <div className="relative flex gap-8">
        {/* Timeline indicator */}
        <div className="relative flex flex-col items-center z-10">
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
            className="relative"
          >
            {/* Outer ring */}
            <div className="w-12 h-12 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 p-0.5">
              <div className="w-full h-full rounded-full bg-white dark:bg-slate-900 flex items-center justify-center">
                <div className="w-6 h-6 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600"></div>
              </div>
            </div>
            {/* Pulse animation */}
            <div className="absolute inset-0 w-12 h-12 rounded-full bg-gradient-to-r from-blue-600/30 to-indigo-600/30 animate-ping"></div>
          </motion.div>
        </div>

        {/* Content card */}
        <div className="flex-1 pb-12">
          <Link 
            href={item.url || '#'} 
            target={item.url ? "_blank" : undefined}
            className="block group/card"
          >
            <motion.div
              whileHover={{ scale: 1.02, y: -5 }}
              transition={{ duration: 0.2 }}
              className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl border border-white/20 dark:border-slate-700/20 rounded-3xl p-8 shadow-2xl group-hover/card:shadow-3xl transition-all duration-300"
            >
              {/* Header */}
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-6">
                <div className="space-y-3">
                  {/* Period badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700">
                    <Calendar className="w-4 h-4 text-slate-600 dark:text-slate-400" />
                    <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                      {item.period}
                    </span>
                  </div>
                  
                  {/* Role badge */}
                  <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-blue-100 to-indigo-100 dark:from-blue-900/30 dark:to-indigo-900/30">
                    <Award className="w-4 h-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm font-bold text-blue-700 dark:text-blue-300">
                      {item.role}
                    </span>
                  </div>
                </div>

                {/* External link indicator */}
                {item.url && (
                  <motion.div
                    whileHover={{ scale: 1.1, rotate: 5 }}
                    className="flex items-center justify-center w-10 h-10 rounded-full bg-gradient-to-r from-blue-600 to-indigo-600 text-white shadow-lg group-hover/card:shadow-xl"
                  >
                    <ExternalLink className="w-4 h-4" />
                  </motion.div>
                )}
              </div>

              {/* Title */}
              <div className="mb-6">
                <h3 className="text-2xl lg:text-3xl font-black text-slate-900 dark:text-white mb-3 group-hover/card:text-transparent group-hover/card:bg-gradient-to-r group-hover/card:from-blue-600 group-hover/card:via-indigo-600 group-hover/card:to-purple-600 group-hover/card:bg-clip-text transition-all duration-300">
                  {item.title}
                </h3>
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <Code className="w-4 h-4" />
                  <span className="text-sm font-medium">
                    {item.skills.length} Technologies Used
                  </span>
                  <ArrowRight className="w-4 h-4 transform group-hover/card:translate-x-1 transition-transform duration-200" />
                </div>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-3 mb-6">
                {item.skills.map((skill, skillIndex) => (
                  <SkillTag key={skillIndex} skill={skill} index={skillIndex} />
                ))}
              </div>

              {/* Description */}
              <div className="relative">
                <div className="absolute -left-4 top-0 w-1 h-full bg-gradient-to-b from-blue-600 via-indigo-600 to-purple-600 rounded-full"></div>
                <p className="text-slate-600 dark:text-slate-300 leading-relaxed text-lg font-medium pl-6">
                  {item.description}
                </p>
              </div>

              {/* Hover effect overlay */}
              <div className="absolute inset-0 rounded-3xl bg-gradient-to-r from-blue-500/0 via-indigo-500/0 to-purple-500/0 group-hover/card:from-blue-500/5 group-hover/card:via-indigo-500/5 group-hover/card:to-purple-500/5 transition-all duration-300"></div>
            </motion.div>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export function Timeline({ items }: { items: Array<TimeLineItem> }) {
  return (
    <div className="relative">
      {/* Background decoration */}
      <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-transparent via-slate-200 dark:via-slate-700 to-transparent"></div>
      
      {/* Projects */}
      <div className="space-y-16">
        {items.map((item, index) => (
          <ProjectCard key={index} item={item} index={index} />
        ))}
      </div>

      {/* End marker */}
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: items.length * 0.1 }}
        className="relative flex items-center justify-center ml-6 mt-8"
      >
        <div className="w-8 h-8 rounded-full bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center">
          <div className="w-3 h-3 rounded-full bg-white dark:bg-slate-900"></div>
        </div>
        <div className="ml-8 px-4 py-2 rounded-full bg-gradient-to-r from-slate-100 to-slate-200 dark:from-slate-800 dark:to-slate-700">
          <span className="text-sm font-semibold text-slate-600 dark:text-slate-400">
            Journey Continues...
          </span>
        </div>
      </motion.div>
    </div>
  )
}
