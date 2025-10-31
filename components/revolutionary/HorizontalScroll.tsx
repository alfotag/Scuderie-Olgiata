'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

interface HorizontalScrollProps {
  children: React.ReactNode
}

export default function HorizontalScroll({ children }: HorizontalScrollProps) {
  const containerRef = useRef<HTMLDivElement>(null)
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const childrenArray = Array.isArray(children) ? children : [children]
  const totalSlides = childrenArray.length

  useEffect(() => {
    let lastScrollTime = 0
    const scrollDelay = 1000

    const handleWheel = (e: WheelEvent) => {
      e.preventDefault()

      const now = Date.now()
      if (now - lastScrollTime < scrollDelay || isTransitioning) return
      lastScrollTime = now

      if (e.deltaY > 0 && currentIndex < totalSlides - 1) {
        setCurrentIndex(prev => prev + 1)
        triggerTransition()
      } else if (e.deltaY < 0 && currentIndex > 0) {
        setCurrentIndex(prev => prev - 1)
        triggerTransition()
      }
    }

    const handleKeyDown = (e: KeyboardEvent) => {
      if (isTransitioning) return

      if ((e.key === 'ArrowRight' || e.key === 'ArrowDown') && currentIndex < totalSlides - 1) {
        setCurrentIndex(prev => prev + 1)
        triggerTransition()
      } else if ((e.key === 'ArrowLeft' || e.key === 'ArrowUp') && currentIndex > 0) {
        setCurrentIndex(prev => prev - 1)
        triggerTransition()
      }
    }

    const triggerTransition = () => {
      setIsTransitioning(true)
      setTimeout(() => setIsTransitioning(false), 1600)
    }

    window.addEventListener('wheel', handleWheel, { passive: false })
    window.addEventListener('keydown', handleKeyDown)

    return () => {
      window.removeEventListener('wheel', handleWheel)
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [currentIndex, isTransitioning, totalSlides])

  return (
    <div ref={containerRef} className="relative w-full h-screen overflow-hidden bg-black">
      {/* Letterbox cinematiche ridotte - più sottili */}
      <div className="fixed top-0 left-0 w-full h-6 bg-black z-[200] pointer-events-none" />
      <div className="fixed bottom-0 left-0 w-full h-6 bg-black z-[200] pointer-events-none" />

      {/* Chapters Container */}
      <motion.div
        className="flex h-screen"
        animate={{ x: `-${currentIndex * 100}vw` }}
        transition={{
          duration: 1.4,
          ease: [0.87, 0, 0.13, 1],
        }}
      >
        {childrenArray.map((child, index) => (
          <div key={index} className="min-w-screen h-screen flex-shrink-0">
            {child}
          </div>
        ))}
      </motion.div>

      {/* Transition Overlays */}
      <AnimatePresence>
        {isTransitioning && (
          <>
            {/* Fade to Black */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: [0, 0.95, 0] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.4, ease: [0.87, 0, 0.13, 1] }}
              className="fixed inset-0 bg-black z-[150]"
            />

            {/* Subtle glow */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: [0, 0.12, 0], scale: [0.8, 1.2, 1] }}
              exit={{ opacity: 0 }}
              transition={{ duration: 1.2, ease: 'easeOut' }}
              className="fixed inset-0 z-[149]"
              style={{
                background: 'radial-gradient(circle at center, rgba(212,175,55,0.15) 0%, transparent 70%)',
              }}
            />
          </>
        )}
      </AnimatePresence>

      {/* Chapter Indicators - Più raffinati */}
      <div className="fixed right-8 top-1/2 -translate-y-1/2 z-[201] flex flex-col gap-3">
        {childrenArray.map((_, index) => (
          <button
            key={index}
            onClick={() => {
              if (!isTransitioning && index !== currentIndex) {
                setCurrentIndex(index)
                setIsTransitioning(true)
                setTimeout(() => setIsTransitioning(false), 1600)
              }
            }}
            className="relative group"
            aria-label={`Vai al capitolo ${index + 1}`}
          >
            {/* Linea verticale connettiva */}
            {index < childrenArray.length - 1 && (
              <div className="absolute left-1/2 top-full -translate-x-1/2 w-px h-3 bg-white/10" />
            )}

            <div className="relative">
              <div
                className={`w-1.5 h-1.5 rounded-full transition-all duration-700 ${
                  index === currentIndex
                    ? 'bg-white scale-150 shadow-lg shadow-white/40'
                    : 'bg-white/20 hover:bg-white/50 hover:scale-125'
                }`}
              />

              {/* Ring animato sul capitolo attivo */}
              {index === currentIndex && (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1.8, opacity: 0 }}
                  transition={{ duration: 2, repeat: Infinity }}
                  className="absolute inset-0 -m-1 w-[18px] h-[18px] rounded-full border border-white/30"
                />
              )}
            </div>
          </button>
        ))}
      </div>

      {/* Chapter Number Display - Riposizionato */}
      <motion.div
        key={currentIndex}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[201] flex items-center gap-3"
      >
        <div className="h-px w-12 bg-gradient-to-r from-transparent to-white/20" />
        <span className="text-white/30 text-xs tracking-[0.3em] font-light">
          {String(currentIndex + 1).padStart(2, '0')} / {String(totalSlides).padStart(2, '0')}
        </span>
        <div className="h-px w-12 bg-gradient-to-l from-transparent to-white/20" />
      </motion.div>
    </div>
  )
}
