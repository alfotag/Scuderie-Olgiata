'use client';

import { motion, useMotionValue, useTransform, useSpring } from 'framer-motion';
import { useState, useEffect, useRef } from 'react';
import { createPortal } from 'react-dom';
import { useVoiceoverFilter } from '../../hooks/useVoiceoverFilter';

interface SingleVideo {
  src: string;
  caption: string;
}

interface InterludeMedia {
  type: 'image' | 'video' | 'video-group';
  src?: string; // For single media
  videos?: SingleVideo[]; // For video groups
  caption?: string; // For single media
  mainCaption?: string; // For video groups
  subCaption?: string;
  audioSrc?: string; // Optional audio narration for this page
}

interface InterludeChapterProps {
  title: string;
  subtitle?: string;
  media: InterludeMedia[];
  accentColor?: string;
  bookNumber?: string;
  titleAudioSrc?: string; // Optional audio for the title page
}

export default function InterludeChapter({
  title,
  subtitle,
  media,
  accentColor = '#8B4513',
  bookNumber = 'I',
  titleAudioSrc
}: InterludeChapterProps) {
  const [currentBook, setCurrentBook] = useState(0);
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);
  const lastScrollTime = useRef(0);
  const currentBookRef = useRef(0); // Track current value for event handlers
  const scrollDelay = 800; // Molto più reattivo

  // 📱 MOBILE DETECTION - Rileva schermo mobile per layout responsive
  const [isMobile, setIsMobile] = useState(false);
  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  // 🪄 STATO PER ANIMAZIONI MAGICHE HARRY POTTER - Foto che volano fuori dai libri!
  const [magicallyFloating, setMagicallyFloating] = useState<{ [key: number]: boolean }>({});

  // 📱 STATO PER VIDEO INGRANDITO SU MOBILE
  const [expandedVideo, setExpandedVideo] = useState<{bookIndex: number, videoIndex: number, src: string} | null>(null);

  // 🐛 DEBUG - Log quando expandedVideo cambia
  useEffect(() => {
    console.log('📱 expandedVideo changed:', expandedVideo);
    console.log('📱 isMobile:', isMobile);
  }, [expandedVideo, isMobile]);

  // 🌐 Check if we're in the browser (for portal)
  const [isBrowser, setIsBrowser] = useState(false);
  useEffect(() => {
    setIsBrowser(true);
  }, []);

  // Audio refs: one for title, one for each media item
  const titleAudioRef = useRef<HTMLAudioElement>(null);
  const mediaAudioRefs = useRef<(HTMLAudioElement | null)[]>([]);

  // Apply voiceover filter only to title audio
  useVoiceoverFilter(titleAudioRef);

  // Keep ref in sync with state
  useEffect(() => {
    currentBookRef.current = currentBook;
  }, [currentBook]);

  // Total books = 1 title page + media pages
  const totalBooks = media.length + 1;

  // 🪄 MAGIA AUTOMATICA - Attiva animazione quando un libro diventa focused (SOLO SU DESKTOP)
  useEffect(() => {
    if (isInView && currentBook > 0 && !isMobile) { // Solo desktop, non su mobile
      // Delay prima di far volare fuori la foto
      const floatTimer = setTimeout(() => {
        setMagicallyFloating(prev => ({ ...prev, [currentBook]: true }));
      }, 2000);

      // Dopo 8 secondi falla tornare al libro (2s attesa + 8s animazione = 10s totale)
      const returnTimer = setTimeout(() => {
        setMagicallyFloating(prev => ({ ...prev, [currentBook]: false }));
      }, 10000);

      return () => {
        clearTimeout(floatTimer);
        clearTimeout(returnTimer);
      };
    }
  }, [currentBook, isInView, isMobile]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsInView(entry.isIntersecting);
        if (entry.isIntersecting) {
          setCurrentBook(0);
        } else {
          // Stop all audio when leaving view
          if (titleAudioRef.current) {
            titleAudioRef.current.pause();
            titleAudioRef.current.currentTime = 0;
          }
          mediaAudioRefs.current.forEach(audio => {
            if (audio) {
              audio.pause();
              audio.currentTime = 0;
            }
          });
        }
      },
      { threshold: 0.5 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => {
      if (sectionRef.current) {
        observer.unobserve(sectionRef.current);
      }
    };
  }, []);

  // Handle audio playback when currentBook changes
  useEffect(() => {
    if (!isInView) return;

    // Stop all audio first
    if (titleAudioRef.current) {
      titleAudioRef.current.pause();
      titleAudioRef.current.currentTime = 0;
    }
    mediaAudioRefs.current.forEach(audio => {
      if (audio) {
        audio.pause();
        audio.currentTime = 0;
      }
    });

    // Dispatch voiceEnd event to restore background music
    window.dispatchEvent(new Event('voiceEnd'));

    // Play audio for current book
    if (currentBook === 0 && titleAudioRef.current && titleAudioSrc) {
      // Title page audio
      titleAudioRef.current.play().catch(error => {
        console.log('Title audio autoplay prevented:', error);
      });
    } else if (currentBook > 0) {
      // Media page audio
      const mediaIndex = currentBook - 1;
      const audio = mediaAudioRefs.current[mediaIndex];
      if (audio && media[mediaIndex]?.audioSrc) {
        audio.play().catch(error => {
          console.log('Media audio autoplay prevented:', error);
        });
      }
    }
  }, [currentBook, isInView, titleAudioSrc, media]);

  // Scroll and keyboard navigation
  useEffect(() => {
    const handleWheel = (e: WheelEvent) => {
      if (!isInView) return;

      const now = Date.now();
      const timeSinceLastScroll = now - lastScrollTime.current;

      const current = currentBookRef.current; // Get fresh value from ref
      const scrollDirection = e.deltaX > 0 ? 'forward' : 'backward';

      // Check boundaries FIRST with fresh ref value
      const isAtStart = current === 0 && scrollDirection === 'backward';
      const isAtEnd = current === totalBooks - 1 && scrollDirection === 'forward';

      // Allow exit at boundaries - let it bubble to parent
      if (isAtStart || isAtEnd) {
        console.log('🚪 At boundary, exiting interlude:', { current, scrollDirection, totalBooks });
        return; // Don't preventDefault, let it pass through
      }

      // We're inside the interlude - capture the scroll
      e.preventDefault();
      e.stopPropagation();

      // Throttle scrolling
      if (timeSinceLastScroll < scrollDelay) {
        return;
      }

      lastScrollTime.current = now;

      // Navigate using functional update for safety
      if (scrollDirection === 'forward') {
        setCurrentBook(prev => {
          if (prev < totalBooks - 1) {
            console.log('📖 Moving forward from book', prev, 'to', prev + 1, '/', totalBooks - 1);
            return prev + 1;
          }
          return prev;
        });
      } else {
        setCurrentBook(prev => {
          if (prev > 0) {
            console.log('📖 Moving backward from book', prev, 'to', prev - 1);
            return prev - 1;
          }
          return prev;
        });
      }
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isInView) return;

      if (e.key === ' ' || e.key === 'ArrowRight') {
        e.preventDefault();
        setCurrentBook(prev => {
          if (prev < totalBooks - 1) {
            console.log('⌨️ Keyboard forward:', prev, '→', prev + 1);
            return prev + 1;
          }
          return prev;
        });
      } else if (e.key === 'ArrowLeft') {
        e.preventDefault();
        setCurrentBook(prev => {
          if (prev > 0) {
            console.log('⌨️ Keyboard backward:', prev, '→', prev - 1);
            return prev - 1;
          }
          return prev;
        });
      }
    };

    // Touch handling for mobile - HORIZONTAL SWIPE
    let touchStartX = 0;
    let touchStartY = 0;
    const handleTouchStart = (e: TouchEvent) => {
      if (!isInView) return;
      touchStartX = e.touches[0].clientX;
      touchStartY = e.touches[0].clientY;
      // NON blocco propagazione qui - permetto ad AudioManager di ricevere touchstart
    };

    const handleTouchMove = (e: TouchEvent) => {
      if (!isInView) return;

      const touchCurrentX = e.touches[0].clientX;
      const touchCurrentY = e.touches[0].clientY;
      const diffX = Math.abs(touchStartX - touchCurrentX);
      const diffY = Math.abs(touchStartY - touchCurrentY);

      // Solo se swipe orizzontale è dominante, blocco scroll verticale
      if (diffX > diffY && diffX > 10) {
        e.preventDefault();
        e.stopPropagation();
      }
    };

    const handleTouchEnd = (e: TouchEvent) => {
      if (!isInView) return;

      const touchEndX = e.changedTouches[0].clientX;
      const touchEndY = e.changedTouches[0].clientY;
      const diffX = touchStartX - touchEndX;
      const diffY = touchStartY - touchEndY;

      // Solo se swipe orizzontale è dominante E supera soglia
      if (Math.abs(diffX) > Math.abs(diffY) && Math.abs(diffX) > 50) {
        const current = currentBookRef.current;

        // Verifica boundaries
        const canMoveForward = current < totalBooks - 1;
        const canMoveBackward = current > 0;
        const isSwipeLeft = diffX > 0;
        const isSwipeRight = diffX < 0;

        // Solo blocco evento se effettivamente navigo tra i libri
        if ((isSwipeLeft && canMoveForward) || (isSwipeRight && canMoveBackward)) {
          e.preventDefault();
          e.stopPropagation();

          if (isSwipeLeft) {
            setCurrentBook(prev => {
              console.log('👆 Touch forward (swipe left):', prev, '→', prev + 1);
              return prev + 1;
            });
          } else {
            setCurrentBook(prev => {
              console.log('👆 Touch backward (swipe right):', prev, '→', prev - 1);
              return prev - 1;
            });
          }
        }
        // Altrimenti lascio passare l'evento a HorizontalScroll per navigare ai capitoli
      }
    };

    const section = sectionRef.current;

    if (section) {
      section.addEventListener('wheel', handleWheel, { passive: false, capture: true });
      section.addEventListener('touchstart', handleTouchStart, { passive: true });
      section.addEventListener('touchmove', handleTouchMove, { passive: false });
      section.addEventListener('touchend', handleTouchEnd, { passive: false });
    }
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      if (section) {
        section.removeEventListener('wheel', handleWheel);
        section.removeEventListener('touchstart', handleTouchStart);
        section.removeEventListener('touchmove', handleTouchMove);
        section.removeEventListener('touchend', handleTouchEnd);
      }
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [isInView, currentBook, totalBooks]);

  // 📚 LIBRI IN LINEA ORIZZONTALE - Disposizione cinematografica semplice
  // Come libri su un tavolo lungo, camera dolly che scorre lateralmente
  const BOOK_SPACING = isMobile ? 550 : 1800; // Responsive: spazio ottimizzato su mobile

  const bookPositions = [
    // Libro titolo al centro
    {
      x: 0,
      y: 0,
      z: 0,
      rotationY: 0,
      rotationX: 0,
      scale: 1,
      platformY: -150
    },
    // Altri libri in linea orizzontale
    ...media.map((_, i) => {
      const step = i + 1;

      return {
        x: step * BOOK_SPACING, // Semplicemente spostamento orizzontale
        y: 0, // Tutti allo stesso livello
        z: 0, // Tutti sulla stessa profondità
        rotationY: 0, // Tutti dritti
        rotationX: 0,
        scale: 1,
        platformY: -150
      };
    })
  ];

  // Ensure currentBook is within bounds
  const safeCurrentBook = Math.min(Math.max(0, currentBook), bookPositions.length - 1);
  const currentBookPos = bookPositions[safeCurrentBook];

  // 🎬 CAMERA DOLLY CINEMATOGRAFICA - Movimento orizzontale fluido
  // La camera si posiziona di fronte al libro corrente
  const cameraTarget = {
    x: -currentBookPos.x, // Opposto per inquadrare
    y: 0, // Sempre allo stesso livello
    z: isMobile ? -400 : -600, // Responsive: più vicino su mobile per adattare i libri allo schermo
    rotateX: 5, // Leggera angolazione dall'alto
    rotateY: 0,
    rotateZ: 0
  };

  // Magical floating particles
  const particles = Array.from({ length: 40 }, (_, i) => ({
    id: i,
    left: `${Math.random() * 100}%`,
    top: `${Math.random() * 100}%`,
    delay: Math.random() * 5,
    duration: 8 + Math.random() * 8,
    size: 2 + Math.random() * 4,
    opacity: 0.2 + Math.random() * 0.4
  }));

  // Light rays
  const lightRays = Array.from({ length: 6 }, (_, i) => ({
    id: i,
    angle: (i / 6) * 360,
    delay: i * 0.3,
    duration: 4 + Math.random() * 2
  }));

  const FloralCorner = ({ className, flip = '' }: { className: string; flip?: string }) => (
    <div className={`absolute ${className} z-10`} style={{ transform: flip }}>
      <svg width="50" height="50" viewBox="0 0 100 100" className="opacity-30">
        <path
          d="M 8 8 Q 18 8 25 15 Q 32 22 32 32 Q 32 22 39 15 Q 46 8 56 8"
          stroke="#2C1810"
          strokeWidth="2.5"
          fill="none"
        />
        <path
          d="M 8 8 Q 8 18 15 25 Q 22 32 32 32 Q 22 32 15 39 Q 8 46 8 56"
          stroke="#2C1810"
          strokeWidth="2.5"
          fill="none"
        />
        <circle cx="32" cy="32" r="3" fill="#5D4037" opacity="0.5" />
      </svg>
    </div>
  );

  const OpenBook = ({
    index,
    position
  }: {
    index: number;
    position: { x: number; y: number; z: number; rotationY: number; rotationX: number; scale: number; platformY: number }
  }) => {
    const isTitle = index === 0;
    const mediaItem = !isTitle ? media[index - 1] : null;
    const isFocused = safeCurrentBook === index;
    const distanceFromFocus = Math.abs(index - safeCurrentBook);

    // Calcola la distanza 3D approssimativa per depth effects
    const approxDistance = Math.sqrt(
      Math.pow(position.x, 2) +
      Math.pow(position.y, 2) +
      Math.pow(position.z, 2)
    );

    // 🎯 RACK FOCUS - Sfocatura basata su distanza dal libro focused
    const focusBlur = isFocused ? 0 : Math.min(15, distanceFromFocus * 6);
    const brightness = isFocused ? 1.1 : Math.max(0.4, 1 - distanceFromFocus * 0.2);
    const opacity = isFocused ? 1 : Math.max(0.25, 0.9 - distanceFromFocus * 0.18);

    // 📱 DIMENSIONI RESPONSIVE DEL LIBRO
    const bookWidth = isMobile ? 350 : 1100; // Ottimizzato per mobile (~93% di 375px screen width)
    const bookHeight = isMobile ? 197 : 700; // 16:9 ratio mantenuto

    return (
        <motion.div
          className="absolute"
          style={{
            left: '50%',
            top: '50%',
            width: `${bookWidth}px`,
            height: `${bookHeight}px`,
            marginLeft: `-${bookWidth / 2}px`,
            marginTop: `-${bookHeight / 2}px`,
            overflow: magicallyFloating[index] ? 'visible' : 'hidden',
            // LIBRO FISSO nello spazio 3D
            transform: `translate3d(${position.x}px, ${position.y}px, ${position.z}px) rotateY(${position.rotationY}deg) rotateX(${position.rotationX}deg) scale(${position.scale})`,
            transformStyle: 'preserve-3d',
            filter: `blur(${focusBlur}px) brightness(${brightness}) contrast(${isFocused ? 1.05 : 0.95})`,
            opacity,
            transition: 'filter 2s cubic-bezier(0.4, 0, 0.2, 1), opacity 2s cubic-bezier(0.4, 0, 0.2, 1)',
            zIndex: Math.round(1000 - position.z),
            pointerEvents: isFocused ? 'auto' : 'none'
          }}
        >
        {/* 🌫️ PIATTAFORMA GALLEGGIANTE sotto al libro */}
        <div
          className="absolute"
          style={{
            left: '50%',
            bottom: '100%',
            width: '1400px',
            height: '60px',
            marginLeft: '-700px',
            marginBottom: '120px',
            transform: 'rotateX(90deg)',
            transformStyle: 'preserve-3d',
            background: isFocused
              ? 'radial-gradient(ellipse, rgba(212, 175, 55, 0.3) 0%, rgba(212, 175, 55, 0.15) 40%, transparent 70%)'
              : 'radial-gradient(ellipse, rgba(139, 69, 19, 0.2) 0%, rgba(139, 69, 19, 0.08) 40%, transparent 70%)',
            filter: `blur(${isFocused ? 30 : 20}px)`,
            opacity: isFocused ? 0.8 : 0.4,
            transition: 'all 2s cubic-bezier(0.4, 0, 0.2, 1)',
            zIndex: -1
          }}
        />
        {/* Dramatic book shadow with multiple layers */}
        <div className="absolute inset-0 bg-black/60 blur-3xl translate-y-12 scale-95" />
        <div className="absolute inset-0 bg-black/30 blur-2xl translate-y-8" />

        {/* Spotlight effect on focused book */}
        {isFocused && (
          <motion.div
            className="absolute -inset-32 rounded-full"
            style={{
              background: 'radial-gradient(circle, rgba(255, 223, 150, 0.4) 0%, rgba(255, 200, 100, 0.2) 40%, transparent 70%)',
              filter: 'blur(40px)',
              opacity: 1,
              transform: 'scale(1)'
            }}
          />
        )}

        {/* Light rays from above on focused book */}
        {isFocused && lightRays.map(ray => (
          <motion.div
            key={ray.id}
            className="absolute left-1/2 top-0 w-[2px] h-64 -translate-x-1/2 origin-top"
            style={{
              background: 'linear-gradient(to bottom, rgba(255, 230, 180, 0.6), transparent)',
              transform: `rotate(${ray.angle}deg) translateY(-100px)`,
              filter: 'blur(1px)'
            }}
            animate={{
              opacity: [0, 0.7, 0],
              scaleY: [0.5, 1, 0.5]
            }}
            transition={{
              duration: ray.duration,
              delay: ray.delay,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          />
        ))}

        {/* Open book with realistic binding */}
        <div className="relative w-full h-full flex" style={{
          overflow: magicallyFloating[index] ? 'visible' : 'hidden',
          background: 'linear-gradient(to right, #F5E6D3 0%, #F8EDD8 47%, #2C1810 49%, #2C1810 51%, #F8EDD8 53%, #FAF0DC 100%)',
          borderRadius: '12px',
          boxShadow: isFocused
            ? '0 40px 100px rgba(0,0,0,0.7), inset 0 0 40px rgba(0,0,0,0.2), 0 0 80px rgba(255, 200, 100, 0.3)'
            : '0 20px 60px rgba(0,0,0,0.5), inset 0 0 30px rgba(0,0,0,0.15)',
          transform: isFocused ? 'translateY(-8px)' : 'translateY(0)',
          transition: 'box-shadow 1.5s ease, transform 1.5s ease'
        }}>

          {/* Gold corner decorations */}
          {isFocused && (
            <>
              <div className="absolute top-0 left-0 w-16 h-16 border-l-4 border-t-4 border-amber-600/60 rounded-tl-xl" />
              <div className="absolute top-0 right-0 w-16 h-16 border-r-4 border-t-4 border-amber-600/60 rounded-tr-xl" />
              <div className="absolute bottom-0 left-0 w-16 h-16 border-l-4 border-b-4 border-amber-600/60 rounded-bl-xl" />
              <div className="absolute bottom-0 right-0 w-16 h-16 border-r-4 border-b-4 border-amber-600/60 rounded-br-xl" />
            </>
          )}

          {/* LEFT PAGE - Pagina con scritte e illustrazioni animate */}
          <div className="relative w-1/2 h-full p-4 sm:p-6 md:p-10 lg:p-16 flex flex-col justify-center items-center"
            style={{
              overflow: magicallyFloating[index] ? 'visible' : 'hidden',
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'200\' height=\'200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'paper\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\' result=\'noise\'/%3E%3CfeDiffuseLighting in=\'noise\' lighting-color=\'%23F5E6D3\' surfaceScale=\'1\'%3E%3CfeDistantLight azimuth=\'45\' elevation=\'60\'/%3E%3C/feDiffuseLighting%3E%3C/filter%3E%3Crect width=\'200\' height=\'200\' filter=\'url(%23paper)\' opacity=\'0.25\'/%3E%3C/svg%3E")',
              backgroundSize: '150px 150px',
              boxShadow: 'inset 4px 0 12px rgba(0,0,0,0.15)'
            }}
          >
            {/* ✨ Illustrazioni di cavalli che si disegnano magicamente */}
            {isFocused && !isTitle && (
              <>
                {/* Cavallo al galoppo - angolo in alto a sinistra */}
                <svg
                  className="absolute top-8 left-6 opacity-30 w-16 h-14 md:w-[120px] md:h-[100px]"
                  viewBox="0 0 120 100"
                >
                  <path
                    d="M 10 60 Q 15 45 25 40 L 35 35 Q 40 30 50 32 L 60 35 Q 70 38 75 45 L 80 55 Q 82 65 78 70 L 70 75 L 60 78 Q 50 80 40 78 L 30 75 Q 20 72 15 68 L 10 60 M 50 32 L 55 25 Q 58 20 62 22 L 65 28 M 30 70 L 28 85 M 45 72 L 43 88 M 60 73 L 58 87 M 72 68 L 70 82"
                    stroke={accentColor}
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                {/* Testa di cavallo - angolo in alto a destra */}
                <svg
                  className="absolute top-10 right-8 opacity-25 w-12 h-14 md:w-[80px] md:h-[100px]"
                  viewBox="0 0 80 100"
                >
                  <path
                    d="M 40 20 Q 35 15 30 15 Q 25 15 22 20 L 20 30 Q 18 40 20 50 L 25 60 Q 30 68 38 70 L 45 68 Q 52 64 55 58 L 58 48 Q 60 38 58 28 L 55 22 Q 50 18 45 18 L 40 20 M 30 25 Q 28 28 30 30 M 42 58 L 38 62 Q 35 64 32 62"
                    stroke={accentColor}
                    strokeWidth="2.5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                {/* Ferro di cavallo - angolo in basso a sinistra */}
                <svg
                  className="absolute bottom-12 left-8 opacity-20 w-10 h-10 md:w-[60px] md:h-[60px]"
                  viewBox="0 0 60 60"
                >
                  <path
                    d="M 15 50 L 18 40 Q 20 25 30 20 Q 40 25 42 40 L 45 50 M 18 45 L 20 45 M 40 45 L 42 45 M 22 35 L 24 35 M 36 35 L 38 35 M 24 28 L 26 28 M 34 28 L 36 28"
                    stroke="#8B6914"
                    strokeWidth="3"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>

                {/* Decorazione floreale - angolo in basso a destra */}
                <svg
                  className="absolute bottom-8 right-6 opacity-20 w-10 h-10 md:w-[70px] md:h-[70px]"
                  viewBox="0 0 70 70"
                >
                  <path
                    d="M 35 35 Q 30 25 25 22 M 35 35 Q 40 25 45 22 M 35 35 Q 30 45 25 48 M 35 35 Q 40 45 45 48 M 35 35 Q 25 30 20 28 M 35 35 Q 45 30 50 28 M 35 35 Q 25 40 20 42 M 35 35 Q 45 40 50 42"
                    stroke="#D4AF37"
                    strokeWidth="2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </>
            )}

            <FloralCorner className="top-3 left-3" />
            <FloralCorner className="top-3 right-3" flip="scaleX(-1)" />
            <FloralCorner className="bottom-3 left-3" flip="scaleY(-1)" />
            <FloralCorner className="bottom-3 right-3" flip="scale(-1)" />

            {/* Decorative line borders */}
            <div className="absolute top-10 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-amber-800/30 to-transparent" />
            <div className="absolute bottom-10 left-10 right-10 h-[1px] bg-gradient-to-r from-transparent via-amber-800/30 to-transparent" />

            {isTitle ? (
              <div
                className="text-center max-w-lg z-10 px-4 sm:px-6 md:px-8"
                style={{
                  opacity: isFocused ? 1 : 0.7,
                  transition: 'opacity 1s'
                }}
              >
                {/* Numero romano minimalista */}
                <div className="mb-6 sm:mb-8 md:mb-12 lg:mb-16">
                  <div className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl xl:text-7xl font-light text-amber-900/30" style={{ fontFamily: 'Georgia, serif' }}>
                    {bookNumber}
                  </div>
                </div>

                {/* Linea decorativa minimalista */}
                <div className="h-[1px] w-16 sm:w-24 md:w-32 bg-amber-800/40 mx-auto mb-6 sm:mb-8 md:mb-12 lg:mb-16" />

                {/* Titolo principale - pulito e leggibile */}
                <h2
                  className="text-lg sm:text-xl md:text-2xl lg:text-3xl xl:text-4xl font-light mb-6 sm:mb-8 md:mb-10 lg:mb-12 leading-tight tracking-wide px-2 sm:px-3"
                  style={{
                    fontFamily: 'Georgia, "Times New Roman", serif',
                    color: '#1a0f0a',
                    letterSpacing: '0.06em'
                  }}
                >
                  {title}
                </h2>

                {/* Sottotitolo - elegante e leggibile - NASCOSTO SU MOBILE */}
                {subtitle && !isMobile && (
                  <p
                    className="text-sm sm:text-base md:text-lg lg:text-xl font-light leading-relaxed mb-8 md:mb-16 px-2 sm:px-4"
                    style={{
                      fontFamily: 'Georgia, serif',
                      color: '#3E2723',
                      opacity: 0.85
                    }}
                  >
                    {subtitle}
                  </p>
                )}

                {/* Mobile Swipe Indicator - VISIBLE ONLY ON MOBILE */}
                {isMobile && (
                  <motion.div
                    className="flex flex-row items-center gap-3 mt-8 mb-4"
                    animate={{
                      x: [0, 10, 0],
                    }}
                    transition={{
                      duration: 1.5,
                      repeat: Infinity,
                      ease: "easeInOut"
                    }}
                  >
                    <div className="text-amber-900/70 text-sm font-light tracking-wide" style={{ fontFamily: 'Georgia, serif' }}>
                      Swipe per continuare
                    </div>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      className="text-amber-900/70"
                      strokeWidth="2"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    >
                      <polyline points="9 18 15 12 9 6"></polyline>
                    </svg>
                  </motion.div>
                )}

                {/* Linea decorativa minimalista */}
                <div className="h-[1px] w-32 bg-amber-800/40 mx-auto mt-16" />

                {/* Label "Interludio" minimalista */}
                <div
                  className="text-xs text-amber-900/50 tracking-[0.4em] uppercase font-light mt-8"
                  style={{ fontFamily: 'Georgia, serif' }}
                >
                  Interludio
                </div>
              </div>
            ) : (
              <div
                className="relative flex flex-col items-center justify-center h-full px-4 sm:px-6 md:px-10 lg:px-16 py-8 sm:py-12 md:py-16 lg:py-20 z-10"
                style={{
                  opacity: isFocused ? 1 : 0.7,
                  transition: 'opacity 0.8s'
                }}
              >
                {/* Linea superiore minimalista */}
                <div className="h-[1px] w-16 sm:w-20 md:w-24 bg-amber-800/40 mb-8 sm:mb-12 md:mb-16" />

                {/* Titolo principale - minimalista e leggibile */}
                <h3
                  className="text-sm sm:text-base md:text-lg lg:text-xl xl:text-2xl font-light text-center mb-6 sm:mb-8 md:mb-10 lg:mb-12 leading-tight tracking-wide px-2 sm:px-3"
                  style={{
                    fontFamily: 'Georgia, "Times New Roman", serif',
                    color: '#2C1810',
                    letterSpacing: '0.08em',
                    opacity: 1
                  }}
                >
                  {mediaItem?.mainCaption || ''}
                </h3>

                {/* Contenuto principale - pulito e leggibile - NASCOSTO SU MOBILE */}
                {!isMobile && (
                  <div className="w-full max-w-lg px-2 sm:px-4">
                    <p
                      className="text-xs sm:text-sm md:text-base lg:text-lg font-light leading-relaxed text-center"
                      style={{
                        fontFamily: 'Georgia, "Times New Roman", serif',
                        color: '#3E2723',
                        lineHeight: '1.8'
                      }}
                    >
                      {mediaItem?.subCaption || ''}
                    </p>
                  </div>
                )}

                {/* Linea inferiore minimalista */}
                <div className="h-[1px] w-24 bg-amber-800/40 mt-16" />
              </div>
            )}
          </div>

          {/* RIGHT PAGE - Pagina totalmente dedicata al video con effetto chiazza organica */}
          <div className="relative w-1/2 h-full"
            style={{
              overflow: magicallyFloating[index] ? 'visible' : 'hidden',
              backgroundImage: 'url("data:image/svg+xml,%3Csvg width=\'200\' height=\'200\' xmlns=\'http://www.w3.org/2000/svg\'%3E%3Cfilter id=\'paper\'%3E%3CfeTurbulence type=\'fractalNoise\' baseFrequency=\'0.8\' numOctaves=\'4\' result=\'noise\'/%3E%3CfeDiffuseLighting in=\'noise\' lighting-color=\'%23F5E6D3\' surfaceScale=\'1\'%3E%3CfeDistantLight azimuth=\'45\' elevation=\'60\'/%3E%3C/feDiffuseLighting%3E%3C/filter%3E%3Crect width=\'200\' height=\'200\' filter=\'url(%23paper)\' opacity=\'0.25\'/%3E%3C/svg%3E")',
              backgroundSize: '150px 150px',
              boxShadow: 'inset -4px 0 12px rgba(0,0,0,0.15)'
            }}
          >
            {isTitle ? (
              <div
                className="absolute inset-0 flex items-center justify-center p-12"
                style={{
                  opacity: 1,
                  scale: 1
                }}
              >
                {/* LOGO SCUDERIE OLGIATA IN BELLA VISTA */}
                <img
                  src="/images/Logo_Scuderie_Olgiata-removebg-preview.png"
                  alt="Scuderie Olgiata"
                  className="w-full h-full object-contain drop-shadow-2xl"
                  style={{
                    filter: 'drop-shadow(0 20px 40px rgba(139, 69, 19, 0.4))'
                  }}
                />
              </div>
            ) : mediaItem ? (
              <>
                {/* Filtri SVG per bordi organici sfumati */}
                <svg width="0" height="0" style={{ position: 'absolute' }}>
                  <defs>
                    {/* Filtro per creare bordi organici come chiazza d'acquerello */}
                    <filter id={`organicBlob-${index}`} x="-20%" y="-20%" width="140%" height="140%">
                      {/* Turbolenza per forma organica */}
                      <feTurbulence
                        type="fractalNoise"
                        baseFrequency="0.012"
                        numOctaves="3"
                        result="turbulence"
                        seed={index * 7}
                      />
                      <feDisplacementMap
                        in="SourceGraphic"
                        in2="turbulence"
                        scale="45"
                        xChannelSelector="R"
                        yChannelSelector="G"
                        result="displaced"
                      />
                      {/* Blur pesante per bordi sfumati */}
                      <feGaussianBlur in="displaced" stdDeviation="25" result="blurred" />
                      {/* Espansione della forma */}
                      <feMorphology operator="dilate" radius="5" in="blurred" result="expanded" />
                      {/* Ancora più blur per sfumatura finale */}
                      <feGaussianBlur in="expanded" stdDeviation="18" result="finalBlur" />
                    </filter>

                    {/* Maschera organica per il video */}
                    <mask id={`organicMask-${index}`}>
                      <rect x="0" y="0" width="100%" height="100%" fill="white" filter={`url(#organicBlob-${index})`} />
                    </mask>
                  </defs>
                </svg>

                {/* Video/Immagini con cornici fiabesche */}
                <div
                  className="absolute inset-0 flex flex-col items-center justify-center z-10 gap-2 sm:gap-3 md:gap-4 px-4 sm:px-8 md:px-12 lg:px-14 py-4 sm:py-6 md:py-8"
                  style={{
                    overflow: magicallyFloating[index] ? 'visible' : 'hidden',
                    opacity: isFocused ? 1 : 0.6,
                    transition: 'opacity 1.2s'
                  }}
                >
                  {mediaItem.type === 'video-group' && mediaItem.videos ? (
                    // GRUPPO DI VIDEO IMPILATI CON CORNICI FIABESCHE + EFFETTO MAGICO HARRY POTTER
                    <>
                      {mediaItem.videos.map((video, vidIndex) => {
                        const isFloating = magicallyFloating[index];
                        // Alterna direzioni: video 0 va a sinistra (-), video 1 va a destra (+)
                        const direction = vidIndex % 2 === 0 ? -1 : 1;
                        const xOffset = direction * 300; // 300px - più vicino al centro della pagina

                        return (
                          <motion.div
                          key={vidIndex}
                          className="w-full"
                          style={{
                            flex: `1 1 ${100 / mediaItem.videos!.length}%`,
                            maxHeight: `${100 / mediaItem.videos!.length - 2}%`,
                            position: 'relative',
                            zIndex: isFloating ? (isMobile ? 100 : 999999) : 1, // z-index ridotto su mobile
                            filter: isFloating && !isMobile
                              ? 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.6)) drop-shadow(0 0 40px rgba(255, 215, 0, 0.3))'
                              : 'none',
                            willChange: 'auto', // Rimuoviamo will-change per evitare sfarfallii
                          }}
                          animate={isFloating && !isMobile ? {
                            // 🪄 ANIMAZIONE MAGICA ELEGANTE - Disabilitata su mobile per performance
                            scale: [1, 1.7, 1.7, 1.7, 1],
                            x: [0, xOffset * 0.3, xOffset, xOffset, 0],
                            y: [0, -30, -70, -70, 0],
                            z: [0, 100, 500, 500, 0],
                            rotateY: [0, direction * 1.5, direction * 2.5, direction * 2.5, 0],
                            rotateX: [0, -1, -2, -2, 0],
                            rotateZ: [0, -direction * 0.8, -direction * 1.2, -direction * 1.2, 0],
                          } : {
                            scale: 1,
                            x: 0,
                            y: 0,
                            z: 0,
                            rotateY: 0,
                            rotateX: 0,
                            rotateZ: 0
                          }}
                          transition={isFloating ? {
                            // Transizioni per animazione magica - 8 secondi totali
                            scale: { duration: 8, ease: [0.43, 0.13, 0.23, 0.96] },
                            x: { duration: 8, ease: [0.43, 0.13, 0.23, 0.96] },
                            y: { duration: 8, ease: [0.43, 0.13, 0.23, 0.96] },
                            z: { duration: 8, ease: [0.43, 0.13, 0.23, 0.96] },
                            rotateY: { duration: 8, ease: "easeInOut" },
                            rotateX: { duration: 8, ease: "easeInOut" },
                            rotateZ: { duration: 8, ease: "easeInOut" },
                          } : {
                            // NESSUNA transizione sul ritorno per evitare flash
                            duration: 0,
                          }}
                        >
                          {/* CORNICE FIABESCA STILE SHREK */}
                          <div className="relative w-full h-full">
                            {/* Cornice esterna dorata con decorazioni */}
                            <div className="absolute inset-0 rounded-xl sm:rounded-2xl p-1.5 sm:p-2 md:p-2.5" style={{
                              background: 'linear-gradient(145deg, #D4AF37 0%, #FFD700 25%, #DAA520 50%, #B8860B 75%, #8B6914 100%)',
                              boxShadow: '0 4px 16px rgba(139, 69, 19, 0.5), 0 8px 32px rgba(139, 69, 19, 0.4), inset 0 1px 2px rgba(255, 255, 255, 0.5)'
                            }}>
                              {/* Decorazioni angolari fiabesche */}
                              <div className="absolute top-0.5 left-0.5 sm:top-1 sm:left-1 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12">
                                <svg viewBox="0 0 50 50" className="w-full h-full">
                                  <path d="M5,5 Q15,5 20,10 Q25,15 25,25" stroke="#8B4513" strokeWidth="2" fill="none" />
                                  <path d="M5,5 Q5,15 10,20 Q15,25 25,25" stroke="#8B4513" strokeWidth="2" fill="none" />
                                  <circle cx="25" cy="25" r="4" fill="#DAA520" />
                                  <circle cx="12" cy="12" r="3" fill="#FFD700" />
                                </svg>
                              </div>
                              <div className="absolute top-0.5 right-0.5 sm:top-1 sm:right-1 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 transform scale-x-[-1]">
                                <svg viewBox="0 0 50 50" className="w-full h-full">
                                  <path d="M5,5 Q15,5 20,10 Q25,15 25,25" stroke="#8B4513" strokeWidth="2" fill="none" />
                                  <path d="M5,5 Q5,15 10,20 Q15,25 25,25" stroke="#8B4513" strokeWidth="2" fill="none" />
                                  <circle cx="25" cy="25" r="4" fill="#DAA520" />
                                  <circle cx="12" cy="12" r="3" fill="#FFD700" />
                                </svg>
                              </div>
                              <div className="absolute bottom-0.5 left-0.5 sm:bottom-1 sm:left-1 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 transform scale-y-[-1]">
                                <svg viewBox="0 0 50 50" className="w-full h-full">
                                  <path d="M5,5 Q15,5 20,10 Q25,15 25,25" stroke="#8B4513" strokeWidth="2" fill="none" />
                                  <path d="M5,5 Q5,15 10,20 Q15,25 25,25" stroke="#8B4513" strokeWidth="2" fill="none" />
                                  <circle cx="25" cy="25" r="4" fill="#DAA520" />
                                  <circle cx="12" cy="12" r="3" fill="#FFD700" />
                                </svg>
                              </div>
                              <div className="absolute bottom-0.5 right-0.5 sm:bottom-1 sm:right-1 w-6 h-6 sm:w-8 sm:h-8 md:w-10 md:h-10 lg:w-12 lg:h-12 transform scale-[-1]">
                                <svg viewBox="0 0 50 50" className="w-full h-full">
                                  <path d="M5,5 Q15,5 20,10 Q25,15 25,25" stroke="#8B4513" strokeWidth="2" fill="none" />
                                  <path d="M5,5 Q5,15 10,20 Q15,25 25,25" stroke="#8B4513" strokeWidth="2" fill="none" />
                                  <circle cx="25" cy="25" r="4" fill="#DAA520" />
                                  <circle cx="12" cy="12" r="3" fill="#FFD700" />
                                </svg>
                              </div>

                              {/* Cornice interna con texture legno */}
                              <div className="relative w-full h-full rounded-lg sm:rounded-xl p-0.5 sm:p-1" style={{
                                overflow: isFloating ? 'visible' : 'hidden',
                                background: 'linear-gradient(135deg, #8B4513 0%, #A0522D 50%, #8B4513 100%)',
                                boxShadow: 'inset 0 1px 4px rgba(0, 0, 0, 0.5), inset 0 2px 8px rgba(0, 0, 0, 0.4)'
                              }}>
                                {/* Video */}
                                <div
                                  className="relative w-full h-full rounded-lg"
                                  style={{
                                    overflow: isFloating ? 'visible' : 'hidden',
                                    cursor: isMobile ? 'pointer' : 'default'
                                  }}
                                  onClick={(e) => {
                                    console.log('📱 Video clicked!', { isMobile, index, vidIndex, src: video.src });
                                    if (isMobile && video.src) {
                                      e.stopPropagation();
                                      e.preventDefault();
                                      const videoData = {
                                        bookIndex: index,
                                        videoIndex: vidIndex,
                                        src: video.src
                                      };
                                      console.log('📱 Setting expandedVideo:', videoData);
                                      setExpandedVideo(videoData);
                                    }
                                  }}
                                >
                                  <video
                                    key={video.src}
                                    autoPlay
                                    loop
                                    muted
                                    playsInline
                                    className="w-full h-full object-cover"
                                    style={{
                                      filter: 'sepia(0.1) contrast(1.1) saturate(1.05) brightness(1.05)'
                                    }}
                                  >
                                    <source src={video.src} type="video/mp4" />
                                  </video>
                                </div>
                              </div>
                            </div>
                          </div>

                          {/* ✨ Particelle dorate eleganti - Effetto discreto */}
                          {isFloating && (
                            <>
                              {[...Array(6)].map((_, sparkleIdx) => (
                                <motion.div
                                  key={sparkleIdx}
                                  className="absolute pointer-events-none"
                                  style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    width: '3px',
                                    height: '3px',
                                    background: '#FFD700',
                                    borderRadius: '50%',
                                    boxShadow: '0 0 6px rgba(255, 215, 0, 0.8), 0 0 12px rgba(255, 215, 0, 0.4)',
                                  }}
                                  animate={{
                                    opacity: [0, 0.7, 0.7, 0],
                                    scale: [0, 1.2, 1, 0],
                                    x: [0, (Math.random() - 0.5) * 60],
                                    y: [0, (Math.random() - 0.5) * 60],
                                    rotate: [0, 180],
                                  }}
                                  transition={{
                                    duration: 2.5 + Math.random() * 1.5,
                                    delay: Math.random() * 0.4,
                                    repeat: Infinity,
                                    repeatDelay: Math.random() * 0.5,
                                  }}
                                />
                              ))}
                            </>
                          )}
                          </motion.div>
                        );
                      })}
                    </>
                  ) : (
                    // SINGOLO VIDEO/IMMAGINE (retrocompatibilità) + EFFETTO MAGICO HARRY POTTER
                    (() => {
                      const isFloating = magicallyFloating[index];
                      return (
                        <motion.div
                          className="w-full h-full rounded-3xl"
                          style={{
                            overflow: isFloating ? 'visible' : 'hidden',
                            position: 'relative',
                            zIndex: isFloating ? (isMobile ? 100 : 999999) : 1, // z-index ridotto su mobile
                            filter: isFloating && !isMobile
                              ? 'drop-shadow(0 0 20px rgba(255, 215, 0, 0.6)) drop-shadow(0 0 40px rgba(255, 215, 0, 0.3))'
                              : 'none',
                            willChange: 'auto', // Rimuoviamo will-change per evitare sfarfallii
                          }}
                          animate={isFloating && !isMobile ? {
                            // 🪄 ANIMAZIONE MAGICA ELEGANTE - Disabilitata su mobile per performance
                            scale: [1, 1.8, 1.8, 1.8, 1],
                            x: [0, 0, 0, 0, 0],
                            y: [0, -50, -100, -100, 0],
                            z: [0, 150, 550, 550, 0],
                            rotateY: [0, 2, -2, 2, 0],
                            rotateX: [0, -1, 1, -1, 0],
                            rotateZ: [0, -0.5, 0.5, -0.5, 0],
                          } : {
                            scale: 1,
                            x: 0,
                            y: 0,
                            z: 0,
                            rotateY: 0,
                            rotateX: 0,
                            rotateZ: 0
                          }}
                          transition={isFloating ? {
                            // Transizioni per animazione magica - 8 secondi totali
                            scale: { duration: 8, ease: [0.43, 0.13, 0.23, 0.96] },
                            x: { duration: 8, ease: "easeInOut" },
                            y: { duration: 8, ease: [0.43, 0.13, 0.23, 0.96] },
                            z: { duration: 8, ease: [0.43, 0.13, 0.23, 0.96] },
                            rotateY: { duration: 8, ease: "easeInOut" },
                            rotateX: { duration: 8, ease: "easeInOut" },
                            rotateZ: { duration: 8, ease: "easeInOut" },
                          } : {
                            // NESSUNA transizione sul ritorno per evitare flash
                            duration: 0,
                          }}
                        >
                          {mediaItem.type === 'image' ? (
                            <img
                              src={mediaItem.src}
                              alt={mediaItem.caption}
                              className="w-full h-full object-cover"
                              style={{
                                filter: 'sepia(0.15) contrast(1.15) saturate(0.92)',
                                transform: 'scale(1.15)'
                              }}
                              loading="eager"
                            />
                          ) : (
                            <div
                              className="w-full h-full"
                              style={{ cursor: isMobile ? 'pointer' : 'default' }}
                              onClick={(e) => {
                                console.log('📱 Single video clicked!', { isMobile, index, src: mediaItem.src });
                                if (isMobile && mediaItem.src) {
                                  e.stopPropagation();
                                  e.preventDefault();
                                  const videoData = {
                                    bookIndex: index,
                                    videoIndex: 0,
                                    src: mediaItem.src
                                  };
                                  console.log('📱 Setting expandedVideo:', videoData);
                                  setExpandedVideo(videoData);
                                }
                              }}
                            >
                              <video
                                key={mediaItem.src}
                                autoPlay
                                loop
                                muted
                                playsInline
                                className="w-full h-full object-cover"
                                style={{
                                  filter: 'sepia(0.15) contrast(1.15) saturate(0.92)',
                                  transform: 'scale(1.08)'
                                }}
                              >
                                <source src={mediaItem.src} type="video/mp4" />
                              </video>
                            </div>
                          )}

                          {/* ✨ Particelle dorate eleganti - Effetto discreto */}
                          {isFloating && (
                            <>
                              {[...Array(8)].map((_, sparkleIdx) => (
                                <motion.div
                                  key={sparkleIdx}
                                  className="absolute pointer-events-none"
                                  style={{
                                    left: `${Math.random() * 100}%`,
                                    top: `${Math.random() * 100}%`,
                                    width: '3px',
                                    height: '3px',
                                    background: '#FFD700',
                                    borderRadius: '50%',
                                    boxShadow: '0 0 6px rgba(255, 215, 0, 0.8), 0 0 12px rgba(255, 215, 0, 0.4)',
                                  }}
                                  animate={{
                                    opacity: [0, 0.7, 0.7, 0],
                                    scale: [0, 1.2, 1, 0],
                                    x: [0, (Math.random() - 0.5) * 70],
                                    y: [0, (Math.random() - 0.5) * 70],
                                    rotate: [0, 180 * (Math.random() > 0.5 ? 1 : -1)],
                                  }}
                                  transition={{
                                    duration: 2.5 + Math.random() * 1.5,
                                    delay: Math.random() * 0.4,
                                    repeat: Infinity,
                                    repeatDelay: Math.random() * 0.5,
                                    ease: "easeOut",
                                  }}
                                />
                              ))}
                            </>
                          )}
                        </motion.div>
                      );
                    })()
                  )}
                </div>
              </>
            ) : null}
          </div>
        </div>

        {/* Book binding details - sempre visibile ma con z-index molto basso */}
        <div className="absolute left-1/2 top-0 bottom-0 w-1 -translate-x-1/2 pointer-events-none"
          style={{
            background: 'linear-gradient(to bottom, #1a0f0a 0%, #2C1810 50%, #1a0f0a 100%)',
            boxShadow: '0 0 8px rgba(0,0,0,0.8), inset 0 0 4px rgba(0,0,0,0.5)',
            zIndex: -9999 // Molto dietro a tutto, inclusi i video floating
          }}
        />

        {/* Gold bookmark ribbon - sempre visibile ma con z-index molto basso */}
        {isFocused && (
          <div
            className="absolute top-0 right-1/2 w-6 h-full translate-x-3 pointer-events-none"
            style={{
              background: 'linear-gradient(to bottom, #D4AF37 0%, #B8860B 50%, #8B6914 100%)',
              clipPath: 'polygon(0 0, 100% 0, 100% 95%, 50% 100%, 0 95%)',
              boxShadow: '0 4px 12px rgba(0,0,0,0.4), inset 0 1px 2px rgba(255,255,255,0.3)',
              filter: 'drop-shadow(0 2px 4px rgba(0,0,0,0.3))',
              opacity: 0.9,
              zIndex: -9999 // Molto dietro a tutto, inclusi i video floating
            }}
          />
        )}
      </motion.div>
    );
  };

  return (
    <section
      ref={sectionRef}
      className="relative w-full min-h-screen md:h-screen flex-shrink-0 overflow-hidden"
      style={{
        cursor: 'url(/images/Logo_Scuderie_Olgiata-removebg-preview.png) 16 16, auto'
      }}
    >
      {/* Video background con cavallo al galoppo - FISSO E PERFORMANTE */}
      <div className="absolute inset-0 z-0">
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
          style={{
            transform: 'scaleX(-1)',
            opacity: 0.7,
            filter: 'brightness(0.85) contrast(1.3) saturate(1.1)'
          }}
          onError={(e) => {
            const target = e.target as HTMLVideoElement
            target.style.display = 'none'
          }}
        >
          <source src="/video/horse-gallop-bg-compressed.mp4" type="video/mp4" />
        </video>
        {/* Overlay scuro ridotto per vedere meglio il video */}
        <div className="absolute inset-0 bg-gradient-to-b from-black/15 via-black/10 to-black/15" />
      </div>

      {/* Enhanced magical background with depth and warmth - SEMI-TRASPARENTE per vedere il video */}
      <div
        className="absolute inset-0"
        style={{
          background: `
            radial-gradient(ellipse at 50% 40%, rgba(139, 69, 19, 0.15) 0%, rgba(62, 39, 35, 0.25) 30%, rgba(26, 15, 10, 0.4) 60%, rgba(10, 5, 5, 0.5) 100%),
            linear-gradient(135deg,
              rgba(26, 15, 10, 0.3) 0%,
              rgba(44, 24, 16, 0.25) 15%,
              rgba(62, 39, 35, 0.2) 30%,
              rgba(74, 52, 40, 0.15) 40%,
              rgba(62, 39, 35, 0.2) 55%,
              rgba(44, 24, 16, 0.25) 70%,
              rgba(26, 15, 10, 0.3) 100%
            )
          `,
          backgroundBlendMode: 'overlay',
          backgroundSize: '100% 100%, 400% 400%',
          animation: 'woodGrain 25s ease infinite'
        }}
      />

      {/* Enhanced wood texture with more detail - RIDOTTA per vedere video */}
      <div
        className="absolute inset-0 opacity-10"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg width='800' height='800' xmlns='http://www.w3.org/2000/svg'%3E%3Cfilter id='wood'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.02 0.35' numOctaves='10' seed='5'/%3E%3CfeColorMatrix type='saturate' values='0.3'/%3E%3C/filter%3E%3Crect width='800' height='800' filter='url(%23wood)'/%3E%3C/svg%3E")`,
          backgroundSize: '900px 450px',
          mixBlendMode: 'multiply'
        }}
      />

      {/* Additional depth layer - RIDOTTA */}
      <div
        className="absolute inset-0 opacity-8"
        style={{
          background: 'radial-gradient(circle at 30% 40%, transparent 0%, rgba(0,0,0,0.2) 100%)'
        }}
      />

      {/* Enhanced magical spotlight with warm golden tones */}
      <motion.div
        className="absolute w-[1600px] h-[1600px] rounded-full pointer-events-none"
        style={{
          left: '50%',
          top: '45%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(circle, rgba(255, 215, 120, 0.7) 0%, rgba(255, 200, 100, 0.45) 20%, rgba(255, 160, 60, 0.25) 40%, rgba(139, 69, 19, 0.12) 60%, transparent 75%)',
          filter: 'blur(70px)'
        }}
        animate={{
          scale: [1, 1.1, 1],
          opacity: [0.75, 0.9, 0.75]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Secondary ambient glow */}
      <motion.div
        className="absolute w-[2000px] h-[1200px] rounded-full pointer-events-none"
        style={{
          left: '50%',
          top: '50%',
          transform: 'translate(-50%, -50%)',
          background: 'radial-gradient(ellipse, rgba(218, 165, 32, 0.3) 0%, rgba(184, 134, 11, 0.15) 30%, transparent 60%)',
          filter: 'blur(90px)'
        }}
        animate={{
          scale: [1, 1.05, 1],
          opacity: [0.5, 0.7, 0.5]
        }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      {/* Multiple warm candle glows around the scene */}
      <motion.div
        className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full opacity-25 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #FFB74D 0%, transparent 70%)' }}
        animate={{
          scale: [1, 1.25, 1],
          x: [0, 30, 0],
          y: [0, -20, 0],
          opacity: [0.2, 0.35, 0.2]
        }}
        transition={{ duration: 6, repeat: Infinity, ease: 'easeInOut' }}
      />

      <motion.div
        className="absolute top-1/3 right-1/4 w-[400px] h-[400px] rounded-full opacity-20 blur-3xl pointer-events-none"
        style={{ background: 'radial-gradient(circle, #FFA726 0%, transparent 70%)' }}
        animate={{
          scale: [1, 1.3, 1],
          x: [0, -40, 0],
          y: [0, 30, 0],
          opacity: [0.15, 0.3, 0.15]
        }}
        transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      {/* Magical floating particles (golden fairy dust) */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {particles.map(particle => (
          <motion.div
            key={particle.id}
            className="absolute"
            style={{
              left: particle.left,
              top: particle.top,
              width: `${particle.size}px`,
              height: `${particle.size}px`,
            }}
            animate={{
              y: [0, -120, 0],
              x: [0, Math.random() * 60 - 30, 0],
              opacity: [particle.opacity * 0.7, particle.opacity * 1.3, particle.opacity * 0.7],
              scale: [0.8, 1.8, 0.8],
              rotate: [0, 360, 720]
            }}
            transition={{
              duration: particle.duration,
              delay: particle.delay,
              repeat: Infinity,
              ease: 'easeInOut'
            }}
          >
            {/* Golden sparkle star */}
            <svg width={particle.size * 2} height={particle.size * 2} viewBox="0 0 20 20">
              <defs>
                <radialGradient id={`sparkle-${particle.id}`}>
                  <stop offset="0%" stopColor="#FFD700" stopOpacity="0.9" />
                  <stop offset="50%" stopColor="#FFA500" stopOpacity="0.6" />
                  <stop offset="100%" stopColor="#FF8C00" stopOpacity="0.2" />
                </radialGradient>
              </defs>
              <path
                d="M10,2 L11,9 L18,10 L11,11 L10,18 L9,11 L2,10 L9,9 Z"
                fill={`url(#sparkle-${particle.id})`}
                filter="blur(0.5px)"
              />
            </svg>
          </motion.div>
        ))}
      </div>

      {/* Candele virtuali agli angoli */}
      {/* Candela in alto a sinistra */}
      <motion.div
        className="absolute top-[5%] left-[8%] w-[180px] h-[180px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255, 200, 80, 0.6) 0%, rgba(255, 150, 40, 0.3) 30%, rgba(255, 100, 0, 0.1) 50%, transparent 70%)',
          filter: 'blur(35px)'
        }}
        animate={{
          scale: [1, 1.2, 0.95, 1.15, 1],
          opacity: [0.5, 0.7, 0.4, 0.65, 0.5],
          x: [-2, 3, -1, 2, -2],
          y: [-3, 2, -2, 1, -3]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
      />

      {/* Candela in alto a destra */}
      <motion.div
        className="absolute top-[5%] right-[8%] w-[180px] h-[180px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255, 200, 80, 0.6) 0%, rgba(255, 150, 40, 0.3) 30%, rgba(255, 100, 0, 0.1) 50%, transparent 70%)',
          filter: 'blur(35px)'
        }}
        animate={{
          scale: [1, 1.15, 1, 1.25, 1],
          opacity: [0.5, 0.65, 0.5, 0.7, 0.5],
          x: [2, -3, 1, -2, 2],
          y: [-2, 3, -1, 2, -2]
        }}
        transition={{ duration: 4.5, repeat: Infinity, ease: 'easeInOut', delay: 0.5 }}
      />

      {/* Candela in basso a sinistra */}
      <motion.div
        className="absolute bottom-[15%] left-[10%] w-[150px] h-[150px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255, 200, 80, 0.5) 0%, rgba(255, 150, 40, 0.25) 30%, rgba(255, 100, 0, 0.08) 50%, transparent 70%)',
          filter: 'blur(30px)'
        }}
        animate={{
          scale: [1, 1.1, 0.9, 1.2, 1],
          opacity: [0.4, 0.6, 0.35, 0.55, 0.4],
          x: [-1, 2, -2, 1, -1],
          y: [2, -3, 1, -2, 2]
        }}
        transition={{ duration: 3.5, repeat: Infinity, ease: 'easeInOut', delay: 1 }}
      />

      {/* Candela in basso a destra */}
      <motion.div
        className="absolute bottom-[15%] right-[10%] w-[150px] h-[150px] rounded-full pointer-events-none"
        style={{
          background: 'radial-gradient(circle, rgba(255, 200, 80, 0.5) 0%, rgba(255, 150, 40, 0.25) 30%, rgba(255, 100, 0, 0.08) 50%, transparent 70%)',
          filter: 'blur(30px)'
        }}
        animate={{
          scale: [1, 1.2, 0.95, 1.1, 1],
          opacity: [0.4, 0.55, 0.4, 0.6, 0.4],
          x: [1, -2, 2, -1, 1],
          y: [3, -2, 1, -3, 3]
        }}
        transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut', delay: 1.5 }}
      />

      {/* Enhanced vignette with warm tones */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: 'radial-gradient(ellipse at center, transparent 15%, rgba(20, 10, 5, 0.4) 50%, rgba(10, 5, 2, 0.75) 75%, rgba(5, 2, 1, 0.92) 100%)'
      }} />

      {/* Film grain for texture */}
      <div className="film-grain absolute inset-0 opacity-20 pointer-events-none mix-blend-overlay" />

      {/* 🎭 TEATRO DI MARIONETTE - Elementi scenici appesi a fili con fisica */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none z-10">
        {/* Elementi specifici per ogni tema/interludio */}
        {accentColor === '#8B4513' && ( // INTERLUDIO I - Sogni & Connessioni (Marrone)
          <>
            {/* Luna crescente - sinistra alta */}
            <motion.div
              className="absolute"
              style={{ left: '15%', top: 0 }}
              animate={{
                y: '18vh',
                rotate: [-3, 3, -3]
              }}
              transition={{
                y: { type: 'spring', stiffness: 35, damping: 15, mass: 1.2 },
                rotate: { duration: 4.5, repeat: Infinity, ease: "easeInOut" }
              }}
            >
              {/* Filo dalla cima dello schermo */}
              <div
                className="absolute left-1/2 bottom-full w-[1px] bg-gradient-to-b from-amber-200/20 via-amber-200/40 to-amber-200/70"
                style={{
                  height: '18vh',
                  transformOrigin: 'bottom center'
                }}
              />
              {/* Luna */}
              <svg width="80" height="80" viewBox="0 0 80 80" className="drop-shadow-lg">
                <path
                  d="M 25 15 Q 20 20 20 30 Q 20 40 25 45 Q 30 50 40 50 Q 35 50 30 45 Q 25 40 25 30 Q 25 20 30 15 Q 35 10 45 10 Q 35 10 30 12 Q 27 13 25 15 Z"
                  fill="#FFF8DC"
                  stroke="#FFD700"
                  strokeWidth="1.5"
                  opacity="0.9"
                />
                <circle cx="32" cy="25" r="3" fill="#FFE4B5" opacity="0.6" />
                <circle cx="28" cy="35" r="2" fill="#FFE4B5" opacity="0.5" />
              </svg>
            </motion.div>

            {/* Stella grande - destra alta */}
            <motion.div
              className="absolute"
              style={{ right: '18%', top: 0 }}
              animate={{
                y: '22vh',
                rotate: [-5, 5, -5],
                scale: [1, 1.05, 1]
              }}
              transition={{
                y: { type: 'spring', stiffness: 32, damping: 18, mass: 1.3 },
                rotate: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
                scale: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 }
              }}
            >
              {/* Filo dalla cima */}
              <div
                className="absolute left-1/2 bottom-full w-[1px] bg-gradient-to-b from-amber-200/20 via-amber-200/40 to-amber-200/70"
                style={{
                  height: '22vh',
                  transformOrigin: 'bottom center'
                }}
              />
              {/* Stella */}
              <svg width="60" height="60" viewBox="0 0 60 60" className="drop-shadow-lg">
                <path
                  d="M 30 5 L 35 22 L 52 22 L 38 32 L 43 49 L 30 39 L 17 49 L 22 32 L 8 22 L 25 22 Z"
                  fill="#FFD700"
                  stroke="#FFA500"
                  strokeWidth="1.5"
                  opacity="0.85"
                />
              </svg>
            </motion.div>

            {/* Stelline piccole sparse */}
            <motion.div
              className="absolute"
              style={{ left: '25%', top: 0 }}
              animate={{
                y: '28vh',
                rotate: [0, 10, 0]
              }}
              transition={{
                y: { type: 'spring', stiffness: 40, damping: 12, mass: 0.8 },
                rotate: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 1 }
              }}
            >
              <div
                className="absolute left-1/2 bottom-full w-[1px] bg-gradient-to-b from-amber-200/15 via-amber-200/35 to-amber-200/60"
                style={{ height: '28vh', transformOrigin: 'bottom center' }}
              />
              <svg width="30" height="30" viewBox="0 0 30 30">
                <path d="M 15 2 L 17 12 L 27 12 L 19 18 L 22 28 L 15 22 L 8 28 L 11 18 L 3 12 L 13 12 Z"
                  fill="#E0E0E0" opacity="0.7" />
              </svg>
            </motion.div>

            <motion.div
              className="absolute"
              style={{ right: '28%', top: 0 }}
              animate={{
                y: '25vh',
                rotate: [0, -8, 0]
              }}
              transition={{
                y: { type: 'spring', stiffness: 38, damping: 14, mass: 0.9 },
                rotate: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.5 }
              }}
            >
              <div
                className="absolute left-1/2 bottom-full w-[1px] bg-gradient-to-b from-amber-200/15 via-amber-200/35 to-amber-200/60"
                style={{ height: '25vh', transformOrigin: 'bottom center' }}
              />
              <svg width="25" height="25" viewBox="0 0 25 25">
                <path d="M 12.5 1 L 14 10 L 23 10 L 16 15 L 18 24 L 12.5 19 L 7 24 L 9 15 L 2 10 L 11 10 Z"
                  fill="#E0E0E0" opacity="0.7" />
              </svg>
            </motion.div>
          </>
        )}

        {accentColor === '#D4AF37' && ( // INTERLUDIO II - Memorie & Radici (Oro)
          <>
            {/* Foglia autunnale - sinistra */}
            <motion.div
              className="absolute"
              style={{ left: '15%', top: 0 }}
              animate={{
                y: '20vh',
                rotate: [-15, 15, -15]
              }}
              transition={{
                y: { type: 'spring', stiffness: 36, damping: 16, mass: 1.1 },
                rotate: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.3 }
              }}
            >
              <div
                className="absolute left-1/2 bottom-full w-[1px] bg-gradient-to-b from-amber-300/18 via-amber-300/40 to-amber-300/65"
                style={{ height: '20vh', transformOrigin: 'bottom center' }}
              />
              <svg width="50" height="60" viewBox="0 0 50 60" className="drop-shadow-md">
                <path
                  d="M 25 5 Q 30 15 28 25 Q 35 30 30 40 Q 27 50 25 58 Q 23 50 20 40 Q 15 30 22 25 Q 20 15 25 5 Z"
                  fill="#8B4513"
                  stroke="#654321"
                  strokeWidth="1.5"
                  opacity="0.8"
                />
              </svg>
            </motion.div>

            {/* Corona d'alloro - destra alta */}
            <motion.div
              className="absolute"
              style={{ right: '16%', top: 0 }}
              animate={{
                y: '18vh',
                rotate: [-8 + (currentBook * -3), 8 + (currentBook * -3), -8 + (currentBook * -3)],
                x: currentBook * 32
              }}
              transition={{
                y: { type: 'spring', stiffness: 34, damping: 17, mass: 1.2 },
                x: { type: 'spring', stiffness: 29, damping: 22, mass: 1.5 },
                rotate: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.7 }
              }}
            >
              <div
                className="absolute left-1/2 bottom-full w-[1px] bg-gradient-to-b from-amber-300/18 via-amber-300/40 to-amber-300/65"
                style={{ height: '18vh', transformOrigin: 'bottom center' }}
              />
              <svg width="70" height="70" viewBox="0 0 70 70" className="drop-shadow-md">
                <path
                  d="M 15 35 Q 15 20 25 15 Q 35 10 45 15 Q 55 20 55 35 Q 55 40 50 43 Q 45 38 40 38 Q 35 38 30 38 Q 25 38 20 43 Q 15 40 15 35 Z"
                  fill="none"
                  stroke="#DAA520"
                  strokeWidth="3"
                  opacity="0.85"
                />
                {[...Array(6)].map((_, i) => (
                  <ellipse
                    key={i}
                    cx={20 + i * 6}
                    cy={28 + (i % 2) * 4}
                    rx="4"
                    ry="7"
                    fill="#9ACD32"
                    opacity="0.8"
                    transform={`rotate(${i * 10 - 25} ${20 + i * 6} ${28 + (i % 2) * 4})`}
                  />
                ))}
              </svg>
            </motion.div>

            {/* Pergamena - sinistra centro */}
            <motion.div
              className="absolute"
              style={{ left: '28%', top: 0 }}
              animate={{
                y: '28vh',
                rotate: [-5 + (currentBook * 1.8), 5 + (currentBook * 1.8), -5 + (currentBook * 1.8)],
                x: currentBook * -15
              }}
              transition={{
                y: { type: 'spring', stiffness: 31, damping: 19, mass: 1.5 },
                x: { type: 'spring', stiffness: 27, damping: 23, mass: 1.7 },
                rotate: { duration: 5.5, repeat: Infinity, ease: "easeInOut", delay: 1.2 }
              }}
            >
              <div
                className="absolute left-1/2 bottom-full w-[1px] bg-gradient-to-b from-amber-300/16 via-amber-300/38 to-amber-300/60"
                style={{ height: '28vh', transformOrigin: 'bottom center' }}
              />
              <svg width="60" height="80" viewBox="0 0 60 80" className="drop-shadow-md">
                <rect x="10" y="15" width="40" height="50" rx="3" fill="#F4E4C1" stroke="#D4AF37" strokeWidth="2" opacity="0.85" />
                <line x1="15" y1="25" x2="45" y2="25" stroke="#8B7355" strokeWidth="1" opacity="0.6" />
                <line x1="15" y1="35" x2="45" y2="35" stroke="#8B7355" strokeWidth="1" opacity="0.6" />
                <line x1="15" y1="45" x2="40" y2="45" stroke="#8B7355" strokeWidth="1" opacity="0.6" />
              </svg>
            </motion.div>

            {/* Trofeo d'oro - destra bassa */}
            <motion.div
              className="absolute"
              style={{ right: '25%', top: 0 }}
              animate={{
                y: '33vh',
                rotate: [-4 + (currentBook * -2), 4 + (currentBook * -2), -4 + (currentBook * -2)],
                x: currentBook * 20,
                scale: [1, 1.05, 1]
              }}
              transition={{
                y: { type: 'spring', stiffness: 33, damping: 18, mass: 1.3 },
                x: { type: 'spring', stiffness: 28, damping: 21, mass: 1.5 },
                rotate: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.9 },
                scale: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.9 }
              }}
            >
              <div
                className="absolute left-1/2 bottom-full w-[1px] bg-gradient-to-b from-amber-300/16 via-amber-300/38 to-amber-300/60"
                style={{ height: '33vh', transformOrigin: 'bottom center' }}
              />
              <svg width="55" height="65" viewBox="0 0 55 65" className="drop-shadow-lg">
                <path d="M 20 35 L 20 50 Q 20 55 27.5 55 Q 35 55 35 50 L 35 35 Z" fill="#DAA520" opacity="0.9" />
                <path d="M 15 35 Q 15 20 27.5 15 Q 40 20 40 35 Z" fill="#FFD700" stroke="#B8860B" strokeWidth="1.5" opacity="0.9" />
                <ellipse cx="27.5" cy="28" rx="8" ry="5" fill="#FFA500" opacity="0.7" />
                <rect x="23" y="50" width="9" height="8" rx="1" fill="#8B6914" />
                <circle cx="16" cy="22" r="3" fill="#FF6B6B" />
                <circle cx="39" cy="22" r="3" fill="#FF6B6B" />
              </svg>
            </motion.div>
          </>
        )}

        {accentColor === '#3B82F6' && ( // INTERLUDIO III - Vita & Comunità (Blu)
          <>
            {/* Uccellino azzurro - sinistra alta */}
            <motion.div
              className="absolute"
              style={{ left: '18%', top: 0 }}
              animate={{
                y: '19vh',
                rotate: [-10 + (currentBook * 2), 10 + (currentBook * 2), -10 + (currentBook * 2)],
                x: [currentBook * -22 - 3, currentBook * -22 + 3, currentBook * -22 - 3]
              }}
              transition={{
                y: { type: 'spring', stiffness: 42, damping: 13, mass: 0.9 },
                x: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 },
                rotate: { duration: 3.5, repeat: Infinity, ease: "easeInOut", delay: 0.4 }
              }}
            >
              <div
                className="absolute left-1/2 bottom-full w-[1px] bg-gradient-to-b from-cyan-200/18 via-cyan-200/40 to-cyan-200/65"
                style={{ height: '19vh', transformOrigin: 'bottom center' }}
              />
              <svg width="55" height="45" viewBox="0 0 55 45" className="drop-shadow-md">
                <ellipse cx="27" cy="22" rx="12" ry="10" fill="#87CEEB" opacity="0.9" />
                <circle cx="22" cy="20" r="2" fill="#000" />
                <path d="M 18 22 L 13 24 Q 10 25 13 26 L 18 24" fill="#FFA500" />
                <path d="M 12 22 Q 5 18 8 15 Q 10 18 12 22 M 12 24 Q 5 28 8 31 Q 10 28 12 24" fill="#87CEEB" opacity="0.85" />
                <path d="M 35 20 Q 42 18 45 22 Q 42 24 35 24" fill="#87CEEB" opacity="0.85" />
              </svg>
            </motion.div>

            {/* Cuore rosa - destra alta */}
            <motion.div
              className="absolute"
              style={{ right: '17%', top: 0 }}
              animate={{
                y: '16vh',
                rotate: [-6 + (currentBook * -2.5), 6 + (currentBook * -2.5), -6 + (currentBook * -2.5)],
                x: currentBook * 26,
                scale: [1, 1.08, 1]
              }}
              transition={{
                y: { type: 'spring', stiffness: 36, damping: 15, mass: 1.1 },
                x: { type: 'spring', stiffness: 31, damping: 20, mass: 1.4 },
                rotate: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.6 },
                scale: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.6 }
              }}
            >
              <div
                className="absolute left-1/2 bottom-full w-[1px] bg-gradient-to-b from-pink-200/18 via-pink-200/40 to-pink-200/65"
                style={{ height: '16vh', transformOrigin: 'bottom center' }}
              />
              <svg width="50" height="50" viewBox="0 0 50 50" className="drop-shadow-lg">
                <path
                  d="M 25 40 Q 15 30 10 22 Q 8 18 8 15 Q 8 10 12 8 Q 16 6 20 10 Q 22 12 25 15 Q 28 12 30 10 Q 34 6 38 8 Q 42 10 42 15 Q 42 18 40 22 Q 35 30 25 40 Z"
                  fill="#FF69B4"
                  stroke="#FF1493"
                  strokeWidth="1.5"
                  opacity="0.85"
                />
              </svg>
            </motion.div>

            {/* Bandierina triangolare - centro sinistra */}
            <motion.div
              className="absolute"
              style={{ left: '30%', top: 0 }}
              animate={{
                y: '23vh',
                rotate: [-12 + (currentBook * 2.2), 12 + (currentBook * 2.2), -12 + (currentBook * 2.2)],
                x: currentBook * -16
              }}
              transition={{
                y: { type: 'spring', stiffness: 38, damping: 14, mass: 1 },
                x: { type: 'spring', stiffness: 32, damping: 19, mass: 1.3 },
                rotate: { duration: 4.5, repeat: Infinity, ease: "easeInOut", delay: 0.9 }
              }}
            >
              <div
                className="absolute left-1/2 bottom-full w-[1px] bg-gradient-to-b from-amber-200/16 via-amber-200/38 to-amber-200/60"
                style={{ height: '23vh', transformOrigin: 'bottom center' }}
              />
              <svg width="45" height="55" viewBox="0 0 45 55" className="drop-shadow-md">
                <path d="M 10 10 L 40 25 L 10 40 Z" fill="#FF6B6B" stroke="#FF4757" strokeWidth="1.5" opacity="0.85" />
                <line x1="10" y1="10" x2="10" y2="50" stroke="#8B4513" strokeWidth="2" />
              </svg>
            </motion.div>

            {/* Uccellino dorato - destra */}
            <motion.div
              className="absolute"
              style={{ right: '27%', top: 0 }}
              animate={{
                y: '26vh',
                rotate: [8 + (currentBook * -2), -8 + (currentBook * -2), 8 + (currentBook * -2)],
                x: [currentBook * 24 + 2, currentBook * 24 - 2, currentBook * 24 + 2]
              }}
              transition={{
                y: { type: 'spring', stiffness: 40, damping: 13, mass: 0.95 },
                x: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.3 },
                rotate: { duration: 4, repeat: Infinity, ease: "easeInOut", delay: 1.3 }
              }}
            >
              <div
                className="absolute left-1/2 bottom-full w-[1px] bg-gradient-to-b from-cyan-200/16 via-cyan-200/38 to-cyan-200/60"
                style={{ height: '26vh', transformOrigin: 'bottom center' }}
              />
              <svg width="50" height="40" viewBox="0 0 50 40" className="drop-shadow-md">
                <ellipse cx="25" cy="20" rx="11" ry="9" fill="#FFD700" opacity="0.9" />
                <circle cx="21" cy="18" r="2" fill="#000" />
                <path d="M 17 20 L 13 21 Q 11 22 13 23 L 17 22" fill="#FFA500" />
                <path d="M 11 20 Q 5 17 7 14 Q 9 17 11 20 M 11 22 Q 5 25 7 28 Q 9 25 11 22" fill="#FFD700" opacity="0.85" />
                <path d="M 32 18 Q 38 16 41 20 Q 38 22 32 22" fill="#FFD700" opacity="0.85" />
              </svg>
            </motion.div>

            {/* Palloncino blu - sinistra bassa */}
            <motion.div
              className="absolute"
              style={{ left: '22%', top: 0 }}
              animate={{
                y: ['30vh', '29vh', '30vh'],
                rotate: [-5 + (currentBook * 1.5), 5 + (currentBook * 1.5), -5 + (currentBook * 1.5)],
                x: currentBook * -18
              }}
              transition={{
                y: { duration: 4, repeat: Infinity, ease: "easeInOut" },
                rotate: { duration: 5, repeat: Infinity, ease: "easeInOut", delay: 0.5 },
                x: { type: 'spring', stiffness: 30, damping: 20, mass: 1.4 }
              }}
            >
              <div
                className="absolute left-1/2 bottom-full w-[1px] bg-gradient-to-b from-blue-200/16 via-blue-200/38 to-blue-200/60"
                style={{ height: '30vh', transformOrigin: 'bottom center' }}
              />
              <svg width="45" height="55" viewBox="0 0 45 55" className="drop-shadow-lg">
                <ellipse cx="22.5" cy="20" rx="12" ry="16" fill="#4A90E2" opacity="0.85" />
                <path d="M 22.5 36 Q 18 40 18 46 L 22.5 36 Q 27 40 27 46 Z" fill="#4A90E2" opacity="0.7" />
                <ellipse cx="22.5" cy="16" rx="6" ry="4" fill="#87CEEB" opacity="0.6" />
              </svg>
            </motion.div>
          </>
        )}
      </div>

      {/* 🎬 3D SCENE con CAMERA DOLLY */}
      <div className="absolute inset-0 flex items-center justify-center z-20" style={{ perspective: '2000px', perspectiveOrigin: '50% 50%' }}>
        {/* 🎥 CAMERA DOLLY - Scorre orizzontalmente sui binari */}
        <motion.div
          className="relative w-full h-full"
          animate={{
            x: cameraTarget.x,
            y: cameraTarget.y,
            z: cameraTarget.z,
            rotateX: cameraTarget.rotateX,
            rotateY: cameraTarget.rotateY,
            rotateZ: cameraTarget.rotateZ
          }}
          transition={{
            type: 'spring',
            stiffness: 25,
            damping: 35,
            mass: 2,
            duration: 2.5
          }}
          style={{
            transformStyle: 'preserve-3d',
            transform: 'translateZ(0)',
            willChange: 'transform'
          }}
        >
          {/* 🫁 BREATHING EFFECT - Micro-movimenti handheld quando inquadra - RIDOTTI per oscillazione più delicata */}
          <motion.div
            className="relative w-full h-full"
            animate={{
              x: [0, 2, -1.5, 2.5, -1, 0],
              y: [0, -1.5, 2, -1, 1.5, 0],
              rotateZ: [0, 0.15, -0.12, 0.18, -0.15, 0],
              scale: [1, 1.001, 0.999, 1.001, 0.999, 1]
            }}
            transition={{
              duration: 12, // Più lento per maggiore fluidità
              repeat: Infinity,
              ease: 'easeInOut',
              times: [0, 0.2, 0.4, 0.6, 0.8, 1],
              repeatDelay: 0.5
            }}
            style={{ transformStyle: 'preserve-3d' }}
          >
            {/* 🏛️ SPAZIO 3D - Biblioteca delle Anime con tutti i libri fissi */}
            {bookPositions.map((position, index) => (
              <OpenBook key={`book-${index}`} index={index} position={position} />
            ))}

            {/* ✨ GOD RAYS VOLUMETRICI che seguono il libro focused */}
            {lightRays.map(ray => (
              <motion.div
                key={`ray-${ray.id}`}
                className="absolute"
                style={{
                  left: '50%',
                  top: '50%',
                  width: '3px',
                  height: '2000px',
                  marginLeft: '-1.5px',
                  marginTop: '-1000px',
                  transform: `translate3d(${currentBookPos.x}px, ${currentBookPos.y - 1000}px, ${currentBookPos.z}px) rotateZ(${ray.angle}deg)`,
                  transformStyle: 'preserve-3d',
                  transformOrigin: 'center top',
                  background: 'linear-gradient(to bottom, rgba(255, 230, 180, 0.4), rgba(255, 200, 100, 0.1) 60%, transparent)',
                  filter: 'blur(2px)',
                  zIndex: 100,
                  pointerEvents: 'none'
                }}
                animate={{
                  opacity: [0, 0.6, 0],
                  scaleY: [0.3, 1, 0.3]
                }}
                transition={{
                  duration: ray.duration,
                  delay: ray.delay,
                  repeat: Infinity,
                  ease: 'easeInOut'
                }}
              />
            ))}
          </motion.div>
        </motion.div>
      </div>

      {/* Elegant progress indicator - NASCOSTO SU MOBILE */}
      <motion.div
        animate={{ opacity: isInView ? 1 : 0 }}
        className="hidden md:block absolute bottom-16 left-1/2 -translate-x-1/2 text-center z-40"
      >
        <div className="flex items-center gap-3 mb-3">
          {Array.from({ length: totalBooks }).map((_, i) => (
            <motion.div
              key={i}
              className="w-3 h-3 rounded-full border-2"
              style={{
                borderColor: i === safeCurrentBook ? '#D4AF37' : 'rgba(255, 200, 100, 0.3)',
                backgroundColor: i === safeCurrentBook ? '#D4AF37' : 'transparent'
              }}
              animate={{
                scale: i === safeCurrentBook ? [1, 1.3, 1] : 1
              }}
              transition={{ duration: 0.5 }}
            />
          ))}
        </div>
        <p className="text-sm text-amber-200/70 font-light tracking-wider" style={{ fontFamily: 'Georgia, serif' }}>
          {safeCurrentBook + 1} / {totalBooks}
        </p>
        <p className="text-xs text-amber-200/50 mt-2 italic">
          Scorri lateralmente per continuare il viaggio
        </p>
      </motion.div>

      {/* Audio elements */}
      {titleAudioSrc && (
        <audio
          ref={titleAudioRef}
          preload="auto"
          style={{ display: 'none' }}
          onPlay={() => window.dispatchEvent(new Event('voiceStart'))}
          onEnded={() => window.dispatchEvent(new Event('voiceEnd'))}
          onPause={() => window.dispatchEvent(new Event('voiceEnd'))}
        >
          <source src={titleAudioSrc} type="audio/mpeg" />
        </audio>
      )}
      {media.map((item, index) => (
        item.audioSrc && (
          <audio
            key={index}
            ref={(el) => { mediaAudioRefs.current[index] = el; }}
            preload="auto"
            style={{ display: 'none' }}
            onPlay={() => window.dispatchEvent(new Event('voiceStart'))}
            onEnded={() => window.dispatchEvent(new Event('voiceEnd'))}
            onPause={() => window.dispatchEvent(new Event('voiceEnd'))}
          >
            <source src={item.audioSrc} type="audio/mpeg" />
          </audio>
        )
      ))}

      {/* 📱 OVERLAY FULLSCREEN VIDEO SU MOBILE - con Portal */}
      {isBrowser && expandedVideo && isMobile && createPortal(
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[99999] flex items-center justify-center bg-black/95 backdrop-blur-sm"
          onClick={() => {
            console.log('🎬 Overlay background clicked, closing');
            setExpandedVideo(null);
          }}
        >
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.8, opacity: 0 }}
            transition={{ type: "spring", damping: 20 }}
            className="relative w-full h-full flex items-center justify-center p-4"
            onClick={(e) => {
              console.log('🎬 Inner content clicked, stopping propagation');
              e.stopPropagation();
            }}
          >
            {/* Pulsante chiudi */}
            <button
              className="absolute top-4 right-4 z-10 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md flex items-center justify-center text-white text-2xl hover:bg-white/20 transition-colors"
              onClick={() => {
                console.log('🎬 Close button clicked');
                setExpandedVideo(null);
              }}
            >
              ✕
            </button>

            {/* Video ingrandito - cliccabile per chiudere */}
            <div
              className="w-full h-full flex items-center justify-center"
              onClick={() => {
                console.log('🎬 Video area clicked, closing');
                setExpandedVideo(null);
              }}
            >
              <video
                key={expandedVideo.src}
                autoPlay
                loop
                muted
                playsInline
                className="max-w-full max-h-full object-contain rounded-2xl shadow-2xl"
              >
                <source src={expandedVideo.src} type="video/mp4" />
              </video>
            </div>

            {/* Istruzioni tap per chiudere */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="absolute bottom-8 left-1/2 -translate-x-1/2 text-white/70 text-sm text-center px-4"
            >
              Tocca il video o l'icona ✕ per chiudere
            </motion.p>
          </motion.div>
        </motion.div>,
        document.body
      )}

      {/* Add CSS animation for wood grain */}
      <style jsx>{`
        @keyframes woodGrain {
          0%, 100% { background-position: 0% 0%; }
          50% { background-position: 100% 100%; }
        }
      `}</style>
    </section>
  );
}
