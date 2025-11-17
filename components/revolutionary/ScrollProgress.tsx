'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { useRef } from 'react'

const chapters = [
  { id: 1, name: 'Intro', label: 'Benvenuto' },
  { id: 2, name: 'Heritage', label: 'Tradizione' },
  { id: 3, name: 'Excellence', label: 'Eccellenza' },
  { id: 4, name: 'Facilities', label: 'Strutture' },
  { id: 5, name: 'Experience', label: 'Esperienza' },
  { id: 6, name: 'Community', label: 'Community' },
  { id: 7, name: 'Decision', label: 'Unisciti' },
]

export default function ScrollProgress() {
  const { scrollYProgress } = useScroll()

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden min-[1920px]:flex flex-col gap-6">
      {/* Progress Line */}
      <div className="absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px] bg-white/10">
        <motion.div
          style={{ scaleY: scrollYProgress }}
          className="w-full h-full bg-gradient-to-b from-primary via-secondary to-primary origin-top"
        />
      </div>

      {/* Chapter Markers */}
      {chapters.map((chapter, index) => {
        const start = index / chapters.length
        const end = (index + 1) / chapters.length
        const opacity = useTransform(
          scrollYProgress,
          [start - 0.05, start, end, end + 0.05],
          [0.3, 1, 1, 0.3]
        )
        const scale = useTransform(
          scrollYProgress,
          [start - 0.05, start, end, end + 0.05],
          [0.8, 1.2, 1.2, 0.8]
        )

        return (
          <motion.div
            key={chapter.id}
            style={{ opacity, scale }}
            className="relative flex items-center gap-4 cursor-pointer group"
            onClick={() => {
              const targetScroll = (index / (chapters.length - 1)) * document.documentElement.scrollHeight
              window.scrollTo({ top: targetScroll, behavior: 'smooth' })
            }}
          >
            {/* Dot */}
            <motion.div
              className="w-3 h-3 rounded-full bg-white border-2 border-secondary relative z-10"
              whileHover={{ scale: 1.5 }}
            >
              <motion.div
                animate={{
                  scale: [1, 1.2, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-full bg-secondary"
              />
            </motion.div>

            {/* Label */}
            <motion.div
              initial={{ opacity: 0, x: -10 }}
              whileHover={{ opacity: 1, x: 0 }}
              className="absolute right-full mr-4 px-4 py-2 rounded-lg bg-black/80 backdrop-blur-xl border border-white/20 whitespace-nowrap"
            >
              <div className="text-xs text-white/60 uppercase tracking-wider mb-1">
                Chapter {chapter.id}
              </div>
              <div className="text-sm font-bold text-white">{chapter.label}</div>
            </motion.div>
          </motion.div>
        )
      })}
    </div>
  )
}
