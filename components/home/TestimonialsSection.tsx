'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { FaQuoteLeft, FaStar } from 'react-icons/fa'
import { HiCheckBadge } from 'react-icons/hi2'
import { useRef } from 'react'

const testimonials = [
  {
    name: 'Maria Rossi',
    role: 'Membro Premium dal 2020',
    profession: 'CEO & Imprenditrice',
    content: 'Scuderie Olgiata ha trasformato la mia passione per l\'equitazione in uno stile di vita. La professionalità del team e la qualità delle strutture sono impareggiabili. Un\'esperienza che va oltre ogni aspettativa.',
    rating: 5,
    image: '/images/testimonials/maria.jpg',
    highlight: 'Professionalità impeccabile',
    color: 'from-primary to-primary-dark',
  },
  {
    name: 'Luca Bianchi',
    role: 'Proprietario Cavallo dal 2019',
    profession: 'Atleta Professionista',
    content: 'La cura e l\'attenzione che dedicano ai cavalli è straordinaria. So che il mio cavallo è in ottime mani e questo mi permette di godermi appieno ogni momento insieme. Servizio eccellente.',
    rating: 5,
    image: '/images/testimonials/luca.jpg',
    highlight: 'Cura eccezionale',
    color: 'from-secondary to-secondary-light',
  },
  {
    name: 'Sofia Ferrari',
    role: 'Membro Platinum dal 2018',
    profession: 'Avvocato & Consulente',
    content: 'Non è solo un club equestre, è una vera e propria famiglia. Gli eventi sociali e le opportunità di networking rendono ogni visita speciale. Un ambiente unico e stimolante.',
    rating: 5,
    image: '/images/testimonials/sofia.jpg',
    highlight: 'Community esclusiva',
    color: 'from-primary to-secondary',
  },
]

export default function TestimonialsSection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  return (
    <section ref={containerRef} className="py-32 bg-gradient-to-b from-gray-50 via-white to-gray-50 relative overflow-hidden">
      {/* Animated Background */}
      <motion.div
        style={{
          opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0, 1, 0]),
          scale: useTransform(scrollYProgress, [0, 0.5, 1], [0.8, 1, 0.8])
        }}
        className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-gradient-to-br from-primary/10 to-secondary/10 rounded-full blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-gradient-to-r from-secondary/10 to-primary/10 border border-secondary/20 mb-6"
          >
            <HiCheckBadge className="w-5 h-5 text-secondary" />
            <span className="text-sm font-semibold text-secondary">Testimonianze Verificate</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6"
          >
            <span className="bg-gradient-to-r from-text-primary via-primary to-text-primary bg-clip-text text-transparent">
              Storie di Eccellenza
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-text-secondary max-w-3xl mx-auto leading-relaxed"
          >
            Scopri cosa dicono i nostri membri più soddisfatti.
            <span className="text-primary font-semibold"> Oltre 200 membri </span>
            hanno scelto l'eccellenza di Scuderie Olgiata
          </motion.p>
        </div>

        {/* Testimonials - Staggered Layout */}
        <div className="grid lg:grid-cols-3 gap-8 lg:gap-6">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 60, rotateX: -10 }}
              whileInView={{ opacity: 1, y: 0, rotateX: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{
                duration: 0.8,
                delay: index * 0.15,
                type: "spring",
                stiffness: 100
              }}
              whileHover={{ y: -10, scale: 1.02 }}
              className={`relative group ${index === 1 ? 'lg:mt-12' : ''}`}
              style={{ perspective: '1000px' }}
            >
              {/* Glow Effect */}
              <div className={`absolute -inset-4 bg-gradient-to-br ${testimonial.color} opacity-0 group-hover:opacity-20 blur-2xl transition-opacity duration-500 rounded-3xl`} />

              {/* Card */}
              <div className="relative bg-white rounded-3xl shadow-xl group-hover:shadow-2xl transition-all duration-500 overflow-hidden border border-gray-100">
                {/* Top Gradient Bar */}
                <div className={`h-2 bg-gradient-to-r ${testimonial.color}`} />

                <div className="p-8">
                  {/* Quote Icon */}
                  <div className="relative mb-6">
                    <motion.div
                      initial={{ scale: 0, rotate: -180 }}
                      whileInView={{ scale: 1, rotate: 0 }}
                      viewport={{ once: true }}
                      transition={{ delay: 0.3 + index * 0.1, type: "spring" }}
                      className={`inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-gradient-to-br ${testimonial.color} shadow-lg`}
                    >
                      <FaQuoteLeft className="w-7 h-7 text-white" />
                    </motion.div>
                    {/* Floating Badge */}
                    <motion.div
                      animate={{ y: [0, -5, 0] }}
                      transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
                      className="absolute -top-2 -right-2 px-3 py-1 rounded-full bg-secondary text-white text-xs font-bold shadow-lg"
                    >
                      {testimonial.highlight}
                    </motion.div>
                  </div>

                  {/* Rating Stars */}
                  <div className="flex gap-1 mb-6">
                    {[...Array(testimonial.rating)].map((_, i) => (
                      <motion.div
                        key={i}
                        initial={{ opacity: 0, scale: 0 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.4 + index * 0.1 + i * 0.05 }}
                      >
                        <FaStar className="w-5 h-5 text-secondary drop-shadow-sm" />
                      </motion.div>
                    ))}
                  </div>

                  {/* Content */}
                  <p className="text-text-primary text-base leading-relaxed mb-8 italic">
                    "{testimonial.content}"
                  </p>

                  {/* Author Section */}
                  <div className="flex items-center gap-4 pt-6 border-t border-gray-100">
                    {/* Avatar */}
                    <div className="relative">
                      <div className={`w-14 h-14 rounded-full bg-gradient-to-br ${testimonial.color} flex items-center justify-center text-white font-bold text-lg shadow-lg`}>
                        {testimonial.name.split(' ').map(n => n[0]).join('')}
                      </div>
                      {/* Verified Badge */}
                      <div className="absolute -bottom-1 -right-1 w-6 h-6 rounded-full bg-secondary flex items-center justify-center border-2 border-white">
                        <HiCheckBadge className="w-4 h-4 text-white" />
                      </div>
                    </div>

                    {/* Info */}
                    <div className="flex-1">
                      <div className="font-bold text-text-primary text-base mb-1">
                        {testimonial.name}
                      </div>
                      <div className="text-xs text-text-tertiary mb-1">
                        {testimonial.profession}
                      </div>
                      <div className="text-xs text-primary font-semibold">
                        {testimonial.role}
                      </div>
                    </div>
                  </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute top-20 right-8 w-32 h-32 bg-gradient-to-br from-secondary/5 to-primary/5 rounded-full blur-2xl" />
                <div className="absolute bottom-20 left-8 w-24 h-24 bg-gradient-to-br from-primary/5 to-secondary/5 rounded-full blur-2xl" />
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom CTA */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-20 text-center"
        >
          <div className="relative inline-block">
            <div className="absolute -inset-4 bg-gradient-to-r from-primary via-secondary to-primary opacity-20 blur-2xl" />
            <div className="relative bg-white rounded-2xl px-8 py-6 shadow-xl border border-gray-100">
              <p className="text-text-secondary mb-4 text-lg">
                Vuoi far parte della nostra famiglia?
              </p>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-3 rounded-full bg-gradient-to-r from-primary to-secondary text-white font-semibold shadow-lg hover:shadow-xl transition-all duration-300"
              >
                Diventa Membro Oggi
              </motion.button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
