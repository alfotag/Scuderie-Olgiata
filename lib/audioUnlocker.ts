// Global audio unlocker for iOS/Safari
// Uses a SINGLE audio element that changes source instead of multiple elements

class AudioUnlocker {
  private static instance: AudioUnlocker
  private globalAudio: HTMLAudioElement | null = null
  private currentSrc: string = ''
  private isUnlocked = false
  private eventListeners: Map<string, Set<(event: Event) => void>> = new Map()

  private constructor() {
    if (typeof window !== 'undefined') {
      this.createGlobalAudio()
    }
  }

  static getInstance(): AudioUnlocker {
    if (!AudioUnlocker.instance) {
      AudioUnlocker.instance = new AudioUnlocker()
    }
    return AudioUnlocker.instance
  }

  private createGlobalAudio() {
    console.log('🎵 Creating single global audio element...')
    this.globalAudio = new Audio()
    this.globalAudio.preload = 'metadata'

    // Proxy eventi per i listeners
    this.globalAudio.addEventListener('play', (e) => {
      this.triggerEvent('play', e)
    })
    this.globalAudio.addEventListener('pause', (e) => {
      this.triggerEvent('pause', e)
    })
    this.globalAudio.addEventListener('ended', (e) => {
      this.triggerEvent('ended', e)
    })
    this.globalAudio.addEventListener('timeupdate', (e) => {
      this.triggerEvent('timeupdate', e)
    })

    console.log('✅ Global audio element created')
  }

  getGlobalAudio(): HTMLAudioElement | null {
    return this.globalAudio
  }

  async unlockAll() {
    if (this.isUnlocked || !this.globalAudio) {
      console.log('🎵 Already unlocked or no audio element')
      return
    }

    console.log('🎵 Unlocking global audio element...')

    try {
      // IMPORTANTE: Assegna una src valida prima di sbloccare
      // Altrimenti play() fallisce perché non c'è nessun file da riprodurre
      if (!this.globalAudio.src) {
        console.log('🎵 Setting initial audio source for unlock...')
        this.globalAudio.src = '/audio/Chapter_1.mp3'
        this.currentSrc = '/audio/Chapter_1.mp3'
        this.globalAudio.load()
      }

      // Sblocca l'elemento audio con un piccolo suono quasi silenzioso
      this.globalAudio.volume = 0.01
      console.log('🎵 Attempting to play for unlock...')
      const playPromise = this.globalAudio.play()
      if (playPromise !== undefined) {
        await playPromise
        console.log('🎵 Play successful, pausing...')
        this.globalAudio.pause()
        this.globalAudio.currentTime = 0
        this.globalAudio.volume = 1
      }
      this.isUnlocked = true
      console.log('✅ Global audio element unlocked!')
    } catch (error) {
      console.error('❌ Failed to unlock global audio:', error)
      // Anche se fallisce, segna come unlocked per permettere tentativi successivi
      this.isUnlocked = true
    }
  }

  async switchToSource(src: string) {
    if (!this.globalAudio) {
      console.error('❌ No global audio element')
      return false
    }

    // Strip query parameters
    const cleanSrc = src.split('?')[0]

    if (this.currentSrc === cleanSrc) {
      console.log('🎵 Already on source:', cleanSrc)
      return true
    }

    console.log('🎵 Switching audio source to:', cleanSrc)

    try {
      // Stop current audio
      if (!this.globalAudio.paused) {
        this.globalAudio.pause()
      }

      // Change source
      this.globalAudio.src = cleanSrc
      this.currentSrc = cleanSrc

      // Load new source
      this.globalAudio.load()

      console.log('✅ Source switched successfully')
      return true
    } catch (error) {
      console.error('❌ Failed to switch source:', error)
      return false
    }
  }

  async play() {
    if (!this.globalAudio) {
      console.error('❌ No global audio element')
      return false
    }

    try {
      console.log('🎵 Playing global audio...')
      await this.globalAudio.play()
      console.log('✅ Audio playing')
      return true
    } catch (error) {
      console.error('❌ Failed to play audio:', error)
      return false
    }
  }

  pause() {
    if (!this.globalAudio) return
    this.globalAudio.pause()
  }

  stop() {
    if (!this.globalAudio) return
    this.globalAudio.pause()
    this.globalAudio.currentTime = 0
  }

  getCurrentSrc(): string {
    return this.currentSrc
  }

  // Event listener management
  addEventListener(event: string, callback: (event: Event) => void) {
    if (!this.eventListeners.has(event)) {
      this.eventListeners.set(event, new Set())
    }
    this.eventListeners.get(event)!.add(callback)
  }

  removeEventListener(event: string, callback: (event: Event) => void) {
    const listeners = this.eventListeners.get(event)
    if (listeners) {
      listeners.delete(callback)
    }
  }

  private triggerEvent(event: string, originalEvent: Event) {
    const listeners = this.eventListeners.get(event)
    if (listeners) {
      listeners.forEach(callback => callback(originalEvent))
    }
  }

  getIsUnlocked(): boolean {
    return this.isUnlocked
  }
}

export const audioUnlocker = AudioUnlocker.getInstance()
