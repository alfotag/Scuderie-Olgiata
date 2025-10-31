'use client'

import { useEffect, useRef, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'

export default function TransitionEffects() {
  const [showEffect, setShowEffect] = useState(false)
  const lastScrollX = useRef(0)

  useEffect(() => {
    let ticking = false

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const scrollY = window.scrollY
          const windowHeight = window.innerHeight
          const sections = 7 // numero di capitoli
          const scrollPerSection = windowHeight

          // Calcola quale sezione stiamo attraversando
          const currentSection = Math.floor(scrollY / scrollPerSection)
          const progressInSection = (scrollY % scrollPerSection) / scrollPerSection

          // Attiva l'effetto quando siamo in transizione (tra 0.85 e 0.15 della sezione successiva)
          const isTransitioning = progressInSection > 0.85 || progressInSection < 0.15

          if (isTransitioning && !showEffect) {
            setShowEffect(true)
          } else if (!isTransitioning && showEffect) {
            setShowEffect(false)
          }

          lastScrollX.current = scrollY
          ticking = false
        })

        ticking = true
      }
    }

    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [showEffect])

  return (
    <AnimatePresence>
      {showEffect && (
        <>
          {/* Barre cinematografiche top/bottom */}
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
            className="fixed top-0 left-0 w-full h-24 bg-black z-[100] origin-top pointer-events-none"
          />
          <motion.div
            initial={{ scaleY: 0 }}
            animate={{ scaleY: 1 }}
            exit={{ scaleY: 0 }}
            transition={{ duration: 0.3, ease: [0.76, 0, 0.24, 1] }}
            className="fixed bottom-0 left-0 w-full h-24 bg-black z-[100] origin-bottom pointer-events-none"
          />

          {/* Wipe dorato laterale */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: '100%' }}
            exit={{ x: '100%' }}
            transition={{ duration: 0.8, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 w-full h-full z-[99] pointer-events-none"
            style={{
              background: 'linear-gradient(90deg, transparent 0%, rgba(212,175,55,0.3) 50%, transparent 100%)',
            }}
          />

          {/* Flash di luce */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: [0, 0.6, 0] }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 bg-white z-[98] pointer-events-none"
          />

          {/* Particelle dorate */}
          {[...Array(20)].map((_, i) => (
            <motion.div
              key={i}
              initial={{
                x: '50%',
                y: '50%',
                scale: 0,
                opacity: 0
              }}
              animate={{
                x: `${50 + (Math.random() - 0.5) * 100}%`,
                y: `${50 + (Math.random() - 0.5) * 100}%`,
                scale: [0, 1, 0],
                opacity: [0, 1, 0]
              }}
              exit={{ opacity: 0 }}
              transition={{
                duration: 0.6,
                delay: Math.random() * 0.2,
                ease: 'easeOut'
              }}
              className="fixed w-2 h-2 rounded-full bg-secondary z-[97] pointer-events-none"
              style={{
                boxShadow: '0 0 10px rgba(212,175,55,0.8)',
              }}
            />
          ))}
        </>
      )}
    </AnimatePresence>
  )
}
