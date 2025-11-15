'use client'

import { motion } from 'framer-motion'
import { useVoiceoverFilter } from '@/hooks/useVoiceoverFilter'
import { useChapterAudio } from '@/hooks/useChapterAudio'
import PlayButton from '@/components/revolutionary/PlayButton'

export default function Chapter4Excellence() {
  const { audioRef, sectionRef, showPlayButton, handlePlayAudio } = useChapterAudio('/audio/Chapter_4.mp3')
  useVoiceoverFilter(audioRef)

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
        <source src="/video/compressed/saddle-close.mp4" type="video/mp4" />
      </video>

      {/* Elegant Dark Overlay */}
      <div className="absolute inset-0 bg-black/80 z-[1]" />

      {/* Subtle Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.7)_100%)] z-[2]" />

      {/* Film Grain */}
      <div className="film-grain absolute inset-0 z-[3] opacity-25" />

      {/* Main Content */}
      <div className="relative z-10 text-center px-2 sm:px-4 md:px-6 max-w-4xl mx-auto py-8 sm:py-12 overflow-hidden">
        {/* Top Decorative Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="w-20 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent mx-auto mb-2"
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
            Capitolo Quarto
          </span>
        </motion.div>

        {/* Bottom Decorative Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="w-20 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent mx-auto mb-12"
        />

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extralight tracking-tight leading-tight">
            <span className="block text-white/95 mb-2">
              QUELL'ISTANTE
            </span>
            <span className="block text-white/50 text-lg sm:text-xl md:text-3xl lg:text-4xl font-thin italic">
              in cui dimentichi tutto
            </span>
          </h2>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="text-sm md:text-base text-amber-400/70 mb-12 font-light italic tracking-[0.2em] uppercase"
        >
          Quando tutto scompare tranne l'essenziale
        </motion.p>

        {/* Story Text */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.9 }}
          className="max-w-2xl mx-auto space-y-4 sm:space-y-6 text-xs sm:text-sm md:text-base text-white/70 leading-relaxed font-light px-2"
        >
          <p className="relative pl-4 sm:pl-6">
            <span className="text-3xl sm:text-4xl md:text-5xl text-white/10 absolute left-0 top-0 font-serif">"</span>
            Una passeggiata a cavallo al calar del sole. Un cavallo che corre libero al vento su distese chilometriche di campi verdi. E tu, in quell'istante, dimentichi tutto. Le scadenze, le ansie, il rumore. Resta solo il battito, il respiro, la libertà.
          </p>

          {/* Separator */}
          <div className="flex items-center gap-3 py-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
            <div className="w-1 h-1 rounded-full bg-amber-400/40" />
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
          </div>

          <p className="text-amber-400/80 font-normal text-base md:text-lg">
            Questo è ciò che ti regaliamo: momenti che valgono una vita.
          </p>
          <p className="text-white/50 text-xs md:text-sm italic">
            Momenti che non dimenticherai mai.
          </p>
        </motion.div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/60 to-transparent z-[4]" />
      <PlayButton show={showPlayButton} onClick={handlePlayAudio} />
    </section>
  )
}
