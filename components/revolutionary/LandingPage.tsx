'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { HiVolumeUp } from 'react-icons/hi'

interface LandingPageProps {
  onStart: () => void
}

export default function LandingPage({ onStart }: LandingPageProps) {
  return (
    <motion.div
      initial={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 1 }}
      className="fixed inset-0 z-50 flex items-center justify-center bg-black"
    >
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-20"
      >
        <source src="/video/compressed/stable-window.mp4" type="video/mp4" />
      </video>

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.8)_100%)]" />

      {/* Film Grain */}
      <div className="film-grain absolute inset-0 opacity-20" />

      {/* Content */}
      <div className="relative z-10 text-center px-8 max-w-2xl mx-auto">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative w-64 h-64 md:w-80 md:h-80 mx-auto mb-12"
        >
          {/* Glow effect */}
          <motion.div
            animate={{
              opacity: [0.3, 0.6, 0.3],
            }}
            transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            className="absolute inset-0 -m-12 blur-3xl bg-gradient-to-br from-amber-200/30 via-amber-400/20 to-amber-200/30"
          />
          <Image
            src="/images/Logo_Scuderie_Olgiata-removebg-preview.png"
            alt="Scuderie Olgiata"
            fill
            className="object-contain drop-shadow-2xl relative z-10"
            priority
          />
        </motion.div>

        {/* Text */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="mb-12 space-y-4"
        >
          <h1 className="text-4xl md:text-5xl font-extralight text-white/95 tracking-tight">
            Scuderie Olgiata
          </h1>
          <p className="text-sm md:text-base text-white/60 font-light uppercase tracking-[0.3em]">
            Una Storia da Ascoltare
          </p>
        </motion.div>

        {/* Interactive Button */}
        <motion.button
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2, delay: 0.8 }}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={onStart}
          className="group relative"
        >
          <div className="relative px-10 py-5 rounded-full bg-white/10 backdrop-blur-sm border border-amber-400/40 hover:border-amber-400/80 text-white transition-all duration-500">
            <div className="flex items-center gap-4">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                <HiVolumeUp className="w-6 h-6 text-amber-400" />
              </motion.div>
              <span className="text-lg font-light">Tocca per Ascoltare la Storia</span>
            </div>
          </div>

          {/* Ripple effect on hover */}
          <motion.div
            className="absolute inset-0 rounded-full border-2 border-amber-400/30"
            initial={{ scale: 1, opacity: 0.5 }}
            animate={{ scale: 1.5, opacity: 0 }}
            transition={{ duration: 2, repeat: Infinity }}
          />
        </motion.button>

        {/* Navigation instructions */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.2 }}
          className="mt-12 space-y-6"
        >
          <p className="text-xs text-white/40 font-light">
            Attiva l'audio per la migliore esperienza
          </p>

          <div className="pt-6 border-t border-white/10 space-y-4">
            <p className="text-xs text-amber-400/70 uppercase tracking-[0.2em] font-light mb-3">
              Come Navigare
            </p>

            {/* Desktop instructions */}
            <div className="hidden md:block">
              <div className="flex items-center justify-center gap-2 text-xs text-white/50">
                <span className="px-3 py-1 bg-white/5 border border-white/10 rounded">Rotella Mouse</span>
                <span className="text-white/30">o</span>
                <span className="px-3 py-1 bg-white/5 border border-white/10 rounded">← →</span>
                <span className="text-white/40 ml-2">per sfogliare i capitoli</span>
              </div>
              <p className="text-[10px] text-white/30 mt-3 italic">
                Lasciati guidare dalla storia magica • Ogni scroll svela un nuovo capitolo
              </p>
            </div>

            {/* Mobile instructions */}
            <div className="block md:hidden">
              <div className="flex items-center justify-center gap-2 text-xs text-white/50">
                <span className="px-3 py-1 bg-white/5 border border-white/10 rounded">Scorri</span>
                <span className="text-white/40">per sfogliare i capitoli</span>
              </div>
              <p className="text-[10px] text-white/30 mt-3 italic">
                Lasciati guidare dalla storia • Ogni gesto svela un capitolo
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
