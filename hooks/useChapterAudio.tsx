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
            console.log('📍 Chapter visible, isMobile:', isMobile, 'audio paused:', audio.paused, 'currentTime:', audio.currentTime)

            // SEMPRE prova autoplay prima (sia desktop che mobile)
            // Dato che l'utente ha già interagito cliccando "Tocca per Iniziare"
            if (audio.paused && audio.currentTime === 0) {
              console.log('🎵 Attempting autoplay for chapter audio...')
              console.log('🎵 Audio ready state:', audio.readyState, 'network state:', audio.networkState)

              // Assicurati che l'audio sia caricato
              const tryPlay = () => {
                audio.play()
                  .then(() => {
                    console.log('✅ Audio autoplay SUCCESS!')
                    setIsPlaying(true)
                    setShowPlayButton(false)
                  })
                  .catch(error => {
                    console.error('❌ Audio autoplay FAILED:', error)
                    // Solo se l'autoplay fallisce, mostra il bottone play
                    setShowPlayButton(true)
                    console.log('🎵 Play button shown because autoplay failed')
                  })
              }

              // Se l'audio non è ancora caricato, aspetta che si carichi
              if (audio.readyState < 3) {
                console.log('⏳ Waiting for audio to load...')
                audio.addEventListener('canplay', tryPlay, { once: true })
                audio.load() // Forza il caricamento
              } else {
                tryPlay()
              }
            } else if (audio.paused && audio.currentTime > 0) {
              // L'audio è stato già riprodotto in precedenza
              console.log('🎵 Audio was previously played, showing play button')
              setShowPlayButton(true)
            }
          } else {
            console.log('📍 Chapter NOT visible - stopping audio')
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
      { threshold: 0.2 }
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
