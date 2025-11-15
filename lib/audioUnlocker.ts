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
  private audioElements: Set<HTMLAudioElement> = new Set()
  private preloadedAudios: HTMLAudioElement[] = []
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
      this.preloadedAudios.push(audio)
      console.log('🎵 Pre-loaded:', path)
    })
  }

  registerAudio(audio: HTMLAudioElement) {
    this.audioElements.add(audio)
    console.log('🎵 Audio registered, total:', this.audioElements.size)

    // If already unlocked, unlock this audio immediately
    if (this.isUnlocked) {
      this.unlockSingleAudio(audio)
    }
  }

  unregisterAudio(audio: HTMLAudioElement) {
    this.audioElements.delete(audio)
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

    console.log('🎵 Unlocking all audio elements...')
    console.log('🎵 Pre-loaded audios:', this.preloadedAudios.length)
    console.log('🎵 Registered audios:', this.audioElements.size)

    // Unlock pre-loaded audios first
    const preloadedPromises = this.preloadedAudios.map(audio =>
      this.unlockSingleAudio(audio)
    )

    // Unlock registered audios
    const registeredPromises = Array.from(this.audioElements).map(audio =>
      this.unlockSingleAudio(audio)
    )

    await Promise.allSettled([...preloadedPromises, ...registeredPromises])

    this.isUnlocked = true
    console.log('✅ All audio elements unlocked!')
  }

  getIsUnlocked(): boolean {
    return this.isUnlocked
  }
}

export const audioUnlocker = AudioUnlocker.getInstance()
