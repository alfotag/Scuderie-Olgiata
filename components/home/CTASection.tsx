'use client'

import { motion } from 'framer-motion'
import Button from '@/components/ui/Button'
import Link from 'next/link'
import { HiArrowRight, HiCheck, HiSparkles, HiStar } from 'react-icons/hi'
import { GiHorseHead } from 'react-icons/gi'
import { FaTrophy } from 'react-icons/fa'

export default function CTASection() {
  return (
    <section className="py-32 relative overflow-hidden">
      {/* Dynamic Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-primary via-primary-dark to-black" />

      {/* Animated Pattern Overlay */}
      <motion.div
        animate={{
          backgroundPosition: ['0% 0%', '100% 100%'],
        }}
        transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 30px, rgba(212,175,55,0.1) 30px, rgba(212,175,55,0.1) 60px)',
          backgroundSize: '200% 200%'
        }}
      />

      {/* Floating Decorative Elements */}
      <motion.div
        animate={{
          y: [0, -30, 0],
          rotate: [0, 10, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
        className="absolute top-20 left-10 opacity-10"
      >
        <GiHorseHead className="w-64 h-64 text-secondary" />
      </motion.div>

      <motion.div
        animate={{
          y: [0, 30, 0],
          rotate: [0, -10, 0],
          scale: [1, 1.1, 1]
        }}
        transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
        className="absolute bottom-20 right-10 opacity-10"
      >
        <FaTrophy className="w-56 h-56 text-secondary" />
      </motion.div>

      {/* Content Container */}
      <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Side - Content */}
          <motion.div
            initial={{ opacity: 0, x: -50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8 }}
          >
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-secondary/20 backdrop-blur-xl border border-secondary/30 mb-6"
            >
              <HiSparkles className="w-5 h-5 text-secondary" />
              <span className="text-sm font-bold text-secondary tracking-wider uppercase">Offerta Esclusiva</span>
            </motion.div>

            {/* Main Title */}
            <h2 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 leading-tight">
              <span className="text-white">Diventa</span>
              <br />
              <span className="bg-gradient-to-r from-secondary via-secondary-light to-secondary bg-clip-text text-transparent">
                Membro Elite
              </span>
            </h2>

            {/* Description */}
            <p className="text-xl text-white/80 mb-8 leading-relaxed max-w-xl">
              Unisciti alla community più esclusiva di Roma. Scopri un mondo di opportunità, passione ed eccellenza equestre con benefici unici riservati ai nostri membri.
            </p>

            {/* Benefits Grid */}
            <div className="grid grid-cols-2 gap-4 mb-10">
              {[
                { icon: HiCheck, text: 'Accesso 24/7' },
                { icon: HiStar, text: 'Eventi Esclusivi' },
                { icon: FaTrophy, text: 'Formazione Pro' },
                { icon: HiSparkles, text: 'Spa & Wellness' },
              ].map((benefit, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 + idx * 0.1 }}
                  className="flex items-center gap-3 px-4 py-3 rounded-xl bg-white/10 backdrop-blur-xl border border-white/20"
                >
                  <div className="w-10 h-10 rounded-lg bg-secondary/20 flex items-center justify-center flex-shrink-0">
                    <benefit.icon className="w-5 h-5 text-secondary" />
                  </div>
                  <span className="text-white font-semibold text-sm">{benefit.text}</span>
                </motion.div>
              ))}
            </div>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row gap-4">
              <Link href="/abbonamenti">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    className="min-w-[240px] bg-gradient-to-r from-secondary via-secondary-light to-secondary text-black font-bold shadow-2xl shadow-secondary/50 hover:shadow-secondary/80 transition-all duration-300 group"
                  >
                    Scopri i Piani
                    <HiArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-2 transition-transform" />
                  </Button>
                </motion.div>
              </Link>
              <Link href="/contatti">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    className="min-w-[240px] bg-white/10 backdrop-blur-xl border-2 border-white/30 text-white font-bold hover:bg-white/20 hover:border-white/50 transition-all duration-300"
                  >
                    Prenota Tour
                  </Button>
                </motion.div>
              </Link>
            </div>
          </motion.div>

          {/* Right Side - Feature Cards Stack */}
          <motion.div
            initial={{ opacity: 0, x: 50 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="relative"
          >
            {/* Main Feature Card */}
            <div className="relative">
              {/* Glow Effect */}
              <div className="absolute -inset-6 bg-gradient-to-br from-secondary/40 to-primary/40 blur-3xl opacity-60" />

              {/* Card */}
              <div className="relative bg-white/10 backdrop-blur-2xl border border-white/20 rounded-3xl p-8 shadow-2xl">
                <div className="flex items-start justify-between mb-6">
                  <div>
                    <div className="text-secondary text-sm font-bold uppercase tracking-wider mb-2">
                      Membro Premium
                    </div>
                    <div className="text-white text-4xl font-bold">
                      Prima Visita
                      <div className="text-secondary text-2xl mt-1">Gratis</div>
                    </div>
                  </div>
                  <motion.div
                    animate={{ rotate: [0, 10, -10, 0] }}
                    transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                    className="w-16 h-16 rounded-2xl bg-gradient-to-br from-secondary to-secondary-light flex items-center justify-center shadow-xl"
                  >
                    <HiStar className="w-8 h-8 text-white" />
                  </motion.div>
                </div>

                <div className="space-y-3 mb-6">
                  {[
                    'Tour completo delle strutture',
                    'Lezione di prova gratuita',
                    'Consulenza personalizzata',
                    'Degustazione al ristorante',
                  ].map((item, idx) => (
                    <motion.div
                      key={idx}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + idx * 0.1 }}
                      className="flex items-center gap-3"
                    >
                      <div className="w-6 h-6 rounded-full bg-secondary/20 flex items-center justify-center flex-shrink-0">
                        <HiCheck className="w-4 h-4 text-secondary" />
                      </div>
                      <span className="text-white/90 text-sm">{item}</span>
                    </motion.div>
                  ))}
                </div>

                <div className="pt-6 border-t border-white/10">
                  <div className="flex items-center gap-3">
                    <div className="flex -space-x-3">
                      {[1, 2, 3].map((i) => (
                        <div
                          key={i}
                          className="w-10 h-10 rounded-full bg-gradient-to-br from-primary to-secondary border-2 border-white/20 flex items-center justify-center text-white text-xs font-bold"
                        >
                          {String.fromCharCode(64 + i)}
                        </div>
                      ))}
                    </div>
                    <div className="text-white/70 text-sm">
                      <span className="text-secondary font-bold">200+</span> membri attivi
                    </div>
                  </div>
                </div>
              </div>

              {/* Floating Badge */}
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                className="absolute -top-4 -right-4 px-4 py-2 rounded-full bg-gradient-to-r from-secondary to-secondary-light shadow-2xl border-4 border-primary"
              >
                <span className="text-black text-sm font-bold">Offerta Limitata!</span>
              </motion.div>
            </div>

            {/* Background Decorative Cards */}
            <div className="absolute -bottom-6 -left-6 w-64 h-32 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 -z-10 rotate-[-5deg]" />
            <div className="absolute -top-6 -right-6 w-48 h-48 bg-white/5 backdrop-blur-xl rounded-2xl border border-white/10 -z-10 rotate-[5deg]" />
          </motion.div>
        </div>

        {/* Bottom Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="mt-20 grid grid-cols-2 md:grid-cols-4 gap-6"
        >
          {[
            { value: '98%', label: 'Soddisfazione' },
            { value: '25', label: 'Anni Esperienza' },
            { value: '50+', label: 'Cavalli Elite' },
            { value: '15+', label: 'Eventi/Anno' },
          ].map((stat, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, scale: 0.8 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: 0.6 + idx * 0.1 }}
              className="text-center p-6 rounded-2xl bg-white/10 backdrop-blur-xl border border-white/20"
            >
              <div className="text-4xl font-bold text-secondary mb-2">{stat.value}</div>
              <div className="text-sm text-white/70 font-medium">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
