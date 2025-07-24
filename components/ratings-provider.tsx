"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

interface Rating {
  id: string
  question: string
  advice: string
  rating: number
  timestamp: Date
}

interface RatingsContextType {
  ratings: Rating[]
  addRating: (rating: Omit<Rating, 'id' | 'timestamp'>) => void
  getRatingForAdvice: (advice: string) => number | null
  clearAllRatings: () => void
}

const RatingsContext = createContext<RatingsContextType | undefined>(undefined)

export function RatingsProvider({ children }: { children: React.ReactNode }) {
  const [ratings, setRatings] = useState<Rating[]>([])

  // Load ratings from localStorage on mount
  useEffect(() => {
    const savedRatings = localStorage.getItem('zeroiq-ratings')
    if (savedRatings) {
      try {
        const parsed = JSON.parse(savedRatings)
        setRatings(parsed.map((r: any) => ({
          ...r,
          timestamp: new Date(r.timestamp)
        })))
      } catch (error) {
        console.error('Failed to load ratings:', error)
      }
    }
  }, [])

  // Save ratings to localStorage whenever ratings change
  useEffect(() => {
    localStorage.setItem('zeroiq-ratings', JSON.stringify(ratings))
  }, [ratings])

  const addRating = (newRating: Omit<Rating, 'id' | 'timestamp'>) => {
    const rating: Rating = {
      ...newRating,
      id: Date.now().toString(),
      timestamp: new Date()
    }
    setRatings(prev => [rating, ...prev])
  }

  const getRatingForAdvice = (advice: string): number | null => {
    const rating = ratings.find(r => r.advice === advice)
    return rating ? rating.rating : null
  }

  const clearAllRatings = () => {
    setRatings([])
    localStorage.removeItem('zeroiq-ratings')
  }

  return (
    <RatingsContext.Provider value={{ ratings, addRating, getRatingForAdvice, clearAllRatings }}>
      {children}
    </RatingsContext.Provider>
  )
}

export function useRatings() {
  const context = useContext(RatingsContext)
  if (context === undefined) {
    throw new Error('useRatings must be used within a RatingsProvider')
  }
  return context
}
