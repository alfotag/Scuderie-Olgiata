'use client'

import { motion } from 'framer-motion'
import { useVoiceoverFilter } from '@/hooks/useVoiceoverFilter'
import { useChapterAudio } from '@/hooks/useChapterAudio'
import PlayButton from '@/components/revolutionary/PlayButton'

export default function Chapter3TimeStop() {
  const { audioRef, sectionRef, showPlayButton, handlePlayAudio } = useChapterAudio('/audio/Chapter_3_TimeStop.mp3')

  // Applica filtro passa-alto per ridurre i bassi
  useVoiceoverFilter(audioRef)

  return (
    <section ref={sectionRef} className="min-w-screen h-screen flex items-center justify-center relative overflow-hidden bg-black">
      {/* Narration Audio */}
      <audio ref={audioRef} preload="auto">
        <source src="/audio/Chapter_3_TimeStop.mp3" type="audio/mpeg" />
      </audio>

      {/* Background Video */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/video/compressed/jockey-running.mp4" type="video/mp4" />
      </video>

      {/* Elegant Dark Overlay */}
      <div className="absolute inset-0 bg-black/80 z-[1]" />

      {/* Subtle Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.7)_100%)] z-[2]" />

      {/* Film Grain */}
      <div className="film-grain absolute inset-0 z-[3] opacity-25" />

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 md:px-8 max-w-5xl mx-auto py-12 sm:py-16">
        {/* Top Decorative Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="w-20 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent mx-auto mb-2"
        />

        {/* Chapter Number */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="mb-2"
        >
          <span className="text-xs font-light text-white/40 uppercase tracking-[0.5em]">
            Capitolo Terzo
          </span>
        </motion.div>

        {/* Bottom Decorative Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="w-20 h-px bg-gradient-to-r from-transparent via-cyan-400/40 to-transparent mx-auto mb-12"
        />

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-extralight tracking-tight leading-tight">
            <span className="block text-white/95 mb-2">
              FERMARE
            </span>
            <span className="block text-white/50 text-3xl md:text-5xl lg:text-6xl font-thin italic">
              il tempo
            </span>
          </h2>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="text-sm md:text-base text-cyan-400/70 mb-12 font-light italic tracking-[0.2em] uppercase"
        >
          Un rifugio dalla vita che corre
        </motion.p>

        {/* Story Text */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.9 }}
          className="max-w-2xl mx-auto space-y-6 text-sm md:text-base text-white/70 leading-relaxed font-light"
        >
          <p className="relative">
            <span className="text-5xl md:text-6xl text-white/10 absolute -left-6 md:-left-10 -top-3 font-serif">"</span>
            Dopo una dura giornata a scuola, al lavoro, la vita che corre, il tempo che passa senza poterlo fermare... immagina di avere un luogo dove tutto si ferma. Dove puoi respirare. Dove il mondo rallenta
          </p>

          {/* Separator */}
          <div className="flex items-center gap-3 py-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
            <div className="w-1 h-1 rounded-full bg-cyan-400/40" />
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
          </div>

          <p className="text-white/50 text-xs md:text-sm italic">
            Qui il tempo non corre. Ti aspetta.
          </p>
        </motion.div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/60 to-transparent z-[4]" />

      {/* Mobile Play Button */}
      <PlayButton show={showPlayButton} onClick={handlePlayAudio} />
    </section>
  )
}
