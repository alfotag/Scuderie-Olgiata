'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { getVideoUrl } from '@/lib/cloudinary-videos'
import { useState, useEffect } from 'react'
import { HiArrowRight, HiDownload } from 'react-icons/hi'
import { FaApple, FaAndroid } from 'react-icons/fa'
import Image from 'next/image'
import { useVoiceoverFilter } from '@/hooks/useVoiceoverFilter'
import { useChapterAudio } from '@/hooks/useChapterAudio'
import PlayButton from '@/components/revolutionary/PlayButton'
import FairyTaleContractPages from '../FairyTaleContractPages'

export default function Chapter7Decision() {
  const [isRevealed, setIsRevealed] = useState(false)
  const [isFormSubmitted, setIsFormSubmitted] = useState(false)
  const { audioRef, sectionRef, showPlayButton, handlePlayAudio } = useChapterAudio('/audio/Chapter_7.mp3?v=2')

  // Applica filtro passa-alto per ridurre i bassi
  useVoiceoverFilter(audioRef)

  // Blocca lo scroll della pagina quando il contratto è aperto
  useEffect(() => {
    if (isRevealed && !isFormSubmitted) {
      document.body.style.overflow = 'hidden'
      document.documentElement.style.overflow = 'hidden'
    } else {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }

    return () => {
      document.body.style.overflow = ''
      document.documentElement.style.overflow = ''
    }
  }, [isRevealed, isFormSubmitted])

  return (
    <section ref={sectionRef} className="min-w-screen h-screen flex items-center justify-center relative overflow-hidden bg-black">
      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0"
        onError={(e) => {
          const target = e.target as HTMLVideoElement
          target.style.display = 'none'
        }}
      >
        <source src={getVideoUrl("/video/compressed/stable-window.mp4")} type="video/mp4" />
      </video>

      {/* Elegant Dark Overlay */}
      <div className="absolute inset-0 bg-black/80 z-[1]" />

      {/* Subtle Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.7)_100%)] z-[2]" />

      {/* Film Grain */}
      <div className="film-grain absolute inset-0 z-[3] opacity-25" />

      {/* Main Content with AnimatePresence */}
      <AnimatePresence mode="wait">
        {!isRevealed && !isFormSubmitted ? (
          // State 1 - The Question
          <motion.div
            key="question"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="relative z-10 text-center px-2 sm:px-4 md:px-6 max-w-4xl mx-auto py-8 sm:py-12 overflow-hidden"
          >
            {/* Top Decorative Line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.2 }}
              className="w-20 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent mx-auto mb-2"
            />

            {/* Chapter Number */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2 }}
              className="mb-2"
            >
              <span className="text-xs font-light text-white/40 uppercase tracking-[0.5em]">
                Capitolo Settimo
              </span>
            </motion.div>

            {/* Bottom Decorative Line */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={{ scaleX: 1 }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="w-20 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent mx-auto mb-10"
            />

            {/* Title */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.4, delay: 0.3 }}
              className="mb-10"
            >
              <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extralight tracking-tight leading-tight">
                <span className="block text-white/95 mb-2">
                  FAR PARTE
                </span>
                <span className="block text-white/50 text-lg sm:text-xl md:text-3xl lg:text-4xl font-thin italic">
                  della famiglia
                </span>
              </h2>
            </motion.div>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.2, delay: 0.6 }}
              className="text-sm md:text-base text-amber-400/70 mb-12 font-light italic tracking-[0.2em] uppercase"
            >
              L'invito che stavi aspettando
            </motion.p>

            {/* Story Text */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 1.4, delay: 0.9 }}
              className="max-w-2xl mx-auto space-y-4 sm:space-y-6 text-xs sm:text-sm md:text-base text-white/70 leading-relaxed font-light mb-12 px-2"
            >
              <p className="relative pl-4 sm:pl-6">
                <span className="text-3xl sm:text-4xl md:text-5xl text-white/10 absolute left-0 top-0 font-serif">"</span>
                Ora sai cosa significa L'Olgiata. Un luogo dove fermare il tempo, dimenticare tutto, condividere momenti che diventano ricordi eterni.
              </p>

              {/* Separator */}
              <div className="flex items-center gap-3 py-3">
                <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
                <div className="w-1 h-1 rounded-full bg-amber-400/40" />
                <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
              </div>

              <p className="text-amber-400/80 font-normal text-base md:text-lg">
                E ora stiamo invitando anche te a far parte della famiglia. A entrare in casa.
              </p>
            </motion.div>

            {/* Reveal Button */}
            <motion.button
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 1.5 }}
              whileHover={{ y: -5 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setIsRevealed(true)}
              className="group relative"
            >
              <div className="relative px-8 py-3 rounded-full bg-white/10 backdrop-blur-sm border border-amber-400/30 hover:border-amber-400/60 text-white font-light text-base flex items-center gap-3 transition-all duration-500">
                <span>SCOPRI COME</span>
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Infinity }}
                >
                  <HiArrowRight className="w-5 h-5 text-amber-400" />
                </motion.div>
              </div>
            </motion.button>
          </motion.div>
        ) : !isFormSubmitted ? (
          // State 2 - Contract Form (2 pages)
          <motion.div
            key="contract"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.8 }}
            className="relative z-10 px-4 md:px-8 w-full h-screen flex items-center justify-center overflow-y-auto py-8"
          >
            <FairyTaleContractPages
              onSubmit={(formData) => {
                console.log('Form data submitted:', formData)
                setIsFormSubmitted(true)
              }}
            />
          </motion.div>
        ) : (
          // State 3 - Download App
          <motion.div
            key="download"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 1 }}
            className="relative z-10 text-center px-8 max-w-5xl mx-auto py-20"
          >
            {/* Logo */}
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 1.2 }}
              className="relative w-56 h-56 mx-auto mb-12"
            >
              <motion.div
                animate={{
                  opacity: [0.2, 0.4, 0.2],
                }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="absolute inset-0 -m-8 blur-2xl bg-gradient-to-br from-amber-200/20 via-amber-400/10 to-amber-200/20"
              />
              <Image
                src="/images/Logo_Scuderie_Olgiata-removebg-preview.png"
                alt="Scuderie Olgiata"
                fill
                className="object-contain drop-shadow-2xl relative z-10"
              />
            </motion.div>

            {/* Narrative Text */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.3 }}
              className="max-w-3xl mx-auto space-y-8 text-base md:text-lg text-white/70 leading-relaxed font-light mb-16"
            >
              <p className="text-amber-400/90 font-normal text-xl md:text-2xl">
                Grazie per aver firmato il contratto di affiliazione!<br />
                Sei ufficialmente un <strong>affiliato</strong> delle Scuderie Olgiata.
              </p>
              <p>
                Ora scarica l'app per completare la tua affiliazione.<br />
                Prenota la tua prima visita, scopri gli eventi esclusivi, connettiti con gli altri membri della famiglia.
              </p>
              <p className="text-amber-400/80 font-normal text-lg md:text-xl">
                La porta è aperta.<br />
                Benvenuto nella famiglia.
              </p>
            </motion.div>

            {/* Download Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 1.2, delay: 0.6 }}
              className="flex flex-col md:flex-row gap-6 items-center justify-center mb-16"
            >
              {/* iOS App Store */}
              <motion.a
                href="#"
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
                className="group relative"
              >
                <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 hover:border-blue-400/40 rounded-xl px-8 py-4 flex items-center gap-4 transition-all duration-500">
                  <div className="relative w-12 h-12">
                    <Image
                      src="/images/Logo app ios.png"
                      alt="iOS App"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="text-left">
                    <div className="text-xs text-white/50 uppercase tracking-wider font-light">Scarica su</div>
                    <div className="text-xl font-light text-white flex items-center gap-2">
                      <FaApple className="w-5 h-5" />
                      App Store
                    </div>
                  </div>
                  <HiDownload className="w-5 h-5 text-blue-400/70" />
                </div>
              </motion.a>

              {/* Android Google Play */}
              <motion.a
                href="#"
                whileHover={{ y: -5 }}
                whileTap={{ scale: 0.98 }}
                className="group relative"
              >
                <div className="relative bg-white/10 backdrop-blur-sm border border-white/20 hover:border-green-400/40 rounded-xl px-8 py-4 flex items-center gap-4 transition-all duration-500">
                  <div className="relative w-12 h-12">
                    <Image
                      src="/images/Logo_Scuderie_Olgiata-removebg-preview.png"
                      alt="Android App"
                      fill
                      className="object-contain"
                    />
                  </div>
                  <div className="text-left">
                    <div className="text-xs text-white/50 uppercase tracking-wider font-light">Disponibile su</div>
                    <div className="text-xl font-light text-white flex items-center gap-2">
                      <FaAndroid className="w-5 h-5 text-green-400/70" />
                      Google Play
                    </div>
                  </div>
                  <HiDownload className="w-5 h-5 text-green-400/70" />
                </div>
              </motion.a>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/60 to-transparent z-[4]" />
      <PlayButton show={showPlayButton} onClick={handlePlayAudio} />
    </section>
  )
}
