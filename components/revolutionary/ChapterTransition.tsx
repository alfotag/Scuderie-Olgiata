'use client'

import { motion } from 'framer-motion'
import { useEffect, useState } from 'react'
import Image from 'next/image'

interface ChapterTransitionProps {
  chapterNumber: number
  title: string
}

export default function ChapterTransition({ chapterNumber, title }: ChapterTransitionProps) {
  const [isVisible, setIsVisible] = useState(false)

  useEffect(() => {
    setIsVisible(true)
  }, [])

  return (
    <section className="min-w-screen h-screen flex items-center justify-center relative overflow-hidden bg-black">
      {/* Cinematic black bars */}
      <motion.div
        initial={{ scaleY: 0 }}
        animate={isVisible ? { scaleY: 1 } : {}}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        className="absolute top-0 left-0 w-full h-32 bg-black z-20 origin-top"
      />
      <motion.div
        initial={{ scaleY: 0 }}
        animate={isVisible ? { scaleY: 1 } : {}}
        transition={{ duration: 0.6, ease: [0.76, 0, 0.24, 1] }}
        className="absolute bottom-0 left-0 w-full h-32 bg-black z-20 origin-bottom"
      />

      {/* Animated background gradient */}
      <motion.div
        animate={{
          background: [
            'radial-gradient(circle at 50% 50%, rgba(212,175,55,0.15) 0%, transparent 70%)',
            'radial-gradient(circle at 50% 50%, rgba(139,69,19,0.15) 0%, transparent 70%)',
            'radial-gradient(circle at 50% 50%, rgba(212,175,55,0.15) 0%, transparent 70%)',
          ],
        }}
        transition={{ duration: 4, repeat: Infinity }}
        className="absolute inset-0 z-0"
      />

      {/* Light rays explosion */}
      {[...Array(24)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ scaleY: 0, opacity: 0 }}
          animate={isVisible ? { scaleY: 1, opacity: [0, 0.6, 0] } : {}}
          transition={{
            duration: 1.5,
            delay: 0.3 + i * 0.03,
            ease: 'easeOut',
          }}
          className="absolute top-1/2 left-1/2 w-2 h-[120%] bg-gradient-to-t from-transparent via-secondary/40 to-transparent origin-top"
          style={{
            transform: `rotate(${i * 15}deg)`,
          }}
        />
      ))}

      {/* Central content */}
      <div className="relative z-10 flex flex-col items-center">
        {/* Logo with dramatic entrance */}
        <motion.div
          initial={{ scale: 0, rotateZ: -180 }}
          animate={isVisible ? { scale: 1, rotateZ: 0 } : {}}
          transition={{
            duration: 1.2,
            delay: 0.4,
            type: 'spring',
            stiffness: 100,
            damping: 15,
          }}
          className="relative mb-12"
        >
          {/* Multiple glow layers for depth */}
          <motion.div
            animate={{
              scale: [1, 1.4, 1],
              opacity: [0.4, 0.8, 0.4],
            }}
            transition={{ duration: 2, repeat: Infinity }}
            className="absolute -inset-8 blur-3xl bg-gradient-to-br from-secondary via-primary to-secondary"
          />
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              opacity: [0.6, 1, 0.6],
            }}
            transition={{ duration: 2, delay: 0.5, repeat: Infinity }}
            className="absolute -inset-4 blur-2xl bg-gradient-to-br from-primary to-secondary"
          />

          {/* Rotating golden ring */}
          <motion.div
            animate={{ rotate: 360 }}
            transition={{ duration: 15, repeat: Infinity, ease: 'linear' }}
            className="absolute -inset-6 w-[calc(100%+3rem)] h-[calc(100%+3rem)]"
          >
            <div className="w-full h-full rounded-full border-4 border-secondary/40 border-dashed" />
          </motion.div>

          <motion.div
            className="relative w-56 h-56"
            animate={{
              y: [0, -15, 0],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
          >
            <Image
              src="/images/Logo_Scuderie_Olgiata-removebg-preview.png"
              alt="Scuderie Olgiata"
              fill
              className="object-contain drop-shadow-2xl relative z-10"
            />
          </motion.div>
        </motion.div>

        {/* Chapter number with glitch effect */}
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={isVisible ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, delay: 0.8 }}
          className="relative mb-6"
        >
          {/* Glitch layers */}
          <motion.div
            animate={{
              x: [-2, 2, -2],
              opacity: [0, 0.5, 0],
            }}
            transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 2 }}
            className="absolute inset-0 text-8xl md:text-9xl font-black text-red-500/30"
          >
            CHAPTER {chapterNumber}
          </motion.div>
          <motion.div
            animate={{
              x: [2, -2, 2],
              opacity: [0, 0.5, 0],
            }}
            transition={{ duration: 0.3, repeat: Infinity, repeatDelay: 2, delay: 0.15 }}
            className="absolute inset-0 text-8xl md:text-9xl font-black text-blue-500/30"
          >
            CHAPTER {chapterNumber}
          </motion.div>

          {/* Main text */}
          <h2 className="relative text-8xl md:text-9xl font-black bg-gradient-to-r from-white via-secondary to-white bg-clip-text text-transparent">
            CHAPTER {chapterNumber}
          </h2>
        </motion.div>

        {/* Title with cinematic reveal */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={isVisible ? { scaleX: 1 } : {}}
          transition={{ duration: 0.8, delay: 1, ease: [0.76, 0, 0.24, 1] }}
          className="relative h-1 w-96 bg-gradient-to-r from-transparent via-secondary to-transparent mb-8 origin-center"
        />

        <motion.h3
          initial={{ opacity: 0, letterSpacing: '0.5em' }}
          animate={isVisible ? { opacity: 1, letterSpacing: '0.2em' } : {}}
          transition={{ duration: 1, delay: 1.2 }}
          className="text-3xl md:text-4xl font-bold text-white/90 uppercase tracking-widest text-center px-8"
        >
          {title}
        </motion.h3>

        {/* Particle burst */}
        {[...Array(40)].map((_, i) => (
          <motion.div
            key={i}
            initial={{ scale: 0, x: 0, y: 0, opacity: 0 }}
            animate={isVisible ? {
              scale: [0, 1, 0],
              x: Math.cos((i / 40) * Math.PI * 2) * (150 + Math.random() * 100),
              y: Math.sin((i / 40) * Math.PI * 2) * (150 + Math.random() * 100),
              opacity: [0, 1, 0],
            } : {}}
            transition={{
              duration: 1.5,
              delay: 0.6 + Math.random() * 0.3,
              ease: 'easeOut',
            }}
            className="absolute w-2 h-2 rounded-full bg-secondary"
            style={{
              boxShadow: '0 0 10px rgba(212,175,55,0.8)',
            }}
          />
        ))}
      </div>

      {/* Vignette */}
      <div className="absolute inset-0 pointer-events-none shadow-[inset_0_0_150px_rgba(0,0,0,0.8)] z-30" />

      {/* Film grain */}
      <div className="film-grain absolute inset-0 z-[25]" />
    </section>
  )
}
