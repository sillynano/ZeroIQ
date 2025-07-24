import { NextRequest, NextResponse } from 'next/server'
import dbConnect from '@/lib/mongodb'
import Review, { IReview } from '@/lib/models/Review'

export async function GET() {
  try {
    await dbConnect()
    
    // Only return user reviews (hide AI advice reviews)
    const reviews = await Review.find({ isUserReview: true })
      .sort({ createdAt: -1 })
      .lean()
    
    return NextResponse.json({ 
      success: true, 
      reviews: reviews.map(review => ({
        ...review,
        _id: (review._id as any).toString()
      }))
    })
  } catch (error) {
    console.error('Error fetching reviews:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to fetch reviews' },
      { status: 500 }
    )
  }
}

export async function POST(request: NextRequest) {
  try {
    await dbConnect()
    
    const body = await request.json()
    const { rating, reviewerName, comment } = body
    
    // Validation
    if (!rating || !reviewerName) {
      return NextResponse.json(
        { success: false, error: 'Rating and reviewer name are required' },
        { status: 400 }
      )
    }
    
    if (rating < 1 || rating > 5) {
      return NextResponse.json(
        { success: false, error: 'Rating must be between 1 and 5' },
        { status: 400 }
      )
    }
    
    const review = new Review({
      rating,
      reviewerName: reviewerName.trim(),
      comment: comment?.trim(),
      isUserReview: true
    })
    
    await review.save()
    
    return NextResponse.json({ 
      success: true, 
      review: {
        ...review.toObject(),
        _id: review._id.toString()
      }
    }, { status: 201 })
  } catch (error) {
    console.error('Error creating review:', error)
    return NextResponse.json(
      { success: false, error: 'Failed to create review' },
      { status: 500 }
    )
  }
}
