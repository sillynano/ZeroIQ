"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
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
  Calendar
} from "lucide-react"
import Link from "next/link"

export default function RatingsPage() {
  const { ratings, clearAllRatings } = useRatings()
  const { isProjectOwner } = useAuth()

  const handleClearRatings = () => {
    if (confirm('Are you sure you want to clear all ratings? This action cannot be undone.')) {
      clearAllRatings()
    }
  }

  // Calculate statistics
  const totalRatings = ratings.length
  const averageRating = totalRatings > 0 
    ? ratings.reduce((sum, rating) => sum + rating.rating, 0) / totalRatings 
    : 0

  const ratingCounts = [1, 2, 3, 4, 5].map(star => 
    ratings.filter(rating => rating.rating === star).length
  )

  const formatDate = (date: Date) => {
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
              {totalRatings > 0 && isProjectOwner() && (
                <Button 
                  variant="destructive" 
                  size="sm"
                  onClick={handleClearRatings}
                >
                  Clear All Ratings
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
              <CardTitle className="text-2xl">{totalRatings}</CardTitle>
              <CardDescription>Total Reviews</CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader className="text-center">
              <Star className="h-8 w-8 text-yellow-500 mx-auto mb-2" />
              <CardTitle className="text-2xl">{averageRating.toFixed(1)}</CardTitle>
              <CardDescription>Average Rating</CardDescription>
            </CardHeader>
          </Card>
          
          <Card>
            <CardHeader className="text-center">
              <TrendingUp className="h-8 w-8 text-green-500 mx-auto mb-2" />
              <CardTitle className="text-2xl">
                {ratingCounts[4] + ratingCounts[3]} {/* 4 and 5 star ratings */}
              </CardTitle>
              <CardDescription>Happy Customers</CardDescription>
            </CardHeader>
          </Card>
        </div>

        {/* Rating Distribution */}
        <Card className="mb-8">
          <CardHeader>
            <CardTitle>Rating Distribution</CardTitle>
            <CardDescription>How our terrible advice has been rated</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {[5, 4, 3, 2, 1].map((stars) => {
                const count = ratingCounts[stars - 1]
                const percentage = totalRatings > 0 ? (count / totalRatings) * 100 : 0
                
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
          </CardContent>
        </Card>

        {/* Individual Reviews */}
        <div className="space-y-6">
          <div className="flex items-center justify-between">
            <h2 className="text-2xl font-bold">Recent Reviews</h2>
            <Badge variant="secondary">{totalRatings} reviews</Badge>
          </div>

          {totalRatings === 0 ? (
            <Card>
              <CardContent className="text-center py-12">
                <Star className="h-16 w-16 text-slate-300 mx-auto mb-4" />
                <h3 className="text-xl font-semibold mb-2">No Reviews Yet</h3>
                <p className="text-slate-600 dark:text-slate-400 mb-4">
                  Be the first to rate our terrible advice!
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
              {ratings.map((rating) => (
                <Card key={rating.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <div className="flex items-center space-x-3 mb-2">
                          <StarRating 
                            initialRating={rating.rating} 
                            disabled 
                            size="sm"
                            onRate={() => {}} 
                          />
                          <Badge variant="outline" className="text-xs">
                            {rating.rating}/5 stars
                          </Badge>
                        </div>
                        <CardTitle className="text-lg">
                          {rating.question}
                        </CardTitle>
                        <div className="flex items-center space-x-2 text-sm text-slate-500 dark:text-slate-400">
                          <Calendar className="h-3 w-3" />
                          <span>{formatDate(rating.timestamp)}</span>
                        </div>
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="bg-slate-50 dark:bg-slate-900 p-4 rounded-lg border-l-4 border-l-blue-500">
                      <p className="text-sm text-slate-700 dark:text-slate-300 leading-relaxed">
                        {rating.advice.substring(0, 200)}
                        {rating.advice.length > 200 && "..."}
                      </p>
                    </div>
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
              <CardTitle>Want to Rate More Terrible Advice?</CardTitle>
              <CardDescription>
                Try our AI consultant and help us improve our terrible advice ratings!
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
