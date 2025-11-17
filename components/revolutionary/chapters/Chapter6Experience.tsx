'use client'

import { motion } from 'framer-motion'
import { getVideoUrl } from '@/lib/cloudinary-videos'
import { useEffect, useRef } from 'react'

export default function Chapter6Experience() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  useEffect(() => {
    const handleAudioPlay = () => { window.dispatchEvent(new Event('voiceStart')) }
    const handleAudioEnded = () => { window.dispatchEvent(new Event('voiceEnd')) }
    const handleAudioPause = () => { window.dispatchEvent(new Event('voiceEnd')) }

    const audio = audioRef.current
    if (audio) {
      audio.addEventListener('play', handleAudioPlay)
      audio.addEventListener('ended', handleAudioEnded)
      audio.addEventListener('pause', handleAudioPause)
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting && audioRef.current) {
            audioRef.current.play().catch(error => { console.log('Audio autoplay prevented:', error) })
          } else if (!entry.isIntersecting && audioRef.current) {
            audioRef.current.pause()
            audioRef.current.currentTime = 0
          }
        })
      },
      { threshold: 0.5 }
    )

    if (sectionRef.current) { observer.observe(sectionRef.current) }

    return () => {
      if (audio) {
        audio.removeEventListener('play', handleAudioPlay)
        audio.removeEventListener('ended', handleAudioEnded)
        audio.removeEventListener('pause', handleAudioPause)
      }
      if (sectionRef.current) { observer.unobserve(sectionRef.current) }
    }
  }, [])

  return (
    <section ref={sectionRef} className="min-w-screen h-screen flex items-center justify-center relative overflow-hidden bg-black">
      {/* Narration Audio */}
      <audio ref={audioRef} preload="auto">
        <source src="/audio/Chapter_6.mp3?v=2" type="audio/mpeg" />
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
          const target = e.target as HTMLVideoElement
          target.style.display = 'none'
        }}
      >
        <source src={getVideoUrl("/video/compressed/jockey-running.mp4")} type="video/mp4" />
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
          className="w-20 h-px bg-gradient-to-r from-transparent via-violet-400/40 to-transparent mx-auto mb-2"
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
            Capitolo Sesto
          </span>
        </motion.div>

        {/* Bottom Decorative Line */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="w-20 h-px bg-gradient-to-r from-transparent via-violet-400/40 to-transparent mx-auto mb-12"
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
              FERMARE
            </span>
            <span className="block text-white/50 text-lg sm:text-xl md:text-3xl lg:text-4xl font-thin italic">
              l'istante
            </span>
          </h2>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="text-sm md:text-base text-violet-400/70 mb-12 font-light italic tracking-[0.2em] uppercase"
        >
          15 ettari dove il tempo ha un altro ritmo
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
            15 ettari dove tutto può accadere. Una lezione al mattino, un pranzo con amici al ristorante, un torneo di padel nel pomeriggio. Un aperitivo. Una cena sotto le stelle d'estate. Un film proiettato all'aperto. Le feste, i compleanni, gli eventi che trasformano un sabato qualunque in un giorno che ricorderai.
          </p>

          {/* Separator */}
          <div className="flex items-center gap-3 py-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
            <div className="w-1 h-1 rounded-full bg-violet-400/40" />
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
          </div>

          <p className="text-violet-400/80 font-normal text-base md:text-lg">
            Non un club sportivo. Un luogo dove vivere.
          </p>
        </motion.div>
      </div>

      {/* Bottom Fade */}
      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/60 to-transparent z-[4]" />
    </section>
  )
}
