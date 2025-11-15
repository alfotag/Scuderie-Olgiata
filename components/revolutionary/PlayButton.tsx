'use client'

import { motion, AnimatePresence } from 'framer-motion'
import { HiPlay } from 'react-icons/hi'

interface PlayButtonProps {
  show: boolean
  onClick: () => void
}

export default function PlayButton({ show, onClick }: PlayButtonProps) {
  return (
    <AnimatePresence>
      {show && (
        <motion.button
          initial={{ scale: 0, opacity: 0 }}
          animate={{
            scale: [1, 1.1, 1],
            opacity: 1
          }}
          exit={{ scale: 0, opacity: 0 }}
          transition={{
            scale: {
              duration: 1.5,
              repeat: Infinity,
              ease: "easeInOut"
            }
          }}
          whileTap={{ scale: 0.9 }}
          onClick={onClick}
          className="fixed bottom-8 right-8 z-[999] w-20 h-20 rounded-full bg-amber-500 hover:bg-amber-600 text-white shadow-2xl flex items-center justify-center ring-4 ring-amber-400/50"
          aria-label="Play audio"
        >
          <HiPlay className="w-10 h-10 ml-1" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
