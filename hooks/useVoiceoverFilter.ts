import { useEffect, useRef } from 'react'

/**
 * Hook per applicare un filtro passa-alto agli audio dei voice over
 * per ridurre le frequenze basse che possono dare fastidio
 */
export function useVoiceoverFilter(audioRef: React.RefObject<HTMLAudioElement>) {
  const audioContextRef = useRef<AudioContext | null>(null)
  const sourceNodeRef = useRef<MediaElementAudioSourceNode | null>(null)
  const filterNodeRef = useRef<BiquadFilterNode | null>(null)

  useEffect(() => {
    if (!audioRef.current) return

    const audio = audioRef.current

    // Inizializza Web Audio API al primo play
    const initializeFilter = () => {
      if (audioContextRef.current) return // Già inizializzato

      try {
        const AudioContext = window.AudioContext || (window as any).webkitAudioContext
        audioContextRef.current = new AudioContext()

        // Crea source dal MediaElement
        sourceNodeRef.current = audioContextRef.current.createMediaElementSource(audio)

        // Crea filtro passa-alto per ridurre i bassi
        filterNodeRef.current = audioContextRef.current.createBiquadFilter()
        filterNodeRef.current.type = 'highpass' // Filtro passa-alto
        filterNodeRef.current.frequency.value = 150 // Taglia frequenze sotto 150Hz
        filterNodeRef.current.Q.value = 0.7 // Qualità del filtro

        // Collega: source -> filter -> destination
        sourceNodeRef.current.connect(filterNodeRef.current)
        filterNodeRef.current.connect(audioContextRef.current.destination)

        console.log('🎙️ Voice over filter initialized: highpass @ 150Hz')
      } catch (error) {
        console.error('❌ Error initializing voiceover filter:', error)
      }
    }

    // Aggiungi listener per inizializzare al primo play
    audio.addEventListener('play', initializeFilter, { once: true })

    return () => {
      audio.removeEventListener('play', initializeFilter)
    }
  }, [audioRef])

  return null
}
