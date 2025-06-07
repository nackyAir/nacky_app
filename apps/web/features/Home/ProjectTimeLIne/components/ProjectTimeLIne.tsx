'use client'

import React from 'react'
import Link from 'next/link'
import * as motion from 'framer-motion/client'
import { ExternalLink, Calendar, Code, Award, ArrowRight } from '@repo/ui/icons/lucide'

import { TimeLineItem } from '../type'

function SkillTag({ skill, index }: { skill: string; index: number }) {
  return (
    <span className="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-slate-100 text-slate-700 dark:bg-slate-800 dark:text-slate-300">
      {skill}
    </span>
  )
}

function ProjectCard({ item, index }: { item: TimeLineItem; index: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      className="relative"
    >
      <div className="absolute left-6 top-20 bottom-0 w-px bg-slate-200 dark:bg-slate-700"></div>
      
      <div className="relative flex gap-6">
        <div className="relative flex flex-col items-center z-10">
          <div className="w-12 h-12 rounded-full bg-blue-600 flex items-center justify-center">
            <div className="w-4 h-4 rounded-full bg-white"></div>
          </div>
        </div>

        <div className="flex-1 pb-8">
          <Link 
            href={item.url || '#'} 
            target={item.url ? "_blank" : undefined}
            className="block group"
          >
            <div className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-lg p-6 hover:border-slate-300 dark:hover:border-slate-700 transition-colors duration-200">
              <div className="flex flex-col lg:flex-row lg:items-start lg:justify-between gap-4 mb-4">
                <div className="space-y-2">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-slate-100 dark:bg-slate-800">
                    <Calendar className="w-3 h-3 text-slate-600 dark:text-slate-400" />
                    <span className="text-sm text-slate-700 dark:text-slate-300">
                      {item.period}
                    </span>
                  </div>
                  
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded bg-blue-100 dark:bg-blue-900/30">
                    <Award className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                    <span className="text-sm text-blue-700 dark:text-blue-300">
                      {item.role}
                    </span>
                  </div>
                </div>

                {item.url && (
                  <div className="flex items-center justify-center w-8 h-8 rounded bg-blue-600 text-white">
                    <ExternalLink className="w-3 h-3" />
                  </div>
                )}
              </div>

              <div className="mb-4">
                <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
                  {item.title}
                </h3>
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <Code className="w-4 h-4" />
                  <span className="text-sm">
                    {item.skills.length} Technologies Used
                  </span>
                </div>
              </div>

              <div className="flex flex-wrap gap-2 mb-4">
                {item.skills.map((skill, skillIndex) => (
                  <SkillTag key={skillIndex} skill={skill} index={skillIndex} />
                ))}
              </div>

              <p className="text-slate-600 dark:text-slate-300 leading-relaxed">
                {item.description}
              </p>
            </div>
          </Link>
        </div>
      </div>
    </motion.div>
  )
}

export function Timeline({ items }: { items: Array<TimeLineItem> }) {
  return (
    <div className="relative">
      <div className="absolute left-6 top-0 bottom-0 w-px bg-slate-200 dark:bg-slate-700"></div>
      
      <div className="space-y-8">
        {items.map((item, index) => (
          <ProjectCard key={index} item={item} index={index} />
        ))}
      </div>

      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: items.length * 0.05 }}
        className="relative flex items-center ml-6 mt-6"
      >
        <div className="w-6 h-6 rounded-full bg-blue-600 flex items-center justify-center">
          <div className="w-2 h-2 rounded-full bg-white"></div>
        </div>
        <div className="ml-6 px-3 py-1 rounded bg-slate-100 dark:bg-slate-800">
          <span className="text-sm text-slate-600 dark:text-slate-400">
            Journey Continues...
          </span>
        </div>
      </motion.div>
    </div>
  )
}
