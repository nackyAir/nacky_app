'use client'

import React from 'react'

import Link from 'next/link'

import { Badge } from '@repo/ui/components/badge'
import { Card } from '@repo/ui/components/card'
import { CircleDot } from '@repo/ui/icon/lucide'
import { motion } from 'framer-motion'

import { TimeLineItem } from '../type'

export function Timeline({ items }: { items: Array<TimeLineItem> }) {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.3 }}
      className="mt-8 space-y-8"
    >
      {items.map((item, index) => (
        <motion.div
          key={index}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 0.5,
            delay: index * 0.1,
            ease: 'easeOut',
          }}
          className="group relative flex gap-6"
        >
          <div className="flex flex-col items-center">
            <motion.div
              className="border-foreground/20 bg-background flex h-10 w-10 items-center justify-center rounded-full border-2"
              whileHover={{ scale: 1.1 }}
              transition={{ type: 'spring', stiffness: 300 }}
            >
              <CircleDot className="text-foreground/70 h-5 w-5" />
            </motion.div>
            <div className="bg-foreground/10 absolute top-10 h-full w-px" />
          </div>

          <motion.div
            whileHover={{ y: -5 }}
            transition={{ type: 'spring', stiffness: 300 }}
            className="flex-1"
          >
            <Card className="border-border border p-5 transition-all duration-300 hover:shadow-lg">
              <Link href={item.url || ''} target="_blank">
                <div className="flex flex-col space-y-3">
                  <div className="flex items-center justify-between">
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      className="bg-foreground text-background rounded-full px-3 py-1 text-sm font-medium"
                    >
                      {item.period}
                    </motion.span>
                    <span className="text-foreground/70 text-sm font-medium">
                      {item.role}
                    </span>
                  </div>

                  <h3 className="text-foreground text-lg font-semibold">
                    {item.title}
                  </h3>

                  <div className="flex flex-wrap gap-2">
                    {item.skills.map((skill, skillIndex) => (
                      <motion.div
                        key={skillIndex}
                        whileHover={{ scale: 1.05 }}
                        transition={{ type: 'spring', stiffness: 300 }}
                      >
                        <Badge
                          variant="secondary"
                          className="bg-muted text-foreground/80 hover:bg-muted/80"
                        >
                          {skill}
                        </Badge>
                      </motion.div>
                    ))}
                  </div>

                  <p className="text-foreground/70 pt-1 text-sm leading-relaxed">
                    {item.description}
                  </p>
                </div>
              </Link>
            </Card>
          </motion.div>
        </motion.div>
      ))}
    </motion.div>
  )
}
