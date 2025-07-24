"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { ThemeToggle } from "@/components/theme-toggle"
import { ColorThemeToggle } from "@/components/color-theme-toggle"
import { PageWrapper } from "@/components/page-wrapper"
import { UserAccount } from "@/components/user-account"
import { Brain, ArrowLeft, Search, Home, AlertTriangle } from "lucide-react"
import Link from "next/link"

export default function NotFound() {
  return (
    <PageWrapper>
      {/* Header */}
      <header className="border-b bg-background/80 backdrop-blur-sm">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-2">
              <Brain className="h-8 w-8 text-primary" />
              <h1 className="text-2xl font-bold">ZeroIQ</h1>
            </div>
            <div className="flex items-center space-x-2">
              <UserAccount />
              <ColorThemeToggle />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="max-w-2xl mx-auto text-center">
          {/* 404 Error Display */}
          <div className="mb-8">
            <div className="flex justify-center mb-6">
              <AlertTriangle className="h-24 w-24 text-red-500" />
            </div>
            <h1 className="text-6xl font-bold text-slate-900 dark:text-slate-100 mb-4">
              404
            </h1>
            <h2 className="text-3xl font-bold text-slate-700 dark:text-slate-300 mb-4">
              Page Not Found
            </h2>
            <p className="text-lg text-slate-600 dark:text-slate-400 mb-8">
              Oops! The page you're looking for seems to have vanished into the digital void. 
                Don't worry, it happens to the best of us.  
            </p>
          </div>

          {/* Helpful Actions */}
          <Card className="mb-8">
            <CardHeader>
              <CardTitle className="flex items-center justify-center">
                <Search className="h-5 w-5 mr-2" />
                What would you like to do?
              </CardTitle>
              <CardDescription>
                Here are some helpful options to get you back on track
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2">
                <Link href="/">
                  <Button className="w-full" size="lg">
                    <Home className="h-4 w-4 mr-2" />
                    Go Home
                  </Button>
                </Link>
                <Link href="/ai">
                  <Button variant="outline" className="w-full" size="lg">
                    <Brain className="h-4 w-4 mr-2" />
                    Try AI Consultant
                  </Button>
                </Link>
                <Link href="/ratings">
                  <Button variant="outline" className="w-full" size="lg">
                    <Search className="h-4 w-4 mr-2" />
                    View Ratings
                  </Button>
                </Link>
                <Link href="/about">
                  <Button variant="outline" className="w-full" size="lg">
                    <ArrowLeft className="h-4 w-4 mr-2" />
                    About Me
                  </Button>
                </Link>
              </div>
            </CardContent>
          </Card>

          {/* Fun Message */}
          <Card className="border-yellow-200 dark:border-yellow-800">
            <CardContent className="pt-6">
              <div className="bg-yellow-50 dark:bg-yellow-950 p-4 rounded-lg">
                <p className="text-yellow-800 dark:text-yellow-200 font-medium">
                  💡 <strong>Pro Tip:</strong>Try out our ZeroIQ AI for some "helpful" advice! At least it will be funnier than this 404 page!
                </p>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </PageWrapper>
  )
}
