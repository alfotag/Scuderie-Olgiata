'use client'

import { useEffect, useRef, useState, RefObject } from 'react'

export function useChapterAudio(audioSrc: string) {
  const audioRef = useRef<HTMLAudioElement>(null)
  const sectionRef = useRef<HTMLElement>(null)
  const [showPlayButton, setShowPlayButton] = useState(false)
  const [isPlaying, setIsPlaying] = useState(false)
  const isMobileRef = useRef(false)

  // Detect mobile
  useEffect(() => {
    const checkMobile = () => {
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                     ('ontouchstart' in window) ||
                     (window.innerWidth < 768)
      isMobileRef.current = mobile
      console.log('📱 Is mobile detected:', mobile)
    }
    checkMobile()
    window.addEventListener('resize', checkMobile)
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  useEffect(() => {
    const handleAudioPlay = () => {
      console.log('🎵 Audio play event fired')
      window.dispatchEvent(new Event('voiceStart'))
      setIsPlaying(true)
    }

    const handleAudioEnded = () => {
      console.log('🎵 Audio ended event fired')
      window.dispatchEvent(new Event('voiceEnd'))
      setIsPlaying(false)
      // Su mobile, mostra di nuovo il bottone quando l'audio finisce
      if (isMobileRef.current) {
        setShowPlayButton(true)
      }
    }

    const handleAudioPause = () => {
      console.log('🎵 Audio pause event fired')
      window.dispatchEvent(new Event('voiceEnd'))
      setIsPlaying(false)
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
          const audio = audioRef.current
          if (!audio) return

          if (entry.isIntersecting) {
            const isMobile = isMobileRef.current
            console.log('📍 Chapter visible, isMobile:', isMobile, 'audio paused:', audio.paused)

            // Su mobile, mostra SEMPRE il bottone play
            if (isMobile) {
              setShowPlayButton(true)
              console.log('🎵 Play button shown for mobile')
            } else {
              // Su desktop, prova autoplay solo se l'audio non è già stato riprodotto
              if (audio.paused && audio.currentTime === 0) {
                audio.play().catch(error => {
                  console.log('⚠️ Audio autoplay prevented:', error)
                  setShowPlayButton(true)
                })
              }
            }
          } else {
            console.log('📍 Chapter NOT visible')
            // Ferma l'audio quando il capitolo esce dal viewport
            if (!audio.paused) {
              audio.pause()
              audio.currentTime = 0
              console.log('⏹️ Audio stopped - chapter out of view')
            }
            setShowPlayButton(false)
            setIsPlaying(false)
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
  }, [])

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
    isMobile: isMobileRef.current,
    isPlaying
  }
}
