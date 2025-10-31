'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'

const chapters = [
  'Intro',
  'Tradizione',
  'Eccellenza',
  'Strutture',
  'Esperienza',
  'Famiglia',
  'Unisciti'
]

export default function ScrollIndicator() {
  const [activeChapter, setActiveChapter] = useState(0)

  useEffect(() => {
    const handleScroll = () => {
      const scrollPercentage = window.scrollY / (document.documentElement.scrollHeight - window.innerHeight)
      const chapterIndex = Math.min(
        Math.floor(scrollPercentage * chapters.length),
        chapters.length - 1
      )
      setActiveChapter(chapterIndex)
    }

    window.addEventListener('scroll', handleScroll)
    handleScroll()

    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  const scrollToChapter = (index: number) => {
    const targetScroll = (index / (chapters.length - 1)) * (document.documentElement.scrollHeight - window.innerHeight)
    window.scrollTo({ top: targetScroll, behavior: 'smooth' })
  }

  return (
    <div className="fixed right-8 top-1/2 -translate-y-1/2 z-50 hidden xl:flex flex-col gap-3">
      {/* Active Chapter Label */}
      <motion.div
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        className="absolute right-full mr-6 top-1/2 -translate-y-1/2 px-4 py-2 rounded-xl bg-black/80 backdrop-blur-xl border border-white/20"
      >
        <div className="text-xs text-white/60 uppercase tracking-wider mb-1">
          {String(activeChapter + 1).padStart(2, '0')} / {String(chapters.length).padStart(2, '0')}
        </div>
        <div className="text-sm font-bold text-white">{chapters[activeChapter]}</div>
      </motion.div>

      {/* Dots */}
      {chapters.map((chapter, index) => (
        <motion.button
          key={index}
          onClick={() => scrollToChapter(index)}
          className="relative group cursor-hover"
          whileHover={{ scale: 1.2 }}
        >
          {/* Dot */}
          <motion.div
            animate={{
              scale: activeChapter === index ? 1.5 : 1,
              backgroundColor: activeChapter === index ? '#D4AF37' : '#ffffff',
            }}
            className="w-3 h-3 rounded-full border-2 border-white/30 transition-all relative z-10"
          >
            {activeChapter === index && (
              <motion.div
                animate={{
                  scale: [1, 1.5, 1],
                  opacity: [0.5, 1, 0.5],
                }}
                transition={{ duration: 2, repeat: Infinity }}
                className="absolute inset-0 rounded-full bg-secondary"
              />
            )}
          </motion.div>

          {/* Connecting Line */}
          {index < chapters.length - 1 && (
            <div className="absolute left-1/2 -translate-x-1/2 top-full w-[2px] h-3 bg-white/20" />
          )}
        </motion.button>
      ))}
    </div>
  )
}
