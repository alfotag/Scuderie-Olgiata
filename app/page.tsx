'use client'

import { useState } from 'react'
import { AnimatePresence } from 'framer-motion'
import LandingPage from '@/components/revolutionary/LandingPage'
import HorizontalScroll from '@/components/revolutionary/HorizontalScroll'
import CustomCursor from '@/components/revolutionary/CustomCursor'
import AudioManager from '@/components/revolutionary/AudioManager'
import Chapter1Intro from '@/components/revolutionary/chapters/Chapter1Intro'
import Chapter2Heritage from '@/components/revolutionary/chapters/Chapter2Heritage'
import Interlude1Dreams from '@/components/revolutionary/chapters/Interlude1Dreams'
import Chapter3TimeStop from '@/components/revolutionary/chapters/Chapter3TimeStop'
import Chapter4Excellence from '@/components/revolutionary/chapters/Chapter4Excellence'
import Interlude2Heritage from '@/components/revolutionary/chapters/Interlude2Heritage'
import Chapter5Facilities from '@/components/revolutionary/chapters/Chapter5Facilities'
import Interlude3Life from '@/components/revolutionary/chapters/Interlude3Life'
import Chapter6Community from '@/components/revolutionary/chapters/Chapter6Community'
import Chapter7Decision from '@/components/revolutionary/chapters/Chapter7Decision'

export default function Home() {
  const [hasStarted, setHasStarted] = useState(false)

  const handleStart = () => {
    setHasStarted(true)
  }

  return (
    <>
      <style jsx global>{`
        ${hasStarted ? `
          * {
            cursor: none !important;
          }
        ` : ''}
        html {
          scroll-behavior: smooth;
        }
      `}</style>

      <AnimatePresence mode="wait">
        {!hasStarted ? (
          <LandingPage key="landing" onStart={handleStart} />
        ) : (
          <>
            {/* Audio Manager - Background Music + Sidechain */}
            <AudioManager />

            {/* Custom Cursor */}
            <CustomCursor />

            {/* Main Horizontal Scroll Container */}
            <main className="bg-black overflow-hidden">
              <HorizontalScroll>
                <Chapter1Intro />
                <Chapter2Heritage />
                <Interlude1Dreams />
                <Chapter3TimeStop />
                <Chapter4Excellence />
                <Interlude2Heritage />
                <Chapter5Facilities />
                <Interlude3Life />
                <Chapter6Community />
                <Chapter7Decision />
              </HorizontalScroll>
            </main>
          </>
        )}
      </AnimatePresence>
    </>
  )
}
