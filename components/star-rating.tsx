"use client"

import { useState } from "react"
import { Star } from "lucide-react"
import { cn } from "@/lib/utils"

interface StarRatingProps {
  onRate: (rating: number) => void
  initialRating?: number
  disabled?: boolean
  size?: "sm" | "md" | "lg"
}

export function StarRating({ onRate, initialRating = 0, disabled = false, size = "md" }: StarRatingProps) {
  const [rating, setRating] = useState(initialRating)
  const [hoverRating, setHoverRating] = useState(0)

  const handleClick = (starValue: number) => {
    if (disabled) return
    setRating(starValue)
    onRate(starValue)
  }

  const handleMouseEnter = (starValue: number) => {
    if (disabled) return
    setHoverRating(starValue)
  }

  const handleMouseLeave = () => {
    if (disabled) return
    setHoverRating(0)
  }

  const sizeClasses = {
    sm: "h-4 w-4",
    md: "h-5 w-5",
    lg: "h-6 w-6"
  }

  return (
    <div className="flex items-center space-x-1">
      {[1, 2, 3, 4, 5].map((starValue) => {
        const isFilled = starValue <= (hoverRating || rating)
        return (
          <button
            key={starValue}
            type="button"
            onClick={() => handleClick(starValue)}
            onMouseEnter={() => handleMouseEnter(starValue)}
            onMouseLeave={handleMouseLeave}
            disabled={disabled}
            className={cn(
              "transition-colors duration-200",
              disabled ? "cursor-not-allowed" : "cursor-pointer hover:scale-110"
            )}
          >
            <Star
              className={cn(
                sizeClasses[size],
                isFilled
                  ? "fill-yellow-400 text-yellow-400"
                  : "fill-transparent text-gray-300 hover:text-yellow-400"
              )}
            />
          </button>
        )
      })}
    </div>
  )
}
