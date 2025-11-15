'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useVoiceoverFilter } from '@/hooks/useVoiceoverFilter'
import { useChapterAudio } from '@/hooks/useChapterAudio'
import PlayButton from '@/components/revolutionary/PlayButton'

export default function Chapter1Intro() {
  const { audioRef, sectionRef, showPlayButton, handlePlayAudio } = useChapterAudio('/audio/Chapter_1.mp3?v=3')

  // Applica filtro passa-alto per ridurre i bassi
  useVoiceoverFilter(audioRef)

  return (
    <section ref={sectionRef} className="min-w-screen h-screen flex items-center justify-center relative overflow-hidden bg-black px-4">
      {/* Narration Audio */}
      <audio ref={audioRef} preload="auto">
        <source src="/audio/Chapter_1.mp3?v=3" type="audio/mpeg" />
      </audio>

      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0"
        onError={(e) => {
          // Nascondi il video se non può essere caricato (es. su Vercel con Git LFS)
          const target = e.target as HTMLVideoElement
          target.style.display = 'none'
        }}
      >
        <source src="/video/compressed/horse-hooves.mp4" type="video/mp4" />
      </video>

      {/* Elegant Dark Overlay */}
      <div className="absolute inset-0 bg-black/85 z-[1]" />

      {/* Subtle Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] z-[2]" />

      {/* Film Grain */}
      <div className="film-grain absolute inset-0 z-[3] opacity-30" />

      {/* Main Content */}
      <div className="relative z-10 text-center px-2 sm:px-4 md:px-6 max-w-4xl mx-auto py-8 sm:py-12 overflow-hidden">
        {/* Logo Ridotto */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 sm:mb-10 md:mb-12 flex justify-center"
        >
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32">
            {/* Subtle Glow */}
            <motion.div
              animate={{
                opacity: [0.2, 0.4, 0.2],
              }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 -m-6 blur-xl bg-gradient-to-br from-amber-200/20 via-amber-400/10 to-amber-200/20"
            />

            {/* Logo */}
            <Image
              src="/images/Logo_Scuderie_Olgiata-removebg-preview.png"
              alt="Scuderie Olgiata"
              fill
              className="object-contain drop-shadow-2xl relative z-10"
              priority
            />
          </div>
        </motion.div>

        {/* Decorative Top Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="w-20 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent mx-auto mb-2"
        />

        {/* Chapter Number */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="mb-2"
        >
          <span className="text-xs font-light text-white/40 uppercase tracking-[0.4em]">
            Capitolo Primo
          </span>
        </motion.div>

        {/* Decorative Bottom Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="w-20 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent mx-auto mb-8"
        />

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4 sm:mb-6 px-2"
        >
          <h1 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extralight tracking-tight leading-tight">
            <span className="block text-white/95 mb-1 sm:mb-2">
              C'ERA UNA VOLTA
            </span>
            <span className="block text-white/50 text-lg sm:text-xl md:text-3xl lg:text-4xl font-thin italic">
              e c'è ancora
            </span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.2 }}
          className="text-xs md:text-sm text-amber-400/70 mb-12 font-light italic tracking-[0.2em] uppercase"
        >
          Una storia che attraversa il tempo
        </motion.p>

        {/* Story Text - Compatto */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 1.6 }}
          className="max-w-2xl mx-auto space-y-4 sm:space-y-6 text-xs sm:text-sm md:text-base text-white/70 leading-relaxed font-light px-2"
        >
          <p className="relative pl-4 sm:pl-6">
            <span className="text-3xl sm:text-4xl md:text-5xl text-white/10 absolute left-0 top-0 font-serif">"</span>
            C'era una volta, e c'è ancora, un luogo dove il tempo segue il ritmo degli zoccoli sulla terra. Ma le vere leggende non restano immobili – evolvono, si rinnovano. E tu sei qui, proprio nel momento in cui tutto sta per cambiare.
          </p>

          {/* Separator Compatto */}
          <div className="flex items-center gap-3 py-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
            <div className="w-1 h-1 rounded-full bg-amber-400/40" />
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
          </div>

          <p className="text-white/50 text-xs md:text-sm italic">
            Benvenuto nel cuore pulsante dell'equitazione romana, dove ogni cavaliere trova la sua strada.
          </p>
        </motion.div>

        {/* Scroll Hint */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 2.2 }}
          className="mt-12"
        >
          <motion.div
            animate={{ opacity: [0.3, 0.7, 0.3] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="text-xs text-white/20 uppercase tracking-[0.3em]"
          >
            Scorri
          </motion.div>
        </motion.div>
      </div>

      {/* Subtle Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent z-[4]" />

      {/* Mobile Play Button */}
      <PlayButton show={showPlayButton} onClick={handlePlayAudio} />
    </section>
  )
}
