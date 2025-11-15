'use client'

import { motion } from 'framer-motion'
import { useState } from 'react'

interface VideoBackgroundProps {
  videoSrc?: string
  imageSrc?: string
  overlay?: 'dark' | 'light' | 'gradient' | 'none'
  children?: React.ReactNode
}

export default function VideoBackground({
  videoSrc,
  imageSrc,
  overlay = 'dark',
  children
}: VideoBackgroundProps) {
  const [videoError, setVideoError] = useState(false)

  const overlayStyles = {
    dark: 'bg-gradient-to-b from-black/60 via-black/50 to-black/80',
    light: 'bg-gradient-to-b from-white/20 via-white/10 to-white/30',
    gradient: 'bg-gradient-to-br from-primary-dark/80 via-black/60 to-secondary-dark/80',
    none: 'bg-transparent'
  }

  return (
    <div className="absolute inset-0 overflow-hidden">
      {/* Video or Image Background */}
      {videoSrc && !videoError ? (
        <video
          autoPlay
          loop
          muted
          playsInline
          className="video-bg"
          onError={() => setVideoError(true)}
        >
          <source src={videoSrc} type="video/mp4" />
        </video>
      ) : imageSrc ? (
        <motion.div
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 10, repeat: Infinity, repeatType: 'reverse' }}
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${imageSrc})` }}
        />
      ) : (
        /* Fallback Gradient */
        <div className="absolute inset-0 bg-gradient-to-br from-primary-dark via-black to-secondary-dark" />
      )}

      {/* Overlay */}
      <div className={`absolute inset-0 ${overlayStyles[overlay]} z-[1]`} />

      {/* Film Grain Effect */}
      <div className="film-grain absolute inset-0 z-[2]" />

      {/* Content */}
      {children && (
        <div className="relative z-10 h-full">
          {children}
        </div>
      )}
    </div>
  )
}
