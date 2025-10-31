'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { HiArrowDown, HiPlay } from 'react-icons/hi'
import { GiHorseHead } from 'react-icons/gi'
import Button from '@/components/ui/Button'
import Link from 'next/link'
import { useRef } from 'react'

export default function HeroSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], ['0%', '50%'])
  const opacity = useTransform(scrollYProgress, [0, 1], [1, 0])
  const scale = useTransform(scrollYProgress, [0, 1], [1, 1.1])

  return (
    <section ref={containerRef} className="relative h-screen overflow-hidden bg-black">
      {/* Video Background / Hero Image with Parallax */}
      <motion.div
        style={{ scale }}
        className="absolute inset-0 z-0"
      >
        <div className="absolute inset-0 bg-gradient-to-br from-primary/20 via-black/50 to-secondary/20" />
        <div className="absolute inset-0 bg-[url('/images/hero-horses.jpg')] bg-cover bg-center"
             style={{ backgroundPosition: 'center 40%' }} />
        {/* Animated Overlay Pattern */}
        <motion.div
          animate={{
            backgroundPosition: ['0% 0%', '100% 100%'],
          }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 opacity-10"
          style={{
            backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 10px, rgba(212,175,55,0.1) 10px, rgba(212,175,55,0.1) 20px)',
            backgroundSize: '200% 200%'
          }}
        />
      </motion.div>

      {/* Floating Elements */}
      <motion.div
        animate={{ y: [0, -20, 0], rotate: [0, 5, 0] }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-10 lg:left-20 z-10 opacity-20"
      >
        <GiHorseHead className="w-32 h-32 text-secondary" />
      </motion.div>

      <motion.div
        animate={{ y: [0, 20, 0], rotate: [0, -5, 0] }}
        transition={{ duration: 7, repeat: Infinity, ease: "easeInOut", delay: 1 }}
        className="absolute bottom-40 right-10 lg:right-20 z-10 opacity-20"
      >
        <GiHorseHead className="w-40 h-40 text-primary" />
      </motion.div>

      {/* Main Content */}
      <motion.div
        style={{ y, opacity }}
        className="relative z-20 h-full flex items-center justify-center"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="mb-8"
          >
            <div className="inline-flex items-center gap-3 px-6 py-3 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 shadow-2xl">
              <div className="flex gap-1">
                <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" />
                <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" style={{ animationDelay: '0.2s' }} />
                <div className="w-2 h-2 rounded-full bg-secondary animate-pulse" style={{ animationDelay: '0.4s' }} />
              </div>
              <span className="text-sm font-semibold text-white tracking-wider uppercase">Roma • Olgiata</span>
            </div>
          </motion.div>

          {/* Main Title with Gradient */}
          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.3 }}
            className="text-6xl sm:text-7xl lg:text-8xl font-bold mb-6 leading-tight"
          >
            <span className="block text-white mb-2">Scuderie</span>
            <span className="block bg-gradient-to-r from-secondary via-secondary-light to-secondary bg-clip-text text-transparent">
              Olgiata
            </span>
          </motion.h1>

          {/* Subtitle with Glass Effect */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.5 }}
            className="mb-12"
          >
            <p className="text-xl sm:text-2xl lg:text-3xl text-white/90 mb-4 font-light tracking-wide">
              Eccellenza Equestre dal 1999
            </p>
            <p className="text-base sm:text-lg text-white/70 max-w-3xl mx-auto leading-relaxed">
              Un'esperienza esclusiva nel cuore di Roma dove tradizione, passione e
              <span className="text-secondary font-semibold"> innovazione </span>
              si incontrano per creare momenti indimenticabili
            </p>
          </motion.div>

          {/* CTA Buttons with Advanced Styling */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.7 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16"
          >
            <Link href="/club">
              <Button
                size="lg"
                className="min-w-[240px] bg-gradient-to-r from-secondary to-secondary-light text-black font-semibold shadow-2xl shadow-secondary/50 hover:shadow-secondary/80 hover:scale-105 transition-all duration-300"
              >
                Esplora il Club
                <HiArrowDown className="ml-2 w-5 h-5 rotate-[-90deg]" />
              </Button>
            </Link>
            <Link href="/prenotazioni">
              <Button
                size="lg"
                className="min-w-[240px] bg-white/10 backdrop-blur-xl border-2 border-white/30 text-white font-semibold hover:bg-white/20 hover:border-white/50 hover:scale-105 transition-all duration-300"
              >
                <HiPlay className="mr-2 w-5 h-5" />
                Virtual Tour
              </Button>
            </Link>
          </motion.div>

          {/* Premium Stats with Glass Morphism */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.9 }}
            className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-5xl mx-auto"
          >
            {[
              { value: '50+', label: 'Cavalli Elite', icon: '🏇' },
              { value: '200+', label: 'Membri Esclusivi', icon: '👥' },
              { value: '15+', label: 'Eventi Premium', icon: '🏆' },
              { value: '25', label: 'Anni di Eccellenza', icon: '⭐' },
            ].map((stat, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.5, delay: 0.9 + index * 0.1 }}
                whileHover={{ scale: 1.05, y: -5 }}
                className="relative group"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-white/20 to-white/5 rounded-2xl blur-xl group-hover:blur-2xl transition-all duration-300" />
                <div className="relative bg-white/10 backdrop-blur-xl border border-white/20 rounded-2xl p-6 text-center shadow-2xl group-hover:border-secondary/50 transition-all duration-300">
                  <div className="text-3xl mb-2">{stat.icon}</div>
                  <div className="text-4xl lg:text-5xl font-bold text-white mb-2 bg-gradient-to-br from-white to-white/80 bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-white/80 font-medium tracking-wide">{stat.label}</div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </motion.div>

      {/* Advanced Scroll Indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 1, delay: 1.2 }}
        className="absolute bottom-8 left-1/2 transform -translate-x-1/2 z-30"
      >
        <motion.div
          animate={{ y: [0, 12, 0] }}
          transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
          className="flex flex-col items-center gap-3"
        >
          <div className="w-8 h-14 rounded-full border-2 border-white/30 flex items-start justify-center p-2">
            <motion.div
              animate={{ y: [0, 12, 0], opacity: [0, 1, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="w-1.5 h-3 rounded-full bg-secondary"
            />
          </div>
          <span className="text-xs text-white/60 font-semibold uppercase tracking-widest">Scroll</span>
        </motion.div>
      </motion.div>

      {/* Gradient Overlay at Bottom */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-white to-transparent z-10" />
    </section>
  )
}
