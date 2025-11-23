'use client'

import { motion } from 'framer-motion'
import Image from 'next/image'
import { useVoiceoverFilter } from '@/hooks/useVoiceoverFilter'
import { useChapterAudio } from '@/hooks/useChapterAudio'
import PlayButton from '@/components/revolutionary/PlayButton'

// Capitolo 1: C'era una volta
function Chapter1Teaser() {
  const { audioRef, sectionRef, showPlayButton, handlePlayAudio } = useChapterAudio('/audio/Chapter_1.mp3?v=3')
  useVoiceoverFilter(audioRef)

  return (
    <section ref={sectionRef} className="min-w-screen h-screen flex items-center justify-center relative overflow-hidden bg-black">
      <audio ref={audioRef} preload="auto">
        <source src="/audio/Chapter_1.mp3?v=3" type="audio/mpeg" />
      </audio>

      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/video/compressed/horse-hooves.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/85 z-[1]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.6)_100%)] z-[2]" />
      <div className="film-grain absolute inset-0 z-[3] opacity-30" />

      <div className="relative z-10 text-center px-4 sm:px-6 md:px-8 max-w-5xl mx-auto py-12 sm:py-16">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1.8, ease: [0.16, 1, 0.3, 1] }}
          className="mb-8 sm:mb-10 md:mb-12 flex justify-center"
        >
          <div className="relative w-24 h-24 sm:w-28 sm:h-28 md:w-32 md:h-32">
            <motion.div
              animate={{ opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute inset-0 -m-6 blur-xl bg-gradient-to-br from-amber-200/20 via-amber-400/10 to-amber-200/20"
            />
            <Image
              src="/images/Logo_Scuderie_Olgiata-removebg-preview.png"
              alt="Scuderie Olgiata"
              fill
              className="object-contain drop-shadow-2xl relative z-10"
              priority
            />
          </div>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="w-20 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent mx-auto mb-2"
        />

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

        <motion.div
          initial={{ scaleX: 0 }}
          animate={{ scaleX: 1 }}
          transition={{ duration: 1.2, delay: 0.5 }}
          className="w-20 h-px bg-gradient-to-r from-transparent via-amber-400/40 to-transparent mx-auto mb-8"
        />

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.4, delay: 0.7, ease: [0.16, 1, 0.3, 1] }}
          className="mb-4 sm:mb-6 px-2"
        >
          <h1 className="text-3xl sm:text-4xl md:text-6xl lg:text-7xl xl:text-8xl font-extralight tracking-tight leading-none">
            <span className="block text-white/95 mb-1 sm:mb-2">
              C'ERA UNA VOLTA
            </span>
            <span className="block text-white/50 text-xl sm:text-2xl md:text-4xl lg:text-5xl xl:text-6xl font-thin italic">
              e c'è ancora
            </span>
          </h1>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 1.2 }}
          className="text-xs md:text-sm text-amber-400/70 mb-12 font-light italic tracking-[0.2em] uppercase"
        >
          Una storia che attraversa il tempo
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.4, delay: 1.6 }}
          className="max-w-2xl mx-auto space-y-6 text-sm md:text-base text-white/70 leading-relaxed font-light"
        >
          <p className="relative">
            <span className="text-5xl md:text-6xl text-white/10 absolute -left-6 md:-left-10 -top-3 font-serif">"</span>
            C'era una volta, e c'è ancora, un luogo dove il tempo segue il ritmo degli zoccoli sulla terra. Ma le vere leggende non restano immobili – evolvono, si rinnovano. E tu sei qui, proprio nel momento in cui tutto sta per cambiare.
          </p>

          <div className="flex items-center gap-3 py-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
            <div className="w-1 h-1 rounded-full bg-amber-400/40" />
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
          </div>

          <p className="text-white/50 text-xs md:text-sm italic">
            Benvenuto nel cuore pulsante dell'equitazione romana, dove ogni cavaliere trova la sua strada.
          </p>
        </motion.div>

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

      <div className="absolute bottom-0 left-0 right-0 h-32 bg-gradient-to-t from-black/80 to-transparent z-[4]" />
      <PlayButton show={showPlayButton} onClick={handlePlayAudio} />
    </section>
  )
}

// Capitolo 2: Il Momento
function Chapter2Teaser() {
  const { audioRef, sectionRef, showPlayButton, handlePlayAudio } = useChapterAudio('/audio/Chapter_2.mp3?v=3')
  useVoiceoverFilter(audioRef)

  return (
    <section ref={sectionRef} className="min-w-screen h-screen flex items-center justify-center relative overflow-hidden bg-black">
      <audio ref={audioRef} preload="auto">
        <source src="/audio/Chapter_2.mp3" type="audio/mpeg" />
      </audio>

      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/video/compressed/stables-exit.mp4" type="video/mp4" />
      </video>

      <div className="absolute inset-0 bg-black/80 z-[1]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_20%,rgba(0,0,0,0.7)_100%)] z-[2]" />
      <div className="film-grain absolute inset-0 z-[3] opacity-25" />

      <div className="relative z-10 text-center px-4 sm:px-6 md:px-8 max-w-5xl mx-auto py-12 sm:py-16">
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.2 }}
          className="w-20 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent mx-auto mb-2"
        />

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2 }}
          className="mb-2"
        >
          <span className="text-xs font-light text-white/40 uppercase tracking-[0.5em]">
            Capitolo Secondo
          </span>
        </motion.div>

        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.3 }}
          className="w-20 h-px bg-gradient-to-r from-transparent via-emerald-400/40 to-transparent mx-auto mb-12"
        />

        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.3 }}
          className="mb-12"
        >
          <h2 className="text-5xl md:text-7xl lg:text-8xl font-extralight tracking-tight leading-tight">
            <span className="block text-white/95 mb-2">
              IL MOMENTO
            </span>
          </h2>
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.6 }}
          className="text-sm md:text-base text-emerald-400/70 mb-12 font-light italic tracking-[0.2em] uppercase"
        >
          Quando la visione incontra il coraggio
        </motion.p>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.4, delay: 0.9 }}
          className="max-w-2xl mx-auto space-y-6 text-sm md:text-base text-white/70 leading-relaxed font-light"
        >
          <p className="relative">
            <span className="text-5xl md:text-6xl text-white/10 absolute -left-6 md:-left-10 -top-3 font-serif">"</span>
            Esiste un momento in cui qualcuno guarda ciò che è sempre stato e immagina ciò che potrebbe essere. Una visione ambiziosa per trasformare Scuderie Olgiata nel circolo più completo d'Italia.
          </p>

          <div className="flex items-center gap-3 py-3">
            <div className="h-px flex-1 bg-gradient-to-r from-transparent to-white/10" />
            <div className="w-1 h-1 rounded-full bg-emerald-400/40" />
            <div className="h-px flex-1 bg-gradient-to-l from-transparent to-white/10" />
          </div>

          <p className="text-white/50 text-xs md:text-sm italic">
            Non per stravolgere, ma per elevare. Questo è quel momento.
          </p>
        </motion.div>
      </div>

      <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-black/60 to-transparent z-[4]" />
      <PlayButton show={showPlayButton} onClick={handlePlayAudio} />
    </section>
  )
}

// Capitolo Finale: Coming Soon - STIAMO ARRIVANDO
function ComingSoonChapter() {
  return (
    <section className="min-w-screen h-screen flex items-center justify-center relative overflow-hidden bg-black">
      {/* Background Video con effetto drammatico */}
      <video
        autoPlay
        loop
        muted
        playsInline
        preload="auto"
        className="absolute inset-0 w-full h-full object-cover z-0"
      >
        <source src="/video/compressed/horse-hooves.mp4" type="video/mp4" />
      </video>

      {/* Overlay più scuro per maggiore drammaticità */}
      <div className="absolute inset-0 bg-black/90 z-[1]" />
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,transparent_0%,rgba(0,0,0,0.8)_100%)] z-[2]" />
      <div className="film-grain absolute inset-0 z-[3] opacity-40" />

      {/* Main Content */}
      <div className="relative z-10 text-center px-4 sm:px-6 md:px-8 max-w-6xl mx-auto">
        {/* Linea decorativa superiore animata */}
        <motion.div
          initial={{ scaleX: 0 }}
          whileInView={{ scaleX: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 0.2 }}
          className="w-32 h-[2px] bg-gradient-to-r from-transparent via-red-500/60 to-transparent mx-auto mb-6"
        />

        {/* Badge "Anteprima Esclusiva" */}
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 0.4 }}
          className="mb-8"
        >
          <span className="inline-block px-6 py-2 border border-red-500/30 rounded-full text-[10px] md:text-xs font-light text-red-400/80 uppercase tracking-[0.5em] backdrop-blur-sm bg-red-500/5">
            Anteprima Esclusiva
          </span>
        </motion.div>

        {/* Titolo principale drammatico */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.8, delay: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="mb-12"
        >
          <h2 className="text-4xl sm:text-6xl md:text-8xl lg:text-9xl font-extralight tracking-tight leading-none mb-4">
            <motion.span
              className="block text-white/95"
              animate={{ opacity: [0.9, 1, 0.9] }}
              transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
            >
              STIAMO
            </motion.span>
            <motion.span
              className="block bg-gradient-to-r from-red-400 via-amber-400 to-red-400 bg-clip-text text-transparent"
              animate={{
                backgroundPosition: ['0%', '100%', '0%'],
              }}
              transition={{ duration: 5, repeat: Infinity, ease: 'linear' }}
              style={{ backgroundSize: '200% 100%' }}
            >
              ARRIVANDO
            </motion.span>
          </h2>

          {/* Sottotitolo misterioso */}
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 1 }}
            className="text-base md:text-xl lg:text-2xl text-white/40 font-thin italic tracking-wide"
          >
            La rivoluzione sta per iniziare
          </motion.p>
        </motion.div>

        {/* Decorazione centrale */}
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.2, delay: 1.3 }}
          className="flex justify-center items-center gap-4 mb-12"
        >
          <div className="h-px w-16 md:w-24 bg-gradient-to-r from-transparent to-red-500/40" />
          <motion.div
            animate={{
              scale: [1, 1.3, 1],
              opacity: [0.4, 0.8, 0.4]
            }}
            transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
            className="w-3 h-3 rounded-full bg-red-500/60 shadow-[0_0_20px_rgba(239,68,68,0.6)]"
          />
          <div className="h-px w-16 md:w-24 bg-gradient-to-l from-transparent to-red-500/40" />
        </motion.div>

        {/* Messaggio teaser */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 1.6 }}
          className="max-w-3xl mx-auto space-y-8"
        >
          <p className="text-sm md:text-lg lg:text-xl text-white/60 leading-relaxed font-light">
            Hai visto solo l'inizio. La storia completa è in arrivo.
          </p>

          <div className="flex items-center justify-center gap-3 py-4">
            <div className="h-px flex-1 max-w-[100px] bg-gradient-to-r from-transparent to-white/20" />
            <div className="flex gap-2">
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-red-400/60"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0 }}
              />
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-amber-400/60"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 0.5 }}
              />
              <motion.div
                className="w-1.5 h-1.5 rounded-full bg-red-400/60"
                animate={{ opacity: [0.3, 1, 0.3] }}
                transition={{ duration: 1.5, repeat: Infinity, delay: 1 }}
              />
            </div>
            <div className="h-px flex-1 max-w-[100px] bg-gradient-to-l from-transparent to-white/20" />
          </div>

          {/* Elenco teaser */}
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 2 }}
            className="text-xs md:text-sm text-white/40 space-y-3 font-light tracking-wide"
          >
            <p>✦ Il circolo più completo d'Italia</p>
            <p>✦ Eccellenza equestre incontra innovazione</p>
            <p>✦ Un'esperienza senza precedenti</p>
          </motion.div>

          {/* CTA finale */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 1.5, delay: 2.4 }}
            className="pt-8"
          >
            <motion.div
              animate={{
                boxShadow: [
                  '0 0 20px rgba(239, 68, 68, 0.2)',
                  '0 0 40px rgba(239, 68, 68, 0.4)',
                  '0 0 20px rgba(239, 68, 68, 0.2)',
                ]
              }}
              transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-block"
            >
              <div className="px-8 md:px-12 py-4 md:py-5 border-2 border-red-500/40 rounded-full backdrop-blur-sm bg-gradient-to-r from-red-500/10 to-amber-500/10">
                <p className="text-xs md:text-sm text-white/80 uppercase tracking-[0.3em] font-light">
                  Resta connesso
                </p>
              </div>
            </motion.div>
          </motion.div>
        </motion.div>

        {/* Hint misterioso */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 1.5, delay: 2.8 }}
          className="mt-16"
        >
          <motion.p
            animate={{ opacity: [0.2, 0.5, 0.2] }}
            transition={{ duration: 3, repeat: Infinity }}
            className="text-[10px] md:text-xs text-white/20 uppercase tracking-[0.4em] italic"
          >
            La storia continua presto...
          </motion.p>
        </motion.div>
      </div>

      {/* Effetto glow dal basso */}
      <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-red-950/20 via-black/40 to-transparent z-[4]" />
    </section>
  )
}

// Componente principale del Teaser
export default function BookTeaser() {
  return (
    <div className="w-full">
      <Chapter1Teaser />
      <Chapter2Teaser />
      <ComingSoonChapter />
    </div>
  )
}
