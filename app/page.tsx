"use client"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { ThemeToggle } from "@/components/theme-toggle"
import { ColorThemeToggle } from "@/components/color-theme-toggle"
import { PageWrapper } from "@/components/page-wrapper"
import { Brain, Sparkles, Zap } from "lucide-react"
import Link from "next/link"

export default function Home() {
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
              <Badge variant="secondary" className="hidden sm:flex text-xs font-medium">
                lowkey the best unpaid intern that genertaes ideas
              </Badge>
              <ColorThemeToggle />
              <ThemeToggle />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-16">
        {/* Hero Section */}
        <div className="text-center mb-12 sm:mb-16">
          <div className="flex justify-center mb-6 sm:mb-8">
            <div className="relative">
              <Brain className="h-16 w-16 sm:h-20 sm:w-20 lg:h-24 lg:w-24 text-primary animate-pulse" />
              <Sparkles className="h-4 w-4 sm:h-5 sm:w-5 lg:h-6 lg:w-6 text-yellow-500 absolute -top-1 -right-1 sm:-top-2 sm:-right-2 animate-bounce" />
            </div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-slate-900 dark:text-slate-100 mb-4 sm:mb-6 px-2">
            Welcome to <span className="text-primary">ZeroIQ</span>
          </h1>
          
          <p className="text-lg sm:text-xl text-slate-600 dark:text-slate-400 mb-6 sm:mb-8 max-w-3xl mx-auto leading-relaxed px-4">
            A project where you get "helpful information" with style! 
            Experience the beauty of modern web development with "intelligence".
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-3 sm:gap-4 mb-8 sm:mb-12 px-4">
            <Button size="lg" className="text-base sm:text-lg px-6 sm:px-8 py-3 w-full sm:w-auto" asChild>
              <Link href="/ai">
                <Zap className="h-4 w-4 sm:h-5 sm:w-5 mr-2" />
                Try the AI Consultant
              </Link>
            </Button>
            <Button variant="outline" size="lg" className="text-base sm:text-lg px-6 sm:px-8 py-3 w-full sm:w-auto" asChild>
              <Link href="/disclaimer">
                Learn More
              </Link>
            </Button>
          </div>
        </div>

        {/* Feature Cards */}
        <div className="grid gap-6 sm:gap-8 md:grid-cols-2 mb-12 sm:mb-16 px-4">
          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex justify-center mb-3 sm:mb-4">
                <Brain className="h-10 w-10 sm:h-12 sm:w-12 text-blue-500" />
              </div>
              <CardTitle className="text-lg sm:text-xl">Zero Intelligence</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Proudly offering "helpful information" since day one
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
                Experience the pure joy of getting exactly what you don't need, 
                delivered with maximum style and minimum usefulness.
              </p>
            </CardContent>
          </Card>

          <Card className="text-center hover:shadow-lg transition-shadow">
            <CardHeader className="pb-4">
              <div className="flex justify-center mb-3 sm:mb-4">
                <Sparkles className="h-10 w-10 sm:h-12 sm:w-12 text-yellow-500" />
              </div>
              <CardTitle className="text-lg sm:text-xl">Beautiful Design</CardTitle>
              <CardDescription className="text-sm sm:text-base">
                Modern UI components that look amazing while doing nothing
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-0">
              <p className="text-slate-600 dark:text-slate-400 text-sm sm:text-base leading-relaxed">
                Built with Next.js, React, and Tailwind CSS. 
                All the latest technologies for the most useless experience.
              </p>
            </CardContent>
          </Card>
        </div>
      </div>

      {/* Footer */}
      <footer className="border-t bg-slate-50 dark:bg-slate-900 py-8">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <div className="flex justify-center space-x-6 mb-4">
            <Link href="/about" className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors">
              About Me
            </Link>
            <Link href="/disclaimer" className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors">
              Disclaimer
            </Link>
            <Link href="/ai" className="text-slate-600 hover:text-slate-900 dark:text-slate-400 dark:hover:text-slate-100 transition-colors">
              AI Consultant
            </Link>
          </div>
          <p className="text-slate-500 dark:text-slate-500">
            © 2025 ZeroIQ. Built with Next.js, React, and zero intelligence.
          </p>
        </div>
      </footer>
    </PageWrapper>
  )
}
