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
          animate={{ scale: 1, opacity: 1 }}
          exit={{ scale: 0, opacity: 0 }}
          whileTap={{ scale: 0.9 }}
          onClick={onClick}
          className="fixed bottom-8 right-8 z-[999] w-16 h-16 rounded-full bg-amber-500 hover:bg-amber-600 text-white shadow-2xl flex items-center justify-center"
          aria-label="Play audio"
        >
          <HiPlay className="w-8 h-8 ml-1" />
        </motion.button>
      )}
    </AnimatePresence>
  )
}
