"use client"

import React, { createContext, useContext, useState, useEffect } from "react"

interface Rating {
  _id?: string
  id?: string
  question: string
  advice: string
  rating: number
  timestamp?: Date
  createdAt?: Date
  isUserReview?: boolean
  reviewerName?: string
  comment?: string
}

interface ReviewStats {
  totalReviews: number
  averageRating: number
  ratingDistribution: { [key: number]: number }
}

interface RatingsContextType {
  ratings: Rating[]
  reviews: Rating[]
  stats: ReviewStats | null
  loading: boolean
  addRating: (rating: Omit<Rating, '_id' | 'id' | 'timestamp' | 'createdAt'>) => Promise<void>
  addReview: (review: { rating: number; reviewerName: string; comment?: string }) => Promise<void>
  getRatingForAdvice: (advice: string) => number | null
  removeReview: (id: string) => Promise<void>
  refreshData: () => Promise<void>
}

const RatingsContext = createContext<RatingsContextType | undefined>(undefined)

export function RatingsProvider({ children }: { children: React.ReactNode }) {
  const [ratings, setRatings] = useState<Rating[]>([])
  const [reviews, setReviews] = useState<Rating[]>([])
  const [stats, setStats] = useState<ReviewStats | null>(null)
  const [loading, setLoading] = useState(true)

  // Load data from MongoDB on mount
  useEffect(() => {
    refreshData()
  }, [])

  const refreshData = async () => {
    try {
      setLoading(true)
      
      // Fetch reviews and stats in parallel
      const [reviewsResponse, statsResponse] = await Promise.all([
        fetch('/api/reviews'),
        fetch('/api/reviews/stats')
      ])
      
      if (reviewsResponse.ok) {
        const reviewsData = await reviewsResponse.json()
        if (reviewsData.success) {
          setReviews(reviewsData.reviews)
        }
      }
      
      if (statsResponse.ok) {
        const statsData = await statsResponse.json()
        if (statsData.success) {
          setStats(statsData.stats)
        }
      }
    } catch (error) {
      console.error('Failed to load data:', error)
    } finally {
      setLoading(false)
    }
  }

  const addRating = async (newRating: Omit<Rating, '_id' | 'id' | 'timestamp' | 'createdAt'>) => {
    // For AI advice ratings, we'll store them locally (not in MongoDB)
    // This maintains the existing functionality for rating AI responses
    const rating: Rating = {
      ...newRating,
      id: Date.now().toString(),
      timestamp: new Date()
    }
    setRatings(prev => [rating, ...prev])
  }

  const addReview = async (reviewData: { rating: number; reviewerName: string; comment?: string }) => {
    try {
      const response = await fetch('/api/reviews', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(reviewData),
      })
      
      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          // Refresh data to get updated reviews and stats
          await refreshData()
          return data.review
        }
      }
      
      throw new Error('Failed to add review')
    } catch (error) {
      console.error('Error adding review:', error)
      throw error
    }
  }

  const removeReview = async (id: string) => {
    try {
      const response = await fetch(`/api/reviews/${id}`, {
        method: 'DELETE',
      })
      
      if (response.ok) {
        const data = await response.json()
        if (data.success) {
          // Refresh data to get updated reviews and stats
          await refreshData()
          return
        }
      }
      
      throw new Error('Failed to remove review')
    } catch (error) {
      console.error('Error removing review:', error)
      throw error
    }
  }

  const getRatingForAdvice = (advice: string): number | null => {
    const rating = ratings.find(r => r.advice === advice)
    return rating ? rating.rating : null
  }

  return (
    <RatingsContext.Provider value={{ 
      ratings, 
      reviews, 
      stats, 
      loading,
      addRating, 
      addReview,
      getRatingForAdvice, 
      removeReview,
      refreshData
    }}>
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
