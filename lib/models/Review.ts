import mongoose from 'mongoose'

export interface IReview {
  _id?: string
  rating: number
  reviewerName: string
  comment?: string
  isUserReview: boolean
  createdAt: Date
  updatedAt: Date
}

const ReviewSchema = new mongoose.Schema({
  rating: {
    type: Number,
    required: true,
    min: 1,
    max: 5
  },
  reviewerName: {
    type: String,
    required: true,
    trim: true
  },
  comment: {
    type: String,
    trim: true
  },
  isUserReview: {
    type: Boolean,
    required: true,
    default: true
  }
}, {
  timestamps: true
})

// Ensure we don't re-compile the model during development
const Review = mongoose.models.Review || mongoose.model<IReview>('Review', ReviewSchema)

export default Review
