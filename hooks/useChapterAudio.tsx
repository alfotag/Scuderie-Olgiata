'use client'

import { useEffect, useRef, useState, RefObject } from 'react'
import { audioUnlocker } from '@/lib/audioUnlocker'

export function useChapterAudio(audioSrc: string) {
  const audioRef = useRef<HTMLAudioElement | null>(null)
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
    // Get the single global audio element
    const audio = audioUnlocker.getGlobalAudio()
    if (!audio) {
      console.error('❌ Failed to get global audio element')
      return
    }

    audioRef.current = audio
    console.log('🎵 Using global audio element for:', audioSrc)

    const handleAudioPlay = () => {
      // Verifica se è il MIO capitolo che sta suonando
      const currentSrc = audioUnlocker.getCurrentSrc()
      const mySrc = audioSrc.split('?')[0]
      if (currentSrc === mySrc) {
        console.log('🎵 Audio play event fired for my chapter:', mySrc)
        window.dispatchEvent(new Event('voiceStart'))
        setIsPlaying(true)
      }
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

    // Usa il sistema di event listener dell'audioUnlocker
    audioUnlocker.addEventListener('play', handleAudioPlay)
    audioUnlocker.addEventListener('ended', handleAudioEnded)
    audioUnlocker.addEventListener('pause', handleAudioPause)

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach(async (entry) => {
          if (entry.isIntersecting) {
            const isMobile = isMobileRef.current
            console.log('📍 Chapter visible:', audioSrc, 'isMobile:', isMobile)

            // Cambia la sorgente dell'audio globale a questo capitolo
            const switched = await audioUnlocker.switchToSource(audioSrc)
            if (!switched) {
              console.error('❌ Failed to switch audio source')
              setShowPlayButton(true)
              return
            }

            // Aspetta che l'audio sia pronto
            const audio = audioUnlocker.getGlobalAudio()
            if (!audio) return

            const tryPlay = async () => {
              console.log('🎵 Attempting autoplay for chapter...')
              const success = await audioUnlocker.play()

              if (success) {
                console.log('✅ Audio autoplay SUCCESS!')
                setIsPlaying(true)
                setShowPlayButton(false)
              } else {
                console.warn('⚠️ Audio autoplay failed, showing play button')
                setShowPlayButton(true)
              }
            }

            // Se l'audio non è ancora caricato, aspetta
            if (audio.readyState < 3) {
              console.log('⏳ Waiting for audio to load...')
              audio.addEventListener('canplay', tryPlay, { once: true })
            } else {
              await tryPlay()
            }
          } else {
            console.log('📍 Chapter NOT visible - checking if should stop audio')

            // Ferma solo se è il MIO capitolo che sta suonando
            const currentSrc = audioUnlocker.getCurrentSrc()
            const mySrc = audioSrc.split('?')[0]

            if (currentSrc === mySrc) {
              console.log('⏹️ Stopping my chapter audio')
              audioUnlocker.stop()
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
      audioUnlocker.removeEventListener('play', handleAudioPlay)
      audioUnlocker.removeEventListener('ended', handleAudioEnded)
      audioUnlocker.removeEventListener('pause', handleAudioPause)

      if (sectionRef.current) {
        observer.unobserve(sectionRef.current)
      }
    }
  }, [audioSrc])

  const handlePlayAudio = async () => {
    // Prima cambia la sorgente a questo capitolo
    const switched = await audioUnlocker.switchToSource(audioSrc)
    if (!switched) {
      console.error('❌ Failed to switch audio source')
      return
    }

    // Poi riproduci
    const success = await audioUnlocker.play()
    if (success) {
      setIsPlaying(true)
      setShowPlayButton(false)
      console.log('✅ Audio started by user interaction')
    } else {
      console.error('❌ Failed to play audio')
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
