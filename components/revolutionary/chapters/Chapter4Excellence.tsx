'use client'

import { motion } from 'framer-motion'
import { useEffect, useRef } from 'react'
import { useVoiceoverFilter } from '@/hooks/useVoiceoverFilter'

export default function Chapter4Excellence() {
  const audioRef = useRef<HTMLAudioElement>(null)
  const sectionRef = useRef<HTMLElement>(null)

  // Applica filtro passa-alto per ridurre i bassi
  useVoiceoverFilter(audioRef)

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
        <source src="/audio/Chapter_4.mp3" type="audio/mpeg" />
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
        <source src="/video/compressed/saddle-close.mp4" type="video/mp4" />
      </video>

      {/* Elegant Dark Overlay */}
      <div className="absolute inset-0 bg-black/80 z-[1]" />

      {/* Subtle Vignette */}
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.7)_100%)] z-[2]" />

      {/* Film Grain */}
      <div className="film-grain absolute inset-0 z-[3] opacity-25" />

      {/* Main Content */}
      <div className="relative z-10 text-center px-8 max-w-5xl mx-auto py-16">
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
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-extralight tracking-tight leading-tight">
            <span className="block text-white/95 mb-2">
              QUELL'ISTANTE
            </span>
            <span className="block text-white/50 text-3xl md:text-5xl lg:text-6xl font-thin italic">
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
          className="max-w-2xl mx-auto space-y-6 text-sm md:text-base text-white/70 leading-relaxed font-light"
        >
          <p className="relative">
            <span className="text-5xl md:text-6xl text-white/10 absolute -left-6 md:-left-10 -top-3 font-serif">"</span>
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
    </section>
  )
}
