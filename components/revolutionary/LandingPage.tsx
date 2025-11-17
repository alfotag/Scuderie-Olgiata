'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { HiVolumeUp } from 'react-icons/hi'
import { audioUnlocker } from '@/lib/audioUnlocker'
import { getVideoUrl } from '@/lib/cloudinary-videos'

interface LandingPageProps {
  onStart: () => void
}

export default function LandingPage({ onStart }: LandingPageProps) {
  const handleStartClick = async () => {
    console.log('🎵 User clicked "Tocca per Iniziare" - unlocking all audio...')

    // Unlock all audio elements before starting
    await audioUnlocker.unlockAll()

    // Then start the experience
    onStart()
  }
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
        onError={(e) => {
          // Nascondi il video se non può essere caricato (es. su Vercel con Git LFS)
          const target = e.target as HTMLVideoElement
          target.style.display = 'none'
        }}
      >
        <source src={getVideoUrl('/video/compressed/stable-window.mp4')} type="video/mp4" />
      </video>

      {/* Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.8)_100%)]" />

      {/* Film Grain */}
      <div className="film-grain absolute inset-0 opacity-20" />

      {/* Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 md:px-8 max-w-2xl mx-auto">
        {/* Logo */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          className="relative w-48 h-48 sm:w-56 sm:h-56 md:w-80 md:h-80 mx-auto mb-8 sm:mb-10 md:mb-12"
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
          className="mb-8 sm:mb-10 md:mb-12 space-y-3 sm:space-y-4"
        >
          <h1 className="text-3xl sm:text-4xl md:text-5xl font-extralight text-white/95 tracking-tight px-2">
            Scuderie Olgiata
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-white/60 font-light uppercase tracking-[0.2em] sm:tracking-[0.3em] px-2">
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
          onClick={handleStartClick}
          className="group relative w-full max-w-md mx-auto"
        >
          <div className="relative px-6 sm:px-8 md:px-10 py-4 sm:py-5 rounded-full bg-white/10 backdrop-blur-sm border border-amber-400/40 hover:border-amber-400/80 text-white transition-all duration-500">
            <div className="flex items-center justify-center gap-3 sm:gap-4">
              <motion.div
                animate={{ scale: [1, 1.2, 1] }}
                transition={{ duration: 2, repeat: Infinity }}
                className="flex-shrink-0"
              >
                <HiVolumeUp className="w-5 h-5 sm:w-6 sm:h-6 text-amber-400" />
              </motion.div>
              <span className="text-sm sm:text-base md:text-lg font-light whitespace-nowrap">Tocca per Iniziare</span>
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
          className="mt-8 sm:mt-10 md:mt-12 space-y-4 sm:space-y-6 px-2"
        >
          <p className="text-xs text-white/40 font-light">
            Attiva l'audio per la migliore esperienza
          </p>

          <div className="pt-4 sm:pt-6 border-t border-white/10 space-y-3 sm:space-y-4">
            <p className="text-xs text-amber-400/70 uppercase tracking-[0.15em] sm:tracking-[0.2em] font-light mb-2 sm:mb-3">
              Come Navigare
            </p>

            {/* Desktop instructions */}
            <div className="hidden md:block">
              <div className="flex items-center justify-center gap-2 text-xs text-white/50 flex-wrap">
                <span className="px-3 py-1 bg-white/5 border border-white/10 rounded text-xs">Rotella Mouse</span>
                <span className="text-white/30">o</span>
                <span className="px-3 py-1 bg-white/5 border border-white/10 rounded text-xs">← →</span>
                <span className="text-white/40 ml-2">per sfogliare i capitoli</span>
              </div>
              <p className="text-xs text-white/30 mt-3 italic px-4">
                Lasciati guidare dalla storia magica • Ogni scroll svela un nuovo capitolo
              </p>
            </div>

            {/* Mobile instructions */}
            <div className="block md:hidden">
              <div className="flex items-center justify-center gap-2 text-xs text-white/50 flex-wrap">
                <span className="px-2.5 py-1 bg-white/5 border border-white/10 rounded text-xs">Swipe</span>
                <span className="text-white/40">per cambiare capitolo</span>
              </div>
              <p className="text-xs text-white/30 mt-2 sm:mt-3 italic px-2">
                Lasciati guidare dalla storia • Swipe per scoprire
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </motion.div>
  )
}
