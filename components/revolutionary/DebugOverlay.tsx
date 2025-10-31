'use client'

import { useEffect, useState } from 'react'
import { useScroll } from 'framer-motion'

export default function DebugOverlay() {
  const [scrollInfo, setScrollInfo] = useState({ y: 0, progress: 0 })
  const { scrollYProgress } = useScroll()

  useEffect(() => {
    const unsubscribe = scrollYProgress.on('change', (latest) => {
      setScrollInfo({
        y: window.scrollY,
        progress: latest
      })
    })

    return () => unsubscribe()
  }, [scrollYProgress])

  return (
    <div className="fixed bottom-4 left-4 z-[9999] bg-black/90 backdrop-blur-xl border border-white/20 rounded-xl p-4 text-white font-mono text-xs">
      <div className="space-y-1">
        <div>Scroll Y: {Math.round(scrollInfo.y)}px</div>
        <div>Progress: {(scrollInfo.progress * 100).toFixed(1)}%</div>
        <div>X Translation: {Math.round(scrollInfo.progress * -600)}vw</div>
        <div>Current Chapter: {Math.floor(scrollInfo.progress * 7) + 1}/7</div>
      </div>
    </div>
  )
}
