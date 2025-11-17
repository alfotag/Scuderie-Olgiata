'use client'

import { motion } from 'framer-motion'
import { getVideoUrl } from '@/lib/cloudinary-videos'
import { MdSpa } from 'react-icons/md'
import { FaDumbbell, FaUtensils } from 'react-icons/fa'
import { HiOfficeBuilding } from 'react-icons/hi'
import { useVoiceoverFilter } from '@/hooks/useVoiceoverFilter'
import { useChapterAudio } from '@/hooks/useChapterAudio'
import PlayButton from '@/components/revolutionary/PlayButton'

export default function Chapter5Facilities() {
  const { audioRef, sectionRef, showPlayButton, handlePlayAudio } = useChapterAudio('/audio/Chapter_5.mp3')
  useVoiceoverFilter(audioRef)

  const facilities = [
    { icon: HiOfficeBuilding, title: 'CLUBHOUSE', desc: 'Spazio sociale, ristorazione, eventi privati' },
    { icon: FaDumbbell, title: 'SPORT', desc: 'Tennis, padel, fitness, piscina, golf' },
    { icon: FaUtensils, title: 'SERVIZI', desc: 'Ristorante gourmet, bar, servizi hospitality' },
    { icon: MdSpa, title: 'CULTURA', desc: 'Corsi, workshop, eventi culturali' },
  ]

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
        <source src={getVideoUrl("/video/compressed/aerial-view.mp4")} type="video/mp4" />
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
          className="w-20 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent mx-auto mb-2"
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
            Capitolo Quinto
          </span>
        </motion.div>

        {/* Bottom Decorative Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="w-20 h-px bg-gradient-to-r from-transparent via-blue-400/40 to-transparent mx-auto mb-8"
        />

        {/* Title */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.3 }}
          className="mb-8"
        >
          <h2 className="text-2xl sm:text-3xl md:text-5xl lg:text-6xl font-extralight tracking-tight leading-tight">
            <span className="block text-white/95 mb-2">
              CONDIVIDERE
            </span>
            <span className="block text-white/50 text-lg sm:text-xl md:text-3xl lg:text-4xl font-thin italic">
              ogni momento
            </span>
          </h2>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="text-sm md:text-base text-blue-400/70 mb-10 font-light italic tracking-[0.2em] uppercase"
        >
          Passioni, giochi, feste, eventi, pranzi, cene
        </motion.p>

        {/* Story Text */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.9 }}
          className="max-w-2xl mx-auto space-y-4 sm:space-y-5 text-xs sm:text-sm md:text-base text-white/70 leading-relaxed font-light mb-10 px-2"
        >
          <p className="relative pl-4 sm:pl-6">
            <span className="text-3xl sm:text-4xl md:text-5xl text-white/10 absolute left-0 top-0 font-serif">"</span>
            Clubhouse dove condividere risate e racconti. Ristorante per cene indimenticabili. Eventi, feste, tornei. Campi da padel, calcio, palestra, benessere. Non vieni qui solo per andare a cavallo. Vieni qui a vivere, a condividere momenti con persone che diventano famiglia.
          </p>
        </motion.div>

        {/* Facilities Grid - Minimal */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 1.2 }}
          className="grid grid-cols-2 lg:grid-cols-4 gap-3 mb-8"
        >
          {facilities.map((facility, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 1.2 + idx * 0.1, duration: 0.8 }}
              className="relative group"
            >
              <div className="relative bg-white/5 backdrop-blur-sm rounded-lg p-4 border border-white/10 hover:border-blue-400/30 transition-all duration-500">
                <facility.icon className="w-8 h-8 text-blue-400/70 mb-3 mx-auto" />
                <div className="text-xs font-light text-white/90 mb-1 uppercase tracking-wider">{facility.title}</div>
                <div className="text-[11px] sm:text-xs text-white/50 font-light leading-tight">{facility.desc}</div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* Separator */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 1.5 }}
          className="flex items-center gap-3 py-4"
        >
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
          <div className="w-1 h-1 rounded-full bg-blue-400/40" />
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
        </motion.div>

        {/* Final Statement */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 1.6 }}
          className="text-blue-400/80 font-normal text-base md:text-lg"
        >
          Perché la vita è fatta di momenti condivisi. E questo è il luogo perfetto per viverli.
        </motion.p>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/60 to-transparent z-[4]" />
      <PlayButton show={showPlayButton} onClick={handlePlayAudio} />
    </section>
  )
}
