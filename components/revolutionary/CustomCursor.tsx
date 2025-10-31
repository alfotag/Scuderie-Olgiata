'use client'

import { useEffect, useState } from 'react'

export default function CustomCursor() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 })
  const [isHovering, setIsHovering] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Detect if device is mobile/touch device
    const checkMobile = () => {
      const mobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent) ||
                     ('ontouchstart' in window) ||
                     (window.innerWidth < 768)
      setIsMobile(mobile)
      if (mobile) {
        console.log('📱 Mobile device detected - cursor hidden')
      }
    }

    checkMobile()
    window.addEventListener('resize', checkMobile)

    console.log('✅ CustomCursor montato!')

    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY })
    }

    const handleMouseEnter = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (
        target.tagName === 'A' ||
        target.tagName === 'BUTTON' ||
        target.closest('a') ||
        target.closest('button') ||
        target.classList.contains('cursor-hover')
      ) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    document.addEventListener('mouseover', handleMouseEnter)

    console.log('🖱️ Cursore custom attivo, posizione iniziale:', mousePosition)

    return () => {
      window.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseover', handleMouseEnter)
      window.removeEventListener('resize', checkMobile)
    }
  }, [])

  // Don't render cursor on mobile devices
  if (isMobile) {
    return null
  }

  return (
    <>
      {/* CURSORE PRINCIPALE - MASSIMA SEMPLICITA */}
      <div
        className="fixed pointer-events-none z-[99999]"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: 'translate(-50%, -50%)',
          transition: 'transform 0.05s ease-out',
        }}
      >
        <div
          style={{
            width: isHovering ? '60px' : '50px',
            height: isHovering ? '60px' : '50px',
            borderRadius: '50%',
            border: '4px solid #FFD700',
            backgroundColor: 'rgba(255, 215, 0, 0.15)',
            boxShadow: '0 0 30px rgba(255, 215, 0, 0.9), 0 0 15px rgba(255, 255, 255, 0.8), inset 0 0 15px rgba(255, 215, 0, 0.5)',
            transition: 'width 0.15s ease, height 0.15s ease',
          }}
        >
          {/* Punto centrale bianco per precisione */}
          <div
            style={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              width: '8px',
              height: '8px',
              borderRadius: '50%',
              backgroundColor: '#FFFFFF',
              boxShadow: '0 0 8px #FFD700, 0 0 4px #FFF',
            }}
          />
        </div>
      </div>

      {/* Alone esterno */}
      <div
        className="fixed pointer-events-none z-[99998]"
        style={{
          left: `${mousePosition.x}px`,
          top: `${mousePosition.y}px`,
          transform: 'translate(-50%, -50%)',
          transition: 'transform 0.05s ease-out',
        }}
      >
        <div
          style={{
            width: isHovering ? '90px' : '70px',
            height: isHovering ? '90px' : '70px',
            borderRadius: '50%',
            border: '2px solid rgba(255, 215, 0, 0.4)',
            boxShadow: '0 0 20px rgba(255, 215, 0, 0.3)',
            opacity: isHovering ? 0.7 : 0.4,
            transition: 'all 0.15s ease',
          }}
        />
      </div>
    </>
  )
}
