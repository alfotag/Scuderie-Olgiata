'use client'

import { motion, useScroll, useTransform } from 'framer-motion'
import { HiArrowRight, HiPhotograph, HiEye } from 'react-icons/hi'
import { useRef, useState } from 'react'
import Link from 'next/link'

const galleryItems = [
  {
    id: 1,
    title: 'Competizioni Elite',
    category: 'Eventi',
    image: '/images/gallery/competition.jpg',
    color: 'from-primary to-primary-dark',
    size: 'large',
  },
  {
    id: 2,
    title: 'Strutture Premium',
    category: 'Facilities',
    image: '/images/gallery/facilities.jpg',
    color: 'from-secondary to-secondary-light',
    size: 'medium',
  },
  {
    id: 3,
    title: 'Allenamento Pro',
    category: 'Training',
    image: '/images/gallery/training.jpg',
    color: 'from-primary to-secondary',
    size: 'medium',
  },
  {
    id: 4,
    title: 'Eventi Sociali',
    category: 'Social',
    image: '/images/gallery/events.jpg',
    color: 'from-secondary to-primary',
    size: 'small',
  },
  {
    id: 5,
    title: 'Wellness & Spa',
    category: 'Lifestyle',
    image: '/images/gallery/spa.jpg',
    color: 'from-primary-dark to-primary',
    size: 'small',
  },
]

export default function GallerySection() {
  const containerRef = useRef<HTMLDivElement>(null)
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start end", "end start"]
  })

  const [hoveredItem, setHoveredItem] = useState<number | null>(null)

  return (
    <section ref={containerRef} className="py-32 bg-black relative overflow-hidden">
      {/* Animated Background Grid */}
      <div className="absolute inset-0 opacity-10">
        <div className="absolute inset-0" style={{
          backgroundImage: 'linear-gradient(rgba(212,175,55,0.1) 1px, transparent 1px), linear-gradient(90deg, rgba(212,175,55,0.1) 1px, transparent 1px)',
          backgroundSize: '50px 50px'
        }} />
      </div>

      {/* Floating Light Effects */}
      <motion.div
        style={{
          y: useTransform(scrollYProgress, [0, 1], [100, -100]),
          opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 0])
        }}
        className="absolute top-20 left-20 w-96 h-96 bg-primary/20 rounded-full blur-3xl"
      />
      <motion.div
        style={{
          y: useTransform(scrollYProgress, [0, 1], [-100, 100]),
          opacity: useTransform(scrollYProgress, [0, 0.5, 1], [0, 0.5, 0])
        }}
        className="absolute bottom-20 right-20 w-96 h-96 bg-secondary/20 rounded-full blur-3xl"
      />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <div className="text-center mb-20">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white/10 backdrop-blur-xl border border-white/20 mb-6"
          >
            <HiPhotograph className="w-5 h-5 text-secondary" />
            <span className="text-sm font-bold text-secondary tracking-wider uppercase">Galleria Fotografica</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6"
          >
            <span className="text-white">Momenti di</span>
            <br />
            <span className="bg-gradient-to-r from-secondary via-secondary-light to-secondary bg-clip-text text-transparent">
              Eccellenza
            </span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1 }}
            className="text-xl text-white/70 max-w-3xl mx-auto leading-relaxed"
          >
            Esplora i momenti più memorabili vissuti nelle nostre strutture attraverso una selezione
            <span className="text-secondary font-semibold"> esclusiva </span>
            di immagini
          </motion.p>
        </div>

        {/* Bento Grid Gallery */}
        <div className="grid grid-cols-12 gap-4 mb-12">
          {/* Large Item */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="col-span-12 lg:col-span-7 row-span-2"
            onMouseEnter={() => setHoveredItem(1)}
            onMouseLeave={() => setHoveredItem(null)}
          >
            <div className="relative h-[500px] lg:h-[600px] rounded-3xl overflow-hidden group cursor-pointer">
              {/* Gradient Background */}
              <div className={`absolute inset-0 bg-gradient-to-br ${galleryItems[0].color}`} />

              {/* Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black via-black/50 to-transparent opacity-60 group-hover:opacity-40 transition-opacity duration-500" />

              {/* Glow Effect */}
              <motion.div
                animate={{
                  opacity: hoveredItem === 1 ? 0.6 : 0,
                  scale: hoveredItem === 1 ? 1 : 0.8
                }}
                className={`absolute -inset-4 bg-gradient-to-br ${galleryItems[0].color} blur-2xl`}
              />

              {/* Content */}
              <div className="absolute inset-0 p-8 flex flex-col justify-end">
                <motion.div
                  initial={{ y: 20, opacity: 0 }}
                  whileInView={{ y: 0, opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.3 }}
                >
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 mb-3">
                    <span className="w-2 h-2 rounded-full bg-secondary" />
                    <span className="text-xs font-bold text-white uppercase tracking-wider">{galleryItems[0].category}</span>
                  </div>
                  <h3 className="text-4xl lg:text-5xl font-bold text-white mb-3">{galleryItems[0].title}</h3>
                  <div className="flex items-center gap-3 text-white/80">
                    <HiEye className="w-5 h-5" />
                    <span className="text-sm font-medium">Visualizza Collezione</span>
                  </div>
                </motion.div>
              </div>

              {/* Hover Overlay */}
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: hoveredItem === 1 ? 1 : 0 }}
                className="absolute inset-0 bg-black/20 backdrop-blur-sm flex items-center justify-center"
              >
                <motion.div
                  initial={{ scale: 0.8 }}
                  animate={{ scale: hoveredItem === 1 ? 1 : 0.8 }}
                  className="w-20 h-20 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center"
                >
                  <HiArrowRight className="w-8 h-8 text-white" />
                </motion.div>
              </motion.div>
            </div>
          </motion.div>

          {/* Medium Items */}
          <div className="col-span-12 lg:col-span-5 grid grid-rows-2 gap-4">
            {galleryItems.slice(1, 3).map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.1 }}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className="relative h-[290px] rounded-3xl overflow-hidden group cursor-pointer"
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color}`} />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-500" />

                {/* Glow Effect */}
                <motion.div
                  animate={{
                    opacity: hoveredItem === item.id ? 0.4 : 0,
                  }}
                  className={`absolute -inset-2 bg-gradient-to-br ${item.color} blur-xl`}
                />

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 mb-2 self-start">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">{item.category}</span>
                  </div>
                  <h4 className="text-2xl font-bold text-white">{item.title}</h4>
                </div>

                {/* Hover Icon */}
                <motion.div
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{
                    opacity: hoveredItem === item.id ? 1 : 0,
                    scale: hoveredItem === item.id ? 1 : 0.8
                  }}
                  className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center"
                >
                  <HiArrowRight className="w-5 h-5 text-white" />
                </motion.div>
              </motion.div>
            ))}
          </div>

          {/* Small Items */}
          <div className="col-span-12 grid grid-cols-2 gap-4">
            {galleryItems.slice(3, 5).map((item, index) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: 0.2 + index * 0.1 }}
                onMouseEnter={() => setHoveredItem(item.id)}
                onMouseLeave={() => setHoveredItem(null)}
                className="relative h-[250px] rounded-3xl overflow-hidden group cursor-pointer"
              >
                {/* Gradient Background */}
                <div className={`absolute inset-0 bg-gradient-to-br ${item.color}`} />

                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent opacity-70 group-hover:opacity-50 transition-opacity duration-500" />

                {/* Content */}
                <div className="absolute inset-0 p-6 flex flex-col justify-end">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 mb-2 self-start">
                    <span className="text-xs font-bold text-white uppercase tracking-wider">{item.category}</span>
                  </div>
                  <h4 className="text-xl font-bold text-white">{item.title}</h4>
                </div>

                {/* Hover Icon */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{
                    opacity: hoveredItem === item.id ? 1 : 0,
                  }}
                  className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/20 backdrop-blur-xl border border-white/30 flex items-center justify-center"
                >
                  <HiArrowRight className="w-4 h-4 text-white" />
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center"
        >
          <Link href="/gallery">
            <motion.button
              whileHover={{ scale: 1.05, y: -2 }}
              whileTap={{ scale: 0.95 }}
              className="relative group"
            >
              <div className="absolute -inset-2 bg-gradient-to-r from-primary via-secondary to-primary rounded-2xl blur opacity-60 group-hover:opacity-100 transition-opacity" />
              <div className="relative px-8 py-4 rounded-2xl bg-gradient-to-r from-primary to-secondary text-white font-bold shadow-2xl flex items-center gap-3">
                <HiPhotograph className="w-6 h-6" />
                <span>Esplora Tutta la Galleria</span>
                <HiArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
              </div>
            </motion.button>
          </Link>
        </motion.div>
      </div>
    </section>
  )
}
