// Global audio unlocker for iOS/Safari
// Unlocks all audio elements when user first interacts

const AUDIO_PATHS = [
  '/audio/Chapter_1.mp3',
  '/audio/Chapter_2.mp3',
  '/audio/Chapter_3_TimeStop.mp3',
  '/audio/Chapter_4.mp3',
  '/audio/Chapter_5.mp3',
  '/audio/Chapter_6.mp3',
  '/audio/Chapter_7.mp3',
]

class AudioUnlocker {
  private static instance: AudioUnlocker
  private audioMap: Map<string, HTMLAudioElement> = new Map()
  private isUnlocked = false

  private constructor() {
    // Pre-create audio elements in the background
    if (typeof window !== 'undefined') {
      this.preloadAudios()
    }
  }

  static getInstance(): AudioUnlocker {
    if (!AudioUnlocker.instance) {
      AudioUnlocker.instance = new AudioUnlocker()
    }
    return AudioUnlocker.instance
  }

  private preloadAudios() {
    console.log('🎵 Pre-loading audio elements...')
    AUDIO_PATHS.forEach(path => {
      const audio = new Audio()
      audio.preload = 'metadata'
      audio.src = path
      this.audioMap.set(path, audio)
      console.log('🎵 Pre-loaded:', path)
    })
  }

  getAudio(src: string): HTMLAudioElement | null {
    // Strip query parameters for lookup (e.g., '/audio/Chapter_1.mp3?v=3' -> '/audio/Chapter_1.mp3')
    const cleanSrc = src.split('?')[0]
    const audio = this.audioMap.get(cleanSrc)
    if (!audio) {
      console.warn('⚠️ Audio not found in pre-loaded pool:', cleanSrc, '(original:', src, ')')
      return null
    }
    console.log('🎵 Retrieved pre-loaded audio:', cleanSrc, 'isUnlocked:', this.isUnlocked)
    return audio
  }

  private async unlockSingleAudio(audio: HTMLAudioElement) {
    try {
      // Play and immediately pause to unlock the audio element
      const playPromise = audio.play()
      if (playPromise !== undefined) {
        await playPromise
        audio.pause()
        audio.currentTime = 0
      }
      console.log('✅ Audio unlocked:', audio.src)
    } catch (error) {
      console.warn('⚠️ Failed to unlock audio:', audio.src, error)
    }
  }

  async unlockAll() {
    if (this.isUnlocked) {
      console.log('🎵 Already unlocked, skipping')
      return
    }

    console.log('🎵 Unlocking all pre-loaded audio elements...')
    console.log('🎵 Total pre-loaded audios:', this.audioMap.size)

    // Unlock all pre-loaded audios
    const promises = Array.from(this.audioMap.values()).map(audio =>
      this.unlockSingleAudio(audio)
    )

    await Promise.allSettled(promises)

    this.isUnlocked = true
    console.log('✅ All audio elements unlocked and ready!')
  }

  getIsUnlocked(): boolean {
    return this.isUnlocked
  }
}

export const audioUnlocker = AudioUnlocker.getInstance()
