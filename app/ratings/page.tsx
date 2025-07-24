"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Skeleton } from "@/components/ui/skeleton"
import { ThemeToggle } from "@/components/theme-toggle"
import { ColorThemeToggle } from "@/components/color-theme-toggle"
import { PageWrapper } from "@/components/page-wrapper"
import { StarRating } from "@/components/star-rating"
import { useRatings } from "@/components/ratings-provider"
import { UserAccount } from "@/components/user-account"
import { useAuth } from "@/components/auth-provider"
import { 
  ArrowLeft, 
  Star,
  TrendingUp,
  MessageSquare,
  Calendar,
  Trash2,
  PlusCircle,
  Send,
  User,
  AlertCircle
} from "lucide-react"
import Link from "next/link"

export default function RatingsPage() {
  const { reviews, stats, loading, addReview, removeReview } = useRatings()
  const { isProjectOwner } = useAuth()
  
  // State for new review form
  const [showWriteReview, setShowWriteReview] = useState(false)
  const [newReviewContent, setNewReviewContent] = useState("")
  const [newReviewRating, setNewReviewRating] = useState(0)
  const [newReviewerName, setNewReviewerName] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleRemoveReview = async (reviewId: string) => {
    if (confirm('Are you sure you want to remove this review? This action cannot be undone.')) {
      try {
        await removeReview(reviewId)
      } catch (error) {
        alert('Failed to remove review. Please try again.')
      }
    }
  }

  const handleSubmitReview = async () => {
    if (!newReviewContent.trim() || newReviewRating === 0 || !newReviewerName.trim()) {
      alert('Please fill in all fields and select a rating.')
      return
    }

    setIsSubmitting(true)
    try {
      await addReview({
        rating: newReviewRating,
        reviewerName: newReviewerName.trim(),
        comment: newReviewContent.trim()
      })

      // Reset form
      setNewReviewContent("")
      setNewReviewRating(0)
      setNewReviewerName("")
      setShowWriteReview(false)
    } catch (error) {
      alert('Failed to submit review. Please try again.')
    } finally {
      setIsSubmitting(false)
    }
  }

  // Calculate statistics from MongoDB stats
  const totalReviews = stats?.totalReviews || 0
  const averageRating = stats?.averageRating || 0
  const ratingDistribution = stats?.ratingDistribution || { 1: 0, 2: 0, 3: 0, 4: 0, 5: 0 }

  const formatDate = (dateString: string) => {
    const date = new Date(dateString)
    return new Intl.DateTimeFormat('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }).format(date)
  }

  return (
    <PageWrapper>
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Link href="/">
                <Button variant="ghost" size="sm">
                  <ArrowLeft className="h-4 w-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              <div className="flex items-center space-x-2">
                <Star className="h-6 w-6 text-primary" />
                <h1 className="text-xl font-bold">Ratings & Reviews</h1>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              {totalReviews > 0 && isProjectOwner() && (
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={() => {
                    if (confirm('This will clear the MongoDB database. Are you sure?')) {
                      // Note: You'll need to implement this API endpoint if needed
                      alert('Clear all function not implemented for MongoDB')
                    }
                  }}
                >
                  Clear All Reviews
                </Button>
              )}
              <UserAccount />
              <ColorThemeToggle />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Stats Overview */}
        <div className="grid md:grid-cols-3 gap-6 mb-8">
          <Card>
            <CardHeader className="text-center">
              <MessageSquare className="h-8 w-8 text-blue-500 mx-auto mb-2" />
              {loading ? (
                <Skeleton className="h-8 w-16 mx-auto mb-2" />
              ) : (
                <CardTitle className="text-2xl">{totalReviews}</CardTitle>
              )}
              <CardDescription>Total Reviews</CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader className="text-center">
              <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
              {loading ? (
                <Skeleton className="h-8 w-16 mx-auto mb-2" />
              ) : (
                <CardTitle className="text-2xl">{averageRating.toFixed(1)}</CardTitle>
              )}
              <CardDescription>Average Rating</CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader className="text-center">
              <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-2" />
              {loading ? (
                <Skeleton className="h-8 w-16 mx-auto mb-2" />
              ) : (
                <CardTitle className="text-2xl">
                  {(ratingDistribution[4] || 0) + (ratingDistribution[5] || 0)}
                </CardTitle>
              )}
              <CardDescription>Happy Customers</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Rating Distribution */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Rating Distribution</CardTitle>
            <CardDescription>How our website has been rated</CardDescription>
          </CardHeader>
          <CardContent>
            {loading ? (
              <div className="space-y-3">
                {[1, 2, 3, 4, 5].map((i) => (
                  <Skeleton key={i} className="h-4 w-full" />
                ))}
              </div>
            ) : (
              <div className="space-y-3">
                {[5, 4, 3, 2, 1].map((stars) => {
                  const count = ratingDistribution[stars] || 0
                  const percentage = totalReviews > 0 ? (count / totalReviews) * 100 : 0
                  
                  return (
                    <div key={stars} className="flex items-center space-x-3">
                      <div className="flex items-center space-x-1 w-16">
                        <span className="text-sm font-medium">{stars}</span>
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      </div>
                      <div className="flex-1 bg-slate-200 dark:bg-slate-700 rounded-full h-2">
                        <div 
                          className="bg-yellow-400 h-2 rounded-full transition-all duration-300"
                          style={{ width: `${percentage}%` }}
                        />
                      </div>
                      <span className="text-sm text-slate-600 dark:text-slate-400 w-12">
                        {count}
                      </span>
                    </div>
                  )
                })}
              </div>
            )}
          </CardContent>
        </Card>

        {/* Write Review Section */}
        <Card className="mb-8">
          <CardHeader>
            <div className="flex items-center justify-between">
              <div>
                <CardTitle className="flex items-center">
                  <PlusCircle className="h-5 w-5 mr-2" />
                  Write a Review
                </CardTitle>
                <CardDescription>
                  Share your experience with ZeroIQ's advice
                </CardDescription>
              </div>
              {!showWriteReview && (
                <Button onClick={() => setShowWriteReview(true)}>
                  <PlusCircle className="h-4 w-4 mr-2" />
                  Write Review
                </Button>
              )}
            </div>
          </CardHeader>
          {showWriteReview && (
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="reviewer-name">Your Name (Optional)</Label>
                    <Input
                      id="reviewer-name"
                      placeholder="Enter your name or leave blank for Anonymous"
                      value={newReviewerName}
                      onChange={(e) => setNewReviewerName(e.target.value)}
                    />
                  </div>
                </div>
                
                <div>
                  <Label htmlFor="review-content">Your Review</Label>
                  <Textarea
                    id="review-content"
                    placeholder="Tell us about your experience with ZeroIQ..."
                    value={newReviewContent}
                    onChange={(e) => setNewReviewContent(e.target.value)}
                    className="min-h-[120px]"
                  />
                </div>
                
                <div>
                  <Label>Rating</Label>
                  <div className="flex items-center space-x-2 mt-2">
                    <StarRating 
                      onRate={setNewReviewRating}
                      initialRating={newReviewRating}
                    />
                    <span className="text-sm text-slate-600 dark:text-slate-400">
                      {newReviewRating > 0 ? `${newReviewRating}/5 stars` : 'Select a rating'}
                    </span>
                  </div>
                </div>
                
                <div className="flex justify-end space-x-3">
                  <Button 
                    variant="outline" 
                    onClick={() => {
                      setShowWriteReview(false)
                      setNewReviewContent("")
                      setNewReviewRating(0)
                      setNewReviewerName("")
                    }}
                    disabled={isSubmitting}
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={handleSubmitReview}
                    disabled={isSubmitting}
                  >
                    <Send className="h-4 w-4 mr-2" />
                    {isSubmitting ? 'Submitting...' : 'Submit Review'}
                  </Button>
                </div>
              </div>
            </CardContent>
          )}
        </Card>

        {/* Individual Reviews */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">User Reviews</h2>
            <Badge variant="secondary">{totalReviews} reviews</Badge>
          </div>

          {totalReviews === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Star className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Reviews Yet</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Be the first to rate our advice!
                </p>
                <Link href="/ai">
                  <Button>
                    Get Some Advice to Rate
                  </Button>
                </Link>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {reviews.map((review) => (
                <Card key={review._id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <StarRating 
                            initialRating={review.rating} 
                            disabled 
                            size="sm"
                            onRate={() => {}} 
                          />
                          <Badge variant="outline" className="text-xs">
                            {review.rating}/5 stars
                          </Badge>
                        </div>
                        <div className="flex items-center space-x-4 text-sm text-slate-500 dark:text-slate-400">
                          <div className="flex items-center space-x-1">
                            <Calendar className="h-3 w-3" />
                            <span>{formatDate(review.createdAt)}</span>
                          </div>
                          <div className="flex items-center space-x-1">
                            <User className="h-3 w-3" />
                            <span>by {review.reviewerName}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    {review.comment && (
                      <div className="bg-blue-50 dark:bg-blue-950 p-4 rounded-lg border-l-4 border-l-blue-500 mb-4">
                        <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                          {review.comment}
                        </p>
                      </div>
                    )}
                    
                    {/* Remove Review Button - Only for Project Owner */}
                    {isProjectOwner() && (
                      <div className="flex justify-end mt-4 pt-4 border-t border-slate-200 dark:border-slate-700">
                        <Button
                          variant="destructive"
                          size="sm"
                          onClick={() => handleRemoveReview(review._id!)}
                          className="flex items-center space-x-2"
                        >
                          <Trash2 className="h-4 w-4" />
                          <span>Remove Review</span>
                        </Button>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>

        {/* Call to Action */}
        <div className="mt-12 text-center">
          <Card>
            <CardHeader>
              <CardTitle>Want to Rate More Advice?</CardTitle>
              <CardDescription>
                Try our AI consultant and help us improve our website ratings!
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="flex justify-center space-x-4">
                <Link href="/ai">
                  <Button>
                    <MessageSquare className="h-4 w-4 mr-2" />
                    Get More Advice
                  </Button>
                </Link>
                <Link href="/">
                  <Button variant="outline">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    Back to Home
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageWrapper>
  )
}
