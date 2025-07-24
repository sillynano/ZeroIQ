import { NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Review from '@/lib/models/Review'

export async function GET() {
  try {
    await dbConnect()
    
    // Get all user reviews for statistics
    const reviews = await Review.find({ isUserReview: true })
    
    if (reviews.length === 0) {
      return NextResponse.json({ 
        success: true, 
        stats: {
          totalReviews: 0,
          averageRating: 0,
          ratingDistribution: { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
        }
      })
    }
    
    // Calculate statistics
    const totalReviews = reviews.length
    const totalRating = reviews.reduce((sum, review) => sum + review.rating, 0)
    const averageRating = totalRating / totalReviews
    
    // Calculate rating distribution
    const ratingDistribution = { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }
    reviews.forEach(review => {
      ratingDistribution[review.rating as keyof typeof ratingDistribution]++
    })
    
    return NextResponse.json({ 
      success: true, 
      stats: {
        totalReviews,
        averageRating: Math.round(averageRating * 10) / 10, // Round to 1 decimal place
        ratingDistribution
      }
    })
  } catch (error) {
    console.error('Error fetching review stats:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch review statistics' },
      { status: 500 }
    )
  }
}
