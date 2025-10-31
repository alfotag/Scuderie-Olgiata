'use client'

import { useEffect, useRef, useState } from 'react'

export default function AudioManager() {
  const bgMusicRef = useRef<HTMLAudioElement>(null)
  const audioContextRef = useRef<AudioContext | null>(null)
  const gainNodeRef = useRef<GainNode | null>(null)
  const lowpassFilterRef = useRef<BiquadFilterNode | null>(null)
  const sourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null)
  const [isPlaying, setIsPlaying] = useState(false)

  useEffect(() => {
    let fadeIntervalRef: NodeJS.Timeout | null = null

    // Avvia la musica al primo click/scroll/touch dell'utente
    const startMusic = () => {
      if (!isPlaying && bgMusicRef.current) {
        // Setup Web Audio API per controllo volume migliore su mobile
        if (!audioContextRef.current) {
          const AudioContext = window.AudioContext || (window as any).webkitAudioContext
          audioContextRef.current = new AudioContext()

          // Crea source node SOLO per la musica di background
          sourceNodeRef.current = audioContextRef.current.createMediaElementSource(bgMusicRef.current)

          // Crea low-pass filter per enfatizzare le frequenze basse (effetto immersivo)
          lowpassFilterRef.current = audioContextRef.current.createBiquadFilter()
          lowpassFilterRef.current.type = 'lowpass'
          lowpassFilterRef.current.frequency.value = 800 // Taglia frequenze sopra 800Hz per suono più caldo e avvolgente
          lowpassFilterRef.current.Q.value = 0.5 // Transizione morbida

          // Crea gain node per controllare il volume
          gainNodeRef.current = audioContextRef.current.createGain()
          gainNodeRef.current.gain.value = 0.22 // Volume base 22% (alzato leggermente per maggiore presenza)

          // Collega: source -> lowpass filter -> gain -> destination
          sourceNodeRef.current.connect(lowpassFilterRef.current)
          lowpassFilterRef.current.connect(gainNodeRef.current)
          gainNodeRef.current.connect(audioContextRef.current.destination)

          console.log('🎵 Web Audio API initialized with low-pass filter (800Hz) at 22% volume')
        }

        // Resume AudioContext se sospeso (requisito mobile)
        if (audioContextRef.current?.state === 'suspended') {
          audioContextRef.current.resume()
        }

        bgMusicRef.current.play()
          .then(() => {
            setIsPlaying(true)
            console.log('✅ Background music started at 22% volume with low-pass filter (Web Audio API)')
          })
          .catch(error => {
            console.log('❌ Background music autoplay prevented:', error)
          })
      }
    }

    // Ascolta vari eventi per avviare la musica (inclusi eventi mobile + wheel per rotella mouse)
    const events = ['click', 'scroll', 'wheel', 'touchstart', 'touchend', 'keydown']
    events.forEach(event => {
      document.addEventListener(event, startMusic, { passive: true, once: true })
    })

    // Listener per gli audio dei capitoli (sidechain effect)
    const handleVoiceStart = () => {
      const gainNode = gainNodeRef.current
      if (!gainNode) {
        console.log('⚠️ VoiceStart: GainNode not found')
        return
      }

      const currentGain = gainNode.gain.value
      console.log('🔊 VoiceStart: Ducking music from', currentGain, 'to 0.12')

      // Cancella fade precedente se esiste
      if (fadeIntervalRef) {
        clearInterval(fadeIntervalRef)
        fadeIntervalRef = null
      }

      // Abbassa la musica quando inizia la voce (ducking) - smooth transition
      const startGain = currentGain
      const targetGain = 0.12 // 12% durante la voce (mantenendo proporzione con volume base 22%)
      const duration = 300 // 300ms
      const steps = 20
      const stepTime = duration / steps
      const gainStep = (startGain - targetGain) / steps

      let currentStep = 0
      fadeIntervalRef = setInterval(() => {
        if (currentStep < steps && gainNode) {
          const newGain = Math.max(0, startGain - (gainStep * currentStep))
          gainNode.gain.value = newGain
          currentStep++
        } else {
          if (gainNode) gainNode.gain.value = targetGain
          if (fadeIntervalRef) {
            clearInterval(fadeIntervalRef)
            fadeIntervalRef = null
          }
          console.log('✅ VoiceStart: Music ducked to', targetGain)
        }
      }, stepTime)
    }

    const handleVoiceEnd = () => {
      const gainNode = gainNodeRef.current
      if (!gainNode) {
        console.log('⚠️ VoiceEnd: GainNode not found')
        return
      }

      const currentGain = gainNode.gain.value
      console.log('🔊 VoiceEnd: Restoring music from', currentGain, 'to 0.22')

      // Cancella fade precedente se esiste
      if (fadeIntervalRef) {
        clearInterval(fadeIntervalRef)
        fadeIntervalRef = null
      }

      // Rialza la musica quando finisce la voce - smooth transition
      const startGain = currentGain
      const targetGain = 0.22 // Torna al 22% (volume base alzato)
      const duration = 300 // 300ms
      const steps = 20
      const stepTime = duration / steps
      const gainStep = (targetGain - startGain) / steps

      let currentStep = 0
      fadeIntervalRef = setInterval(() => {
        if (currentStep < steps && gainNode) {
          const newGain = Math.min(1, startGain + (gainStep * currentStep))
          gainNode.gain.value = newGain
          currentStep++
        } else {
          if (gainNode) gainNode.gain.value = targetGain
          if (fadeIntervalRef) {
            clearInterval(fadeIntervalRef)
            fadeIntervalRef = null
          }
          console.log('✅ VoiceEnd: Music restored to', targetGain)
        }
      }, stepTime)
    }

    // Ascolta gli eventi custom dai capitoli
    window.addEventListener('voiceStart', handleVoiceStart)
    window.addEventListener('voiceEnd', handleVoiceEnd)

    console.log('🎵 AudioManager: Event listeners registered')

    return () => {
      if (fadeIntervalRef) {
        clearInterval(fadeIntervalRef)
      }
      window.removeEventListener('voiceStart', handleVoiceStart)
      window.removeEventListener('voiceEnd', handleVoiceEnd)
      events.forEach(event => {
        document.removeEventListener(event, startMusic)
      })
    }
  }, [isPlaying])

  return (
    <>
      {/* Background Music - Loop continuo */}
      <audio
        ref={bgMusicRef}
        loop
        preload="auto"
        style={{ display: 'none' }}
      >
        <source src="/audio/Background Version.mp3" type="audio/mpeg" />
      </audio>
    </>
  )
}
