'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { GiHorseHead } from 'react-icons/gi'
import { MdSpa } from 'react-icons/md'
import { FaTrophy, FaArrowRight } from 'react-icons/fa'
import { HiSparkles, HiLightningBolt, HiStar } from 'react-icons/hi'
import { useRef } from 'react'

const features = [
  {
    icon: GiHorseHead,
    title: 'Gestione Cavalli Elite',
    description: 'Box premium con climatizzazione, alimentazione personalizzata certificata, cure veterinarie H24 e programmi di allenamento su misura con trainer professionisti',
    details: ['Box climatizzati 24/7', 'Alimentazione certificata', 'Veterinario H24', 'Personal trainer'],
    color: 'from-primary to-primary-dark',
    image: '/images/features/horse-care.jpg',
  },
  {
    icon: MdSpa,
    title: 'Servizi Premium Esclusivi',
    description: 'Campi da padel professionali, calcetto regolamentare, ristorante gourmet stellato, spa wellness center con trattamenti esclusivi e area relax panoramica',
    details: ['Padel & Calcetto Pro', 'Ristorante Stellato', 'Spa Wellness', 'Lounge Esclusiva'],
    color: 'from-secondary to-secondary-light',
    image: '/images/features/amenities.jpg',
  },
  {
    icon: FaTrophy,
    title: 'Eventi & Competizioni',
    description: 'Gare nazionali e internazionali, eventi sociali esclusivi per membri, balli di gala stagionali, masterclass con campioni olimpici e networking premium',
    details: ['Gare Internazionali', 'Eventi Esclusivi', 'Gala Stagionali', 'Masterclass Pro'],
    color: 'from-primary to-secondary',
    image: '/images/features/events.jpg',
  },
]

export default function FeaturesSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const y = useTransform(scrollYProgress, [0, 1], [100, -100])

  return (
    <section ref={containerRef} className="py-32 bg-gradient-to-b from-white via-gray-50 to-white relative overflow-hidden">
      {/* Animated Background Elements */}
      <motion.div
        style={{ y }}
        className="absolute top-20 right-10 w-96 h-96 bg-primary/5 rounded-full blur-3xl"
      />
      <motion.div
        style={{ y: useTransform(scrollYProgress, [0, 1], [-50, 50]) }}
        className="absolute bottom-20 left-10 w-96 h-96 bg-secondary/5 rounded-full blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-primary/10 to-secondary/10 border border-primary/20 mb-6"
          >
            <HiSparkles className="w-4 h-4 text-primary" />
            <span className="text-sm font-semibold text-primary">Servizi Esclusivi</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-text-primary to-text-secondary bg-clip-text text-transparent">
              Un'Esperienza Senza Pari
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed"
          >
            Dalle competizioni internazionali ai servizi wellness di lusso, ogni dettaglio è pensato per offrire
            <span className="text-primary font-semibold"> l'eccellenza assoluta</span>
          </motion.p>
        </div>

        {/* Features - Alternating Layout */}
        <div className="space-y-32">
          {features.map((feature, index) => {
            const Icon = feature.icon
            const isEven = index % 2 === 0

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 60 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: index * 0.2 }}
                className={`grid lg:grid-cols-2 gap-12 items-center ${isEven ? '' : 'lg:grid-flow-dense'}`}
              >
                {/* Image Side */}
                <div className={`relative group ${isEven ? 'lg:col-start-1' : 'lg:col-start-2'}`}>
                  <motion.div
                    whileHover={{ scale: 1.02 }}
                    transition={{ duration: 0.4 }}
                    className="relative"
                  >
                    {/* Glow Effect */}
                    <div className={`absolute -inset-4 bg-gradient-to-r ${feature.color} opacity-20 blur-2xl group-hover:opacity-30 transition-opacity duration-500 rounded-3xl`} />

                    {/* Main Image Container */}
                    <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl">
                      {/* Placeholder Background */}
                      <div className={`absolute inset-0 bg-gradient-to-br ${feature.color}`} />

                      {/* Overlay Pattern */}
                      <div className="absolute inset-0 bg-[url('/patterns/texture.png')] opacity-10" />

                      {/* Icon Watermark */}
                      <div className="absolute inset-0 flex items-center justify-center opacity-10 group-hover:opacity-20 transition-opacity">
                        <Icon className="w-64 h-64 text-white" />
                      </div>

                      {/* Hover Overlay */}
                      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

                      {/* Corner Badge */}
                      <div className="absolute top-6 right-6 px-4 py-2 rounded-full bg-white/20 backdrop-blur-xl border border-white/30">
                        <span className="text-white text-sm font-semibold">Premium</span>
                      </div>
                    </div>
                  </motion.div>
                </div>

                {/* Content Side */}
                <div className={`${isEven ? 'lg:col-start-2' : 'lg:col-start-1'}`}>
                  <motion.div
                    initial={{ opacity: 0, x: isEven ? 50 : -50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.8, delay: 0.2 }}
                  >
                    {/* Icon */}
                    <div className={`inline-flex items-center justify-center w-20 h-20 rounded-2xl bg-gradient-to-br ${feature.color} shadow-xl mb-6`}>
                      <Icon className="w-10 h-10 text-white" />
                    </div>

                    {/* Title */}
                    <h3 className="text-4xl lg:text-5xl font-bold text-text-primary mb-6 leading-tight">
                      {feature.title}
                    </h3>

                    {/* Description */}
                    <p className="text-lg text-text-secondary mb-8 leading-relaxed">
                      {feature.description}
                    </p>

                    {/* Feature Details */}
                    <div className="grid grid-cols-2 gap-4 mb-8">
                      {feature.details.map((detail, idx) => (
                        <motion.div
                          key={idx}
                          initial={{ opacity: 0, x: -20 }}
                          whileInView={{ opacity: 1, x: 0 }}
                          viewport={{ once: true }}
                          transition={{ delay: 0.3 + idx * 0.1 }}
                          className="flex items-start gap-3 p-4 rounded-xl bg-white shadow-md hover:shadow-xl transition-shadow duration-300 border border-gray-100"
                        >
                          <HiLightningBolt className="w-5 h-5 text-secondary flex-shrink-0 mt-0.5" />
                          <span className="text-sm font-medium text-text-primary">{detail}</span>
                        </motion.div>
                      ))}
                    </div>

                    {/* CTA */}
                    <motion.button
                      whileHover={{ x: 10 }}
                      className={`inline-flex items-center gap-3 px-6 py-3 rounded-full bg-gradient-to-r ${feature.color} text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300 group`}
                    >
                      Scopri di più
                      <FaArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                    </motion.button>
                  </motion.div>
                </div>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom Stats Banner */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 relative"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-primary via-secondary to-primary opacity-10 blur-3xl" />
          <div className="relative bg-gradient-to-br from-primary to-primary-dark rounded-3xl p-12 shadow-2xl overflow-hidden">
            {/* Animated Background Pattern */}
            <motion.div
              animate={{
                backgroundPosition: ['0% 0%', '100% 100%'],
              }}
              transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
              className="absolute inset-0 opacity-10"
              style={{
                backgroundImage: 'repeating-linear-gradient(45deg, transparent, transparent 20px, rgba(255,255,255,0.1) 20px, rgba(255,255,255,0.1) 40px)',
                backgroundSize: '200% 200%'
              }}
            />

            <div className="relative z-10 grid md:grid-cols-3 gap-8 text-center text-white">
              {[
                { icon: HiStar, value: '98%', label: 'Soddisfazione Clienti' },
                { icon: FaTrophy, value: '50+', label: 'Premi Vinti' },
                { icon: HiSparkles, value: '25', label: 'Anni di Eccellenza' },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, scale: 0.8 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="flex flex-col items-center"
                >
                  <stat.icon className="w-12 h-12 mb-4 text-secondary" />
                  <div className="text-5xl font-bold mb-2">{stat.value}</div>
                  <div className="text-sm font-medium text-white/80 tracking-wide">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
