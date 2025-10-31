'use client'

import { useEffect, useRef, useState, RefObject } from 'react'

export function useChapterAudio(audioSrc: string) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const [showPlayButton, setShowPlayButton] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                     ('ontouchstart' in window) ||
                     (window.innerWidth < 768)
      setIsMobile(mobile)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const handleAudioPlay = () => {
      window.dispatchEvent(new Event('voiceStart'))
    }

    const handleAudioEnded = () => {
      window.dispatchEvent(new Event('voiceEnd'))
    }

    const handleAudioPause = () => {
      window.dispatchEvent(new Event('voiceEnd'))
    }

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
            // Su mobile, mostra il bottone play invece di autoplay
            if (isMobile && !isPlaying) {
              setShowPlayButton(true)
            } else if (!isMobile) {
              // Su desktop, prova autoplay
              audioRef.current.play().catch(error => {
                console.log('Audio autoplay prevented:', error)
                setShowPlayButton(true)
              })
            }
          } else if (!entry.isIntersecting && audioRef.current) {
            // Ferma l'audio quando il capitolo esce dal viewport
            audioRef.current.pause()
            audioRef.current.currentTime = 0
            setIsPlaying(false)
            setShowPlayButton(false)
          }
        })
      },
      { threshold: 0.5 }
    )

    if (sectionRef.current) {
      observer.observe(sectionRef.current)
    }

    return () => {
      if (audio) {
        audio.removeEventListener('play', handleAudioPlay)
        audio.removeEventListener('ended', handleAudioEnded)
        audio.removeEventListener('pause', handleAudioPause)
      }
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [isMobile, isPlaying])

  const handlePlayAudio = () => {
    if (audioRef.current) {
      audioRef.current.play()
        .then(() => {
          setIsPlaying(true)
          setShowPlayButton(false)
          console.log('✅ Audio started by user interaction')
        })
        .catch(error => {
          console.error('Error playing audio:', error)
        })
    }
  }

  return {
    audioRef,
    sectionRef,
    showPlayButton,
    handlePlayAudio,
    isMobile,
    isPlaying
  }
}
