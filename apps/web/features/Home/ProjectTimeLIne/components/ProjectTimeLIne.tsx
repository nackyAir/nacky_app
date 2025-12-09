'use client'

import {
  ArrowRight,
  Award,
  Calendar,
  Code,
  ExternalLink,
} from '@repo/ui/icons/lucide'
import * as motion from 'framer-motion/client'
import Link from 'next/link'
import React from 'react'

import type { TimeLineItem } from '../type'

function SkillTag({ skill, index }: { skill: string; index: number }) {
  return (
    <span className="inline-flex items-center px-2.5 py-0.5 md:px-3 md:py-1 rounded-full text-[10px] md:text-xs font-medium bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700">
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
      transition={{
        duration: 0.5,
        delay: index * 0.1,
        ease: 'easeOut',
      }}
      className="group relative"
    >
      {/* Timeline connector */}
      <div className="absolute left-[15px] md:left-6 top-12 md:top-16 bottom-0 w-px bg-slate-200 dark:bg-slate-800"></div>

      {/* Main card */}
      <div className="relative flex gap-3 md:gap-8">
        {/* Timeline indicator */}
        <div className="relative flex flex-col items-center z-10 shrink-0">
          <div className="w-8 h-8 md:w-12 md:h-12 rounded-full bg-white dark:bg-slate-950 border-2 border-slate-200 dark:border-slate-800 flex items-center justify-center">
            <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-blue-600"></div>
          </div>
        </div>

        {/* Content card */}
        <div className="flex-1 pb-8 md:pb-12">
          <Link
            href={item.url || '#'}
            target={item.url ? '_blank' : undefined}
            className="block group/card"
          >
            <div className="bg-white dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-xl p-5 md:p-8 shadow-sm hover:shadow-md transition-all duration-300">
              {/* Header */}
              <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-3 md:gap-4 mb-4 md:mb-6">
                <div className="space-y-2 md:space-y-3">
                  {/* Period badge */}
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-slate-100 dark:bg-slate-800">
                    <Calendar className="w-3.5 h-3.5 md:w-4 md:h-4 text-slate-500 dark:text-slate-400" />
                    <span className="text-xs md:text-sm font-medium text-slate-700 dark:text-slate-300">
                      {item.period}
                    </span>
                  </div>

                  {/* Role badge */}
                  <div className="inline-flex items-center gap-2 px-2.5 py-1 rounded-md bg-blue-50 dark:bg-blue-900/20">
                    <Award className="w-3.5 h-3.5 md:w-4 md:h-4 text-blue-600 dark:text-blue-400" />
                    <span className="text-xs md:text-sm font-medium text-blue-700 dark:text-blue-300">
                      {item.role}
                    </span>
                  </div>
                </div>

                {/* External link indicator */}
                {item.url && (
                  <div className="absolute top-5 right-5 md:static flex items-center justify-center w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 group-hover/card:bg-blue-600 group-hover/card:text-white transition-colors duration-300">
                    <ExternalLink className="w-4 h-4" />
                  </div>
                )}
              </div>

              {/* Title */}
              <div className="mb-4 md:mb-6">
                <h3 className="text-xl md:text-2xl font-bold text-slate-900 dark:text-white mb-2 md:mb-3 group-hover/card:text-blue-600 dark:group-hover/card:text-blue-400 transition-colors duration-300 pr-8 md:pr-0">
                  {item.title}
                </h3>
                <div className="flex items-center gap-2 text-slate-600 dark:text-slate-400">
                  <Code className="w-3.5 h-3.5 md:w-4 md:h-4" />
                  <span className="text-xs md:text-sm font-medium">
                    {item.skills.length} Technologies Used
                  </span>
                  <ArrowRight className="w-3.5 h-3.5 md:w-4 md:h-4 transform group-hover/card:translate-x-1 transition-transform duration-200" />
                </div>
              </div>

              {/* Skills */}
              <div className="flex flex-wrap gap-1.5 md:gap-2 mb-4 md:mb-6">
                {item.skills.map((skill, skillIndex) => (
                  <SkillTag key={skillIndex} skill={skill} index={skillIndex} />
                ))}
              </div>

              {/* Description */}
              <div className="relative">
                <p className="text-slate-600 dark:text-slate-400 leading-relaxed text-sm md:text-base">
                  {item.description}
                </p>
              </div>
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
      {/* Projects */}
      <div className="space-y-4 md:space-y-8">
        {items.map((item, index) => (
          <ProjectCard key={index} item={item} index={index} />
        ))}
      </div>

      {/* End marker */}
      <motion.div
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="relative flex items-center justify-center ml-4 md:ml-6 mt-2 md:mt-4"
      >
        <div className="w-2 h-2 md:w-3 md:h-3 rounded-full bg-slate-300 dark:bg-slate-700"></div>
        <div className="ml-6 md:ml-8 px-4 py-2">
          <span className="text-xs md:text-sm font-medium text-slate-500 dark:text-slate-500">
            Journey Continues...
          </span>
        </div>
      </motion.div>
    </div>
  )
}
