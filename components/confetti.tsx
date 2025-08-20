"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"

export default function Confetti() {
  const [pieces, setPieces] = useState<Array<{ id: number; x: number; delay: number; color: string }>>([])

  useEffect(() => {
    const colors = ["#115F5F", "#1a7a7a", "#2d8f8f", "#4da3a3", "#6bb6b6", "#89c9c9"]
    const newPieces = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * 100,
      delay: Math.random() * 3,
      color: colors[Math.floor(Math.random() * colors.length)],
    }))
    setPieces(newPieces)

    // Clean up after animation
    const timer = setTimeout(() => {
      setPieces([])
    }, 4000)

    return () => clearTimeout(timer)
  }, [])

  return (
    <div className="fixed inset-0 pointer-events-none z-50 overflow-hidden">
      {pieces.map((piece) => (
        <motion.div
          key={piece.id}
          className="absolute w-2 h-2 rounded-sm"
          style={{
            backgroundColor: piece.color,
            left: `${piece.x}%`,
            top: "-10px",
          }}
          initial={{ y: -10, rotate: 0, opacity: 1 }}
          animate={{
            y: window.innerHeight + 10,
            rotate: 360,
            opacity: 0,
          }}
          transition={{
            duration: 3,
            delay: piece.delay,
            ease: "easeOut",
          }}
        />
      ))}
    </div>
  )
}
